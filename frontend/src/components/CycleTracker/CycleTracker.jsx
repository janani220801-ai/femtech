import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { CalendarHeart, Plus, AlertCircle, ChevronLeft, ChevronRight, Check, Droplets, Info } from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';
import FirstPeriodTracker from './FirstPeriodTracker';
import MenopauseTracker from './MenopauseTracker';

const CYCLE_I18N = {
  en: {
    symptoms: {
      'Cramps': 'Cramps',
      'Bloating': 'Bloating',
      'Headache': 'Headache',
      'Backache': 'Backache',
      'Acne': 'Acne',
      'Fatigue': 'Fatigue',
      'Breast Tenderness': 'Breast Tenderness',
      'Cravings': 'Cravings'
    },
    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    status: {
      period: 'Period',
      predicted: 'Predicted',
      symptoms: 'Cramp',
      wellness: 'Logged'
    },
    flow: {
      spotting: 'Spotting',
      light: 'Light Flow',
      medium: 'Medium Flow',
      heavy: 'Heavy Flow'
    },
    notesPlaceholder: 'Any extra symptoms or observations...'
  },
  ta: {
    symptoms: {
      'Cramps': 'வயிற்று வலி (Cramps)',
      'Bloating': 'வயிற்று உப்புசம் (Bloating)',
      'Headache': 'தலைவலி (Headache)',
      'Backache': 'முதுகு வலி (Backache)',
      'Acne': 'முகப்பரு (Acne)',
      'Fatigue': 'உடல் சோர்வு (Fatigue)',
      'Breast Tenderness': 'மார்பக மென்மை (Breast)',
      'Cravings': 'உணவு ஈர்ப்பு (Cravings)'
    },
    weekdays: ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச'],
    status: {
      period: 'மாதவிடாய்',
      predicted: 'கணிப்பு',
      symptoms: 'அறிகுறி',
      wellness: 'பதிவானது'
    },
    flow: {
      spotting: 'லேசான புள்ளிகள் (Spotting)',
      light: 'குறைவான இரத்தப்போக்கு (Light)',
      medium: 'நடுத்தர இரத்தப்போக்கு (Medium)',
      heavy: 'அதிக இரத்தப்போக்கு (Heavy)'
    },
    notesPlaceholder: 'கூடுதல் ஆரோக்கிய அவதானிப்புகள்...'
  },
  hi: {
    symptoms: {
      'Cramps': 'पेट दर्द / ऐंठन (Cramps)',
      'Bloating': 'पेट फूलना (Bloating)',
      'Headache': 'सिरदर्द (Headache)',
      'Backache': 'कमर दर्द (Backache)',
      'Acne': 'मुंहासे (Acne)',
      'Fatigue': 'थकान (Fatigue)',
      'Breast Tenderness': 'स्तनों में दर्द (Tenderness)',
      'Cravings': 'खाने की लालसा (Cravings)'
    },
    weekdays: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    status: {
      period: 'माहवारी',
      predicted: 'अनुमानित',
      symptoms: 'ऐंठन',
      wellness: 'दर्ज किया'
    },
    flow: {
      spotting: 'हल्के धब्बे (Spotting)',
      light: 'हल्का बहाव (Light)',
      medium: 'मध्यम बहाव (Medium)',
      heavy: 'भारी बहाव (Heavy)'
    },
    notesPlaceholder: 'अतिरिक्त लक्षण या अवलोकन...'
  },
  te: {
    symptoms: {
      'Cramps': 'కడుపు నొప్పి (Cramps)',
      'Bloating': 'కడుపు ఉబ్బరం (Bloating)',
      'Headache': 'తలనొప్పి (Headache)',
      'Backache': 'నడుము నొప్పి (Backache)',
      'Acne': 'మొటిమలు (Acne)',
      'Fatigue': 'అలసట (Fatigue)',
      'Breast Tenderness': 'రొమ్ముల నొప్పి',
      'Cravings': 'ఆహార కోరికలు'
    },
    weekdays: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
    status: {
      period: 'పీరియడ్',
      predicted: 'అంచనా',
      symptoms: 'నొప్పి',
      wellness: 'నమోదైంది'
    },
    flow: {
      spotting: 'స్పాటింగ్ (Spotting)',
      light: 'తక్కువ స్రావం (Light)',
      medium: 'మధ్యస్థ స్రావం (Medium)',
      heavy: 'ఎక్కువ స్రావం (Heavy)'
    },
    notesPlaceholder: 'అదనపు గమనికలు...'
  },
  ml: {
    symptoms: {
      'Cramps': 'വയറുവേദന (Cramps)',
      'Bloating': 'വയർ വീർക്കൽ',
      'Headache': 'തലവേദന (Headache)',
      'Backache': 'നടുവേദന (Backache)',
      'Acne': 'മുഖക്കുരു (Acne)',
      'Fatigue': 'ക്ഷീണം (Fatigue)',
      'Breast Tenderness': 'സ്തന വേദന',
      'Cravings': 'ഭക്ഷണാസക്തി'
    },
    weekdays: ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'],
    status: {
      period: 'ആർത്തവം',
      predicted: 'പ്രതീക്ഷിക്കുന്നത്',
      symptoms: 'വേദന',
      wellness: 'രേഖപ്പെടുത്തി'
    },
    flow: {
      spotting: 'സ്പോട്ടിംഗ്',
      light: 'കുറഞ്ഞ ഒഴുക്ക്',
      medium: 'ഇടത്തരം ഒഴുക്ക്',
      heavy: 'കൂടിയ ഒഴുക്ക്'
    },
    notesPlaceholder: 'കൂടുതൽ വിവരങ്ങൾ...'
  },
  mr: {
    symptoms: {
      'Cramps': 'पोटदुखी (Cramps)',
      'Bloating': 'पोट फुगणे',
      'Headache': 'डोकेदुखी (Headache)',
      'Backache': 'पाठदुखी (Backache)',
      'Acne': 'मुरुमे (Acne)',
      'Fatigue': 'थकवा (Fatigue)',
      'Breast Tenderness': 'स्तनांमध्ये वेदना',
      'Cravings': 'खाण्याची इच्छा'
    },
    weekdays: ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    status: {
      period: 'मासिक पाळी',
      predicted: 'अपेक्षित',
      symptoms: 'वेदना',
      wellness: 'नोंदवले'
    },
    flow: {
      spotting: 'स्पॉटिंग',
      light: 'कमी प्रवाह',
      medium: 'मध्यम प्रवाह',
      heavy: 'जास्त प्रवाह'
    },
    notesPlaceholder: 'इतर नोंदी...'
  },
  mwr: {
    symptoms: {
      'Cramps': 'पेट दरद (Cramps)',
      'Bloating': 'पेट फूलणो',
      'Headache': 'माथा दरद',
      'Backache': 'कमर दरद',
      'Acne': 'फुंसी',
      'Fatigue': 'थकावट',
      'Breast Tenderness': 'छाती दरद',
      'Cravings': 'जीमवा री इच्छा'
    },
    weekdays: ['रवि', 'सोम', 'मंगल', 'बुध', 'बिरस्पत', 'शुक्र', 'शनी'],
    status: {
      period: 'म्हीनो',
      predicted: 'अनुमानित',
      symptoms: 'दरद',
      wellness: 'दर्ज कियो'
    },
    flow: {
      spotting: 'हल्का छींटा',
      light: 'धीमो',
      medium: 'मध्यम',
      heavy: 'घणो'
    },
    notesPlaceholder: 'दूजी कोई बात...'
  },
  fr: {
    symptoms: {
      'Cramps': 'Crampes (Cramps)',
      'Bloating': 'Ballonnements',
      'Headache': 'Maux de tête',
      'Backache': 'Mal de dos',
      'Acne': 'Acné',
      'Fatigue': 'Fatigue',
      'Breast Tenderness': 'Seins douloureux',
      'Cravings': 'Fringales'
    },
    weekdays: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    status: {
      period: 'Règles',
      predicted: 'Prévu',
      symptoms: 'Crampe',
      wellness: 'Enregistré'
    },
    flow: {
      spotting: 'Pertes légères (Spotting)',
      light: 'Flux léger',
      medium: 'Flux moyen',
      heavy: 'Flux abondant'
    },
    notesPlaceholder: 'Observations supplémentaires...'
  },
  lb: {
    symptoms: {
      'Cramps': 'مغص البطن (Cramps)',
      'Bloating': 'نفخة بالبطن',
      'Headache': 'وجع راس (Headache)',
      'Backache': 'وجع ضهر',
      'Acne': 'حب شباب',
      'Fatigue': 'تعب شديد',
      'Breast Tenderness': 'وجع بالصدر',
      'Cravings': 'شهية مفتوحة'
    },
    weekdays: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    status: {
      period: 'الدورة',
      predicted: 'متوقع',
      symptoms: 'مغص',
      wellness: 'مسجل'
    },
    flow: {
      spotting: 'تنقيط خفيف',
      light: 'تدفق خفيف',
      medium: 'تدفق متوسط',
      heavy: 'تدفق غزير'
    },
    notesPlaceholder: 'ملاحظات أخرى...'
  },
  ar: {
    symptoms: {
      'Cramps': 'تقلصات ومغص (Cramps)',
      'Bloating': 'انتفاخ البطن',
      'Headache': 'صداع (Headache)',
      'Backache': 'ألم الظهر',
      'Acne': 'حب الشباب',
      'Fatigue': 'إرهاق (Fatigue)',
      'Breast Tenderness': 'ألم الثديين',
      'Cravings': 'رغبة في الطعام'
    },
    weekdays: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    status: {
      period: 'الطمث',
      predicted: 'المتوقع',
      symptoms: 'تقلصات',
      wellness: 'مسجل'
    },
    flow: {
      spotting: 'تمشيح (Spotting)',
      light: 'تدفق خفيف',
      medium: 'تدفق متوسط',
      heavy: 'تدفق غزير'
    },
    notesPlaceholder: 'ملاحظات صحية إضافية...'
  }
};

