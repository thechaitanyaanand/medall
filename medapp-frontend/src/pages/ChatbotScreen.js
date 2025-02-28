import React, { useState } from 'react';
import './ChatbotScreen.css';

export default function ChatbotScreen() {
  const [query, setQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', message: 'Hello, how can I help you with your health today?' },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Append user message
    setChatLog([...chatLog, { sender: 'user', message: query }]);
    
    // Simulate API call to Flask AI microservice (replace with real API call)
    try {
      // For demonstration, we simulate a response after a delay.
      const botResponse = await new Promise((resolve) =>
        setTimeout(() => resolve(`You asked: "${query}". This is a simulated answer.`), 1000)
      );
      setChatLog((prev) => [...prev, { sender: 'bot', message: botResponse }]);
    } catch (error) {
      setChatLog((prev) => [...prev, { sender: 'bot', message: 'Sorry, something went wrong.' }]);
    }
    setQuery('');
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chatbot</h2>
      <div className="chat-log">
        {chatLog.map((entry, index) => (
          <div key={index} className={`chat-entry ${entry.sender}`}>
            {entry.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          placeholder="Type your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
