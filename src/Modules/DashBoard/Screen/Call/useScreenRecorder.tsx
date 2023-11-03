import {
  getRecordedVideoSessionDetails,
  recordInterviewSession,
  screenRecordingPermission,
} from "@Redux";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useScreenRecorder = () => {
  const [mediaStream, setMediaStream] = useState<any>(null);
  const [recorder, setRecorder] = useState<any>(null);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [recordedVideoData, setRecordedVideoData] = useState<any>([]);
  const [recordedAudioData, setRecordedAudioData] = useState<any>([]);
  const intervalIdRef = useRef<any>(null);
  const [recordStatus, setRecordStatus] = useState<any>(); // true
  const { scheduleId, VideoSessionDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log("Audio Blobbbb00------>", recordedAudioData);
  

  const dispatch = useDispatch();

  const startScreenRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const videoStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const stream = new MediaStream([
        ...audioStream.getTracks(),
        ...videoStream.getTracks(),
      ]);

      const tracks = videoStream.getTracks();

      if (tracks.length > 0) {
        const track = tracks[0];
        const settings: any = track.getSettings();

        if (settings.displaySurface === "monitor") {
          setMediaStream(stream);
          dispatch(screenRecordingPermission(true));
          const mediaRecorder = new MediaRecorder(stream);
          setRecorder(mediaRecorder);
          setIsScreenRecording(true);
          const recordedChunks: any = [];
          mediaRecorder.ondataavailable = (event: any) => {
            // console.log("video blobbbbb--->", event.data);
            // setRecordedVideoData([...recordedVideoData, event.data]);

            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
            setRecordedVideoData(recordedChunks);
          };
          // Start recording every 1 second.
          mediaRecorder.start(1000);

          setRecordStatus(true);
          console.log("User selected the entire screen.");
        } else {
          console.log("User selected an application window.");
          track.stop();
          setRecordStatus(false);
        }
      }
    } catch (error) {
      console.error("Error starting recording!", error);
      setRecordStatus(false);
    }
  };

  // console.log("VideoDataBlobbbsss===>", recordedVideoData);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      if (recordedVideoData && recordedVideoData.length > 0) {
        const videoBlob = new Blob(recordedVideoData, { type: "video/webm" });
        console.log("video blob00---->", videoBlob)
        sendBlobToServer(videoBlob, false);
      }
    }, 1000);
    return () => clearInterval(intervalIdRef.current);
  }, [recordedVideoData, VideoSessionDetails]);

  const stopScreenRecording = async () => {
    if (recorder) {
      recorder.stop();
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    setIsScreenRecording(false);
    const videoBlob = await new Blob(recordedVideoData, { type: "video/webm" });
    await sendBlobToServer(videoBlob, true);
    setRecordedVideoData([]);
    dispatch(screenRecordingPermission(false));
    dispatch(getRecordedVideoSessionDetails(undefined));
    setRecordStatus(false);
  };

  const sendBlobToServer = (videoBlob: any, isRecordingDone: any) => {
    const formData = new FormData();
    formData.append("video_data", videoBlob);
    formData.append("schedule_id", scheduleId);

    if (VideoSessionDetails) {
      formData.append("video_id", VideoSessionDetails?.id);
    }
    if (isRecordingDone) {
      formData.append("stop_recording", isRecordingDone);
    }

    // console.log("formData====>", videoBlob);

    // const params = formData;
    // dispatch(
    //   recordInterviewSession({
    //     params,
    //     onSuccess: (res: any) => () => {
    //       if (!VideoSessionDetails?.id) {
    //         dispatch(getRecordedVideoSessionDetails(res?.details));
    //       }
    //     },
    //     onError: (error: any) => () => {},
    //   })
    // );
  };

  return {
    isScreenRecording,
    startScreenRecording,
    stopScreenRecording,
    recordStatus,
    setRecordStatus,
    recordedVideoData,
    setRecordedAudioData,
    recordedAudioData
  };
};

export { useScreenRecorder };