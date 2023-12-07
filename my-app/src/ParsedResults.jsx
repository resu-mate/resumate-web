import { useState } from "react";
import { saveAs } from "file-saver";
import { ScoringAnimation } from "./ScoringAnimation";

export const ParsedResults = ({ showComponent, parsedResults, authenticated }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(null);

    if (!parsedResults || !parsedResults.extracted_text) {
        showComponent = false;
    }

    const saveResults = () => {
        // TODO
    };

    const downloadResults = () => {
        const blob = new Blob([parsedResults.extracted_text], {
            type: "text/plain",
        });
        saveAs(blob, "parsed_results.txt");
    };

    const scoreResume = () => {
        setLoading(true);

        // TODO fix implementation to call API endpoint to get score and then stop loading
        setTimeout(() => {
            const score = Math.floor(Math.random() * 100); // TODO: need to actually score resumes based on model
            setScore(score);
            setLoading(false);
            setShowModal(true);
        }, 2000);
    };

    const closeModal = () => {
        setShowModal(false);
        setScore(null);
    };

    return (
        <div className="bounding-box">
            <div className="parsed-results">
                <div className="title">Here are your parsed results!</div>
                {parsedResults.extracted_text && (
                    <div className="parsed-text-container">
                        <div className="parsed-text">{parsedResults.extracted_text}</div>
                    </div>
                )}
            </div>
            {parsedResults.extracted_text && authenticated && (
                <button className="button" onClick={saveResults}>
                    Save Parsed Results
                </button>
            )}
            {parsedResults.extracted_text && (
                <button className="button" onClick={downloadResults}>
                    Download Parsed Results
                </button>
            )}
            {parsedResults.extracted_text && (
                <button className="button" onClick={scoreResume}>
                    Score Resume
                </button>
            )}

            {loading && (
                <div className="body-text">
                    <ScoringAnimation />
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content" >
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <p>Resume Score: {score}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
