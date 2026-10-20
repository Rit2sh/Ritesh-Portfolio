import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Projects & Engineering Systems",
  description:
    "Directory of original software engineering projects, system designs, and product initiatives created by Ritesh Chauhan. Filter by domain and implementation status.",
  canonicalUrl: "https://riteshchauhan.dev/projects"
});

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400">
          Original Engineering Work
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
          Project Directory
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Every project listed below is an original initiative or product built by Ritesh Chauhan. Each entry includes its verified implementation status, architectural trade-offs, and design boundaries.
        </p>
      </div>

      {/* Interactive Search and Filter */}
      <ProjectFilter allProjects={projects} />
    </div>
  );
}
