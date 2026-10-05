import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import HeaderControls from './HeaderControls';
import KpiGrid from './KpiGrid';
import CashFlowChart from './CashFlowChart';
import StockVolumeChart from './StockVolumeChart';
import InventoryReplenishment from './InventoryReplenishment';
import TreasuryLedger from './TreasuryLedger';

export default function DashboardOverview({ onNavigateToProducts = () => {} }) {
  const [timeframe, setTimeframe] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const cashFlowDatasets = {
    '7d': [
      { date: 'Mon', inflow: 94000, outflow: 62000, net: 32000 },
      { date: 'Tue', inflow: 112000, outflow: 74000, net: 38000 },
      { date: 'Wed', inflow: 145000, outflow: 88000, net: 57000 },
      { date: 'Thu', inflow: 98000, outflow: 71000, net: 27000 },
      { date: 'Fri', inflow: 188000, outflow: 104000, net: 84000 },
      { date: 'Sat', inflow: 64000, outflow: 39000, net: 25000 },
      { date: 'Sun', inflow: 42000, outflow: 28000, net: 14000 },
    ],
    '30d': [
      { date: 'Week 1', inflow: 480000, outflow: 310000, net: 170000 },
      { date: 'Week 2', inflow: 620000, outflow: 410000, net: 210000 },
      { date: 'Week 3', inflow: 590000, outflow: 395000, net: 195000 },
      { date: 'Week 4', inflow: 740000, outflow: 460000, net: 280000 },
    ],
    '90d': [
      { date: 'Jul', inflow: 1850000, outflow: 1220000, net: 630000 },
      { date: 'Aug', inflow: 2140000, outflow: 1390000, net: 750000 },
      { date: 'Sep', inflow: 2430000, outflow: 1510000, net: 920000 },
      { date: 'Oct', inflow: 2845920, outflow: 1710000, net: 1135920 },
    ],
    '1y': [
      { date: 'Q1', inflow: 5200000, outflow: 3800000, net: 1400000 },
      { date: 'Q2', inflow: 6400000, outflow: 4200000, net: 2200000 },
      { date: 'Q3', inflow: 7100000, outflow: 4600000, net: 2500000 },
      { date: 'Q4 (Est)', inflow: 8600000, outflow: 5100000, net: 3500000 },
    ],
  };

  const stockCategoryData = [
    { category: 'Semiconductors', inStock: 54.2, safetyMin: 22.0, valuation: '\$920k' },
    { category: 'Heavy Machinery', inStock: 18.6, safetyMin: 12.0, valuation: '\$1.4M' },
    { category: 'Raw Materials', inStock: 68.4, safetyMin: 35.0, valuation: '\$640k' },
    { category: 'Precision Optics', inStock: 28.1, safetyMin: 20.0, valuation: '\$810k' },
    { category: 'Robotics & Drives', inStock: 14.8, safetyMin: 15.5, valuation: '\$1.1M' },
    { category: 'Packaging/Boxes', inStock: 82.5, safetyMin: 40.0, valuation: '\$190k' },
  ];

  const [criticalItems, setCriticalItems] = useState([
    { sku: 'MCU-STM32-H7', name: 'High-Perf 32-bit Cortex MCU', category: 'Semiconductors', warehouse: 'Austin Hub (TX-02)', currentQty: 184, threshold: 800, leadTime: '5 Days', status: 'Critical Alert', reordered: false },
    { sku: 'SRV-DRV-48V', name: 'Industrial Servo Drive Controller', category: 'Robotics & Drives', warehouse: 'Chicago Logistics (IL-01)', currentQty: 42, threshold: 120, leadTime: '8 Days', status: 'Low Stock', reordered: false },
    { sku: 'ALU-6061-T6', name: 'Structural Aerospace Aluminum Billets', category: 'Raw Materials', warehouse: 'Seattle Port (WA-04)', currentQty: 310, threshold: 950, leadTime: '3 Days', status: 'Critical Alert', reordered: false },
    { sku: 'OPT-LNS-25MM', name: 'Infrared Optical Sapphire Collimator', category: 'Precision Optics', warehouse: 'Frankfurt Hub (EU-01)', currentQty: 68, threshold: 200, leadTime: '12 Days', status: 'Low Stock', reordered: false },
  ]);

  const recentTransactions = [
    { id: 'TRX-94821', entity: 'Global Aerospace Ltd', type: 'Cash Inflow', amount: '+\$412,800.00', status: 'Settled', category: 'Contract Milestone 2', timestamp: '18 mins ago' },
    { id: 'TRX-94820', entity: 'Kyoto Precision Corp', type: 'Cash Outflow', amount: '-\$128,450.00', status: 'Clearing', category: 'Raw Silicon Ingot PO', timestamp: '1 hour ago' },
    { id: 'TRX-94819', entity: 'Maersk Logistics Supply', type: 'Cash Outflow', amount: '-\$34,200.00', status: 'Settled', category: 'Intermodal Freight', timestamp: '3 hours ago' },
    { id: 'TRX-94818', entity: 'Vanguard Medical Devices', type: 'Cash Inflow', amount: '+\$195,600.00', status: 'Settled', category: 'Batch Delivery Q4', timestamp: '5 hours ago' },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Real-time ERP cash flow and warehouse feeds refreshed successfully.');
    }, 600);
  };

  const handleReorder = (sku) => {
    setCriticalItems((prev) => prev.map((item) => item.sku === sku ? { ...item, reordered: true } : item));
    showToast(`Automated PO generated for ${sku}. Sent to Procurement.`);
  };

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

      <KpiGrid criticalItemsCount={criticalItems.filter((i) => !i.reordered).length} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CashFlowChart chartData={cashFlowDatasets[timeframe] || cashFlowDatasets['30d']} />
        <StockVolumeChart stockCategoryData={stockCategoryData} onNavigateToProducts={onNavigateToProducts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <InventoryReplenishment criticalItems={criticalItems} onReorder={handleReorder} />
        <TreasuryLedger recentTransactions={recentTransactions} onAuditClick={() => showToast('Opening complete treasury ledger...')} />
      </div>
    </div>
  );
}
