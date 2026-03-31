import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import { MdDownload } from 'react-icons/md';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.txt';
    link.download = 'Goutham_Darapogu_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <div className="logo-gd">GD</div>
        </Link>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link
                to={link.path}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <a
            href="https://github.com/darapogugoutham"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/goutham-darapogu-184004219/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon"
          >
            <FiLinkedin />
          </a>
          <button onClick={handleResumeDownload} className="btn btn-small btn-primary">
            <MdDownload /> Resume
          </button>
        </div>

        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
