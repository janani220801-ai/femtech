import React, { useState } from 'react';
import { useViewMode } from '../../context/ViewModeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Lock, Key, X, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminAuthModal() {
  const { showAdminAuthModal, closeAdminAuthModal, adminLogin, adminAuthError } = useViewMode();
  const { language } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showAdminAuthModal) return null;

  const isTamil = language === 'ta';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await adminLogin(email, password);
    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
          color: 'white',
          borderRadius: '24px',
          border: '2px solid #f43f5e',
          maxWidth: '460px',
          width: '100%',
          padding: '32px',
          boxShadow: '0 25px 60px -12px rgba(244, 63, 94, 0.45)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeAdminAuthModal}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#a1a1aa',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              marginBottom: '12px',
              boxShadow: '0 8px 24px rgba(244, 63, 94, 0.45)'
            }}
          >
            🛡️
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>
            {isTamil ? 'தலைமை நிர்வாகி Janani பிரத்யேக பாதுகாப்பு கதவு' : 'Janani Chief Admin Gate'}
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#a1a1aa', margin: 0, lineHeight: '1.5' }}>
            {isTamil
              ? 'இந்த அட்மினிஸ்ட்ரேட்டர் பகுதி Janani அவர்களுக்கு மட்டுமே 100% பிரத்யேகமாக பூட்டப்பட்டுள்ளது. அனுமதி பெற்ற அட்மின் சான்றுகளை உள்ளிடவும்.'
              : 'Strictly restricted to Janani. Unauthorized access is strictly prohibited and audited.'}
          </p>
        </div>

        {/* Exclusive Security Shield Banner */}
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '14px',
            padding: '10px 14px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Lock size={18} color="#f43f5e" />
          <span style={{ fontSize: '0.78rem', color: '#fca5a5', lineHeight: '1.4' }}>
            {isTamil
              ? '🔒 அட்மினிஸ்ட்ரேட்டர் Janani தவிர வேறு எவராலும் இந்த தளத்தை திறக்க முடியாது. (Strict Authorization Barrier)'
              : '🔒 256-Bit Cryptographic Barrier: Strictly impenetrable without Janani Master Credentials.'}
          </span>
        </div>

        {/* Error message */}
        {adminAuthError && (
          <div
            style={{
              background: '#450a0a',
              border: '1px solid #f87171',
              color: '#fca5a5',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.82rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} color="#f87171" />
            <span>{adminAuthError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', color: '#d4d4d8', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
              {isTamil ? 'அட்மின் லாகின் ஐடி (Admin Login ID)' : 'Admin Login ID / Email'}
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="janani22_janani220801"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: '#d4d4d8', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
              {isTamil ? 'அட்மின் பாஸ்வேர்டு (Admin Password)' : 'Admin Password'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              color: 'white',
              border: 'none',
              padding: '13px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.4)'
            }}
          >
            <Shield size={16} />
            <span>
              {loading
                ? (isTamil ? 'சரிபார்க்கிறது...' : 'Authenticating...')
                : (isTamil ? 'அட்மின் கன்சோலில் நுழை (Login)' : 'Login as Administrator')}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
