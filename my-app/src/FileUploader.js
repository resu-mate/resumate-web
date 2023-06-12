import {useState} from 'react';

export const FileUploader = () => {
    const [files, setFiles] = useState([]);

    const onChange = (e) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        // use files
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input type="file" onChange={onChange}/>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
};