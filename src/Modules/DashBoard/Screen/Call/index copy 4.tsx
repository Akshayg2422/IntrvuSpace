// import { Modal, showToast } from '@Components';
// import { useModal, useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';
// import { CallScreen } from '@Modules';
// import { getScheduleBasicInfo, getStartChat, screenRecordingPermission } from '@Redux';
// import { ROUTES } from '@Routes';
// import { useWhisper } from '@chengsokdara/use-whisper';
// import hark from 'hark';
// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { SPEAK_PROCEED_LIST } from '@Utils'
// import { log } from 'console';

// function Call() {
//     const { goBack, goTo } = useNavigation();
//     const dispatch = useDispatch()
//     let { schedule_id } = useParams()
//     let callModel = useModal(true)
//     const { scheduleInfo, recordingPermission } = useSelector((state: any) => state.DashboardReducer)

//     const [showVideo, setShowVideo] = useState(false)
//     const [isRecording, setIsRecording] = useState(false)
//     const [notEvenSpeck, setNotEvenSpeck] = useState(false)
//     const [micState, setMicState] = useState(false)
//     const [buttonConditional, setButtonConditional] = useState<any>('start')

//     const CALL_STATE_INACTIVE = -1
//     const CALL_STATE_LISTENING = 1
//     const CALL_STATE_TRANSCRIBING = 2
//     const CALL_STATE_API_LOADING = 3
//     const CALL_STATE_SILENT = 4

//     const PROCEED_NEXT_QUESTION = 'PROCEED_NEXT_QUESTION'



//     const [callState, setCallState] = useState(CALL_STATE_INACTIVE)
//     const lastCallState = useRef(CALL_STATE_INACTIVE)
//     const [promptText, setPromptText] = useState<any>()
//     const [lastApiText, setLastApiText] = useState('')

//     const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();
//     const { isSpeaking, speak } = useTextToSpeech();

//     const intervalRef = useRef<any>(null);
//     const isAnsweringRef = useRef<any>(false);

//     const OPENAI_API_TOKEN = "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"

//     const [isWaiting, setIsWaiting] = useState(false)

//     const SPEAK_TYPE_NOT_INITIATED = -1
//     const SPEAK_TYPE_API = 1
//     const SPEAK_TYPE_WARNING1 = 2
//     const SPEAK_TYPE_WARNING2 = 3
//     const speaking_type = useRef<any>(SPEAK_TYPE_NOT_INITIATED);

//     const {
//         transcribing,
//         transcript,
//         startRecording,
//         stopRecording,
//     } = useWhisper({
//         whisperConfig: {
//             prompt: promptText && promptText.length > 0 ? `${[...promptText]}` : '',
//             temperature: 0,
//             language: 'en',
//         },
//         apiKey: OPENAI_API_TOKEN,
//         removeSilence: true,
//     })

//     const [speaking, setSpeaking] = useState(false);

//     useEffect(() => {
//         getBasicInfo()
//     }, [])


//     // useEffect(() => {
//     //     if (recordingPermission) {
//     //         proceedgetChatDetailsApiHandler('start', 'text')
//     //     }
//     //     return () => {
//     //         dispatch(screenRecordingPermission(false))
//     //     }
//     // }, [recordingPermission])


//     const getBasicInfo = () => {
//         const params = { schedule_id: schedule_id }
//         dispatch(
//             getScheduleBasicInfo(
//                 {
//                     params,
//                     onSuccess: () => () => {
//                     },
//                     onError: () => () => {
//                     }
//                 }
//             )
//         )
//     }


//     useEffect(() => {
//         async function fetchData() {
//             let option = {}
//             let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             var speech = hark(stream, option);
//             speech.on('volume_change', function (value) {

//                 if (-value < 30) {
//                     // console.log("ddddvvvv====", value)
//                     isAnsweringRef.current = true
//                     setSpeaking(true);
//                 } else {
//                     setSpeaking(false);
//                 }
//             });

//         }
//         if (isRecording) {
//             fetchData();
//         }
//     }, [isRecording])

