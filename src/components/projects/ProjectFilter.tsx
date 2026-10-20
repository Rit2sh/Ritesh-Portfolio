"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter } from "lucide-react";
import { Project, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ProjectFilterProps {
  allProjects: Project[];
}

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "Full-Stack & SaaS",
  "Fintech",
  "AI & Machine Learning",
  "Cybersecurity",
  "Community & Initiatives"
];

export function ProjectFilter({ allProjects }: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (statusFilter !== "All" && project.status !== statusFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = project.name.toLowerCase().includes(query);
        const matchesSummary = project.summary.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(query));
        const matchesProblem = project.problemStatement.toLowerCase().includes(query);

        if (!matchesName && !matchesSummary && !matchesTech && !matchesProblem) {
          return false;
        }
      }

      return true;
    });
  }, [allProjects, selectedCategory, statusFilter, searchQuery]);

  const hasActiveFilters = selectedCategory !== "All" || statusFilter !== "All" || searchQuery !== "";

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, technology (e.g. Next.js, PyTorch, Redis), or problem space..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search text"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Quick Filter & Clear */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono">Status:</span>
            {["All", "Live", "Prototype", "Concept"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  statusFilter === st
                    ? "bg-slate-700 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span
              role="status"
              aria-live="polite"
              className="text-slate-400 font-mono text-[11px]"
            >
              Showing {filteredProjects.length} of {allProjects.length} projects
            </span>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setStatusFilter("All");
                  setSearchQuery("");
                }}
                className="text-sky-400 hover:underline text-[11px] font-mono"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <p className="text-slate-300 font-medium">No projects match the selected criteria.</p>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or reset the filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setStatusFilter("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
