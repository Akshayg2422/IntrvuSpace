import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import type { Harker } from 'hark'

const useWhisperTranscription = () => {
    const [audioStream, setAudioStream] = useState<MediaStream | null | any>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [transcribing, setTranscribing] = useState(false)
    const OPENAI_API_TOKEN = "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"
    const [speaking, setSpeaking] = useState<boolean>(false)

    const recorder = useRef<MediaRecorder | null | any>(null);
    const chunks = useRef<Blob[]>([]);
    const encoder = useRef<any>(null);
    const listener = useRef<Harker>()
    const stream = useRef<MediaStream | null | any>(null);

    const onDataAvailable = async (event: BlobEvent) => {
        const data = event.data;
        chunks.current.push(data);
        const recorderState = recorder.current?.state;
        if (recorderState === 'inactive') {
            const blob = new Blob(chunks.current, {
                type: 'audio/webm',
            });
            const file = new File([blob], 'speech.webm', {
                type: 'audio/webm',
            });
            await onWhispered(file);
            if (chunks.current) {
                chunks.current = []
            }
        }
    };

    const onWhispered = async (file: File) => {
        const endpoint = 'https://api.openai.com/v1/audio/transcriptions';
        const headers = {
            'Authorization': `Bearer ${OPENAI_API_TOKEN}`,
            'Content-Type': 'multipart/form-data',
        };

        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', 'en')
        formData.append('model', 'whisper-1');

        try {
            const response = await axios.post(endpoint, formData, { headers });
            setTranscript(response.data.text);
            setTranscribing(true)
        } catch (error) {
            console.error('Error during transcription:', error);
        }
    };

    const onStartSpeaking = () => {

        setSpeaking(true)
    }

    const onStopSpeaking = () => {
        setSpeaking(false)
    }

    const handleStartRecording = async () => {
        try {
            const stream: any = await navigator.mediaDevices.getUserMedia({ audio: true });
            setIsRecording(true);
            setTranscribing(false)
            const options = { mimeType: 'audio/webm' };
            recorder.current = new MediaRecorder(stream, options);
            recorder.current.start();
            if (!listener.current) {
                const { default: hark } = await import('hark')
                listener.current = hark(stream.current, {
                    interval: 100,
                    play: false,
                })
                listener.current.on('speaking', onStartSpeaking)
                listener.current.on('stopped_speaking', onStopSpeaking)
            }
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    // const handleStopRecording = () => {
    //     if (recorder.current && recorder.current.state === 'recording') {
    //         recorder.current.stop();
    //         setIsRecording(false);
    //     }
    // };

    const handleStopRecording = async () => {
        try {
            if (recorder.current) {
                const recordState = await recorder.current.state;
                if (recordState === 'recording' || recordState === 'paused') {
                    recorder.current.ondataavailable = onDataAvailable;
                    recorder.current.stop();
                    setIsRecording(false);

                }
            }
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };


    const onPauseRecording = async () => {
        try {
            if (recorder.current) {
                const recordState = await recorder.current.getState();
                if (recordState === 'recording') {
                    recorder.current.pauseRecording();
                    setIsRecording(false);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        return () => {
            if (chunks.current) {
                chunks.current = []
            }

            if (stream.current) {
                stream.current.getTracks().forEach((track) => track.stop())
                stream.current = undefined
            }
            if (listener.current) {
                // @ts-ignore
                listener.current.off('speaking', onStartSpeaking)
                // @ts-ignore
                listener.current.off('stopped_speaking', onStopSpeaking)
            }
        }
    }, []);

    return {
        isRecording,
        transcribing,
        transcript,
        startRecording: handleStartRecording,
        stopRecording: handleStopRecording,
        pauseRecording: onPauseRecording,
    };
};

export { useWhisperTranscription };
