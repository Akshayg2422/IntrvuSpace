import { Button } from "@Components";
import React, { useState, useRef } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

const VoiceRecorder = ({ onAudioData }) => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<any>(null);
  const [recording, setRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);

  const mediaRecorderRef = useRef<any>(null);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      const audioBlob = new Blob([event.data], { type: "audio/wav" });
      const reader: any = new FileReader();
      reader.onload = () => {
        const base64Audio = reader.result.split(",")[1];
        setAudioData(base64Audio);
        onAudioData(base64Audio); // Pass the base64 audio data to the parent component
      };
      reader.readAsDataURL(audioBlob);
    }
  };

  const handleListen = () => {
    if (audioData) {
      const audio = new Audio(`data:audio/wav;base64,${audioData}`);
      audio.play();
    }
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      {/* <main>
        <div className="audio-controls">
          {!permission ? (
            <Button text={'Get Microphone'} onClick={getMicrophonePermission} type="button" />
          ) : null}
          {permission && !recording ? (
            <Button text={'Record'} onClick={startRecording} type="button" />
          ) : null}
          {recording ? (
            <Button text={'Stop'} onClick={stopRecording} type="button" />
          ) : null}
          {audioData && (
            <Button text={'Listen'} onClick={handleListen} type="button" />
          )}
        </div>
      </main> */}
      <AudioRecorder
        onRecordingComplete={handleDataAvailable}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={true}
        downloadFileExtension="mp3"
      />
    </div>
  );
};

export { VoiceRecorder };
