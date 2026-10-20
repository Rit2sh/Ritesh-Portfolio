import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Terminal, Code2, ShieldCheck, HeartHandshake } from "lucide-react";
import { profile } from "@/data/profile";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "About & Engineering Philosophy",
  description:
    "Engineering background, software design principles, and problem-solving methodology of Ritesh Chauhan.",
  canonicalUrl: "https://riteshchauhan.dev/about"
});

export default function AboutPage() {
  const principles = [
    {
      title: "Reasoning from First Principles",
      description:
        "Before reaching for external dependencies or complex frameworks, I deconstruct problems down to core data structures, state lifecycles, and network boundaries."
    },
    {
      title: "Deterministic State Over Speculative Guesswork",
      description:
        "Financial numbers, user permissions, and transactional records demand 100% mathematical certainty. AI is applied where synthesis adds value, never where deterministic arithmetic is required."
    },
    {
      title: "Defensive Design at the Perimeter",
      description:
        "Treat all external input as untrusted. Enforce strict Zod/Pydantic validation schemas at API boundaries, use parameterized queries to prevent injection, and isolate operational failures from crashes."
    },
    {
      title: "Humility and Empirical Testing",
      description:
        "Code quality is proven through unit tests, edge-case simulations, and structured observability, rather than assertions of perfection. When edge cases fail, I document the lessons honestly."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-8 border-b border-slate-800">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400">
          Background & Engineering Mindset
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
          Building practical software with disciplined craft.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          {profile.summary}
        </p>
      </div>

      {/* Professional Positioning */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-sky-400" />
          <span>Professional Positioning</span>
        </h2>
        <p className="text-xs text-slate-400">
          How I operate as a software engineer and product builder on technical teams:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profile.positioning.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-400" />
            <span>Core Engineering Principles</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mental models and operational standards applied across all original projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2 text-xs"
            >
              <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                <span className="font-mono text-sky-400">0{idx + 1}.</span>
                <span>{p.title}</span>
              </h3>
              <p className="text-slate-400 leading-relaxed pt-1">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Background */}
      <section className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-indigo-400" />
          <span>Academic Foundation</span>
        </h2>
        <div className="space-y-2 text-xs text-slate-300">
          <p className="text-sm font-semibold text-white">
            {profile.education.degree}
          </p>
          <p className="text-sky-300 font-mono">
            {profile.education.institution} • {profile.education.location}
          </p>
          <div className="pt-2">
            <p className="text-slate-400 font-mono uppercase text-[10px] tracking-wider mb-1.5">
              Core Technical Focus Areas:
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.education.focusAreas.map((area, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Step Navigation */}
      <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 font-mono"
        >
          <span>Examine Project Implementations</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
        >
          <HeartHandshake className="h-4 w-4" />
          <span>Connect with Ritesh</span>
        </Link>
      </div>
    </div>
  );
}
