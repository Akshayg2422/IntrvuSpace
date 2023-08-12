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
import moment from 'moment';

function Call() {

    const { isTtfSpeaking, speak } = useTextToSpeech();

    function generateRandomID() {
        const min = 100000; // Smallest 6-digit number
        const max = 999999; // Largest 6-digit number
        const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomID;
    }

    const activeResponseText = useRef<any>('');
    const activeResponseTextId = useRef<any>('');
    const lastTranscribedText = useRef<any>('');

    const { goBack, goTo } = useNavigation();
    const dispatch = useDispatch()
    let { schedule_id } = useParams()
    let callModel = useModal(true)
    const { scheduleInfo, recordingPermission } = useSelector((state: any) => state.DashboardReducer)

    const [proceedResponse, setProceedResponse] = useState(false)
    const [responseDump, setResponseDump] = useState<any>(undefined)
    const responseDelayTimeOutRef = useRef<any>(undefined)

    const [showVideo, setShowVideo] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [notEvenSpeck, setNotEvenSpeck] = useState(false)
    const [micState, setMicState] = useState(false)
    const [buttonConditional, setButtonConditional] = useState<any>('start')

    const [promptText, setPromptText] = useState<any>()
    const [lastApiText, setLastApiText] = useState('')

    const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();

    const OPENAI_API_TOKEN = "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"
    const SPEAK_TYPE_NOT_INITIATED = "SPEAK_TYPE_NOT_INITIATED"
    const SPEAK_TYPE_API = "SPEAK_TYPE_API"
    const SPEAK_TYPE_AWAITING_USER_RESPONSE = "SPEAK_TYPE_AWAITING_USER_RESPONSE"
    const SPEAK_TYPE_USER_SPEAKING = "SPEAK_TYPE_USER_SPEAKING"

    const speaking_type = useRef<any>(SPEAK_TYPE_NOT_INITIATED);
    const proceedResponseBufferTime = useRef<any>(moment());


    const {
        transcribing,
        transcript,
        startRecording,
        stopRecording,
        voiceUp
    } = useWhisper({
        whisperConfig: {
            prompt: promptText,
            temperature: 0.2,
            language: 'en',
        },
        streaming: true,
        timeSlice: 3_000,
        apiKey: OPENAI_API_TOKEN,
        removeSilence: true,
        isTtfSpeaking: isTtfSpeaking,


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

    useEffect(() => {
        console.log("voiceUpvoiceUp", voiceUp)
        if (voiceUp) {
            setProceedResponse(false)
            try {
                clearTimeout(responseDelayTimeOutRef.current)
            }
            catch (e) {
            }

        }
    }, [voiceUp])


    /**
     * to turn on mic when ttf completes
     */
    useEffect(() => {

        console.log('isTtfSpeakingisTtfSpeaking', isTtfSpeaking);
        // speaking_type.current = SPEAK_TYPE_API
        if (!isTtfSpeaking && buttonConditional === 'processing') {
            if (speaking_type.current === SPEAK_TYPE_USER_SPEAKING) {

            }
            else if (speaking_type.current === SPEAK_TYPE_API) {
                validateProceedStartListening();
                speaking_type.current = SPEAK_TYPE_AWAITING_USER_RESPONSE
                console.log('isTtfSpeakingisTtfSpeaking12', speaking_type.current)
                setTimeout(() => {
                    // //// console.log('111111111', isAnsweringRef.current, speaking_type.current);
                    turnOnMicAndAudioRecording();
                    // setTimeout(() => {
                    //     // //// console.log('1111111112', isAnsweringRef.current, speaking_type.current);
                    //     if (speaking_type.current === SPEAK_TYPE_AWAITING_USER_RESPONSE) {
                    //         speak(SPEAK_PROCEED_LIST[0])
                    //         setTimeout(() => {
                    //             if (speaking_type.current === SPEAK_TYPE_AWAITING_USER_RESPONSE) {
                    //                 // nextQuestionApiCallHandler();
                    //                 speaking_type.current = SPEAK_TYPE_API
                    //             }
                    //         }, 5000)
                    //     }
                    // }, 15000)
                }, 300)
            }
            // setTimeout(() => {
            //     validateProceedStartListening();
            //     setIsWaiting(true);
            // }, 1000)

        }

    }, [isTtfSpeaking])

    function nextQuestionApiCallHandler() {
        proceedgetChatDetailsApiHandler({ command: "PROCEED_NEXT_QUESTION" })
    }

    useEffect(() => {
        if (transcript.text) {

            speaking_type.current = SPEAK_TYPE_USER_SPEAKING
            const ft = transcript.text.replace(lastTranscribedText.current, "")
            if (ft) {
                console.log("transcript.text===", transcript.text, "===", ft)
                activeResponseText.current = activeResponseText.current + " " + ft
                console.log("transcript.totalttt===", activeResponseText.current)
                proceedgetChatDetailsApiHandler()
            }
        }
    }, [transcript.text])

    const proceedStopListening = () => {
        stopRecording()
        setIsRecording(false)
        // setCallState(CALL_STATE_TRANSCRIBING)
        // lastCallState.current = CALL_STATE_TRANSCRIBING
    }


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

    const proceedHandleResponse = ({ params, response }) => {
        console.log("rrrrrr1", activeResponseText.current, params.message)
        if (activeResponseText.current === params.message || params.message === 'start') {
            const { response_text, message_type, response_type } = response?.details?.next_step[0]
            const { keywords } = response?.details

            if (message_type === "SPEAK" && window.location.pathname === `/interview/${schedule_id}`) {
                // proceedStopListening()
                speak(response_text);
                speaking_type.current = SPEAK_TYPE_API

                if (keywords.length > 0) {
                    setPromptText(keywords)
                }
            }
            activeResponseText.current = ''
            activeResponseTextId.current = generateRandomID()
            if (response_type === 'INTERVIEWER_END_CALL') {
                proceedStopListening()
                setButtonConditional('end')
            }
        }
    }

    useEffect(() => {
        console.log("procceddhandd")
        if (responseDump && proceedResponse) {
            proceedHandleResponse(responseDump)
        }
    }, [responseDump, proceedResponse])

    const proceedgetChatDetailsApiHandler = (customParams = {}) => {
        setProceedResponse(false)

        responseDelayTimeOutRef.current = setTimeout(() => {
            setProceedResponse(true)
        }, 8000)

        const params = {
            message: activeResponseText.current,
            message_id: activeResponseTextId.current,
            schedule_id: schedule_id,
            ...customParams
        };
        dispatch(
            getStartChat({
                params,
                onSuccess: (response: any) => () => {
                    setResponseDump({ params: params, response: response })
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
                    loading={isTtfSpeaking}
                    variant={''}
                    onMic={micState}
                    conditionalButton={buttonConditional}
                    micDisable={isTtfSpeaking}
                    isMute={isRecording}
                    startButtonOnclick={() => {
                        setButtonConditional('processing')
                        proceedgetChatDetailsApiHandler({ message: "start" })
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


