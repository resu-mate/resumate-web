import { useState, useRef } from 'react';
import { LoadingAnimation } from './LoadingAnimation';


export const FileUploader = ({ setShowParsedResults, setParsedResults }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setSubmitted(false);
    const fileName = fileRef.name;
    setFileName(fileName);
    const reader = new FileReader();
    // reader.readAsDataURL(fileRef);
    // reader.onload = (ev) => {
    //   setFile(ev.target.result);
    // };
    reader.readAsBinaryString(fileRef)
    reader.onload=(ev) => {
      setFile(`${btoa(ev.target.result)}`)
    }
  };

  const onChange = (e) => {
    setSubmitted(false);
    if ((e.target.files).length > 0) {
      const fileRef = e.target.files[0];
      handleFile(fileRef);
    } else {
      setFile('');
      setFileName('');
    }
  };

  const onSubmit = async (e) => {
    console.log({ file }); // show in console until handled
    e.preventDefault();
    setSubmitted(true);
    setLoading(true); 

    try {
      if (!file) {
        console.error('no file submitted');
        setLoading(false); 
        setShowParsedResults(true);
        return;
      }

      // if (file.indexOf('application/pdf') <= -1) {
      //   console.error('not a pdf');
      //   setLoading(false); 
      //   setShowParsedResults(true);
      //   return;
      // }

      const response = await fetch('https://3trpak7uyg.execute-api.us-east-1.amazonaws.com/dev/upload-file', {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        setLoading(false); 
        setShowParsedResults(true);
        throw new Error('error');
      }

      const data = await response.text();
      const parsedData = JSON.parse(data);
      setParsedResults(parsedData);

      setLoading(false); 
      setShowParsedResults(true);
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setDragOver(false);
    fileInputRef.current.value = '';
    setFile('');
    setFileName('');
    setSubmitted(false);
    setLoading(false);
    setShowParsedResults(false); 
  };


  return (
    <form className="file-uploader" onSubmit={onSubmit} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        <div className={`drop-area${dragOver ? ' drag-over' : ''}`}>
          {dragOver && (
          <div className="overlay">
          </div>)}
          <div className="title">
            Upload your resume here!
          </div>
          <div className="file-chooser">
            <input ref={fileInputRef} type="file" accept=".pdf, .doc, .docx" onChange={onChange}/>
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
          <button className="button" onClick={handleReset}>
              Reset
          </button>
          <button className="button" type="submit">
              Submit
            </button>
        </div>
        <div>
            {submitted && file && 
            <div className="body-text">
              You submitted {fileName}!
            </div>}
            {loading &&
            <div className="body-text">
              <LoadingAnimation />
            </div>}
        </div>
    </form>
  );
};
