import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import {
  CloudRain,
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  Info,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const RiskForecastView: React.FC = () => {
  const { t } = useI18n();
  const { weather, setActiveTab } = useApp();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const activeDay = weather[selectedDayIndex] || weather[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <CloudRain className="w-4 h-4" />
          <span>Micro-Climatic Epidemiology Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
          {t.riskForecastTitle}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {t.riskForecastSubtitle}
        </p>
      </div>

      {/* Primary Risk Radar Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left: Overall Risk Gauges for Selected Day */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Outlook Day</span>
              <h3 className="text-lg font-bold text-slate-900">
                {activeDay.day} ({activeDay.date})
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                activeDay.riskLevel === 'HIGH'
                  ? 'bg-rose-100 text-rose-800'
                  : activeDay.riskLevel === 'MEDIUM'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {activeDay.riskLevel} EPIDEMIOLOGICAL RISK
            </span>
          </div>

          {/* Disease Germination Risk Gauge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                {t.weatherRiskScore}
              </span>
              <span className="text-base font-extrabold text-rose-700">
                {activeDay.diseaseRiskScore}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  activeDay.diseaseRiskScore > 75
                    ? 'bg-rose-600'
                    : activeDay.diseaseRiskScore > 50
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
                style={{ width: `${activeDay.diseaseRiskScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Alternaria & Phytophthora spore release probability.
            </p>
          </div>

          {/* Pest Vector Pressure Gauge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                {t.pestRiskScore}
              </span>
              <span className="text-base font-extrabold text-amber-600">
                {activeDay.pestRiskScore}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${activeDay.pestRiskScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Thermal degree days acceleration for Fall Armyworm oviposition.
            </p>
          </div>

          {/* Day's Weather Summary Card */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50">
              <Thermometer className="w-4 h-4 text-slate-500 mx-auto mb-1" />
              <p className="text-[10px] uppercase text-slate-400 font-bold">Temp</p>
              <p className="text-xs font-bold text-slate-800">{activeDay.tempMin}° - {activeDay.tempMax}°C</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-[10px] uppercase text-slate-400 font-bold">Humidity</p>
              <p className="text-xs font-bold text-slate-800">{activeDay.humidity}%</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <CloudRain className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
              <p className="text-[10px] uppercase text-slate-400 font-bold">Rainfall</p>
              <p className="text-xs font-bold text-slate-800">{activeDay.rainfallMm} mm</p>
            </div>
          </div>
        </div>

        {/* Right: Risk Engine Explainer (Requirement 9: WHY IS RISK HIGH?) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.riskEngineExplainer}
                </h3>
                <p className="text-xs text-slate-500">
                  Algorithmic breakdown of atmospheric and foliar conditions.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.riskFactorsTitle}
              </h4>
              <div className="space-y-2">
                {activeDay.riskFactors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Preventive Actions */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
              <p className="font-bold uppercase tracking-wide text-emerald-900 text-[11px]">
                Recommended Preventive Action
              </p>
              <p className="leading-relaxed">
                Prior to rain onset on {activeDay.day}, apply prophylactic bio-fungicide (Trichoderma viride or Bacillus subtilis). Ensure ditch drainage lines are unclogged to avoid root zone waterlogging.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] text-slate-400 italic">
              ℹ️ {t.riskPrototypeNotice}
            </p>
            <button
              onClick={() => setActiveTab('scan')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Verify by Crop Scan</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 7-Day Forecast Strip */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>{t.sevenDayForecast}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={idx}
                id={`forecast-day-${idx}`}
                onClick={() => setSelectedDayIndex(idx)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800">{day.day}</span>
                  <span className="text-[10px] text-slate-400">{day.date}</span>
                </div>
                <p className="text-xs font-semibold text-slate-600 truncate mb-2">
                  {day.condition}
                </p>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Risk:</span>
                    <span
                      className={`font-extrabold ${
                        day.riskLevel === 'HIGH'
                          ? 'text-rose-600'
                          : day.riskLevel === 'MEDIUM'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {day.diseaseRiskScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Rain:</span>
                    <span>{day.rainfallMm} mm</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>RH:</span>
                    <span>{day.humidity}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
