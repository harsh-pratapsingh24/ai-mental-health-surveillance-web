import React, { useState } from 'react';
import { User, Globe, Bell, Trash2, LogOut, Check, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const {
    survivorName,
    setSurvivorName,
    selectedLanguage,
    setSelectedLanguage,
    setIsMobileLoggedIn,
    resetAllData,
  } = useApp();

  const [notificationTime, setNotificationTime] = useState('09:00 AM');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleConfirmDelete = () => {
    resetAllData();
    setShowDeleteModal(false);
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 text-[#2C2C2A] dark:text-white">
      {/* Header */}
      <div className="pt-1">
        <h3 className="font-heading font-bold text-base text-[#2C2C2A] dark:text-white">
          Your Profile & Privacy
        </h3>
        <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
          Manage your notification cadence and data sovereignty
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-3">
        <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] space-y-3 shadow-sm">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#0F6E56]" /> Preferred Alias
            </label>
            <input
              type="text"
              value={survivorName}
              onChange={(e) => setSurvivorName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:ring-2 focus:ring-[#0F6E56]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#0F6E56]" /> Preferred Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:ring-2 focus:ring-[#0F6E56]"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Bengali">বাংলা (Bengali)</option>
              <option value="Assamese">অসমীয়া (Assamese)</option>
              <option value="Odia">ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#0F6E56]" /> Daily Gentle Reminder
            </label>
            <input
              type="time"
              defaultValue="09:00"
              className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:ring-2 focus:ring-[#0F6E56]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-soft bg-[#0F6E56] hover:bg-[#0C5946] text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
            {isSaved ? 'Preferences Saved' : 'Save Preferences'}
          </button>
        </div>
      </form>

      {/* Privacy & Account Safety Options */}
      <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] space-y-3 shadow-sm">
        <h4 className="text-xs font-semibold text-[#2C2C2A] dark:text-white">
          Data Rights & Security
        </h4>
        <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] leading-relaxed">
          Your check-ins are fully anonymized. You hold full rights to purge all recorded reflections instantly.
        </p>

        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full py-2.5 rounded-soft border border-[#A32D2D] text-[#A32D2D] dark:text-[#F19E9E] hover:bg-[#A32D2D]/10 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete My Data & History
          </button>

          <button
            onClick={() => setIsMobileLoggedIn(false)}
            className="w-full py-2 rounded-soft text-xs text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-[#FAF9F6] dark:bg-[#262624] p-5 rounded-soft-lg border border-[#A32D2D]/30 space-y-3 text-center shadow-xl">
            <ShieldAlert className="w-8 h-8 text-[#A32D2D] mx-auto" />
            <h4 className="font-heading font-bold text-sm text-[#2C2C2A] dark:text-white">
              Permanently Purge Records?
            </h4>
            <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] leading-relaxed">
              This will erase all past mood logs and check-in history from local memory. This cannot be undone.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] text-xs font-medium text-[#5F5E5A]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-soft bg-[#A32D2D] text-white text-xs font-bold shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
