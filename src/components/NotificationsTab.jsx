import React from "react";

export default function NotificationsTab({ systemAlerts, setSystemAlerts, chatAlerts, setChatAlerts }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white tracking-wide">
          Notifications
        </h2>
      </div>

      <div className="border border-slate-700 rounded-lg p-5 bg-[#0f172a]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* System Block */}
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
                    setSystemAlerts({ ...systemAlerts, emailAlerts: e.target.checked })
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
                    setSystemAlerts({ ...systemAlerts, pushNotifications: e.target.checked })
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
                    setSystemAlerts({ ...systemAlerts, textMessage: e.target.checked })
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
                  checked={systemAlerts.phoneCalls}
                  onChange={(e) =>
                    setSystemAlerts({ ...systemAlerts, phoneCalls: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-slate-600 bg-[#16223f] text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                  Phone Call
                </span>
              </label>
            </div>
          </div>

          {/* Chat App Block */}
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
                    setChatAlerts({ ...chatAlerts, email: e.target.checked })
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
  );
}
