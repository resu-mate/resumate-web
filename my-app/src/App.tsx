import React, { useState } from 'react';
import './App.css';
import TopBar from './TopBar';
import { FileUploader } from './FileUploader';
import { ParsedResults } from './ParsedResults';

function App() {
  const [showParsedResults, setShowParsedResults] = useState(false);

  const handleChange = (value: boolean) => {
    setShowParsedResults(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <TopBar />
        </div>
        <div className="middle-left">
          <FileUploader onShowParsedResultsChange={handleChange} />
        </div>
        <div className="middle-right">
          <ParsedResults showComponent={showParsedResults}/>
        </div>
      </header>
    </div>
  );
}

export default App;
