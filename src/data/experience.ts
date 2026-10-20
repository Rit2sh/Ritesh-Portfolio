export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "Initiative & Product" | "Academic" | "Independent Engineering";
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "payglow-lead",
    role: "Lead Product Architect & Full-Stack Builder",
    organization: "PayGlow (Original Product)",
    location: "India (Remote)",
    period: "2024 — Present",
    type: "Initiative & Product",
    description:
      "Spearheaded the design, system architecture, and development of PayGlow, a merchant operations platform and dual-screen payment display system for restaurants and retail counters.",
    highlights: [
      "Engineered dual-viewport state synchronization between cashier tablet and customer-facing display with sub-second latency.",
      "Designed PostgreSQL relational schemas with Prisma ORM enforcing ACID transactions for orders, line-items, and settlement reconciliation.",
      "Built resilient error-handling states and offline-tolerant cashier interfaces with Next.js App Router and TypeScript.",
      "Deployed and maintained live production web app on Vercel with automated CI/CD and structured logging."
    ],
    technologies: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma", "Tailwind CSS", "Zod"],
    link: "https://payglow.in"
  },
  {
    id: "thebtechguy-founder",
    role: "Founder & Community Lead",
    organization: "TheBTechGuy",
    location: "India",
    period: "2023 — Present",
    type: "Initiative & Product",
    description:
      "Created an India-focused community initiative and digital platform dedicated to empowering engineering students, spotlighting student startup founders, and sharing practical engineering resources.",
    highlights: [
      "Built and launched the public platform (thebtechguy.com) providing builder spotlights and technical guides.",
      "Cultivated a vibrant digital community across Instagram and web channels, championing build-in-public culture.",
      "Organized peer code reviews, collaborative project discussions, and hackathon preparation sessions for undergraduate engineers."
    ],
    technologies: ["Web Systems", "Community Leadership", "Content Architecture", "Digital Outreach"],
    link: "https://thebtechguy.com/"
  },
  {
    id: "independent-research",
    role: "Systems & AI Engineering Builder",
    organization: "Independent Technical Research",
    location: "India",
    period: "2023 — Present",
    type: "Independent Engineering",
    description:
      "Conducted self-directed engineering implementations focusing on network security, financial data modeling, and multimodal AI forensics.",
    highlights: [
      "Architected Stockly: Built a deterministic financial calculation engine with Pydantic and FastAPI, grounding LLM queries strictly on verified statement data.",
      "Developed TrustLens prototype: Created a media forensics pipeline evaluating frequency-domain DCT artifacts to detect synthetic generative media.",
      "Engineered Smart DDoS Shield prototype: Implemented sliding-window rate limiters with Redis and simulated Layer-4/Layer-7 traffic floods in containerized environments."
    ],
    technologies: ["Python", "FastAPI", "PyTorch", "Redis", "Docker", "Scapy", "OpenCV"]
  },
  {
    id: "cgc-university",
    role: "B.Tech in Computer Science and Engineering",
    organization: "CGC University, Jhanjeri",
    location: "Mohali, Punjab, India",
    period: "2022 — Present",
    type: "Academic",
    description:
      "Pursuing rigorous undergraduate coursework in computer science fundamentals, distributed systems, algorithms, database management, and network security.",
    highlights: [
      "Deep focus on systems programming, operating system principles, data structures, and algorithmic complexity.",
      "Actively applied academic theoretical models to real-world software engineering and product development."
    ],
    technologies: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Systems", "C++", "SQL"]
  }
];
