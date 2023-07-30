import React from 'react';

const Logo = () => {
  return (
    <div className="logo-top-left">
      <img src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="Logo" />
    </div>
  );
};

export default Logo;
