import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Tesseract from "tesseract.js";
import "./ChatbotScreen.css";

/**
 * Utility function that removes any content between <think> and </think> (including the tags).
 */
function removeThinkBlocks(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "");
}

export default function ChatbotScreen() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // On component mount, load persistent chat history and patient documents from localStorage.
  useEffect(() => {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) setChatHistory(JSON.parse(savedChat));

    const savedDocs = localStorage.getItem("patientDocuments");
    if (savedDocs) setDocuments(JSON.parse(savedDocs));
  }, []);

  // Save chat history to localStorage whenever it updates.
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Save documents to localStorage whenever they update.
  useEffect(() => {
    localStorage.setItem("patientDocuments", JSON.stringify(documents));
  }, [documents]);

  // Scroll to the bottom when chat history updates.
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddDocumentClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * handleFileChange
   * - Creates a doc object for each uploaded file.
   * - If it’s an image, runs Tesseract OCR to extract text and stores it in doc.ocrText.
   * - Adds all docs to our documents state.
   */
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const newDocs = [];

    for (const file of files) {
      const isImage = file.type.startsWith("image/");
      // Create a doc object
      const doc = {
        name: file.name,
        type: file.type,
        // URL for preview (if it's an image)
        url: isImage ? URL.createObjectURL(file) : null,
        // We'll store OCR text here (empty until Tesseract completes)
        ocrText: "",
      };

      if (isImage) {
        try {
          // Run Tesseract.js on the local image URL
          const result = await Tesseract.recognize(doc.url, "eng");
          doc.ocrText = result.data.text;
        } catch (error) {
          console.error("OCR error:", error);
          doc.ocrText = "";
        }
      }

      newDocs.push(doc);
    }

    setDocuments((prevDocs) => [...prevDocs, ...newDocs]);
    // Clear the input value so the same file can be re-uploaded if needed
    e.target.value = null;
  };

  /**
   * handleSubmit
   * - Builds a system message summarizing the documents + extracted text
   * - Sends conversation (with system + user messages) to the local LLM
   * - Streams response back
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    // Summarize any uploaded documents for the chatbot
    let docsSummary = "";
    if (documents.length > 0) {
      docsSummary = "Patient documents available:\n";
      documents.forEach((doc) => {
        docsSummary += `- ${doc.name} (${doc.type})\n`;
        // If there's OCR text, include it
        if (doc.ocrText) {
          docsSummary += `  Extracted text:\n${doc.ocrText}\n\n`;
        }
      });
    }

    // Create a system message with instructions and document context
    const systemMessage = {
      role: "system",
      content:
        "You are a professional medical assistant. Provide only strictly professional medical advice. " +
        "If needed, recommend scheduling a doctor's appointment. " +
        "Use any provided images and documents solely to understand the patient's medical history, " +
        "and ignore any irrelevant content. " +
        "If a user asks a non-medical question, politely clarify that your role is to offer medical assistance." +
        (docsSummary ? `\n\n${docsSummary}` : ""),
    };

    // Build the updated conversation history
    let updatedHistory = [...chatHistory];
    const sysIndex = updatedHistory.findIndex((msg) => msg.role === "system");
    if (sysIndex >= 0) {
      updatedHistory[sysIndex].content = systemMessage.content;
    } else {
      updatedHistory.unshift(systemMessage);
    }

    // Append the user's new query
    updatedHistory.push({ role: "user", content: query });
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

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              const chunkContent = removeThinkBlocks(parsed.message.content);
              completeResponse += chunkContent;
              // Update the assistant's message in the chat history.
              setChatHistory((prev) => {
                const newHistory = [...prev];
                const lastMsg = newHistory[newHistory.length - 1];
                if (lastMsg && lastMsg.role === "assistant") {
                  newHistory[newHistory.length - 1].content = removeThinkBlocks(
                    completeResponse
                  );
                } else {
                  newHistory.push({
                    role: "assistant",
                    content: removeThinkBlocks(chunkContent),
                  });
                }
                return newHistory;
              });
            }
          } catch (err) {
            console.error("Error parsing streamed response:", err);
          }
        }
      }
    } catch (error) {
      console.error("Error querying chatbot:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Unable to get a response from the chatbot.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Sidebar / Documents */}
      <div className="sidebar">
        <div className="sidebar-header">
          <span>Patient Documents</span>
          <button className="add-document-button" onClick={handleAddDocumentClick}>
            Add
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
          accept="image/*,.pdf,.txt"
        />

        <div className="document-list">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="document-item">
                {doc.url ? (
                  <img src={doc.url} alt={doc.name} className="document-thumbnail" />
                ) : (
                  <div className="document-filename">{doc.name}</div>
                )}
              </div>
            ))
          ) : (
            <div className="no-documents">No documents uploaded.</div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        <div className="chatbot-history">
          {chatHistory.map((message, index) => {
            if (message.role === "system") return null;
            return (
              <div key={index} className={`chat-message ${message.role}`}>
                <div className="message-bubble">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
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
    </div>
  );
}
