"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, Chrome, ArrowRight, Check } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const PLANS = [
  { id: "free", name: "Free", price: "₹0", desc: "12 leads/month", color: "border-border" },
  { id: "basic", name: "Basic", price: "₹499/mo", desc: "200 leads, all features", color: "border-accent" },
  { id: "pro", name: "Pro", price: "₹999/mo", desc: "Unlimited + AI", color: "border-violet-500", popular: true },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [plan, setPlan] = useState("basic");
  const [terms, setTerms] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }
    if (!terms) { toast.error("Please accept terms"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    toast.success("Account created! Welcome to LeadEngine 🚀");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center shadow-glow">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold font-display text-text-primary">LeadEngine</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-text-primary mb-1">Create your account</h1>
          <p className="text-sm text-text-muted">Start finding HOT leads today</p>
        </div>

        <div className="bg-bg-surface border border-border rounded-2xl p-6 shadow-card">
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-bg-elevated border border-border rounded-xl text-sm text-text-secondary hover:text-text-primary hover:border-border-strong transition-all mb-5">
            <Chrome size={16} />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted">or create with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Full Name</label>
                <input className="input-base" placeholder="Rahul Sharma" value={form.name} onChange={set("name")} required />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Email</label>
                <input type="email" className="input-base" placeholder="you@example.com" value={form.email} onChange={set("email")} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} className="input-base pr-9" placeholder="Min 8 chars" value={form.password} onChange={set("password")} required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                    {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Confirm Password</label>
                <input type="password" className="input-base" placeholder="Repeat password" value={form.confirm} onChange={set("confirm")} required />
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-xs text-text-muted mb-2">Choose Plan</label>
              <div className="grid grid-cols-3 gap-2">
                {PLANS.map(p => (
                  <button key={p.id} type="button" onClick={() => setPlan(p.id)}
                    className={cn("relative p-3 rounded-xl border text-left transition-all",
                      plan === p.id ? p.color + " bg-accent/5" : "border-border hover:border-border-strong"
                    )}>
                    {p.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-violet-500 text-white px-2 py-0.5 rounded-full font-medium">Popular</span>
                    )}
                    {plan === p.id && <Check size={10} className="absolute top-2 right-2 text-accent" />}
                    <p className="text-xs font-semibold text-text-primary">{p.name}</p>
                    <p className="text-[11px] text-accent font-mono mt-0.5">{p.price}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)}
                className="mt-0.5 rounded border-border accent-accent w-3.5 h-3.5 flex-shrink-0" />
              <label htmlFor="terms" className="text-xs text-text-muted cursor-pointer">
                I agree to the{" "}
                <Link href="#" className="text-accent hover:underline">Terms of Service</Link> and{" "}
                <Link href="#" className="text-accent hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium text-sm rounded-xl transition-all shadow-glow-sm disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</span>
              ) : (
                <><span>Create Account</span><ArrowRight size={14} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
