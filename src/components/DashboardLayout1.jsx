import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Calendar,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  Building2,
  ShieldCheck,
  TrendingUp,
  FileText,
  Boxes,
  SlidersHorizontal,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.activeItem]
 * @param {(itemId: string) => void} [props.onNavigate]
 * @param {string} [props.currentTopMenu]
 * @param {(menuId: string) => void} [props.onTopMenuChange]
 */
export default function DashboardLayout({
  children,
  activeItem = 'dashboard',
  onNavigate = (_itemId = '') => {},
  currentTopMenu = 'Dashboard',
  onTopMenuChange = (_menuId = '') => {}
}) {
  // Mobile sidebar toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  // Nested collapsible sections
  const [openSections, setOpenSections] = useState({
    report: true,
    management: true,
    pages: true,
  });

  // Top header states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const topMenuItems = [
    { id: 'Home', label: 'Home' },
    { id: 'About', label: 'About' },
    { id: 'Dashboard', label: 'Dashboard' },
  ];

  const sampleNotifications = [
    {
      id: 1,
      title: 'Critical Stock Alert',
      desc: 'Microchip SKU #MC-8092 dropped below safety threshold (84 units left).',
      time: '12m ago',
      urgent: true,
    },
    {
      id: 2,
      title: 'Inflow Reconciled',
      desc: 'Wire transfer $182,450.00 from Apex Corp verified by Treasury.',
      time: '45m ago',
      urgent: false,
    },
    {
      id: 3,
      title: 'PO #4928 Dispatched',
      desc: 'Logistics confirmed batch #B-104 en route to Chicago Hub.',
      time: '2h ago',
      urgent: false,
    },
  ];

  const handleNavClick = (itemId) => {
    onNavigate(itemId);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Brand & Mobile trigger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            

            <div
              onClick={() => {
                onTopMenuChange('Dashboard');
                onNavigate('dashboard');
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-sky-600 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-white/10 group-hover:shadow-indigo-500/30 transition-all">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-white flex items-center gap-1.5">
                  Nexus<span className="text-indigo-400">ERP</span>
                  <span className="text-[1px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/60">
                    Enterprise
                  </span>
                </span>
                <span className="text-[14px] text-slate-400 hidden sm:inline">
                  Smart Finance & Operational Intelligence
                </span>
              </div>
            </div>
          </div>


          {/* Center: Global Top Menu (Home, About, Dashboard) */}          
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-slate-950/40 p-1 border border-slate-800/80 shadow-inner">
            {topMenuItems.map((item) => {
              const isActive = currentTopMenu === item.id;
              return (
                <button key={item.id} type="button" 
                  onClick={() => {
                    onTopMenuChange(item.id);
                    if (item.id === 'Dashboard') {
                      onNavigate('dashboard');
                    }
                  }}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Search, Status, Notification, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Sync Badge */}
            {/* <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] text-slate-300">LIVE ERP SYNC</span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-mono text-[11px]">99.98%</span>
            </div> */}

            {/* Quick Search */}
            <div className="relative hidden sm:block w-44 lg:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders, SKUs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-xs text-slate-200 pl-9 pr-7 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-500 transition-colors"
              />
              <kbd className="hidden lg:inline-flex absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 bg-slate-800 px-1 py-0.5 rounded border border-slate-700">
                ⌘K
              </kbd>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-lg shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/50">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white tracking-wide">Notifications</span>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-full font-mono border border-rose-500/30">
                        3 New
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      Dismiss
                    </button>
                  </div>
                  <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto">
                    {sampleNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-3 hover:bg-slate-800/50 transition-colors cursor-pointer"
                        onClick={() => {
                          if (notif.urgent) onNavigate('dashboard');
                          setShowNotifications(false);
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-xs font-medium ${notif.urgent ? 'text-rose-400' : 'text-slate-200'}`}>
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{notif.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-800 bg-slate-950/60 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate('dashboard');
                      }}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      View all ERP system alerts →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill / Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl hover:bg-slate-900 border border-slate-800/80 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px] shadow-sm">
                  <div className="h-full w-full rounded-[7px] bg-slate-950 flex items-center justify-center font-bold text-xs text-indigo-300">
                    JD
                  </div>
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-medium text-slate-200 leading-tight">James Sterling</span>
                  <span className="text-[10px] text-slate-400">Chief Financial Officer</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-lg shadow-2xl z-50 overflow-hidden py-1">
                  <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-950/40">
                    <p className="text-xs font-semibold text-white">James Sterling</p>
                    <p className="text-[11px] text-slate-400 font-mono">cfo@enterprise-nexus.io</p>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                      <ShieldCheck className="w-3 h-3" /> Root ERP Admin Role
                    </div>
                  </div>
                  <div className="py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('account');
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Account & Security
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('calendar');
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Fiscal Schedules
                    </button>
                    <div className="my-1 border-t border-slate-800"></div>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('logout');
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container: Sticky Sidebar + Main Viewport */}
      <div className="flex-1 flex w-full relative">
        {/* Mobile Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sticky Left Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 sm:w-72 shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 space-y-6">
            {/* Organization / Workspace Selector */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Boxes className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Global Operations</div>
                  <div className="text-[10px] text-slate-400 font-mono">Entity #US-04 · HQ NY</div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Navigation Menus with Nested Categories */}
            <nav className="space-y-4">
              {/* Category 1: Report -> Dashboard */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('report')}
                  className="w-full flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                    Report
                  </span>
                  {openSections.report ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
                {openSections.report && (
                  <div className="mt-1 pl-2 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => handleNavClick('dashboard')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        activeItem === 'dashboard'
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <LayoutDashboard className={`w-4 h-4 ${activeItem === 'dashboard' ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <span>Dashboard</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Live
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Category 2: Management -> Products */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('management')}
                  className="w-full flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                    Management
                  </span>
                  {openSections.management ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
                {openSections.management && (
                  <div className="mt-1 pl-2 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => handleNavClick('products')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        activeItem === 'products'
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Package className={`w-4 h-4 ${activeItem === 'products' ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span>Products</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        184k SKU
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Category 3: Calendar Menu */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1.5">
                  Schedule
                </div>
                <div className="mt-1 pl-2 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleNavClick('calendar')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                      activeItem === 'calendar'
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className={`w-4 h-4 ${activeItem === 'calendar' ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>Calendar Menu</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Q4 Fiscal
                    </span>
                  </button>
                </div>
              </div>

              {/* Category 4: Pages -> Account, Logout */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('pages')}
                  className="w-full flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    Pages
                  </span>
                  {openSections.pages ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
                {openSections.pages && (
                  <div className="mt-1 pl-2 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => handleNavClick('account')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        activeItem === 'account'
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <User className={`w-4 h-4 ${activeItem === 'account' ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <span>Account</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        Admin
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('logout')}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-rose-400/90 hover:text-rose-300 hover:bg-rose-950/20 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </div>
                      <span className="text-[10px] font-mono text-rose-500/80">
                        Exit
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Sidebar Footer with ERP Status & Server Info */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/70 space-y-3">
            <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-slate-300">Cluster Status</span>
                <span className="text-[10px] font-mono text-emerald-400">US-EAST-1</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                <span>Core Latency: 18ms</span>
                <span>Repl: Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>NexusCore ERP v4.8.2</span>
              <span className="text-slate-400 font-mono">TLS 1.3</span>
            </div>
          </div>
        </aside>

        {/* Main Viewport Content Area */}
        <main className="flex-1 min-w-0 bg-slate-950 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
