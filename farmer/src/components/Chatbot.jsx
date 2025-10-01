import React, { useState } from "react";

function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am BhoomiSetu Assistant 🤖. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Backend endpoint for chatbot responses
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={`chatbot-container ${chatOpen ? "open" : ""}`}>
      <div className="chat-header" onClick={() => setChatOpen(!chatOpen)}>
        {chatOpen ? "Chat with BhoomiSetu ✖" : "💬"}
      </div>

      {chatOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="message bot">Typing...</div>}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          font-family: 'Segoe UI', sans-serif;
        }
        .chat-header {
          background: linear-gradient(90deg, #2e7d32, #43a047);
          color: white;
          padding: 12px 20px;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          text-align: center;
          min-width: 60px;
          transition: transform 0.3s;
        }
        .chat-header:hover { transform: scale(1.1); }

        .chat-window {
          width: 320px;
          max-height: 450px;
          background: white;
          border-radius: 12px;
          margin-top: 10px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: fadeIn 0.5s ease;
        }

        .chat-messages {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
        }

        .message {
          padding: 8px 12px;
          margin-bottom: 8px;
          border-radius: 12px;
          max-width: 80%;
          word-wrap: break-word;
        }

        .message.user { background: #c8e6c9; align-self: flex-end; }
        .message.bot { background: #e8f5e9; align-self: flex-start; }

        .chat-input {
          display: flex;
          border-top: 1px solid #ccc;
        }
        .chat-input input {
          flex: 1;
          padding: 10px;
          border: none;
          outline: none;
          font-size: 14px;
        }
        .chat-input button {
          padding: 10px 15px;
          background: #2e7d32;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }
        .chat-input button:hover { background: #43a047; }

        @keyframes fadeIn { from {opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}

export default Chatbot;
