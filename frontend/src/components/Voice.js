import React, { useState } from 'react';
import Button from './Button';

const voices = ['Willow', 'Atlas', 'Daniel', 'Ester'];

function Voice() {
  const [selectedVoice, setSelectedVoice] = useState(null);

  return (
    <div className="quadrant">
      <h2>Voice</h2>
      <div className="option-grid">
        {voices.map((voice, index) => (
          <Button
            key={index}
            text={voice}
            isSelected={selectedVoice === voice}
            onClick={() => setSelectedVoice(voice)}
          />
        ))}
      </div>
    </div>
  );
}

export default Voice;
