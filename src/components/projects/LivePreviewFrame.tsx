"use client";

import { useState } from "react";
import { ExternalLink, RefreshCw, Shield, Maximize2, Loader2 } from "lucide-react";

interface LivePreviewFrameProps {
  url: string;
  title: string;
}

export function LivePreviewFrame({ url, title }: LivePreviewFrameProps) {
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleRefresh = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden my-6">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <Shield className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{url}</span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={handleRefresh}
            title="Reload Frame"
            aria-label="Reload Preview"
            className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-sky-400" : ""}`} />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new window"
            aria-label={`Open ${title} in new tab`}
            className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] bg-slate-950">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10 space-y-3">
            <Loader2 className="h-8 w-8 text-sky-400 animate-spin" />
            <p className="text-xs font-mono text-slate-300">
              Loading live instance of {title}...
            </p>
          </div>
        )}

        <iframe
          key={key}
          src={url}
          title={`${title} Live Product Demo`}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0"
          allow="payment; camera; microphone; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      </div>

      {/* Frame Footer */}
      <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span>Active Product Target:</span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
            {url}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
          >
            <span>Open in Fullscreen</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
