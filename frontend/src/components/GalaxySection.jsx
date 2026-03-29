import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Galaxy from './Galaxy';
import './GalaxySection.css';

export default function GalaxySection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const detailsRef = useRef(null);
  const controlsRef = useRef(null);

  return (
    <section className="galaxy-section">
      <div className="galaxy-container">
        {/* Canvas */}
        <div className="galaxy-canvas-wrapper">
          {/* Title Container - Inside Canvas Wrapper */}
          <div className="galaxy-title-container">
            <h1 className="galaxy-main-title">Microservices Galaxy</h1>
            <p className="galaxy-main-subtitle">A visual journey through interconnected systems, technologies, and innovations</p>
          </div>

          <Canvas
            camera={{ position: [0, 3, 8], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={75} />
            <Galaxy onProjectSelect={setSelectedProject} />
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              zoomSpeed={0.5}
              enablePan={true}
              panSpeed={0.5}
              rotateSpeed={0.4}
              autoRotate={true}
              autoRotateSpeed={1.5}
              enableDamping={true}
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={50}
            />
          </Canvas>

          {/* Controls Info */}
          <div className="galaxy-controls-info">
            🖱 Drag to move<br />
            🔍 Scroll to zoom<br />
            🎯 Click planet to explore
          </div>
        </div>

        {/* Details Panel */}
        <div
          ref={detailsRef}
          className={`galaxy-details-panel ${selectedProject ? 'active' : ''}`}
        >
          {selectedProject ? (
            <div className="galaxy-details-content">
              <button
                className="galaxy-close-btn"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              <div className="galaxy-project-header">
                <span className="galaxy-project-icon">{selectedProject.icon}</span>
                <h3 className="galaxy-project-name">{selectedProject.name}</h3>
              </div>

              <p className="galaxy-project-description">
                {selectedProject.description}
              </p>

              <div className="galaxy-tech-section">
                <h4>Tech Stack</h4>
                <div className="galaxy-tech-list">
                  {selectedProject.techs.map((tech) => (
                    <span key={tech} className="galaxy-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="galaxy-actions">
                {selectedProject.demo && selectedProject.demo !== '#' ? (
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="galaxy-btn galaxy-btn-primary"
                  >
                    Live Demo →
                  </a>
                ) : (
                  <button className="galaxy-btn galaxy-btn-primary" disabled>
                    Live Demo →
                  </button>
                )}
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="galaxy-btn galaxy-btn-secondary"
                >
                  View on GitHub
                </a>
                {selectedProject.linkedin && (
                  <a 
                    href={selectedProject.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="galaxy-btn galaxy-btn-tertiary"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="galaxy-empty-state">
              <h3>🌌 Explore the Galaxy</h3>
              <p>Click on any planet to discover the project details and technologies used.</p>
              <ul className="galaxy-guide">
                <li>🪐 Each planet = A major project</li>
                <li>✨ Hover to see technologies</li>
                <li>🖱️ Click to view details</li>
                <li>🔄 Drag to rotate • Scroll to zoom</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
