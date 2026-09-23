import React from 'react';
import { useI18n } from '../i18n';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand and Description */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-white tracking-wide font-outfit">
                {t.brandName}
              </p>
              <p className="text-xs text-slate-400">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* System & Architecture status indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>ML Pipeline (.h5 / .tflite)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Gemini Advisory Engine</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>IoT & GIS Mesh</span>
            </div>
          </div>

          {/* Explicitly mandated developer attribution */}
          <div className="text-center md:text-right">
            <p className="text-sm font-semibold text-emerald-400">
              Developed by Amsapriya
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Plantora AI &copy; 2026. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
