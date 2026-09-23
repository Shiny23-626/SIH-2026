import { Farm, CropScanResult, PestTrapRecord, SensorReading, WeatherDay, HotspotRecord, AppAlert } from '../types';

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-1',
    name: 'Green Valley Farm',
    location: 'Nashik, Maharashtra',
    areaAcres: 12.5,
    crop: 'Tomato',
    cropVariety: 'Abhinav Hybrid',
    cropStage: 'Flowering & Early Fruiting',
    plantingDate: '2026-06-15',
    healthStatus: 'Moderate Risk',
    diseaseRisk: 'High',
    pestRisk: 'Medium',
    lastScanDate: 'Today',
    fields: [
      {
        id: 'field-1a',
        name: 'Tomato Field A',
        crop: 'Tomato',
        soilType: 'Black Clay Loam',
        irrigationType: 'Drip Irrigation',
        areaAcres: 6.0,
        status: 'Needs Attention'
      },
      {
        id: 'field-1b',
        name: 'Tomato Field B',
        crop: 'Tomato',
        soilType: 'Sandy Loam',
        irrigationType: 'Drip Irrigation',
        areaAcres: 6.5,
        status: 'Healthy'
      }
    ]
  },
  {
    id: 'farm-2',
    name: 'Cauvery River Basin Farm',
    location: 'Thanjavur, Tamil Nadu',
    areaAcres: 20.0,
    crop: 'Rice',
    cropVariety: 'CR 1009 Sub-1',
    cropStage: 'Panicle Initiation',
    plantingDate: '2026-07-01',
    healthStatus: 'Good',
    diseaseRisk: 'Low',
    pestRisk: 'Low',
    lastScanDate: '2 days ago',
    fields: [
      {
        id: 'field-2a',
        name: 'Paddy Sector 1',
        crop: 'Rice',
        soilType: 'Alluvial Clay',
        irrigationType: 'Canal Flood',
        areaAcres: 10.0,
        status: 'Healthy'
      },
      {
        id: 'field-2b',
        name: 'Paddy Sector 2',
        crop: 'Rice',
        soilType: 'Alluvial Clay',
        irrigationType: 'Canal Flood',
        areaAcres: 10.0,
        status: 'Healthy'
      }
    ]
  },
  {
    id: 'farm-3',
    name: 'Malwa Ridge Farm',
    location: 'Indore, Madhya Pradesh',
    areaAcres: 15.0,
    crop: 'Maize',
    cropVariety: 'Pioneer 3302',
    cropStage: 'Vegetative V6',
    plantingDate: '2026-07-10',
    healthStatus: 'Moderate Risk',
    diseaseRisk: 'Medium',
    pestRisk: 'High',
    lastScanDate: 'Yesterday',
    fields: [
      {
        id: 'field-3a',
        name: 'Corn Field East',
        crop: 'Maize',
        soilType: 'Medium Deep Black',
        irrigationType: 'Rainfed / Sprinkler',
        areaAcres: 8.0,
        status: 'Needs Attention'
      }
    ]
  }
];

