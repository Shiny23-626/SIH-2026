import React, { useState } from 'react';
import { useI18n, AVAILABLE_LANGUAGES } from '../i18n';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserRole, AppLanguage } from '../types';
import {
  Sprout,
  Languages,
  Bell,
  Cpu,
  UserCheck,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Award,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface HeaderProps {
  onOpenModelModal: () => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModelModal, onOpenAuthModal }) => {
  const { language, setLanguage, t } = useI18n();
  const { user, isAuthenticated, currentRole, setRole, logout, isDemoMode } = useAuth();
  const { activeTab, setActiveTab, alerts, isCustomModelLoaded } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadAlerts = alerts.filter(a => !a.read).length;

  const currentLangObj = AVAILABLE_LANGUAGES.find(l => l.code === language) || AVAILABLE_LANGUAGES[0];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setRoleMenuOpen(false);
    if (newRole === 'EXPERT') {
      setActiveTab('expert');
    } else if (newRole === 'OFFICIAL') {
      setActiveTab('official');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-emerald-950 font-outfit">
                  {t.brandName}
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  AgriTech v1.2
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block leading-tight">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Controls: Global Language Selector, Role Switcher, ML Status, Notifications */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Language Selector (Prominent as mandated in requirement 13 & 14) */}
            <div className="relative">
              <button
                id="global-language-selector-btn"
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-emerald-950 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 transition-colors"
                title={t.selectLanguage}
              >
                <Languages className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold">{currentLangObj.nativeName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {t.selectLanguage}
                  </div>
                  {AVAILABLE_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-left transition-colors ${
                        language === lang.code
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="text-xs text-slate-400">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="relative hidden md:block">
              <button
                id="role-switcher-btn"
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                <span>
                  {currentRole === 'FARMER' ? t.roleFarmer : currentRole === 'EXPERT' ? t.roleExpert : t.roleOfficial}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-52 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Switch Persona View
                  </div>
                  <button
                    onClick={() => handleRoleChange('FARMER')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      currentRole === 'FARMER' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>🧑‍🌾 {t.roleFarmer}</span>
                    {currentRole === 'FARMER' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('EXPERT')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      currentRole === 'EXPERT' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>🔬 {t.roleExpert}</span>
                    {currentRole === 'EXPERT' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('OFFICIAL')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      currentRole === 'OFFICIAL' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>🏛️ {t.roleOfficial}</span>
                    {currentRole === 'OFFICIAL' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* ML Model Engine Status Pill */}
            <button
              id="ml-engine-status-btn"
              type="button"
              onClick={onOpenModelModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
              title="Click to view or upload custom .h5 / .tflite weights"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden lg:inline">
                {isCustomModelLoaded ? 'Custom Model' : 'ML Engine'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Alert Center Notification Bell */}
            <button
              id="header-alerts-btn"
              type="button"
              onClick={() => setActiveTab('alerts')}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              title={t.navAlerts}
            >
              <Bell className="w-4 h-4" />
              {unreadAlerts > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>

            {/* User Profile / Demo Account Badge */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
                <div
                  onClick={onOpenAuthModal}
                  className="cursor-pointer flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50"
                  title="Farmer Profile"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                    {user?.name ? user.name[0] : 'A'}
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-xs font-semibold text-slate-800 truncate max-w-[110px] leading-tight">
                      {user?.name}
                    </p>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                      {isDemoMode ? 'Demo Account' : 'Verified'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                  title={t.signOut}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
              >
                Login / OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
