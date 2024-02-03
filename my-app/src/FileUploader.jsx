import { useState, useRef } from "react";
import { ParsingAnimation } from "./ParsingAnimation";
const pdfjs = require("pdfjs-dist/legacy/build/pdf");
const _ = require('lodash');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const FileUploader = ({ setShowParsedResults, setParsedResults, setShowJobDescriptionInput }) => {
    const fileInputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);
    const [fileBinary, setFileBinary] = useState("");
    const [fileData, setFileData] = useState([]);
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState("");
    const [loading, setLoading] = useState(false);

    async function getItems(fileData) {
        const fileArray = new Uint8Array(fileData);
        return pdfjs.getDocument(new Uint8Array(fileArray)).promise
            .then((pdfDocument) => {
                // get all the pages from pdf
                const numPages = pdfDocument.numPages;
                return Promise.all(_.range(1, numPages + 1).map((pageNum) => {
                    return pdfDocument.getPage(pageNum);
                }));
            })
            .then((pages) => {
                // get text content items from all pages
                return Promise.all(pages.map((page) => {
                    return page.getTextContent().then((content) => {
                        // remove headers and page number
                        const resultStr = content.items.map(i => i.str);
                        return resultStr.join(" ").replace(/ {2,}/g, ' ').replace(/ ,/g, ',').replace(/(\d) (\d)/g, '$1$2');
                    });
                }));
            })
    }

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDragLeave = () => {
        setDragOver(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragOver(false);

        const fileRef = e.dataTransfer.files[0];
        handleFile(fileRef);
        fileInputRef.current.files = e.dataTransfer.files;
    };

    const handleFile = (fileRef) => {
        const fileName = fileRef.name;
        setFileName(fileName);
        const fileType = fileRef.type;
        setFileType(fileType);

        const reader1 = new FileReader();
        reader1.readAsBinaryString(fileRef);
        reader1.onload = (ev) => {
            setFileBinary(`${btoa(ev.target.result)}`);
        };

        const reader2 = new FileReader();
        reader2.readAsArrayBuffer(fileRef);
        reader2.onload = (ev) => {
            setFileData(ev.target.result);
        };
    };

    const onChange = (e) => {
        setParsedResults(null);
        if (e.target.files.length > 0) {
            const fileRef = e.target.files[0];
            handleFile(fileRef);
        } else {
            setFileBinary("");
            setFileName("");
        }
    };

    const handleClick = (e) => {
        fileInputRef.current.click();
        e.preventDefault();
    };

    const onSubmit = async (e) => {
        setLoading(true);
        setShowJobDescriptionInput(false);
        setParsedResults(null);

        e.preventDefault();
        
        const parsedText = await getItems(fileData);
        setParsedResults(parsedText);

        setLoading(false);
        setShowParsedResults(true);

        if (fileBinary === '') return;

        try {
            if (!fileBinary) {
                console.error("no file submitted");
                setLoading(false);
                setShowParsedResults(false);
                return;
            }

            if (fileType !== "application/pdf") {
                console.error("not a pdf");
                setLoading(false);
                setShowParsedResults(false);
                return;
            }

            // commenting out plaintext api call
            // const response = await fetch("https://3trpak7uyg.execute-api.us-east-1.amazonaws.com/dev/upload-file", {
            //     method: "POST",
            //     body: fileBinary,
            //     headers: {
            //         "Content-Type": "application/pdf",
            //     },
            // });

            // if (!response.ok) {
            //     setLoading(false);
            //     setShowParsedResults(true);
            //     throw new Error("error");
            // }

            // const data = await response.text();
            // const plaintextData = JSON.parse(data);
            // setParsedResults(plaintextData);

            // ALL OF THIS IS FOR PLAINTEXT TO PARSED RESULTS
            // console.log(plaintextData.extracted_text)

            // const response2 = await fetch('https://no7f2zeeci.execute-api.us-east-1.amazonaws.com/default/parseText', {
            //   method: 'POST',
            //   body: plaintextData.extracted_text,
            // });

            // const data2 = await response2.text();

            setLoading(false);
            setShowParsedResults(true);
        } catch (error) {
            console.error("error:", error);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        setDragOver(false);
        fileInputRef.current.value = "";
        setFileBinary("");
        setFileName("");
        setLoading(false);
        setShowParsedResults(false);
        setParsedResults(null);
        setShowJobDescriptionInput(false);
    };

    const handleMatch = (e) => {
        e.preventDefault();
        setShowJobDescriptionInput(true);
        setShowParsedResults(false);
    };

    return (
        <form
            className="file-uploader"
            onSubmit={onSubmit}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className={`drop-area${dragOver ? " drag-over" : ""}`}>
                {dragOver && <div className="overlay"></div>}
                <div className="title">Upload your resume here</div>
                <div className="file-chooser">
                    <div>
                        <button className="button-light" onClick={handleClick}>
                            Choose file
                        </button>
                        <input
                            ref={fileInputRef}
                            aria-label="file-input"
                            type="file"
                            accept=".pdf, .doc, .docx"
                            onChange={onChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className="file-input-text">{fileName === "" ? "No file uploaded" : fileName}</div>
                </div>

                {
                // fileBinary && fileType === "application/pdf" && (
                //     <div className="preview-container">
                //         <embed src={`${fileData}#toolbar=0&navpanes=0`} height="100%" type="application/pdf" />
                //         {/* <iframe src={`${fileData}#toolbar=0`} height="100%" width="100%" title="Embedded PDF" /> */}
                //     </div>
                // )
                }

                {/* { fileBinary && file.indexOf('application/msword') > -1 && (
            <div className="preview-container">
              <p>TODO: This is a .doc file preview</p>
            </div>)}

            {fileBinary && file.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') > -1 && (
            <div className="preview-container">
              <p>TODO: This is a .docx file preview</p>
            </div>)} */}
            </div>
            <div>
                <button className="button-dark" onClick={handleReset} disabled={!fileBinary} title={fileBinary ? '' : 'No file uploaded'}>
                    Reset
                </button>
                <button className="button-dark" onClick={onSubmit} disabled={!fileBinary} title={fileBinary ? '' : 'No file uploaded'}>
                    Parse
                </button>
                <button className="button-dark" onClick={handleMatch} disabled={!fileBinary} title={fileBinary ? '' : 'No file uploaded'}>
                    Match
                </button>
            </div>
            <div>
                {loading && (
                    <div className="body-text">
                        <ParsingAnimation />
                    </div>
                )}
            </div>
        </form>
    );
};
