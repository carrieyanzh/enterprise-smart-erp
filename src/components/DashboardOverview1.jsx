import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Boxes,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RefreshCw,
  PlusCircle,
  Clock,
  ShieldAlert,
  CheckCircle,
  Truck,
  Building,
  Layers,
  FileSpreadsheet,
  CalendarDays
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

/**
 * @param {Object} props
 * @param {() => void} [props.onNavigateToProducts]
 */
export default function DashboardOverview({ onNavigateToProducts = () => {} }) {
  const [timeframe, setTimeframe] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Cash Flow Trend data datasets based on selected timeframe
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

  // Stock Category Volume Data
  const stockCategoryData = [
    { category: 'Semiconductors', inStock: 54.2, safetyMin: 22.0, valuation: '$920k' },
    { category: 'Heavy Machinery', inStock: 18.6, safetyMin: 12.0, valuation: '$1.4M' },
    { category: 'Raw Materials', inStock: 68.4, safetyMin: 35.0, valuation: '$640k' },
    { category: 'Precision Optics', inStock: 28.1, safetyMin: 20.0, valuation: '$810k' },
    { category: 'Robotics & Drives', inStock: 14.8, safetyMin: 15.5, valuation: '$1.1M' },
    { category: 'Packaging/Boxes', inStock: 82.5, safetyMin: 40.0, valuation: '$190k' },
  ];

  // Critical Low Stock SKUs requiring action
  const [criticalItems, setCriticalItems] = useState([
    {
      sku: 'MCU-STM32-H7',
      name: 'High-Perf 32-bit Cortex MCU',
      category: 'Semiconductors',
      warehouse: 'Austin Hub (TX-02)',
      currentQty: 184,
      threshold: 800,
      leadTime: '5 Days',
      status: 'Critical Alert',
      reordered: false,
    },
    {
      sku: 'SRV-DRV-48V',
      name: 'Industrial Servo Drive Controller',
      category: 'Robotics & Drives',
      warehouse: 'Chicago Logistics (IL-01)',
      currentQty: 42,
      threshold: 120,
      leadTime: '8 Days',
      status: 'Low Stock',
      reordered: false,
    },
    {
      sku: 'ALU-6061-T6',
      name: 'Structural Aerospace Aluminum Billets',
      category: 'Raw Materials',
      warehouse: 'Seattle Port (WA-04)',
      currentQty: 310,
      threshold: 950,
      leadTime: '3 Days',
      status: 'Critical Alert',
      reordered: false,
    },
    {
      sku: 'OPT-LNS-25MM',
      name: 'Infrared Optical Sapphire Collimator',
      category: 'Precision Optics',
      warehouse: 'Frankfurt Hub (EU-01)',
      currentQty: 68,
      threshold: 200,
      leadTime: '12 Days',
      status: 'Low Stock',
      reordered: false,
    },
  ]);

  // Recent ERP transactions
  const recentTransactions = [
    {
      id: 'TRX-94821',
      entity: 'Global Aerospace Ltd',
      type: 'Cash Inflow',
      amount: '+$412,800.00',
      status: 'Settled',
      category: 'Contract Milestone 2',
      timestamp: '18 mins ago',
    },
    {
      id: 'TRX-94820',
      entity: 'Kyoto Precision Corp',
      type: 'Cash Outflow',
      amount: '-$128,450.00',
      status: 'Clearing',
      category: 'Raw Silicon Ingot PO',
      timestamp: '1 hour ago',
    },
    {
      id: 'TRX-94819',
      entity: 'Maersk Logistics Supply',
      type: 'Cash Outflow',
      amount: '-$34,200.00',
      status: 'Settled',
      category: 'Intermodal Freight',
      timestamp: '3 hours ago',
    },
    {
      id: 'TRX-94818',
      entity: 'Vanguard Medical Devices',
      type: 'Cash Inflow',
      amount: '+$195,600.00',
      status: 'Settled',
      category: 'Batch Delivery Q4',
      timestamp: '5 hours ago',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Real-time ERP cash flow and warehouse feeds refreshed successfully.');
    }, 600);
  };

  const handleReorder = (sku) => {
    setCriticalItems((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, reordered: true } : item
      )
    );
    showToast(`Automated PO generated for ${sku}. Sent to Procurement.`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Custom Recharts Tooltip for Line Chart
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700/80 p-3 rounded-lg shadow-xl text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-semibold text-slate-200 border-b border-slate-800 pb-1">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-mono font-medium text-white">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Recharts Tooltip for Bar Chart
  const CustomBarTooltip = ({ active, payload, label }) => {
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

  return (
    // <div className="space-y-6 max-w-7xl mx-auto">
     <div className="w-full text-slate-100 bg-slate-950 pl-2 pr-6 py-6 space-y-8 transition-all">  
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Dashboard Title & Executive Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Enterprise Dashboard
            </h1>
            <span className="text-[11px] font-mono font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              Q4 FY2026
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time financial liquidity, sales throughput, and multi-hub inventory telemetry.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Selector */}
          <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800">
            {['7d', '30d', '90d', '1y'].map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md uppercase transition-all ${
                  timeframe === tf
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Refresh Action */}
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>

          {/* Export Report */}
          <button
            type="button"
            onClick={() => showToast('Generating fiscal audit CSV and executive summary PDF...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export</span>
          </button>

          {/* Manage Products CTA */}
          <button
            type="button"
            onClick={onNavigateToProducts}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Manage Catalog</span>
          </button>
        </div>
      </div>

      {/* 4 REQUIRED KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Revenue */}
        <div className="rounded-xl border border-white border-slate-800/90 bg-slate-900/60 p-4 shadow-sm hover:border-slate-700/80 transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              $2,845,920
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs">
              <span className="flex items-center text-emerald-400 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.8%
              </span>
              <span className="text-slate-400">vs last period</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Gross Margin: 34.2%</span>
            <span className="font-mono text-slate-300">ARR $34.1M</span>
          </div>
        </div>

        {/* KPI 2: Sales Orders */}
        <div className="rounded-xl border border-white border-slate-800/90 bg-slate-900/60 p-4 shadow-sm hover:border-slate-700/80 transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Sales Orders</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              12,480
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs">
              <span className="flex items-center text-indigo-400 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +9.4%
              </span>
              <span className="text-slate-400">fulfillment rate 98.6%</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Avg Value: $228</span>
            <span className="font-mono text-slate-300">312 Pending</span>
          </div>
        </div>

        {/* KPI 3: Active Inventory */}
        <div className="rounded-xl border border-white border-slate-800/90 bg-slate-900/60 p-4 shadow-sm hover:border-slate-700/80 transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Inventory</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              184,320 <span className="text-sm font-normal text-slate-400">Units</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs">
              <span className="text-cyan-400 font-semibold">6 Regional Hubs</span>
              <span className="text-slate-400">· 99.2% available</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Turnover: 4.8x / yr</span>
            <span className="font-mono text-slate-300">Cap: 82%</span>
          </div>
        </div>

        {/* KPI 4: Low Stock Alerts */}
        <div className="rounded-xl border border-white border-rose-900/40 bg-slate-900/60 p-4 shadow-sm hover:border-rose-700/50 transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Low Stock Alerts</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
              14 <span className="text-xs font-normal text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Critical Attention</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs">
              <span className="text-rose-400 font-semibold">5 SKUs Out of Buffer</span>
              <span className="text-slate-400">· 9 Approaching Min</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Avg Lead: 4.2 Days</span>
            <span className="text-rose-300 font-medium">Auto-PO Ready</span>
          </div>
        </div>
      </div>

      {/* RECHARTS SECTION: Cash Flow Trends & Stock Category Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts Chart 1: Cash Flow Trends (LineChart) */}
        {/* <div className="lg:col-span-7 rounded-xl border border-white border-slate-800/90 bg-slate-900/50 p-5 shadow-sm flex flex-col"> */}
        <div className="lg:col-span-6 rounded-xl border border-white border-slate-800/90 bg-slate-900/50 p-5 shadow-sm">
    
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-white">Cash Flow Trends</h2>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  +$1.13M Net Run-Rate
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Consolidated Operational Inflow, Outflow & Net Operating Cash
              </p>
            </div>

            {/* Quick stats on chart */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300">Inflow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span className="text-slate-300">Outflow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                <span className="text-slate-300">Net Flow</span>
              </div>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cashFlowDatasets[timeframe] || cashFlowDatasets['30d']}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `$${val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${val / 1000}k`}`}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="inflow"
                  name="Operating Inflow"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#10b981' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="outflow"
                  name="Operational Outflow"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot={{ r: 3, fill: '#f43f5e' }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  name="Net Cash Flow"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6366f1' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>Treasury Ratio: <strong>2.84x Quick Ratio</strong></span>
            <span>DSO (Days Sales Outstanding): <strong>26.4 Days</strong></span>
            <span className="text-emerald-400 font-medium">Liquidity Stress Score: Optimal (96/100)</span>
          </div>
        </div>

        {/* Recharts Chart 2: Stock Category Volume (BarChart) */}
        <div className="lg:col-span-6 rounded-xl border border-white border-slate-800/90 bg-slate-900/50 p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Stock Category Volume</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Current volume vs safety replenishment levels (k Units)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">Total: $4.46M</span>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stockCategoryData}
                margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
              >
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="category"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `${val}k`}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar
                  dataKey="inStock"
                  name="In Stock Volume"
                  fill="#38bdf8"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
                <Bar
                  dataKey="safetyMin"
                  name="Safety Threshold"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-400"></span>
                <span>In Stock</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                <span>Safety Threshold</span>
              </span>
            </div>
            <button
              type="button"
              onClick={onNavigateToProducts}
              className="text-indigo-400 hover:text-indigo-300 font-medium text-xs"
            >
              Category Details →
            </button>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: Critical Restock Action Table & Recent Financial Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table 1: Critical Low Stock SKUs requiring action */}
        <div className="lg:col-span-6 rounded-xl border border-white border-slate-800/90 bg-slate-900/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h2 className="text-base font-semibold text-white">Priority Inventory Replenishment</h2>
            </div>
            <span className="text-xs text-slate-400">
              {criticalItems.filter((i) => !i.reordered).length} pending actions
            </span>
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
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${
                          item.status === 'Critical Alert'
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
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
                          onClick={() => handleReorder(item.sku)}
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

        {/* Table 2: Recent Financial Ledger */}
        <div className="lg:col-span-6 rounded-xl border border-white border-slate-800/90 bg-slate-900/50 p-5 shadow-sm flex flex-col justify-between">
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
                <div
                  key={trx.id}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-center justify-between"
                >
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
                    <div
                      className={`text-xs font-mono font-bold ${
                        trx.type === 'Cash Inflow' ? 'text-emerald-400' : 'text-slate-300'
                      }`}
                    >
                      {trx.amount}
                    </div>
                    <span
                      className={`text-[10px] font-mono ${
                        trx.status === 'Settled' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      ● {trx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Daily Clearing Vol: $771,050.00</span>
            <button
              type="button"
              onClick={() => showToast('Opening complete treasury ledger...')}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Audit Trail →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
