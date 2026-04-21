import React from "react";

export default function EventCard({ event }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <a href={`/events/${event.id}`}>View Details</a>
    </div>
  );
}
