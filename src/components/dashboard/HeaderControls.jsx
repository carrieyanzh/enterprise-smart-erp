import React from 'react';
import { RefreshCw, Download, PlusCircle } from 'lucide-react';

export default function HeaderControls({ 
  timeframe, 
  setTimeframe, 
  isRefreshing, 
  onRefresh, 
  onExport, 
  onNavigateToProducts 
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b border-slate-800/80">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-white">Enterprise Dashboard</h1>
          <span className="text-[11px] font-mono font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            Q4 FY2026
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Real-time financial liquidity, sales throughput, and multi-hub inventory telemetry.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800">
          {['7d', '30d', '90d', '1y'].map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md uppercase transition-all ${
                timeframe === tf ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Refresh Live Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
          <span className="hidden sm:inline">Sync</span>
        </button>

        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span>Export</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToProducts}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Manage Catalog</span>
        </button>
      </div>
    </div>
  );
}
