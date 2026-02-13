import { useState, useEffect, useRef } from "react";

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

  const chatBodyRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Force open
  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  // Reset after submission
  useEffect(() => {
  if (!resetSignal) return;

  setOpen(true);

  if (resetSignal.type === "success") {
    setChatHistory([
      {
        sender: "bot",
        text: `Request submitted successfully.`,
      },
      {
        sender: "bot",
        text: "How else can I help you?",
        options: [
          "Get Medical Help",
          "Become a Volunteer",
          "View FAQs",
          "Contact Us"
        ]
      }
    ]);
  } else {
    // Normal reset (modal closed)
    setChatHistory([
      {
        sender: "bot",
        text: "How else can I help you?",
        options: [
          "Get Medical Help",
          "Become a Volunteer",
          "View FAQs",
          "Contact Us"
        ]
      }
    ]);
  }

}, [resetSignal]);


  // ---------- OPTION CLICK ----------
  const handleOptionClick = (option) => {

    // Remove previous options FIRST
    setChatHistory(prev =>
      prev.map(chat =>
        chat.options ? { ...chat, options: null } : chat
      )
    );

    if (option === "Get Medical Help") {
      onRoute("/patient");
      return;
    }

    if (option === "Become a Volunteer") {
      onRoute("/volunteer");
      return;
    }

    if (option === "View FAQs") {
      showFAQs();
      return;
    }

    if (option === "Contact Us") {
      addBotMessage("You can reach us at support@careconnect.org or call 9876543210.");
      return;
    }
  };

  // ---------- SHOW FAQ ----------
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

  // ---------- FAQ ANSWERS ----------
  const handleFAQOption = (option) => {

    const answers = {
      "What services do you provide?":
        "We provide blood coordination, medical assistance, and volunteer support.",
      "How do I request blood support?":
        "Click 'Get Medical Help' and select Blood Requirement in the form.",
      "What are your working hours?":
        "We operate from 9 AM to 6 PM, Monday to Saturday.",
      "How can I volunteer?":
        "Click 'Become a Volunteer' and complete the registration form."
    };

    setChatHistory(prev => [
      ...prev,
      { sender: "user", text: option },
      {
        sender: "bot",
        text: answers[option] || "Thank you for your question.",
        options: ["Get Medical Help", "Become a Volunteer", "View FAQs", "Contact Us"]
      }
    ]);
  };

  const addBotMessage = (text) => {
    setChatHistory(prev => [
      ...prev,
      {
        sender: "bot",
        text,
        options: ["Get Medical Help", "Become a Volunteer", "View FAQs"]
      }
    ]);
  };

  // ---------- USER MESSAGE ----------
  const handleSend = async () => {
    if (!message.trim()) return;

    const userText = message;

    setChatHistory(prev => [
      ...prev,
      { sender: "user", text: userText }
    ]);

    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (data && data.response) {
        setChatHistory(prev => [
          ...prev,
          {
            sender: "bot",
            text: data.response,
            route: data.suggested_route
          }
        ]);
      } else {
        setChatHistory(prev => [
          ...prev,
          {
            sender: "bot",
            text: "I'm not fully sure what you need. You can contact us instead.",
            options: ["Contact Us"]
          }
        ]);
      }

    } catch (error) {
      setChatHistory(prev => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again." }
      ]);
    }
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

          <div className="chat-body" ref={chatBodyRef}>
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                <p>{chat.text}</p>

                {chat.options && (
                  <div className="chat-options">
                    {chat.options.map((option, idx) => (
                      <button
                        key={idx}
                        className="chat-option-button"
                        onClick={() => {
                          if (
                            option === "Get Medical Help" ||
                            option === "Become a Volunteer" ||
                            option === "View FAQs" ||
                            option === "Contact Us"
                          ) {
                            handleOptionClick(option);
                          } else {
                            handleFAQOption(option);
                          }
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {chat.route && (
                  <button
                    className="route-button"
                    onClick={() => onRoute(chat.route)}
                  >
                    Proceed
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
