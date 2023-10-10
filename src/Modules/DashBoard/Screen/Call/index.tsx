import { AnimatedImage, Button, Modal, Spinner, } from "@Components";
import { useLoader, useModal, useNavigation } from "@Hooks";
import { CallHeader, Guidelines, Report } from "@Modules";
import {
  getScheduleBasicInfo,
  closeInterview,
  canStartInterview,
} from "@Redux";
import { capitalizeFirstLetter, getShortName, hasMicrophonePermission, getOperatingSystem, gotoPermissionSetting } from "@Utils";
import type { Harker } from "hark";
import type { Encoder } from "lamejs";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";
import { useScreenRecorder } from "./useScreenRecorder";
import { CALL_WEBSOCKET } from "@Services";
import { color } from "@Themes";

const compare_moment_format = "YYYY-MM-DDHH:mm:ss";

const INTERVAL_TIME = 3000;

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

const GUIDELINES = [
  "Kindly ensure the use of headphones to optimize audio quality.",
  "Find a quiet and secluded space to minimize background noise and distractions.",
  "Verify the stability of your internet connection to ensure uninterrupted communication.",
  "Keep the video function enabled throughout the session for effective interaction.",
  " We appreciate clear and succinct responses during the conversation.",
];


function Call() {
  const { startScreenRecording } = useScreenRecorder();

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
  const [websocketError, setWebSocketError] = useState(false);

  const lastAiResponseTime = useRef<any>(undefined);
  const [networkBreakTime, setNetworkBreakTime] = useState(0);

  // microphone permission states


  const micPermissionModal = useModal(false)



  const WEBSOCKET_PROCESSING = 1;
  const WEBSOCKET_IDLE = -1;
  const websocketStatus = useRef(WEBSOCKET_IDLE);


  function generateRandomID() {
    const min = 100000;
    const max = 999999;
    const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log("resss01", randomID)
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
      // console.error("Audio An error occurred:", event);
      setIsTtfSpeaking(false);
    };

    audioElementRef.current.onloadstart = function () {
      // console.log("Audio playback started.");
    };
    audioElementRef.current.onended = function () {
      // console.log("Audio playback ended.");
      setIsTtfSpeaking(false);
      if (closeCall.current === true) {
        proceedStopListening();
        setButtonConditional("end");
        getBasicInfo();
        window.location.reload();
      }
    };
    audioElementRef.current.play();
  };

  function onEndCallHandler() {
    proceedStopListening();
    setButtonConditional("end");
    if (audioElementRef.current)
      audioElementRef.current.pause();
    getBasicInfo();
    window.location.reload();
  }

  const activeResponseText = useRef<any>("start");
  // const [activeResponseText, setActiveResponseText] = useState('start');

  // const [activeResponseTextId, setActiveResponseTextId] = useState<any>(generateRandomID());
  const lastTranscribedText = useRef<any>("");

  const { goBack, goTo } = useNavigation();
  const dispatch = useDispatch();
  let { schedule_id } = useParams();
  let callModel = useModal(true);
  const { scheduleInfo, recordingPermission } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const [processCallInprogress, setProcessCallInprogress] = useState(false);
  const responseDelayTimeOutRef = useRef<any>(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [buttonConditional, setButtonConditional] = useState<any>("start");
  const [errorType1, setErrorType1] = useState("");

  const accumulatedBlobs = useRef<any>([]);
  const reconnectAttempts = useRef<any>(0);
  const maxReconnectAttempts = 3;
  let reconnectInterval: any = null;
  const startInterviewLoader = useLoader(false);

  const socketRef = useRef<any>(null);
  const videoRecorderRef = useRef(null);

  const proceedHandleResponseV1 = (response) => {
    setProcessCallInprogress(false);
    // console.log("SpeakText01", response);
    if (response.type === "PRO") {
      lastAiResponseTime.current = undefined;
      setNetworkBreakTime(0);
      const { data, rt, uu_action, mapId } = response.next_step[0];

      // console.log("response.next_step[0]", response.next_step[0]);

      if (
        data &&
        data !== "" &&
        window.location.pathname === `/interview/${schedule_id}`
      ) {
        // console.log("resss011");
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
          // console.log("Invalid time format");
        }
      }
    }
  };

  // Create the WebSocket connection only if it's not already established

  function createWebSocket(showError = true) {
    // console.log("createWebSocket");

    if (websocketStatus.current !== WEBSOCKET_PROCESSING) {
      const socket = new WebSocket(CALL_WEBSOCKET);
      // const socket = new WebSocket('wss://mockeazyprimary.leorainfotech.in/aaa');

      // const socket = new WebSocket('ws://192.168.105.204:8002/aaa');

      websocketStatus.current = WEBSOCKET_PROCESSING;
      socketRef.current = socket; // Store the WebSocket instance in the ref

      socket.addEventListener("open", () => {
        websocketStatus.current = WEBSOCKET_IDLE;
        // console.log(
        //   "WebSocket connection established==========================="
        // );
        setWebSocketError(false);

        // Clear the reconnect interval when the connection is open
        clearInterval(reconnectInterval);
        reconnectAttempts.current = 0; // Reset the reconnect attempts counter
      });

      socket.addEventListener("close", () => {
        websocketStatus.current = WEBSOCKET_IDLE;
        if (showError) setWebSocketError(true);

        if (reconnectAttempts.current < maxReconnectAttempts) {
          setTimeout(() => {
            createWebSocket();
            reconnectAttempts.current++;
          }, 3000);
        } else {
          clearInterval(reconnectInterval);
          if (!showError) setWebSocketError(true);
        }
      });

      // Listen for messages
      socket.onmessage = (event) => {
        // console.log("Received001");
        const response = JSON.parse(event.data);
        proceedHandleResponseV1(response);
        // Handle the response data here
        // console.log('Received002:', response);
      };
    }
  }

  useEffect(() => {
    // Create the WebSocket when the component mounts
    if (!socketRef.current) {
      createWebSocket();
    }

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        clearInterval(reconnectInterval);
      }
    };
  }, []);

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
      is_voiceup_current_chunk_state: is_voiceup_current_chunk_state,
      proceed_refresh: !intitalRequestSent.current,
      blob_data: "",
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      if (intitalRequestSent.current === false) {
        // console.log("sentrrrrra1", JSON.stringify(syncD))
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
                // console.log("t0000000000000000000015")
              }
            };
            reader.readAsDataURL(file);
          } else {
          }
        }
      }
    } else {
      // console.log("WebSocket connection is not open.");
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
    // console.log("isTtfSpeakingisTtfSpeakingisTtfSpeaking", isTtfSpeaking)
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
        },
        onError: () => () => {
          setNetworkError(true);
          loader.hide();
        },
      })
    );
  };

  useEffect(() => {
    return () => {
      if (chunks.current) {
        chunks.current = [];
      }
      if (encoder.current) {
        encoder.current.flush();
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
        video: true,
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
          // console.log("voiceDetectionSaturation", voiceDetectionSaturation, valueP)

          // addToDecibleCollection(valueP)
          const currentDate = moment();
          // console.log("value", value)
          if (ttsRef.current) {
            voiceUpCount.current = 0;
            speakingShouldProcess.current = false;
            if (voiceUp === true) setVoiceUp(false);
          } else if (valueP < 46) {
            isVoiceUpCurrentChunk.current = true;

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
                // console.log("isUserDidntInterrupt last set value", lastSpokeActiveTimeTemp)
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
              // console.log("voiceUpCount.currentaaav", voiceUpCount.current)
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
    // console.log('start speaking')
    setSpeaking(true);
  };

  const onStopSpeaking = () => {
    // console.log('stop speaking')
    setSpeaking(false);
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
    // console.log("receivedddassss", blob)
    // console.log("receivedddassssa", blob)

    // const d = {'time':moment(), data:blob}

    sendDataToSocket(blob, isVoiceUpCurrentChunk.current);
    isVoiceUpCurrentChunk.current = false;
    // console.log("calledTTF Data Rec", ttsRef.current, speakingShouldProcess.current)

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

  const turnOnMicAndAudioRecording = () => {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
      setMute(false);
    }
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
    // console.log("resss012")
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




  async function startInterviewHandler() {

    const hasMicPermission = await hasMicrophonePermission();

    if (hasMicPermission) {
      micPermissionModal.hide()
      const canStartParams = { schedule_id };

      startInterviewLoader.show();

      const intervalId = setInterval(() => {
        dispatch(
          canStartInterview({
            params: canStartParams,
            onSuccess: (res: any) => () => {
              startInterviewLoader.hide();

              startStreamTime.current = moment().add(1, "seconds");
              transcriptionReferenceId.current = generateRandomID();
              // proceedgetChatDetailsApiHandler({ message: "start" }, transcriptionReferenceId.current)
              setProcessCallInprogress(false);
              // console.log("resss0114")
              resetLastMessage();
              setInterviewStarted(true);
              // setTimeout(() => {
              validateProceedStartListening();
              // }, 5000)
              clearInterval(intervalId);
            },
            onError: (error: any) => () => {
              // console.log(error);
            },
          })
        );
      }, INTERVAL_TIME);
    } else {
      micPermissionModal.show()
    }
  }

  function endInterviewHandler() {
    // isScreenRecording && stopScreenRecording();
    closeCall.current = true;
    onEndCallHandler();

    goBack()

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
  const interviewee_state = isVoiceUpCurrentChunk.current
    ? IE_SPEAKING
    : IE_IDLE;

  let interviewer_state = IV_IDLE;

  if (isTtfSpeaking) interviewer_state = IV_SPEAKING;
  else if (!voiceUp && !mute) interviewer_state = IV_PROCESSING;


  // console.log(JSON.stringify(scheduleInfo) + '=====');


  return (
    <>
      <div
        className="h-100vh"
        style={{
          backgroundColor: "#FFFFFF"
        }}
      >
        {!networkError && !websocketError && scheduleInfo && (
          <>
            {interviewStarted && (
              <>
                <div className="d-flex flex-column h-100vh">
                  <h3 className="text-center display-3 mb-0 font-weight-bolder text-primary mb-0 py-5">{`Interview for the role of ${scheduleInfo?.interviewee_expected_role}`}</h3>
                  <div className="d-flex flex-column flex-md-row  align-items-center justify-content-center h-100">

                    <div className="d-flex flex-column align-items-center justify-content-center col-md-6">
                      <AnimatedImage
                        show={interviewer_state === IV_PROCESSING}
                        name={getShortName(scheduleInfo?.interviewer_name)}
                        shouldBlink={interviewer_state === IV_SPEAKING}
                      />
                      <h3 className="display-3 mb-4 text-primary mt-3">
                        {capitalizeFirstLetter(scheduleInfo?.interviewer_name)}
                      </h3>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center col-md-6">
                      <AnimatedImage
                        show={false}
                        showWebCam={showCam}
                        name={getShortName(scheduleInfo?.interviewee_name)}
                        shouldBlink={interviewee_state === IE_SPEAKING}
                      />
                      <h3 className="display-3 mb-4 text-primary mt-3">
                        {capitalizeFirstLetter(
                          scheduleInfo?.interviewee_name
                        )}
                      </h3>
                    </div>
                  </div>
                  <div className="position-absolute d-flex align-items-center justify-content-center bottom-0 w-100 mb-5" >
                    <div className="col-md-6">
                      <CallHeader
                        webcam={showCam}
                        mic={!mute}
                        onWebCamChange={webCamHandler}
                        onMicChange={micMuteHandler}
                        onEndClick={endInterviewHandler}
                        onEndInterViewClick={closeInterviewAPiHandler}
                      />
                    </div>
                  </div>

                  <div className="position-absolute bottom-0 right-0 mr-3 mb-2 align-items-center">
                    <div className="row align-items-end">
                      {renderNetworkRange()}
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
                onClick={startInterviewHandler}
              />
            ) : (
              <></>
            )}
            {
              scheduleInfo?.is_report_complete && <Report />
            }
          </>
        )}
        {loader.loader && (
          <div className="d-flex align-items-center justify-content-center h-100">
            <Spinner />
          </div>
        )}
        {(networkError || websocketError) && (
          <div className="d-flex align-items-center justify-content-center h-100 ">
            <div className="text-center ">
              <h4 className="display-4 mb-0">
                Technical breakdown please try again
              </h4>
              <div className="my-3"></div>
              <Button text={"Try Again"} onClick={refreshScreen} />
            </div>
          </div>
        )}
      </div >
      <Modal
        isOpen={micPermissionModal.visible}
        onClose={micPermissionModal.hide}
        title={'Microphone Access Required'}
      >
        <div>
          <h3 className="text-gray-dark font-weight-500">To continue, grant microphone access:</h3>
          <p className="mb-0">{"1. Check browser settings."}</p>
          <p className="mb-0">{'2. Enable microphone access in system settings. '}<span className="pointer text-primary font-weight-700" onClick={gotoPermissionSetting}>{`(${getOperatingSystem()})`}</span></p>
        </div>
        <div className="d-flex float-right">
          <Button text={"OK"} onClick={micPermissionModal.hide} />
        </div>
      </Modal>
    </>
  );
}

export { Call };

