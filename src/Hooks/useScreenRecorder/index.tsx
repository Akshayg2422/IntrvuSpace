import { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';

const useScreenRecorder = () => {
  const [recordRTC, setRecordRTC] = useState<any>(null);
  const [isScreenRecording, setScreenRecording] = useState(false)
  const [permission, setPermission] = useState(false)

  const videoRef = useRef<any>(null);
  const [output, setOutput] = useState<any>('')

  const startRecording = async () => {
    try {
      const constraints: any = {
        video: {
          chromeMediaSource: 'desktop', // or 'screen'
        },
        audio: true,
      };
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);


      const recorder = RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
        disableLogs: true,
      });

      recorder.startRecording();
      setRecordRTC(recorder);
      setScreenRecording(true)
      setPermission(true)
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        // Handle permission denied
        console.log('Permission denied for screen recording');
      } else {
        // Handle other errors
        console.error('Error starting screen recording:', error);
      }
    }
  };

  const stopRecording = () => {
    return new Promise((resolve, reject) => {
      if (recordRTC) {
        recordRTC.stopRecording(() => {
          const audioBlob = recordRTC.getBlob();
          const reader: any = new FileReader();
          reader.onload = () => {
            const base64Audio = reader.result.split(',')[1];
            setOutput(base64Audio);
            setScreenRecording(false)
            resolve(base64Audio);
          };
          reader.onerror = reject;
          reader.readAsDataURL(audioBlob);
          setRecordRTC(null);
        });
      } else {
        reject(new Error('No recording to stop'));
      }
    });
  };

  return { startRecording, stopRecording, videoRef, output, isScreenRecording };
};

export { useScreenRecorder };
