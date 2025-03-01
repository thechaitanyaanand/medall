import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import './ProfileSetupPage.css';

export default function ProfileSetupPage() {
  const [profileData, setProfileData] = useState({
    fullName: '',
    address: '',
    dateOfBirth: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/accounts/profile-setup/', profileData);
      console.log('Profile setup complete:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Profile setup error:', error.response?.data || error.message);
      alert('Profile setup failed.');
    }
  };

  return (
    <div className="container">
      <h2>Profile Setup</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={profileData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={profileData.address}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          value={profileData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
