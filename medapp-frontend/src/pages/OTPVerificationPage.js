// src/pages/OTPVerificationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState(''); // Ensure you capture the username
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/accounts/otp-verify/', {
        username,
        otp_code: otp
      });
      console.log('OTP verified:', response.data);
      navigate('/profile-setup');
    } catch (error) {
      console.error('OTP verification error:', error.response?.data || error.message);
      alert('OTP verification failed.');
    }
  };

  return (
    <div className="container">
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}
