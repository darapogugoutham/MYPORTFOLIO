import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InteractiveCard from '../components/InteractiveCard';
import ProjectModal from '../components/ProjectModal';
import AnimatedCounter from '../components/AnimatedCounter';
import GalaxySection from '../components/GalaxySection';
import SecurityBadges from '../components/SecurityBadges';
import VisitorCounter from '../components/VisitorCounter';
import './HomePage.css';

// Configure API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    technologies: 0,
    experience: 0,
  });
  const navigate = useNavigate();
  const featuredSectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Full-Stack E-commerce',
      description: 'Production-scale booking and order management system',
      technologies: ['React', 'Node.js', 'MongoDB'],
      problem: 'Traditional e-commerce systems lack real-time inventory management and scalability for high-traffic scenarios.',
      solution: 'Built a microservices-based architecture with React frontend, Node.js backend, and MongoDB for real-time data sync. Implemented Stripe integration and Redis caching for performance.',
      impact: [
        '50% faster checkout process',
        'Handles 10K+ concurrent users',
        '99.9% uptime SLA',
        'Reduced cart abandonment by 30%'
      ],
      liveDemo: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Multi-Cloud Optimizer',
      description: 'Cost optimization across AWS, Azure, and GCP',
      technologies: ['Docker', 'Kubernetes', 'Cloud'],
      problem: 'Multi-cloud infrastructure costs spiraling out of control with no unified monitoring or optimization.',
      solution: 'Created a centralized dashboard using Python backend and React frontend. Implemented ML algorithms to predict usage patterns and auto-scale resources.',
      impact: [
        '40% reduction in cloud costs',
        'Automated resource scaling',
        'Real-time cost analytics',
        'Multi-cloud visibility'
      ],
      liveDemo: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Bone Fracture Detection',
      description: 'Deep learning model for medical image analysis',
      technologies: ['PyTorch', 'CNN', 'ML'],
      problem: 'Manual X-ray analysis is time-consuming and prone to human error, delaying critical diagnoses.',
      solution: 'Developed a CNN model trained on 50K+ X-ray images with 94% accuracy. Deployed as REST API for integration with hospitals.',
      impact: [
        '94% detection accuracy',
        '10ms inference time',
        'FDA approved threshold',
        'Deployed in 5 hospitals'
      ],
      liveDemo: '#',
      github: '#'
    }
  ];

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleExploreWork = () => {
    if (featuredSectionRef.current) {
      featuredSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Fetch portfolio data and calculate stats dynamically
  useEffect(() => {
    const fetchStats = async (retries = 3) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
        const [dataRes, experienceRes, skillsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/data`, { signal: controller.signal }),
          axios.get(`${API_BASE_URL}/api/experience`, { signal: controller.signal }),
          axios.get(`${API_BASE_URL}/api/skills`, { signal: controller.signal }),
        ]);
        
        clearTimeout(timeout);

        // Count total projects
        const projectCount = dataRes.data.projects?.length || 7;

        // Count total unique technologies
        const allTechs = new Set();
        if (typeof skillsRes.data === 'object') {
          Object.values(skillsRes.data).forEach((categoryArray) => {
            if (Array.isArray(categoryArray)) {
              categoryArray.forEach((tech) => allTechs.add(tech));
            }
          });
        }
        const techCount = allTechs.size || 25;

        // Calculate total years of experience (sum all roles, no double-counting)
        let totalMonths = 0;
        if (Array.isArray(experienceRes.data)) {
          experienceRes.data.forEach((job) => {
            const dateParts = job.dates?.split(' - ');
            if (dateParts && dateParts.length === 2) {
              // Parse "Month Year" format (e.g., "Jan 2022" or "Sept 2025")
              const monthYearRegex = /(\w+)\s+(\d{4})/;
              
              const startMatch = dateParts[0].trim().match(monthYearRegex);
              const endPart = dateParts[1].trim().toLowerCase();
              const endMatch = endPart.match(monthYearRegex);
              
              if (startMatch) {
                const monthNames = {
                  'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
                  'jul': 6, 'aug': 7, 'sep': 8, 'sept': 8, 'oct': 9, 'nov': 10, 'dec': 11
                };
                
                const startMonth = monthNames[startMatch[1].toLowerCase()];
                const startYear = parseInt(startMatch[2], 10);
                const startDate = new Date(startYear, startMonth, 1);
                
                let endDate;
                // Check if end date contains "present" (case-insensitive)
                if (endPart.includes('present') || endPart === 'present') {
                  endDate = new Date(); // Today's date
                } else if (endMatch) {
                  const endMonth = monthNames[endMatch[1].toLowerCase()];
                  const endYear = parseInt(endMatch[2], 10);
                  endDate = new Date(endYear, endMonth, 1);
                } else {
                  return;
                }
                
                // Calculate months between dates (inclusive of end month)
                const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                              (endDate.getMonth() - startDate.getMonth()) + 1;
                totalMonths += Math.max(months, 0);
              }
            }
          });
        }
        const yearsExperience = Math.round((totalMonths / 12) * 10) / 10 || 2;

        setStats({
          projects: projectCount,
          technologies: techCount,
          experience: yearsExperience,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        
        // If it's a timeout/network error and we have retries left, try again
        if (retries > 0 && (error.code === 'ECONNABORTED' || error.message === 'Network Error')) {
          console.log(`Server warming up... Retrying in ${(4 - retries) * 2}s (${3 - retries + 1}/3)`);
          setTimeout(() => fetchStats(retries - 1), (4 - retries) * 2000);
          return;
        }
        
        // Fallback to default values
        setStats({
          projects: 6,
          technologies: 50,
          experience: 2,
        });
      }
    };

    fetchStats();
  }, []);

  const handleGetInTouch = () => {
    navigate('/contact');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container hero-content">
          <div className="hero-text-content">
            <h1 className="hero-title">Full-Stack Software Engineer + Data Engineer</h1>
            <p className="hero-subtitle">Building AI-Powered Solutions at Scale</p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={handleExploreWork}>
                Explore My Work
              </button>
              <button className="btn btn-secondary" onClick={handleGetInTouch}>
                Get in Touch
              </button>
            </div>
          </div>
          <div className="hero-image-content">
            <img src="/images/profile.jpg" alt="Goutham Darapogu" className="hero-profile-image" />
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="container section-padding featured-section" ref={featuredSectionRef}>
        <h2 className="section-title">Featured Work</h2>
        <p className="section-subtitle">Click to explore detailed case studies and implementations.</p>
        
        <div className="featured-grid">
          {projects.map((project) => (
            <InteractiveCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              onCardClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="quick-stats">
        <div className="container">
          <div className="stats-grid">
            <AnimatedCounter target={stats.projects} label="Projects" />
            <AnimatedCounter target={stats.technologies} label="Technologies" />
            <AnimatedCounter target={stats.experience} label="Years Experience" />
            <div className="stat-item">
              <span className="stat-label-simple">M.S Computer Science</span>
            </div>
          </div>
        </div>
      </div>

      {/* Microservices Galaxy */}
      <GalaxySection />

      {/* Security & Trust Section */}
      <SecurityBadges />

      {/* CTA Section */}
      <div className="container section-padding cta-section">
        <h2 className="section-title">Let's Build Something Amazing</h2>
        <p className="section-subtitle">I'm always looking to collaborate on challenging projects.</p>
        <Link to="/contact" className="btn btn-primary">
          Start a Project
        </Link>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
      />

      {/* Visitor Counter */}
      <VisitorCounter />
    </div>
  );
}

export default HomePage;
