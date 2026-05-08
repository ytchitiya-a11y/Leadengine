"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Search, MapPin, Building2, Globe, Linkedin, MessageCircle, Facebook, Play, Brain, CheckCircle, Loader2, ChevronRight } from "lucide-react";
import { PriorityBadge, ScoreRing } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const INDUSTRIES = ["All", "Healthcare", "F&B", "Technology", "Retail", "Legal", "Real Estate", "Logistics", "Manufacturing", "Education", "Finance"];
const SOURCES = [
  { id: "google", label: "Google Maps", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
  { id: "reddit", label: "Reddit", icon: MessageCircle, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
];

const MOCK_RESULTS = [
  { business_name: "Alpha Dental Clinic", category: "Healthcare", location: "Mumbai", score: 91, priority: "HOT" as const, website: false, phone: true },
  { business_name: "QuickFix Auto Repair", category: "Automotive", location: "Chennai", score: 88, priority: "HOT" as const, website: false, phone: false },
  { business_name: "City Gym & Fitness", category: "Wellness", location: "Bangalore", score: 85, priority: "HOT" as const, website: false, phone: false },
  { business_name: "Nagpur Salon Hub", category: "Beauty", location: "Nagpur", score: 82, priority: "HOT" as const, website: false, phone: true },
  { business_name: "MediCare Pharmacy", category: "Healthcare", location: "Kolkata", score: 74, priority: "HOT" as const, website: false, phone: true },
  { business_name: "GreenLeaf Restaurant", category: "F&B", location: "Delhi", score: 52, priority: "WARM" as const, website: true, phone: true },
];

type Stage = "idle" | "collecting" | "analyzing" | "done";

export default function CollectPage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("All");
  const [sources, setSources] = useState<string[]>(["google"]);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [currentSource, setCurrentSource] = useState("");

  const toggleSource = (id: string) =>
    setSources(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleCollect = async () => {
    if (!keyword) { toast.error("Enter a search keyword"); return; }
    setStage("collecting");
    setProgress(0);

    const sourceNames = SOURCES.filter(s => sources.includes(s.id)).map(s => s.label);
    for (let i = 0; i < sourceNames.length; i++) {
      setCurrentSource(sourceNames[i]);
      for (let p = 0; p <= 100; p += 5) {
        await new Promise(r => setTimeout(r, 40));
        setProgress(Math.round(((i + p / 100) / sourceNames.length) * 70));
      }
    }

    setStage("analyzing");
    setCurrentSource("AI Scoring Engine");
    for (let p = 70; p <= 100; p += 2) {
      await new Promise(r => setTimeout(r, 30));
      setProgress(p);
    }

    setStage("done");
    toast.success(`✓ ${MOCK_RESULTS.length} leads collected & scored`);
  };

  const reset = () => { setStage("idle"); setProgress(0); setKeyword(""); setLocation(""); };

  return (
    <AppLayout title="Data Collection" subtitle="Collect & analyze leads from multiple sources">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Search Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold font-display text-text-primary mb-4 flex items-center gap-2">
              <Search size={14} className="text-accent" /> Search Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Keyword / Business Type</label>
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input className="input-base pl-9" placeholder="e.g. dental clinics, restaurants..." value={keyword} onChange={e => setKeyword(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-muted mb-1.5">Location</label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input className="input-base pl-9" placeholder="Mumbai, Delhi, Bangalore..." value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-muted mb-1.5">Industry</label>
                <div className="flex flex-wrap gap-1.5">
                  {INDUSTRIES.map(ind => (
                    <button key={ind} onClick={() => setIndustry(ind)}
                      className={cn("px-2.5 py-1 rounded-lg text-xs transition-all border",
                        industry === ind ? "bg-accent/15 text-accent border-accent/30" : "border-border text-text-muted hover:text-text-secondary hover:border-border-strong"
                      )}>
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-muted mb-2">Data Sources</label>
                <div className="space-y-2">
                  {SOURCES.map(src => (
                    <button key={src.id} onClick={() => toggleSource(src.id)}
                      className={cn("w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                        sources.includes(src.id) ? src.bg : "border-border hover:border-border-strong"
                      )}>
                      <src.icon size={15} className={sources.includes(src.id) ? src.color : "text-text-muted"} />
                      <span className={cn("text-sm font-medium flex-1", sources.includes(src.id) ? "text-text-primary" : "text-text-secondary")}>
                        {src.label}
                      </span>
                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                        sources.includes(src.id) ? "border-accent bg-accent" : "border-border"
                      )}>
                        {sources.includes(src.id) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button onClick={handleCollect} disabled={stage === "collecting" || stage === "analyzing"}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all shadow-glow-sm disabled:opacity-60">
                  {(stage === "collecting" || stage === "analyzing") ? (
                    <><Loader2 size={14} className="animate-spin" /> Collecting...</>
                  ) : (
                    <><Play size={14} /> Start Collection</>
                  )}
                </button>
                <button className="px-4 py-2.5 bg-bg-elevated border border-border rounded-xl text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                  <Brain size={14} /> AI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress */}
          {(stage === "collecting" || stage === "analyzing") && (
            <div className="bg-bg-surface border border-border rounded-2xl p-5 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center">
                    <Loader2 size={14} className="text-accent animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {stage === "collecting" ? "Scanning sources..." : "AI analyzing leads..."}
                    </p>
                    <p className="text-xs text-text-muted">{currentSource}</p>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-accent">{progress}%</span>
              </div>
              <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-violet-500 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }} />
              </div>
              <div className="flex gap-4 mt-3">
                {SOURCES.filter(s => sources.includes(s.id)).map((src, i) => (
                  <div key={src.id} className={cn("flex items-center gap-1.5 text-xs",
                    progress > (i + 1) * (70 / sources.length) ? "text-success" : "text-text-muted"
                  )}>
                    {progress > (i + 1) * (70 / sources.length)
                      ? <CheckCircle size={11} /> : <Loader2 size={11} className="animate-spin" />}
                    {src.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Table */}
          {stage === "done" && (
            <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={16} className="text-success" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{MOCK_RESULTS.length} leads collected</p>
                    <p className="text-xs text-text-muted">AI scored & ranked</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={reset} className="px-3 py-1.5 bg-bg-elevated border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors">New Search</button>
                  <button className="px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-medium shadow-glow-sm">Save All</button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-bg-elevated/40">
                    {["Business", "Category", "Score", "Priority", "Website"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs text-text-muted uppercase tracking-wider border-b border-border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {MOCK_RESULTS.map((r, i) => (
                    <tr key={i} className="table-row-hover cursor-pointer">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-text-primary">{r.business_name}</p>
                        <p className="text-xs text-text-muted">{r.location}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-secondary">{r.category}</td>
                      <td className="px-4 py-3"><ScoreRing score={r.score} size={36} /></td>
                      <td className="px-4 py-3"><PriorityBadge priority={r.priority} /></td>
                      <td className="px-4 py-3">
                        {r.website
                          ? <span className="text-xs text-success">✓ Has website</span>
                          : <span className="text-xs text-danger">✗ No website</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {stage === "idle" && (
            <div className="bg-bg-surface border border-border rounded-2xl p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold font-display text-text-primary mb-2">Ready to collect leads</h3>
              <p className="text-sm text-text-muted max-w-xs mx-auto">
                Configure your search parameters and hit Start Collection to begin mining leads with AI scoring.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
