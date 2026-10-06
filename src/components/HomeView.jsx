import React from 'react';
import { Building2, ArrowRight, Package, TrendingUp, Boxes, Calendar } from 'lucide-react';

export default function HomeView({ onNavigate }) {
  return (
    /* Added "border-8 border-white p-6 rounded-2xl" here to create the big white border */    
    <div className="space-y-6 max-w-5xl py-4 border border-white/100 rounded-2xl">  
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" /> YanTech Enterprise Portal · Production
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Intelligent Enterprise ERP & Liquidity Management
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unified financial telemetry, multi-hub inventory allocation, automated procurement triggers, and real-time cash flow analytics in a single mission-critical dashboard.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 font-medium text-xs text-slate-200 transition-colors"
            >
              <Package className="w-4 h-4 text-cyan-400" />
              <span>View 184k SKU Catalog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('dashboard')}
          className="cursor-pointer p-5 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Cash Flow Analytics</h3>
          <p className="text-xs text-slate-400 mt-1">
            Track consolidated multi-currency inflows, outflows, and net working capital burn rate.
          </p>
        </div>

        <div
          onClick={() => onNavigate('products')}
          className="cursor-pointer p-5 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
            <Boxes className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Stock Category Volume</h3>
          <p className="text-xs text-slate-400 mt-1">
            Categorical stock telemetry with automatic low-threshold safety reorder notifications.
          </p>
        </div>

        <div
          onClick={() => onNavigate('calendar')}
          className="cursor-pointer p-5 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Fiscal Schedule</h3>
          <p className="text-xs text-slate-400 mt-1">
            Global freight arrivals, corporate tax filing milestones, and bi-weekly payroll disbursements.
          </p>
        </div>
      </div>
    </div>
  );
}
