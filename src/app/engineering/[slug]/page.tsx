import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar, CheckCircle2, AlertTriangle, Layers, Lightbulb } from "lucide-react";
import { engineeringArticles } from "@/data/articles";
import { constructMetadata } from "@/lib/metadata";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return engineeringArticles.map((a) => ({
    slug: a.slug
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = engineeringArticles.find((a) => a.slug === slug);
  if (!article) return constructMetadata({ title: "Article Not Found" });

  return constructMetadata({
    title: `${article.title} — Engineering Deep Dive`,
    description: article.abstract,
    canonicalUrl: `https://riteshchauhan.dev/engineering/${article.slug}`
  });
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = engineeringArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/engineering"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Engineering Notes</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 pb-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1 text-sky-400 font-medium bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
            <Tag className="h-3 w-3" />
            <span>{article.topic}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{article.readTime}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{article.date}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {article.abstract}
        </p>
      </div>

      {/* The Problem */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <span>Problem Statement & Failure Modes</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {article.problem}
        </p>
      </section>

      {/* Operational Constraints */}
      <section className="space-y-3 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Operational Constraints & Non-Negotiables
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          {article.constraints.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-sky-400 font-mono mt-0.5">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Architectural Alternatives Considered */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Layers className="h-5 w-5 text-sky-400" />
          <span>Alternatives Evaluated</span>
        </h2>
        <div className="space-y-3">
          {article.alternativesConsidered.map((alt, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-slate-100 text-sm">{alt.option}</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                  {alt.outcome}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 pt-1">
                <p>
                  <strong className="text-emerald-400 font-mono">Pros:</strong> {alt.pros}
                </p>
                <p>
                  <strong className="text-red-400 font-mono">Cons:</strong> {alt.cons}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decision and System Architecture */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>Decision & Architectural Implementation</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {article.decisionAndArchitecture}
        </p>
      </section>

      {/* Architectural Trade-offs */}
      <section className="space-y-3 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Accepted Architectural Trade-offs
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          {article.tradeoffs.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-400 font-mono mt-0.5">•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Implementation Evidence */}
      <section className="space-y-2 p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
        <h3 className="text-slate-400 uppercase tracking-wider text-[11px]">
          Concrete Verification & Evidence
        </h3>
        <p className="text-sky-300">{article.implementationEvidence}</p>
      </section>

      {/* Lessons Learned */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          <span>Key Engineering Takeaways</span>
        </h2>
        <ul className="space-y-2 text-xs text-slate-300">
          {article.lessonsLearned.map((l, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-yellow-400 font-mono mt-0.5">•</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer navigation */}
      <div className="pt-8 flex items-center justify-between border-t border-slate-800">
        <Link
          href="/engineering"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Engineering Articles</span>
        </Link>
        <Link
          href="/contact"
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors"
        >
          Discuss Technical Trade-offs
        </Link>
      </div>
    </article>
  );
}
