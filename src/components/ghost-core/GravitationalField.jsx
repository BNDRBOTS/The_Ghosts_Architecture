// ============================================
// FILE: src/components/ghost-core/GravitationalField.jsx
// ============================================
import React, { useRef, useEffect } from 'react';

const GravitationalField = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const points = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrame;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Initialize 80 particles
      points.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        mass: Math.random() * 0.5 + 0.5,
      }));
    };

    const update = () => {
      const mouseX = mouse.current.x;
      const mouseY = mouse.current.y;

      points.current.forEach(p => {
        // gravitational pull toward mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (300 - dist) / 300 * 0.02;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * p.mass;
          p.vy += Math.sin(angle) * force * p.mass;
        }

        // damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // boundary
        if (p.x < 0 || p.x > width) p.vx *= -0.5;
        if (p.y < 0 || p.y > height) p.vy *= -0.5;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // draw connections
      for (let i = 0; i < points.current.length; i++) {
        for (let j = i + 1; j < points.current.length; j++) {
          const p1 = points.current[i];
          const p2 = points.current[j];
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(248, 246, 242, ${0.1 * (1 - d/150)})`;
            ctx.stroke();
          }
        }
      }

      // draw particles
      points.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.mass, 0, 2 * Math.PI);
        ctx.fillStyle = Math.abs(p.vx) > 1 ? 'rgba(139, 111, 76, 0.5)' : 'rgba(248, 246, 242, 0.3)';
        ctx.fill();
      });

      update();
      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="gravitational-field" />;
};

export default GravitationalField;
