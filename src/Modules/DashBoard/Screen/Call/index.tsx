import { Button, Modal, showToast } from '@Components';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';
import { CallScreen } from '@Modules';
import { useWhisper } from '@chengsokdara/use-whisper';
import { log } from 'console';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hark from 'hark'
import { getScheduleBasicInfo, getStartChat, screenRecordingPermission } from '@Redux';

function Call() {
    const { goBack } = useNavigation();
    const dispatch = useDispatch()

    const { scheduleInfo, scheduleId, recordingPermission } = useSelector((state: any) => state.DashboardReducer)

    const [isHear, setIsHear] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [notEvenSpeck, setNotEvenSpeck] = useState(false)
    const [micState, setMicState] = useState(false)
    const [buttonConditional, setButtonConditional] = useState<any>('start')

    const CALL_STATE_INACTIVE = -1
    const CALL_STATE_LISTENING = 1
    const CALL_STATE_TRANSCRIBING = 2
    const CALL_STATE_API_LOADING = 3

    const [callState, setCallState] = useState(CALL_STATE_INACTIVE)
    const lastCallState = useRef(CALL_STATE_INACTIVE)
    const [promptText, setPromptText] = useState<any>()
    const [lastApiText, setLastApiText] = useState('')

    const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();
    const { isSpeaking, speak } = useTextToSpeech();

    const intervalRef = useRef<any>(null);

    const OPENAI_API_TOKEN = "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"
    const {
        transcribing,
        transcript,
        startRecording,
        stopRecording,
    } = useWhisper({
        whisperConfig: {
            prompt: promptText && promptText.length > 0 ? `${[...promptText]}` : '',
            temperature: 0,
            language: 'en',
        },
        apiKey: OPENAI_API_TOKEN,
        removeSilence: true,
    })

    const [speaking, setSpeaking] = useState(false);

    // getScheduleBasicInfo
    useEffect(() => {
        getBasicInfo()
    }, [])


    useEffect(() => {
        if (recordingPermission) {
            getChatDetails('start', 'text')
            setButtonConditional('processing')
        }
        return () => {
            dispatch(screenRecordingPermission(false))
        }
    }, [recordingPermission])


    const getBasicInfo = () => {
        const params = { schedule_id: scheduleId }
        dispatch(getScheduleBasicInfo({
            params, onSuccess: () => () => {
            },
            onError: () => () => {
            }
        }))
    }


    useEffect(() => {
        async function fetchData() {
            let option = {}
            let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            var speech = hark(stream, option);
            speech.on('volume_change', function (value) {
                if (-value < 50) {
                    setSpeaking(true);
                } else {
                    setSpeaking(false);
                }
            });

        }
        if (isRecording) {
            fetchData();
        }
    }, [isRecording])

    const validateNotSpeaking = () => {

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
                buttonConditional === 'processing' && setMicState(true)
            }
        }

    }

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
        if (speaking) {
            setCallState(CALL_STATE_LISTENING)
            setNotEvenSpeck(true);
        } else {
            setCallState(CALL_STATE_INACTIVE)
        }
    }, [speaking])

    useEffect(() => {
        if (transcript.text) {
            setLastApiText(transcript.text)
            if (lastApiText !== transcript.text) {
                setCallState(CALL_STATE_API_LOADING)
                getChatDetails('', 'Ai');
            }
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
            console.log("Please wait...")
        }
        else {
            if (!isRecording) {
                startRecording()
                setIsRecording(true)
                setMicState(false)
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

    const getChatDetails = (file: any, type: 'text' | 'Ai') => {
        const params = {
            ...(type === 'text' && { "message": file }),
            ...(type === 'Ai' && { "message": transcript.text }),
            schedule_id: scheduleId
        };
        dispatch(
            getStartChat({
                params,
                onSuccess: (success: any) => async () => {
                    if (success?.next_step[0].message_type === "SPEAK" && success?.next_step[0].response_type !== 'INTERVIEWER_END_CALL') {
                        window.location.pathname === '/call' && speak(success?.next_step[0]?.response_text);
                        if (success?.keywords.length > 0) {
                            setPromptText(success?.keywords)
                        }
                        setCallState(CALL_STATE_INACTIVE)
                    } else if (success?.next_step[0].response_type === 'COMMAND') {
                        commandVariant(success?.next_step[0]?.response_text)
                    } else if (success?.next_step[0].message_type === "SPEAK" && success?.next_step[0].response_type == 'INTERVIEWER_END_CALL') {
                        buttonConditional('end')
                        await speak(success?.next_step[0]?.response_text);
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

    const commandVariant = (type: any) => {
        if (type === 'WAIT_1') {
            // setType('wait_1')
        } else if (type === 'END_CAll') {
            isScreenRecording && stopScreenRecording()
            goBack()
        }
    }

    useEffect(() => {
        if (buttonConditional === 'end' && !isSpeaking) {
            const timer = setTimeout(() => {
                isScreenRecording && stopScreenRecording()
                goBack()
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [buttonConditional, isSpeaking]);

    const showLoader = callState === CALL_STATE_TRANSCRIBING || callState === CALL_STATE_API_LOADING

    return (
        <>
            <Modal isOpen={true} size='xl' onClose={() => goBack()} >
                <CallScreen
                    basicInfo={scheduleInfo}
                    userName='Tamil Selvan'
                    status='Connected'
                    loading={showLoader}
                    variant={''}
                    onMic={micState}
                    conditionalButton={buttonConditional}
                    micDisable={isSpeaking}
                    isMute={isRecording}
                    startButtonOnclick={() => {
                        startScreenRecording()
                    }}
                    video={showVideo}
                    onVideoControl={() => handleVideo()}
                    speaker={isHear}
                    onMicControl={() => handleMicControl()
                    }
                    onCallEnd={() => {
                        isScreenRecording && stopScreenRecording()
                        // callModal.hide()
                        goBack();
                    }}
                    onVolumeControl={() => { }
                    } />
            </Modal>
        </>
    )
}

export { Call };


