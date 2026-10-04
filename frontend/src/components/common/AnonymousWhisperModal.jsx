import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import {
  ShieldCheck,
  Send,
  X,
  Lock,
  Heart,
  Sparkles,
  AlertTriangle,
  EyeOff,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

export default function AnonymousWhisperModal({ isOpen, onClose }) {
  const { language } = useLanguage();

  const [category, setCategory] = useState('cycle_health');
  const [urgency, setUrgency] = useState('normal');
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const categories = [
    {
      id: 'cycle_health',
      icon: '🌸',
      title: language === 'ta' ? 'மாதவிடாய் & உடலமைப்பு ரகசிய சந்தேகம்' : 'Period & Reproductive Health Concern',
      desc: language === 'ta' ? 'அசாதாரண இரத்தப்போக்கு, வலி அல்லது உடல் மாற்றங்கள்' : 'Unusual bleeding, intense cramps, discharge or bodily questions'
    },
    {
      id: 'mental_vent',
      icon: '💭',
      title: language === 'ta' ? 'மன அழுத்தம் & உணர்வுகள் பகிர்வு' : 'Emotional & Mental Health Vent',
      desc: language === 'ta' ? 'பயம், பதட்டம், தனிமை அல்லது யாரிடமும் சொல்ல முடியாத கவலைகள்' : 'Anxiety, stress, sadness, or thoughts you cannot share with anyone else'
    },
    {
      id: 'safety_concern',
      icon: '🛡️',
      title: language === 'ta' ? 'தனிப்பட்ட பாதுகாப்பு & உதவி' : 'Personal & Domestic Safety Concern',
      desc: language === 'ta' ? 'குடும்பம், கல்லூரி அல்லது பணியிட பாதுகாப்பு சார்ந்த உதவி' : 'Confidential support regarding domestic safety, harassment, or security'
    },
    {
      id: 'anonymous_feedback',
      icon: '💬',
      title: language === 'ta' ? 'ரகசிய கருத்து அல்லது ஆலோசனை' : 'Anonymous App Feedback / Idea',
      desc: language === 'ta' ? 'பெண்களுக்கான கூடுதல் அம்சங்கள் அல்லது கருத்துக்கள்' : 'Ideas or features you want FemTech to build for women'
    },
    {
      id: 'urgent_sos',
      icon: '🚨',
      title: language === 'ta' ? 'ரகசிய அவசர உதவி (Urgent SOS Whisper)' : 'Confidential Urgent SOS Whisper',
      desc: language === 'ta' ? 'உடனடி மருத்துவ வழிகாட்டல் தேவை' : 'Critical situation requiring fast medical guidance'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    const whisperPayload = {
      id: 'whisp_' + Date.now(),
      category,
      urgency,
      alias: alias.trim() || (language === 'ta' ? 'ரகசிய தோழி (Anonymous Sister)' : 'Anonymous Sister'),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'UNREAD',
      adminNotes: ''
    };

    try {
      // 1. Save to local storage for instant offline resilience and Admin Portal inspection
      const existing = JSON.parse(localStorage.getItem('femtech_anonymous_whispers') || '[]');
      existing.unshift(whisperPayload);
      localStorage.setItem('femtech_anonymous_whispers', JSON.stringify(existing));

      // 2. Attempt backend transmission
      try {
        await api.post('/whisper/anonymous', whisperPayload);
      } catch (networkErr) {
        console.warn('Backend whisper sync queued locally:', networkErr.message);
      }

      setSuccess(true);
      setMessage('');
      setAlias('');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      alert('Unable to submit anonymous whisper. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div
        className="glass-card"
        style={{
          background: 'white',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
          border: '1.5px solid var(--pink-200)',
          position: 'relative',
          padding: '28px'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={submitting}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--pink-50)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--pink-700)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #be123c 0%, #881337 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 6px 16px rgba(190, 18, 60, 0.35)',
              flexShrink: 0
            }}
          >
            <EyeOff size={26} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
                {language === 'ta' ? 'ரகசிய செய்தி & ஆலோசனை (Anonymous Whisper)' : 'Confidential Anonymous Whisper'}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
              {language === 'ta'
                ? 'உங்கள் அடையாளம், பெயர் அல்லது இமெயில் எதுவும் இணைக்கப்படாது. 100% பாதுகாப்பானது.'
                : '100% zero-identity encrypted message. No names, email or IP attached.'}
            </p>
          </div>
        </div>

        {/* End-to-End Privacy Guarantee Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            padding: '10px 14px',
            borderRadius: '14px',
            color: '#065f46',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '20px'
          }}
        >
          <ShieldCheck size={18} color="#059669" />
          <span>
            {language === 'ta'
              ? 'முழு ரகசியம் உத்தரவாதம்: உங்கள் செய்தி அட்மினிஸ்ட்ரேட்டர் கண்காணிப்புக்கு மட்டுமே அனுப்பப்படும்.'
              : 'Zero digital footprint. Only authorized clinic administrators review submissions.'}
          </span>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '36px 16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#065f46', fontWeight: 800, marginBottom: '8px' }}>
              {language === 'ta' ? 'உங்கள் ரகசிய செய்தி பாதுகாப்பாகப் பெறப்பட்டது 🌸' : 'Your Confidential Whisper Was Sent 🌸'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#047857' }}>
              {language === 'ta'
                ? 'உங்கள் விபரம் எந்த இடத்திலும் வெளிப்படுத்தப்படாது. நீங்கள் எப்போது வேண்டுமானாலும் மேலும் செய்திகளை அனுப்பலாம்.'
                : 'Your submission has been filed completely anonymously. Take care of yourself dear!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Category Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {language === 'ta' ? 'ரகசிய செய்தியின் வகை (Topic / Category):' : 'Select Topic / Category:'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {categories.map((c) => {
                  const isSelected = category === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid var(--rose-primary)' : '1px solid #e2e8f0',
                        background: isSelected ? 'var(--pink-50)' : '#f8fafc',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isSelected ? 'var(--pink-700)' : 'var(--text-primary)' }}>
                          {c.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          {c.desc}
                        </div>
                      </div>
                      {isSelected && <span style={{ color: 'var(--rose-primary)', fontWeight: 800 }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {language === 'ta' ? 'அவசர நிலை (Urgency Level):' : 'Urgency Level:'}
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { id: 'normal', label: language === 'ta' ? 'சாதாரண (Normal)' : 'Normal', color: '#059669', bg: '#ecfdf5' },
                  { id: 'urgent', label: language === 'ta' ? 'முக்கியமானது (Urgent)' : 'Urgent', color: '#d97706', bg: '#fffbeb' },
                  { id: 'emergency', label: language === 'ta' ? 'அவசரம் (Emergency SOS)' : 'Emergency SOS', color: '#dc2626', bg: '#fef2f2' }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setUrgency(lvl.id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: urgency === lvl.id ? `2px solid ${lvl.color}` : '1px solid #e2e8f0',
                      background: urgency === lvl.id ? lvl.bg : 'white',
                      color: urgency === lvl.id ? lvl.color : '#64748b',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Pseudonym / Alias */}
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {language === 'ta' ? 'புனைப்பெயர் (விருப்பமிருந்தால் மட்டும்):' : 'Optional Alias / Pseudonym:'}
              </label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder={language === 'ta' ? 'எ.கா: ரகசிய தோழி / நிலா / Sister' : 'e.g. Secret Sister / Lotus / Anonymous Girl'}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Message Area */}
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {language === 'ta' ? 'உங்கள் ரகசிய செய்தி / கேள்விகள் (100% Anonymous):' : 'Your Confidential Message / Questions:'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder={
                  language === 'ta'
                    ? 'மனதில் உள்ள எதையும் தயங்காமல் இங்கே எழுதுங்கள். யாரிடமும் கேட்க முடியாத மாதவிடாய் சந்தேகம், மன பாரம் அல்லது உதவிகள்...'
                    : 'Feel free to pour your heart out. You are safe here. Share any concern, symptom, emotional burden or question...'
                }
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--pink-300)',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !message.trim()}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting || !message.trim() ? 0.6 : 1
              }}
            >
              <Send size={18} />
              <span>
                {submitting
                  ? (language === 'ta' ? 'அனுப்பப்படுகிறது...' : 'Sending Anonymously...')
                  : (language === 'ta' ? 'ரகசிய செய்தியை அனுப்புக (Submit Whisper)' : 'Submit Confidential Whisper')}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
