import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Printer, ArrowUpRight, CheckCircle2, GraduationCap, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Resume & Verified Credentials",
  description:
    "Standardized software engineering resume of Ritesh Chauhan. Full-Stack Developer, Backend Systems, and AI Product Builder.",
  canonicalUrl: "https://riteshchauhan.dev/resume"
});

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-8">
      {/* Recruiter Toolbar (Hidden when printing) */}
      <div className="no-print p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-mono">
            Recruiter Quick View • Status: {profile.availability.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors"
          >
            Contact for Roles
          </Link>
          <a
            href="javascript:window.print()"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / Save as PDF</span>
          </a>
        </div>
      </div>

      {/* Printable Resume Container */}
      <div className="print-card rounded-2xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 space-y-10 shadow-xl">
        {/* Header Block */}
        <div className="border-b border-slate-800 pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="text-sm sm:text-base text-sky-400 font-mono mt-1">
                {profile.headline}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                📍 {profile.location} • Open to Remote & Relocation
              </p>
            </div>

            {/* Quick Contacts */}
            <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300 self-start">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{profile.email}</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5 text-slate-400" />
                <span>github.com/Rit2sh</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-slate-400" />
                <span>linkedin.com/in/ritesh-chauhan</span>
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            {profile.summary}
          </p>
        </div>

        {/* Technical Capabilities */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>Technical Skills (Demonstrated in Code & Projects)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {skillGroups.map((group) => {
              const activeSkills = group.skills
                .filter((s) => s.category !== "Currently Learning")
                .map((s) => s.name);
              return (
                <div key={group.domain} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <span className="font-semibold text-slate-200 block mb-1">{group.domain}:</span>
                  <span className="text-slate-400 font-mono leading-relaxed">{activeSkills.join(" • ")}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Original Projects with Verified Statuses */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Key Original Software Projects</span>
          </h2>

          <div className="space-y-5">
            {projects.slice(0, 4).map((p) => (
              <div key={p.slug} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                      {p.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">({p.category})</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono no-print">
                    <Link href={`/projects/${p.slug}`} className="text-sky-400 hover:underline">
                      View Case Study
                    </Link>
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-0.5">
                        <span>Live Demo</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {p.summary}
                </p>

                <div className="flex flex-wrap gap-1 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Tech Stack:</span>
                  <span>{p.technologies.slice(0, 6).join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Initiatives */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Verified Initiatives & Leadership</span>
          </h2>

          <div className="space-y-6">
            {experiences.filter((e) => e.type !== "Academic").map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-mono text-sky-300">{exp.organization} • {exp.location}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                  {exp.highlights.slice(0, 3).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-indigo-400" />
            <span>Education</span>
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white">{profile.education.degree}</h3>
              <p className="text-slate-300 font-mono mt-0.5">{profile.education.institution} • {profile.education.location}</p>
            </div>
            <span className="font-mono text-slate-400">{profile.education.status}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
