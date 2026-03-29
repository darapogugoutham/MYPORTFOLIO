import React, { useState, useEffect } from 'react';
import './VisitorCounter.css';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/visitors', {
          method: 'GET',
        });
        const data = await response.json();
        setCount(data.visitors);
        setIsLoading(false);
      } catch (error) {
        console.error('Error tracking visitor:', error);
        // Fallback: try to get count without incrementing
        try {
          const response = await fetch('http://localhost:4000/api/visitors-count');
          const data = await response.json();
          setCount(data.visitors);
        } catch (e) {
          setCount(0);
        }
        setIsLoading(false);
      }
    };

    trackVisitor();
  }, []);

  return (
    <div className="visitor-counter">
      <div className="visitor-badge">
        <span className="visitor-icon">👁️</span>
        <span className="visitor-text">
          {isLoading ? 'Loading...' : `${count.toLocaleString()} visits`}
        </span>
      </div>
    </div>
  );
}
