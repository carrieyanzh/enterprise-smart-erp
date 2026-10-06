import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const CustomBarTooltip = ({ active, payload, label, stockCategoryData }) => {
  if (active && payload && payload.length) {
    const dataPoint = stockCategoryData.find((d) => d.category === label);
    return (
      <div className="bg-slate-900 border border-slate-700/80 p-3 rounded-lg shadow-xl text-xs space-y-1.5 backdrop-blur-md">
        <p className="font-semibold text-slate-200 border-b border-slate-800 pb-1">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-indigo-400">Current Stock:</span>
          <span className="font-mono font-medium text-white">{payload[0]?.value}k Units</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-amber-400">Safety Threshold:</span>
          <span className="font-mono font-medium text-white">{payload[1]?.value}k Units</span>
        </div>
        {dataPoint && (
          <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-1 text-[11px]">
            <span className="text-slate-400">Inventory Value:</span>
            <span className="font-mono text-emerald-400 font-semibold">{dataPoint.valuation}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function StockVolumeChart({ stockCategoryData, onNavigateToProducts }) {
  return (
    <div className="lg:col-span-6 rounded-xl border-white/120 border border-slate-800/90 bg-slate-900/50 p-5 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-white">Stock Category Volume</h2>
          <p className="text-xs text-slate-400 mt-0.5">Current volume vs safety replenishment levels (k Units)</p>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Total: $4.46M</span>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stockCategoryData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="category" stroke="#64748b" fontSize={10} tickLine={false} interval={0} angle={-25} textAnchor="end" axisLine={{ stroke: '#334155' }} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#334155' }} tickFormatter={(val) => `${val}k`} />
            <Tooltip content={<CustomBarTooltip stockCategoryData={stockCategoryData} />} />
            <Bar dataKey="inStock" name="In Stock Volume" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={18} />
            <Bar dataKey="safetyMin" name="Safety Threshold" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-sky-400" /><span>In Stock</span></span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /><span>Safety Threshold</span></span>
        </div>
        <button type="button" onClick={onNavigateToProducts} className="text-indigo-400 hover:text-indigo-300 font-medium text-xs">
          Category Details →
        </button>
      </div>
    </div>
  );
}
