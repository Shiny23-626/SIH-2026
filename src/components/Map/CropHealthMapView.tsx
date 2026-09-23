import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { HotspotRecord } from '../../types';
import {
  MapPin,
  Filter,
  Layers,
  TrendingUp,
  AlertTriangle,
  Building,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

export const CropHealthMapView: React.FC = () => {
  const { t } = useI18n();
  const { hotspots, setActiveTab } = useApp();

  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [activeHotspot, setActiveHotspot] = useState<HotspotRecord | null>(hotspots[0] || null);

  // Filter hotspots
  const filteredHotspots = hotspots.filter(h => {
    const matchCrop = selectedCropFilter === 'ALL' || h.crop === selectedCropFilter;
    const matchRisk = selectedRiskFilter === 'ALL' || h.risk.toUpperCase() === selectedRiskFilter;
    return matchCrop && matchRisk;
  });

  const cropsList = Array.from(new Set(hotspots.map(h => h.crop)));

  const getRiskColor = (risk: string) => {
    const r = risk.toUpperCase();
    if (r === 'HIGH') return 'bg-rose-600 text-white border-rose-700';
    if (r === 'MODERATE' || r === 'MEDIUM') return 'bg-amber-500 text-white border-amber-600';
    return 'bg-emerald-600 text-white border-emerald-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>GIS Regional Foliar & Vector Hotspot Surveillance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.cropHealthMapTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {t.regionalHotspots}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Risk Legend:</span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Low
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </span>

          {/* Crop Filter */}
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="text-xs rounded-lg border border-slate-300 px-3 py-1.5 bg-white text-slate-800 font-medium"
          >
            <option value="ALL">All Crops</option>
            {cropsList.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          {/* Risk Level Filter */}
          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            className="text-xs rounded-lg border border-slate-300 px-3 py-1.5 bg-white text-slate-800 font-medium"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Moderate Risk</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>

        <span className="text-xs text-slate-500">
          Showing <strong>{filteredHotspots.length}</strong> active agro-climatic clusters
        </span>
      </div>

      {/* Map Stage and Hotspot Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive GIS Spatial Canvas */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative shadow-lg min-h-[480px] flex flex-col justify-between p-6">
          
          {/* Top GIS telemetry bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 z-10">
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Layer: NDVI + Foliar Spore Pressure</span>
            </div>
            <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-[11px]">
              Coord: 19.9975° N, 73.7898° E (WGS84)
            </span>
          </div>

          {/* Stylized GIS Grid & Hotspots */}
          <div className="relative my-auto w-full aspect-16/9 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] rounded-xl flex items-center justify-center">
            
            {/* Topography contour outlines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none border border-emerald-500/40 rounded-xl m-6"></div>
            <div className="absolute inset-0 opacity-10 pointer-events-none border border-emerald-500/30 rounded-xl m-16"></div>

            {/* Hotspot Markers placed visually across map space */}
            {filteredHotspots.map((hs, index) => {
              const isSelected = activeHotspot?.id === hs.id;
              
              // Distribute markers across canvas mathematically
              const positions = [
                { top: '35%', left: '30%' }, // Nashik
                { top: '55%', left: '42%' }, // Pune
                { top: '65%', left: '25%' }, // Sangli
                { top: '40%', left: '60%' }, // Aurangabad
                { top: '28%', left: '50%' }, // Dhule
                { top: '70%', left: '55%' }  // Solapur
              ];
              const pos = positions[index % positions.length];

              return (
                <div
                  key={hs.id}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    id={`hotspot-marker-${hs.id}`}
                    onClick={() => setActiveHotspot(hs)}
                    className={`relative p-2 rounded-full border-2 transition-all transform hover:scale-125 ${
                      getRiskColor(hs.risk)
                    } ${isSelected ? 'ring-4 ring-white/60 scale-125' : ''}`}
                    title={`${hs.district}: ${hs.disease}`}
                  >
                    <MapPin className="w-4 h-4 fill-current" />
                    
                    {/* Pulsing ring for High Risk */}
                    {hs.risk.toUpperCase() === 'HIGH' && (
                      <span className="absolute -inset-1 rounded-full bg-rose-500 opacity-60 animate-ping"></span>
                    )}
                  </button>

                  {/* Marker label pill */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none ${
                    isSelected ? 'bg-white text-slate-950 font-extrabold' : 'bg-slate-900/90 text-slate-200'
                  }`}>
                    {hs.district} ({hs.affectedFarms})
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom attribution */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 z-10 pt-2 border-t border-slate-800">
            <span>Plantora Spatial Mesh v1.2</span>
            <span>Click any node to inspect district epidemiology</span>
          </div>

        </div>

        {/* Right: Selected Hotspot Deep-Dive Inspector */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          {activeHotspot ? (
            <>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    District Focus
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-outfit">
                    {activeHotspot.district}
                  </h3>
                  <p className="text-xs text-slate-500">
                    State: {activeHotspot.state} &bull; Updated: {activeHotspot.lastReported}
                  </p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    activeHotspot.risk === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : activeHotspot.risk === 'Moderate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {activeHotspot.risk} Risk
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Affected Farms</span>
                  <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {activeHotspot.affectedFarms}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Open Cases</span>
                  <p className="text-xl font-extrabold text-amber-600 mt-0.5">
                    {activeHotspot.openCases}
                  </p>
                </div>
              </div>

              {/* Disease & Crop */}
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Primary Outbreak</span>
                  <p className="text-sm font-bold text-slate-950 mt-0.5">
                    {activeHotspot.disease}
                  </p>
                  <p className="text-xs text-slate-600">
                    Host Crop: {activeHotspot.crop}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Outbreak Trend:</span>
                  <span className="font-bold text-rose-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{activeHotspot.trend}</span>
                  </span>
                </div>
              </div>

              {/* Containment Directive */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[10px] text-amber-900">
                  Regional Advisory Directive
                </p>
                <p className="leading-relaxed">
                  Advisory issued to farmers in {activeHotspot.district} to scout {activeHotspot.crop} fields for {activeHotspot.disease} lesions and install vector traps.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('official')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span>Open Official District Intelligence</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Info className="w-8 h-8 mx-auto mb-2" />
              <p className="text-xs">Select a district hotspot on the GIS canvas to inspect.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
