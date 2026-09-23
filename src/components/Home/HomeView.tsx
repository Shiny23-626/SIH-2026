import React from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  ScanLine,
  Trees,
  CloudSun,
  Bot,
  ShieldCheck,
  Cpu,
  Activity,
  Bug,
  MapPin,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { t } = useI18n();
  const { farms, weather, cases, pestTraps, setActiveTab, runJudgeScenario } = useApp();
  const { user, isDemoMode } = useAuth();

  const todayWeather = weather[0];
  const highRiskPest = pestTraps.find(p => p.riskLevel === 'HIGH') || pestTraps[0];
  const recentCase = cases[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Banner with High Craftsmanship & Zero Slop */}
      <div className="relative rounded-3xl bg-radial from-emerald-900 to-slate-950 p-6 sm:p-10 text-white overflow-hidden shadow-xl border border-emerald-800/40">
        
        {/* Subtle background mesh grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Agricultural Epidemiology System</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-outfit text-white leading-tight">
            {t.brandName}
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 font-medium leading-relaxed">
            {t.tagline}
          </p>

          <p className="text-xs sm:text-sm text-emerald-200/70 max-w-2xl">
            Protecting food security through safety-gated deep learning diagnosis, in-canopy microclimate epidemiology, and pheromone vector surveillance.
          </p>

          {/* Core CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              id="hero-scan-btn"
              onClick={() => setActiveTab('scan')}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5"
            >
              <ScanLine className="w-4 h-4" />
              <span>{t.btnStartScanning}</span>
            </button>

            <button
              id="hero-risk-btn"
              onClick={() => setActiveTab('risk')}
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-emerald-200 border border-emerald-700/50 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <CloudSun className="w-4 h-4" />
              <span>{t.navRisk}</span>
            </button>

            <button
              id="hero-assistant-btn"
              onClick={() => setActiveTab('assistant')}
              className="px-5 py-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-white border border-emerald-600/30 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>{t.navAssistant}</span>
            </button>
          </div>
        </div>

        {/* Live System Indicator Badge */}
        <div className="hidden lg:block absolute right-8 bottom-8 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20 text-xs space-y-1.5 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Server ML Pipeline Active</span>
          </div>
          <p className="text-[11px] text-slate-300">Model: EfficientNet-CropV2 (94.2% Acc)</p>
          <p className="text-[11px] text-slate-400">Micro-Climate Node: Nashik Valley (84% RH)</p>
        </div>
      </div>

      {/* Quick Farmer Health Pulse (3 Live Indicators) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Today's Weather & Disease Risk */}
        <div
          onClick={() => setActiveTab('risk')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>Atmospheric Risk</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              todayWeather?.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {todayWeather?.riskLevel} RISK
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-950">
              {todayWeather?.diseaseRiskScore}% Spore Index
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {todayWeather?.condition} &bull; {todayWeather?.tempMax}°C / {todayWeather?.humidity}% RH
            </p>
          </div>

          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 group-hover:underline">
            <span>Inspect 7-day risk model</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 2: Pest Vector Surveillance */}
        <div
          onClick={() => setActiveTab('pest')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <Bug className="w-4 h-4 text-purple-600" />
              <span>Vector Traps</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
              +{highRiskPest.percentageChange}% SURGE
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-950">
              {highRiskPest.count} Moths ({highRiskPest.pestType})
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Trap: {highRiskPest.trapId} &bull; {highRiskPest.location}
            </p>
          </div>

          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 group-hover:underline">
            <span>Inspect pheromone surveillance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 3: Latest Diagnostic Scan */}
        <div
          onClick={() => setActiveTab(recentCase ? 'scan' : 'farms')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <ScanLine className="w-4 h-4 text-emerald-600" />
              <span>Latest Foliar Case</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              {(recentCase.confidence * 100).toFixed(0)}% Conf
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-950">
              {recentCase.disease}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Crop: {recentCase.crop} &bull; Severity: {recentCase.severity} ({recentCase.affected_area}%)
            </p>
          </div>

          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 group-hover:underline">
            <span>View diagnosis & recovery plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

      {/* The 4 Architectural Pillars of Plantora AI */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              System Capabilities
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-outfit">
              The 4 Pillars of Crop Health Intelligence
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              1. AI Foliar Diagnosis
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accepts custom model weights (.h5, .tflite). Enforces confidence gating (&lt;60% triggers mandatory pathologist triage).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <CloudSun className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              2. Weather Risk Forecasting
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Combines relative humidity, leaf wetness duration, and thermal degree days to anticipate spore release 72 hours early.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              3. IoT & Vector Traps
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Surveillance on Fall Armyworm & Whitefly traps with dynamic surge warnings and GIS cluster mapping.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              4. Multilingual & Verified
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tamil, Hindi, Marathi, Telugu, Kannada, and English with genuine text &amp; speech synthesis powered by Gemini.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
