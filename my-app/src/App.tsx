import { useState, useEffect } from "react";
import "./App.css";
import TopBar from "./TopBar";
import { FileUploader } from "./FileUploader";
import { ParsedResults } from "./ParsedResults";

function App() {
    const [mode, setMode] = useState("light-mode");
    const [showParsedResults, setShowParsedResults] = useState(false);
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

    const setShow = (value: boolean) => {
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
            <div className={`${showParsedResults ? "middle-left" : "middle"}`}>
                <FileUploader setShowParsedResults={setShow} setParsedResults={setResults} />
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
        </header>
    );
}

export default App;
