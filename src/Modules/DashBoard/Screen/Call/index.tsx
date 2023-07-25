import React, { useEffect, useRef, useState } from 'react'
import { CallScreen } from '@Modules';
import { useDispatch } from 'react-redux';
import { getStartChat } from '@Redux';
import { useNavigation, useScreenRecorder, useTextToSpeech, useWebCamRecorder } from '@Hooks';
import { AnimatedLoader } from '@Components';

function Call() {
    const { goBack } = useNavigation();
    const dispatch = useDispatch()
    // let isTriggeredRef = false
    const [isTriggeredRef, setIsTriggeredRef] = useState(false)


    const mediaRecorderRef = useRef<any>(null);
    const [isHear, setIsHear] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    const [stream, setStream] = useState<any>(null);
    const [recording, setRecording] = useState(false);
    const [audioData, setAudioData] = useState<any>([]);
    const [showLoader, setShowLoader] = useState(false)
    const [type, setType] = useState('')


    const WAIT_TIME_1 = 60000
    const WAIT_TIME_3_SEC = 3000;

    const { isSpeaking, speak } = useTextToSpeech();
    const { startRecording, stopRecording, isScreenRecording, output } = useScreenRecorder();

    useEffect(() => {
        getMicrophonePermission();
        startRecording()
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


    useEffect(() => {
        if (type === 'wait_1' && !isTriggeredRef) {
            setIsTriggeredRef(true)
            const timer = setTimeout(() => {
                getChatDetails(audioData, 'audio');
            }, WAIT_TIME_1);
            return () => clearTimeout(timer);
        } else if (type === 'wait_3_sec' && !isTriggeredRef) {
            setIsTriggeredRef(true)
            const timer = setTimeout(() => {
                getChatDetails(audioData, 'audio');
            }, WAIT_TIME_3_SEC);
            return () => clearTimeout(timer);
        }
    }, [type]);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
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
                setAudioData([...audioData, base64Audio])
                getChatDetails([base64Audio], 'audio')
                // BufferTime()
                // setType('wait_3_sec')
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

    // const BufferTime = () => {
    //     if (!isSpeaking) {
    //         setType('wait_3_sec')
    //     }
    // }

    const getChatDetails = (file: any, type: 'text' | 'audio') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            ...(type === 'audio' && { message_b64: file }),
            schedule_id: '79f59eb9-f9cb-4473-823b-f62f62cff4ce'
        };
        setShowLoader(true)
        dispatch(
            getStartChat({
                params,
                onSuccess: (success: any) => () => {
                    if (success?.next_step[0].response_type === "SPEAK") {
                        speak(success?.next_step[0]?.response_text);
                    } else if (success?.next_step[0].response_type === 'COMMAND') {
                        commandVariant(success?.next_step[0]?.response_text)
                    }
                    setIsTriggeredRef(false)
                    setAudioData([])
                    setShowLoader(false)
                    setType('')
                },
                onError: (error: string) => () => {
                    // speak("Something Went Wrong Please Try After Some Times");
                    setShowLoader(false)
                },
            })
        );
    };

    const handleVideo = () => {
        setShowVideo(!showVideo)
    }

    const commandVariant = (type: any) => {
        if (type === 'WAIT_1') {
            setType('wait_1')
        } else if (type === 'END_CAll') {
            console.log("============>", output);
            stopVoiceRecording()
            isScreenRecording && stopRecording()
            goBack()
        }
    }

    return (
        <div className='h-100vh  d-flex  align-items-center justify-content-center' style={{ backgroundColor: '#54575c' }}>
            <CallScreen
                status='Connected'
                isMute={recording}
                video={showVideo}
                onVideoControl={() => handleVideo()}
                speaker={isHear}
                onMicControl={() => handleMicControl()
                }
                onCallEnd={() => {
                    console.log("============>", output);

                    stopVoiceRecording();
                    isScreenRecording && stopRecording();
                    goBack();
                }}
                onVolumeControl={() =>
                    startRecording()
                } />

            <AnimatedLoader loading={showLoader} />
        </div>
    )
}

export { Call }


