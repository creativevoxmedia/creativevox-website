import { ArrowUpRight } from 'lucide-react';
import { bring, nav, site } from '../data/content';
import { scrollToSection } from '../lib/scroll';
import { Reveal } from './Reveal';

/** awsmd "{SMART} DEVELOPMENT"-style black block with phone-shaped cards. */
export const Bring = () => (
  <section className="dark" aria-label="What we bring" id="bring">
    <span className="dark__stars" aria-hidden="true">**</span>
    <span className="dark__ghost" aria-hidden="true">{site.tagline}</span>
    <Reveal>
      <p className="eyebrow" style={{ color: '#9a9a9f', marginBottom: 14 }}>{bring.eyebrow}</p>
      <h2 className="dark__title">
        <span className="line">{'{'}{bring.heading[0].replace(/\.$/, '')}{'}'}</span>
        <span className="line gray">{bring.heading[1]}</span>
      </h2>
    </Reveal>

    <div className="phones" data-testid="bring-garid">
      {bring.items.map((item, i) => (
        <Reveal key={item.number} delay={i * 0.1}>
          <article
            className="phone"
            style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            data-testid={`bring-card-${item.number}`}
          >
            <p className="phone__n">{item.number}</p>

            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                style={{
                  flex: 1,
                  minHeight: 0,
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 16,
                  margin: '14px 0',
                  display: 'block',
                }}
              />
            )}

            <div>
              <h3 className="phone__t">{item.title}</h3>
              <p className="phone__d">{item.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <div className="dark__foot">
      <p>{bring.sub}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a href="#work" className="btn" onClick={(e) => { e.preventDefault(); scrollToSection('#work'); }}>Our Work <span className="btn__ico"><ArrowUpRight size={16} /></span></a>
        <a href={nav.cta.href} className="btn btn--ghost" onClick={(e) => { e.preventDefault(); scrollToSection(nav.cta.href); }}>{nav.cta.label}</a>
      </div>
    </div>
  </section>
);