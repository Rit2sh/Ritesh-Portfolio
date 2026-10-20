import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/contact/ContactForm";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Engineering Inquiries",
  description:
    "Get in touch with Ritesh Chauhan for software engineering roles, full-stack development, and technical collaboration.",
  canonicalUrl: "https://riteshchauhan.dev/contact"
});

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400">
          Direct Communication
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
          Let&apos;s build something meaningful.
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
          I&apos;m interested in software engineering opportunities, product builder roles, and technically challenging backend and full-stack systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Mail className="h-4 w-4 text-sky-400" />
              <span>Direct Channels</span>
            </h2>

            <div className="space-y-3 text-xs font-mono">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors p-2 rounded-lg bg-slate-950 border border-slate-800/80"
              >
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="truncate">{profile.email}</span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors p-2 rounded-lg bg-slate-950 border border-slate-800/80"
              >
                <GithubIcon className="h-4 w-4 text-slate-500" />
                <span>github.com/Rit2sh</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors p-2 rounded-lg bg-slate-950 border border-slate-800/80"
              >
                <LinkedinIcon className="h-4 w-4 text-slate-500" />
                <span>linkedin.com/in/ritesh-chauhan</span>
              </a>

              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors p-2 rounded-lg bg-slate-950 border border-slate-800/80"
                >
                  <TwitterIcon className="h-4 w-4 text-slate-500" />
                  <span>@ritesh_builds</span>
                </a>
              )}
            </div>
          </div>

          {/* Availability Card */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Current Status: {profile.availability.status}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Target roles: Software Engineer, Full-Stack Engineer, Backend Systems, and AI Product Engineer.
            </p>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] pt-1">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              <span>{profile.location} (Remote / Relocation)</span>
            </div>
          </div>
        </div>

        {/* Contact Form Main */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
