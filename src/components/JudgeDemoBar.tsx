import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  CloudRain,
  Bug,
  MapPin,
  TrendingDown,
  UserCheck,
  Building2,
  X,
  ChevronRight,
  ListOrdered
} from 'lucide-react';

export const JudgeDemoBar: React.FC = () => {
  const { runJudgeScenario, currentScenarioNotice, dismissScenarioNotice, setActiveTab } = useApp();
  const { setRole, loginWithDemo } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const scenarios = [
    { id: 1, label: 'S1: Healthy Crop', sub: '96% Conf, 0% lesion', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { id: 2, label: 'S2: High Conf Blight', sub: 'Tomato 94%, 35% lesion', icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
    { id: 3, label: 'S3: Low Conf Gate', sub: '54% Conf -> Expert Review', icon: HelpCircle, color: 'text-rose-600 bg-rose-50' },
    { id: 4, label: 'S4: High Weather Risk', sub: 'Late Blight 82% Spore Risk', icon: CloudRain, color: 'text-blue-600 bg-blue-50' },
    { id: 5, label: 'S5: Pest Vector Surge', sub: 'Trap 25->42 (+68% High)', icon: Bug, color: 'text-purple-600 bg-purple-50' },
    { id: 6, label: 'S6: Regional Hotspot', sub: 'Nashik 126 farms', icon: MapPin, color: 'text-red-600 bg-red-50' },
    { id: 7, label: 'S7: Follow-up Progress', sub: '35% -> 27% -> 12%', icon: TrendingDown, color: 'text-teal-600 bg-teal-50' },
    { id: 8, label: 'S8: Expert Validation', sub: 'Agronomist verification', icon: UserCheck, color: 'text-indigo-600 bg-indigo-50' },
    { id: 9, label: 'S9: Official Dashboard', sub: 'Gov/Regional Intelligence', icon: Building2, color: 'text-slate-600 bg-slate-100' }
  ];

  const presentationSteps = [
    { step: 1, name: 'Login / Demo Account', action: () => { loginWithDemo('FARMER'); setActiveTab('home'); } },
    { step: 2, name: 'Farmer Dashboard', action: () => { setRole('FARMER'); setActiveTab('home'); } },
    { step: 3, name: 'Scan Crop Camera', action: () => { setRole('FARMER'); setActiveTab('scan'); } },
    { step: 4, name: 'AI Prediction (94%)', action: () => runJudgeScenario(2) },
    { step: 5, name: 'Confidence & Severity Gate', action: () => runJudgeScenario(2) },
    { step: 6, name: 'Micro-Climate Risk Forecast', action: () => runJudgeScenario(4) },
    { step: 7, name: 'Pest Traps & IoT Sensors', action: () => runJudgeScenario(5) },
    { step: 8, name: 'Crop Health GIS Map', action: () => runJudgeScenario(6) },
    { step: 9, name: 'Contextual Agronomic Plan', action: () => { runJudgeScenario(2); } },
    { step: 10, name: 'Low Confidence -> Expert Queue', action: () => runJudgeScenario(3) },
    { step: 11, name: 'Follow-up Monitoring (D1->D7)', action: () => runJudgeScenario(7) },
    { step: 12, name: 'Field Confirmation Loop', action: () => runJudgeScenario(2) },
    { step: 13, name: 'Official Dashboard', action: () => { setRole('OFFICIAL'); runJudgeScenario(9); } }
  ];

  return (
    <>
      {/* Toast Notice when scenario loads */}
      {currentScenarioNotice && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-xl w-11/12 bg-slate-900 text-white p-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-ping"></span>
            <span className="font-medium">{currentScenarioNotice}</span>
          </div>
          <button
            onClick={dismissScenarioNotice}
            className="p-1 text-slate-400 hover:text-white rounded-md shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Judge Demo launcher button */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          id="judge-demo-drawer-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-full shadow-xl hover:shadow-2xl border border-slate-700 transition-all font-semibold text-xs sm:text-sm tracking-wide"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Judge Demo & Live Scenarios</span>
          <span className="bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
            1-Click
          </span>
        </button>
      </div>

      {/* Modal / Tray for Judge Scenarios and 13-Step Presentation Flow */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-outfit">
                    Plantora AI — Judge Demonstration Controller
                  </h3>
                  <p className="text-xs text-slate-500">
                    Instantly load verified scenarios or step through the complete 13-step live evaluation sequence.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1-Click Scenarios Grid */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Instant Scenarios (1-Click Test)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {scenarios.map(sc => {
                  const Icon = sc.icon;
                  return (
                    <button
                      key={sc.id}
                      id={`judge-scenario-${sc.id}`}
                      onClick={() => {
                        runJudgeScenario(sc.id);
                        setIsOpen(false);
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${sc.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-950">
                          {sc.label}
                        </p>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {sc.sub}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 13-Step Presentation Flow Stepper */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-emerald-600" />
                  Live Presentation Walkthrough (Step 1 → Step 13)
                </h4>
                <span className="text-[11px] text-emerald-700 font-medium">
                  Click any step to demonstrate
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {presentationSteps.map(ps => (
                  <button
                    key={ps.step}
                    onClick={() => {
                      setActiveStep(ps.step);
                      ps.action();
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-1.5 p-2 rounded-lg border text-left text-xs transition-all ${
                      activeStep === ps.step
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {ps.step}
                    </span>
                    <span className="truncate">{ps.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
