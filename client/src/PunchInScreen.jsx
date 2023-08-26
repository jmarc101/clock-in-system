import React, { useState, useEffect } from 'react';
import './PunchInScreen.css';
import { Button, Typography } from '@mui/material';
import { createOrEndEmployeeWorkShift, getEmployees } from './Services/api';

function PunchButton({ label, onClick }) {
    const clicked = () => {
        onClick();
    };
    return (
        <Button onClick={clicked} variant="contained" className="punch-btn">
            <Typography variant="h4">{label}</Typography>
        </Button>
    );
}

function toggleFullscreen() {
    // Check if we are currently in fullscreen mode
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

function PunchBox() {
    const [punchCode, setPunchCode] = useState('');
    const [employees, setEmployees] = useState([{}]);
    const [message, setMessage] = useState('');

    const onNumberClick = btnLabel =>
        punchCode.length < 4 ? setPunchCode(punchCode + btnLabel) : undefined;

    const onClearClick = () => setPunchCode('');
    const clearEmployeeAndMessageInXSeconds = secondes => {
        setTimeout(() => {
            setMessage('');
        }, secondes * 1000);
    };

    const onOkClick = async () => {
        const emp = employees.find(e => e.code === punchCode);
        if (!emp) {
            setMessage('Code Invalide');
            clearEmployeeAndMessageInXSeconds(2);
            setPunchCode('');
            return;
        }

        clearEmployeeAndMessageInXSeconds(5);
        const shift = await createOrEndEmployeeWorkShift(emp.id);
        setMessage(`${shift.end ? 'Bye' : 'Bonjour'} ${emp.name}`);
        setPunchCode('');
    };

    useEffect(() => {
        getEmployees().then(data => setEmployees(data));
    }, []);

    return (
        <div className="punch">
            <Typography variant="h2" className="message">
                {message}
            </Typography>
            <div className="punch-box">
                <div className="punch-row">
                    <PunchButton label="1" onClick={() => onNumberClick(1)} />
                    <PunchButton label="2" onClick={() => onNumberClick(2)} />
                    <PunchButton label="3" onClick={() => onNumberClick(3)} />
                </div>
                <div className="punch-row">
                    <PunchButton label="4" onClick={() => onNumberClick(4)} />
                    <PunchButton label="5" onClick={() => onNumberClick(5)} />
                    <PunchButton label="6" onClick={() => onNumberClick(6)} />
                </div>
                <div className="punch-row">
                    <PunchButton label="7" onClick={() => onNumberClick(7)} />
                    <PunchButton label="8" onClick={() => onNumberClick(8)} />
                    <PunchButton label="9" onClick={() => onNumberClick(9)} />
                </div>
                <div className="punch-row">
                    <PunchButton label="Clear" onClick={onClearClick} />
                    <PunchButton label="0" onClick={() => onNumberClick(0)} />

                    <PunchButton label="Ok" onClick={onOkClick} />
                </div>
            </div>
            <div className="punchcode">
                <Typography variant="h2">{punchCode}</Typography>
            </div>
        </div>
    );
}

function PunchInScreen() {
    return (
        <div className="punch-in-screen">
            <PunchBox />
        </div>
    );
}

export default PunchInScreen;
