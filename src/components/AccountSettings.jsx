import React, { useState } from "react";
import { User, Key, Building, Mail, Bell } from "lucide-react";
import { Shield, CheckCircle, Save } from "lucide-react";
export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("James Sterling");
  const [email, setEmail] = useState("cfo@enterprise-nexus.io");
  const [saved, setSaved] = useState(false);

  const [systemAlerts, setSystemAlerts] = useState({
    emailAlerts: true,
    pushNotifications: false,
    textMessage: true,
    phoneCalls: true,
  });

  const [chatAlerts, setChatAlerts] = useState({
    email: true,
    pushNotifications: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl bg-[#0d1527] border rounded-xl shadow-2xl p-6 sm:p-8 text-slate-200">
      <div className="space-y-6 max-w-4xl">
        {saved && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium">
              Account preferences and security keys updated.
            </span>
          </div>
        )}

        {/* ─── MAIN OUTSIDE WHITE CLOSED SQUARE CONTAINER ─── */}
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Account & ERP Credentials
        </h1>

        <p className="text-xs mt-1">
          Manage your executive security profile, access tokens, and enterprise
          notification preferences.
        </p>
      </div>

      <div className="mt-6 mb-6">
        <div className="flex bg-[#16223f] p-1 rounded-full w-full max-w-2xl border border-slate-800/60">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === "profile"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === "security"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Security
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === "notifications"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Notifications
          </button>
        </div>
      </div>

      {/* PROFILE SUB-PANEL VIEW */}
      {activeTab === "profile" && (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              {/* <label className="block text-xs font-medium text-slate-600 mb-1"> */}
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
              <label className="block text-xs font-medium mb-1">
                Designation
              </label>
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
      )}

      {/* SECURITY SUB-PANEL VIEW */}
      {activeTab === "security" && (
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
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}
    
      {/* ─── NOTIFICATIONS SUB-PANEL VIEW ─── */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Notifications
            </h2>
          </div>

          {/* 系統與 Chat App 設定主容器框線 */}
          <div className="border border-slate-700 rounded-lg p-5 bg-[#0f172a]/30">
            {/* ─── 修正：將 System 與 Chat App 並排在同一行（雙欄版面） ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 左側欄位：System 區塊 */}
              <div className="space-y-3.5">
                <div>
                  <h3 className="text-sm font-bold text-white">System</h3>
                  <p className="text-[11px] text-indigo-300 mt-0.5">
                    You will receive emails in your business email address
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={systemAlerts.emailAlerts}
                      onChange={(e) =>
                        setSystemAlerts({
                          ...systemAlerts,
                          emailAlerts: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-600 bg-[#16223f] text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Email alerts
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={systemAlerts.pushNotifications}
                      onChange={(e) =>
                        setSystemAlerts({
                          ...systemAlerts,
                          pushNotifications: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-600 bg-[#16223f] text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Push Notifications
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={systemAlerts.textMessage}
                      onChange={(e) =>
                        setSystemAlerts({
                          ...systemAlerts,
                          textMessage: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-600 bg-[#16223f] text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Text Message
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={systemAlerts.phoneCall}
                      onChange={(e) =>
                        setSystemAlerts({
                          ...systemAlerts,
                          phoneCall: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-600 bg-[#16223f] text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Phone Call
                    </span>
                  </label>
                </div>
              </div>

              {/* 右側欄位：Chat App 區塊 (Email 僅屬於此欄) */}
              <div className="space-y-3.5">
                <div>
                  <h3 className="text-sm font-bold text-white">Chat app</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    You will receive emails in your special email
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={chatAlerts.email}
                      onChange={(e) =>
                        setChatAlerts({
                          ...chatAlerts,
                          email: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-600 bg-[#16223f] text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Email
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <span className="text-xs font-mono">Enforced by Org Policy</span>
    </div>
  );
}
