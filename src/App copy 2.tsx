/* eslint-disable @typescript-eslint/no-redeclare */
import { ScreenWrapper, Breadcrumbs, Back, PageNotFound } from "@Components";
import { Route, Routes } from "react-router-dom";
import { HOME_ROUTES, RequireAuth, DASHBOARD_ROUTES, AUTH_ROUTES, RequireHome } from "@Routes";
import { ToastContainer } from "react-toastify";
import { Splash } from '@Modules'
/**
 *  select-react  - important need to add this app.js
 */
import "select2/dist/css/select2.min.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { settingSideNavRemove } from "./Redux";


import { useWhisper } from './aaa/useWhisper';


import hark from 'hark';
import { useRef } from 'react';


function App() {


  const OPENAI_API_TOKEN = "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"

  const [isWaiting, setIsWaiting] = useState(false)
  const activeResponseText = useRef<any>('');
  const activeResponseTextId = useRef<any>('');
  const lastTranscribedText = useRef<any>('');


  const SPEAK_TYPE_NOT_INITIATED = "SPEAK_TYPE_NOT_INITIATED"
  const SPEAK_TYPE_API = "SPEAK_TYPE_API"
  const SPEAK_TYPE_AWAITING_USER_RESPONSE = "SPEAK_TYPE_AWAITING_USER_RESPONSE"
  const SPEAK_TYPE_USER_SPEAKING = "SPEAK_TYPE_USER_SPEAKING"
  const speaking_type = useRef<any>(SPEAK_TYPE_NOT_INITIATED);

  const {
    transcribing,
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    whisperConfig: {
      prompt: '',
      temperature: 0.2,
      language: 'en',
    },
    streaming: true,
    timeSlice: 3_000,
    // autoTranscribe: false,
    apiKey: OPENAI_API_TOKEN,
    removeSilence: false
  })



  const s = () => {

    startRecording()
  }

  const st = () => {

    stopRecording()
  }

  useEffect(() => {
    if (transcript.text) {
      const ft = transcript.text.replace(lastTranscribedText.current, "")
      if (ft) {
        console.log("transcript.text===", transcript.text, "===", ft)
        activeResponseText.current = activeResponseText.current + " " + ft
        console.log("transcript.totalttt===", activeResponseText.current)
      }
    }
  }, [transcript.text])


  return (

    <>
      <button onClick={s} >startr</button>
      <button onClick={st} >sstop</button>
    </>

  );
}

export default App;