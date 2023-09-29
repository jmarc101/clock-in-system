import axios from "axios";

const BASE_URL = "http://localhost:4000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleResponse = responsePromise =>
    responsePromise
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("🚨🚨 API call failed:", error);
            throw error;
        });

export const getEmployees = () => handleResponse(api.get("/employees"));

export const getEmployeeWorkshifts = (employeeId, startDate, endDate) =>
    handleResponse(
        api.get(`/employees/${employeeId}/workshifts`, {
            params: { startDate, endDate },
        }),
    );

export const punchEmployee = (employeeId, date) =>
    handleResponse(api.post(`/employees/${employeeId}/punch`, { date }));
