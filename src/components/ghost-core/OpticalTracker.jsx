// ============================================
// FILE: src/components/ghost-core/OpticalTracker.jsx
// ============================================
import React, { useEffect, useRef } from 'react';

const OpticalTracker = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dotRef.current) return;
      dotRef.current.style.setProperty('--x', `${e.clientX}px`);
      dotRef.current.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="optical-tracker">
      <div ref={dotRef} className="tracker-dot" />
    </div>
  );
};

export default OpticalTracker;
