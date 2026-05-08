"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MessageSquare, RefreshCw, Copy, Mail, Linkedin, MessageCircle, Zap, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const TONES = [
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "friendly", label: "Friendly", emoji: "😊" },
  { id: "aggressive", label: "Aggressive", emoji: "🔥" },
  { id: "consultative", label: "Consultative", emoji: "🧠" },
];

const OUTPUT_TYPES = [
  { id: "email", label: "Email", icon: Mail },
  { id: "linkedin", label: "LinkedIn DM", icon: Linkedin },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
];

const SAMPLE_OUTPUTS = {
  email: {
    subject: "Quick idea for {{business}} — more patients online",
    body: `Hi {{business}} team,

I came across your listing and noticed you might be looking for help with {{intent}}.

We help {{category}} businesses like yours generate consistent leads through targeted digital strategies — without wasting money on ads that don't convert.

Many of our clients went from 3–5 enquiries/week to 20+ within 60 days.

I'd love to share exactly what's working for {{category}} businesses in {{location}}. Would you be open to a 15-minute call this week?

Looking forward to connecting!`,
  },
  linkedin: {
    subject: "LinkedIn DM",
    body: `Hi there,

I noticed {{business}} is growing and might benefit from a stronger lead pipeline.

We specialize in helping {{category}} businesses attract more clients through AI-driven outreach — specifically addressing {{intent}}.

Quick question: would you be open to exploring what that might look like for {{business}}?`,
  },
  whatsapp: {
    subject: "WhatsApp Message",
    body: `Hi! I'm reaching out about {{business}}.

We help {{category}} businesses solve exactly what you're dealing with — {{intent}}.

Results in 30 days or your money back. Interested in a quick chat? 🚀`,
  },
};

