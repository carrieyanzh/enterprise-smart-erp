import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  DollarSign,
  FileText
} from 'lucide-react';

export default function FiscalCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const events = [
    {
      id: 1,
      date: 'Oct 08, 2026',
      time: '09:00 AM EST',
      title: 'Q4 Global Supplier Ingot Shipment (Maersk Line)',
      type: 'Logistics',
      tag: 'Shipping',
      color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
    },
    {
      id: 2,
      date: 'Oct 15, 2026',
      time: '05:00 PM EST',
      title: 'Corporate Federal Tax Filing & VAT Reconciliation',
      type: 'Finance',
      tag: 'Compliance',
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    },
    {
      id: 3,
      date: 'Oct 22, 2026',
      time: '11:30 AM EST',
      title: 'Bi-Weekly Global Payroll & Treasury Run ($1.42M)',
      type: 'Payroll',
      tag: 'Treasury',
      color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    },
    {
      id: 4,
      date: 'Oct 28, 2026',
      time: '02:00 PM EST',
      title: 'Warehouse Automated Inventory Cycle Audit (Austin Hub)',
      type: 'Operations',
      tag: 'Audit',
      color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">Calendar & Fiscal Schedules</h1>
            <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">
              Operations Hub
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Scheduled supply chain dispatches, statutory tax deadlines, and liquidity disbursement milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-slate-300">
            <button type="button" className="p-1 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
            <span className="px-2 font-medium">{selectedMonth}</span>
            <button type="button" className="p-1 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-800/90 bg-slate-900/50 p-5 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-indigo-400" />
            Upcoming Fiscal & Supply Milestones
          </h2>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${evt.color}`}>
                      {evt.tag}
                    </span>
                    <span className="text-xs font-medium text-slate-200">{evt.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>{evt.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" /> {evt.time}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-5 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-white">Fiscal Snapshot</h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Current Quarter Progress</span>
              <div className="text-lg font-bold font-mono text-white mt-1">Day 4 of 92 (Q4)</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '4.3%' }}></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Next Audit Date</span>
              <div className="text-sm font-semibold text-emerald-400 mt-1">Oct 28, 2026 (Austin Hub)</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Automated barcode drone tally scheduled.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
