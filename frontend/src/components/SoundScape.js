import React, { useState } from 'react';
import Button from './Button';

const sounds = ['Music', 'Nature', 'Rain', 'Celestial', 'Beach', 'Chimes', 'Storm', 'White Noise'];

function Soundscape() {
  const [selectedSound, setSelectedSound] = useState(null);

  return (
    <div className="quadrant">
      <h2>Soundscape</h2>
      <div className="option-grid">
        {sounds.map((sound, index) => (
          <Button
            key={index}
            text={sound}
            isSelected={selectedSound === sound}
            onClick={() => setSelectedSound(sound)}
          />
        ))}
      </div>
    </div>
  );
}

export default Soundscape;
