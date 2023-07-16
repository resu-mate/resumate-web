import React from 'react';
import logo from './logo.svg';

function TopBar() {
  const handleClick = () => {
    // TODO: handle
    console.log('Log In button clicked');
  };

  return (
      <div className="top-bar">
        <div className="top-left">
          <img className="website-logo" src={logo}/>
        </div>
        <div className="top-right">
          <button className="login-button" onClick={handleClick}>
            Log In
          </button>
        </div>
      </div>
  );
}

export default TopBar;
