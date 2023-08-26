import { Modal, showToast, Button, Image, AnimatedImage, Spinner } from '@Components';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';
import { Guidelines, CallHeader } from '@Modules';
import { getScheduleBasicInfo, getStartChat, screenRecordingPermission } from '@Redux';
import { ROUTES } from '@Routes';
import hark from 'hark';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getShortName, capitalizeFirstLetter } from '@Utils'
import moment from 'moment';
import { useLoader } from '@Hooks'
import type { RawAxiosRequestHeaders } from 'axios'
import type { Harker } from 'hark'
import type { Encoder } from 'lamejs'
import type { Options, RecordRTCPromisesHandler } from 'recordrtc'
import axios from 'axios';

import {
    defaultStopTimeout,
    ffmpegCoreUrl,
    silenceRemoveCommand,
    whisperApiEndpoint,
} from './configs'
import { icons } from '@Assets'
import { Icons } from 'react-toastify';



function Call() {

    const compare_moment_format = 'YYYY-MM-DDHH:mm:ss';

    const { isTtfSpeaking, speak } = useTextToSpeech();

    function generateRandomID() {
        const min = 100000;
        const max = 999999;
        const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomID;
    }


    const activeResponseText = useRef<any>('start');
    // const [activeResponseText, setActiveResponseText] = useState('start');

    // const [activeResponseTextId, setActiveResponseTextId] = useState<any>(generateRandomID());
    const lastTranscribedText = useRef<any>('');

    const { goBack, goTo } = useNavigation();
    const dispatch = useDispatch()
    let { schedule_id } = useParams()
    let callModel = useModal(true)
    const { scheduleInfo, recordingPermission } = useSelector((state: any) => state.DashboardReducer)

    const [proceedResponse, setProceedResponse] = useState(false)
    const [processCallInprogress, setProcessCallInprogress] = useState(false)
    const [responseDump, setResponseDump] = useState<any>(undefined)
    const responseDelayTimeOutRef = useRef<any>(undefined)

    const [showVideo, setShowVideo] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [notEvenSpeck, setNotEvenSpeck] = useState(false)

    const [buttonConditional, setButtonConditional] = useState<any>('start')

    const [promptText, setPromptText] = useState<any>()
    const [lastApiText, setLastApiText] = useState('')

    const [errorType1, setErrorType1] = useState('')

    const accumulatedBlobs = useRef<any>([]);

    const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();

    const OPENAI_API_TOKEN = "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"
    const SPEAK_TYPE_NOT_INITIATED = "SPEAK_TYPE_NOT_INITIATED"
    const SPEAK_TYPE_API = "SPEAK_TYPE_API"
    const SPEAK_TYPE_AWAITING_USER_RESPONSE = "SPEAK_TYPE_AWAITING_USER_RESPONSE"
    const SPEAK_TYPE_USER_SPEAKING = "SPEAK_TYPE_USER_SPEAKING"

    const speaking_type = useRef<any>(SPEAK_TYPE_NOT_INITIATED);
    const proceedResponseBufferTime = useRef<any>(moment());
    const cancelTokenSource = useRef<any>(null);

    const socketRef = useRef<any>(null);
    const videoRecorderRef = useRef(null);
    
    useEffect(() => {
        // Create the WebSocket connection only if it's not already established
        if (!socketRef.current) {
            const socket = new WebSocket('ws://localhost:8012/aaa');
            socketRef.current = socket; // Store the WebSocket instance in the ref

            socket.addEventListener('open', () => {
                console.log('WebSocket connection established');
            });

            socket.addEventListener('close', () => {
                console.log('WebSocket connection closed');
            });
        }

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, []);

    /**
     * record config starts here ==================================
     */

    // const sendDataToSocket = (data) => {
    //     console.log('WebSocketconnection01')
    //     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
    //         // console.log('WebSocketconnection011', data);
    //         socketRef.current.send(JSON.stringify(data));
    //     } else {
    //         console.log('WebSocketconnection012');
    //     }
    // };

    // const sendDataToSocket = async (blobStream) => {
    //     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
    //         const reader = blobStream.getReader();
    
    //         while (true) {
    //             const { done, value } = await reader.read();
    
    //             if (done) {
    //                 break;
    //             }
    
    //             if (value) {
    //                 socketRef.current.send(value);
    //             }
    //         }
    //     } else {
    //         console.log('WebSocket connection is not open.');
    //     }
    // };


    const sendDataToSocket = async (blob:Blob) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const arrayBuffer = await blob.arrayBuffer();
            const byteArray = new Uint8Array(arrayBuffer);
            
            // Convert the binary data to a hexadecimal string
            let hexString = "";
            for (let i = 0; i < byteArray.length; i++) {
                hexString += byteArray[i].toString(16).padStart(2, "0");
            }
            // const postData = {
            //     blob_data: hexString,
            //     timestamp: Date.now() // or whatever timestamp you need
            // };
            
            // // arrayBuffer();
            // // const arrayBufferToString = new TextDecoder().decode(arrayBuffer);
            // const uint8Array = new Uint8Array(arrayBuffer);
            // console.log("uint8Arrayaa", JSON.stringify(uint8Array))
            // // const base64String = btoa(String.fromCharCode(...uint8Array));
            const syncD = {
                timestamp: moment(),
                schedule_id:schedule_id,
                blob_data: hexString,
                is_speaking:speakingShouldProcess.current,
            }
            socketRef.current.send(JSON.stringify(syncD));
        } else {
            console.log('WebSocket connection is not open.');
        }
    };


    const speakingShouldProcess = useRef<any>(false);

    const chunks = useRef<Blob[]>([])
    const encoder = useRef<Encoder>()
    const listener = useRef<Harker>()
    const recorderAudio = useRef<RecordRTCPromisesHandler>()
    // const recorderAudio = useRef<RecordRTCPromisesHandler>()

    const stream = useRef<MediaStream>()
    const timeout = useRef<any>({})

    const [recording, setRecording] = useState<boolean>(false)
    const [speaking, setSpeaking] = useState<boolean>(false)
    const [transcribing, setTranscribing] = useState<boolean>(false)
    const lastSpokeActiveTime = useRef<any>(moment().format(compare_moment_format))
    const [lastTranscriptionStartTime, setLastTranscriptionStartTime] = useState<any>(moment().format(compare_moment_format))
    const [lastTranscriptionEndTime, setLastTranscriptionEndTime] = useState<any>(moment().format(compare_moment_format))

    const [voiceUp, setVoiceUp] = useState<boolean>(false)
    const voiceUpCount = useRef<any>(0);
    const voiceUpTime = useRef<any>(moment());

    const transcriptionReferenceId = useRef<any>();

    const activeResponseTextId = useRef<any>(generateRandomID());



    /**
     * state jay
     */

    const loader = useLoader(false);
    const proceedCallLoader = useLoader(false);
    const [showCam, setShowCam] = useState(false);
    const [mute, setMute] = useState(false);



    const ttsRef = useRef<any>(false);


    /**
     * Handle Speech To text Starts
     */


    useEffect(() => {
        ttsRef.current = isTtfSpeaking

        console.log("isTtfSpeakingisTtfSpeakingisTtfSpeaking", isTtfSpeaking)
    }, [isTtfSpeaking])



    useEffect(() => {
        getBasicInfo()
    }, [])


    const getBasicInfo = () => {
        const params = { schedule_id: schedule_id }

        loader.show();
        dispatch(
            getScheduleBasicInfo(
                {
                    params,
                    onSuccess: () => () => {
                        loader.hide();
                    },
                    onError: () => () => {
                        loader.hide();
                    }
                }
            )
        )
    }




    useEffect(() => {
        return () => {
            if (chunks.current) {
                chunks.current = []
            }
            if (encoder.current) {
                encoder.current.flush()
                encoder.current = undefined
            }
            if (recorderAudio.current) {
                recorderAudio.current.destroy()
                recorderAudio.current = undefined
            }
            if (listener.current) {
                // @ts-ignore
                listener.current.off('speaking', onStartSpeaking)
                // @ts-ignore
                listener.current.off('stopped_speaking', onStopSpeaking)
            }
            if (stream.current) {
                stream.current.getTracks().forEach((track) => track.stop())
                stream.current = undefined
            }
        }
    }, [])


    /**
     * get user media stream event
     * - try to stop all previous media streams
     * - ask user for media stream with a system popup
     * - register hark speaking detection listeners
     */
    const onStartStreaming = async () => {
        try {
            if (stream.current) {
                stream.current.getTracks().forEach((track) => track.stop())
            }
            stream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video:true,
            })
            if (!listener.current) {
                const { default: hark } = await import('hark')
                listener.current = hark(stream.current, {
                    interval: 100,
                    play: false,
                })
                listener.current.on('speaking', onStartSpeaking)
                listener.current.on('stopped_speaking', onStopSpeaking)
                listener.current.on('volume_change', function (value) {
                    const currentDate = moment();
                    if (ttsRef.current) {
                        voiceUpCount.current = 0
                        speakingShouldProcess.current = false
                        if (voiceUp === true)
                            setVoiceUp(false)
                    }
                    else if (-value < 43) {

                        /**
                         * extend waiting time if decibile is of talking size
                         */
                        if (currentDate < voiceUpTime.current) {
                            voiceUpCount.current = voiceUpCount.current + 1
                        }
                        else {
                            voiceUpCount.current = 0
                        }

                        const limitDateTime = currentDate.add(2, 'seconds');
                        voiceUpTime.current = limitDateTime

                        if (voiceUpCount.current > 2) {
                            setVoiceUp(true)
                            setErrorType1("")

                            if (voiceUpCount.current == 3) {
                                const lastSpokeActiveTimeTemp = moment().format(compare_moment_format)
                                console.log("isUserDidntInterrupt last set value", lastSpokeActiveTimeTemp)
                                lastSpokeActiveTime.current = lastSpokeActiveTimeTemp
                            }
                            speakingShouldProcess.current = true
                        }
                    }
                    else {


                        if (voiceUpCount.current == 2) {

                            // const limitDateTime = currentDate.add(4, 'seconds');
                            // voiceUpTime.current = limitDateTime
                        }
                        if (currentDate > voiceUpTime.current) {
                            // console.log("voiceUpCount.currentaaav", voiceUpCount.current)
                            setErrorType1("Please speak little louder, Your voice is low!")

                            voiceUpCount.current = 0
                            setVoiceUp(false)
                            speakingShouldProcess.current = false
                        }
                    }

                });
            }
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * start speech recording and start listen for speaking event
     */
    const startRecording = async () => {
        try {
            if (!stream.current) {
                await onStartStreaming()
            }
            if (stream.current) {
                if (!recorderAudio.current) {
                    const videoElement = videoRecorderRef.current;

                    const {
                        default: { RecordRTCPromisesHandler, MediaStreamRecorder, StereoAudioRecorder },
                    } = await import('recordrtc')
                    // const recorderConfig: Options = {
                    //     mimeType: 'video/webm',
                    //     type: 'video',
                    //     recorderType: MediaStreamRecorder,
                    //     timeSlice: 500,
                    //     canvas: {
                    //         width: 640,
                    //         height: 480
                    //     },
                    //     sampleRate: 44100,
                    //     bufferSize: 16384,
                    //     numberOfAudioChannels: 2,
                    //     frameRate: 12,
                    //     video: videoElement,

                    //     // bitrate: 64000,
                    //     elementClass: 'multi-streams-mixer',
                    //     ondataavailable: onDataAvailable,
                    // }

                    const recorderConfigAudio: Options = {
                        mimeType: 'audio/wav',
                        type: 'audio',
                        // recorderType: StereoAudioRecorder,
                        timeSlice: 500,
                        // sampleRate: 44100,
                        // bufferSize: 16384,
                        // numberOfAudioChannels: 1,
                        ondataavailable: onDataAvailable,
                    }                    
                    recorderAudio.current = new RecordRTCPromisesHandler(
                        stream.current,
                        recorderConfigAudio
                    )
                }
                if (!encoder.current) {
                    const { Mp3Encoder } = await import('lamejs')
                    encoder.current = new Mp3Encoder(1, 44100, 96)
                }
                const recordState = await recorderAudio.current.getState()
                if (recordState === 'inactive' || recordState === 'stopped') {
                    await recorderAudio.current.startRecording()
                }
                if (recordState === 'paused') {
                    await recorderAudio.current.resumeRecording()
                }
                setRecording(true)
            }
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * pause speech recording also stop media stream
     */
    const pauseRecording = async () => {
        try {
            if (recorderAudio.current) {
                const recordState = await recorderAudio.current.getState()
                if (recordState === 'recording') {
                    await recorderAudio.current.pauseRecording()
                }
                setRecording(false)
            }
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * stop speech recording and start the transcription
     */
    const stopRecording = async () => {
        try {
            if (recorderAudio.current) {
                const recordState = await recorderAudio.current.getState()
                if (recordState === 'recording' || recordState === 'paused') {
                    await recorderAudio.current.stopRecording()
                }
                onStopStreaming()
                setRecording(false)

                await recorderAudio.current.destroy()
                chunks.current = []
                if (encoder.current) {
                    encoder.current.flush()
                    encoder.current = undefined
                }
                recorderAudio.current = undefined
            }
        } catch (err) {
            console.error(err)
        }
    }


    const onStartSpeaking = () => {
        console.log('start speaking')
        setSpeaking(true)
    }

    const onStopSpeaking = () => {
        console.log('stop speaking')
        setSpeaking(false)
    }



    /**
     * stop media stream event
     * - remove hark speaking detection listeners
     * - stop all media stream tracks
     * - clear media stream from ref
     */
    const onStopStreaming = () => {
        if (listener.current) {
            // @ts-ignore
            listener.current.off('speaking', onStartSpeaking)
            // @ts-ignore
            listener.current.off('stopped_speaking', onStopSpeaking)
            listener.current = undefined
        }
        if (stream.current) {
            stream.current.getTracks().forEach((track) => track.stop())
            stream.current = undefined
        }
    }


    const onDataAvailable = async (blob: Blob) => {
        console.log("receivedddassss", blob.type)
        console.log("receivedddassssa", blob)

        // const d = {'time':moment(), data:blob}

        sendDataToSocket(blob)
        // console.log("calledTTF Data Rec", ttsRef.current, speakingShouldProcess.current)

        // if (!ttsRef.current && speakingShouldProcess.current === true) {
        //     accumulatedBlobs.current.push(blob);
        //     // processBlobAudio()
        // }

    }



    const onWhispered = async (file: File, referenceId) => {
        // Cancel the previous request if it exists
        if (cancelTokenSource.current) {
            cancelTokenSource.current.cancel("Request canceled due to new request");
        }

        // Create a new cancel token source for the current request
        cancelTokenSource.current = axios.CancelToken.source();

        const whisperConfig = {
            apiKey: '',
            autoStart: false,
            mode: 'transcriptions',
            response_format: 'json',
            temperature: 0.2
        };

        const body = new FormData();
        body.append('file', file);
        body.append('model', 'whisper-1');
        body.append('language', 'en');
        body.append('prompt', "");
        body.append('response_format', whisperConfig.response_format);
        body.append('temperature', `${whisperConfig.temperature}`);

        const headers: RawAxiosRequestHeaders = {};
        headers['Content-Type'] = 'multipart/form-data';
        headers['Authorization'] = `Bearer ${OPENAI_API_TOKEN}`;

        try {
            const response = await axios.post(whisperApiEndpoint + whisperConfig.mode, body, {
                headers,
                cancelToken: cancelTokenSource.current.token // Associate the cancel token with the request
            });
            console.log("cancelled request processed", response.data.text)

            return { text: response.data.text, referenceId };
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle cancellation logic here if needed
                console.log("Request was canceled:", error.message);
            } else {
                // Handle other errors
                console.error("Request failed:", error);
            }
            console.log("cancelled request")
            return null;
        } finally {
            console.log("cancelled request 2")

            // Reset the cancel token source
            cancelTokenSource.current = null;
        }
    };




    /**
     * to turn on mic when tts completes
     */
    useEffect(() => {
        if (!isTtfSpeaking && buttonConditional === 'processing') {
            if (speaking_type.current === SPEAK_TYPE_API) {
                // validateProceedStartListening();
                speaking_type.current = SPEAK_TYPE_AWAITING_USER_RESPONSE
                // turnOnMicAndAudioRecording();
            }
        }

    }, [isTtfSpeaking])


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
            setMute(false)
        }

    }
    const validateProceedStartListening = async () => {
        if (!isRecording) {
            startRecording()
            setIsRecording(true);
            setMute(false);
        }
    }


    const resetLastMessage = () => {
        activeResponseText.current = '';
        accumulatedBlobs.current = []
        const newid = generateRandomID()
        activeResponseTextId.current = newid
    }

    const proceedHandleResponse = ({ params, response }) => {

        const isUserDidntInterrupt = lastSpokeActiveTime.current === params.lastSpokeActiveTime

        console.log("Handle Response 01", lastSpokeActiveTime.current === params.lastSpokeActiveTime, lastSpokeActiveTime.current, params.lastSpokeActiveTime)
        if (isUserDidntInterrupt || params.message === 'start') {
            setProcessCallInprogress(false)
            const { response_text, message_type, response_type } = response?.details?.next_step[0]
            const { keywords } = response?.details

            console.log("Handle Response 012", JSON.stringify(response?.details))

            if (message_type === "SPEAK" && window.location.pathname === `/interview/${schedule_id}`) {
                // proceedStopListening()
                resetLastMessage()
                console.log("Handle Response 0123", )


                speak(response_text);
                speaking_type.current = SPEAK_TYPE_API

                try {
                    if (keywords.length > 0) {
                        setPromptText(keywords)
                    }

                }
                catch (e) {

                }
            }

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

    const proceedgetChatDetailsApiHandler = (customParams = {}, transcribedReferenceId) => {
        setProceedResponse(false)
        setProcessCallInprogress(true)
        const userSpeakingDetails = {
            lastSpokeActiveTime: lastSpokeActiveTime.current,
            lastTranscriptionStartTime: lastTranscriptionStartTime,
            lastTranscriptionEndTime: lastTranscriptionEndTime,
        }
        try {
            clearTimeout(responseDelayTimeOutRef.current)
        }
        catch (e) {

        }

        if (activeResponseText.current !== 'start') {
            responseDelayTimeOutRef.current = setTimeout(() => {
                setProceedResponse(true)
            }, 2500)

        }

        const params = {
            message: activeResponseText.current,
            message_id: activeResponseTextId.current,
            schedule_id: schedule_id,
            ...customParams,
            ...userSpeakingDetails
        };

        proceedCallLoader.show();


        if (params.message && params.message !== '') {
            dispatch(
                getStartChat({
                    params,
                    onSuccess: (response: any) => () => {
                        proceedCallLoader.hide();

                        if (activeResponseText.current === 'start') {
                            setProceedResponse(true)
                        }
                        console.log("Handle Response 0121", transcriptionReferenceId.current === transcribedReferenceId, transcriptionReferenceId.current, transcribedReferenceId)
                        if (transcriptionReferenceId.current === transcribedReferenceId) {
                            setResponseDump({ params: params, response: response })
                        }
                        else {
                            setResponseDump(undefined)
                        }

                    },
                    onError: (error: any) => () => {
                        proceedCallLoader.hide();
                        showToast(error?.error_message, 'error')
                    },
                })
            );
        }

    };

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



    function webCamHandler() {
        setShowCam(!showCam)
    }


    function micMuteHandler() {
        setMute(!mute)
    }


    function startInterviewHandler() {
        transcriptionReferenceId.current = generateRandomID()
        proceedgetChatDetailsApiHandler({ message: "start" }, transcriptionReferenceId.current)
        setTimeout(()=>{
            validateProceedStartListening()
        },3000)
    }

    function endInterviewHandler() {
        isScreenRecording && stopScreenRecording();
        goBack();
    }


    const IV_SPEAKING = 1
    const IV_IDLE = 2
    const IV_PROCESSION = 3


    const IE_SPEAKING = 1
    const IE_IDLE = 2


    const interviewer_state = isTtfSpeaking ? IV_SPEAKING : processCallInprogress ? IV_PROCESSION : IV_IDLE
    const interviewee_state = voiceUp ? IE_SPEAKING : IE_IDLE


    return (
        <div className='h-100vh' style={{
            backgroundColor: "#1B1B1B"
        }}>

            {scheduleInfo &&
                <>
                    {activeResponseText.current !== 'start' &&
                        <>
                            <CallHeader webcam={showCam} mic={mute} onWebCamChange={webCamHandler} onMicChange={micMuteHandler} onEndClick={endInterviewHandler} />
                            <div style={{backgroundColor:'red'}} ref={videoRecorderRef}>
                            <div  className='h-100 d-flex justify-content-center align-items-center'>
                                <div>
                                    <div className='row  justify-content-center align-items-center'>
                                        <div className='text-center col-5'>
                                            <AnimatedImage show={interviewer_state === IV_PROCESSION} name={getShortName(scheduleInfo?.interviewer_name)} shouldBlink={interviewer_state === IV_SPEAKING} />
                                        </div>
                                        <div className='mx-4'></div>
                                        <div className='text-center col-5'>
                                            <AnimatedImage show={false} name={getShortName(scheduleInfo?.interviewee_name)} shouldBlink={interviewee_state === IE_SPEAKING} showWebCam={showCam} />
                                        </div>
                                        <div className='text-center col-5'>
                                            <h3 className='display-3 mb-4 text-white'>{capitalizeFirstLetter(scheduleInfo?.interviewer_name)}</h3>
                                        </div>
                                        <div className='mx-4'></div>
                                        <div className='text-center col-5'>
                                            <h3 className='display-3 mb-4 text-white'>{capitalizeFirstLetter(scheduleInfo?.interviewee_name)}</h3>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </div>

                        </>
                    }
                    {
                    activeResponseText.current === 'start' ?
                        
                        <Guidelines
                            scheduleInfo = {scheduleInfo}
                            loading={proceedCallLoader.loader}
                            heading={scheduleInfo?.interviewee_expected_designation}
                            onClick={startInterviewHandler}
                        />
                        :
                        <></>
                    }

                </>
            }

            {loader.loader && <div className='d-flex align-items-center justify-content-center h-100'><Spinner color={'white'} /></div>}
            {
                !loader.loader && !scheduleInfo &&
                <div className='d-flex align-items-center justify-content-center h-100'>
                    <div className='text-center'>
                        <h4 className="display-4 mb-0 text-white">Technical breakdown please try again</h4>
                        <div className='my-3'></div>
                        <Button text={'Try Again'} onClick={getBasicInfo} />
                    </div>
                </div>
            }
        </div >
    )
}

export { Call };


