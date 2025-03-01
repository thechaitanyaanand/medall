// src/pages/RemindersPage.js
import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import './RemindersPage.css';

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    medicine_name: '',
    dosage: '',
    timings: '',
    tabletCount: '',  // As a string from input; convert to integer when sending
  });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch existing reminders on component mount
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await apiClient.get('/reminders/reminders/');
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  // Update newReminder state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReminder((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new reminder
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const reminderPayload = {
      ...newReminder,
      tabletCount: parseInt(newReminder.tabletCount, 10), // Convert tabletCount to integer
    };
    try {
      const response = await apiClient.post('/reminders/reminders/', reminderPayload);
      // Append the newly created reminder to state
      setReminders((prev) => [response.data, ...prev]);
      // Clear the form
      setNewReminder({
        medicine_name: '',
        dosage: '',
        timings: '',
        tabletCount: '',
      });
    } catch (error) {
      console.error("Error creating reminder:", error.response?.data || error.message);
      setErrorMsg(JSON.stringify(error.response?.data));
      alert("Error creating reminder.");
    }
  };

  // Handler for "Take Dose": decrement tabletCount by 1 if possible
  const handleTakeDose = async (reminderId, currentTabletCount) => {
    if (currentTabletCount <= 0) {
      alert("No tablets left! Please refill.");
      return;
    }
    try {
      const newCount = currentTabletCount - 1;
      const response = await apiClient.patch(`/reminders/reminders/${reminderId}/`, {
        tabletCount: newCount,
      });
      // Update state for this reminder
      setReminders((prev) =>
        prev.map((r) => (r.id === reminderId ? response.data : r))
      );
    } catch (error) {
      console.error("Error taking dose:", error.response?.data || error.message);
      alert("Error taking dose.");
    }
  };

  // Handler for "Refill": prompt user for refill amount, then update tabletCount
  const handleRefill = async (reminderId, currentTabletCount) => {
    const refillAmount = prompt("Enter the number of tablets to add:");
    const addAmount = parseInt(refillAmount, 10);
    if (!addAmount || addAmount <= 0) {
      alert("Invalid refill amount.");
      return;
    }
    try {
      const newCount = currentTabletCount + addAmount;
      const response = await apiClient.patch(`/reminders/reminders/${reminderId}/`, {
        tabletCount: newCount,
      });
      setReminders((prev) =>
        prev.map((r) => (r.id === reminderId ? response.data : r))
      );
    } catch (error) {
      console.error("Error refilling:", error.response?.data || error.message);
      alert("Error refilling.");
    }
  };

  // Handler for "Delete": remove reminder from backend and update state
  const handleDelete = async (reminderId) => {
    if (!window.confirm("Are you sure you want to delete this reminder?")) {
      return;
    }
    try {
      await apiClient.delete(`/reminders/reminders/${reminderId}/`);
      setReminders((prev) => prev.filter((r) => r.id !== reminderId));
    } catch (error) {
      console.error("Error deleting reminder:", error.response?.data || error.message);
      alert("Error deleting reminder.");
    }
  };

  return (
    <div className="container">
      <h2>Medicine Reminders</h2>
      <form onSubmit={handleSubmit} className="new-reminder-form">
        <input
          type="text"
          name="medicine_name"
          placeholder="Medicine Name"
          value={newReminder.medicine_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dosage"
          placeholder="Dosage"
          value={newReminder.dosage}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="timings"
          value={newReminder.timings}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="tabletCount"
          placeholder="Tablet Count"
          value={newReminder.tabletCount}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Reminder</button>
      </form>
      {errorMsg && <p className="error">Error: {errorMsg}</p>}
      {loading ? (
        <p>Loading reminders...</p>
      ) : (
        <div className="reminder-list">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="reminder-card">
              <h3>{reminder.medicine_name}</h3>
              <p>Dosage: {reminder.dosage}</p>
              <p>Timings: {reminder.timings}</p>
              <p>Tablets Left: {reminder.tabletCount}</p>
              <div className="reminder-actions">
                <button onClick={() => handleTakeDose(reminder.id, reminder.tabletCount)}>
                  Take Dose
                </button>
                <button onClick={() => handleRefill(reminder.id, reminder.tabletCount)}>
                  Refill
                </button>
                <button onClick={() => handleDelete(reminder.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
