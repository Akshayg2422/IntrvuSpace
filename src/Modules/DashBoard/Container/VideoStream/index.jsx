/* eslint-disable react-hooks/exhaustive-deps */
import { getScheduleBasicInfo, setFaceVisible, syncVideo } from "@Redux";
import { Modal } from '@Components'
import { useModal } from "@Hooks";
import { Button } from '@Components'

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';


const VideoStream = (props) => {
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const recordInterval = useRef(null);
  const dispatch = useDispatch();
  const { schedule_id } = useParams();
  const [mediaStream, setMediaStream] = useState(null);
  const interviewPauseModal = useModal(false);
  const interviewPauseFinalModal = useModal(false);
  const interviewEndModal = useModal(false);


  const { scheduleInfo } = useSelector(
    (state) => state.DashboardReducer)

  const { pause_request_count } = scheduleInfo

  let faceLandmarker;
  const webcamRunningRef = useRef(null)
  let runningMode = "IMAGE";
  let array = []
  let faceVisibleCount = 0

  console.log("rendered");

  useEffect(() => {
    if (props.isRecording) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMediaStream(stream);
          videoRef.current.muted = true;
          videoRef.current.srcObject = stream;
          startRecording();
          createFaceLandmarker()
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
        });
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
    };
  }, [props.isRecording]);


  // detect face landmark

  async function createFaceLandmarker() {
    try {

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: 'VIDEO',
        numFaces: 1,
      });
      // After loading model, start detecting face and noise detection 
      detectingHandler()
    }
    catch (error) {
      console.log(error, 'error1');
    }
  }

  function detectingHandler() {

    webcamRunningRef.current = true

    if (!faceLandmarker) {
      console.log("Wait! faceLandmarker not loaded yet.");
      return;
    }
    else {
      predictWebcam()
    }

  }


  const getBasicInfo = () => {
    const params = { schedule_id: schedule_id };

    // loader.show();
    dispatch(
      getScheduleBasicInfo({
        params,
        onSuccess: () => () => {
          // loader.hide();
          // setNetworkError(false);
          // setNetworkErrorResponse(undefined);
          // interviewLimitModal.hide();
        },
        onError: (response) => () => {
          // setNetworkErrorResponse(response);
          // setNetworkError(true);
          // interviewLimitModal.show();
          // loader.hide();
        },
      })
    );
  };



  let lastVideoTime = -1;
  let results = undefined;

  // predicting faceLandMark 

  async function predictWebcam() {

    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      optionSet()
    }
    async function optionSet() {
      try {
        await faceLandmarker?.setOptions({ runningMode: 'VIDEO' });
      }
      catch (error) {
        console.log(error, "error");
      }
    }
    let startTimeMs = performance.now();
    if (videoRef.current) {
      if (lastVideoTime !== videoRef.current.currentTime) {
        results = faceLandmarker?.detectForVideo(videoRef.current, startTimeMs);
        lastVideoTime = videoRef.current.currentTime;

      }
    }
    if (results.faceBlendshapes.length > 0) {
      console.log('face visible');
      faceVisibleCount = 0

    } else {
      console.log('show Face clearly')
      faceVisibleCount = faceVisibleCount + 1
      if (faceVisibleCount === 60) {
        showAlert()
      }

    }


    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunningRef.current) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  function showAlert() {
    faceVisibleCount = 0
    if (pause_request_count < 3) {
      interviewPauseModal.show()
    }
    else if (pause_request_count == 3) {
      interviewPauseFinalModal.show()
    }
    else {
      interviewEndModal.show()
    }
    dispatch(setFaceVisible(true))
    
  }

  // recording

  const startRecording = () => {
    // Create a MediaRecorder instance to continuously capture data
    mediaRecorder.current = new MediaRecorder(videoRef.current.srcObject);

    // Add an event listener for the dataavailable event
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        const blob = new Blob([event.data], { type: "video/webm" });
        const reader = new FileReader();
        reader.onload = function () {
          syncVideoApiHelper(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    };

    // Start the MediaRecorder
    mediaRecorder.current.start();

    // Start capturing data every 5000ms (5 seconds)
    recordInterval.current = setInterval(() => {
      mediaRecorder.current.requestData();
    }, 5000);
  };

  const stopRecording = () => {
    clearInterval(recordInterval.current); // Stop the recording interval

    try {
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  function syncVideoApiHelper(base64) {
    const params = { schedule_id: schedule_id, data_b64: base64 };
    // dispatch(
    //     syncVideo({
    //         params,
    //         onSuccess: () => () => {
    //         },
    //         onError: () => () => { },
    //     })
    // );
  }

  if (!props.isRecording) return null;


  

  return (
    <div>
      <div className="d-block d-md-none d-lg-none d-xl-none">
        <video
          style={{
            marginTop: 6,
            height: 200,
            width: 200,
            objectFit: "cover",
            alignItems: "center",
            justifyContent: "center",
          }}
          ref={videoRef}
          autoPlay
          playsInline
        />
      </div>

      <div className="d-none d-md-block d-lg-block d-xl-block">
        <video
          style={{
            marginTop: 6,
            height: 250,
            width: 250,
            objectFit: "cover",
            alignItems: "center",
            justifyContent: "center",
          }}
          ref={videoRef}
          autoPlay
          playsInline
        />
      </div>
      <Modal
        title={'Interview Paused!'}
        subTitle={'Your face is not visible, adjust your position / camera to continue.'}
        isOpen={interviewPauseModal.visible}
        buttonText={'Fix & Proceed'}
        onClick={() => {
          dispatch(setFaceVisible(false))
          interviewPauseModal.hide()
          getBasicInfo()
        }}
      />

      <Modal
        title={'Face Not Visible!'}
        subTitle={'Unable to process your face clearly. Failing another attempt, would close the interview!'}
        isOpen={interviewPauseFinalModal.visible}
        buttonText={'Proceed'}
        onClick={() => {
          dispatch(setFaceVisible(false))
          interviewPauseFinalModal.hide()
          getBasicInfo()
        }}
      />

      <Modal
        title={'Interview Closed'}
        subTitle={'Your interview has ended since we are unable to track your face properly.'}
        isOpen={interviewEndModal.visible}
        buttonText={'Done'}
        onClick={() => {
          getBasicInfo()
          dispatch(setFaceVisible(false))
          interviewEndModal.hide()
            props.endInterview()
        }}
      />
    </div>
  );
};

export { VideoStream };
