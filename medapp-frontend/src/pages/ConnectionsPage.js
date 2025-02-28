import React, { useState } from 'react';
import './ConnectionsPage.css';

export default function ConnectionsPage() {
  // For demonstration, simulate role selection:
  const [role, setRole] = useState('patient'); // Change to 'doctor' to test doctor view

  const doctorConnections = [
    { id: 1, patientName: 'Alice Johnson', mobile: '+1111111111' },
    { id: 2, patientName: 'Bob Smith', mobile: '+2222222222' },
  ];

  const patientConnections = [
    { id: 1, doctorName: 'Dr. Emily Brown', mobile: '+3333333333' },
    { id: 2, doctorName: 'Dr. Michael Davis', mobile: '+4444444444' },
  ];

  return (
    <div className="container">
      <h2>Connections</h2>
      <div className="role-toggle">
        <button onClick={() => setRole('patient')} className={role === 'patient' ? 'active' : ''}>
          Patient View
        </button>
        <button onClick={() => setRole('doctor')} className={role === 'doctor' ? 'active' : ''}>
          Doctor View
        </button>
      </div>
      {role === 'doctor' ? (
        <div className="connection-list">
          <h3>Connected Patients</h3>
          {doctorConnections.map((conn) => (
            <div key={conn.id} className="connection-card">
              <h4>{conn.patientName}</h4>
              <p>{conn.mobile}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="connection-list">
          <h3>Connected Doctors</h3>
          {patientConnections.map((conn) => (
            <div key={conn.id} className="connection-card">
              <h4>{conn.doctorName}</h4>
              <p>{conn.mobile}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
