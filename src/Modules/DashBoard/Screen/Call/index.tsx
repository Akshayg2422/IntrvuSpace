import { Modal, showToast } from '@Components';
import { useModal, useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';
import { CallScreen } from '@Modules';
import { getScheduleBasicInfo, getStartChat, screenRecordingPermission } from '@Redux';
import { ROUTES } from '@Routes';
import hark from 'hark';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SPEAK_PROCEED_LIST } from '@Utils'
import { log } from 'console';
import moment from 'moment';


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


function Call() {

    const compare_moment_format = 'YYYY-MM-DDHH:mm:ss'
    const { isTtfSpeaking, speak } = useTextToSpeech();

    function generateRandomID() {
        const min = 100000;
        const max = 999999;
        const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomID;
    }


    const activeResponseText = useRef<any>('start');
    // const [activeResponseTextId, setActiveResponseTextId] = useState<any>(generateRandomID());
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

    const accumulatedBlobs = useRef<any>([]);
    const [errorType1, setErrorType1] = useState('')

    const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();

    const OPENAI_API_TOKEN = "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"
    const SPEAK_TYPE_NOT_INITIATED = "SPEAK_TYPE_NOT_INITIATED"
    const SPEAK_TYPE_API = "SPEAK_TYPE_API"
    const SPEAK_TYPE_AWAITING_USER_RESPONSE = "SPEAK_TYPE_AWAITING_USER_RESPONSE"
    const SPEAK_TYPE_USER_SPEAKING = "SPEAK_TYPE_USER_SPEAKING"

    const speaking_type = useRef<any>(SPEAK_TYPE_NOT_INITIATED);
    const proceedResponseBufferTime = useRef<any>(moment());
    const cancelTokenSource = useRef<any>(null);


    /**
     * record config starts here ==================================
     */




    const speakingShouldProcess = useRef<any>(false);

    const chunks = useRef<Blob[]>([])
    const encoder = useRef<Encoder>()
    const listener = useRef<Harker>()
    const recorder = useRef<RecordRTCPromisesHandler>()
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

    const ttsRef = useRef<any>(false);


    /**
     * Handle Speech To text Starts
     */


    useEffect(()=>{
        ttsRef.current = isTtfSpeaking
    },[isTtfSpeaking])

    useEffect(() => {
        return () => {
            if (chunks.current) {
                chunks.current = []
            }
            if (encoder.current) {
                encoder.current.flush()
                encoder.current = undefined
            }
            if (recorder.current) {
                recorder.current.destroy()
                recorder.current = undefined
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
                    if(ttsRef.current)
                    {
                        voiceUpCount.current = 0
                        speakingShouldProcess.current = false
                        if(voiceUp === true)
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

                        const limitDateTime = currentDate.add(4, 'seconds');
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
                    else{


                    if (voiceUpCount.current == 2)
                    {

                        // const limitDateTime = currentDate.add(4, 'seconds');
                        // voiceUpTime.current = limitDateTime
                    }
                    if (currentDate > voiceUpTime.current) {
                        console.log("voiceUpCount.currentaaav", voiceUpCount.current)
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
                if (!recorder.current) {
                    const {
                        default: { RecordRTCPromisesHandler, StereoAudioRecorder },
                    } = await import('recordrtc')
                    const recorderConfig: Options = {
                        mimeType: 'audio/wav',
                        numberOfAudioChannels: 1,
                        recorderType: StereoAudioRecorder,
                        sampleRate: 44100,
                        timeSlice: 3000,
                        type: 'audio',
                        ondataavailable: onDataAvailable,
                    }
                    recorder.current = new RecordRTCPromisesHandler(
                        stream.current,
                        recorderConfig
                    )
                }
                if (!encoder.current) {
                    const { Mp3Encoder } = await import('lamejs')
                    encoder.current = new Mp3Encoder(1, 44100, 96)
                }
                const recordState = await recorder.current.getState()
                if (recordState === 'inactive' || recordState === 'stopped') {
                    await recorder.current.startRecording()
                }
                if (recordState === 'paused') {
                    await recorder.current.resumeRecording()
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
            if (recorder.current) {
                const recordState = await recorder.current.getState()
                if (recordState === 'recording') {
                    await recorder.current.pauseRecording()
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
            if (recorder.current) {
                const recordState = await recorder.current.getState()
                if (recordState === 'recording' || recordState === 'paused') {
                    await recorder.current.stopRecording()
                }
                onStopStreaming()
                setRecording(false)

                await recorder.current.destroy()
                chunks.current = []
                if (encoder.current) {
                    encoder.current.flush()
                    encoder.current = undefined
                }
                recorder.current = undefined
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



    const processBlobAudio = async () => {
        const currentItemRefId = generateRandomID()
        transcriptionReferenceId.current = currentItemRefId
        if (encoder.current && recorder.current) {

            let blob = new Blob(accumulatedBlobs.current, { type: 'audio/wav' });
            setTranscribing(true)
            setLastTranscriptionStartTime(moment().format(compare_moment_format))
            const buffer = await blob.arrayBuffer()
            const mp3 = encoder.current.encodeBuffer(new Int16Array(buffer))
            blob = new Blob([mp3], { type: 'audio/mpeg' })
            if (mp3.byteLength > 225) {
                const file = new File([blob], 'speech.mp3', { type: 'audio/mpeg' })
                const rrr = await onWhispered(file, currentItemRefId)
                if (rrr) {
                    const { text, referenceId } = rrr
                    activeResponseText.current = text

                    console.log(transcriptionReferenceId.current + '======' + referenceId);

                    if (transcriptionReferenceId.current === referenceId) {
                        proceedgetChatDetailsApiHandler({}, referenceId)
                    }
                }
            }
            setLastTranscriptionEndTime(moment().format(compare_moment_format))
            setTranscribing(false)
        }

    }

    const onDataAvailable = async (blob: Blob) => {
        console.log("calledTTF Data Rec", ttsRef.current, speakingShouldProcess.current)
        if (!ttsRef.current && speakingShouldProcess.current === true) {
            accumulatedBlobs.current.push(blob);
            processBlobAudio()
        }

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



    // const onWhispered = async (file: File, referenceId) => {

    //     const whisperConfig = {
    //         apiKey: '',
    //         autoStart: false,
    //         mode: 'transcriptions',
    //         response_format: 'json',
    //         temperature: 0.2
    //     }
    //     // Whisper only accept multipart/form-data currently
    //     const body = new FormData()
    //     body.append('file', file)
    //     body.append('model', 'whisper-1')
    //     body.append('language', 'en')
    //     body.append('prompt', "")
    //     body.append('response_format', whisperConfig.response_format)
    //     body.append('temperature', `${whisperConfig.temperature}`)
    //     const headers: RawAxiosRequestHeaders = {}
    //     headers['Content-Type'] = 'multipart/form-data'
    //     headers['Authorization'] = `Bearer ${OPENAI_API_TOKEN}`
    //     const { default: axios } = await import('axios')
    //     const response = await axios.post(whisperApiEndpoint + whisperConfig.mode, body, {
    //         headers,
    //     })
    //     return { text: response.data.text, referenceId }
    // }




    /**
     * record config ends here ==================================
     */


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
        // validateProceedStartListening();
    }, [])



    /**
     * to turn on mic when tts completes
     */
    useEffect(() => {
        if (!isTtfSpeaking && buttonConditional === 'processing') {
            if (speaking_type.current === SPEAK_TYPE_API) {
                validateProceedStartListening();
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
            setMicState(false)
        }

    }
    const validateProceedStartListening = async () => {
        if (!isRecording) {
            startRecording()
            setIsRecording(true)
            setMicState(false)
        }
    }

    const handleMicControl = () => { }


    const resetLastMessage = () => {
        // console.log("referenceTextId01a", activeResponseTextId)
        activeResponseText.current = ''
        accumulatedBlobs.current = []
        const newid = generateRandomID()
        // setActiveResponseTextId(newid)
        activeResponseTextId.current = newid
        console.log("referenceTextId01b")

    }

    const proceedHandleResponse = ({ params, response }) => {
        // console.log("ressssssssssss01", activeResponseText.current, params.message)
        const isUserDidntInterrupt = lastSpokeActiveTime.current === params.lastSpokeActiveTime
        console.log("isUserDidntInterrupt", lastSpokeActiveTime.current, params.lastSpokeActiveTime, isUserDidntInterrupt)


        if (isUserDidntInterrupt || params.message === 'start') {

            console.log("isUserDidntInterrupt started speaking")
            const { response_text, message_type, response_type } = response?.details?.next_step[0]
            const { keywords } = response?.details

            if (message_type === "SPEAK" && response_text && response_text !== '' && window.location.pathname === `/interview/${schedule_id}`) {
                // proceedStopListening()
                resetLastMessage()

                speak(response_text);
                speaking_type.current = SPEAK_TYPE_API

                try
                {
                    if (keywords.length > 0) {
                        setPromptText(keywords)
                    }
    
                }
                catch(e)
                {

                }
            }
            if (response_type === 'INTERVIEWER_END_CALL') {
                proceedStopListening()
                setButtonConditional('end')
            }
        }
    }
    

    useEffect(() => {
        // console.log("procceddhandd")
        if (responseDump && proceedResponse) {
            proceedHandleResponse(responseDump)
        }
    }, [responseDump, proceedResponse])

    const proceedgetChatDetailsApiHandler = (customParams = {}, transcribedReferenceId) => {
        setProceedResponse(false)
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
            }, 500)

        }

        const params = {
            message: activeResponseText.current,
            message_id: activeResponseTextId.current,
            schedule_id: schedule_id,
            ...customParams,
            ...userSpeakingDetails
        };

        console.log("referenceTextId012",  JSON.stringify(params))

        if(params.message && params.message !== '')
        {
        dispatch(
            getStartChat({
                params,
                onSuccess: (response: any) => () => {
                    // console.log("ressssssssssss012", activeResponseTextId.current, activeResponseText.current)
                    if (activeResponseText.current == 'start') {
                        setProceedResponse(true)
                    }
                    if (transcriptionReferenceId.current === transcribedReferenceId) {
                        setResponseDump({ params: params, response: response })
                    }
                    else {
                        setResponseDump(undefined)
                    }

                },
                onError: (error: any) => () => {
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


    const handleVideo = () => {
        setShowVideo(!showVideo)
    }


    // console.log(activeResponseTextId.current+'======activeResponseTextId');
    

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
                    errorType1 = {errorType1}
                    conditionalButton={buttonConditional}
                    micDisable={isTtfSpeaking}
                    isMute={isRecording}
                    startButtonOnclick={() => {
                        setButtonConditional('processing')
                        transcriptionReferenceId.current = generateRandomID()
                        proceedgetChatDetailsApiHandler({ message: "start" }, transcriptionReferenceId.current)
                        validateProceedStartListening()
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


