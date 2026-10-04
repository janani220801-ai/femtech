import React, { useState, useEffect } from 'react';
import { useSmsAlert } from '../../context/SmsAlertContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  Users,
  Zap,
  PhoneCall,
  Sparkles,
  ExternalLink,
  Smartphone
} from 'lucide-react';

export default function LiveSmsToast({ onOpenNotifications }) {
  const { activeToast, dismissToast, sendUserReply } = useSmsAlert();
  const { language } = useLanguage();
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  useEffect(() => {
    if (activeToast) {
      setReplySent(false);
      setReplyText('');
    }
  }, [activeToast?.id]);

  if (!activeToast) return null;

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sendUserReply(replyText.trim());
    setReplySent(true);
    setReplyText('');
    setTimeout(() => {
      dismissToast();
    }, 2800);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10001,
      maxWidth: '460px',
      width: 'calc(100vw - 40px)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.35), 0 0 20px rgba(225, 29, 72, 0.25)',
      borderRadius: '20px',
      background: '#ffffff',
      border: '2px solid #f43f5e',
      overflow: 'hidden',
      animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      fontFamily: 'inherit'
    }}>
      {/* Toast Top Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1.5s infinite'
          }}>
            <Zap size={16} color="#fef08a" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{language === 'ta' ? '📩 புதிய SMS வந்துள்ளது!' : '📩 Incoming SMS Check-in!'}</span>
              <span style={{
                background: '#10b981',
                color: 'white',
                fontSize: '0.62rem',
                fontWeight: 900,
                padding: '1px 6px',
                borderRadius: '8px',
                textTransform: 'uppercase'
              }}>
                LIVE NOW
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#fecdd3' }}>
              {activeToast.time} • {language === 'ta' ? '10 நிமிட நேரடி சுழற்சி' : '10-Min Continuous Cycle'}
            </div>
          </div>
        </div>

        <button
          onClick={dismissToast}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>

      {/* Dual Route Recipients Badge */}
      <div style={{
        padding: '8px 14px',
        background: '#fff1f2',
        borderBottom: '1px solid #fecdd3',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.72rem',
        color: '#9f1239',
        fontWeight: 700
      }}>
        <Users size={13} color="#e11d48" />
        <span>
          {language === 'ta' ? 'அனுப்பப்பட்டது:' : 'Dispatched to:'} <strong>{activeToast.userPhone}</strong> & <strong>{activeToast.motherName} ({activeToast.motherPhone})</strong>
        </span>
      </div>

      {/* Message Content */}
      <div style={{ padding: '14px 16px', background: '#ffffff' }}>
        <p style={{
          margin: 0,
          fontSize: '0.92rem',
          lineHeight: 1.45,
          color: '#1e293b',
          fontWeight: 600
        }}>
          "{activeToast.text}"
        </p>
      </div>

      {/* Quick Interactive Reply Box */}
      <div style={{ padding: '10px 14px 14px 14px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
        {replySent ? (
          <div style={{
            padding: '8px 12px',
            borderRadius: '10px',
            background: '#dcfce7',
            color: '#15803d',
            fontSize: '0.76rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle2 size={16} />
            <span>
              {language === 'ta'
                ? `✓ உங்கள் பதில் பதிவு செய்யப்பட்டது! தாய் ${activeToast.motherName}-க்கும் பகிரப்பட்டது.`
                : `✓ Reply logged! Shared with mother ${activeToast.motherName}.`}
            </span>
          </div>
        ) : (
          <form onSubmit={handleReply} style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                language === 'ta'
                  ? 'பதில் தட்டச்சு செய்யவும் (எ.கா: சாப்ட்டேன், தண்ணி குடிச்சிட்டேன்)...'
                  : 'Type quick SMS reply (e.g. Yes had lunch)...'
              }
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#e11d48',
                color: 'white',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Send size={12} />
              <span>{language === 'ta' ? 'அனுப்பு' : 'Reply'}</span>
            </button>
          </form>
        )}

        {/* Direct Cellular Phone SMS Link (Opens native SMS App on phone/Windows Link) */}
        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={`sms:${(activeToast.userPhone || '+919840123456').replace(/[^0-9+]/g, '')}?body=${encodeURIComponent(activeToast.text)}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#0284c7',
              color: 'white',
              fontSize: '0.74rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
            }}
          >
            <Smartphone size={13} />
            <span>{language === 'ta' ? '📲 என் போன் SMS ஆப்பில் திறக்க' : '📲 Open in Phone SMS App'}</span>
          </a>

          <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
            {language === 'ta' ? 'நேரடி SIM SMS இணைப்பு' : 'Direct SIM SMS Link'}
          </span>
        </div>

        {/* Action Link to Full Modal Feed */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => {
              dismissToast();
              if (onOpenNotifications) onOpenNotifications();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#be123c',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: 0
            }}
          >
            <ExternalLink size={12} />
            <span>{language === 'ta' ? 'முழு SMS உரையாடலைப் பார்' : 'View Full SMS Thread'}</span>
          </button>

          <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
            {language === 'ta' ? 'அடுத்த 10 நிமிடத்தில் மீண்டும் வரும்' : 'Repeats every 10 mins'}
          </span>
        </div>
      </div>
    </div>
  );
}
