// src/components/Navbar.js
import React from 'react';

function Navbar({ toggleSidebar }) {
  return (
    <nav
      style={{
        background: '#007bff',
        padding: '10px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>MedApp</h1>
      <button
        onClick={toggleSidebar}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          fontSize: '1.5rem',
          cursor: 'pointer',
        }}
      >
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
