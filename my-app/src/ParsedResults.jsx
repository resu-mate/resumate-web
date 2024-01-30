import { saveAs } from "file-saver";

export const ParsedResults = ({ showComponent, parsedResults, authenticated }) => {
    if (!parsedResults) {
        showComponent = false;
    }

    const saveResults = () => {
        // TODO
    };

    const downloadResults = () => {
        const blob = new Blob([parsedResults], {
            type: "text/plain",
        });
        saveAs(blob, "parsed_results.txt");
    };

    return (
        <div className="bounding-box">
            <div className="parsed-results">
                <div className="title">Here are your parsed results</div>
                {parsedResults && (
                    <div className="parsed-text-container">
                        <div className="parsed-text">{parsedResults}</div>
                    </div>
                )}
            </div>
            {parsedResults && authenticated && (
                <button className="button-dark" onClick={saveResults}>
                    Save Parsed Results
                </button>
            )}
            {parsedResults && (
                <button className="button-dark" onClick={downloadResults}>
                    Download Parsed Results
                </button>
            )}
        </div>
    );
};
