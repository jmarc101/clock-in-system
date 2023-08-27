import axios from "axios";

const BASE_URL = "http://192.168.2.200:4000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleResponse = responsePromise =>
    responsePromise
        .then(response => response.data)
        .catch(error => {
            console.error("🚨🚨 API call failed:", error);
            throw error;
        });

export const getEmployees = () => handleResponse(api.get("/employees"));

export const getEmployeeLastWorkShift = employeeId =>
    handleResponse(api.get(`/employees/${employeeId}/workshift`));

export const getWorkShifts = (startDate, endDate) =>
    handleResponse(
        api.get("/workshifts", {
            params: { startDate, endDate },
        }),
    );

export const getAdmins = () => handleResponse(api.get("/admins"));

export const getEmployeeWorkShifts = (employeeId, startDate, endDate) =>
    handleResponse(
        api.get(`/employees/${employeeId}/workshifts`, {
            params: { startDate, endDate },
        }),
    );

export const createEmployee = (name, code) => handleResponse(api.post("/employee", { name, code }));

export const createOrEndEmployeeWorkShift = (employeeId, date) =>
    handleResponse(api.post(`/employee/${employeeId}/workshift`, { date }));

export const createWorkShift = (employeeId, startDate, endDate) =>
    handleResponse(
        api.post("/workshift", {
            employeeId,
            startDate,
            endDate,
        }),
    );

export const updateEmployee = (employeeId, name, code) =>
    handleResponse(api.put(`/employee/${employeeId}`, { name, code }));

export const updateWorkShift = (workshiftId, startDate, endDate) =>
    handleResponse(
        api.put(`/workshift/${workshiftId}`, {
            startDate,
            endDate,
        }),
    );

export const deleteWorkShift = workshiftId =>
    handleResponse(api.delete(`/workshift/${workshiftId}`));
