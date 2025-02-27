// src/pages/OTPVerificationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OTPVerificationPage() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, call your API to verify the OTP
    console.log('Verifying OTP:', otp);
    // On success, navigate to profile setup or login as required
    navigate('/profile-setup');
  };

  return (
    <div className="container">
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter 6-digit OTP:</label>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default OTPVerificationPage;
