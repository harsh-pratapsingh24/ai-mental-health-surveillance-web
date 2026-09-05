import React, { useState } from 'react';
import { Phone, Globe, Bell, Shield, Check, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { counselor } = useApp();
  const [nationalHelpline, setNationalHelpline] = useState('1800-599-0019');
  const [ngoHotline, setNgoHotline] = useState('+91 9999 666 555');
  const [teleManas, setTeleManas] = useState('14416');
  const [dashboardLang, setDashboardLang] = useState('English');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-[#262624] p-6 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm">
        <h3 className="font-heading font-semibold text-base text-[#2C2C2A] dark:text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#0F6E56]" /> Emergency Escalation & Helpline Routing
        </h3>
        <p className="text-xs text-[#5F5E5A] dark:text-[#8E8D88] mt-1">
          Configure default crisis lines and field response contacts dispatched during triage escalation.
        </p>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0F6E56]" /> National Crisis Line (KIRAN)
              </label>
              <input
                type="text"
                value={nationalHelpline}
                onChange={(e) => setNationalHelpline(e.target.value)}
                className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:ring-2 focus:ring-[#0F6E56]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0F6E56]" /> NGO Rapid Response Line
              </label>
              <input
                type="text"
                value={ngoHotline}
                onChange={(e) => setNgoHotline(e.target.value)}
                className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:ring-2 focus:ring-[#0F6E56]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0F6E56]" /> Tele-MANAS Government Hotline
              </label>
              <input
                type="text"
                value={teleManas}
                onChange={(e) => setTeleManas(e.target.value)}
                className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:ring-2 focus:ring-[#0F6E56]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#0F6E56]" /> Dashboard Language
              </label>
              <select
                value={dashboardLang}
                onChange={(e) => setDashboardLang(e.target.value)}
                className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:ring-2 focus:ring-[#0F6E56]"
              >
                <option value="English">English (Default)</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="Assamese">অসমীয়া (Assamese)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE8E3] dark:border-[#3A3A36] flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2C2C2A] dark:text-white">
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="rounded text-[#0F6E56] focus:ring-[#0F6E56]"
              />
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#0F6E56]" /> Enable audio cues for high-risk triage toasts
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-soft text-xs font-semibold bg-[#0F6E56] hover:bg-[#0C5946] text-white shadow-sm transition-all"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Saved
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Configuration
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Counselor profile credentials info */}
      <div className="bg-white dark:bg-[#262624] p-6 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={counselor.avatar}
            alt={counselor.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0F6E56]"
          />
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#2C2C2A] dark:text-white">
              {counselor.name}
            </h4>
            <p className="text-xs text-[#5F5E5A] dark:text-[#AAA9A4]">{counselor.role}</p>
            <p className="text-[11px] text-[#0F6E56] dark:text-[#38B293]">{counselor.ngoOrganization}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#639922]/10 text-[#639922]">
          Duty Active
        </span>
      </div>
    </div>
  );
};
