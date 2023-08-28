import { useState, useEffect, useRef } from 'react';


const userAgent = navigator.userAgent;

const getBrowserName = ()=>{
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  }
  else if (userAgent.includes('Chrome')) {
    return 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('Edge')) {
    return 'Edge';
  }
  else{
    return 'Unknown'
  }
}
const BROWSER_NAME = getBrowserName()

const getVoiceByBrowser = () => {
  let browserName = BROWSER_NAME
  
  const safari_female = ['Samantha', 'Victoria', 'Karen', 'Moira']
  const safari_male = ['Fiona', 'Microsoft David Desktop', 'Google US English', 'Eddy (English (US))', 'Reed (English (US))']
  const chrome_female = ['Google US English']
  const is_male = false
  
  const safari_voice_source = is_male ? safari_male : safari_female
  
  if (browserName === 'Safari1') {
    return safari_voice_source[2];
  } else if (userAgent.includes('Chrome') || userAgent.includes('Edge') || userAgent.includes('Firefox')) {
    return chrome_female[0];
  } else {
    return 'Anna';
  }
};

const selectedVoiceName = getVoiceByBrowser();

const useTextToSpeech = () => {

  const [isTtfSpeaking, setIsSpeaking] = useState(false);

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




  const [voices, setVoices] = useState<any>([]);
  const synth = window.speechSynthesis;


  useEffect(() => {
    const voicesList = synth.getVoices();
    const filteredVoices = voicesList.filter(voice => voice.lang.includes('en'));
    setVoices(filteredVoices);
  }, [synth]);




  const speak = (text: string) => {
    if (synth.speaking) {
      synth.cancel();
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find((voice: any) => voice.name === selectedVoiceName);
    if (BROWSER_NAME === 'Safari')
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


  return { isTtfSpeaking, speak };

};

export { useTextToSpeech };
