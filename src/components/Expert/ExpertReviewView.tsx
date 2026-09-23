import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { CropScanResult } from '../../types';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building,
  UserCheck,
  MessageSquare
} from 'lucide-react';

export const ExpertReviewView: React.FC = () => {
  const { t } = useI18n();
  const { cases, updateExpertCase } = useApp();
  const { user } = useAuth();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [expertNote, setExpertNote] = useState('');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleAction = (
    status: CropScanResult['expertStatus'],
    referral: CropScanResult['referralType'],
    label: string
  ) => {
    if (!activeCase) return;
    const defaultNote =
      status === 'Validated'
        ? 'Pathogen symptoms verified and confirmed according to regional clinical standards.'
        : status === 'Rejected'
        ? 'Diagnosis rejected: foliar spotting indicates non-pathogenic physiological or nutrient necrosis.'
        : referral === 'Laboratory'
        ? 'Atypical lesion morphology. Specimen escalated to Central Phytopathology Laboratory for PCR validation.'
        : 'Requested secondary macro foliar imagery under uniform diffused daylight.';

    updateExpertCase(activeCase.id, status, expertNote || defaultNote, referral);
    
    setNotificationMsg(`Case ${activeCase.id} updated to ${label}. Notification dispatched.`);
    setTimeout(() => setNotificationMsg(null), 4000);
    setExpertNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <ClipboardCheck className="w-4 h-4" />
            <span>Pathologist & Agronomist Diagnostic Workbench</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.expertReviewTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Validate ambiguous AI foliar diagnoses, confirm pathogen identity, or refer atypical samples to regional plant pathology laboratories.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-900">
          <UserCheck className="w-4 h-4 text-emerald-700" />
          <span>Active Reviewer: {user?.name || 'Dr. K. Swaminathan (Pathologist)'}</span>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notificationMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Pending / Triage Queue */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Verification Queue ({cases.length} Cases)
          </h3>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {cases.map(c => {
              const isSelected = activeCase?.id === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-600/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {c.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.expertStatus === 'Validated'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.expertStatus === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : c.referralType === 'Laboratory'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.referralType === 'Laboratory' ? 'Lab Referral' : c.expertStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={c.imageUrl}
                      alt={c.disease}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {c.disease}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">
                        Crop: {c.crop} &bull; Severity: {c.severity}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          c.confidence >= 0.8
                            ? 'bg-emerald-100 text-emerald-800'
                            : c.confidence >= 0.6
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          AI Conf: {(c.confidence * 100).toFixed(0)}%
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {c.timestamp.split('T')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Pathologist Deep Inspection Pane */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {activeCase ? (
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Inspecting Specimen #{activeCase.id}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-outfit">
                    {activeCase.disease}
                  </h2>
                  <p className="text-xs text-slate-500 italic">
                    {activeCase.scientificName} &bull; Host: {activeCase.crop}
                  </p>
                </div>

                <span
                  className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold ${
                    activeCase.expertStatus === 'Validated'
                      ? 'bg-emerald-100 text-emerald-800'
                      : activeCase.expertStatus === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Status: {activeCase.expertStatus}
                </span>
              </div>

              {/* High-Res Image View */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 h-72">
                <img
                  src={activeCase.imageUrl}
                  alt={activeCase.disease}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span>AI Confidence: {(activeCase.confidence * 100).toFixed(0)}%</span>
                  <span>&bull;</span>
                  <span>Severity: {activeCase.severity}</span>
                </div>
              </div>

              {/* Pathologist Assessment & Validation Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Clinical Validation & Treatment Directives</span>
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={expertNote}
                    onChange={(e) => setExpertNote(e.target.value)}
                    placeholder="Enter diagnostic notes, differential diagnosis, or specific organic/chemical prescription for the farmer..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                {/* Mandated 4 Action Buttons: Validate, Reject, Modify/Re-scan, Refer to Lab */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  
                  <button
                    id="expert-btn-confirm"
                    type="button"
                    onClick={() => handleAction('Validated', null, 'Validated')}
                    className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.btnValidate}</span>
                  </button>

                  <button
                    id="expert-btn-reject"
                    type="button"
                    onClick={() => handleAction('Rejected', null, 'Rejected')}
                    className="p-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{t.btnReject}</span>
                  </button>

                  <button
                    id="expert-btn-more-data"
                    type="button"
                    onClick={() => handleAction('Under Review', 'Extension Officer', 'Under Field Review')}
                    className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Request Data</span>
                  </button>

                  <button
                    id="expert-btn-lab-test"
                    type="button"
                    onClick={() => handleAction('Lab Verification', 'Laboratory', 'Referred to Lab')}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Building className="w-4 h-4 text-emerald-400" />
                    <span>{t.btnReferLab}</span>
                  </button>

                </div>
              </div>

              {/* Prior Expert Review Note if present */}
              {activeCase.expertNotes && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900">
                    Recorded Clinical Advisory ({activeCase.expertStatus}):
                  </p>
                  <p className="italic text-slate-600">
                    "{activeCase.expertNotes}"
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-slate-400">
              Select a case from the queue to start review.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
