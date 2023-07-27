import React, { useState } from 'react';
import Button from './Button';

const languages = ['English', 'Espanol', 'Deutsh', 'Francais', 'Italiano', 'Portugues', 'Polski', 'Pyccknn'];

function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <div className="quadrant">
      <h2>Language</h2>
      <div className="option-grid">
        {languages.map((language, index) => (
          <Button
            key={index}
            text={language}
            isSelected={selectedLanguage === language}
            onClick={() => setSelectedLanguage(language)}
          />
        ))}
      </div>
    </div>
  );
}

export default Language;
