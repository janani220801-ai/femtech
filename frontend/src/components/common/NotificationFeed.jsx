import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSmsAlert } from '../../context/SmsAlertContext';
import {
  Bell,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  X,
  Sparkles,
  Droplets,
  Moon,
  Pill,
  Smile,
  Utensils,
  Volume2,
  Edit2,
  Check,
  Zap,
  ShieldCheck,
  Users,
  Smartphone,
  Key,
  Globe,
  Wifi,
  ExternalLink,
  QrCode
} from 'lucide-react';

export default function NotificationFeed({ isOpen, onClose }) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const {
    userPhone,
    motherName,
    motherPhone,
    saveBothNumbers,
    is10MinActive,
    toggle10MinCycle,
    countdownText,
    trigger10MinAlertNow,
    triggerSlotSMS,
    messages,
    sendUserReply,
    notificationPermission,
    requestNotificationAccess,
    openNativePhoneSms
  } = useSmsAlert();

  const userName = user?.name ? user.name.split(' ')[0] : 'Janani';

  // Local state for editing registered numbers
  const [showEditNumbers, setShowEditNumbers] = useState(false);
  const [editPhone, setEditPhone] = useState(userPhone);
  const [editMotherName, setEditMotherName] = useState(motherName);
  const [editMotherPhone, setEditMotherPhone] = useState(motherPhone);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Real Cellular SMS Gateway Configuration State
  const [showGatewayConfig, setShowGatewayConfig] = useState(false);
  const [fast2smsKey, setFast2smsKey] = useState(() => localStorage.getItem('femtech_fast2sms_key') || '');
  const [gatewayStatus, setGatewayStatus] = useState(null);
  const [sendingRealSms, setSendingRealSms] = useState(false);

  const handleSaveGatewayKey = (e) => {
    e.preventDefault();
    localStorage.setItem('femtech_fast2sms_key', fast2smsKey.trim());
    fetch('/api/sms/save-gateway-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fast2smsKey: fast2smsKey.trim() })
    }).catch(() => {});
    setGatewayStatus({
      type: 'success',
      msg: language === 'ta' ? '✓ Fast2SMS API Key சேமிக்கப்பட்டது!' : '✓ Fast2SMS API Key Saved!'
    });
    setTimeout(() => setGatewayStatus(null), 3500);
  };

  const handleDispatchRealCellularSms = async () => {
    setSendingRealSms(true);
    setGatewayStatus({
      type: 'info',
      msg: language === 'ta' ? 'டெலிகாம் செல்லுலார் கேட்வேயுடன் தொடர்பு கொள்கிறது...' : 'Connecting to Telecom Cellular Gateway...'
    });

    try {
      const res = await fetch('/api/sms/send-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone,
          motherPhone,
          motherName,
          fast2smsApiKey: fast2smsKey.trim() || undefined,
          message: language === 'ta'
            ? `[FemTech Live SMS] வணக்கம் Janani! 10 நிமிட நல நினைவூட்டல்: தண்ணி குடிச்சியா? 8 டம்ளர் முடிச்சிட்டியா? உடலை நீரேற்றத்துடன் வைத்துக்கொள்.`
            : `[FemTech Live SMS] Hello Janani! 10-Minute check-in: Did you drink water? Reached 8 glasses goal? Stay hydrated.`,
          alertType: 'Real Handset Cellular SMS'
        })
      });
      const data = await res.json();
      if (data.deliveryMode?.includes('CELLULAR')) {
        setGatewayStatus({
          type: 'success',
          msg: language === 'ta'
            ? `✓ உங்கள் செல்போன் எண் ${userPhone}-க்கு Fast2SMS வழியாக நேரடி SMS வெற்றிகரமாக அனுப்பப்பட்டது!`
            : `✓ Real Cellular SMS dispatched to your phone ${userPhone} via Fast2SMS!`
        });
      } else {
        setGatewayStatus({
          type: 'warning',
          msg: language === 'ta'
            ? `ℹ️ SMS பதிவு செய்யப்பட்டது. உங்கள் நிஜ போனுக்கு செல்லுலார் SMS வர, கீழே உள்ள Fast2SMS API Key-ஐ உள்ளிடவும் அல்லது 'என் போன் SMS ஆப்பில் திறக்க' பட்டனை அழுத்தவும்.`
            : `ℹ️ Logged to gateway. To deliver physical cellular SMS to handset, paste Fast2SMS API Key or click 'Open in Phone SMS App'.`
        });
      }
    } catch (e) {
      setGatewayStatus({
        type: 'error',
        msg: language === 'ta' ? 'கேட்வே பிழை: ' + e.message : 'Gateway Error: ' + e.message
      });
    } finally {
      setSendingRealSms(false);
    }
  };

  // Chat reply input
  const [inputText, setInputText] = useState('');

  // 5 Scheduled Notification Slots requested by User
  const scheduleSlots = [
    {
      id: 'slot_0600',
      time: '06:00 AM',
      icon: <Clock size={16} color="#e11d48" />,
      tag: 'Morning Wake-up & Sleep',
      textEn: `Good morning ${userName}! 🌸 Did you wake up refreshed? How did you sleep? Don't forget your morning glass of warm water!`,
      textTa: `காலை வணக்கம் ${userName}! 🌸 நன்றாக தூங்கினீர்களா? இன்று உடல்நிலை எப்படி இருக்கிறது? எழுந்தவுடன் ஒரு டம்ளர் வெதுவெதுப்பான தண்ணீர் குடிக்கவும்.`
    },
    {
      id: 'slot_1200',
      time: '12:00 PM',
      icon: <Utensils size={16} color="#0d9488" />,
      tag: 'Noon Lunch & Hydration',
      textEn: `Lunchtime check-in! 🍱 Did you have lunch? Have you had at least 4 glasses of water so far today?`,
      textTa: `மதிய உணவு நேரம்! 🍱 மதிய உணவு சாப்பிட்டீர்களா? இதுவரை 4 டம்ளர் தண்ணீர் குடித்துவிட்டீர்களா?`
    },
    {
      id: 'slot_1800',
      time: '06:00 PM',
      icon: <Smile size={16} color="#f59e0b" />,
      tag: 'Evening Mood & Water Target',
      textEn: `Evening wellness check! 🌇 How is your mood and energy right now? Are you close to your 8-glass water goal?`,
      textTa: `மாலை வணக்கம்! 🌇 உங்கள் மனநிலை மற்றும் உடல்நிலை இப்போது எப்படி இருக்கிறது? 8 டம்ளர் தண்ணீர் இலக்கை அடைந்துவிட்டீர்களா?`
    },
    {
      id: 'slot_2000',
      time: '08:00 PM',
      icon: <Pill size={16} color="#7c3aed" />,
      tag: 'Dinner & Medication Check',
      textEn: `Dinner time check-in! 🌙 Did you have your dinner? Did you take your prescribed evening medicines?`,
      textTa: `இரவு உணவு நேரம்! 🌙 இரவு உணவு சாப்பிட்டீர்களா? உங்கள் மாலை மாத்திரைகளை எடுத்துக்கொண்டீர்களா?`
    },
    {
      id: 'slot_2200',
      time: '10:00 PM',
      icon: <Moon size={16} color="#4f46e5" />,
      tag: 'Bedtime & Sleep Routine',
      textEn: `Bedtime! 🛏️ Time to disconnect from screens, unwind your mind, and prepare for deep restorative sleep. Good night!`,
      textTa: `தூங்கும் நேரம்! 🛏️ உங்கள் கண்களுக்கு ஓய்வு கொடுத்து நிம்மதியாக உறங்கவும். இனிய இரவு வணக்கம்!`
    }
  ];

  const handleSavePhoneNumbers = (e) => {
    e.preventDefault();
    saveBothNumbers(editPhone, editMotherPhone, editMotherName);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowEditNumbers(false);
    }, 1500);
  };

  const handleUserReply = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendUserReply(inputText.trim());
    setInputText('');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.72)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '580px',
        width: '100%',
        height: '92vh',
        maxHeight: '740px',
        background: '#ffffff',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
        border: '1.5px solid #fecdd3',
        overflow: 'hidden',
        animation: 'slideUp 0.25s ease'
      }}>
        {/* Header Bar */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
          borderBottom: '1px solid #fecdd3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: '#e11d48',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
            }}>
              <Phone size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#881337', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{language === 'ta' ? '30-நிமிட நேரடி நலவாழ்வு நினைவூட்டல் மையம்' : '30-Minute Wellness Check-in Hub'}</span>
                <span style={{
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: is10MinActive ? '#10b981' : '#94a3b8',
                  color: 'white',
                  fontWeight: 700
                }}>
                  {is10MinActive ? (language === 'ta' ? '● இயங்குகிறது' : '● ACTIVE') : (language === 'ta' ? 'இடைநிறுத்தப்பட்டது' : 'PAUSED')}
                </span>
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.74rem', color: '#9f1239', fontWeight: 600 }}>
                {language === 'ta'
                  ? 'உங்கள் போன் & தாய் கவிதாவின் எண்ணுக்கு இணைக்கப்பட்ட SMS சேவை'
                  : 'Linked Dual-SMS to You & Kavitha (Mother)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: '1px solid #fecdd3',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* LINKED CONTACTS BAR & NUMBER UPDATE BUTTON */}
        <div style={{
          padding: '10px 16px',
          background: '#fdf2f8',
          borderBottom: '1px solid #fbcfe8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem' }}>📱</span>
              <span style={{ fontSize: '0.75rem', color: '#831843' }}>
                {language === 'ta' ? 'என் எண்:' : 'My Phone:'} <strong>{userPhone}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem' }}>👩‍👧</span>
              <span style={{ fontSize: '0.75rem', color: '#831843' }}>
                {language === 'ta' ? 'தாய் (கவிதா):' : 'Mother (Kavitha):'} <strong>{motherPhone}</strong>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
              }}
              title="உங்கள் செல்போனின் சொந்த SMS ஆப்பை உடனே திறக்க"
            >
              <Smartphone size={12} />
              <span>{language === 'ta' ? '📲 போன் SMS ஆப்' : '📲 Phone SMS App'}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setShowGatewayConfig((prev) => !prev);
                setShowEditNumbers(false);
              }}
              style={{
                background: showGatewayConfig ? '#065f46' : 'white',
                color: showGatewayConfig ? 'white' : '#047857',
                border: '1px solid #10b981',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Key size={12} />
              <span>{showGatewayConfig ? (language === 'ta' ? 'மூடுக' : 'Close') : (language === 'ta' ? '🔑 நிஜ SMS கேட்வே' : '🔑 Real SMS Gateway')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEditPhone(userPhone);
                setEditMotherName(motherName);
                setEditMotherPhone(motherPhone);
                setShowEditNumbers((prev) => !prev);
                setShowGatewayConfig(false);
              }}
              style={{
                background: showEditNumbers ? '#831843' : 'white',
                color: showEditNumbers ? 'white' : '#be123c',
                border: '1px solid #f43f5e',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Edit2 size={12} />
              <span>{showEditNumbers ? (language === 'ta' ? 'மூடுக' : 'Close') : (language === 'ta' ? 'எண்களை மாற்றுக' : 'Change Numbers')}</span>
            </button>
          </div>
        </div>

        {/* REAL CELLULAR SMS GATEWAY CONFIGURATION DRAWER */}
        {showGatewayConfig && (
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            borderBottom: '2px solid #86efac',
            animation: 'fadeIn 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={18} color="#059669" />
                <strong style={{ fontSize: '0.92rem', color: '#065f46' }}>
                  {language === 'ta' ? '📡 நிஜ செல்போன் SMS கேட்வே இணைப்பு (Fast2SMS / Telecom)' : '📡 Real Mobile Cellular SMS Gateway Setup'}
                </strong>
              </div>
              <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '8px', background: '#dcfce7', color: '#15803d', fontWeight: 700 }}>
                Airtel • Jio • Vodafone
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '0.76rem', color: '#047857', lineHeight: 1.45 }}>
              {language === 'ta'
                ? 'வெறும் பிரவுசரால் தனியாக செல்போன் டவர்களுடன் பேசி நிஜ SMS அனுப்ப முடியாது. உங்கள் நிஜ மொபைல் ஹேண்ட்செட்டிற்கு நேரடி செல்லுலார் SMS வர, Fast2SMS தளத்தில் (fast2sms.com) 1 நிமிடத்தில் இலவசமாக கிடைக்கும் API Key-ஐ இங்கு உள்ளிடவும் (50 இலவச SMS). அல்லது கீழே உள்ள போன் இணைப்பை பயன்படுத்தலாம்.'
                : 'Browsers cannot dispatch cellular radio signals on their own. To receive physical text messages on your mobile handset in India, provide your free Fast2SMS API Key (from fast2sms.com) or use the direct SIM link below.'}
            </p>

            {/* Mobile Direct Wi-Fi Access Tip */}
            <div style={{
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'white',
              border: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wifi size={14} color="#059669" />
                <span style={{ fontSize: '0.74rem', color: '#065f46', fontWeight: 600 }}>
                  {language === 'ta' ? 'அல்லது உங்கள் போன் Chrome-இல் திறக்கவும்:' : 'Or open in your phone’s mobile browser:'}
                </span>
                <code style={{ fontSize: '0.76rem', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', color: '#15803d', fontWeight: 700 }}>
                  http://192.168.0.7:5173
                </code>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {language === 'ta' ? 'அதிர்வு & ஒலி நேரடியாக போனில் வரும்' : 'Direct handset vibration & alerts'}
              </span>
            </div>

            {/* Fast2SMS Key Form & Test Dispatch */}
            <form onSubmit={handleSaveGatewayKey} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#065f46' }}>
                🔑 Fast2SMS API Key ({language === 'ta' ? 'இந்திய எண்களுக்கு இலவச செல்லுலார் SMS' : 'Free Indian Cellular SMS'}):
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="password"
                  value={fast2smsKey}
                  onChange={(e) => setFast2smsKey(e.target.value)}
                  placeholder="Paste Fast2SMS authorization key here..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #86efac',
                    fontSize: '0.82rem',
                    background: 'white',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Save Key
                </button>
              </div>
            </form>

            {/* Gateway Status Alert */}
            {gatewayStatus && (
              <div style={{
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.76rem',
                fontWeight: 600,
                background: gatewayStatus.type === 'success' ? '#dcfce7' : gatewayStatus.type === 'warning' ? '#fef3c7' : '#fee2e2',
                color: gatewayStatus.type === 'success' ? '#15803d' : gatewayStatus.type === 'warning' ? '#b45309' : '#dc2626',
                border: `1px solid ${gatewayStatus.type === 'success' ? '#86efac' : gatewayStatus.type === 'warning' ? '#fde68a' : '#fca5a5'}`
              }}>
                {gatewayStatus.msg}
              </div>
            )}

            {/* Dispatch Real Cellular SMS Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <button
                type="button"
                onClick={handleDispatchRealCellularSms}
                disabled={sendingRealSms}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: sendingRealSms ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)'
                }}
              >
                <Smartphone size={14} />
                <span>
                  {sendingRealSms
                    ? (language === 'ta' ? 'அனுப்புகிறது...' : 'Dispatching to Handset...')
                    : (language === 'ta' ? '⚡ என் போனுக்கு நிஜ SMS அனுப்பு' : '⚡ Dispatch Real Cellular SMS Now')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => openNativePhoneSms(userPhone, `[FemTech Live SMS] Janani! Did you drink water? 8 glasses completed? Check-in at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                }}
              >
                <Smartphone size={14} />
                <span>
                  {language === 'ta' ? '📲 போன் SMS ஆப்பில் திறக்க' : '📲 Open in Phone SMS App'}
                </span>
              </button>

              <a
                href="https://www.fast2sms.com"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700, textDecoration: 'underline' }}
              >
                Get Free Fast2SMS Key (fast2sms.com) ↗
              </a>
            </div>
          </div>
        )}

        {/* INLINE PHONE NUMBER EDITOR DRAWER */}
        {showEditNumbers && (
          <form
            onSubmit={handleSavePhoneNumbers}
            style={{
              padding: '14px 16px',
              background: '#fff7ed',
              borderBottom: '2px solid #fed7aa',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9a3412', marginBottom: '8px' }}>
              ✏️ {language === 'ta' ? 'தொலைபேசி எண்களை புதுப்பித்தல் (உடனடி சேமிப்பு):' : 'Update Registered Numbers (Instant Synchronization):'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#c2410c', marginBottom: '3px' }}>
                  {language === 'ta' ? '1. உங்கள் போன் நம்பர்:' : '1. Your Phone Number:'}
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+91 98401 23456"
                  required
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid #fdba74',
                    fontSize: '0.84rem',
                    fontWeight: 600
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#c2410c', marginBottom: '3px' }}>
                  {language === 'ta' ? '2. கவிதா (தாய்) போன் நம்பர்:' : '2. Kavitha (Mother) Phone:'}
                </label>
                <input
                  type="text"
                  value={editMotherPhone}
                  onChange={(e) => setEditMotherPhone(e.target.value)}
                  placeholder="+91 98401 65432"
                  required
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid #fdba74',
                    fontSize: '0.84rem',
                    fontWeight: 600
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: '#ea580c' }}>
                {saveSuccess ? (
                  <strong style={{ color: '#16a34a' }}>
                    ✓ {language === 'ta' ? 'எண்கள் புதுப்பிக்கப்பட்டன! இனி SMS இந்த எண்களுக்கு வரும்.' : 'Numbers updated! SMS alerts will now route here.'}
                  </strong>
                ) : (
                  language === 'ta' ? 'சேமித்தவுடன் அனைத்து 10-நிமிட அலர்ட்டுகளும் இந்த எண்களுக்கே செல்லும்.' : 'All upcoming alerts will immediately target these numbers.'
                )}
              </span>

              <button
                type="submit"
                style={{
                  background: '#ea580c',
                  color: 'white',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(234, 88, 12, 0.3)'
                }}
              >
                <Check size={14} />
                <span>{language === 'ta' ? 'எண்களைச் சேமி' : 'Save Numbers'}</span>
              </button>
            </div>
          </form>
        )}

        {/* 10-MINUTE CONTINUOUS SMS ENGINE CONTROL CARD */}
        <div style={{
          padding: '12px 16px',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          borderBottom: '1px solid #bbf7d0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#059669',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)'
            }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#065f46' }}>
                  {language === 'ta' ? 'தொடர் 10 நிமிட SMS அலர்ட் எஞ்சின்' : '10-Minute Continuous SMS Engine'}
                </span>
                <span style={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: is10MinActive ? '#dcfce7' : '#e2e8f0',
                  color: is10MinActive ? '#15803d' : '#64748b',
                  border: is10MinActive ? '1px solid #86efac' : '1px solid #cbd5e1'
                }}>
                  ⏱️ {countdownText}
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.72rem', color: '#047857' }}>
                {language === 'ta'
                  ? 'மனநிலை, தண்ணீர் (8 டம்ளர்), உணவு, மாத்திரை, தூக்கத்தை 10 நிமிடத்திற்கு ஒருமுறை சோதிக்கும்.'
                  : 'Automated 10-min check-in for mood, hydration (8 glasses), meals, meds & routine.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={trigger10MinAlertNow}
              title="Immediately dispatch the next 10-minute check-in"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
              }}
            >
              <Sparkles size={13} />
              <span>{language === 'ta' ? '⚡ 10-நிமிட SMS சோதனை' : '⚡ Trigger 10-Min SMS'}</span>
            </button>

            <button
              type="button"
              onClick={toggle10MinCycle}
              style={{
                background: is10MinActive ? '#fee2e2' : '#dcfce7',
                color: is10MinActive ? '#b91c1c' : '#15803d',
                border: is10MinActive ? '1px solid #fca5a5' : '1px solid #86efac',
                padding: '6px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {is10MinActive ? (language === 'ta' ? 'நிறுத்து' : 'Pause') : (language === 'ta' ? 'தொடங்கு' : 'Resume')}
            </button>
          </div>
        </div>

        {/* 5 SCHEDULED DAILY SLOTS QUICK TEST BAR */}
        <div style={{
          padding: '10px 16px',
          background: '#faf5ff',
          borderBottom: '1px solid #f3e8ff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6d28d9' }}>
              ⏰ {language === 'ta' ? '5 தினசரி நிலையான நேரங்கள் (சோதிக்க கிளிக் செய்க):' : '5 Daily Fixed Times (Click to simulate):'}
            </span>
            {notificationPermission !== 'granted' && (
              <button
                type="button"
                onClick={requestNotificationAccess}
                style={{
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: '#7c3aed',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {language === 'ta' ? 'நோட்டிபிகேஷன் அனுமதி' : 'Enable Push'}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            {scheduleSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => triggerSlotSMS(slot)}
                title={`Click to test ${slot.time} alert`}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 9px',
                  borderRadius: '8px',
                  border: '1px solid #ddd6fe',
                  background: 'white',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#4c1d95',
                  cursor: 'pointer'
                }}
              >
                {slot.icon}
                <span>{slot.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SMS MESSAGE THREAD */}
        <div style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: '#f8fafc'
        }}>
          {messages.map((m) => {
            const isFemtech = m.sender === 'femtech';
            const is10Min = m.is10MinAlert;

            return (
              <div
                key={m.id}
                style={{
                  alignSelf: isFemtech ? 'flex-start' : 'flex-end',
                  maxWidth: '86%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isFemtech ? 'flex-start' : 'flex-end'
                }}
              >
                {/* Dual Dispatch Destination Badge */}
                {isFemtech && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.66rem',
                    color: is10Min ? '#059669' : '#e11d48',
                    fontWeight: 700,
                    marginBottom: '3px',
                    padding: '0 4px'
                  }}>
                    <Users size={12} />
                    <span>
                      {is10Min ? '⚡ 10-Min Alert' : '📱 SMS Alert'} → {language === 'ta' ? 'நீங்களும்' : 'You'} ({m.dispatchedTo?.userPhone || userPhone}) + {m.dispatchedTo?.motherName || motherName} ({m.dispatchedTo?.motherPhone || motherPhone})
                    </span>
                  </div>
                )}

                <div style={{
                  padding: '11px 15px',
                  borderRadius: isFemtech ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                  background: isFemtech
                    ? is10Min
                      ? 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
                      : '#ffffff'
                    : 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                  color: isFemtech ? '#1e293b' : 'white',
                  fontSize: '0.86rem',
                  lineHeight: 1.45,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  border: isFemtech
                    ? is10Min
                      ? '1.5px solid #86efac'
                      : '1px solid #fecdd3'
                    : 'none'
                }}>
                  {m.text}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isFemtech ? 'flex-start' : 'flex-end',
                  gap: '8px',
                  fontSize: '0.67rem',
                  color: '#94a3b8',
                  marginTop: '3px',
                  padding: '0 4px'
                }}>
                  <span>{m.timestamp || m.time}</span>
                  {isFemtech && (
                    <button
                      type="button"
                      onClick={() => openNativePhoneSms(userPhone, m.text)}
                      title="Open this message directly in your phone SMS messaging app"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0284c7',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '1px 4px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                        textDecoration: 'underline'
                      }}
                    >
                      📲 {language === 'ta' ? 'போன் SMS-ல் திறக்க' : 'Open in Phone SMS'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE REPLY INPUT */}
        <form
          onSubmit={handleUserReply}
          style={{
            padding: '12px 16px',
            background: 'white',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: '8px'
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'ta'
                ? 'பதில் செய்தி அனுப்பவும் (எ.கா: சாப்டேன், 8 கிளாஸ் தண்ணி குடிச்சேன்)...'
                : 'Reply to SMS (e.g. Yes had lunch, 8 glasses water finished)...'
            }
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.84rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              background: '#e11d48',
              color: 'white',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={15} />
            <span>{language === 'ta' ? 'அனுப்பு' : 'Reply'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
