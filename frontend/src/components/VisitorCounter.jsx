import React, { useState, useEffect } from 'react';
import './VisitorCounter.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const trackVisitor = async (retries = 3) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/visitors`, {
          method: 'GET',
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        const data = await response.json();
        setCount(data.visitors);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error tracking visitor:', error);
        
        // If it's a timeout/connection error, retry (likely cold start)
        if (retries > 0 && (error.name === 'AbortError' || error.message.includes('Failed to fetch'))) {
          console.log(`Retrying... (${3 - retries + 1}/3)`);
          setTimeout(() => trackVisitor(retries - 1), 2000); // Retry after 2 seconds
          return;
        }
        
        // Fallback: try to get count without incrementing
        try {
          const response = await fetch(`${API_BASE_URL}/api/visitors-count`);
          const data = await response.json();
          setCount(data.visitors);
          setError(null);
        } catch (e) {
          setCount(0);
          setError('Server warming up...');
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
          {isLoading ? 'Loading...' : error ? error : `${count.toLocaleString()} visits`}
        </span>
      </div>
    </div>
  );
}
