import { useWebCamRecorder } from '@Hooks';
import { color } from '@Themes';
import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebCamRecorder = () => {
  return (
    <div>
      <Webcam mirrored style={{ height: "36vh", width: '36vh', objectFit: "cover", marginTop: 20, backgroundColor: color.primary }} className='avatar rounded-circle' audio={false} screenshotFormat="image/jpeg" />
    </div>
  );
};

export { WebCamRecorder };
