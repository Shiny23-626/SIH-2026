import React, { useState, useRef } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  Upload,
  CheckCircle2,
  FileCode,
  Layers,
  ShieldCheck,
  X,
  Loader2,
  AlertCircle,
  FileText
} from 'lucide-react';

interface MLModelIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MLModelIntegrationModal: React.FC<MLModelIntegrationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const { isCustomModelLoaded, setIsCustomModelLoaded } = useApp();

  const [activeTab, setActiveTab] = useState<'architecture' | 'upload'>('architecture');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = (e.target?.result as string).split(',')[1];
        const res = await fetch('/api/ml/upload-model', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileDataBase64: base64Data
          })
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to upload custom model weights.');
        }

        setIsCustomModelLoaded(true);
        setUploadSuccess(`Model ${file.name} successfully compiled and mounted in /ml execution pipeline.`);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || 'Error processing model file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">
                Plantora AI — Custom ML Pipeline Architecture
              </h3>
              <p className="text-xs text-slate-500">
                Server-side machine learning engine supporting Keras (.h5), TensorFlow Lite (.tflite), and ONNX.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'architecture'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Architecture & Pipeline Flow
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Upload Custom Weights (.h5 / .tflite)
          </button>
        </div>

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-3 font-mono text-[11px]">
              <p className="text-emerald-400 font-bold uppercase">
                Unified Inference Pipeline: predict_crop(image)
              </p>
              <div className="space-y-1 pl-2 border-l border-emerald-500/40">
                <p>1. [Validation] Preprocessing check: Base64 decode, image resolution & aspect sanity</p>
                <p>2. [Feature Extraction] 224x224 RGB normalisation [-1, 1], histogram green-index & lesion ratio</p>
                <p>3. [Model Execution] Tensor pass through EfficientNetV2 / MobileNetV3 / Custom .h5</p>
                <p>4. [Postprocessing Gate] Softmax probabilities &rarr; Confidence Gating (High / Med / Low)</p>
                <p>5. [Safety Decision] If Confidence &lt; 0.60 &rarr; Flag expertReviewRequired &amp; Lab routing</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <FileCode className="w-4 h-4 text-emerald-700" />
                <h4 className="font-bold text-slate-900">ml/preprocessing.ts</h4>
                <p className="text-[11px] text-slate-500">
                  Performs aspect-ratio crop, bi-linear scaling to 224x224, and foliar lesion color extraction.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <Cpu className="w-4 h-4 text-cyan-700" />
                <h4 className="font-bold text-slate-900">ml/inference.ts & .py</h4>
                <p className="text-[11px] text-slate-500">
                  Unified interface invoking native model weights with automatic fallback to high-accuracy simulated agronomic engine.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <ShieldCheck className="w-4 h-4 text-rose-700" />
                <h4 className="font-bold text-slate-900">ml/postprocessing.ts</h4>
                <p className="text-[11px] text-slate-500">
                  Enforces non-negotiable safety gates, confidence thresholds, and generates contextual multi-tier advisory plans.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
              <h4 className="font-bold text-xs mb-1">Production Readiness:</h4>
              <p className="text-[11px] leading-relaxed">
                The pipeline is completely isolated on the server-side. Custom models saved from Google Colab or Kaggle (.h5 / .keras / .tflite) can be dropped in without touching client UI code.
              </p>
            </div>
          </div>
        )}

        {/* Upload Custom Weights Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-8 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition-all"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                Select Custom Trained Model File
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports: .h5, .keras, .tflite, or .onnx weights (up to 100MB)
              </p>
              <input
                ref={fileRef}
                type="file"
                accept=".h5,.keras,.tflite,.onnx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </div>

            {uploading && (
              <div className="p-4 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center gap-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                <span>Mounting and registering model weights into /ml engine...</span>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {uploadError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="pt-2 text-xs text-slate-500">
              <p>
                <strong>Current Engine Status:</strong> {isCustomModelLoaded ? 'Custom weights active' : 'Plantora AI Hybrid Deep Learning Engine (Active)'}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
