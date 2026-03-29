import React, { useState } from 'react';
import axios from 'axios';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { icon: FiMail, label: 'Email', href: 'mailto:darapogugoutham@gmail.com', text: 'darapogugoutham@gmail.com' },
    { icon: FiPhone, label: 'Phone', href: 'tel:+13616965492', text: '(361) 696-5492' },
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/darapogugoutham', text: 'github.com/darapogugoutham' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/goutham-darapogu-184004219/', text: 'linkedin.com/in/goutham-darapogu-184004219' },
  ];

  return (
    <main className="contact-page section-padding">
      <div className="container">
        <h1 className="page-title fade-in">Get In Touch</h1>
        <p className="page-subtitle slide-up">
          Let's build something amazing together. Feel free to reach out!
        </p>

        <div className="contact-grid">
          <div className="contact-form-wrapper fade-in">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  rows="6"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {success && (
                <div className="success-message">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          <div className="contact-info">
            <div className="info-card card fade-in">
              <h2>Connect With Me</h2>
              <p>I'm always open to interesting conversations and opportunities.</p>

              <div className="contact-links">
                {Array.isArray(links) && links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      <Icon className="icon" />
                      <div>
                        <div className="link-label">{link.label}</div>
                        <div className="link-text">{link.text}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="info-card card fade-in">
              <h2>Availability</h2>
              <p>I'm currently</p>
              <ul className="availability-list">
                <li>✓ Open to full-time opportunities</li>
                <li>✓ Available for freelance projects</li>
                <li>✓ Interested in collaborations</li>
                <li>✓ Happy to discuss ideas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
