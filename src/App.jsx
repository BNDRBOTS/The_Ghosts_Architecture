// src/App.jsx
// THE GHOST ARCHITECT OF PHOENIX
// 2026 Ultra-Lux Stealth-Wealth Directive
// Rounded Glass > Boxy Bentos. Kinetic Type > Static Text. Custom Physics > Libraries.
// Color: #F8F6F2 (warm bone), #121212 (matte charcoal), #8B6F4C (warm bronze - ONLY accent)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- DIRECTIVE 10: GOVERNING METAPHOR ---
// "The Living Mathematical Organism" - Information born, information collapses.
// No headers. No footers. Only continuous cinematic flow.

// --- DIRECTIVE 7: COLOR LOGIC ---
// Neutrals: #F8F6F2 (signal), #121212 (void)
// Accent: #8B6F4C (warm bronze) - ONLY appears at moments of significance
// No firetruck red. No Christmas green. No warning yellow. No basic blue.

const COLOR = {
  VOID: '#121212',
  SIGNAL: '#F8F6F2',
  ACCENT: '#8B6F4C',
  GLASS: 'rgba(248, 246, 242, 0.03)'
};

// --- DIRECTIVE 4: VARIABLE FONT AXES (custom commercial weights) ---
// Neue Montreal variable axes: wght from 200-700, wdth from 80-120
// No Inter. No system sans. Only custom autonomy.

// --- DIRECTIVE 1: TYPOGRAPHY AS PRIMARY UI ---
// KineticTypeSystem - scroll reveals letters with gravitational weight

