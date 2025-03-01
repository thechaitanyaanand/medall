// src/pages/RegistrationPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../apiClient';  // Ensure this is correctly set up to point to your backend
import './RegistrationPage.css';

export default function RegistrationPage() {
  const navigate = useNavigate();

  // Use the exact field names as expected by the backend serializer.
  const [formData, setFormData] = useState({
    username: '',
    mobile_number: '',  // Note: mobile_number, not mobile
    password: '',
    confirm_password: '', // Note: confirm_password, not confirmPassword
    role: 'patient',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});  // Clear previous errors
    try {
      const response = await apiClient.post('/accounts/register/', formData);
      console.log('Registration successful:', response.data);
      // Navigate to OTP verification page after successful registration
      navigate('/otp');
    } catch (error) {
      // Log the error response for debugging
      console.error("Registration error:", error.response?.data || error.message);
      // Set error state to display errors on the page
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ non_field_errors: "Registration failed. Please try again." });
      }
    }
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
        {errors.username && <p className="error">{errors.username}</p>}

        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
        {errors.mobile_number && <p className="error">{errors.mobile_number}</p>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
        {errors.non_field_errors && <p className="error">{errors.non_field_errors}</p>}
        {errors.confirm_password && <p className="error">{errors.confirm_password}</p>}

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}

        <button type="submit" className="primary-button">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login" className="link-button">Login</Link>
      </p>
    </div>
  );
}
