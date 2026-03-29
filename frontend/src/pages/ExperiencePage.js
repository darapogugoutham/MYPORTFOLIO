import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExperiencePage.css';

function ExperiencePage() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get('/api/experience');
        setExperience(response.data);
      } catch (error) {
        console.error('Error fetching experience:', error);
      }
    };

    fetchExperience();
  }, []);

  return (
    <main className="experience-page section-padding">
      <div className="container">
        <h1 className="page-title fade-in">Experience</h1>
        <p className="page-subtitle slide-up">
          My professional journey building scalable systems and impactful solutions
        </p>

        <div className="timeline fade-in">
          {experience.map((job, idx) => (
            <div key={job.id} className="timeline-item" style={{ '--index': idx }}>
              <div className="timeline-marker" />

              <div className="experience-card card">
                <div className="card-header">
                  <h3>{job.role}</h3>
                  <span className="company-name">{job.company}</span>
                </div>

                <div className="card-dates">
                  <span className="date-range">{job.dates}</span>
                </div>

                <p className="card-description">{job.description}</p>

                {job.achievements && (
                  <div className="achievements">
                    <h4>Key Achievements</h4>
                    <ul className="achievement-list">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.metrics && (
                  <div className="metrics">
                    {job.metrics.map((metric, idx) => (
                      <div key={idx} className="metric-item">
                        <span className="metric-value">{metric.value}</span>
                        <span className="metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {job.technologies && (
                  <div className="tech-area">
                    <h4>Technologies</h4>
                    <div className="tech-tags">
                      {job.technologies.map((tech, idx) => (
                        <span key={idx} className="badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ExperiencePage;
