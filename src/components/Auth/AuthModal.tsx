import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  ShieldCheck,
  Phone,
  Lock,
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const { loginWithDemo, sendOtp, verifyOtp, isAuthenticated, user, logout } = useAuth();

  const [mode, setMode] = useState<'demo' | 'phone'>('demo');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [otpCode, setOtpCode] = useState('2026');
  const [farmerName, setFarmerName] = useState('Ramesh Patil');
  const [selectedRole, setSelectedRole] = useState<UserRole>('FARMER');

  const [otpDispatched, setOtpDispatched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      await sendOtp(phoneNumber);
      setOtpDispatched(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      await verifyOtp(otpCode, farmerName);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    loginWithDemo(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-outfit">
                {isAuthenticated ? 'Farmer Profile' : 'Access & Authentication'}
              </h3>
              <p className="text-xs text-slate-500">
                Secure access to farm telemetry and diagnostic history.
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

        {isAuthenticated ? (
          /* Profile & Logout View */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Farmer Name:</span>
                <span className="font-bold text-slate-900">{user?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Mobile Phone:</span>
                <span className="font-bold text-slate-900">{user?.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Role:</span>
                <span className="font-bold text-emerald-800">{user?.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Preferred Language:</span>
                <span className="font-bold text-slate-900">{user?.preferredLanguage?.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                {t.signOut}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Choices: Demo 1-Click OR Real Phone OTP */
          <div className="space-y-4">
            
            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                onClick={() => setMode('demo')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  mode === 'demo' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                1-Click Demo Mode
              </button>
              <button
                onClick={() => setMode('phone')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  mode === 'phone' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Phone / OTP Login
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Mode: Demo 1-Click */}
            {mode === 'demo' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Select a pre-configured persona to immediately test all features without SMS latency:
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickDemoLogin('FARMER')}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-left text-xs transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-emerald-950">
                        🧑‍🌾 Ramesh Patil (Farmer / Grower)
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Nashik Tomato & Grape farm &bull; 8.5 Acres
                      </p>
                    </div>
                    <span className="text-emerald-700 font-bold">&rarr;</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('EXPERT')}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-left text-xs transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-emerald-950">
                        🔬 Dr. K. Swaminathan (Agronomist)
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Plant Pathologist &bull; Diagnostic Queue Access
                      </p>
                    </div>
                    <span className="text-emerald-700 font-bold">&rarr;</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('OFFICIAL')}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-left text-xs transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-emerald-950">
                        🏛️ Suresh Deshmukh (Agriculture Officer)
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        District Surveillance & Epidemiological Outbreak Desk
                      </p>
                    </div>
                    <span className="text-emerald-700 font-bold">&rarr;</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode: Phone / OTP */}
            {mode === 'phone' && (
              <div className="space-y-4">
                {!otpDispatched ? (
                  <form onSubmit={handleSendOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (Mobile)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Verification OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Enter OTP Code (Demo code: 2026)
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono tracking-widest text-center text-sm font-bold"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Dispatched to {phoneNumber}.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Access Platform'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpDispatched(false)}
                      className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
                    >
                      Change Phone Number
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
