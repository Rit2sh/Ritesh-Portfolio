import Link from "next/link";
import { Mail, ArrowUpRight, Terminal, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/70 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-100 font-semibold tracking-tight hover:text-sky-400 transition-colors">
              <Terminal className="h-4 w-4 text-sky-400" />
              <span>{profile.name}</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Software engineer and product builder interested in creating practical technology products that solve real problems. Focused on maintainability, security, performance, and user experience.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
                aria-label="Email Ritesh"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://thebtechguy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <span>TheBTechGuy</span>
                <ArrowUpRight className="h-3 w-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200">Navigation</h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/projects" className="hover:text-slate-200 transition-colors">
                  Projects Catalog
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-slate-200 transition-colors">
                  Engineering Notes
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-slate-200 transition-colors">
                  Skills & Capabilities
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-slate-200 transition-colors">
                  Experience & Background
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-200 transition-colors">
                  Engineering Philosophy
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-slate-200 transition-colors">
                  Verified Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Products */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200">Key Projects</h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/projects/payglow" className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <span>PayGlow</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/stockly" className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <span>Stockly</span>
                  <span className="text-[10px] text-sky-400 font-mono">Prototype</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/trustlens" className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <span>TrustLens</span>
                  <span className="text-[10px] text-sky-400 font-mono">Prototype</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/smart-ddos-shield" className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <span>Smart DDoS Shield</span>
                  <span className="text-[10px] text-sky-400 font-mono">Prototype</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/thebtechguy" className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <span>TheBTechGuy</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Integrity Statement */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>
              Engineered with empirical evidence, strict system design, and verified project ownership.
            </span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-xl">
            Target tech employers mentioned in applications are aspirational engineering benchmarks, not claimed past employers or endorsements.
          </p>
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-400">
          © 2026 Ritesh Chauhan. All original projects owned and engineered by Ritesh Chauhan.
        </div>
      </div>
    </footer>
  );
}
