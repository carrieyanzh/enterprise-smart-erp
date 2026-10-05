import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  Building,
  Mail,
  Bell,
  CheckCircle,
  Save
} from 'lucide-react';

export default function AccountSettings() {
  const [name, setName] = useState('James Sterling');
  const [email, setEmail] = useState('cfo@enterprise-nexus.io');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">Account preferences and security keys updated.</span>
        </div>
      )}

      <div className="pb-1 border-b border-slate-800/80">
        <h1 className="text-2xl font-bold tracking-tight text-white">Account & ERP Credentials</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your executive security profile, access tokens, and enterprise notification preferences.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-6 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                disabled
                value="Chief Financial Officer (CFO)"
                className="w-full bg-slate-900/60 text-xs text-slate-400 px-3 py-2 rounded-lg border border-slate-800 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Security Clearance</label>
              <input
                type="text"
                disabled
                value="Level 5 (Root Financial Approval)"
                className="w-full bg-slate-900/60 text-xs text-emerald-400 px-3 py-2 rounded-lg border border-slate-800 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

        <div className="pt-6 border-t border-slate-800 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Security & Authentication
          </h2>
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-200">Hardware Security Key / 2FA</div>
                <div className="text-[11px] text-emerald-400">FIDO2 / WebAuthn Active</div>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">Enforced by Org Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
