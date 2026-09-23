import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { CropScanResult } from '../../types';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Building,
  UserCheck,
  FileText,
  CalendarDays
} from 'lucide-react';

interface ScanResultViewProps {
  scan: CropScanResult;
  onScanAgain: () => void;
}

export const ScanResultView: React.FC<ScanResultViewProps> = ({ scan, onScanAgain }) => {
  const { t } = useI18n();
  const { updateFieldConfirmation, updateExpertCase, setActiveTab } = useApp();

  const [feedbackInput, setFeedbackInput] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const isLowConfidence = scan.confidence < 0.60;
  const isMediumConfidence = scan.confidence >= 0.60 && scan.confidence < 0.80;
  const isHighConfidence = scan.confidence >= 0.80;

  const handleConfirmation = (isCorrect: boolean, feedback?: string) => {
    updateFieldConfirmation(scan.id, isCorrect, feedback);
    if (!isCorrect) {
      setShowFeedbackForm(true);
    } else {
      setShowFeedbackForm(false);
      setActionSuccessMsg(t.confirmationRecorded);
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }
  };

  const handleRequestExpert = () => {
    updateExpertCase(scan.id, 'Under Review', 'Requested by grower via Safety Gate protocol', 'Agricultural Expert');
    setActionSuccessMsg('Case successfully submitted to Agronomy Expert Validation Queue.');
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleRequestLab = () => {
    updateExpertCase(scan.id, 'Lab Verification', 'Referred to district plant pathology laboratory', 'Laboratory');
    setActionSuccessMsg('Case referred to District Plant Pathology Laboratory.');
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleGoToMonitoring = () => {
    setActiveTab('monitoring');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Top Banner: Status and Safety Gate Notice */}
      <div
        className={`px-5 py-3.5 flex items-center justify-between border-b ${
          isLowConfidence
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : isMediumConfidence
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          {isLowConfidence ? (
            <>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{t.cautionNoticeBadge}: Low Confidence Triggered</span>
            </>
          ) : isMediumConfidence ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{t.cautionNoticeBadge}: Field Verification Advised</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{t.highConfidence}</span>
            </>
          )}
        </div>

        <span className="text-[11px] font-mono text-slate-500">
          ID: {scan.id}
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        
        {/* Low Confidence Warning Notice */}
        {isLowConfidence && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs sm:text-sm space-y-2">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900">
                  {t.lowConfidenceNotice}
                </p>
                <p className="text-xs text-rose-700 mt-1">
                  Confidence is {(scan.confidence * 100).toFixed(0)}%, which falls below the safe 60% threshold. Symptoms may overlap with physiological nutrient deficiencies or secondary pests.
                </p>
              </div>
            </div>

            {/* Mandated Low Confidence Safety Gate Buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={handleRequestExpert}
                className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                {t.requestExpertReview}
              </button>
              <button
                onClick={handleRequestLab}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Building className="w-3.5 h-3.5" />
                {t.requestLabVerification}
              </button>
              <button
                onClick={onScanAgain}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 font-semibold text-xs transition-colors"
              >
                {t.uploadAnotherImage}
              </button>
            </div>
          </div>
        )}

        {/* Medium Confidence Notice */}
        {isMediumConfidence && scan.cautionNotice && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>{scan.cautionNotice}</p>
          </div>
        )}

        {/* Action success alert */}
        {actionSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Main Metric Cards Grid: Crop, Disease, Confidence, Severity, Affected Area */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {t.cropLabel}
            </p>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {scan.crop}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {t.confidenceLabel}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-base font-extrabold ${
                isHighConfidence ? 'text-emerald-700' : isMediumConfidence ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {(scan.confidence * 100).toFixed(0)}%
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                isHighConfidence ? 'bg-emerald-100 text-emerald-800' : isMediumConfidence ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {scan.confidenceLevel}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {t.severityLabel}
            </p>
            <p className={`text-base font-bold mt-0.5 ${
              scan.severity === 'High' ? 'text-rose-700' : scan.severity === 'Moderate' ? 'text-amber-700' : 'text-emerald-700'
            }`}>
              {scan.severity}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {t.affectedAreaLabel}
            </p>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {scan.affected_area}%
            </p>
          </div>

        </div>

        {/* Primary Diagnosis Headline */}
        <div className="p-4 rounded-xl border border-emerald-900/10 bg-emerald-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              {t.diseaseLabel}
            </span>
            <h3 className="text-xl font-bold text-slate-950">
              {scan.disease}
            </h3>
            {scan.scientificName && (
              <p className="text-xs italic text-slate-600">
                Pathogen: {scan.scientificName}
              </p>
            )}
          </div>

          {/* Model provenance info */}
          <div className="text-right sm:text-right shrink-0">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs">
              {scan.modelSource}
            </span>
          </div>
        </div>

        {/* Image with bounding box / lesion overlay */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-16/9 flex items-center justify-center">
          <img
            src={scan.imageUrl}
            alt={scan.disease}
            className="w-full h-full object-contain"
          />

          {/* Real bounding box overlay if provided */}
          {scan.boundingBoxes && scan.boundingBoxes.map((box, idx) => (
            <div
              key={idx}
              style={{
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.width}%`,
                height: `${box.height}%`
              }}
              className="absolute border-2 border-amber-400 bg-amber-400/20 rounded pointer-events-none"
            >
              <span className="absolute -top-5 left-0 bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded shadow-xs">
                {box.label} ({(box.confidence * 100).toFixed(0)}%)
              </span>
            </div>
          ))}

          <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md">
            Severity: {scan.severity} ({scan.affected_area}% Folium)
          </div>
        </div>

        {/* Symptoms Observed */}
        {scan.symptoms && scan.symptoms.length > 0 && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Morphological Symptoms
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {scan.symptoms.map((symp, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <span>{symp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contextual Agronomic Management Plan */}
        <div className="border-t border-slate-200 pt-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>{t.managementPlanTitle}</span>
            </h4>
            <button
              onClick={handleGoToMonitoring}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{t.btnStartMonitoring}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            
            {/* Immediate Actions */}
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1.5">
              <p className="font-bold text-amber-950 uppercase text-[11px] tracking-wide">
                {t.immediateActions}
              </p>
              <ul className="space-y-1 text-slate-700">
                {scan.recommendations.immediate.map((act, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Biological / Organic Options */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-1.5">
              <p className="font-bold text-emerald-950 uppercase text-[11px] tracking-wide">
                {t.organicBiological}
              </p>
              <ul className="space-y-1 text-slate-700">
                {scan.recommendations.biological.map((bio, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{bio}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cultural Practices */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <p className="font-bold text-slate-800 uppercase text-[11px] tracking-wide">
                {t.culturalPractices}
              </p>
              <ul className="space-y-1 text-slate-700">
                {scan.recommendations.cultural.map((cul, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-500 font-bold">•</span>
                    <span>{cul}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Management with required safety disclaimer */}
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/60 space-y-1.5">
              <p className="font-bold text-blue-950 uppercase text-[11px] tracking-wide">
                {t.chemicalGuidance}
              </p>
              <p className="text-slate-800 leading-relaxed">
                {scan.recommendations.chemicalGuidance}
              </p>
              <p className="text-[11px] font-medium text-blue-800 italic pt-1 border-t border-blue-200/60">
                ⚠️ {t.chemicalDisclaimer}
              </p>
            </div>

          </div>
        </div>

        {/* Field Confirmation Section (Requirement 25) */}
        <div className="border-t border-slate-200 pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t.fieldConfirmationPrompt}
            </h4>
            {scan.fieldConfirmation?.isCorrect !== null && (
              <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirmed by grower</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="confirm-prediction-yes"
              type="button"
              onClick={() => handleConfirmation(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                scan.fieldConfirmation?.isCorrect === true
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              ✓ {t.btnYes}
            </button>

            <button
              id="confirm-prediction-no"
              type="button"
              onClick={() => handleConfirmation(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                scan.fieldConfirmation?.isCorrect === false
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              ✕ {t.btnNo}
            </button>

            <button
              type="button"
              onClick={() => handleConfirmation(false, 'Field grower unsure')}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            >
              ? {t.btnNotSure}
            </button>
          </div>

          {/* Feedback input when user selects NO */}
          {showFeedbackForm && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 animate-in fade-in">
              <label className="block text-xs font-semibold text-slate-800">
                {t.feedbackQuestion}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder={t.feedbackPlaceholder}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleConfirmation(false, feedbackInput);
                    setShowFeedbackForm(false);
                    setActionSuccessMsg(t.confirmationRecorded);
                    setTimeout(() => setActionSuccessMsg(null), 4000);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.submitFeedback}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
