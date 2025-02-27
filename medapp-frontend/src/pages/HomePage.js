// src/pages/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function HomePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar(); // Close sidebar after navigating
  };

  return (
    <div>
      {/* Navbar with toggle button */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar component receives state and toggle function */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay to hide sidebar when clicking outside */}
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 900,
          }}
        ></div>
      )}

      {/* Main content container */}
      <div className="container" style={{ marginTop: '20px' }}>
        <h2>Home</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          <button onClick={() => handleNavigation('/reminders')}>Reminders</button>
          <button onClick={() => handleNavigation('/appointments')}>Appointments</button>
          <button onClick={() => handleNavigation('/profile')}>Profile</button>
          <button onClick={() => handleNavigation('/chatbot')}>Chatbot</button>
          <button onClick={() => handleNavigation('/family')}>Family</button>
          <button onClick={() => handleNavigation('/connections')}>Connections</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
