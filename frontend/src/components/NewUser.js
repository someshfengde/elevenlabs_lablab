import React from 'react';

const NewUser = () => {
  return (
    <div className="profile">
      <img src={`${process.env.PUBLIC_URL}/assets/New_User.png`} alt="New user" />
    </div>
  );
};

export default NewUser;
