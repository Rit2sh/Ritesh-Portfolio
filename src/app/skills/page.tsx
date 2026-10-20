import type { Metadata } from "next";
import { skillGroups } from "@/data/skills";
import { constructMetadata } from "@/lib/metadata";
import { CheckCircle2, BookOpen, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Technical Skills & Engineering Capabilities",
  description:
    "Evidence-backed technical skills inventory of Ritesh Chauhan across programming languages, backend systems, databases, machine learning, and infrastructure.",
  canonicalUrl: "https://riteshchauhan.dev/skills"
});

export default function SkillsPage() {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Demonstrated in Project":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-2.5 w-2.5" />
            <span>Demonstrated in Project</span>
          </span>
        );
      case "Working Knowledge":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <BookOpen className="h-2.5 w-2.5" />
            <span>Working Knowledge</span>
          </span>
        );
      case "Currently Learning":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="h-2.5 w-2.5" />
            <span>Currently Learning</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400">
          Engineering Capabilities
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
          Technical Skills & Evidence
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Organized by domain and categorized by genuine engineering exposure. No fabricated proficiency percentages or unverified claims.
        </p>
      </div>

      {/* Category Legend */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <ShieldCheck className="h-4 w-4 text-sky-400" />
          <span>Evaluation Framework:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Demonstrated in Project (Active production or prototype usage)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <span className="text-slate-300">Working Knowledge (Practical proficiency & course applications)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            <span className="text-slate-300">Currently Learning (Active coursework & exploration)</span>
          </div>
        </div>
      </div>

      {/* Skills Groups */}
      <div className="space-y-10">
        {skillGroups.map((group) => (
          <section
            key={group.domain}
            className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/80 space-y-6"
          >
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-slate-100">{group.domain}</h2>
              <p className="text-xs text-slate-400 mt-1">{group.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 space-y-2.5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-200">{skill.name}</h3>
                    {getCategoryBadge(skill.category)}
                  </div>
                  {skill.evidence && (
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      {skill.evidence}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
