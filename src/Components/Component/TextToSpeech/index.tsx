import { useEffect, useRef, useState } from "react";

const TextToSpeech = ({ text }) => {
  const [voices, setVoices] = useState<any>([]);
  const utteranceRef = useRef<any>(null);

  useEffect(() => {
    // Fetch the available voices when the component mounts
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    synth.addEventListener("voiceschanged", updateVoices);
    updateVoices();

    return () => {
      synth.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  const handleStart = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Select the desired voice. You can change the voiceIndex value to pick a different voice.
    const voiceIndex = 2; // Change this index to select a different voice.
    if (voices.length > voiceIndex) {
      utterance.voice = voices[voiceIndex];
    }

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  return { handleStart, handleStop };
};

export { TextToSpeech };
