import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import BrandWingsLogo from '../common/BrandWingsLogo';
import DisclaimerBanner from '../common/DisclaimerBanner';
import {
  Lock,
  Mail,
  User,
  Phone,
  Calendar,
  Heart,
  Shield,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  LogOut,
  Eye,
  EyeOff,
  Activity,
  Droplets,
  Volume2,
  VolumeX,
  PhoneCall,
  X
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup, instantDemoLogin } = useAuth();
  const { language, changeLanguage, t, languages } = useLanguage();
  const isTamil = language === 'ta';

  // Check if user recently logged out
  const [justLoggedOut, setJustLoggedOut] = useState(() => {
    return sessionStorage.getItem('femtech_just_logged_out') === 'true';
  });

  // Dedicated Auth Tabs: 'signin' | 'register' | 'logout'
  const [authTab, setAuthTab] = useState(() => {
    return sessionStorage.getItem('femtech_just_logged_out') === 'true' ? 'logout' : 'signin';
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [sirenOscillator, setSirenOscillator] = useState(null);

  // Blood Groups list requested by user
  const bloodGroups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];

  // Clean, separate state for Sign In
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Clean, unpolluted state for Create Account (User inputs only)
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bloodGroup: 'B+',
    dateOfBirth: '',
    age: 20,
    emergencyContactName: '',
    emergencyContactRelation: 'Mother',
    emergencyContactPhone: ''
  });

  // Calculate age from date of birth automatically
  const handleDobChange = (e) => {
    const dob = e.target.value;
    let computedAge = registerData.age;
    if (dob) {
      const birth = new Date(dob);
      const today = new Date();
      let calculated = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        calculated--;
      }
      if (calculated >= 5 && calculated <= 100) {
        computedAge = calculated;
      }
    }
    setRegisterData((prev) => ({ ...prev, dateOfBirth: dob, age: computedAge }));
  };

  // 4 Target Age Brackets for Personalization
  const ageBrackets = [
    {
      id: 'prepuberty',
      minAge: 8,
      maxAge: 11,
      defaultAge: 9,
      icon: '👧',
      title: isTamil ? '8–11 வயது: குழந்தை நலம்' : '8–11 Yrs: Early Adolescent View',
      desc: isTamil ? 'உடல் விழிப்புணர்வு, சீரான நீர்ச்சத்து, ஆரம்ப ஊட்டச்சத்து வழிகாட்டுதல்' : 'Growth tracking, body confidence, hydration & nutrition',
      tag: isTamil ? 'வளர்ச்சி வழிகாட்டி' : 'Pre-Puberty'
    },
    {
      id: 'teen',
      minAge: 12,
      maxAge: 16,
      defaultAge: 14,
      icon: '🌸',
      title: isTamil ? '12–16 வயது: பதின்பருவம் & முதல் பீரியட்ஸ்' : '12–16 Yrs: Teenager & Puberty Care',
      desc: isTamil ? 'முதல் மாதவிடாய் ஆதரவு, சுகாதார வழிகாட்டி, வயிற்று வலி மேலாண்மை & மனநிலை' : 'First periods, hygiene, cramp relief, acne & emotional health',
      tag: isTamil ? 'பதின்பருவ போர்டல்' : 'Teen Hub'
    },
    {
      id: 'youngadult',
      minAge: 17,
      maxAge: 24,
      defaultAge: 21,
      icon: '🎒',
      title: isTamil ? '17–24 வயது: கல்லூரி & சுழற்சி நலம்' : '17–24 Yrs: Young Adult & College Care',
      desc: isTamil ? 'மாதவிடாய் சுழற்சி டிராக்கர், PCOS பரிசோதனை, ஹார்மோன் சமநிலை & மன அழுத்தம்' : 'Period cycle tracking, PCOS risk check, hormonal balance & college lifestyle',
      tag: isTamil ? 'சுழற்சி மையம்' : 'Cycle & PCOS'
    },
    {
      id: 'adult',
      minAge: 25,
      maxAge: 70,
      defaultAge: 26,
      icon: '👩‍💼',
      title: isTamil ? '25+ வயது: மகப்பேறு & மெனோபாஸ்' : '25+ Yrs: Adult, Maternity & Menopause',
      desc: isTamil ? 'கருவுறுதல், கர்ப்பகால நலம், தைராய்டு, பெரிமெனோபாஸ் & மெனோபாஸ் வழிகாட்டி' : 'Fertility, pregnancy wellness, thyroid, perimenopause & menopause care',
      tag: isTamil ? 'முழு மருத்துவப் பெட்டகம்' : 'Full Adult Care'
    }
  ];

  // Presets for 1-Click Instant Demo Access
  const presets = [
    {
      age: 9,
      name: isTamil ? 'அனன்யா (வயது 9)' : 'Ananya (Child 9)',
      badge: isTamil ? '👧 8–11 வயது' : '👧 8–11 Yrs',
      desc: isTamil ? 'குழந்தை நலம் & ஊட்டச்சத்து' : 'Child Growth'
    },
    {
      age: 14,
      name: isTamil ? 'காவியா (வயது 14)' : 'Kaviya (Teen 14)',
      badge: isTamil ? '🌸 12–16 வயது' : '🌸 12–16 Yrs',
      desc: isTamil ? 'பருவமடைதல் & சுகாதாரம்' : 'Puberty & Care'
    },
    {
      age: 21,
      name: isTamil ? 'ரியா (வயது 21)' : 'Riya (College 21)',
      badge: isTamil ? '🎒 17–24 வயது' : '🎒 17–24 Yrs',
      desc: isTamil ? 'சுழற்சி & PCOS நலம்' : 'Cycles & PCOS'
    },
    {
      age: 26,
      name: isTamil ? 'ஜனனி (வயது 26)' : 'Janani (Adult 26)',
      badge: isTamil ? '👩‍💼 25+ வயது' : '👩‍💼 25+ Yrs',
      desc: isTamil ? 'மகப்பேறு & முழு நலம்' : 'Adult & Maternal'
    }
  ];

  // Emergency contacts for SOS modal
  const [emergencyContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('femtech_emergency_contacts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'c1', name: 'Kavitha', relation: 'Mother', phone: '+91 98401 65432' },
      { id: 'c2', name: 'Dr. Priya', relation: 'Gynecologist', phone: '+91 98401 98765' },
      { id: 'c3', name: 'Deepa', relation: 'Sister', phone: '+91 98401 11223' }
    ];
  });

  // Handle Form Submission (Sign In & Register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (authTab === 'signin') {
        const email = signInData.email.trim();
        const password = signInData.password;
        if (!email || !password) {
          throw new Error(isTamil ? 'மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்' : 'Please provide your email and password');
        }

        try {
          await login(email, password);
        } catch (loginErr) {
          console.warn('Backend login fallback to local session:', loginErr.message);
          const demoName = email.split('@')[0] || 'User';
          const capName = demoName.charAt(0).toUpperCase() + demoName.slice(1);
          await instantDemoLogin(24, capName);
        }

        sessionStorage.removeItem('femtech_just_logged_out');
        setJustLoggedOut(false);
        if (onClose) onClose();
      } else {
        // Validation for Create Account
        if (!registerData.name.trim()) {
          throw new Error(isTamil ? 'தயவுசெய்து உங்கள் முழுப் பெயரை உள்ளிடவும்' : 'Please provide your full name');
        }
        if (!registerData.email.trim()) {
          throw new Error(isTamil ? 'தயவுசெய்து உங்கள் மின்னஞ்சலை உள்ளிடவும்' : 'Please provide your email address');
        }
        if (!registerData.password) {
          throw new Error(isTamil ? 'கடவுச்சொல்லை உள்ளிடவும்' : 'Please provide a password');
        }
        if (registerData.password !== registerData.confirmPassword) {
          throw new Error(isTamil ? 'கடவுச்சொற்கள் பொருந்தவில்லை!' : 'Passwords do not match');
        }

        const newUserPayload = {
          name: registerData.name.trim(),
          email: registerData.email.trim().toLowerCase(),
          password: registerData.password,
          age: Number(registerData.age) || 20,
          dateOfBirth: registerData.dateOfBirth,
          bloodGroup: registerData.bloodGroup || 'B+',
          phone: registerData.phone.trim(),
          emergencyContact: {
            name: registerData.emergencyContactName.trim() || 'Mother',
            phone: registerData.emergencyContactPhone.trim() || '',
            relation: registerData.emergencyContactRelation || 'Mother'
          }
        };

        await signup(newUserPayload);

        // Save emergency contact, blood group and phone locally
        if (newUserPayload.emergencyContact.phone) {
          localStorage.setItem('femtech_mother_phone', newUserPayload.emergencyContact.phone);
          const contactObj = [{
            id: 'c1',
            name: newUserPayload.emergencyContact.name,
            relation: newUserPayload.emergencyContact.relation,
            phone: newUserPayload.emergencyContact.phone,
            isPrimary: true
          }];
          localStorage.setItem('femtech_emergency_contacts', JSON.stringify(contactObj));
        }
        if (newUserPayload.emergencyContact.name) {
          localStorage.setItem('femtech_mother_name', newUserPayload.emergencyContact.name);
        }
        if (newUserPayload.phone) {
          localStorage.setItem('femtech_user_phone', newUserPayload.phone);
        }
        if (newUserPayload.bloodGroup) {
          localStorage.setItem('femtech_user_blood_group', newUserPayload.bloodGroup);
        }
        if (newUserPayload.dateOfBirth) {
          localStorage.setItem('femtech_user_dob', newUserPayload.dateOfBirth);
        }

        // Clear justLoggedOut flag upon success
        sessionStorage.removeItem('femtech_just_logged_out');
        setJustLoggedOut(false);

        // Dispatch event with age for auto-redirection
        window.dispatchEvent(new CustomEvent('femtech_user_authenticated', {
          detail: { age: newUserPayload.age, name: newUserPayload.name }
        }));

        if (onClose) onClose();
      }
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  // Instant 1-Click Launch for Demo Presets
  const handleQuickDemo = async (preset) => {
    setLoading(true);
    setError('');
    try {
      sessionStorage.removeItem('femtech_just_logged_out');
      setJustLoggedOut(false);

      await instantDemoLogin(preset.age, preset.name);
      window.dispatchEvent(new CustomEvent('femtech_user_authenticated', {
        detail: { age: preset.age, name: preset.name }
      }));
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Could not enter demo session');
    } finally {
      setLoading(false);
    }
  };

  // Siren alarm audio warbler for emergency modal
  const toggleSiren = () => {
    try {
      if (isSirenActive) {
        if (sirenOscillator) {
          sirenOscillator.stop();
          sirenOscillator.disconnect();
          setSirenOscillator(null);
        }
        setIsSirenActive(false);
      } else {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.4);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();

        setSirenOscillator(osc);
        setIsSirenActive(true);
      }
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '24px 16px',
      background: 'radial-gradient(circle at 10% 10%, #fff1f2 0%, #fdf2f8 35%, #faf5ff 75%, #f0fdf4 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      {/* ============================================================ */}
      {/* 🌸 TOP HEADER: BRAND + LANGUAGE + EMERGENCY SOS */}
      {/* ============================================================ */}
      <header style={{
        maxWidth: '720px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
        padding: '14px 22px',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1.5px solid rgba(251, 113, 133, 0.25)',
        boxShadow: '0 8px 30px rgba(244, 63, 94, 0.08)'
      }}>
        {/* Brand Logo & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BrandWingsLogo size={46} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#be123c', letterSpacing: '-0.02em', margin: 0 }}>
                FemTech
              </h1>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#ffe4e6', color: '#be123c', padding: '2px 8px', borderRadius: '12px' }}>
                AI-IoT Health
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#881337', fontWeight: 600, margin: 0 }}>
              {isTamil ? '“உங்கள் நலம். உங்கள் முறைமை. உங்கள் ஃபெம்டெக்.”' : '“Your Health. Your Pattern. Your FemTech.”'}
            </p>
          </div>
        </div>

        {/* Right Controls: Language Selector & Emergency SOS Hotline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Language Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'white',
            padding: '5px 12px',
            borderRadius: '20px',
            border: '1.5px solid #fecdd3'
          }}>
            <span style={{ fontSize: '0.9rem' }}>🌐</span>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#be123c',
                cursor: 'pointer',
                outline: 'none',
                maxWidth: '120px'
              }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </select>
          </div>

          {/* Emergency SOS Hotline Trigger */}
          <button
            type="button"
            onClick={() => setShowSOSModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(225, 29, 72, 0.35)'
            }}
          >
            <AlertCircle size={15} />
            <span>🚨 SOS</span>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 🔐 PRIMARY AUTHENTICATION CARD (LOGIN / CREATE ACCOUNT / LOGOUT) */}
      {/* ============================================================ */}
      <main style={{
        maxWidth: '720px',
        width: '100%',
        marginBottom: '24px'
      }}>
        {/* ======================================================== */}
        {/* VIEW 1: DEDICATED LOGGED OUT SCREEN (IF LOGGED OUT) */}
        {/* ======================================================== */}
        {authTab === 'logout' ? (
          <div className="glass-card" style={{
            padding: '36px 28px',
            borderRadius: '28px',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(251, 113, 133, 0.35)',
            boxShadow: '0 20px 50px rgba(244, 63, 94, 0.12)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#059669',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: '0 4px 18px rgba(5, 150, 105, 0.25)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#881337', margin: '0 0 8px 0' }}>
              {isTamil ? 'வெளியேறிவிட்டீர்கள் (Logged Out)' : 'You Have Been Logged Out'}
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', maxWidth: '440px', margin: '0 auto 26px auto', lineHeight: 1.5 }}>
              {isTamil
                ? 'உங்கள் FemTech கணக்கு பாதுகாப்பாக வெளியேறிவிட்டது. மீண்டும் உங்கள் உடல்நலத் தரவுகளைப் பார்க்க கீழே உள்நுழையவும்.'
                : 'Your session has ended safely. To view your cycle predictions, live tracker, and health records, sign in below.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem('femtech_just_logged_out');
                  setJustLoggedOut(false);
                  setAuthTab('signin');
                  setError('');
                }}
                className="btn-primary"
                style={{
                  padding: '13px 30px',
                  borderRadius: '16px',
                  fontWeight: 900,
                  fontSize: '0.96rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Lock size={18} />
                <span>{isTamil ? 'மீண்டும் உள்நுழைக (Sign In Again)' : 'Sign In Again'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem('femtech_just_logged_out');
                  setJustLoggedOut(false);
                  setAuthTab('register');
                  setError('');
                }}
                style={{
                  padding: '13px 26px',
                  borderRadius: '16px',
                  border: '1.5px solid #fecdd3',
                  background: 'white',
                  color: '#be123c',
                  fontWeight: 800,
                  fontSize: '0.96rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={18} />
                <span>{isTamil ? 'புதிய கணக்கு பதிவு செய் (Create Account)' : 'Create New Account'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW 2: DEDICATED SIGN IN & SIGN UP TABS CONTAINER */
          /* ======================================================== */
          <div className="glass-card" style={{
            padding: '32px 28px',
            borderRadius: '28px',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(251, 113, 133, 0.35)',
            boxShadow: '0 20px 50px rgba(244, 63, 94, 0.12)'
          }}>
            {/* Top Tabs: SIGN IN vs CREATE ACCOUNT */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: '#ffe4e6',
              borderRadius: '18px',
              padding: '6px',
              gap: '6px',
              marginBottom: '24px'
            }}>
              <button
                type="button"
                onClick={() => { setAuthTab('signin'); setError(''); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: 'none',
                  background: authTab === 'signin' ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' : 'transparent',
                  color: authTab === 'signin' ? 'white' : '#881337',
                  fontWeight: 900,
                  fontSize: '0.96rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: authTab === 'signin' ? '0 4px 14px rgba(225, 29, 72, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Lock size={17} />
                <span>{isTamil ? 'உள்நுழைக (Sign In)' : 'Sign In'}</span>
              </button>

              <button
                type="button"
                onClick={() => { setAuthTab('register'); setError(''); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: 'none',
                  background: authTab === 'register' ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' : 'transparent',
                  color: authTab === 'register' ? 'white' : '#881337',
                  fontWeight: 900,
                  fontSize: '0.96rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: authTab === 'register' ? '0 4px 14px rgba(225, 29, 72, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sparkles size={17} />
                <span>{isTamil ? 'கணக்கு பதிவு (Sign Up)' : 'Create Account'}</span>
              </button>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: '#fef2f2',
                color: '#b91c1c',
                border: '1.5px solid #fecaca',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB 1: SIGN IN (உள்நுழைக) */}
            {/* -------------------------------------------------------- */}
            {authTab === 'signin' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#881337', margin: '0 0 6px 0' }}>
                    {isTamil ? 'உங்கள் கணக்கில் உள்நுழைக' : 'Sign In to Your Account'}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>
                    {isTamil
                      ? 'மின்னஞ்சல் மற்றும் கடவுச்சொல் மூலம் நுழையவும் அல்லது 1-கிளிக் டெமோ மூலம் நுழையவும்.'
                      : 'Enter your registered credentials or select 1-click instant demo access.'}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '6px' }}>
                    {isTamil ? 'மின்னஞ்சல் முகவரி (Email Address)' : 'Email Address'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#f43f5e' }} />
                    <input
                      type="email"
                      required
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      placeholder={isTamil ? 'உங்கள் மின்னஞ்சல் (எ.கா: janani@gmail.com)' : 'yourname@example.com'}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '14px',
                        border: '1.5px solid #fecdd3',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '6px' }}>
                    {isTamil ? 'கடவுச்சொல் (Password)' : 'Password'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#f43f5e' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '12px 42px 12px 42px',
                        borderRadius: '14px',
                        border: '1.5px solid #fecdd3',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '16px',
                    fontSize: '1rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(225, 29, 72, 0.35)',
                    cursor: loading ? 'wait' : 'pointer'
                  }}
                >
                  <Lock size={18} />
                  <span>{loading ? (isTamil ? 'உள்நுழைகிறது...' : 'Signing In...') : (isTamil ? 'உள்நுழைக (Sign In)' : 'Sign In to FemTech')}</span>
                </button>

                {/* 1-Click Instant Demo Login Option */}
                <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px dashed #fecdd3' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#9f1239', display: 'block', marginBottom: '10px' }}>
                    ⚡ {isTamil ? 'அல்லது 1-கிளிக் உடனடி டெமோ அணுகல் (கடவுச்சொல் தேவையில்லை):' : 'Or Instant 1-Click Demo Login (No Password Needed):'}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
                    {presets.map((p) => (
                      <button
                        key={p.age}
                        type="button"
                        onClick={() => handleQuickDemo(p)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '14px',
                          border: '1.5px solid #fecdd3',
                          background: '#fff1f2',
                          color: '#881337',
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontWeight: 800, fontSize: '0.82rem' }}>{p.badge}</span>
                        <span style={{ fontSize: '0.72rem', color: '#be123c', fontWeight: 600 }}>{p.name.split('(')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
                    {isTamil ? 'கணக்கு இல்லையா? ' : "Don't have an account? "}
                    <button
                      type="button"
                      onClick={() => { setAuthTab('register'); setError(''); }}
                      style={{ background: 'none', border: 'none', color: '#e11d48', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {isTamil ? 'இப்போதே பதிவு செய்யுங்கள்' : 'Create an Account'}
                    </button>
                  </span>
                </div>
              </form>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB 2: CREATE ACCOUNT / SIGN UP (பதிவு செய்க) */}
            {/* -------------------------------------------------------- */}
            {authTab === 'register' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#881337', margin: '0 0 6px 0' }}>
                    {isTamil ? 'புதிய கணக்கு தொடங்குங்கள்' : 'Create Your FemTech Account'}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>
                    {isTamil
                      ? 'உங்கள் பெயர், இரத்த வகை, பிறந்த தேதி மற்றும் அவசர தொடர்புகளை உள்ளிட்டு புதிய கணக்கு தொடங்கவும்.'
                      : 'Enter your name, blood group, date of birth, and emergency safety contact.'}
                  </p>
                </div>

                {/* Section 1: Name and Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '6px' }}>
                      {isTamil ? 'முழுப் பெயர் (Full Name) *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      placeholder={isTamil ? 'உங்கள் முழுப் பெயர்' : 'Your full name'}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: '1.5px solid #fecdd3',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '6px' }}>
                      {isTamil ? 'தொலைபேசி எண் (Mobile Phone) *' : 'Mobile Phone *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      placeholder="+91 98401 23456"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: '1.5px solid #fecdd3',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Section 2: Email and Password */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '6px' }}>
                      {isTamil ? 'மின்னஞ்சல் (Email Address) *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="user@example.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: '1.5px solid #fecdd3',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '6px' }}>
                      {isTamil ? 'கடவுச்சொல் (Password) *' : 'Password *'}
                    </label>
                    <input
                      type="password"
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: '1.5px solid #fecdd3',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* ======================================================== */}
                {/* 🩸 SECTION 3: BLOOD GROUP & DATE OF BIRTH (USER EXPLICIT) */}
                {/* ======================================================== */}
                <div style={{
                  background: 'linear-gradient(135deg, #fff1f2 0%, #fffbf0 100%)',
                  border: '2px solid #fecdd3',
                  borderRadius: '20px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  {/* Blood Group / Blood Type Selector */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.84rem', fontWeight: 900, color: '#881337', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🩸</span>
                        <span>{isTamil ? 'இரத்த வகை (Blood Type / Blood Positive):' : 'Blood Group / Blood Type:'}</span>
                      </label>
                      <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#e11d48', background: '#ffe4e6', padding: '2px 10px', borderRadius: '10px' }}>
                        {registerData.bloodGroup}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {bloodGroups.map((bg) => {
                        const isSelected = registerData.bloodGroup === bg;
                        return (
                          <button
                            key={bg}
                            type="button"
                            onClick={() => setRegisterData({ ...registerData, bloodGroup: bg })}
                            style={{
                              flex: '1 0 calc(25% - 8px)',
                              minWidth: '55px',
                              padding: '8px 10px',
                              borderRadius: '12px',
                              border: isSelected ? '2px solid #e11d48' : '1.5px solid #fed7aa',
                              background: isSelected ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' : '#ffffff',
                              color: isSelected ? 'white' : '#881337',
                              fontWeight: 900,
                              fontSize: '0.86rem',
                              cursor: 'pointer',
                              boxShadow: isSelected ? '0 4px 12px rgba(225, 29, 72, 0.25)' : 'none',
                              transition: 'all 0.15s ease',
                              textAlign: 'center'
                            }}
                          >
                            🩸 {bg}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date of Birth & Calculated Age */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', paddingTop: '10px', borderTop: '1px dashed #fecdd3' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '6px' }}>
                        📅 {isTamil ? 'பிறந்த தேதி (Date of Birth) *' : 'Date of Birth *'}
                      </label>
                      <input
                        type="date"
                        required
                        value={registerData.dateOfBirth}
                        onChange={handleDobChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: '1.5px solid #fecdd3',
                          fontSize: '0.9rem',
                          boxSizing: 'border-box',
                          background: 'white'
                        }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#881337' }}>
                          🎯 {isTamil ? 'வயது (Age):' : 'Age (Years):'}
                        </label>
                        <span style={{ fontSize: '0.72rem', color: '#be123c', fontWeight: 700 }}>
                          {isTamil ? 'தானாகக் கணக்கிடப்பட்டது' : 'Auto-computed'}
                        </span>
                      </div>
                      <input
                        type="number"
                        min="6"
                        max="90"
                        required
                        value={registerData.age}
                        onChange={(e) => setRegisterData({ ...registerData, age: Number(e.target.value) })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: '2px solid #e11d48',
                          fontSize: '1rem',
                          fontWeight: 900,
                          color: '#881337',
                          boxSizing: 'border-box',
                          background: 'white'
                        }}
                      />
                    </div>
                  </div>

                  {/* 4 Interactive Age Brackets */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginTop: '4px' }}>
                    {ageBrackets.map((b) => {
                      const isSelected = registerData.age >= b.minAge && registerData.age <= b.maxAge;
                      return (
                        <div
                          key={b.id}
                          onClick={() => setRegisterData({ ...registerData, age: b.defaultAge })}
                          style={{
                            padding: '10px',
                            borderRadius: '14px',
                            border: isSelected ? '2px solid #e11d48' : '1px solid #fed7aa',
                            background: isSelected ? '#fff1f2' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            boxShadow: isSelected ? '0 4px 12px rgba(225, 29, 72, 0.15)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
                            <span style={{
                              fontSize: '0.62rem',
                              fontWeight: 800,
                              padding: '1px 6px',
                              borderRadius: '8px',
                              background: isSelected ? '#e11d48' : '#f1f5f9',
                              color: isSelected ? 'white' : '#64748b'
                            }}>
                              {b.tag}
                            </span>
                          </div>
                          <div style={{ fontWeight: 900, fontSize: '0.78rem', color: isSelected ? '#881337' : '#1e293b' }}>
                            {b.title.split(':')[0]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ======================================================== */}
                {/* 🚨 SECTION 4: EMERGENCY SOS CONTACT */}
                {/* ======================================================== */}
                <div style={{
                  background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '20px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.86rem', fontWeight: 900, color: '#9a3412', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Shield size={18} color="#ea580c" />
                      <span>{isTamil ? 'அவசர SOS தொடர்பு எண் (Emergency Contact Details):' : 'Emergency SOS Contact Setup:'}</span>
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#c2410c', fontWeight: 600 }}>
                      {isTamil ? 'அவசர காலங்களில் நேரடி ஜிபிஎஸ் குறுஞ்செய்தி பெற வேண்டிய முதன்மை நபர்' : 'Your primary contact for 1-click live GPS distress dispatch'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, color: '#9a3412', marginBottom: '4px' }}>
                        {isTamil ? 'தொடர்பு பெயர் (Name)' : 'Contact Name'}
                      </label>
                      <input
                        type="text"
                        value={registerData.emergencyContactName}
                        onChange={(e) => setRegisterData({ ...registerData, emergencyContactName: e.target.value })}
                        placeholder={isTamil ? 'தாய் / மருத்துவர் பெயர்' : 'e.g. Kavitha (Mother)'}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #fed7aa', fontSize: '0.86rem', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, color: '#9a3412', marginBottom: '4px' }}>
                        {isTamil ? 'உறவுமுறை (Relation)' : 'Relationship'}
                      </label>
                      <select
                        value={registerData.emergencyContactRelation}
                        onChange={(e) => setRegisterData({ ...registerData, emergencyContactRelation: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #fed7aa', fontSize: '0.86rem', boxSizing: 'border-box', background: 'white' }}
                      >
                        <option value="Mother">{isTamil ? 'தாய் (Mother)' : 'Mother'}</option>
                        <option value="Doctor">{isTamil ? 'மருத்துவர் (Doctor)' : 'Doctor'}</option>
                        <option value="Sister">{isTamil ? 'சகோதரி (Sister)' : 'Sister'}</option>
                        <option value="Father">{isTamil ? 'தந்தை (Father)' : 'Father'}</option>
                        <option value="Husband">{isTamil ? 'கணவர் (Husband)' : 'Husband'}</option>
                        <option value="Guardian">{isTamil ? 'பாதுகாவலர் (Guardian)' : 'Guardian'}</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, color: '#9a3412', marginBottom: '4px' }}>
                        {isTamil ? 'அவசர தொலைபேசி எண் (Phone)' : 'Emergency Phone'}
                      </label>
                      <input
                        type="tel"
                        value={registerData.emergencyContactPhone}
                        onChange={(e) => setRegisterData({ ...registerData, emergencyContactPhone: e.target.value })}
                        placeholder="+91 98401 65432"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #fed7aa', fontSize: '0.86rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '16px',
                    fontSize: '1.02rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 25px rgba(225, 29, 72, 0.4)',
                    cursor: loading ? 'wait' : 'pointer'
                  }}
                >
                  <span>{loading ? (isTamil ? 'பதிவாகிறது...' : 'Creating Account...') : (isTamil ? '🌸 கணக்கை உருவாக்கி தொடங்குக' : '🌸 Create Account & Launch My Portal')}</span>
                  <ArrowRight size={20} />
                </button>

                <div style={{ textAlign: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
                    {isTamil ? 'ஏற்கனவே கணக்கு உள்ளதா? ' : 'Already have an account? '}
                    <button
                      type="button"
                      onClick={() => { setAuthTab('signin'); setError(''); }}
                      style={{ background: 'none', border: 'none', color: '#e11d48', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {isTamil ? 'உள்நுழைக' : 'Sign In'}
                    </button>
                  </span>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* ⚠️ MEDICAL DISCLAIMER BANNER */}
      {/* ============================================================ */}
      <div style={{ maxWidth: '720px', width: '100%', marginBottom: '24px' }}>
        <DisclaimerBanner />
      </div>

      {/* ============================================================ */}
      {/* EMERGENCY SOS MODAL (HOTLINES + SIREN + 3 CONTACTS) */}
      {/* ============================================================ */}
      {showSOSModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '16px'
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: 'white',
            borderRadius: '26px',
            padding: '24px',
            boxShadow: '0 24px 60px rgba(225, 29, 72, 0.4)',
            border: '2.5px solid #f43f5e'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertCircle size={22} color="#e11d48" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#be123c' }}>
                    🚨 {isTamil ? 'அவசர மருத்துவ உதவி SOS' : 'Emergency Medical SOS'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#881337', fontWeight: 600 }}>
                    {isTamil ? 'உடனடி உதவி எண்கள் & நேரடி அழைப்பு மையம்' : 'Instant Dispatch & Personal Contacts Hotline'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSOSModal(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Siren Alarm Warbler */}
            <div style={{
              background: isSirenActive ? '#fee2e2' : '#fff1f2',
              border: '1.5px solid #fecdd3',
              borderRadius: '16px',
              padding: '12px 14px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#be123c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isSirenActive ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
                  <span>{isSirenActive ? (isTamil ? 'சைரன் அலறுகிறது!' : 'SIREN SOUNDING!') : (isTamil ? 'அவசர சைரன் ஒலிக்கச் செய்' : 'Sound Emergency Siren')}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#881337' }}>
                  {isTamil ? 'உடனடி உதவி பெற உரத்த அலாரம் ஒலியை எழுப்புகிறது' : 'Loud auditory buzzer to attract immediate help'}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleSiren}
                style={{
                  background: isSirenActive ? '#991b1b' : '#e11d48',
                  color: 'white',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {isSirenActive ? (isTamil ? 'நிறுத்து' : 'Stop') : (isTamil ? 'இயக்கு' : 'Siren')}
              </button>
            </div>

            {/* 3 Personal Emergency Contacts Section */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#881337', marginBottom: '8px' }}>
                {isTamil ? 'உங்கள் 3 அவசர உதவி எண்கள் (1 முறை தொட்டு அழைக்கலாம்):' : 'Your 3 Emergency Contacts (1-Tap Call):'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {emergencyContacts.map((c, i) => (
                  <a
                    key={c.id}
                    href={`tel:${c.phone}`}
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: '#fff1f2',
                      border: '1px solid #fecdd3',
                      borderRadius: '12px',
                      color: '#881337'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <PhoneCall size={15} color="#e11d48" />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.82rem' }}>{i + 1}. {c.name} ({c.relation})</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{c.phone}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, background: '#e11d48', color: 'white', padding: '3px 8px', borderRadius: '8px' }}>
                      {isTamil ? 'அழை' : 'Call'}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* National Helplines */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <a href="tel:108" style={{ textDecoration: 'none', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#991b1b' }}>🚑 {isTamil ? 'மருத்துவ ஊர்தி' : 'Ambulance'}</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#b91c1c' }}>108</span>
              </a>
              <a href="tel:112" style={{ textDecoration: 'none', background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1e40af' }}>🚨 {isTamil ? 'காவல் உதவி' : 'Unified SOS'}</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1d4ed8' }}>112</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
