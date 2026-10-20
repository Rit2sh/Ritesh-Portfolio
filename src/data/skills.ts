export type SkillCategory = "Demonstrated in Project" | "Working Knowledge" | "Currently Learning";

export interface SkillItem {
  name: string;
  category: SkillCategory;
  evidence?: string;
  notes?: string;
}

export interface SkillGroup {
  domain: string;
  description: string;
  skills: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    domain: "Programming Languages",
    description: "Core languages used to implement application logic, algorithms, and backend services.",
    skills: [
      {
        name: "TypeScript",
        category: "Demonstrated in Project",
        evidence: "PayGlow & Stockly codebases: strict type safety, generic API models, Prisma schema generation."
      },
      {
        name: "JavaScript (ES6+)",
        category: "Demonstrated in Project",
        evidence: "Full-stack asynchronous programming, DOM lifecycle, event-driven architectures."
      },
      {
        name: "Python",
        category: "Demonstrated in Project",
        evidence: "FastAPI services, AI evaluation pipelines, PyTorch modeling, and automated data extraction."
      },
      {
        name: "SQL",
        category: "Demonstrated in Project",
        evidence: "Relational schema design, indexes, multi-table transactions, and ACID constraints in PostgreSQL."
      },
      {
        name: "C++",
        category: "Working Knowledge",
        evidence: "Data structures, memory management concepts, algorithmic problem solving."
      }
    ]
  },
  {
    domain: "Frontend Engineering",
    description: "Modern component-driven web interfaces built for accessibility, performance, and responsive viewports.",
    skills: [
      {
        name: "Next.js (App Router)",
        category: "Demonstrated in Project",
        evidence: "PayGlow merchant platform and portfolio: Server Components, streaming SSR, layouts, route handlers."
      },
      {
        name: "React (v18/v19)",
        category: "Demonstrated in Project",
        evidence: "Custom hooks, state management, memoization, lifecycle optimization, and accessible UI patterns."
      },
      {
        name: "Tailwind CSS",
        category: "Demonstrated in Project",
        evidence: "Design system tokenization, dark mode orchestration, responsive utility layout."
      },
      {
        name: "HTML5 & Semantic Markup",
        category: "Demonstrated in Project",
        evidence: "Semantic document outline, WCAG 2.2 AA landmarks, ARIA labels, keyboard focus management."
      },
      {
        name: "CSS3 & Modern Layouts",
        category: "Demonstrated in Project",
        evidence: "CSS Grid, Flexbox, CSS Custom Properties, smooth transitions, print stylesheets."
      },
      {
        name: "Vite",
        category: "Working Knowledge",
        evidence: "Fast SPA bundling, hot module replacement, and modern ESM configuration."
      },
      {
        name: "Accessible Interfaces (WCAG 2.2 AA)",
        category: "Demonstrated in Project",
        evidence: "Keyboard navigability, contrast verification, screen reader announcements, reduced-motion queries."
      },
      {
        name: "Component Architecture",
        category: "Demonstrated in Project",
        evidence: "Design tokens, modular atomic components, composition patterns, strict prop interfaces."
      }
    ]
  },
  {
    domain: "Backend Engineering",
    description: "Robust service architecture, API contracts, transactional integrity, and resilient error recovery.",
    skills: [
      {
        name: "Node.js",
        category: "Demonstrated in Project",
        evidence: "Event-loop runtime, file streaming, backend microservices, async worker patterns."
      },
      {
        name: "Express.js",
        category: "Demonstrated in Project",
        evidence: "Middleware pipelines, route handlers, error interceptors, rate-limiting layers."
      },
      {
        name: "FastAPI",
        category: "Demonstrated in Project",
        evidence: "Python ASGI services, Pydantic data validation schemas, OpenAPI documentation generation."
      },
      {
        name: "REST API Design",
        category: "Demonstrated in Project",
        evidence: "Resource-oriented routing, HTTP status semantics, payload validation, idempotency headers."
      },
      {
        name: "Authentication & Authorization",
        category: "Demonstrated in Project",
        evidence: "JWT sessions, HTTP-only cookie management, RBAC (Role-Based Access Control) for merchants."
      },
      {
        name: "Input Validation & Sanitization",
        category: "Demonstrated in Project",
        evidence: "Zod / Pydantic schemas, defense against injection vulnerabilities, strict boundary checking."
      },
      {
        name: "Error Handling & Observability",
        category: "Demonstrated in Project",
        evidence: "Structured JSON error payloads, operational vs programmer error isolation, contextual logging."
      },
      {
        name: "Asynchronous Processing",
        category: "Working Knowledge",
        evidence: "Background task queuing, webhook retries with exponential backoff, event pub/sub."
      }
    ]
  },
  {
    domain: "Databases & Data Modeling",
    description: "Data persistence, schema design, relational constraints, and caching strategies.",
    skills: [
      {
        name: "PostgreSQL",
        category: "Demonstrated in Project",
        evidence: "PayGlow relational data model: foreign keys, cascading rules, JSONB fields, unique constraints."
      },
      {
        name: "Prisma ORM",
        category: "Demonstrated in Project",
        evidence: "Schema migrations, type-safe query building, relation filtering, transaction blocks."
      },
      {
        name: "MongoDB",
        category: "Demonstrated in Project",
        evidence: "Document-oriented storage for semi-structured content, aggregations, schema validation."
      },
      {
        name: "MySQL",
        category: "Working Knowledge",
        evidence: "Relational database operations, joins, indexing, and transactional isolation levels."
      },
      {
        name: "Redis",
        category: "Working Knowledge",
        evidence: "In-memory key-value caching, rate limiting counters, session store management."
      },
      {
        name: "Relational Data Modeling",
        category: "Demonstrated in Project",
        evidence: "3NF normalization, foreign key integrity, audit trails, and transactional state machines."
      }
    ]
  },
  {
    domain: "AI & Machine Learning",
    description: "Practical machine learning pipelines, LLM integration, grounding, and empirical evaluation.",
    skills: [
      {
        name: "LLM & AI API Integration",
        category: "Demonstrated in Project",
        evidence: "Stockly and TrustLens: structured prompt engineering, JSON schema enforcement, grounded RAG."
      },
      {
        name: "Evaluation & Error Analysis",
        category: "Demonstrated in Project",
        evidence: "Confusion matrix analysis, false positive vs false negative trade-offs in content authenticity."
      },
      {
        name: "PyTorch",
        category: "Working Knowledge",
        evidence: "Tensor operations, neural network layers, custom training loops, model inference."
      },
      {
        name: "Scikit-learn",
        category: "Working Knowledge",
        evidence: "Supervised and unsupervised classification, feature scaling, model metrics (Precision/Recall/F1)."
      },
      {
        name: "spaCy",
        category: "Working Knowledge",
        evidence: "Named entity recognition (NER), tokenization, part-of-speech tagging for text workflows."
      },
      {
        name: "TensorFlow",
        category: "Working Knowledge",
        evidence: "Keras sequential and functional models, data preprocessing pipelines."
      },
      {
        name: "PyTorch Geometric",
        category: "Currently Learning",
        evidence: "Graph neural networks, node classification, relational graph modeling."
      },
      {
        name: "PyTorch Lightning",
        category: "Currently Learning",
        evidence: "Structured modular deep learning code, multi-GPU training abstractions."
      }
    ]
  },
  {
    domain: "Infrastructure & Engineering Practices",
    description: "Containerization, cloud services, continuous integration, and disciplined version control.",
    skills: [
      {
        name: "Git & GitHub",
        category: "Demonstrated in Project",
        evidence: "Feature-branch workflows, semantic commit conventions, pull request reviews, squash merges."
      },
      {
        name: "Docker",
        category: "Working Knowledge",
        evidence: "Multi-stage Dockerfiles, minimal base images, container networking, docker-compose setups."
      },
      {
        name: "GitHub Actions & CI/CD",
        category: "Demonstrated in Project",
        evidence: "Automated linting, TypeScript checking, test runners on pull requests, deployment hooks."
      },
      {
        name: "Automated Testing (Unit & Integration)",
        category: "Demonstrated in Project",
        evidence: "Vitest test suites, boundary condition testing, mock API endpoints, regression assertions."
      },
      {
        name: "Nginx",
        category: "Working Knowledge",
        evidence: "Reverse proxying, SSL/TLS termination, rate limiting directives, static file caching."
      },
      {
        name: "AWS (S3, EC2)",
        category: "Working Knowledge",
        evidence: "Cloud object storage with pre-signed URLs, virtual compute instances, security groups."
      },
      {
        name: "Google Cloud Platform",
        category: "Working Knowledge",
        evidence: "Cloud Run container deployment, Cloud Storage, IAM permission fundamentals."
      },
      {
        name: "Microsoft Azure",
        category: "Working Knowledge",
        evidence: "App Services, Azure Blob Storage, Azure Cognitive Services testing."
      },
      {
        name: "Kubernetes",
        category: "Currently Learning",
        evidence: "Pods, services, deployments, ingress controllers, cluster orchestration basics."
      }
    ]
  }
];
