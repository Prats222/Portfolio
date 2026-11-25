import { useRef, useState } from 'react';
import Contact from './components/Contact';
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
        <a className="project-visual" href={project.webapp} aria-label="Open the PratsPilot live demo">
          <img src={project.image} alt="PratsPilot dashboard with agents, workflows, tools, and run controls" loading="lazy" />
        </a>
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
          <a className="button small" href={Bio.resume} download>Résumé PDF</a>
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
            <div className="portrait-mat">
              <div className="portrait-depth"><img src="/HeroImage.jpg" alt="Prateek Mishra at his workstation" /></div>
              <svg className="portrait-orbit" viewBox="0 0 500 450" aria-hidden="true"><ellipse cx="250" cy="222" rx="230" ry="113" transform="rotate(-42 250 222)" /><ellipse cx="250" cy="222" rx="222" ry="124" transform="rotate(25 250 222)" /></svg>
            </div>
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
            <dl>
              <div><dt>Backend</dt><dd>C#, ASP.NET Core, REST APIs, EF Core, SQL Server, JWT</dd></div>
              <div><dt>Frontend</dt><dd>React, TypeScript, JavaScript, Material UI, Tailwind CSS</dd></div>
              <div><dt>Automation</dt><dd>Playwright, Selenium WebDriver, pytest, Postman</dd></div>
              <div><dt>Delivery</dt><dd>Git, GitHub Actions, Azure DevOps, Docker, CI/CD</dd></div>
            </dl>
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
