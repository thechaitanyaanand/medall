// src/pages/ProfilePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

export default function ProfilePage({ user }) {
  const navigate = useNavigate();

  // For demonstration, if a user object is not passed in as a prop,
  // we can use a dummy user.
  const currentUser = user || {
    fullName: 'John Doe',
    address: '123 Main St, Anytown, USA',
    dateOfBirth: '1990-01-01'
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{currentUser.fullName}</h2>
        <p><strong>Address:</strong> {currentUser.address}</p>
        <p><strong>Date of Birth:</strong> {currentUser.dateOfBirth}</p>
      </div>
      <div className="profile-buttons">
        <button className="primary-button" onClick={() => navigate('/documents/add')}>
          Add Documents
        </button>
        <button className="primary-button" onClick={() => navigate('/documents')}>
          View Documents
        </button>
      </div>
    </div>
  );
}
