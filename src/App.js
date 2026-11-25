import { useRef, useState } from 'react';
import './App.css';

const email = 'prateekjobid@gmail.com';
const linkedin = 'https://www.linkedin.com/in/prateek-mishra-686945243/';
const github = 'https://github.com/Prats222';
const resume = '/Prateek_Mishra_Resume.pdf';

const work = [
  {
    name: 'LTO Hub',
    type: 'Full-stack development',
    description: 'An internal printer fleet dashboard for multiple companies. I built the React list and add/edit forms, and implemented tenant-scoped ASP.NET Core APIs with EF Core and SQL Server.',
    detail: 'Added search, pagination, and role-based access. Fixed 14 reported defects in one release cycle and added unit tests for paging and filtering.',
    result: 'Printer onboarding in under 1 minute',
  },
  {
    name: 'PrintAI',
    type: 'Backend development',
    description: 'A prompt-to-print application. I implemented submission validation, duplicate prevention, user quotas, and a background worker that processed image-generation requests and tracked job state.',
    detail: 'The pipeline handled about 1,500 jobs a day at peak. Replaced polling with server-sent events and reduced average failed-job recovery to under 30 minutes through triage and retry procedures.',
    result: 'About 85% fewer status requests',
  },
  {
    name: 'HPX QAMA',
    type: 'Agentic AI and automation',
    description: 'Led a seven-person team and developed AI agents and workflows. Built an orchestrator that turned TestRail cases into scripts, page objects, and workflow templates for GitHub.',
    detail: 'Developed 120+ agents and 130+ workflows with 100+ context configurations. Automated printer workflows across 53+ Android modules and 50+ Windows and iOS modules combined.',
    result: '130+ workflows',
  },
  {
    name: 'PrintOS',
    type: 'Web automation',
    description: 'Wrote Playwright tests in TypeScript to validate printer management workflows in the PrintOS web application.',
    result: '250+ Playwright scripts',
  },
];

