import React from 'react';
import logo from './logo.svg';

function TopBar() {
  const handleClick = () => {
    // TODO: handle
    console.log('Log In button clicked');
  };

  return (
    <div>
      <div className="top-left">
        <img src={logo} className="website-logo"/>
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
