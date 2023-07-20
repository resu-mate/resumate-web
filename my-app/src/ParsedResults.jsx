import React from 'react';

export const ParsedResults = ({ showComponent, parsedResults }) => {

    if (!parsedResults || !parsedResults.extracted_text) {
        showComponent = false;
    }

  return (
    <div className={`${showComponent ? 'bounding-box' : 'hidden'}`}>
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
    </div>
  );
};
