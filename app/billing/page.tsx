"use client";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { PLANS, MONTHLY_REVENUE } from "@/lib/data";
import { Check, CreditCard, Zap, ArrowRight, Crown, Receipt } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

const BILLING_HISTORY = [
  { id: "PAY001", date: "Jun 1, 2024", plan: "Pro", amount: 999, status: "paid", txn: "pay_OkXxxx" },
  { id: "PAY002", date: "May 1, 2024", plan: "Pro", amount: 999, status: "paid", txn: "pay_MnXxxx" },
  { id: "PAY003", date: "Apr 1, 2024", plan: "Basic", amount: 499, status: "paid", txn: "pay_LkXxxx" },
];

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const currentPlan = "pro";

  const handleUpgrade = async (planId: string) => {
    if (planId === currentPlan) return;
    setUpgrading(planId);
    await new Promise(r => setTimeout(r, 1800));
    setUpgrading(null);
    toast.success(`Razorpay checkout opening for ${planId} plan...`);
  };

  return (
    <AppLayout title="Billing & Plans" subtitle="Manage your subscription and billing history">
      {/* Current Plan Banner */}
      <div className="mb-6 p-5 bg-gradient-to-r from-violet-600/15 to-accent/10 border border-violet-500/20 rounded-2xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <Crown size={18} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Pro Plan — Active</p>
              <p className="text-xs text-text-muted">Next billing: July 1, 2024 · ₹999/month</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-text-muted">Leads used</p>
              <p className="text-sm font-bold font-mono text-text-primary">248 / ∞</p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-bg-base border border-border rounded-xl text-sm text-text-secondary hover:text-text-primary transition-colors">
              <Receipt size={13} /> Manage
            </button>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className={cn("text-sm", billingCycle === "monthly" ? "text-text-primary" : "text-text-muted")}>Monthly</span>
        <button onClick={() => setBillingCycle(c => c === "monthly" ? "yearly" : "monthly")}
          className={cn("w-10 h-6 rounded-full border-2 relative transition-all",
            billingCycle === "yearly" ? "bg-accent border-accent" : "bg-bg-elevated border-border"
          )}>
          <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200",
            billingCycle === "yearly" ? "left-5" : "left-0.5"
          )} />
        </button>
        <span className={cn("text-sm flex items-center gap-1.5", billingCycle === "yearly" ? "text-text-primary" : "text-text-muted")}>
          Yearly <span className="text-xs bg-success/15 text-success border border-success/20 px-1.5 py-0.5 rounded-full">Save 20%</span>
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PLANS.map(plan => {
          const isCurrentPlan = plan.id === currentPlan;
          const price = billingCycle === "yearly" ? Math.round(plan.price * 0.8) : plan.price;

          return (
            <div key={plan.id} className={cn(
              "relative bg-bg-surface border rounded-2xl p-5 transition-all",
              isCurrentPlan ? "border-violet-500/50 shadow-[0_0_30px_rgba(167,139,250,0.1)]" : "border-border hover:border-border-strong",
              plan.popular ? "gradient-border" : ""
            )}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-accent text-white text-[10px] font-semibold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              {isCurrentPlan && (
                <div className="absolute -top-3 right-4 bg-success text-white text-[10px] font-semibold px-3 py-1 rounded-full">
                  CURRENT
                </div>
              )}

              <div className={`inline-flex w-10 h-10 rounded-xl items-center justify-center mb-3 bg-gradient-to-br ${plan.color} border border-white/5`}>
                <Zap size={16} style={{ color: plan.accent }} />
              </div>

              <h3 className="text-base font-bold font-display text-text-primary">{plan.name}</h3>
              <p className="text-xs text-text-muted mt-0.5 mb-3">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xs text-text-muted">₹</span>
                <span className="text-3xl font-bold font-display text-text-primary">{price.toLocaleString("en-IN")}</span>
                <span className="text-xs text-text-muted">/mo</span>
                {billingCycle === "yearly" && <span className="text-xs text-success ml-1">-20%</span>}
              </div>

              <div className="space-y-2 mb-5">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check size={12} className="text-success flex-shrink-0" /> {f}
                  </div>
                ))}
                {plan.limits.map((l, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-muted line-through">
                    <span className="w-3 h-3 text-center flex-shrink-0">×</span> {l}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrentPlan || upgrading === plan.id}
                className={cn("w-full py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5",
                  isCurrentPlan
                    ? "bg-bg-elevated border border-border text-text-muted cursor-default"
                    : "text-white hover:opacity-90 shadow-glow-sm",
                )}
                style={!isCurrentPlan ? { background: `linear-gradient(135deg, ${plan.accent}cc, ${plan.accent})` } : {}}>
                {upgrading === plan.id ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isCurrentPlan ? "Current Plan" : (
                  <>Upgrade <ArrowRight size={13} /></>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart + Billing History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-bg-surface border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold font-display text-text-primary mb-1">Spending History</h3>
          <p className="text-xs text-text-muted mb-4">Monthly subscription cost</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={MONTHLY_REVENUE} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2438" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4a5578", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#111527", border: "1px solid #1e2438", borderRadius: 10, fontSize: 12 }}
                formatter={(v: any) => [`₹${v}`, "Amount"]}
              />
              <Bar dataKey="revenue" fill="#a78bfa" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold font-display text-text-primary">Payment History</h3>
          </div>
          <div className="divide-y divide-border/50">
            {BILLING_HISTORY.map(txn => (
              <div key={txn.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-8 h-8 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard size={13} className="text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{txn.plan} Plan</p>
                  <p className="text-xs text-text-muted">{txn.date} · {txn.txn}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-mono text-text-primary">₹{txn.amount}</p>
                  <span className="text-[10px] text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
