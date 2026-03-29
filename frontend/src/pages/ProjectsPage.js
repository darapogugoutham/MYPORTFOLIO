import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProjectsPage.css';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', 'Full Stack', 'ML/AI', 'Data Engineering', 'Cloud/DevOps', 'Research'];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="projects-page section-padding">
      <div className="container">
        <h1 className="page-title fade-in">Projects</h1>
        <p className="page-subtitle slide-up">
          A collection of projects showcasing my expertise across full-stack development, machine learning, and cloud architecture
        </p>

        <div className="filters fade-in">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid fade-in">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="project-card card"
            >
              <div className="project-card-header">
                <h3>{project.title}</h3>
                <span className="category-badge">{project.category}</span>
              </div>

              <p className="project-description">{project.shortDescription}</p>

              <div className="project-tags">
                {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="badge">{tech}</span>
                ))}
                {Array.isArray(project.technologies) && project.technologies.length > 3 && (
                  <span className="badge">+{project.technologies.length - 3}</span>
                )}
              </div>

              <div className="project-footer">
                <span className="arrow-link">View Details →</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ProjectsPage;
