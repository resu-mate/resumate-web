import React, {
  useState,
  useEffect,
  useRef,
  DragEvent,
  FormEvent,
} from "react";
import { LoadingAnimation } from "./LoadingAnimation";
import Button from "@mui/material/Button";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "./FileUploader.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export const FileUploader = ({
  setShowParsedResults,
}: {
  setShowParsedResults: (
    parsedResults: boolean | ((prevState: boolean) => boolean)
  ) => void;
}) => {
  const fileInputRef = useRef<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  const onDragOver = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const onDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDragOver(false);

    const fileRef = e.dataTransfer.files[0];
    handleFile(fileRef);
    fileInputRef.current.files = e.dataTransfer.files;
  };

  const handleFile = (fileRef: any) => {
    setSubmitted(false);
    const fileName = fileRef.name;
    setFileName(fileName);
    setFile(fileRef);
  };

  const onChange = (e: any) => {
    setSubmitted(false);
    if (e.target.files.length > 0) {
      const fileRef = e.target.files[0];
      handleFile(fileRef);
    } else {
      setFile("");
      setFileName("");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log({ file }); // show in console until handled
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowParsedResults(true);
    }, 1000); // update to keep 'loading' until something is returned from parsing service
    setLoading(false);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setDragOver(false);
    fileInputRef.current.value = "";
    setFile("");
    setFileName("");
    setSubmitted(false);
    setLoading(false);
    // TODO: should also stop parsing
  };

  const onDocumentLoadSuccess = (num: { _pdfInfo: { numPages: number } }) => {
    setNumPages(num._pdfInfo.numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

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
        <div className="title">Upload your resume here!</div>
        <div className="file-chooser">
          <div className="pdf_container">
            <div className="pdf_container_load">
              <label htmlFor="file">Load from file:</label>{" "}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={onChange}
              />
            </div>
            <div className="prev_next_buttons">
              {numPages >= 1 && (
                <nav>
                  <Button
                    variant="contained"
                    disabled={pageNumber == 1 || numPages == 1}
                    onClick={goToPrevPage}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="contained"
                    disabled={pageNumber == numPages}
                    onClick={goToNextPage}
                  >
                    Next
                  </Button>
                  <p className="page_num_text">
                    Page {pageNumber} of {numPages}
                  </p>
                </nav>
              )}
              <Document
                className="pdf_container_document"
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  className="pdf_container_page"
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
            {submitted && file && file.indexOf('application/pdf') > -1 && 
            <div className="preview-container">
              <embed src={file} height="400px" type="application/pdf"/>
            </div>}

            {submitted && file && file.indexOf('application/msword') > -1 && (
            <div className="preview-container">
              <p>TODO: This is a .doc file preview</p>
            </div>)}

            {submitted && file && file.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') > -1 && (
            <div className="preview-container">
              <p>TODO: This is a .docx file preview</p>
            </div>)}
        </div> */}
      <div>
        <Button className="button" variant="contained" onClick={handleReset}>
          Reset
        </Button>
        <Button className="button" variant="contained" type="submit">
          Submit
        </Button>
      </div>
      <div>
        {submitted && file && (
          <div className="body-text">You submitted {fileName}!</div>
        )}
        {loading && (
          <div className="body-text">
            <LoadingAnimation />
          </div>
        )}
      </div>
    </form>
  );
};
