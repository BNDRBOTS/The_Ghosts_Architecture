// ============================================
// FILE: src/components/ghost-core/KineticTypeSystem.jsx
// ============================================
import React, { useRef, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';

const KineticTypeSystem = ({ text, progress, threshold = 0.3 }) => {
  const ref = useRef(null);
  const weight = useTransform(progress, [0, 1], [200, 700]);
  const width = useTransform(progress, [0, 1], [80, 120]);
  const color = useTransform(progress, [threshold - 0.1, threshold, threshold + 0.1], ['#F8F6F2', '#8B6F4C', '#F8F6F2']);

  return (
    <div ref={ref} className="kinetic-type-container">
      <motion.h2
        className="kinetic-headline"
        style={{
          fontVariationSettings: `"wght" ${weight}, "wdth" ${width}`,
          color: color,
        }}
      >
        {text}
      </motion.h2>
    </div>
  );
};

export default KineticTypeSystem;
