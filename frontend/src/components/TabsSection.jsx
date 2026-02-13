import { useState } from "react";

export default function TabsSection({ requests = [] }) {
  const [activeTab, setActiveTab] = useState("all");

  const cards = [
    /* { type: "patient", title: "Blood Assistance", desc: "Urgent blood coordination support." },
    { type: "volunteer", title: "Medical Volunteer", desc: "Join our healthcare missions." },
    { type: "patient", title: "Medicine Support", desc: "Access affordable medicine support." }, */
  ];

  const filteredStatic =
    activeTab === "all"
      ? cards
      : cards.filter(card => card.type === activeTab);

  const filteredRequests =
    activeTab === "all"
      ? requests
      : requests.filter(req =>
          activeTab === "patient"
            ? req.type === "medical"
            : req.type === "volunteer"
        );

  return (
    <section className="tabs-section">
      <div className="tabs">
        <button onClick={() => setActiveTab("all")}>All</button>
        <button onClick={() => setActiveTab("patient")}>Patient Support</button>
        <button onClick={() => setActiveTab("volunteer")}>Volunteer</button>
      </div>

      <div className="card-grid">

        {/* 🔥 REAL REQUESTS FIRST */}
        {filteredRequests.map((req) => (
          <div key={req.id} className="request-card">
            <h3>Request #{req.id}</h3>
            <p>{req.summary}</p>
          </div>
        ))}

        {/* STATIC DEMO CARDS BELOW */}
        {filteredStatic.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}

      </div>
    </section>
  );
}
