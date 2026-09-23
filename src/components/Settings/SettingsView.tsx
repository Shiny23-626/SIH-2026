import React, { useState } from 'react';
import { useI18n, AVAILABLE_LANGUAGES } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole, AppLanguage } from '../../types';
import {
  Settings,
  Languages,
  ShieldCheck,
  Bell,
  Wifi,
  Cpu,
  User,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  const { currentRole, setRole, user, isDemoMode } = useAuth();
  const { isCustomModelLoaded } = useApp();

  const [diseaseAlerts, setDiseaseAlerts] = useState(true);
  const [pestAlerts, setPestAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveSettings = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>System Preferences & Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
          {t.navSettings}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Manage system language, persona view, alert preferences, and machine learning engine bindings.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Preferences updated and synchronized with client state.</span>
        </div>
      )}

      {/* Language Preference Section (Mandatory Prominence) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Languages className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.selectLanguage}
            </h3>
            <p className="text-xs text-slate-500">
              Select your primary regional language for UI, voice recognition, and AI responses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {AVAILABLE_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                language === lang.code
                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div>
                <span className="text-lg">{lang.flag}</span>
                <p className="text-xs font-bold text-slate-900 mt-1">
                  {lang.nativeName}
                </p>
                <p className="text-[11px] text-slate-500">{lang.name}</p>
              </div>
              {language === lang.code && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Persona / Role Switcher */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Active User Persona
            </h3>
            <p className="text-xs text-slate-500">
              Switch perspective between Farmer, Agronomist Expert, and Agriculture Official.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setRole('FARMER')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              currentRole === 'FARMER'
                ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            <p className="font-bold text-xs text-slate-900">🧑‍🌾 {t.roleFarmer}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Field scanning, crop monitoring, local farm parcels, and risk alerts.
            </p>
          </button>

          <button
            onClick={() => setRole('EXPERT')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              currentRole === 'EXPERT'
                ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            <p className="font-bold text-xs text-slate-900">🔬 {t.roleExpert}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Diagnostic verification queue, lab testing referrals, and pathology notes.
            </p>
          </button>

          <button
            onClick={() => setRole('OFFICIAL')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              currentRole === 'OFFICIAL'
                ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            <p className="font-bold text-xs text-slate-900">🏛️ {t.roleOfficial}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Regional outbreak surveillance, district GIS maps, and exportable reports.
            </p>
          </button>
        </div>
      </div>

      {/* Notification Dispatch Settings */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Bell className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Notification Channels
            </h3>
            <p className="text-xs text-slate-500">
              Configure automated micro-climatic and pest threshold alerts.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900">Foliar Spore & Disease Risk Alerts</p>
              <p className="text-[11px] text-slate-500">Triggered when weather model risk exceeds 75%</p>
            </div>
            <input
              type="checkbox"
              checked={diseaseAlerts}
              onChange={(e) => setDiseaseAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900">Pest Vector Surge Alerts</p>
              <p className="text-[11px] text-slate-500">Triggered when trap moth count surges &gt; 20%</p>
            </div>
            <input
              type="checkbox"
              checked={pestAlerts}
              onChange={(e) => setPestAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900">Extreme Weather Warning Dispatch</p>
              <p className="text-[11px] text-slate-500">Heavy rain, hailstorm, or leaf-wetness duration alerts</p>
            </div>
            <input
              type="checkbox"
              checked={weatherAlerts}
              onChange={(e) => setWeatherAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </label>
        </div>
      </div>

      {/* Developer & System Information (Explicitly Mandated) */}
      <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white font-outfit">
              {t.brandName} Architecture
            </h3>
            <p className="text-xs text-slate-400">
              Production Agricultural Intelligence Runtime
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
            Build 2026.09.17
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80">
            <span className="text-slate-400">Lead Developer:</span>
            <p className="text-sm font-bold text-emerald-400 mt-0.5">
              Developed by Amsapriya
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80">
            <span className="text-slate-400">Machine Learning Engine:</span>
            <p className="text-sm font-bold text-slate-200 mt-0.5">
              {isCustomModelLoaded ? 'Custom Model (.h5 / .tflite)' : 'Plantora AI Native ML Engine'}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          Designed strictly in compliance with agricultural extension guidelines and environmental epidemiology standards.
        </p>
      </div>

    </div>
  );
};
