import React from 'react';

export const ParsedResults = ({ showComponent, parsedResults, authenticated }) => {
    if (!parsedResults || !parsedResults.extracted_text) {
        showComponent = false;
    }

    const saveResults = () => {
        // TODO
    };

    const downloadResults = () => {
        // TODO
    };

    return (
        <div className='bounding-box'>
            <div className="parsed-results">
                <div className="title">
                    Here are your parsed results!
                </div>
                {parsedResults.extracted_text &&
                <div className="parsed-text-container">
                    <div className="parsed-text">
                        {parsedResults.extracted_text}
                    </div>
                </div>}
            </div>
            {parsedResults.extracted_text && authenticated && 
                <button className="button" onClick={saveResults}>
                    Save Parsed Results
                </button> 
            }
            {parsedResults.extracted_text &&  
                <button className="button" onClick={downloadResults}>
                    Download Parsed Results
                </button> 
            }
        </div>
    );
};
