import React, { useEffect, useRef, useState } from 'react'
import { CallScreen } from '@Modules';
import { useDispatch } from 'react-redux';
import { getStartChat } from '@Redux';
import { useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';

function Call() {
    const { goBack } = useNavigation();
    const dispatch = useDispatch()

    const mediaRecorderRef = useRef<any>(null);

    const [isHear, setIsHear] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    const [stream, setStream] = useState<any>(null);
    const [recording, setRecording] = useState(false);
    const [audioData, setAudioData] = useState(null);
    const MINUTE_MS = 60000;

    const { isSpeaking, speak } = useTextToSpeech();
    const { startRecording, stopRecording, isScreenRecording } = useScreenRecorder();

    useEffect(() => {

        getMicrophonePermission();
        // startRecording();

        return () => {

            stopVoiceRecording()
            if (isScreenRecording) {
                stopRecording()
            }

        }
    }, [])


    useEffect(() => {
        if (isScreenRecording) {
            getChatDetails('', 'text')
        }
    }, [isScreenRecording])

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

                console.log(JSON.stringify(streamData) + '====streamData');

                setStream(streamData);
            } catch (err) {
                alert(err);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startVoiceRecording = () => {
        if (!isSpeaking && stream) {
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
            mediaRecorderRef.current.start();
            setRecording(true);
        }
    };

    const stopVoiceRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    const handleDataAvailable = (event: any) => {
        if (event.data.size > 0) {
            const audioBlob = new Blob([event.data], { type: 'audio/wav' });
            const reader: any = new FileReader();
            reader.onload = () => {
                const base64Audio = reader.result.split(',')[1];
                setAudioData(base64Audio)
                getChatDetails(base64Audio, 'audio')
            };
            reader.readAsDataURL(audioBlob);
        }
    };

    const handleMicControl = () => {
        if (!recording) {
            startVoiceRecording()
        } else {
            stopVoiceRecording()
        }
    }


    const getChatDetails = (file: string, type: 'text' | 'audio') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            ...(type === 'audio' && { voice_message: file }),
            schedule_id: '79f59eb9-f9cb-4473-823b-f62f62cff4ce'
        };

        dispatch(
            getStartChat({
                params,
                onSuccess: (success: any) => () => {
                    if (success?.next_step[0].response_type === "SPEAK") {
                        speak(success?.next_step[0]?.response_text);
                    } else if (success?.next_step[0].response_type === 'COMMAND') {
                        commandVariant(success?.next_step[0]?.response_text)
                    }
                },
                onError: (error: string) => () => {
                    // speak("Something Went Wrong Please Try After Some Times");
                },
            })
        );
    };

    const handleVideo = () => {
        setShowVideo(!showVideo)
    }

    const commandVariant = (type: any) => {
        if (type === 'WAIT_1') {

        } else if (type === 'END_CAll') {
            stopVoiceRecording()
            isScreenRecording && stopRecording()
            goBack()
        }
    }


    return (
        <div className='h-100vh bg-gray d-flex  align-items-center justify-content-center'>
            <CallScreen
                status='Connected'
                isMute={recording}
                video={showVideo}
                onVideoControl={() => handleVideo()}
                speaker={isHear}
                onMicControl={() => handleMicControl()
                }
                onCallEnd={() => {
                    stopVoiceRecording();
                    isScreenRecording && stopRecording();
                    goBack();
                }}
                onVolumeControl={() =>
                    startRecording()
                } />
        </div>
    )
}

export { Call }
