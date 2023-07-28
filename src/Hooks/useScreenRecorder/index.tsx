import { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';

const useScreenRecorder = () => {
  const [recordRTC, setRecordRTC] = useState<any>(null);
  const [isScreenRecording, setScreenRecording] = useState(false);
  const [permission, setPermission] = useState(false);
  const videoRef = useRef<any>(null);
  const [output, setOutput] = useState<any>('');

  const startScreenRecording = async () => {
    try {
      const constraints: any = {
        video: {
          chromeMediaSource: 'desktop', // or 'screen'
        },
        audio: false, // Screen recording without audio
      };
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);

      const recorder = RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
        // disableLogs: true,
      });
      
      recorder.startRecording();
      setRecordRTC(recorder);
      setScreenRecording(true);
      setPermission(true);
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

  const stopScreenRecording = () => {
    return new Promise((
      resolve, reject) => {
      if (recordRTC) {
        recordRTC.stopRecording(() => {
          const videoBlob = recordRTC.getBlob();
          const reader:any = new FileReader();
          reader.onload = () => {
            const base64Video = reader.result.split(',')[1];
            setScreenRecording(false);
            resolve(base64Video);
            setOutput(base64Video);
            console.log("==========base64Video=======>", base64Video);
          };
          reader.onerror = reject;
          reader.readAsDataURL(videoBlob);
          setRecordRTC(null);
        });
      } else {
        reject(new Error('No recording to stop'));
      }
    });
  };

  return { startScreenRecording, stopScreenRecording, videoRef, output, isScreenRecording };
};

export { useScreenRecorder };
