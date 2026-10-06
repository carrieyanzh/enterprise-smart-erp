import React from 'react';
import { LogOut } from 'lucide-react';

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  title = "End Enterprise Session",
  description = "Are you sure you want to sign out of the CFO administration portal? Any unsaved edits will be cached locally."
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
          <LogOut className="w-6 h-6" />
        </div>
        
        <div className="text-center">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-400 mt-1">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-medium text-white shadow-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
