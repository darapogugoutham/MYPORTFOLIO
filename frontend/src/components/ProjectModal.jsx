import React from 'react';
import './ProjectModal.css';

function ProjectModal({ isOpen, project, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-subtitle">{project.description}</p>
        </div>

        <div className="modal-body">
          {/* Problem Section */}
          <div className="modal-section">
            <h3>🎯 Problem</h3>
            <p>{project.problem}</p>
          </div>

          {/* Solution Section */}
          <div className="modal-section">
            <h3>💡 Solution</h3>
            <p>{project.solution}</p>
          </div>

          {/* Impact Section */}
          <div className="modal-section">
            <h3>📊 Impact</h3>
            <ul className="impact-list">
              {project.impact && project.impact.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="modal-section">
            <h3>⚙ Tech Stack</h3>
            <div className="tech-grid">
              {project.technologies && project.technologies.map((tech, idx) => (
                <div key={idx} className="tech-item">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {project.liveDemo && (
            <a href={project.liveDemo} className="modal-btn btn-primary">
              🚀 Live Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} className="modal-btn btn-secondary">
              💻 GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