export const INITIAL_CASES: CropScanResult[] = [
  {
    id: 'CASE-2026-0891',
    timestamp: '2026-09-17 08:30 AM',
    crop: 'Tomato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    confidence: 0.94,
    confidenceLevel: 'HIGH',
    severity: 'Moderate',
    affected_area: 35,
    isHealthy: false,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?w=600&auto=format&fit=crop&q=80',
    expertReviewRequired: false,
    symptoms: [
      'Concentric dark brown rings with target-board pattern on lower leaves',
      'Chlorotic yellow halos developing around older lesions',
      'Progressive senescence and defoliation from ground upwards'
    ],
    recommendations: {
      immediate: [
        'Prune heavily infected lower leaves and safely bag for field disposal.',
        'Apply copper oxychloride (2.5 g/L) or Bacillus subtilis bio-fungicide in morning hours.',
        'Sterilize pruning shears with 70% isopropyl alcohol between crop rows.'
      ],
      prevention: [
        'Apply straw or plastic mulch to inhibit soil-splash pathogen inocula.',
        'Avoid overhead sprinkler irrigation; strictly utilize drip lines.'
      ],
      cultural: [
        'Maintain 60cm row spacing to maximize canopy ventilation.'
      ],
      biological: [
        'Inoculate Trichoderma harzianum (5g/L) around root zone.'
      ],
      chemicalGuidance: 'Follow product-label instructions and local agricultural authority guidance for Chlorothalonil or Mancozeb application.',
      monitoringSchedule: 'Upload follow-up monitoring images on Day 1, Day 3, and Day 7'
    },
    boundingBoxes: [
      { x: 24, y: 30, width: 52, height: 48, confidence: 0.94, label: 'Early Blight Lesion' }
    ],
    isDemoMode: false,
    modelSource: 'Plantora-EdgeCrop-Net v1.2 (Real Inference Pipeline)',
    fieldConfirmation: {
      isCorrect: true,
      userFeedback: 'Confirmed early blight on lower foliage. Pruning applied.',
      confirmedAt: '2026-09-17 09:15 AM'
    },
    expertStatus: 'Validated',
    assignedExpert: 'Dr. R. Venkataraman (Senior Agronomist, TNAU)'
  },
  {
    id: 'CASE-2026-0888',
    timestamp: '2026-09-16 04:12 PM',
    crop: 'Maize',
    disease: 'Maydis Leaf Blight / Leaf Spot',
    scientificName: 'Bipolaris maydis',
    confidence: 0.54, // LOW CONFIDENCE SAFETY GATE TRIGGERED
    confidenceLevel: 'LOW',
    severity: 'Moderate',
    affected_area: 18,
    isHealthy: false,
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    cautionNotice: 'Low AI confidence. Expert validation is recommended before taking significant treatment action.',
    expertReviewRequired: true,
    symptoms: [
      'Elongated tan lesions constrained between leaf veins',
      'Possible overlap with nutritional streak or early bacterial streak'
    ],
    recommendations: {
      immediate: [
        'Hold chemical spraying pending extension officer sample verification.',
        'Inspect whorl for secondary insect frass.'
      ],
      prevention: [
        'Avoid mechanical leaf bruising during weeding.'
      ],
      cultural: [
        'Check soil potassium and zinc levels.'
      ],
      biological: [
        'Foliar spray of Pseudomonas fluorescens (10g/L).'
      ],
      chemicalGuidance: 'Do not apply high-dosage systemic fungicides until verified by certified lab test.',
      monitoringSchedule: 'Case under expert review queue.'
    },
    boundingBoxes: [
      { x: 35, y: 20, width: 40, height: 60, confidence: 0.54, label: 'Uncertain Foliar Streak' }
    ],
    isDemoMode: false,
    modelSource: 'Plantora-EdgeCrop-Net (Safety Gate Activated)',
    fieldConfirmation: {
      isCorrect: null
    },
    expertStatus: 'Under Review',
    referralType: 'Agricultural Expert'
  },
  {
    id: 'CASE-2026-0882',
    timestamp: '2026-09-15 11:00 AM',
    crop: 'Tomato',
    disease: 'Healthy Crop (No Disease Detected)',
    scientificName: 'Solanum lycopersicum (Vigorous)',
    confidence: 0.96,
    confidenceLevel: 'HIGH',
    severity: 'Low',
    affected_area: 0,
    isHealthy: true,
    imageUrl: 'https://images.unsplash.com/photo-1594488518063-8a39a04a54eb?w=600&auto=format&fit=crop&q=80',
    expertReviewRequired: false,
    symptoms: [
      'Uniform chlorophyll distribution',
      'No marginal chlorosis or necrotic spotting',
      'Turgid petioles with robust photosynthetic vigor'
    ],
    recommendations: {
      immediate: [
        'No intervention needed. Continue regular drip fertigation schedule.'
      ],
      prevention: [
        'Bi-weekly prophylactic neem oil spray (3ml/L) as natural deterrent.'
      ],
      cultural: [
        'Inspect soil moisture every morning.'
      ],
      biological: [
        'Apply mycorrhizal fungi root inoculant for enhanced uptake.'
      ],
      chemicalGuidance: 'No chemical intervention required.',
      monitoringSchedule: 'Next scheduled visual inspection in 14 days.'
    },
    isDemoMode: false,
    modelSource: 'Plantora-EdgeCrop-Net v1.2',
    fieldConfirmation: {
      isCorrect: true,
      confirmedAt: '2026-09-15 11:30 AM'
    },
    expertStatus: 'Resolved'
  }
];

