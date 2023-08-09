import React, { useState, useEffect } from 'react';

const App = () => {
  const [text, setText] = useState('How does the principle of moments, apply to mechanical systems?');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('Google US English');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const synth = window.speechSynthesis;
  const selectedVoiceName = 'Google US English'

  useEffect(() => {

    if (synth) {
      const voicesList = synth.getVoices();
      if(voicesList.length > 0)
      setVoices(voicesList);
      console.log("sddddddddddddddddddddddddddddddddddddddddddddddddd", voicesList.length)
    //   console.log(voicesList[0])

    // {voiceURI: 'Google US English', name: 'Google US English', lang: 'en-US', localService: false, default: false}

    // You can select a voice here if needed

    // const selectedVoiceNamea = 'Google US English'
    // const selectedVoice = voices.find((voice) => voice.name === selectedVoiceNamea);

    //   setSelectedVoice(selectedVoice);
    }
  }, [synth]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    console.log("selectedVoiceNameaaa", selectedVoiceName)
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    setSelectedVoice(selectedVoice);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

//   {voiceURI: 'Google US English', name: 'Google US English', lang: 'en-US', localService: false, default: false}
  const handleSpeak = () => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      // console.log("voice", selectedVoice)
      const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    
      console.log("selectedVoice", selectedVoice)
    
      if (selectedVoice) {
        utterance.voice = selectedVoice 
        // {voiceURI: 'Google US English', name: 'Google US English', lang: 'en-US', localService: false, default: false};
      }
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="App">
      <h1>Text-to-Speech App</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to speak..."
      />
      <select onChange={handleVoiceChange}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <label>
        Rate:
        <input
          type="number"
          value={rate}
          onChange={handleRateChange}
        />
      </label>
      <label>
        Pitch:
        <input
          type="number"
          value={pitch}
          onChange={handlePitchChange}

        />
      </label>
      <label>
        Volume:
        <input
          type="number"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default App;