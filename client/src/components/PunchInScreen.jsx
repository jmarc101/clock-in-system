import React, { useState, useEffect } from "react";
import "./PunchInScreen.css";
import { Fab } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { punchEmployee, getEmployees } from "../services/api";
import useWindowFullscreenToggle from "../hooks/useWindowFullScreenToggle";

function NumberFab({ number, onNumberClick }) {
    return (
        <Fab className="fab" color="primary" onClick={onNumberClick}>
            <span>{number}</span>
        </Fab>
    );
}

function PunchBox() {
    const { isFullscreen, toggleFullscreen } = useWindowFullscreenToggle();
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
        if (punchCode === "99" && isFullscreen) {
            toggleFullscreen();
            setPunchCode("");
            return;
        }

        if (!emp) {
            setMessage("Code Invalide");
            clearEmployeeAndMessageInXSeconds(2);
            setPunchCode("");
            return;
        }

        clearEmployeeAndMessageInXSeconds(5);
        const shift = await punchEmployee(emp.id);
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
                    <NumberFab number={1} onNumberClick={() => onNumberClick(1)} />
                    <NumberFab number={2} onNumberClick={() => onNumberClick(2)} />
                    <NumberFab number={3} onNumberClick={() => onNumberClick(3)} />
                </div>
                <div className="punch-row">
                    <NumberFab number={4} onNumberClick={() => onNumberClick(4)} />
                    <NumberFab number={5} onNumberClick={() => onNumberClick(5)} />
                    <NumberFab number={6} onNumberClick={() => onNumberClick(6)} />
                </div>
                <div className="punch-row">
                    <NumberFab number={7} onNumberClick={() => onNumberClick(7)} />
                    <NumberFab number={8} onNumberClick={() => onNumberClick(8)} />
                    <NumberFab number={9} onNumberClick={() => onNumberClick(9)} />
                </div>
                <div className="punch-row">
                    <Fab className="fab" color="primary" onClick={onClearClick}>
                        <BackspaceIcon fontSize="large" />
                    </Fab>
                    <NumberFab number={0} onNumberClick={() => onNumberClick(0)} />

                    <Fab className="fab" color="primary" onClick={onOkClick}>
                        <DoneOutlineIcon fontSize="large" />
                    </Fab>
                </div>
            </div>
            <div className="message">{message}</div>
        </div>
    );
}

function PunchInScreen() {
    const { isFullscreen, toggleFullscreen } = useWindowFullscreenToggle();

    return (
        <div className="punch-in-screen">
            <PunchBox />
            {!isFullscreen && (
                <Fab
                    variant="extended"
                    color="primary"
                    onClick={toggleFullscreen}
                    className="fullscreen-btn"
                >
                    <span>Fullscreen</span>
                </Fab>
            )}
        </div>
    );
}

export default PunchInScreen;
