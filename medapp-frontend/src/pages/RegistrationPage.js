// src/pages/RegistrationPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegistrationPage.css';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Normally, here you'd call your backend API to register the user.
    console.log('Registration data:', formData);
    // After registration, navigate to OTP verification.
    navigate('/otp');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit" className="primary-button">
          Register
        </button>
      </form>
      <p className="login-link">
        Already have an account?{' '}
        <Link to="/login" className="link-button">
          Login
        </Link>
      </p>
    </div>
  );
}
