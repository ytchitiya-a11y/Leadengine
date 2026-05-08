"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Target, Brain, Search, MessageSquare,
  Download, CreditCard, Mail, Cloud, ShieldCheck, Settings,
  ChevronLeft, ChevronRight, Zap, LogOut, Bell
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Lead Intelligence", icon: Target, href: "/leads" },
  { label: "Intent Analysis", icon: Brain, href: "/intent" },
  { label: "Data Collection", icon: Search, href: "/collect" },
  { label: "AI Messages", icon: MessageSquare, href: "/messages" },
  { label: "Export Center", icon: Download, href: "/export" },
];

const SECONDARY_ITEMS = [
  { label: "Billing", icon: CreditCard, href: "/billing" },
  { label: "Email Center", icon: Mail, href: "/email" },
  { label: "File Storage", icon: Cloud, href: "/storage" },
  { label: "Admin Panel", icon: ShieldCheck, href: "/admin" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const NavItem = ({ item }: { item: typeof NAV_ITEMS[0] }) => {
    const active = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link href={item.href} className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
        collapsed ? "justify-center" : "",
        active
          ? "bg-accent/10 text-accent border border-accent/20"
          : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
      )}>
        {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />}
        <item.icon size={16} className={cn("flex-shrink-0", active ? "text-accent" : "")} />
        {!collapsed && <span className="text-sm font-medium font-body">{item.label}</span>}
        {collapsed && (
          <div className="absolute left-full ml-3 px-2 py-1 bg-bg-elevated border border-border rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-bg-surface border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-border",
        collapsed ? "justify-center px-0" : ""
      )}>
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center shadow-glow">
            <Zap size={14} className="text-white" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-bg-surface" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold font-display text-text-primary leading-none">LeadEngine</p>
            <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">AI Platform</p>
          </div>
        )}
      </div>

      {/* Plan Badge */}
      {!collapsed && (
        <div className="mx-3 mt-3 px-3 py-2 bg-gradient-to-r from-violet-600/15 to-accent/10 border border-violet-500/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-violet-400 uppercase tracking-wider font-medium">Pro Plan</span>
            <span className="text-[10px] text-violet-400">Active</span>
          </div>
          <div className="mt-1.5 h-1 bg-bg-base rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-violet-500 to-accent rounded-full" />
          </div>
          <p className="text-[10px] text-text-muted mt-1">248 / unlimited leads</p>
        </div>
      )}

      {/* Main Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        <p className={cn("text-[10px] text-text-muted uppercase tracking-wider px-3 py-1.5 font-medium", collapsed ? "hidden" : "")}>Core</p>
        {NAV_ITEMS.map(item => <NavItem key={item.href} item={item} />)}

        <div className="my-3 border-t border-border" />
        <p className={cn("text-[10px] text-text-muted uppercase tracking-wider px-3 py-1.5 font-medium", collapsed ? "hidden" : "")}>Tools</p>
        {SECONDARY_ITEMS.map(item => <NavItem key={item.href} item={item} />)}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-bg-elevated cursor-pointer group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent/60 to-violet-600/60 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">admin@leadengine.ai</p>
              <p className="text-[10px] text-text-muted">Super Admin</p>
            </div>
            <LogOut size={13} className="text-text-muted group-hover:text-danger transition-colors flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-bg-elevated border border-border rounded-full flex items-center justify-center text-text-muted hover:text-text-primary transition-colors shadow-card z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
