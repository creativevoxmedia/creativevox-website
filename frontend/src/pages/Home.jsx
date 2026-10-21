import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Work } from '@/components/Work';
import { Bring } from '@/components/Bring';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <main data-testid="home-page">
        <Hero />
        <Ticker />
        <Services />
        <About />
        <Work />
        <Bring />
        <Process />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
