// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Make sure these file names match exactly in your src/pages folder.
import RegistrationPage from './pages/RegistrationPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RemindersPage from './pages/RemindersPage';
import AppointmentsPage from './pages/AppointmentsPage';
import DocumentManagementPage from './pages/DocumentManagementPage';
import ChatbotScreen from './pages/ChatbotScreen';
import FamilyPage from './pages/FamilyPage';
import ConnectionsPage from './pages/ConnectionsPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/otp" element={<OTPVerificationPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/documents" element={<DocumentManagementPage />} />
        <Route path="/chatbot" element={<ChatbotScreen />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/connections" element={<ConnectionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
