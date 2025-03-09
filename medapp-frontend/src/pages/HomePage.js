import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCalendarCheck,
  FaUser,
  FaUsers,
  FaComments,
  FaRobot,
  FaFileUpload,
  FaHeartbeat,
  FaPills,
  FaClinicMedical,
  FaStethoscope,
  FaNotesMedical,
  FaAmbulance,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar();
  };

  const menuItems = [
    {
      icon: FaHeartbeat,
      label: "Health Tracking",
      path: "/health-tracking",
      description: "Monitor your wellness",
      iconColor: "#FF6B6B", // Vibrant Red
    },
    {
      icon: FaCalendarCheck,
      label: "Appointments",
      path: "/appointments",
      description: "Schedule medical visits",
      iconColor: "#4ECDC4", // Teal
    },
    {
      icon: FaPills,
      label: "Medications",
      path: "/reminders",
      description: "Track prescriptions",
      iconColor: "#A78ADB", // Purple
    },
    {
      icon: FaUser,
      label: "Profile",
      path: "/profile",
      description: "Manage health profile",
      iconColor: "#5D3FD3", // Deep Purple
    },
    {
      icon: FaUsers,
      label: "Family Health",
      path: "/family",
      description: "Manage family records",
      iconColor: "#2A9D8F", // Emerald Green
    },
    {
      icon: FaStethoscope,
      label: "Medical Services",
      path: "/medical-services",
      description: "Explore healthcare options",
      iconColor: "#FF9F1C", // Vibrant Orange
    },
    {
      icon: FaComments,
      label: "Connections",
      path: "/connections",
      description: "Connect with providers",
      iconColor: "#1982C4", // Bright Blue
    },
    {
      icon: FaRobot,
      label: "Health Assistant",
      path: "/chatbot",
      description: "AI health guidance",
      iconColor: "#6A4C93", // Deep Purple
    },
    {
      icon: FaNotesMedical,
      label: "Documents",
      path: "/documents",
      description: "Manage medical records",
      iconColor: "#43AA8B", // Sea Green
    },
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.blueNavbar}>
        <span style={styles.appName}>HealthSync</span>
        <div style={styles.userInfo}>
          <FaUser style={styles.userIcon} />
          <span>Welcome</span>
        </div>
        <button style={styles.menuButton} onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      {/* Sidebar and Overlay */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={toggleSidebar}
          style={styles.overlay}
        />
      )}

      {/* Main content area */}
      <div style={styles.mainContent}>
        {/* Quick Action Alerts */}
        <div style={styles.alertBanner}>
          <FaBell style={styles.alertIcon} />
          <span>1 Upcoming Appointments | 2 Medication Reminder</span>
        </div>

        {/* Interactive Grid of Cards */}
        <div style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="icon-box"
              style={{
                ...styles.interactiveCard,
                transform: activeCard === index ? "scale(1.05)" : "scale(1)",
                boxShadow:
                  activeCard === index
                    ? "0 10px 20px rgba(0,0,0,0.2)"
                    : "0 4px 6px rgba(0,0,0,0.1)",
              }}
              onClick={() => {
                handleNavigation(item.path);
                setActiveCard(index);
              }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div style={styles.cardIconWrapper}>
                <item.icon
                  size={50}
                  color={item.iconColor}
                  style={styles.cardIcon}
                />
              </div>
              <h3 style={styles.cardTitle}>{item.label}</h3>
              <p style={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#F0F4F8",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
  },
  blueNavbar: {
    height: "70px",
    backgroundColor: "#007BFF",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "absolute",
    right: "100px",
  },
  userIcon: {
    color: "white",
    fontSize: "20px",
  },
  appName: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  menuButton: {
    background: "none",
    border: "none",
    fontSize: "28px",
    color: "#fff",
    cursor: "pointer",
    padding: "5px 10px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 900,
  },
  mainContent: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  alertBanner: {
    backgroundColor: "#E6F2FF",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,123,255,0.1)",
  },
  alertIcon: {
    color: "#007BFF",
    marginRight: "15px",
    fontSize: "24px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    maxWidth: "1000px",
    margin: "20px auto",
  },
  interactiveCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid #E0E0E0",
  },
  cardIconWrapper: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
  },
  cardIcon: {
    zIndex: 1,
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.4",
  },
};

export default HomePage;