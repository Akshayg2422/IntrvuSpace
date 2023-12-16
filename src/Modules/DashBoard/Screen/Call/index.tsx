import { icons } from "@Assets";
import {
  AnimatedImage,
  Back,
  Button,
  Image,
  Modal,
  Spinner,
  StatusIcon,
} from "@Components";
import { useLoader, useModal, useNavigation, useScreenRecorder } from "@Hooks";
import {
  CallHeader,
  CallHeaderMobile,
  ContactHrModal,
  Guidelines,
  Report,
} from "@Modules";
import {
  canStartInterview,
  closeInterview,
  getScheduleBasicInfo,
} from "@Redux";
import { CALL_WEBSOCKET } from "@Services";
import { color } from "@Themes";
import {
  BROWSER_PERMISSION_CONTEXT,
  ENTIRE_SCREEN_CONTEXT,
  capitalizeFirstLetter,
  getBrowserInfo,
  getOperatingSystem,
  getShortName,
  hasCameraPermission,
  hasMicrophonePermission,
} from "@Utils";
import type { Harker } from "hark";
import type { Encoder } from "lamejs";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";

const compare_moment_format = "YYYY-MM-DDHH:mm:ss";

let INTERVAL_TIME = 5000;

const NETWORK_DESIGN = [
  {
    id: "1",
    height: 3,
    network: 5,
  },
  {
    id: "2",
    height: 5,
    network: 4,
  },
  {
    id: "3",
    height: 7,
    network: 3,
  },
  {
    id: "4",
    height: 9,
    network: 2,
  },
  {
    id: "5",
    height: 11,
    network: 1,
  },
];

