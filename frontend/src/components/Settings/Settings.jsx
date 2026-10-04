import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useViewMode } from '../../context/ViewModeContext';
import BrandWingsLogo from '../common/BrandWingsLogo';
import { useSmsAlert } from '../../context/SmsAlertContext';
import {
  Settings as SettingsIcon,
  Globe,
  Palette,
  Bell,
  Type,
  Phone,
  Clock,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Droplets,
  Utensils,
  Smile,
  Pill,
  Moon,
  Shield,
  Database,
  Download,
  Activity,
  Server,
  Zap,
  Users,
  Check,
  Edit3,
  Smartphone,
  Sliders,
  FileText,
  Lock,
  Heart
} from 'lucide-react';

export default function Settings({ onNavigate, onOpenNotifications }) {
  const { user } = useAuth();
  const { language, changeLanguage, t, languages } = useLanguage();
  const { theme, setTheme, fontSize, setFontSize, largeText, toggleLargeText, highContrast, toggleHighContrast, logoStyle, setLogoStyle, profileAvatar, setProfileAvatar } = useTheme();
  const { viewMode, setViewMode, isAdmin } = useViewMode();
  const {
    userPhone,
    motherName,
    motherPhone,
    saveBothNumbers,
    is10MinActive,
    toggle10MinCycle,
    countdownText,
    trigger10MinAlertNow
  } = useSmsAlert();

  const [phoneInput, setPhoneInput] = useState(userPhone);
  const [motherPhoneInput, setMotherPhoneInput] = useState(motherPhone);
  const [motherNameInput, setMotherNameInput] = useState(motherName);
  const [numbersSavedAlert, setNumbersSavedAlert] = useState(false);

  // New Cycle & Luteal Personalization State
  const [cycleLength, setCycleLength] = useState(() => Number(localStorage.getItem('femtech_cycle_length')) || 28);
  const [lutealLength, setLutealLength] = useState(() => Number(localStorage.getItem('femtech_luteal_length')) || 14);
  const [waterTarget, setWaterTarget] = useState(() => Number(localStorage.getItem('femtech_water_target')) || 8);
  const [fertileAlerts, setFertileAlerts] = useState(() => localStorage.getItem('femtech_fertile_alerts') !== 'false');

  // New Wearable Sync State
  const [syncInterval, setSyncInterval] = useState(() => localStorage.getItem('femtech_sync_interval') || '15m');
  const [arrhythmiaAlert, setArrhythmiaAlert] = useState(() => localStorage.getItem('femtech_arrhythmia_alert') !== 'false');
  const [nocturnalBBT, setNocturnalBBT] = useState(() => localStorage.getItem('femtech_nocturnal_bbt') !== 'false');
  const [fallDetection, setFallDetection] = useState(() => localStorage.getItem('femtech_fall_detection') !== 'false');

  // New Vault & Clinical Export State
  const [biometricLock, setBiometricLock] = useState(() => localStorage.getItem('femtech_biometric_lock') === 'true');
  const [exportNotice, setExportNotice] = useState(false);

  const handleExportClinicalReport = () => {
    const reportData = `FemTech Comprehensive Clinical Biometric Report
Date: ${new Date().toLocaleDateString()}
User: ${user?.name || 'Janani S'}
Age: ${user?.age || 25}
Resting Heart Rate: 71 BPM (Sinus Rhythm)
Heart Rate Variability (SDNN): 64 ms
Basal Skin Temperature: 36.65°C / 97.97°F (Biphasic Shift: +0.32°C confirmed)
SpO2 Blood Oxygen: 98.4%
Blood Pressure: 118/76 mmHg
Resting Respiration Rate: 14 breaths/min
Stress & Cortisol Index: 22 / 100
Galvanic Skin Response: 1.85 uS
Sleep Architecture: Total 7h 45m (Deep 2h 15m, REM 1h 45m, Light 3h 45m)
Cardio VO2 Max Estimate: 38.4 mL/kg/min
Active Calories: 438 kcal
Daily Steps: 7,420 steps (Cadence: 104 spm)`;

    const blob = new Blob([reportData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FemTech_Clinical_Report_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  useEffect(() => {
    setPhoneInput(userPhone);
    setMotherPhoneInput(motherPhone);
    setMotherNameInput(motherName);
  }, [userPhone, motherPhone, motherName]);

  const handleSavePhoneNumbers = (e) => {
    e.preventDefault();
    saveBothNumbers(phoneInput, motherPhoneInput, motherNameInput);
    setNumbersSavedAlert(true);
    setTimeout(() => setNumbersSavedAlert(false), 3500);
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'Janani';

  // Individual toggle states for the 5 scheduled times
  const [slotSettings, setSlotSettings] = useState(() => {
    const saved = localStorage.getItem('femtech_notification_slots');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      slot_0600: true,
      slot_1200: true,
      slot_1800: true,
      slot_2000: true,
      slot_2200: true
    };
  });

  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const toggleSlot = (slotId) => {
    setSlotSettings((prev) => {
      const updated = { ...prev, [slotId]: !prev[slotId] };
      localStorage.setItem('femtech_notification_slots', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSendTestNotification = () => {
    setTestNotificationSent(true);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🌸 FemTech Daily SMS Notification', {
        body: `Hello ${userName}! This is your scheduled FemTech SMS check-in on ${userPhone}. Stay hydrated!`,
        icon: '/favicon.ico'
      });
    }
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  const handleExportSystemAudit = () => {
    const systemAudit = {
      timestamp: new Date().toISOString(),
      platform: 'FemTech AI-IoT System Control Console',
      adminUser: userName,
      activeViewMode: viewMode,
      activeTheme: theme,
      activeLanguage: language,
      activeFontSize: fontSize,
      notificationSlots: slotSettings,
      serverStatus: 'Online (12ms latency)',
      database: 'MongoDB Atlas Connected',
      totalRecords: 14208
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(systemAudit, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `femtech_system_audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const themes = [
    {
      id: 'cherry-red',
      name: t('themeCherryRed') || '🍒 Cherry Red (Crimson Velvet)',
      border: '#be123c',
      bg: '#fff0f3',
      primary: '#be123c'
    },
    {
      id: 'ruby-crimson',
      name: t('themeRubyCrimson') || '🍷 Deep Ruby Crimson (செர்ரி ரூபி)',
      border: '#990024',
      bg: '#ffeef2',
      primary: '#990024'
    },
    {
      id: 'soft-pink',
      name: t('themeSoftPink') || '🌸 Soft Pink (Rose Pastel)',
      border: 'var(--pink-400)',
      bg: '#fff1f2',
      primary: '#e11d48'
    },
    {
      id: 'light-lavender',
      name: t('themeLavender') || '💜 Light Lavender',
      border: '#a855f7',
      bg: '#faf5ff',
      primary: '#7c3aed'
    },
    {
      id: 'soft-sage',
      name: t('themeSage') || '🌿 Soft Sage (Herbal Mint)',
      border: '#10b981',
      bg: '#ecfdf5',
      primary: '#059669'
    },
    {
      id: 'warm-peach',
      name: t('themePeach') || '🍑 Warm Peach (Sunrise Coral)',
      border: '#f97316',
      bg: '#fff7ed',
      primary: '#ea580c'
    },
    {
      id: 'sapphire-blue',
      name: t('themeSapphire') || '💙 Sapphire Blue (Ocean Serenity)',
      border: '#3b82f6',
      bg: '#eff6ff',
      primary: '#2563eb'
    },
    {
      id: 'midnight-plum',
      name: t('themePlum') || '🌙 Midnight Plum (Royal Velvet)',
      border: '#9333ea',
      bg: '#faf5ff',
      primary: '#6b21a8'
    },
    {
      id: 'onyx-black',
      name: t('themeOnyx') || '🖤 Onyx Black (AMOLED Midnight)',
      border: '#f43f5e',
      bg: '#09090b',
      primary: '#f43f5e'
    },
    {
      id: 'crimson-white',
      name: t('themeCrimsonWhite') || '⚪ Pure White & Crimson Red',
      border: '#dc2626',
      bg: '#ffffff',
      primary: '#dc2626'
    },
    {
      id: 'emerald-gold',
      name: t('themeEmeraldGold') || '👑 Royal Emerald & Gold',
      border: '#eab308',
      bg: '#f0fdf4',
      primary: '#059669'
    },
    {
      id: 'rose-gold',
      name: t('themeRoseGold') || '✨ Sunset Rose Gold',
      border: '#f59e0b',
      bg: '#fff1f2',
      primary: '#e11d48'
    }
  ];

  const logoStyles = [
    {
      id: 'auto',
      title: t('logoAutoTitle') || '🔄 Theme-Adaptive (Auto)',
      desc: t('logoAutoDesc') || 'Distinct artwork automatically pairs with each theme (Cherry Red = Girl Hugging Knees, Blue = Heart, Soft Pink = Pad...)',
      variant: null
    },
    {
      id: 'curl_knees',
      title: t('logoKneesTitle') || '🧘‍♀️ Self-Care Comfort (Girl Hugging Knees)',
      desc: t('logoKneesDesc') || 'Comforting cramp & menstrual curl embrace ("Girl Hugging Knees")',
      variant: 'curl_knees'
    },
    {
      id: 'heart',
      title: t('logoHeartTitle') || '💙 Sapphire Pulse Heart',
      desc: t('logoHeartDesc') || 'Vitality pulse & cardiac telemetry ("Blue Heart")',
      variant: 'heart'
    },
    {
      id: 'pad',
      title: t('logoPadTitle') || '🩸 Menstrual Care & Pad',
      desc: t('logoPadDesc') || 'Dignified menstrual wellness pad with crimson heart droplet ("Menstrual Pad")',
      variant: 'pad'
    },
    {
      id: 'wings',
      title: t('logoWingsTitle') || '🪽 Wings',
      desc: t('logoWingsDesc') || 'Wings of empowerment and freedom',
      variant: 'wings'
    },
    {
      id: 'butterfly',
      title: t('logoButterflyTitle') || '🦋 Flutter Butterfly (வண்ணத்துப் பூச்சி / तितली)',
      desc: t('logoButterflyDesc') || 'Graceful butterfly representing rebirth, vitality, and hormonal transformation',
      variant: 'butterfly'
    },
    {
      id: 'lotus',
      title: t('logoLotusTitle') || '🌿 Herbal Lotus Harmony',
      desc: t('logoLotusDesc') || 'Lotus petal balance and serene mindfulness',
      variant: 'lotus'
    },
    {
      id: 'moon',
      title: t('logoMoonTitle') || '🌙 Restorative Crescent Moon',
      desc: t('logoMoonDesc') || 'Golden crescent moon cradling peaceful restorative sleep',
      variant: 'moon'
    }
  ];

  const avatarOptions = [
    {
      id: 'initials',
      title: language === 'ta' ? '👤 பெயர் முதல் எழுத்து (Classic Monogram)' : '👤 Classic Initial Avatar',
      desc: language === 'ta' ? 'உங்கள் பெயரின் முதலெழுத்தைக் காட்டும் எளிய தூய வடிவம்' : 'Minimalist monogram badge displaying your first name initial',
      img: null
    },
    {
      id: 'knees',
      title: language === 'ta' ? '🧘‍♀️ முட்டி கட்டிப்பிடித்த பெண் (Cramp Relief & Hug)' : '🧘‍♀️ Girl Hugging Knees',
      desc: language === 'ta' ? 'மாதவிடாய் வலி நிவாரணம் மற்றும் இதமான சுய-கவனிப்பு அரவணைப்பு' : 'Soothing menstrual cramp self-care and gentle knee embrace posture',
      img: '/avatars/knees_avatar.jpg'
    }
  ];

  const fontOptions = [
    { id: 'small', label: t('fontSmall') || 'Compact (14px)', desc: t('fontSmallDesc') || 'Higher information density' },
    { id: 'default', label: t('fontDefault') || 'Standard (16px)', desc: t('fontDefaultDesc') || 'Optimized balanced readability' },
    { id: 'large', label: t('fontLarge') || 'Large Text (19px)', desc: t('fontLargeDesc') || 'Accessibility & eye comfort' }
  ];

  const notificationSchedule = [
    {
      id: 'slot_0600',
      time: '06:00 AM',
      icon: <Clock size={16} color="#e11d48" />,
      label: t('slot1Title') || 'Morning Wake-up, Sleep Quality & Warm Water',
      desc: t('slot1Desc') || 'காலை வணக்கம்! நன்றாக தூங்கினீர்களா? வெதுவெதுப்பான தண்ணீர் குடிக்கவும்.'
    },
    {
      id: 'slot_1200',
      time: '12:00 PM',
      icon: <Utensils size={16} color="#0d9488" />,
      label: t('slot2Title') || 'Noon Lunch Check & 4-Glass Hydration Check',
      desc: t('slot2Desc') || 'மதிய உணவு சாப்பிட்டீர்களா? இதுவரை 4 டம்ளர் தண்ணீர் குடித்துவிட்டீர்களா?'
    },
    {
      id: 'slot_1800',
      time: '06:00 PM',
      icon: <Smile size={16} color="#f59e0b" />,
      label: t('slot3Title') || 'Evening Mood Tracker & 8-Glass Water Target',
      desc: t('slot3Desc') || 'மாலை வணக்கம்! உங்கள் மனநிலை எப்படி இருக்கிறது? 8 டம்ளர் முடிச்சிட்டீங்களா?'
    },
    {
      id: 'slot_2000',
      time: '08:00 PM',
      icon: <Pill size={16} color="#7c3aed" />,
      label: t('slot4Title') || 'Dinner Time Check & Prescribed Evening Meds',
      desc: t('slot4Desc') || 'இரவு உணவு சாப்பிட்டீர்களா? மாலை மாத்திரைகளை எடுத்துக்கொண்டீர்களா?'
    },
    {
      id: 'slot_2200',
      time: '10:00 PM',
      icon: <Moon size={16} color="#4f46e5" />,
      label: t('slot5Title') || 'Bedtime Routine, Screen Disconnect & Sleep',
      desc: t('slot5Desc') || 'தூங்கும் நேரம்! உங்கள் கண்களுக்கு ஓய்வு கொடுத்து நிம்மதியாக உறங்கவும்.'
    }
  ];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '28px',
        borderRadius: 'var(--radius-lg)',
        background: isAdmin
          ? 'linear-gradient(135deg, #18181b 0%, #27272a 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(253,242,248,0.95) 100%)',
        color: isAdmin ? '#ffffff' : 'var(--text-primary)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '18px',
        border: isAdmin ? '1px solid #3f3f46' : '1px solid var(--pink-200)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <BrandWingsLogo size={58} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.85rem', color: isAdmin ? '#ffffff' : 'var(--text-primary)', margin: 0 }}>
                {t('settingsTitle')}
              </h1>
              <span style={{
                fontSize: '0.74rem',
                padding: '3px 10px',
                borderRadius: '12px',
                background: isAdmin ? '#f43f5e' : 'var(--pink-100)',
                color: isAdmin ? '#ffffff' : 'var(--pink-700)',
                fontWeight: 700
              }}>
                {isAdmin ? `🛡️ ${t('adminViewMode')}` : `👤 ${t('userViewMode')}`}
              </span>
            </div>
            <p style={{ fontSize: '0.92rem', color: isAdmin ? '#a1a1aa' : 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              {t('settingsDesc')}
            </p>
          </div>
        </div>

        {/* Global View Mode Switcher in Settings */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: isAdmin ? '#09090b' : '#f1f5f9',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setViewMode('user')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: viewMode === 'user' ? 'white' : 'transparent',
              color: viewMode === 'user' ? 'var(--rose-primary)' : '#64748b',
              fontWeight: viewMode === 'user' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            👤 {t('userViewMode')}
          </button>
          <button
            onClick={() => setViewMode('admin')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: viewMode === 'admin' ? 'var(--rose-gradient)' : 'transparent',
              color: viewMode === 'admin' ? 'white' : '#64748b',
              fontWeight: viewMode === 'admin' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🛡️ {t('adminViewMode')}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ADMINISTRATOR ONLY: SYSTEM DATABASE & AUDIT TELEMETRY CARD   */}
      {/* ============================================================ */}
      {isAdmin && (
        <div className="glass-card" style={{
          padding: '26px',
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid #f43f5e',
          boxShadow: '0 8px 32px rgba(244,63,94,0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server size={22} color="#f43f5e" />
              <div>
                <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                  🛡️ {t('adminTelemetryTitle')}
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#a1a1aa', margin: 0 }}>
                  {t('adminTelemetrySubtitle')}
                </p>
              </div>
            </div>

            <button
              onClick={handleExportSystemAudit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--rose-gradient)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '9px 18px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(244,63,94,0.4)'
              }}
            >
              <Download size={14} />
              <span>Export System Audit Log (JSON)</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#27272a', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('totalUsersMetric')}</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f43f5e', marginTop: '2px' }}>
                {t('activeUsersCount')}
              </div>
            </div>

            <div style={{ background: '#27272a', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('serverStatusMetric')}</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                {t('serverLatency')}
              </div>
            </div>

            <div style={{ background: '#27272a', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('iotPacketsMetric')}</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
                {t('iotStreaming')}
              </div>
            </div>

            <div style={{ background: '#27272a', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('emergencyReadinessMetric')}</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24', marginTop: '2px' }}>
                {t('sosStandby')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. VISUAL THEME SELECTION */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Palette size={20} color="var(--rose-primary)" />
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              {t('themeHeading')}
            </h2>
          </div>
          <span style={{ fontSize: '0.8rem', padding: '3px 10px', borderRadius: '12px', background: 'var(--pink-50)', color: 'var(--pink-700)', fontWeight: 600 }}>
            {themes.find((th) => th.id === theme)?.name || 'Soft Pink'}
          </span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          {t('themeSubheading')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {themes.map((th) => {
            const isSelected = theme === th.id;
            return (
              <button
                key={th.id}
                onClick={() => setTheme(th.id)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? `2.5px solid ${th.primary}` : '1px solid var(--border-subtle)',
                  background: th.bg,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {isSelected && (
                  <span style={{ position: 'absolute', top: '10px', right: '12px', color: th.primary, fontWeight: 800, fontSize: '0.85rem' }}>
                    ✓
                  </span>
                )}
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: th.id === 'onyx-black' ? '#ffffff' : '#1e293b', marginBottom: '4px' }}>
                  {th.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PROFILE AVATAR PHOTO SELECTION (Requested: Girl with Wings & Girl Hugging Knees) */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="var(--rose-primary)" />
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              {language === 'ta' ? '👤 ப்ரொஃபைல் புகைப்படம் (Profile Avatar)' : '👤 Profile Avatar & Portrait'}
            </h2>
          </div>
          <span style={{ fontSize: '0.8rem', padding: '3px 10px', borderRadius: '12px', background: 'var(--pink-50)', color: 'var(--pink-700)', fontWeight: 600 }}>
            {avatarOptions.find((a) => a.id === profileAvatar)?.title || (language === 'ta' ? '👤 பெயர் முதல் எழுத்து' : '👤 Classic Initial')}
          </span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          {language === 'ta'
            ? 'உங்கள் கணக்கிற்கான எளிய மற்றும் தூய சுயவிவர அடையாளத்தைத் தேர்வு செய்யவும்.'
            : 'Select your personal profile style: Classic initial monogram badge or gentle cramp-relief posture.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {avatarOptions.map((av) => {
            const isSelected = profileAvatar === av.id;
            return (
              <button
                key={av.id}
                onClick={() => setProfileAvatar(av.id)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2.5px solid var(--rose-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--pink-50)' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 16px rgba(225, 29, 72, 0.15)' : 'none'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: isSelected ? '2px solid var(--rose-primary)' : '1.5px solid var(--pink-200)',
                  background: 'var(--pink-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  {av.img ? (
                    <img src={av.img} alt={av.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--rose-primary)' }}>
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'J'}
                    </span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-dark)' }}>
                      {av.title}
                    </div>
                    {isSelected && <span style={{ color: 'var(--rose-primary)', fontWeight: 800, fontSize: '0.9rem' }}>✓</span>}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                    {av.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. LOGO ARTWORK SELECTION */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="var(--rose-primary)" />
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              {t('logoHeading')}
            </h2>
          </div>
          <span style={{ fontSize: '0.8rem', padding: '3px 10px', borderRadius: '12px', background: 'var(--pink-50)', color: 'var(--pink-700)', fontWeight: 600 }}>
            {logoStyles.find((s) => s.id === logoStyle)?.title || 'Theme-Adaptive'}
          </span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          {t('logoSubheading')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {logoStyles.map((item) => {
            const isSelected = logoStyle === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setLogoStyle(item.id)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2.5px solid var(--rose-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--pink-50)' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <BrandWingsLogo variant={item.variant} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? 'var(--rose-primary)' : 'var(--text-primary)', marginBottom: '2px' }}>
                    {item.title} {isSelected && '✓'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACCESSIBILITY & FONT SIZE SCALING */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Type size={20} color="var(--rose-primary)" />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            {t('typographyHeading')}
          </h2>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          {t('typographySubheading')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '18px' }}>
          {fontOptions.map((f) => {
            const isSelected = fontSize === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFontSize(f.id)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2px solid var(--rose-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--pink-50)' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  fontWeight: 700,
                  fontSize: f.id === 'large' ? '1.1rem' : f.id === 'small' ? '0.88rem' : '0.98rem',
                  color: isSelected ? 'var(--rose-primary)' : 'var(--text-primary)',
                  marginBottom: '2px'
                }}>
                  {f.label} {isSelected && '✓'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {f.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Font Sample Preview */}
        <div style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
            Live Font Preview:
          </span>
          <div style={{ marginTop: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {t('tagline')} (Font Size: <code>{fontSize}</code>)
          </div>
        </div>
      </div>

      {/* 4. DAILY SCHEDULED PHONE NOTIFICATIONS & 10-MINUTE RECURRING SMS ENGINE */}
      <div className="glass-card" style={{
        padding: '26px',
        background: 'linear-gradient(135deg, #ffffff 0%, #fffbfd 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--pink-200)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={22} color="#e11d48" />
            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                {t('notificationsHeading')}
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '3px 0 0 0' }}>
                {t('notificationsSubheading')} <strong style={{ color: '#be123c' }}>{userPhone}</strong> & <strong>{motherName} ({motherPhone})</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSendTestNotification}
              style={{
                background: testNotificationSent ? '#10b981' : 'white',
                color: testNotificationSent ? 'white' : 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} />
              <span>{testNotificationSent ? 'SMS Sent!' : t('sendTestSMS')}</span>
            </button>

            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                style={{
                  background: 'var(--rose-gradient)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)'
                }}
              >
                <MessageSquare size={15} />
                <span>{t('viewDailyFeed')}</span>
              </button>
            )}
          </div>
        </div>

        {/* 4A. REGISTERED PHONE & LINKED MOTHER CONTACT (EDITABLE WITH INSTANT SAVE) */}
        <form
          onSubmit={handleSavePhoneNumbers}
          style={{
            padding: '18px 20px',
            borderRadius: 'var(--radius-md)',
            background: '#fff7ed',
            border: '1.5px solid #fdba74',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#c2410c" />
              <strong style={{ fontSize: '0.96rem', color: '#9a3412' }}>
                🔗 {t('linkedContactsTitle')}
              </strong>
            </div>
            <span style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: '8px', background: '#fed7aa', color: '#7c2d12', fontWeight: 700 }}>
              {language === 'ta' ? 'இரட்டை SMS வழித்தடம் இயக்கத்தில் உள்ளது' : 'Dual Alert Route Active'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#c2410c', marginBottom: '4px' }}>
                👤 {t('registeredPhoneLabel')}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+91 98401 23456"
                  required
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #fdba74',
                    background: 'white',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#c2410c', marginBottom: '4px' }}>
                👩‍👧 {t('motherPhoneLabel')}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  value={motherPhoneInput}
                  onChange={(e) => setMotherPhoneInput(e.target.value)}
                  placeholder="+91 98401 65432"
                  required
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #fdba74',
                    background: 'white',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
            <div>
              {numbersSavedAlert ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontWeight: 700, fontSize: '0.82rem' }}>
                  <Check size={16} />
                  <span>{t('numbersSavedMsg')}</span>
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.76rem', color: '#ea580c' }}>
                  {language === 'ta'
                    ? 'எண்ணை மாற்றியதும் சேமிக்கவும். அனைத்து 10-நிமிட மற்றும் அவசர SMS அலர்ட்டுகளும் இந்த புதிய எண்களுக்கே செல்லும்.'
                    : 'Changes synchronize immediately across local storage and the 10-minute continuous SMS engine.'}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a
                href={`sms:${(userPhone || '+919840123456').replace(/[^0-9+]/g, '')}?body=${encodeURIComponent(
                  language === 'ta'
                    ? `வணக்கம் Janani! 🌸 10 நிமிட நேரடி SMS அலர்ட்: தண்ணி குடிச்சியா? 8 டம்ளர் முடிச்சிட்டியா? உடலை நீரேற்றத்துடன் வைத்துக்கொள்.`
                    : `Hello Janani! 🌸 10-Minute live SMS check-in: Did you drink water? Reached 8 glasses goal? Stay hydrated.`
                )}`}
                style={{
                  background: '#0284c7',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                }}
                title="உங்கள் மொபைல் போனின் சொந்த SMS செயலியில் உடனே திறக்க"
              >
                <Smartphone size={14} />
                <span>{language === 'ta' ? '📲 போன் SMS ஆப்' : '📲 Open in Phone SMS'}</span>
              </a>

              <button
                type="submit"
                style={{
                  background: '#ea580c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)'
                }}
              >
                <Check size={14} />
                <span>{t('saveNumbersBtn')}</span>
              </button>
            </div>
          </div>
        </form>

        {/* 4B. 10-MINUTE CONTINUOUS SMS ALERT ENGINE CARD */}
        <div style={{
          padding: '18px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          border: '1.5px solid #86efac',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#059669',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
            }}>
              <Zap size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong style={{ fontSize: '1.02rem', color: '#065f46' }}>
                  {t('sms10MinHeading')}
                </strong>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: is10MinActive ? '#dcfce7' : '#f1f5f9',
                  color: is10MinActive ? '#15803d' : '#64748b',
                  fontWeight: 700,
                  border: is10MinActive ? '1px solid #86efac' : '1px solid #cbd5e1'
                }}>
                  {is10MinActive ? `● ${t('active10MinBadge')}` : `○ ${t('paused10MinBadge')}`}
                </span>
                <span style={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: '#15803d',
                  color: 'white'
                }}>
                  ⏱️ {countdownText}
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#047857', maxWidth: '620px', lineHeight: 1.4 }}>
                {t('sms10MinDesc')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={trigger10MinAlertNow}
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
              }}
            >
              <Sparkles size={14} />
              <span>{t('trigger10MinBtn')}</span>
            </button>

            <button
              type="button"
              onClick={toggle10MinCycle}
              style={{
                background: is10MinActive ? '#fee2e2' : '#dcfce7',
                color: is10MinActive ? '#b91c1c' : '#15803d',
                border: is10MinActive ? '1px solid #fca5a5' : '1px solid #86efac',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {is10MinActive ? (language === 'ta' ? 'நிறுத்து' : 'Pause Cycle') : (language === 'ta' ? 'தொடங்கு' : 'Resume Cycle')}
            </button>
          </div>
        </div>

        {/* 4C. 5 SCHEDULED DAILY SLOTS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {language === 'ta' ? '⏰ 5 தினசரி நிலையான நேரங்கள்:' : '⏰ 5 Daily Fixed Routine Times:'}
          </span>
          {notificationSchedule.map((slot) => {
            const isEnabled = slotSettings[slot.id] !== false;
            return (
              <div
                key={slot.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isEnabled ? 'white' : 'rgba(240, 240, 240, 0.6)',
                  border: isEnabled ? '1px solid var(--pink-200)' : '1px solid #e5e7eb',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isEnabled ? 'var(--pink-50)' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {slot.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: isEnabled ? '#fee2e2' : '#e5e7eb',
                        color: isEnabled ? '#dc2626' : '#6b7280',
                        fontSize: '0.76rem',
                        fontWeight: 700
                      }}>
                        {slot.time}
                      </span>
                      <strong style={{ fontSize: '0.9rem', color: isEnabled ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {slot.label}
                      </strong>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: isEnabled ? 'var(--text-secondary)' : '#9ca3af', margin: '3px 0 0 0' }}>
                      {slot.desc}
                    </p>
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => toggleSlot(slot.id)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--rose-primary)', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isEnabled ? 'var(--rose-primary)' : '#9ca3af' }}>
                    {isEnabled ? (language === 'ta' ? 'இயங்குகிறது' : 'Enabled') : (language === 'ta' ? 'இடைநிறுத்தப்பட்டது' : 'Paused')}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. PLATFORM LANGUAGE */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Globe size={20} color="var(--rose-primary)" />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            {t('languageHeading')}
          </h2>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          {t('languageSubheading')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
          {languages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                style={{
                  padding: '14px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2.5px solid var(--rose-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--pink-50)' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {isSelected && (
                  <span style={{ position: 'absolute', top: '6px', right: '8px', color: 'var(--rose-primary)', fontSize: '0.75rem', fontWeight: 800 }}>
                    ✓
                  </span>
                )}
                <strong style={{ fontSize: '1.05rem', color: isSelected ? 'var(--rose-primary)' : 'var(--text-primary)' }}>
                  {l.native}
                </strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{l.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. MENSTRUAL CYCLE & LUTEAL PERSONALIZATION */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Sliders size={20} color="var(--rose-primary)" />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            {t('cycleSettingsTitle')}
          </h2>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          {language === 'ta'
            ? 'உங்கள் இயற்கையான உடல் முறைக்கு ஏற்ப மாதவிடாய் சுழற்சி நீளம், லூட்டியல் நிலை மற்றும் தினசரி நீர் இலக்கை சரிசெய்யவும்.'
            : 'Personalize your cycle prediction algorithms, luteal phase length, and daily hydration baseline.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Cycle Length Slider */}
          <div style={{ padding: '16px', background: '#fff1f2', borderRadius: 'var(--radius-md)', border: '1px solid #fecdd3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#881337' }}>
                {t('cycleLengthSlider')}
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#be123c' }}>
                {cycleLength} {language === 'ta' ? 'நாட்கள்' : 'days'}
              </span>
            </div>
            <input
              type="range"
              min="21"
              max="35"
              value={cycleLength}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCycleLength(val);
                localStorage.setItem('femtech_cycle_length', String(val));
              }}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#e11d48' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
              <span>21 {language === 'ta' ? 'குறுகிய' : 'Short'}</span>
              <span>28 {language === 'ta' ? 'சராசரி' : 'Typical'}</span>
              <span>35 {language === 'ta' ? 'நீண்ட' : 'Long'}</span>
            </div>
          </div>

          {/* Luteal Phase Length Slider */}
          <div style={{ padding: '16px', background: '#fdf4ff', borderRadius: 'var(--radius-md)', border: '1px solid #f5d0fe' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#701a75' }}>
                {t('lutealLengthSlider')}
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#a21caf' }}>
                {lutealLength} {language === 'ta' ? 'நாட்கள்' : 'days'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="16"
              value={lutealLength}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLutealLength(val);
                localStorage.setItem('femtech_luteal_length', String(val));
              }}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#c026d3' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
              <span>10 {language === 'ta' ? 'குறைந்த' : 'Min'}</span>
              <span>14 {language === 'ta' ? 'நிலையான' : 'Standard'}</span>
              <span>16 {language === 'ta' ? 'அதிகபட்ச' : 'Max'}</span>
            </div>
          </div>

          {/* Water Target Slider */}
          <div style={{ padding: '16px', background: '#f0fdfa', borderRadius: 'var(--radius-md)', border: '1px solid #ccfbf1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#134e4a' }}>
                {t('waterTargetSlider')}
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f766e' }}>
                {waterTarget} {language === 'ta' ? 'டம்ளர்கள் (2.0L)' : 'Glasses (2.0L)'}
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="14"
              value={waterTarget}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWaterTarget(val);
                localStorage.setItem('femtech_water_target', String(val));
              }}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#0d9488' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
              <span>6 {language === 'ta' ? '1.5 லிட்டர்' : '1.5L'}</span>
              <span>8 {language === 'ta' ? '2.0 லிட்டர்' : '2.0L'}</span>
              <span>14 {language === 'ta' ? '3.5 லிட்டர்' : '3.5L'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. SMART WATCH & BIOMETRIC TELEMETRY SYNC */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Activity size={20} color="var(--rose-primary)" />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            {t('wearableSettingsTitle')}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Sync Interval Picker */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {t('syncIntervalTitle')}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {language === 'ta' ? 'வாட்ச் சென்சார்களில் இருந்து பேக்கெண்ட் தரவு பதிவாகும் சுழற்சி' : 'Frequency of automatic Bluetooth vitals synchronization'}
              </div>
            </div>
            <select
              value={syncInterval}
              onChange={(e) => {
                setSyncInterval(e.target.value);
                localStorage.setItem('femtech_sync_interval', e.target.value);
              }}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.85rem' }}
            >
              <option value="5m">{language === 'ta' ? 'ஒவ்வொரு 5 நிமிடங்கள்' : 'Every 5 Minutes'}</option>
              <option value="15m">{language === 'ta' ? 'ஒவ்வொரு 15 நிமிடங்கள் (பரிந்துரை)' : 'Every 15 Minutes (Default)'}</option>
              <option value="1h">{language === 'ta' ? 'ஒவ்வொரு 1 மணி நேரம்' : 'Every 1 Hour'}</option>
            </select>
          </div>

          {/* Arrhythmia Alert Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {t('arrhythmiaAlert')}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {language === 'ta' ? 'ஓய்வு இதயத் துடிப்பு > 100 அல்லது < 50 ஆகும்போது உடனடி எச்சரிக்கை' : 'Instant alert if resting heart rate exceeds 100 or drops below 50 BPM'}
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={arrhythmiaAlert}
                onChange={(e) => {
                  setArrhythmiaAlert(e.target.checked);
                  localStorage.setItem('femtech_arrhythmia_alert', String(e.target.checked));
                }}
                style={{ width: '18px', height: '18px', accentColor: 'var(--rose-primary)' }}
              />
            </label>
          </div>

          {/* Continuous Nocturnal BBT Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {t('bbtNocturnal')}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {language === 'ta' ? 'அண்டவிடுப்பு மாற்றத்தை துல்லியமாக கணிக்க இரவு நேர தோல் வெப்பநிலை பதிவு' : 'Continuous overnight skin temperature recording for ovulation shift detection'}
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={nocturnalBBT}
                onChange={(e) => {
                  setNocturnalBBT(e.target.checked);
                  localStorage.setItem('femtech_nocturnal_bbt', String(e.target.checked));
                }}
                style={{ width: '18px', height: '18px', accentColor: 'var(--rose-primary)' }}
              />
            </label>
          </div>

          {/* Fall Detection & Emergency SOS Shake Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {t('fallDetection')}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {language === 'ta' ? 'திடீர் அதிர்வு அல்லது வாட்ச் குலுக்கல் ஏற்பட்டால் தானாக 3 SOS எண்களுக்கும் எச்சரிக்கை' : 'Automatic emergency SMS broadcast to all 3 contacts upon violent shock or shake'}
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={fallDetection}
                onChange={(e) => {
                  setFallDetection(e.target.checked);
                  localStorage.setItem('femtech_fall_detection', String(e.target.checked));
                }}
                style={{ width: '18px', height: '18px', accentColor: 'var(--rose-primary)' }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* 8. CLINICAL VAULT & HEALTH DATA EXPORT */}
      <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Database size={20} color="var(--rose-primary)" />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            {t('vaultSettingsTitle')}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Biometric App Lock Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#fdf2f8', borderRadius: 'var(--radius-md)', border: '1px solid #fbcfe8' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#9d174d' }}>
                {t('biometricLock')}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {language === 'ta' ? 'மருத்துவ விவரங்கள் மற்றும் பெட்டகத்தை கைரேகை / முக அடையாளத்துடன் பூட்டுக' : 'Require fingerprint / FaceID sensor authentication to open sensitive records'}
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={biometricLock}
                onChange={(e) => {
                  setBiometricLock(e.target.checked);
                  localStorage.setItem('femtech_biometric_lock', String(e.target.checked));
                }}
                style={{ width: '18px', height: '18px', accentColor: 'var(--rose-primary)' }}
              />
            </label>
          </div>

          {/* Export Clinical Report Button */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '16px', background: '#f0fdf4', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#166534' }}>
                {t('exportClinicalReport')}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#15803d' }}>
                {language === 'ta' ? 'அனைத்து 12 உடலியல் அளவீடுகள் மற்றும் மருந்து வரலாற்றை மருத்துவ ஆலோசனைகளுக்காக பதிவிறக்குக' : 'Download complete 12 biometric parameters, medications, and cycle records'}
              </div>
            </div>
            <button
              onClick={handleExportClinicalReport}
              className="btn-primary"
              style={{
                background: '#16a34a',
                padding: '10px 20px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Download size={16} />
              <span>{t('exportClinicalReport')}</span>
            </button>
          </div>

          {exportNotice && (
            <div style={{ padding: '10px 14px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}>
              {t('exportReportSuccess')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
