import React, { useState } from 'react';
import './RemindersPage.css';

export default function RemindersPage() {
  // Initial reminders (simulated data)
  const initialReminders = [
    { id: 1, medicineName: 'Aspirin', dosage: '100mg', timings: '8:00 AM, 8:00 PM', tabletCount: 10 },
    { id: 2, medicineName: 'Metformin', dosage: '500mg', timings: '9:00 AM, 9:00 PM', tabletCount: 0 },
  ];

  // State for the list of reminders
  const [reminders, setReminders] = useState(initialReminders);

  // State for the new reminder form
  const [newReminder, setNewReminder] = useState({
    medicineName: '',
    dosage: '',
    timings: '',
    tabletCount: '',
  });

  // Handle changes in the new reminder form fields
  const handleNewReminderChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({ ...newReminder, [name]: value });
  };

  // Add a new reminder to the list
  const handleAddReminder = (e) => {
    e.preventDefault();
    const reminderToAdd = {
      id: Date.now(),
      medicineName: newReminder.medicineName,
      dosage: newReminder.dosage,
      timings: newReminder.timings,
      tabletCount: parseInt(newReminder.tabletCount, 10),
    };
    setReminders([reminderToAdd, ...reminders]);
    setNewReminder({ medicineName: '', dosage: '', timings: '', tabletCount: '' });
  };

  // Handle taking a dose (reduce tablet count by 1 if available)
  const handleTakeDose = (id) => {
    setReminders(reminders.map(reminder => {
      if (reminder.id === id && reminder.tabletCount > 0) {
        return { ...reminder, tabletCount: reminder.tabletCount - 1 };
      }
      return reminder;
    }));
  };

  // Handle refilling a reminder (prompt user for number to add)
  const handleRefill = (id) => {
    const amountStr = prompt("Enter number of tablets to add:");
    if (!amountStr) return;
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("Invalid number");
      return;
    }
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        return { ...reminder, tabletCount: reminder.tabletCount + amount };
      }
      return reminder;
    }));
  };

  // Handle deletion of a reminder
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      setReminders(reminders.filter(reminder => reminder.id !== id));
    }
  };

  return (
    <div className="container">
      <h2>Medicine Reminders</h2>
      {/* Form to add a new reminder */}
      <form onSubmit={handleAddReminder} className="new-reminder-form">
        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={newReminder.medicineName}
          onChange={handleNewReminderChange}
          required
        />
        <input
          type="text"
          name="dosage"
          placeholder="Dosage"
          value={newReminder.dosage}
          onChange={handleNewReminderChange}
          required
        />
        <input
          type="text"
          name="timings"
          placeholder="Timings (e.g., 8:00 AM, 8:00 PM)"
          value={newReminder.timings}
          onChange={handleNewReminderChange}
          required
        />
        <input
          type="number"
          name="tabletCount"
          placeholder="Tablet Count"
          value={newReminder.tabletCount}
          onChange={handleNewReminderChange}
          required
        />
        <button type="submit">Add Reminder</button>
      </form>
      {/* List of reminders */}
      <div className="reminder-list">
        {reminders.map(reminder => (
          <div key={reminder.id} className="reminder-card">
            <div className="reminder-header">
              <h3>{reminder.medicineName}</h3>
              <div className="reminder-actions">
                <button 
                  onClick={() => handleTakeDose(reminder.id)} 
                  disabled={reminder.tabletCount <= 0}
                >
                  Take Dose
                </button>
                <button onClick={() => handleRefill(reminder.id)}>
                  Refill
                </button>
                <button onClick={() => handleDelete(reminder.id)}>
                  Delete
                </button>
              </div>
            </div>
            <p>Dosage: {reminder.dosage}</p>
            <p>Timings: {reminder.timings}</p>
            <p>Tablets Left: {reminder.tabletCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
