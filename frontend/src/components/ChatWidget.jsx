import { useState } from "react";

export default function ChatWidget({ onRoute }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory(prev => [...prev, userMessage]);

    const response = await fetch("http://127.0.0.1:8000/api/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    const botMessage = {
      sender: "bot",
      text: data.response,
      route: data.suggested_route
    };

    setChatHistory(prev => [...prev, botMessage]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            CareConnect Assistant
          </div>

          <div className="chat-body">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                <p>{chat.text}</p>

                {chat.route && (
                  <button
                    className="route-button"
                    onClick={() => onRoute(chat.route)}
                  >
                    Open Form
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
