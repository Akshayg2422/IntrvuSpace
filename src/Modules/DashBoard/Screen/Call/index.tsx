import React, { useEffect, useRef, useState } from 'react'
import { CallScreen } from '@Modules';
import { useDispatch } from 'react-redux';
import { getStartChat } from '@Redux';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech, useWebCamRecorder } from '@Hooks';
import { AnimatedLoader, Button, Modal } from '@Components';
import { useWhisper } from '@chengsokdara/use-whisper'
import { log } from 'console';

function Call() {
    const { goBack } = useNavigation();
    const dispatch = useDispatch()
    // let isTriggeredRef = false
    const [isTriggeredRef, setIsTriggeredRef] = useState(false)
    const proceedModal = useModal(false);

    const [isMicRecording, setIsMicRecording] = useState(false)
    const [isHear, setIsHear] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    // const [recording, setRecording] = useState(false);
    const [transcriptText, setTranscriptText] = useState<any>('');
    const [showLoader, setShowLoader] = useState(false)
    const [type, setType] = useState('')
    const is_Start = false

    const OPENAI_API_TOKEN = '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'


    const { isSpeaking, speak } = useTextToSpeech();
    const { startScreenRecording, stopScreenRecording, isScreenRecording, output } = useScreenRecorder();
    const {
        recording,
        speaking,
        transcribing,
        transcript,
        pauseRecording,
        startRecording,
        stopRecording,
    } = useWhisper({
        apiKey: OPENAI_API_TOKEN,
        removeSilence: true,
        streaming: true,
    })

    useEffect(() => {
        if (is_Start === false) {
            proceedModal.show()
        }
    }, [])

    useEffect(() => {
        if (isScreenRecording) {
            getChatDetails('start', 'text')
        }
    }, [isScreenRecording])


    useEffect(() => {
        if (!transcribing && !recording && !isMicRecording && isScreenRecording) {
            getChatDetails(transcript.text, 'text')
        }
    }, [transcribing, transcript])

    // useEffect(() => {
    //     if (type === 'wait_1' && !isTriggeredRef) {
    //         setIsTriggeredRef(true)
    //         const timer = setTimeout(() => {
    //             getChatDetails(audioData, 'audio');
    //         }, WAIT_TIME_1);
    //         return () => clearTimeout(timer);
    //     } else if (type === 'wait_3_sec' && !isTriggeredRef) {
    //         setIsTriggeredRef(true)
    //         const timer = setTimeout(() => {
    //             getChatDetails(audioData, 'audio');
    //         }, WAIT_TIME_3_SEC);
    //         return () => clearTimeout(timer);
    //     }
    // }, [type]);

    let timerId: any;
    const handleMicControl = () => {
        if (!isMicRecording) {
            startRecording();
            setIsMicRecording(true)
            clearTimeout(timerId)
        } else if (isMicRecording) {
            pauseRecording()
            setIsMicRecording(false)
            timerId = setTimeout(() => {
                stopRecording()
            }, 3000);
        }
    }

    const getChatDetails = (file: any, type: 'text') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            schedule_id: '60e15a22-fa2d-41b7-8fd3-9c2b3422d990'
        };
        console.log("==========>", params);

        setTranscriptText('')
        // setShowLoader(true)
        // dispatch(
        //     getStartChat({
        //         params,
        //         onSuccess: (success: any) => () => {
        //             if (success?.next_step[0].message_type === "SPEAK" && success?.next_step[0].response_type !== 'INTERVIEWER_END_CALL') {
        //                 speak(success?.next_step[0]?.response_text);
        //             } else if (success?.next_step[0].response_type === 'COMMAND') {
        //                 commandVariant(success?.next_step[0]?.response_text)
        //             } else if (success?.next_step[0].message_type === "SPEAK" && success?.next_step[0].response_type == 'INTERVIEWER_END_CALL') {
        //                 isScreenRecording && stopScreenRecording()
        //                 goBack()
        //             }
        //             setIsTriggeredRef(false)
        //             setTranscriptText('')
        //             setShowLoader(false)
        //             setType('')
        //         },
        //         onError: (error: string) => () => {
        //             // speak("Something Went Wrong Please Try After Some Times");
        //             setShowLoader(false)
        //         },
        //     })
        // );
    };

    const handleVideo = () => {
        setShowVideo(!showVideo)
    }

    const commandVariant = (type: any) => {
        if (type === 'WAIT_1') {
            setType('wait_1')
        } else if (type === 'END_CAll') {
            isScreenRecording && stopScreenRecording()
            goBack()
        }
    }

    const handleStart = () => {
        proceedModal.hide()
        startScreenRecording()
    }

    const handleResume = () => {

    }



    return (
        <div className='h-100vh  d-flex  align-items-center justify-content-center' style={{ backgroundColor: '#54575c' }}>
            <CallScreen
                status='Connected'
                startTimer={isScreenRecording}
                micDisable={isSpeaking}
                isMute={isMicRecording}
                video={showVideo}
                onVideoControl={() => handleVideo()}
                speaker={isHear}
                onMicControl={() => handleMicControl()
                }
                onCallEnd={() => {
                    isScreenRecording && stopScreenRecording()
                    goBack();
                }}
                onVolumeControl={() =>
                // startRecording() 
                { }
                } />

            <AnimatedLoader loading={showLoader} />
            < Modal size={'sm'} isOpen={proceedModal.visible}
                onClose={() => {
                    proceedModal.hide()
                    goBack()
                    isScreenRecording && stopScreenRecording()
                }} >
                <div className="text-center ">
                    <Button color='secondary' size={'md'}
                        text={"RESUME"}
                        onClick={() => handleResume()}
                    />
                    <Button size={'md'}
                        text={"START"}
                        onClick={() => handleStart()}
                    />
                </div>
            </Modal >
        </div>
    )
}

export { Call }


