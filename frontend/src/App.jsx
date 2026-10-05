import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useViewMode } from './context/ViewModeContext';
import SplashScreen from './components/Splash/SplashScreen';
import AuthModal from './components/Auth/AuthModal';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import MobileNav from './components/common/MobileNav';
import EmergencyModal from './components/common/EmergencyModal';
import NotificationFeed from './components/common/NotificationFeed';
import PhoneLinkModal from './components/common/PhoneLinkModal';
import PartyPopperCelebration from './components/common/PartyPopperCelebration';

// Views
import MainDashboard from './components/Dashboard/MainDashboard';
import Age8View from './components/AgePersonalization/Age8View';
import Age12View from './components/AgePersonalization/Age12View';
import TeenView from './components/AgePersonalization/TeenView';
import AdultView from './components/AgePersonalization/AdultView';
import CycleTracker from './components/CycleTracker/CycleTracker';
import DailyLog from './components/DailyLog/DailyLog';
import ThyroidCheck from './components/Assessments/ThyroidCheck';
import PCOSCheck from './components/Assessments/PCOSCheck';
import PregnancyWellness from './components/Assessments/PregnancyWellness';
import MenopauseCheck from './components/Assessments/MenopauseCheck';
import AIAssistant from './components/AIAssistant/AIAssistant';
import Wearable from './components/Wearable/Wearable';
import Medications from './components/Medications/Medications';
import MedicalProfile from './components/MedicalProfile/MedicalProfile';
import HealthVault from './components/HealthVault/HealthVault';
import WellnessTrends from './components/WellnessTrends/WellnessTrends';
import NearbyCare from './components/NearbyCare/NearbyCare';
import PrivacyCentre from './components/PrivacyCentre/PrivacyCentre';
import Settings from './components/Settings/Settings';
import DivasMeeting from './components/DivasMeeting/DivasMeeting';
import AdminPortal from './components/AdminPortal/AdminPortal';
import AdminAuthModal from './components/AdminPortal/AdminAuthModal';
import AmbientPetalsCanvas from './components/common/AmbientPetalsCanvas';

export default function App() {
  const { user, loading } = useAuth();
  const { isAdmin } = useViewMode();
  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem('femtech_splash_seen') !== 'true';
  });
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showNotificationFeed, setShowNotificationFeed] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Listen for open phone modal event, celebration, and age-based auth routing
  React.useEffect(() => {
    const handleOpenPhone = () => setShowPhoneModal(true);
    const handleCelebrate = () => {
      setShowCelebration(false);
      setTimeout(() => setShowCelebration(true), 50);
    };
    const handleUserAuth = (e) => {
      const userAge = e?.detail?.age;
      if (userAge && userAge <= 16) {
        setCurrentTab('health-guide');
      } else {
        setCurrentTab('dashboard');
      }
    };

    window.addEventListener('femtech_open_phone_modal', handleOpenPhone);
    window.addEventListener('femtech_celebrate', handleCelebrate);
    window.addEventListener('femtech_user_authenticated', handleUserAuth);

    return () => {
      window.removeEventListener('femtech_open_phone_modal', handleOpenPhone);
      window.removeEventListener('femtech_celebrate', handleCelebrate);
      window.removeEventListener('femtech_user_authenticated', handleUserAuth);
    };
  }, []);

  // Still showing splash screen on first load
  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => {
          try {
            sessionStorage.setItem('femtech_splash_seen', 'true');
          } catch (e) {}
          setShowSplash(false);
          setShowCelebration(true);
        }}
      />
    );
  }

  // Not logged in -> Show Login / Register Modal
  if (!user && !loading) {
    return <AuthModal isOpen={true} onClose={() => {}} />;
  }

  // Dynamic Age-Based Guide Dispatcher
  const renderAgeGuide = () => {
    const age = user?.age || 20;
    if (age <= 10) return <Age8View />;
    if (age <= 14) return <Age12View />;
    if (age <= 19) return <TeenView onNavigate={setCurrentTab} />;
    return <AdultView onNavigate={setCurrentTab} />;
  };

  // View Dispatcher
  const renderCurrentView = () => {
    if (isAdmin) {
      return <AdminPortal />;
    }
    switch (currentTab) {
      case 'dashboard':
        return <MainDashboard onNavigate={setCurrentTab} />;
      case 'health-guide':
        return renderAgeGuide();
      case 'cycle-tracker':
        return <CycleTracker />;
      case 'daily-log':
        return <DailyLog />;
      case 'thyroid-check':
        return <ThyroidCheck />;
      case 'pcos-check':
        return <PCOSCheck />;
      case 'pregnancy':
        return <PregnancyWellness />;
      case 'menopause-check':
      case 'menopause':
        return <CycleTracker initialMode="menopause" />;
      case 'ai-assistant':
        return <AIAssistant onOpenEmergency={() => setShowEmergencyModal(true)} />;
      case 'wearable':
        return <Wearable />;
      case 'medications':
        return <Medications />;
      case 'medical-profile':
        return <MedicalProfile />;
      case 'health-vault':
        return <HealthVault />;
      case 'wellness-trends':
        return <WellnessTrends />;
      case 'nearby-care':
        return <NearbyCare />;
      case 'privacy-centre':
        return <PrivacyCentre onNavigate={setCurrentTab} />;
      case 'divas-meeting':
      case 'deepas-meeting':
        return <DivasMeeting onNavigate={setCurrentTab} />;
      case 'settings':
        return <Settings onNavigate={setCurrentTab} onOpenNotifications={() => setShowNotificationFeed(true)} />;
      default:
        return <MainDashboard onNavigate={setCurrentTab} onOpenNotifications={() => setShowNotificationFeed(true)} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Ambient Floating Blossom Petals Canvas */}
      <AmbientPetalsCanvas />

      {/* Top Navbar */}
      <Navbar
        onOpenEmergency={() => setShowEmergencyModal(true)}
        onOpenNotifications={() => setShowNotificationFeed(true)}
        onOpenPhone={() => setShowPhoneModal(true)}
        onNavigate={setCurrentTab}
      />

      {/* Main Content Layout with Sidebar */}
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar currentTab={currentTab} onNavigate={setCurrentTab} />

        <main style={{
          flex: 1,
          padding: '16px 8px 60px 8px',
          overflowY: 'auto',
          minWidth: 0
        }}>
          <div key={currentTab} className="page-transition-entrance">
            {renderCurrentView()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentTab={currentTab} onNavigate={setCurrentTab} />

      {/* Global Emergency Modal Dialog */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />

      {/* Scheduled Daily Notifications / SMS Simulator Modal */}
      <NotificationFeed
        isOpen={showNotificationFeed}
        onClose={() => setShowNotificationFeed(false)}
      />

      {/* Direct Mobile App Link, QR Scanner & Live SMS Hub (Rendered at root with zIndex 999999) */}
      <PhoneLinkModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />

      {/* Confetti Party Popper Celebration Burst */}
      <PartyPopperCelebration
        active={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />

      {/* Administrator Authentication Gate Modal */}
      <AdminAuthModal />
    </div>
  );
}
