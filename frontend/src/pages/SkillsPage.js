import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SkillsPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function SkillsPage() {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  if (!skills) return <div>Loading...</div>;

  const skillCategories = [
    { name: 'Languages', skills: skills.languages, color: '#00d9ff' },
    { name: 'Frontend', skills: skills.frontend, color: '#a855f7' },
    { name: 'Backend', skills: skills.backend, color: '#00d9ff' },
    { name: 'Cloud/DevOps', skills: skills.cloud, color: '#a855f7' },
    { name: 'Databases', skills: skills.databases, color: '#00d9ff' },
    { name: 'Data Tools', skills: skills.dataTools, color: '#a855f7' },
    { name: 'ML/AI', skills: skills.ml, color: '#00d9ff' },
    { name: 'Other', skills: skills.other, color: '#a855f7' },
  ];

  return (
    <main className="skills-page section-padding">
      <div className="container">
        <h1 className="page-title fade-in">Skills & Technologies</h1>
        <p className="page-subtitle slide-up">
          A comprehensive overview of the technologies and tools I work with
        </p>

        <div className="skills-grid fade-in">
          {Array.isArray(skillCategories) && skillCategories.map((category, idx) => (
            <section key={category.name} className="skill-group" style={{ '--index': idx }}>
              <h2 className="group-title">{category.name}</h2>
              <div className="skills-list">
                {Array.isArray(category.skills) && category.skills.map((skill, skillIdx) => (
                  <div
                    key={skill}
                    className="skill-chip"
                    style={{ '--skill-index': skillIdx }}
                  >
                    <span className="skill-name">{skill}</span>
                    <span className="skill-dot" style={{ background: category.color }} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="skills-summary fade-in">
          <h2>Summary</h2>
          <div className="summary-content">
            <p>
              I have extensive experience across multiple domains:
            </p>
            <ul className="summary-list">
              <li><strong>Full-Stack Development:</strong> React, Node.js, Express, MongoDB, PostgreSQL</li>
              <li><strong>Cloud & DevOps:</strong> AWS, Docker, Kubernetes, CI/CD pipelines</li>
              <li><strong>Data Engineering:</strong> ETL pipelines, SQL optimization, data analytics</li>
              <li><strong>Machine Learning:</strong> PyTorch, TensorFlow, scikit-learn, model deployment</li>
              <li><strong>Research:</strong> Statistical analysis, data visualization, problem solving</li>
            </ul>
            <p>
              I'm constantly learning new technologies and applying them to solve real-world problems.
              My tech stack choices are driven by project requirements and best practices.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SkillsPage;
