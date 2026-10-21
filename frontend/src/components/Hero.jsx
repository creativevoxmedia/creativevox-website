import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { hero, nav, site } from '@/data/content';
import { scrollToSection } from '@/lib/scroll';

const EASE = [0.16, 1, 0.3, 1];

/**
 * awsmd-style hero: inset rounded lavender container (looping video at
 * public/media/hero.mp4 sits over the gradient), light + bold condensed headline
 * with a round down-arrow, hairline, rating-style badge and a side menu.
 */
export const Hero = () => {
  const ref = useRef(null);
  const [noVideo, setNoVideo] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const go = (href) => (e) => { e.preventDefault(); scrollToSection(href); };

  const first = hero.headlineGradient.charAt(0);
  const rest = hero.headlineGradient.slice(1);

  return (
    <section ref={ref} id="top" className="hero">
      <motion.div aria-hidden="true" style={{ scale: bgScale }} className="hero__bg">
        <div className="hero__grad" />
        <div className="hero__ribbon" />
        {!noVideo && (
          <video autoPlay muted loop playsInline onError={() => setNoVideo(true)} data-testid="hero-video">
            <source src="/media/hero.mp4" type="video/mp4" onError={() => setNoVideo(true)} />
          </video>
        )}
      </motion.div>

      <nav className="hero__side" aria-label="Sections">
        <a href="#top" onClick={go('#top')}>Home</a>
        {nav.links.map((l) => (<a key={l.href} href={l.href} onClick={go(l.href)}>{l.label}</a>))}
        <a href="#contact" onClick={go('#contact')}>Contact</a>
      </nav>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="hero__eyebrow" data-testid="hero-eyebrow">
        {hero.eyebrow}
      </motion.p>

      <h1 className="hero__title" data-testid="hero-headline">
        <span className="mask-line">
          <motion.span className="l1" initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.15, ease: EASE }}>
            {hero.headlineWhite}
          </motion.span>
        </span>
        <span className="mask-line">
          <motion.span className="l2" initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE }}>
            <a href="#services" className="hero__down" onClick={go('#services')} aria-label="Scroll to services"><ArrowDown /></a>
            <span><em>{first}</em>{rest}</span>
          </motion.span>
        </span>
      </h1>
      <motion.div className="hero__rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: EASE }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease: EASE }} className="hero__row" data-testid="hero-copy">
        <p className="hero__copy">{hero.description}</p>
        <div className="hero__ctas">
          <a href={hero.primaryCta.href} onClick={go(hero.primaryCta.href)} className="btn btn--white" data-testid="hero-cta-start-project">
            {hero.primaryCta.label} <span className="btn__ico"><ArrowUpRight size={16} /></span>
          </a>
          <a href={hero.secondaryCta.href} onClick={go(hero.secondaryCta.href)} className="btn" data-testid="hero-cta-explore-services">
            {hero.secondaryCta.label} <span className="btn__ico"><ArrowDown size={16} /></span>
          </a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="hero__foot">
        <span className="badge">
          <span className="avatars">{hero.avatars.map((a) => (<span key={a}>{a}</span>))}</span>
          Bareilly, India
        </span>
        <span className="hero__line">{hero.avatarsLine}</span>
        <span className="hero__verified">{site.location}</span>
      </motion.div>
    </section>
  );
};
