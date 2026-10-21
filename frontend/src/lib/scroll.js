import Lenis from 'lenis';

let lenis = null;

export function initLenis() {
  if (lenis) return lenis;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return null;
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function scrollToSection(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -96, duration: 1.25 });
  } else {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
}

export function getLenis() {
  return lenis;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1 });
  else window.scrollTo({ top: 0 });
}
