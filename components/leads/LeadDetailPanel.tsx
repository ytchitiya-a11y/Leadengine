"use client";
import { type Lead } from "@/lib/data";
import { PriorityBadge, ScoreRing, Badge } from "@/components/ui/Badge";
import { statusBadge, scoreColor } from "@/lib/utils";
import { X, Globe, Phone, Mail, MapPin, Star, MessageSquare, Zap, ExternalLink } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props { lead: Lead; onClose: () => void; }

export default function LeadDetailPanel({ lead, onClose }: Props) {
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1400));
    setMessage(`Hi ${lead.business_name} team,\n\nI noticed that ${lead.intent_summary || "your business might benefit from a stronger digital presence"}. We help ${lead.category} businesses like yours generate consistent leads through targeted digital strategies.\n\nWould you be open to a quick 15-minute call this week? I'd love to share what's working specifically for ${lead.category} businesses in ${lead.location.split(",")[0]}.\n\nLooking forward to connecting!`);
    setGenerating(false);
  };

  return (
    <div className="w-80 bg-bg-surface border border-border rounded-2xl overflow-hidden flex flex-col animate-slide-right flex-shrink-0">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-sm font-bold text-text-secondary">
            {lead.business_name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary leading-none">{lead.business_name}</p>
            <p className="text-xs text-text-muted mt-0.5">{lead.category}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Score section */}
        <div className="px-4 py-4 flex items-center gap-4 border-b border-border">
          <div className="text-center">
            <ScoreRing score={lead.score} size={54} />
            <p className="text-[10px] text-text-muted mt-1">Lead Score</p>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Priority</span>
              <PriorityBadge priority={lead.priority} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Status</span>
              <Badge className={statusBadge(lead.status)}>{lead.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Source</span>
              <span className="text-xs text-text-secondary">{lead.source}</span>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="px-4 py-3 border-b border-border space-y-2.5">
          <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Contact Info</p>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <MapPin size={12} className="text-text-muted flex-shrink-0" />
            {lead.location}
          </div>
          {lead.phone && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Phone size={12} className="text-text-muted flex-shrink-0" />
              {lead.phone}
            </div>
          )}
          {lead.website ? (
            <a href={lead.website} target="_blank" className="flex items-center gap-2 text-xs text-accent hover:underline">
              <Globe size={12} className="flex-shrink-0" />
              {lead.website.replace("https://", "")}
              <ExternalLink size={10} />
            </a>
          ) : (
            <div className="flex items-center gap-2 text-xs text-danger">
              <Globe size={12} className="flex-shrink-0" />
              No website detected
            </div>
          )}
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs">
              <Star size={11} className="text-amber-400" fill="currentColor" />
              <span className="text-text-secondary">{lead.rating}</span>
              <span className="text-text-muted">({lead.reviews} reviews)</span>
            </div>
          )}
        </div>

        {/* AI Reason */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs text-text-muted uppercase tracking-wider font-medium mb-2">AI Analysis</p>
          <div className="bg-bg-elevated border border-border rounded-xl p-3 text-xs text-text-secondary leading-relaxed">
            <Zap size={11} className="text-accent inline mr-1.5" />
            {lead.reason}
          </div>
          {lead.intent_summary && (
            <div className="mt-2 bg-red-500/5 border border-red-500/15 rounded-xl p-3 text-xs text-red-300 leading-relaxed">
              🎯 Intent Signal: {lead.intent_summary}
            </div>
          )}
        </div>

        {/* Tags */}
        {lead.tags.length > 0 && (
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs text-text-muted uppercase tracking-wider font-medium mb-2">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {lead.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-bg-elevated border border-border rounded-lg text-text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Message Generator */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted uppercase tracking-wider font-medium">AI Outreach</p>
            <button onClick={handleGenerate} disabled={generating}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-xs text-accent hover:bg-accent/15 transition-colors disabled:opacity-60">
              {generating ? (
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-accent rounded-full animate-ping" /> Generating...</span>
              ) : (
                <><MessageSquare size={10} /> Generate</>
              )}
            </button>
          </div>
          {message && (
            <div className="bg-bg-elevated border border-border rounded-xl p-3 text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
              {message}
              <button
                onClick={() => { navigator.clipboard.writeText(message); toast.success("Copied!"); }}
                className="mt-2 w-full py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-accent text-xs hover:bg-accent/15 transition-colors"
              >
                Copy Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
