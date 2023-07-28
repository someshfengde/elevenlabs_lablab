import React, { useState } from 'react';
import Button from './Button';

const sounds = ['music', 'nature', 'rain', 'ocean', 'chimes', 'storm'];





function Soundscape() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);

  const fetchCombinedAudio = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/combine_audio', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "background": selectedSound,
          "username": "test"
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the audio file');
      }
  
      // Assuming the response is a Blob or a file from the server
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);
    } catch (error) {
      console.error(error);
    }
  };
  
  const playAudio = () => {
    if (selectedSound) {
      console.log("playing audio")
      fetchCombinedAudio();
      const audioElement = new Audio(audioSrc);
      audioElement.play();
    }
  };

  return (
    <div className="quadrant">
      <h2>Soundscape</h2>
      <div className="option-grid">
        {sounds.map((sound, index) => (
          <Button
            key={index}
            text={sound}
            isSelected={selectedSound === sound}
            onClick={() => {

              setSelectedSound(sound);
              console.log(selectedSound);
              fetchCombinedAudio();
              playAudio();

            }}
          />
        ))}
      </div>
    </div>
  );


}

export default Soundscape;
