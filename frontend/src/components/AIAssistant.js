import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX, FiSend } from 'react-icons/fi';
import './AIAssistant.css';

function AIAssistant({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hey! I\'m Goutham\'s AI Assistant. Ask me anything about his experience, projects, or skills!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        text: userMessage,
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await axios.post('/api/chat', {
        message: userMessage,
      });

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: response.data.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: 'Sorry, I encountered an error. Please try again later.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'What are your main skills?',
    'Show me your projects',
    'Tell me about your experience',
    'What technologies do you use?',
  ];

  return (
    <>
      <button
        className="ai-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI Assistant"
      >
        💬
      </button>

      {isOpen && (
        <div className="ai-assistant">
          <div className="assistant-header">
            <div className="header-content">
              <h3>Assistant</h3>
              <p className="header-subtitle">Ask me anything!</p>
            </div>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <FiX />
            </button>
          </div>

          <div className="messages-container">
            {messages.length === 1 && (
              <div className="quick-questions">
                <p className="quick-label">Or try one of these:</p>
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    className="quick-btn"
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => {
                        setInput('');
                        handleSendMessage();
                      }, 100);
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type}`}
              >
                <div className={`message-bubble ${message.type}`}>
                  {message.text}
                </div>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {loading && (
              <div className="message bot">
                <div className="message-bubble bot">
                  <span className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me something..."
              disabled={loading}
              className="chat-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="send-btn"
              aria-label="Send"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
