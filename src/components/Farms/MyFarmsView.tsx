import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Farm, FarmField } from '../../types';
import {
  Trees,
  Plus,
  MapPin,
  Calendar,
  Layers,
  Trash2,
  ScanLine,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const MyFarmsView: React.FC = () => {
  const { t } = useI18n();
  const { farms, addFarm, updateFarm, deleteFarm, setActiveTab } = useApp();

  const [selectedFarmId, setSelectedFarmId] = useState<string>(farms[0]?.id || '');
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);

  // Form states for adding farm
  const [farmName, setFarmName] = useState('');
  const [farmLocation, setFarmLocation] = useState('Nashik, Maharashtra');
  const [farmTotalArea, setFarmTotalArea] = useState(8.5);
  const [farmCrop, setFarmCrop] = useState('Tomato');
  const [farmVariety, setFarmVariety] = useState('Abhinav F1');

  // Form states for adding field
  const [fieldName, setFieldName] = useState('');
  const [fieldCrop, setFieldCrop] = useState('Tomato');
  const [fieldSoilType, setFieldSoilType] = useState('Black Loam (Regur)');
  const [fieldIrrigation, setFieldIrrigation] = useState('Drip Irrigation');
  const [fieldArea, setFieldArea] = useState(3.5);

  const selectedFarm = farms.find(f => f.id === selectedFarmId) || farms[0];

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) return;

    addFarm({
      name: farmName,
      location: farmLocation,
      areaAcres: Number(farmTotalArea),
      crop: farmCrop,
      cropVariety: farmVariety,
      cropStage: 'Vegetative to Flowering',
      plantingDate: new Date().toISOString().split('T')[0],
      healthStatus: 'Good',
      diseaseRisk: 'Low',
      pestRisk: 'Low',
      lastScanDate: new Date().toISOString().split('T')[0],
      fields: [
        {
          id: `fld-${Date.now()}`,
          name: `${farmName} - Sector 1`,
          crop: farmCrop,
          soilType: fieldSoilType,
          irrigationType: fieldIrrigation,
          areaAcres: Number(farmTotalArea),
          status: 'Healthy'
        }
      ]
    });

    setShowAddFarmModal(false);
    setFarmName('');
  };

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName.trim() || !selectedFarm) return;

    const newField: FarmField = {
      id: `fld-${Date.now()}`,
      name: fieldName,
      crop: fieldCrop,
      soilType: fieldSoilType,
      irrigationType: fieldIrrigation,
      areaAcres: Number(fieldArea),
      status: 'Healthy'
    };

    updateFarm(selectedFarm.id, {
      fields: [...selectedFarm.fields, newField],
      areaAcres: selectedFarm.areaAcres + Number(fieldArea)
    });

    setShowAddFieldModal(false);
    setFieldName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Trees className="w-4 h-4" />
            <span>Agricultural Parcel & Sector Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.navFarms}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your agricultural holdings, sector plots, soil regimes, and foliar inspection schedules.
          </p>
        </div>

        <button
          onClick={() => setShowAddFarmModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Farm</span>
        </button>
      </div>

      {/* Main Grid: Farms List & Active Farm Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Registered Holdings List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Registered Holdings ({farms.length})
          </h3>

          <div className="space-y-2.5">
            {farms.map(farm => {
              const isSelected = selectedFarm?.id === farm.id;

              return (
                <div
                  key={farm.id}
                  onClick={() => setSelectedFarmId(farm.id)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-600/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900 font-outfit">
                      {farm.name}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        farm.healthStatus === 'High Risk'
                          ? 'bg-rose-100 text-rose-800'
                          : farm.healthStatus === 'Moderate Risk'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {farm.healthStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{farm.location}</span>
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span>{farm.areaAcres} Acres</span>
                    <span>{farm.crop} ({farm.cropVariety})</span>
                    <span>{farm.fields.length} Sectors</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Farm Fields & Sectors */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {selectedFarm ? (
            <>
              {/* Farm Overview Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 font-outfit">
                      {selectedFarm.name}
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {selectedFarm.areaAcres} Acres Total
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedFarm.location} &bull; Primary crop: <strong>{selectedFarm.crop} ({selectedFarm.cropVariety})</strong></span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddFieldModal(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Sector</span>
                  </button>
                  <button
                    onClick={() => deleteFarm(selectedFarm.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Farm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sectors / Fields Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Cultivation Sectors ({selectedFarm.fields.length})
                  </h3>
                  <span className="text-xs text-slate-500">
                    Last inspect: {selectedFarm.lastScanDate}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedFarm.fields.map(field => (
                    <div
                      key={field.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">
                          {field.name}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            field.status === 'Infected'
                              ? 'bg-rose-100 text-rose-800'
                              : field.status === 'Needs Attention'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {field.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Crop</span>
                          <p className="font-semibold text-slate-800">{field.crop}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Parcel Area</span>
                          <p className="font-semibold text-slate-800">{field.areaAcres} Acres</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Irrigation</span>
                          <p className="font-semibold text-slate-800">{field.irrigationType}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Soil Type</span>
                          <p className="font-semibold text-slate-800">{field.soilType}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">
                          Stage: {selectedFarm.cropStage}
                        </span>
                        <button
                          onClick={() => setActiveTab('scan')}
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-900 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <ScanLine className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Scan Sector</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Trees className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">Select a farm on the left to view sector details.</p>
            </div>
          )}
        </div>

      </div>

      {/* Modal: Add Farm */}
      {showAddFarmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-outfit mb-1">
              Register New Farm Holding
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add your farm parcel coordinates to enable hyper-local micro-climate spore forecasts.
            </p>

            <form onSubmit={handleCreateFarm} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dindori Organic Vineyards"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / District</label>
                <input
                  type="text"
                  required
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Crop</label>
                  <select
                    value={farmCrop}
                    onChange={(e) => setFarmCrop(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                    <option value="Potato">Potato</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Chilli">Chilli</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Total Acreage</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={farmTotalArea}
                    onChange={(e) => setFarmTotalArea(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddFarmModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs"
                >
                  Register Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Sector */}
      {showAddFieldModal && selectedFarm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-outfit mb-1">
              Add Cultivation Sector to {selectedFarm.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Segment your farm land into manageable management sectors.
            </p>

            <form onSubmit={handleCreateField} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sector Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector C (Drip Irrigated)"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Crop</label>
                  <select
                    value={fieldCrop}
                    onChange={(e) => setFieldCrop(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                    <option value="Potato">Potato</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Chilli">Chilli</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Soil Type</label>
                  <input
                    type="text"
                    value={fieldSoilType}
                    onChange={(e) => setFieldSoilType(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Irrigation Method</label>
                  <input
                    type="text"
                    value={fieldIrrigation}
                    onChange={(e) => setFieldIrrigation(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddFieldModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs"
                >
                  Add Sector
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
