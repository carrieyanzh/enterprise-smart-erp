import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, Plus } from 'lucide-react';
import HeaderControls from './HeaderControls';
import KpiGrid from './KpiGrid';
import CashFlowChart from './CashFlowChart';
import StockVolumeChart from './StockVolumeChart';
import InventoryReplenishment from './InventoryReplenishment';
import TreasuryLedger from './TreasuryLedger';
import TransactionModal from './TransactionModal'; // Ensure this points to TransactionModal.jsx

export default function DashboardOverview({ onNavigateToProducts = () => {} }) {
  const [timeframe, setTimeframe] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // 1. Unified State Variables for Database Data & Modals
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility controller

  // 2. Fetch function marked properly with the "async" keyword
  const fetchDashboardTelemetry = async () => {
    try {
      /* const response = await fetch('http://localhost:5000/api/dashboard/metrics'); */
      const response = await fetch('https://onrender.com');
      if (!response.ok) {
        throw new Error(`Server connection failed: Status ${response.status}`);
      }
      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error("Dashboard backend engine sync failure:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. React hook to boot the network engine safely on mount
  useEffect(() => {
    fetchDashboardTelemetry();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardTelemetry();
    setIsRefreshing(false);
    showToast('Real-time ERP cash flow and warehouse database feeds refreshed successfully.');
  };

  const handleTransactionSuccess = (msg) => {
    showToast(msg);
    fetchDashboardTelemetry(); // Recalculate financial cards instantly on dynamic database insert!
  };

  const handleReorder = (sku) => {
    if (dashboardData && dashboardData.criticalItems) {
      const updatedItems = dashboardData.criticalItems.map((item) =>
        item.sku === sku ? { ...item, reordered: true } : item
      );
      setDashboardData({ ...dashboardData, criticalItems: updatedItems });
    }
    showToast(`Automated PO generated for ${sku}. Sent to Procurement.`);
  };

  // 4. Critical Error view fallback
  if (error) return (
    <div className="w-full h-screen bg-slate-950 flex justify-center items-center text-rose-400 font-medium border-2 border-white/40 rounded-2xl m-4">
      Database Telemetry Sync Error: {error}
    </div>
  );

  return (
    <div className="w-full text-slate-100 bg-slate-950 pl-2 pr-6 py-6 space-y-8 border-2 border-white/40 rounded-2xl shadow-xl transition-all">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Modern Header Row Custom Action Button Wrapper */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-2">
        <HeaderControls
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onExport={() => showToast('Generating fiscal audit CSV and executive summary PDF...')}
          onNavigateToProducts={onNavigateToProducts}
        />
        
        {/* Dynamic Entry Form Dialog Open Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 self-start sm:self-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/10 border border-white/10 transition-all"
        >
          <Plus className="w-4 h-4" />
          Log Transaction
        </button>
      </div>

      {/* 5. In-Frame Conditional Render */}
      {loading || !dashboardData ? (
        <div className="w-full h-96 flex flex-col justify-center items-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <span className="text-sm tracking-wider font-mono">CONNECTING TO NODE.JS ERP ENGINE...</span>
        </div>
      ) : (
        <>
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
        </>
      )}

      {/* 6. Secure HTML Form Overlay Element Placement Context (Inside main return) */}
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTransactionAdded={handleTransactionSuccess} 
      />
    </div>
  );
}
