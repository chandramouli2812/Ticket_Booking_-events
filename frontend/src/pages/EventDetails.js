import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const bookTicket = async () => {
    try {
      const userId = 1; // replace with logged-in user ID
      const res = await API.post("/bookings", { event_id: parseInt(id), user_id: userId });
      alert(`Booking created. Status: ${res.data.status}, Booking ID: ${res.data.booking_id}`);
      localStorage.setItem("bookingId", res.data.booking_id);
    } catch (err) {
      alert("Booking failed");
    }
  };

  if (!event) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading event details...</p>;
  }

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Segoe UI, sans-serif",
      background: "#f4f6f9",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "700px",
      width: "100%",
    },
    title: {
      fontSize: "30px",
      fontWeight: "700",
      marginBottom: "15px",
      color: "#2c3e50",
    },
    description: {
      fontSize: "16px",
      color: "#555",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
    meta: {
      fontSize: "14px",
      color: "#777",
      marginBottom: "25px",
    },
    button: {
      padding: "12px 24px",
      background: "#00796b",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      transition: "background 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{event.title}</h2>
        <p style={styles.description}>{event.description}</p>

        {/* Example metadata (adjust based on your backend fields) */}
        <div style={styles.meta}>
          <p><strong>Date:</strong> {event.date || "TBA"}</p>
          <p><strong>Venue:</strong> {event.venue || "Online / TBA"}</p>
          <p><strong>Capacity:</strong> {event.capacity || "Unlimited"}</p>
        </div>

        <button
          onClick={bookTicket}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = "#004d40")}
          onMouseOut={(e) => (e.target.style.background = "#00796b")}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
}
