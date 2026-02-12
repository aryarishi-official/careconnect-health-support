export default function HeroSection({ onActivateChat }) {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Connecting Communities to Healthcare Support</h1>
        <p>
          CareConnect helps patients access support and empowers volunteers
          to contribute to meaningful healthcare initiatives.
        </p>

        <div className="search-box">
          <label>How can we help you today?</label>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Type your request..."
              onFocus={onActivateChat}
            />
            <button onClick={() => onActivateChat()}>Get Help</button>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1580281657527-47f249e8f0f6"
          alt="NGO help"
        />
      </div>
    </section>
  );
}
