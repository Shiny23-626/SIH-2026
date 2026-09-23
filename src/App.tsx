import React, { useState } from 'react';
import { I18nProvider } from './i18n';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { JudgeDemoBar } from './components/JudgeDemoBar';

// Feature Views
import { HomeView } from './components/Home/HomeView';
import { CropScanner } from './components/Scanner/CropScanner';
import { MyFarmsView } from './components/Farms/MyFarmsView';
import { RiskForecastView } from './components/Risk/RiskForecastView';
import { PestIntelligenceView } from './components/Pest/PestIntelligenceView';
import { FieldSensorsView } from './components/Sensors/FieldSensorsView';
import { CropHealthMapView } from './components/Map/CropHealthMapView';
import { ExpertReviewView } from './components/Expert/ExpertReviewView';
import { OfficialDashboardView } from './components/Official/OfficialDashboardView';
import { FollowUpMonitoringView } from './components/Monitoring/FollowUpMonitoringView';
import { CaseHistoryView } from './components/Cases/CaseHistoryView';
import { AgribotView } from './components/Agribot/AgribotView';
import { AlertCenterView } from './components/Alerts/AlertCenterView';
import { SettingsView } from './components/Settings/SettingsView';

// Modals
import { MLModelIntegrationModal } from './components/MLModel/MLModelIntegrationModal';
import { AuthModal } from './components/Auth/AuthModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'scan':
        return <CropScanner />;
      case 'farms':
        return <MyFarmsView />;
      case 'risk':
        return <RiskForecastView />;
      case 'pest':
        return <PestIntelligenceView />;
      case 'sensors':
        return <FieldSensorsView />;
      case 'map':
        return <CropHealthMapView />;
      case 'expert':
        return <ExpertReviewView />;
      case 'official':
        return <OfficialDashboardView />;
      case 'monitoring':
        return <FollowUpMonitoringView />;
      case 'cases':
        return <CaseHistoryView />;
      case 'assistant':
        return <AgribotView />;
      case 'alerts':
        return <AlertCenterView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Application Header */}
      <Header
        onOpenModelModal={() => setModelModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Role-adaptive Navigation Bar */}
      <Navigation />

      {/* Dynamic Content View with Fade Transition */}
      <main className="flex-1 pb-16">
        {renderActiveView()}
      </main>

      {/* 1-Click Judge Demo & Live Presentation Stepper */}
      <JudgeDemoBar />

      {/* ML Pipeline & Model Upload Modal */}
      <MLModelIntegrationModal
        isOpen={modelModalOpen}
        onClose={() => setModelModalOpen(false)}
      />

      {/* Auth & Demo Account Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Persistent Footer with 'Developed by Amsapriya' */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <AppProvider>
          <MainLayout />
        </AppProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
