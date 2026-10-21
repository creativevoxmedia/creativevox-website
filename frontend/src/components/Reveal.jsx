import { motion } from 'framer-motion';

/** Fade-up scroll reveal wrapper (fires once). */
export const Reveal = ({ children, delay = 0, y = 28, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

/** awsmd portfolio-style head: small label + gray copy on the left, big heading on the right. */
export const SectionHeader = ({ eyebrow, headingLines, sub }) => (
  <Reveal className="sec-head">
    <div className="sec-head__l">
      <span className="eyebrow">{eyebrow}</span>
      {sub && <p className="lead">{sub}</p>}
    </div>
    <h2 className="h2">
      {headingLines.map((line, i) => (
        <span key={line} className={`line${i % 2 === 1 ? ' soft' : ''}`}>{line}</span>
      ))}
    </h2>
  </Reveal>
);
