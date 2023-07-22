import React, { Component, useEffect, useRef, useState } from 'react'
import { CallScreen } from './Container';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getStartChat } from '@Redux';
import { useNavigation, useScreenRecorder, useTextToSpeech } from '@Hooks';


function Dashboard() {
  const { goBack } = useNavigation();
  const dispatch = useDispatch()
  const mediaRecorderRef = useRef<any>(null);
  const [isHear, setIsHear] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [stream, setStream] = useState<any>(null);
  const [recording, setRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);

  const { isSpeaking, speak } = useTextToSpeech();
  const { startRecording, stopRecording, videoRef, output, isScreenRecording } = useScreenRecorder();

  useEffect(() => {
    getMicrophonePermission()
    // getChatDetails('hello','text')
    startRecording()
  }, [])


  useEffect(()=>{
    isScreenRecording &&
     getChatDetails('ask interview in stream of react js','text')
  },[isScreenRecording])

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
    if (!isSpeaking && stream) {
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
        getChatDetails(base64Audio, 'audio')
      };
      reader.readAsDataURL(audioBlob);
    }
  };

  const handleMicControl = () => {
    if (!recording) {
      startVoiceRecording()
    } else {
      stopVoiceRecording()
    }
  }


  const getChatDetails = (file: string, type: string) => {
    const params = {
      ...(type === 'text' && { "message": file }),
      ...(type === 'audio' && { voice_message: file }),
    };

    dispatch(
      getStartChat({
        params,
        onSuccess: (success: any) => () => {
          if (success?.response[0]?.is_by_interviewer) {
            speak(success?.response[0]?.message);
          }
        },
        onError: (error: string) => () => {
          speak("Something Went Wrong Please Try After Some Times");
        },
      })
    );
  };

  const handleVideo = () => {
    setShowVideo(!showVideo)
  }

  return (
    <div className='h-100vh bg-gray d-flex  align-items-center justify-content-center'>
      <CallScreen status='Connected' isMute={recording} video={showVideo} onVideoControl={() => handleVideo()} speaker={isHear} onMicControl={() => handleMicControl()
      } onCallEnd={() => {
        stopVoiceRecording()
        isScreenRecording && stopRecording()
        goBack()
      }} onVolumeControl={() =>
        startRecording()
      } />
    </div>
  )
}

export { Dashboard }
