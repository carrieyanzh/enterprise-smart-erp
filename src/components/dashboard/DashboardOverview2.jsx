import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import HeaderControls from './HeaderControls';
import KpiGrid from './KpiGrid';
import CashFlowChart from './CashFlowChart';
import StockVolumeChart from './StockVolumeChart';
import InventoryReplenishment from './InventoryReplenishment';
import TreasuryLedger from './TreasuryLedger';

export default function DashboardOverview({ onNavigateToProducts = () => {} }) {
  const response = await fetch('http://localhost:5000/api/dashboard/metrics');
  
  const [timeframe, setTimeframe] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // 1. Unified Dashboard State Variables
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Main Fetch Engine Function
  const fetchDashboardTelemetry = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/metrics');
      if (!response.ok) {
        throw new Error(`Server connection failed: Status ${response.status}`);
      }
      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error("Dashboard engine failure:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Trigger API fetch on component initialization
  useEffect(() => {
    fetchDashboardTelemetry();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 4. Update Manual Refresh to poll Node.js Engine
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardTelemetry();
    setIsRefreshing(false);
    showToast('Real-time ERP cash flow and warehouse database feeds refreshed successfully.');
  };

  const handleReorder = (sku) => {
    // Optimistic UI state adjustment for criticalItems slice
    if (dashboardData && dashboardData.criticalItems) {
      const updatedItems = dashboardData.criticalItems.map((item) =>
        item.sku === sku ? { ...item, reordered: true } : item
      );
      setDashboardData({ ...dashboardData, criticalItems: updatedItems });
    }
    showToast(`Automated PO generated for ${sku}. Sent to Procurement.`);
  };

  // 5. Global Loading and Error UI Overlays
  if (loading) return (
    <div className="w-full h-screen bg-slate-950 flex flex-col justify-center items-center gap-3 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      <span className="text-sm">Connecting to Node.js ERP Server Engine...</span>
    </div>
  );

  if (error) return (
    <div className="w-full h-screen bg-slate-950 flex justify-center items-center text-rose-400 font-medium">
      Database Telemetry Sync Error: {error}
    </div>
  );

  return (
    <div className="w-full text-slate-100 bg-slate-950 pl-2 pr-6 py-6 space-y-8 transition-all">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      <HeaderControls
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onExport={() => showToast('Generating fiscal audit CSV and executive summary PDF...')}
        onNavigateToProducts={onNavigateToProducts}
      />

      {/* 6. Distribute Data downward into children via Props safely */}
      <KpiGrid 
        kpis={dashboardData.kpis} 
        criticalItemsCount={dashboardData.criticalItems.filter((i) => !i.reordered).length} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CashFlowChart chartData={dashboardData.cashFlowDatasets[timeframe] || dashboardData.cashFlowDatasets['30d']} />
        <StockVolumeChart stockCategoryData={dashboardData.stockCategoryData} onNavigateToProducts={onNavigateToProducts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <InventoryReplenishment criticalItems={dashboardData.criticalItems} onReorder={handleReorder} />
        <TreasuryLedger recentTransactions={dashboardData.recentTransactions} onAuditClick={() => showToast('Opening complete treasury ledger...')} />
      </div>
    </div>
  );
}
