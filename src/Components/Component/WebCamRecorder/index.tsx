import { useWebCamRecorder } from "@Hooks";
import { color } from "@Themes";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const WebCamRecorder = ({ isMuted = false }) => {
  return (
    <div>
      <Webcam mirrored style={{ height: 271, width: 270, objectFit: "cover", marginTop: 18, backgroundColor: color.primary, borderRadius: 12 }} audio={false} screenshotFormat="image/jpeg" />
    </div>
  );
};

export { WebCamRecorder };
