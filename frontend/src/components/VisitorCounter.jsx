import React from 'react';
import './VisitorCounter.css';

export default function VisitorCounter() {
  return (
    <div className="visitor-counter">
      <div className="visitor-badge">
        <span className="visitor-icon">View</span>
        <span className="visitor-text">
          Portfolio available 24/7
        </span>
      </div>
    </div>
  );
}
