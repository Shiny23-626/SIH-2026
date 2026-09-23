import React, { useState, useRef } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_CROPS, SupportedCrop } from '../../../ml/model_registry';
import { ScanResultView } from './ScanResultView';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Scan,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { CropScanResult } from '../../types';

export const CropScanner: React.FC = () => {
  const { t } = useI18n();
  const { farms, addCase, activeScan, setActiveScan } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [selectedField, setSelectedField] = useState<string>('Tomato Field A');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Processing state stages: Checking image -> Preparing image -> Analyzing crop -> Generating result
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage(t.errorUnclearImage);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device API not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Camera error:', err);
      setCameraError('Camera access denied or unavailable. Please use file upload instead.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setImagePreview(dataUrl);
        stopCamera();
      }
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) {
      setErrorMessage(t.errorUnclearImage);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Stage 1: Checking image
      setProcessingStage(t.statusCheckingImage);
      await new Promise(r => setTimeout(r, 600));

      // Stage 2: Preparing image
      setProcessingStage(t.statusPreparingImage);
      await new Promise(r => setTimeout(r, 600));

      // Stage 3: Analyzing crop
      setProcessingStage(t.statusAnalyzingCrop);
      
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imagePreview,
          cropHint: selectedCrop
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || t.errorUnclearImage);
      }

      // Stage 4: Generating result
      setProcessingStage(t.statusGeneratingResult);
      await new Promise(r => setTimeout(r, 400));

      const rawResult = data.data;

      const newScan: CropScanResult = {
        id: `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString(),
        crop: rawResult.crop,
        disease: rawResult.disease,
        scientificName: rawResult.scientificName,
        confidence: rawResult.confidence,
        confidenceLevel: rawResult.confidenceLevel,
        severity: rawResult.severity,
        affected_area: rawResult.affected_area,
        isHealthy: rawResult.isHealthy,
        imageUrl: imagePreview,
        cautionNotice: rawResult.cautionNotice,
        expertReviewRequired: rawResult.expertReviewRequired,
        symptoms: rawResult.symptoms || [],
        recommendations: rawResult.recommendations,
        boundingBoxes: rawResult.boundingBoxes,
        isDemoMode: rawResult.isDemoMode,
        modelSource: rawResult.modelSource,
        fieldConfirmation: { isCorrect: null },
        expertStatus: rawResult.expertReviewRequired ? 'Under Review' : 'New'
      };

      addCase(newScan);
      setActiveScan(newScan);
    } catch (err: any) {
      console.error('Scan analysis error:', err);
      setErrorMessage(err.message || t.errorUnclearImage);
    } finally {
      setIsProcessing(false);
      setProcessingStage('');
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setErrorMessage(null);
    stopCamera();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Scan className="w-4 h-4" />
          <span>Foliar Disease Diagnostic Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
          {t.scanPageTitle}
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          {t.scanPageSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upload & Camera Controls */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Farm & Crop Selection */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Crop & Sector Context
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.selectCrop}
                </label>
                <select
                  id="crop-selector-dropdown"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium"
                >
                  {SUPPORTED_CROPS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.selectField}
                </label>
                <select
                  id="field-selector-dropdown"
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium"
                >
                  {farms.flatMap(f => f.fields).map(field => (
                    <option key={field.id} value={field.name}>
                      {field.name} ({field.crop})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image Input Area (Drag & Drop or Live Camera) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            
            {/* Live Camera View */}
            {isCameraActive ? (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-4/3 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Camera reticle overlay */}
                <div className="absolute inset-0 border-2 border-dashed border-emerald-400/60 m-8 rounded-lg pointer-events-none flex items-center justify-center">
                  <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Position Leaf Within Frame
                  </span>
                </div>

                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4">
                  <button
                    onClick={capturePhoto}
                    className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    {t.capturePhoto}
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white text-sm"
                  >
                    {t.closeCamera}
                  </button>
                </div>
              </div>
            ) : imagePreview ? (
              /* Image Preview with overlay bounding box */
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-4/3 flex items-center justify-center group">
                <img
                  src={imagePreview}
                  alt="Crop to analyze"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Image ready for inference</span>
                </div>
              </div>
            ) : (
              /* Drag and drop upload box */
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileSelect(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-300 hover:border-emerald-600 hover:bg-slate-50/50'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {t.dropImageHere}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {t.orBrowseFile} (JPG, PNG, WebP)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />
              </div>
            )}

            {cameraError && (
              <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {cameraError}
              </p>
            )}

            {/* Quick Action Bar: Camera Button & Sample Photos */}
            {!isCameraActive && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Camera className="w-4 h-4 text-slate-600" />
                  <span>{t.useCamera}</span>
                </button>

                {/* Quick sample loading for seamless demo evaluation */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Quick sample:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCrop('Tomato');
                      setImagePreview('https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?w=600&auto=format&fit=crop&q=80');
                    }}
                    className="px-2 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded text-xs font-medium"
                  >
                    Blight
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCrop('Tomato');
                      setImagePreview('https://images.unsplash.com/photo-1594488518063-8a39a04a54eb?w=600&auto=format&fit=crop&q=80');
                    }}
                    className="px-2 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-xs font-medium"
                  >
                    Healthy
                  </button>
                </div>
              </div>
            )}

            {/* Error banner */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{errorMessage}</p>
                  <p className="text-[11px] text-rose-600 mt-0.5">
                    Ensure the leaf is well lit, in focus, and occupies at least 50% of the camera frame.
                  </p>
                </div>
              </div>
            )}

            {/* Main Action Button */}
            <div className="mt-5">
              <button
                id="btn-analyze-crop"
                type="button"
                disabled={!imagePreview || isProcessing}
                onClick={handleAnalyze}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                  !imagePreview || isProcessing
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-900/10'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{processingStage || t.statusAnalyzingCrop}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>{t.btnAnalyzeCrop}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Diagnostic Result Screen & Safety Gate */}
        <div className="lg:col-span-6">
          {activeScan ? (
            <ScanResultView scan={activeScan} onScanAgain={handleReset} />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-3">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-700">
                Awaiting Crop Image
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Upload or capture a photo of foliar symptoms on the left to run through the Plantora AI diagnostic engine.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