//     const validateNotSpeaking = () => {
//         console.log("notEvenSpecknotEvenSpeck1", notEvenSpeck, isAnsweringRef.current, callState)

//         if (isAnsweringRef.current === true) {

//             if (callState === CALL_STATE_TRANSCRIBING && !transcribing) {
//                 setCallState(CALL_STATE_INACTIVE)
//             }
//             else if (callState === CALL_STATE_INACTIVE && lastCallState.current !== CALL_STATE_INACTIVE) {
//                 lastCallState.current = CALL_STATE_INACTIVE
//             }
//             else if (callState === CALL_STATE_INACTIVE && lastCallState.current === CALL_STATE_INACTIVE) {
//                 if (isRecording) {
//                     if (notEvenSpeck) {
//                         proceedStopListening()
//                     } else {
//                         setIsRecording(false)
//                     }
//                 } else {
//                     // console.log('mic on');
//                     buttonConditional === 'processing' && setMicState(true)
//                 }
//             }
//         }
//     }



//     useEffect(() => {

//         console.log(isRecording + '====isRecording' + isAnsweringRef.current + "=====isAnsweringRef.current");


//         // // console.log("aaaaaaaaa", notEvenSpeck, callState, intervalRef.current)

//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//         }

//         intervalRef.current = setInterval(validateNotSpeaking, 3000);

//         return () => {
//             clearInterval(intervalRef.current);
//         };
//     }, [callState, isRecording]);


//     useEffect(() => {
//         if (speaking) {
//             setCallState(CALL_STATE_LISTENING)
//             setNotEvenSpeck(true);
//         } else {
//             setCallState(CALL_STATE_INACTIVE)
//         }
//     }, [speaking])



//     /**
//      * to turn on mic when ttf completes
//      */


//     useEffect(() => {

//         console.log(speaking_type.current + '     ======(speaking_type.current');


//         if (isSpeaking) {
//             isAnsweringRef.current = false
//         }
//         if (!isSpeaking && buttonConditional === 'processing') {

//             if (speaking_type.current !== SPEAK_TYPE_NOT_INITIATED) {
//                 speaking_type.current = SPEAK_TYPE_API
//             }
//             else {



//                 console.log('111111111');
//                 // 
//                 isAnsweringRef.current = false
//                 setTimeout(() => {
//                     // // console.log('111111111', isAnsweringRef.current, speaking_type.current);
//                     turnOnMicAndAudioRecording();
//                     setTimeout(() => {
//                         // // console.log('1111111112', isAnsweringRef.current, speaking_type.current);
//                         if (isAnsweringRef.current === false) {
//                             speak(SPEAK_PROCEED_LIST[0])
//                             speaking_type.current = SPEAK_TYPE_WARNING1
//                             // // console.log('1111111113', isAnsweringRef.current, speaking_type.current);
//                             setTimeout(() => {
//                                 if (isAnsweringRef.current === false) {
//                                     // speak(SPEAK_PROCEED_LIST[0])
//                                     // callAPIwith commend
//                                     // // console.log('callAPIwith commend');
//                                     // // console.log('1111111114', speaking_type.current);
//                                     // nextQuestionApiCallHandler();
//                                     speaking_type.current = SPEAK_TYPE_API
//                                 }
//                             }, 5000)
//                         }
//                     }, 5000)
//                 }, 300)

//             }

//             // setTimeout(() => {
//             //     validateProceedStartListening();
//             //     setIsWaiting(true);
//             // }, 1000)

//         }

//     }, [isSpeaking])


//     function nextQuestionApiCallHandler() {
//         proceedgetChatDetailsApiHandler('', 'command')
//     }



//     console.log('refresh');

//     useEffect(() => {
//         if (transcript.text) {
//             setLastApiText(transcript.text)
//             if (lastApiText !== transcript.text) {
//                 setCallState(CALL_STATE_API_LOADING)
//                 proceedgetChatDetailsApiHandler('', 'Ai');
//             }
//         }
//         else if (!transcribing && callState !== CALL_STATE_API_LOADING) {
//             setCallState(CALL_STATE_INACTIVE)
//         }

//     }, [transcript.text, transcribing])

