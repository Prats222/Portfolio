export const Bio = {
  name: "Prateek Mishra",
  roles: [
    "Full-Stack .NET & React Engineer",
    "ASP.NET Core Developer",
    "Builder of Agentic AI Workflows",
  ],
  description:
    "I build ASP.NET Core APIs and React applications at Ascendion for HP, from printer fleet dashboards to asynchronous image generation. I also develop agentic AI workflows and cross-platform test automation.",
  github: "https://github.com/Prats222",
  resume: "/Prateek_Mishra_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/prateek-mishra-686945243/",
  email: "mailto:prateekjobid@gmail.com",
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
      { name: "SQL Server", image: icon("microsoftsqlserver") },
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
      "Full-stack development, agentic AI, and web automation for HP.",
    tracks: [
      {
        name: "LTO Hub",
        detail: "Built React printer management interfaces and tenant-scoped ASP.NET Core APIs with EF Core and SQL Server. Cut printer onboarding to under 1 minute and resolved 14 defects in one release cycle.",
      },
      {
        name: "PrintAI",
        detail: "Implemented an asynchronous image-generation pipeline that handled about 1,500 jobs a day at peak. Replaced polling with server-sent events, reducing status requests by about 85%.",
      },
      {
        name: "HPX QAMA",
        detail: "Led a seven-person team and developed 120+ AI agents and 130+ workflows with 100+ context configurations. Built a TestRail-to-GitHub orchestrator and automated printer workflows across 53+ Android modules and 50+ Windows and iOS modules combined.",
      },
      {
        name: "PrintOS",
        detail: "Wrote 250+ Playwright test scripts in TypeScript to validate printer management workflows in HP PrintOS.",
      },
    ],
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
  {
    id: 1,
    img: "https://www.google.com/s2/favicons?domain=cognizant.com&sz=128",
    role: "Programmer Analyst Intern",
    company: "Cognizant",
    date: "April 2025 - July 2025",
    desc:
      "Completed an on-site enterprise software engineering internship in Bengaluru, working with Java, Selenium-based automation, and application testing practices.",
    skills: [
      "Java",
      "Selenium",
      "Test Automation",
      "Software Testing",
      "Enterprise Applications",
    ],
  },
  {
    id: 2,
    img: "https://github.com/Prats222/Java-Practice/assets/126672828/facea5dc-c90e-49c6-996b-d24d5f96acfa",
    role: "Web Development Intern",
    company: "GreenDumbells",
    date: "October 2023",
    desc:
      "Contributed remotely to the GreenDumbells website and its e-commerce experience using a modern JavaScript and MongoDB-based web stack.",
    skills: [
      "React",
      "Redux",
      "Node.js",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "MongoDB",
      "E-Commerce",
    ],
    Dlink:
      "https://github.com/Prats222/Java-Practice/assets/126672828/db2188cf-f815-4c52-b08d-b815e8e0edff",
  },
  {
    id: 3,
    img: "https://iconape.com/wp-content/files/po/253758/png/bharat-electronics-ltd-logo.png",
    role: "SDE Intern",
    company: "Bharat Electronics Limited",
    date: "September 2023",
    desc:
      "Worked on a Web-GIS application for military use, contributing to its web interface and geospatial functionality.",
    skills: [
      "React",
      "Redux",
      "Node.js",
      "JavaScript",
      "Bootstrap",
      "OpenLayers",
      "MongoDB",
      "Web GIS",
    ],
    Dlink:
      "https://github.com/Prats222/Java-Practice/assets/126672828/d1bee3c2-6774-4805-9c31-9a489249f4b4",
  },
  {
    id: 4,
    img: "https://github.com/Prats222/Java-Practice/assets/126672828/54778168-901d-48ac-853f-f7719534bfc4",
    role: "SDE Intern",
    company: "L&T Finance",
    date: "August 2023",
    desc:
      "Worked on the LTFS helpdesk frontend, Spring Boot API integration, and database procedures supporting user acceptance testing.",
    skills: [
      "AngularJS",
      "Spring Boot",
      "Java",
      "JavaScript",
      "REST APIs",
      "SQL",
      "SQL Workbench",
      "UAT",
    ],
    Dlink:
      "https://github.com/Prats222/CHAT_WITH_PRATS2/assets/126672828/d8bb7f3a-c834-4f71-b1c7-2e3542a65645",
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
      "An ASP.NET Core and React platform for creating AI agents, attaching document context, and connecting agents and Python tools in a visual editor. Autopilot drafts workflows, human approvals can pause runs, and the Arena compares agents head to head. PratsPilot reached 120+ concurrent users and placed second at Launchpad India.",
    image: "/pratspilot-dashboard.png",
    tags: [
      "ASP.NET Core",
      "React",
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
