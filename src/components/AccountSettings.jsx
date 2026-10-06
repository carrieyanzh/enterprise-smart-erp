import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";

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
    if (e) e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl border rounded-xl shadow-2xl p-6 sm:p-8 text-slate-200">
      <div className="space-y-6 max-w-4xl">
        {saved && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium">
              Account preferences and security keys updated.
            </span>
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Account & ERP Credentials
        </h1>
        <p className="text-xs mt-1">
          Manage your executive security profile, access tokens, and enterprise
          notification preferences.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-6 mb-6">
        <div className="flex bg-[#16223f] p-1 rounded-full w-full max-w-2xl border border-slate-800/60">
          {["profile", "security", "notifications"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-full transition-all duration-200 capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-panel Views */}
      {activeTab === "profile" && (
        <ProfileTab
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          onSave={handleSave}
        />
      )}

      {activeTab === "security" && <SecurityTab onSave={handleSave} />}

      {activeTab === "notifications" && (
        <NotificationsTab
          systemAlerts={systemAlerts}
          setSystemAlerts={setSystemAlerts}
          chatAlerts={chatAlerts}
          setChatAlerts={setChatAlerts}
        />
      )}

      <span className="text-xs font-mono block mt-6">
        Enforced by Org Policy
      </span>
    </div>
  );
}
