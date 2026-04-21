import React from "react";

export default function Home() {
  const styles = {
    container: {
      padding: "50px",
      fontFamily: "Segoe UI, sans-serif",
      background: "linear-gradient(135deg, #f4f6f9, #e0f7fa)",
      minHeight: "100vh",
    },
    hero: {
      textAlign: "center",
      marginBottom: "50px",
    },
    header: {
      fontSize: "42px",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "20px",
    },
    subHeader: {
      fontSize: "20px",
      fontWeight: "400",
      color: "#555",
      marginBottom: "30px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    button: {
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    primaryButton: {
      backgroundColor: "#00796b",
      color: "#fff",
    },
    secondaryButton: {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
    section: {
      marginTop: "40px",
    },
    sectionHeader: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "28px",
      fontWeight: "600",
      color: "#2c3e50",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#00796b",
    },
    cardText: {
      fontSize: "14px",
      color: "#555",
      lineHeight: "1.6",
    },
  };

  const features = [
    { title: "Discover Events Easily", text: "Concerts, sports, cultural shows, and more — all in one place with real-time availability." },
    { title: "Quick Ticket Booking", text: "Book tickets in seconds with secure payments and instant confirmation." },
    { title: "Smart Dashboard", text: "Manage your bookings, payments, and notifications from a single dashboard." },
    { title: "Flexible Booking Management", text: "Update or cancel bookings with ease, and see changes reflected instantly." },
    { title: "Secure Authentication", text: "Login and register with JWT-based authentication for safe and reliable access." },
    { title: "Real-Time Notifications", text: "Stay updated with booking confirmations, payment alerts, and event updates." },
    { title: "Admin Analytics", text: "Admins can track total events and revenue with built-in analytics tools." },
    { title: "Modern UI/UX", text: "A clean, responsive interface designed for speed, clarity, and a professional experience." },
  ];

  const offerings = [
    { title: "For Users", text: "A seamless way to browse events, book tickets securely, manage bookings, and receive instant updates." },
    { title: "For Organizers", text: "Tools to create events, manage capacity, track bookings, and analyze revenue with ease." },
    { title: "For Admins", text: "Powerful analytics to monitor platform performance, event growth, and financial insights." },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.header}>Welcome to Modern Ticket Booking</h1>
        <p style={styles.subHeader}>
          Experience the future of event booking with speed, security, and simplicity.
        </p>
        <div style={styles.buttonGroup}>
          <a href="/events" style={{ ...styles.button, ...styles.primaryButton }}>
            Browse Events
          </a>
          <a href="/register" style={{ ...styles.button, ...styles.secondaryButton }}>
            Register Now
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Platform Features</h2>
        <div style={styles.featuresGrid}>
          {features.map((f, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardTitle}>{f.title}</div>
              <div style={styles.cardText}>{f.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Offerings Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>What We Offer</h2>
        <div style={styles.featuresGrid}>
          {offerings.map((o, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardTitle}>{o.title}</div>
              <div style={styles.cardText}>{o.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
