// 1. Add the import line near the top of DashboardLayout.tsx:
import Sidebar from "./Sidebar"; // Update file path to your exact destination

import React, { useState } from "react";
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
  Sparkles,
} from "lucide-react";

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
  activeItem = "dashboard",
  onNavigate = (_itemId = "") => {},
  currentTopMenu = "Dashboard",
  onTopMenuChange = (_menuId = "") => {},
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
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const topMenuItems = [
    { id: "Home", label: "Home" },
    { id: "About", label: "About" },
    { id: "Dashboard", label: "Dashboard" },
  ];

  const sampleNotifications = [
    {
      id: 1,
      title: "Critical Stock Alert",
      desc: "Microchip SKU #MC-8092 dropped below safety threshold (84 units left).",
      time: "12m ago",
      urgent: true,
    },
    {
      id: 2,
      title: "Inflow Reconciled",
      desc: "Wire transfer \$182,450.00 from Apex Corp verified by Treasury.",
      time: "45m ago",
      urgent: false,
    },
    {
      id: 3,
      title: "PO #4928 Dispatched",
      desc: "Logistics confirmed batch #B-104 en route to Chicago Hub.",
      time: "2h ago",
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
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div
              onClick={() => {
                onTopMenuChange("Dashboard");
                onNavigate("dashboard");
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-sky-600 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-white/10 group-hover:shadow-indigo-500/30 transition-all">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-white flex items-center gap-1.5">
                  YanTech<span className="text-indigo-400">ERP</span>
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

          {/* Right actions: Combined Nav Menu, Search, Notification, Profile */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Main Navigation Menu (Moved near search bar, upgraded font to text-sm) */}
            <nav className="hidden md:flex items-center gap-1 rounded-xl bg-slate-950/40 p-1 border border-slate-800/80 shadow-inner">
              {topMenuItems.map((item) => {
                const isActive = currentTopMenu === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onTopMenuChange(item.id);
                      if (item.id === "Dashboard") {
                        onNavigate("dashboard");
                      }
                    }}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

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
            </div>
          </div>
        </div>
      </header>

     {/* Main Workspace Frame */}
      {/* 1. 核心修正：在外层包裹层添加 overflow-hidden，切断全局视口溢出，锁定在屏幕内部 */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        
        {/* 2. 核心修正：彻底删除了冲突的 w-[calc(...)] 宽度，改用 max-w-full 控制！
            添加了 min-h-0 和 overflow-x-hidden，防止子元素把整个大盒子横向撑爆顶出屏幕 */}
        <main className="flex-1 min-w-0 max-w-full h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-slate-950/40 rounded-2xl border border-slate-800/80 p-6 pb-24 shadow-xl backdrop-blur-sm flex gap-6">
          {/* INSERT NEW SIDEBAR HERE */}
          <Sidebar
            activeItem={activeItem}
            onNavigate={handleNavClick}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          {/* RIGHT SIDE MAIN DASHBOARD FEED DATA */}
          {/* 3. 核心修正：添加 pr-4 确保在主渲染区域右侧留出一道绝对的安全壕沟空间 */}
          <div className="flex-1 min-w-0 text-slate-300 pr-4 pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}