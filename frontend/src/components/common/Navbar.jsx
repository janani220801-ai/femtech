import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useViewMode } from '../../context/ViewModeContext';
import { useSmsAlert } from '../../context/SmsAlertContext';
import BrandWingsLogo from './BrandWingsLogo';
import {
  Globe,
  Bell,
  AlertTriangle,
  Type,
  LogOut,
  User as UserIcon,
  Sparkles,
  Shield,
  Eye,
  Zap,
  Smartphone,
  QrCode,
  Copy,
  Check,
  X
} from 'lucide-react';

export default function Navbar({ onOpenEmergency, onNavigate, onOpenNotifications, onOpenPhone, onOpenWhisper }) {
  const { user, logout } = useAuth();
  const { language, changeLanguage, t, languages } = useLanguage();
  const { largeText, toggleLargeText, profileAvatar } = useTheme();
  const { viewMode, setViewMode, isAdmin, requestAdminMode, switchToUser } = useViewMode();
  const isAuthorizedAdmin = user?.email?.toLowerCase() === 'janani@femtech.health' || user?.role === 'admin';
  const { countdownText, is10MinActive, trigger10MinAlertNow, userPhone, motherPhone, motherName, saveUserPhone } = useSmsAlert();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [targetPhone, setTargetPhone] = useState(userPhone || '+91 98401 23456');
  const [smsDeliveryStatus, setSmsDeliveryStatus] = useState(null);
  const [callDeliveryStatus, setCallDeliveryStatus] = useState(null);
  const mobileUrl = 'http://192.168.0.7:5173';

  // Synchronize targetPhone when userPhone context changes
  React.useEffect(() => {
    if (userPhone) setTargetPhone(userPhone);
  }, [userPhone]);

  // Listen for open phone modal event from Sidebar or other components
  React.useEffect(() => {
    const handleOpenPhone = () => setShowPhoneModal(true);
    window.addEventListener('femtech_open_phone_modal', handleOpenPhone);
    return () => window.removeEventListener('femtech_open_phone_modal', handleOpenPhone);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greetingMorning');
    if (hour < 17) return t('greetingAfternoon');
    return t('greetingEvening');
  };

  return (
    <header className="navbar-header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 28px',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand & Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          onClick={() => {
            onNavigate('dashboard');
            window.dispatchEvent(new CustomEvent('femtech_celebrate'));
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          title="FemTech Wings - Click to Celebrate! 🌸"
        >
          <BrandWingsLogo size={42} />
          <div>
            <h1 style={{ fontSize: '1.35rem', lineHeight: '1.1', background: 'var(--rose-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('appName')}
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {t('tagline')}
            </p>
          </div>
        </div>

        {user && (
          <div style={{
            marginLeft: '24px',
            padding: '6px 14px',
            background: 'var(--pink-50)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--pink-200)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '0.9rem' }}>✨</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {getGreeting()}, <strong style={{ color: 'var(--pink-600)' }}>{user.name.split(' ')[0]}</strong>
            </span>
            <span style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: '10px',
              background: 'white',
              color: 'var(--rose-primary)',
              fontWeight: 700,
              border: '1px solid var(--pink-200)'
            }}>
              Age {user.age}
            </span>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {/* Global View Switcher: User View vs Administrator View */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: viewMode === 'admin' ? '#18181b' : '#f1f5f9',
          border: viewMode === 'admin' ? '1.5px solid #f43f5e' : '1.5px solid var(--pink-300)',
          borderRadius: 'var(--radius-full)',
          padding: '3px',
          boxShadow: viewMode === 'admin' ? '0 0 12px rgba(244,63,94,0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <button
            onClick={switchToUser}
            title={language === 'ta' ? 'பயனர் பார்வைக்கு மாறுக' : 'Switch to Personal Health Portal'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: viewMode === 'user' ? 'white' : 'transparent',
              color: viewMode === 'user' ? 'var(--rose-primary)' : '#64748b',
              fontWeight: viewMode === 'user' ? 800 : 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'user' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Eye size={14} />
            <span>{language === 'ta' ? '👤 பயனர் பார்வை' : '👤 User View'}</span>
          </button>

          <button
            onClick={requestAdminMode}
            title={language === 'ta' ? 'அட்மினிஸ்ட்ரேட்டர் பார்வைக்கு மாறுக (கடவுச்சொல் தேவை)' : 'Switch to Administrator Console (Password Protected)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: viewMode === 'admin' ? 'var(--rose-gradient)' : 'transparent',
              color: viewMode === 'admin' ? 'white' : '#64748b',
              fontWeight: viewMode === 'admin' ? 800 : 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'admin' ? '0 4px 10px rgba(244,63,94,0.35)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Shield size={14} />
            <span>{language === 'ta' ? '🛡️ அட்மினிஸ்ட்ரேட்டர்' : '🛡️ Admin View'}</span>
          </button>
        </div>

        {/* Quick Call Mother Button */}
        <a
          href={`tel:${(motherPhone || user?.emergencyContact?.phone || '+919840165432').replace(/[^0-9+]/g, '')}`}
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            color: 'white',
            border: 'none',
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(219, 39, 119, 0.35)'
          }}
          title={language === 'ta' ? `அம்மாவுக்கு உடனே அழை (${motherPhone || '+91 98401 65432'})` : `Call Mother (${motherPhone || '+91 98401 65432'})`}
        >
          <span>👩‍👧</span>
          <span>{language === 'ta' ? 'அம்மாவை அழை' : 'Call Mom'}</span>
        </a>

        {/* Confidential Anonymous Whisper Trigger Button */}
        <button
          onClick={() => {
            if (onOpenWhisper) onOpenWhisper();
            else window.dispatchEvent(new CustomEvent('femtech_open_whisper_modal'));
          }}
          title={language === 'ta' ? 'ரகசிய செய்தி & ஆலோசனை (100% Anonymous Whisper)' : 'Send Confidential Whisper (100% Anonymous)'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 15px',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid #fda4af',
            background: '#fff1f2',
            color: '#be123c',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <span style={{ fontSize: '0.95rem' }}>🤫</span>
          <span>{language === 'ta' ? 'ரகசிய செய்தி' : 'Whisper'}</span>
        </button>

        {/* Emergency SOS Button */}
        <button
          onClick={onOpenEmergency}
          style={{
            background: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fca5a5',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'var(--transition)'
          }}
          title="Emergency Health Support"
        >
          <AlertTriangle size={16} />
          <span>{t('emergencySOS')}</span>
        </button>

        {/* Clean Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          style={{
            position: 'relative',
            background: 'white',
            color: 'var(--text-primary)',
            border: '1px solid var(--pink-200)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
          title={language === 'ta' ? 'அறிவிப்புகள்' : 'Notifications & Wellness Alerts'}
        >
          <Bell size={18} color="var(--rose-primary)" className="animate-bell-ring" />
          <span
            className="animate-radar-ping"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#059669',
              border: '2px solid white'
            }}
          />
        </button>

        {/* Mobile Handset Link & QR Modal Trigger */}
        <button
          onClick={() => {
            if (onOpenPhone) onOpenPhone();
            else window.dispatchEvent(new CustomEvent('femtech_open_phone_modal'));
          }}
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: 'white',
            border: '2px solid #7dd3fc',
            padding: '8px 14px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.84rem',
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
            transition: 'var(--transition)'
          }}
          title={({
            en: 'Open platform directly on your smartphone via QR & link',
            ta: 'மொபைலில் திறக்க QR குறியீடு மற்றும் நேரடி SMS சாளரம்',
            hi: 'QR कोड व लिंक द्वारा प्लेटफॉर्म को अपने स्मार्टफोन पर खोलें',
            te: 'QR కోడ్ ద్వారా ప్లాట్‌ఫామ్‌ను మీ స్మార్ట్‌ఫోన్‌లో తెరవండి',
            ml: 'QR കോഡ് വഴി പ്ലാറ്റ്‌ഫോം നിങ്ങളുടെ ഫോണിൽ തുറക്കുക',
            mr: 'QR कोडद्वारे प्लॅटफॉर्म तुमच्या फोनवर उघडा',
            mwr: 'QR कोड सूं प्लेटफॉर्म फोन में खोलो सा',
            fr: 'Ouvrir sur smartphone via QR code et lien',
            lb: 'فتح المنصة مباشرة على الهاتف الذكي عبر QR والرابط',
            ar: 'فتح المنصة مباشرة على الهاتف عبر QR والرابط'
          }[language] || 'Open platform directly on your smartphone via QR & link')}
        >
          <Smartphone size={16} />
          <span>{t('openOnPhoneBtn') || ({
            en: '📲 Open on Phone',
            ta: '📲 மொபைல் இணைப்பு',
            hi: '📲 फोन पर खोलें',
            te: '📲 ఫోన్‌లో తెరవండి',
            ml: '📲 ഫോണിൽ തുറക്കുക',
            mr: '📲 फोनवर उघडा',
            mwr: '📲 फोन पे खोलो',
            fr: '📲 Ouvrir sur Mobile',
            lb: '📲 فتح على الهاتف',
            ar: '📲 فتح على الجوال'
          }[language] || '📲 Open on Phone')}</span>
        </button>

        {/* Text Size Accessibility Toggle */}
        <button
          onClick={toggleLargeText}
          style={{
            background: largeText ? 'var(--pink-100)' : 'white',
            color: 'var(--text-secondary)',
            border: '1px solid var(--pink-200)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
          title="Toggle Large Text"
        >
          <Type size={16} />
          <span>{largeText ? t('defaultFont') : t('largeFont')}</span>
        </button>

        {/* Language Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            style={{
              background: 'white',
              color: 'var(--rose-primary)',
              border: '1px solid var(--pink-200)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <Globe size={16} />
            <span>{languages.find((l) => l.code === language)?.native || 'English'}</span>
          </button>

          {showLangMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              background: 'white',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--pink-200)',
              padding: '6px',
              minWidth: '210px',
              maxHeight: '360px',
              overflowY: 'auto',
              zIndex: 100
            }}>
              {languages.map((l) => (
                <div
                  key={l.code}
                  onClick={() => {
                    changeLanguage(l.code);
                    setShowLangMenu(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: language === l.code ? 700 : 500,
                    color: language === l.code ? 'var(--rose-primary)' : 'var(--text-secondary)',
                    background: language === l.code ? 'var(--pink-50)' : 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{l.native}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        {user && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--pink-100)',
                color: 'var(--rose-primary)',
                border: '2.5px solid var(--pink-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.95rem',
                overflow: 'hidden',
                padding: 0,
                boxShadow: '0 2px 8px rgba(225, 29, 72, 0.25)'
              }}
              title={user.name}
            >
              {profileAvatar === 'knees' ? (
                <img
                  src="/avatars/knees_avatar.jpg"
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </button>

            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                background: 'white',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--pink-100)',
                padding: '8px',
                minWidth: '180px',
                zIndex: 100
              }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--pink-100)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {user.email}
                  </div>
                </div>
                <div
                  onClick={() => {
                    onNavigate('medical-profile');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <UserIcon size={16} />
                  <span>{t('medicalProfile')}</span>
                </div>
                <div
                  onClick={() => {
                    onNavigate('privacy-centre');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Sparkles size={16} />
                  <span>{t('privacyCentre')}</span>
                </div>
                <div
                  onClick={() => {
                    sessionStorage.setItem('femtech_just_logged_out', 'true');
                    logout();
                    setShowProfileMenu(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: '#e11d48',
                    borderTop: '1px solid var(--pink-100)'
                  }}
                >
                  <LogOut size={16} />
                  <span>{t('logout')}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </header>
  );
}
