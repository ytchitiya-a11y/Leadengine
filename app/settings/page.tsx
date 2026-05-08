"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { User, Bell, Key, Shield, Palette, Save, Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API Keys", icon: Key },
  { id: "security", label: "Security", icon: Shield },
  { id: "theme", label: "Theme", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "Rahul Sharma", email: "rahul@leadengine.ai", company: "LeadEngine AI", phone: "+91-9876543210" });
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    newLeads: true, hotLeads: true, intentAlerts: false, weeklyReport: true, billing: true,
  });

  const save = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    toast.success("Settings saved!");
  };

  const ToggleRow = ({ label, desc, checked, onChange }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-muted mt-0.5">{desc}</p>
      </div>
      <button onClick={() => onChange(!checked)}
        className={cn("w-10 h-6 rounded-full border-2 relative transition-all flex-shrink-0",
          checked ? "bg-accent border-accent" : "bg-bg-elevated border-border"
        )}>
        <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200",
          checked ? "left-4" : "left-0.5"
        )} />
      </button>
    </div>
  );

  return (
    <AppLayout title="Settings" subtitle="Manage your account and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Tab List */}
        <div className="bg-bg-surface border border-border rounded-2xl p-3 h-fit">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-1",
                activeTab === tab.id ? "bg-accent/10 text-accent border border-accent/20" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
              )}>
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3">
          <div className="bg-bg-surface border border-border rounded-2xl p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="text-base font-semibold font-display text-text-primary">Profile Settings</h2>

                <div className="flex items-center gap-4 pb-5 border-b border-border">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/60 to-violet-600 flex items-center justify-center text-2xl font-bold text-white">
                    {profile.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{profile.name}</p>
                    <p className="text-xs text-text-muted">{profile.email}</p>
                    <button className="mt-1.5 text-xs text-accent hover:underline">Change photo</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", key: "name", type: "text" },
                    { label: "Email", key: "email", type: "email" },
                    { label: "Company", key: "company", type: "text" },
                    { label: "Phone", key: "phone", type: "tel" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs text-text-muted mb-1.5">{field.label}</label>
                      <input type={field.type} className="input-base" value={profile[field.key as keyof typeof profile]}
                        onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))} />
                    </div>
                  ))}
                </div>

                <button onClick={save} disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all shadow-glow-sm disabled:opacity-60">
                  {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
                  Save Changes
                </button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="animate-fade-in">
                <h2 className="text-base font-semibold font-display text-text-primary mb-5">Notification Preferences</h2>
                <ToggleRow label="New leads collected" desc="Get notified when a collection completes" checked={notifications.newLeads} onChange={(v: boolean) => setNotifications(n => ({ ...n, newLeads: v }))} />
                <ToggleRow label="HOT lead alerts" desc="Instant alert when a HOT lead is detected" checked={notifications.hotLeads} onChange={(v: boolean) => setNotifications(n => ({ ...n, hotLeads: v }))} />
                <ToggleRow label="Intent signals" desc="New Reddit/Facebook intent data found" checked={notifications.intentAlerts} onChange={(v: boolean) => setNotifications(n => ({ ...n, intentAlerts: v }))} />
                <ToggleRow label="Weekly report" desc="Summary of leads and performance" checked={notifications.weeklyReport} onChange={(v: boolean) => setNotifications(n => ({ ...n, weeklyReport: v }))} />
                <ToggleRow label="Billing alerts" desc="Payment confirmations and renewal reminders" checked={notifications.billing} onChange={(v: boolean) => setNotifications(n => ({ ...n, billing: v }))} />
                <button onClick={save} className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-xl shadow-glow-sm">
                  <Save size={14} /> Save Preferences
                </button>
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === "api" && (
              <div className="animate-fade-in space-y-4">
                <h2 className="text-base font-semibold font-display text-text-primary">API Keys</h2>
                {[
                  { label: "OpenAI API Key", key: "sk-proj-...xxxx4f2a", desc: "Used for AI scoring and message generation" },
                  { label: "SerpAPI Key", key: "ab12cd...ef56gh", desc: "Google Maps data collection" },
                  { label: "Reddit Client ID", key: "rdt_...xxxx", desc: "Reddit intent data collection" },
                  { label: "Razorpay Key", key: "rzp_live_...xxxx", desc: "Payment processing" },
                ].map(apiKey => (
                  <div key={apiKey.label} className="bg-bg-elevated border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{apiKey.label}</p>
                        <p className="text-xs text-text-muted">{apiKey.desc}</p>
                      </div>
                      <span className="text-[10px] bg-success/10 border border-success/20 text-success px-2 py-0.5 rounded-full">Connected</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 bg-bg-base border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-muted">
                        {showKey ? apiKey.key : "•".repeat(20)}
                      </div>
                      <button onClick={() => setShowKey(!showKey)} className="p-2 bg-bg-base border border-border rounded-lg text-text-muted hover:text-text-primary transition-colors">
                        {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                      <button onClick={() => { navigator.clipboard.writeText(apiKey.key); toast.success("Copied!"); }}
                        className="p-2 bg-bg-base border border-border rounded-lg text-text-muted hover:text-text-primary transition-colors">
                        <Check size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="animate-fade-in space-y-5">
                <h2 className="text-base font-semibold font-display text-text-primary">Security</h2>
                <div className="space-y-3">
                  {[
                    { label: "New Password", placeholder: "Enter new password", type: "password" },
                    { label: "Confirm Password", placeholder: "Confirm new password", type: "password" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs text-text-muted mb-1.5">{f.label}</label>
                      <input type={f.type} className="input-base" placeholder={f.placeholder} />
                    </div>
                  ))}
                  <button onClick={save} className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-xl shadow-glow-sm">
                    <Shield size={14} /> Update Password
                  </button>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="text-sm font-medium text-text-primary mb-1">Two-Factor Authentication</p>
                  <p className="text-xs text-text-muted mb-3">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2 bg-bg-elevated border border-border rounded-xl text-sm text-text-secondary hover:text-text-primary transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === "theme" && (
              <div className="animate-fade-in space-y-5">
                <h2 className="text-base font-semibold font-display text-text-primary">Theme & Appearance</h2>
                <div>
                  <p className="text-xs text-text-muted mb-3">Color Theme</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: "Ocean", colors: ["#060810", "#4f74ff"], active: true },
                      { name: "Forest", colors: ["#061008", "#34d399"], active: false },
                      { name: "Sunset", colors: ["#100806", "#f5a623"], active: false },
                      { name: "Violet", colors: ["#08060f", "#a78bfa"], active: false },
                    ].map(theme => (
                      <button key={theme.name}
                        onClick={() => toast.success(`${theme.name} theme applied`)}
                        className={cn("p-3 rounded-xl border text-center transition-all",
                          theme.active ? "border-accent/50 bg-accent/5" : "border-border hover:border-border-strong"
                        )}>
                        <div className="flex gap-1 mb-2 justify-center">
                          {theme.colors.map(c => <div key={c} className="w-4 h-4 rounded-full" style={{ background: c }} />)}
                        </div>
                        <span className="text-[11px] text-text-muted">{theme.name}</span>
                        {theme.active && <div className="mt-1 text-[9px] text-accent">Active</div>}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-3">Sidebar Style</p>
                  <div className="flex gap-2">
                    {["Expanded", "Compact", "Icon Only"].map(style => (
                      <button key={style} onClick={() => toast.success(`${style} sidebar selected`)}
                        className="px-4 py-2 bg-bg-elevated border border-border rounded-xl text-xs text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
