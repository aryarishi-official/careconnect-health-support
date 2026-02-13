import { useState } from "react";

export default function VolunteerForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: ""
  });

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
      const response = await fetch("https://careconnect-health-support.onrender.com/api/volunteer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok && onSuccess) {
  onSuccess({
    type: "volunteer",
    summary: "Volunteer registration submitted successfully."
  });
}

    } catch (error) {
      console.error("Volunteer error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Volunteer Registration</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <textarea name="skills" placeholder="Your Skills" onChange={handleChange} required />
        <input name="availability" placeholder="Availability (e.g. weekends)" onChange={handleChange} required />

        <button type="submit">
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
