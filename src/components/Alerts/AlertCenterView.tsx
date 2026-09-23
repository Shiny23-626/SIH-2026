import React from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  AlertTriangle,
  Bug,
  CloudRain,
  MapPin,
  ClipboardCheck,
  Check,
  CheckCheck
} from 'lucide-react';

export const AlertCenterView: React.FC = () => {
  const { t } = useI18n();
  const { alerts, markAlertRead, setActiveTab } = useApp();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'DISEASE_RISK': return AlertTriangle;
      case 'PEST_RISK': return Bug;
      case 'WEATHER': return CloudRain;
      case 'HOTSPOT': return MapPin;
      case 'EXPERT_UPDATE': return ClipboardCheck;
      default: return Bell;
    }
  };

  const getSeverityBadge = (sev: string) => {
    const s = sev.toLowerCase();
    if (s === 'critical') return 'bg-rose-100 text-rose-800 border-rose-200';
    if (s === 'warning') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  const markAllRead = () => {
    alerts.forEach(a => {
      if (!a.read) markAlertRead(a.id);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Real-time Agro-Advisory & Outbreak Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.navAlerts}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Critical alerts triggered by micro-climate spore models, pheromone traps, and pathologist reviews.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <CheckCheck className="w-4 h-4 text-emerald-700" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map(alert => {
          const Icon = getAlertIcon(alert.type);

          return (
            <div
              key={alert.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start justify-between gap-4 ${
                alert.read
                  ? 'bg-white border-slate-200 opacity-80'
                  : 'bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-500/10'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  alert.severity === 'critical'
                    ? 'bg-rose-50 text-rose-600'
                    : alert.severity === 'warning'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {alert.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {alert.message}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {!alert.read && (
                  <button
                    onClick={() => markAlertRead(alert.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Read</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    if (alert.type === 'DISEASE_RISK' || alert.type === 'WEATHER') {
                      setActiveTab('risk');
                    } else if (alert.type === 'PEST_RISK') {
                      setActiveTab('pest');
                    } else if (alert.type === 'HOTSPOT') {
                      setActiveTab('map');
                    } else if (alert.type === 'EXPERT_UPDATE') {
                      setActiveTab('expert');
                    } else if (alert.type === 'MONITORING') {
                      setActiveTab('monitoring');
                    } else {
                      setActiveTab('scan');
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors"
                >
                  View Detail
                </button>
              </div>
            </div>
          );
        })}

        {alerts.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            No active alerts at this time.
          </div>
        )}
      </div>

    </div>
  );
};
