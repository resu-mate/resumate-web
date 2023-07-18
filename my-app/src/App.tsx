import React, { useState } from "react";
import "./App.css";
import TopBar from "./TopBar";
import { FileUploader } from "./FileUploader";
import { ParsedResults } from "./ParsedResults";

function App() {
  const [showParsedResults, setShowParsedResults] = useState(false);

  return (
    <div className="app">
      <div className="top">
        <TopBar />
      </div>
      <div className="middle-left">
        <FileUploader setShowParsedResults={setShowParsedResults} />
      </div>
      <div className="middle-right">
        <ParsedResults showComponent={showParsedResults} />
      </div>
    </div>
  );
}

export default App;
