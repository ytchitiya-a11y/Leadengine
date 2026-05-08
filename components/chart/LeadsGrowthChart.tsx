"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import { LEADS_GROWTH } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-border rounded-xl p-3 shadow-card text-xs">
      <p className="text-text-secondary font-medium mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-text-muted">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-bold text-text-primary">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function LeadsGrowthChart() {
  return (
    <div className="bg-bg-surface border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold font-display text-text-primary">Lead Growth</h3>
          <p className="text-xs text-text-muted mt-0.5">Monthly breakdown by priority</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-success bg-success/10 border border-success/20 rounded-lg px-2.5 py-1.5">
          +34% this month
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={LEADS_GROWTH} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f74ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f74ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradHot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4d6a" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#ff4d6a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradWarm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f5a623" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2438" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="leads" name="Total" stroke="#4f74ff" strokeWidth={2} fill="url(#gradTotal)" />
          <Area type="monotone" dataKey="hot" name="HOT" stroke="#ff4d6a" strokeWidth={2} fill="url(#gradHot)" />
          <Area type="monotone" dataKey="warm" name="WARM" stroke="#f5a623" strokeWidth={1.5} fill="url(#gradWarm)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
