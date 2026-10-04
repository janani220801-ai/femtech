import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { useSmsAlert } from '../../context/SmsAlertContext';
import { Droplet, Moon, Heart, Smile, Zap, Pill, BookOpen, Dumbbell, Check, Plus, Minus, Save, Smartphone } from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const DAILYLOG_I18N = {
  en: {
    moods: {
      happy: 'Happy', calm: 'Calm', normal: 'Normal', sad: 'Sad', angry: 'Angry',
      stressed: 'Stressed', anxious: 'Anxious', tired: 'Tired', energetic: 'Energetic'
    },
    painLocations: {
      'Head': 'Head', 'Back': 'Back', 'Abdomen': 'Abdomen',
      'Lower abdomen': 'Lower abdomen', 'Legs': 'Legs', 'Breast': 'Breast', 'Other': 'Other'
    },
    energyLevels: {
      very_low: 'Very Low', low: 'Low', normal: 'Normal', high: 'High', very_high: 'Very High'
    },
    waterUnit: (glasses, ml) => `Glasses of water (approx. ${ml} ml)`,
    journalPlaceholder: "Express your emotions freely in your private journal...",
    notesPlaceholder: "Notes on goals, stressors, or self-care reminders..."
  },
  ta: {
    moods: {
      happy: 'மகிழ்ச்சி', calm: 'அமைதி', normal: 'சாதாரணம்', sad: 'வருத்தம்', angry: 'கோபம்',
      stressed: 'மன அழுத்தம்', anxious: 'பதட்டம்', tired: 'சோர்வு', energetic: 'சுறுசுறுப்பு'
    },
    painLocations: {
      'Head': 'தலை', 'Back': 'முதுகு', 'Abdomen': 'வயிறு',
      'Lower abdomen': 'அடிவயிறு', 'Legs': 'கால்கள்', 'Breast': 'மார்பகம்', 'Other': 'மற்றவை'
    },
    energyLevels: {
      very_low: 'மிகக் குறைவு', low: 'குறைவு', normal: 'சாதாரணம்', high: 'அதிகம்', very_high: 'மிக அதிகம்'
    },
    waterUnit: (glasses, ml) => `${glasses} டம்ளர் தண்ணீர் (தோராயமாக ${ml} மி.லி)`,
    journalPlaceholder: "உங்கள் தனிப்பட்ட நாட்குறிப்பில் உங்கள் உணர்வுகளை சுதந்திரமாக எழுதுங்கள்...",
    notesPlaceholder: "இலக்குகள், மன அழுத்தங்கள் அல்லது சுய பராமரிப்பு குறிப்புகள்..."
  },
  hi: {
    moods: {
      happy: 'प्रसन्न', calm: 'शांत', normal: 'सामान्य', sad: 'उदास', angry: 'क्रोधित',
      stressed: 'तनावग्रस्त', anxious: 'चिंतित', tired: 'थका हुआ', energetic: 'ऊर्जावान'
    },
    painLocations: {
      'Head': 'सिर', 'Back': 'पीठ', 'Abdomen': 'पेट',
      'Lower abdomen': 'निचला पेट', 'Legs': 'पैर', 'Breast': 'स्तन', 'Other': 'अन्य'
    },
    energyLevels: {
      very_low: 'बहुत कम', low: 'कम', normal: 'सामान्य', high: 'अधिक', very_high: 'बहुत अधिक'
    },
    waterUnit: (glasses, ml) => `${glasses} गिलास पानी (लगभग ${ml} मि.ली)`,
    journalPlaceholder: "अपनी निजी डायरी में अपनी भावनाएं स्वतंत्रता से लिखें...",
    notesPlaceholder: "लक्ष्य, तनाव या देखभाल संबंधी नोट्स..."
  },
  te: {
    moods: {
      happy: 'సంతోషం', calm: 'ప్రశాంతం', normal: 'సాధారణం', sad: 'బాధ', angry: 'కోపం',
      stressed: 'ఒత్తిడి', anxious: 'ఆందోళన', tired: 'అలసట', energetic: 'ఉత్సాహం'
    },
    painLocations: {
      'Head': 'తల', 'Back': 'వీపు/నడుము', 'Abdomen': 'కడుపు',
      'Lower abdomen': 'పొత్తికడుపు', 'Legs': 'కాళ్ళు', 'Breast': 'రొమ్ములు', 'Other': 'ఇతర'
    },
    energyLevels: {
      very_low: 'చాలా తక్కువ', low: 'తక్కువ', normal: 'సాధారణం', high: 'ఎక్కువ', very_high: 'చాలా ఎక్కువ'
    },
    waterUnit: (glasses, ml) => `${glasses} గ్లాసుల నీరు (సుమారు ${ml} మి.లీ)`,
    journalPlaceholder: "మీ భావాలను ఇక్కడ రాయండి...",
    notesPlaceholder: "లక్ష్యాలు మరియు స్వీయ రక్షణ గమనికలు..."
  },
  ml: {
    moods: {
      happy: 'സന്തോഷം', calm: 'ശാന്തം', normal: 'സാധാരണം', sad: 'സങ്കടം', angry: 'ദേഷ്യം',
      stressed: 'സമ്മർദ്ദം', anxious: 'ഉത്കണ്ഠ', tired: 'ക്ഷീണം', energetic: 'ഉന്മേഷം'
    },
    painLocations: {
      'Head': 'തല', 'Back': 'മുതുക്', 'Abdomen': 'വയർ',
      'Lower abdomen': 'അടിവയർ', 'Legs': 'കാലുകൾ', 'Breast': 'സ്തനം', 'Other': 'മറ്റുള്ളവ'
    },
    energyLevels: {
      very_low: 'വളരെ കുറവ്', low: 'കുറവ്', normal: 'സാധാരണം', high: 'കൂടുതൽ', very_high: 'വളരെ കൂടുതൽ'
    },
    waterUnit: (glasses, ml) => `${glasses} ഗ്ലാസ് വെള്ളം (ഏകദേശം ${ml} മി.ലി)`,
    journalPlaceholder: "നിങ്ങളുടെ ചിന്തകൾ ഇവിടെ കുറിക്കുക...",
    notesPlaceholder: "ലക്ഷ്യങ്ങളും സ്വയം പരിചരണ കുറിപ്പുകളും..."
  },
  mr: {
    moods: {
      happy: 'आनंदी', calm: 'शांत', normal: 'सामान्य', sad: 'दुःखी', angry: 'रागावलेला',
      stressed: 'तणावग्रस्त', anxious: 'काळजीत', tired: 'थकलेला', energetic: 'उत्साही'
    },
    painLocations: {
      'Head': 'डोके', 'Back': 'पाठ', 'Abdomen': 'पोट',
      'Lower abdomen': 'खालचे पोट', 'Legs': 'पाय', 'Breast': 'स्तन', 'Other': 'इतर'
    },
    energyLevels: {
      very_low: 'खूप कमी', low: 'कमी', normal: 'सामान्य', high: 'जास्त', very_high: 'खूप जास्त'
    },
    waterUnit: (glasses, ml) => `${glasses} ग्लास पाणी (अंदाजे ${ml} मि.ली)`,
    journalPlaceholder: "आपल्या भावना मोकळेपणाने नोंदवा...",
    notesPlaceholder: "ध्येये आणि स्व-काळजीच्या नोंदी..."
  },
  mwr: {
    moods: {
      happy: 'राजी', calm: 'शांत', normal: 'साधारण', sad: 'उदास', angry: 'गुस्सो',
      stressed: 'तणाव', anxious: 'चिंता', tired: 'थक्योड़ो', energetic: 'फुर्तीलो'
    },
    painLocations: {
      'Head': 'माथो', 'Back': 'कमर', 'Abdomen': 'पेट',
      'Lower abdomen': 'नीचलो पेट', 'Legs': 'पगां', 'Breast': 'छाती', 'Other': 'दूजो'
    },
    energyLevels: {
      very_low: 'घणो कम', low: 'कम', normal: 'साधारण', high: 'बेसी', very_high: 'घणो बेसी'
    },
    waterUnit: (glasses, ml) => `${glasses} गिलास पाणी (लगभग ${ml} मि.ली)`,
    journalPlaceholder: "थारी मन री बात लिखो...",
    notesPlaceholder: "खास बातां..."
  },
  fr: {
    moods: {
      happy: 'Heureuse', calm: 'Calme', normal: 'Normale', sad: 'Triste', angry: 'En colère',
      stressed: 'Stressée', anxious: 'Anxieuse', tired: 'Fatiguée', energetic: 'Énergique'
    },
    painLocations: {
      'Head': 'Tête', 'Back': 'Dos', 'Abdomen': 'Ventre',
      'Lower abdomen': 'Bas-ventre', 'Legs': 'Jambes', 'Breast': 'Seins', 'Other': 'Autre'
    },
    energyLevels: {
      very_low: 'Très bas', low: 'Bas', normal: 'Normal', high: 'Élevé', very_high: 'Très élevé'
    },
    waterUnit: (glasses, ml) => `${glasses} verres d'eau (environ ${ml} ml)`,
    journalPlaceholder: "Exprimez vos émotions dans votre journal intime...",
    notesPlaceholder: "Objectifs et réflexions..."
  },
  lb: {
    moods: {
      happy: 'مبسوطة', calm: 'رايقة', normal: 'عادي', sad: 'زعلانة', angry: 'معصبة',
      stressed: 'مضغوطة', anxious: 'قلقانة', tired: 'تعبانة', energetic: 'نشيطة'
    },
    painLocations: {
      'Head': 'الراس', 'Back': 'الضهر', 'Abdomen': 'البطن',
      'Lower abdomen': 'أسفل البطن', 'Legs': 'الإجرين', 'Breast': 'الصدر', 'Other': 'تاني'
    },
    energyLevels: {
      very_low: 'واطي كتير', low: 'واطي', normal: 'عادي', high: 'عالي', very_high: 'عالي كتير'
    },
    waterUnit: (glasses, ml) => `${glasses} كبايات مي (حوالي ${ml} مل)`,
    journalPlaceholder: "عبري عن مشاعرك بحرية...",
    notesPlaceholder: "ملاحظاتك اليومية..."
  },
  ar: {
    moods: {
      happy: 'سعيدة', calm: 'هادئة', normal: 'طبيعي', sad: 'حزينة', angry: 'غاضبة',
      stressed: 'متوترة', anxious: 'قلقة', tired: 'مرهقة', energetic: 'مفعمة بالنشاط'
    },
    painLocations: {
      'Head': 'الرأس', 'Back': 'الظهر', 'Abdomen': 'البطن',
      'Lower abdomen': 'أسفل البطن', 'Legs': 'الساقين', 'Breast': 'الثديين', 'Other': 'أخرى'
    },
    energyLevels: {
      very_low: 'منخفض جداً', low: 'منخفض', normal: 'متوسط', high: 'مرتفع', very_high: 'مرتفع جداً'
    },
    waterUnit: (glasses, ml) => `${glasses} أكواب ماء (قرابة ${ml} مل)`,
    journalPlaceholder: "دوّني مشاعركِ وأفكاركِ اليومية بحرية...",
    notesPlaceholder: "أهداف وملاحظات العناية بالنفس..."
  }
};

