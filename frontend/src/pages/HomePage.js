import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InteractiveCard from '../components/InteractiveCard';
import ProjectModal from '../components/ProjectModal';
import AnimatedCounter from '../components/AnimatedCounter';
import GalaxySection from '../components/GalaxySection';
import SecurityBadges from '../components/SecurityBadges';
import portfolioData from '../data/portfolioData';
import './HomePage.css';

function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = {
    projects: portfolioData.projects.length,
    technologies: new Set(Object.values(portfolioData.skills).flat()).size,
    experience: parseInt(portfolioData.about.stats.find((item) => item.label === 'Years Experience')?.value, 10) || 5,
  };
  const navigate = useNavigate();
  const featuredSectionRef = useRef(null);
  const carouselRef = useRef(null);

  const projects = portfolioData.projects;

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

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400; // Adjust carousel scroll distance
      const scrollLeft = carouselRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

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
        <p className="section-subtitle">Explore my portfolio of real-world projects. Click to see detailed case studies.</p>
        
        <div className="carousel-container">
          <button className="carousel-arrow carousel-arrow-left" onClick={() => scrollCarousel('left')} aria-label="Previous projects">
            <span>❮</span>
          </button>
          
          <div className="featured-grid featured-carousel" ref={carouselRef}>
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
          
          <button className="carousel-arrow carousel-arrow-right" onClick={() => scrollCarousel('right')} aria-label="Next projects">
            <span>❯</span>
          </button>
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
    </div>
  );
}

export default HomePage;
