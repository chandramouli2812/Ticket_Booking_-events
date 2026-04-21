import React, { useEffect, useState } from "react";
import API from "../api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/notifications", { params: { user_id: 1 } })
      .then((res) => setNotifications(res.data))
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
    list: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "600px",
      margin: "0 auto",
    },
    listItem: {
      padding: "15px",
      borderBottom: "1px solid #eee",
      fontSize: "15px",
      color: "#555",
    },
    empty: {
      textAlign: "center",
      fontSize: "16px",
      color: "#777",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Notifications</h2>
      <div style={styles.list}>
        {notifications.length === 0 ? (
          <div style={styles.empty}>No notifications yet</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {notifications.map((n) => (
              <li key={n.id} style={styles.listItem}>
                {n.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
