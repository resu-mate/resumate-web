import React from 'react';

export const ParsedResults = ({ showComponent, parsedResults }) => {
  return (
    <div className={`${showComponent ? 'bounding-box' : 'hidden'}`}>
        <div className="parsed-results">
            <div className="title">
                Here are your parsed results!
            </div>
            {/* <div>
                a bunch of skills. Lorem ipsum dolor sit amet.
            </div>
            <div>
                education. Lorem ipsum dolor sit amet.
            </div>
            <div>
                past work experience. Lorem ipsum dolor sit amet.
            </div>
            <div>
                projects. Lorem ipsum dolor sit amet.
            </div>
            <div>
                achievements. Lorem ipsum dolor sit amet.
            </div> */}
            <div className="parsed-text">
                {parsedResults.extracted_text}
            </div>
        </div>
    </div>
  );
};
