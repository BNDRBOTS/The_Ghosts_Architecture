// ============================================
// FILE: src/components/layout/AsymmetricBreathing.jsx
// ============================================
import React from 'react';

const AsymmetricBreathing = ({ children }) => {
  return (
    <div className="breathing-grid">
      <div className="grid-rule vertical" />
      <div className="grid-rule vertical" style={{ left: '33.33%' }} />
      <div className="grid-rule vertical" style={{ left: '66.66%' }} />
      <div className="grid-rule horizontal" />
      <div className="grid-rule horizontal" style={{ top: '50%' }} />
      <div className="grid-rule horizontal" style={{ top: '100%' }} />
      {children}
    </div>
  );
};

export default AsymmetricBreathing;
