import React, { useState } from 'react';
import './AppointmentsPage.css';

export default function AppointmentsPage() {
  const initialAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Smith',
      doctorContact: '+1234567890',
      reason: 'Regular check-up',
      dateTime: '2023-03-15T10:00',
    },
  ];
  const [appointments, setAppointments] = useState(initialAppointments);
  const [formData, setFormData] = useState({
    doctorName: '',
    doctorContact: '',
    reason: '',
    dateTime: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = { id: Date.now(), ...formData };
    setAppointments([...appointments, newAppointment]);
    setFormData({ doctorName: '', doctorContact: '', reason: '', dateTime: '' });
  };

  return (
    <div className="container">
      <h2>Appointments</h2>
      <div className="appointments-list">
        {appointments.map((appt) => (
          <div key={appt.id} className="appointment-card">
            <h3>{appt.doctorName}</h3>
            <p>Contact: {appt.doctorContact}</p>
            <p>Reason: {appt.reason}</p>
            <p>Date & Time: {new Date(appt.dateTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <h3>Add New Appointment</h3>
      <form onSubmit={handleSubmit} className="appointment-form">
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor's Name"
          value={formData.doctorName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="doctorContact"
          placeholder="Doctor's Contact"
          value={formData.doctorContact}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason for Appointment"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
}
