import React from 'react';
import { CalendarDays } from 'lucide-react';

export default function TreasuryLedger({ recentTransactions, onAuditClick }) {
  return (
    <div className="lg:col-span-6 rounded-xl border border-white/120 border-slate-800/90 bg-slate-900/50 p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-semibold text-white">Live Treasury Ledger</h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">Node US-01</span>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((trx) => (
            <div key={trx.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200">{trx.entity}</span>
                  <span className="text-[10px] font-mono text-slate-500">{trx.id}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {trx.category} · <span className="text-slate-500">{trx.timestamp}</span>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-xs font-mono font-bold ${trx.type === 'Cash Inflow' ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {trx.amount}
                </div>
                <span className={`text-[10px] font-mono ${trx.status === 'Settled' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  ● {trx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400">Daily Clearing Vol: \$771,050.00</span>
        <button type="button" onClick={onAuditClick} className="text-indigo-400 hover:text-indigo-300 font-medium">
          Audit Trail →
        </button>
      </div>
    </div>
  );
}
