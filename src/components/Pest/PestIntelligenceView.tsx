import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import {
  Bug,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
  Calendar,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const PestIntelligenceView: React.FC = () => {
  const { t } = useI18n();
  const { pestTraps, addPestObservation } = useApp();

  const [selectedTrapId, setSelectedTrapId] = useState(pestTraps[0]?.id || 'trap-1');
  const [newCount, setNewCount] = useState<number>(45);
  const [showLogModal, setShowLogModal] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const activeTrap = pestTraps.find(t => t.id === selectedTrapId) || pestTraps[0];

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTrap && newCount >= 0) {
      addPestObservation(activeTrap.id, Number(newCount), activeTrap.pestType);
      setShowLogModal(false);
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 3500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Bug className="w-4 h-4" />
            <span>Pheromone & Light Trap Surveillance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.pestIntelligenceTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track vector populations, calculate multi-week surge indices, and intercept pest outbreaks before economic injury level (EIL).
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addTrapRecord}</span>
        </button>
      </div>

      {successNotice && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>New pest trap count successfully logged. Historical trend and risk index recalculated.</span>
        </div>
      )}

      {/* Traps Selection Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {pestTraps.map(trap => {
          const isSelected = trap.id === activeTrap.id;
          const isSurge = trap.percentageChange > 20;

          return (
            <button
              key={trap.id}
              onClick={() => setSelectedTrapId(trap.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-500">
                  {trap.trapId}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    trap.riskLevel === 'HIGH'
                      ? 'bg-rose-100 text-rose-800'
                      : trap.riskLevel === 'MEDIUM'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {trap.riskLevel} RISK
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {trap.pestType}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{trap.location} ({trap.crop})</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Count</span>
                  <p className="text-base font-extrabold text-slate-900">{trap.count}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Trend</span>
                  <p className={`font-bold flex items-center gap-0.5 justify-end ${
                    isSurge ? 'text-rose-600' : 'text-emerald-700'
                  }`}>
                    {isSurge ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>{trap.percentageChange > 0 ? `+${trap.percentageChange}%` : `${trap.percentageChange}%`}</span>
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Trap Deep Dive: Metrics & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Key Metrics (Current, Previous, % Change, Risk) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Active Trap Details</p>
              <h3 className="text-lg font-bold text-slate-900">{activeTrap.trapId}</h3>
            </div>
            <span className="text-xs font-semibold text-slate-600">
              {activeTrap.date}
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{t.currentCount}</span>
              <span className="text-lg font-bold text-slate-900">{activeTrap.count}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{t.previousCount}</span>
              <span className="text-lg font-bold text-slate-900">{activeTrap.previousCount}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{t.percentChange}</span>
              <span className={`text-lg font-bold ${
                activeTrap.percentageChange > 0 ? 'text-rose-600' : 'text-emerald-700'
              }`}>
                {activeTrap.percentageChange > 0 ? `+${activeTrap.percentageChange}%` : `${activeTrap.percentageChange}%`}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{t.trendLabel}</span>
              <span className="text-sm font-bold text-slate-800">{activeTrap.trend}</span>
            </div>
          </div>

          {activeTrap.percentageChange > 20 && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <AlertTriangle className="w-4 h-4" />
                <span>Pest Population Alert</span>
              </div>
              <p className="leading-relaxed">
                Trap counts increased by {activeTrap.percentageChange}%. Immediate field scouting of leaf whorls recommended. Deploy Trichogramma parasitoid egg cards or pheromone lure replenishment.
              </p>
            </div>
          )}
        </div>

        {/* Right: Recharts Historical Trajectory Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Trap Population Trajectory (Historical Surveillance)
              </h3>
              <p className="text-xs text-slate-500">
                Monitoring multi-day capture velocity against regional Economic Threshold Level (ETL = 30).
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ETL: 30 Moths/Trap
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeTrap.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#059669' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Modal for adding trap observation */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-outfit mb-1">
              Log Pest Trap Count
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter updated observation from field pheromone or sticky trap {activeTrap.trapId}.
            </p>

            <form onSubmit={handleAddObservation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pest Type / Trap
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${activeTrap.pestType} (${activeTrap.trapId})`}
                  className="w-full text-xs px-3 py-2 bg-slate-100 rounded-lg border border-slate-200 text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recorded Pest Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={newCount}
                  onChange={(e) => setNewCount(Number(e.target.value))}
                  required
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs"
                >
                  Save Observation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