export const INITIAL_PEST_TRAPS: PestTrapRecord[] = [
  {
    id: 'trap-1',
    trapId: 'TRAP-NSK-104',
    location: 'Field A, Nashik',
    crop: 'Tomato',
    pestType: 'Fall Armyworm (Moth Count)',
    count: 42,
    previousCount: 25,
    percentageChange: 68,
    trend: 'Increasing',
    riskLevel: 'HIGH',
    date: '2026-09-17',
    history: [
      { date: '09/03', count: 12 },
      { date: '09/06', count: 16 },
      { date: '09/09', count: 20 },
      { date: '09/12', count: 25 },
      { date: '09/15', count: 34 },
      { date: '09/17', count: 42 }
    ]
  },
  {
    id: 'trap-2',
    trapId: 'TRAP-CBE-108',
    location: 'Block 2, Coimbatore',
    crop: 'Rice',
    pestType: 'Whitefly Population',
    count: 12,
    previousCount: 14,
    percentageChange: -14,
    trend: 'Decreasing',
    riskLevel: 'LOW',
    date: '2026-09-17',
    history: [
      { date: '09/03', count: 28 },
      { date: '09/06', count: 22 },
      { date: '09/09', count: 18 },
      { date: '09/12', count: 14 },
      { date: '09/15', count: 13 },
      { date: '09/17', count: 12 }
    ]
  },
  {
    id: 'trap-3',
    trapId: 'TRAP-BLG-201',
    location: 'East Plot, Belagavi',
    crop: 'Sugarcane',
    pestType: 'Early Shoot Borer',
    count: 22,
    previousCount: 20,
    percentageChange: 10,
    trend: 'Stable',
    riskLevel: 'MEDIUM',
    date: '2026-09-16',
    history: [
      { date: '09/03', count: 19 },
      { date: '09/06', count: 21 },
      { date: '09/09', count: 20 },
      { date: '09/12', count: 20 },
      { date: '09/15', count: 21 },
      { date: '09/16', count: 22 }
    ]
  }
];

export const INITIAL_SENSORS: SensorReading[] = [
  {
    id: 'sens-1',
    sensorId: 'NODE-CROP-01',
    name: 'Tomato Canopy Sensor Node',
    location: 'Tomato Field A (Canopy level)',
    temperatureC: 28.4,
    humidityPercent: 82,
    soilMoisturePercent: 44,
    leafWetnessHours: 5.4,
    batteryPercent: 94,
    lastUpdated: '10 mins ago',
    history: [
      { time: '06:00', temp: 21.2, humidity: 92, soil: 46 },
      { time: '08:00', temp: 24.1, humidity: 88, soil: 45 },
      { time: '10:00', temp: 27.5, humidity: 83, soil: 44 },
      { time: '12:00', temp: 29.8, humidity: 76, soil: 43 },
      { time: '14:00', temp: 31.0, humidity: 72, soil: 42 },
      { time: '16:00', temp: 28.4, humidity: 82, soil: 44 }
    ]
  },
  {
    id: 'sens-2',
    sensorId: 'NODE-PADDY-02',
    name: 'Paddy Micro-Station',
    location: 'Thanjavur Paddy Sector 1',
    temperatureC: 32.1,
    humidityPercent: 86,
    soilMoisturePercent: 91,
    leafWetnessHours: 7.2,
    batteryPercent: 88,
    lastUpdated: '5 mins ago',
    history: [
      { time: '06:00', temp: 25.0, humidity: 95, soil: 92 },
      { time: '08:00', temp: 27.6, humidity: 91, soil: 92 },
      { time: '10:00', temp: 30.2, humidity: 88, soil: 91 },
      { time: '12:00', temp: 33.5, humidity: 82, soil: 90 },
      { time: '14:00', temp: 34.1, humidity: 80, soil: 90 },
      { time: '16:00', temp: 32.1, humidity: 86, soil: 91 }
    ]
  }
];

