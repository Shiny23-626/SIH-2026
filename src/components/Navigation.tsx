import React from 'react';
import { useI18n } from '../i18n';
import { useApp, ActiveTab } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  ScanLine,
  Trees,
  CloudSun,
  Bug,
  Activity,
  MapPin,
  ClipboardCheck,
  Building2,
  CalendarDays,
  FolderClock,
  Bot,
  Bell,
  Settings
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { t } = useI18n();
  const { activeTab, setActiveTab, alerts } = useApp();
  const { currentRole } = useAuth();

  const unreadAlerts = alerts.filter(a => !a.read).length;

  interface NavItem {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    roles: ('FARMER' | 'EXPERT' | 'OFFICIAL')[];
  }

  const navItems: NavItem[] = [
    { id: 'home', label: t.navHome, icon: Home, roles: ['FARMER', 'EXPERT', 'OFFICIAL'] },
    { id: 'scan', label: t.navScan, icon: ScanLine, roles: ['FARMER'] },
    { id: 'farms', label: t.navFarms, icon: Trees, roles: ['FARMER', 'OFFICIAL'] },
    { id: 'risk', label: t.navRisk, icon: CloudSun, roles: ['FARMER', 'EXPERT', 'OFFICIAL'] },
    { id: 'pest', label: t.navPest, icon: Bug, roles: ['FARMER', 'EXPERT', 'OFFICIAL'] },
    { id: 'sensors', label: t.navSensors, icon: Activity, roles: ['FARMER', 'EXPERT'] },
    { id: 'map', label: t.navMap, icon: MapPin, roles: ['FARMER', 'EXPERT', 'OFFICIAL'] },
    { id: 'expert', label: t.navExpert, icon: ClipboardCheck, roles: ['EXPERT'] },
    { id: 'official', label: t.navOfficial, icon: Building2, roles: ['OFFICIAL'] },
    { id: 'monitoring', label: t.navMonitoring, icon: CalendarDays, roles: ['FARMER'] },
    { id: 'cases', label: t.navCases, icon: FolderClock, roles: ['FARMER', 'EXPERT'] },
    { id: 'assistant', label: t.navAssistant, icon: Bot, roles: ['FARMER', 'EXPERT'] },
    { id: 'alerts', label: t.navAlerts, icon: Bell, badge: unreadAlerts, roles: ['FARMER', 'EXPERT', 'OFFICIAL'] },
    { id: 'settings', label: t.navSettings, icon: Settings, roles: ['FARMER', 'EXPERT', 'OFFICIAL'] }
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <nav className="bg-white border-b border-slate-200/80 sticky top-16 z-30 overflow-x-auto no-scrollbar shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 py-2 min-w-max">
          {visibleItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-emerald-800' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
