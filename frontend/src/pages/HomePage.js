import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InteractiveCard from '../components/InteractiveCard';
import ProjectModal from '../components/ProjectModal';
import AnimatedCounter from '../components/AnimatedCounter';
import GalaxySection from '../components/GalaxySection';
import SecurityBadges from '../components/SecurityBadges';
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
