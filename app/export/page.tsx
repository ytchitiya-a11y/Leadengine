"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Download, FileText, Table, Zap, Clock, CheckCircle, Loader2, ExternalLink, Trash2 } from "lucide-react";
import { EXPORT_HISTORY } from "@/lib/data";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type ExportFormat = "csv" | "pdf";
type ExportType = "leads" | "intent" | "all";

export default function ExportPage() {
  const [format, setFormat] = useState<ExportFormat>("csv");
  const [type, setType] = useState<ExportType>("leads");
  const [exporting, setExporting] = useState(false);
  const [history, setHistory] = useState(EXPORT_HISTORY);

  const handleExport = async () => {
    setExporting(true);
    await new Promise(r => setTimeout(r, 2000));
    setExporting(false);
    const newExport = {
      id: Date.now(),
      name: `${type}_export_${new Date().toISOString().slice(0, 10)}.${format}`,
      type: format.toUpperCase(),
      size: format === "pdf" ? "1.1 MB" : "38 KB",
      leads: 48,
      created_at: new Date().toLocaleString("en-IN"),
      url: "#",
    };
    setHistory(h => [newExport, ...h]);
    toast.success(`✓ ${format.toUpperCase()} exported successfully`);
  };

  return (
    <AppLayout title="Export Center" subtitle="Download lead reports as CSV or PDF">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Export Config */}
        <div className="space-y-4">
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold font-display text-text-primary mb-4 flex items-center gap-2">
              <Download size={14} className="text-accent" /> Export Options
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-2">File Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: "csv", label: "CSV", icon: Table, desc: "Spreadsheet format" },
                    { id: "pdf", label: "PDF", icon: FileText, desc: "Formatted report" },
                  ] as const).map(f => (
                    <button key={f.id} onClick={() => setFormat(f.id)}
                      className={cn("p-4 rounded-xl border text-left transition-all",
                        format === f.id ? "bg-accent/10 border-accent/30" : "border-border hover:border-border-strong"
                      )}>
                      <f.icon size={18} className={format === f.id ? "text-accent mb-2" : "text-text-muted mb-2"} />
                      <p className={cn("text-sm font-semibold", format === f.id ? "text-accent" : "text-text-primary")}>{f.label}</p>
                      <p className="text-[11px] text-text-muted">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-muted mb-2">Export Content</label>
                <div className="space-y-2">
                  {([
                    { id: "leads", label: "Leads Only", desc: "All scored business leads" },
                    { id: "intent", label: "Intent Data", desc: "Reddit/Facebook signals" },
                    { id: "all", label: "Everything", desc: "Complete report" },
                  ] as const).map(t => (
                    <button key={t.id} onClick={() => setType(t.id)}
                      className={cn("w-full flex items-center justify-between p-3 rounded-xl border transition-all",
                        type === t.id ? "bg-accent/10 border-accent/30" : "border-border hover:border-border-strong"
                      )}>
                      <div className="text-left">
                        <p className={cn("text-sm font-medium", type === t.id ? "text-accent" : "text-text-primary")}>{t.label}</p>
                        <p className="text-[11px] text-text-muted">{t.desc}</p>
                      </div>
                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        type === t.id ? "border-accent" : "border-border"
                      )}>
                        {type === t.id && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3 bg-bg-elevated border border-border rounded-xl text-xs text-text-muted mb-3 space-y-1.5">
                  <div className="flex justify-between"><span>Total leads</span><span className="text-text-primary font-mono">248</span></div>
                  <div className="flex justify-between"><span>HOT leads</span><span className="text-red-400 font-mono">67</span></div>
                  <div className="flex justify-between"><span>Estimated size</span><span className="text-text-primary font-mono">{format === "pdf" ? "~1.1 MB" : "~42 KB"}</span></div>
                </div>

                <button onClick={handleExport} disabled={exporting}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all shadow-glow-sm disabled:opacity-60">
                  {exporting ? (
                    <><Loader2 size={15} className="animate-spin" /> Generating...</>
                  ) : (
                    <><Download size={15} /> Export {format.toUpperCase()}</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-xs text-text-muted uppercase tracking-wider font-medium mb-3">Export Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Total exports", value: "18", icon: Download },
                { label: "Storage used", value: "12.4 MB", icon: FileText },
                { label: "Last export", value: "Today 2:22pm", icon: Clock },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <stat.icon size={12} />
                    {stat.label}
                  </div>
                  <span className="text-xs font-mono text-text-secondary">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export History */}
        <div className="lg:col-span-2">
          <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold font-display text-text-primary">Export History</h2>
              <p className="text-xs text-text-muted mt-0.5">All previously exported files — stored in Cloudinary</p>
            </div>
            <div className="divide-y divide-border/50">
              {history.map(file => (
                <div key={file.id} className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/40 transition-colors group">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                    file.type === "PDF" ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"
                  )}>
                    {file.type === "PDF"
                      ? <FileText size={16} className="text-red-400" />
                      : <Table size={16} className="text-green-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{file.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-text-muted">{file.size}</span>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs text-text-muted">{file.leads} leads</span>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs text-text-muted">{file.created_at}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg bg-bg-elevated border border-border text-text-muted hover:text-text-primary transition-colors">
                      <ExternalLink size={13} />
                    </button>
                    <button className="p-2 rounded-lg bg-bg-elevated border border-border text-text-muted hover:text-danger transition-colors"
                      onClick={() => setHistory(h => h.filter(x => x.id !== file.id))}>
                      <Trash2 size={13} />
                    </button>
                    <a href={file.url} download
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-xs text-accent hover:bg-accent/15 transition-colors">
                      <Download size={11} /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
