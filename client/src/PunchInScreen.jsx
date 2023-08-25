import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PunchInScreen.css';

const PunchButton = ({ label, onClick }) => {
  const clicked = () => {
    console.log('PunchButton: ', label);
    onClick();
  };
  return (
    <button onClick={clicked} className="punch-btn">
      {label}
    </button>
  );
};

const PunchBox = () => {
  return (
    <div className="punch-box">
      <div className="punch-row">
        <PunchButton label="1" onClick={() => {}} />
        <PunchButton label="2" onClick={() => {}} />
        <PunchButton label="3" onClick={() => {}} />
      </div>
      <div className="punch-row">
        <PunchButton label="4" onClick={() => {}} />
        <PunchButton label="5" onClick={() => {}} />
        <PunchButton label="6" onClick={() => {}} />
      </div>
      <div className="punch-row">
        <PunchButton label="7" onClick={() => {}} />
        <PunchButton label="8" onClick={() => {}} />
        <PunchButton label="9" onClick={() => {}} />
      </div>
      <div className="punch-row">
        <PunchButton label="C" onClick={() => {}} />
        <PunchButton label="0" onClick={() => {}} />
        <PunchButton label="<==" onClick={() => {}} />
      </div>
    </div>
  );
};

const PunchInScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/employees');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="punch-in-screen">
      <h1>Punch In Screen</h1>
      {data.map((employee) => (
        <div key={employee.id}> {employee.name} </div>
      ))}
      <PunchBox />
    </div>
  );
};

export { PunchInScreen };
