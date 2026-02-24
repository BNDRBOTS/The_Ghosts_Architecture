// ============================================
// FILE: src/App.jsx
// ============================================
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import KineticTypeSystem from './components/ghost-core/KineticTypeSystem';
import GravitationalField from './components/ghost-core/GravitationalField';
import TactileNoise from './components/ghost-core/TactileNoise';
import OpticalTracker from './components/ghost-core/OpticalTracker';
import AsymmetricBreathing from './components/layout/AsymmetricBreathing';
import GlassMorph from './components/layout/GlassMorph';
import useScrollNarrative from './hooks/useScrollNarrative';
import useVariableFont from './hooks/useVariableFont';
import './styles/forensic-physics.css';

const COLOR = {
  VOID: '#121212',
  SIGNAL: '#F8F6F2',
  ACCENT: '#8B6F4C',
};

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const narrative = useScrollNarrative(smoothProgress);
  const fontSettings = useVariableFont(smoothProgress);

  if (!fontsLoaded) {
    return <div className="loading-void" />;
  }

  return (
    <div className="ghost-architecture">
      <TactileNoise />
      <GravitationalField />
      <OpticalTracker />

      <main className="cinematic-flow">
        {/* Chapter 1: Kinetic typography hero */}
        <section className="viewport-chapter" style={{ height: '120vh' }}>
          <KineticTypeSystem
            text="ARCHITECTURE ISN'T BUILT"
            progress={smoothProgress}
            threshold={0.2}
          />
          <div className="glass-rule" />
        </section>

        {/* Chapter 2: Scroll narrative */}
        <section className="viewport-chapter" style={{ height: '100vh' }}>
          <GlassMorph intensity={0.8}>
            <div className="narrative-container">
              <motion.h2
                className="narrative-text"
                style={{
                  fontVariationSettings: `"wght" ${fontSettings.weight}, "wdth" ${fontSettings.width}`,
                  color: narrative.index === narrative.chapters.length - 1 ? COLOR.ACCENT : COLOR.SIGNAL,
                }}
              >
                {narrative.currentChapter.text}
              </motion.h2>
            </div>
          </GlassMorph>
        </section>

        {/* Chapter 3: Asymmetric project grid */}
        <section className="viewport-chapter" style={{ height: '150vh', padding: '4rem 2rem' }}>
          <AsymmetricBreathing>
            {['VENOM CUTS', 'VOSS', 'OBSIDIAN', 'EVIES CAFE', 'SAGUARO', 'BILTMORE'].map((title, i) => (
              <motion.div
                key={title}
                className="project-emergence"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ delay: i * 0.15, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="project-year">2026</span>
                <h3 className="project-title">{title}</h3>
                <div className="project-glass" />
              </motion.div>
            ))}
          </AsymmetricBreathing>
        </section>
      </main>
    </div>
  );
}

export default App;