const CYCLE_MODES_I18N = {
  en: {
    regular: '🌸 Regular Period Tracker',
    firstPeriod: '🌿 First Period (Menarche)',
    menopause: '🌙 Menopause & Perimenopause'
  },
  ta: {
    regular: '🌸 வழக்கமான மாதவிடாய் சுழற்சி',
    firstPeriod: '🌿 முதல் மாதவிடாய் (பூப்படைதல்)',
    menopause: '🌙 மெனோபாஸ் சுழற்சி டிராக்கர்'
  },
  hi: {
    regular: '🌸 नियमित मासिक चक्र',
    firstPeriod: '🌿 प्रथम मासिक धर्म (Menarche)',
    menopause: '🌙 मेनोपॉज व पेरीमेनोपॉज'
  },
  te: {
    regular: '🌸 క్రమ రుతుచక్రం',
    firstPeriod: '🌿 మొదటి రుతుస్రావం (రజస్వల)',
    menopause: '🌙 మెనోపాజ్ ట్రాకర్'
  },
  ml: {
    regular: '🌸 ആർത്തവചക്രം',
    firstPeriod: '🌿 ആദ്യ ആർത്തവം (Menarche)',
    menopause: '🌙 മെനോപോസ് ട്രാക്കർ'
  },
  mr: {
    regular: '🌸 नियमित मासिक पाळी',
    firstPeriod: '🌿 पहिली मासिक पाळी',
    menopause: '🌙 मेनोपॉज ट्रॅकर'
  },
  mwr: {
    regular: '🌸 माहवारी चक्र',
    firstPeriod: '🌿 पहिली माहवारी',
    menopause: '🌙 मेनोपॉज ट्रैकर'
  },
  fr: {
    regular: '🌸 Cycle Menstruel',
    firstPeriod: '🌿 Premières Règles (Ménarche)',
    menopause: '🌙 Ménopause & Périménopause'
  },
  lb: {
    regular: '🌸 الدورة الشهرية',
    firstPeriod: '🌿 أول دورة للبنات',
    menopause: '🌙 سن الأمل وانقطاع الطمث'
  },
  ar: {
    regular: '🌸 الدورة الشهرية المنتظمة',
    firstPeriod: '🌿 الدورة الأولى (سن البلوغ)',
    menopause: '🌙 سن الأمل وانقطاع الطمث'
  }
};

