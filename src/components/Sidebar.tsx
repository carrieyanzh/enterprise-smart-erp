import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Calendar,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onNavigate: (itemId: string) => void;
  openSections: { report: boolean; management: boolean; pages: boolean };
  toggleSection: (sectionKey: 'report' | 'management' | 'pages') => void;
}

export default function Sidebar({
  activeItem,
  onNavigate,
  openSections,
  toggleSection,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = {
    report: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
    management: [
      { id: 'products', label: 'Products', icon: Package },
      { id: 'calendar', label: 'Calendar Menu', icon: Calendar },
    ],
    pages: [
      { id: 'account', label: 'Account', icon: User },
    ],
  };

  return (
    <aside className={`shrink-0 hidden lg:flex flex-col gap-6 px-4 py-6 border-r border-slate-800/40 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      
      {/* Toggle Button */}
      <div className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'justify-end'} mb-2`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* 1. REPORT SECTION */}
      <div className="space-y-2">
        {!isCollapsed ? (
          <button
            onClick={() => toggleSection('report')}
            className="flex items-center justify-between w-full text-left !text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors"
          >
            <span>Report</span>
            {openSections.report ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <div className="h-px bg-slate-800/40 my-2" />
        )}
        
        {(openSections.report || isCollapsed) && (
          <div className="space-y-1">
            {menuItems.report.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 !text-[15px] font-medium rounded-xl transition-all ${
                    isCollapsed ? 'justify-center px-2' : ''
                  } ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. MANAGEMENT SECTION */}
      <div className="space-y-2">
        {!isCollapsed ? (
          <button
            onClick={() => toggleSection('management')}
            className="flex items-center justify-between w-full text-left !text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors"
          >
            <span>Management</span>
            {openSections.management ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <div className="h-px bg-slate-800/40 my-2" />
        )}

        {(openSections.management || isCollapsed) && (
          <div className="space-y-1">
            {menuItems.management.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 !text-[15px] font-medium rounded-xl transition-all ${
                    isCollapsed ? 'justify-center px-2' : ''
                  } ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. PAGES SECTION */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {!isCollapsed ? (
            <button
              onClick={() => toggleSection('pages')}
              className="flex items-center justify-between w-full text-left !text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors"
            >
              <span>Pages</span>
              {openSections.pages ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          ) : (
            <div className="h-px bg-slate-800/40 my-2" />
          )}

          {(openSections.pages || isCollapsed) && (
            <div className="space-y-1">
              {menuItems.pages.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 !text-[15px] font-medium rounded-xl transition-all ${
                      isCollapsed ? 'justify-center px-2' : ''
                    } ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => onNavigate('logout')}
          title={isCollapsed ? "Logout" : undefined}
          className={`w-full flex items-center gap-3.5 px-4 py-3 !text-[15px] font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-xl transition-all mt-auto ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
