import React, { useState, useEffect } from 'react';
import Button from './Button';

const sounds = ['music', 'nature', 'rain', 'ocean', 'chimes', 'storm'];

function Soundscape() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);
  const [audioElement, setAudioElement] = useState(null);

  const fetchCombinedAudio = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/combine_audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          background: selectedSound,
          username: 'test',
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
    if (selectedSound && audioSrc) {
      console.log('playing audio');
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      const newAudioElement = new Audio(audioSrc);
      setAudioElement(newAudioElement);
      newAudioElement.play();
    }
  };

  // Use useEffect to play audio when audioSrc changes
  useEffect(() => {
    playAudio();

    // Clean up the previous audio element when audioSrc changes
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [audioSrc]);

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
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Soundscape;
