import React from 'react';

export const ParsedResults = ({ showComponent }) => {
  return (
    <div>
        {showComponent && 
        <div className="parsed-results">
            <div className="bounding-box">
                <div className="title">
                    Here are your parsed results!
                </div>
                <div>
                    a bunch of skills. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div>
                    education. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div>
                    past work experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    a lot of it. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div>
                    projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div>
                    achievements. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
            </div>
        </div>}
    </div>
  );
};
