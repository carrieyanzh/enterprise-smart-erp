import React from "react";
import { Save } from "lucide-react";

export default function ProfileTab({ name, setName, email, setEmail, onSave }) {
  return (
    <form onSubmit={onSave} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white text-xs text-slate-800 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">
            Official Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white text-xs text-slate-800 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Designation</label>
          <input
            type="text"
            disabled
            value="Chief Financial Officer (CFO)"
            className="w-full bg-slate-100 text-xs text-slate-500 px-3 py-2 rounded-lg border border-slate-200 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">
            Security Clearance
          </label>
          <input
            type="text"
            disabled
            value="Level 5 (Root Financial Approval)"
            className="w-full bg-slate-100 text-xs text-emerald-600 font-medium px-3 py-2 rounded-lg border border-slate-200 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}
