import { Modal, showToast } from '@Components';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';
import { CallScreen } from '@Modules';
import { getScheduleBasicInfo, getStartChat, screenRecordingPermission } from '@Redux';
import { ROUTES } from '@Routes';
// import { useWhisper } from '@chengsokdara/use-whisper';
import { useWhisper } from '../../../../aaa/useWhisper';
import hark from 'hark';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SPEAK_PROCEED_LIST } from '@Utils'
import { log } from 'console';

function Call() {


    const activeResponseText = useRef<any>('');
    const activeResponseTextId = useRef<any>('');
    const lastTranscribedText = useRef<any>('');

    const { goBack, goTo } = useNavigation();
    const dispatch = useDispatch()
    let { schedule_id } = useParams()
    let callModel = useModal(true)
    const { scheduleInfo, recordingPermission } = useSelector((state: any) => state.DashboardReducer)

    const [showVideo, setShowVideo] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [notEvenSpeck, setNotEvenSpeck] = useState(false)
    const [micState, setMicState] = useState(false)
    const [buttonConditional, setButtonConditional] = useState<any>('start')

    const CALL_STATE_INACTIVE = -1
    const CALL_STATE_LISTENING = 1
    const CALL_STATE_TRANSCRIBING = 2
    const CALL_STATE_API_LOADING = 3
    const CALL_STATE_SILENT = 4
    const intervalRefFirstWarning = useRef<any>(null);
    const intervalRefSecondWarning = useRef<any>(null);

    const PROCEED_NEXT_QUESTION = 'PROCEED_NEXT_QUESTION'



    const [callState, setCallState] = useState(CALL_STATE_INACTIVE)
    const lastCallState = useRef(CALL_STATE_INACTIVE)
    const [promptText, setPromptText] = useState<any>()
    const [lastApiText, setLastApiText] = useState('')

    const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();
    const { isTtfSpeaking, speak } = useTextToSpeech();

    const intervalRef = useRef<any>(null);

    const OPENAI_API_TOKEN = "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"

    const [isWaiting, setIsWaiting] = useState(false)

    const SPEAK_TYPE_NOT_INITIATED = "SPEAK_TYPE_NOT_INITIATED"
    const SPEAK_TYPE_API = "SPEAK_TYPE_API"
    const SPEAK_TYPE_AWAITING_USER_RESPONSE = "SPEAK_TYPE_AWAITING_USER_RESPONSE"
    const SPEAK_TYPE_USER_SPEAKING = "SPEAK_TYPE_USER_SPEAKING"

    const speaking_type = useRef<any>(SPEAK_TYPE_NOT_INITIATED);

    const {
        transcribing,
        transcript,
        startRecording,
        stopRecording,
    } = useWhisper({
        whisperConfig: {
            prompt: promptText && promptText.length > 0 ? `${[...promptText]}` : '',
            temperature: 0.2,
            language: 'en',
        },
        streaming: true,
        timeSlice: 3_000,
        apiKey: OPENAI_API_TOKEN,
        removeSilence: true,
    })

    const getBasicInfo = () => {
        const params = { schedule_id: schedule_id }
        dispatch(
            getScheduleBasicInfo(
                {
                    params,
                    onSuccess: () => () => {
                    },
                    onError: () => () => {
                    }
                }
            )
        )
    }




    useEffect(() => {
        getBasicInfo()
    }, [])


    const validateNotSpeaking = () => {
        // console.log("notEvenSpecknotEvenSpeck1", notEvenSpeck, isAnsweringRef.current, callState)


        if (callState === CALL_STATE_TRANSCRIBING && !transcribing) {
            setCallState(CALL_STATE_INACTIVE)
        }
        else if (callState === CALL_STATE_INACTIVE && lastCallState.current !== CALL_STATE_INACTIVE) {
            lastCallState.current = CALL_STATE_INACTIVE
        }
        else if (callState === CALL_STATE_INACTIVE && lastCallState.current === CALL_STATE_INACTIVE) {
            if (isRecording) {
                if (notEvenSpeck) {
                    // proceedStopListening()
                } else {
                    setIsRecording(false)
                }
            } else {
                //// console.log('mic on');
                buttonConditional === 'processing' && setMicState(true)
            }
        }

    }


    /**
     * to turn on mic when ttf completes
     */


    useEffect(() => {

        console.log('isTtfSpeakingisTtfSpeaking', isTtfSpeaking);
        // speaking_type.current = SPEAK_TYPE_API
        if (!isTtfSpeaking && buttonConditional === 'processing') {
            if (speaking_type.current === SPEAK_TYPE_USER_SPEAKING) {
                setTimeout(() => {
                }, 8000)

            }
            else if (speaking_type.current === SPEAK_TYPE_API) {
                validateProceedStartListening();
                speaking_type.current = SPEAK_TYPE_AWAITING_USER_RESPONSE
                console.log('isTtfSpeakingisTtfSpeaking12', speaking_type.current)
                setTimeout(() => {
                    // //// console.log('111111111', isAnsweringRef.current, speaking_type.current);
                    turnOnMicAndAudioRecording();
                    setTimeout(() => {
                        // //// console.log('1111111112', isAnsweringRef.current, speaking_type.current);
                        if (speaking_type.current === SPEAK_TYPE_AWAITING_USER_RESPONSE) {
                            speak(SPEAK_PROCEED_LIST[0])
                            setTimeout(() => {
                                if (speaking_type.current === SPEAK_TYPE_AWAITING_USER_RESPONSE) {
                                    // nextQuestionApiCallHandler();
                                    speaking_type.current = SPEAK_TYPE_API
                                }
                            }, 5000)
                        }
                    }, 5000)
                }, 300)
            }
            // setTimeout(() => {
            //     validateProceedStartListening();
            //     setIsWaiting(true);
            // }, 1000)

        }

    }, [isTtfSpeaking])


    function nextQuestionApiCallHandler() {
        proceedgetChatDetailsApiHandler('', 'command')
    }

    useEffect(() => {
        if (transcript.text) {
            const ft = transcript.text.replace(lastTranscribedText.current, "")
            if (ft) {
                console.log("transcript.text===", transcript.text, "===", ft)
                activeResponseText.current = activeResponseText.current + " " + ft
                console.log("transcript.totalttt===", activeResponseText.current)
            }
        }
    }, [transcript.text])

    // console.log('refresh');

    // useEffect(() => {
    //     if (transcript.text) {
    //         setLastApiText(transcript.text)
    //         if (lastApiText !== transcript.text) {
    //             setCallState(CALL_STATE_API_LOADING)
    //             proceedgetChatDetailsApiHandler('', 'Ai');
    //         }
    //     }
    //     else if (!transcribing && callState !== CALL_STATE_API_LOADING) {
    //         setCallState(CALL_STATE_INACTIVE)
    //     }

    // }, [transcript.text, transcribing])

    // const proceedStopListening = () => {
    //     stopRecording()
    //     setIsRecording(false)
    //     setCallState(CALL_STATE_TRANSCRIBING)
    //     lastCallState.current = CALL_STATE_TRANSCRIBING
    // }


    const turnOnMicAndAudioRecording = () => {
        if (!isRecording) {
            startRecording()
            setIsRecording(true)
            setMicState(false)
        }

    }
    const validateProceedStartListening = async () => {
        if (!isRecording) {
            startRecording()
            setIsRecording(true)
            setMicState(false)
        }
        // if (transcribing || callState === CALL_STATE_API_LOADING) {
        //     //// console.log("Please wait...")
        // }
        // else {
        //     if (!isRecording) {
        //         startRecording()
        //         setIsRecording(true)
        //         setMicState(false)
        //     }
        // }
    }

    const handleMicControl = () => {
        if (isRecording) {
            // proceedStopListening()
        }
        // else {
        //     validateProceedStartListening()
        // }
    }

    const proceedgetChatDetailsApiHandler = (file: any, type: 'text' | 'Ai' | 'command') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            ...(type === 'Ai' && { "message": transcript.text }),
            ...(type === 'command' && { "command": PROCEED_NEXT_QUESTION }),
            schedule_id: schedule_id
        };
        dispatch(
            getStartChat({
                params,
                onSuccess: (response: any) => () => {

                    const { response_text, message_type, response_type } = response?.details?.next_step[0]
                    const { keywords } = response?.details

                    //// console.log(JSON.stringify(response) + '=======response');

                    if (message_type === "SPEAK" && response_type !== 'INTERVIEWER_END_CALL') {
                        //// console.log(response_text + '====response_text');

                        if (window.location.pathname === `/interview/${schedule_id}`) {
                            speak(response_text);
                            speaking_type.current = SPEAK_TYPE_API
                        }
                        if (keywords.length > 0) {
                            setPromptText(keywords)
                        }
                        setCallState(CALL_STATE_INACTIVE)
                    } else if (message_type === "SPEAK" && response_type === 'INTERVIEWER_END_CALL') {
                        if (window.location.pathname === `/interview/${schedule_id}`) {
                            speak(response_text);
                            speaking_type.current = SPEAK_TYPE_API
                        }
                        setButtonConditional('end')
                    }
                },
                onError: (error: any) => () => {
                    showToast(error?.error_message, 'error')
                },
            })
        );
    };

    const handleVideo = () => {
        setShowVideo(!showVideo)
    }

    // useEffect(() => {
    //     if (buttonConditional === 'end' && !isTtfSpeaking) {
    //         const timer = setTimeout(() => {
    //             isScreenRecording && stopScreenRecording()
    //             goBack()
    //         }, 5000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [buttonConditional, isTtfSpeaking]);





    const showLoader = callState === CALL_STATE_TRANSCRIBING || callState === CALL_STATE_API_LOADING

    return (
        <>
            <Modal
                isOpen={callModel.visible} size='xl' onClose={() => {
                    callModel.hide()
                    isScreenRecording && stopScreenRecording()
                    goBack()
                }} >
                <CallScreen
                    basicInfo={scheduleInfo}
                    status='Connected'
                    loading={showLoader}
                    variant={''}
                    onMic={micState}
                    conditionalButton={buttonConditional}
                    micDisable={isTtfSpeaking}
                    isMute={isRecording}
                    startButtonOnclick={() => {
                        setButtonConditional('processing')
                        proceedgetChatDetailsApiHandler('start', 'text')
                    }}
                    ReportButtonOnclick={() => {
                        goTo(ROUTES['designation-module'].report + "/" + schedule_id, true)
                    }}
                    video={showVideo}
                    onVideoControl={() => handleVideo()}

                    onMicControl={() => handleMicControl()
                    }
                    onCallEnd={() => {
                        isScreenRecording && stopScreenRecording()
                        callModel.hide()
                        goBack();
                    }}
                    onVolumeControl={() => { }
                    } />
            </Modal>
        </>
    )
}

export { Call };


