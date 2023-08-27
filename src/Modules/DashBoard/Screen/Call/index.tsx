import { AnimatedImage, Button, Spinner } from '@Components';
import { useLoader, useModal, useNavigation } from '@Hooks';
import { CallHeader, Guidelines } from '@Modules';
import { getScheduleBasicInfo } from '@Redux';
import { capitalizeFirstLetter, getShortName } from '@Utils';
import type { Harker } from 'hark';
import type { Encoder } from 'lamejs';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RecordRTCPromisesHandler, StereoAudioRecorder } from 'recordrtc';
import { useScreenRecorder } from './useScreenRecorder';
const compare_moment_format = 'YYYY-MM-DDHH:mm:ss';


const GUIDELINES = ["Kindly ensure the use of headphones to optimize audio quality.",
    "Find a quiet and secluded space to minimize background noise and distractions.",
    "Verify the stability of your internet connection to ensure uninterrupted communication.",
    "Keep the video function enabled throughout the session for effective interaction.",
    " We appreciate clear and succinct responses during the conversation."]

function Call() {

    const {
        startScreenRecording,

    } = useScreenRecorder();


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

    const [interviewStarted, setInterviewStarted] = useState<boolean>(false)

    const [voiceUp, setVoiceUp] = useState<boolean>(false)
    const voiceUpCount = useRef<any>(0);
    const voiceUpTime = useRef<any>(moment());
    const transcriptionReferenceId = useRef<any>();
    const audioElementRef = useRef<any>();
    const activeResponseTextId = useRef<any>(generateRandomID());
    // const { isTtfSpeaking, speak } = useTextToSpeech();
    const [isTtfSpeaking, setIsTtfSpeaking] = useState<boolean>(false)

    function generateRandomID() {
        const min = 100000;
        const max = 999999;
        const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomID;
    }

    const speak = (ttsBase64) => {

        setIsTtfSpeaking(true)

        const ttsData = Array.from(atob(ttsBase64));
        const audioBlob = new Blob([new Uint8Array(ttsData.map(char => char.charCodeAt(0)))], { type: 'audio/wav' });

        if (audioElementRef.current && !audioElementRef.current.paused) {
            audioElementRef.current.pause();
            audioElementRef.current.currentTime = 0;
        }

        // Create an audio element and play the received TTS audio
        audioElementRef.current = new Audio(URL.createObjectURL(audioBlob));
        audioElementRef.current.onerror = function (event) {
            console.error("Audio An error occurred:", event);
            setIsTtfSpeaking(false)
        };

        audioElementRef.current.onloadstart = function () {
            console.log("Audio playback started.");
        };
        audioElementRef.current.onended = function () {
            console.log("Audio playback ended.");
            setIsTtfSpeaking(false)
        };
        audioElementRef.current.play();

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
    const [processCallInprogress, setProcessCallInprogress] = useState(false)
    const responseDelayTimeOutRef = useRef<any>(undefined)
    const [isRecording, setIsRecording] = useState(false)
    const [buttonConditional, setButtonConditional] = useState<any>('start')
    const [errorType1, setErrorType1] = useState('')

    const accumulatedBlobs = useRef<any>([]);

    // const { startScreenRecording, stopScreenRecording, isScreenRecording } = useScreenRecorder();

    const socketRef = useRef<any>(null);
    const videoRecorderRef = useRef(null);

    const proceedHandleResponseV1 = (response) => {
        setProcessCallInprogress(false)
        // console.log("SpeakText01", response)
        const { data, rt } = response.next_step[0]
        if (data && data !== '' && window.location.pathname === `/interview/${schedule_id}`) {
            resetLastMessage()
            speak(data);
        }

        if (rt === "INTERVIEWER_END_CALL") {
            console.log("close started2")
            alert("about_to close")
            proceedStopListening()
            setButtonConditional('end')
        }
    }


    useEffect(() => {
        // Create the WebSocket connection only if it's not already established
        if (!socketRef.current) {
            // const socket = new WebSocket('ws://192.168.218.204:8012/aaa');
            const socket = new WebSocket('ws://103.118.188.135:8005/aaa');

            socketRef.current = socket; // Store the WebSocket instance in the ref

            socket.addEventListener('open', () => {
                console.log('WebSocket connection established');
            });

            socket.addEventListener('close', () => {
                console.log('WebSocket connection closed');
            });

            // Listen for messages
            socket.onmessage = event => {
                console.log("Received001")
                const response = JSON.parse(event.data);
                proceedHandleResponseV1(response)
                // Handle the response data here
                console.log('Received002:', response);
            };
        }

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, []);

    const sendDataToSocket = async (blob: Blob) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {

            const buffer = await blob.arrayBuffer()
            if (encoder.current && recorderAudio.current) {
                const buffer = await blob.arrayBuffer()
                const mp3 = encoder.current.encodeBuffer(new Int16Array(buffer))
                if (mp3.byteLength > 225) {

                    const file = new File([blob], 'speech.wav', { type: 'audio/wav' })

                    const reader = new FileReader();
                    reader.onload = () => {

                        if (typeof reader.result === 'string') {
                            const base64String = reader.result.split(',')[1]; // Extract the base64 part
                            const syncD = {
                                timestamp: moment(),
                                schedule_id: schedule_id,
                                blob_data: base64String,
                                is_speaking: speakingShouldProcess.current,
                                is_tts_speaking: ttsRef.current
                            }
                            socketRef.current.send(JSON.stringify(syncD));
                        }
                        else {
                            // console.log("t0000000000000000000015")
                        }
                    }
                    reader.readAsDataURL(file);
                }
                else {
                    // console.log("t0000000000000000000017")

                }

            }
        } else {
            console.log('WebSocket connection is not open.');
        }
    };




    /**
     * state jay
     */

    const loader = useLoader(false);
    const proceedCallLoader = useLoader(false);
    const [showCam, setShowCam] = useState(true);
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
                video: true,
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
                    // console.log("value", value)
                    if (ttsRef.current) {
                        voiceUpCount.current = 0
                        speakingShouldProcess.current = false
                        if (voiceUp === true)
                            setVoiceUp(false)
                    }
                    else if (-value < 47) {

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

                    recorderAudio.current = new RecordRTCPromisesHandler(
                        stream.current,
                        {
                            mimeType: 'audio/webm',
                            type: 'audio',
                            timeSlice: 500,
                            recorderType: StereoAudioRecorder,
                            ondataavailable: onDataAvailable,
                            sampleRate: 44100,
                            desiredSampRate: 16000,
                            numberOfAudioChannels: 1,
                        }
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
        console.log("receivedddassss", blob)
        // console.log("receivedddassssa", blob)

        // const d = {'time':moment(), data:blob}

        sendDataToSocket(blob)
        // console.log("calledTTF Data Rec", ttsRef.current, speakingShouldProcess.current)

        // if (!ttsRef.current && speakingShouldProcess.current === true) {
        //     accumulatedBlobs.current.push(blob);
        //     // processBlobAudio()
        // }

    }



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


    function webCamHandler() {
        setShowCam(!showCam)
    }


    function micMuteHandler() {
        setMute(!mute)
    }


    function startInterviewHandler() {
        transcriptionReferenceId.current = generateRandomID()
        // proceedgetChatDetailsApiHandler({ message: "start" }, transcriptionReferenceId.current)
        setProcessCallInprogress(false)
        resetLastMessage()
        setInterviewStarted(true)
        setTimeout(() => {
            validateProceedStartListening()
        }, 5000)
    }

    function endInterviewHandler() {
        // isScreenRecording && stopScreenRecording();
        goBack();
    }


    const IV_SPEAKING = 1
    const IV_IDLE = 2
    const IV_PROCESSION = 3


    const IE_SPEAKING = 1
    const IE_IDLE = 2


    const interviewer_state = isTtfSpeaking ? IV_SPEAKING : IV_IDLE
    const interviewee_state = voiceUp ? IE_SPEAKING : IE_IDLE


    return (
        <div className='h-100vh' style={{
            backgroundColor: !interviewStarted ? "#FFFFF" : "#1B1B1B"
        }}>
            {scheduleInfo &&
                <>
                    {interviewStarted &&
                        <div className='d-flex flex-column h-100'>
                            <div className='col'>
                                <div className='row h-100' ref={videoRecorderRef}>
                                    <div className='col-sm-6 d-flex flex-column align-items-center justify-content-center'>
                                        <AnimatedImage show={false} name={getShortName(scheduleInfo?.interviewer_name)} shouldBlink={interviewer_state === IV_SPEAKING} />
                                        <h3 className='display-3 mb-4 text-white'>{capitalizeFirstLetter(scheduleInfo?.interviewer_name)}</h3>
                                    </div>
                                    <div className='col-sm-6 d-flex flex-column align-items-center justify-content-center'>
                                        <AnimatedImage show={false} showWebCam={showCam} name={getShortName(scheduleInfo?.interviewer_name)} shouldBlink={interviewer_state === IV_SPEAKING} />
                                        <h3 className='display-3 mb-4 text-white'>{capitalizeFirstLetter(scheduleInfo?.interviewee_name)}</h3>
                                    </div>

                                </div>
                            </div>
                            <div className='position-absolute bottom-0 right-0 left-0' style={{
                                marginBottom: 50
                            }}>
                                <CallHeader webcam={showCam} mic={mute} onWebCamChange={webCamHandler} onMicChange={micMuteHandler} onEndClick={endInterviewHandler} />
                            </div>
                        </div >
                    }
                    {
                        !interviewStarted ?

                            <Guidelines
                                guidelines={GUIDELINES}
                                scheduleInfo={scheduleInfo}
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


