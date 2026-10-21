import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { work } from '../data/content';
import { videos, driveEmbed, driveOpen } from '../data/workspace';
import portfolio from '../data/portfolio.json';
import { Reveal, SectionHeader } from './Reveal';
import { Modal } from './ui/Modal';

export const Work = () => {
  const [category, setCategory] = useState(null); // 'ai' | 'real' | null
  const group = category ? videos[category] : null;

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <SectionHeader eyebrow={work.eyebrow} headingLines={work.heading} sub={work.sub} />

        <div className="work-grid" data-testid="work-grid">
          {portfolio.capabilities.map((cap, i) => {
            const isVideo = cap.category === 'SHORT-FORM VIDEO';
            return (
              <Reveal key={cap.category} delay={(i % 2) * 0.1} className={`wc-cell wc-${i}`}>
                <article className="wc" style={{ height: '100%' }} data-testid={`work-card-${i}`}>
                  <span aria-hidden="true" className="wc__ghost">CV</span>
                  <div className="wc__top"><span className="wc__cat">{cap.category}</span></div>
                  <div>
                    <p className="wc__desc">{cap.description}</p>

                    {isVideo && (
                      <div className="wc__links">
                        {Object.entries(videos).map(([key, g]) => (
                          <button key={key} type="button" className="wc__link" onClick={() => setCategory(key)} data-testid={`video-open-${key}`}>
                            {g.title} <ArrowUpRight size={14} />
                          </button>
                        ))}
                      </div>
                    )}

                    {cap.links && cap.links.length > 0 && (
                      <div className="wc__links">
                        {cap.links.map((l) => (
                          <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="wc__link">
                            {l.label} <ArrowUpRight size={14} />
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="wc__bar">
                      <h3>{cap.title}<small>{cap.tag}</small></h3>
                      <span className="arrow-circle"><ArrowUpRight size={18} /></span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {portfolio.projects.length > 0 && (
          <div>
            <Reveal><p className="eyebrow selected-label">SELECTED PROJECTS</p></Reveal>
            <div className="projects" data-testid="projects-grid">
              {portfolio.projects.map((project, i) => (
                <Reveal key={project.title} delay={(i % 3) * 0.1}>
                  <article className="project">
                    {project.image ? (
                      <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="project__img" />
                    ) : (
                      <div className="project__ph">{project.title.charAt(0)}</div>
                    )}
                    <div className="project__body">
                      <p className="eyebrow">{project.tag}</p>
                      <h3>{project.title}</h3>
                      {project.description && <p>{project.description}</p>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video pop-up: iframes only exist while it is open, so closing stops playback */}
      <Modal open={!!category} onClose={() => setCategory(null)} kicker="Our Work / Video Editing" title={group ? group.title : ''}>
        {group && (
          <>
            <p className="mdialog__lead">{group.intro}</p>
            <div className="vgrid">
              {group.items.map((v) => (
                <article key={v.id}>
                  <h3>{v.title}</h3>
                  <div className="vframe">
                    <iframe
                      title={v.title}
                      src={driveEmbed(v.id)}
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <a className="vlink" href={driveOpen(v.id)} target="_blank" rel="noopener noreferrer">
                    Not playing? Open in Google Drive <ArrowUpRight size={13} />
                  </a>
                </article>
              ))}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};