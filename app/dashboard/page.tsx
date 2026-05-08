import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/ui/StatCard";
import LeadsGrowthChart from "@/components/charts/LeadsGrowthChart";
import { IntentPieChart, IndustryBarChart, ConversionChart } from "@/components/charts/Charts";
import { DASHBOARD_STATS, MOCK_LEADS, AI_INSIGHTS, MOCK_INTENT } from "@/lib/data";
import { PriorityBadge, ScoreRing, Badge } from "@/components/ui/Badge";
import { statusBadge, truncate, formatCurrency } from "@/lib/utils";
import {
  Target, Flame, Brain, TrendingUp, Search, CreditCard,
  ArrowRight, Zap, ChevronRight, Star
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const recentLeads = MOCK_LEADS.slice(0, 6);

  return (
    <AppLayout title="Dashboard" subtitle="AI Lead Intelligence Platform">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6 stagger">
        <div className="xl:col-span-1">
          <StatCard label="Total Leads" value={DASHBOARD_STATS.total_leads} icon={<Target size={16} />}
            change={18} changeLabel="vs last month" delay={0} />
        </div>
        <div className="xl:col-span-1">
          <StatCard label="HOT Leads" value={DASHBOARD_STATS.hot_leads} icon={<Flame size={16} />}
            accent="#ff4d6a" change={24} changeLabel="this week" delay={50} />
        </div>
        <div className="xl:col-span-1">
          <StatCard label="Intent Leads" value={DASHBOARD_STATS.intent_leads} icon={<Brain size={16} />}
            accent="#a78bfa" change={11} delay={100} />
        </div>
        <div className="xl:col-span-1">
          <StatCard label="Revenue" value={DASHBOARD_STATS.revenue} prefix="₹"
            icon={<TrendingUp size={16} />} accent="#34d399"
            formatFn={n => (n / 1000).toFixed(1) + "k"} delay={150} />
        </div>
        <div className="xl:col-span-1">
          <StatCard label="Searches" value={DASHBOARD_STATS.active_searches} icon={<Search size={16} />}
            accent="#f5a623" delay={200} />
        </div>
        <div className="xl:col-span-1">
          <StatCard label="Plan" value={0} icon={<CreditCard size={16} />}
            accent="#f5a623" delay={250}
            formatFn={() => "Pro"} />
        </div>
      </div>

      {/* AI Insights Strip */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold font-display text-text-primary flex items-center gap-2">
            <Zap size={14} className="text-accent" /> AI Insights
          </h2>
          <Link href="/intent" className="text-xs text-accent hover:underline flex items-center gap-1">View all <ArrowRight size={11} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {AI_INSIGHTS.map((insight, i) => (
            <div key={i} className={`bg-gradient-to-br ${insight.color} border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all cursor-pointer group`}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{insight.icon}</span>
                <span className="text-[10px] font-mono text-text-muted bg-bg-base/40 px-2 py-0.5 rounded-full">{insight.trend}</span>
              </div>
              <h4 className="text-xs font-semibold text-text-primary mb-1">{insight.title}</h4>
              <p className="text-[11px] text-text-secondary leading-relaxed">{insight.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <LeadsGrowthChart />
        </div>
        <div>
          <IntentPieChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <IndustryBarChart />
        <ConversionChart />
      </div>

      {/* Recent Leads */}
      <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold font-display text-text-primary">Recent Leads</h2>
            <p className="text-xs text-text-muted mt-0.5">Latest collected leads</p>
          </div>
          <Link href="/leads" className="flex items-center gap-1 text-xs text-accent hover:underline">
            View all <ChevronRight size={11} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-elevated/40">
                {["Business", "Category", "Source", "Score", "Priority", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs text-text-muted uppercase tracking-wider font-medium border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {recentLeads.map(lead => (
                <tr key={lead.id} className="table-row-hover cursor-pointer">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-xs font-bold text-text-secondary">
                        {lead.business_name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{truncate(lead.business_name, 20)}</p>
                        <p className="text-xs text-text-muted">{lead.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-text-secondary">{lead.category}</td>
                  <td className="px-5 py-3 text-xs text-text-muted">{lead.source}</td>
                  <td className="px-5 py-3"><ScoreRing score={lead.score} size={34} /></td>
                  <td className="px-5 py-3"><PriorityBadge priority={lead.priority} /></td>
                  <td className="px-5 py-3"><Badge className={statusBadge(lead.status)}>{lead.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
