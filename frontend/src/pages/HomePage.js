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
    experience: 4,
  };
  const navigate = useNavigate();
  const featuredSectionRef = useRef(null);
  const carouselRef = useRef(null);

  const projects = [
    {
      id: 'streamflow',
      title: 'StreamFlow – Real-Time Data Engineering Platform',
      description: 'End-to-end real-time data engineering solution for efficient stream processing, workflow orchestration, and analysis.',
      technologies: ['Kafka', 'Apache Airflow', 'PostgreSQL', 'Streamlit'],
      problem: 'Organizations struggle with real-time data processing at scale. Need for unified solution combining streaming, orchestration, and visualization.',
      solution: 'Created end-to-end solution using Kafka for event streaming, Apache Airflow for workflow orchestration, PostgreSQL for storage, and Streamlit for real-time dashboards. Implemented cryptocurrency market data extraction with live streaming.',
      impact: [
        '<100ms processing latency',
        'Real-time data streaming',
        '1000s of events/sec',
        'Live market trend analysis'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/streamflow'
    },
    {
      id: 'distributed-task-queue',
      title: 'Distributed Task Queue & Notification System',
      description: 'Scalable distributed system for asynchronous task processing with FastAPI, Redis, and RabbitMQ.',
      technologies: ['FastAPI', 'Redis', 'RabbitMQ', 'Docker'],
      problem: 'Traditional request-response models don\'t handle long-running tasks efficiently. Need for robust async processing with retries and monitoring.',
      solution: 'Built microservices architecture using FastAPI for API gateway, Redis for caching, RabbitMQ for message queuing, and background workers for task execution. Implemented retry logic, task tracking, and comprehensive monitoring.',
      impact: [
        '-90% API response time reduction',
        '1000+ concurrent tasks handling',
        '99.9% task success rate',
        'Automatic retry mechanism'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/distributed-task-queue'
    },
    {
      id: 'insightforge-ai',
      title: 'InsightForge AI — Multi-Agent RAG Platform',
      description: 'Enterprise-grade multi-agent RAG platform using LangChain and OpenAI for intelligent document search and knowledge automation.',
      technologies: ['LangChain', 'OpenAI APIs', 'Pinecone', 'FastAPI'],
      problem: 'Enterprises struggle to leverage unstructured knowledge. Need for intelligent systems that can search and understand large document repositories.',
      solution: 'Implemented multi-agent RAG framework using LangChain orchestration, OpenAI embeddings and LLMs, Pinecone vector database for semantic search. Built FastAPI backend with async inferencing pipelines, hallucination detection, and response evaluation.',
      impact: [
        '95% query accuracy',
        '-80% research time saved',
        '1000s documents indexed',
        'Autonomous document analysis'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/insightforge-ai'
    },
    {
      id: 'multi-cloud-optimizer',
      title: 'Multi-Cloud Resource Optimizer',
      description: 'Cloud-based resource optimization tool using Kubernetes for intelligent workload management across AWS and GCP.',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'GCP'],
      problem: 'Organizations waste significant cloud resources across multiple providers. Need for intelligent optimization and cost reduction.',
      solution: 'Created intelligent scheduler using Kubernetes for workload placement optimization. Implemented cost models analyzing pricing across AWS and GCP. Built real-time monitoring with auto-scaling policies and cost tracking.',
      impact: [
        '-20% cost reduction',
        '+35% resource utilization',
        '-60% setup time',
        'Multi-cloud flexibility'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/multi-cloud-optimizer'
    },
    {
      id: 'agriinsights-etl',
      title: 'AgriInsights – ETL Pipeline',
      description: 'End-to-end ETL pipeline extracting, cleaning, and loading agricultural data.',
      technologies: ['Python', 'PostgreSQL', 'Pandas', 'ETL'],
      problem: 'Agricultural data needs systematic extraction, transformation, and loading.',
      solution: 'Built automated ETL workflow with data validation, error handling, and PostgreSQL loading.',
      impact: [
        'Automated data processing',
        'Data quality validation',
        'Batch optimization'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/AgriInsights-ETL-Pipeline'
    },
    {
      id: 'learnova',
      title: 'Learnova – AI Learning Platform',
      description: 'AI platform for auto-generating study summaries, quizzes, and flashcards.',
      technologies: ['React', 'FastAPI', 'OpenAI', 'PostgreSQL'],
      problem: 'Students spend excessive time creating study materials.',
      solution: 'Full-stack platform with auto-generation capabilities and progress tracking.',
      impact: [
        'Auto-summary generation',
        'Quiz creation automation',
        'Progress tracking system'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/Learnova'
    },
    {
      id: 'bone-fracture-detection',
      title: 'Bone Fracture Detection – Medical AI',
      description: 'Deep learning CNN model for bone fracture detection in X-rays.',
      technologies: ['PyTorch', 'CNN', 'NumPy', 'OpenCV'],
      problem: 'Manual X-ray analysis is error-prone and time-consuming.',
      solution: 'CNN trained on 50K+ images achieving 94% accuracy.',
      impact: [
        '94% accuracy rate',
        '10ms inference time',
        'Real-time detection'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/Bone-fracture-detection'
    },
    {
      id: 'network-failure-detection',
      title: 'Network Failure Detection',
      description: 'ML system for detecting network anomalies and failures.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'ML'],
      problem: 'Network failures cause significant downtime.',
      solution: 'ML anomaly detection with real-time prediction capabilities.',
      impact: [
        'Real-time detection',
        'Predictive alerts',
        'Reduced downtime'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/Network-failure-detection'
    },
    {
      id: 'emotion-detection-chatbot',
      title: 'Emotion Detection Chatbot',
      description: 'Chatbot with emotion detection using sentiment analysis and NLP.',
      technologies: ['Python', 'NLTK', 'Scikit-learn', 'NLP'],
      problem: 'Traditional chatbots lack emotional intelligence.',
      solution: 'Emotion-aware chatbot with context preservation.',
      impact: [
        'Emotion-aware responses',
        'Natural conversation flow',
        '90% user satisfaction'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/Chatbot---emotion-detection-using-sentiment-analysis'
    },
    {
      id: 'anomaly-wastewater',
      title: 'Wastewater Anomaly Detection',
      description: 'ML system for detecting anomalies in wastewater treatment.',
      technologies: ['Python', 'ML', 'IoT', 'Anomaly Detection'],
      problem: 'Wastewater plants need continuous failure detection.',
      solution: 'Real-time anomaly detection with automatic alert generation.',
      impact: [
        'Real-time monitoring',
        'Automatic alerts',
        'Preventive maintenance'
      ],
      liveDemo: null,
      github: 'https://github.com/darapogugoutham/Anamolies-detection-in-waste-water-system'
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
