// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const buttonStyle = {
    display: 'block',
    textAlign: 'left',
    marginBottom: '10px',
    width: '100%',
    background: 'transparent',
    border: 'none',
    padding: '10px 0',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#333', // Explicit text color for visibility
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-220px', // When isOpen is false, sidebar is offscreen
        width: '200px',
        height: '100%',
        background: '#ffffff',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        padding: '20px',
        transition: 'right 0.3s ease',
        zIndex: 1000,
        overflowY: 'auto', // Ensure content is scrollable if necessary
      }}
    >
      <button onClick={toggleSidebar} style={{ ...buttonStyle, fontWeight: 'bold' }}>
        Close Sidebar
      </button>
      <button
        onClick={() => {
          navigate('/settings');
          toggleSidebar();
        }}
        style={buttonStyle}
      >
        Settings
      </button>
      <button
        onClick={() => {
          navigate('/abha');
          toggleSidebar();
        }}
        style={buttonStyle}
      >
        ABHA
      </button>
      <button
        onClick={() => {
          navigate('/help');
          toggleSidebar();
        }}
        style={buttonStyle}
      >
        Help
      </button>
      <button
        onClick={() => {
          navigate('/logout');
          toggleSidebar();
        }}
        style={buttonStyle}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
