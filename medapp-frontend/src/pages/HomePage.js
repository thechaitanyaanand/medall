// // src/pages/HomePage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';

// function HomePage() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     toggleSidebar(); // Close sidebar after navigating
//   };

//   return (
//     <div>
//       {/* Navbar with toggle button */}
//       <Navbar toggleSidebar={toggleSidebar} />

//       {/* Sidebar component receives state and toggle function */}
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Overlay to hide sidebar when clicking outside */}
//       {sidebarOpen && (
//         <div
//           className="overlay"
//           onClick={toggleSidebar}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             zIndex: 900,
//           }}
//         ></div>
//       )}

//       {/* Main content container */}
//       <div className="container" style={{ marginTop: '20px' }}>
//         <h2>Home</h2>
//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: '20px',
//             justifyContent: 'center',
//           }}
//         >
//           <button onClick={() => handleNavigation('/reminders')}>Reminders</button>
//           <button onClick={() => handleNavigation('/appointments')}>Appointments</button>
//           <button onClick={() => handleNavigation('/profile')}>Profile</button>
//           <button onClick={() => handleNavigation('/chatbot')}>Chatbot</button>
//           <button onClick={() => handleNavigation('/family')}>Family</button>
//           <button onClick={() => handleNavigation('/connections')}>Connections</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// 2 - profiles work
// src/pages/HomePage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   FaBell,         // Bell icon
//   FaCalendarCheck,// Calendar icon with check
//   FaUser,         // User profile icon
//   FaUsers,        // Family icon (group of users)
//   FaComments,     // Chat bubbles
//   FaRobot         // Robot icon for AI Chat Bot
// } from 'react-icons/fa';

// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';

// function HomePage() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     toggleSidebar(); // Close sidebar after navigating
//   };

//   const handleBack = () => {
//     // If you want "Back" to go to a specific page (e.g., Login or a previous screen),
//     // use navigate('/somepage') or navigate(-1) to go back one step in history:
//     navigate(-1);
//   };

//   return (
//     <div style={styles.container}>
//       {/* Top bar with "Back" on the left and hamburger on the right */}
//       <div style={styles.topBar}>
//         <button style={styles.backButton} onClick={handleBack}>
//           &larr; Back
//         </button>
//         <div style={{ flex: 1 }} />
//         <button style={styles.menuButton} onClick={toggleSidebar}>
//           &#9776; {/* Hamburger icon */}
//         </button>
//       </div>

//       {/* Navbar & Sidebar (from your existing components) */}
//       <Navbar toggleSidebar={toggleSidebar} />
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Overlay to hide sidebar when clicking outside */}
//       {sidebarOpen && (
//         <div
//           className="overlay"
//           onClick={toggleSidebar}
//           style={styles.overlay}
//         />
//       )}

//       {/* Main content area */}
//       <div style={styles.mainContent}>
//         {/* 2×3 Grid of icons + labels */}
//         <div style={styles.gridContainer}>
//           {/* 1) Reminders */}
//           <div
//             style={styles.iconBox}
//             onClick={() => handleNavigation('/reminders')}
//           >
//             <FaBell size={60} color="#007BFF" />
//             <p style={styles.iconLabel}>Reminders</p>
//           </div>

//           {/* 2) Appointments */}
//           <div
//             style={styles.iconBox}
//             onClick={() => handleNavigation('/appointments')}
//           >
//             <FaCalendarCheck size={60} color="#007BFF" />
//             <p style={styles.iconLabel}>Appointments</p>
//           </div>

//           {/* 3) Profile */}
//           <div
//             style={styles.iconBox}
//             onClick={() => handleNavigation('/profile')}
//           >
//             <FaUser size={60} color="#007BFF" />
//             <p style={styles.iconLabel}>Profile</p>
//           </div>

//           {/* 4) Family */}
//           <div
//             style={styles.iconBox}
//             onClick={() => handleNavigation('/family')}
//           >
//             <FaUsers size={60} color="#007BFF" />
//             <p style={styles.iconLabel}>Family</p>
//           </div>

//           {/* 5) Connections */}
//           <div
//             style={styles.iconBox}
//             onClick={() => handleNavigation('/connections')}
//           >
//             <FaComments size={60} color="#007BFF" />
//             <p style={styles.iconLabel}>Connections</p>
//           </div>

