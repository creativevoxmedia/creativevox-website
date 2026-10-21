import { MapPin } from 'lucide-react';
import { about, site } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { StatsBar } from '@/components/StatsBar';
import { ArrowUpRight } from 'lucide-react';
import { nav } from '@/data/content';
import { scrollToSection } from '@/lib/scroll';

const DOTS = [
  { left: '78%', top: '24%' },
  { left: '50%', top: '58%' },
  { left: '36%', top: '68%' },
  { left: '64%', top: '40%' },
];

export const About = () => {
  const [q1, ...qrest] = about.quote.split(' ');
  return (
    <section id="about" className="sec" style={{ paddingTop: 'clamp(20px, 4vw, 60px)' }}>
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{about.eyebrow}</span>
          <div className="about-head">
            <h2 className="h2" style={{ color: 'var(--ink)' }}>
              <span className="line">{about.heading[0]}</span>
              <span className="line soft">{about.heading[1]}</span>
            </h2>
            <a href={nav.cta.href} className="btn" onClick={(e) => { e.preventDefault(); scrollToSection(nav.cta.href); }}>
              {nav.cta.label} <span className="btn__ico"><ArrowUpRight size={16} /></span>
            </a>
          </div>
          <div className="about-rule" />
        </Reveal>

        <div className="about-grid">
          <Reveal data-testid="about-copy">
            <figure data-testid="about-quote-card">
              <blockquote className="about__quote"><b>{q1} {qrest.slice(0, 1).join(' ')}</b> {qrest.slice(1).join(' ')}</blockquote>
              <figcaption className="about__by">{about.quoteAttribution}</figcaption>
            </figure>
            <div className="about__copy">
              {about.paragraphs.map((p) => (<p key={p.slice(0, 24)}>{p}</p>))}
            </div>
            <div className="loc">
              <span className="loc__ico"><MapPin size={15} /></span>
              <span><small>BASED IN</small><span>{site.location}</span></span>
            </div>
            <StatsBar />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="orbit" data-testid="about-pills" role="list">
              <i /><i /><i /><i />
              {about.pills.map((pill, i) => (
                <div key={pill} className="dot" role="listitem" style={DOTS[i % DOTS.length]}>
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="cells" aria-label={site.descriptor}>
          {site.descriptorWords.map((w) => (<div key={w} className="cell">{w.charAt(0) + w.slice(1).toLowerCase()}</div>))}
        </div>
      </div>
    </section>
  );
};
