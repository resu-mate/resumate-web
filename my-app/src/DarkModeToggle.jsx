import { useState } from 'react';
import './DarkModeToggle.css';

function DarkModeToggle({ setMode }) {
    const [checked, setChecked] = useState(true);

    const handleClick = () => {
        if (localStorage.getItem('ld-mode') === 'light-mode') {
            localStorage.setItem('ld-mode', 'dark-mode');
            setMode('dark-mode');
            setChecked(false);
        } else if (localStorage.getItem('ld-mode') === 'dark-mode') {
            localStorage.setItem('ld-mode', 'light-mode');
            setMode('light-mode');
            setChecked(true);
        }
    };

    return (
        <div className="toggle-outer">
            <input
                role="switch"
                type="checkbox"
                id="toggle"
                className="checkbox"
                onClick={handleClick}
                checked={checked}
                readOnly
            />
            <label htmlFor="toggle" className="toggle-inner"/>
        </div>
    );
}

export default DarkModeToggle;
