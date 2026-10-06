import React from 'react';
import * as Icons from 'lucide-react';
import kpiData from '../../../data/kpiData.json'; // Adjust the import path as needed

export default function KpiGrid({ criticalItemsCount }) {
  // Variant configurations for explicit styles
  const styles = {
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      border: 'border-slate-800/90 hover:border-slate-700/80',
      trendText: 'text-emerald-400 font-semibold'
    },
    indigo: {
      bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      border: 'border-slate-800/90 hover:border-slate-700/80',
      trendText: 'text-indigo-400 font-semibold'
    },
    cyan: {
      bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      border: 'border-slate-800/90 hover:border-slate-700/80',
      trendText: 'text-cyan-400 font-semibold'
    },
    rose: {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      border: 'border-rose-900/40 hover:border-rose-700/50',
      trendText: 'text-rose-400 font-semibold'
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi) => {        
        const IconComponent = Icons[kpi.icon];
        const currentStyle = styles[kpi.variant] || styles.emerald;
        const ArrowIcon = Icons.ArrowUpRight;
        
        let trendText = kpi.trend.text;
        if (trendText.includes('{criticalItemsCount}')) {
          trendText = trendText.replace('{criticalItemsCount}', criticalItemsCount);
        }

        return (
          <div
            key={kpi.id}
            className={`rounded-xl border border-white/120 bg-slate-900/60 p-4 shadow-sm transition-all flex flex-col justify-between group ${currentStyle.border}`}
          >
            {/* Header section */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{kpi.title}</span>
              <div className={`p-2 rounded-lg border group-hover:scale-105 transition-transform ${currentStyle.bg}`}>
                {IconComponent && <IconComponent className="w-4 h-4" />}
              </div>
            </div>

            {/* Main Value and Badges section */}
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
                {kpi.value}
                {kpi.valueUnit && (
                  <span className="text-sm font-normal text-slate-400">{kpi.valueUnit}</span>
                )}
                {kpi.badge && (
                  <span className={`text-xs font-normal px-2 py-0.5 rounded border ${currentStyle.bg}`}>
                    {kpi.badge}
                  </span>
                )}
              </div>
              
              {/* Trends section */}
              <div className="mt-1 flex items-center gap-1.5 text-xs">
                <span className={`flex items-center ${currentStyle.trendText}`}>
                  {kpi.trend.showArrow && ArrowIcon && <ArrowIcon className="w-3.5 h-3.5" />}
                  {trendText}
                </span>
                <span className="text-slate-400">{kpi.subtext}</span>
              </div>
            </div>

            {/* Footer section */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{kpi.footerLeft}</span>
              <span className={`font-mono ${kpi.isAlert ? 'text-rose-300 font-medium' : 'text-slate-300'}`}>
                {kpi.footerRight}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
