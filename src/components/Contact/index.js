import { useRef, useState } from 'react';
import { Bio } from '../../data/constants';

export default function Contact() {
  const sending = useRef(false);
  const [status, setStatus] = useState({ state: 'idle', text: '' });
  const [draft, setDraft] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const subject = data.subject.trim() || 'Portfolio inquiry';
    const body = [data.message, '', data.name, data.email].join('\n');
    setDraft(Bio.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body));
    sending.current = true;
    setStatus({ state: 'sending', text: 'Sending your message…' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        signal: AbortSignal.timeout(15000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.accepted !== true) {
        throw new Error(result?.message || 'The form could not confirm your message.');
      }
      form.reset();
      setDraft('');
      setStatus({ state: 'success', text: result.message });
    } catch (error) {
      setStatus({ state: 'error', text: error.name === 'TimeoutError' ? 'The form timed out.' : error.message });
    } finally {
      sending.current = false;
    }
  }

  return (
    <section className="section shell contact" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>Let's talk.</h2>
        <p>I'm open to full-stack .NET and React roles and backend .NET opportunities.</p>
        <a href={Bio.email}>{Bio.email.slice('mailto:'.length)}</a>
        <a href={Bio.linkedin}>Connect on LinkedIn</a>
      </div>
      <form className="contact-form" onSubmit={submit} aria-busy={status.state === 'sending'}>
        <div className="contact-fields">
          <label>Name<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
          <label>Email<input name="email" autoComplete="email" type="email" required maxLength={254} /></label>
        </div>
        <label>Subject<input name="subject" maxLength={140} /></label>
        <label>Message<textarea name="message" rows={4} required minLength={10} maxLength={4000} /></label>
        <input className="trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="button primary" disabled={status.state === 'sending'}>Send message</button>
        <p role="status" className={'feedback ' + status.state}>
          {status.text}
          {status.state === 'error' && <> <a href={draft}>Open your message in your email app</a>.</>}
        </p>
      </form>
    </section>
  );
}
