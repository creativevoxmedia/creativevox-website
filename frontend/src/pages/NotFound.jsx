import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="eyebrow">404 — PAGE NOT FOUND</p>
      <h1 className="h2">
        This page blended in <span style={{color:"var(--gray)"}}>too well</span>.
      </h1>
      <p className="body-copy">
        The page you're looking for doesn't exist — but your next digital move does.
      </p>
      <Link to="/" className="btn btn--dark" data-testid="notfound-home-link">
        Back to Home <span className="btn__ico"><ArrowLeft size={16} /></span>
      </Link>
    </main>
  );
}
