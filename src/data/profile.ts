export interface Profile {
  name: string;
  headline: string;
  subheadline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  summary: string;
  positioning: string[];
  education: {
    degree: string;
    institution: string;
    location: string;
    status: string;
    focusAreas: string[];
  };
  availability: {
    status: "Actively interviewing" | "Open to opportunities" | "Unavailable";
    targetRoles: string[];
    locations: string[];
    workAuthorization: string;
  };
}

export const profile: Profile = {
  name: "Ritesh Chauhan",
  headline: "Software Engineer | Full-Stack Developer | AI Product Builder",
  subheadline: "Building reliable full-stack applications, scalable backend systems, and grounded AI product workflows with disciplined engineering.",
  location: "India",
  email: "riteshchauhan.work@gmail.com",
  github: "https://github.com/Rit2sh",
  linkedin: "https://linkedin.com/in/ritesh-chauhan",
  twitter: "https://x.com/ritesh_builds",
  summary:
    "I’m a software engineer and product builder interested in creating practical technology products that solve real problems. My work spans full-stack development, backend engineering, AI-powered applications, fintech, cybersecurity, and SaaS. I enjoy taking ideas from problem definition through system design, implementation, testing, and deployment, while focusing on maintainability, security, performance, and user experience.",
  positioning: [
    "Turn ambiguous requirements into structured technical solutions.",
    "Design and build full-stack applications with clean separation of concerns.",
    "Create robust REST APIs, resilient data models, and transactional workflows.",
    "Reason about authentication, authorization, security boundaries, and reliability.",
    "Integrate AI into useful, grounded product workflows with hallucination mitigation.",
    "Evaluate architectural trade-offs pragmatically rather than chasing hype.",
    "Build accessible, responsive user interfaces conforming to WCAG 2.2 AA.",
    "Test, debug, document, and deploy production software with CI/CD rigor."
  ],
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "CGC University, Jhanjeri",
    location: "Mohali, Punjab, India",
    status: "Undergraduate / In Progress",
    focusAreas: [
      "Distributed Systems & Data Structures",
      "Relational & Distributed Database Design",
      "Computer Networks & Application Security",
      "Machine Learning & Artificial Intelligence"
    ]
  },
  availability: {
    status: "Actively interviewing",
    targetRoles: [
      "Software Engineer",
      "Full-Stack Engineer",
      "Backend Engineer",
      "AI / Product Engineer"
    ],
    locations: ["Remote", "India", "Global Relocation / Hybrid"],
    workAuthorization: "Authorized to work in India; open to global sponsorship / remote opportunities."
  }
};
