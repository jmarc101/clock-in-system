import React, { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import {
    Divider,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
} from "@mui/material";
import { getEmployeeWorkshifts, getEmployees } from "../services/api";
import "./Summary.css";

const calculateListItemHoursPerWorkshift = workshift => {
    if (!workshift.start || !workshift.end) {
        const formattedDate = new Date(workshift.start).toDateString();
        return `${formattedDate}: workshift id - ${workshift.id} - is invalid`;
    }

    const minutesWorked = (new Date(workshift.end) - new Date(workshift.start)) / 60000;
    const dateInString = new Date(workshift.start).toDateString();
    const hours = Math.floor(minutesWorked / 60);
    const minutes = Math.floor(minutesWorked % 60);

    return `${dateInString}: ${hours} hours and ${minutes} minutes`;
};

const calculateTotalHoursForEmplyee = workshifts => {
    const totalMinutes = workshifts.reduce(
        (acc, workshift) =>
            workshift.start && workshift.end
                ? acc + (new Date(workshift.end) - new Date(workshift.start)) / 60000
                : acc,
        0,
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `${hours} hours and ${minutes} minutes`;
};

function Summary() {
    const [employees, setEmployees] = React.useState([]);
    const [workshifts, setWorkshifts] = React.useState([]);
    const [employeeId, setEmployeeId] = React.useState("");
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    useEffect(() => {
        getEmployees().then(data => setEmployees(data));
    }, []);

    useEffect(() => {
        if (!employeeId || !startDate || !endDate) {
            return;
        }
        // Add one day to the end date to include the end date in the search
        const endDatePlusOneDay = new Date(endDate.setDate(new Date(endDate).getDate() + 1));
        getEmployeeWorkshifts(employeeId, startDate, endDatePlusOneDay).then(data => {
            setWorkshifts(data.sort((a, b) => new Date(a.start) - new Date(b.start)));
        });
    }, [employeeId, startDate, endDate]);

    return (
        <div className="summary-cont">
            <h1>Summary</h1>
            <div className="info-select">
                <FormControl className="select-control">
                    <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={employeeId}
                        label="Employee"
                        onChange={event => setEmployeeId(event.target.value)}
                    >
                        {employees.map(employee => (
                            <MenuItem key={employee.id} value={employee.id}>
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={date => setStartDate(date)}
                />
                <DatePicker label="End Date" value={endDate} onChange={date => setEndDate(date)} />
            </div>
            <List className="summary-list">
                {workshifts.map(workshift => (
                    <ListItem key={workshift.id}>
                        <ListItemText primary={calculateListItemHoursPerWorkshift(workshift)} />
                    </ListItem>
                ))}
                <Divider />
                <ListItem>
                    <ListItemText
                        primary={`Total hours: ${calculateTotalHoursForEmplyee(workshifts)}`}
                    />
                </ListItem>
            </List>
        </div>
    );
}

export default Summary;
