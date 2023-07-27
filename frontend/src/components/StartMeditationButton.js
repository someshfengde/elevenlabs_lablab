import React from 'react';

const StartMeditationButton = () => {
  const handleClick = () => {
    alert(`Meditation started.`);
  };

  return (
    <div className="start-button">
      <button className="button start-btn" onClick={handleClick}>START MEDITATION</button>
    </div>
  );
};

export default StartMeditationButton;