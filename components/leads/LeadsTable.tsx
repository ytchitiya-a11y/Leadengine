"use client";
import { useState, useMemo } from "react";
import { MOCK_LEADS, type Lead } from "@/lib/data";
import { PriorityBadge, ScoreRing, Badge } from "@/components/ui/Badge";
import { cn, statusBadge, truncate, relativeTime } from "@/lib/utils";
import {
  Search, Filter, Download, Star, Trash2, Globe, Phone,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  ArrowUpDown, MoreHorizontal, Tag
} from "lucide-react";
import LeadDetailPanel from "./LeadDetailPanel";

const PAGE_SIZE = 8;

export default function LeadsTable() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Lead>("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [starred, setStarred] = useState<Set<number>>(new Set([1, 3, 8]));
  const [activeDetail, setActiveDetail] = useState<Lead | null>(null);

  const filtered = useMemo(() => {
    return MOCK_LEADS
      .filter(l =>
        (!search || l.business_name.toLowerCase().includes(search.toLowerCase()) ||
          l.category.toLowerCase().includes(search.toLowerCase()) ||
          l.location.toLowerCase().includes(search.toLowerCase())) &&
        (priorityFilter === "all" || l.priority === priorityFilter)
      )
      .sort((a, b) => {
        const av = a[sortField] as any, bv = b[sortField] as any;
        if (av == null) return 1; if (bv == null) return -1;
        return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
      });
  }, [search, priorityFilter, sortField, sortDir]);

  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (field: keyof Lead) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const toggleSelect = (id: number) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  const SortIcon = ({ field }: { field: keyof Lead }) => {
    if (sortField !== field) return <ArrowUpDown size={11} className="text-text-muted ml-1" />;
    return sortDir === "asc"
      ? <ChevronUp size={11} className="text-accent ml-1" />
      : <ChevronDown size={11} className="text-accent ml-1" />;
  };

  const Th = ({ label, field, className }: { label: string; field?: keyof Lead; className?: string }) => (
    <th
      onClick={() => field && toggleSort(field)}
      className={cn("text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider font-medium border-b border-border select-none whitespace-nowrap",
        field ? "cursor-pointer hover:text-text-secondary" : "", className)}
    >
      <span className="flex items-center">{label}{field && <SortIcon field={field} />}</span>
    </th>
  );

  return (
    <div className="flex gap-5">
      <div className="flex-1 bg-bg-surface border border-border rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border flex-wrap">
          <div className="flex items-center gap-2 bg-bg-elevated border border-border rounded-xl px-3 py-2 flex-1 min-w-[180px] max-w-xs">
            <Search size={13} className="text-text-muted flex-shrink-0" />
            <input
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search leads..." className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none flex-1 font-body"
            />
          </div>

          <div className="flex gap-1 bg-bg-elevated border border-border rounded-xl p-1">
            {["all", "HOT", "WARM", "COLD"].map(p => (
              <button key={p} onClick={() => { setPriorityFilter(p); setPage(1); }}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  priorityFilter === p
                    ? p === "HOT" ? "bg-red-500/20 text-red-400"
                      : p === "WARM" ? "bg-amber-500/20 text-amber-400"
                        : p === "COLD" ? "bg-blue-500/20 text-blue-400"
                          : "bg-accent/15 text-accent"
                    : "text-text-muted hover:text-text-secondary"
                )}>
                {p === "all" ? "All" : p}
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            {selected.size > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-accent/10 border border-accent/20 rounded-xl text-xs text-accent">
                <span>{selected.size} selected</span>
                <button className="hover:text-danger ml-1">
                  <Trash2 size={11} />
                </button>
              </div>
            )}
            <button className="flex items-center gap-1.5 px-3 py-2 bg-bg-elevated border border-border rounded-xl text-xs text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-elevated/50">
                <th className="px-4 py-3 border-b border-border w-8">
                  <input type="checkbox" className="rounded border-border accent-accent"
                    checked={selected.size === paginated.length && paginated.length > 0}
                    onChange={e => setSelected(e.target.checked ? new Set(paginated.map(l => l.id)) : new Set())}
                  />
                </th>
                <Th label="Business" field="business_name" />
                <Th label="Category" field="category" />
                <Th label="Source" />
                <Th label="Intent" field="score" className="text-center" />
                <Th label="Score" field="score" className="text-center" />
                <Th label="Priority" field="priority" />
                <Th label="Status" field="status" />
                <th className="px-4 py-3 border-b border-border w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.map(lead => (
                <tr key={lead.id}
                  onClick={() => setActiveDetail(lead)}
                  className="table-row-hover cursor-pointer transition-colors group">
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-border accent-accent"
                      checked={selected.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-xs font-bold text-text-secondary flex-shrink-0">
                        {lead.business_name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary leading-none">{truncate(lead.business_name, 22)}</p>
                        <p className="text-xs text-text-muted mt-0.5">{lead.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary bg-bg-elevated border border-border px-2 py-1 rounded-lg">
                      {lead.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-muted">{lead.source}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreRing score={lead.intent_summary ? Math.min(lead.score + 5, 99) : Math.max(lead.score - 10, 20)} size={36} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreRing score={lead.score} size={36} />
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={lead.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={statusBadge(lead.status)}>{lead.status}</Badge>
                  </td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setStarred(s => { const n = new Set(s); n.has(lead.id) ? n.delete(lead.id) : n.add(lead.id); return n; })}
                        className={cn("p-1.5 rounded-lg transition-colors", starred.has(lead.id) ? "text-amber-400" : "text-text-muted hover:text-amber-400")}
                      >
                        <Star size={12} fill={starred.has(lead.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-xs text-text-muted">
            Showing <span className="text-text-secondary">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span className="text-text-secondary">{filtered.length}</span>
          </p>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-text-primary hover:border-border-strong disabled:opacity-40 transition-colors">
              <ChevronLeft size={12} />
            </button>
            {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={cn("w-7 h-7 text-xs rounded-lg transition-colors",
                  page === p ? "bg-accent text-white" : "border border-border text-text-muted hover:text-text-primary hover:border-border-strong")}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-text-primary hover:border-border-strong disabled:opacity-40 transition-colors">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {activeDetail && (
        <LeadDetailPanel lead={activeDetail} onClose={() => setActiveDetail(null)} />
      )}
    </div>
  );
}
