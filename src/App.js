import { useLayoutEffect, useRef, useState } from 'react';
import Contact from './components/Contact';
import DepthStage from './components/DepthStage';
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
          <div className="nav-utilities"><ThemeToggle /><a className="button small" href={Bio.resume} download>Résumé PDF</a></div>
        </div>
      </header>
      <main id="main">
        <section className="shell hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="label">Software engineer · Bengaluru</p>
            <h1 id="hero-title">Prateek<br /> Mishra<span>.</span></h1>
            <h2>Full-stack .NET &amp; React engineer</h2>
            <p className="intro">I build printer management apps and asynchronous services for HP at Ascendion. I also built PratsPilot, a platform for creating and running AI workflows.</p>
            <div className="actions"><a className="button primary" href="#experience">Explore my work</a><a className="button" href={Bio.resume} download>Download résumé</a></div>
          </div>
          <figure className="hero-portrait">
            <DepthStage className="portrait-scene">
              <div className="depth-entry portrait-entry">
                <div className="depth-rig portrait-rig">
                  <div className="portrait-mat" aria-hidden="true" />
                  <div className="portrait-depth"><img src="/HeroImage.jpg" alt="Prateek Mishra at his workstation" /></div>
                  <div className="portrait-orbit orbit-one" aria-hidden="true" />
                  <div className="portrait-orbit orbit-two" aria-hidden="true" />
                  <span className="portrait-caption">Bengaluru, India</span>
                </div>
              </div>
            </DepthStage>
            <figcaption><span>Associate Engineer at Ascendion</span><span>Open to .NET roles</span></figcaption>
          </figure>
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
