import { Modal } from '@Components';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';
import { CallScreen } from '@Modules';
import { useWhisper } from '@chengsokdara/use-whisper';
import { log } from 'console';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Harker } from 'hark'


function Call() {
    const { goBack } = useNavigation();
    const dispatch = useDispatch()

    const { scheduleId } = useSelector((state: any) => state.DashboardReducer)

    const [isHear, setIsHear] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    const [notEvenSpeck, setNotEvenSpeck] = useState(false)


    const CALL_STATE_INACTIVE = -1
    const CALL_STATE_LISTENING = 1
    const CALL_STATE_TRANSCRIBING = 2
    const CALL_STATE_API_LOADING = 3



    const [callState, setCallState] = useState(CALL_STATE_INACTIVE)
    const lastCallState = useRef(CALL_STATE_INACTIVE)
    const [IsVoiceDetected, setVoiceDetected] = useState<boolean>(false)




    const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();
    const { isSpeaking, speak } = useTextToSpeech();

    const intervalRef = useRef<any>(null);
    const listener = useRef<Harker>()

    /**
     * transcription - openai whisper api starts ===============================
     */
    const OPENAI_API_TOKEN = "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"
    const {
        // recording,
        transcribing,
        transcript,
        speaking,
        pauseRecording,
        startRecording,
        stopRecording,

    } = useWhisper({
        whisperConfig: {
            prompt: '',
            temperature: 0,
            language: 'en',
        },
        apiKey: OPENAI_API_TOKEN,
        removeSilence: true,
        streaming: false,
    })
    /**
     * transcription - openai whisper api ends ===============================
     */

    const onStartSpeaking = () => {
        console.log('start speaking')
        setVoiceDetected(true)
    }

    const onStopSpeaking = () => {
        console.log('stop speaking')
        setVoiceDetected(false)
    }


    useEffect(() => {
        return () => {
            if (listener.current) {
                // @ts-ignore
                listener.current.off('speaking', onStartSpeaking)
                // @ts-ignore
                listener.current.off('stopped_speaking', onStopSpeaking)
            }
        }
    }, []);

    const validateNotSpeaking = () => {

        console.log(callState + '=====callState====' + transcribing + '==transcribing');


        if (callState === CALL_STATE_TRANSCRIBING && !transcribing) {
            setCallState(CALL_STATE_INACTIVE)
        }
        else if (callState === CALL_STATE_INACTIVE && lastCallState.current !== CALL_STATE_INACTIVE) {
            lastCallState.current = CALL_STATE_INACTIVE
        }
        else if (callState === CALL_STATE_INACTIVE && lastCallState.current === CALL_STATE_INACTIVE) {
            if (isRecording) {
                if (notEvenSpeck) {
                    proceedStopListening()
                } else {
                    setIsRecording(false)
                }
            } else {

                console.log('mic on');
            }
        }

    }

    // console.log("3 sec check=====", speaking + "===speaking", callState + '===callState')

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(validateNotSpeaking, 3000);
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [callState, isRecording]);

    useEffect(() => {
        console.log(speaking);
        if (speaking) {
            setCallState(CALL_STATE_LISTENING)
            console.log('setNotEvenSpeck');
            setNotEvenSpeck(true);
        } else {
            setCallState(CALL_STATE_INACTIVE)
        }
    }, [speaking])


    useEffect(() => {
        if (transcript.text) {
            console.log('came======transcript');

            setCallState(CALL_STATE_API_LOADING)
            getChatDetails('', 'Ai');
            // call me api
            // while calling
            // isApiLoading set as true
            // on success failure 
            // set isApiLoading false
            // setCallState(CALL_STATE_INACTIVE)
        }
        else if (!transcribing && callState !== CALL_STATE_API_LOADING) {
            setCallState(CALL_STATE_INACTIVE)
        }

    }, [transcript.text, transcribing])

    const proceedStopListening = () => {
        stopRecording()
        setIsRecording(false)
        setCallState(CALL_STATE_TRANSCRIBING)
        lastCallState.current = CALL_STATE_TRANSCRIBING
    }

    const validateProceedStartListening = async () => {
        if (transcribing || callState === CALL_STATE_API_LOADING) {
            // Toast Please wait
            console.log("Please wait...")
        }
        else {
            if (!isRecording) {
                const stream: any = await navigator.mediaDevices.getUserMedia({ audio: true });
                startRecording()
                setIsRecording(true)
                if (!listener.current) {
                    const { default: hark } = await import('hark')
                    listener.current = hark(stream.current, {
                        interval: 100,
                        play: false,
                    })
                    listener.current.on('speaking', onStartSpeaking)
                    listener.current.on('stopped_speaking', onStopSpeaking)
                }
            }
        }
    }

    const handleMicControl = () => {
        if (isRecording) {
            proceedStopListening()
        }
        else {
            validateProceedStartListening()
        }
    }


    // const handleMicControl = () => {
    //     if (!isMicRecording) {
    //         startRecording();
    //         setIsMicRecording(true)
    //         clearTimeout(timerId)
    //         setIsTriggeredApi(false)
    //     } else if (isMicRecording) {
    //         pauseRecording()
    //         setIsMicRecording(false)
    //         timerId = setTimeout(() => {
    //             stopRecording()
    //             getChatDetails('', 'Ai')
    //         }, 3000);
    //     }
    // }

    const getChatDetails = (file: any, type: 'text' | 'Ai') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            ...(type === 'Ai' && { "message": transcript.text }),
            schedule_id: scheduleId?.id
        };

        console.log(JSON.stringify(params) + "=====params");
        console.log(transcribing);
        setCallState(CALL_STATE_INACTIVE)

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

    const showLoader = callState === CALL_STATE_TRANSCRIBING || isSpeaking

    return (
        <Modal isOpen={true} size='xl' onClose={() => goBack()} >
            <CallScreen
                userName='Tamil Selvan'
                status='Connected'
                loading={showLoader}
                startTimer={isScreenRecording}
                micDisable={showLoader}
                isMute={isRecording}
                video={showVideo}
                onVideoControl={() => handleVideo()}
                speaker={isHear}
                onMicControl={() => handleMicControl()
                }
                onCallEnd={() => {
                    isScreenRecording && stopScreenRecording()
                    goBack();
                }}
                onVolumeControl={() => { }
                } />
        </Modal>
    )
}

export { Call };


