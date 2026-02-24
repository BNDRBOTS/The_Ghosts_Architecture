// ============================================
// FILE: src/hooks/useScrollNarrative.js
// ============================================
import { useState, useEffect } from 'react';
import { useTransform } from 'framer-motion';

const chapters = [
  { threshold: 0, text: "ARCHITECTURE ISN'T BUILT", weight: 200 },
  { threshold: 0.2, text: "IT'S GROWN", weight: 350 },
  { threshold: 0.4, text: "FROM THE VOID", weight: 500 },
  { threshold: 0.6, text: "EMERGES SIGNAL", weight: 650 },
  { threshold: 0.8, text: "BNDR // GHOST IN THE MACHINE", weight: 700 },
];

const useScrollNarrative = (scrollProgress) => {
  const [currentChapter, setCurrentChapter] = useState(chapters[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollProgress.onChange((v) => {
      for (let i = chapters.length - 1; i >= 0; i--) {
        if (v >= chapters[i].threshold) {
          setCurrentChapter(chapters[i]);
          setIndex(i);
          break;
        }
      }
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  return { currentChapter, chapters, index };
};

export default useScrollNarrative;
