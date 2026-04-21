import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Segoe UI, sans-serif",
      background: "#f4f6f9",
      minHeight: "100vh",
    },
    header: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "30px",
      color: "#2c3e50",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
    },
    card: {
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "transform 0.2s ease",
    },
    image: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
    },
    content: {
      padding: "20px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#00796b",
    },
    description: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "15px",
      lineHeight: "1.5",
    },
    link: {
      textDecoration: "none",
      color: "#fff",
      background: "#00796b",
      padding: "10px 16px",
      borderRadius: "6px",
      fontWeight: "600",
      fontSize: "14px",
      display: "inline-block",
      transition: "background 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Available Events</h2>
      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
            {/* Event image (use event.image or fallback) */}
            <img
              src={event.image || "https://via.placeholder.com/400x200?text=Event+Image"}
              alt={event.title}
              style={styles.image}
            />
            <div style={styles.content}>
              <div style={styles.title}>{event.title}</div>
              <p style={styles.description}>{event.description}</p>
              <Link
                to={`/events/${event.id}`}
                style={styles.link}
                onMouseOver={(e) => (e.target.style.background = "#004d40")}
                onMouseOut={(e) => (e.target.style.background = "#00796b")}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
