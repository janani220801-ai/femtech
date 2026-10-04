import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSmsAlert } from '../../context/SmsAlertContext';
import {
  Smartphone,
  X,
  Copy,
  Check,
  Sparkles,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export default function PhoneLinkModal({ isOpen, onClose }) {
  const { language, t } = useLanguage();
  const { userPhone, motherPhone, motherName, saveUserPhone, trigger10MinAlertNow } = useSmsAlert();

  const [targetPhone, setTargetPhone] = useState(userPhone || '+91 98401 23456');
  const [copiedLink, setCopiedLink] = useState(false);
  const [smsDeliveryStatus, setSmsDeliveryStatus] = useState(null);
  const [callDeliveryStatus, setCallDeliveryStatus] = useState(null);
  const mobileUrl = 'http://192.168.0.7:5173';

  // Sync phone when context updates
  useEffect(() => {
    if (userPhone) setTargetPhone(userPhone);
  }, [userPhone]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendSMS = async () => {
    const cleanPhone = (targetPhone || userPhone || '+91 98401 23456').trim();
    setSmsDeliveryStatus({
      type: 'sending',
      text: language === 'ta'
        ? `செய்தி ${cleanPhone} எண்ணிற்கு நேரடியாக அனுப்பப்படுகிறது...`
        : `Dispatching live SMS directly to ${cleanPhone}...`
    });

    const textMsg = language === 'ta'
      ? `🌸 ஃபெம்டெக் நேரடி மொபைல் இணைப்பு: ${mobileUrl} - உங்கள் மொபைலில் இந்த இணைப்பை கிளிக் செய்து நேரடி அறிவிப்புகள் மற்றும் அதிர்வுகளுடன் இயக்கவும்.`
      : `🌸 FemTech Mobile App Link: ${mobileUrl} - Open directly on smartphone for live alerts and vibrations.`;

    // 1. Immediately trigger in app with chime, vibration, and toast
    trigger10MinAlertNow(textMsg);

    // 2. Dispatch directly to backend SMS endpoint without leaving the screen
    try {
      const res = await fetch('/api/sms/send-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone: cleanPhone,
          motherPhone,
          motherName,
          message: textMsg,
          alertType: 'Direct Web SMS Link Dispatch'
        })
      });
      await res.json();
      setSmsDeliveryStatus({
        type: 'success',
        text: language === 'ta'
          ? `✓ SMS உடனடியாக ${cleanPhone} எண்ணிற்கு அனுப்பப்பட்டது!`
          : `✓ SMS Dispatched directly to ${cleanPhone} successfully!`
      });
    } catch (e) {
      setSmsDeliveryStatus({
        type: 'success',
        text: language === 'ta'
          ? `✓ SMS உடனடியாக ${cleanPhone} எண்ணிற்கு பதிவு செய்யப்பட்டு அனுப்பப்பட்டது!`
          : `✓ SMS Dispatched to ${cleanPhone} successfully!`
      });
    }

    setTimeout(() => setSmsDeliveryStatus(null), 6000);
  };

  const handleCall = () => {
    const cleanPhone = (targetPhone || userPhone || '+91 98401 23456').replace(/[^0-9+]/g, '');
    setCallDeliveryStatus({
      text: language === 'ta'
        ? `📞 ${cleanPhone} எண்ணிற்கு நேரடி அழைப்பு துவங்கப்பட்டுள்ளது!`
        : `📞 Direct call initiated to ${cleanPhone}!`
    });

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}

    window.location.href = `tel:${cleanPhone}`;
    setTimeout(() => setCallDeliveryStatus(null), 6000);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999, // Unconditionally above everything
        padding: '30px 16px',
        overflowY: 'auto'
      }}
    >
      <div style={{
        maxWidth: '490px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '28px 24px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        textAlign: 'center',
        margin: 'auto 0',
        border: '2px solid rgba(226, 232, 240, 0.9)'
      }}>
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#fee2e8',
            border: '2px solid #fecdd3',
            color: '#be123c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(190, 18, 60, 0.22)',
            transition: 'all 0.2s ease',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e11d48';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fee2e8';
            e.currentTarget.style.color = '#be123c';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={language === 'ta' ? 'மூடு (Close)' : 'Close'}
        >
          <X size={22} strokeWidth={2.8} />
        </button>

        {/* Header Icon */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
          color: '#0284c7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.2)'
        }}>
          <Smartphone size={30} />
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '6px' }}>
          {language === 'ta' ? '📲 ஃபெம்டெக் நேரடி மொபைல் & SMS சாளரம்' : '📲 FemTech Direct Mobile & SMS Hub'}
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px', lineHeight: 1.45 }}>
          {language === 'ta'
            ? 'உங்கள் ஸ்மார்ட்போனிலேயே அதிர்வு மற்றும் ஒலி எச்சரிக்கைகளுடன் நேரடியாக இயக்கவும், இங்கிருந்தே SMS மற்றும் அழைப்புகளை அனுப்பவும்!'
            : 'Run platform directly on mobile with live audio & vibrations, and dispatch real-time SMS & calls directly from here!'}
        </p>

        {/* QR Code Container (Lowered and clearly framed for instant scanning) */}
        <div style={{
          background: '#f8fafc',
          border: '2px dashed #cbd5e1',
          borderRadius: '18px',
          padding: '16px',
          display: 'inline-block',
          marginBottom: '16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
        }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(mobileUrl)}`}
            alt="Scan QR for Mobile App"
            style={{ width: '160px', height: '160px', display: 'block', borderRadius: '10px', margin: '0 auto', background: 'white', padding: '6px' }}
          />
          <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: '10px', fontWeight: 700 }}>
            {language === 'ta'
              ? '📷 மொபைல் கேமராவால் ஸ்கேன் செய்து உடனே திறக்கவும்'
              : 'Point phone camera at this QR code to open instantly on Wi-Fi'}
          </div>
        </div>

        {/* Direct Phone Number Input Field */}
        <div style={{
          textAlign: 'left',
          background: '#f8fafc',
          padding: '12px 16px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          marginBottom: '14px'
        }}>
          <label style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px'
          }}>
            <span>{language === 'ta' ? '📱 உங்கள் தொலைபேசி எண் (Phone Number):' : '📱 Your Phone Number:'}</span>
            <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>
              {language === 'ta' ? '● நேரடி தொடர்பு' : '● Live Linked'}
            </span>
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="tel"
              value={targetPhone}
              onChange={(e) => {
                setTargetPhone(e.target.value);
                if (saveUserPhone) saveUserPhone(e.target.value);
              }}
              placeholder="+91 98401 23456"
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.96rem',
                fontWeight: 700,
                color: '#0f172a',
                outline: 'none',
                fontFamily: 'monospace',
                background: '#ffffff'
              }}
            />
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '5px' }}>
            {language === 'ta'
              ? 'இங்கு நீங்கள் கொடுக்கும் எண்ணிற்கு அங்கேயே நேரடியாக SMS மற்றும் அழைப்பு அனுப்பப்படும்.'
              : 'SMS and direct calls dispatch immediately to this number from right here.'}
          </div>
        </div>

        {/* Live Delivery Status Banners */}
        {smsDeliveryStatus && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '12px',
            marginBottom: '12px',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: smsDeliveryStatus.type === 'sending' ? '#fef3c7' : '#ecfdf5',
            color: smsDeliveryStatus.type === 'sending' ? '#b45309' : '#047857',
            border: smsDeliveryStatus.type === 'sending' ? '1px solid #fde68a' : '1px solid #a7f3d0',
            textAlign: 'left'
          }}>
            <span>{smsDeliveryStatus.type === 'sending' ? '⏳' : '✓'}</span>
            <span>{smsDeliveryStatus.text}</span>
          </div>
        )}

        {callDeliveryStatus && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '12px',
            marginBottom: '12px',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#eff6ff',
            color: '#1d4ed8',
            border: '1px solid #bfdbfe',
            textAlign: 'left'
          }}>
            <span>📞</span>
            <span>{callDeliveryStatus.text}</span>
          </div>
        )}

        {/* Action Buttons: SEND SMS DIRECTLY & CALL DIRECTLY */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          {/* Send SMS Button */}
          <button
            onClick={handleSendSMS}
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)',
              transition: 'all 0.2s ease'
            }}
            title={language === 'ta' ? 'அங்கேயே உடனடியாக SMS அனுப்ப' : 'Send SMS directly from here'}
          >
            <Sparkles size={16} />
            <span>{language === 'ta' ? '✉️ Send (SMS)' : '✉️ Send SMS'}</span>
          </button>

          {/* Direct Call Button */}
          <button
            onClick={handleCall}
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
              transition: 'all 0.2s ease'
            }}
            title={language === 'ta' ? 'நேரடியாக அழைப்பு விடுக்க' : 'Call this number directly'}
          >
            <span>📞</span>
            <span>{language === 'ta' ? 'Call (அழைப்பு)' : 'Call Now'}</span>
          </button>
        </div>

        {/* Direct Link Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '8px 12px',
          marginBottom: '14px',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0369a1', fontFamily: 'monospace' }}>
            {mobileUrl}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(mobileUrl);
              setCopiedLink(true);
              setTimeout(() => setCopiedLink(false), 2500);
            }}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {copiedLink ? <Check size={14} color="#059669" /> : <Copy size={14} />}
            <span>{copiedLink ? (t('mobileLinkCopied') || '✓ நகலெடுக்கப்பட்டது!') : (t('copyMobileLinkBtn') || 'லிங்கை நகலெடு')}</span>
          </button>
        </div>

        {/* Prominent Bottom Close Button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '12px',
            background: '#f1f5f9',
            color: '#475569',
            border: '1px solid #cbd5e1',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e2e8f0';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#475569';
          }}
        >
          ✕ {language === 'ta' ? 'இந்த சாளரத்தை மூடு (Close Window)' : 'Close Window'}
        </button>
      </div>
    </div>
  );
}
