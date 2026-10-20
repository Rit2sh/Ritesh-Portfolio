import { ProjectCategory } from "@/data/projects";

interface CategoryBadgeProps {
  category: ProjectCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
      {category}
    </span>
  );
}
