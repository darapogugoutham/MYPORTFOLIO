import React, { useState, useEffect, useRef } from 'react';
import './AnimatedCounter.css';

function AnimatedCounter({ target, label, duration = 2 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetNum = typeof target === 'number' ? target : parseInt(target, 10);
    const increment = targetNum / (duration * 60);
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isVisible, target, duration]);

  return (
    <div ref={elementRef} className="animated-counter">
      <span className="counter-number">
        {count}
        {String(target).includes('+') && '+'}
      </span>
      <span className="counter-label">{label}</span>
    </div>
  );
}

export default AnimatedCounter;
