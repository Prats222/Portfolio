import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import Contact from './components/Contact';
import HeroBgAnimation from './components/HeroBgAnimation';
import portrait from './images/HeroImage2.jpg';
import { Bio, experiences, projects, certifications } from './data/constants';
import './App.css';

const trackLabels = ['Full-stack development', 'Backend development', 'Agentic AI', 'Web automation'];
const skillGroups = [
  ['Backend', 'C#, ASP.NET Core, REST APIs, EF Core, SQL Server, JWT'],
  ['Frontend', 'React, TypeScript, JavaScript, Material UI, Tailwind CSS'],
  ['Automation', 'Playwright, Selenium WebDriver, pytest, Postman'],
  ['Delivery', 'Git, GitHub Actions, Azure DevOps, Docker, CI/CD'],
];

function AnimatedRole() {
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = (event) => setReduceMotion(event.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return (
    <div className="animated-role">
      <span className="sr-only">Full-stack .NET and React engineer</span>
      <span aria-hidden="true">{reduceMotion ? '.NET & React engineer' : (
        <Typewriter options={{ strings: ['.NET & React engineer', 'Backend developer', 'Agentic AI builder'], autoStart: true, loop: true, delay: 54, deleteSpeed: 25 }} />
      )}</span>
    </div>
  );
}

export default function App() {
  const current = experiences[0];
  const [pratsPilot, automation] = projects;
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell nav">
          <a className="wordmark" href="#main" aria-label="Prateek Mishra home"><span>PM</span> Prateek Mishra</a>
          <nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
          <a className="button small" href={Bio.resume} download>Résumé PDF</a>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid shell">
            <div className="hero-copy">
              <p className="kicker"><span className="available-dot" /> Open to full-stack and backend roles</p>
              <h1 id="hero-title">Prateek<br className="desktop-break" /> Mishra<span>.</span></h1>
              <AnimatedRole />
              <p className="intro">{Bio.description}</p>
              <div className="actions">
                <a className="button primary" href="#experience">Explore my work</a>
                <a className="button" href={Bio.resume} download>Download résumé</a>
              </div>
              <p className="hero-meta">Bengaluru, India <span aria-hidden="true">·</span> Associate Engineer at Ascendion</p>
            </div>
            <figure className="portrait-stage">
              <div className="hero-motion" aria-hidden="true"><HeroBgAnimation /></div>
              <div className="portrait-orbit">
                <div className="portrait-frame"><img src={portrait} alt="Prateek Mishra at his workstation" /></div>
              </div>
              <figcaption><span>C# / ASP.NET Core</span><span>React / TypeScript</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="section shell" id="experience">
          <div className="section-heading">
            <div><p className="eyebrow">Professional experience</p><h2>Building for HP.</h2></div>
            <p className="section-sub">Ascendion <span aria-hidden="true">·</span> July 2025–present</p>
          </div>
          <div className="experience-grid">
            <aside className="experience-lead">
              <h3>Associate Engineer</h3>
              <p>Full-stack product development, agentic AI, and cross-platform automation for HP.</p>
              <a href={Bio.resume} download>See résumé</a>
            </aside>
            <div className="track-list">
              {current.tracks.map(({ name, detail }, i) => (
                <details key={name} open={i === 0 ? true : undefined}>
                  <summary><span><strong>{name}</strong><small>{trackLabels[i]}</small></span><span className="toggle-mark" aria-hidden="true" /></summary>
                  <p>{detail}</p>
                </details>
              ))}
            </div>
          </div>
          <details className="earlier"><summary>Earlier experience</summary><ul>{experiences.slice(1).map(({ id, company, role, date }) => <li key={id}><strong>{company}</strong> · {role} · {date}</li>)}</ul></details>
        </section>

        <section className="section shell" id="projects">
          <div className="section-heading"><div><p className="eyebrow">Featured project</p><h2>PratsPilot.</h2></div><p className="section-sub">2nd place at Launchpad India</p></div>
          <div className="project-panel">
            <a className="project-image" href={pratsPilot.webapp} aria-label="Open the PratsPilot demo">
              <img src={pratsPilot.image} alt="PratsPilot's agent and workflow dashboard" loading="lazy" />
            </a>
            <div className="project-description">
              <div>
                <h3>An agentic AI workflow platform</h3>
                <p>Build agents with document context and custom Python tools. Assemble workflows visually or draft them with Autopilot, pause for human approval, and compare agents head to head in the Arena.</p>
                <div className="actions"><a className="button primary" href={pratsPilot.webapp}>Live demo</a><a className="button" href={pratsPilot.github}>Source code</a></div>
              </div>
              <div className="project-metric"><strong>120+</strong><span>concurrent users</span></div>
            </div>
          </div>
          <div className="secondary-project"><div><h3>Automation PM</h3><p>ASP.NET Core, React, and Playwright platform for practicing API and UI automation.</p></div><a href={automation.github}>Source code</a></div>
        </section>

        <section className="section shell" id="skills">
          <div className="section-heading"><div><p className="eyebrow">Technical skills</p><h2>What I work with.</h2></div></div>
          <dl className="skill-grid">{skillGroups.map(([name, values]) => <div key={name}><dt>{name}</dt><dd>{values}</dd></div>)}</dl>
          <div className="credentials">
            <div><h3>Education</h3><p>B.Tech in Information Technology, VIT Vellore · 2025 · 8.53/10</p></div>
            <div><h3>Recognition</h3><p>Rising Star Award · Pillar of Strength · Exceeds Expectations</p></div>
            <details className="earlier"><summary>Certifications</summary><ul>{certifications.map(item => <li key={item}>{item}</li>)}</ul></details>
          </div>
        </section>
        <Contact />
      </main>
      <footer className="shell footer"><span>Prateek Mishra · Bengaluru</span><div><a href={Bio.github}>GitHub</a><a href={Bio.linkedin}>LinkedIn</a><a href={Bio.resume} download>Résumé</a></div></footer>
    </>
  );
}
