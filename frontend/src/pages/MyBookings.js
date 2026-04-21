import React, { useEffect, useState } from "react";
import API from "../api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userId = 1; // replace with logged-in user ID
    API.get("/bookings/my-bookings", { params: { user_id: userId } })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/bookings/${id}/status`, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

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
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#00796b",
    },
    date: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "15px",
    },
    status: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
      display: "inline-block",
      marginBottom: "10px",
    },
    pending: { background: "#ffeb3b", color: "#333" },
    confirmed: { background: "#4caf50", color: "#fff" },
    cancelled: { background: "#f44336", color: "#fff" },
    select: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Bookings</h2>
      <div style={styles.grid}>
        {bookings.map((b) => (
          <div key={b.id} style={styles.card}>
            <div style={styles.title}>
              {b.event_title || `Event ID: ${b.event_id}`}
            </div>
            <div style={styles.date}>
              Booked on: {new Date(b.created_at).toLocaleString()}
            </div>

            <div
              style={{
                ...styles.status,
                ...(b.status === "confirmed"
                  ? styles.confirmed
                  : b.status === "cancelled"
                  ? styles.cancelled
                  : styles.pending),
              }}
            >
              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
            </div>

            <select
              value={b.status}
              onChange={(e) => updateStatus(b.id, e.target.value)}
              style={styles.select}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
