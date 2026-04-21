import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [analytics, setAnalytics] = useState({ total_events: 0, total_revenue: 0 });

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
    API.get("/admin/analytics/events").then((res) =>
      setAnalytics((prev) => ({ ...prev, total_events: res.data.total_events }))
    );
    API.get("/admin/analytics/revenue").then((res) =>
      setAnalytics((prev) => ({ ...prev, total_revenue: res.data.total_revenue }))
    );
  }, []);

  const createEvent = async () => {
    await API.post("/events", { title, description: desc, capacity: 100 });
    alert("Event created");
    window.location.reload();
  };

  const styles = {
    container: { padding: "40px", fontFamily: "Segoe UI, sans-serif", background: "#f4f6f9", minHeight: "100vh" },
    header: { fontSize: "28px", fontWeight: "700", marginBottom: "30px", color: "#2c3e50" },
    cardGrid: { display: "flex", gap: "20px", marginBottom: "40px" },
    card: {
      flex: 1,
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    cardTitle: { fontSize: "16px", fontWeight: "500", marginBottom: "10px", color: "#555" },
    cardValue: { fontSize: "26px", fontWeight: "700", color: "#00796b" },
    form: { display: "flex", gap: "10px", marginBottom: "40px" },
    input: { padding: "12px", borderRadius: "6px", border: "1px solid #ccc", flex: 1 },
    button: {
      padding: "12px 24px",
      background: "#00796b",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    },
    list: { background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
    listHeader: { fontSize: "20px", fontWeight: "600", marginBottom: "15px", color: "#2c3e50" },
    listItem: { padding: "12px 0", borderBottom: "1px solid #eee" },
    eventTitle: { fontSize: "16px", fontWeight: "600", color: "#00796b" },
    eventDesc: { fontSize: "14px", color: "#555", marginTop: "4px" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Dashboard</h2>

      {/* Analytics Cards */}
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Events</div>
          <div style={styles.cardValue}>{analytics.total_events}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Revenue</div>
          <div style={styles.cardValue}>₹{analytics.total_revenue}</div>
        </div>
      </div>

      {/* Event Creation Form */}
      <div style={styles.form}>
        <input
          placeholder="Event Title"
          style={styles.input}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Event Description"
          style={styles.input}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button style={styles.button} onClick={createEvent}>
          Create Event
        </button>
      </div>

      {/* Existing Events */}
      <div style={styles.list}>
        <h3 style={styles.listHeader}>Existing Events</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((e) => (
            <li key={e.id} style={styles.listItem}>
              <div style={styles.eventTitle}>{e.title}</div>
              <div style={styles.eventDesc}>{e.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
