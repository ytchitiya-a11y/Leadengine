"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { ADMIN_USERS } from "@/lib/data";
import { Users, TrendingUp, CreditCard, Zap, ShieldCheck, Crown, Trash2, ChevronDown, Check } from "lucide-react";
import { cn, planBadge } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import toast from "react-hot-toast";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const REVENUE_DATA = [
  { month: "Jan", rev: 4990 }, { month: "Feb", rev: 7485 }, { month: "Mar", rev: 6990 },
  { month: "Apr", rev: 11970 }, { month: "May", rev: 14960 }, { month: "Jun", rev: 17950 },
];

export default function AdminPage() {
  const [users, setUsers] = useState(ADMIN_USERS);
  const [activeTab, setActiveTab] = useState<"users" | "revenue">("users");
  const [grantUserId, setGrantUserId] = useState<string | null>(null);

  const handlePlanChange = (userId: string, plan: string, isFreeGrant: boolean) => {
    setUsers(u => u.map(user => user.id === userId ? { ...user, plan: plan as any } : user));
    toast.success(`Plan changed to ${plan}${isFreeGrant ? " (FREE GRANT)" : ""}`);
    setGrantUserId(null);
  };

  const handleDelete = (userId: string) => {
    setUsers(u => u.filter(user => user.id !== userId));
    toast.success("User deleted");
  };

  return (
    <AppLayout title="Admin Panel" subtitle="Platform management and analytics">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger">
        <StatCard label="Total Users" value={users.length} icon={<Users size={16} />} change={12} />
        <StatCard label="Revenue (MoM)" value={17950} prefix="₹" icon={<TrendingUp size={16} />} accent="#34d399" change={20}
          formatFn={n => (n / 1000).toFixed(1) + "k"} />
        <StatCard label="Active Subs" value={users.filter(u => u.plan !== "free").length} icon={<CreditCard size={16} />} accent="#a78bfa" />
        <StatCard label="Admin Grants" value={2} icon={<Zap size={16} />} accent="#f5a623" />
      </div>

      {/* Tabs */}
      <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden mb-5">
        <div className="flex border-b border-border">
          {(["users", "revenue"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn("flex-1 py-3 text-sm font-medium capitalize transition-colors max-w-[160px]",
                activeTab === tab ? "text-accent border-b-2 border-accent bg-accent/5" : "text-text-muted hover:text-text-secondary"
              )}>
              {tab === "users" ? "User Management" : "Revenue Analytics"}
            </button>
          ))}
        </div>

        {activeTab === "users" && (
          <div>
            <table className="w-full">
              <thead>
                <tr className="bg-bg-elevated/40">
                  {["User", "Plan", "Leads", "Joined", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-text-muted uppercase tracking-wider border-b border-border font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {users.map(user => (
                  <tr key={user.id} className="table-row-hover">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent/40 to-violet-600/40 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{user.name}</p>
                          <p className="text-xs text-text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={planBadge(user.plan)}>
                        {user.plan === "pro" && <Crown size={10} className="mr-0.5" />}
                        {user.plan.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-sm text-text-secondary">{user.lead_count}</td>
                    <td className="px-5 py-3.5 text-xs text-text-muted">{user.created_at}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {/* Change Plan */}
                        <div className="relative">
                          <button onClick={() => setGrantUserId(grantUserId === user.id ? null : user.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-bg-elevated border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                            Change Plan <ChevronDown size={10} />
                          </button>
                          {grantUserId === user.id && (
                            <div className="absolute right-0 top-full mt-1 w-52 bg-bg-elevated border border-border rounded-xl shadow-card z-10 overflow-hidden animate-fade-in">
                              <div className="px-3 py-2 border-b border-border text-[10px] text-text-muted uppercase tracking-wider">Select plan</div>
                              {[
                                { id: "free", label: "Free", grant: false },
                                { id: "basic", label: "Basic — ₹499", grant: false },
                                { id: "pro", label: "Pro — ₹999", grant: false },
                                { id: "pro", label: "Pro — FREE GRANT ✨", grant: true },
                                { id: "basic", label: "Basic — FREE GRANT ✨", grant: true },
                              ].map((opt, i) => (
                                <button key={i} onClick={() => handlePlanChange(user.id, opt.id, opt.grant)}
                                  className={cn("w-full text-left px-3 py-2 text-xs hover:bg-bg-overlay transition-colors flex items-center justify-between",
                                    opt.grant ? "text-success" : "text-text-secondary"
                                  )}>
                                  {opt.label}
                                  {user.plan === opt.id && !opt.grant && <Check size={10} className="text-accent" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button onClick={() => handleDelete(user.id)}
                          className="p-1.5 text-text-muted hover:text-danger transition-colors rounded-lg hover:bg-danger/10">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { label: "Basic Revenue", value: "₹3,492", sub: "7 subscriptions" },
                { label: "Pro Revenue", value: "₹14,985", sub: "15 subscriptions" },
                { label: "Admin Grants", value: "2 free", sub: "₹0 revenue" },
              ].map(stat => (
                <div key={stat.label} className="bg-bg-elevated border border-border rounded-xl p-4 text-center">
                  <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                  <p className="text-xl font-bold font-display text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={REVENUE_DATA} margin={{ left: -15 }}>
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2438" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#111527", border: "1px solid #1e2438", borderRadius: 10, fontSize: 12 }}
                  formatter={(v: any) => [`₹${v}`, "Revenue"]} />
                <Area type="monotone" dataKey="rev" stroke="#34d399" strokeWidth={2} fill="url(#rg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
