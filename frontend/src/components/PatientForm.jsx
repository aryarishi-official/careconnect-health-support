import { useState } from "react";

export default function PatientForm({ onSuccess })  {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    support_type: "blood",
    urgency: "low",
    description: "",
    phone: "",
    email: ""
  });

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/patient/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);

        // 🔥 Pass real summary + id to parent
        if (onSuccess) {
          setTimeout(() => {
            onSuccess({
              id: data.id,
              type: "medical",
              summary: data.summary
            });
          }, 1200);
        }
      }

    } catch (error) {
      console.error("Submission failed:", error);
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Patient Support Form</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />

        <select name="support_type" onChange={handleChange}>
          <option value="consultation">Medical Consultation</option>
          <option value="blood">Blood Requirement</option>
          <option value="financial">Financial Aid</option>
          <option value="medicine">Medicine Support</option>
          <option value="emergency">Emergency Assistance</option>
        </select>

        <select name="urgency" onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <textarea name="description" placeholder="Describe your request" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" placeholder="Email (optional)" onChange={handleChange} />

        <button type="submit">
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {summary && (
        <div className="summary-box">
          <h3>AI Generated Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
