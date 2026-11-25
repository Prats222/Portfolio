import { useLayoutEffect, useRef, useState } from 'react';
import Contact from './components/Contact';
import DepthStage from './components/DepthStage';
import PortraitShowcase from './components/PortraitShowcase';
import WorkScene from './components/WorkScene';
import { Bio, experiences, projects, certifications } from './data/constants';
import './App.css';

const focus = [
  { label: 'Full-stack development', metric: 'Under 1 min', context: 'Printer onboarding' },
  { label: 'Backend development', metric: '~1,500', context: 'Jobs per day at peak' },
  { label: 'Agentic AI', metric: '130+', context: 'Automated workflows' },
  { label: 'Web automation', metric: '250+', context: 'Playwright test scripts' },
];
const features = [
  ['Configure agents', 'Choose a model, attach documents as context, and connect built-in tools or your own Python scripts.'],
  ['Run workflows', 'Chain agents and tools visually, draft a flow with Autopilot, and pause it at a human approval gate.'],
  ['Compare outputs', 'Run agents head to head in the Arena and inspect scores, step outputs, logs, latency, and estimated cost.'],
];
const toolkit = [
  ['Backend', 'C#, ASP.NET Core, REST APIs, EF Core, SQL Server, JWT', 'APIs'],
  ['Frontend', 'React, TypeScript, JavaScript, Material UI, Tailwind CSS', 'UI'],
  ['Automation', 'Playwright, Selenium WebDriver, pytest, Postman', 'QA'],
  ['Delivery', 'Git, GitHub Actions, Azure DevOps, Docker, CI/CD', 'CI'],
];

function initialTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* Fall back to the system theme when storage is unavailable. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme);
  const dark = theme === 'dark';
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggle() {
    const next = dark ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch { /* The toggle still works for this visit. */ }
  }

  return (
    <button className="theme-toggle" type="button" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggle}>
      {dark ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" /></svg> :
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15A8.5 8.5 0 0 1 9 3.8 8.5 8.5 0 1 0 20.2 15Z" /></svg>}
      <span>{dark ? 'Light' : 'Dark'}</span>
    </button>
  );
}

function FeaturedProject() {
  const [active, setActive] = useState(0);
  const [project, automation] = projects;
  return (
    <section id="projects" className="shell project-section">
      <div className="project-head">
        <div><p className="label">Featured project</p><h2>PratsPilot<span>.</span></h2></div>
        <p className="award">2nd place <span>Launchpad India</span></p>
      </div>
      <div className="project-layout">
        <DepthStage className="project-stage">
          <div className="depth-entry project-entry">
            <div className="depth-rig project-rig">
              <div className="project-backplane" aria-hidden="true" />
              <a className="project-visual" href={project.webapp} aria-label="Open the PratsPilot live demo">
                <img src={project.image} alt="PratsPilot dashboard with agents, workflows, tools, and run controls" loading="lazy" />
              </a>
              <div className="project-overlay" aria-hidden="true"><span />{features[active][0]}</div>
            </div>
          </div>
        </DepthStage>
        <div className="project-info">
          <p className="label">ASP.NET Core / React</p>
          <h3>An agentic AI workflow platform.</h3>
          <div className="feature-options" role="group" aria-label="Explore PratsPilot features">
            {features.map(([title], i) => <button key={title} type="button" aria-pressed={i === active} onClick={() => setActive(i)}>{title}</button>)}
          </div>
          <p className="feature-copy" aria-live="polite">{features[active][1]}</p>
          <p className="project-proof"><strong>120+</strong> concurrent users</p>
          <div className="actions"><a className="button primary" href={project.webapp}>Live demo</a><a className="button" href={project.github}>Source code</a></div>
        </div>
      </div>
      <div className="secondary-project"><div><h3>Automation PM</h3><p>A practice platform for API and UI automation with .NET, React, and Playwright.</p></div><a href={automation.github}>Source code</a></div>
    </section>
  );
}

