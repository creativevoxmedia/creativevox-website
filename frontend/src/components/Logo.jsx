import { scrollToSection } from '../lib/scroll';

/** Brand logo: CM monogram image + name + descriptor. */
export const Logo = ({ compact = false, testid = 'logo' }) => (
  <a
    href="#top"
    data-testid={testid}
    onClick={(e) => { e.preventDefault(); scrollToSection('#top'); }}
    className="logo"
    aria-label="CreativeVox Media — back to top"
    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
  >
    <img
      src="/logo-mark.png"
      alt="CreativeVox Media logo"
      style={{
  height: compact ? 64 : 80,
  width: 'auto',
  display: 'block',
  flexShrink: 0,
  margin: '-10px 0 -10px -6px',
}}
    />

    {!compact && (
      <span className="logo__txt">
        <span className="logo__name">CreativeVox Media</span>
        <span className="logo__sub">DIGITAL · CREATIVE · RESULTS</span>
      </span>
    )}
  </a>
);

export default Logo;