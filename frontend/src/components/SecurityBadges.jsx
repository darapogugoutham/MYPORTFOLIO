import React from 'react';
import './SecurityBadges.css';

export default function SecurityBadges() {
  const securityControls = [
    { icon: '🔒', label: 'HTTPS/TLS', description: 'Full transport encryption' },
    { icon: '⚡', label: 'HSTS', description: '1-year strict transport' },
    { icon: '🛡️', label: 'CSP', description: 'Content Security Policy' },
    { icon: '📋', label: 'Security Headers', description: 'X-Frame-Options, XSS Protection' },
    { icon: '⏱️', label: 'Rate Limiting', description: 'API abuse protection' },
    { icon: '✅', label: 'Input Validation', description: 'Server-side sanitization' },
    { icon: '🔑', label: 'API Auth', description: 'Authorization checks' },
    { icon: '📦', label: 'Dependency Scan', description: 'Package vulnerability checks' },
    { icon: '🌐', label: 'CORS', description: 'Restricted cross-origin access' },
    { icon: '📊', label: 'Monitoring', description: 'Request logging & analytics' },
  ];

  return (
    <section className="security-section">
      <div className="container">
        <div className="security-header">
          <h2>Security & Trust</h2>
          <p>Multi-layer security aligned with OWASP best practices</p>
        </div>

        <div className="security-grid">
          {securityControls.map((control) => (
            <div key={control.label} className="security-badge">
              <div className="badge-icon">{control.icon}</div>
              <div className="badge-content">
                <h4>{control.label}</h4>
                <p>{control.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="security-layers">
          <h3>Implementation Layers</h3>
          <div className="layers-grid">
            <div className="layer">
              <h4>🌐 Transport Layer</h4>
              <ul>
                <li>Full HTTPS/TLS encryption</li>
                <li>HSTS preload enabled</li>
                <li>Certificate pinning ready</li>
              </ul>
            </div>

            <div className="layer">
              <h4>🔐 Browser Layer</h4>
              <ul>
                <li>Content Security Policy</li>
                <li>Clickjacking protection</li>
                <li>XSS mitigation headers</li>
              </ul>
            </div>

            <div className="layer">
              <h4>💾 Application Layer</h4>
              <ul>
                <li>Server-side input validation</li>
                <li>Output encoding</li>
                <li>CSRF protection</li>
              </ul>
            </div>

            <div className="layer">
              <h4>🔌 API Layer</h4>
              <ul>
                <li>Rate limiting enforced</li>
                <li>Authorization checks</li>
                <li>Restricted CORS origins</li>
              </ul>
            </div>

            <div className="layer">
              <h4>📦 Supply Chain</h4>
              <ul>
                <li>Dependencies scanned</li>
                <li>Packages regularly updated</li>
                <li>Security audits run</li>
              </ul>
            </div>

            <div className="layer">
              <h4>📊 Monitoring</h4>
              <ul>
                <li>Request logging enabled</li>
                <li>Anomaly detection active</li>
                <li>Rate limit alerts</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="security-info">
          <p>
            <strong>Trust & Transparency:</strong> This portfolio implements industry-standard security controls 
            across all critical layers. Every endpoint is rate-limited, all inputs are validated and sanitized, 
            and the entire application runs under HTTPS with strict security headers. For more information, see the 
            <a href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank" rel="noopener noreferrer"> 
              OWASP ASVS
            </a> framework.
          </p>
        </div>
      </div>
    </section>
  );
}
