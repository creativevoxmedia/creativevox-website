import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowUpRight, ChevronDown, Loader2, Mail, MapPin, Send, Users } from 'lucide-react';
import { contact, site } from '@/data/content';
import { scrollToSection } from '@/lib/scroll';
import { Reveal } from '@/components/Reveal';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const INFO_ICONS = { Mail, MapPin, Users };

const initialForm = { name: '', email: '', phone: '', service: '', budget: '', message: '', website: '' };

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const nameRef = useRef(null);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Please enter a valid email address.';
    if (form.phone.trim() && form.phone.replace(/\D/g, '').length < 7)
      er.phone = 'Please enter a valid phone number — or leave this empty.';
    if (form.message.trim().length < 10) er.message = 'Tell us a little more (at least 10 characters).';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the highlighted fields and try again.');
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form, { timeout: 15000 });
      toast.success(data.message || "Thanks! Your message has been sent.");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const message =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
          ? 'Please check your details and try again.'
          : `Something went wrong — please email us at ${site.email}`;
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  const focusForm = (e) => {
    e.preventDefault();
    scrollToSection('#contact-form');
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700);
  };

  const Field = ({ id, label, error, testid, children }) => (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && (<p className="err" role="alert" data-testid={testid}>{error}</p>)}
    </div>
  );

  return (
    <section id="contact" className="closing">
      <div className="wrap contact">
        {/* Copy + info */}
        <Reveal>
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2 className="contact__title">
            <span className="line">{contact.heading[0]}</span>
            <span className="line soft">{contact.heading[1]}</span>
          </h2>
          <p className="lead contact__text">{contact.text}</p>

          <div className="contact__ctas">
            <a href={contact.primaryCta.href} className="btn" data-testid="contact-email-cta">
              {contact.primaryCta.label} <span className="btn__ico"><ArrowUpRight size={16} /></span>
            </a>
            <a href={contact.secondaryCta.href} onClick={focusForm} className="btn" data-testid="contact-discuss-cta">
              {contact.secondaryCta.label} <span className="btn__ico"><ArrowUpRight size={16} /></span>
            </a>
          </div>

          <div className="infos" data-testid="contact-info-card">
            {contact.info.map((row) => {
              const Icon = INFO_ICONS[row.icon] || Mail;
              return (
                <div key={row.label} className="info">
                  <span className="info__ico"><Icon size={17} /></span>
                  <span>
                    <small>{row.label}</small>
                    {row.href ? (
                      <a href={row.href} data-testid="contact-info-email">{row.value}</a>
                    ) : (
                      <span className="v">{row.value}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Working form */}
        <Reveal delay={0.12}>
          <form id="contact-form" onSubmit={onSubmit} noValidate className="form" data-testid="contact-form">
            {/* Honeypot — hidden from humans, catches bots */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Website (leave this field empty)</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} data-testid="contact-website-honeypot" />
            </div>

            <div className="form__grid">
              <Field id="cf-name" label="Name *" error={errors.name} testid="contact-error-name">
                <input id="cf-name" ref={nameRef} type="text" className="field" placeholder="Your name" value={form.name} onChange={set('name')} data-testid="contact-name-input" />
              </Field>
              <Field id="cf-email" label="Email *" error={errors.email} testid="contact-error-email">
                <input id="cf-email" type="email" className="field" placeholder="you@company.com" value={form.email} onChange={set('email')} data-testid="contact-email-input" />
              </Field>
              <Field id="cf-phone" label="Phone" error={errors.phone} testid="contact-error-phone">
                <input id="cf-phone" type="tel" className="field" placeholder="+91 …" value={form.phone} onChange={set('phone')} data-testid="contact-phone-input" />
              </Field>
              <Field id="cf-service" label="Service">
                <div className="sel">
                  <select id="cf-service" className="field" value={form.service} onChange={set('service')} data-testid="contact-service-select">
                    <option value="">Select a service…</option>
                    {contact.serviceOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </div>
              </Field>
              <div className="span2">
                <Field id="cf-budget" label="Budget range">
                  <div className="sel">
                    <select id="cf-budget" className="field" value={form.budget} onChange={set('budget')} data-testid="contact-budget-select">
                      <option value="">Select a budget range…</option>
                      {contact.budgetOptions.map((b) => (<option key={b} value={b}>{b}</option>))}
                    </select>
                    <ChevronDown size={16} aria-hidden="true" />
                  </div>
                </Field>
              </div>
              <div className="span2">
                <Field id="cf-message" label="Message *" error={errors.message} testid="contact-error-message">
                  <textarea id="cf-message" rows={4} className="field" style={{ resize: 'none' }} placeholder="Tell us about your project, goals or the problem you want to solve…" value={form.message} onChange={set('message')} data-testid="contact-message-textarea" />
                </Field>
              </div>
            </div>

            <button type="submit" disabled={sending} className="btn btn--block" data-testid="contact-submit-button">
              {sending ? (<>Sending… <span className="btn__ico"><Loader2 size={18} className="animate-spin" /></span></>) : (<>Send Message <span className="btn__ico"><Send size={16} /></span></>)}
            </button>
            <p className="form__note">We usually respond within 24 hours — {site.audience.toLowerCase()}.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
