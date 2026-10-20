"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ContactFormData, validateContactForm } from "@/lib/validation";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    opportunityType: "Full-Time Software Engineering",
    message: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          result.error ||
            "Unable to deliver message automatically. Please email me directly using the address below."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network connection error. Please email me directly using the address below."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-white">Message Dispatched Successfully</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Thank you for reaching out. I personally review all technical and recruitment inquiries and will respond promptly to <span className="text-sky-300 font-mono">{formData.email}</span>.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              company: "",
              opportunityType: "Full-Time Software Engineering",
              message: ""
            });
          }}
          className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-950/30 border border-red-500/30 text-red-200 text-xs flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice</p>
            <p className="mt-0.5">{errorMessage}</p>
            <a
              href={`mailto:${profile.email}?subject=Opportunity Inquiry from Portfolio`}
              className="inline-flex items-center gap-1 mt-2 text-sky-400 hover:underline font-mono"
            >
              <span>Send directly via email client</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ada Lovelace"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-800 focus:border-sky-500 focus:ring-sky-500"
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-400 font-mono">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
            Your Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ada@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-800 focus:border-sky-500 focus:ring-sky-500"
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400 font-mono">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Company and Opportunity Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-xs font-mono text-slate-300 mb-1.5">
            Company / Organization <span className="text-slate-500">(Optional)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Stripe, Google, Tech Startup, etc."
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div>
          <label htmlFor="opportunityType" className="block text-xs font-mono text-slate-300 mb-1.5">
            Topic / Opportunity Type
          </label>
          <select
            id="opportunityType"
            name="opportunityType"
            value={formData.opportunityType}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          >
            <option value="Full-Time Software Engineering">Full-Time Software Engineering</option>
            <option value="Full-Stack Developer Role">Full-Stack Developer Role</option>
            <option value="Backend Systems Role">Backend Systems Role</option>
            <option value="AI / Product Engineering">AI / Product Engineering</option>
            <option value="Technical Collaboration">Technical Collaboration / Open Source</option>
            <option value="General Technical Inquiry">General Technical Inquiry</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe the role, problem statement, team, or technical collaboration..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
            errors.message
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-slate-800 focus:border-sky-500 focus:ring-sky-500"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-400 font-mono">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-950/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {status === "submitting" ? (
            <>
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Validating & Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 font-mono transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Or email {profile.email}</span>
        </a>
      </div>
    </form>
  );
}
