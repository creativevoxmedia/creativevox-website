import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { services, site } from '../data/content';
import { serviceDetails } from '../data/workspace';
import { Modal } from './ui/Modal';
import { scrollToSection } from '../lib/scroll';
import { Reveal } from './Reveal';

const TAGS = [['React','Node.js','WordPress'],['Figma','UI/UX','Prototyping'],['Strategy','Planning','Campaigns'],['Photoshop','Illustrator','Canva'],['Premiere Pro','After Effects','CapCut'],['Copywriting','Ideas','Scripts']];
const MOCKUP_CHIPS = ['Responsive', 'User-friendly', 'On-brand'];

export const Services = () => {
  const featured = services.featured;
  const [active, setActive] = useState(null); // index of the opened service card
  const activeItem = active === null ? null : services.items[active];
  const detail = activeItem ? serviceDetails[activeItem.title] : null;

  return (
    <section id="services" className="sec">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{services.eyebrow}</span>
          <p className="lead-big" style={{ marginTop: 18 }}>
            <b>{services.heading.join(' ')}</b> {services.sub}
          </p>
        </Reveal>

        <div className="svc-grid" data-testid="services-grid">
          {services.items.map((service, i) => (
            <Reveal key={service.number} delay={(i % 3) * 0.1}>
              <article
                className="svc svc--img"
                style={{ height: '100%', '--svc-img': `url("${serviceDetails[service.title]?.image}")` }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`View details for ${service.title}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i); } }}
                data-testid={`service-card-${service.number}`}
              >
                <div className="svc__top">
                  <h3 className="svc__title">{service.title}</h3>
                  <span className="svc__no">{service.number} / {service.category}</span>
                </div>
                <div>
                  <p className="svc__desc">{service.description}</p>
                  <div className="svc__rule" />
                  <ul className="tags">
                    {TAGS[i].map((t) => (<li key={t} className="tag">{t}</li>))}
                  </ul>
                  <span className="svc__more">View details <ArrowUpRight size={14} /></span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="feature" data-testid="featured-service">
            <div>
              <span className="eyebrow">{featured.eyebrow}</span>
              <h3 className="feature__title">{featured.title}</h3>
              <p className="feature__text">{featured.description}</p>
              <ul className="checks">
                {featured.checklist.map((item) => (
                  <li key={item}><span><Check size={13} strokeWidth={3} /></span>{item}</li>
                ))}
              </ul>
              <button type="button" data-testid="featured-learn-more" onClick={() => scrollToSection(featured.cta.href)} className="btn btn--dark">
                {featured.cta.label} <span className="btn__ico"><ArrowUpRight size={16} /></span>
              </button>
            </div>

            <div className="mock" data-testid="featured-mockup">
              <div className="mock__win">
                <div className="mock__bar"><i /><i /><i /><span className="mock__url">{featured.mockupUrl}</span></div>
                <div className="mock__body">
                  <div className="mock__hero">MAKE IT<br />MATTER.</div>
                  <div className="mock__grid">{[0, 1, 2].map((n) => (<div key={n} className="mock__cell"><i /><i /><i /></div>))}</div>
                  <div className="mock__row"><i /><b /></div>
                </div>
              </div>
              {MOCKUP_CHIPS.map((chip) => (<span key={chip} className="chip">{chip}</span>))}
            </div>
          </div>
        </Reveal>
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        kicker="CreativeVox Media / Service details"
        title={activeItem ? activeItem.title : ''}
        image={detail?.image}
      >
        {detail && (
          <>
            <p className="mdialog__lead">{detail.intro}</p>
            <h3>What we can do for you</h3>
            <ul className="mlist">
              {detail.deliverables.map((d) => (<li key={d}>{d}</li>))}
            </ul>
            <h3>How we work</h3>
            <p className="mdialog__text">{detail.process}</p>
            <h3>What we need from you</h3>
            <p className="mdialog__text">{detail.inputs}</p>
            <div className="mdialog__actions">
              <a
                className="btn btn--dark"
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Service enquiry: ${activeItem.title}`)}&body=${encodeURIComponent(`Hello CreativeVox Media,\n\nI would like to discuss your ${activeItem.title} service.\n\nBusiness / name:\nGoals:\nTimeline:\n\nPlease share the next steps.`)}`}
              >
                Discuss this service <span className="btn__ico"><ArrowUpRight size={16} /></span>
              </a>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};