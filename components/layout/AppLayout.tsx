"use client";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-bg-base">
      {/* Background ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-96 h-96 bg-accent/5 -top-32 -left-32" />
        <div className="orb w-80 h-80 bg-violet-600/4 top-1/2 -right-40" />
        <div className="orb w-64 h-64 bg-emerald-500/3 bottom-20 left-1/3" />
      </div>

      <Sidebar />

      <div className="flex-1 ml-60 transition-all duration-300 min-h-screen">
        <TopBar title={title} subtitle={subtitle} />
        <main className="p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
