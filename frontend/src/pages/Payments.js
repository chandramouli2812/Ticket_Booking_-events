import React, { useState } from "react";
import API from "../api";

export default function Payments() {
  const [amount, setAmount] = useState("");

  const makePayment = async () => {
    try {
      const bookingId = localStorage.getItem("bookingId");
      const res = await API.post("/payments", {
        booking_id: parseInt(bookingId),
        amount: parseFloat(amount)
      });
      alert(`Payment successful. Status: ${res.data.status}`);
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payments</h2>
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <button onClick={makePayment} style={{ padding: "10px 20px", background: "#4caf50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Pay Now
      </button>
    </div>
  );
}