function Call() {
  const SPEECH_VOICE_UP = 47;

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const socketInterviewRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const speakingShouldProcess = useRef<any>(false);

  const chunks = useRef<Blob[]>([]);
  const encoder = useRef<Encoder>();
  const listener = useRef<Harker>();
  const recorderAudio = useRef<RecordRTCPromisesHandler>();
  // const recorderAudio = useRef<RecordRTCPromisesHandler>()

  const stream = useRef<MediaStream>();
  const timeout = useRef<any>({});
  const mapIdRef = useRef<any>();

  const [recording, setRecording] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [transcribing, setTranscribing] = useState<boolean>(false);
  const lastSpokeActiveTime = useRef<any>(
    moment().format(compare_moment_format)
  );
  const [lastTranscriptionStartTime, setLastTranscriptionStartTime] =
    useState<any>(moment().format(compare_moment_format));
  const [lastTranscriptionEndTime, setLastTranscriptionEndTime] = useState<any>(
    moment().format(compare_moment_format)
  );

  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);

  const [voiceUp, setVoiceUp] = useState<boolean>(false);
  const voiceUpCount = useRef<any>(0);
  const voiceUpTime = useRef<any>(moment());
  const startStreamTime = useRef<any>();

  const intitalRequestSent = useRef<any>(false);

  const transcriptionReferenceId = useRef<any>();
  const audioElementRef = useRef<any>();
  const mutedRef = useRef<any>(false);
  const activeResponseTextId = useRef<any>();
  // const { isTtfSpeaking, speak } = useTextToSpeech();
  const ambianceVolume = useRef<any>(65);
  const decibleCollection = useRef<any>([]);
  const isVoiceUpCurrentChunk = useRef<any>(false);

  const closeCall = useRef<any>(false);
  const [isTtfSpeaking, setIsTtfSpeaking] = useState<boolean>(false);

  const [networkError, setNetworkError] = useState(false);
  const [networkErrorResponse, setNetworkErrorResponse] =
    useState<any>(undefined);

  const [websocketError, setWebSocketError] = useState(false);

  const lastAiResponseTime = useRef<any>(undefined);
  const canConnect = useRef<any>(true);
  const isSpeakingRef = useRef<any>(false);
  const voiceUpSaturation = useRef<any>(1);

  const [networkBreakTime, setNetworkBreakTime] = useState(0);

  // microphone permission states

  const micPermissionModal = useModal(false);

  const WEBSOCKET_PROCESSING = 1;
  const WEBSOCKET_IDLE = -1;
  const websocketStatus = useRef(WEBSOCKET_IDLE);

  /**
   * permission modal
   *
   */

  const browserSpeakPermission = useModal(false);
  const [aiResponse, setAiResponse] = useState(undefined);

  function generateRandomID() {
    const min = 100000;
    const max = 999999;
    const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomID;
  }

  const speak = (ttsBase64) => {
    setIsTtfSpeaking(true);

    const ttsData = Array.from(atob(ttsBase64));
    const audioBlob = new Blob(
      [new Uint8Array(ttsData.map((char) => char.charCodeAt(0)))],
      { type: "audio/wav" }
    );

    if (audioElementRef.current && !audioElementRef.current.paused) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }

    // Create an audio element and play the received TTS audio
    audioElementRef.current = new Audio(URL.createObjectURL(audioBlob));
    audioElementRef.current.onerror = function (event) {
      setIsTtfSpeaking(false);
    };

    audioElementRef.current.onloadstart = function () { };
    audioElementRef.current.onended = function () {
      setIsTtfSpeaking(false);
      if (closeCall.current === true) {
        proceedStopListening();
        setButtonConditional("end");
        getBasicInfo();
        window.location.reload();
      }
    };

    audioElementRef.current.play().catch((error) => {
      browserSpeakPermission.show();
    });
  };

  function onEndCallHandler() {
    proceedStopListening();
    setButtonConditional("end");
    if (audioElementRef.current) audioElementRef.current.pause();
    getBasicInfo();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  const activeResponseText = useRef<any>("start");
  // const [activeResponseText, setActiveResponseText] = useState('start');

  // const [activeResponseTextId, setActiveResponseTextId] = useState<any>(generateRandomID());
  const lastTranscribedText = useRef<any>("");

  const { goBack, goTo } = useNavigation();
  const dispatch = useDispatch();
  let { schedule_id } = useParams();
  let callModel = useModal(true);
  const { scheduleInfo, recordingPermission,faceVisible } = useSelector(
    (state: any) => state.DashboardReducer
  );
  console.log(scheduleInfo,"faceVisible");
  const faceVisibleRef = useRef(null)
  faceVisibleRef.current = faceVisible
  

  const [processCallInprogress, setProcessCallInprogress] = useState(false);

  const responseDelayTimeOutRef = useRef<any>(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [buttonConditional, setButtonConditional] = useState<any>("start");
  const [errorType1, setErrorType1] = useState("");

  const proceedOpenCallView = useRef<any>(false);
  const accumulatedBlobs = useRef<any>([]);
  const reconnectAttempts = useRef<any>(0);
  const maxReconnectAttempts = 3;
  let reconnectInterval: any = null;
  const startInterviewLoader = useLoader(false);

  const socketRef = useRef<any>(null);
  const videoRecorderRef = useRef(null);

  const interviewLimitModal = useModal(false);
  const camPermissionModal = useModal(false);

  const handleRecordingStatusChange = () => {
    // Do something with the updated recording status
    console.log("Screen recording status changed:");
    endInterviewHandler();
  };

  const {
    startScreenRecording,
    stopScreenRecording,
    isScreenRecording,
    recordStatus,
    setRecordStatus,
    recordedAudioData,
    setRecordedAudioData,
    recordedVideoData,
    isScreenRecordingReady,
    setIsScreenRecordingReady,
  } = useScreenRecorder(handleRecordingStatusChange);

  const [isConfirmRecordingModalOpen, setIsConfirmRecordingModalOpen] =
    useState(false);
  const [isCancelRecording, setIsCancelRecording] = useState(false);
  const [isEnableRecording, setIsEnableRecording] = useState(false);

  const [isForceRecord, setIsForceRecord] = useState(true); // static state to force record by default setting false

  const openBrowserNotSupportedModal = useModal(false);

  const [callvalidating, setcallValidating] = useState(false);

  const [isWebCamOff, setIsWebcamOff] = useState(false)

  {
    /** interview recording useEffect */
  }

  

  useEffect(() => {
    if (recordStatus) {
      startInterviewHandler();
    } else if (recordStatus === false) {
      setIsConfirmRecordingModalOpen(true);
      setRecordStatus(undefined);
    }
    return () => {
      if (recordStatus) {
        onEndCallHandler();
      }
    };
  }, [recordStatus, isConfirmRecordingModalOpen]);

  const proceedHandleResponseV1 = (response) => {
    setProcessCallInprogress(false);
    //// console.log("SpeakText01", response);
    if (response.type === "PRO") {
      lastAiResponseTime.current = undefined;
      setNetworkBreakTime(0);
      const { data, rt, uu_action, mapId } = response.next_step[0];
      setAiResponse(data);
      //// console.log("response.next_step[0]", response.next_step[0]);

      if (
        data &&
        data !== "" &&
        window.location.pathname === `/interview/${schedule_id}`
      ) {
        //// console.log("resss011");
        resetLastMessage();
        speak(data);
        mapIdRef.current = mapId;
      }

      if (uu_action === "INTERVIEWER_END_CALL") {
        closeCall.current = true;
      }
    } else if (response.type === "ACK") {
      if (!lastAiResponseTime.current) {
        lastAiResponseTime.current = moment();
      } else {
        const currentTime = moment();

        if (currentTime.isValid() && lastAiResponseTime.current.isValid()) {
          const duration = moment.duration(
            currentTime.diff(lastAiResponseTime.current)
          );
          const minutes = Math.floor(duration.asMinutes());
          setNetworkBreakTime(minutes);
        } else {
          //// console.log("Invalid time format");
        }
      }
    }
  };

  function initiateSocket() {
    createWebSocket();
    socketInterviewRef.current = setInterval(() => {
      createWebSocket(true);
      if (proceedOpenCallView.current && socketRef.current) {
        openCallView();
        proceedOpenCallView.current = false;
      }
    }, 3000);
  }

  const stopIntervalSocket = () => {
    if (socketInterviewRef.current !== null) {
      clearInterval(socketInterviewRef.current);
      socketInterviewRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopIntervalSocket();

      if (socketRef.current) {
        try {
          canConnect.current = false;
          socketRef.current.close();
          socketRef.current = null;
        } catch (e) { }
        clearInterval(reconnectInterval);
      }
    };
  }, []);

  // Create the WebSocket connection only if it's not already established

  function createWebSocket(showError = true) {
    if (!socketRef.current && canConnect.current) {
      socketRef.current = new WebSocket(CALL_WEBSOCKET);
      websocketStatus.current = WEBSOCKET_PROCESSING;

      socketRef.current.addEventListener("open", () => {
        //// console.log('Web Socket Opened');

        websocketStatus.current = WEBSOCKET_IDLE;

        setWebSocketError(false);

        // Clear the reconnect interval when the connection is open
        clearInterval(reconnectInterval);
        reconnectAttempts.current = 0; // Reset the reconnect attempts counter
      });

      socketRef.current.addEventListener("onerror", () => {
        socketRef.current = undefined;
      });

      socketRef.current.addEventListener("close", () => {
        socketRef.current = undefined;
      });

      // Listen for messages
      socketRef.current.onmessage = (event) => {
        const response = JSON.parse(event.data);
        proceedHandleResponseV1(response);
      };
    }
  }

  const sendDataToSocket = async (
    blob: Blob,
    is_voiceup_current_chunk_state: Boolean
  ) => {
    const syncD = {
      timestamp: moment(),
      schedule_id: schedule_id,
      is_muted: mutedRef.current,
      is_speaking: speakingShouldProcess.current,
      is_tts_speaking: ttsRef.current,
      map_id: intitalRequestSent.current === false ? "1" : mapIdRef.current,
      ie_interaction_chunk_ref_id: activeResponseTextId.current,
      waiting_start_time: intitalRequestSent.current === false ? true : false,
      is_voiceup_current_chunk_state: isSpeakingRef.current,
      proceed_refresh: !intitalRequestSent.current,
      blob_data: "",
      is_paused: faceVisibleRef.current,
      paused_reason: faceVisibleRef.current ? 'face not found' : '',
    };
console.log(syncD,"syncD");


    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      if (intitalRequestSent.current === false) {
        //// console.log("sentrrrrra1", JSON.stringify(syncD))
        socketRef.current.send(JSON.stringify(syncD));
        intitalRequestSent.current = true;
      } else if (
        startStreamTime.current &&
        moment() > startStreamTime.current
      ) {
        if (encoder.current && recorderAudio.current) {
          const buffer = await blob.arrayBuffer();
          const mp3 = encoder.current.encodeBuffer(new Int16Array(buffer));
          if (mp3.byteLength > 225) {
            const file = new File([blob], "speech.wav", { type: "audio/wav" });

            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === "string") {
                const base64String = reader.result.split(",")[1]; // Extract the base64 part
                socketRef.current.send(
                  JSON.stringify({ ...syncD, blob_data: base64String })
                );
              } else {
                //// console.log("t0000000000000000000015")
              }
            };
            reader.readAsDataURL(file);
          } else {
          }
        }
      }
    } else {
      //// console.log("WebSocket connection is not open.");
      createWebSocket(false);
    }
  };

  /**
   * state jayFromJD
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
    ttsRef.current = isTtfSpeaking;
    //// console.log("isTtfSpeakingisTtfSpeakingisTtfSpeaking", isTtfSpeaking)
  }, [isTtfSpeaking]);

  useEffect(() => {
    getBasicInfo();
  }, []);

  const getBasicInfo = () => {
    const params = { schedule_id: schedule_id };

    loader.show();
    dispatch(
      getScheduleBasicInfo({
        params,
        onSuccess: () => () => {
          loader.hide();
          setNetworkError(false);
          setNetworkErrorResponse(undefined);
          interviewLimitModal.hide();
        },
        onError: (response: any) => () => {
          setNetworkErrorResponse(response);
          setNetworkError(true);
          interviewLimitModal.show();
          loader.hide();
        },
      })
    );
  };

  useEffect(() => {
    return () => {
      stopInterval();

      if (chunks.current) {
        chunks.current = [];
      }
      if (encoder.current) {
        encoder.current = undefined;
      }
      if (recorderAudio.current) {
        recorderAudio.current.destroy();
        recorderAudio.current = undefined;
      }
      if (listener.current) {
        // @ts-ignore
        listener.current.off("speaking", onStartSpeaking);
        // @ts-ignore
        listener.current.off("stopped_speaking", onStopSpeaking);
        listener.current.off("volume_change");
        listener.current = null;
      }
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
        stream.current = undefined;
      }
    };
  }, []);

  function addToDecibleCollection(receivedData) {
    decibleCollection.current.push(receivedData);
    // if (decibleCollection.current.length > 30) {
    //     decibleCollection.current.shift();
    // }
    // if (decibleCollection.current.length >= 25 and is) {
    //    const lastIt = decibleCollection.current[decibleCollection.current.length -1]
    //     const decibleCollectionIngorIngnoice =  decibleCollection.current.map((it)=>{
    //         lastIt
    //         decibleCollectionIngorIngnoice

    //     })
    // }
  }

  /**
   * get user media stream event
   * - try to stop all previous media streams
   * - ask user for media stream with a system popup
   * - register hark speaking detection listeners
   */
  const onStartStreaming = async () => {
    try {
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
      }
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (!listener.current) {
        const { default: hark } = await import("hark");
        listener.current = hark(stream.current, {
          interval: 100,
          play: false,
        });
        listener.current.on("speaking", onStartSpeaking);
        listener.current.on("stopped_speaking", onStopSpeaking);
        listener.current.on("volume_change", function (value) {
          // const voiceDetectionSaturation = ambianceVolume.current - 18
          const valueP = Math.abs(value);
          //// console.log("valueP", valueP);

          //// console.log("voiceDetectionSaturation", voiceDetectionSaturation, valueP)

          // addToDecibleCollection(valueP)
          const currentDate = moment();
          //// console.log("value", value)
          if (ttsRef.current) {
            voiceUpCount.current = 0;
            speakingShouldProcess.current = false;
            if (voiceUp === true) setVoiceUp(false);
          } else if (valueP < SPEECH_VOICE_UP) {
            if (voiceUpSaturation.current === 1)
              isVoiceUpCurrentChunk.current = true;
            else {
              voiceUpSaturation.current = voiceUpSaturation.current + 1;
            }

            /**
             * extend waiting time if decibile is of talking size
             */
            if (currentDate < voiceUpTime.current) {
              voiceUpCount.current = voiceUpCount.current + 1;
            } else {
              voiceUpCount.current = 0;
            }

            const limitDateTime = currentDate.add(2, "seconds");
            voiceUpTime.current = limitDateTime;

            if (voiceUpCount.current > 2) {
              setVoiceUp(true);
              setErrorType1("");

              if (voiceUpCount.current === 3) {
                const lastSpokeActiveTimeTemp = moment().format(
                  compare_moment_format
                );
                //// console.log("isUserDidntInterrupt last set value", lastSpokeActiveTimeTemp)
                lastSpokeActiveTime.current = lastSpokeActiveTimeTemp;
              }
              speakingShouldProcess.current = true;
            }
          } else {
            if (voiceUpCount.current == 2) {
              // const limitDateTime = currentDate.add(4, 'seconds');
              // voiceUpTime.current = limitDateTime
            }
            if (currentDate > voiceUpTime.current) {
              //// console.log("voiceUpCount.currentaaav", voiceUpCount.current)
              setErrorType1("Please speak little louder, Your voice is low!");

              voiceUpCount.current = 0;
              setVoiceUp(false);
              speakingShouldProcess.current = false;
            }
          }
        });
      }
    } catch (err) {
      // console.error(err);
    }
  };

  /**
   * start speech recording and start listen for speaking event
   */
  const startRecording = async () => {
    try {
      if (!stream.current) {
        await onStartStreaming();
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

          recorderAudio.current = new RecordRTCPromisesHandler(stream.current, {
            mimeType: "audio/webm",
            type: "audio",
            timeSlice: 500,
            recorderType: StereoAudioRecorder,
            ondataavailable: onDataAvailable,
            sampleRate: 44100,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
          });
        }
        if (!encoder.current) {
          const { Mp3Encoder } = await import("lamejs");
          encoder.current = new Mp3Encoder(1, 44100, 96);
        }
        const recordState = await recorderAudio.current.getState();
        if (recordState === "inactive" || recordState === "stopped") {
          await recorderAudio.current.startRecording();
        }
        if (recordState === "paused") {
          await recorderAudio.current.resumeRecording();
        }
        setRecording(true);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  /**
   * pause speech recording also stop media stream
   */
  const pauseRecording = async () => {
    try {
      if (recorderAudio.current) {
        const recordState = await recorderAudio.current.getState();
        if (recordState === "recording") {
          await recorderAudio.current.pauseRecording();
        }
        setRecording(false);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  /**
   * stop speech recording and start the transcription
   */
  const stopRecording = async () => {
    try {
      if (recorderAudio.current) {
        const recordState = await recorderAudio.current.getState();
        if (recordState === "recording" || recordState === "paused") {
          await recorderAudio.current.stopRecording();
        }
        onStopStreaming();
        setRecording(false);

        await recorderAudio.current.destroy();
        chunks.current = [];
        if (encoder.current) {
          encoder.current.flush();
          encoder.current = undefined;
        }
        recorderAudio.current = undefined;
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const onStartSpeaking = () => {
    console.log("start speaking");
    isSpeakingRef.current = true;
    setSpeaking(true);
  };

  const onStopSpeaking = () => {
    console.log("stop speaking");
    setSpeaking(false);
    isSpeakingRef.current = false;
  };

  /**
   * stop media stream event
   * - remove hark speaking detection listeners
   * - stop all media stream tracks
   * - clear media stream from ref
   */
  const onStopStreaming = () => {
    if (listener.current) {
      // @ts-ignore
      listener.current.off("speaking", onStartSpeaking);
      // @ts-ignore
      listener.current.off("stopped_speaking", onStopSpeaking);
      listener.current = undefined;
    }
    if (stream.current) {
      stream.current.getTracks().forEach((track) => track.stop());
      stream.current = undefined;
    }
    // setIsMicrophoneAllowed(false)
  };

  const onDataAvailable = async (blob: Blob) => {
    //// console.log("receivedddassss", blob)
    //// console.log("receivedddassssa", blob)

    // const d = {'time':moment(), data:blob}

    sendDataToSocket(blob, isVoiceUpCurrentChunk.current);
    isVoiceUpCurrentChunk.current = false;
    voiceUpSaturation.current = 0;
    //// console.log("calledTTF Data Rec", ttsRef.current, speakingShouldProcess.current)

    // if (!ttsRef.current && speakingShouldProcess.current === true) {
    //     accumulatedBlobs.current.push(blob);
    //     // processBlobAudio()
    // }
  };

  const proceedStopListening = () => {
    stopRecording();
    setIsRecording(false);
    // setCallState(CALL_STATE_TRANSCRIBING)
    // lastCallState.current = CALL_STATE_TRANSCRIBING
  };

  const validateProceedStartListening = async () => {
    if (!isRecording) {
      startRecording();

      setIsRecording(true);
      setMute(false);
    }
  };

  const resetLastMessage = () => {
    activeResponseText.current = "";
    accumulatedBlobs.current = [];
    //// console.log("resss012")
    const newid = generateRandomID();
    activeResponseTextId.current = newid;
  };

  function webCamHandler() {
    setShowCam(!showCam);
  }

  function micMuteHandler() {
    mutedRef.current = !mute;
    setMute(!mute);
  }

  const openCallView = () => {
    //call screen recording boolean
    // setIsScreenRecordingReady(true);

    setNetworkError(false);
    startInterviewLoader.hide();
    startStreamTime.current = moment().add(1, "seconds");
    transcriptionReferenceId.current = generateRandomID();
    // proceedgetChatDetailsApiHandler({ message: "start" }, transcriptionReferenceId.current)
    setProcessCallInprogress(false);
    //// console.log("resss0114")
    resetLastMessage();
    setInterviewStarted(true);
    // setTimeout(() => {
    validateProceedStartListening();
  };

  /**
   * can start interview
   */

  const handleCanStartInterview = (params: any) => {
    startInterviewLoader.show();

    dispatch(
      canStartInterview({
        params,
        onSuccess: (res: any) => () => {
          getBasicInfo();
          startInterviewHandler();
          // Clear the interval only after a successful response
          stopInterval();
          startInterviewLoader.hide();
        },
        onError: (error: any) => () => { },
      })
    );
  };

  function canStartInterviewCheckHandler() {
    setcallValidating(true);
    const { can_start_interview, is_video_recording_manditory } = scheduleInfo;

    if (
      (getBrowserInfo().browserName !== "Mozilla Firefox" &&
        getBrowserInfo().browserName !== "Safari") ||
      !is_video_recording_manditory
    ) {
      if (can_start_interview) {
        startInterviewHandler();
      } else {
        const canStartParams = { schedule_id };

        handleCanStartInterview(canStartParams);

        intervalIdRef.current = setInterval(() => {
          handleCanStartInterview(canStartParams);
        }, INTERVAL_TIME);
      }
    } else {
      openBrowserNotSupportedModal.show();
    }
  }

  async function startInterviewHandler() {
    const { is_video_recording_manditory } = scheduleInfo;

    startInterviewLoader.show();
    const hasCamPermission = await hasCameraPermission();
    if (hasCamPermission || !is_video_recording_manditory) {
      camPermissionModal.hide();

      const hasMicPermission = await hasMicrophonePermission();
      if (hasMicPermission) {
        micPermissionModal.hide();
        if (!hasCamPermission) {
          setIsWebcamOff(true)
        }
        if (!recordStatus && is_video_recording_manditory) {
          await startScreenRecording();
        } else if (recordStatus || !is_video_recording_manditory) {
          initiateSocket();

          proceedOpenCallView.current = true;

          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
        }
        // else {
        //   startScreenRecording();
        // }
      } else {
        micPermissionModal.show();
      }
    } else {
      camPermissionModal.show();
    }
  }

  function endInterviewHandler() {
    closeCall.current = true;
    onEndCallHandler();
    stopScreenRecording();
    goBack();
  }

  function closeInterviewAPiHandler() {
    const params = { schedule_id: schedule_id };
    dispatch(
      closeInterview({
        params,
        onSuccess: () => () => {
          endInterviewHandler();
        },
        onError: () => () => { },
      })
    );
  }

  function refreshScreen() {
    window.location.reload();
  }

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  function renderNetworkRange() {
    return NETWORK_DESIGN.map((each, index) => {
      const { id, height, network } = each;

      const isRender = network > networkBreakTime;

      return (
        <div
          key={id}
          style={{
            width: 2,
            height: height,
            backgroundColor: isRender ? color.primary : "white",
            marginLeft: 2,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        ></div>
      );
    });
  }

  const IV_SPEAKING = 1;
  const IV_IDLE = 2;
  const IV_PROCESSING = 3;

  const IE_SPEAKING = 1;
  const IE_IDLE = 2;

  // const interviewee_state = voiceUp && !mute ? IE_SPEAKING : IE_IDLE
  const interviewee_state =
    !mute && isSpeakingRef.current === true ? IE_SPEAKING : IE_IDLE;
  // isVoiceUpCurrentChunk.current &&
  let interviewer_state = IV_IDLE;

  if (isTtfSpeaking) interviewer_state = IV_SPEAKING;
  else if (!voiceUp && !mute) interviewer_state = IV_PROCESSING;

  {
    /**screen recording */
  }

  const closeRecordingModal = () => {
    setIsConfirmRecordingModalOpen(false);
    setIsCancelRecording(false);
    setIsEnableRecording(false);
    startInterviewLoader.hide();
  };

  const confirmForceRecord = () => {
    setIsConfirmRecordingModalOpen(false);
    setIsCancelRecording(false);
    startScreenRecording();
    startInterviewLoader.hide();
  };

  /**
   * network error title based on status code handler
   */

  const getNetworkErrorResponseTitle = (status_code: number) => {
    switch (status_code) {
      case 1:
        return "Opening Closed";

      case 2:
        return "Can't Participate";

      case 3:
        return "Server full";

      case 4:
        return "Can't Participate";

      case 5:
        return "Can't Participate";

      default:
        return "Something went wrong!";
    }
  };

  return (
    <>
      <div
        className="h-100vh"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {!networkError && !websocketError && scheduleInfo && (
          <>
            {interviewStarted && (
              <>
                <div className="d-none d-md-block d-lg-block d-xl-block">
                  <div className="d-flex flex-column h-100vh d-none d-md-block">
                    <div
                      className="position-absolute"
                      style={{
                        top: "3%",
                        left: "3%",
                      }}
                    >
                      <div className="row align-items-center d-flex flex-column flex-md-row">
                        <Back
                          variant={"override"}
                          onClick={endInterviewHandler}
                        />
                        <h4 className="screen-heading mb-0  ml-3 d-none d-md-block">{`Interview for the role of ${scheduleInfo?.interviewee_expected_role}`}</h4>
                        <h4 className="mb-0 font-weight-bolder text-primary ml-3 d-block d-md-none">{`Interview for the role of ${scheduleInfo?.interviewee_expected_role}`}</h4>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row  align-items-center justify-content-center h-100">
                      <div className="d-flex flex-column align-items-center justify-content-center col-md-6">
                        <AnimatedImage
                          show={interviewer_state === IV_PROCESSING}
                          name={getShortName(scheduleInfo?.interviewer_name)}
                          shouldBlink={interviewer_state === IV_SPEAKING}
                          isWebCamOff = {true}
                          endInterview={()=>{}}
                        />
                        <h3 className="display-3 mb-4 text-primary mt-3">
                          {capitalizeFirstLetter(
                            scheduleInfo?.interviewer_name
                          )}
                        </h3>
                      </div>
                      <div className="d-flex flex-column align-items-center justify-content-center col-md-6">
                        <AnimatedImage
                          device={"web"}
                          show={false}
                          showWebCam={showCam}
                          name={getShortName(scheduleInfo?.interviewee_name)}
                          shouldBlink={interviewee_state === IE_SPEAKING}
                          isWebCamOff = {isWebCamOff}
                          endInterview={closeInterviewAPiHandler}
                        />
                        <h3 className="display-3 mb-4 text-primary mt-3">
                          {capitalizeFirstLetter(
                            scheduleInfo?.interviewee_name
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="position-absolute d-flex align-items-center justify-content-center bottom-0 w-100 mb-5">
                      <div className="col-md-6">
                        <CallHeader
                          webcam={
                            scheduleInfo?.is_video_recording_manditory
                              ? true : isWebCamOff ? false
                                : showCam
                          }
                          mic={!mute}
                          onWebCamChange={() => {
                            if (!scheduleInfo?.is_video_recording_manditory && !isWebCamOff) {
                              webCamHandler();
                            }
                          }}
                          onMicChange={micMuteHandler}
                          onEndClick={endInterviewHandler}
                          onEndInterViewClick={closeInterviewAPiHandler}
                        />
                      </div>
                    </div>

                    <div className="position-absolute bottom-4 right-0 mr-3 mb-2 align-items-center">
                      <div className="row align-items-end">
                        {renderNetworkRange()}
                      </div>
                    </div>

                    <div className="position-absolute bottom-0 right-0 mr-4 mb-2 align-items-center">
                      <div className="row align-items-end">
                        <Image src={icons.logoText} height={16} />
                      </div>
                    </div>
                  </div>
                </div>

                {/**
                 * for mobile responsive screen
                 */}

                <div className="d-block d-md-none d-lg-none d-xl-none h-100vh">
                  <div className="d-flex flex-column">
                    <div
                      style={{
                        position: "fixed",
                        width: "100%",
                        height: "90%",
                      }}
                    >
                      <div className="h-100">
                        <div className="position-absolute">
                          <div className="col">
                            <div className="d-flex m-2 align-items-center">
                              <Back
                                variant={"override"}
                                onClick={endInterviewHandler}
                              />
                              <h4 className="mb-0 font-weight-bolder text-primary ml-3">{`Interview for the role of ${scheduleInfo?.interviewee_expected_role}`}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <div>
                            <AnimatedImage
                              show={false}
                              device={"mobile"}
                              showWebCam={showCam}
                              name={getShortName(
                                scheduleInfo?.interviewee_name
                              )}
                              shouldBlink={interviewee_state === IE_SPEAKING}
                              isWebCamOff ={isWebCamOff}
                              endInterview={closeInterviewAPiHandler}
                            />
                            <h3 className="display-3 mb-4  mt-3 text-center">
                              {capitalizeFirstLetter(
                                scheduleInfo?.interviewee_name
                              )}
                            </h3>
                          </div>
                        </div>
                        <div>
                          <div
                            className="position-absolute"
                            style={{
                              bottom: "3%",
                              right: "5%",
                            }}
                          >
                            <div>
                              <AnimatedImage
                                variant={"sm"}
                                show={interviewer_state === IV_PROCESSING}
                                name={getShortName(
                                  scheduleInfo?.interviewer_name
                                )}
                                shouldBlink={interviewer_state === IV_SPEAKING}
                                isWebCamOff={true}
                                endInterview={()=>{}}
                              />
                              <h3 className="font-weight-600 mt-2 text-primary">
                                {" "}
                                {capitalizeFirstLetter(
                                  scheduleInfo?.interviewer_name
                                )}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        height: "10%",
                        backgroundColor: color.callFooter,
                      }}
                    >
                      <CallHeaderMobile
                        webcam={showCam}
                        mic={!mute}
                        onWebCamChange={webCamHandler}
                        onMicChange={micMuteHandler}
                        onEndClick={endInterviewHandler}
                        onEndInterViewClick={closeInterviewAPiHandler}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {!interviewStarted ? (
              <Guidelines
                scheduleInfo={scheduleInfo}
                loading={startInterviewLoader.loader}
                heading={scheduleInfo?.interviewee_expected_designation}
                onClick={canStartInterviewCheckHandler}
                callValidating={callvalidating}
              />
            ) : (
              <></>
            )}
            {scheduleInfo?.is_report_complete &&
              scheduleInfo?.can_view_report ? (
              <Report />
            )
              : scheduleInfo?.is_report_complete && (
                <ContactHrModal
                  onClick={() => {
                    getBasicInfo();
                  }}
                />
              )
            }
          </>
        )}
        {loader.loader && (
          <div className="d-flex align-items-center justify-content-center h-100">
            <Spinner />
          </div>
        )}
        {websocketError && (
          <div className="d-flex align-items-center justify-content-center h-100 ">
            <div className="text-center ">
              <h4 className="display-4 mb-0">
                Technical breakdown please try again
              </h4>
              <div className="my-3"></div>
              <Button
                className="rounded-sm"
                text={"Try Again"}
                onClick={refreshScreen}
              />
            </div>
          </div>
        )}
      </div>

      {/** Microphone access modal */}
      <Modal
        isOpen={micPermissionModal.visible}
        onClose={() => {
          micPermissionModal.hide();
          startInterviewLoader.hide();
        }}
        title={"Microphone Access Required"}
      >
        <div>
          <h3 className="text-gray-dark font-weight-500">
            To continue, grant microphone access:
          </h3>
          <p className="mb-0">{"1. Check browser settings."}</p>
          <p className="mb-0">
            {"2. Enable microphone access in system settings. "}
            <span
              className="pointer text-primary font-weight-700"
            // onClick={gotoPermissionSetting}
            >{`(${getOperatingSystem()})`}</span>
          </p>
        </div>
        <div className="d-flex float-right">
          <Button
            text={"OK"}
            onClick={() => {
              micPermissionModal.hide();
              startInterviewLoader.hide();
            }}
          />
        </div>
      </Modal>

      {/** Browser permission denied modal */}

      <Modal
        isOpen={browserSpeakPermission.visible}
        title={"Permission Denied!"}
      >
        <h3 className="m-0">
          {
            "The interview is blocked of the browser permission issue, Please tap on continue to Proceed."
          }
        </h3>
        <div className="d-flex align-items-center justify-content-center mt-3">
          <Button
            className="rounded"
            text={"Continue"}
            onClick={() => {
              browserSpeakPermission.hide();
              speak(aiResponse);
            }}
          />
        </div>
      </Modal>

      {/** confirm or cancel video recording modal*/}

      <Modal
        title={"Confirm Recording"}
        isOpen={isConfirmRecordingModalOpen}
        onClose={closeRecordingModal}
        buttonText="Confirm"
        onClick={confirmForceRecord}
      >
        <div className="mt--4">
          {ENTIRE_SCREEN_CONTEXT.map((item) => {
            const { id, text } = item;

            return (
              <div key={id}>
                <div className="d-flex align-items-center ">
                  <StatusIcon />
                  <div className="ml-2">{text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      {/**
       * nerowork error
       */}

      <Modal
        isOpen={interviewLimitModal.visible}
        title={getNetworkErrorResponseTitle(networkErrorResponse?.status_code)}
        subTitle={networkErrorResponse?.error_message}
        buttonText="Try Again"
        onClick={() => {
          interviewLimitModal.hide();
          getBasicInfo();
        }}
      />

      {/**
       * Camera permission modal
       */}

      <Modal
        isOpen={camPermissionModal.visible}
        onClose={() => {
          camPermissionModal.hide();
          startInterviewLoader.hide();
        }}
        title={"Camera Permission"}
        subTitle={
          "Please provide access to your web camera to start the interview"
        }
        buttonText="Close"
        onClick={() => {
          camPermissionModal.hide();
          startInterviewLoader.hide();
        }}
      />

      {/**
       * Browser not supported modal
       */}

      <Modal
        isOpen={openBrowserNotSupportedModal.visible}
        onClose={() => {
          openBrowserNotSupportedModal.hide();
          startInterviewLoader.hide();
        }}
        title={"Browser Permission Denied"}
        buttonText="Close"
        onClick={() => {
          openBrowserNotSupportedModal.hide();
          startInterviewLoader.hide();
        }}
      >
        <div className="mt--4">
          {BROWSER_PERMISSION_CONTEXT.map((item) => {
            const { id, text, h } = item;

            return (
              <div key={id}>
                <div className="d-flex align-items-center">
                  <StatusIcon variant={"frame"} />
                  <div className="ml-2">{text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export { Call };
