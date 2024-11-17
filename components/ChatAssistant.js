import { useState } from "react";

export default function ChatAssistant({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch(
        "https://custom-gpts-to-website-abhinavag3.replit.app/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessages([...newMessages, { sender: "ai", text: data.response }]);
      } else {
        setMessages([
          ...newMessages,
          { sender: "ai", text: "Error: Unable to process your request." },
        ]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Network error. Please try again." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-overlay">
      <div className="chat-window">
        {/* Header */}
        <div className="chat-header">
          <h2 className="chat-title">AI Assistant</h2>
          <button className="chat-close" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="chat-message ai">Thinking...</div>}
        </div>

        {/* Input Bar */}
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
