import { ProjectArchitectureStep } from "@/data/projects";
import { ArrowDown, Cpu, Database, Globe, Shield, Terminal } from "lucide-react";

interface ArchitectureDiagramProps {
  steps: ProjectArchitectureStep[];
  title?: string;
}

export function ArchitectureDiagram({ steps, title = "System Architecture & Data Flow" }: ArchitectureDiagramProps) {
  const getLayerIcon = (layer: string) => {
    const l = layer.toLowerCase();
    if (l.includes("client") || l.includes("ui") || l.includes("presentation")) return <Globe className="h-4 w-4 text-sky-400" />;
    if (l.includes("api") || l.includes("validation") || l.includes("proxy")) return <Terminal className="h-4 w-4 text-emerald-400" />;
    if (l.includes("model") || l.includes("inference") || l.includes("heuristic") || l.includes("engine")) return <Cpu className="h-4 w-4 text-purple-400" />;
    if (l.includes("data") || l.includes("persistence") || l.includes("storage")) return <Database className="h-4 w-4 text-amber-400" />;
    return <Shield className="h-4 w-4 text-indigo-400" />;
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 my-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <span>{title}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Sequential flow, boundary isolation, and component responsibilities
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          Component Pipeline
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-lg bg-slate-900/90 border border-slate-800/90 hover:border-slate-700/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center flex-shrink-0">
                  {getLayerIcon(step.layer)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      {step.layer}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">|</span>
                    <span className="text-xs font-semibold text-slate-200">
                      {step.component}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {step.role}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded flex-shrink-0">
                Stage 0{idx + 1}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex justify-center my-1.5 text-slate-600">
                <ArrowDown className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
