import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      alert("Login successful");
      window.location.href = "/events";
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials and try again.");
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
    instructions: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "20px",
      textAlign: "left",
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
        <h2 style={styles.header}>Login</h2>
        <div style={styles.instructions}>
          <p>To access your account:</p>
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <li>Enter your registered username.</li>
            <li>Provide your password securely.</li>
            <li>Click <strong>Login</strong> to continue.</li>
          </ul>
        </div>
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
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        <div style={styles.footer}>
          Don’t have an account?{" "}
          <a href="/register" style={styles.link}>Register here</a>
        </div>
      </div>
    </div>
  );
}
