import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin accent scroll-progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="progress" data-testid="scroll-progress-bar" />;
};
