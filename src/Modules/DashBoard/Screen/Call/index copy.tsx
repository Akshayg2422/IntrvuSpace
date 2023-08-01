import { Modal } from '@Components';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';
import { CallScreen } from '@Modules';
import { useWhisper } from '@chengsokdara/use-whisper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();

    const {
        recording,
        transcribing,
        transcript,
        speaking,
        pauseRecording,
        startRecording,
        stopRecording,

    } = useWhisper({
        whisperConfig: {
            prompt: '',
            response_format: 'text', // output text instead of json
            temperature: 0,
            // language: 'en',
        },
        apiKey: OPENAI_API_TOKEN,
        removeSilence: true,
        streaming: true,
        // nonStop: true,
        // stopTimeout: 50000,
        // timeSlice: 2000,

        // onDataAvailable: onDataAvailable,
        // onTranscribe:onTranscribe,
    })

    useEffect(() => {
        if (isScreenRecording) {
            getChatDetails('start', 'text')
        } else {
            startScreenRecording()
        }
    }, [isScreenRecording])


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
                getChatDetails('', 'Ai')
            }, 3000);
        }
    }



    const getChatDetails = (file: any, type: 'text' | 'Ai') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            ...(type === 'Ai' && { "message": transcript.text }),
            schedule_id: scheduleId?.id
        };

        console.log(JSON.stringify(params) + "=====params");
        console.log(transcribing);

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
        //             setConversation('');
        //             setFinal('');
        //         },
        //         onError: (error: any) => () => {
        //             setShowLoader(false)
        //             showToast(error?.error_message, 'error')
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

    console.log(transcript.text + '====@chengsokdara/use-whisper');




    return (
        <Modal isOpen={true} size='xl' onClose={() => goBack()} >
            <p>Recording: {recording}</p>
            <p>Speaking: {speaking}</p>
            <p>Transcribing: {transcribing}</p>
            <CallScreen
                userName='Tamil Selvan'
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

export { Call };