export default function CycleTracker() {
  const { t, language } = useLanguage();
  const cDict = CYCLE_I18N[language] || CYCLE_I18N.en;
  const modesDict = CYCLE_MODES_I18N[language] || CYCLE_MODES_I18N.en;
  const [cycleMode, setCycleMode] = useState('regular'); // 'regular' | 'firstPeriod' | 'menopause'
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState(null);
  const [currentCycleDay, setCurrentCycleDay] = useState(14);
  const [daysUntilNext, setDaysUntilNext] = useState(14);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);

  // Calendar State
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 8, 1)); // Sept 2026

  // Form State
  const [formData, setFormData] = useState({
    startDate: '2026-09-10',
    endDate: '2026-09-15',
    cycleLength: 28,
    periodDuration: 5,
    isRegular: true,
    flowLevel: 'medium',
    painLevel: 2,
    symptoms: ['Cramps', 'Bloating'],
    mood: 'normal',
    energy: 'normal',
    notes: 'Feeling energetic on day 4'
  });

  const availableSymptoms = [
    'Cramps', 'Bloating', 'Headache', 'Backache', 'Acne', 'Fatigue', 'Breast Tenderness', 'Cravings'
  ];

  const symptomLabels = cDict.symptoms;

  const fetchCycleData = async () => {
    try {
      const [latestRes, historyRes] = await Promise.allSettled([
        api.get('/cycle/latest'),
        api.get('/cycle/history')
      ]);

      if (latestRes.status === 'fulfilled' && latestRes.value.success && latestRes.value.hasData) {
        setLatest(latestRes.value.latestRecord);
        setCurrentCycleDay(latestRes.value.currentCycleDay);
        setDaysUntilNext(latestRes.value.daysUntilNext);
      }

      if (historyRes.status === 'fulfilled' && historyRes.value.success) {
        setHistory(historyRes.value.history);
      }
    } catch (err) {
      console.warn('Cycle fetch fallback:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCycleData();
  }, []);

  const handleSymptomToggle = (s) => {
    setFormData((prev) => {
      const exists = prev.symptoms.includes(s);
      return {
        ...prev,
        symptoms: exists ? prev.symptoms.filter((x) => x !== s) : [...prev.symptoms, s]
      };
    });
  };

  const handleSaveCycle = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cycle/log', formData);
      setShowLogModal(false);
      fetchCycleData();
    } catch (err) {
      alert(err.message || 'Failed to save cycle log');
    }
  };

  // Calendar rendering helpers
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const getDayStatus = (day) => {
    if (month === 8) { // September
      if (day >= 10 && day <= 14) return 'period';
      if (day === 9 || day === 15) return 'symptoms';
      if (day === 24) return 'wellness';
    } else if (month === 9) { // October
      if (day >= 8 && day <= 12) return 'predicted';
    }
    return null;
  };

  const weekdays = language === 'ta'
    ? ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '24px 16px' }}>
      {/* 3 CYCLE STAGE NAVIGATION TABS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '22px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        <button
          type="button"
          onClick={() => setCycleMode('regular')}
          style={{
            padding: '11px 22px',
            borderRadius: '16px',
            border: cycleMode === 'regular' ? '2px solid #e11d48' : '1.5px solid #fbcfe8',
            background: cycleMode === 'regular' ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' : '#ffffff',
            color: cycleMode === 'regular' ? '#ffffff' : '#881337',
            fontSize: '0.9rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: cycleMode === 'regular' ? '0 4px 14px rgba(225, 29, 72, 0.3)' : 'none',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{modesDict.regular}</span>
        </button>

        <button
          type="button"
          onClick={() => setCycleMode('firstPeriod')}
          style={{
            padding: '11px 22px',
            borderRadius: '16px',
            border: cycleMode === 'firstPeriod' ? '2px solid #ec4899' : '1.5px solid #fbcfe8',
            background: cycleMode === 'firstPeriod' ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' : '#ffffff',
            color: cycleMode === 'firstPeriod' ? '#ffffff' : '#831843',
            fontSize: '0.9rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: cycleMode === 'firstPeriod' ? '0 4px 14px rgba(236, 72, 153, 0.3)' : 'none',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{modesDict.firstPeriod}</span>
        </button>

        <button
          type="button"
          onClick={() => setCycleMode('menopause')}
          style={{
            padding: '11px 22px',
            borderRadius: '16px',
            border: cycleMode === 'menopause' ? '2px solid #ea580c' : '1.5px solid #fed7aa',
            background: cycleMode === 'menopause' ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' : '#ffffff',
            color: cycleMode === 'menopause' ? '#ffffff' : '#7c2d12',
            fontSize: '0.9rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: cycleMode === 'menopause' ? '0 4px 14px rgba(234, 88, 12, 0.3)' : 'none',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{modesDict.menopause}</span>
        </button>
      </div>

      {/* VIEW 1: FIRST PERIOD TRACKER */}
      {cycleMode === 'firstPeriod' && <FirstPeriodTracker />}

      {/* VIEW 2: MENOPAUSE TRACKER */}
      {cycleMode === 'menopause' && <MenopauseTracker />}

      {/* VIEW 3: REGULAR MENSTRUAL CYCLE TRACKER */}
      {cycleMode === 'regular' && (
        <>
          {/* Header Banner */}
          <div className="glass-card" style={{
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fff0f5 0%, #fdf2f8 50%, #eff6ff 100%)',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        border: '1px solid var(--pink-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '20px',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 8px 20px rgba(244, 63, 94, 0.3)'
          }}>
            🩸
          </div>
          <div>
            <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-dark)' }}>
              {t('cycleTrackerTitle')}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {t('cycleTrackerSub')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="btn-primary"
          style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} />
          <span>{t('logNewPeriodBtn')}</span>
        </button>
      </div>

      <DisclaimerBanner customText={t('cycleDisclaimer')} />

      {/* Cycle Statistics Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('currentCycleDay')}</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--rose-primary)', margin: '4px 0' }}>
            {t('day')} {currentCycleDay}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('phaseFollicular')}</div>
        </div>

        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('estimatedNext')}</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--rose-primary)', margin: '4px 0' }}>
            {daysUntilNext} {t('days')}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {t('estimatedNext')}: {latest?.estimatedNextPeriod ? new Date(latest.estimatedNextPeriod).toLocaleDateString() : 'Oct 08, 2026'}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('menstrualCycle')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', margin: '8px 0' }}>
            {t('regular')} (28 d)
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>21-35 {t('days')}</div>
        </div>
      </div>

      {/* MONTHLY CALENDAR WITH COLOR SYSTEM */}
      <div className="glass-card" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-dark)' }}>
            {new Date(year, month, 1).toLocaleDateString(
              language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : language === 'mr' ? 'mr-IN' : language === 'ml' ? 'ml-IN' : language === 'fr' ? 'fr-FR' : (language === 'ar' || language === 'lb') ? 'ar-EG' : 'en-US',
              { month: 'long', year: 'numeric' }
            )}
          </h2>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
              className="btn-secondary"
              style={{ padding: '6px 12px' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
              className="btn-secondary"
              style={{ padding: '6px 12px' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '12px 16px',
          background: 'var(--pink-50)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px',
          fontSize: '0.82rem',
          fontWeight: 600
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#fb7185' }} />
            <span>{t('periodLegendPink') || 'Pink = Period Days'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#c4b5fd' }} />
            <span>{t('periodLegendLavender') || 'Lavender = Estimated Period Days'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#f87171' }} />
            <span>{t('periodLegendRed') || 'Light Red = Symptoms Logged'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#818cf8' }} />
            <span>{t('periodLegendBlue') || 'Blue/Purple = Wellness Logs'}</span>
          </div>
        </div>

        {/* Day Grid Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          {weekdays.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>

        {/* Calendar Days */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} style={{ height: '70px', borderRadius: '8px', background: 'rgba(0,0,0,0.02)' }} />
          ))}

          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const status = getDayStatus(dayNum);

            let bg = 'white';
            let textColor = 'var(--text-primary)';
            let label = null;

            if (status === 'period') {
              bg = '#ffe4e6';
              textColor = '#e11d48';
              label = cDict.status.period;
            } else if (status === 'predicted') {
              bg = '#f5f3ff';
              textColor = '#7c3aed';
              label = cDict.status.predicted;
            } else if (status === 'symptoms') {
              bg = '#fef2f2';
              textColor = '#dc2626';
              label = cDict.status.symptoms;
            } else if (status === 'wellness') {
              bg = '#eff6ff';
              textColor = '#2563eb';
              label = cDict.status.wellness;
            }

            return (
              <div
                key={`day-${dayNum}`}
                style={{
                  height: '70px',
                  borderRadius: '8px',
                  background: bg,
                  border: status ? '1px solid currentColor' : '1px solid #f1f5f9',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'var(--transition)'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: textColor }}>{dayNum}</span>
                {label && (
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: textColor,
                    background: 'rgba(255,255,255,0.7)',
                    padding: '2px 4px',
                    borderRadius: '4px'
                  }}>
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* LOG PERIOD MODAL */}
      {showLogModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div className="glass-card" style={{
            maxWidth: '560px',
            width: '100%',
            padding: '28px',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', marginBottom: '16px' }}>
              {t('logPeriodModalTitle') || 'Log Menstrual Period'}
            </h2>

            <form onSubmit={handleSaveCycle} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {t('periodStartDate') || 'Period Start Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {t('periodEndDate') || 'Period End Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {t('cycleLengthLabel') || 'Cycle Length (days)'}
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="60"
                    value={formData.cycleLength}
                    onChange={(e) => setFormData({ ...formData, cycleLength: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {t('flowLevelLabel') || 'Flow Level'}
                  </label>
                  <select
                    value={formData.flowLevel}
                    onChange={(e) => setFormData({ ...formData, flowLevel: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
                  >
                    <option value="spotting">{cDict.flow.spotting}</option>
                    <option value="light">{cDict.flow.light}</option>
                    <option value="medium">{cDict.flow.medium}</option>
                    <option value="heavy">{cDict.flow.heavy}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('painLevelScale') || 'Pain Level (0 = No pain, 10 = Severe)'}: {formData.painLevel}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => setFormData({ ...formData, painLevel: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--pink-600)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  {t('symptomsExperienced') || 'Symptoms Experienced'}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {availableSymptoms.map((s) => {
                    const isSelected = formData.symptoms.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSymptomToggle(s)}
                        style={{
                          fontSize: '0.8rem',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--pink-300)',
                          background: isSelected ? 'var(--pink-600)' : 'white',
                          color: isSelected ? 'white' : 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        {symptomLabels[s] || s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('personalNotes') || 'Personal Notes'}
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={cDict.notesPlaceholder}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="btn-secondary"
                >
                  {t('cancelBtn') || 'Cancel'}
                </button>
                <button type="submit" className="btn-primary">
                  {t('savePeriodBtn') || 'Save Period Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}
