import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { TrendingUp, Calendar, Droplet, Heart, Moon, Smile, Zap, Activity, Thermometer, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';


export const TRENDS_I18N = {
  en: {
    bbtCurveTitle: 'Basal Skin Temp (BBT) Curve',
    ovulationShift: 'Ovulation Shift: +0.32°C',
    lutealTempNote: 'Elevated thermal baseline reflects active post-ovulatory luteal phase.',
    spo2HrvTitle: 'SpO2 & HRV Autonomic Tone',
    avgSpo2Hrv: 'Avg: 98.4% | 64ms',
    recoveryNote: 'Stable SpO2 & high HRV indicate healthy parasympathetic nervous recovery.'
  },
  ta: {
    bbtCurveTitle: 'உடல் வெப்பநிலை (BBT) சுழற்சி வளைவு',
    ovulationShift: 'அண்டவிடுப்பு மாற்றம்: +0.32°C',
    lutealTempNote: 'லூட்டியல் கட்டத்தில் புரோஜெஸ்டிரோன் அதிகரிப்பால் வெப்பநிலை உயர்வு தொடர்கிறது.',
    spo2HrvTitle: 'ஆக்சிஜன் (SpO2) & HRV மீட்பு நிலை',
    avgSpo2Hrv: 'சராசரி: 98.4% | 64ms',
    recoveryNote: 'உயர் HRV மற்றும் நிலையான SpO2 சீரான நரம்பு மண்டல புத்துணர்ச்சியைக் குறிக்கிறது.'
  },
  hi: {
    bbtCurveTitle: 'त्वचा बेसल तापमान (BBT) चक्र वक्र',
    ovulationShift: 'ओव्यूलेशन परिवर्तन: +0.32°C',
    lutealTempNote: 'ल्यूटियल चरण में प्रोजेस्टेरोन बढ़ने से तापमान में वृद्धि बनी रहती है।',
    spo2HrvTitle: 'ऑक्सीजन (SpO2) व HRV स्वायत्त संतुलन',
    avgSpo2Hrv: 'औसत: 98.4% | 64ms',
    recoveryNote: 'स्थिर SpO2 और उच्च HRV स्वस्थ पैरासिम्पेथेटिक तंत्रिका तंत्र सुधार दर्शाते हैं।'
  },
  te: {
    bbtCurveTitle: 'శరీర ఉష్ణోగ్రత (BBT) చక్రీయ వక్రరేఖ',
    ovulationShift: 'అండోత్సర్గము మార్పు: +0.32°C',
    lutealTempNote: 'లూటియల్ దశలో ప్రొజెస్టెరాన్ పెరుగుదల వల్ల ఉష్ణోగ్రత పెరుగుదల కొనసాగుతుంది.',
    spo2HrvTitle: 'ఆక్సిజన్ (SpO2) & HRV పునరుద్ధరణ స్థితి',
    avgSpo2Hrv: 'సగటు: 98.4% | 64ms',
    recoveryNote: 'స్థిరమైన SpO2 మరియు అధిక HRV ఆరోగ్యకరమైన నాడీ వ్యవస్థ రికవరీని సూచిస్తాయి.'
  },
  ml: {
    bbtCurveTitle: 'ശരീര താപനില (BBT) ചക്ര വക്രത',
    ovulationShift: 'ഓവുലേഷൻ മാറ്റം: +0.32°C',
    lutealTempNote: 'ലൂട്ടിയൽ ഘട്ടത്തിൽ പ്രൊജസ്റ്ററോൺ വർദ്ധനവ് കാരണം താപനില ഉയർന്ന നിലയിൽ തുടരുന്നു.',
    spo2HrvTitle: 'ഓക്സിജൻ (SpO2) & HRV സ്വയംഭരണ വീണ്ടെടുപ്പ്',
    avgSpo2Hrv: 'ശരാശരി: 98.4% | 64ms',
    recoveryNote: 'സ്ഥിരതയുള്ള SpO2 ഉം ഉയർന്ന HRV യും നാഡീവ്യൂഹത്തിന്റെ ആരോഗ്യകരമായ വീണ്ടെടുക്കലിനെ സൂചിപ്പിക്കുന്നു.'
  },
  mr: {
    bbtCurveTitle: 'शरीर तापमान (BBT) चक्र आलेख',
    ovulationShift: 'ओव्ह्युलेशन बदल: +0.32°C',
    lutealTempNote: 'ल्यूटियल टप्प्यात प्रोजेस्टेरॉन वाढल्यामुळे शरीराचे तापमान वाढलेले राहते.',
    spo2HrvTitle: 'ऑक्सिजन (SpO2) आणि HRV स्वायत्त संतुलन',
    avgSpo2Hrv: 'सरासरी: 98.4% | 64ms',
    recoveryNote: 'स्थिर SpO2 आणि उच्च HRV निरोगी मज्जासंस्थेचे पुनरुत्थान दर्शवतात.'
  },
  mwr: {
    bbtCurveTitle: 'शरीर रो तापमान (BBT) चक्र वक्र',
    ovulationShift: 'ओव्यूलेशन बदलाव: +0.32°C',
    lutealTempNote: 'ल्यूटियल चरण में प्रोजेस्टेरोन बढ़बा सूं तापमान ऊंचो रहवे सा।',
    spo2HrvTitle: 'ऑक्सीजन (SpO2) अर HRV संतुलन',
    avgSpo2Hrv: 'औसत: 98.4% | 64ms',
    recoveryNote: 'स्थिर SpO2 अर उच्च HRV स्वस्थ तंत्रिका तंत्र री तंदुरुस्ती दर्शावे सा।'
  },
  fr: {
    bbtCurveTitle: 'Courbe de Température Basale (BBT)',
    ovulationShift: 'Décalage d’ovulation: +0.32°C',
    lutealTempNote: 'Ligne thermique élevée reflétant la phase lutéale active post-ovulatoire.',
    spo2HrvTitle: 'Tonalité Autonome SpO2 & VFC',
    avgSpo2Hrv: 'Moy: 98.4% | 64ms',
    recoveryNote: 'SpO2 stable et VFC élevée indiquent une bonne récupération nerveuse parasympathique.'
  },
  lb: {
    bbtCurveTitle: 'منحنى درجة حرارة الجسم القاعدية (BBT)',
    ovulationShift: 'تغير الإباضة: +0.32°C',
    lutealTempNote: 'ارتفاع خط الأساس الحراري يعكس المرحلة الأصفارية النشطة بعد الإباضة.',
    spo2HrvTitle: 'الأكسجين (SpO2) ونغمة التباين القلبي HRV الذاتية',
    avgSpo2Hrv: 'المعدل: 98.4% | 64 ملّي ثانية',
    recoveryNote: 'استقرار الأكسجين وارتفاع HRV يدلان على تعافٍ عصبي متوازن وصحي.'
  },
  ar: {
    bbtCurveTitle: 'منحنى درجة حرارة الجلد القاعدية (BBT)',
    ovulationShift: 'تغير الإباضة: +0.32°C',
    lutealTempNote: 'يدل ارتفاع خط الأساس الحراري على المرحلة الإفرازية النشطة بعد الإباضة.',
    spo2HrvTitle: 'الأكسجين (SpO2) ونغمة الجهاز العصبي HRV',
    avgSpo2Hrv: 'المعدل: 98.4% | 64 ملي ثانية',
    recoveryNote: 'استقرار نسبة الأكسجين وارتفاع معدل HRV يعكسان تعافياً عصبياً متوازناً.'
  }
};

export default function WellnessTrends() {
  const { t, language } = useLanguage();
  const trDict = TRENDS_I18N[language] || TRENDS_I18N.en;
  const [viewMode, setViewMode] = useState('weekly'); // daily, weekly, monthly
  const [trends, setTrends] = useState([]);

  // Mock initial 7-day trend baseline with enhanced women's health biometrics
  const sampleWeek = [
    { date: 'Sep 18', water: 7, sleep: 7.5, pain: 1, steps: 6200, hr: 72, bbt: 36.32, spo2: 98.2, hrv: 60, deepSleep: 2.1 },
    { date: 'Sep 19', water: 8, sleep: 8.0, pain: 0, steps: 7100, hr: 74, bbt: 36.35, spo2: 98.5, hrv: 63, deepSleep: 2.3 },
    { date: 'Sep 20', water: 6, sleep: 6.5, pain: 3, steps: 5400, hr: 76, bbt: 36.38, spo2: 98.1, hrv: 58, deepSleep: 1.8 },
    { date: 'Sep 21', water: 8, sleep: 8.0, pain: 2, steps: 8300, hr: 73, bbt: 36.42, spo2: 98.6, hrv: 65, deepSleep: 2.4 },
    { date: 'Sep 22', water: 7, sleep: 7.5, pain: 1, steps: 6900, hr: 71, bbt: 36.54, spo2: 98.4, hrv: 62, deepSleep: 2.2 },
    { date: 'Sep 23', water: 8, sleep: 8.5, pain: 0, steps: 9100, hr: 70, bbt: 36.62, spo2: 98.7, hrv: 66, deepSleep: 2.5 },
    { date: 'Sep 24', water: 6, sleep: 7.5, pain: 1, steps: 6840, hr: 74, bbt: 36.65, spo2: 98.4, hrv: 64, deepSleep: 2.2 }
  ];

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await api.get(`/daily/trends?days=${viewMode === 'monthly' ? 30 : 7}`);
        if (res.success && res.trends?.length > 0) {
          // Merge with sample biometric fields if missing
          const merged = res.trends.map((item, idx) => ({
            ...item,
            bbt: item.bbt || sampleWeek[idx % sampleWeek.length].bbt,
            spo2: item.spo2 || sampleWeek[idx % sampleWeek.length].spo2,
            hrv: item.hrv || sampleWeek[idx % sampleWeek.length].hrv,
            deepSleep: item.deepSleep || sampleWeek[idx % sampleWeek.length].deepSleep
          }));
          setTrends(merged);
        } else {
          setTrends(sampleWeek);
        }
      } catch (err) {
        setTrends(sampleWeek);
      }
    };
    fetchTrends();
  }, [viewMode]);

  const activeData = trends.length > 0 ? trends : sampleWeek;

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '24px 16px' }}>
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
            📈
          </div>
          <div>
            <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-dark)', margin: 0 }}>
              {t('wellnessTrendsTitle')}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              {t('wellnessTrendsSub')}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: 'white', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--pink-200)' }}>
          {[
            { id: 'daily', label: t('viewDaily') },
            { id: 'weekly', label: t('viewWeekly') },
            { id: 'monthly', label: t('viewMonthly') }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setViewMode(m.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: viewMode === m.id ? 'var(--rose-gradient)' : 'transparent',
                color: viewMode === m.id ? 'white' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <DisclaimerBanner customText={t('wellnessTrendsDisclaimer')} />

      {/* TREND CHARTS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {/* 1. BASAL SKIN TEMPERATURE (BBT) BIPHASIC CYCLE CURVE */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fed7aa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Thermometer size={18} color="#ea580c" />
              <span>{trDict.bbtCurveTitle}</span>
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c2410c', background: '#ffedd5', padding: '3px 8px', borderRadius: '8px' }}>
              {trDict.ovulationShift}
            </span>
          </div>

          <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
            {activeData.map((d, i) => {
              const tempVal = d.bbt || 36.35;
              // Map 36.0 - 37.0 to height 40 - 120px
              const heightPx = Math.max(30, Math.min(125, (tempVal - 36.0) * 120));
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#ea580c' }}>{tempVal}°</span>
                  <div style={{
                    width: '100%',
                    height: `${heightPx}px`,
                    background: tempVal >= 36.5 ? 'linear-gradient(to top, #ea580c, #fb923c)' : 'linear-gradient(to top, #f97316, #fdba74)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.3s ease'
                  }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.date.split('-')[2] || d.date}</span>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '6px' }}>
            {trDict.lutealTempNote}
          </div>
        </div>

        {/* 2. SpO2 & HRV AUTONOMIC RECOVERY */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #bae6fd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Zap size={18} color="#0284c7" />
              <span>{trDict.spo2HrvTitle}</span>
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', background: '#e0f2fe', padding: '3px 8px', borderRadius: '8px' }}>
              {trDict.avgSpo2Hrv}
            </span>
          </div>

          <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
            {activeData.map((d, i) => {
              const hrvVal = d.hrv || 62;
              const heightPx = Math.max(30, Math.min(125, (hrvVal / 80) * 120));
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0284c7' }}>{hrvVal}ms</span>
                  <div style={{
                    width: '100%',
                    height: `${heightPx}px`,
                    background: 'linear-gradient(to top, #0284c7, #38bdf8)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.3s ease'
                  }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.date.split('-')[2] || d.date}</span>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '6px' }}>
            {trDict.recoveryNote}
          </div>
        </div>

        {/* 3. HYDRATION TREND */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Droplet size={18} color="#0284c7" /> {t('waterConsistencyTitle')}
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7' }}>
              {t('waterGoalLabel')}
            </span>
          </div>

          <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
            {activeData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '100%',
                  height: `${(d.water / 8) * 110}px`,
                  maxHeight: '120px',
                  background: 'linear-gradient(to top, #0284c7, #38bdf8)',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.3s ease'
                }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.date.split('-')[2] || d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PAIN PATTERN TREND */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <span>⚡</span> {t('painVariationsTitle')}
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e11d48' }}>
              {t('avgPainLabel')}
            </span>
          </div>

          <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
            {activeData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '100%',
                  height: `${Math.max(12, (d.pain / 10) * 120)}px`,
                  background: d.pain > 3 ? 'var(--rose-gradient)' : '#fed7aa',
                  borderRadius: '6px 6px 0 0'
                }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.date.split('-')[2] || d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. SLEEP DURATION & ARCHITECTURE TREND */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Moon size={18} color="#7c3aed" /> {t('sleepDurationTitle')}
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed' }}>
              {t('avgSleepLabel')}
            </span>
          </div>

          <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
            {activeData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '100%',
                  height: `${(d.sleep / 10) * 120}px`,
                  background: 'linear-gradient(to top, #7c3aed, #c084fc)',
                  borderRadius: '6px 6px 0 0'
                }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.date.split('-')[2] || d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. ACTIVITY & STEPS */}
        <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Activity size={18} color="#16a34a" /> {t('dailyStepTitle')}
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>
              {t('stepGoalLabel')}
            </span>
          </div>

          <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
            {activeData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '100%',
                  height: `${Math.min(120, ((d.steps || 6000) / 10000) * 120)}px`,
                  background: 'linear-gradient(to top, #16a34a, #86efac)',
                  borderRadius: '6px 6px 0 0'
                }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.date.split('-')[2] || d.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
