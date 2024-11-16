import { useState } from "react";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState(""); // Stores user input
  const [loading, setLoading] = useState(false); // Tracks loading state

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://custom-gpts-to-website-abhinavag3.replit.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input, // Sends user input to the backend
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Add assistant's response to chat
        setMessages([...newMessages, { sender: "ai", text: data.response }]);
      } else {
        // Handle errors returned by the backend
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

    setInput(""); // Clear the input field
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">AI Assistant</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-message ai">Thinking...</div>}
      </div>
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
  );
}
