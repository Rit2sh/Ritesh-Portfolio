import { ProjectStatus } from "@/data/projects";

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const styles: Record<ProjectStatus, { bg: string; dot: string; label: string }> = {
    Live: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      label: "Live / Deployed"
    },
    "In Development": {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
      label: "In Development"
    },
    Prototype: {
      bg: "bg-sky-500/10 border-sky-500/30 text-sky-300",
      dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
      label: "Working Prototype"
    },
    Concept: {
      bg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
      dot: "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]",
      label: "Architectural Concept"
    }
  };

  const current = styles[status];
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium tracking-wide ${current.bg} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
}
