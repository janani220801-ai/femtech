import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useViewMode } from '../../context/ViewModeContext';
import { api } from '../../services/api';
import {
  CalendarHeart,
  Droplet,
  Heart,
  Watch,
  Activity,
  Sparkles,
  Bot,
  Plus,
  ArrowRight,
  TrendingUp,
  FileUp,
  FolderLock,
  Baby,
  Pill,
  Smile,
  Zap,
  Moon,
  Clock,
  Sparkle,
  Compass
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';
import BrandWingsLogo from '../common/BrandWingsLogo';


export const DASH_I18N = {
  en: {
    hubBadge: 'Daily Wellness Hub',
    cyclePhase: 'Cycle Day 14 • Ovulatory Phase',
    userDashboard: (name) => `${name}’s Health Dashboard`,
    balanceDesc: 'Your biometrics, hydration rhythm, and hormonal cycle are currently in optimal balance.',
    postBreakfast: 'Post-Breakfast',
    appointmentTime: 'Oct 04, 2026 at 11:00 AM'
  },
  ta: {
    hubBadge: 'இன்றைய நல்வாழ்வு மையம்',
    cyclePhase: 'சுழற்சி நாள் 14 • அண்டவிடுப்பின் நிலை',
    userDashboard: (name) => `${name} அவர்களின் நல்வாழ்வுப் பலகை`,
    balanceDesc: 'உங்கள் உடலியல் அளவீடுகள், நீர்ச்சத்து மற்றும் சுழற்சி சீரான நிலையில் உள்ளன.',
    postBreakfast: 'காலை உணவுக்குப் பின்',
    appointmentTime: 'அக் 04, 2026 காலை 11:00 மணிக்கு'
  },
  hi: {
    hubBadge: 'दैनिक स्वास्थ्य केंद्र',
    cyclePhase: 'मासिक चक्र दिन 14 • ओव्यूलेशन चरण',
    userDashboard: (name) => `${name} का स्वास्थ्य डैशबोर्ड`,
    balanceDesc: 'आपकी शारीरिक बायोमेट्रिक्स, जलयोजन और हार्मोनल चक्र संतुलित अवस्था में हैं।',
    postBreakfast: 'नाश्ते के बाद',
    appointmentTime: '04 अक्टूबर, 2026 सुबह 11:00 बजे'
  },
  te: {
    hubBadge: 'రోజువారీ ఆరోగ్య కేంద్రం',
    cyclePhase: 'చక్రం రోజు 14 • అండోత్సర్గము దశ',
    userDashboard: (name) => `${name} ఆరోగ్య డ్యాష్‌బోర్డ్`,
    balanceDesc: 'మీ బయోమెట్రిక్స్, హైడ్రేషన్ మరియు హార్మోన్ చక్రం సమతుల్యంగా ఉన్నాయి.',
    postBreakfast: 'అల్పాహారం తర్వాత',
    appointmentTime: 'అక్టోబర్ 04, 2026 ఉదయం 11:00 గంటలకు'
  },
  ml: {
    hubBadge: 'ദിനചര്യ ആരോഗ്യ കേന്ദ്രം',
    cyclePhase: 'ചക്ര ദിനം 14 • ഓവുലേഷൻ ഘട്ടം',
    userDashboard: (name) => `${name} ആരോഗ്യ ഡാഷ്‌ബോർഡ്`,
    balanceDesc: 'നിങ്ങളുടെ ബയോമെട്രിക്സ്, ജലാംശം, ഹോർമോൺ ചക്രം എന്നിവ സന്തുലിതാവസ്ഥയിലാണ്.',
    postBreakfast: 'പ്രാതലിന് ശേഷം',
    appointmentTime: 'ഒക്ടോബർ 04, 2026 രാവിലെ 11:00-ന്'
  },
  mr: {
    hubBadge: 'दैनिक आरोग्य केंद्र',
    cyclePhase: 'मासिक पाळी दिवस 14 • ओव्ह्युलेशन टप्पा',
    userDashboard: (name) => `${name} चे आरोग्य डॅशबोर्ड`,
    balanceDesc: 'तुमची बायोमेट्रिक्स, हायड्रेशन आणि संप्रेरक चक्र संतुलित स्थितीत आहेत.',
    postBreakfast: 'नाश्त्यानंतर',
    appointmentTime: '०४ ऑक्टोबर २०२६ सकाळी ११:०० वाजता'
  },
  mwr: {
    hubBadge: 'दैनिक स्वास्थ्य केंद्र',
    cyclePhase: 'चक्र दिन 14 • ओव्यूलेशन चरण',
    userDashboard: (name) => `${name} रो स्वास्थ्य डैशबोर्ड`,
    balanceDesc: 'थांकी बायोमेट्रिक्स, पाणी अर हार्मोनल चक्र एकदम सही संतुलन में है।',
    postBreakfast: 'जीमण पछै',
    appointmentTime: '04 अक्टूबर 2026 सबारे 11:00 बजे'
  },
  fr: {
    hubBadge: 'Pôle Bien-être Quotidien',
    cyclePhase: "Jour du Cycle 14 • Phase d'Ovulation",
    userDashboard: (name) => `Tableau de bord de santé de ${name}`,
    balanceDesc: 'Vos biométries, votre hydratation et votre cycle hormonal sont en parfait équilibre.',
    postBreakfast: 'Après petit-déjeuner',
    appointmentTime: '04 Oct 2026 à 11h00'
  },
  lb: {
    hubBadge: 'مركز العافية اليومي',
    cyclePhase: 'يوم الدورة 14 • مرحلة الإباضة',
    userDashboard: (name) => `لوحة الصحة الخاصة بـ ${name}`,
    balanceDesc: 'مؤشراتك الحيوية ومستوى الترطيب ودورتك الهرمونية في حالة توازن مثالية.',
    postBreakfast: 'بعد الإفطار',
    appointmentTime: '04 تشرين الأول 2026 الساعة 11:00 صباحاً'
  },
  ar: {
    hubBadge: 'مركز الصحة اليومي',
    cyclePhase: 'اليوم 14 من الدورة • مرحلة الإباضة',
    userDashboard: (name) => `لوحة المؤشرات الصحية لـ ${name}`,
    balanceDesc: 'قياساتك الحيوية ومستوى ترطيب الجسم ودورتك الشهرية في توازن مثالي.',
    postBreakfast: 'بعد وجبة الإفطار',
    appointmentTime: '04 أكتوبر 2026 الساعة 11:00 صباحاً'
  }
};

export default function MainDashboard({ onNavigate, onOpenNotifications }) {
  const { user } = useAuth();
  const { t, isRtl, language } = useLanguage();
  const dDict = DASH_I18N[language] || DASH_I18N.en;
  const { viewMode, isAdmin } = useViewMode();

  const [cycleData, setCycleData] = useState({
    cycleDay: 14,
    lastPeriod: '2026-09-10',
    estimatedNext: '2026-10-08',
    daysUntilNext: 14
  });

  const [wellnessData, setWellnessData] = useState(() => {
    const savedMood = localStorage.getItem('femtech_quick_mood') || 'happy';
    const savedWater = Number(localStorage.getItem('femtech_quick_water')) || 6;
    return {
      mood: savedMood,
      painLevel: 1,
      energy: 'high',
      waterGlasses: savedWater,
      waterTarget: 8,
      sleepHours: 7.5,
      symptoms: ['Hydrated & Tracking']
    };
  });

  const [wearableData, setWearableData] = useState({
    heartRate: 74,
    systolic: 118,
    diastolic: 76,
    hrv: 62,
    skinTemp: 36.6,
    steps: 6840,
    runningKm: 1.8,
    joggingKm: 2.2,
    calories: 420,
    isDemo: true
  });

  const [activeMeds, setActiveMeds] = useState([
    { id: 1, name: 'Folic Acid & Vit D3', dose: '400 mcg', time: 'Morning after food' }
  ]);

  const [upcomingAppointment, setUpcomingAppointment] = useState({
    doctor: t('doctorTitle'),
    clinic: t('clinicName'),
    date: 'Oct 04, 2026',
    time: '11:00 AM'
  });

  // Fetch live user data on mount
  useEffect(() => {
    const fetchDashboardState = async () => {
      try {
        const [cycleRes, dailyRes, wearRes, medRes] = await Promise.allSettled([
          api.get('/cycle/latest'),
          api.get('/daily/today'),
          api.get('/wearable/data'),
          api.get('/medications')
        ]);

        if (cycleRes.status === 'fulfilled' && cycleRes.value.success && cycleRes.value.hasData) {
          const rec = cycleRes.value.latestRecord;
          setCycleData({
            cycleDay: cycleRes.value.currentCycleDay || 1,
            lastPeriod: rec.startDate ? new Date(rec.startDate).toISOString().split('T')[0] : '2026-09-10',
            estimatedNext: rec.estimatedNextPeriod ? new Date(rec.estimatedNextPeriod).toISOString().split('T')[0] : '2026-10-08',
            daysUntilNext: cycleRes.value.daysUntilNext || 14
          });
        }

        if (dailyRes.status === 'fulfilled' && dailyRes.value.success && dailyRes.value.log) {
          const l = dailyRes.value.log;
          setWellnessData({
            mood: l.mood || 'happy',
            painLevel: l.painLevel ?? 1,
            energy: l.energy || 'high',
            waterGlasses: l.waterGlasses || 6,
            waterTarget: l.waterTarget || 8,
            sleepHours: l.sleep?.hours || 7.5,
            symptoms: l.symptoms || ['Tracking']
          });
        }

        if (wearRes.status === 'fulfilled' && wearRes.value.success && wearRes.value.data) {
          const w = wearRes.value.data;
          setWearableData({
            heartRate: w.heartRate || 74,
            systolic: w.bloodPressure?.systolic || 118,
            diastolic: w.bloodPressure?.diastolic || 76,
            hrv: w.hrv || 60,
            skinTemp: w.skinTemperature || 36.6,
            steps: w.steps || 6400,
            runningKm: w.runningDistance || 1.8,
            joggingKm: w.joggingDistance || 2.0,
            calories: w.calories || 400,
            isDemo: w.isDemo
          });
        }

        if (medRes.status === 'fulfilled' && medRes.value.success && medRes.value.current?.length > 0) {
          setActiveMeds(medRes.value.current);
        }
      } catch (err) {
        console.warn('Dashboard fetch fallback to default demo data:', err.message);
      }
    };

    fetchDashboardState();
  }, []);

  const handleQuickAddWater = async () => {
    const updated = Math.min(wellnessData.waterTarget, wellnessData.waterGlasses + 1);
    setWellnessData((prev) => ({ ...prev, waterGlasses: updated }));
    localStorage.setItem('femtech_quick_water', String(updated));
    try {
      await api.post('/daily/save', { waterGlasses: updated });
    } catch (err) {
      console.warn('Water quick-save fallback:', err.message);
    }
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'happy': return t('moodHappy');
      case 'calm': return t('moodCalm');
      case 'sad': return t('moodSad');
      case 'stressed': return t('moodStressed');
      case 'energetic': return t('moodEnergetic');
      case 'tired': return t('moodTired');
      default: return t('moodHappy');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greetingMorning');
    if (hour < 17) return t('greetingAfternoon');
    return t('greetingEvening');
  };

  const getAgeGuideLabel = () => {
    const age = user?.age || 20;
    if (age <= 10) return t('growingUp8') || 'Growing Up (Age 8)';
    if (age <= 14) return t('pubertyGuide12') || 'Puberty Guide (Age 12)';
    if (age <= 19) return t('teenWellness') || 'Teen Wellness';
    return t('adultHealthHub') || 'Adult Health Hub';
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Personalized Welcome Banner with Freedom Wings Logo */}
      <div className="glass-card" style={{
        padding: '28px 32px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 242, 242, 0.95) 100%)',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.7rem',
            boxShadow: '0 4px 14px rgba(244, 63, 94, 0.25)',
            color: 'white',
            flexShrink: 0
          }}>
            🌸
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, background: '#ffe4e6', color: '#be123c', padding: '2px 8px', borderRadius: '12px' }}>
                {dDict.hubBadge}
              </span>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#059669', background: '#dcfce7', padding: '2px 8px', borderRadius: '12px' }}>
                {dDict.cyclePhase}
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
              {dDict.userDashboard(user?.name ? user.name.split(' ')[0] : (language === 'ta' ? 'ஜனனி' : (language === 'hi' ? 'जननी' : 'Janani')))}
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              {dDict.balanceDesc}
            </p>
          </div>
        </div>

        {/* Personalized Health Guide & SMS Notification Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              style={{
                fontSize: '0.85rem',
                padding: '8px 16px',
                background: 'white',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <span>📱 {t('smsAlerts')}</span>
              <span style={{
                background: 'var(--rose-primary)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '10px'
              }}>5</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('health-guide')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 18px', background: 'white' }}
          >
            <span>{t('healthGuide')} ({getAgeGuideLabel()})</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Administrator System & Server Telemetry Card (When Admin View is Active) */}
      {isAdmin && (
        <div className="glass-card" style={{
          padding: '22px 28px',
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid #f43f5e',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(244,63,94,0.22)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#f43f5e', padding: '6px', borderRadius: '10px', color: 'white' }}>
                <Activity size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  🛡️ {t('adminTelemetryTitle')}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>
                  {t('adminTelemetrySubtitle')}
                </span>
              </div>
            </div>
            <span style={{ background: '#10b981', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '10px' }}>
              API: ONLINE (12ms)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#27272a', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('totalUsersMetric')}</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f43f5e', marginTop: '2px' }}>{t('activeUsersCount')}</div>
            </div>
            <div style={{ background: '#27272a', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('serverStatusMetric')}</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>{t('serverLatency')}</div>
            </div>
            <div style={{ background: '#27272a', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('iotPacketsMetric')}</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>{t('iotStreaming')}</div>
            </div>
            <div style={{ background: '#27272a', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{t('emergencyReadinessMetric')}</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24', marginTop: '2px' }}>{t('sosStandby')}</div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTIONS ROW */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--rose-primary)" />
          <span>{t('quickActions')}</span>
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px'
        }}>
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              className="glass-card"
              style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>📲</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('dailySMS')}</div>
            </button>
          )}

          <button
            onClick={() => onNavigate('divas-meeting')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>💬</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('divasMeeting') || t('deepasMeeting') || "Diva's Meeting"}</div>
          </button>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>🤖</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('askAI')}</div>
          </button>

          <button
            onClick={() => onNavigate('cycle-tracker')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>🩸</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('trackPeriod')}</div>
          </button>

          <button
            onClick={() => onNavigate('daily-log')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>💖</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('logMood')}</div>
          </button>

          <button
            onClick={handleQuickAddWater}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>💧</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('addWater')}</div>
          </button>

          <button
            onClick={() => onNavigate('pregnancy')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>🤰</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('pregnancyCheck')}</div>
          </button>

          <button
            onClick={() => onNavigate('thyroid-check')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>🦋</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('thyroidCheck')}</div>
          </button>

          <button
            onClick={() => onNavigate('pcos-check')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>🩺</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('pcosCheck')}</div>
          </button>

          <button
            onClick={() => onNavigate('health-vault')}
            className="glass-card"
            style={{ padding: '14px 10px', textAlign: 'center', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'white' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>📁</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--rose-primary)' }}>{t('healthVault')}</div>
          </button>
        </div>
      </div>

      {/* CORE FOUR TILES: CYCLE, WELLNESS, WEARABLE, HEALTH */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {/* 1. CYCLE TILE */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--pink-100)', padding: '8px', borderRadius: '12px', color: 'var(--rose-primary)' }}>
                  <CalendarHeart size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{t('menstrualCycle')}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('patternPrediction')}</span>
                </div>
              </div>
              <span className="badge badge-pink">{t('regular')}</span>
            </div>

            <div style={{ textAlign: 'center', padding: '14px 0', borderBottom: '1px solid var(--pink-100)', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t('currentCycleDay')}
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--rose-primary)', lineHeight: '1.1' }}>
                {t('day')} {cycleData.cycleDay}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {t('estimatedNextPeriodIn')}{cycleData.daysUntilNext} {t('days')}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>{t('lastPeriod')}</span>
                <strong>{cycleData.lastPeriod}</strong>
              </div>
              <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>{t('estimatedNext')}</span>
                <strong style={{ color: 'var(--rose-primary)' }}>{cycleData.estimatedNext}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('cycle-tracker')}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '18px', fontSize: '0.82rem', padding: '8px' }}
          >
            {t('viewCycleCalendar')}
          </button>
        </div>

        {/* 2. WELLNESS TILE */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#fef3c7', padding: '8px', borderRadius: '12px', color: '#b45309' }}>
                  <Smile size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{t('dailyWellness')}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('todayStatus')}</span>
                </div>
              </div>
              <span className="badge badge-lavender">{t('logged')}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--pink-50)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('mood')}:</span>
                <strong>{getMoodEmoji(wellnessData.mood)}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--pink-50)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('painLevel')}:</span>
                <strong style={{ color: wellnessData.painLevel > 4 ? '#e11d48' : '#059669' }}>
                  {wellnessData.painLevel} / 10 ({wellnessData.painLevel <= 3 ? t('mild') : wellnessData.painLevel <= 7 ? t('moderate') : t('severe')})
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--pink-50)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('hydration')}:</span>
                <strong style={{ color: '#0284c7' }}>
                  {wellnessData.waterGlasses} / {wellnessData.waterTarget} {t('glasses')}
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('restfulSleep')}:</span>
                <strong>{wellnessData.sleepHours} {t('hours')}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('daily-log')}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '18px', fontSize: '0.82rem', padding: '8px' }}
          >
            {t('updateDailyLog')}
          </button>
        </div>

        {/* 3. WEARABLE IOT TILE */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#ecfdf5', padding: '8px', borderRadius: '12px', color: '#059669' }}>
                  <Watch size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{t('wearableVitals')}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('iotTelemetry')}</span>
                </div>
              </div>
              <span className="badge badge-demo">{t('demoVitals')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'center' }}>
              <div style={{ background: 'var(--pink-50)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('heartRate')}</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--rose-primary)' }}>
                  {wearableData.heartRate} <span style={{ fontSize: '0.7rem' }}>{t('bpm')}</span>
                </div>
              </div>

              <div style={{ background: 'var(--pink-50)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('bloodPressure')}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {wearableData.systolic}/{wearableData.diastolic}
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('dailySteps')}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#16a34a' }}>
                  {wearableData.steps}
                </div>
              </div>

              <div style={{ background: '#fffbeb', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('skinTemp')}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#d97706' }}>
                  {wearableData.skinTemp}°C
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('wearable')}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '18px', fontSize: '0.82rem', padding: '8px' }}
          >
            {t('connectBluetooth')}
          </button>
        </div>

        {/* 4. HEALTH & APPOINTMENTS TILE */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#f5f3ff', padding: '8px', borderRadius: '12px', color: '#7c3aed' }}>
                  <Pill size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{t('healthMeds')}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('careSchedule')}</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {t('currentPrescription')}
              </span>
              <div style={{
                background: 'white',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '8px 12px',
                marginTop: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{activeMeds[0]?.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {activeMeds[0]?.dose} • {dDict.postBreakfast}
                  </div>
                </div>
                <span className="badge badge-pink">{t('active')}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {t('upcomingAppointment')}
              </span>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 12px',
                marginTop: '4px'
              }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{upcomingAppointment.doctor}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {upcomingAppointment.clinic} • {dDict.appointmentTime}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('medications')}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '18px', fontSize: '0.82rem', padding: '8px' }}
          >
            {t('bookConsultation')}
          </button>
        </div>
      </div>

      {/* AI WELLNESS INSIGHTS & DAILY TIPS - Full Dynamic Content Card */}
      <div className="glass-card" style={{
        padding: '26px 30px',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Bot size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
              {t('aiInsightsTitle')}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              {t('aiInsightsSubtitle')}
            </p>
          </div>
        </div>

        {/* Phase Tip */}
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--pink-50)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '14px'
        }}>
          <strong style={{ color: 'var(--rose-primary)', fontSize: '0.88rem', display: 'block', marginBottom: '4px' }}>
            🌸 {t('phaseFollicular')}
          </strong>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {t('follicularDesc')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: '#f0fdfa', border: '1px solid #ccfbf1' }}>
            <span style={{ fontSize: '0.84rem', color: '#0f766e', lineHeight: 1.4 }}>
              {t('tipHydration')}
            </span>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: '#fefce8', border: '1px solid #fef08a' }}>
            <span style={{ fontSize: '0.84rem', color: '#854d0e', lineHeight: 1.4 }}>
              {t('tipExercise')}
            </span>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: '#f5f3ff', border: '1px solid #ddd6fe' }}>
            <span style={{ fontSize: '0.84rem', color: '#5b21b6', lineHeight: 1.4 }}>
              {t('tipSleep')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
