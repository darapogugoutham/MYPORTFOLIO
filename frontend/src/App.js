import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VisitorCounter from './components/VisitorCounter';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import AIAssistant from './components/AIAssistant';
import './styles/App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function App() {
  const [showAI, setShowAI] = useState(false);

  // Keep-alive ping to prevent Render cold starts
  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (response.ok) {
          console.log('✅ Backend is awake and healthy');
        }
      } catch (error) {
        console.log('ℹ️ Backend is warming up...');
      }
    };

    // Ping immediately on app load
    pingBackend();

    // Ping every 14 minutes to keep the server awake (Render sleeps after 15 min inactivity)
    const pingInterval = setInterval(pingBackend, 14 * 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(pingInterval);
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <AIAssistant isOpen={showAI} setIsOpen={setShowAI} />
        <VisitorCounter />
      </div>
    </Router>
  );
}

export default App;
