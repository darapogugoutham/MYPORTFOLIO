import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AboutPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function AboutPage() {
  const [about, setAbout] = useState(null);
  const [dynamicStats, setDynamicStats] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        
        const [aboutRes, dataRes, skillsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/about`, { signal: controller.signal }),
          axios.get(`${API_BASE_URL}/api/data`, { signal: controller.signal }),
          axios.get(`${API_BASE_URL}/api/skills`, { signal: controller.signal }),
        ]);
        
        clearTimeout(timeout);

        // Count actual projects
        const projectCount = dataRes.data.projects?.length || 7;

        // Count unique technologies
        const allTechs = new Set();
        if (typeof skillsRes.data === 'object') {
          Object.values(skillsRes.data).forEach((categoryArray) => {
            if (Array.isArray(categoryArray)) {
              categoryArray.forEach((tech) => allTechs.add(tech));
            }
          });
        }
        const techCount = allTechs.size || 25;

        setAbout(aboutRes.data);
        setDynamicStats([
          { label: 'Projects', value: projectCount.toString() },
          { label: 'Technologies', value: techCount.toString() },
          { label: 'Years Experience', value: '2.3+' },
          { label: 'Open Source', value: 'Active' },
        ]);
      } catch (error) {
        console.error('Error fetching about:', error);
        // Fallback to static about data if API fails
        try {
          const response = await axios.get(`${API_BASE_URL}/api/about`);
          setAbout(response.data);
          setDynamicStats(response.data.stats);
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
        }
      }
    };

    fetchAbout();
  }, []);

  if (!about) return <div>Loading...</div>;

  return (
    <main className="about-page section-padding">
      <div className="container">
        <div className="about-header fade-in">
          <h1>About Me</h1>
          <p className="about-intro">{about.bio}</p>
        </div>

        <div className="about-content">
          <div className="about-main">
            <section className="about-section fade-in">
              <h2>Education</h2>
              <div className="education-card card">
                <h3>{about.education.degree}</h3>
                <p className="institution">{about.education.school}</p>
                <p className="year">Graduation: {about.education.year}</p>
              </div>
            </section>

            <section className="about-section fade-in">
              <h2>What I Specialize In</h2>
              <div className="specialties">
                {about.highlights.map((highlight, idx) => (
                  <div key={idx} className="specialty-item">
                    <span className="check-mark">✓</span>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="about-section fade-in">
              <h2>My Approach</h2>
              <p>
                I combine engineering discipline with analytical thinking to build systems that are both
                technically robust and practically useful. I believe in understanding problems deeply before
                implementing solutions, and I'm passionate about creating code that others can understand and
                maintain. I work best in collaborative environments where ideas are shared and challenged constructively.
              </p>
            </section>
          </div>

          <aside className="about-sidebar">
            <div className="stats-card card fade-in">
              <h3>Quick Stats</h3>
              <div className="stats-list">
                {(dynamicStats || about?.stats || []).map((stat, idx) => (
                  <div key={idx} className="stat">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-name">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="open-to card fade-in">
              <h3>Open To</h3>
              <p>Software Engineering, Data Engineering, and ML roles</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
