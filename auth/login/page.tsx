"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, Chrome, ArrowRight, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Welcome back!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-bg-surface border-r border-border p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-1" />
        <div className="orb w-80 h-80 bg-accent/8 -top-20 -left-20" />
        <div className="orb w-64 h-64 bg-violet-600/6 bottom-20 right-10" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center shadow-glow">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold font-display text-text-primary">LeadEngine</span>
          </div>
          <p className="text-xs text-text-muted uppercase tracking-widest">AI Platform</p>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="text-3xl font-bold font-display text-text-primary leading-tight mb-3">
              Find HOT leads<br />before anyone else
            </h2>
            <p className="text-text-secondary leading-relaxed text-sm max-w-sm">
              AI-powered intent detection from Reddit, Facebook & Google. Score, rank, and convert leads 10x faster.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: "🔥", text: "248 HOT leads collected this week" },
              { icon: "🧠", text: "AI intent scoring in real-time" },
              { icon: "📊", text: "Export PDF/CSV reports instantly" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-base">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[["2.4k+", "Leads/day"], ["94%", "AI accuracy"], ["₹10L+", "Revenue tracked"]].map(([val, label]) => (
              <div key={label} className="bg-bg-elevated border border-border rounded-xl p-3 text-center">
                <p className="text-lg font-bold font-display text-accent">{val}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-text-muted">© 2024 LeadEngine AI. All rights reserved.</p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold font-display text-text-primary">LeadEngine</span>
          </div>

          <h1 className="text-2xl font-bold font-display text-text-primary mb-1">Welcome back</h1>
          <p className="text-sm text-text-muted mb-7">Sign in to your account</p>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-bg-elevated border border-border rounded-xl text-sm text-text-secondary hover:text-text-primary hover:border-border-strong transition-all mb-5 group">
            <Chrome size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-text-muted mb-1.5 font-medium">Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="input-base pl-9" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-text-muted font-medium">Password</label>
                <Link href="#" className="text-xs text-accent hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  className="input-base pl-9 pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)}
                className="rounded border-border accent-accent w-3.5 h-3.5" />
              <label htmlFor="remember" className="text-xs text-text-muted cursor-pointer">Remember me for 30 days</label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium text-sm rounded-xl transition-all shadow-glow-sm disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</span>
              ) : (
                <><span>Sign in</span><ArrowRight size={14} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-accent hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
