import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import PunchInScreen from "./components/PunchInScreen";
import NotFound from "./components/NotFound";
import Summary from "./components/Summary";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<PunchInScreen />} />
                <Route path="summary" element={<Summary />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
