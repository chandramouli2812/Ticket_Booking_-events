import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        username,
        password,
        role: "user"
      });
      alert("Registered successfully");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f4f6f9, #e0f7fa)",
      fontFamily: "Segoe UI, sans-serif",
    },
    card: {
      background: "#fff",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      width: "350px",
      textAlign: "center",
    },
    header: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#00796b",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
    },
    footer: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#00796b",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Create Your Account</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>
        <div style={styles.footer}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>Login here</a>
        </div>
      </div>
    </div>
  );
}