//           {/* 6) Chat Bot */}
//           <div
//             style={styles.iconBox}
//             onClick={() => handleNavigation('/chatbot')}
//           >
//             <FaRobot size={60} color="#007BFF" />
//             <p style={styles.iconLabel}>Chat Bot</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Inline styles for simplicity, though you may prefer a separate .css file. */
// const styles = {
//   container: {
//     height: '100vh',
//     backgroundColor: '#F5F5F5',
//     position: 'relative',
//   },
//   topBar: {
//     height: '50px',
//     backgroundColor: '#FFFFFF',
//     display: 'flex',
//     alignItems: 'center',
//     padding: '0 10px',
//     borderBottom: '1px solid #ccc',
//   },
//   backButton: {
//     background: 'none',
//     border: 'none',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
//   menuButton: {
//     background: 'none',
//     border: 'none',
//     fontSize: '20px',
//     cursor: 'pointer',
//   },
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     zIndex: 900,
//   },
//   mainContent: {
//     padding: '20px',
//   },
//   gridContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
//     gridTemplateRows: 'repeat(2, 1fr)',    // 2 rows
//     gap: '30px',
//     maxWidth: '800px',
//     margin: '40px auto', // center the grid
//   },
//   iconBox: {
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     padding: '20px',
//     textAlign: 'center',
//     cursor: 'pointer',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//   },
//   iconLabel: {
//     marginTop: '10px',
//     fontSize: '16px',
//     color: '#000',
//   },
// };

// export default HomePage;

// 3
// src/pages/HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell, // Reminders icon
  FaCalendarCheck, // Appointments icon
  FaUser, // Profile icon
  FaUsers, // Family icon
  FaComments, // Connections icon
  FaRobot, // Chat Bot icon
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./HomePage.css"; // Import the CSS file for hover effects

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      {/* Top bar with "Back" and hamburger menu */}
      <div style={styles.topBar}>
        <button style={styles.backButton} onClick={handleBack}>
          &larr; Back
        </button>
        <div style={{ flex: 1 }} />
        <button style={styles.menuButton} onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      {/* Navbar & Sidebar */}
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={toggleSidebar}
          style={styles.overlay}
        />
      )}

      {/* Main content area */}
      <div style={styles.mainContent}>
        {/* 2×3 Grid of icons with labels */}
        <div style={styles.gridContainer}>
          {/* Reminders */}
          <div
            className="icon-box"
            onClick={() => handleNavigation("/reminders")}
          >
            <FaBell size={60} color="#007BFF" />
            <p style={styles.iconLabel}>Reminders</p>
          </div>

          {/* Appointments */}
          <div
            className="icon-box"
            onClick={() => handleNavigation("/appointments")}
          >
            <FaCalendarCheck size={60} color="#007BFF" />
            <p style={styles.iconLabel}>Appointments</p>
          </div>

          {/* Profile */}
          <div
            className="icon-box"
            onClick={() => handleNavigation("/profile")}
          >
            <FaUser size={60} color="#007BFF" />
            <p style={styles.iconLabel}>Profile</p>
          </div>

          {/* Family */}
          <div className="icon-box" onClick={() => handleNavigation("/family")}>
            <FaUsers size={60} color="#007BFF" />
            <p style={styles.iconLabel}>Family</p>
          </div>

          {/* Connections */}
          <div
            className="icon-box"
            onClick={() => handleNavigation("/connections")}
          >
            <FaComments size={60} color="#007BFF" />
            <p style={styles.iconLabel}>Connections</p>
          </div>

          {/* Chat Bot */}
          <div
            className="icon-box"
            onClick={() => handleNavigation("/chatbot")}
          >
            <FaRobot size={60} color="#007BFF" />
            <p style={styles.iconLabel}>Chat Bot</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Inline styles for non-hover parts */
const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
  topBar: {
    height: "50px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    borderBottom: "1px solid #ccc",
  },
  backButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  menuButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 900,
  },
  mainContent: {
    padding: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "30px",
    maxWidth: "800px",
    margin: "40px auto",
  },
  iconLabel: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#000",
  },
};

export default HomePage;
