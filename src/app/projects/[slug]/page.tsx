import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  Cpu,
  Layers,
  Sparkles,
  GitFork,
  Milestone
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { LivePreviewFrame } from "@/components/projects/LivePreviewFrame";
import { constructMetadata } from "@/lib/metadata";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return constructMetadata({ title: "Project Not Found" });

  return constructMetadata({
    title: `${project.name} — Technical Case Study`,
    description: `${project.summary} Engineered by Ritesh Chauhan.`,
    canonicalUrl: `https://riteshchauhan.dev/projects/${project.slug}`
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Project Directory</span>
        </Link>
      </div>

      {/* Header Block */}
      <div className="space-y-4 pb-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <CategoryBadge category={project.category} />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100">
          {project.name}
        </h1>

        <p className="text-base sm:text-lg text-sky-400/90 font-medium">
          {project.tagline}
        </p>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {project.summary}
        </p>

        {/* Links & Role Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-slate-500">Engineering Role:</span>
            <span className="text-sky-300 font-semibold">{project.role}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-sans font-medium transition-colors"
              >
                <span>Live Product Demo</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-sans font-medium transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Source Repository</span>
              </a>
            )}
            {project.initiativeUrl && (
              <a
                href={project.initiativeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-sans font-medium transition-colors"
              >
                <span>Initiative Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Live Interactive Product Instance */}
      {project.demoUrl && (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Interactive {project.name} Instance</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Interact with the live running product directly below or launch fullscreen in a new tab.
              </p>
            </div>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-emerald-950/40"
            >
              <span>Launch Fullscreen ({project.name})</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <LivePreviewFrame url={project.demoUrl} title={project.name} />
        </section>
      )}

      {/* Tech Stack Breakdown */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-sky-400" />
          <span>Verified Technologies Used</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Problem Statement & Target Users */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-xl bg-slate-900/40 border border-slate-800">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <span>Problem Statement</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-sky-400" />
            <span>Target User Personas</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {project.targetUsers.map((user, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-mono mt-0.5">•</span>
                <span>{user}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product Requirements */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span>Product & Functional Requirements</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.productRequirements.map((req, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
            >
              <span className="font-mono text-emerald-400 font-bold">0{idx + 1}.</span>
              <span>{req}</span>
            </div>
          ))}
        </div>
      </section>

      {/* System Architecture Diagram */}
      <section>
        <ArchitectureDiagram
          steps={project.architectureSteps}
          title={`${project.name} Architecture Pipeline`}
        />
      </section>

      {/* Core Flow / State Machine */}
      {project.paymentOrCoreFlow && (
        <section className="space-y-3 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Layers className="h-4 w-4 text-sky-400" />
            <span>Core State Lifecycle & Workflow</span>
          </h3>
          <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            {project.paymentOrCoreFlow}
          </p>
        </section>
      )}

      {/* Data Model Overview */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <GitFork className="h-4 w-4 text-indigo-400" />
          <span>Data Modeling & Persistence Invariants</span>
        </h2>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {project.dataModelOverview}
        </div>
      </section>

      {/* Architectural Trade-offs */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Milestone className="h-4 w-4 text-purple-400" />
          <span>Architectural Trade-offs & Engineering Decisions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.tradeoffs.map((t, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs"
            >
              <h4 className="font-semibold text-slate-100 text-sm">{t.decision}</h4>
              <div className="space-y-1">
                <p className="text-emerald-300 font-mono">
                  <span className="text-slate-400">Chosen:</span> {t.chosen}
                </p>
                <p className="text-slate-400 font-mono">
                  <span className="text-slate-400">Alternative:</span> {t.alternative}
                </p>
              </div>
              <p className="text-slate-300 pt-1 leading-relaxed border-t border-slate-800/60">
                {t.rationale}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security, Privacy & Testing */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-emerald-400" />
            <span>Security & Privacy Controls</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {project.securityAndPrivacy.map((sec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono">•</span>
                <span>{sec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-sky-400" />
            <span>Testing & Verification Strategy</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {project.testingStrategy.map((test, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-mono">•</span>
                <span>{test}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Difficult Problems Solved */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-400" />
          <span>Non-Trivial Engineering Problems Solved</span>
        </h2>
        <div className="space-y-2.5">
          {project.difficultProblems.map((prob, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
            >
              <span className="text-yellow-400 font-mono font-bold">•</span>
              <span>{prob}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Honest Limitations & Future Roadmap */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">Current Known Limitations</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            {project.knownLimitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-mono font-bold">-</span>
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">Future Product Roadmap</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            {project.futureRoadmap.map((road, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-mono font-bold">→</span>
                <span>{road}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="pt-8 flex items-center justify-between border-t border-slate-800">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Projects</span>
        </Link>
        <Link
          href="/contact"
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors"
        >
          Discuss This Project
        </Link>
      </div>
    </article>
  );
}
