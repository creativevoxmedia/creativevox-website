import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { nav } from '@/data/content';
import { scrollToSection } from '@/lib/scroll';
import { Logo } from '@/components/Logo';

const SECTION_IDS = nav.links.map((l) => l.href.replace('#', ''));

/** Floating nav: logo left, white pill with links in the centre, soft CTA + round menu button right. */
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(SECTION_IDS.includes(entry.target.id) ? entry.target.id : '');
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    const timer = setTimeout(() => {
      ['top', ...SECTION_IDS].forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 400);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    setTimeout(() => scrollToSection(href), open ? 80 : 0);
  };

  return (
    <header className="nav" data-testid="navbar">
      <div className="nav__in">
        <Logo />

        <nav className="nav__pill" aria-label="Primary">
          {nav.links.map((link) => {
            const id = link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${id}`}
                onClick={(e) => { e.preventDefault(); go(link.href); }}
                className={`nav__link${active === id ? ' is-active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="nav__right">
          <a href={nav.cta.href} data-testid="nav-cta" onClick={(e) => { e.preventDefault(); go(nav.cta.href); }} className="btn btn--sm nav__cta">
            {nav.cta.label} <span className="btn__ico"><ArrowUpRight size={15} /></span>
          </a>
          <button type="button" data-testid="nav-mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
            onClick={() => setOpen((v) => !v)} className={`nav__burger${open ? ' is-open' : ''}`}>
            <i /><i />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="menu" data-testid="nav-mobile-menu" style={{ pointerEvents: 'auto' }}>
            <nav className="menu__list" aria-label="Mobile">
              {nav.links.map((link, i) => (
                <a key={link.href} href={link.href} data-testid={`nav-mobile-link-${link.href.replace('#', '')}`}
                  onClick={(e) => { e.preventDefault(); go(link.href); }} className="menu__link">
                  {link.label}<span>0{i + 1}</span>
                </a>
              ))}
            </nav>
            <a href={nav.cta.href} data-testid="nav-mobile-cta" onClick={(e) => { e.preventDefault(); go(nav.cta.href); }} className="btn btn--dark btn--block">
              {nav.cta.label} <span className="btn__ico"><ArrowUpRight size={18} /></span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
