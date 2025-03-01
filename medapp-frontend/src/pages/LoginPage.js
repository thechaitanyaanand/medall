// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../apiClient';
import './LoginPage.css';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/accounts/token/', credentials);
      const token = response.data.access;
      if (token) {
        // Store token and update API client
        localStorage.setItem('access_token', token);
        setAuthToken(token);
        navigate('/home');
      } else {
        console.error("No token received:", response.data);
        alert("Login failed: No token received.");
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Login failed.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
