// ============================================
// FILE: src/hooks/useVariableFont.js
// ============================================
import { useTransform } from 'framer-motion';

const useVariableFont = (scrollProgress) => {
  const weight = useTransform(scrollProgress, [0, 1], [200, 700]);
  const width = useTransform(scrollProgress, [0, 1], [80, 120]);

  return { weight, width };
};

export default useVariableFont;
