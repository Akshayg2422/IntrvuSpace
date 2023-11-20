import {
  getRecordedVideoSessionDetails,
  recordInterviewSession,
  screenRecordingPermission,
} from "@Redux";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useScreenRecording = () => {
  const [mediaStream, setMediaStream] = useState<any>(null);
  const [recorder, setRecorder] = useState<any>(null);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [recordedVideoData, setRecordedVideoData] = useState([]);
  const intervalIdRef = useRef<any>(null);
  const { scheduleId, VideoSessionDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

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
      setMediaStream(stream);
      dispatch(screenRecordingPermission(true));
      const mediaRecorder = new MediaRecorder(stream);
      setRecorder(mediaRecorder);
      setIsScreenRecording(true);
      const recordedChunks: any = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      // Start recording every 5 seconds.
      mediaRecorder.start(5000);
      setRecordedVideoData(recordedChunks);
    } catch (error) {
      console.error("Error starting recording!", error);
    }
  };

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      if (recordedVideoData && recordedVideoData.length > 0) {
        const videoBlob = new Blob(recordedVideoData, { type: "video/webm" });
        console.log("blob", videoBlob);
        sendBlobToServer(videoBlob, false);
      }
    }, 5000);
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
  };

  const sendBlobToServer = (videoBlob, isRecordingDone) => {
    const formData = new FormData();
    formData.append("video_data", videoBlob);
    formData.append("schedule_id", scheduleId);

    if (VideoSessionDetails) {
      formData.append("video_id", VideoSessionDetails?.id);
    }
    if (isRecordingDone) {
      formData.append("stop_recording", isRecordingDone);
    }

    const params = formData;
    dispatch(
      recordInterviewSession({
        params,
        onSuccess: (response: any) => () => {
          if (!VideoSessionDetails?.id) {
            dispatch(getRecordedVideoSessionDetails(response?.details));
          }
        },
        onError: (error: any) => () => {},
      })
    );
  };

  return {
    isScreenRecording,
    startScreenRecording,
    stopScreenRecording,
  };
};

export { useScreenRecording };
