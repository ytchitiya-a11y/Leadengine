"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  accent?: string;
  delay?: number;
  formatFn?: (n: number) => string;
}

export default function StatCard({
  label, value, prefix = "", suffix = "", change, changeLabel,
  icon, accent = "#4f74ff", delay = 0, formatFn,
}: StatCardProps) {
  const [displayed, setDisplayed] = useState(0);
  const numericValue = typeof value === "number" ? value : parseFloat(value as string) || 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 1000;
      const increment = numericValue / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setDisplayed(numericValue);
          clearInterval(timer);
        } else {
          setDisplayed(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [numericValue, delay]);

  const displayValue = typeof value === "string" && isNaN(parseFloat(value))
    ? value
    : formatFn
      ? formatFn(displayed)
      : displayed.toLocaleString("en-IN");

  const isPositive = (change ?? 0) >= 0;

  return (
    <div className="relative group bg-bg-surface border border-border rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-border-strong hover:shadow-card-hover cursor-default"
      style={{ animationDelay: `${delay}ms` }}>
      {/* Accent glow top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />

      {/* Subtle bg gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at top right, ${accent}08 0%, transparent 70%)` }} />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-medium font-body">{label}</p>
          <div className="flex items-baseline gap-1 mt-2">
            {prefix && <span className="text-base text-text-secondary">{prefix}</span>}
            <span className="text-2xl font-bold font-display text-text-primary tabular-nums">{displayValue}</span>
            {suffix && <span className="text-sm text-text-secondary">{suffix}</span>}
          </div>

          {change !== undefined && (
            <div className={cn("flex items-center gap-1 mt-1.5 text-xs font-medium",
              isPositive ? "text-success" : "text-danger")}>
              {isPositive ? <TrendingUp size={12} /> : change === 0 ? <Minus size={12} /> : <TrendingDown size={12} />}
              <span>{isPositive ? "+" : ""}{change}%</span>
              {changeLabel && <span className="text-text-muted font-normal">{changeLabel}</span>}
            </div>
          )}
        </div>

        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ background: `${accent}18`, border: `1px solid ${accent}25` }}>
          <div style={{ color: accent }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
