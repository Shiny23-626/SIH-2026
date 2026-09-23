/**
 * Plantora AI - Global Translation Matrix
 * Languages: English (en), Tamil (ta), Hindi (hi), Marathi (mr), Telugu (te), Kannada (kn)
 */

export interface TranslationDictionary {
  // Brand & Header
  brandName: string;
  tagline: string;
  developedBy: string;
  selectLanguage: string;
  roleFarmer: string;
  roleExpert: string;
  roleOfficial: string;
  demoAccount: string;
  signOut: string;

  // Nav items
  navHome: string;
  navScan: string;
  navFarms: string;
  navRisk: string;
  navPest: string;
  navSensors: string;
  navMap: string;
  navExpert: string;
  navOfficial: string;
  navMonitoring: string;
  navCases: string;
  navAssistant: string;
  navSettings: string;
  navAlerts: string;

  // Home Page
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  btnStartScanning: string;
  btnExplorePlatform: string;
  btnLaunchDemo: string;
  homePillarAiTitle: string;
  homePillarAiDesc: string;
  homePillarRiskTitle: string;
  homePillarRiskDesc: string;
  homePillarAdvisoryTitle: string;
  homePillarAdvisoryDesc: string;
  homePillarMonitoringTitle: string;
  homePillarMonitoringDesc: string;

  // Scanner
  scanPageTitle: string;
  scanPageSubtitle: string;
  dropImageHere: string;
  orBrowseFile: string;
  useCamera: string;
  closeCamera: string;
  capturePhoto: string;
  selectCrop: string;
  selectField: string;
  btnAnalyzeCrop: string;
  statusCheckingImage: string;
  statusPreparingImage: string;
  statusAnalyzingCrop: string;
  statusGeneratingResult: string;
  errorUnclearImage: string;

  // Results & Safety Gate
  resultTitle: string;
  cropLabel: string;
  diseaseLabel: string;
  confidenceLabel: string;
  severityLabel: string;
  affectedAreaLabel: string;
  highConfidence: string;
  mediumConfidence: string;
  lowConfidenceNotice: string;
  cautionNoticeBadge: string;
  requestExpertReview: string;
  requestLabVerification: string;
  uploadAnotherImage: string;
  btnStartMonitoring: string;

  // Management Plan
  managementPlanTitle: string;
  immediateActions: string;
  preventiveMeasures: string;
  culturalPractices: string;
  organicBiological: string;
  chemicalGuidance: string;
  chemicalDisclaimer: string;

  // Field Confirmation
  fieldConfirmationPrompt: string;
  btnYes: string;
  btnNo: string;
  btnNotSure: string;
  feedbackQuestion: string;
  feedbackPlaceholder: string;
  submitFeedback: string;
  confirmationRecorded: string;

  // Assistant & Voice
  assistantTitle: string;
  assistantSubtitle: string;
  chatPlaceholder: string;
  btnSpeak: string;
  btnListen: string;
  btnStop: string;
  voiceUnavailableNotice: string;
  assistantDisclaimer: string;

  // Risk & Weather
  riskForecastTitle: string;
  riskForecastSubtitle: string;
  weatherRiskScore: string;
  pestRiskScore: string;
  riskEngineExplainer: string;
  riskFactorsTitle: string;
  sevenDayForecast: string;
  riskPrototypeNotice: string;

  // Pest & Sensors
  pestIntelligenceTitle: string;
  addTrapRecord: string;
  currentCount: string;
  previousCount: string;
  percentChange: string;
  trendLabel: string;
  fieldSensorsTitle: string;
  soilMoisture: string;
  leafWetness: string;
  temperature: string;
  humidity: string;

  // Map & GIS
  cropHealthMapTitle: string;
  hotspotsTitle: string;
  affectedFarmsLabel: string;
  openCasesLabel: string;
  filterByCrop: string;
  filterByRisk: string;

  // Expert & Official
  expertReviewTitle: string;
  pendingCasesCount: string;
  btnValidate: string;
  btnReject: string;
  btnReferLab: string;
  officialDashboardTitle: string;
  regionalHotspots: string;
  monitoredFarms: string;
  activeAlerts: string;

  // Common
  loading: string;
  statusHealthy: string;
  statusModerate: string;
  statusHigh: string;
  statusLow: string;
  viewDetails: string;
  demoModeBadge: string;
  realModelBadge: string;
}