function Contact() {
  const form = useRef(null);
  const inFlight = useRef(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [draftLink, setDraftLink] = useState('');

  async function send(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const values = Object.fromEntries(new FormData(form.current));
    const subject = values.subject.trim() || 'Portfolio inquiry';
    const body = values.message + '\n\n' + values.name + '\n' + values.email;
    setDraftLink('mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body));
    inFlight.current = true;
    setStatus({ state: 'sending', message: 'Sending your message…' });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.accepted !== true) {
        throw new Error(result?.message || 'The contact service could not confirm delivery.');
      }
      form.current.reset();
      setDraftLink('');
      setStatus({ state: 'success', message: result.message });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error.name === 'AbortError' ? 'The request timed out.' : error.message,
      });
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  return (
    <section className="shell contact section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let's talk about your next project.</h2>
        <p>I'm open to full-stack .NET and React roles and backend .NET opportunities.</p>
        <a className="contact-email" href={'mailto:' + email}>{email}</a>
        <a className="text-link" href={linkedin}>Connect on LinkedIn</a>
      </div>
      <form ref={form} onSubmit={send} aria-busy={status.state === 'sending'}>
        <div className="form-row">
          <label>Name<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
          <label>Email<input name="email" autoComplete="email" type="email" required maxLength={254} /></label>
        </div>
        <label>Subject<input name="subject" maxLength={140} /></label>
        <label>Message<textarea name="message" rows={4} required minLength={10} maxLength={4000} /></label>
        <input className="trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="button primary" disabled={status.state === 'sending'}>Send message</button>
        <p className={'feedback ' + status.state} role="status">
          {status.message}
          {status.state === 'error' && <> <a href={draftLink}>Open this draft in your email app</a>.</>}
        </p>
      </form>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell nav">
          <a className="wordmark" href="#main"><span aria-hidden="true">PM</span> Prateek Mishra</a>
          <nav aria-label="Main navigation">
            <a href="#experience">Experience</a>
            <a href="#project">Project</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button compact" href={resume} download>Résumé <span className="pdf-label">PDF</span></a>
        </div>
      </header>
      <main id="main">
        <section className="shell hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">Software engineer · Bengaluru, India</p>
            <h1 id="hero-title">Full-stack engineer<br /><em>.NET + React</em></h1>
            <p className="intro">I'm Prateek Mishra. At Ascendion, I build ASP.NET Core APIs and React applications for HP, from printer fleet dashboards to asynchronous image generation.</p>
            <div className="actions">
              <a className="button primary" href="#experience">See my experience</a>
              <a className="button" href="#project">Explore PratsPilot</a>
            </div>
          </div>
          <figure className="portrait">
            <img src="/HeroImage.jpg" alt="Prateek Mishra" fetchPriority="high" />
            <figcaption><strong>Prateek Mishra</strong><span>Associate Engineer at Ascendion</span></figcaption>
          </figure>
        </section>

        <section className="shell section" id="experience">
          <div className="section-head">
            <div><p className="eyebrow">Experience</p><h2>Engineering work for HP</h2></div>
            <p className="meta">Ascendion · July 2025–present</p>
          </div>
          <div className="work-grid">
            {work.map((item) => (
              <article className="work-card" key={item.name}>
                <p className="eyebrow">{item.type}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.detail && <p>{item.detail}</p>}
                <p className="result">{item.result}</p>
              </article>
            ))}
          </div>
          <details className="prior">
            <summary>Earlier experience</summary>
            <ul>
              <li><strong>Cognizant · Programmer Analyst Intern</strong> · April–July 2025. Java, Selenium, and enterprise application testing.</li>
              <li><strong>GreenDumbells · Web Development Intern</strong> · October 2023. Contributed to the e-commerce website.</li>
              <li><strong>Bharat Electronics Limited · SDE Intern</strong> · September 2023. Contributed to the interface for a web GIS application.</li>
              <li><strong>L&amp;T Finance · SDE Intern</strong> · August 2023. Worked on helpdesk frontend and API integrations.</li>
            </ul>
          </details>
        </section>

        <section className="shell section" id="project">
          <div className="section-head"><div><p className="eyebrow">Personal project</p><h2>PratsPilot</h2></div><p className="meta">2nd place · Launchpad India</p></div>
          <article className="project">
            <div className="project-copy">
              <h3>Build and run AI workflows</h3>
              <p>I built PratsPilot with ASP.NET Core and React. Users can configure agents with their own models and documents, then connect agents and Python tools in a visual workflow editor.</p>
              <ul>
                <li>Draft workflows from a plain-language goal with Autopilot.</li>
                <li>Pause runs for human approval and inspect outputs, logs, and estimated cost.</li>
                <li>Compare agent responses on the same task in the Arena.</li>
              </ul>
              <p className="result">Reached 120+ concurrent users</p>
              <div className="actions">
                <a className="button primary" href="https://pratspilot.vercel.app">Live demo</a>
                <a className="button" href={github + '/Agentic_AI_Platform'}>Source code</a>
              </div>
            </div>
            <a className="project-shot" href="https://pratspilot.vercel.app" aria-label="Open the PratsPilot live demo">
              <img src="/pratspilot-dashboard.png" loading="lazy" alt="PratsPilot dashboard showing its agentic AI workspace" />
            </a>
          </article>
          <div className="secondary-project">
            <div><h3>Automation PM</h3><p>A practice platform for API and UI automation with ASP.NET Core, React, Playwright, and CI/CD.</p></div>
            <a className="text-link" href="https://github.com/Prats222/playwright-framework-dotnet-react">View source</a>
          </div>
        </section>

        <section className="shell section stack" aria-labelledby="stack-title">
          <div><p className="eyebrow">Skills</p><h2 id="stack-title">My toolkit</h2></div>
          <dl>
            <div><dt>Backend</dt><dd>C#, ASP.NET Core, REST APIs, EF Core, SQL Server, JWT</dd></div>
            <div><dt>Frontend</dt><dd>React, TypeScript, JavaScript, Material UI, Tailwind CSS</dd></div>
            <div><dt>Automation</dt><dd>Playwright, Selenium, pytest, Postman</dd></div>
            <div><dt>Delivery</dt><dd>Git, GitHub Actions, Azure DevOps, Docker, CI/CD</dd></div>
          </dl>
        </section>

        <section className="shell section credentials" aria-label="Education and recognition">
          <div><p className="eyebrow">Education</p><h3>Vellore Institute of Technology</h3><p>B.Tech, Information Technology · 2025 · CGPA 8.53/10</p></div>
          <div><p className="eyebrow">Recognition</p><h3>Rising Star Award</h3><p>Ascendion · October 2026</p><p>Pillar of Strength badge · Exceeds Expectations manager rating</p></div>
          <details className="coursework">
            <summary>Certifications</summary>
            <ul>
              <li>Ultimate ASP.NET Core Web API Development Guide · Udemy</li>
              <li>Playwright: Web Automation Testing From Zero to Hero · Udemy</li>
              <li>The Complete Full-Stack Web Development Bootcamp · Udemy</li>
            </ul>
          </details>
        </section>
        <Contact />
      </main>
      <footer className="shell footer">
        <span>Prateek Mishra · Bengaluru</span>
        <div><a href={github}>GitHub</a><a href={linkedin}>LinkedIn</a><a href={resume} download>Résumé</a></div>
      </footer>
    </>
  );
}
