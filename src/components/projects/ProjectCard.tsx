import Link from "next/link";
import { ExternalLink, ArrowRight, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Project } from "@/data/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface ProjectCardProps {
  project: Project;
  featuredMode?: boolean;
}

export function ProjectCard({ project, featuredMode = false }: ProjectCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl bg-slate-900/70 border border-slate-800/80 p-6 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-sky-950/20 ${
        featuredMode ? "border-slate-700/60 bg-slate-900/90" : ""
      }`}
    >
      <div>
        {/* Header: Status and Category */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <StatusBadge status={project.status} size="sm" />
          <CategoryBadge category={project.category} />
        </div>

        {/* Project Title and Role */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold tracking-tight text-slate-100 group-hover:text-sky-400 transition-colors">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none">
              {project.name}
            </Link>
          </h3>
          <p className="text-xs font-mono text-sky-400/90 mt-0.5">{project.role}</p>
        </div>

        {/* Tagline / Summary */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {project.summary}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-800/40">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-medium text-slate-200 hover:text-sky-400 transition-colors"
        >
          <span>Examine Architecture</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <div className="flex items-center gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-medium text-[11px] transition-colors"
              title={`Launch ${project.name} live`}
              aria-label={`Open Live Deployment for ${project.name}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Site</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="View Source Repository"
              aria-label={`View Source Repository for ${project.name}`}
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {project.initiativeUrl && (
            <a
              href={project.initiativeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Visit Initiative Hub"
              aria-label={`Visit Initiative Hub for ${project.name}`}
            >
              <Layers className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
