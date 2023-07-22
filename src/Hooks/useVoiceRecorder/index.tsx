import { useState, useEffect, useRef } from 'react';

const useVoiceRecorder = () => {
    const mediaRecorderRef = useRef<any>(null);
    const [stream, setStream] = useState<any>(null);
    const [recording, setRecording] = useState(false);
    const [audioData, setAudioData] = useState(null);



    useEffect(() => {
        getMicrophonePermission()
      }, [])
    
      const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
          try {
            const streamData = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            setStream(streamData);
          } catch (err) {
            alert(err);
          }
        } else {
          alert("The MediaRecorder API is not supported in your browser.");
        }
      };
    
      const startVoiceRecording = () => {
        if (stream) {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
          mediaRecorderRef.current.start();
          setRecording(true);
        }
      };
    
      const stopVoiceRecording = () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          setRecording(false);
        }
      };
    
      const handleDataAvailable = (event: any) => {
        if (event.data.size > 0) {
          const audioBlob = new Blob([event.data], { type: 'audio/wav' });
          const reader: any = new FileReader();
          reader.onload = () => {
            const base64Audio = reader.result.split(',')[1];
            setAudioData(base64Audio)
          };
          reader.readAsDataURL(audioBlob);
        }
      };
    
  return {
    recording,
    audioData,
    startVoiceRecording,
    stopVoiceRecording,
  };
};

export  {useVoiceRecorder};
