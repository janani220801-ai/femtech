import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Wind, Play, Pause, RotateCcw, Sparkles, Heart } from 'lucide-react';

const BREATH_TEXTS = {
  en: {
    title: 'Diaphragmatic Breathing & Pelvic Relaxation Pacer',
    subtitle: 'Clinically proven 4-7-8 breathing cadence to downregulate cortisol and relieve pelvic muscle tension.',
    inhale: 'Breathe In Deeply...',
    hold: 'Gently Hold...',
    exhale: 'Slowly Exhale...',
    cyclesCompleted: 'Cycles Completed',
    startBtn: 'Begin Relaxation Pacer',
    pauseBtn: 'Pause Pacer',
    resetBtn: 'Reset',
    benefitTip: '💡 3 minutes of slow diaphragmatic pacing activates the parasympathetic vagus nerve, reducing cramp severity by up to 40%.'
  },
  ta: {
    title: 'ஆழ்ந்த மூச்சுப்பயிற்சி & இடுப்புத் தசை தளர்வு வழிகாட்டி',
    subtitle: 'மன அழுத்தத்தைக் குறைத்து, அடிவயிற்று தசை இறுக்கத்தை தளர்த்த உதவும் 4-7-8 சுவாசப் பயிற்சி.',
    inhale: 'ஆழமாக மூச்சை உள்ளிழுக்கவும் (4 வினாடி)...',
    hold: 'மெதுவாக மூச்சை அடக்கவும் (7 வினாடி)...',
    exhale: 'மெதுவாக மூச்சை வெளியேற்றவும் (8 வினாடி)...',
    cyclesCompleted: 'முடிக்கப்பட்ட சுழற்சிகள்',
    startBtn: 'சுவாசப் பயிற்சியைத் தொடங்கு',
    pauseBtn: 'இடைநிறுத்து',
    resetBtn: 'மீட்டமை',
    benefitTip: '💡 3 நிமிட ஆழ்ந்த சுவாசப் பயிற்சி மன அழுத்த ஹார்மோனைக் குறைத்து, மாதவிடாய் அடிவயிற்று வலியை 40% வரை எளிதாக்குகிறது.'
  },
  hi: {
    title: 'गहरी सांस एवं पेल्विक विश्राम पेसर (4-7-8 Breathing)',
    subtitle: 'कोर्टिसोल तनाव को कम करने और पेल्विक मांसपेशियों को आराम देने के लिए सांस अभ्यास।',
    inhale: 'गहरी सांस अंदर लें (4 सेकंड)...',
    hold: 'सांस रोकें (7 सेकंड)...',
    exhale: 'धीरे-धीरे सांस छोड़ें (8 सेकंड)...',
    cyclesCompleted: 'पूर्ण किए गए चक्र',
    startBtn: 'अभ्यास शुरू करें',
    pauseBtn: 'रोकें',
    resetBtn: 'रीसेट',
    benefitTip: '💡 3 मिनट का शांत श्वास अभ्यास तनाव को दूर कर ऐंठन और दर्द में 40% तक राहत देता है।'
  }
};

export default function BreathingPacerWidget() {
  const { language } = useLanguage();
  const dict = BREATH_TEXTS[language] || BREATH_TEXTS.en;

  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale'); // 'inhale' | 'hold' | 'exhale'
  const [countdown, setCountdown] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Transition to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            return 7;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 8;
          } else {
            setPhase('inhale');
            setCycleCount((c) => c + 1);
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(4);
    setCycleCount(0);
  };

  const getPhaseColor = () => {
    if (phase === 'inhale') return '#e11d48'; // Rose
    if (phase === 'hold') return '#9333ea';   // Purple
    return '#059669';                         // Emerald exhale
  };

  const getPhaseGradient = () => {
    if (phase === 'inhale') return 'radial-gradient(circle, #ffe4e6 0%, #fecdd3 60%, #fda4af 100%)';
    if (phase === 'hold') return 'radial-gradient(circle, #f3e8ff 0%, #e9d5ff 60%, #d8b4fe 100%)';
    return 'radial-gradient(circle, #ecfdf5 0%, #a7f3d0 60%, #6ee7b7 100%)';
  };

  const getPhaseText = () => {
    if (phase === 'inhale') return dict.inhale;
    if (phase === 'hold') return dict.hold;
    return dict.exhale;
  };

  const getScale = () => {
    if (!isActive) return 1;
    if (phase === 'inhale') return 1.25;
    if (phase === 'hold') return 1.25;
    return 0.88;
  };

  return (
    <div
      className="glass-card card-interactive"
      style={{
        padding: '28px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 50%, #faf5ff 100%)',
        border: '1.5px solid #fecdd3',
        boxShadow: '0 8px 30px rgba(225, 29, 72, 0.08)',
        marginBottom: '26px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(244, 63, 94, 0.3)'
            }}
          >
            <Wind size={22} className={isActive ? 'animate-sparkle-spin' : ''} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: '#1e293b' }}>
              {dict.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
              {dict.subtitle}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#be123c', background: '#ffe4e6', padding: '4px 12px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
            {dict.cyclesCompleted}: {cycleCount}
          </span>
        </div>
      </div>

      {/* INTERACTIVE ANIMATED BREATHING ORB */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 20px',
          minHeight: '260px'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Outer Pulsing Aura Ring */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: `2px dashed ${getPhaseColor()}`,
              opacity: isActive ? 0.6 : 0.2,
              animation: isActive ? 'sparkleTwinkleSpin 16s linear infinite' : 'none'
            }}
          />

          {/* Central Breathing Orb with dynamic scale & color transition */}
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: getPhaseGradient(),
              boxShadow: isActive
                ? `0 0 35px ${getPhaseColor()}66, inset 0 0 25px rgba(255, 255, 255, 0.8)`
                : '0 8px 24px rgba(225, 29, 72, 0.15)',
              transform: `scale(${getScale()})`,
              transition: isActive ? `transform ${countdown}s cubic-bezier(0.4, 0, 0.2, 1), background 1s ease, box-shadow 1s ease` : 'transform 0.4s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={handleToggle}
          >
            <span style={{ fontSize: '2.6rem', fontWeight: 900, color: getPhaseColor(), lineHeight: 1 }}>
              {isActive ? countdown : '▶'}
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e293b', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isActive ? phase : 'Start'}
            </span>
          </div>
        </div>

        {/* Phase Guidance Text */}
        <div style={{ textAlign: 'center', marginTop: '22px' }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: getPhaseColor(), minHeight: '30px' }}>
            {isActive ? getPhaseText() : (language === 'ta' ? 'சுவாசப் பயிற்சியைத் தொடங்க வட்டத்தில் கிளிக் செய்யவும்' : 'Click the orb to start breath pacing')}
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '10px' }}>
        <button
          onClick={handleToggle}
          style={{
            background: isActive ? '#475569' : 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
            color: 'white',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)'
          }}
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}
          <span>{isActive ? dict.pauseBtn : dict.startBtn}</span>
        </button>

        <button
          onClick={handleReset}
          style={{
            background: 'white',
            color: '#64748b',
            border: '1.5px solid #cbd5e1',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RotateCcw size={15} />
          <span>{dict.resetBtn}</span>
        </button>
      </div>

      <div style={{ marginTop: '16px', background: '#fff1f2', padding: '10px 16px', borderRadius: '12px', border: '1px solid #ffe4e6', fontSize: '0.82rem', color: '#9f1239', textAlign: 'center' }}>
        {dict.benefitTip}
      </div>
    </div>
  );
}
