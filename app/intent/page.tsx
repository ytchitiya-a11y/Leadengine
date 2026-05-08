"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MOCK_INTENT } from "@/lib/data";
import { urgencyColor, truncate } from "@/lib/utils";
import { Badge, ScoreRing } from "@/components/ui/Badge";
import { Brain, TrendingUp, Zap, AlertTriangle, Filter, RefreshCw, MessageSquare } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import toast from "react-hot-toast";

const TRENDING_PROBLEMS = [
  { text: "Need more customers", count: 34, trend: "+12" },
  { text: "Marketing struggling", count: 28, trend: "+8" },
  { text: "No online presence", count: 22, trend: "+19" },
  { text: "Facebook ads failing", count: 17, trend: "+6" },
  { text: "Hiring automation needed", count: 14, trend: "+3" },
  { text: "Website setup needed", count: 11, trend: "+14" },
];

export default function IntentPage() {
  const [sourceFilter, setSourceFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const filtered = MOCK_INTENT.filter(i =>
    (sourceFilter === "all" || i.source === sourceFilter) &&
    (urgencyFilter === "all" || i.urgency === urgencyFilter)
  );

  const highUrgency = MOCK_INTENT.filter(i => i.urgency === "High").length;
  const avgScore = Math.round(MOCK_INTENT.reduce((s, i) => s + i.intent_score, 0) / MOCK_INTENT.length);

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    toast.success("Intent data refreshed — 8 new signals detected");
  };

  return (
    <AppLayout title="Intent Analysis" subtitle="Business problem signals from Reddit & Facebook">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger">
        <StatCard label="Intent Records" value={MOCK_INTENT.length} icon={<Brain size={16} />} change={22} />
        <StatCard label="High Urgency" value={highUrgency} icon={<AlertTriangle size={16} />} accent="#ff4d6a" change={31} />
        <StatCard label="Avg Intent Score" value={avgScore} icon={<TrendingUp size={16} />} accent="#34d399" suffix="/100" />
        <StatCard label="Active Signals" value={3} icon={<Zap size={16} />} accent="#f5a623" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Intent Cards */}
        <div className="lg:col-span-2">
          <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border flex-wrap">
              <h2 className="text-sm font-semibold font-display text-text-primary flex-1">Intent Signals</h2>

              {/* Filters */}
              <div className="flex gap-1 bg-bg-elevated border border-border rounded-xl p-1">
                {["all", "Reddit", "Facebook"].map(s => (
                  <button key={s} onClick={() => setSourceFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sourceFilter === s ? "bg-accent/15 text-accent" : "text-text-muted hover:text-text-secondary"}`}>
                    {s === "all" ? "All" : s}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 bg-bg-elevated border border-border rounded-xl p-1">
                {["all", "High", "Medium", "Low"].map(u => (
                  <button key={u} onClick={() => setUrgencyFilter(u)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${urgencyFilter === u ? "bg-accent/15 text-accent" : "text-text-muted hover:text-text-secondary"}`}>
                    {u === "all" ? "All" : u}
                  </button>
                ))}
              </div>

              <button onClick={handleRefresh} disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded-xl transition-colors disabled:opacity-60">
                <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                {loading ? "Collecting..." : "Refresh"}
              </button>
            </div>

            <div className="divide-y divide-border/50">
              {filtered.map(item => (
                <div key={item.id} className="px-4 py-4 hover:bg-bg-elevated/40 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <ScoreRing score={item.intent_score} size={44} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary font-medium leading-snug mb-1.5">{item.problem}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={urgencyColor(item.urgency)}>{item.urgency} Urgency</Badge>
                        <span className="text-xs text-text-muted bg-bg-elevated border border-border px-2 py-0.5 rounded-lg">
                          {item.source}{item.subreddit ? ` • r/${item.subreddit}` : ""}
                        </span>
                        <span className="text-xs text-text-muted bg-bg-elevated border border-border px-2 py-0.5 rounded-lg">{item.category}</span>
                        {item.location && <span className="text-xs text-text-muted">📍 {item.location}</span>}
                      </div>
                      {item.keywords && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.keywords.split(",").slice(0, 4).map(kw => (
                            <span key={kw} className="text-[10px] text-text-muted bg-bg-elevated border border-border px-1.5 py-0.5 rounded">#{kw.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2.5 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-xs text-accent transition-all hover:bg-accent/15 flex-shrink-0">
                      <MessageSquare size={10} /> Reach Out
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Trending Problems */}
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold font-display text-text-primary mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-accent" /> Trending Problems
            </h3>
            <div className="space-y-3">
              {TRENDING_PROBLEMS.map((prob, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-muted w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">{prob.text}</span>
                      <span className="text-[10px] text-success">+{prob.trend}</span>
                    </div>
                    <div className="h-1 bg-bg-elevated rounded-full overflow-hidden">
                      <div className="h-full bg-accent/60 rounded-full transition-all"
                        style={{ width: `${(prob.count / 34) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-text-muted w-6 text-right">{prob.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold font-display text-text-primary mb-3 flex items-center gap-2">
              <Zap size={14} className="text-amber-400" /> AI Recommendations
            </h3>
            <div className="space-y-3">
              {[
                { title: "Healthcare Clinics", reason: "72% have no digital presence — act now", color: "blue" },
                { title: "Jodhpur Manufacturers", reason: "Massive untapped cluster — zero competition", color: "amber" },
                { title: "Pune Restaurants", reason: "High intent — weekday marketing gap", color: "emerald" },
              ].map((rec, i) => (
                <div key={i} className="bg-bg-elevated border border-border rounded-xl p-3 hover:border-border-strong transition-colors cursor-pointer">
                  <p className="text-xs font-semibold text-text-primary mb-1">{rec.title}</p>
                  <p className="text-[11px] text-text-muted">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
