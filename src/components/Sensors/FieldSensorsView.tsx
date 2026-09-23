import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Droplets,
  Thermometer,
  Waves,
  Plus,
  Wifi,
  BatteryCharging,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const FieldSensorsView: React.FC = () => {
  const { t } = useI18n();
  const { sensors, addSensorReading } = useApp();

  const [selectedSensorId, setSelectedSensorId] = useState(sensors[0]?.id || 'sns-1');
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simulatedSoil, setSimulatedSoil] = useState<number>(45);

  const activeSensor = sensors.find(s => s.id === selectedSensorId) || sensors[0];

  const handleUpdateSensor = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSensor) {
      addSensorReading(activeSensor.id, {
        soilMoisturePercent: Number(simulatedSoil),
        lastUpdated: 'Just now'
      });
      setShowSimulateModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>IoT Canopy Micro-Climate & In-Situ Agro-Sensors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.fieldSensorsTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real-time wireless leaf wetness duration, volumetric soil moisture, and sub-canopy relative humidity mesh.
          </p>
        </div>

        <button
          onClick={() => {
            if (activeSensor) setSimulatedSoil(activeSensor.soilMoisturePercent);
            setShowSimulateModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Calibrate / Simulate Probe</span>
        </button>
      </div>

      {/* Sensor Probes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sensors.map(sensor => {
          const isSelected = selectedSensorId === sensor.id;
          const isWarning = sensor.soilMoisturePercent < 30 || sensor.leafWetnessHours > 6;

          return (
            <div
              key={sensor.id}
              onClick={() => setSelectedSensorId(sensor.id)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all bg-white ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-400">
                  {sensor.sensorId}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isWarning
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isWarning ? 'Attention' : 'Optimal'}
                </span>
              </div>

              <h4 className="font-bold text-base text-slate-900 font-outfit">{sensor.name}</h4>
              <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{sensor.location}</span>
              </p>

              {/* 4 Multi-Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Soil Moisture</span>
                    <p className="font-extrabold text-slate-800">{sensor.soilMoisturePercent}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Thermometer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Temperature</span>
                    <p className="font-extrabold text-slate-800">{sensor.temperatureC}°C</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Humidity</span>
                    <p className="font-extrabold text-slate-800">{sensor.humidityPercent}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Leaf Wetness</span>
                    <p className="font-extrabold text-slate-800">{sensor.leafWetnessHours} hrs</p>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-slate-400" />
                  <span>{sensor.batteryPercent}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{sensor.lastUpdated}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Sensor Deep Dive Telemetry Chart */}
      {activeSensor && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-outfit">
                  {activeSensor.name} &bull; Diurnal Telemetry Curve ({activeSensor.location})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Volumetric soil moisture (%) and ambient canopy temperature (°C) records.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Signal: 98% LQI (LoRaWAN Gateway)</span>
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeSensor.history}>
                <defs>
                  <linearGradient id="sensorSoilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
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
                <Area
                  type="monotone"
                  dataKey="soil"
                  name="Soil Moisture (%)"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#sensorSoilGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Modal for Calibrating / Updating Sensor */}
      {showSimulateModal && activeSensor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-outfit mb-1">
              Calibrate Sensor Probe ({activeSensor.name})
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter target volumetric soil moisture (%) to test spore germination warning alarms.
            </p>

            <form onSubmit={handleUpdateSensor} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Volumetric Soil Moisture (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={simulatedSoil}
                  onChange={(e) => setSimulatedSoil(Number(e.target.value))}
                  required
                  className="w-full text-base font-bold px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs"
                >
                  Update Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
