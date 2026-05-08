"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Mail, Send, Plus, Eye, Trash2, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { EMAIL_TEMPLATES } from "@/lib/data";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const SENT_EMAILS = [
  { id: 1, to: "alpha@dental.in", subject: "Quick idea for Alpha Dental — more patients", status: "opened", time: "2h ago" },
  { id: 2, to: "quickfix@auto.com", subject: "Getting more customers for QuickFix Auto", status: "delivered", time: "5h ago" },
  { id: 3, to: "greenleaf@food.in", subject: "Simple fix for GreenLeaf's weekday bookings", status: "opened", time: "Yesterday" },
  { id: 4, to: "swiftdeliver@log.in", subject: "Growth strategy for SwiftDeliver", status: "bounced", time: "2 days ago" },
];

export default function EmailPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState<"templates" | "sent">("templates");

  const handleSendTest = async () => {
    if (!testEmail) { toast.error("Enter an email address"); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    toast.success(`Test email sent to ${testEmail}`);
    setTestEmail("");
  };

  const statusStyle = (s: string) => ({
    opened: "text-success bg-success/10 border-success/20",
    delivered: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    bounced: "text-danger bg-danger/10 border-danger/20",
  }[s] || "text-text-muted");

  return (
    <AppLayout title="Email Center" subtitle="Manage templates and sent outreach emails">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="flex border-b border-border">
              {(["templates", "sent"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={cn("flex-1 py-3 text-sm font-medium transition-colors",
                    activeTab === tab ? "text-accent border-b-2 border-accent bg-accent/5" : "text-text-muted hover:text-text-secondary"
                  )}>
                  {tab === "templates" ? "Email Templates" : "Sent Emails"}
                </button>
              ))}
            </div>

            {activeTab === "templates" && (
              <div className="p-4 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-text-muted hover:text-text-primary hover:border-border-strong transition-colors">
                  <Plus size={14} /> Create New Template
                </button>
                {EMAIL_TEMPLATES.map(tpl => (
                  <div key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id === selectedTemplate ? null : tpl.id)}
                    className={cn("p-4 rounded-xl border cursor-pointer transition-all",
                      selectedTemplate === tpl.id ? "border-accent/40 bg-accent/5" : "border-border hover:border-border-strong"
                    )}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-text-primary">{tpl.name}</p>
                          <span className="text-[10px] bg-bg-elevated border border-border text-text-muted px-2 py-0.5 rounded-full">{tpl.category}</span>
                        </div>
                        <p className="text-xs text-text-muted mb-2">{tpl.subject}</p>
                        <p className="text-xs text-text-secondary">{tpl.preview}</p>
                      </div>
                      <span className="text-[10px] text-text-muted flex-shrink-0">Used {tpl.used}×</span>
                    </div>
                    {selectedTemplate === tpl.id && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors">
                          <Eye size={11} /> Preview
                        </button>
                        <button onClick={() => toast.success("Template used!")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-medium">
                          <Send size={11} /> Use Template
                        </button>
                        <button className="ml-auto p-1.5 text-text-muted hover:text-danger transition-colors rounded-lg">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "sent" && (
              <div className="divide-y divide-border/50">
                {SENT_EMAILS.map(email => (
                  <div key={email.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-bg-elevated/40 transition-colors">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border",
                      email.status === "opened" ? "bg-success/10 border-success/20" :
                        email.status === "bounced" ? "bg-danger/10 border-danger/20" : "bg-blue-500/10 border-blue-500/20"
                    )}>
                      {email.status === "opened" ? <CheckCircle size={13} className="text-success" /> :
                        email.status === "bounced" ? <span className="text-danger text-xs">!</span> :
                          <Mail size={13} className="text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{email.subject}</p>
                      <p className="text-xs text-text-muted">{email.to} · {email.time}</p>
                    </div>
                    <span className={cn("text-[10px] border px-2 py-0.5 rounded-full", statusStyle(email.status))}>
                      {email.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — Quick Send */}
        <div className="space-y-4">
          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold font-display text-text-primary mb-4 flex items-center gap-2">
              <Send size={14} className="text-accent" /> Quick Send Test
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-muted mb-1.5">To Email</label>
                <input className="input-base" type="email" placeholder="test@example.com" value={testEmail} onChange={e => setTestEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Subject</label>
                <input className="input-base" placeholder="Test outreach email" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Message</label>
                <textarea className="input-base resize-none h-28 text-sm" placeholder="Your message here..." />
              </div>
              <button onClick={handleSendTest} disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all disabled:opacity-60">
                {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={13} /> Send Email</>}
              </button>
            </div>
          </div>

          <div className="bg-bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold font-display text-text-primary mb-3">Email Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Sent today", value: "12", color: "text-text-primary" },
                { label: "Open rate", value: "68%", color: "text-success" },
                { label: "Click rate", value: "24%", color: "text-accent" },
                { label: "Bounced", value: "2", color: "text-danger" },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">{stat.label}</span>
                  <span className={cn("font-semibold font-mono", stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
