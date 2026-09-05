import React, { useState } from 'react';
import { User, Phone, Lock, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AuthScreenProps {
  onSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const { survivorName, setSurvivorName, setIsMobileLoggedIn } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputName, setInputName] = useState(survivorName);
  const [identifier, setIdentifier] = useState('meera.survivor@relief.org');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName) setSurvivorName(inputName);
    setIsMobileLoggedIn(true);
    onSuccess();
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white">
      <div className="space-y-6 pt-4">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-soft bg-[#0F6E56]/10 text-[#0F6E56] dark:text-[#38B293] flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-heading font-bold text-lg text-[#2C2C2A] dark:text-white">
            {isSignUp ? 'Join Aashraya' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-[#5F5E5A] dark:text-[#AAA9A4]">
            {isSignUp
              ? 'Create a safe, private space for your healing journey'
              : 'Log in to continue your daily peaceful check-ins'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 rounded-soft bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36]">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-1.5 text-xs font-semibold rounded-soft transition-all ${
              !isSignUp
                ? 'bg-[#0F6E56] text-white shadow-sm'
                : 'text-[#5F5E5A] dark:text-[#AAA9A4]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-1.5 text-xs font-semibold rounded-soft transition-all ${
              isSignUp
                ? 'bg-[#0F6E56] text-white shadow-sm'
                : 'text-[#5F5E5A] dark:text-[#AAA9A4]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#2C2C2A] dark:text-[#FAF9F6]">
                First Name or Preferred Alias
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#5F5E5A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="e.g. Meera"
                  required
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-white dark:bg-[#262624] text-[#2C2C2A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#2C2C2A] dark:text-[#FAF9F6]">
              Phone or Email Address
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#5F5E5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-white dark:bg-[#262624] text-[#2C2C2A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#2C2C2A] dark:text-[#FAF9F6]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5F5E5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-white dark:bg-[#262624] text-[#2C2C2A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="text-right">
              <a href="#forgot" className="text-[11px] text-[#0F6E56] dark:text-[#38B293] hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-soft-lg bg-[#0F6E56] hover:bg-[#0C5946] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Create My Private Account' : 'Log In Safely'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="pb-4 text-center">
        <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
          Encrypted & protected with community care
        </p>
      </div>
    </div>
  );
};
