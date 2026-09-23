import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Farm,
  CropScanResult,
  PestTrapRecord,
  SensorReading,
  WeatherDay,
  HotspotRecord,
  AppAlert,
  MonitoringEntry
} from '../types';
import {
  INITIAL_FARMS,
  INITIAL_CASES,
  INITIAL_PEST_TRAPS,
  INITIAL_SENSORS,
  INITIAL_WEATHER_FORECAST,
  INITIAL_HOTSPOTS,
  INITIAL_ALERTS
} from '../data/seedData';

export type ActiveTab =
  | 'home'
  | 'scan'
  | 'farms'
  | 'risk'
  | 'pest'
  | 'sensors'
  | 'map'
  | 'expert'
  | 'official'
  | 'monitoring'
  | 'cases'
  | 'assistant'
  | 'settings'
  | 'alerts';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  farms: Farm[];
  addFarm: (farm: Omit<Farm, 'id'>) => void;
  updateFarm: (id: string, farm: Partial<Farm>) => void;
  deleteFarm: (id: string) => void;
  cases: CropScanResult[];
  activeScan: CropScanResult | null;
  setActiveScan: (result: CropScanResult | null) => void;
  addCase: (scan: CropScanResult) => void;
  updateFieldConfirmation: (caseId: string, isCorrect: boolean, feedback?: string) => void;
  updateExpertCase: (caseId: string, status: CropScanResult['expertStatus'], notes?: string, referral?: CropScanResult['referralType']) => void;
  pestTraps: PestTrapRecord[];
  addPestObservation: (trapId: string, count: number, pestType: string) => void;
  sensors: SensorReading[];
  addSensorReading: (sensorId: string, reading: Partial<SensorReading>) => void;
  weather: WeatherDay[];
  hotspots: HotspotRecord[];
  alerts: AppAlert[];
  markAlertRead: (id: string) => void;
  monitoringTimeline: MonitoringEntry[];
  addMonitoringEntry: (entry: MonitoringEntry) => void;
  isCustomModelLoaded: boolean;
  setIsCustomModelLoaded: (loaded: boolean) => void;
  runJudgeScenario: (scenarioId: number) => void;
  currentScenarioNotice: string | null;
  dismissScenarioNotice: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [cases, setCases] = useState<CropScanResult[]>(INITIAL_CASES);
  const [activeScan, setActiveScan] = useState<CropScanResult | null>(INITIAL_CASES[0]);
  const [pestTraps, setPestTraps] = useState<PestTrapRecord[]>(INITIAL_PEST_TRAPS);
  const [sensors, setSensors] = useState<SensorReading[]>(INITIAL_SENSORS);
  const [weather] = useState<WeatherDay[]>(INITIAL_WEATHER_FORECAST);
  const [hotspots] = useState<HotspotRecord[]>(INITIAL_HOTSPOTS);
  const [alerts, setAlerts] = useState<AppAlert[]>(INITIAL_ALERTS);
  const [isCustomModelLoaded, setIsCustomModelLoaded] = useState<boolean>(false);
  const [currentScenarioNotice, setCurrentScenarioNotice] = useState<string | null>(null);

  // Monitoring records for follow-up
  const [monitoringTimeline, setMonitoringTimeline] = useState<MonitoringEntry[]>([
    {
      day: 1,
      date: '2026-09-11',
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?w=600&auto=format&fit=crop&q=80',
      severity: 'Moderate',
      affectedArea: 35,
      aiConfidence: 0.94,
      notes: 'Initial diagnosis: Tomato Early Blight. Pruning of bottom foliage and copper oxychloride spray applied.'
    },
    {
      day: 3,
      date: '2026-09-14',
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?w=600&auto=format&fit=crop&q=80',
      severity: 'Moderate',
      affectedArea: 27,
      aiConfidence: 0.92,
      notes: 'Lesion spread halted on upper canopy. Surrounding yellow chlorotic halos receding.'
    },
    {
      day: 7,
      date: '2026-09-17',
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?w=600&auto=format&fit=crop&q=80',
      severity: 'Low',
      affectedArea: 12,
      aiConfidence: 0.96,
      notes: 'Significant foliar recovery. Healthy new shoot growth emerged. Treatment effective.'
    }
  ]);

  const addFarm = (farmData: Omit<Farm, 'id'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: `farm-${Date.now()}`
    };
    setFarms(prev => [newFarm, ...prev]);
  };

  const updateFarm = (id: string, farmData: Partial<Farm>) => {
    setFarms(prev => prev.map(f => (f.id === id ? { ...f, ...farmData } : f)));
  };

  const deleteFarm = (id: string) => {
    setFarms(prev => prev.filter(f => f.id !== id));
  };

  const addCase = (scan: CropScanResult) => {
    setCases(prev => [scan, ...prev]);
    setActiveScan(scan);
  };

  const updateFieldConfirmation = (caseId: string, isCorrect: boolean, feedback?: string) => {
    setCases(prev =>
      prev.map(c =>
        c.id === caseId
          ? {
              ...c,
              fieldConfirmation: {
                isCorrect,
                userFeedback: feedback,
                confirmedAt: new Date().toLocaleTimeString()
              }
            }
          : c
      )
    );
    if (activeScan && activeScan.id === caseId) {
      setActiveScan({
        ...activeScan,
        fieldConfirmation: {
          isCorrect,
          userFeedback: feedback,
          confirmedAt: new Date().toLocaleTimeString()
        }
      });
    }
  };

  const updateExpertCase = (
    caseId: string,
    status: CropScanResult['expertStatus'],
    notes?: string,
    referral?: CropScanResult['referralType']
  ) => {
    setCases(prev =>
      prev.map(c =>
        c.id === caseId
          ? {
              ...c,
              expertStatus: status,
              expertNotes: notes || c.expertNotes,
              referralType: referral !== undefined ? referral : c.referralType
            }
          : c
      )
    );
  };

  const addPestObservation = (trapId: string, count: number, pestType: string) => {
    setPestTraps(prev =>
      prev.map(trap => {
        if (trap.id === trapId || trap.trapId === trapId) {
          const prevCount = trap.count;
          const change = prevCount > 0 ? Math.round(((count - prevCount) / prevCount) * 100) : 0;
          return {
            ...trap,
            count,
            previousCount: prevCount,
            percentageChange: change,
            trend: change > 5 ? 'Increasing' : change < -5 ? 'Decreasing' : 'Stable',
            riskLevel: change > 40 || count > 35 ? 'HIGH' : count > 20 ? 'MEDIUM' : 'LOW',
            date: new Date().toISOString().split('T')[0],
            history: [...trap.history, { date: 'Today', count }]
          };
        }
        return trap;
      })
    );
  };

  const addSensorReading = (sensorId: string, reading: Partial<SensorReading>) => {
    setSensors(prev =>
      prev.map(s => (s.id === sensorId ? { ...s, ...reading, lastUpdated: 'Just now' } : s))
    );
  };

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, read: true } : a)));
  };

  const addMonitoringEntry = (entry: MonitoringEntry) => {
    setMonitoringTimeline(prev => [...prev, entry]);
  };

  const dismissScenarioNotice = () => setCurrentScenarioNotice(null);

  /**
   * Judge Demo Scenarios 1..9 - Instant 1-click execution
   */
  const runJudgeScenario = (scenarioId: number) => {
    switch (scenarioId) {
      case 1:
        // Scenario 1: Healthy Crop
        setActiveScan(INITIAL_CASES[2]); // Healthy Tomato
        setActiveTab('scan');
        setCurrentScenarioNotice('Scenario 1 Loaded: Healthy Crop (Vigorous tomato leaf, 96% confidence, zero disease lesion).');
        break;

      case 2:
        // Scenario 2: High Confidence Disease (Tomato Early Blight 94% Moderate)
        setActiveScan(INITIAL_CASES[0]);
        setActiveTab('scan');
        setCurrentScenarioNotice('Scenario 2 Loaded: High Confidence Disease (Tomato Early Blight 94% Confidence, Moderate Severity 35% Area).');
        break;

      case 3:
        // Scenario 3: Low Confidence (Leaf Spot 54% -> Safety Gate & Expert Review)
        setActiveScan(INITIAL_CASES[1]);
        setActiveTab('scan');
        setCurrentScenarioNotice('Scenario 3 Loaded: Low Confidence Safety Gate (54% Confidence triggers Caution Badge & Expert Review).');
        break;

      case 4:
        // Scenario 4: High Weather Risk (Late Blight 82%)
        setActiveTab('risk');
        setCurrentScenarioNotice('Scenario 4 Loaded: High Weather Risk (82% Spore Germination Risk due to 84% humidity & persistent leaf wetness).');
        break;

      case 5:
        // Scenario 5: Pest Increase (25 -> 42, +68% High Risk)
        setActiveTab('pest');
        setCurrentScenarioNotice('Scenario 5 Loaded: Pest Vector Surge (Fall Armyworm trap jumped from 25 to 42 moths, +68% increase, HIGH risk).');
        break;

      case 6:
        // Scenario 6: Regional Hotspot (Nashik 126 affected farms)
        setActiveTab('map');
        setCurrentScenarioNotice('Scenario 6 Loaded: Regional Hotspot GIS (Nashik Cluster: 126 affected farms with Early Blight).');
        break;

      case 7:
        // Scenario 7: Follow-up Improvement (35% -> 27% -> 12%)
        setActiveTab('monitoring');
        setCurrentScenarioNotice('Scenario 7 Loaded: Longitudinal Crop Monitoring (Day 1: 35% -> Day 3: 27% -> Day 7: 12% - Improving Status).');
        break;

      case 8:
        // Scenario 8: Expert Validation (AI prediction -> Expert confirmation)
        setActiveTab('expert');
        setCurrentScenarioNotice('Scenario 8 Loaded: Agronomy Expert Validation Queue (Review pending foliar cases, validate or refer to lab).');
        break;

      case 9:
        // Scenario 9: Official Dashboard (Regional intelligence)
        setActiveTab('official');
        setCurrentScenarioNotice('Scenario 9 Loaded: Agriculture Official Intelligence Dashboard (Regional hotspots, disease distribution & alerts).');
        break;

      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        farms,
        addFarm,
        updateFarm,
        deleteFarm,
        cases,
        activeScan,
        setActiveScan,
        addCase,
        updateFieldConfirmation,
        updateExpertCase,
        pestTraps,
        addPestObservation,
        sensors,
        addSensorReading,
        weather,
        hotspots,
        alerts,
        markAlertRead,
        monitoringTimeline,
        addMonitoringEntry,
        isCustomModelLoaded,
        setIsCustomModelLoaded,
        runJudgeScenario,
        currentScenarioNotice,
        dismissScenarioNotice
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
