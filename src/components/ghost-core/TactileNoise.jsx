// ============================================
// FILE: src/components/ghost-core/TactileNoise.jsx
// ============================================
import React, { useRef, useEffect } from 'react';

const TactileNoise = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    const drawNoise = () => {
      if (!width || !height) return;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 30;
        data[i] = val;     // R
        data[i+1] = val;   // G
        data[i+2] = val;   // B
        data[i+3] = 15;    // A
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(drawNoise);
    };

    window.addEventListener('resize', resize);
    resize();
    drawNoise();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="tactile-noise" />;
};

export default TactileNoise;
