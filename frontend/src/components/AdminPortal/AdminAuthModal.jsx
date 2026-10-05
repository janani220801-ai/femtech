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

  const handleAutofill = () => {
    setEmail('janani22_janani220801');
    setPassword('janani2222 jwa2217');
  };

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
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
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
          border: '1.5px solid #f43f5e',
          maxWidth: '460px',
          width: '100%',
          padding: '30px',
          boxShadow: '0 25px 50px -12px rgba(244, 63, 94, 0.35)',
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
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              marginBottom: '12px',
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.4)'
            }}
          >
            🛡️
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>
            {isTamil ? 'அட்மினிஸ்ட்ரேட்டர் உள்நுழைவு' : 'Administrator Security Gate'}
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#a1a1aa', margin: 0 }}>
            {isTamil
              ? 'பயனர்களின் செயல்பாடுகள் மற்றும் தகவல்களைக் கண்காணிக்க அட்மின் ஐடி மற்றும் பாஸ்வேர்டு உள்ளிடவும்.'
              : 'Enter Administrator Login ID and Password to inspect registered users and system updates.'}
          </p>
        </div>

        {/* Credentials Reminder Box */}
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '14px',
            padding: '12px 16px',
            marginBottom: '18px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#fb7185', fontWeight: 800 }}>
              🔑 {isTamil ? 'அட்மின் விபரங்கள் (Default Credentials)' : 'Administrator Credentials'}
            </span>
            <button
              type="button"
              onClick={handleAutofill}
              style={{
                background: '#f43f5e',
                color: 'white',
                border: 'none',
                padding: '3px 10px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={12} />
              <span>{isTamil ? 'தானாக நிரப்பு (Autofill)' : 'Autofill'}</span>
            </button>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#e4e4e7', fontFamily: 'monospace' }}>
            ID: <strong style={{ color: '#fff' }}>janani22_janani220801</strong> &nbsp;|&nbsp; Pass: <strong style={{ color: '#fff' }}>janani2222 jwa2217</strong>
          </div>
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
