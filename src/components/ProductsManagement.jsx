import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Download,
  AlertCircle,
  CheckCircle,
  Boxes,
  Truck,
  Building,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState(null);

  // Products catalog data
  const [products, setProducts] = useState([
    {
      id: 'PRD-1001',
      sku: 'MCU-STM32-H7',
      name: 'High-Perf 32-bit Cortex MCU',
      category: 'Semiconductors',
      warehouse: 'Austin Hub (TX-02)',
      unitCost: 18.50,
      unitPrice: 38.00,
      stock: 184,
      threshold: 800,
      status: 'Critical Alert',
    },
    {
      id: 'PRD-1002',
      sku: 'SRV-DRV-48V',
      name: 'Industrial Servo Drive Controller',
      category: 'Robotics & Drives',
      warehouse: 'Chicago Logistics (IL-01)',
      unitCost: 220.00,
      unitPrice: 485.00,
      stock: 42,
      threshold: 120,
      status: 'Low Stock',
    },
    {
      id: 'PRD-1003',
      sku: 'ALU-6061-T6',
      name: 'Structural Aerospace Aluminum Billets',
      category: 'Raw Materials',
      warehouse: 'Seattle Port (WA-04)',
      unitCost: 85.00,
      unitPrice: 160.00,
      stock: 310,
      threshold: 950,
      status: 'Critical Alert',
    },
    {
      id: 'PRD-1004',
      sku: 'OPT-LNS-25MM',
      name: 'Infrared Optical Sapphire Collimator',
      category: 'Precision Optics',
      warehouse: 'Frankfurt Hub (EU-01)',
      unitCost: 140.00,
      unitPrice: 320.00,
      stock: 68,
      threshold: 200,
      status: 'Low Stock',
    },
    {
      id: 'PRD-1005',
      sku: 'ROB-ARM-6AXIS',
      name: 'High-Speed 6-Axis Articulated Arm',
      category: 'Robotics & Drives',
      warehouse: 'Chicago Logistics (IL-01)',
      unitCost: 6500.00,
      unitPrice: 14200.00,
      stock: 14,
      threshold: 8,
      status: 'Optimal',
    },
    {
      id: 'PRD-1006',
      sku: 'FIB-CAB-100M',
      name: 'Armored Military-Grade Fiber Spool 100m',
      category: 'Semiconductors',
      warehouse: 'Austin Hub (TX-02)',
      unitCost: 45.00,
      unitPrice: 110.00,
      stock: 1240,
      threshold: 300,
      status: 'Optimal',
    },
    {
      id: 'PRD-1007',
      sku: 'HYD-PMP-500BAR',
      name: 'Heavy Electro-Hydraulic Pump 500 Bar',
      category: 'Heavy Machinery',
      warehouse: 'Munich Warehouse (DE-02)',
      unitCost: 3200.00,
      unitPrice: 6800.00,
      stock: 26,
      threshold: 15,
      status: 'Optimal',
    },
    {
      id: 'PRD-1008',
      sku: 'BOX-COR-IND-XL',
      name: 'Double-Wall Corrugated Industrial Crate',
      category: 'Packaging/Boxes',
      warehouse: 'Dallas Cargo Hub (TX-01)',
      unitCost: 2.10,
      unitPrice: 6.50,
      stock: 18200,
      threshold: 5000,
      status: 'Optimal',
    },
  ]);

  const categories = ['All', 'Semiconductors', 'Robotics & Drives', 'Raw Materials', 'Precision Optics', 'Heavy Machinery', 'Packaging/Boxes'];
  const statuses = ['All', 'Critical Alert', 'Low Stock', 'Optimal'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleQuickRestock = (sku) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.sku === sku ? { ...p, stock: p.stock + 500, status: 'Optimal' } : p
      )
    );
    showToast(`Restock PO completed for ${sku}. Stock count updated.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">Product & SKU Inventory</h1>
            <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              184,320 Active Units
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Global catalog inventory valuation, replenishment triggers, and warehouse allocation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast('Exported inventory catalog CSV to downloads.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('New SKU creation wizard opened.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New SKU</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-slate-800/90 bg-slate-900/60">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by SKU, product name, hub..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 text-xs text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">SKU / Item Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Available Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200">{p.name}</div>
                    <div className="font-mono text-[11px] text-slate-500">{p.sku} · ID: {p.id}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="font-medium">{p.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-slate-500" />
                      <span>{p.warehouse}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-200">
                    ${p.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    <span className={`font-bold ${p.stock < p.threshold ? 'text-rose-400' : 'text-slate-200'}`}>
                      {p.stock.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-[11px]"> / {p.threshold.toLocaleString()} min</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-medium border ${
                        p.status === 'Critical Alert'
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                          : p.status === 'Low Stock'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {p.stock < p.threshold ? (
                      <button
                        type="button"
                        onClick={() => handleQuickRestock(p.sku)}
                        className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-[11px] font-medium text-white transition-colors"
                      >
                        Restock +500
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono">In Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
