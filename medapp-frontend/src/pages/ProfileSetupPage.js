// src/pages/ProfileSetupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSetupPage() {
  const [profile, setProfile] = useState({
    fullName: '',
    address: '',
    dob: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit profile data to backend
    console.log('Profile data:', profile);
    // On success, navigate to login page (or directly to home if auto-login)
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Profile Setup</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} required />
        <label>Address:</label>
        <input type="text" name="address" value={profile.address} onChange={handleChange} required />
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={profile.dob} onChange={handleChange} required />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfileSetupPage;
