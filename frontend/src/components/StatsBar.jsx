import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { stats } from '@/data/content';

/** Animated number counter, fires once when scrolled into view. */
export const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (<span ref={ref} data-testid="animated-counter">{display}{suffix}</span>);
};

/** awsmd "Some Number About Us": 2×2 soft grey cards with a little 3D object. */
export const StatsBar = () => (
  <div aria-label="CreativeVox in numbers">
    <p className="numbers-label">{stats.eyebrow.charAt(0) + stats.eyebrow.slice(1).toLowerCase()}</p>
    <div className="stats" data-testid="stats-bar">
      {stats.items.map((stat, i) => (
        <div key={stat.label} className="stat">
          <p className="stat__value" data-testid={`stat-value-${i}`}><Counter value={stat.value} suffix={stat.suffix} /></p>
          <p className="stat__label">{stat.label}</p>
          <span className="stat__obj" aria-hidden="true" />
        </div>
      ))}
    </div>
  </div>
);
