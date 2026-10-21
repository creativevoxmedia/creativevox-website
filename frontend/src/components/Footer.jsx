import { ArrowUp, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import { footer, site } from '@/data/content';
import { scrollToSection, scrollToTop } from '@/lib/scroll';
import { Logo } from '@/components/Logo';

const SOCIAL_ICONS = { Instagram, Linkedin, Twitter, Mail };

export const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>{site.audience}</p>
        </div>

        <div>
          <p className="footer__h">Menu</p>
          <nav className="footer__links" aria-label="Footer">
            {footer.links.map((link) => (
              <a key={link.label} href={link.href} data-testid={`footer-link-${link.label.toLowerCase()}`}
                onClick={link.href.startsWith('#') ? (e) => { e.preventDefault(); scrollToSection(link.href); } : undefined}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="footer__h">Follow</p>
          <div className="socials">
            {footer.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon] || Mail;
              const testid = `footer-social-${social.label.toLowerCase().replace(/[^a-z]/g, '')}`;
              return social.url ? (
                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label} data-testid={testid} className="social"><Icon size={17} /></a>
              ) : (
                <span key={social.label} aria-label={`${social.label} — link coming soon`} title={`${social.label} — add your link in src/data/content.js`} data-testid={testid} className="social"><Icon size={17} /></span>
              );
            })}
          </div>
        </div>
      </div>

      <p aria-hidden="true" data-testid="footer-big-line" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{footer.bigLine}</p>

      <div className="footer__bar">
        <p data-testid="footer-copyright">{footer.copyright}</p>
        <p>{site.location}</p>
        <a href="#top" className="to-top" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
          Back to the top <ArrowUp size={15} />
        </a>
      </div>
    </div>
  </footer>
);
