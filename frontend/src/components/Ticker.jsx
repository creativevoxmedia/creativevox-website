import { ticker } from '@/data/content';

const Row = ({ hidden = false }) => (
  <div className="marquee__row" aria-hidden={hidden}>
    {ticker.items.map((item) => (
      <span key={item} className="marquee__item">
        <span>{item}</span>
        <span className="marquee__sep" aria-hidden="true">{ticker.separator}</span>
      </span>
    ))}
  </div>
);

/** Giant blue scrolling words, like awsmd's "user focused" strip. */
export const Ticker = () => (
  <section aria-label="What we offer" className="marquee">
    <div className="marquee__track" data-testid="ticker-track">
      <Row />
      <Row hidden />
    </div>
  </section>
);
