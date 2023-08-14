import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const useWebCamRecorder = () => {
    const webcamRef = useRef<any>(null);
    const mediaRecorderRef = useRef<any>(null);
    const chunksRef = useRef<any>([]);

    const handleDataAvailable = useCallback((event) => {
        if (event.data && event.data.size > 0) {
            chunksRef.current.push(event.data);
        }
    }, []);

    const handleStartCaptureClick = useCallback(() => {
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: 'video/webm',
        });
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start();
    }, [handleDataAvailable]);

    const handleStopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    }, []);

    const handleStop = useCallback((onStartRecording) => {
        const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onload = () => {
            const base64Video = reader.result;
            onStartRecording(base64Video);
        };
        reader.readAsDataURL(videoBlob);
    },
        [chunksRef]
    );

    return { webcamRef, handleStartCaptureClick, handleStopRecording, handleStop };
};

export { useWebCamRecorder }