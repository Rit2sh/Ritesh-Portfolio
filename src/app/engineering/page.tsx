import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { engineeringArticles } from "@/data/articles";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Notes & System Design Records",
  description:
    "Technical articles and architectural decision records on payment idempotency, grounded AI financial RAG, multimodal deepfake forensics, and volumetric rate limiting.",
  canonicalUrl: "https://riteshchauhan.dev/engineering"
});

export default function EngineeringPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400">
          Architecture & System Design
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
          Engineering Notes
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Detailed technical write-ups covering real architectural trade-offs, state machines, and system boundary decisions grounded in actual code.
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {engineeringArticles.map((article) => (
          <article
            key={article.slug}
            className="group p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-sky-400 font-medium">
                <Tag className="h-3 w-3" />
                <span>{article.topic}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime}</span>
              </span>
              <span>•</span>
              <span>{article.date}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
              <Link href={`/engineering/${article.slug}`}>{article.title}</Link>
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {article.abstract}
            </p>

            <div className="pt-2">
              <Link
                href={`/engineering/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 group-hover:text-sky-300 font-mono"
              >
                <span>Read Architectural Case Study</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
