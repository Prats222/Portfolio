export const Bio = {
  name: "Prateek Mishra",
  roles: [
    "Software Engineer (SDET)",
    "ASP.NET Core & React Developer",
    "Playwright Automation Engineer",
    "AI-Powered Test Automation Engineer",
  ],
  description:
    "Software Engineer with 1+ years of experience designing, developing, and testing enterprise applications using ASP.NET Core, React, Playwright, Selenium, and modern automation frameworks. I build REST APIs, full-stack products, and AI-powered automation for enterprise HP applications.",
  github: "https://github.com/Prats222",
  resume: "/Prateek_Mishra_Resume.pdf",
  linkedin: "https://linkedin.com/in/prateek-mishra",
  email: "mailto:mprateek058@gmail.com",
};

const icon = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

export const skills = [
  {
    title: "Languages & Backend",
    skills: [
      { name: "C#", image: icon("csharp") },
      { name: "Java", image: icon("java") },
      { name: "Python", image: icon("python") },
      { name: "JavaScript", image: icon("javascript") },
      { name: "TypeScript", image: icon("typescript") },
      { name: "SQL", image: icon("azuresqldatabase") },
      { name: "ASP.NET Core (.NET 10)", image: icon("dotnetcore") },
      { name: "Entity Framework Core", image: icon("dotnetcore") },
      { name: "REST APIs", image: icon("swagger") },
      { name: "JWT Authentication", image: icon("json") },
    ],
  },
  {
    title: "Frontend & Databases",
    skills: [
      { name: "React", image: icon("react") },
      { name: "Material UI", image: icon("materialui") },
      { name: "Tailwind CSS", image: icon("tailwindcss") },
      { name: "HTML5", image: icon("html5") },
      { name: "CSS3", image: icon("css3") },
      { name: "PostgreSQL", image: icon("postgresql") },
      { name: "SQL Server", image: icon("microsoftsqlserver") },
      { name: "MongoDB", image: icon("mongodb") },
    ],
  },
  {
    title: "Automation & DevOps",
    skills: [
      { name: "Playwright", image: icon("playwright") },
      { name: "Selenium WebDriver", image: icon("selenium") },
      { name: "Pytest", image: icon("pytest") },
      { name: "Postman", image: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { name: "Docker", image: icon("docker") },
      { name: "Git", image: icon("git") },
      { name: "GitHub Actions", image: icon("githubactions") },
      { name: "Azure DevOps", image: icon("azuredevops") },
      { name: "CI/CD", image: icon("githubactions") },
      { name: "Render", image: "https://cdn.simpleicons.org/render/46E3B7" },
      { name: "Vercel", image: "https://cdn.simpleicons.org/vercel/FFFFFF" },
    ],
  },
  {
    title: "Architecture & Engineering",
    skills: [
      { name: "Clean Architecture", image: icon("dotnetcore") },
      { name: "Repository Pattern", image: icon("dotnetcore") },
      { name: "Unit of Work", image: icon("dotnetcore") },
      { name: "Dependency Injection", image: icon("dotnetcore") },
      { name: "Page Object Model", image: icon("playwright") },
      { name: "Integration Testing", image: icon("pytest") },
      { name: "Regression Testing", image: icon("playwright") },
      { name: "Agile / Scrum", image: icon("jira") },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: "https://www.ascendion.com/favicon.ico",
    role: "Associate Engineer",
    company: "Ascendion Engineering Pvt. Ltd. | Client: HP Inc.",
    date: "July 2025 - Present",
    desc:
      "Enhancing HP's AI-driven QAMA framework for enterprise test generation across 53+ Android modules; contributing ASP.NET Core and React services for automation dashboards across 2+ HP projects; maintaining 350+ Playwright tests for HP PrintOS; and developing reusable Python, Selenium, and Pytest automation for enterprise printer workflows.",
    skills: [
      "ASP.NET Core",
      "React",
      "REST APIs",
      "Playwright",
      "TypeScript",
      "Python",
      "Selenium",
      "Pytest",
      "Postman",
      "TestRail",
      "Git",
      "Azure DevOps",
      "AI Automation",
    ],
  },
];

export const education = [
  {
    id: 0,
    img: "https://findlogovector.com/wp-content/uploads/2022/05/vellore-institute-of-technology-vit-logo-vector-2022.png",
    school: "Vellore Institute of Technology (VIT), Vellore",
    grade: "8.53/10 CGPA",
    date: "2021 - 2025",
    degree: "B.Tech in Information Technology",
  },
  {
    id: 1,
    img: "https://cdn-icons-png.flaticon.com/512/8074/8074788.png",
    school: "DMA Public School, Rampur",
    date: "2020 - 2021",
    grade: "85%",
    degree: "Class XII (CBSE)",
  },
  {
    id: 2,
    img: "https://cdn-icons-png.flaticon.com/512/8074/8074788.png",
    school: "PMS Public School, Moradabad",
    date: "2018 - 2019",
    grade: "87.2%",
    degree: "Class X (CBSE)",
  },
];

export const projects = [
  {
    id: 0,
    title: "PratsPilot - Agentic AI Platform",
    description:
      "A full-stack platform for creating, configuring, and executing AI agents, workflows, and custom tools. Built with Clean Architecture, JWT access and refresh tokens, background jobs, provider abstraction for Groq and OpenRouter, and a Python tool framework. Deployed with Docker for 100+ users.",
    image: "/pratspilot-dashboard.png",
    tags: [
      "ASP.NET Core",
      "React",
      "PostgreSQL",
      "Entity Framework Core",
      "JWT",
      "Docker",
      "OpenRouter",
      "Groq",
    ],
    category: "product",
    github: "https://github.com/Prats222/Agentic_AI_Platform",
    webapp: "https://pratspilot.vercel.app",
  },
  {
    id: 1,
    title: "Automation PM - Enterprise Automation Practice Platform",
    description:
      "A production-ready ASP.NET Core and React platform for practicing modern automation engineering. Includes responsive dashboards, REST APIs, cookie and JWT authentication, a live API-testing playground, and 72 Playwright tests running through GitHub Actions and Docker-based deployment.",
    image: "/automation-pm.svg",
    tags: [
      "ASP.NET Core",
      "React",
      "TypeScript",
      "Playwright",
      "REST APIs",
      "JWT",
      "Docker",
      "GitHub Actions",
    ],
    category: "automation",
    github: "https://github.com/Prats222/playwright-framework-dotnet-react",
    webapp: "https://automation-pm.onrender.com/pages/iot-dashboard",
  },
];

export const certifications = [
  "Ultimate ASP.NET Core Web API Development Guide - Udemy",
  "Playwright: Web Automation Testing From Zero to Hero - Udemy",
  "The Complete Full-Stack Web Development Bootcamp - Udemy",
];
