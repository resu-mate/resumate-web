import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FileUploader } from './FileUploader';
import TopBar from './TopBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <TopBar />
        </div>
        <div className="middle-left">
          <FileUploader />
        </div>
      </header>
    </div>
  );
}

export default App;
