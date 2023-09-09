import { useWebCamRecorder } from "@Hooks";
import { color } from "@Themes";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const WebCamRecorder = ({ isMuted = false }) => {
  return (
    <>
      <Webcam
        className=""
        mirrored
        style={{
          height: !isMuted ? 271 : 150,
          width: !isMuted ? 271 : 150,
          objectFit: "cover",
          marginTop: 18,
          backgroundColor: color.primary,
          borderRadius: 6,
          margin: isMuted ? "-75px 0px 0px -75px" : '19px 2px 3px 5px',
        }}
        audio={false}
        screenshotFormat="image/jpeg"
      />
    </>
  );
};

export { WebCamRecorder };
