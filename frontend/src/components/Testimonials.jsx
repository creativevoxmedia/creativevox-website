import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { testimonials } from '@/data/content';
import { testimonialItems } from '@/data/testimonials';
import { Reveal } from '@/components/Reveal';

/** awsmd-style single big quote with prev / next arrows. */
export const Testimonials = () => {
  const [i, setI] = useState(0);
  const n = testimonialItems.length;
  const step = (d) => setI((v) => (v + d + n) % n);

  return (
    <section className="sec" aria-label="Testimonials">
      <div className="wrap quote-grid">
        <Reveal className="quote-l">
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <p className="lead">{testimonials.sub}</p>
          <div className="q-badges" aria-hidden="true">
            <span className="q-badge">TOP<br />CLUTCH</span>
            <span className="q-badge">TOP<br />DESIGN</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} data-testid="testimonials-grid">
          <div className="q-wrap" data-testid="testimonials-grid">
            <span className="q-mark" aria-hidden="true">”</span>
            <div>
              {testimonialItems.map((t, idx) => (
                <figure key={t.id} hidden={idx !== i} data-testid={`testimonial-card-${t.id}`}>
                  <div className="stars" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, s) => (<Star key={s} size={15} aria-hidden="true" />))}
                  </div>
                  <blockquote className="q-text">{t.quote}</blockquote>
                  {t.placeholder && (<span className="badge-ph" data-testid={`testimonial-placeholder-badge-${t.id}`}>Placeholder</span>)}
                  <figcaption className="q-by">
                    <span className="q-av">{t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                    <span><b>{t.name}</b><span>{t.role}</span></span>
                    <span className="q-nav">
                      <button type="button" aria-label="Previous review" onClick={() => step(-1)}><ArrowLeft size={22} /></button>
                      <button type="button" aria-label="Next review" onClick={() => step(1)}><ArrowRight size={22} /></button>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
