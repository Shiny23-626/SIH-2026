import React from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Trees,
  AlertTriangle,
  Bug,
  MapPin,
  ClipboardCheck,
  CheckCircle2,
  Download,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const OfficialDashboardView: React.FC = () => {
  const { t } = useI18n();
  const { farms, cases, alerts, hotspots, pestTraps, setActiveTab } = useApp();

  // Metrics
  const totalMonitoredFarms = 1420 + farms.length;
  const activeDiseaseAlerts = alerts.filter(a => a.type === 'DISEASE_RISK' || a.type === 'HOTSPOT').length;
  const activePestAlerts = pestTraps.filter(t => t.riskLevel === 'HIGH').length;
  const highRiskRegionsCount = hotspots.filter(h => h.risk === 'High').length;
  const pendingExpertCases = cases.filter(c => c.expertStatus === 'Under Review' || c.expertStatus === 'New').length;
  const resolvedCases = cases.filter(c => c.expertStatus === 'Validated' || c.expertStatus === 'Rejected' || c.expertStatus === 'Resolved').length + 84;

  const diseaseDistributionData = [
    { name: 'Early Blight', cases: 142 },
    { name: 'Late Blight', cases: 98 },
    { name: 'Leaf Spot', cases: 76 },
    { name: 'Powdery Mildew', cases: 54 },
    { name: 'Blast / Rust', cases: 38 }
  ];

  const handleExportReport = () => {
    const reportContent = `PLANTORA AI - REGIONAL EPIDEMIOLOGICAL SURVEILLANCE REPORT
Generated: ${new Date().toISOString()}
Jurisdiction: Maharashtra / Nashik Agro-Climatic Zone

SUMMARY METRICS:
Total Monitored Holdings: ${totalMonitoredFarms}
Active High-Risk Regional Hotspots: ${highRiskRegionsCount}
Active Pest Surge Vector Traps: ${activePestAlerts}
Pending Pathologist Reviews: ${pendingExpertCases}
Resolved Diagnostic Cases: ${resolvedCases}

DISTRICT EPIDEMIOLOGY:
${hotspots.map(h => `- ${h.district} (${h.crop}): ${h.disease}, ${h.affectedFarms} affected farms, Risk: ${h.risk}, Trend: ${h.trend}`).join('\n')}

Notice: Agronomic intelligence generated in compliance with Plantora AI epidemiological standards.`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Plantora_Regional_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>State Department of Agriculture & Agro-Climatic Surveillance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.officialDashboardTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Regional foliar pathogen surveillance, epidemiological outbreak indicators, and spatial containment intelligence.
          </p>
        </div>

        <button
          id="btn-export-report"
          onClick={handleExportReport}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Regional Report</span>
        </button>
      </div>

      {/* 6 Key Mandated Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Trees className="w-4 h-4 text-emerald-700" />
            <span className="text-[10px] font-bold uppercase">Holdings</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {totalMonitoredFarms}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">{t.monitoredFarms}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span className="text-[10px] font-bold uppercase">Disease</span>
          </div>
          <p className="text-2xl font-extrabold text-rose-600">
            {activeDiseaseAlerts}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">{t.activeAlerts}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Bug className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase">Vector</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-600">
            {activePestAlerts}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">{t.pestIntelligenceTitle}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="text-[10px] font-bold uppercase">GIS</span>
          </div>
          <p className="text-2xl font-extrabold text-purple-600">
            {highRiskRegionsCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">{t.regionalHotspots}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <ClipboardCheck className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase">Triage</span>
          </div>
          <p className="text-2xl font-extrabold text-blue-600">
            {pendingExpertCases}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">{t.pendingCasesCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span className="text-[10px] font-bold uppercase">Cleared</span>
          </div>
          <p className="text-2xl font-extrabold text-teal-600">
            {resolvedCases}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Resolved Cases</p>
        </div>

      </div>

      {/* Analytical Charts: Disease Breakdown & District Outbreak Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Disease Prevalence Breakdown Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Pathogen Prevalence Across Division
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Aggregated confirmed and high-confidence foliar diagnoses.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
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
                <Bar dataKey="cases" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Severity Hotspots */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                District Epidemiological Registry
              </h3>
              <p className="text-xs text-slate-500">
                Active quarantine and high-risk clusters.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('map')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View GIS Map</span>
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {hotspots.map(h => (
              <div
                key={h.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{h.district}</span>
                    <span className="text-slate-500">({h.crop})</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    {h.disease} &bull; Open Cases: {h.openCases}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      h.risk === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : h.risk === 'Moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {h.affectedFarms} Farms ({h.risk})
                  </span>
                  <p className="text-[10px] text-rose-600 font-semibold mt-0.5 flex items-center justify-end gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{h.trend}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
