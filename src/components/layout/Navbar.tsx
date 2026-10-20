"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { profile } from "@/data/profile";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Handle Escape key to close mobile nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/engineering", label: "Engineering" },
    { href: "/skills", label: "Skills" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/20"
          : "bg-slate-950/60 backdrop-blur-sm border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-slate-100 hover:text-sky-400 transition-colors group"
        >
          <div className="h-8 w-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400/60 transition-colors">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-slate-100">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 -mt-0.5">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-sky-400 bg-sky-500/10 font-semibold"
                    : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Availability Indicator */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to Roles</span>
          </div>
          <Link
            href="/resume"
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <span>Resume</span>
            <ArrowUpRight className="h-3 w-3 text-slate-400" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Open</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-sky-400 bg-sky-500/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 text-sm font-medium rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors"
            >
              View Verified Resume
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
