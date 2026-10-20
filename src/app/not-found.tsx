import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="h-14 w-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mx-auto flex items-center justify-center">
        <Terminal className="h-7 w-7" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
          404 — Route Not Located
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Requested resource is not in the directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The path you attempted to resolve either does not exist or has been refactored. Check the projects directory or return to the main dashboard.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
        >
          <span>Explore Projects</span>
        </Link>
      </div>
    </div>
  );
}
