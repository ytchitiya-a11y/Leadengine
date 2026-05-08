"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Cloud, FileText, Table, Trash2, ExternalLink, Copy, Upload, HardDrive } from "lucide-react";
import { EXPORT_HISTORY } from "@/lib/data";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function StoragePage() {
  const [files, setFiles] = useState(EXPORT_HISTORY);

  const totalSize = "12.4 MB";
  const usedPercent = 5; // out of 25GB free tier

  return (
    <AppLayout title="File Storage" subtitle="Cloudinary-powered exports and reports storage">
      {/* Storage Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Used Storage", value: totalSize, sub: "of 25 GB", icon: HardDrive, color: "#4f74ff" },
          { label: "Total Files", value: files.length.toString(), sub: "exported files", icon: Cloud, color: "#34d399" },
          { label: "CDN Status", value: "Active", sub: "Cloudinary Free Tier", icon: Cloud, color: "#f5a623" },
        ].map(stat => (
          <div key={stat.label} className="bg-bg-surface border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</p>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: stat.color + "18", border: `1px solid ${stat.color}25` }}>
                <stat.icon size={14} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold font-display text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.sub}</p>
            {stat.label === "Used Storage" && (
              <div className="mt-3 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${usedPercent}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Files Grid */}
      <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold font-display text-text-primary">Stored Files</h2>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-accent text-white rounded-xl text-xs font-medium shadow-glow-sm hover:bg-accent-hover transition-colors">
            <Upload size={12} /> Upload File
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {files.map(file => (
            <div key={file.id} className="group bg-bg-elevated border border-border rounded-xl p-4 hover:border-border-strong transition-all cursor-pointer">
              <div className="flex items-start gap-3 mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                  file.type === "PDF" ? "bg-red-500/10 border-red-500/20" : "bg-emerald-500/10 border-emerald-500/20"
                )}>
                  {file.type === "PDF" ? <FileText size={16} className="text-red-400" /> : <Table size={16} className="text-emerald-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-text-primary truncate">{file.name}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{file.size} · {file.leads} leads</p>
                  <p className="text-[10px] text-text-muted">{file.created_at}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { navigator.clipboard.writeText(file.url); toast.success("Link copied!"); }}
                  className="flex items-center gap-1 px-2 py-1 bg-bg-base border border-border rounded-lg text-[10px] text-text-muted hover:text-text-primary transition-colors">
                  <Copy size={10} /> Copy Link
                </button>
                <button className="flex items-center gap-1 px-2 py-1 bg-bg-base border border-border rounded-lg text-[10px] text-text-muted hover:text-text-primary transition-colors">
                  <ExternalLink size={10} /> Preview
                </button>
                <button onClick={() => { setFiles(f => f.filter(x => x.id !== file.id)); toast.success("File deleted"); }}
                  className="ml-auto p-1 text-text-muted hover:text-danger transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}

          {/* Upload placeholder */}
          <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent/40 hover:bg-accent/3 transition-all group">
            <Cloud size={24} className="text-text-muted group-hover:text-accent transition-colors mb-2" />
            <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">Drop files here or click to upload</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
