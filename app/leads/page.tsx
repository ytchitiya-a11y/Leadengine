import AppLayout from "@/components/layout/AppLayout";
import LeadsTable from "@/components/leads/LeadsTable";
import StatCard from "@/components/ui/StatCard";
import { MOCK_LEADS } from "@/lib/data";
import { Flame, Target, TrendingUp, Snowflake } from "lucide-react";

export default function LeadsPage() {
  const hot = MOCK_LEADS.filter(l => l.priority === "HOT").length;
  const warm = MOCK_LEADS.filter(l => l.priority === "WARM").length;
  const cold = MOCK_LEADS.filter(l => l.priority === "COLD").length;
  const avgScore = Math.round(MOCK_LEADS.reduce((s, l) => s + l.score, 0) / MOCK_LEADS.length);

  return (
    <AppLayout title="Lead Intelligence" subtitle="All collected leads with AI scoring">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger">
        <StatCard label="Total Leads" value={MOCK_LEADS.length} icon={<Target size={16} />} change={18} />
        <StatCard label="HOT Leads" value={hot} icon={<Flame size={16} />} accent="#ff4d6a" change={24} />
        <StatCard label="Avg Score" value={avgScore} icon={<TrendingUp size={16} />} accent="#34d399" suffix="/100" />
        <StatCard label="Cold Leads" value={cold} icon={<Snowflake size={16} />} accent="#4f74ff" />
      </div>
      <LeadsTable />
    </AppLayout>
  );
}
