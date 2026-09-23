import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { CropScanResult } from '../../types';
import {
  FolderClock,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const CaseHistoryView: React.FC = () => {
  const { t } = useI18n();
  const { cases, setActiveScan, setActiveTab } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [cropFilter, setCropFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredCases = cases.filter(c => {
    const matchSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.crop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCrop = cropFilter === 'ALL' || c.crop === cropFilter;
    const matchStatus = statusFilter === 'ALL' || c.expertStatus === statusFilter;

    return matchSearch && matchCrop && matchStatus;
  });

  const crops = Array.from(new Set(cases.map(c => c.crop)));

  const handleInspectCase = (scan: CropScanResult) => {
    setActiveScan(scan);
    setActiveTab('scan');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <FolderClock className="w-4 h-4" />
            <span>Foliar Disease Case Archive & Longitudinal Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.navCases}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Inspect historical diagnostic records, treatment recommendations, expert validation verdicts, and progression logs.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
          Total Archived Scans: <strong>{cases.length}</strong>
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by case ID, crop, or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <select
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-300 px-3 py-2 bg-white text-slate-800 font-medium"
          >
            <option value="ALL">All Crops</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-300 px-3 py-2 bg-white text-slate-800 font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Validated">Validated</option>
            <option value="Pending">Pending</option>
            <option value="Modified">Modified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Cases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map(c => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img
                  src={c.imageUrl}
                  alt={c.disease}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                  {c.id}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.expertStatus === 'Validated'
                        ? 'bg-emerald-500 text-white'
                        : c.expertStatus === 'Rejected'
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {c.expertStatus}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    {c.crop}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{c.timestamp.split('T')[0]}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 font-outfit">
                  {c.disease}
                </h3>
                <p className="text-xs text-slate-500 italic">
                  {c.scientificName}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Confidence:</span>
                  <span className={`font-bold ${
                    c.confidence >= 0.8
                      ? 'text-emerald-700'
                      : c.confidence >= 0.6
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}>
                    {(c.confidence * 100).toFixed(0)}%
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-600 font-medium">Severity:</span>
                  <span className="font-bold text-slate-800">{c.severity}</span>
                </div>

                {c.expertNotes && (
                  <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg line-clamp-2 italic">
                    "{c.expertNotes}"
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => handleInspectCase(c)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Diagnostic Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400">
          <FolderClock className="w-12 h-12 mx-auto mb-2 text-slate-300" />
          <p className="text-sm">No diagnostic cases matched your search or filter.</p>
        </div>
      )}

    </div>
  );
};
