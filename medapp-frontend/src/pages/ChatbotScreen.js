import React, { useState, useEffect, useRef } from "react";
import "./ChatbotScreen.css";

// Utility function to remove any <think> blocks (including their content),
// remove duplicate words and repeated punctuation, and trim extra spaces.
function cleanResponse(text) {
  // Remove everything between <think> and </think>
  let cleaned = text.replace(/<think>.*?<\/think>/gi, "");
  // Replace consecutive duplicate words with a single occurrence
  cleaned = cleaned.replace(/\b(\w+)(\s+\1\b)+/gi, "$1");
  // Replace repeated punctuation (e.g., "!!" becomes "!")
  cleaned = cleaned.replace(/([!?.])\1+/g, "$1");
  return cleaned.trim();
}

export default function ChatbotScreen() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom when chat history updates.
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    // Append the user's message to the chat history.
    const updatedHistory = [...chatHistory, { role: "user", content: query }];
    setChatHistory(updatedHistory);
    setQuery("");

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1:7b",
          messages: updatedHistory,
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response from LLM.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeResponse = "";

      // Process the stream of responses
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              // Append this chunk of text
              completeResponse += parsed.message.content;

              // Update the assistant message in the chat history dynamically.
              setChatHistory((prev) => {
                const newHistory = [...prev];
                // If the last message is from the assistant, update its content.
                if (
                  newHistory.length &&
                  newHistory[newHistory.length - 1].role === "assistant"
                ) {
                  newHistory[newHistory.length - 1].content = cleanResponse(completeResponse);
                } else {
                  // Otherwise, push a new assistant message.
                  newHistory.push({ role: "assistant", content: cleanResponse(parsed.message.content) });
                }
                return newHistory;
              });
            }
          } catch (error) {
            console.error("Error parsing streamed response:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error querying chatbot:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Unable to get a response from the chatbot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">AI Chatbot</div>

      {/* Chat History Area */}
      <div className="chatbot-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <div className="message-bubble">{message.content}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          type="text"
          placeholder="Type your message..."
          value={query}
          onChange={handleQueryChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
