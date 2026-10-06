import React from "react";
import { Save } from "lucide-react";

export default function SecurityTab({ onSave }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-xs font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white text-xs text-slate-800 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
