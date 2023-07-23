import { useState, useEffect, useRef } from 'react';

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<any>(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.onstart = handleSpeechStart;
    utterance.onend = handleSpeechEnd;
    // utterance.rate = 0.8
    synth.speak(utterance);
  };

  const handleSpeechStart = () => {
    setIsSpeaking(true);
  };

  const handleSpeechEnd = () => {
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      const synth = window.speechSynthesis;
      synth.cancel();
    };
  }, []);

  return { isSpeaking, speak };
};

export { useTextToSpeech };
