import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function CashFlowChart({ chartData = [] }) {
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl font-mono text-xs text-slate-200">
          <p className="font-bold mb-1 text-slate-400">{label}</p>
          <p className="text-emerald-400">Inflow: \${payload[0].value.toLocaleString()}</p>
          <p className="text-rose-400">Outflow: \${payload[1].value.toLocaleString()}</p>
          <p className="text-indigo-400 border-t border-slate-800 mt-1 pt-1">Net: \${payload[2].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="lg:col-span-6 bg-slate-900/40 p-6 rounded-xl border border-white/120 shadow-lg">  
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Cash Flow Trends</span>
            <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Live Net Run-Rate
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Consolidated Operational Inflow, Outflow & Net Operating Cash</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
            <span className="text-slate-300">Inflow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block"></span>
            <span className="text-slate-300">Outflow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span>
            <span className="text-slate-300">Net Flow</span>
          </div>
        </div>
      </div>

      {/* Embedded Chart Graphic Core Viewport Context */}
      <div className="w-full h-64 text-slate-400 font-mono text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#64748b" 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(v) => `$${v >= 1000000 ? (v/1000000).toFixed(1) + 'M' : (v/1000).toFixed(0) + 'k'}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorInflow)" />
            <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorOutflow)" />
            <Area type="monotone" dataKey="net" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNet)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 border-t border-slate-800/80 mt-4 pt-3 text-center text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Treasury Ratio</span>
          <span className="font-semibold text-slate-200 mt-0.5 block">2.84x Quick Ratio</span>
        </div>
        <div className="border-x border-slate-800/80">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider">DSO (Days Sales Outstanding)</span>
          <span className="font-semibold text-slate-200 mt-0.5 block">26.4 Days</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Liquidity Stress Score</span>
          <span className="font-semibold text-emerald-400 mt-0.5 block">Optimal (96/100)</span>
        </div>
      </div>
    </div>
  );
}
