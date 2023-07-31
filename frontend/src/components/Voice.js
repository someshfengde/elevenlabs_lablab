// Voice.js
import React from 'react';
const voices = [
  { name: 'Emily', selected: 'Emily', notSelected: 'Emily_1' },
  { name: 'Thomas', selected: 'Thomas', notSelected: 'Thomas_1' },
  { name: 'Rachel', selected: 'ester', notSelected: 'ester_1' },
];

function Voice({ selectedVoice, onVoiceChange }) {
  return (
    <div className="quadrant voice">
      <h2>Voice</h2>
      <div className="voice-options">
        <div className="voice-options-wrapper"> 
          {voices.map((voice, index) => (
            <div 
              key={index}
              className="voice-option" // add this class name
              onClick={() => onVoiceChange(voice.name)}
            >
              <img
                className="voice-option-image" // add this class name
                src={`${process.env.PUBLIC_URL}/assets/voices/${selectedVoice === voice.name ? voice.selected : voice.notSelected}.png`}
                alt={voice.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Voice;