export default function DailyLog() {
  const { t, language } = useLanguage();
  const dlDict = DAILYLOG_I18N[language] || DAILYLOG_I18N.en;
  const { userPhone, motherPhone, motherName, openNativePhoneSms } = useSmsAlert();
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [smsSending, setSmsSending] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState(false);
  const [lastSummaryText, setLastSummaryText] = useState('');

  const moodOptions = [
    { id: 'happy', emoji: '😊', label: dlDict.moods.happy },
    { id: 'calm', emoji: '🧘', label: dlDict.moods.calm },
    { id: 'normal', emoji: '🙂', label: dlDict.moods.normal },
    { id: 'sad', emoji: '😔', label: dlDict.moods.sad },
    { id: 'angry', emoji: '😡', label: dlDict.moods.angry },
    { id: 'stressed', emoji: '😰', label: dlDict.moods.stressed },
    { id: 'anxious', emoji: '😟', label: dlDict.moods.anxious },
    { id: 'tired', emoji: '😴', label: dlDict.moods.tired },
    { id: 'energetic', emoji: '⚡', label: dlDict.moods.energetic }
  ];

  const painLocationLabels = dlDict.painLocations;

  const painLocationOptions = [
    'Head', 'Back', 'Abdomen', 'Lower abdomen', 'Legs', 'Breast', 'Other'
  ];

  const energyLabels = dlDict.energyLevels;

  const energyLevels = ['very_low', 'low', 'normal', 'high', 'very_high'];

  const [logData, setLogData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'happy',
    painLevel: 1,
    painLocations: ['Lower abdomen'],
    waterGlasses: 6,
    waterTarget: 8,
    sleep: { bedtime: '22:30', wakeTime: '06:30', hours: 8 },
    symptoms: ['Mild bloating'],
    energy: 'high',
    medication: { taken: true, names: ['Multivitamin'] },
    thoughts: {
      howFeeling: 'Energized and positive this morning.',
      whatThinking: 'Preparing for my upcoming project review and focusing on balanced nutrition.'
    },
    exercise: { steps: 6500, runningKm: 1.5, joggingKm: 2.0, notes: 'Morning light jog in the park' },
    foodNotes: 'Oatmeal with berries for breakfast, vegetable bowl for lunch'
  });

  const [customSymptom, setCustomSymptom] = useState('');

  useEffect(() => {
    const fetchToday = async () => {
      try {
        const res = await api.get('/daily/today');
        if (res.success && res.log) {
          setLogData((prev) => ({ ...prev, ...res.log }));
        }
      } catch (err) {
        console.warn('Daily log fetch fallback:', err.message);
      }
    };
    fetchToday();
  }, []);

  const handlePainLocationToggle = (loc) => {
    setLogData((prev) => {
      const exists = prev.painLocations.includes(loc);
      return {
        ...prev,
        painLocations: exists
          ? prev.painLocations.filter((x) => x !== loc)
          : [...prev.painLocations, loc]
      };
    });
  };

  const handleAddSymptom = (e) => {
    e.preventDefault();
    if (!customSymptom.trim()) return;
    if (!logData.symptoms.includes(customSymptom.trim())) {
      setLogData((prev) => ({
        ...prev,
        symptoms: [...prev.symptoms, customSymptom.trim()]
      }));
    }
    setCustomSymptom('');
  };

  const handleRemoveSymptom = (sym) => {
    setLogData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.filter((s) => s !== sym)
    }));
  };

  const sendWellnessSmsToPhone = async () => {
    setSmsSending(true);
    try {
      const moodText = moodOptions.find(m => m.id === logData.mood)?.label || logData.mood;
      const energyText = energyLabels[logData.energy] || logData.energy;
      const summaryText = language === 'ta'
        ? `[FemTech தினசரி நலம்] ஜனனி! உங்கள் நலம் பதிவானது: மனநிலை: ${moodText}, நீர்: ${logData.waterGlasses}/8 டம்ளர், தூக்கம்: ${logData.sleep.hours} மணிநேரம், ஆற்றல்: ${energyText}. உடலை நன்றாக பார்த்துக் கொள்ளுங்கள்! 🌸`
        : `[FemTech Daily Wellness] Janani! Your log: Mood: ${moodText}, Water: ${logData.waterGlasses}/8 glasses, Sleep: ${logData.sleep.hours} hrs, Energy: ${energyText}. Take good care of yourself! 🌸`;

      setLastSummaryText(summaryText);

      await fetch('/api/sms/send-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone,
          motherPhone,
          motherName,
          message: summaryText,
          alertType: 'Daily Wellness SMS Report'
        })
      });

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🌸 FemTech Daily Wellness Dispatched', {
          body: `${summaryText}\n📱 Sent to: ${userPhone}`,
          icon: '/favicon.ico'
        });
      }

      setSmsSentNotice(true);
      setTimeout(() => setSmsSentNotice(false), 4500);
    } catch (e) {
      console.warn('SMS dispatch error:', e);
    } finally {
      setSmsSending(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveSuccess(false);
    try {
      await api.post('/daily/save', logData);
      setSaveSuccess(true);
      // Auto-dispatch wellness summary to phone
      sendWellnessSmsToPhone();
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      alert(err.message || 'Error saving daily log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px' }}>
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
            📖
          </div>
          <div>
            <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-dark)' }}>
              {t('dailyLogTitle') || 'My Daily Wellness Log'}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {t('dailyLogSub') || 'Capture your mood, pain levels, hydration, sleep, energy, and private reflections.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={sendWellnessSmsToPhone}
            disabled={smsSending}
            type="button"
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-full)',
              background: 'white',
              border: '1.5px solid #0284c7',
              color: '#0284c7',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.15)',
              transition: 'var(--transition)'
            }}
            title="உங்கள் போனுக்கு இந்த நலம் விபரத்தை SMS-ஆக அனுப்ப"
          >
            <Smartphone size={18} />
            <span>{smsSending ? (language === 'ta' ? 'அனுப்புகிறது...' : 'Sending...') : (language === 'ta' ? '📲 போனுக்கு SMS அனுப்பு' : '📲 Send SMS to Phone')}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary"
            style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Save size={18} />
            <span>{loading ? (t('savingBtn') || 'Saving...') : (t('saveTodayLogBtn') || 'Save Today’s Log')}</span>
          </button>
        </div>
      </div>

      {smsSentNotice && (
        <div style={{
          background: '#f0f9ff',
          border: '1.5px solid #7dd3fc',
          color: '#0369a1',
          borderRadius: 'var(--radius-md)',
          padding: '12px 18px',
          marginBottom: '20px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone size={20} color="#0284c7" />
            <span>{language === 'ta' ? `✓ உங்கள் தினசரி நலம் விபரம் உங்கள் போன் (${userPhone}) எண்ணிற்கு SMS-ஆக அனுப்பப்பட்டது!` : `✓ Daily wellness report dispatched as SMS directly to your phone (${userPhone})!`}</span>
          </div>
          <button
            type="button"
            onClick={() => openNativePhoneSms(userPhone, lastSummaryText)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#0284c7',
              color: 'white',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📱 {language === 'ta' ? 'SMS ஆப்பில் திற' : 'Open in SMS App'}
          </button>
        </div>
      )}

      {saveSuccess && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          borderRadius: 'var(--radius-md)',
          padding: '12px 18px',
          marginBottom: '20px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={18} />
          <span>{t('dailyLogSavedSuccess') || 'Daily wellness log saved successfully to your health timeline!'}</span>
        </div>
      )}

      <DisclaimerBanner />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* 1. MOOD PICKER */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>😊</span> {t('todaysMoodTitle') || 'Today’s Mood'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {moodOptions.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setLogData({ ...logData, mood: m.id })}
                style={{
                  padding: '12px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: logData.mood === m.id ? '2px solid var(--pink-600)' : '1px solid var(--pink-200)',
                  background: logData.mood === m.id ? 'var(--pink-50)' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'var(--transition)'
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{m.emoji}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. WATER COUNTER */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Droplet size={20} color="#0284c7" /> {t('waterIntakeTitle') || 'Water Intake'}
          </h3>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#0284c7' }}>
              {logData.waterGlasses} <span style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>/ {logData.waterTarget}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {dlDict.waterUnit(logData.waterGlasses, logData.waterGlasses * 250)}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={() => setLogData({ ...logData, waterGlasses: Math.max(0, logData.waterGlasses - 1) })}
              className="btn-secondary"
              style={{ width: '48px', height: '48px', borderRadius: '50%', padding: 0 }}
            >
              <Minus size={20} />
            </button>
            <button
              onClick={() => setLogData({ ...logData, waterGlasses: logData.waterGlasses + 1 })}
              className="btn-primary"
              style={{ width: '48px', height: '48px', borderRadius: '50%', padding: 0 }}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* 3. PAIN SLIDER & LOCATIONS */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚡</span> {t('painLevelTitle') || 'Pain Level (0–10)'}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t('painSeverityLabel') || 'Severity:'}</span>
            <strong style={{ fontSize: '1.2rem', color: logData.painLevel > 4 ? '#e11d48' : '#059669' }}>
              {logData.painLevel} / 10
            </strong>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            value={logData.painLevel}
            onChange={(e) => setLogData({ ...logData, painLevel: Number(e.target.value) })}
            style={{ width: '100%', accentColor: 'var(--pink-600)', marginBottom: '16px' }}
          />

          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              {t('painLocationsLabel') || 'Pain Locations:'}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {painLocationOptions.map((loc) => {
                const isSelected = logData.painLocations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handlePainLocationToggle(loc)}
                    style={{
                      fontSize: '0.78rem',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--pink-300)',
                      background: isSelected ? 'var(--pink-600)' : 'white',
                      color: isSelected ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {painLocationLabels[loc] || loc}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. SLEEP & ENERGY */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Moon size={20} color="#7c3aed" /> {t('sleepEnergyTitle') || 'Sleep & Energy'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('bedtimeLabel') || 'Bedtime'}</label>
              <input
                type="time"
                value={logData.sleep.bedtime}
                onChange={(e) => setLogData({ ...logData, sleep: { ...logData.sleep, bedtime: e.target.value } })}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('wakeTimeLabel') || 'Wake Time'}</label>
              <input
                type="time"
                value={logData.sleep.wakeTime}
                onChange={(e) => setLogData({ ...logData, sleep: { ...logData.sleep, wakeTime: e.target.value } })}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              {t('energyLevelLabel') || 'Energy Level:'} <strong>{energyLabels[logData.energy] || logData.energy.replace('_', ' ').toUpperCase()}</strong>
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {energyLevels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLogData({ ...logData, energy: lvl })}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: '1px solid var(--pink-200)',
                    background: logData.energy === lvl ? 'var(--rose-primary)' : 'white',
                    color: logData.energy === lvl ? 'white' : 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {energyLabels[lvl] || lvl.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. MEDICATION ADHERENCE */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Pill size={20} color="var(--rose-primary)" /> {t('medAdherenceTitle') || 'Medication Adherence'}
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
            {t('medAdherenceQuestion') || 'Did you take your prescribed medication today?'}
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setLogData({ ...logData, medication: { ...logData.medication, taken: true } })}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: logData.medication.taken ? '2px solid #059669' : '1px solid #cbd5e1',
                background: logData.medication.taken ? '#ecfdf5' : 'white',
                color: logData.medication.taken ? '#047857' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {t('yesTaken') || '✓ Yes, Taken'}
            </button>

            <button
              type="button"
              onClick={() => setLogData({ ...logData, medication: { ...logData.medication, taken: false } })}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: !logData.medication.taken ? '2px solid #e11d48' : '1px solid #cbd5e1',
                background: !logData.medication.taken ? '#fff1f2' : 'white',
                color: !logData.medication.taken ? '#be123c' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {t('notYet') || '✕ Not Yet'}
            </button>
          </div>
        </div>

        {/* 6. SYMPTOMS LIST */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🩺</span> {t('loggedSymptomsTitle') || 'Logged Symptoms'}
          </h3>

          <form onSubmit={handleAddSymptom} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder={t('addSymptomPlaceholder') || 'e.g. Mild headache, back pain'}
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--pink-200)' }}
            />
            <button type="submit" className="btn-secondary" style={{ padding: '8px 14px' }}>
              {t('addBtn') || 'Add'}
            </button>
          </form>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {logData.symptoms.map((s) => (
              <span
                key={s}
                style={{
                  background: 'var(--pink-100)',
                  color: 'var(--pink-600)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {s}
                <button
                  type="button"
                  onClick={() => handleRemoveSymptom(s)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--pink-600)' }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PRIVATE THOUGHTS JOURNAL */}
      <div className="glass-card" style={{ padding: '28px', background: 'white', borderRadius: 'var(--radius-lg)', marginTop: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔒</span> {t('privateThoughtsJournal') || 'Private Reflections & Thoughts Journal'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              {t('howFeelingQ') || 'How are you feeling today?'}
            </label>
            <textarea
              rows="3"
              value={logData.thoughts.howFeeling}
              onChange={(e) => setLogData({ ...logData, thoughts: { ...logData.thoughts, howFeeling: e.target.value } })}
              placeholder={dlDict.journalPlaceholder}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--pink-200)', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              {t('whatThinkingQ') || 'What are you thinking about today?'}
            </label>
            <textarea
              rows="3"
              value={logData.thoughts.whatThinking}
              onChange={(e) => setLogData({ ...logData, thoughts: { ...logData.thoughts, whatThinking: e.target.value } })}
              placeholder={dlDict.notesPlaceholder}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--pink-200)', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '12px 28px' }}>
            {t('saveAllEntriesBtn') || 'Save All Today’s Entries'}
          </button>
        </div>
      </div>
    </div>
  );
}
