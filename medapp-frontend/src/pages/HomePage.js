import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell, // Reminders icon
  FaCalendarCheck, // Appointments icon
  FaUser, // Profile icon
  FaUsers, // Family icon
  FaComments, // Connections icon
  FaRobot, // Chat Bot icon
  FaFileUpload, // Add Documents icon
} from "react-icons/fa";

import Sidebar from "../components/Sidebar"; // Keep Sidebar if needed
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

  return (
    <div style={styles.container}>
      {/* Blue Navbar at the top */}
      <div style={styles.blueNavbar}>
        <span style={styles.appName}>MedApp</span>
        <button style={styles.menuButton} onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      {/* Sidebar */}
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
        {/* 2×? Grid of icons with labels */}
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

          {/* Add Documents */}
          <div
            className="icon-box"
            onClick={() => handleNavigation("/documents")}
          >
            <FaFileUpload size={60} color="#007BFF" />
            <p style={styles.iconLabel}>Documents</p>
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
  blueNavbar: {
    height: "60px",
    backgroundColor: "#007BFF",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Pushes menu button to right
    padding: "0 20px",
  },
  appName: {
    fontSize: "20px",
    fontWeight: "bold",
    flexGrow: 1, // Pushes text to left
  },
  menuButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "#fff",
    cursor: "pointer",
    padding: "5px 10px", // Prevents button stretching
    width: "auto", // Ensures no extra width
    display: "inline-block", // Restricts size
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