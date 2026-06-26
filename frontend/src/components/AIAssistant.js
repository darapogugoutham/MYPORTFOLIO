import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';
import './AIAssistant.css';

const getLocalAssistantResponse = (query) => {
  const normalizedQuery = query.toLowerCase();
  const { about, projects, experience, skills, certifications } = portfolioData;

  if (normalizedQuery.includes('skill') || normalizedQuery.includes('technolog') || normalizedQuery.includes('stack')) {
    const topSkills = [
      ...skills.languages.slice(0, 5),
      ...skills.backend.slice(0, 5),
      ...skills.dataEngineering.slice(0, 4),
      ...skills.genAIML.slice(0, 4),
    ];
    return `Goutham works across software engineering, data engineering, and GenAI systems. Key technologies include ${topSkills.join(', ')}. You can see the full breakdown on the Skills page.`;
  }

  if (normalizedQuery.includes('project') || normalizedQuery.includes('built') || normalizedQuery.includes('work')) {
    const featuredProjects = projects.slice(0, 4).map((project) => project.title).join('; ');
    return `Some featured projects are ${featuredProjects}. They cover real-time data pipelines, distributed backend systems, RAG platforms, and cloud optimization. The Projects page has full case-study details.`;
  }

  if (normalizedQuery.includes('experience') || normalizedQuery.includes('job') || normalizedQuery.includes('role')) {
    const roles = experience.slice(0, 4).map((job) => `${job.role} at ${job.company}`).join('; ');
    return `Goutham's experience includes ${roles}. His work focuses on backend systems, automation, data pipelines, ML systems, and cloud deployment.`;
  }

  if (normalizedQuery.includes('education') || normalizedQuery.includes('degree') || normalizedQuery.includes('college') || normalizedQuery.includes('university')) {
    return `Goutham is pursuing a ${about.education.degree} at ${about.education.school} with a GPA of ${about.education.gpa}. He also completed a ${about.previousEducation.degree} at ${about.previousEducation.school}.`;
  }

  if (normalizedQuery.includes('cert')) {
    const certList = certifications.map((cert) => cert.title).slice(0, 4).join('; ');
    return `Goutham has certifications including ${certList}. The Certifications page lists all credentials and related skills.`;
  }

  if (normalizedQuery.includes('contact') || normalizedQuery.includes('email') || normalizedQuery.includes('hire')) {
    return `You can reach Goutham at ${portfolioData.contact.email}, or use the Contact page for email, LinkedIn, GitHub, LeetCode, and HackerRank links.`;
  }

  return `${about.name} is a ${about.role}. ${about.headline} Try asking about projects, skills, experience, education, or certifications.`;
};

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

  const handleSendMessage = async (messageOverride) => {
    const nextInput = messageOverride || input;
    if (!nextInput.trim()) return;

    const userMessage = nextInput.trim();
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
      const responseText = getLocalAssistantResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: responseText,
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
          text: 'Sorry, I could not answer that right now. Try asking about projects, skills, experience, or contact details.',
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
                      handleSendMessage(question);
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
