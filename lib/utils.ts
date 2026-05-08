import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Priority, PlanType, LeadStatus } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function priorityColor(p: Priority) {
  return {
    HOT: "text-red-400 bg-red-500/10 border-red-500/20",
    WARM: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    COLD: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  }[p];
}

export function priorityDot(p: Priority) {
  return {
    HOT: "bg-red-400",
    WARM: "bg-amber-400",
    COLD: "bg-blue-400",
  }[p];
}

export function scoreColor(score: number): string {
  if (score >= 70) return "#ff4d6a";
  if (score >= 40) return "#f5a623";
  return "#4f74ff";
}

export function scoreGradient(score: number): string {
  if (score >= 70) return "from-red-500 to-rose-600";
  if (score >= 40) return "from-amber-500 to-orange-500";
  return "from-blue-500 to-indigo-600";
}

export function planBadge(plan: PlanType) {
  return {
    free: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    basic: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    pro: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    enterprise: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  }[plan];
}

export function statusBadge(status: LeadStatus) {
  return {
    new: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    contacted: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    qualified: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    converted: "text-green-400 bg-green-500/10 border-green-500/20",
    archived: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  }[status];
}

export function urgencyColor(u: string) {
  return {
    High: "text-red-400 bg-red-500/10 border-red-500/20",
    Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Low: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  }[u] || "text-slate-400 bg-slate-500/10";
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export function relativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
