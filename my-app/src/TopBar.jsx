import React from 'react';

function TopBar() {
  const handleClick = () => {
    // TODO: handle
    console.log('Log In button clicked');
  };

  return (
    <div>
      <div className="top-left website-name">
        ResuMate
      </div>
      <div className="top-right login-button">
        <button className="button" onClick={handleClick}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default TopBar;