export const INITIAL_WEATHER_FORECAST: WeatherDay[] = [
  {
    day: 'Today',
    date: 'Sep 17',
    tempMax: 31,
    tempMin: 22,
    humidity: 84,
    rainfallMm: 12.4,
    condition: 'Thunderstorms & Warm',
    diseaseRiskScore: 82,
    pestRiskScore: 65,
    riskLevel: 'HIGH',
    riskFactors: [
      'Persistent leaf wetness (>5 hours) provides optimal condition for spore germination',
      'Relative humidity consistently exceeding 80% threshold',
      'Warm temperature band (22-30°C) accelerates fungal hyphal growth',
      'Nearby crop cluster reports indicating active airborne pathogen loads'
    ]
  },
  {
    day: 'Tomorrow',
    date: 'Sep 18',
    tempMax: 30,
    tempMin: 21,
    humidity: 86,
    rainfallMm: 18.0,
    condition: 'Heavy Showers',
    diseaseRiskScore: 88,
    pestRiskScore: 60,
    riskLevel: 'HIGH',
    riskFactors: [
      'Heavy rain splash elevates soil-to-foliage pathogen transmission',
      'Continuous cloud cover suppresses UV fungal inhibition',
      'Prolonged saturation in field furrow basins'
    ]
  },
  {
    day: 'Friday',
    date: 'Sep 19',
    tempMax: 29,
    tempMin: 21,
    humidity: 79,
    rainfallMm: 6.2,
    condition: 'Scattered Rain',
    diseaseRiskScore: 74,
    pestRiskScore: 58,
    riskLevel: 'MEDIUM',
    riskFactors: [
      'Moderate humidity maintains latent fungal incubation',
      'Rainfall subsiding but foliage remains wet through mid-morning'
    ]
  },
  {
    day: 'Saturday',
    date: 'Sep 20',
    tempMax: 32,
    tempMin: 22,
    humidity: 68,
    rainfallMm: 0.0,
    condition: 'Partly Cloudy',
    diseaseRiskScore: 45,
    pestRiskScore: 72,
    riskLevel: 'MEDIUM',
    riskFactors: [
      'Drop in relative humidity slows fungal sporulation',
      'Rising afternoon temperatures stimulate pest moth oviposition'
    ]
  },
  {
    day: 'Sunday',
    date: 'Sep 21',
    tempMax: 33,
    tempMin: 23,
    humidity: 62,
    rainfallMm: 0.0,
    condition: 'Sunny & Warm',
    diseaseRiskScore: 32,
    pestRiskScore: 78,
    riskLevel: 'MEDIUM',
    riskFactors: [
      'Foliar disease risk drops to Low',
      'Pest flight activity increases during dusk'
    ]
  },
  {
    day: 'Monday',
    date: 'Sep 22',
    tempMax: 32,
    tempMin: 22,
    humidity: 65,
    rainfallMm: 1.0,
    condition: 'Mainly Fair',
    diseaseRiskScore: 35,
    pestRiskScore: 70,
    riskLevel: 'LOW',
    riskFactors: [
      'Stable agro-climatic conditions favorable for field operations'
    ]
  },
  {
    day: 'Tuesday',
    date: 'Sep 23',
    tempMax: 31,
    tempMin: 22,
    humidity: 70,
    rainfallMm: 2.5,
    condition: 'Passing Cloud',
    diseaseRiskScore: 40,
    pestRiskScore: 62,
    riskLevel: 'LOW',
    riskFactors: [
      'Standard baseline risk profile'
    ]
  }
];

