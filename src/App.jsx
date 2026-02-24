// src/App.jsx – The Ghost Architecture (Complete, Deployable)
// 2026 Ultra-Lux Stealth-Wealth. Zero compromise.

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'; // only for orchestration, not physics

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGIC COLOR ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────
const COLORS = {
  warmWhite: '#F8F7F4',
  matteCharcoal: '#1A1C1E',
  terracottaEmber: '#B86B4F',
  emberGlow: 'rgba(184, 107, 79, 0.3)',
  deepAsh: '#2F3133',
  softIvory: '#EFECE5'
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM PHYSICS ENGINE – PURE TRIGONOMETRY, NO LIBRARIES
// Particle field with gravitational solver and optical attractor
// ─────────────────────────────────────────────────────────────────────────────
class ParticleField {
  constructor(canvas, onUpdate) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    this.onUpdate = onUpdate;
    this.particles = [];
    this.attractor = { x: 0, y: 0, strength: 0 };
    this.width = 0;
    this.height = 0;
    this.animationFrame = null;
    this.resize();
    this.initParticles(120); // dense enough for immersion
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  initParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        ax: 0, ay: 0,
        mass: 0.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  setAttractor(x, y, strength) {
    this.attractor = { x, y, strength: strength * 0.4 }; // 0.4 = tuned intensity
  }

  computeForces() {
    const p = this.particles;
    const attr = this.attractor;

    // Reset accelerations
    for (let i = 0; i < p.length; i++) {
      p[i].ax = 0;
      p[i].ay = 0;
    }

    // Particle–particle interactions (O(n²) but 120 particles → 7140 ops, fine at 60fps)
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        const dx = p[j].x - p[i].x;
        const dy = p[j].y - p[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 5 && dist < 150) {
          const force = (0.1 * p[i].mass * p[j].mass) / (dist * dist);
          const angle = Math.atan2(dy, dx);
          const fx = Math.cos(angle) * force;
          const fy = Math.sin(angle) * force;
          p[i].ax += fx / p[i].mass;
          p[i].ay += fy / p[i].mass;
          p[j].ax -= fx / p[j].mass;
          p[j].ay -= fy / p[j].mass;
        }
      }

      // Attractor force (user micro‑movements)
      if (attr.strength !== 0) {
        const dx = attr.x - p[i].x;
        const dy = attr.y - p[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const force = (attr.strength * 25) / (dist + 20);
          const angle = Math.atan2(dy, dx);
          p[i].ax += Math.cos(angle) * force;
          p[i].ay += Math.sin(angle) * force;
        }
      }

      // Organic drift
      p[i].phase += 0.015;
      p[i].ax += Math.sin(p[i].phase) * 0.04;
      p[i].ay += Math.cos(p[i].phase * 1.2) * 0.04;

      // Boundary soft repulsion
      const margin = 40;
      if (p[i].x < margin) p[i].ax += (margin - p[i].x) * 0.008;
      if (p[i].x > this.width - margin) p[i].ax -= (p[i].x - (this.width - margin)) * 0.008;
      if (p[i].y < margin) p[i].ay += (margin - p[i].y) * 0.008;
      if (p[i].y > this.height - margin) p[i].ay -= (p[i].y - (this.height - margin)) * 0.008;
    }
  }

  update() {
    this.computeForces();
    for (let p of this.particles) {
      p.vx += p.ax;
      p.vy += p.ay;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.x += p.vx;
      p.y += p.vy;
    }
    if (this.onUpdate) this.onUpdate(this.particles);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.lineWidth = 0.6;

    // Draw connections (web structure)
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[j].x - this.particles[i].x;
        const dy = this.particles[j].y - this.particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const opacity = (1 - dist / 110) * 0.12;
          this.ctx.strokeStyle = `rgba(248, 247, 244, ${opacity})`;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    for (let p of this.particles) {
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const intensity = Math.min(speed * 1.8, 1);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 1.8 + p.mass * 0.7, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(184, 107, 79, ${intensity * 0.5})`;
      this.ctx.fill();
      this.ctx.shadowColor = COLORS.terracottaEmber;
      this.ctx.shadowBlur = intensity * 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }

  animate() {
    this.update();
    this.draw();
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// KINETIC TYPOGRAPHY COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const KineticType = ({ text, weight, width, italic, className }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    // Apply variable font axes via CSS custom properties
    ref.current.style.setProperty('--wght', weight);
    ref.current.style.setProperty('--wdth', width);
    ref.current.style.setProperty('--ital', italic);
  }, [weight, width, italic]);

  return (
    <div
      ref={ref}
      className={`kinetic-type ${className}`}
      style={{
        fontVariationSettings: `'wght' calc(200 + (var(--wght) * 300)), 'wdth' calc(90 + (var(--wdth) * 20)), 'ital' var(--ital)`,
      }}
    >
      {text}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TACTILE NOISE OVERLAY
// ─────────────────────────────────────────────────────────────────────────────
const TactileNoise = () => (
  <div
    className="tactile-noise"
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 100,
      opacity: 0.018,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      mixBlendMode: 'screen',
    }}
  />
);

// ─────────────────────────────────────────────────────────────────────────────
// OPTICAL HUD – bottom‑left dynamic data
// ─────────────────────────────────────────────────────────────────────────────
const OpticalHUD = ({ scrollProgress, mouse }) => {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 font-mono text-[8px] text-[#F8F7F4]/40 mix-blend-difference"
      style={{ opacity: useTransform(scrollProgress, [0, 0.1, 0.9, 1], [1, 0.5, 0.5, 1]) }}
    >
      <div>OPTICAL TRACK: X {Math.round(mouse.x)} Y {Math.round(mouse.y)}</div>
      <div>SCROLL: {(scrollProgress.get() * 100).toFixed(0)}%</div>
      <div className="w-24 h-[1px] bg-[#F8F7F4]/20 mt-1">
        <motion.div
          className="h-full bg-[#B86B4F]"
          style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ASYMMETRIC GHOST GRID (wave‑breathing architecture)
// ─────────────────────────────────────────────────────────────────────────────
const GhostGrid = () => {
  // 12 projects + 3 stat cards = 15 cells
  const projects = [
    { title: 'LifeMatrix', category: 'System Arch', year: '2026', type: 'arch' },
    { title: 'The Feed', category: 'Social UX', year: '2026', type: 'ux' },
    { title: 'Studio', category: 'Agency ID', year: '2026', type: 'brand' },
    { title: 'Voss', category: 'Spatial', year: '2026', type: 'spatial' },
    { title: 'Saguaro Ironline', category: 'Industrial', year: '2026', type: 'brand' },
    { title: 'Auto Logistics', category: 'Interface', year: '2026', type: 'ux' },
    { title: 'Sangre del Sol', category: 'Narrative', year: '2026', type: 'brand' },
    { title: 'Biltmore Signal', category: 'Financial UX', year: '2026', type: 'ux' },
    { title: 'Ocotillo Iron', category: 'Industrial', year: '2026', type: 'brand' },
    { title: 'Private Wealth', category: 'Financial', year: '2026', type: 'ux' },
    { title: 'Epoch Aura', category: 'Spatial Web', year: '2026', type: 'spatial' },
    { title: 'Obsidian', category: 'System Arch', year: '2026', type: 'arch' },
  ];

  // span definitions: col-span and row-span for md+
  const spans = [
    'md:col-span-7 md:row-span-2', // hero stat or featured
    'md:col-span-5 md:row-span-1', // stat 1
    'md:col-span-3 md:row-span-1', // stat 2
    'md:col-span-4 md:row-span-2', // tall
    'md:col-span-8 md:row-span-1', // wide
    'md:col-span-3 md:row-span-1', // micro
    'md:col-span-3 md:row-span-1', // micro
    'md:col-span-6 md:row-span-2', // panoramic
    'md:col-span-4 md:row-span-1',
    'md:col-span-8 md:row-span-1',
    'md:col-span-5 md:row-span-2',
    'md:col-span-7 md:row-span-1',
    'md:col-span-6 md:row-span-1',
    'md:col-span-6 md:row-span-1',
    'md:col-span-12 md:row-span-1', // footer band
  ];

  // Stat cards (injected into grid)
  const stats = [
    { value: 14, label: 'PROJECTS', icon: '⚡' },
    { value: 8, label: 'YEARS', icon: '⏳' },
    { value: 24, label: 'PARTNERS', icon: '🌐' },
  ];

  return (
    <section className="w-full px-4 md:px-8 mt-20 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] md:auto-rows-[280px] gap-4 md:gap-6">
        {/* Inject stat cards first */}
        {stats.map((stat, i) => (
          <motion.div
            key={`stat-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`glass-panel ${spans[i]} flex flex-col justify-end p-8`}
          >
            <div className="text-4xl mb-4 text-[#B86B4F]">{stat.icon}</div>
            <div className="font-custom text-5xl font-light text-[#F8F7F4]">{stat.value}</div>
            <div className="font-mono text-xs text-[#F8F7F4]/40 uppercase tracking-wider mt-2">{stat.label}</div>
          </motion.div>
        ))}

        {/* Project cards */}
        {projects.map((project, idx) => {
          const spanIndex = (idx + stats.length) % spans.length;
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.02 }}
              className={`glass-panel ${spans[spanIndex]} group relative overflow-hidden p-8 flex flex-col justify-end cursor-pointer`}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#B86B4F]/0 to-[#B86B4F]/0 group-hover:from-[#B86B4F]/10 group-hover:to-transparent transition-all duration-700" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-[#F8F7F4]/40 uppercase tracking-wider">
                    {project.year} // {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="p-2 rounded-full bg-[#1A1C1E]/80 border border-[#F8F7F4]/10 group-hover:bg-[#B86B4F] group-hover:border-[#B86B4F] transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={16} className="text-[#F8F7F4]" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-light text-[#F8F7F4] tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#F8F7F4]/30 uppercase tracking-wider">
                  {project.category}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NEURAL TAKEOVER MODAL (immersive)
// ─────────────────────────────────────────────────────────────────────────────
const NeuralTakeover = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#1A1C1E]/95 backdrop-blur-2xl p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        layoutId={`modal-${project.title}`}
        className="w-full h-full bg-[#1A1C1E] border border-[#F8F7F4]/10 rounded-[2rem] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-custom text-[#F8F7F4] mb-6">{project.title}</h2>
            <p className="font-mono text-sm text-[#F8F7F4]/40 uppercase tracking-widest mb-12">{project.category}</p>
            <button className="px-8 py-4 bg-[#B86B4F] text-[#F8F7F4] rounded-full font-mono text-sm tracking-wider hover:bg-[#B86B4F]/80 transition-colors">
              Enter Experience
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-4 bg-[#B86B4F] rounded-full hover:scale-110 transition-transform"
        >
          <X size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN GHOST ARCHITECT APP
// ─────────────────────────────────────────────────────────────────────────────
import { ArrowUpRight, X } from 'lucide-react';

function App() {
  const canvasRef = useRef(null);
  const [particleField, setParticleField] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();

  // Typography as primary UI – scroll‑driven variable font axes
  const typeWeight = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [200, 450, 350, 180]);
  const typeWidth = useTransform(scrollYProgress, [0, 0.5, 1], [90, 115, 95]);
  const typeItalic = useTransform(scrollYProgress, [0.2, 0.8], [0, 0.8]);

  // Initialize particle field
  useEffect(() => {
    if (!canvasRef.current) return;
    const field = new ParticleField(canvasRef.current, (particles) => {
      // optional callback if needed
    });
    setParticleField(field);
    field.animate();

    return () => field.destroy();
  }, []);

  // Optical tracking – update attractor and mouse state
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMouse({ x, y });
      if (particleField) {
        // strength modulated by distance to edges (feels more organic)
        const strength = Math.sin((x / window.innerWidth) * Math.PI) * Math.sin((y / window.innerHeight) * Math.PI);
        particleField.setAttractor(x, y, strength);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [particleField]);

  return (
    <div className="relative min-h-screen bg-[#1A1C1E] text-[#F8F7F4] font-sans antialiased overflow-x-hidden">
      {/* Physics canvas – behind everything */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ filter: 'blur(0.3px)' }} />

      <TactileNoise />
      <OpticalHUD scrollProgress={scrollYProgress} mouse={mouse} />

      {/* Header – minimal, no generic navigation */}
      <header className="fixed top-6 left-6 z-50 mix-blend-difference">
        <div className="font-custom text-xs tracking-[0.3em] text-[#F8F7F4]">BNDR</div>
        <div className="font-mono text-[8px] text-[#F8F7F4]/40 mt-1 flex gap-3">
          <span>DESIGN</span> <span>ARCHITECTURE</span> <span>SYSTEMS</span>
        </div>
      </header>

      <div className="fixed top-6 right-6 z-50">
        <button className="p-3 bg-[#F8F7F4]/5 border border-[#F8F7F4]/10 rounded-full hover:bg-[#B86B4F] transition-colors">
          <Menu size={18} />
        </button>
      </div>

      <main className="relative z-10">
        {/* Hero – kinetic type as primary UI */}
        <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-12">
          <KineticType
            text="BNDR"
            weight={typeWeight}
            width={typeWidth}
            italic={typeItalic}
            className="text-[20vw] leading-[0.7] font-custom tracking-[-0.03em] text-[#F8F7F4] mix-blend-difference"
          />
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 max-w-xl font-mono text-xs md:text-sm text-[#F8F7F4]/60 uppercase tracking-[0.3em] leading-relaxed"
          >
            Website Design · Graphic Design · Brand Development · Architect Mind
          </motion.p>
        </section>

        {/* Ghost Grid */}
        <GhostGrid />
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <NeuralTakeover project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Missing import for Menu (lucide-react)
import { Menu } from 'lucide-react';
export default App;