export const translations: Record<string, TranslationDictionary> = {
  en: {
    brandName: 'PLANTORA AI',
    tagline: 'Intelligent Crop Health. Early Detection. Better Decisions.',
    developedBy: 'Developed by Amsapriya',
    selectLanguage: 'Language',
    roleFarmer: 'Farmer',
    roleExpert: 'Agronomy Expert',
    roleOfficial: 'Agriculture Official',
    demoAccount: 'Demo Account',
    signOut: 'Sign Out',

    navHome: 'Home',
    navScan: 'Scan Crop',
    navFarms: 'My Farms',
    navRisk: 'Risk Forecast',
    navPest: 'Pest Intelligence',
    navSensors: 'Field Sensors',
    navMap: 'Crop Health Map',
    navExpert: 'Expert Review',
    navOfficial: 'Official Dashboard',
    navMonitoring: 'Crop Monitoring',
    navCases: 'My Cases',
    navAssistant: 'AI Assistant',
    navSettings: 'Settings',
    navAlerts: 'Alerts',

    homeHeroTitle: 'Intelligent Crop Health Intelligence',
    homeHeroSubtitle: 'Early foliar disease detection, localized micro-climate risk forecasting, and agronomic advisory for sustainable yields.',
    btnStartScanning: 'Start Scanning',
    btnExplorePlatform: 'Explore Plantora AI',
    btnLaunchDemo: 'Launch Judge Demo',
    homePillarAiTitle: 'AI Foliar Diagnostics',
    homePillarAiDesc: 'Multispectral computer vision and deep learning inference with safety-gated confidence scores.',
    homePillarRiskTitle: 'Micro-Climate Risk Engine',
    homePillarRiskDesc: '7-day meteorological disease and pest propagation risk forecasting down to field level.',
    homePillarAdvisoryTitle: 'Multilingual Agronomy Bot',
    homePillarAdvisoryDesc: 'Conversational voice and text guidance in 6 regional languages adhering to safe agronomic practices.',
    homePillarMonitoringTitle: 'Follow-Up Disease Tracking',
    homePillarMonitoringDesc: 'Longitudinal lesion recovery tracking from Day 1 to Day 7 to verify treatment efficacy.',

    scanPageTitle: 'Crop Health Scanner',
    scanPageSubtitle: 'Upload or capture a leaf photo for real-time foliar disease detection and severity assessment.',
    dropImageHere: 'Drag & drop crop image here',
    orBrowseFile: 'or click to browse from device',
    useCamera: 'Use Device Camera',
    closeCamera: 'Close Camera',
    capturePhoto: 'Capture Photo',
    selectCrop: 'Select Crop',
    selectField: 'Select Field (Optional)',
    btnAnalyzeCrop: 'Analyze Crop Health',
    statusCheckingImage: 'Checking image quality...',
    statusPreparingImage: 'Preparing image tensor...',
    statusAnalyzingCrop: 'Analyzing crop foliar features...',
    statusGeneratingResult: 'Generating diagnostic report...',
    errorUnclearImage: 'Please upload a clearer crop image.',

    resultTitle: 'Diagnostic Assessment Report',
    cropLabel: 'Crop',
    diseaseLabel: 'Identified Condition',
    confidenceLabel: 'Model Confidence',
    severityLabel: 'Severity Level',
    affectedAreaLabel: 'Affected Foliar Area',
    highConfidence: 'High Confidence Diagnosis',
    mediumConfidence: 'Medium Confidence (Field Verification Advised)',
    lowConfidenceNotice: 'Low AI confidence. Expert validation is recommended before taking significant treatment action.',
    cautionNoticeBadge: 'Safety Gate Notice',
    requestExpertReview: 'Request Expert Review',
    requestLabVerification: 'Request Laboratory Verification',
    uploadAnotherImage: 'Upload Another Image',
    btnStartMonitoring: 'Add to Follow-Up Monitoring',

    managementPlanTitle: 'Contextual Agronomic Management Plan',
    immediateActions: 'Immediate Actions',
    preventiveMeasures: 'Preventive Measures',
    culturalPractices: 'Cultural Practices',
    organicBiological: 'Biological & Organic Options',
    chemicalGuidance: 'Chemical Management Guidance',
    chemicalDisclaimer: 'Follow product-label instructions and local agricultural authority guidance.',

    fieldConfirmationPrompt: 'Was the AI prediction correct?',
    btnYes: 'Yes, Correct',
    btnNo: 'No, Incorrect',
    btnNotSure: 'Not Sure',
    feedbackQuestion: 'What was the actual observed problem in the field?',
    feedbackPlaceholder: 'e.g. Nutrient deficiency, insect feeding, different rust...',
    submitFeedback: 'Submit Field Confirmation',
    confirmationRecorded: 'Field confirmation recorded for continuous model improvement.',

    assistantTitle: 'Plantora AI Assistant',
    assistantSubtitle: 'Conversational agricultural advisory powered by Gemini with multilingual voice input and output.',
    chatPlaceholder: 'Ask about crop symptoms, weather protection, or organic management...',
    btnSpeak: 'Speak',
    btnListen: 'Listen',
    btnStop: 'Stop Voice',
    voiceUnavailableNotice: 'Voice input is unavailable in this browser. You can use text input.',
    assistantDisclaimer: 'Plantora AI advisory provides agronomic guidance. Always follow local authority recommendations and official label specifications.',

    riskForecastTitle: 'Weather & Micro-Climate Risk Forecast',
    riskForecastSubtitle: '7-day predictive epidemiological model combining humidity, rainfall, and thermal indices.',
    weatherRiskScore: 'Disease Spore Germination Risk',
    pestRiskScore: 'Pest Vector Pressure',
    riskEngineExplainer: 'Why is the risk elevated?',
    riskFactorsTitle: 'Contributing Risk Factors',
    sevenDayForecast: '7-Day Meteorological Outlook',
    riskPrototypeNotice: 'Risk forecast generated using prototype risk logic.',

    pestIntelligenceTitle: 'Pest Intelligence & Trap Surveillance',
    addTrapRecord: 'Log Trap Observation',
    currentCount: 'Current Trap Count',
    previousCount: 'Previous Count',
    percentChange: 'Bi-Weekly Change',
    trendLabel: 'Population Trend',
    fieldSensorsTitle: 'Field IoT Sensor Telemetry',
    soilMoisture: 'Soil Moisture',
    leafWetness: 'Leaf Wetness Duration',
    temperature: 'Ambient Temperature',
    humidity: 'Relative Humidity',

    cropHealthMapTitle: 'Regional Crop Health Hotspot GIS Map',
    hotspotsTitle: 'Active Epidemiological Hotspots',
    affectedFarmsLabel: 'Affected Farms',
    openCasesLabel: 'Open Cases',
    filterByCrop: 'Filter by Crop',
    filterByRisk: 'Filter by Risk Level',

    expertReviewTitle: 'Agronomy Expert Validation Queue',
    pendingCasesCount: 'Pending Review Cases',
    btnValidate: 'Validate Diagnosis',
    btnReject: 'Flag Correction',
    btnReferLab: 'Refer to Agronomy Lab',
    officialDashboardTitle: 'Agricultural Authority Intelligence Dashboard',
    regionalHotspots: 'Regional Hotspots',
    monitoredFarms: 'Total Monitored Farms',
    activeAlerts: 'Active Field Alerts',

    loading: 'Loading...',
    statusHealthy: 'Healthy',
    statusModerate: 'Moderate',
    statusHigh: 'High Risk',
    statusLow: 'Low Risk',
    viewDetails: 'View Details',
    demoModeBadge: 'DEMO MODE',
    realModelBadge: 'CUSTOM MODEL CONNECTED'
  },

  ta: {
    brandName: 'PLANTORA AI',
    tagline: 'நுண்ணறிவு பயிர் நலம். ஆரம்பகால கண்டறிதல். சிறந்த முடிவுகள்.',
    developedBy: 'Developed by Amsapriya',
    selectLanguage: 'மொழி',
    roleFarmer: 'விவசாயி',
    roleExpert: 'வேளாண் நிபுணர்',
    roleOfficial: 'வேளாண் அதிகாரி',
    demoAccount: 'டெமோ கணக்கு',
    signOut: 'வெளியேறு',

    navHome: 'முகப்பு',
    navScan: 'பயிர் ஸ்கேன்',
    navFarms: 'என் பண்ணைகள்',
    navRisk: 'ஆபத்து முன்னறிவிப்பு',
    navPest: 'பூச்சி நுண்ணறிவு',
    navSensors: 'வயல் சென்சார்கள்',
    navMap: 'பயிர் வரைபடம்',
    navExpert: 'நிபுணர் சரிபார்ப்பு',
    navOfficial: 'அதிகாரப்பூர்வ தகவல்',
    navMonitoring: 'பயிர் கண்காணிப்பு',
    navCases: 'வழக்கு வரலாறு',
    navAssistant: 'AI உதவியாளர்',
    navSettings: 'அமைப்புகள்',
    navAlerts: 'எச்சரிக்கைகள்',

    homeHeroTitle: 'நுண்ணறிவு பயிர் சுகாதார தளம்',
    homeHeroSubtitle: 'ஆரம்பகால இலை நோய் கண்டறிதல், உள்ளூர் தட்பவெப்பநிலை முன்னறிவிப்பு மற்றும் நிலையான மகசூலுக்கான வேளாண் ஆலோசனைகள்.',
    btnStartScanning: 'ஸ்கேன் செய்யத் தொடங்குங்கள்',
    btnExplorePlatform: 'Plantora AI ஆராய்க',
    btnLaunchDemo: 'டெமோவை துவக்கு',
    homePillarAiTitle: 'AI இலை நோய் கண்டறிதல்',
    homePillarAiDesc: 'பாதுகாப்பான நம்பகத்தன்மை மதிப்பெண்களுடன் கூடிய ஆழமான கணினி பார்வை.',
    homePillarRiskTitle: 'வானிலை ஆபத்து கணிப்பு',
    homePillarRiskDesc: 'வயல் மட்டத்தில் 7-நாள் நோய் மற்றும் பூச்சி பெருக்கம் குறித்த முன்னறிவிப்பு.',
    homePillarAdvisoryTitle: 'பன்மொழி வேளாண் போட்',
    homePillarAdvisoryDesc: 'பாதுகாப்பான வேளாண் நடைமுறைகளுடன் கூடிய குரல் மற்றும் உரை வழிகாட்டுதல்.',
    homePillarMonitoringTitle: 'தொடர் நோய் கண்காணிப்பு',
    homePillarMonitoringDesc: 'சிகிச்சையின் பலனை சரிபார்க்க நாள் 1 முதல் நாள் 7 வரை தொடர் கண்காணிப்பு.',

    scanPageTitle: 'பயிர் ஆரோக்கிய ஸ்கேனர்',
    scanPageSubtitle: 'நேரலை இலை நோய் கண்டறிதலுக்கு இலையின் புகைப்படத்தை பதிவேற்றவும் அல்லது எடுக்கவும்.',
    dropImageHere: 'பயிர் படத்தை இங்கே இழுத்துப் போடவும்',
    orBrowseFile: 'அல்லது சாதனத்திலிருந்து தேர்வு செய்யவும்',
    useCamera: 'கேமராவைப் பயன்படுத்தவும்',
    closeCamera: 'கேமராவை மூடு',
    capturePhoto: 'படம் எடு',
    selectCrop: 'பயிரைத் தேர்ந்தெடுக்கவும்',
    selectField: 'வயலைத் தேர்ந்தெடுக்கவும் (விருப்பம்)',
    btnAnalyzeCrop: 'பயிரை பகுப்பாய்வு செய்',
    statusCheckingImage: 'படத்தின் தரத்தை சரிபார்க்கிறது...',
    statusPreparingImage: 'படத்தை தயார் செய்கிறது...',
    statusAnalyzingCrop: 'பயிர் இலை அம்சங்களை ஆய்வு செய்கிறது...',
    statusGeneratingResult: 'நோய் அறிக்கையை உருவாக்குகிறது...',
    errorUnclearImage: 'தெளிவான பயிர் படத்தை பதிவேற்றவும்.',

    resultTitle: 'பயிர் நோய் கண்டறிதல் அறிக்கை',
    cropLabel: 'பயிர்',
    diseaseLabel: 'கண்டறியப்பட்ட நோய்',
    confidenceLabel: 'AI நம்பகத்தன்மை',
    severityLabel: 'தீவிரத்தன்மை அளவு',
    affectedAreaLabel: 'பாதிக்கப்பட்ட இலை பரப்பு',
    highConfidence: 'உயர் நம்பகத்தன்மை கணிப்பு',
    mediumConfidence: 'நடுத்தர நம்பகத்தன்மை (வயல் சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது)',
    lowConfidenceNotice: 'குறைந்த AI நம்பகத்தன்மை. தீவிர சிகிச்சை நடவடிக்கைக்கு முன் நிபுணர் சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது.',
    cautionNoticeBadge: 'பாதுகாப்பு அறிவிப்பு',
    requestExpertReview: 'நிபுணர் மறுஆய்வைக் கோரவும்',
    requestLabVerification: 'ஆய்வக சரிபார்ப்பைக் கோரவும்',
    uploadAnotherImage: 'மற்றொரு படத்தை பதிவேற்றவும்',
    btnStartMonitoring: 'தொடர் கண்காணிப்பில் சேர்க்கவும்',

    managementPlanTitle: 'பரிந்துரைக்கப்பட்ட வேளாண் மேலாண்மை திட்டம்',
    immediateActions: 'உடனடி நடவடிக்கைகள்',
    preventiveMeasures: 'தடுப்பு முறைகள்',
    culturalPractices: 'உழவியல் முறைகள்',
    organicBiological: 'இயற்கை / உயிரியல் தீர்வுகள்',
    chemicalGuidance: 'வேதியியல் மேலாண்மை வழிகாட்டுதல்',
    chemicalDisclaimer: 'தயாரிப்பு லேபிள் வழிமுறைகளையும் உள்ளூர் வேளாண் அதிகாரி வழிகாட்டுதலையும் பின்பற்றவும்.',

    fieldConfirmationPrompt: 'AI கணிப்பு சரியானதா?',
    btnYes: 'ஆம், சரி',
    btnNo: 'இல்லை, தவறு',
    btnNotSure: 'உறுதியாக தெரியவில்லை',
    feedbackQuestion: 'வயலில் உண்மையில் காணப்பட்ட பிரச்சனை என்ன?',
    feedbackPlaceholder: 'எ.கா. ஊட்டச்சத்து குறைபாடு, பூச்சி தாக்குதல்...',
    submitFeedback: 'உறுதிப்படுத்தலைச் சமர்ப்பிக்கவும்',
    confirmationRecorded: 'தொடர் மாதிரி பயிற்சிக்காக பதிவு செய்யப்பட்டது.',

    assistantTitle: 'Plantora AI உதவியாளர்',
    assistantSubtitle: 'Gemini மூலம் இயக்கப்படும் பன்மொழி குரல் மற்றும் உரை வேளாண் உதவியாளர்.',
    chatPlaceholder: 'பயிர் அறிகுறிகள் அல்லது இயற்கை பராமரிப்பு பற்றி கேளுங்கள்...',
    btnSpeak: 'பேசுங்கள்',
    btnListen: 'கேளுங்கள்',
    btnStop: 'நிறுத்து',
    voiceUnavailableNotice: 'இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை. நீங்கள் தட்டச்சு செய்யலாம்.',
    assistantDisclaimer: 'Plantora AI வேளாண் வழிகாட்டுதலை வழங்குகிறது. எப்போதும் அதிகாரப்பூர்வ அறிவுறுத்தல்களைப் பின்பற்றவும்.',

    riskForecastTitle: 'வானிலை மற்றும் மைக்ரோ-காலநிலை ஆபத்து',
    riskForecastSubtitle: 'ஈரப்பதம் மற்றும் மழையை அடிப்படையாகக் கொண்ட 7-நாள் முன்னறிவிப்பு மாதிரி.',
    weatherRiskScore: 'பூஞ்சை வித்து பரவும் ஆபத்து',
    pestRiskScore: 'பூச்சி தாக்குதல் அழுத்தம்',
    riskEngineExplainer: 'ஆபத்து அதிகமாக இருப்பதற்கான காரணம் என்ன?',
    riskFactorsTitle: 'காரணிகள்',
    sevenDayForecast: '7-நாள் வானிலை கண்ணோட்டம்',
    riskPrototypeNotice: 'ப்ரோட்டோடைப் அடிப்படையில் உருவாக்கப்பட்ட ஆபத்து முன்னறிவிப்பு.',

    pestIntelligenceTitle: 'பூச்சி நுண்ணறிவு மற்றும் பொறி கண்காணிப்பு',
    addTrapRecord: 'பொறி எண்ணிக்கையை பதிவு செய்',
    currentCount: 'தற்போதைய எண்ணிக்கை',
    previousCount: 'முந்தைய எண்ணிக்கை',
    percentChange: 'மாற்றம்',
    trendLabel: 'போக்கு',
    fieldSensorsTitle: 'வயல் IoT சென்சார் தரவு',
    soilMoisture: 'மண் ஈரப்பதம்',
    leafWetness: 'இலை ஈரப்பதம் காலம்',
    temperature: 'வெப்பநிலை',
    humidity: 'ஒப்பீட்டு ஈரப்பதம்',

    cropHealthMapTitle: 'பிராந்திய பயிர் சுகாதார GIS வரைபடம்',
    hotspotsTitle: 'தீவிர பரவல் பகுதிகள்',
    affectedFarmsLabel: 'பாதிக்கப்பட்ட பண்ணைகள்',
    openCasesLabel: 'நிலுவையில் உள்ள வழக்குகள்',
    filterByCrop: 'பயிர் வாரியாக வடிகட்டு',
    filterByRisk: 'ஆபத்து வாரியாக வடிகட்டு',

    expertReviewTitle: 'வேளாண் நிபுணர் சரிபார்ப்பு வரிசை',
    pendingCasesCount: 'நிலுவையில் உள்ள வழக்குகள்',
    btnValidate: 'கணிப்பை உறுதி செய்',
    btnReject: 'திருத்தத்தை குறிக்கவும்',
    btnReferLab: 'ஆய்வகத்திற்கு பரிந்துரைக்கவும்',
    officialDashboardTitle: 'வேளாண் துறை உளவுத்துறை டாஷ்போர்டு',
    regionalHotspots: 'பிராந்திய மையங்கள்',
    monitoredFarms: 'கண்காணிக்கப்படும் பண்ணைகள்',
    activeAlerts: 'செயலில் உள்ள எச்சரிக்கைகள்',

    loading: 'ஏற்றுகிறது...',
    statusHealthy: 'ஆரோக்கியமானது',
    statusModerate: 'மிதமான ஆபத்து',
    statusHigh: 'அதிக ஆபத்து',
    statusLow: 'குறைந்த ஆபத்து',
    viewDetails: 'விவரங்களை காண்க',
    demoModeBadge: 'டெமோ பயன்முறை',
    realModelBadge: 'தனிப்பயன் மாதிரி இணைக்கப்பட்டது'
  },

  hi: {
    brandName: 'PLANTORA AI',
    tagline: 'बुद्धिमान फसल स्वास्थ्य। शीघ्र पहचान। बेहतर निर्णय।',
    developedBy: 'Developed by Amsapriya',
    selectLanguage: 'भाषा',
    roleFarmer: 'किसान',
    roleExpert: 'कृषि विशेषज्ञ',
    roleOfficial: 'कृषि अधिकारी',
    demoAccount: 'डेमो खाता',
    signOut: 'साइन आउट',

    navHome: 'होम',
    navScan: 'फसल स्कैन करें',
    navFarms: 'मेरे खेत',
    navRisk: 'जोखिम पूर्वानुमान',
    navPest: 'कीट निगरानी',
    navSensors: 'खेत सेंसर',
    navMap: 'फसल स्वास्थ्य मानचित्र',
    navExpert: 'विशेषज्ञ समीक्षा',
    navOfficial: 'अधिकारी डैशबोर्ड',
    navMonitoring: 'फसल निगरानी',
    navCases: 'केस इतिहास',
    navAssistant: 'AI सहायक',
    navSettings: 'सेटिंग्स',
    navAlerts: 'अलर्ट',

    homeHeroTitle: 'बुद्धिमान फसल स्वास्थ्य मंच',
    homeHeroSubtitle: 'पत्तियों के रोगों की समय पर पहचान, मौसम आधारित जोखिम पूर्वानुमान और टिकाऊ पैदावार के लिए वैज्ञानिक सलाह।',
    btnStartScanning: 'स्कैन शुरू करें',
    btnExplorePlatform: 'Plantora AI देखें',
    btnLaunchDemo: 'जज डेमो चलाएं',
    homePillarAiTitle: 'AI रोग पहचान',
    homePillarAiDesc: 'सुरक्षा मानकों और विश्वास स्कोर के साथ उन्नत कंप्यूटर विज़न तकनीक।',
    homePillarRiskTitle: 'सूक्ष्म जलवायु जोखिम इंजन',
    homePillarRiskDesc: 'खेत स्तर पर रोग और कीट प्रसार का 7-दिवसीय वैज्ञानिक पूर्वानुमान।',
    homePillarAdvisoryTitle: 'बहुभाषी कृषि बॉट',
    homePillarAdvisoryDesc: 'प्रामाणिक कृषि नियमों के अनुसार आवाज और टेक्स्ट में 6 क्षेत्रीय भाषाओं में मार्गदर्शन।',
    homePillarMonitoringTitle: 'रोग सुधार निगरानी',
    homePillarMonitoringDesc: 'उपचार की प्रभावशीलता जांचने के लिए दिन 1 से दिन 7 तक निरंतर ट्रैकिंग।',

    scanPageTitle: 'फसल स्वास्थ्य स्कैनर',
    scanPageSubtitle: 'रियल-टाइम पत्ती रोग पहचान और गंभीरता मूल्यांकन के लिए पत्ती की फोटो अपलोड करें या खींचें।',
    dropImageHere: 'फसल की तस्वीर यहाँ खींचकर डालें',
    orBrowseFile: 'या डिवाइस से चुनें',
    useCamera: 'कैमरा उपयोग करें',
    closeCamera: 'कैमरा बंद करें',
    capturePhoto: 'फोटो लें',
    selectCrop: 'फसल चुनें',
    selectField: 'खेत चुनें (वैकल्पिक)',
    btnAnalyzeCrop: 'फसल का विश्लेषण करें',
    statusCheckingImage: 'छवि की गुणवत्ता जांची जा रही है...',
    statusPreparingImage: 'छवि तैयार हो रही है...',
    statusAnalyzingCrop: 'फसल के लक्षणों का विश्लेषण जारी है...',
    statusGeneratingResult: 'रोग रिपोर्ट तैयार की जा रही है...',
    errorUnclearImage: 'कृपया स्पष्ट फसल की तस्वीर अपलोड करें।',

    resultTitle: 'निदान मूल्यांकन रिपोर्ट',
    cropLabel: 'फसल',
    diseaseLabel: 'पहचाना गया रोग',
    confidenceLabel: 'AI विश्वसनीयता',
    severityLabel: 'गंभीरता स्तर',
    affectedAreaLabel: 'प्रभावित पत्ती क्षेत्र',
    highConfidence: 'उच्च विश्वसनीयता निदान',
    mediumConfidence: 'मध्यम विश्वसनीयता (खेत सत्यापन की सलाह)',
    lowConfidenceNotice: 'कम AI विश्वसनीयता। किसी भी बड़े रासायनिक उपचार से पहले विशेषज्ञ सत्यापन की सिफारिश की जाती है।',
    cautionNoticeBadge: 'सुरक्षा सूचना',
    requestExpertReview: 'विशेषज्ञ समीक्षा का अनुरोध करें',
    requestLabVerification: 'प्रयोगशाला परीक्षण का अनुरोध करें',
    uploadAnotherImage: 'दूसरी तस्वीर अपलोड करें',
    btnStartMonitoring: 'निगरानी में जोड़ें',

    managementPlanTitle: 'कृषि प्रबंधन कार्ययोजना',
    immediateActions: 'तत्काल कदम',
    preventiveMeasures: 'रोकथाम के उपाय',
    culturalPractices: 'कृषि पद्धतियाँ',
    organicBiological: 'जैविक एवं प्राकृतिक विकल्प',
    chemicalGuidance: 'रासायनिक प्रबंधन मार्गदर्शन',
    chemicalDisclaimer: 'उत्पाद लेबल निर्देशों और स्थानीय कृषि प्राधिकारी के मार्गदर्शन का पालन करें।',

    fieldConfirmationPrompt: 'क्या AI का अनुमान सही था?',
    btnYes: 'हाँ, सही है',
    btnNo: 'नहीं, गलत है',
    btnNotSure: 'निश्चित नहीं',
    feedbackQuestion: 'खेत में वास्तव में क्या समस्या देखी गई?',
    feedbackPlaceholder: 'उदा. पोषक तत्व की कमी, कीटों का प्रकोप...',
    submitFeedback: 'पुष्टि सबमिट करें',
    confirmationRecorded: 'भविष्य के मॉडल सुधार के लिए दर्ज किया गया।',

    assistantTitle: 'Plantora AI सहायक',
    assistantSubtitle: 'Gemini द्वारा संचालित बहुभाषी आवाज और टेक्स्ट कृषि सलाहकार।',
    chatPlaceholder: 'फसल के लक्षणों, मौसम सुरक्षा या जैविक खाद के बारे में पूछें...',
    btnSpeak: 'बोलें',
    btnListen: 'सुनें',
    btnStop: 'रोकें',
    voiceUnavailableNotice: 'इस ब्राउज़र में वॉयस इनपुट उपलब्ध नहीं है। आप टाइप कर सकते हैं।',
    assistantDisclaimer: 'Plantora AI कृषि मार्गदर्शन प्रदान करता है। आधिकारिक लेबल विनिर्देशों का पालन करें।',

    riskForecastTitle: 'मौसम एवं सूक्ष्म जलवायु जोखिम पूर्वानुमान',
    riskForecastSubtitle: 'आर्द्रता, तापमान और वर्षा पर आधारित 7-दिवसीय पूर्वानुमान।',
    weatherRiskScore: 'फंगल बीजाणु अंकुरण जोखिम',
    pestRiskScore: 'कीट दबाव',
    riskEngineExplainer: 'जोखिम अधिक क्यों है?',
    riskFactorsTitle: 'प्रमुख कारक',
    sevenDayForecast: '7-दिवसीय मौसम आउटलुक',
    riskPrototypeNotice: 'प्रोटोटाइप जोखिम तर्क का उपयोग करके उत्पन्न पूर्वानुमान।',

    pestIntelligenceTitle: 'कीट निगरानी एवं ट्रैप डेटा',
    addTrapRecord: 'ट्रैप गिनती दर्ज करें',
    currentCount: 'वर्तमान गिनती',
    previousCount: 'पिछली गिनती',
    percentChange: 'प्रतिशत बदलाव',
    trendLabel: 'प्रवृत्ति',
    fieldSensorsTitle: 'खेत IoT सेंसर टेलीमेट्री',
    soilMoisture: 'मिट्टी की नमी',
    leafWetness: 'पत्ती गीलापन समय',
    temperature: 'तापमान',
    humidity: 'सापेक्ष आर्द्रता',

    cropHealthMapTitle: 'क्षेत्रीय फसल स्वास्थ्य GIS मानचित्र',
    hotspotsTitle: 'सक्रिय जोखिम क्षेत्र',
    affectedFarmsLabel: 'प्रभावित खेत',
    openCasesLabel: 'लंबित मामले',
    filterByCrop: 'फसल के अनुसार छाँटें',
    filterByRisk: 'जोखिम के अनुसार छाँटें',

    expertReviewTitle: 'कृषि विशेषज्ञ सत्यापन कतार',
    pendingCasesCount: 'समीक्षा हेतु लंबित मामले',
    btnValidate: 'निदान मान्य करें',
    btnReject: 'सुधार दर्ज करें',
    btnReferLab: 'लैब को रेफर करें',
    officialDashboardTitle: 'कृषि विभाग खुफिया डैशबोर्ड',
    regionalHotspots: 'क्षेत्रीय हॉटस्पॉट',
    monitoredFarms: 'कुल निगरानी वाले खेत',
    activeAlerts: 'सक्रिय अलर्ट',

    loading: 'लोड हो रहा है...',
    statusHealthy: 'स्वस्थ',
    statusModerate: 'मध्यम जोखिम',
    statusHigh: 'उच्च जोखिम',
    statusLow: 'कम जोखिम',
    viewDetails: 'विवरण देखें',
    demoModeBadge: 'डेमो मोड',
    realModelBadge: 'कस्टम मॉडल कनेक्टेड'
  },

  mr: {
    brandName: 'PLANTORA AI',
    tagline: 'बुद्धिमान पीक आरोग्य. लवकर निदान. चांगले निर्णय.',
    developedBy: 'Developed by Amsapriya',
    selectLanguage: 'भाषा',
    roleFarmer: 'शेतकरी',
    roleExpert: 'कृषी तज्ज्ञ',
    roleOfficial: 'कृषी अधिकारी',
    demoAccount: 'डेमो खाते',
    signOut: 'बाहेर पडा',

    navHome: 'मुख्यपृष्ठ',
    navScan: 'पीक स्कॅन करा',
    navFarms: 'माझी शेती',
    navRisk: 'धोका अंदाज',
    navPest: 'कीड माहिती',
    navSensors: 'शेत सेन्सर्स',
    navMap: 'आरोग्य नकाशा',
    navExpert: 'तज्ज्ञ पुनरावलोकन',
    navOfficial: 'अधिकारी डॅशबोर्ड',
    navMonitoring: 'पीक निरीक्षण',
    navCases: 'केस इतिहास',
    navAssistant: 'AI सहाय्यक',
    navSettings: 'सेटिंग्ज',
    navAlerts: 'सूचना',

    homeHeroTitle: 'बुद्धिमान पीक आरोग्य व्यासपीठ',
    homeHeroSubtitle: 'पानावरील रोगांचे वेळेवर निदान, हवामान आधारित धोका अंदाज आणि शाश्वत उत्पादनासाठी मार्गदर्शन.',
    btnStartScanning: 'स्कॅनिंग सुरू करा',
    btnExplorePlatform: 'Plantora AI एक्सप्लोर करा',
    btnLaunchDemo: 'जज डेमो सुरू करा',
    homePillarAiTitle: 'AI रोग ओळख',
    homePillarAiDesc: 'अचूक आणि सुरक्षित विश्वासार्हतेसह प्रगत संगणक दृष्टी.',
    homePillarRiskTitle: 'सूक्ष्म हवामान धोका इंजिन',
    homePillarRiskDesc: 'शेत स्तरावर रोग आणि कीड प्रसाराचा 7 दिवसांचा अंदाज.',
    homePillarAdvisoryTitle: 'बहुभाषिक कृषी बॉट',
    homePillarAdvisoryDesc: 'सुरक्षित शेती पद्धतींनुसार आवाज आणि मजकुरात 6 प्रादेशिक भाषांमध्ये मार्गदर्शन.',
    homePillarMonitoringTitle: 'रोग सुधारणा निरीक्षण',
    homePillarMonitoringDesc: 'उपचाराचा परिणाम तपासण्यासाठी दिवस 1 ते दिवस 7 पर्यंत सातत्यपूर्ण ट्रॅकिंग.',

    scanPageTitle: 'पीक आरोग्य स्कॅनर',
    scanPageSubtitle: 'पानावरील रोग शोधण्यासाठी पानाचा फोटो अपलोड करा किंवा काढा.',
    dropImageHere: 'येथे पिकाचा फोटो टाका',
    orBrowseFile: 'किंवा डिव्हाइसमधून निवडा',
    useCamera: 'कॅमेरा वापरा',
    closeCamera: 'कॅमेरा बंद करा',
    capturePhoto: 'फोटो काढा',
    selectCrop: 'पीक निवडा',
    selectField: 'शेत निवडा (पर्यायी)',
    btnAnalyzeCrop: 'पिकाचे विश्लेषण करा',
    statusCheckingImage: 'फोटोची गुणवत्ता तपासत आहे...',
    statusPreparingImage: 'फोटो तयार करत आहे...',
    statusAnalyzingCrop: 'रोगाचे विश्लेषण सुरू आहे...',
    statusGeneratingResult: 'अहवाल तयार करत आहे...',
    errorUnclearImage: 'कृपया स्पष्ट पिकाचा फोटो अपलोड करा.',

    resultTitle: 'रोग निदान मूल्यांकन अहवाल',
    cropLabel: 'पीक',
    diseaseLabel: 'आढळलेला रोग',
    confidenceLabel: 'AI अचूकता',
    severityLabel: 'तीव्रता पातळी',
    affectedAreaLabel: 'बाधित पानांचे क्षेत्र',
    highConfidence: 'उच्च अचूकता निदान',
    mediumConfidence: 'मध्यम अचूकता (शेत पडताळणीचा सल्ला)',
    lowConfidenceNotice: 'कमी AI अचूकता. कोणतेही मोठे उपचार करण्यापूर्वी कृषी तज्ज्ञांचा सल्ला घ्यावा.',
    cautionNoticeBadge: 'सुरक्षा सूचना',
    requestExpertReview: 'तज्ज्ञ पुनरावलोकनाची विनंती करा',
    requestLabVerification: 'प्रयोगशाळा तपासणीची विनंती करा',
    uploadAnotherImage: 'दुसरा फोटो अपलोड करा',
    btnStartMonitoring: 'निरीक्षणात जोडा',

    managementPlanTitle: 'कृषी व्यवस्थापन कृती आराखडा',
    immediateActions: 'तातडीची पावले',
    preventiveMeasures: 'प्रतिबंधात्मक उपाय',
    culturalPractices: 'मशागतीचे उपाय',
    organicBiological: 'सेंद्रिय आणि जैविक पर्याय',
    chemicalGuidance: 'रासायनिक व्यवस्थापन मार्गदर्शन',
    chemicalDisclaimer: 'उत्पादन लेबलवरील सूचना आणि स्थानिक कृषी अधिकाऱ्यांच्या मार्गदर्शनाचे पालन करा.',

    fieldConfirmationPrompt: 'AI चा अंदाज अचूक होता का?',
    btnYes: 'होय, बरोबर',
    btnNo: 'नाही, चुकीचे',
    btnNotSure: 'नक्की माहिती नाही',
    feedbackQuestion: 'शेतात प्रत्यक्षात कोणती समस्या आढळली?',
    feedbackPlaceholder: 'उदा. अन्नद्रव्यांची कमतरता, कीड प्रादुर्भाव...',
    submitFeedback: 'पुष्टी पाठवा',
    confirmationRecorded: 'मॉडेलच्या भविष्यातील सुधारणेसाठी नोंदवले गेले.',

    assistantTitle: 'Plantora AI सहाय्यक',
    assistantSubtitle: 'Gemini द्वारे समर्थित बहुभाषिक आवाज आणि मजकूर कृषी सल्लागार.',
    chatPlaceholder: 'पिकाच्या लक्षणांबद्दल किंवा सेंद्रिय उपायांबद्दल विचारा...',
    btnSpeak: 'बोला',
    btnListen: 'ऐका',
    btnStop: 'थांबवा',
    voiceUnavailableNotice: 'या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही. आपण टाइप करू शकता.',
    assistantDisclaimer: 'Plantora AI कृषी मार्गदर्शन प्रदान करते. अधिकृत लेबल विनिर्देशांचे पालन करा.',

    riskForecastTitle: 'हवामान आणि सूक्ष्म वातावरण धोका अंदाज',
    riskForecastSubtitle: 'आर्द्रता आणि पावसावर आधारित 7 दिवसांचा अंदाज.',
    weatherRiskScore: 'बुरशीजन्य बीजाणू अंकुरण धोका',
    pestRiskScore: 'कीड प्रादुर्भाव दबाव',
    riskEngineExplainer: 'धोका का वाढला आहे?',
    riskFactorsTitle: 'महत्त्वाचे घटक',
    sevenDayForecast: '7 दिवसांचा हवामान अंदाज',
    riskPrototypeNotice: 'प्रोटोटाइप लॉजिक वापरून तयार केलेला अंदाज.',

    pestIntelligenceTitle: 'कीड माहिती आणि ट्रॅप डेटा',
    addTrapRecord: 'ट्रॅप नोंद करा',
    currentCount: 'सध्याची संख्या',
    previousCount: 'मागील संख्या',
    percentChange: 'टक्केवारी बदल',
    trendLabel: 'कल',
    fieldSensorsTitle: 'शेत IoT सेन्सर डेटा',
    soilMoisture: 'मातीतील ओलावा',
    leafWetness: 'पानावरील ओलावा वेळ',
    temperature: 'तापमान',
    humidity: 'सापेक्ष आर्द्रता',

    cropHealthMapTitle: 'प्रादेशिक पीक आरोग्य GIS नकाशा',
    hotspotsTitle: 'सक्रिय प्रादुर्भाव क्षेत्र',
    affectedFarmsLabel: 'बाधित शेतं',
    openCasesLabel: 'प्रलंबित प्रकरणे',
    filterByCrop: 'पिकानुसार फिल्टर',
    filterByRisk: 'धोक्याच्या पातळीनुसार फिल्टर',

    expertReviewTitle: 'कृषी तज्ज्ञ पडताळणी रांग',
    pendingCasesCount: 'प्रलंबित प्रकरणे',
    btnValidate: 'निदान मंजूर करा',
    btnReject: 'दुरुस्ती नोंदवा',
    btnReferLab: 'प्रयोगशाळेकडे पाठवा',
    officialDashboardTitle: 'कृषी विभाग माहिती डॅशबोर्ड',
    regionalHotspots: 'प्रादेशिक हॉटस्पॉट',
    monitoredFarms: 'एकूण निरीक्षण शेती',
    activeAlerts: 'सक्रिय सूचना',

    loading: 'लोड होत आहे...',
    statusHealthy: 'निरोगी',
    statusModerate: 'मध्यम धोका',
    statusHigh: 'उच्च धोका',
    statusLow: 'कमी धोका',
    viewDetails: 'तपशील पहा',
    demoModeBadge: 'डेमो मोड',
    realModelBadge: 'कस्टम मॉडेल जोडले आहे'
  },

  te: {
    brandName: 'PLANTORA AI',
    tagline: 'తెలివైన పంట ఆరోగ్యం. ముందస్తు గుర్తింపు. మెరుగైన నిర్ణయాలు.',
    developedBy: 'Developed by Amsapriya',
    selectLanguage: 'భాష',
    roleFarmer: 'రైతు',
    roleExpert: 'వ్యవసాయ నిపుణుడు',
    roleOfficial: 'వ్యవసాయ అధికారి',
    demoAccount: 'డెమో ఖాతా',
    signOut: 'లాగ్ అవుట్',

    navHome: 'హోమ్',
    navScan: 'పంట స్కాన్',
    navFarms: 'నా పొలాలు',
    navRisk: 'ముప్పు అంచనా',
    navPest: 'పురుగుల సమాచారం',
    navSensors: 'పొలం సెన్సార్లు',
    navMap: 'పంట మ్యాప్',
    navExpert: 'నిపుణుల సమీక్ష',
    navOfficial: 'అధికారిక డ్యాష్‌బోర్డ్',
    navMonitoring: 'పంట పర్యవేక్షణ',
    navCases: 'కేసుల చరిత్ర',
    navAssistant: 'AI సహాయకుడు',
    navSettings: 'సెట్టింగ్‌లు',
    navAlerts: 'హెచ్చరికలు',

    homeHeroTitle: 'తెలివైన పంట ఆరోగ్య వేదిక',
    homeHeroSubtitle: 'ఆకు తెగుళ్ళ ముందస్తు గుర్తింపు, వాతావరణ ముప్పు అంచనా మరియు స్థిరమైన దిగుబడులకు శాస్త్రీయ సలహాలు.',
    btnStartScanning: 'స్కానింగ్ ప్రారంభించండి',
    btnExplorePlatform: 'Plantora AI ని అన్వేషించండి',
    btnLaunchDemo: 'జడ్జి డెమో ప్రారంభించు',
    homePillarAiTitle: 'AI తెగుళ్ళ గుర్తింపు',
    homePillarAiDesc: 'భద్రతా ప్రమాణాలతో కూడిన కంప్యూటర్ విజన్ మరియు డీప్ లెర్నింగ్ విశ్లేషణ.',
    homePillarRiskTitle: 'సూక్ష్మ వాతావరణ ముప్పు ఇంజిన్',
    homePillarRiskDesc: 'క్షేత్ర స్థాయిలో 7 రోజుల తెగుళ్ళు మరియు పురుగుల వ్యాప్తి ముందస్తు అంచనా.',
    homePillarAdvisoryTitle: 'బహుభాషా వ్యవసాయ బాట్',
    homePillarAdvisoryDesc: 'సురక్షిత వ్యవసాయ పద్ధతులతో కూడిన వాయిస్ మరియు టెక్స్ట్ ద్వారా 6 భాషల్లో సలహాలు.',
    homePillarMonitoringTitle: 'పంట రికవరీ ట్రాకింగ్',
    homePillarMonitoringDesc: 'చికిత్స ప్రభావాన్ని ధృవీకరించడానికి 1వ రోజు నుండి 7వ రోజు వరకు ట్రాకింగ్.',

    scanPageTitle: 'పంట ఆరోగ్య స్కానర్',
    scanPageSubtitle: 'రియల్ టైమ్ ఆకు తెగుళ్ళను గుర్తించడానికి ఆకు ఫోటోను అప్‌లోడ్ చేయండి లేదా తీయండి.',
    dropImageHere: 'పంట చిత్రాన్ని ఇక్కడ లాగి వేయండి',
    orBrowseFile: 'లేదా పరికరం నుండి ఎంచుకోండి',
    useCamera: 'కెమెరాను ఉపయోగించండి',
    closeCamera: 'కెమెరాను మూసివేయి',
    capturePhoto: 'ఫోటో తీయండి',
    selectCrop: 'పంటను ఎంచుకోండి',
    selectField: 'పొలాన్ని ఎంచుకోండి (ఐచ్ఛికం)',
    btnAnalyzeCrop: 'పంటను విశ్లేషించండి',
    statusCheckingImage: 'చిత్ర నాణ్యతను తనిఖీ చేస్తోంది...',
    statusPreparingImage: 'చిత్రాన్ని సిద్ధం చేస్తోంది...',
    statusAnalyzingCrop: 'తెగుళ్ళను విశ్లేషిస్తోంది...',
    statusGeneratingResult: 'నివేదికను రూపొందిస్తోంది...',
    errorUnclearImage: 'దయచేసి స్పష్టమైన పంట చిత్రాన్ని అప్‌లోడ్ చేయండి.',

    resultTitle: 'పంట రోగ నిర్ధారణ నివేదిక',
    cropLabel: 'పంట',
    diseaseLabel: 'గుర్తించబడిన తెగులు',
    confidenceLabel: 'AI ఖచ్చితత్వం',
    severityLabel: 'తీవ్రత స్థాయి',
    affectedAreaLabel: 'బాధిత ఆకు విస్తీర్ణం',
    highConfidence: 'అధిక ఖచ్చితత్వ నిర్ధారణ',
    mediumConfidence: 'మధ్యస్థ ఖచ్చితత్వం (క్షేత్ర స్థాయి ధృవీకరణ సిఫార్సు చేయబడింది)',
    lowConfidenceNotice: 'తక్కువ AI ఖచ్చితత్వం. పెద్ద చికిత్స చర్య తీసుకునే ముందు నిపుణుల ధృవీకరణ అవసరం.',
    cautionNoticeBadge: 'భద్రతా నోటీసు',
    requestExpertReview: 'నిపుణుల సమీక్షను అభ్యర్థించండి',
    requestLabVerification: 'ల్యాబ్ ధృవీకరణను అభ్యర్థించండి',
    uploadAnotherImage: 'మరొక చిత్రాన్ని అప్‌లోడ్ చేయండి',
    btnStartMonitoring: 'పర్యవేక్షణకు జోడించండి',

    managementPlanTitle: 'వ్యవసాయ నిర్వహణ ప్రణాళిక',
    immediateActions: 'తక్షణ చర్యలు',
    preventiveMeasures: 'నివారణ చర్యలు',
    culturalPractices: 'సాగు పద్ధతులు',
    organicBiological: 'సేంద్రీయ మరియు జీవ పరిష్కారాలు',
    chemicalGuidance: 'రసాయన నిర్వహణ మార్గదర్శకాలు',
    chemicalDisclaimer: 'ఉత్పత్తి లేబుల్ సూచనలు మరియు స్థానిక వ్యవసాయ అధికారి మార్గదర్శకాలను పాటించండి.',

    fieldConfirmationPrompt: 'AI అంచనా సరైనదేనా?',
    btnYes: 'అవును, సరైనది',
    btnNo: 'కాదు, తప్పు',
    btnNotSure: 'ఖచ్చితంగా తెలియదు',
    feedbackQuestion: 'క్షేత్రంలో వాస్తవంగా గమనించిన సమస్య ఏమిటి?',
    feedbackPlaceholder: 'ఉదా. పోషకాల లోపం, పురుగుల దాడి...',
    submitFeedback: 'నిర్ధారణను సమర్పించండి',
    confirmationRecorded: 'భవిష్యత్ మెరుగుదల కోసం నమోదు చేయబడింది.',

    assistantTitle: 'Plantora AI సహాయకుడు',
    assistantSubtitle: 'Gemini ఆధారిత బహుభాషా వాయిస్ మరియు టెక్స్ట్ వ్యవసాయ సహాయకుడు.',
    chatPlaceholder: 'పంట లక్షణాలు లేదా సేంద్రీయ సంరక్షణ గురించి అడగండి...',
    btnSpeak: 'మాట్లాడండి',
    btnListen: 'వినండి',
    btnStop: 'ఆపండి',
    voiceUnavailableNotice: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. మీరు టైప్ చేయవచ్చు.',
    assistantDisclaimer: 'Plantora AI వ్యవసాయ మార్గదర్శకత్వాన్ని అందిస్తుంది. అధికారిక లేబుల్ సూచనలను పాటించండి.',

    riskForecastTitle: 'వాతావరణ మరియు సూక్ష్మ వాతావరణ ముప్పు అంచనా',
    riskForecastSubtitle: 'తేమ మరియు వర్షపాతం ఆధారంగా 7 రోజుల అంచనా.',
    weatherRiskScore: 'శిలీంధ్ర బీజాంశాల మొలక ముప్పు',
    pestRiskScore: 'పురుగుల ఒత్తిడి',
    riskEngineExplainer: 'ముప్పు ఎందుకు పెరిగింది?',
    riskFactorsTitle: 'ముఖ్య కారణాలు',
    sevenDayForecast: '7 రోజుల వాతావరణ సమాచారం',
    riskPrototypeNotice: 'ప్రోటోటైప్ లాజిక్ ఉపయోగించి రూపొందించిన అంచనా.',

    pestIntelligenceTitle: 'పురుగుల నిఘా మరియు ట్రాప్ డేటా',
    addTrapRecord: 'ట్రాప్ కౌంట్ నమోదు చేయండి',
    currentCount: 'ప్రస్తుత కౌంట్',
    previousCount: 'మునుపటి కౌంట్',
    percentChange: 'మార్పు శాతం',
    trendLabel: 'ధోరణి',
    fieldSensorsTitle: 'పొలం IoT సెన్సార్ డేటా',
    soilMoisture: 'నేలలో తేమ',
    leafWetness: 'ఆకు తడి సమయం',
    temperature: 'ఉష్ణోగ్రత',
    humidity: 'సాపేక్ష తేమ',

    cropHealthMapTitle: 'ప్రాంతీయ పంట ఆరోగ్య GIS మ్యాప్',
    hotspotsTitle: 'తీవ్ర వ్యాప్తి ప్రాంతాలు',
    affectedFarmsLabel: 'బాధిత పొలాలు',
    openCasesLabel: 'పెండింగ్ కేసులు',
    filterByCrop: 'పంటల వారీగా ఫిల్టర్',
    filterByRisk: 'ముప్పు స్థాయి ప్రకారం ఫిల్టర్',

    expertReviewTitle: 'వ్యవసాయ నిపుణుల సమీక్ష క్యూ',
    pendingCasesCount: 'పెండింగ్ కేసులు',
    btnValidate: 'నిర్ధారణను ఆమోదించు',
    btnReject: 'సవరణను గుర్తించండి',
    btnReferLab: 'ల్యాబ్‌కు సిఫార్సు చేయండి',
    officialDashboardTitle: 'వ్యవసాయ శాఖ సమాచార డ్యాష్‌బోర్డ్',
    regionalHotspots: 'ప్రాంతీయ హాట్‌స్పాట్‌లు',
    monitoredFarms: 'పర్యవేక్షించబడుతున్న పొలాలు',
    activeAlerts: 'క్రియాశీల హెచ్చరికలు',

    loading: 'లోడ్ అవుతోంది...',
    statusHealthy: 'ఆరోగ్యకరమైనది',
    statusModerate: 'మధ్యస్థ ముప్పు',
    statusHigh: 'అధిక ముప్పు',
    statusLow: 'తక్కువ ముప్పు',
    viewDetails: 'వివరాలు చూడండి',
    demoModeBadge: 'డెమో మోడ్',
    realModelBadge: 'కస్టమ్ మోడల్ కనెక్ట్ చేయబడింది'
  },

  kn: {
    brandName: 'PLANTORA AI',
    tagline: 'ಬುದ್ಧಿವಂತ ಬೆಳೆ ಆರೋಗ್ಯ. ಆರಂಭಿಕ ಪತ್ತೆ. ಉತ್ತಮ ನಿರ್ಧಾರಗಳು.',
    developedBy: 'Developed by Amsapriya',
    selectLanguage: 'ಭಾಷೆ',
    roleFarmer: 'ರೈತ',
    roleExpert: 'ಕೃಷಿ ತಜ್ಞ',
    roleOfficial: 'ಕೃಷಿ ಅಧಿಕಾರಿ',
    demoAccount: 'ಡೆಮೊ ಖಾತೆ',
    signOut: 'ಸೈನ್ ಔಟ್',

    navHome: 'ಮುಖಪುಟ',
    navScan: 'ಬೆಳೆ ಸ್ಕ್ಯಾನ್',
    navFarms: 'ನನ್ನ ಜಮೀನುಗಳು',
    navRisk: 'ಅಪಾಯ ಮುನ್ಸೂಚನೆ',
    navPest: 'ಕೀಟ ಮಾಹಿತಿ',
    navSensors: 'ಕ್ಷೇತ್ರ ಸೆನ್ಸಾರ್‌ಗಳು',
    navMap: 'ಬೆಳೆ ನಕ್ಷೆ',
    navExpert: 'ತಜ್ಞರ ಪರಿಶೀಲನೆ',
    navOfficial: 'ಅಧಿಕಾರಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navMonitoring: 'ಬೆಳೆ ಮೇಲ್ವಿಚಾರಣೆ',
    navCases: 'ಪ್ರಕರಣಗಳ ಇತಿಹಾಸ',
    navAssistant: 'AI ಸಹಾಯಕ',
    navSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    navAlerts: 'ಎಚ್ಚರಿಕೆಗಳು',

    homeHeroTitle: 'ಬುದ್ಧಿವಂತ ಬೆಳೆ ಆರೋಗ್ಯ ವೇದಿಕೆ',
    homeHeroSubtitle: 'ಎಲೆ ರೋಗಗಳ ಆರಂಭಿಕ ಪತ್ತೆ, ಹವಾಮಾನ ಆಧಾರಿತ ಅಪಾಯ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಸುಸ್ಥಿರ ಇಳುವರಿಗಾಗಿ ಕೃಷಿ ಸಲಹೆಗಳು.',
    btnStartScanning: 'ಸ್ಕ್ಯಾನಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    btnExplorePlatform: 'Plantora AI ಅನ್ವೇಷಿಸಿ',
    btnLaunchDemo: 'ಜಡ್ಜ್ ಡೆಮೊ ಪ್ರಾರಂಭಿಸಿ',
    homePillarAiTitle: 'AI ರೋಗ ಪತ್ತೆ',
    homePillarAiDesc: 'ಸುರಕ್ಷತಾ ಮಾನದಂಡಗಳೊಂದಿಗೆ ಸುಧಾರಿತ ಕಂಪ್ಯೂಟರ್ ದೃಷ್ಟಿ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಕೋರ್‌ಗಳು.',
    homePillarRiskTitle: 'ಸೂಕ್ಷ್ಮ ಹವಾಮಾನ ಅಪಾಯ ಎಂಜಿನ್',
    homePillarRiskDesc: 'ಕ್ಷೇತ್ರ ಮಟ್ಟದಲ್ಲಿ 7 ದಿನಗಳ ರೋಗ ಮತ್ತು ಕೀಟ ಹರಡುವಿಕೆಯ ಮುನ್ಸೂಚನೆ.',
    homePillarAdvisoryTitle: 'ಬಹುಭಾಷಾ ಕೃಷಿ ಬಾಟ್',
    homePillarAdvisoryDesc: 'ಸುರಕ್ಷಿತ ಕೃಷಿ ಪದ್ಧತಿಗಳೊಂದಿಗೆ ಧ್ವನಿ ಮತ್ತು ಪಠ್ಯದಲ್ಲಿ 6 ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ.',
    homePillarMonitoringTitle: 'ರೋಗ ಸುಧಾರಣೆ ಮೇಲ್ವಿಚಾರಣೆ',
    homePillarMonitoringDesc: 'ಚಿಕಿತ್ಸೆಯ ಫಲಿತಾಂಶ ಪರೀಕ್ಷಿಸಲು ದಿನ 1 ರಿಂದ ದಿನ 7 ರವರೆಗೆ ನಿರಂತರ ಟ್ರ್ಯಾಕಿಂಗ್.',

    scanPageTitle: 'ಬೆಳೆ ಆರೋಗ್ಯ ಸ್ಕ್ಯಾನರ್',
    scanPageSubtitle: 'ನೈಜ-ಸಮಯದ ಎಲೆ ರೋಗ ಪತ್ತೆಗೆ ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ತೆಗೆಯಿರಿ.',
    dropImageHere: 'ಬೆಳೆ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ',
    orBrowseFile: 'ಅಥವಾ ಸಾಧನದಿಂದ ಆಯ್ಕೆಮಾಡಿ',
    useCamera: 'ಕ್ಯಾಮೆರಾ ಬಳಸಿ',
    closeCamera: 'ಕ್ಯಾಮೆರಾ ಮುಚ್ಚಿ',
    capturePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
    selectCrop: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ',
    selectField: 'ಜಮೀನು ಆಯ್ಕೆಮಾಡಿ (ಐಚ್ಛಿಕ)',
    btnAnalyzeCrop: 'ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    statusCheckingImage: 'ಚಿತ್ರದ ಗುಣಮಟ್ಟ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    statusPreparingImage: 'ಚಿತ್ರವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    statusAnalyzingCrop: 'ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    statusGeneratingResult: 'ವರದಿ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    errorUnclearImage: 'ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟ ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',

    resultTitle: 'ರೋಗ ಪತ್ತೆ ಮೌಲ್ಯಮಾಪನ ವರದಿ',
    cropLabel: 'ಬೆಳೆ',
    diseaseLabel: 'ಗುರುತಿಸಲಾದ ರೋಗ',
    confidenceLabel: 'AI ನಿಖರತೆ',
    severityLabel: 'ತೀವ್ರತೆಯ ಮಟ್ಟ',
    affectedAreaLabel: 'ಬಾಧಿತ ಎಲೆ ವಿಸ್ತೀರ್ಣ',
    highConfidence: 'ಹೆಚ್ಚಿನ ನಿಖರತೆಯ ರೋಗನಿರ್ಣಯ',
    mediumConfidence: 'ಮಧ್ಯಮ ನಿಖರತೆ (ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ)',
    lowConfidenceNotice: 'ಕಡಿಮೆ AI ನಿಖರತೆ. ಯಾವುದೇ ಪ್ರಮುಖ ಚಿಕಿತ್ಸೆ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ತಜ್ಞರ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.',
    cautionNoticeBadge: 'ಸುರಕ್ಷತಾ ಸೂಚನೆ',
    requestExpertReview: 'ತಜ್ಞರ ಪರಿಶೀಲನೆ ವಿನಂತಿಸಿ',
    requestLabVerification: 'ಪ್ರಯೋಗಾಲಯ ಪರೀಕ್ಷೆ ವಿನಂತಿಸಿ',
    uploadAnotherImage: 'ಮತ್ತೊಂದು ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    btnStartMonitoring: 'ಮೇಲ್ವಿಚಾರಣೆಗೆ ಸೇರಿಸಿ',

    managementPlanTitle: 'ಕೃಷಿ ನಿರ್ವಹಣಾ ಕ್ರಿಯಾ ಯೋಜನೆ',
    immediateActions: 'ತಕ್ಷಣದ ಕ್ರಮಗಳು',
    preventiveMeasures: 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು',
    culturalPractices: 'ಬೇಸಾಯ ಪದ್ಧತಿಗಳು',
    organicBiological: 'ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ಪರಿಹಾರಗಳು',
    chemicalGuidance: 'ರಾಸಾಯನಿಕ ನಿರ್ವಹಣೆ ಮಾರ್ಗದರ್ಶನ',
    chemicalDisclaimer: 'ಉತ್ಪನ್ನ ಲೇಬಲ್ ಸೂಚನೆಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ಪ್ರಾಧಿಕಾರದ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಾಲಿಸಿ.',

    fieldConfirmationPrompt: 'AI ಊಹೆ ಸರಿಯಾಗಿದೆಯೇ?',
    btnYes: 'ಹೌದು, ಸರಿ',
    btnNo: 'ಇಲ್ಲ, ತಪ್ಪು',
    btnNotSure: 'ಖಚಿತವಿಲ್ಲ',
    feedbackQuestion: 'ಜಮೀನಿನಲ್ಲಿ ವಾಸ್ತವವಾಗಿ ಕಂಡುಬಂದ ಸಮಸ್ಯೆ ಏನು?',
    feedbackPlaceholder: 'ಉದಾ. ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ, ಕೀಟಗಳ ದಾಳಿ...',
    submitFeedback: 'ದೃಢೀಕರಣ ಸಲ್ಲಿಸಿ',
    confirmationRecorded: 'ಭವಿಷ್ಯದ ಮಾದರಿ ಸುಧಾರಣೆಗಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ.',

    assistantTitle: 'Plantora AI ಸಹಾಯಕ',
    assistantSubtitle: 'Gemini ಚಾಲಿತ ಬಹುಭಾಷಾ ಧ್ವನಿ ಮತ್ತು ಪಠ್ಯ ಕೃಷಿ ಸಲಹೆಗಾರ.',
    chatPlaceholder: 'ಬೆಳೆ ಲಕ್ಷಣಗಳು ಅಥವಾ ಸಾವಯವ ಆರೈಕೆ ಬಗ್ಗೆ ಕೇಳಿ...',
    btnSpeak: 'ಮಾತನಾಡಿ',
    btnListen: 'ಕೇಳಿ',
    btnStop: 'ನಿಲ್ಲಿಸಿ',
    voiceUnavailableNotice: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. ನೀವು ಟೈಪ್ ಮಾಡಬಹುದು.',
    assistantDisclaimer: 'Plantora AI ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಅಧಿಕೃತ ಲೇಬಲ್ ವಿಶೇಷಣಗಳನ್ನು ಪಾಲಿಸಿ.',

    riskForecastTitle: 'ಹವಾಮಾನ ಮತ್ತು ಸೂಕ್ಷ್ಮ ವಾತಾವರಣ ಅಪಾಯ ಮುನ್ಸೂಚನೆ',
    riskForecastSubtitle: 'ಆರ್ದ್ರತೆ ಮತ್ತು ಮಳೆಯ ಆಧಾರದ ಮೇಲೆ 7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ.',
    weatherRiskScore: 'ಶಿಲೀಂಧ್ರ ಬೀಜಕ ಮೊಳಕೆಯೊಡೆಯುವ ಅಪಾಯ',
    pestRiskScore: 'ಕೀಟಗಳ ಒತ್ತಡ',
    riskEngineExplainer: 'ಅಪಾಯ ಏಕೆ ಹೆಚ್ಚಾಗಿದೆ?',
    riskFactorsTitle: 'ಮುಖ್ಯ ಕಾರಣಗಳು',
    sevenDayForecast: '7 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ನೋಟ',
    riskPrototypeNotice: 'ಮಾದರಿ ತರ್ಕ ಬಳಸಿ ರಚಿಸಲಾದ ಮುನ್ಸೂಚನೆ.',

    pestIntelligenceTitle: 'ಕೀಟ ಮಾಹಿತಿ ಮತ್ತು ಬಲೆ ದತ್ತಾಂಶ',
    addTrapRecord: 'ಬಲೆ ಎಣಿಕೆ ದಾಖಲಿಸಿ',
    currentCount: 'ಪ್ರಸ್ತುತ ಎಣಿಕೆ',
    previousCount: 'ಹಿಂದಿನ ಎಣಿಕೆ',
    percentChange: 'ಬದಲಾವಣೆ ಶೇಕಡಾವಾರು',
    trendLabel: 'ಪ್ರವೃತ್ತಿ',
    fieldSensorsTitle: 'ಜಮೀನು IoT ಸೆನ್ಸಾರ್ ಮಾಹಿತಿ',
    soilMoisture: 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
    leafWetness: 'ಎಲೆ ತೇವಾಂಶ ಸಮಯ',
    temperature: 'ತಾಪಮಾನ',
    humidity: 'ಸಾಪೇಕ್ಷ ಆರ್ದ್ರತೆ',

    cropHealthMapTitle: 'ಪ್ರಾದೇಶಿಕ ಬೆಳೆ ಆರೋಗ್ಯ GIS ನಕ್ಷೆ',
    hotspotsTitle: 'ತೀವ್ರ ಬಾಧಿತ ಪ್ರದೇಶಗಳು',
    affectedFarmsLabel: 'ಬಾಧಿತ ಜಮೀನುಗಳು',
    openCasesLabel: 'ಬಾಕಿ ಇರುವ ಪ್ರಕರಣಗಳು',
    filterByCrop: 'ಬೆಳೆ ಪ್ರಕಾರ ಫಿಲ್ಟರ್',
    filterByRisk: 'ಅಪಾಯ ಮಟ್ಟದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್',

    expertReviewTitle: 'ಕೃಷಿ ತಜ್ಞರ ಪರಿಶೀಲನಾ ಸಾಲು',
    pendingCasesCount: 'ಬಾಕಿ ಇರುವ ಪ್ರಕರಣಗಳು',
    btnValidate: 'ದೃಢೀಕರಿಸಿ',
    btnReject: 'ತಿದ್ದುಪಡಿ ದಾಖಲಿಸಿ',
    btnReferLab: 'ಪ್ರಯೋಗಾಲಯಕ್ಕೆ ಶಿಫಾರಸು ಮಾಡಿ',
    officialDashboardTitle: 'ಕೃಷಿ ಇಲಾಖೆ ಮಾಹಿತಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    regionalHotspots: 'ಪ್ರಾದೇಶಿಕ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು',
    monitoredFarms: 'ಒಟ್ಟು ಮೇಲ್ವಿಚಾರಣೆ ಜಮೀನುಗಳು',
    activeAlerts: 'ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು',

    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    statusHealthy: 'ಆರೋಗ್ಯಕರ',
    statusModerate: 'ಮಧ್ಯಮ ಅಪಾಯ',
    statusHigh: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    statusLow: 'ಕಡಿಮೆ ಅಪಾಯ',
    viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    demoModeBadge: 'ಡೆಮೊ ಮೋಡ್',
    realModelBadge: 'ಕಸ್ಟಮ್ ಮಾಡೆಲ್ ಸಂಪರ್ಕಗೊಂಡಿದೆ'
  }
};
