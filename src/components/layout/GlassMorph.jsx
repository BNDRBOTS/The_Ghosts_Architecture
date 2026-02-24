// ============================================
// FILE: src/components/layout/GlassMorph.jsx
// ============================================
import React from 'react';
import { motion } from 'framer-motion';

const GlassMorph = ({ children, intensity = 0.5 }) => {
  return (
    <motion.div
      className="glass-morph"
      whileHover={{
        backdropFilter: `blur(${12 * intensity}px)`,
        backgroundColor: `rgba(18, 18, 18, ${0.3 * intensity})`,
        borderColor: '#8B6F4C40',
        scale: 1.02,
      }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default GlassMorph;
