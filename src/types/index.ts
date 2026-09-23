/**
 * Plantora AI - Domain Types and Interfaces
 */

export type UserRole = 'FARMER' | 'EXPERT' | 'OFFICIAL';

export type AppLanguage = 'en' | 'ta' | 'hi' | 'mr' | 'te' | 'kn';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  preferredLanguage: AppLanguage;
  farmLocation?: string;
  isDemoUser: boolean;
  createdAt: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  areaAcres: number;
  crop: string;
  cropVariety: string;
  cropStage: string;
  plantingDate: string;
  healthStatus: 'Good' | 'Moderate Risk' | 'High Risk';
  diseaseRisk: 'Low' | 'Medium' | 'High';
  pestRisk: 'Low' | 'Medium' | 'High';
  lastScanDate: string;
  fields: FarmField[];
}

export interface FarmField {
  id: string;
  name: string;
  crop: string;
  soilType: string;
  irrigationType: string;
  areaAcres: number;
  status: 'Healthy' | 'Needs Attention' | 'Infected';
}

export interface CropScanResult {
  id: string;
  timestamp: string;
  crop: string;
  disease: string;
  scientificName: string;
  confidence: number;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  severity: 'Low' | 'Moderate' | 'High';
  affected_area: number; // percentage
  isHealthy: boolean;
  imageUrl: string;
  cautionNotice?: string;
  expertReviewRequired: boolean;
  symptoms: string[];
  recommendations: {
    immediate: string[];
    prevention: string[];
    cultural: string[];
    biological: string[];
    chemicalGuidance: string;
    monitoringSchedule: string;
  };
  boundingBoxes?: Array<{ x: number; y: number; width: number; height: number; confidence: number; label: string }>;
  isDemoMode: boolean;
  modelSource: string;
  fieldConfirmation?: {
    isCorrect: boolean | null; // null = pending, true = yes, false = no
    userFeedback?: string;
    confirmedAt?: string;
  };
  expertStatus?: 'New' | 'Under Review' | 'Validated' | 'Rejected' | 'Lab Verification' | 'Resolved';
  expertNotes?: string;
  assignedExpert?: string;
  referralType?: 'Agricultural Expert' | 'Extension Officer' | 'Laboratory' | null;
}

export interface MonitoringEntry {
  day: number;
  date: string;
  imageUrl: string;
  severity: 'Low' | 'Moderate' | 'High';
  affectedArea: number; // percentage
  aiConfidence: number;
  notes: string;
}

export interface PestTrapRecord {
  id: string;
  trapId: string;
  location: string;
  crop: string;
  pestType: string;
  count: number;
  previousCount: number;
  percentageChange: number;
  trend: 'Increasing' | 'Decreasing' | 'Stable';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  date: string;
  history: Array<{ date: string; count: number }>;
}

export interface SensorReading {
  id: string;
  sensorId: string;
  name: string;
  location: string;
  temperatureC: number;
  humidityPercent: number;
  soilMoisturePercent: number;
  leafWetnessHours: number;
  batteryPercent: number;
  lastUpdated: string;
  history: Array<{ time: string; temp: number; humidity: number; soil: number }>;
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainfallMm: number;
  condition: string;
  diseaseRiskScore: number; // 0-100
  pestRiskScore: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskFactors: string[];
}

export interface HotspotRecord {
  id: string;
  district: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  crop: string;
  disease: string;
  risk: 'Low' | 'Moderate' | 'High';
  affectedFarms: number;
  lastReported: string;
  trend: 'Increasing' | 'Decreasing' | 'Stable';
  openCases: number;
}

export interface AppAlert {
  id: string;
  title: string;
  message: string;
  type: 'DISEASE_RISK' | 'PEST_RISK' | 'WEATHER' | 'HOTSPOT' | 'EXPERT_UPDATE' | 'MONITORING';
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  read: boolean;
  caseId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  language: AppLanguage;
  audioAvailable?: boolean;
}