export const INITIAL_HOTSPOTS: HotspotRecord[] = [
  {
    id: 'hotspot-1',
    district: 'Nashik',
    state: 'Maharashtra',
    coordinates: [19.9975, 73.7898],
    crop: 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    risk: 'High',
    affectedFarms: 126,
    lastReported: 'Today, 08:30 AM',
    trend: 'Increasing',
    openCases: 42
  },
  {
    id: 'hotspot-2',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    coordinates: [11.0168, 76.9558],
    crop: 'Rice',
    disease: 'Rice Blast (Magnaporthe oryzae)',
    risk: 'Moderate',
    affectedFarms: 48,
    lastReported: 'Yesterday',
    trend: 'Stable',
    openCases: 14
  },
  {
    id: 'hotspot-3',
    district: 'Belagavi',
    state: 'Karnataka',
    coordinates: [15.8497, 74.4977],
    crop: 'Sugarcane',
    disease: 'Red Rot (Colletotrichum falcatum)',
    risk: 'High',
    affectedFarms: 64,
    lastReported: '2 days ago',
    trend: 'Increasing',
    openCases: 21
  },
  {
    id: 'hotspot-4',
    district: 'Warangal',
    state: 'Telangana',
    coordinates: [17.9689, 79.5941],
    crop: 'Chilli',
    disease: 'Leaf Curl & Thrips Complex',
    risk: 'Moderate',
    affectedFarms: 38,
    lastReported: '3 days ago',
    trend: 'Decreasing',
    openCases: 9
  },
  {
    id: 'hotspot-5',
    district: 'Indore',
    state: 'Madhya Pradesh',
    coordinates: [22.7196, 75.8577],
    crop: 'Maize',
    disease: 'Fall Armyworm (Spodoptera frugiperda)',
    risk: 'High',
    affectedFarms: 82,
    lastReported: 'Yesterday',
    trend: 'Increasing',
    openCases: 28
  },
  {
    id: 'hotspot-6',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    coordinates: [10.7870, 79.1378],
    crop: 'Rice',
    disease: 'Brown Spot',
    risk: 'Low',
    affectedFarms: 12,
    lastReported: '5 days ago',
    trend: 'Decreasing',
    openCases: 3
  }
];

export const INITIAL_ALERTS: AppAlert[] = [
  {
    id: 'alt-1',
    title: 'High Disease Risk Warning (82%)',
    message: 'Elevated early blight germination risk in Nashik district due to continuous humidity (>84%) and warm temperatures.',
    type: 'DISEASE_RISK',
    severity: 'critical',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'alt-2',
    title: 'Pest Vector Spike: Fall Armyworm (+68%)',
    message: 'Trap TRAP-NSK-104 recorded a jump from 25 to 42 moths. Scouting whorls recommended immediately.',
    type: 'PEST_RISK',
    severity: 'critical',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'alt-3',
    title: 'Expert Validation Completed',
    message: 'Dr. Venkataraman validated CASE-2026-0891 (Tomato Early Blight). Contextual prescription generated.',
    type: 'EXPERT_UPDATE',
    severity: 'info',
    timestamp: '3 hours ago',
    read: true,
    caseId: 'CASE-2026-0891'
  },
  {
    id: 'alt-4',
    title: 'Follow-Up Monitoring Due (Day 3)',
    message: 'Please upload Day 3 progress photo for Tomato Field A to evaluate treatment response.',
    type: 'MONITORING',
    severity: 'warning',
    timestamp: 'Yesterday',
    read: false,
    caseId: 'CASE-2026-0891'
  }
];
