import { useState, useEffect, useRef } from 'react';

const useTextToSpeech = () => {
  const [voices, setVoices] = useState<any>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const selectedVoiceIndex = 2
  const utteranceRef = useRef<any>(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);

    if (voices.length > 0 && selectedVoiceIndex >= 0 && selectedVoiceIndex < voices.length) {
      utterance.voice = voices[selectedVoiceIndex];
    }

    utteranceRef.current = utterance;

    utterance.onstart = handleSpeechStart;
    utterance.onend = handleSpeechEnd;
    utterance.rate = 0.8
    synth.speak(utterance);
  };

  const handleSpeechStart = () => {
    setIsSpeaking(true);
  };

  const handleSpeechEnd = () => {
    setIsSpeaking(false);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    synth.addEventListener("voiceschanged", updateVoices);
    updateVoices();
    return () => {
      const synth = window.speechSynthesis;
      synth.cancel();
      synth.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  return { isSpeaking, speak };
};

export { useTextToSpeech };
