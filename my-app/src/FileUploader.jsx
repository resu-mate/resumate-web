import React, { useState } from 'react';

export const FileUploader = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    setSubmitted(false);
    if ((e.target.files).length > 0) {
      const fileRef = e.target.files[0];
      const fileName = fileRef.name;
      setFileName(fileName);
      const reader = new FileReader();
      reader.readAsDataURL(fileRef);
      reader.onload = (ev) => {
        setFile(ev.target.result);
      }; 
    } else {
      setFile('');
      setFileName('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({ file }); // show in console until handled
  };

  return (
    <form onSubmit={onSubmit}>
        <div className="title">
          Choose a file to upload
        </div>
        <div>
            <input type="file" accept=".pdf, .doc, .docx" onChange={onChange} />
        </div>
        <div>
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
        </div>
        <div>
            <button type="submit">
                Submit
            </button>
        </div>
        <div>
            {submitted && file && 
            <div className="body-text">
              You submitted {fileName}!
            </div>}
        </div>
    </form>
  );
};
