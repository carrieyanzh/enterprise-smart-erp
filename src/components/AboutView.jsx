import React from 'react';
import { Building2, Server, Cpu, ShieldCheck, Database, Layers, CheckCircle2 } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-1 border-b border-slate-800/80">
        <h1 className="text-2xl font-bold tracking-tight text-white">System Architecture & ERP Core</h1>
        <p className="text-xs text-slate-400 mt-1">
          Technical specifications, compliance attestations, and active microservices cluster topography.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Nexus Enterprise ERP Suite</h2>
            <p className="text-xs text-slate-400">Release Version 4.8.2-Enterprise · High-Throughput Engine</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Designed for global manufacturing, electronics supply chains, and multinational treasury management.
          Combines sub-second double-entry accounting reconciliation with predictive warehouse replenishment and real-time inventory telemetry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
              <Server className="w-4 h-4" /> Multi-Region High Availability
            </div>
            <p className="text-[11px] text-slate-400">
              Active-active cluster replication across US-East, US-West, and EU-Central with zero-downtime failover.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-2">
              <Cpu className="w-4 h-4" /> Real-time Analytics Engine
            </div>
            <p className="text-[11px] text-slate-400">
              Integrated streaming analytics for instant cash-flow forecasting and automatic safety threshold alerts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-2">
              <ShieldCheck className="w-4 h-4" /> SOC2 Type II & ISO 27001
            </div>
            <p className="text-[11px] text-slate-400">
              End-to-end cryptographic audit trails with tamper-proof event ledgers and hardware-enforced 2FA.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-2">
              <Database className="w-4 h-4" /> Stock & Supply Orchestration
            </div>
            <p className="text-[11px] text-slate-400">
              Direct EDI / API integration with logistics carriers including Maersk, FedEx Cargo, and regional 3PLs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