export default function MessagesPage() {
  const [form, setForm] = useState({ business: "", category: "", intent: "", location: "" });
  const [tone, setTone] = useState("professional");
  const [outputType, setOutputType] = useState("email");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<{ subject: string; body: string } | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const fillTemplate = (tpl: string) => {
    return tpl
      .replace(/\{\{business\}\}/g, form.business || "your business")
      .replace(/\{\{category\}\}/g, form.category || "your industry")
      .replace(/\{\{intent\}\}/g, form.intent || "growing your client base")
      .replace(/\{\{location\}\}/g, form.location || "your area");
  };

  const handleGenerate = async () => {
    if (!form.business) { toast.error("Enter a business name"); return; }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1600));
    const tpl = SAMPLE_OUTPUTS[outputType as keyof typeof SAMPLE_OUTPUTS];
    setOutput({ subject: fillTemplate(tpl.subject), body: fillTemplate(tpl.body) });
    setGenerating(false);
    toast.success("Message generated!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <AppLayout title="AI Message Generator" subtitle="Generate personalized outreach messages in seconds">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold font-display text-text-primary mb-4 flex items-center gap-2">
              <Zap size={14} className="text-accent" /> Lead Details
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Business Name *</label>
                <input className="input-base" placeholder="Alpha Dental Clinic" value={form.business} onChange={set("business")} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-text-muted mb-1.5">Category</label>
                  <input className="input-base" placeholder="Healthcare" value={form.category} onChange={set("category")} />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1.5">Location</label>
                  <input className="input-base" placeholder="Mumbai" value={form.location} onChange={set("location")} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Intent / Problem Detected</label>
                <textarea className="input-base resize-none h-20" placeholder="Needs more patients, has no website..." value={form.intent} onChange={set("intent")} />
              </div>
            </div>
          </div>

          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold font-display text-text-primary mb-3">Message Tone</h2>
            <div className="grid grid-cols-2 gap-2">
              {TONES.map(t => (
                <button key={t.id} onClick={() => setTone(t.id)}
                  className={cn("flex items-center gap-2 p-3 rounded-xl border text-left transition-all",
                    tone === t.id ? "bg-accent/10 border-accent/30 text-accent" : "border-border text-text-secondary hover:border-border-strong"
                  )}>
                  <span className="text-base">{t.emoji}</span>
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold font-display text-text-primary mb-3">Output Type</h2>
            <div className="flex gap-2">
              {OUTPUT_TYPES.map(ot => (
                <button key={ot.id} onClick={() => setOutputType(ot.id)}
                  className={cn("flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl border text-sm font-medium transition-all",
                    outputType === ot.id ? "bg-accent/10 border-accent/30 text-accent" : "border-border text-text-secondary hover:border-border-strong"
                  )}>
                  <ot.icon size={14} />
                  {ot.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGenerate} disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all shadow-glow-sm disabled:opacity-60">
            {generating ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
            ) : (
              <><MessageSquare size={15} /> Generate Message</>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          {output ? (
            <div className="bg-bg-surface border border-border rounded-2xl p-5 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold font-display text-text-primary flex items-center gap-2">
                  <MessageSquare size={14} className="text-accent" /> Generated Message
                </h2>
                <div className="flex gap-2">
                  <button onClick={handleGenerate}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors">
                    <RefreshCw size={11} /> Regenerate
                  </button>
                </div>
              </div>

              {outputType === "email" && (
                <div className="mb-3">
                  <label className="block text-xs text-text-muted mb-1.5">Subject Line</label>
                  <div className="flex items-center gap-2 p-3 bg-bg-elevated border border-border rounded-xl">
                    <span className="text-sm text-text-primary flex-1">{output.subject}</span>
                    <button onClick={() => copyToClipboard(output.subject)}
                      className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0">
                      <Copy size={13} />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs text-text-muted mb-1.5">Message Body</label>
                <div className="relative">
                  <textarea
                    value={output.body}
                    onChange={e => setOutput(o => o ? { ...o, body: e.target.value } : o)}
                    className="input-base resize-none h-64 text-sm leading-relaxed"
                  />
                  <button onClick={() => copyToClipboard(output.body)}
                    className="absolute top-3 right-3 p-2 bg-bg-base border border-border rounded-lg text-text-muted hover:text-text-primary transition-colors">
                    <Copy size={12} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button onClick={() => copyToClipboard(output.body)}
                  className="flex items-center justify-center gap-2 py-2.5 bg-bg-elevated border border-border rounded-xl text-sm text-text-secondary hover:text-text-primary transition-colors">
                  <Copy size={13} /> Copy Message
                </button>
                <button onClick={() => toast.success("Outreach email scheduled!")}
                  className="flex items-center justify-center gap-2 py-2.5 bg-accent text-white rounded-xl text-sm font-medium shadow-glow-sm hover:bg-accent-hover transition-colors">
                  <Mail size={13} /> Send Email
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-bg-surface border border-border rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold font-display text-text-primary mb-2">AI Message Ready</h3>
              <p className="text-sm text-text-muted max-w-xs">
                Fill in the lead details and click Generate to create a personalized outreach message.
              </p>
            </div>
          )}

          {/* Saved Templates */}
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold font-display text-text-primary mb-3">Quick Templates</h3>
            <div className="space-y-2">
              {[
                { name: "Healthcare — No Website", category: "Healthcare" },
                { name: "Restaurant — Low Footfall", category: "F&B" },
                { name: "Generic Lead Gen", category: "General" },
              ].map((tpl, i) => (
                <button key={i}
                  onClick={() => toast.success(`Template "${tpl.name}" loaded`)}
                  className="w-full flex items-center justify-between p-3 bg-bg-elevated border border-border rounded-xl hover:border-border-strong transition-colors">
                  <div className="text-left">
                    <p className="text-xs font-medium text-text-primary">{tpl.name}</p>
                    <p className="text-[11px] text-text-muted">{tpl.category}</p>
                  </div>
                  <ChevronDown size={12} className="text-text-muted -rotate-90" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
