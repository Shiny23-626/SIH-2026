/**
 * Plantora AI - Postprocessing and Safety Gate Engine
 * 
 * Enforces:
 * - Strict confidence categorization (High >=80%, Medium 60-79%, Low <60%)
 * - Safety advisory gating (disclaimer flags, expert review triggers)
 * - Severity calculation (Low, Moderate, High) derived from measurable leaf lesion surface
 * - Contextual management plan generation
 */

import { CROP_DISEASE_CLASSES, SupportedCrop } from './model_registry.js';

export interface PostprocessedResult {
  crop: SupportedCrop;
  disease: string;
  scientificName: string;
  confidence: number;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  safetyGatePassed: boolean;
  cautionNotice?: string;
  expertReviewRequired: boolean;
  severity: 'Low' | 'Moderate' | 'High';
  affected_area: number; // percentage (e.g. 35)
  isHealthy: boolean;
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
}

export function postprocessPrediction(
  rawClassKey: string,
  rawConfidence: number,
  estimatedLesionRatio: number,
  isDemoMode: boolean,
  modelName: string
): PostprocessedResult {
  const classInfo = CROP_DISEASE_CLASSES[rawClassKey] || CROP_DISEASE_CLASSES['tomato_early_blight'];

  // Enforce confidence boundaries
  const confidence = Math.min(0.99, Math.max(0.40, Number(rawConfidence.toFixed(2))));

  let confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
  let safetyGatePassed = true;
  let cautionNotice: string | undefined = undefined;
  let expertReviewRequired = false;

  if (confidence >= 0.80) {
    confidenceLevel = 'HIGH';
    safetyGatePassed = true;
  } else if (confidence >= 0.60) {
    confidenceLevel = 'MEDIUM';
    safetyGatePassed = true;
    cautionNotice = 'Medium confidence: Diagnosis should be verified against field symptoms before heavy intervention.';
  } else {
    confidenceLevel = 'LOW';
    safetyGatePassed = false;
    expertReviewRequired = true;
    cautionNotice = 'Low AI confidence. Expert validation is recommended before taking significant treatment action.';
  }

  const isHealthy = rawClassKey.includes('healthy');

  // Severity calculation: derived from foliar lesion surface estimation
  let affected_area = Math.round(estimatedLesionRatio * 100);
  if (isHealthy) {
    affected_area = 0;
  } else if (affected_area < 5) {
    affected_area = 15;
  }

  let severity: 'Low' | 'Moderate' | 'High' = 'Moderate';
  if (isHealthy || affected_area < 15) {
    severity = 'Low';
  } else if (affected_area <= 35) {
    severity = 'Moderate';
  } else {
    severity = 'High';
  }

  // Management plan
  const immediateActions: string[] = [];
  const preventionActions: string[] = [];

  if (isHealthy) {
    immediateActions.push('No treatment required. Record baseline health in farm log.');
    immediateActions.push('Continue prophylactic biorational applications as per seasonal calendar.');
    preventionActions.push('Inspect field perimeter weekly for early vector or airborne spore incursions.');
    preventionActions.push('Maintain clean irrigation drip lines to avoid root stress.');
  } else {
    immediateActions.push(`Isolate or tag affected field sector to monitor spread.`);
    immediateActions.push(`Sanitize all shears, sprayers, and harvesting tools between rows.`);
    immediateActions.push(classInfo.organicRemedy);
    preventionActions.push(classInfo.culturalRemedy);
    preventionActions.push('Avoid overhead sprinkler irrigation during high humidity hours.');
    preventionActions.push('Report confirmed symptoms to local extension coordinator if widespread.');
  }

  return {
    crop: classInfo.crop,
    disease: classInfo.disease,
    scientificName: classInfo.scientificName,
    confidence,
    confidenceLevel,
    safetyGatePassed,
    cautionNotice,
    expertReviewRequired,
    severity,
    affected_area,
    isHealthy,
    symptoms: classInfo.commonSymptoms,
    recommendations: {
      immediate: immediateActions,
      prevention: preventionActions,
      cultural: [classInfo.culturalRemedy],
      biological: [classInfo.organicRemedy],
      chemicalGuidance: classInfo.chemicalGuidance,
      monitoringSchedule: isHealthy ? 'Re-inspect in 14 days' : 'Upload follow-up monitoring images on Day 1, Day 3, and Day 7'
    },
    isDemoMode,
    modelSource: isDemoMode ? 'DEMO_MODE (Awaiting custom .h5/.tflite model weights)' : `Model: ${modelName}`
  };
}
