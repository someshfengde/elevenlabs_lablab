import React from 'react';

const StartMeditationButton = () => {

  const handleClick = () => {
    const goal = document.querySelector('.user-input').value;

    // Generate the meditation text
    fetch('http://localhost:5000/generate_meditation_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goal: goal,
      }),
    })
    .then((response) => response.text())
    .then((meditation_text) => {
      // Generate the voiceover
      fetch('http://localhost:5000/generate_voiceover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meditation_text: meditation_text,
        }),
      })
      .then((response) => response.blob())
      .then((voiceoverBlob) => {
        // Create a URL for the voiceover file
        const voiceoverUrl = URL.createObjectURL(voiceoverBlob);

        // Combine the voiceover with the background audio
        fetch('http://localhost:5000/combine_audio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            background: 'rain',
            voice_audio_path: voiceoverUrl, // This is the actual URL of the voiceover file
          }),
        })
        .then((response) => response.blob())
        .then((combinedAudioBlob) => {
          // Create a URL for the final audio file
          const url = URL.createObjectURL(combinedAudioBlob);

          // Create a link to download the final audio file
          const link = document.createElement('a');
          link.href = url;
          link.download = 'meditation.wav';
          document.body.appendChild(link);

          // Simulate a click to download the file
          link.click();

          // Remove the link from the DOM
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="start-button">
      <button className="button start-btn" onClick={handleClick}>
        START MEDITATION
      </button>
    </div>
  );
};

export default StartMeditationButton;