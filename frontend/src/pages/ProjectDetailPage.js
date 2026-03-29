import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import './ProjectDetailPage.css';

function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    );
  }

  if (!project) {
    return <div className="error-container">Project not found</div>;
  }

  return (
    <main className="project-detail-page">
      <div className="project-hero">
        <div className="container">
          <h1 className="fade-in">{project.title}</h1>
          <p className="project-subtitle slide-up">{project.shortDescription}</p>

          <div className="project-actions fade-in">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <FiGithub /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FiExternalLink /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container section-padding">
        <div className="project-grid">
          <div className="project-main">
            {/* Problem */}
            <section className="project-section fade-in">
              <h2>The Problem</h2>
              <p>{project.problem}</p>
            </section>

            {/* Role */}
            <section className="project-section fade-in">
              <h2>My Role</h2>
              <p>{project.role}</p>
            </section>

            {/* Approach */}
            <section className="project-section fade-in">
              <h2>Approach</h2>
              <p>{project.approach}</p>
            </section>

            {/* Results */}
            <section className="project-section fade-in">
              <h2>Results</h2>
              <div className="results-grid">
                {project.results && project.results.map((result, idx) => (
                  <div key={idx} className="result-card card">
                    <div className="result-metric">{result.metric}</div>
                    <div className="result-value">{result.change}</div>
                  </div>
                ))}
              </div>
              <p className="project-impact">{project.impact}</p>
            </section>

            {/* Features */}
            {project.features && (
              <section className="project-section fade-in">
                <h2>Key Features</h2>
                <ul className="features-list">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && (
              <section className="project-section fade-in">
                <h2>Challenges</h2>
                <p>{project.challenges}</p>
              </section>
            )}

            {/* Learned */}
            {project.learned && (
              <section className="project-section fade-in">
                <h2>What I Learned</h2>
                <p>{project.learned}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="project-sidebar">
            <div className="sidebar-card card">
              <h3>Technologies</h3>
              <div className="tech-stack">
                {Array.isArray(project.technologies) && project.technologies.map((tech, idx) => (
                  <span key={idx} className="badge">{tech}</span>
                ))}
              </div>
            </div>

            {project.architecture && (
              <div className="sidebar-card card">
                <h3>Architecture</h3>
                <div className="architecture-details">
                  {Object.entries(project.architecture).map(([key, value]) => (
                    <div key={key} className="arch-item">
                      <strong>{key}:</strong>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.modelDetails && (
              <div className="sidebar-card card">
                <h3>Model Details</h3>
                <div className="model-details">
                  {Object.entries(project.modelDetails).map(([key, value]) => (
                    <div key={key} className="detail-item">
                      <strong>{key}:</strong>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default ProjectDetailPage;
