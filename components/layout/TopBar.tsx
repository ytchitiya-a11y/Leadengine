"use client";
import { useState } from "react";
import { Bell, Search, Plus, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps { title: string; subtitle?: string; }

const NOTIFICATIONS = [
  { id: 1, text: "12 new HOT leads collected from Mumbai", time: "2m ago", type: "hot", read: false },
  { id: 2, text: "Intent analysis complete — 8 high-urgency signals", time: "18m ago", type: "intent", read: false },
  { id: 3, text: "PDF report exported successfully", time: "1h ago", type: "export", read: true },
  { id: 4, text: "Reddit collection finished — 25 records", time: "3h ago", type: "collect", read: true },
];

export default function TopBar({ title, subtitle }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-bg-base/80 backdrop-blur-xl border-b border-border">
      {/* Left */}
      <div>
        <h1 className="text-lg font-bold font-display text-text-primary leading-none">{title}</h1>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Quick Search */}
        <div className={cn(
          "flex items-center gap-2 bg-bg-elevated border border-border rounded-xl px-3 py-2 transition-all duration-200",
          searchOpen ? "w-56" : "w-36 cursor-pointer hover:border-border-strong"
        )} onClick={() => setSearchOpen(true)}>
          <Search size={13} className="text-text-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Search leads..."
            className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none flex-1 font-body min-w-0"
            onBlur={() => setSearchOpen(false)}
          />
          {!searchOpen && <kbd className="text-[10px] text-text-muted bg-bg-base px-1.5 py-0.5 rounded border border-border">⌘K</kbd>}
        </div>

        {/* Collect Quick Button */}
        <button className="flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-colors shadow-glow-sm">
          <Plus size={14} />
          <span className="hidden sm:inline">Collect</span>
        </button>

        {/* AI Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-slow" />
          <span className="text-xs text-emerald-400 font-medium">AI Active</span>
          <Zap size={11} className="text-emerald-400" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-bg-elevated border border-border hover:border-border-strong transition-colors"
          >
            <Bell size={15} className="text-text-secondary" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-hot rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-bg-elevated border border-border rounded-2xl shadow-card overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-semibold text-text-primary">Notifications</span>
                <span className="text-xs text-accent cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-border max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className={cn("px-4 py-3 hover:bg-bg-overlay cursor-pointer transition-colors", !n.read ? "bg-accent/3" : "")}>
                    <div className="flex items-start gap-2.5">
                      <div className={cn("w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0", !n.read ? "bg-accent" : "bg-transparent")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-text-primary leading-relaxed">{n.text}</p>
                        <p className="text-[11px] text-text-muted mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-border text-center">
                <span className="text-xs text-accent cursor-pointer hover:underline">View all activity</span>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent/60 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-glow-sm">
            A
          </div>
          <ChevronDown size={12} className="text-text-muted group-hover:text-text-secondary transition-colors hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
