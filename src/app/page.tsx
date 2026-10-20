import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Cpu,
  Layers,
  Shield,
  Database,
  Code2,
  CheckCircle2,
  Workflow
} from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  const capabilities = [
    {
      title: "Full-Stack Engineering",
      icon: <Layers className="h-5 w-5 text-sky-400" />,
      description:
        "Building responsive, accessible web applications with Next.js App Router, React 19, TypeScript, and clean component composition.",
      projectEvidence: "PayGlow & TheBTechGuy",
      link: "/projects/payglow"
    },
    {
      title: "Backend & Systems Design",
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      description:
        "Designing transactional data models, RESTful APIs, relational schemas with Prisma/PostgreSQL, and resilient error recovery state machines.",
      projectEvidence: "PayGlow & Smart DDoS Shield",
      link: "/projects/smart-ddos-shield"
    },
    {
      title: "AI-Powered Applications",
      icon: <Cpu className="h-5 w-5 text-indigo-400" />,
      description:
        "Integrating LLMs and vision models into deterministic product workflows with structured output validation, RAG grounding, and forensic analysis.",
      projectEvidence: "Stockly & TrustLens",
      link: "/projects/stockly"
    },
    {
      title: "Product Architecture",
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      description:
        "Evaluating architectural trade-offs, security boundaries, rate limiting, and merchant workflows from initial problem definition to deployment.",
      projectEvidence: "PayGlow & RakshaApp",
      link: "/projects/trustlens"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Understand the Problem",
      detail: "Deconstruct merchant or user friction into explicit functional requirements and constraints."
    },
    {
      step: "02",
      title: "Design Architecture",
      detail: "Map data boundaries, relational schemas, API contracts, and failure modes before writing code."
    },
    {
      step: "03",
      title: "Implement Robustly",
      detail: "Write strictly typed, modular code with clear separation of concerns and defense against injection."
    },
    {
      step: "04",
      title: "Test & Evaluate",
      detail: "Validate business logic with unit tests, property checks, and boundary stress tests."
    },
    {
      step: "05",
      title: "Deploy & Observe",
      detail: "Ship via automated CI/CD pipelines, configure structured logging, and monitor error rates."
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software Engineering Roles</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 leading-[1.1]">
              I build software that <span className="text-sky-400">solves real problems.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Software engineer and product builder exploring full-stack systems, backend engineering, AI applications, and SaaS products. Focusing on maintainability, security, performance, and user experience.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-950/40 hover:shadow-sky-900/50"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium text-sm transition-colors"
              >
                <span>View Resume</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors"
              >
                <span>Contact Me</span>
              </Link>
            </div>
          </div>

          {/* Engineering Restrained Composition */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300">ritesh@system-core ~ engineering-principles</span>
              </div>
              <span className="hidden sm:inline-block text-emerald-400">EVIDENCE-FIRST-SYSTEMS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 font-mono text-xs">
              <div className="space-y-2 p-4 rounded-lg bg-slate-900/50 border border-slate-800/60">
                <div className="flex items-center gap-2 text-sky-400 font-semibold">
                  <Terminal className="h-4 w-4" />
                  <span>Deterministic Over Guesswork</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Financial calculations, settlement states, and security checks are strictly executed by deterministic algorithms, never left to stochastic AI hallucinations.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-slate-900/50 border border-slate-800/60">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Code2 className="h-4 w-4" />
                  <span>Auditable State Machines</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Implemented idempotent payment lifecycles and explicit database transitions in PayGlow to handle out-of-order webhooks and network drops.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-slate-900/50 border border-slate-800/60">
                <div className="flex items-center gap-2 text-purple-400 font-semibold">
                  <Shield className="h-4 w-4" />
                  <span>Calibrated AI Forensics</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  In TrustLens, we present probabilistic confidence intervals and frequency domain evidence rather than misleading binary &quot;100% fake&quot; claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-sky-400">Core Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mt-1">
            Engineering Snapshot
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Four primary capability areas supported by real code and original product implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                  {cap.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-100">{cap.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cap.description}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/60">
                <Link
                  href={cap.link}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300"
                >
                  <span>Evidence: {cap.projectEvidence}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-sky-400">Original Initiatives</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mt-1">
              Featured Projects
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Demonstrated engineering systems with verified implementation statuses and architectural case studies.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300"
          >
            <span>View All 10 Projects</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} featuredMode={true} />
          ))}
        </div>
      </section>

      {/* Engineering Approach / Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Workflow className="h-3.5 w-3.5" />
              <span>Disciplined Execution</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mt-1">
              Engineering Approach
            </h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Software quality is the product of disciplined habits rather than heroic last-minute debugging. Here is the framework I apply to turning ambiguous problems into durable systems:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-sky-400 font-semibold">{ws.step}</span>
                  <h3 className="text-sm font-semibold text-slate-200 mt-1">{ws.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2">{ws.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Depth Case Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Technical Depth Highlight
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                Idempotent State Management & Settlement Reconciliation in PayGlow
              </h2>
            </div>
            <Link
              href="/engineering/payment-workflow-idempotency"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
            >
              <span>Read Full Architectural Case</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>The Counter Checkout Dilemma</span>
              </h4>
              <p>
                In merchant point-of-sale systems, intermittent Wi-Fi, out-of-order webhook delivery, and double-clicking cashiers frequently corrupt transactional state. Naive implementations risk double-charging customers or recording phantom settlements.
              </p>
              <p>
                In PayGlow, every checkout initiation generates a deterministic, unique UUID Idempotency Key bound to an immutable cart revision hash.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky-400" />
                <span>Atomic Transition Invariants</span>
              </h4>
              <p>
                Database writes enforce a strict state machine: <code className="text-sky-300 font-mono">PENDING → AUTHORIZING → SETTLED</code>. All mutation handlers check the current state within an atomic transaction.
              </p>
              <p>
                Duplicate webhook deliveries return an immediate cached 200 OK with the prior settlement proof, eliminating race conditions between cash tenders and digital QR triggers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 rounded-2xl bg-slate-900/30 border border-slate-800/80 items-center">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-sky-400">About Ritesh</p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">
              Building at the intersection of systems, data, and user experience.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {profile.summary}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
              <span>📍 {profile.location}</span>
              <span>🎓 {profile.education.degree}</span>
              <span>🏛️ {profile.education.institution}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/about"
              className="text-center py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              Read Engineering Philosophy
            </Link>
            <Link
              href="/skills"
              className="text-center py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors"
            >
              Explore Capabilities & Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/20 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Let&apos;s build something meaningful.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            I&apos;m interested in software engineering opportunities, product builder roles, and technically challenging backend and full-stack systems.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-sky-950/50"
            >
              Get In Touch
            </Link>
            <Link
              href="/resume"
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-colors"
            >
              View Verified Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
