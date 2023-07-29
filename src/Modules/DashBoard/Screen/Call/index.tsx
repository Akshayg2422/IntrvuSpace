import React, { useEffect, useRef, useState } from 'react'
import { CallScreen } from '@Modules';
import { useDispatch, useSelector } from 'react-redux';
import { getStartChat } from '@Redux';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech, useWebCamRecorder } from '@Hooks';
import { AnimatedLoader, Breadcrumbs, Button, Modal } from '@Components';
import { useWhisper } from '@chengsokdara/use-whisper'

function Call() {
    const { goBack } = useNavigation();
    const dispatch = useDispatch()
    const { scheduleId } = useSelector((state: any) => state.DashboardReducer)

    // let isTriggeredRef = false
    const [isTriggeredApi, setIsTriggeredApi] = useState(false)
    const proceedModal = useModal(false);

    const [isMicRecording, setIsMicRecording] = useState(false)
    const [isHear, setIsHear] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    // const [recording, setRecording] = useState(false);
    const [showLoader, setShowLoader] = useState(false)
    const [type, setType] = useState('')
    const is_Start = false

    // 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
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
        streaming: true
    })

    useEffect(() => {
        if (isScreenRecording) {
            getChatDetails('start', 'text')
        } else {
            startScreenRecording()
        }
    }, [isScreenRecording])


    useEffect(() => {
        if (!recording && !isMicRecording && isScreenRecording && isTriggeredApi && transcribing) {
            getChatDetails(transcript.text, 'text')
        }
    }, [isTriggeredApi, transcribing])


    // useEffect(() => {
    //     if (type === 'wait_1' && !isTriggeredRef) {6
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
            setIsTriggeredApi(false)
        } else if (isMicRecording) {
            pauseRecording()
            setIsMicRecording(false)
            timerId = setTimeout(() => {
                stopRecording()
                setIsTriggeredApi(true)
                // setShowLoader(true)
            }, 3000);
        }
    }

    console.log("==Text==============>", transcript.text);


    const getChatDetails = (file: any, type: 'text') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            schedule_id: scheduleId?.id
        };

        console.log("==Text==============>", params, file);

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
        //             setShowLoader(false)
        //         },
        //         onError: (error: string) => () => {
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

    return (
        <Modal isOpen={true} size='xl' onClose={() => goBack()} >
            <CallScreen
                userName='Akshay G'
                status='Connected'
                loading={showLoader}
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
        </Modal>
    )
}

export { Call }


