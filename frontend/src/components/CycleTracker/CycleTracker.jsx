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

export default function CycleTracker({ initialMode = 'regular' }) {
  const { t, language } = useLanguage();
  const cDict = CYCLE_I18N[language] || CYCLE_I18N.en;
  const modesDict = CYCLE_MODES_I18N[language] || CYCLE_MODES_I18N.en;
  const [cycleMode, setCycleMode] = useState(initialMode);
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState(null);
  const [currentCycleDay, setCurrentCycleDay] = useState(14);
  const [daysUntilNext, setDaysUntilNext] = useState(14);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    if (initialMode) setCycleMode(initialMode);
  }, [initialMode]);

  // Calendar State initialized to current date
  const [calendarDate, setCalendarDate] = useState(() => new Date());

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

  // Flow level auto-arranges duration: Light (~3d), Medium (5-6d), Heavy (7+d)
  const handleFlowSelect = (flowId) => {
    let days = 5;
    if (flowId === 'light' || flowId === 'spotting') days = 3;
    if (flowId === 'medium') days = 5;
    if (flowId === 'heavy') days = 7;

    setFormData(prev => {
      const start = new Date(prev.startDate || '2026-09-10');
      const end = new Date(start);
      end.setDate(start.getDate() + days - 1);
      const endStr = end.toISOString().split('T')[0];
      return {
        ...prev,
        flowLevel: flowId,
        periodDuration: days,
        endDate: endStr
      };
    });
  };

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

  // Dynamic Cycle, Ovulation & Flow calculations
  const nextPeriodDateObj = latest?.estimatedNextPeriod ? new Date(latest.estimatedNextPeriod) : new Date(2026, 9, 8);
  const ovulationDateObj = new Date(nextPeriodDateObj);
  ovulationDateObj.setDate(nextPeriodDateObj.getDate() - 14);

  const fertileStartObj = new Date(ovulationDateObj);
  fertileStartObj.setDate(ovulationDateObj.getDate() - 4);
  const fertileEndObj = new Date(ovulationDateObj);
  fertileEndObj.setDate(ovulationDateObj.getDate() + 1);

  const avgCycleDays = latest?.cycleLength || formData.cycleLength || 28;
  const avgPeriodDays = latest?.periodDuration || formData.periodDuration || 5;
  const currentFlow = formData.flowLevel || latest?.flowLevel || 'medium';

  // Calendar rendering helpers
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const getDayStatus = (day) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);

    // 1. Check logged period days
    if (latest?.startDate) {
      const pStart = new Date(latest.startDate);
      pStart.setHours(0, 0, 0, 0);
      const pEnd = new Date(pStart);
      pEnd.setDate(pStart.getDate() + (latest.periodDuration || avgPeriodDays) - 1);
      if (d >= pStart && d <= pEnd) return 'period';
    } else if (month === 8 && day >= 10 && day <= 14) {
      return 'period';
    }

    // 2. Expected Next Period Days
    const nextStart = new Date(nextPeriodDateObj);
    nextStart.setHours(0, 0, 0, 0);
    const nextEnd = new Date(nextStart);
    nextEnd.setDate(nextStart.getDate() + avgPeriodDays - 1);
    if (d >= nextStart && d <= nextEnd) return 'predicted';

    // 3. Expected Ovulation Day (14 days before next period)
    const ovDay = new Date(ovulationDateObj);
    ovDay.setHours(0, 0, 0, 0);
    if (d.getTime() === ovDay.getTime()) return 'ovulation';

    // 4. Fertile Window (4 days before ovulation to 1 day after)
    const fStart = new Date(fertileStartObj);
    fStart.setHours(0, 0, 0, 0);
    const fEnd = new Date(fertileEndObj);
    fEnd.setHours(0, 0, 0, 0);
    if (d >= fStart && d <= fEnd) return 'fertile';

    // Baseline indicators for demo
    if (month === 8 && (day === 9 || day === 15)) return 'symptoms';
    if (month === 8 && day === 24) return 'wellness';

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

      {/* VIEW 1: FIRST PERIOD TRACKER (MENARCHE) */}
      {cycleMode === 'firstPeriod' && (
        <div>
          <button
            type="button"
            onClick={() => setCycleMode('regular')}
            style={{
              marginBottom: '16px',
              padding: '8px 18px',
              borderRadius: '12px',
              border: '1.5px solid #ec4899',
              background: '#fdf2f8',
              color: '#be185d',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← {language === 'ta' ? 'வழக்கமான சுழற்சி டிராக்கருக்குத் திரும்பு' : 'Back to Regular Cycle Tracker'}
          </button>
          <FirstPeriodTracker />
        </div>
      )}

      {/* VIEW 2: MENOPAUSE TRACKER */}
      {cycleMode === 'menopause' && (
        <div>
          <button
            type="button"
            onClick={() => setCycleMode('regular')}
            style={{
              marginBottom: '16px',
              padding: '8px 18px',
              borderRadius: '12px',
              border: '1.5px solid #ea580c',
              background: '#fff7ed',
              color: '#c2410c',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← {language === 'ta' ? 'வழக்கமான சுழற்சி டிராக்கருக்குத் திரும்பு' : 'Back to Regular Cycle Tracker'}
          </button>
          <MenopauseTracker />
        </div>
      )}

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

      {/* 1. Cycle Statistics & Flow Indicator Cards (4 Responsive Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Card 1: Current Cycle Day */}
        <div className="glass-card card-interactive" style={{ padding: '20px', textAlign: 'center', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            {t('currentCycleDay')}
          </div>
          <div style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--rose-primary)', margin: '4px 0' }}>
            {t('day')} {currentCycleDay}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {t('phaseFollicular')}
          </div>
        </div>

        {/* Card 2: Estimated Next Period */}
        <div className="glass-card card-interactive" style={{ padding: '20px', textAlign: 'center', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            {language === 'ta' ? 'அடுத்த மாதவிடாய்' : 'Expected Next Period'}
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#be123c', margin: '4px 0' }}>
            {daysUntilNext} {t('days')}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#9f1239', fontWeight: 600 }}>
            📅 {nextPeriodDateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>

        {/* Card 3: Cycle Pattern (Average Cycle Days & Period Length) */}
        <div className="glass-card card-interactive" style={{ padding: '20px', textAlign: 'center', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            {language === 'ta' ? 'சுழற்சி மாதிரி (Cycle Pattern)' : 'Cycle Pattern & Averages'}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', margin: '6px 0' }}>
            {avgCycleDays} {t('days')} • {avgPeriodDays} {language === 'ta' ? 'நாட்கள்' : 'days'}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 600 }}>
            ✓ {language === 'ta' ? 'சராசரி சுழற்சி (Regular 21-35 d)' : 'Regular Cycle (Normal Range)'}
          </div>
        </div>

        {/* Card 4: Flow Indicator (Heavy / Moderate / Normal-Light) */}
        <div className="glass-card card-interactive" style={{ padding: '20px', textAlign: 'center', borderRadius: '18px', border: '1.5px solid #fecdd3' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            {language === 'ta' ? 'இரத்தப்போக்கு & சுழற்சி காலம்' : 'Current Flow & Period Duration'}
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: currentFlow === 'heavy' ? '#dc2626' : currentFlow === 'medium' ? '#ea580c' : '#db2777', margin: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span>{currentFlow === 'heavy' ? '💧💧💧' : currentFlow === 'medium' ? '💧💧' : '💧'}</span>
            <span>
              {currentFlow === 'heavy'
                ? (language === 'ta' ? 'அதிகம் (7+ நாட்கள்)' : 'Heavy (7+ Days)')
                : currentFlow === 'medium'
                ? (language === 'ta' ? 'சீரானது (5–6 நாட்கள்)' : 'Normal (5–6 Days)')
                : (language === 'ta' ? 'குறைவு (3 நாட்கள்)' : 'Light (~3 Days)')}
            </span>
          </div>

          {/* Quick Flow Selection Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'light', label: language === 'ta' ? 'குறைவு (~3 d)' : 'Light (~3 d)', color: '#fce7f3', text: '#be185d' },
              { id: 'medium', label: language === 'ta' ? 'சீரானது (5–6 d)' : 'Normal (5–6 d)', color: '#ffedd5', text: '#ea580c' },
              { id: 'heavy', label: language === 'ta' ? 'அதிகம் (7+ d)' : 'Heavy (7+ d)', color: '#fee2e2', text: '#dc2626' }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFlowSelect(f.id)}
                style={{
                  background: currentFlow === f.id ? f.text : f.color,
                  color: currentFlow === f.id ? '#ffffff' : f.text,
                  border: 'none',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: currentFlow === f.id ? '0 2px 6px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Arranged Dates Display */}
          <div style={{
            marginTop: '10px',
            padding: '4px 8px',
            borderRadius: '8px',
            background: 'rgba(254, 226, 226, 0.5)',
            fontSize: '0.74rem',
            color: '#9f1239',
            fontWeight: 700
          }}>
            🗓️ {formData.startDate} → {formData.endDate} ({formData.periodDuration} {language === 'ta' ? 'நாட்கள்' : 'days'})
          </div>
        </div>
      </div>

      {/* 2. CYCLE PATTERN & HEALTH SUMMARY BAR */}
      <div
        className="glass-card"
        style={{
          padding: '18px 22px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #eff6ff 100%)',
          marginBottom: '26px',
          border: '1.5px solid #fbcfe8',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🔄</span>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#831843', textTransform: 'uppercase' }}>
              {language === 'ta' ? 'சராசரி சுழற்சி நாட்கள்' : 'Average Cycle Days'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#9d174d' }}>
              {avgCycleDays} {language === 'ta' ? 'நாட்கள் (Days)' : 'Days'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🩸</span>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#831843', textTransform: 'uppercase' }}>
              {language === 'ta' ? 'மாதவிடாய் காலம் (நீளம்)' : 'Period Length (Duration)'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#9d174d' }}>
              {avgPeriodDays} {language === 'ta' ? 'நாட்கள் (Days)' : 'Days'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🥚</span>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
              {language === 'ta' ? 'அடுத்த அண்டவிடுப்பு (Ovulation)' : 'Expected Ovulation Date'}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d97706' }}>
              {ovulationDateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short' })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🌿</span>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
              {language === 'ta' ? 'கருத்தரிக்கும் காலம் (Fertile Window)' : 'Estimated Fertile Window'}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#15803d' }}>
              {fertileStartObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short' })} – {fertileEndObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short' })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MONTHLY CALENDAR (OPTIMIZED FOR MOBILE & DESKTOP) */}
      <div className="glass-card" style={{ padding: '24px 18px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid #fecdd3' }}>
        
        {/* Calendar Header with Navigation & Quick 'Today' button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CalendarHeart size={24} color="#e11d48" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
              {new Date(year, month, 1).toLocaleDateString(
                language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : language === 'mr' ? 'mr-IN' : language === 'ml' ? 'ml-IN' : language === 'fr' ? 'fr-FR' : (language === 'ar' || language === 'lb') ? 'ar-EG' : 'en-US',
                { month: 'long', year: 'numeric' }
              )}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setCalendarDate(new Date())}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700 }}
            >
              {language === 'ta' ? 'இன்று (Today)' : 'Today'}
            </button>
            <button
              onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
              className="btn-secondary"
              style={{ padding: '6px 12px' }}
              title="Previous Month"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
              className="btn-secondary"
              style={{ padding: '6px 12px' }}
              title="Next Month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Highlighted Expected Dates Quick Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          padding: '12px 14px',
          background: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 100%)',
          borderRadius: '12px',
          marginBottom: '18px',
          border: '1px solid #fecdd3'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🔮</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#881337', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'ta' ? 'எதிர்பார்க்கப்படும் அடுத்த மாதவிடாய்' : 'Expected Period Date'}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#be123c' }}>
                {nextPeriodDateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🥚</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#78350f', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'ta' ? 'எதிர்பார்க்கப்படும் கருமுட்டை நாள்' : 'Expected Ovulation Date'}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#d97706' }}>
                {ovulationDateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🌿</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#14532d', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'ta' ? 'கருத்தரிக்கும் காலம்' : 'Fertile Window'}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#15803d' }}>
                {fertileStartObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short' })} – {fertileEndObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric', month: 'short' })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '10px 14px',
          background: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          marginBottom: '16px',
          fontSize: '0.78rem',
          fontWeight: 700,
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#fb7185' }} />
            <span>{language === 'ta' ? '🩸 மாதவிடாய் நாட்கள்' : 'Pink = Logged Period'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#c4b5fd' }} />
            <span>{language === 'ta' ? '🔮 கணிக்கப்பட்ட மாதவிடாய்' : 'Lavender = Estimated Period'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#fcd34d' }} />
            <span>{language === 'ta' ? '🥚 கருமுட்டை நாள் (Ovulation)' : 'Gold = Ovulation Day'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#86efac' }} />
            <span>{language === 'ta' ? '🌿 கருத்தரிக்கும் காலம்' : 'Green = Fertile Window'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f87171' }} />
            <span>{language === 'ta' ? '💊 அறிகுறிகள்' : 'Coral = Symptoms'}</span>
          </div>
        </div>

        {/* Mobile-Friendly Calendar Scroll Container */}
        <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ minWidth: '320px' }}>
            {/* Day Grid Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {weekdays.map((w) => (
                <div key={w}>{w}</div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} style={{ minHeight: '62px', borderRadius: '8px', background: 'rgba(0,0,0,0.02)' }} />
              ))}

              {Array.from({ length: totalDays }).map((_, i) => {
                const dayNum = i + 1;
                const status = getDayStatus(dayNum);

                let bg = 'white';
                let textColor = 'var(--text-primary)';
                let label = null;
                let badgeIcon = null;

                if (status === 'period') {
                  bg = '#ffe4e6';
                  textColor = '#e11d48';
                  label = cDict.status.period;
                  badgeIcon = '🩸';
                } else if (status === 'predicted') {
                  bg = '#f5f3ff';
                  textColor = '#7c3aed';
                  label = cDict.status.predicted;
                  badgeIcon = '🔮';
                } else if (status === 'ovulation') {
                  bg = '#fef3c7';
                  textColor = '#b45309';
                  label = language === 'ta' ? 'அண்டவிடுப்பு' : 'Ovulation';
                  badgeIcon = '🥚';
                } else if (status === 'fertile') {
                  bg = '#f0fdf4';
                  textColor = '#15803d';
                  label = language === 'ta' ? 'கருத்தரிப்பு' : 'Fertile';
                  badgeIcon = '🌿';
                } else if (status === 'symptoms') {
                  bg = '#fef2f2';
                  textColor = '#dc2626';
                  label = cDict.status.symptoms;
                  badgeIcon = '💊';
                } else if (status === 'wellness') {
                  bg = '#eff6ff';
                  textColor = '#2563eb';
                  label = cDict.status.wellness;
                  badgeIcon = '✨';
                }

                return (
                  <div
                    key={`day-${dayNum}`}
                    style={{
                      minHeight: '62px',
                      borderRadius: '8px',
                      background: bg,
                      border: status ? '1.5px solid currentColor' : '1px solid #f1f5f9',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.84rem', color: textColor }}>{dayNum}</span>
                      {badgeIcon && <span style={{ fontSize: '0.72rem' }}>{badgeIcon}</span>}
                    </div>
                    {label && (
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        color: textColor,
                        background: 'rgba(255,255,255,0.85)',
                        padding: '1px 3px',
                        borderRadius: '3px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block'
                      }}>
                        {label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PERIOD CYCLE DATES & FLOW TABLE (பீரியட் டேபிள்) */}
      <div className="glass-card" style={{
        padding: '24px',
        borderRadius: '20px',
        background: 'white',
        border: '1.5px solid #fecdd3',
        marginBottom: '26px',
        boxShadow: '0 4px 18px rgba(244, 63, 94, 0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>🩸</span>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#881337', margin: 0 }}>
                {language === 'ta' ? 'மாதவிடாய் சுழற்சி அட்டவணை (Period Cycle Dates Table)' : 'Period Cycle Dates & History Table'}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>
                {language === 'ta'
                  ? 'என்னென்ன தேதியிலிருந்து எந்தெந்த தேதி வரை மாதவிடாய் இருந்தது என்பதைப் பதிவு செய்து கண்காணிக்கும் அட்டவணை.'
                  : 'Track past, current, and upcoming period start dates, end dates, and flow patterns.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLogModal(true)}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.84rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} />
            <span>{language === 'ta' ? 'புதிய தேதி பதிவு செய்' : 'Log New Period'}</span>
          </button>
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: '#fff1f2', borderBottom: '2px solid #fda4af' }}>
                <th style={{ padding: '12px 14px', color: '#881337', fontWeight: 800, borderRadius: '10px 0 0 10px' }}>
                  {language === 'ta' ? 'துவக்க தேதி' : 'Start Date'}
                </th>
                <th style={{ padding: '12px 14px', color: '#881337', fontWeight: 800 }}>
                  {language === 'ta' ? 'முடிவு தேதி' : 'End Date'}
                </th>
                <th style={{ padding: '12px 14px', color: '#881337', fontWeight: 800 }}>
                  {language === 'ta' ? 'இரத்தப்போக்கு அளவு' : 'Flow Level'}
                </th>
                <th style={{ padding: '12px 14px', color: '#881337', fontWeight: 800 }}>
                  {language === 'ta' ? 'கால அளவு' : 'Duration'}
                </th>
                <th style={{ padding: '12px 14px', color: '#881337', fontWeight: 800 }}>
                  {language === 'ta' ? 'அறிகுறிகள்' : 'Symptoms'}
                </th>
                <th style={{ padding: '12px 14px', color: '#881337', fontWeight: 800, borderRadius: '0 10px 10px 0' }}>
                  {language === 'ta' ? 'நிலை' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Active Current Cycle Record */}
              <tr style={{ borderBottom: '1px solid #fecdd3', background: '#fdf2f8' }}>
                <td style={{ padding: '12px 14px', fontWeight: 800, color: '#be123c' }}>
                  📅 {formData.startDate}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 800, color: '#be123c' }}>
                  📅 {formData.endDate}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: currentFlow === 'heavy' ? '#fee2e2' : currentFlow === 'medium' ? '#ffedd5' : '#fce7f3',
                    color: currentFlow === 'heavy' ? '#dc2626' : currentFlow === 'medium' ? '#ea580c' : '#be185d',
                    fontWeight: 800,
                    fontSize: '0.76rem'
                  }}>
                    {currentFlow === 'heavy'
                      ? (language === 'ta' ? '💧💧💧 அதிகம் (Heavy)' : '💧💧💧 Heavy Flow')
                      : currentFlow === 'medium'
                      ? (language === 'ta' ? '💧💧 நடுத்தரம் (Normal)' : '💧💧 Normal Flow')
                      : (language === 'ta' ? '💧 குறைவு (Light)' : '💧 Light Flow')}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>
                  {formData.periodDuration} {language === 'ta' ? 'நாட்கள்' : 'days'}
                </td>
                <td style={{ padding: '12px 14px', color: '#64748b' }}>
                  {formData.symptoms?.length > 0
                    ? formData.symptoms.map(s => symptomLabels[s] || s).join(', ')
                    : (language === 'ta' ? 'வயிற்று வலி (Cramps), உப்புசம்' : 'Cramps, Bloating')}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '8px', background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.72rem' }}>
                    ● {language === 'ta' ? 'செயலில் உள்ளது (Active)' : 'Active Cycle'}
                  </span>
                </td>
              </tr>

              {/* Past History Cycle 1 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 14px', color: '#334155', fontWeight: 700 }}>
                  2026-08-12
                </td>
                <td style={{ padding: '12px 14px', color: '#334155', fontWeight: 700 }}>
                  2026-08-17
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#ffedd5', color: '#ea580c', fontWeight: 700, fontSize: '0.76rem' }}>
                    💧💧 {language === 'ta' ? 'நடுத்தரம் (Medium)' : 'Medium Flow'}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', color: '#475569' }}>
                  5 {language === 'ta' ? 'நாட்கள்' : 'days'}
                </td>
                <td style={{ padding: '12px 14px', color: '#64748b' }}>
                  {language === 'ta' ? 'தலைவலி, சோர்வு' : 'Headache, Fatigue'}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '8px', background: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: '0.72rem' }}>
                    ✓ {language === 'ta' ? 'முடிந்தது' : 'Completed'}
                  </span>
                </td>
              </tr>

              {/* Past History Cycle 2 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 14px', color: '#334155', fontWeight: 700 }}>
                  2026-07-15
                </td>
                <td style={{ padding: '12px 14px', color: '#334155', fontWeight: 700 }}>
                  2026-07-20
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#fce7f3', color: '#be185d', fontWeight: 700, fontSize: '0.76rem' }}>
                    💧 {language === 'ta' ? 'சீரானது (Normal)' : 'Normal Flow'}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', color: '#475569' }}>
                  5 {language === 'ta' ? 'நாட்கள்' : 'days'}
                </td>
                <td style={{ padding: '12px 14px', color: '#64748b' }}>
                  {language === 'ta' ? 'முதுகு வலி' : 'Backache'}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '8px', background: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: '0.72rem' }}>
                    ✓ {language === 'ta' ? 'முடிந்தது' : 'Completed'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. DEDICATED BOTTOM CARDS: MENARCHE & MENOPAUSE (மெனோவார்க் & மெனோபாஸ்) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '18px',
        marginBottom: '26px'
      }}>
        {/* Card 1: Menarche (மெனோவார்க்) */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)',
          border: '2px solid #fbcfe8',
          boxShadow: '0 6px 20px rgba(236, 72, 153, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.6rem' }}>🌿</span>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#831843', margin: 0 }}>
                  {language === 'ta' ? 'மெனோவார்க் (முதல் மாதவிடாய் வழிகாட்டி)' : 'Menarche (First Period Hub)'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#be185d', fontWeight: 700 }}>
                  {language === 'ta' ? 'இளம் பெண்கள் & பூப்படைதல் விழிப்புணர்வு' : 'Puberty & First Cycle Education'}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              {language === 'ta'
                ? 'முதல் முறை மாதவிடாய் வரும்போது ஏற்படும் பயம் நீக்குதல், சுகாதார வழிகாட்டுதல்கள் மற்றும் இளம் பெண்களுக்கான உடல்நலக் குறிப்புகள்.'
                : 'Fear-free first period guidance, puberty milestone tracking, hygienic pad care, and adolescent menstrual wellness.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCycleMode('firstPeriod')}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
              color: 'white',
              border: 'none',
              padding: '11px 20px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.3)'
            }}
          >
            <span>🌿 {language === 'ta' ? 'மெனோவார்க் பகுதிக்குச் செல்' : 'Open Menarche Guide'}</span>
          </button>
        </div>

        {/* Card 2: Menopause (மெனோபாஸ்) */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
          border: '2px solid #fed7aa',
          boxShadow: '0 6px 20px rgba(234, 88, 12, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.6rem' }}>🌙</span>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#7c2d12', margin: 0 }}>
                  {language === 'ta' ? 'மெனோபாஸ் (மாதவிடாய் நிறைவு நல்வாழ்வு)' : 'Menopause & Transition Hub'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#c2410c', fontWeight: 700 }}>
                  {language === 'ta' ? 'பெரிமெனோபாஸ் & ஹார்மோன் சமநிலை' : 'Perimenopause & Hormonal Balance'}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              {language === 'ta'
                ? 'மாதவிடாய் நிற்கும் பருவம், ஹாட் ஃப்ளாஷஸ் (உடல் சூடு), தூக்கமின்மை மற்றும் ஹார்மோன் மாற்றங்களுக்கான சுய பரிசோதனை & குறிப்புகள்.'
                : 'Menopause symptom evaluation, hot flash management, bone health, mood swings, and transition self-assessment.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCycleMode('menopause')}
            style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              color: 'white',
              border: 'none',
              padding: '11px 20px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)'
            }}
          >
            <span>🌙 {language === 'ta' ? 'மெனோபாஸ் பகுதிக்குச் செல்' : 'Open Menopause Assessment'}</span>
          </button>
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

      {/* Universal Medical Disclaimer at the bottom of the page */}
      <div style={{ marginTop: '36px' }}>
        <DisclaimerBanner customText={
          language === 'ta'
            ? '⚠️ மருத்துவ மறுப்பு: இந்த தளம் மற்றும் சுழற்சி கணிப்புகள் தகவல் நோக்கங்களுக்காக மட்டுமே. இது தொழில்முறை மருத்துவ ஆலோசனை, நோய் கண்டறிதல் அல்லது சிகிச்சைக்கு மாற்றாகாது (Not a substitute for professional medical advice). ஏதேனும் அசாதாரண இரத்தப்போக்கு, தீவிர வலி அல்லது சுழற்சி தாமதம் இருப்பின், தகுதிவாய்ந்த மகளிர் மருத்துவரை அணுகவும்.'
            : '⚠️ Medical Disclaimer: This platform and its cycle predictions are for informational tracking purposes and are not a substitute for professional medical advice, clinical diagnosis, or treatment. Always consult a qualified gynecologist or healthcare provider.'
        } />
      </div>
    </div>
  );
}
