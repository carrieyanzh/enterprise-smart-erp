import React from 'react';
import { DollarSign, ShoppingCart, Boxes, AlertTriangle, ArrowUpRight } from 'lucide-react';
import kpiData from '../../../data/kpiData.json'; // Adjust the import path as needed

export default function KpiGrid({ criticalItemsCount }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1: Total Revenue */}
      <div className="rounded-xl border border-white/120 border-slate-800/90 bg-slate-900/60 p-4 shadow-sm hover:border-slate-700/80 transition-all flex flex-col justify-between group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Total Revenue</span>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono">$2,845,920</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="flex items-center text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.8%
            </span>
            <span className="text-slate-400">vs last period</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Gross Margin: 34.2%</span>
          <span className="font-mono text-slate-300">ARR $34.1M</span>
        </div>
      </div>

      {/* KPI 2: Sales Orders */}
      <div className="rounded-xl border border-white/120 border-slate-800/90 bg-slate-900/60 p-4 shadow-sm hover:border-slate-700/80 transition-all flex flex-col justify-between group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Sales Orders</span>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono">12,480</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="flex items-center text-indigo-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +9.4%
            </span>
            <span className="text-slate-400">fulfillment rate 98.6%</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Avg Value: $228</span>
          <span className="font-mono text-slate-300">312 Pending</span>
        </div>
      </div>

      {/* KPI 3: Active Inventory */}
      <div className="rounded-xl border border-white/120 border-slate-800/90 bg-slate-900/60 p-4 shadow-sm hover:border-slate-700/80 transition-all flex flex-col justify-between group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Active Inventory</span>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
            <Boxes className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono">
            184,320 <span className="text-sm font-normal text-slate-400">Units</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="text-cyan-400 font-semibold">6 Regional Hubs</span>
            <span className="text-slate-400">· 99.2% available</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Turnover: 4.8x / yr</span>
          <span className="font-mono text-slate-300">Cap: 82%</span>
        </div>
      </div>

      {/* KPI 4: Low Stock Alerts */}
      <div className="rounded-xl border border-white/120 border-rose-900/40 bg-slate-900/60 p-4 shadow-sm hover:border-rose-700/50 transition-all flex flex-col justify-between group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Low Stock Alerts</span>
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            14 <span className="text-xs font-normal text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Critical Attention</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="text-rose-400 font-semibold">{criticalItemsCount} SKUs Out of Buffer</span>
            <span className="text-slate-400">· 9 Approaching Min</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Avg Lead: 4.2 Days</span>
          <span className="text-rose-300 font-medium">Auto-PO Ready</span>
        </div>
      </div>
    </div>
  );
}
