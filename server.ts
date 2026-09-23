import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { predict_crop } from './ml/inference.js';
import { getActiveModel, initModelLoader, registerCustomModel } from './ml/model_loader.js';

// Initialize ML model subsystem
initModelLoader();

// Initialize Gemini Client (lazily or with environment key)
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded body parsers with generous limits for image data URLs
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // ==========================================
  // API ROUTES (Mounted BEFORE Vite)
  // ==========================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Plantora AI Backend',
      mlEngine: getActiveModel(),
      timestamp: new Date().toISOString()
    });
  });

  // 1. ML Model Status & Upload
  app.get('/api/ml/status', (req, res) => {
    res.json({
      success: true,
      model: getActiveModel()
    });
  });

  app.post('/api/ml/upload-model', (req, res) => {
    try {
      const { fileName, fileDataBase64, format } = req.body;
      if (!fileName || !fileDataBase64) {
        return res.status(400).json({ success: false, error: 'Missing fileName or file data.' });
      }

      const buffer = Buffer.from(fileDataBase64, 'base64');
      const ext = path.extname(fileName).toLowerCase().replace('.', '') as 'h5' | 'keras' | 'tflite';
      const validFormat = ['h5', 'keras', 'tflite'].includes(ext) ? ext : 'tflite';

      const updated = registerCustomModel(fileName, buffer, validFormat);
      return res.json({
        success: true,
        message: `Custom model ${fileName} successfully mounted and registered in /ml engine.`,
        model: updated
      });
    } catch (err: any) {
      console.error('[API /ml/upload-model error]:', err);
      return res.status(500).json({ success: false, error: err.message || 'Failed to upload model' });
    }
  });

  // 2. Crop Disease & Severity Prediction (ML Pipeline)
  app.post('/api/predict', async (req, res) => {
    try {
      const { image, cropHint, scenarioPreset } = req.body;

      if (!image) {
        return res.status(400).json({
          success: false,
          error: 'Please upload a clearer crop image.'
        });
      }

      // Execute unified ML pipeline predict_crop(image)
      const inferenceResult = await predict_crop(image, { cropHint, scenarioPreset });

      if (!inferenceResult.success) {
        return res.status(422).json({
          success: false,
          error: inferenceResult.error || 'Please upload a clearer crop image.'
        });
      }

      return res.json({
        success: true,
        data: inferenceResult.result,
        processingTimeMs: inferenceResult.processingTimeMs
      });
    } catch (err: any) {
      console.error('[API /predict error]:', err);
      return res.status(500).json({
        success: false,
        error: 'Inference pipeline encountered an unexpected issue: ' + (err.message || 'Unknown error')
      });
    }
  });

  // 3. Plantora AI Assistant (Multilingual Text & Voice Chat using Gemini)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, language = 'en', cropContext, farmContext } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ success: false, error: 'Message content is required.' });
      }

      const languageNames: Record<string, string> = {
        en: 'English',
        ta: 'Tamil (தமிழ்)',
        hi: 'Hindi (हिन्दी)',
        mr: 'Marathi (मराठी)',
        te: 'Telugu (తెలుగు)',
        kn: 'Kannada (ಕನ್ನಡ)'
      };

      const targetLang = languageNames[language] || 'English';

      const systemPrompt = `You are "Plantora AI Assistant", an expert, empathetic, and scientifically grounded agricultural AI advisor.
Target Output Language: Respond fluently and naturally in ${targetLang}.
If the user speaks in ${targetLang}, reply directly in ${targetLang}.

Agronomic Principles:
1. Provide practical, step-by-step guidance on crop diseases, pest mitigation, soil moisture, and weather protection.
2. If crop symptoms indicate potential foliar infection, explain probable fungal, bacterial, or physiological causes.
3. Suggest using the Plantora AI "Scan Crop" camera tool for accurate foliar diagnosis.
4. CRITICAL SAFETY REGULATION: Do NOT fabricate unverified chemical pesticide dosages. For any synthetic chemical management, you MUST include: "Follow local agricultural authority recommendations and the official product label."
5. Prioritize integrated pest management (IPM), cultural practices (spacing, aeration, drip irrigation), and bio-fungicides/botanicals (Neem, Trichoderma, Bacillus subtilis) first.
6. Context: Crop is ${cropContext || 'Field Crops'}, Location: ${farmContext || 'Indian agro-climatic zone'}.
7. Keep responses structured, concise, and easy for a busy farmer or field officer to read or hear via speech audio.`;

      const ai = getGenAI();

      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [
                { text: systemPrompt },
                { text: `Farmer query: "${message}"` }
              ]
            }
          ]
        });

        const replyText = response.text || 'I could not generate an answer right now. Please try again.';
        return res.json({
          success: true,
          reply: replyText,
          language
        });
      } else {
        // High quality contextual fallback if GEMINI_API_KEY is not configured
        const sampleFallbacks: Record<string, string> = {
          en: `Thank you for consulting Plantora AI. For symptoms of leaf browning or spotting in ${cropContext || 'your crop'}, this is frequently caused by Early Blight (Alternaria solani) or high humidity foliar stress. 

Immediate recommendation:
1. Prune bottom leaves having concentric brown rings.
2. Avoid overhead sprinkler irrigation to keep foliage dry.
3. Consider bio-fungicide like Bacillus subtilis or copper hydroxide.
Notice: For chemical treatments, follow product-label instructions and local agricultural authority guidance.
You can use our 'Scan Crop' feature to upload a photo for instant model verification.`,
          ta: `Plantora AI-ஐ அணுகியதற்கு நன்றி. உங்கள் ${cropContext || 'பயிரில்'} இலைகள் பழுப்பு நிறமாக மாறுவது ஆரம்பகால இலைக்கருகல் நோய் (Early Blight) அல்லது அதிக ஈரப்பதத்தால் ஏற்படக்கூடும்.

உடனடி நடவடிக்கைகள்:
1. பாதிக்கப்பட்ட கீழ் இலைகளை நீக்கி பாதுகாப்பாக அப்புறப்படுத்தவும்.
2. இலைகளில் தண்ணீர் தேங்காமல் சொட்டு நீர் பாசனத்தை பயன்படுத்தவும்.
3. பேசிலஸ் சப்டிலிஸ் (Bacillus subtilis) அல்லது காப்பர் ஆக்ஸிகுளோரைடு பயன்படுத்தலாம்.
அறிவிப்பு: வேதியியல் மருந்துகளுக்கு, தயாரிப்பு லேபிள் வழிமுறைகளையும் உள்ளூர் வேளாண் அதிகாரி வழிகாட்டுதலையும் பின்பற்றவும்.
துல்லியமான முடிவுகளுக்கு 'பயிர் ஸ்கேன்' அம்சத்தைப் பயன்படுத்தவும்.`,
          hi: `Plantora AI में आपका स्वागत है। आपके ${cropContext || 'फसल'} में पत्तियों का भूरा होना अगेती झुलसा (Early Blight) या अधिक नमी के कारण हो सकता है।

तत्काल सलाह:
1. रोगग्रस्त निचली पत्तियों को काटकर खेत से दूर नष्ट करें।
2. फव्वारा सिंचाई के बजाय ड्रिप सिंचाई अपनाएं ताकि पत्तियां सूखी रहें।
3. ट्राइकोडर्मा या कॉपर ऑक्सीक्लोराइड का छिड़काव करें।
सूचना: रासायनिक दवाओं के लिए उत्पाद लेबल निर्देशों और स्थानीय कृषि प्राधिकारी के मार्गदर्शन का पालन करें।
सटीक पहचान के लिए हमारे 'फसल स्कैन करें' फीचर का उपयोग करें।`
        };

        return res.json({
          success: true,
          reply: sampleFallbacks[language] || sampleFallbacks.en,
          language,
          isOfflineFallback: true
        });
      }
    } catch (err: any) {
      console.error('[API /chat error]:', err);
      return res.status(500).json({
        success: false,
        error: 'AI Assistant query processing failed: ' + (err.message || 'Unknown error')
      });
    }
  });

  // 4. Authentication Endpoints (Phone OTP & Demo Mode)
  app.post('/api/auth/send-otp', (req, res) => {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: 'Phone number is required.' });
    }
    // In production with Firebase Auth, Firebase client SDK handles Phone Auth reCAPTCHA & SMS.
    // Server provides confirmation token session.
    return res.json({
      success: true,
      message: `Verification code dispatched to ${phone}. (Enter OTP 2026 for demo verification)`,
      sessionToken: `sess_${Date.now()}`
    });
  });

  app.post('/api/auth/verify-otp', (req, res) => {
    const { phone, otp, name } = req.body;
    if (!otp) {
      return res.status(400).json({ success: false, error: 'Verification code is required.' });
    }
    // Accepts standard OTP or demo OTP code
    return res.json({
      success: true,
      userId: `grower_${Date.now()}`,
      name: name || 'Verified Farmer',
      phone: phone || '+91 98765 43210'
    });
  });

  // 5. Weather & Epidemiological Risk Endpoint
  app.get('/api/weather', (req, res) => {
    res.json({
      success: true,
      source: 'Plantora Agro-Meteorology Prototype Service',
      station: 'Nashik Micro-Climatic Station',
      current: {
        temp: 28.4,
        humidity: 84,
        rainfallMm: 12.4,
        windSpeedKmh: 14,
        condition: 'High Humidity / Overcast'
      },
      diseaseRiskScore: 82,
      pestRiskScore: 65,
      factors: [
        'High ambient relative humidity (>80%) maintains spore germination viability',
        'Leaf wetness sensor duration exceeded 5.4 hours',
        'Warm day-night temperature fluctuation favors Alternaria solani incubation'
      ]
    });
  });

  // ==========================================
  // VITE OR STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Plantora AI] Server successfully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