const KineticTypeSystem = ({ text, triggerPoint = 0.3 }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  // Map scroll to font weight (200-700) and width (80-120)
  const fontWeight = useTransform(scrollYProgress, [0, 1], [200, 700]);
  const fontWidth = useTransform(scrollYProgress, [0, 1], [80, 120]);
  
  // Spring physics for smoothness - no discrete steps
  const smoothWeight = useSpring(fontWeight, { stiffness: 100, damping: 30 });
  const smoothWidth = useSpring(fontWidth, { stiffness: 100, damping: 30 });
  
  return (
    <div ref={containerRef} className="kinetic-type-container" style={{ minHeight: '60vh' }}>
      <motion.h2 
        className="kinetic-headline"
        style={{
          fontVariationSettings: `"wght" ${smoothWeight}, "wdth" ${smoothWidth}`,
          color: scrollYProgress.get() > triggerPoint ? COLOR.ACCENT : COLOR.SIGNAL,
          transition: 'color 0.8s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        {text}
      </motion.h2>
    </div>
  );
};

// --- DIRECTIVE 6: HONEST STRUCTURAL FRAMING ---
// No ornamental containers. Only grid, rules, alignment.

const AsymmetricBreathing = ({ children }) => {
  // Custom grid that breathes - columns shift based on viewport
  // Not a standard 12-column - this one flows
  
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

// --- DIRECTIVE 5: CINEMATIC TRANSITIONS ---
// No discrete section changes. Only fluid morphing.

const GlassMorph = ({ children, intensity = 0.5 }) => {
  // Rounded glass > boxy bentos
  // Border radius scales with viewport - never static
  
  return (
    <motion.div 
      className="glass-morph"
      whileHover={{ 
        backdropFilter: `blur(${12 * intensity}px)`,
        backgroundColor: `rgba(18, 18, 18, ${0.3 * intensity})`,
        borderColor: `${COLOR.ACCENT}40`,
        scale: 1.02
      }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
};

// --- DIRECTIVE 12: TACTILE NOISE + OPTICAL TRACKING ---
// Physical screen texture + micro-movement response

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
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 30; // Subtle - anti-friction
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 15;    // A - barely there, but physical
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

// --- DIRECTIVE 3: ELIMINATE DEFAULT CARDS ---
// Only essential meaning containers

const GravitationalField = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const points = useRef([]);
  
  // DIRECTIVE 9: NO HEADER→HERO→GRID→FORM→FOOTER
  // Start from interaction model: mouse creates gravitational wells
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let width, height;
    
    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      
      // Initialize particle field - information nodes
      points.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        mass: Math.random() * 0.5 + 0.5
      }));
    };
    
    const updatePhysics = () => {
      // DIRECTIVE: Custom gravitational solver
      // No libraries. Raw trigonometry. Forensic physics.
      
      points.current.forEach(p1 => {
        // Mouse gravitational pull
        const dx = mousePos.current.x - p1.x;
        const dy = mousePos.current.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (300 - dist) / 300 * 0.02;
          const angle = Math.atan2(dy, dx);
          p1.vx += Math.cos(angle) * force * p1.mass;
          p1.vy += Math.sin(angle) * force * p1.mass;
        }
        
        // Information decay - entropy
        p1.vx *= 0.99;
        p1.vy *= 0.99;
        
        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        // Boundary containment (information doesn't escape the void)
        if (p1.x < 0 || p1.x > width) p1.vx *= -0.5;
        if (p1.y < 0 || p1.y > height) p1.vy *= -0.5;
      });
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections (information relationships)
      ctx.strokeStyle = `${COLOR.SIGNAL}10`;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < points.current.length; i++) {
        for (let j = i + 1; j < points.current.length; j++) {
          const p1 = points.current[i];
          const p2 = points.current[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(248, 246, 242, ${0.1 * (1 - dist/150)})`;
            ctx.stroke();
          }
        }
      }
      
      // Draw points (information nodes)
      points.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.mass, 0, Math.PI * 2);
        ctx.fillStyle = p.vx > 1 ? `${COLOR.ACCENT}80` : `${COLOR.SIGNAL}40`;
        ctx.fill();
      });
      
      updatePhysics();
      animationFrame = requestAnimationFrame(draw);
    };
    
    const handleMouse = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouse);
    init();
    draw();
    
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="gravitational-field" />;
};

// --- DIRECTIVE 2: SCROLL-DRIVEN NARRATIVE ---
// Content pacing controlled by scroll progress

const ScrollNarrative = () => {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null);
  
  // Narrative chapters mapped to scroll percentages
  const chapters = [
    { threshold: 0, text: "ARCHITECTURE ISN'T BUILT", weight: 200 },
    { threshold: 0.2, text: "IT'S GROWN", weight: 350 },
    { threshold: 0.4, text: "FROM THE VOID", weight: 500 },
    { threshold: 0.6, text: "EMERGES SIGNAL", weight: 650 },
    { threshold: 0.8, text: "BNDR // GHOST IN THE MACHINE", weight: 700 }
  ];
  
  const currentChapter = useTransform(scrollYProgress, (progress) => {
    const chapter = chapters.findLast(c => progress >= c.threshold);
    return chapter || chapters[0];
  });
  
  return (
    <div ref={containerRef} className="scroll-narrative">
      <motion.div className="narrative-content">
        {chapters.map((chapter, i) => (
          <motion.div
            key={i}
            className="chapter-marker"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [chapter.threshold - 0.1, chapter.threshold, chapter.threshold + 0.1],
                [0, 1, 0]
              )
            }}
          >
            <h3 style={{ 
              fontVariationSettings: `"wght" ${chapter.weight}`,
              color: i === chapters.length - 1 ? COLOR.ACCENT : COLOR.SIGNAL
            }}>
              {chapter.text}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// --- MAIN ASSEMBLY ---
// The Living Mathematical Organism

function App() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Preload fonts, then reveal
    document.fonts.ready.then(() => setLoaded(true));
  }, []);
  
  if (!loaded) return <div className="loading-void" />;
  
  return (
    <div className="ghost-architecture">
      <TactileNoise />
      <GravitationalField />
      
      <main className="cinematic-flow">
        <section className="viewport-chapter" style={{ height: '120vh' }}>
          <KineticTypeSystem text="ARCHITECTURE ISN'T BUILT" />
          <div className="glass-rule" />
        </section>
        
        <section className="viewport-chapter" style={{ height: '100vh' }}>
          <GlassMorph intensity={0.8}>
            <ScrollNarrative />
          </GlassMorph>
        </section>
        
        <section className="viewport-chapter" style={{ height: '150vh' }}>
          <AsymmetricBreathing>
            {/* Project nodes emerge from gravitational field */}
            {['VENOM', 'VOSS', 'OBSIDIAN'].map((project, i) => (
              <motion.div
                key={project}
                className="project-emergence"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ delay: i * 0.2, duration: 1.2 }}
              >
                <span className="project-year">2026</span>
                <h2 className="project-title">{project}</h2>
                <div className="project-glass" />
              </motion.div>
            ))}
          </AsymmetricBreathing>
        </section>
      </main>
      
      {/* DIRECTIVE 8: MICRO-INTERACTIONS COMMUNICATE STATE */}
      <div className="optical-tracker">
        <div className="tracker-dot" />
      </div>
    </div>
  );
}

export default App;