export default function App() {
  const journey = useRef(null);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="scroll-progress" aria-hidden="true" />
        <div className="shell nav">
          <a className="wordmark" href="#main">Prateek<span>.</span></a>
          <nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
          <div className="nav-utilities">
            <div className="nav-social" role="group" aria-label="Social profiles">
              <a href={Bio.github} aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.08c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.03-.71.08-.7.08-.7 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.29.94.1-.73.39-1.23.72-1.52-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.16a10.7 10.7 0 0 1 5.63 0c2.15-1.46 3.09-1.16 3.09-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.15 5.55.41.35.77 1.03.77 2.08v3.09c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z"/></svg><span>GitHub</span></a>
              <a href={Bio.linkedin} aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.4 8.4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.8 10h3.3v10.5H3.8Zm5.8 0h3.2v1.4h.1a3.5 3.5 0 0 1 3.1-1.7c3.3 0 3.9 2.2 3.9 5v5.8h-3.3v-5.1c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.7v5.1H9.6Z"/></svg><span>LinkedIn</span></a>
            </div>
            <ThemeToggle /><a className="button small" href={Bio.resume} download>Résumé PDF</a>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero-band" aria-labelledby="hero-title">
          <div className="shell hero">
          <div className="hero-copy">
            <p className="hero-availability"><span aria-hidden="true" /> Open to full-stack .NET roles</p>
            <p className="hero-greeting">Hey, I’m</p>
            <h1 id="hero-title">Prateek<br /> Mishra<span>.</span></h1>
            <h2>Full-stack <em>.NET &amp; React</em> engineer</h2>
            <p className="intro">I build printer management apps and asynchronous services for HP at Ascendion. I also built PratsPilot, a platform for creating and running AI workflows.</p>
            <ul className="hero-stack" aria-label="Core technologies">
              {['C#', 'ASP.NET Core', 'React', 'TypeScript', 'Agentic AI'].map(item => <li key={item}>{item}</li>)}
            </ul>
            <div className="actions"><a className="button primary" href="#experience">Explore my work</a><a className="button" href="#contact">Let’s talk</a></div>
          </div>
          <PortraitShowcase />
          </div>
        </section>
        <section className="work-band" id="experience">
          <div className="shell work-heading">
            <p className="label">Ascendion · Client: HP</p>
            <h2>Behind the work<span>.</span></h2>
            <p>Full-stack development, background services, agentic AI, and web automation. <span>July 2025–present.</span></p>
          </div>
          <div className="shell journey" ref={journey}>
            <WorkScene journey={journey} />
            <div className="work-chapters">
              {experiences[0].tracks.map(({ name, detail }, i) => (
                <article className="work-chapter" key={name} data-chapter>
                  <p className="label">{focus[i].label}</p>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                  <div className="work-proof"><strong>{focus[i].metric}</strong><span>{focus[i].context}</span></div>
                </article>
              ))}
            </div>
          </div>
          <details className="shell earlier"><summary>Earlier experience</summary><ul>{experiences.slice(1).map(({ id, company, role, date }) => <li key={id}><strong>{company}</strong> · {role} · {date}</li>)}</ul></details>
        </section>
        <FeaturedProject />
        <section id="skills" className="skills-band">
          <div className="shell skills-layout">
            <div><p className="label">Skills</p><h2>My toolkit<span>.</span></h2></div>
            <DepthStage className="toolkit-stage">
              <div className="depth-entry toolkit-entry">
                <div className="depth-rig toolkit-rig">
                  <dl className="toolkit-grid">{toolkit.map(([title, tools, mark]) => (
                    <div className="tool-tile" key={title}>
                      <dt><span className="tool-mark" aria-hidden="true">{mark}</span>{title}</dt><dd>{tools}</dd>
                    </div>
                  ))}</dl>
                </div>
              </div>
            </DepthStage>
            <div className="credentials">
              <div><h3>Education</h3><p>B.Tech in Information Technology, VIT Vellore · 2025 · 8.53/10</p></div>
              <div><h3>Recognition</h3><p>Rising Star Award · Pillar of Strength · Exceeds Expectations</p></div>
              <details><summary>Certifications</summary><ul>{certifications.map(item => <li key={item}>{item}</li>)}</ul></details>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <footer className="shell footer"><span>Prateek Mishra · Bengaluru</span><div><a href={Bio.github}>GitHub</a><a href={Bio.linkedin}>LinkedIn</a><a href={Bio.resume} download>Résumé</a></div></footer>
    </>
  );
}
