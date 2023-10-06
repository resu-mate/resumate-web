import React, { useState } from 'react';
import './App.css';
import TopBar from './TopBar';
import { FileUploader } from './FileUploader';
import { ParsedResults } from './ParsedResults';

function App() {
  const [showParsedResults, setShowParsedResults] = useState(false);
  const [parsedResults, setParsedResults] = useState('');

  const setShow = (value: boolean) => {
    setShowParsedResults(value);
  };

  const setResults = (value: any) => {
    setParsedResults(value);
  };

  return (
    <header className="app">
        <div className="top">
          <TopBar />
        </div>
        <div className="middle-left">
          <FileUploader setShowParsedResults={setShow} setParsedResults={setResults} />
        </div>
        {showParsedResults && 
        <div className="middle-right">
          <ParsedResults showComponent={showParsedResults} parsedResults={parsedResults}/>
        </div>}
    </header>
  );
}

export default App;
