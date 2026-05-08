"use client";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Area, AreaChart, Legend
} from "recharts";
import { INTENT_PIE, INDUSTRY_DIST, CONVERSION_DATA } from "@/lib/data";

const TooltipBox = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-border rounded-xl p-3 shadow-card text-xs">
      <p className="font-bold text-text-primary">{payload[0].name}</p>
      <p className="text-text-muted mt-1">Value: <span className="text-text-primary font-semibold">{payload[0].value}</span></p>
    </div>
  );
};

export function IntentPieChart() {
  return (
    <div className="bg-bg-surface border border-border rounded-2xl p-5">
      <h3 className="text-sm font-semibold font-display text-text-primary mb-1">Intent Categories</h3>
      <p className="text-xs text-text-muted mb-4">Problem type distribution</p>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie data={INTENT_PIE} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
              {INTENT_PIE.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<TooltipBox />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {INTENT_PIE.map(item => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-xs text-text-secondary truncate max-w-[110px]">{item.name}</span>
              </div>
              <span className="text-xs font-semibold font-mono text-text-primary">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IndustryBarChart() {
  return (
    <div className="bg-bg-surface border border-border rounded-2xl p-5">
      <h3 className="text-sm font-semibold font-display text-text-primary mb-1">Industry Distribution</h3>
      <p className="text-xs text-text-muted mb-4">Lead count by sector</p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={INDUSTRY_DIST} layout="vertical" margin={{ left: -10, right: 10 }}>
          <XAxis type="number" tick={{ fill: "#4a5578", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fill: "#8892b0", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2438" horizontal={false} />
          <Tooltip content={<TooltipBox />} />
          <Bar dataKey="leads" radius={[0, 4, 4, 0]}>
            {INDUSTRY_DIST.map((entry, i) => (
              <Cell key={i} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConversionChart() {
  return (
    <div className="bg-bg-surface border border-border rounded-2xl p-5">
      <h3 className="text-sm font-semibold font-display text-text-primary mb-1">Conversion Potential</h3>
      <p className="text-xs text-text-muted mb-4">Potential vs actual conversion rate</p>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={CONVERSION_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gPot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gAct" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2438" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<TooltipBox />} />
          <Area type="monotone" dataKey="potential" name="Potential" stroke="#a78bfa" strokeWidth={2} fill="url(#gPot)" strokeDasharray="4 2" />
          <Area type="monotone" dataKey="actual" name="Actual" stroke="#34d399" strokeWidth={2} fill="url(#gAct)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
