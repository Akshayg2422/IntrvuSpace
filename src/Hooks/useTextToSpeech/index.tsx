import { useState, useEffect, useRef } from 'react';

const useTextToSpeech = () => {

  const [isSpeaking, setIsSpeaking] = useState(false);
  const userAgent = navigator.userAgent;

  let browserName = 'Unknown';

  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari';
  }
  else if (userAgent.includes('Chrome')) {
    browserName = 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
  } else if (userAgent.includes('Edge')) {
    browserName = 'Edge';
  } else {

  }

  const [voices, setVoices] = useState<any>([]);
  const synth = window.speechSynthesis;
  const safari_female = ['Samantha', 'Victoria', 'Karen', 'Moira']
  const safari_male = ['Fiona', 'Microsoft David Desktop', 'Google US English', 'Eddy (English (US))', 'Reed (English (US))']
  const chrome_female = ['Google US English']
  const is_male = false

  const safari_voice_source = is_male ? safari_male : safari_female
  const getVoiceByBrowser = () => {
    const userAgent = window.navigator.userAgent;
    if (browserName === 'Safari') {
      return safari_voice_source[2];
    } else if (userAgent.includes('Chrome') || userAgent.includes('Edge') || userAgent.includes('Firefox')) {
      return chrome_female[0];
    } else {
      return 'Anna';
    }
  };

  const selectedVoiceName = getVoiceByBrowser();

  useEffect(() => {
    const voicesList = synth.getVoices();
    const filteredVoices = voicesList.filter(voice => voice.lang.includes('en'));
    setVoices(filteredVoices);
  }, [synth]);




  const speak = (text: string) => {
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find((voice: any) => voice.name === selectedVoiceName);
    if (browserName === 'Safari')
      utterance.rate = 1.1;
    else
      utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = handleSpeechStart;
    utterance.onend = handleSpeechEnd;
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
