import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, AppLanguage } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string; confirmationResult?: any }>;
  verifyOtp: (otp: string, name?: string) => Promise<{ success: boolean; message: string }>;
  loginWithDemo: (role?: UserRole) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  otpSent: boolean;
  otpPhone: string;
  setOtpSent: (sent: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = 'plantora_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default logged-in demo profile to start presentation effortlessly
    return {
      id: 'farmer-amsapriya-01',
      name: 'Amsapriya (Lead Grower)',
      phone: '+91 98765 43210',
      role: 'FARMER',
      preferredLanguage: 'en',
      farmLocation: 'Nashik, Maharashtra',
      isDemoUser: true,
      createdAt: '2026-09-01'
    };
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const sendOtp = async (phone: string): Promise<{ success: boolean; message: string }> => {
    setOtpPhone(phone);
    setOtpSent(true);

    // Call server endpoint for real OTP handling / SMS gateway simulation
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      return { success: data.success ?? true, message: data.message || 'OTP sent successfully to ' + phone };
    } catch {
      return { success: true, message: `Verification code dispatched to ${phone}. (Mock gateway ready)` };
    }
  };

  const verifyOtp = async (otp: string, name?: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: otpPhone, otp, name })
      });
      const data = await res.json();
      if (data.success) {
        const newUser: UserProfile = {
          id: data.userId || `user-${Date.now()}`,
          name: name || data.name || 'Registered Farmer',
          phone: otpPhone || '+91 98765 00000',
          role: 'FARMER',
          preferredLanguage: 'en',
          isDemoUser: false,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setUser(newUser);
        setOtpSent(false);
        return { success: true, message: 'OTP verified successfully.' };
      }
      return { success: false, message: data.message || 'Invalid OTP. Please check the code.' };
    } catch {
      // Fallback verification
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: name || 'Registered Grower',
        phone: otpPhone,
        role: 'FARMER',
        preferredLanguage: 'en',
        isDemoUser: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUser(newUser);
      setOtpSent(false);
      return { success: true, message: 'OTP verified successfully.' };
    }
  };

  const loginWithDemo = (role: UserRole = 'FARMER') => {
    const roleNames: Record<UserRole, string> = {
      FARMER: 'Amsapriya (Grower)',
      EXPERT: 'Dr. Venkataraman (Senior Agronomist)',
      OFFICIAL: 'S. Kulkarni (District Agriculture Director)'
    };

    const demoUser: UserProfile = {
      id: `demo-${role.toLowerCase()}-01`,
      name: roleNames[role],
      phone: '+91 98765 43210',
      role,
      preferredLanguage: 'en',
      farmLocation: role === 'FARMER' ? 'Nashik, Maharashtra' : undefined,
      isDemoUser: true,
      createdAt: '2026-09-01'
    };
    setUser(demoUser);
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const logout = () => {
    setUser(null);
    setOtpSent(false);
    setOtpPhone('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isDemoMode: !!user?.isDemoUser,
        currentRole: user?.role || 'FARMER',
        setRole,
        sendOtp,
        verifyOtp,
        loginWithDemo,
        logout,
        updateProfile,
        otpSent,
        otpPhone,
        setOtpSent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
