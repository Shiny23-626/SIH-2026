import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { MonitoringEntry } from '../../types';
import {
  CalendarDays,
  TrendingDown,
  Camera,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
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

export const FollowUpMonitoringView: React.FC = () => {
  const { t } = useI18n();
  const { monitoringTimeline, addMonitoringEntry, setActiveTab } = useApp();

  const [showLogModal, setShowLogModal] = useState(false);
  const [newAffectedArea, setNewAffectedArea] = useState<number>(8);
  const [newNotes, setNewNotes] = useState('New shoots emerging vigorously with no active sporulation.');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const nextDay = monitoringTimeline.length > 0
      ? monitoringTimeline[monitoringTimeline.length - 1].day + 4
      : 1;

    const newEntry: MonitoringEntry = {
      day: nextDay,
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?w=600&auto=format&fit=crop&q=80',
      severity: newAffectedArea > 25 ? 'High' : newAffectedArea > 15 ? 'Moderate' : 'Low',
      affectedArea: Number(newAffectedArea),
      aiConfidence: 0.95,
      notes: newNotes
    };

    addMonitoringEntry(newEntry);
    setShowLogModal(false);
    setSuccessNotice(`Day ${nextDay} inspection logged. Recovery trajectory updated.`);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const initialArea = monitoringTimeline[0]?.affectedArea || 35;
  const currentArea = monitoringTimeline[monitoringTimeline.length - 1]?.affectedArea || 12;
  const reductionPercentage = Math.round(((initialArea - currentArea) / initialArea) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Foliar Disease Recovery & Treatment Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.navMonitoring}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track foliar lesion regression across Day 1, Day 3, and Day 7 milestones to verify bio-fungicide efficacy.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Camera className="w-4 h-4" />
          <span>Upload Follow-Up Observation</span>
        </button>
      </div>

      {successNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Trajectory Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Summary & Milestones */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Monitored Case
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">
                Early Blight &bull; Tomato
              </h3>
              <p className="text-xs text-slate-500">
                Holding: Dindori Vineyards &bull; Sector A
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Improving (-{reductionPercentage}%)</span>
            </span>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recovery Milestones (35% &rarr; 27% &rarr; 12%)
            </h4>

            <div className="space-y-2.5">
              {monitoringTimeline.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                      D{m.day}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{m.date}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[200px]">{m.notes}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-sm text-slate-900">
                      {m.affectedArea}% Folium
                    </span>
                    <p className="text-[10px] text-emerald-700 font-semibold">{m.severity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prescribed Intervention */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <p className="font-bold uppercase tracking-wide text-emerald-900 text-[10px]">
              Active Agronomic Prescription
            </p>
            <p className="leading-relaxed">
              Applied Bacillus subtilis bio-fungicide post-pruning of lower canopy leaves. Drip irrigation scheduled only in morning hours to limit leaf wetness duration.
            </p>
          </div>
        </div>

        {/* Right: Trend Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Lesion Area Reduction Trajectory (%)
                </h3>
                <p className="text-xs text-slate-500">
                  Clinical leaf surface recovery over days of treatment adherence.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                -{reductionPercentage}% Remission
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monitoringTimeline.map(m => ({ name: `Day ${m.day}`, area: m.affectedArea }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
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
                    dataKey="area"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#059669' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Next scheduled diagnostic check: Day 14</span>
            <button
              onClick={() => setActiveTab('scan')}
              className="text-emerald-800 font-bold hover:underline"
            >
              Trigger Intermediate Scan &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* Modal for adding follow-up log */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-outfit mb-1">
              Record Follow-Up Observation
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter follow-up foliar observation for the active early blight treatment cycle.
            </p>

            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Observed Affected Leaf Area (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newAffectedArea}
                  onChange={(e) => setNewAffectedArea(Number(e.target.value))}
                  required
                  className="w-full text-sm font-bold px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Field Pathologist / Farmer Notes
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  required
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
