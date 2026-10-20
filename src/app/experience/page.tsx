import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, GraduationCap, Building2, Terminal, ArrowRight } from "lucide-react";
import { experiences } from "@/data/experience";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Experience & Background",
  description:
    "Verified technical initiatives, product leadership, and academic background of Ritesh Chauhan.",
  canonicalUrl: "https://riteshchauhan.dev/experience"
});

export default function ExperiencePage() {
  const getExperienceIcon = (type: string) => {
    switch (type) {
      case "Academic":
        return <GraduationCap className="h-5 w-5 text-indigo-400" />;
      case "Initiative & Product":
        return <Building2 className="h-5 w-5 text-sky-400" />;
      default:
        return <Terminal className="h-5 w-5 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400">
          Professional Background
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
          Verified Experience & Initiatives
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Product leadership, original software implementations, and computer science education. All entries reflect verified contributions without inflated job titles.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                  {getExperienceIcon(exp.type)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">{exp.role}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                    <span className="text-sky-300 font-semibold">{exp.organization}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
                  {exp.period}
                </span>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-slate-400 hover:text-white"
                    aria-label={`Open link for ${exp.organization}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {exp.description}
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Key Engineering Highlights
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-sky-400 font-mono mt-0.5">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {exp.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recruiter Quick Link */}
      <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Need a concise format?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            View the standardized single-page recruiter resume with direct contact links.
          </p>
        </div>
        <Link
          href="/resume"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
        >
          <span>Open Resume</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
