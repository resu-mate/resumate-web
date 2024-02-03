import { useState } from 'react';
import { ScoringAnimation } from "./ScoringAnimation";

export const JobDescriptionInput = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(null);

    const handleScore = () => {
        // TODO actually score the match between the resume and job description, maybe using OpenAI API
        setLoading(true);

        setTimeout(() => {
            const score = Math.floor(Math.random() * 100);
            setScore(score);
            setLoading(false);
            setShowModal(true);
        }, 1000);
    };

    const closeModal = () => {
        setShowModal(false);
        setScore(null);
    };

    return (
        <div className="bounding-box">
            <div className="job-description-input">
                <div className="title">Paste a job description here</div>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="textarea"
                />
            </div>
            <button className="button-dark" onClick={handleScore}>
                Score
            </button>
            {loading && (
                <div className="body-text">
                    <ScoringAnimation />
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content" >
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <p>Resume Score: {score}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
