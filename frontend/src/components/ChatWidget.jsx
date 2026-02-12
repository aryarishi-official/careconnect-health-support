import { useState, useEffect } from "react";

export default function ChatWidget({ onRoute, forceOpen, resetSignal }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const initialOptions = [
    "Get Medical Help",
    "Become a Volunteer",
    "View FAQs"
  ];

  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "Hello! I’m the CareConnect Assistant. How can I help you today?",
      options: initialOptions
    }
  ]);

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  // 🔥 Reset after form submission
  useEffect(() => {
    if (resetSignal > 0) {
      setChatHistory([
        {
          sender: "bot",
          text: "Your request has been submitted successfully. How else can I assist you?",
          options: initialOptions
        }
      ]);
    }
  }, [resetSignal]);

  const handleOptionClick = (option) => {
    if (option === "Get Medical Help") {
      onRoute("/patient");
    }

    if (option === "Become a Volunteer") {
      addBotMessage("Please register using our volunteer form.");
    }

    if (option === "View FAQs") {
      showFAQs();
    }

    // remove previous options
    setChatHistory(prev =>
      prev.map(chat =>
        chat.options ? { ...chat, options: null } : chat
      )
    );
  };

  const showFAQs = () => {
    setChatHistory(prev => [
      ...prev,
      {
        sender: "bot",
        text: "Here are some common questions:",
        options: [
          "What services do you provide?",
          "How do I request blood support?",
          "What are your working hours?",
          "How can I volunteer?"
        ]
      }
    ]);
  };

  const handleFAQOption = (option) => {
    const answers = {
      "What services do you provide?":
        "We provide blood coordination, medical assistance, and volunteer support.",
      "How do I request blood support?":
        "You can submit a request using the Medical Help option.",
      "What are your working hours?":
        "We operate from 9 AM to 6 PM, Monday to Saturday.",
      "How can I volunteer?":
        "You can register through our volunteer form."
    };

    addBotMessage(answers[option] || "Thank you for your question.");
  };

  const addBotMessage = (text) => {
    setChatHistory(prev => [
      ...prev,
      { sender: "bot", text }
    ]);
  };

  return (
    <>
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

                {chat.options &&
                  chat.options.map((option, idx) => (
                    <button
                      key={idx}
                      className="route-button"
                      onClick={() =>
                        initialOptions.includes(option)
                          ? handleOptionClick(option)
                          : handleFAQOption(option)
                      }
                    >
                      {option}
                    </button>
                  ))}
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
          </div>
        </div>
      )}
    </>
  );
}
