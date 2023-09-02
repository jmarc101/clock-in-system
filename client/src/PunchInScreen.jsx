import React, { useState, useEffect } from "react";
import "./PunchInScreen.css";
import { Button, Typography } from "@mui/material";
import { createOrEndEmployeeWorkShift, getEmployees } from "./Services/api";

function PunchButton({ label, onClick }) {
    const clicked = () => {
        onClick();
    };
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <button type="button" onClick={clicked} className="punch-btn">
            <h4>{label}</h4>
        </button>
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
    const [punchCode, setPunchCode] = useState("");
    const [employees, setEmployees] = useState([{}]);
    const [message, setMessage] = useState("");

    const onNumberClick = btnLabel =>
        punchCode.length < 4 ? setPunchCode(punchCode + btnLabel) : undefined;

    const onClearClick = () => setPunchCode("");
    const clearEmployeeAndMessageInXSeconds = secondes => {
        setTimeout(() => {
            setMessage("");
        }, secondes * 1000);
    };

    const onOkClick = async () => {
        const emp = employees.find(e => e.code === punchCode);
        if (!emp) {
            setMessage("Code Invalide");
            clearEmployeeAndMessageInXSeconds(2);
            setPunchCode("");
            return;
        }

        clearEmployeeAndMessageInXSeconds(5);
        const shift = await createOrEndEmployeeWorkShift(emp.id);
        setMessage(`${shift.end ? "Bye" : "Bonjour"} ${emp.name}`);
        setPunchCode("");
    };

    useEffect(() => {
        getEmployees().then(data => setEmployees(data));
    }, []);

    return (
        <div className="punch">
            <div className="punchcode">
                <span className="code-star">{punchCode.length >= 1 ? "*" : ""}</span>
                <span className="code-star">{punchCode.length >= 2 ? "*" : ""}</span>
                <span className="code-star">{punchCode.length >= 3 ? "*" : ""}</span>
                <span className="code-star">{punchCode.length === 4 ? "*" : ""}</span>
            </div>
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
            <div className="message">{message}</div>
        </div>
    );
}

function PunchInScreen() {
    const emps = [];
    getEmployees().then(data => emps.push(data[0]));

    return (
        <div className="punch-in-screen">
            <div>{emps.name}</div>
            <PunchBox />
            <button onClick={toggleFullscreen} type="button" className="fullscreen-btn">
                Pleine écran
            </button>
        </div>
    );
}

export default PunchInScreen;
