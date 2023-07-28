import React from 'react';


const StartMeditationButton =  () => {

  const handleClick = async () => {
    const goal = document.querySelector('.user-input').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "background": "rain"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch("http://127.0.0.1:5000/combine_audio",
    requestOptions).catch(error => console.log('error', error)); 
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  

  };

  return (
    <div className="start-button">
      <button className="button start" onClick={handleClick}>
        START MEDITATION
      </button>
    </div>
  );
};

export default StartMeditationButton;