import { useState } from 'react';

const VoiceRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<any>(null);
  let mediaRecorder: any = null;
  let chunks: any = [];

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.stop();
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      const audioBlob = new Blob([event.data], { type: 'audio/wav' });
      const reader: any = new FileReader();
      reader.onload = () => {
        const base64Audio = reader.result.split(',')[1];
        setAudioURL(base64Audio);
      };
      reader.readAsDataURL(audioBlob);
    }
  };

  const downloadRecording = () => {
    if (!chunks.length) {
      return;
    }
    const blob = new Blob(chunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(blob);
    setAudioURL(audioURL);
    chunks = [];
  };

  return {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    downloadRecording,
  };
};


export { VoiceRecognition };
