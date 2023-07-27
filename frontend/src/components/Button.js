import React from 'react';

const Button = ({ text, isSelected, onClick }) => {
  const buttonClass = isSelected ? 'button selected' : 'button';
  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
