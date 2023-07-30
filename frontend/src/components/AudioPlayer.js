// AudioPlayer.js
import React, { useEffect, useRef } from 'react';

function AudioPlayer({ src }) {
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = () => {
      audio.play().catch((error) => {
        console.log('Play action was interrupted:', error);
      });
    };

    const pauseAudio = () => {
      audio.pause();
    };

    // You could add event listeners here if you want to listen for certain events, e.g.
    // audio.addEventListener('play', handlePlay);
    // Don't forget to clean up after the component is unmounted:
    // return () => {
    //   audio.removeEventListener('play', handlePlay);
    // };

    return { playAudio, pauseAudio };
  }, []);

  return <audio ref={audioRef} src={src} />;
}

export default AudioPlayer;
