import { process } from '@/data/content';
import { Reveal } from '@/components/Reveal';

/** awsmd "Numbers don't lie" — cream arched block with the four steps. */
export const Process = () => (
  <section id="approach" className="arch">
    <Reveal>
      <span className="eyebrow">{process.eyebrow}</span>
      <h2 className="arch__title">
        {process.heading[0]} <span className="slate">{process.heading[1]}</span>
      </h2>
      <p className="arch__sub">Four steps, in order — from the first conversation to the final delivery.</p>
    </Reveal>

    <ol className="steps" data-testid="process-timeline">
      {process.steps.map((step, i) => (
        <Reveal key={step.step} delay={i * 0.08} y={20}>
          <li className="step" style={{ height: '100%' }}>
            <p className="step__k">{step.step}</p>
            <div>
              <h3 className="step__t">{step.title}</h3>
              <p className="step__d">{step.description}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  </section>
);