//     const proceedStopListening = () => {
//         stopRecording()
//         setIsRecording(false)
//         setCallState(CALL_STATE_TRANSCRIBING)
//         lastCallState.current = CALL_STATE_TRANSCRIBING
//     }


//     const turnOnMicAndAudioRecording = () => {
//         if (!isRecording) {
//             startRecording()
//             setIsRecording(true)
//             setMicState(false)
//         }

//     }
//     const validateProceedStartListening = async () => {
//         if (transcribing || callState === CALL_STATE_API_LOADING) {
//             // console.log("Please wait...")
//         }
//         else {
//             if (!isRecording) {
//                 startRecording()
//                 setIsRecording(true)
//                 setMicState(false)
//             }
//         }
//     }

//     const handleMicControl = () => {
//         if (isRecording) {
//             proceedStopListening()
//         }
//         else {
//             validateProceedStartListening()
//         }
//     }

//     const proceedgetChatDetailsApiHandler = (file: any, type: 'text' | 'Ai' | 'command') => {
//         const params = {
//             ...(type === 'text' && { "message": file }),
//             ...(type === 'Ai' && { "message": transcript.text }),
//             ...(type === 'command' && { "command": PROCEED_NEXT_QUESTION }),
//             schedule_id: schedule_id
//         };
//         dispatch(
//             getStartChat({
//                 params,
//                 onSuccess: (response: any) => () => {

//                     const { response_text, message_type, response_type } = response?.details?.next_step[0]
//                     const { keywords } = response?.details

//                     // console.log(JSON.stringify(response) + '=======response');

//                     if (message_type === "SPEAK" && response_type !== 'INTERVIEWER_END_CALL') {
//                         // console.log(response_text + '====response_text');

//                         window.location.pathname === `/interview/${schedule_id}` && speak(response_text);
//                         if (keywords.length > 0) {
//                             setPromptText(keywords)
//                         }
//                         setCallState(CALL_STATE_INACTIVE)
//                     } else if (message_type === "SPEAK" && response_type === 'INTERVIEWER_END_CALL') {
//                         window.location.pathname === `/interview/${schedule_id}` && speak(response_text);
//                         setButtonConditional('end')
//                     }
//                 },
//                 onError: (error: any) => () => {
//                     showToast(error?.error_message, 'error')
//                 },
//             })
//         );
//     };

//     const handleVideo = () => {
//         setShowVideo(!showVideo)
//     }

//     useEffect(() => {
//         if (buttonConditional === 'end' && !isSpeaking) {
//             const timer = setTimeout(() => {
//                 isScreenRecording && stopScreenRecording()
//                 goBack()
//             }, 5000);
//             return () => clearTimeout(timer);
//         }
//     }, [buttonConditional, isSpeaking]);





//     const showLoader = callState === CALL_STATE_TRANSCRIBING || callState === CALL_STATE_API_LOADING

//     return (
//         <>
//             <Modal
//                 isOpen={callModel.visible} size='xl' onClose={() => {
//                     callModel.hide()
//                     isScreenRecording && stopScreenRecording()
//                     goBack()
//                 }} >
//                 <CallScreen
//                     basicInfo={scheduleInfo}
//                     status='Connected'
//                     loading={showLoader}
//                     variant={''}
//                     onMic={micState}
//                     conditionalButton={buttonConditional}
//                     micDisable={isSpeaking}
//                     isMute={isRecording}
//                     startButtonOnclick={() => {
//                         setButtonConditional('processing')
//                         proceedgetChatDetailsApiHandler('start', 'text')
//                     }}
//                     ReportButtonOnclick={() => {
//                         goTo(ROUTES['designation-module'].report + "/" + schedule_id, true)
//                     }}
//                     video={showVideo}
//                     onVideoControl={() => handleVideo()}

//                     onMicControl={() => handleMicControl()
//                     }
//                     onCallEnd={() => {
//                         isScreenRecording && stopScreenRecording()
//                         callModel.hide()
//                         goBack();
//                     }}
//                     onVolumeControl={() => { }
//                     } />
//             </Modal>
//         </>
//     )
// }

// export { Call };


export { }