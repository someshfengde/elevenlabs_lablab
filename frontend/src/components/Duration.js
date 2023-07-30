import React, { useState } from 'react';
import Button from './Button';

const durations = ['5', '10', '15', '20', '30', '45', '60', '∞'];

function Duration() {
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleDurationChange = (duration) => {
    console.log(`Changing duration from ${selectedDuration} to ${duration}`);
    setSelectedDuration(duration);
  };

  return (
    <div className="quadrant duration">
      <h2>Duration</h2>
      <div className="duration-options">
        {durations.map((duration, index) => (
          <Button
            key={index}
            text={duration}
            isSelected={selectedDuration === duration}
            onClick={() => handleDurationChange(duration)}
          />
        ))}
      </div>
    </div>
  );
}

export default Duration;

// import React, { useState } from 'react';
// import Button from './Button';

// const durations = ['5', '10', '15', '20', '30', '45', '60', '∞'];

// function Duration() {
//   const [selectedDuration, setSelectedDuration] = useState(null);

//   return (
//     <div className="quadrant duration">
//       <h2>Duration</h2>
//       <div className="duration-options">
//         {durations.map((duration, index) => (
//           <Button
//             key={index}
//             text={duration}
//             isSelected={selectedDuration === duration}
//             onClick={() => setSelectedDuration(duration)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Duration;