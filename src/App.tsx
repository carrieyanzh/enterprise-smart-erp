/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import DashboardLayout from './components/DashboardLayout.jsx';
// import DashboardOverview from './components/DashboardOverview.jsx';
import DashboardOverview from './components/Dashboard';
import ProductsManagement from './components/ProductsManagement.jsx';
import FiscalCalendar from './components/FiscalCalendar.jsx';
import AccountSettings from './components/AccountSettings.jsx';
import AboutView from './components/AboutView.jsx';
import {
  TrendingUp,
  Package,
  Calendar,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Building2,
  Boxes
} from 'lucide-react';

export default function App() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [currentTopMenu, setCurrentTopMenu] = useState('Dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavigate = (itemId: string) => {
    if (itemId === 'logout') {
      setShowLogoutModal(true);
      return;
    }
    setActiveItem(itemId);
    if (itemId === 'dashboard') {
      setCurrentTopMenu('Dashboard');
    } else {
      setCurrentTopMenu('');
    }
  };

  const handleTopMenuChange = (menuId: string) => {
    setCurrentTopMenu(menuId);
    if (menuId === 'Dashboard') {
      setActiveItem('dashboard');
    } else if (menuId === 'About') {
      setActiveItem('about');
    } else if (menuId === 'Home') {
      setActiveItem('home');
    }
  };

  return (
    <>
      <DashboardLayout
        activeItem={activeItem}
        onNavigate={handleNavigate}
        currentTopMenu={currentTopMenu}
        onTopMenuChange={handleTopMenuChange}
      >
        {/* Render View based on activeItem & topMenu */}
        {activeItem === 'dashboard' && (
          <DashboardOverview
            onNavigateToProducts={() => handleNavigate('products')}
          />
        )}

        {activeItem === 'products' && <ProductsManagement />}

        {activeItem === 'calendar' && <FiscalCalendar />}

        {activeItem === 'account' && <AccountSettings />}

        {activeItem === 'about' && <AboutView />}

        {activeItem === 'home' && (
          <div className="space-y-6 max-w-5xl mx-auto py-4">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
                  <Building2 className="w-3.5 h-3.5" /> Nexus Enterprise Portal · Production
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Intelligent Enterprise ERP & Liquidity Management
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Unified financial telemetry, multi-hub inventory allocation, automated procurement triggers, and real-time cash flow analytics in a single mission-critical dashboard.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavigate('dashboard')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    <span>Launch Live Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('products')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 font-medium text-xs text-slate-200 transition-colors"
                  >
                    <Package className="w-4 h-4 text-cyan-400" />
                    <span>View 184k SKU Catalog</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Feature Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => handleNavigate('dashboard')}
                className="cursor-pointer p-5 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">Cash Flow Analytics</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Track consolidated multi-currency inflows, outflows, and net working capital burn rate.
                </p>
              </div>

              <div
                onClick={() => handleNavigate('products')}
                className="cursor-pointer p-5 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">Stock Category Volume</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Categorical stock telemetry with automatic low-threshold safety reorder notifications.
                </p>
              </div>

              <div
                onClick={() => handleNavigate('calendar')}
                className="cursor-pointer p-5 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">Fiscal Schedule</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Global freight arrivals, corporate tax filing milestones, and bi-weekly payroll disbursements.
                </p>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white">End Enterprise Session</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to sign out of the CFO administration portal? Any unsaved edits will be cached locally.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false);
                  handleNavigate('dashboard');
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-medium text-white shadow-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
