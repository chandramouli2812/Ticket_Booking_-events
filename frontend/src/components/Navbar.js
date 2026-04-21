import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../api";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications for logged-in user (example: user_id=1)
    API.get("/notifications", { params: { user_id: 1 } })
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, []);

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 24px",
      backgroundColor: "#1e1e2f",
      color: "#fff",
      fontFamily: "Segoe UI, sans-serif",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    },
    links: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color 0.3s",
    },
    activeLink: {
      color: "#00bcd4",
      borderBottom: "2px solid #00bcd4",
    },
    right: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    bell: {
      cursor: "pointer",
      fontSize: "18px",
    },
    badge: {
      backgroundColor: "#ff5252",
      borderRadius: "50%",
      padding: "4px 8px",
      fontSize: "12px",
      marginLeft: "6px",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.links}>
        <NavLink
          to="/Home"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/my-bookings"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          My Bookings
        </NavLink>
        <NavLink
          to="/dashboard"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/notifications"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Notifications
        </NavLink>
        <NavLink
          to="/register"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          Login
        </NavLink>
      </div>
      <div style={styles.right}>
        <div style={styles.bell}>
          🔔
          {notifications.length > 0 && (
            <span style={styles.badge}>{notifications.length}</span>
          )}
        </div>
      </div>
    </nav>
  );
}
