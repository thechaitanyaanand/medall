// src/pages/AppointmentsPage.js
import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import './AppointmentsPage.css';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    doctor_name: '',
    doctor_contact: '',
    appointment_reason: '',
    appointment_date: '', // ISO string or proper datetime input
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('/reminders/appointments/');
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error.response?.data || error.message);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/reminders/appointments/', newAppointment);
      setAppointments((prev) => [response.data, ...prev]);
      setNewAppointment({
        doctor_name: '',
        doctor_contact: '',
        appointment_reason: '',
        appointment_date: '',
      });
    } catch (error) {
      console.error("Error creating appointment:", error.response?.data || error.message);
      alert("Error creating appointment.");
    }
  };

  return (
    <div className="container">
      <h2>Appointments</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <input
          type="text"
          name="doctor_name"
          placeholder="Doctor's Name"
          value={newAppointment.doctor_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="doctor_contact"
          placeholder="Doctor's Contact"
          value={newAppointment.doctor_contact}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="appointment_reason"
          placeholder="Reason for Appointment"
          value={newAppointment.appointment_reason}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="appointment_date"
          placeholder="Appointment Date & Time"
          value={newAppointment.appointment_date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Appointment</button>
      </form>

      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div className="appointment-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <h3>{appointment.doctor_name}</h3>
              <p>Contact: {appointment.doctor_contact}</p>
              <p>Reason: {appointment.appointment_reason}</p>
              <p>Date & Time: {new Date(appointment.appointment_date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
