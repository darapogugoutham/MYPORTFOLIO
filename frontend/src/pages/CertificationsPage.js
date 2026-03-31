import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CertificationsPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/certifications`);
        setCertifications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching certifications:', err);
        setError('Failed to load certifications');
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const categories = ['All', ...new Set(certifications.map(cert => cert.category))];
  const filteredCerts = selectedCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  if (loading) {
    return <div className="certifications-page"><p>Loading certifications...</p></div>;
  }

  if (error) {
    return <div className="certifications-page"><p className="error">{error}</p></div>;
  }

  return (
    <div className="certifications-page">
      <div className="certifications-header">
        <h1>🎓 Certifications & Credentials</h1>
        <p>Professional certifications and credentials I've earned to expand my expertise</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="certifications-grid">
        {filteredCerts.length > 0 ? (
          filteredCerts.map(cert => (
            <div key={cert.id} className="certification-card">
              <div className="cert-header">
                <h3>{cert.title}</h3>
                <span className="cert-category">{cert.category}</span>
              </div>

              <div className="cert-issuer">
                <strong>{cert.issuer}</strong>
                <span className="cert-date">{cert.date}</span>
              </div>

              {cert.description && (
                <p className="cert-description">{cert.description}</p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="cert-skills">
                  <strong>Skills:</strong>
                  <div className="skill-tags">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {cert.credentialId && (
                <div className="cert-credential">
                  <strong>Credential ID:</strong>
                  <code>{cert.credentialId}</code>
                </div>
              )}

              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                  View Credential →
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="no-certs">No certifications found in this category</p>
        )}
      </div>

      <div className="certifications-footer">
        <p>Continuously learning and upgrading skills to stay current with industry standards</p>
      </div>
    </div>
  );
}

export default CertificationsPage;
