import React, { useEffect, useRef, useState } from 'react';

const playImage = process.env.PUBLIC_URL + '/assets/Play_Button.png';
const pauseImage = process.env.PUBLIC_URL + '/assets/Pause_Button.png';

function MeditationPage({ backgroundMusic, selectedVoice, goal, selectedLanguage }) {
  const audioElementRef = useRef(null);
  const [audioFetched, setAudioFetched] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log('useEffect in MeditationPage ran');
    console.log(`Background Music: ${backgroundMusic}`);
    console.log(`Selected Voice: ${selectedVoice}`);
    console.log(`Goal: ${goal}`);
    console.log(`Selected Language: ${selectedLanguage}`);
    
    const fetchAndPlayAudio = async () => {
      console.log('fetchAndPlayAudio function is called');
      const audioElement = audioElementRef.current;

      // Check if audio is already playing, then return
      if (audioElement && !audioElement.paused) {
        return;
      }

      if (audioFetched ) {
        return; // Audio already fetched and played, no need to do it again.
      }

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        "background": backgroundMusic,
        "username": "test",
        "goal": goal,
        "voice_name": selectedVoice,
        "language": selectedLanguage
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      try {
        const response = await fetch('http://127.0.0.1:5000/generate_meditation', requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioElement) {
          audioElement.src = audioUrl;
          audioElement.play();
          setAudioFetched(true);
        }
      } catch (error) {
        console.log('Fetch error: ', error);
      }
    };

    fetchAndPlayAudio();
  }, [backgroundMusic, selectedVoice, goal, selectedLanguage]);

  const togglePlayPause = () => {
    const audioElement = audioElementRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play().catch(function(error) {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };
  
  return (
    <div className="meditation-page">
      {/* <h2>Meditation Page</h2> */}
      <audio ref={audioElementRef} controls>
        Your browser does not support the audio element.
      </audio>
      {/* Add your meditation content here */}
      <div>
        <img 
          src={isPlaying ? pauseImage : playImage} 
          alt={isPlaying ? 'Pause' : 'Play'} 
          onClick={togglePlayPause} 
          style={{cursor: 'pointer'}}
        />
      </div>
    </div>
  );
}

export default MeditationPage;


// // MeditationPage.js
// import React, { useEffect } from 'react';

// function MeditationPage({ backgroundMusic, selectedVoice, goal, selectedLanguage }) {
//   useEffect(() => {
//     // Fetch and play the audio here
//     const fetchAndPlayAudio = async () => {
//       var myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');

//       var raw = JSON.stringify({
//         "background": backgroundMusic,
//         "username": "test",
//         "goal": goal,
//         "voice_name": selectedVoice,
//         "language": selectedLanguage
//       });

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow',
//       };

//       try {
//         const response = await fetch('http://127.0.0.1:5000/generate_meditation', requestOptions);

//         // Check if the request was successful
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const audioBlob = await response.blob();
//         const audioUrl = URL.createObjectURL(audioBlob);
//         const audioElement = new Audio(audioUrl);
//         audioElement.play();
//       } catch (error) {
//         console.log('Fetch error: ', error);
//       }
//     };

//     fetchAndPlayAudio();
//   }, [backgroundMusic, selectedVoice, goal, selectedLanguage]);

//   return (
//     <div>
//       <h2>Meditation Page</h2>
//       {/* Add your meditation content here */}
//     </div>
//   );
// }

// export default MeditationPage;
