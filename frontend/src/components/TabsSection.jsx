import { useState } from "react";

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const cards = [
    { type: "patient", title: "Blood Assistance", desc: "Urgent blood coordination support." },
    { type: "volunteer", title: "Medical Volunteer", desc: "Join our healthcare missions." },
    { type: "patient", title: "Medicine Support", desc: "Access affordable medicine support." },
  ];

  const filtered =
    activeTab === "all"
      ? cards
      : cards.filter(card => card.type === activeTab);

  return (
    <section className="tabs-section">
      <div className="tabs">
        <button onClick={() => setActiveTab("all")}>All</button>
        <button onClick={() => setActiveTab("patient")}>Patient Support</button>
        <button onClick={() => setActiveTab("volunteer")}>Volunteer</button>
      </div>

      <div className="card-grid">
        {filtered.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
