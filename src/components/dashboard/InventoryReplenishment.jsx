import React from 'react';
import { ShieldAlert, Truck, CheckCircle } from 'lucide-react';

export default function InventoryReplenishment({ criticalItems, onReorder }) {
  const pendingActionsCount = criticalItems.filter((i) => !i.reordered).length;

  return (
    <div className="lg:col-span-6 rounded-xl border border-white/120 border-slate-800/90 bg-slate-900/50 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h2 className="text-base font-semibold text-white">Priority Inventory Replenishment</h2>
        </div>
        <span className="text-xs text-slate-400">{pendingActionsCount} pending actions</span>
      </div>

      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-y border-slate-800">
            <tr>
              <th className="py-2.5 px-3">SKU & Item</th>
              <th className="py-2.5 px-3">Warehouse</th>
              <th className="py-2.5 px-3 text-right">On Hand / Target</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {criticalItems.map((item) => (
              <tr key={item.sku} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3">
                  <div className="font-medium text-slate-200">{item.name}</div>
                  <div className="font-mono text-[11px] text-slate-500">{item.sku} · {item.category}</div>
                </td>
                <td className="py-3 px-3 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.warehouse}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  <span className="text-rose-400 font-bold">{item.currentQty}</span>
                  <span className="text-slate-500"> / {item.threshold}</span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${
                    item.status === 'Critical Alert' ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  {item.reordered ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> PO Sent
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onReorder(item.sku)}
                      className="px-2.5 py-1 rounded bg-indigo-600/80 hover:bg-indigo-600 text-[11px] font-medium text-white shadow-sm transition-colors"
                    >
                      Issue PO
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
