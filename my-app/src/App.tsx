import { useState, useEffect } from "react";
import "./App.css";
import TopBar from "./TopBar";
import { FileUploader } from "./FileUploader";
import { ParsedResults } from "./ParsedResults";
import { JobDescriptionInput } from "./JobDescriptionInput";

function App() {
    const [mode, setMode] = useState("light-mode");
    const [showParsedResults, setShowParsedResults] = useState(false);
    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(false);
    const [parsedResults, setParsedResults] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const mode = localStorage.getItem('ld-mode');
        if (mode) {
            setMode(mode);
        } else {
            localStorage.setItem('ld-mode', 'light-mode');
            setMode('light-mode');
        }
    }, [setMode])

    const setShowJobDescription = (value: boolean) => {
        setShowJobDescriptionInput(value);
    };

    const setShowResults = (value: boolean) => {
        setShowParsedResults(value);
    };

    const setResults = (value: any) => {
        setParsedResults(value);
    };

    const setAuth = (value: boolean) => {
        setAuthenticated(value);
    };

    return (
        <header className={`app ${mode}`}>
            <div className="top">
                <TopBar setAuth={setAuth} setMode={setMode} />
            </div>
            <div className={`${showParsedResults || showJobDescriptionInput ? "middle-left" : "middle"}`}>
                <FileUploader setShowParsedResults={setShowResults} setParsedResults={setResults} setShowJobDescriptionInput={setShowJobDescription} />
            </div>
            {showParsedResults && (
                <div className="middle-right">
                    <ParsedResults
                        showComponent={showParsedResults}
                        parsedResults={parsedResults}
                        authenticated={authenticated}
                    />
                </div>
            )}
            {showJobDescriptionInput && (
                <div className="middle-right">
                    <JobDescriptionInput/>
                </div>
            )}
        </header>
    );
}

export default App;
