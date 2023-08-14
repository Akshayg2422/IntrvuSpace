import { useWebCamRecorder } from '@Hooks';
import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebCamRecorder = () => {
  const { webcamRef, handleStartCaptureClick, handleStopRecording, handleStop } = useWebCamRecorder();

  return (
    <div>
      <Webcam style={{ height: "20vh", width: '20vh', objectFit: "cover" }} className='avatar rounded-circle' audio={false} screenshotFormat="image/jpeg" />
    </div>
  );
};

export { WebCamRecorder };
