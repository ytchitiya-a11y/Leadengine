"use client";
import { cn } from "@/lib/utils";

// ─── Badge ───────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  dotColor?: string;
}
export function Badge({ children, className, dot, dotColor }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border", className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />}
      {children}
    </span>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────
import type { Priority } from "@/lib/data";
import { priorityColor, priorityDot } from "@/lib/utils";
export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge className={priorityColor(priority)} dot dotColor={
      priority === "HOT" ? "#ff4d6a" : priority === "WARM" ? "#f5a623" : "#4f74ff"
    }>
      {priority}
    </Badge>
  );
}

// ─── Score Ring ───────────────────────────────────────────────────────────────
import { scoreColor } from "@/lib/utils";
interface ScoreRingProps { score: number; size?: number; }
export function ScoreRing({ score, size = 40 }: ScoreRingProps) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = scoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e2438" strokeWidth={4} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={4} strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <span className="absolute text-xs font-bold font-mono" style={{ color, fontSize: size < 36 ? 9 : 11 }}>
        {score}
      </span>
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-xl animate-pulse", className)} />;
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <div className={cn("border-t border-border", className)} />;
}
