import { useWebCamRecorder } from '@Hooks';
import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebCamRecorder = () => {
  const { webcamRef, handleStartCaptureClick, handleStopRecording, handleStop } = useWebCamRecorder();

  return (
    <>
      <Webcam style={{ height: '30%', width: '30%' }} audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
    </>
  );
};

export { WebCamRecorder };
