import { useRef } from "react";

const TextToSpeech = ({text}) => {
  const utteranceRef = useRef<any>(null);

  const handleStart = (text: string | undefined) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  return { handleStart, handleStop };
};

export {TextToSpeech}