import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import BrandWingsLogo from '../common/BrandWingsLogo';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  Calendar,
  Shield,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Heart,
  Droplets,
  Smile,
  Bluetooth,
  Radio,
  Volume2,
  VolumeX,
  BatteryCharging,
  X,
  ArrowRight,
  Activity,
  CheckCircle2,
  Target,
  Zap,
  PhoneCall,
  Clock,
  Pill,
  Moon,
  Thermometer,
  UserPlus,
  Edit2,
  Save,
  Trash2,
  Send,
  Sliders,
  Check
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup, instantDemoLogin } = useAuth();
  const { language, changeLanguage, t, languages } = useLanguage();
  const isTamil = language === 'ta';

  // Mode & Tabs
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [activeTab, setActiveTab] = useState('questionnaire'); // 'questionnaire' | 'sos' | 'bluetooth'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ============================================================
  // 1. QUESTIONNAIRE: MOOD TRACKER
  // ============================================================
  const [selectedMood, setSelectedMood] = useState(() => {
    return localStorage.getItem('femtech_quick_mood') || 'happy';
  });

  const moods = [
    {
      id: 'happy',
      emoji: '🌸',
      label: isTamil ? 'மகிழ்ச்சி & அமைதி' : 'Joyful & Happy',
      color: '#f43f5e',
      tip: isTamil ? 'அற்புதம்! உங்கள் நேர்மறை ஆற்றலை நல்ல ஆரோக்கிய பழக்கங்களாக மாற்றுங்கள்.' : 'Wonderful! Harness your positive energy into nutritious habits.'
    },
    {
      id: 'calm',
      emoji: '😊',
      label: isTamil ? 'அமைதி & சமநிலை' : 'Calm & Balanced',
      color: '#10b981',
      tip: isTamil ? 'மனம் அமைதியாக உள்ளது. மென்மையான ஆழ்ந்த சுவாசப் பயிற்சி செய்யுங்கள்.' : 'Peaceful state of mind. Practice gentle deep breathing.'
    },
    {
      id: 'crampy',
      emoji: '😣',
      label: isTamil ? 'மாதவிடாய் வலி / PMS' : 'Crampy / PMS Pain',
      color: '#e11d48',
      tip: isTamil ? 'அடிவயிற்றில் வெந்நீர் ஒத்தடம் கொடுங்கள், மிதமான இஞ்சி டீ பருகுங்கள்!' : 'Apply a warm heating pad to lower abdomen and sip warm ginger tea!'
    },
    {
      id: 'energetic',
      emoji: '⚡',
      label: isTamil ? 'அதிக சுறுசுறுப்பு' : 'High Energy',
      color: '#f59e0b',
      tip: isTamil ? 'நடைப்பயிற்சி, உடற்பயிற்சி அல்லது சுறுசுறுப்பான வேலைகளுக்கு உகந்த நேரம்!' : 'Great time for a brisk walk, pelvic stretches, or active work!'
    },
    {
      id: 'tired',
      emoji: '😴',
      label: isTamil ? 'சோர்வு / குறைந்த சக்தி' : 'Tired / Low Energy',
      color: '#6366f1',
      tip: isTamil ? 'உடலுக்கு ஓய்வு கொடுங்கள். இன்று இரவு 8 மணிநேர ஆழ்ந்த உறக்கம் அவசியம்.' : 'Listen to your body. Aim for 8 hours of deep restorative sleep tonight.'
    },
    {
      id: 'sensitive',
      emoji: '🥺',
      label: isTamil ? 'உணர்ச்சிவசப்படுதல்' : 'Emotional / Sensitive',
      color: '#ec4899',
      tip: isTamil ? 'மனதை அமைதிப்படுத்துங்கள். ஹார்மோன் மாற்றங்களால் இது முற்றிலும் இயல்பானது.' : 'Be patient with yourself today. Hormonal shifts are completely natural.'
    }
  ];

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    localStorage.setItem('femtech_quick_mood', moodId);
  };

  // ============================================================
  // 2. QUESTIONNAIRE: WATER INTAKE TRACKER (8 GLASSES)
  // ============================================================
  const [waterGlasses, setWaterGlasses] = useState(() => {
    return Number(localStorage.getItem('femtech_quick_water')) || 4;
  });

  const handleWaterChange = (delta) => {
    const updated = Math.max(0, Math.min(8, waterGlasses + delta));
    setWaterGlasses(updated);
    localStorage.setItem('femtech_quick_water', String(updated));
  };

  const handleDirectGlassClick = (index) => {
    const updated = index + 1;
    setWaterGlasses(updated);
    localStorage.setItem('femtech_quick_water', String(updated));
  };

  // ============================================================
  // 3. QUESTIONNAIRE: MEDICATION CHECK-IN (DID YOU TAKE MEDS?)
  // ============================================================
  const [medicationTaken, setMedicationTaken] = useState(() => {
    return localStorage.getItem('femtech_quick_med_taken') === 'true';
  });
  const [medicationNames, setMedicationNames] = useState(() => {
    return localStorage.getItem('femtech_quick_med_names') || 'Multivitamin, Folic Acid';
  });

  const handleMedicationToggle = (taken) => {
    setMedicationTaken(taken);
    localStorage.setItem('femtech_quick_med_taken', String(taken));
  };

  const handleMedNameChange = (val) => {
    setMedicationNames(val);
    localStorage.setItem('femtech_quick_med_names', val);
  };

  // Quick Medication Pill Suggestions
  const quickMedOptions = isTamil
    ? ['மல்டிவைட்டமின்', 'ஃபோலிக் அமிலம்', 'இரும்புச்சத்து மாத்திரை', 'தைராய்டு (தைராக்சின்)', 'கால்சியம் & D3', 'வலி நிவாரணி']
    : ['Multivitamin', 'Folic Acid', 'Iron Supplement', 'Thyroid (Thyroxine)', 'Calcium & D3', 'Pain Reliever'];
  const toggleQuickMed = (pill) => {
    let current = medicationNames ? medicationNames.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (current.includes(pill)) {
      current = current.filter(p => p !== pill);
    } else {
      current.push(pill);
    }
    const joined = current.join(', ');
    setMedicationNames(joined);
    localStorage.setItem('femtech_quick_med_names', joined);
    setMedicationTaken(true);
    localStorage.setItem('femtech_quick_med_taken', 'true');
  };

  // ============================================================
  // 4. QUESTIONNAIRE: SLEEP HOURS & PAIN / CRAMP LEVEL
  // ============================================================
  const [sleepHours, setSleepHours] = useState(() => {
    return Number(localStorage.getItem('femtech_quick_sleep')) || 7.5;
  });
  const [painLevel, setPainLevel] = useState(() => {
    return Number(localStorage.getItem('femtech_quick_pain')) || 1;
  });

  const handleSleepChange = (val) => {
    setSleepHours(val);
    localStorage.setItem('femtech_quick_sleep', String(val));
  };

  const handlePainChange = (val) => {
    setPainLevel(val);
    localStorage.setItem('femtech_quick_pain', String(val));
  };

  // ============================================================
  // 5. THREE CUSTOM EMERGENCY CONTACTS (USER-EDITABLE)
  // ============================================================
  const defaultContacts = isTamil ? [
    { id: 1, name: 'கவிதா (தாய்)', relation: 'தாய்', phone: '+91 98401 65432' },
    { id: 2, name: 'டாக்டர் பிரியா ராமன் (மகப்பேறு மருத்துவர்)', relation: 'மருத்துவர்', phone: '+91 44 2836 1000' },
    { id: 3, name: 'தீபா (சகோதரி / தோழி)', relation: 'சகோதரி', phone: '+91 98401 98765' }
  ] : [
    { id: 1, name: 'Kavitha (Mother)', relation: 'Mother', phone: '+91 98401 65432' },
    { id: 2, name: 'Dr. Priya Raman (OB/GYN)', relation: 'Gynecologist', phone: '+91 44 2836 1000' },
    { id: 3, name: 'Deepa (Sister / Friend)', relation: 'Sister', phone: '+91 98401 98765' }
  ];

  const [emergencyContacts, setEmergencyContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('femtech_emergency_contacts');
      return saved ? JSON.parse(saved) : defaultContacts;
    } catch {
      return defaultContacts;
    }
  });

  const [editingContactId, setEditingContactId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', relation: '', phone: '' });
  const [sosSentMessage, setSosSentMessage] = useState(false);

  const startEditContact = (c) => {
    setEditingContactId(c.id);
    setEditForm({ name: c.name, relation: c.relation, phone: c.phone });
  };

  const saveEditContact = (id) => {
    const updated = emergencyContacts.map((c) => {
      if (c.id === id) {
        return { ...c, ...editForm };
      }
      return c;
    });
    setEmergencyContacts(updated);
    localStorage.setItem('femtech_emergency_contacts', JSON.stringify(updated));
    setEditingContactId(null);
  };

  // ============================================================
  // 6. BLUETOOTH WEARABLE CONNECT & LIVE SIMULATOR
  // ============================================================
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [bluetoothDeviceName, setBluetoothDeviceName] = useState('FemTech Smart Band Gen-3');
  const [liveHeartRate, setLiveHeartRate] = useState(74);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let interval;
    if (isBluetoothConnected) {
      interval = setInterval(() => {
        setLiveHeartRate(Math.floor(73 + Math.random() * 6));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isBluetoothConnected]);

  const handleConnectBluetooth = async () => {
    setIsScanning(true);
    if (navigator.bluetooth && navigator.bluetooth.requestDevice) {
      try {
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['heart_rate', 'battery_service']
        });
        setBluetoothDeviceName(device.name || 'BLE Health Tracker');
        setIsBluetoothConnected(true);
        setIsScanning(false);
        return;
      } catch (err) {
        console.log('Bluetooth native prompt closed, pairing with FemTech BLE simulator');
      }
    }
    setTimeout(() => {
      setIsBluetoothConnected(true);
      setBluetoothDeviceName('FemTech Smart Band Gen-3');
      setIsScanning(false);
    }, 700);
  };

  const handleDisconnectBluetooth = () => {
    setIsBluetoothConnected(false);
  };

  // ============================================================
  // 7. EMERGENCY SOS ALERT & SIREN ALARM
  // ============================================================
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);

  const toggleSiren = () => {
    if (!isSirenActive) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(750, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(1150, ctx.currentTime + 0.3);
          osc.frequency.linearRampToValueAtTime(750, ctx.currentTime + 0.6);
          osc.frequency.linearRampToValueAtTime(1150, ctx.currentTime + 0.9);
          osc.frequency.linearRampToValueAtTime(750, ctx.currentTime + 1.2);
          gain.gain.setValueAtTime(0.35, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.5);
        }
      } catch (e) {
        console.warn('Audio Siren:', e);
      }
      setIsSirenActive(true);
      setTimeout(() => setIsSirenActive(false), 3000);
    } else {
      setIsSirenActive(false);
    }
  };

  const triggerSosDistressSms = () => {
    setSosSentMessage(true);
    setTimeout(() => setSosSentMessage(false), 5000);
  };

  // ============================================================
  // 8. QUICK AGE PRESETS & 1-CLICK DASHBOARD ENTRY
  // ============================================================
  const presets = [
    {
      age: 8,
      name: isTamil ? 'அனன்யா (குழந்தை 8)' : 'Ananya (Child 8)',
      badge: isTamil ? '👧 வயது 8 (குழந்தை பருவ நலம்)' : '👧 Age 8 (Child Basics)',
      desc: isTamil ? 'நீர்ச்சத்து, ஆரோக்கியமான வளர்ச்சி & உடல் விழிப்புணர்வு' : 'Hydration, growth & body confidence'
    },
    {
      age: 12,
      name: isTamil ? 'மீரா (பருவமடைதல் 12)' : 'Meera (Puberty 12)',
      badge: isTamil ? '🌸 வயது 12 (பருவமடைதல் & மாதவிடாய்)' : '🌸 Age 12 (Puberty & Periods)',
      desc: isTamil ? 'முதல் மாதவிடாய், சுகாதார வழிகாட்டி & உடலியல் மாற்றம்' : 'First periods, hygiene & discharge guide'
    },
    {
      age: 17,
      name: isTamil ? 'ரியா (பதின்பருவம் 17)' : 'Riya (Teen 17)',
      badge: isTamil ? '🎒 வயது 17 (இளம் பெண் நலம்)' : '🎒 Age 17 (Teen Hub)',
      desc: isTamil ? 'வயிற்று வலி, முகப்பரு, தூக்கம் & மனநிலை மாற்றங்கள்' : 'Cramps, acne, sleep & mood swings'
    },
    {
      age: 25,
      name: isTamil ? 'ஜனனி (முழுமைப் பருவம் 25)' : 'Janani (Adult 25)',
      badge: isTamil ? '👩‍💼 வயது 25 (முழு நலம் & வழிகாட்டி)' : '👩‍💼 Age 25 (Adult Care)',
      desc: isTamil ? 'கருவுறுதல், சினைப்பை நலம், தைராய்டு & முழு மருத்துவப் பெட்டகம்' : 'Fertility, PCOS, thyroid & full health vault'
    }
  ];

  const [selectedPreset, setSelectedPreset] = useState(presets[3]);

  const handleQuickEnterDashboard = async (preset) => {
    setLoading(true);
    setError('');
    try {
      const targetPreset = preset || selectedPreset;
      localStorage.setItem('femtech_quick_mood', selectedMood);
      localStorage.setItem('femtech_quick_water', String(waterGlasses));
      localStorage.setItem('femtech_quick_med_taken', String(medicationTaken));
      localStorage.setItem('femtech_quick_med_names', medicationNames);
      localStorage.setItem('femtech_quick_sleep', String(sleepHours));
      localStorage.setItem('femtech_quick_pain', String(painLevel));
      localStorage.setItem('femtech_emergency_contacts', JSON.stringify(emergencyContacts));

      await instantDemoLogin(targetPreset.age, targetPreset.name);
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Could not enter dashboard');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 9. CUSTOM CREDENTIALS LOGIN / REGISTER
  // ============================================================
  const [formData, setFormData] = useState({
    name: 'Janani S',
    email: 'janani@femtech.health',
    password: 'password123',
    confirmPassword: 'password123',
    age: 25,
    dateOfBirth: '2001-05-14',
    phone: '+91 98401 23456'
  });

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: Number(formData.age),
          dateOfBirth: formData.dateOfBirth,
          phone: formData.phone,
          emergencyContact: {
            name: emergencyContacts[0]?.name || 'Mother',
            phone: emergencyContacts[0]?.phone || '+91 98401 65432',
            relation: emergencyContacts[0]?.relation || 'Family'
          }
        });
      }
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const currentMoodObj = moods.find((m) => m.id === selectedMood) || moods[0];

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
      {/* 🌸 TOP UTILITY HEADER: BRAND + 3 SOS CONTACTS & BLUETOOTH */}
      {/* ============================================================ */}
      <header style={{
        maxWidth: '1080px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
        padding: '14px 24px',
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        border: '1.5px solid rgba(251, 113, 133, 0.25)',
        boxShadow: '0 8px 30px rgba(244, 63, 94, 0.1)'
      }}>
        {/* Brand Logo & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <BrandWingsLogo size={48} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#be123c', letterSpacing: '-0.02em', margin: 0 }}>
                FemTech
              </h1>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#ffe4e6', color: '#be123c', padding: '2px 8px', borderRadius: '12px' }}>
                AI-IoT Platform
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#881337', fontWeight: 600, margin: 0 }}>
              {isTamil ? '“உங்கள் நலம். உங்கள் முறைமை. உங்கள் ஃபெம்டெக்.”' : '“Your Health. Your Pattern. Your FemTech.”'}
            </p>
          </div>
        </div>

        {/* Language Selector & Toggle Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'white',
          padding: '6px 14px',
          borderRadius: '24px',
          border: '1.5px solid #fecdd3',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontSize: '1rem' }}>🌐</span>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#be123c',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.native} ({lang.label})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => changeLanguage(isTamil ? 'en' : 'ta')}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              border: 'none',
              background: isTamil ? '#ffe4e6' : '#eff6ff',
              color: isTamil ? '#be123c' : '#1d4ed8',
              fontSize: '0.76rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isTamil ? 'English' : 'தமிழ்'}
          </button>
        </div>

        {/* Quick Action Buttons: SOS & Bluetooth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Bluetooth Wearable Button */}
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'bluetooth' ? 'questionnaire' : 'bluetooth')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '24px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: isBluetoothConnected ? '#eff6ff' : 'white',
              color: isBluetoothConnected ? '#1d4ed8' : '#334155',
              border: isBluetoothConnected ? '2px solid #3b82f6' : '1px solid #cbd5e1',
              boxShadow: isBluetoothConnected ? '0 0 16px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <Bluetooth size={18} color={isBluetoothConnected ? '#2563eb' : '#64748b'} />
            <span>
              {isBluetoothConnected
                ? (isTamil ? `BLE இயங்குகிறது (${liveHeartRate} BPM)` : `BLE Active (${liveHeartRate} BPM)`)
                : (isTamil ? 'புளூடூத் வாட்ச்' : 'Connect Bluetooth')}
            </span>
            {isBluetoothConnected && (
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px #10b981'
              }} />
            )}
          </button>

          {/* SOS Trigger Button with 3 Contacts Badge */}
          <button
            type="button"
            onClick={() => setShowSOSModal(true)}
            className="animate-glow"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 20px',
              borderRadius: '24px',
              fontSize: '0.84rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(225, 29, 72, 0.45)'
            }}
          >
            <AlertCircle size={18} />
            <span>🚨 {isTamil ? 'அவசர உதவி SOS' : 'Emergency SOS'}</span>
            <span style={{
              background: 'rgba(255,255,255,0.25)',
              padding: '1px 6px',
              borderRadius: '10px',
              fontSize: '0.72rem'
            }}>
              {emergencyContacts.length} {isTamil ? 'எண்கள்' : 'Contacts'}
            </span>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* BLUETOOTH WEARABLE DRAWER / CARD (IF CLICKED) */}
      {/* ============================================================ */}
      {activeTab === 'bluetooth' && (
        <div style={{
          maxWidth: '1080px',
          width: '100%',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          border: '1.5px solid #93c5fd',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bluetooth size={22} color="#2563eb" />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a' }}>
                  {isTamil ? 'ஸ்மார்ட் வாட்ச் BLE சென்சார் மையம்' : 'Smart Wearable BLE Telemetry Hub'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569' }}>
                  {isTamil
                    ? 'ஸ்மார்ட் பேண்ட், ஸ்மார்ட் மோதிரம் & பல்ஸ் ஆக்ஸிமீட்டர்களுக்கான Web Bluetooth இணைப்பு'
                    : 'Web Bluetooth API integration for Smart Bands, Smart Rings, and Pulse Oximeters'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('questionnaire')}
              style={{ background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            {isBluetoothConnected ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#166534', background: '#dcfce7', padding: '6px 14px', borderRadius: '14px' }}>
                    {isTamil ? `🟢 இணைக்கப்பட்டது: ${bluetoothDeviceName}` : `🟢 Connected to ${bluetoothDeviceName}`}
                  </span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: '#be123c', background: 'white', padding: '6px 12px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                      <Heart size={16} className="animate-pulse" /> {liveHeartRate} BPM
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: '#0369a1', background: 'white', padding: '6px 12px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                      <Droplets size={16} /> 98% SpO2
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: '#b45309', background: 'white', padding: '6px 12px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                      <Thermometer size={16} /> 36.6°C
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleDisconnectBluetooth}
                  style={{ padding: '8px 16px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: '12px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {isTamil ? 'சாதனத்தை துண்டிக்கவும்' : 'Disconnect Device'}
                </button>
              </>
            ) : (
              <>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#334155' }}>
                  {isTamil
                    ? 'உங்கள் இதயத்துடிப்பு மற்றும் வெப்பநிலையை நிகழ்நேரத்தில் கண்காணிக்க புளூடூத் வாட்ச்சை இணைக்கவும்!'
                    : 'Pair your Bluetooth smart band or ring to stream real-time heart rate and temperature into your health trends!'}
                </p>
                <button
                  onClick={handleConnectBluetooth}
                  disabled={isScanning}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Bluetooth size={18} />
                  <span>
                    {isScanning
                      ? (isTamil ? 'BLE சாதனங்களைத் தேடுகிறது...' : 'Scanning for BLE Devices...')
                      : (isTamil ? 'ஸ்மார்ட் வாட்ச் தேடி இணைக்கவும்' : 'Scan & Pair Smart Wearable')}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MAIN LAYOUT: QUESTIONNAIRE HUB + PROFILE LAUNCHER */}
      {/* ============================================================ */}
      <main style={{
        maxWidth: '1080px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: showCustomForm ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* LEFT COLUMN: THE COMPLETE BEAUTIFUL DAILY QUESTIONNAIRE */}
        <div className="glass-card" style={{
          padding: '28px',
          borderRadius: '28px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(251, 113, 133, 0.3)',
          boxShadow: '0 16px 40px rgba(244, 63, 94, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px'
        }}>
          {/* Header */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', background: '#ffe4e6', borderRadius: '16px', color: '#be123c', fontSize: '0.8rem', fontWeight: 800, marginBottom: '8px' }}>
              <Sparkles size={14} />
              <span>{t('preLoginQuestionnaire')}</span>
            </div>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#881337', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              {t('welcomeCheckin')}
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#4c0519', margin: 0, lineHeight: 1.4 }}>
              {t('welcomeCheckinSub')}
            </p>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* QUESTION 1: MOOD CHECK-IN */}
          {/* ------------------------------------------------------------ */}
          <div style={{
            background: 'linear-gradient(135deg, #fff5f7 0%, #ffffff 100%)',
            border: '1.5px solid #fecdd3',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(244, 63, 94, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#9f1239', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smile size={20} color="#e11d48" />
                <span>{t('q1Mood')}</span>
              </span>
              <span style={{ fontSize: '0.78rem', color: '#be123c', fontWeight: 800, background: '#ffe4e6', padding: '3px 10px', borderRadius: '12px' }}>
                {currentMoodObj.label}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
              {moods.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMoodSelect(m.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px 6px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #e11d48' : '1px solid #ffe4e6',
                      background: isSelected ? '#ffe4e6' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 4px 14px rgba(225, 29, 72, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', marginBottom: '2px' }}>{m.emoji}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#9f1239' : '#475569', textAlign: 'center' }}>
                      {m.label.split('/')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{
              fontSize: '0.78rem',
              color: '#881337',
              background: 'white',
              padding: '9px 12px',
              borderRadius: '12px',
              borderLeft: '3.5px solid #f43f5e',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <span style={{ fontSize: '1rem' }}>💡</span>
              <span style={{ fontWeight: 600 }}>{currentMoodObj.tip}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* QUESTION 2: WATER GLASSES COUNTER */}
          {/* ------------------------------------------------------------ */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
            border: '1.5px solid #ccfbf1',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(13, 148, 136, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f766e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplets size={20} color="#0d9488" />
                <span>{t('q2Water')}</span>
              </span>
              <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0f766e', background: '#ccfbf1', padding: '3px 10px', borderRadius: '12px' }}>
                {waterGlasses} / 8 {isTamil ? 'டம்ளர்கள்' : 'Glasses'} ({waterGlasses * 250} {isTamil ? 'மி.லி' : 'ml'})
              </span>
            </div>

            {/* 8 Interactive Glass Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px', marginBottom: '12px' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                const isFilled = idx < waterGlasses;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDirectGlassClick(idx)}
                    title={`Click to set ${idx + 1} glasses`}
                    style={{
                      flex: 1,
                      height: '44px',
                      borderRadius: '10px',
                      border: isFilled ? '1.5px solid #0d9488' : '1px dashed #cbd5e1',
                      background: isFilled ? 'linear-gradient(180deg, #99f6e4 0%, #14b8a6 100%)' : '#f8fafc',
                      color: isFilled ? '#042f2e' : '#94a3b8',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      boxShadow: isFilled ? '0 3px 8px rgba(20, 184, 166, 0.3)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '0.95rem' }}>💧</span>
                    <span style={{ fontSize: '0.66rem', fontWeight: 800 }}>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Adjust Buttons & Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleWaterChange(-1)}
                  disabled={waterGlasses <= 0}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: 'white',
                    color: '#334155',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: waterGlasses <= 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  - 1 {isTamil ? 'டம்ளர்' : 'Glass'}
                </button>
                <button
                  type="button"
                  onClick={() => handleWaterChange(1)}
                  disabled={waterGlasses >= 8}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '10px',
                    border: '1px solid #0d9488',
                    background: '#0d9488',
                    color: 'white',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: waterGlasses >= 8 ? 'not-allowed' : 'pointer'
                  }}
                >
                  + 1 {isTamil ? 'டம்ளர்' : 'Glass'}
                </button>
              </div>

              <div style={{ flex: 1, height: '9px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(waterGlasses / 8) * 100}%`,
                  background: 'linear-gradient(90deg, #14b8a6 0%, #0284c7 100%)',
                  borderRadius: '5px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* QUESTION 3: MEDICATION CHECK-IN (DID YOU TAKE MEDS?) */}
          {/* ------------------------------------------------------------ */}
          <div style={{
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
            border: '1.5px solid #ddd6fe',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(124, 58, 237, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#5b21b6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Pill size={20} color="#7c3aed" />
                <span>{t('q3Meds')}</span>
              </span>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                background: medicationTaken ? '#dcfce7' : '#fef3c7',
                color: medicationTaken ? '#15803d' : '#92400e',
                padding: '3px 10px',
                borderRadius: '12px'
              }}>
                {medicationTaken ? (isTamil ? '✅ ஆம், உட்கொண்டேன்' : '✅ Yes, Taken') : (isTamil ? '⏳ இன்னும் இல்லை' : '⏳ Not Yet')}
              </span>
            </div>

            {/* Yes / No Toggle Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={() => handleMedicationToggle(true)}
                style={{
                  padding: '10px',
                  borderRadius: '12px',
                  border: medicationTaken ? '2px solid #16a34a' : '1px solid #cbd5e1',
                  background: medicationTaken ? '#dcfce7' : 'white',
                  color: medicationTaken ? '#14532d' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={16} />
                <span>{t('yesTaken')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleMedicationToggle(false)}
                style={{
                  padding: '10px',
                  borderRadius: '12px',
                  border: !medicationTaken ? '2px solid #f59e0b' : '1px solid #cbd5e1',
                  background: !medicationTaken ? '#fef3c7' : 'white',
                  color: !medicationTaken ? '#78350f' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Clock size={16} />
                <span>{t('notYet')}</span>
              </button>
            </div>

            {/* Medication Name Chips */}
            <div>
              <div style={{ fontSize: '0.76rem', color: '#6d28d9', fontWeight: 700, marginBottom: '6px' }}>
                {t('tapVitamins')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {quickMedOptions.map((opt) => {
                  const isChecked = medicationNames.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleQuickMed(opt)}
                      style={{
                        fontSize: '0.74rem',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        border: isChecked ? '1.5px solid #7c3aed' : '1px solid #e2e8f0',
                        background: isChecked ? '#ede9fe' : 'white',
                        color: isChecked ? '#5b21b6' : '#64748b',
                        fontWeight: isChecked ? 800 : 600,
                        cursor: 'pointer'
                      }}
                    >
                      {isChecked ? '✓ ' : '+ '}{opt}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={medicationNames}
                onChange={(e) => handleMedNameChange(e.target.value)}
                placeholder={isTamil ? 'மருந்தின் பெயரை உள்ளிடவும்...' : 'Type custom medication name(s)...'}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #ddd6fe',
                  fontSize: '0.8rem',
                  background: 'white',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* QUESTION 4: SLEEP & PAIN LEVEL */}
          {/* ------------------------------------------------------------ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Sleep Hours */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Moon size={16} color="#6366f1" />
                  <span>{isTamil ? 'நேற்று இரவு தூக்கம்' : 'Sleep Last Night'}</span>
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#4f46e5' }}>{sleepHours}{isTamil ? ' மணிநேரம்' : 'h'}</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={(e) => handleSleepChange(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#6366f1' }}
              />
            </div>

            {/* Pain / Cramp Slider */}
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '16px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9f1239', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={16} color="#e11d48" />
                  <span>{isTamil ? 'மாதவிடாய் வலி / பிடிப்பு' : 'Cramps / Pain'}</span>
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#be123c' }}>{painLevel} / 10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={painLevel}
                onChange={(e) => handlePainChange(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#e11d48' }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 EMERGENCY CONTACTS + 1-CLICK AGE PROFILES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* ============================================================ */}
          {/* SECTION: 3 EMERGENCY CONTACTS MANAGEMENT CARD */}
          {/* ============================================================ */}
          <div className="glass-card" style={{
            padding: '24px',
            borderRadius: '28px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid #fecdd3',
            boxShadow: '0 12px 32px rgba(225, 29, 72, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={18} color="#e11d48" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#881337' }}>
                    {isTamil ? 'எனது 3 அவசர உதவி எண்கள் (SOS)' : 'My 3 Emergency SOS Contacts'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#64748b' }}>
                    {isTamil ? 'அழைக்க, திருத்த அல்லது மாற்ற கிளிக் செய்யவும்' : 'Click to call, edit, or customize your support circle'}
                  </p>
                </div>
              </div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '2px 8px', borderRadius: '12px' }}>
                {isTamil ? 'செயலில் உள்ள SOS' : 'Active SOS'}
              </span>
            </div>

            {/* List of 3 Emergency Contacts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
              {emergencyContacts.map((contact, index) => {
                const isEditing = editingContactId === contact.id;

                if (isEditing) {
                  return (
                    <div
                      key={contact.id}
                      style={{
                        padding: '12px',
                        borderRadius: '14px',
                        background: '#fff1f2',
                        border: '1.5px solid #f43f5e',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder={isTamil ? 'தொடர்பு பெயர்' : 'Contact Name'}
                          style={{ flex: 2, padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        />
                        <input
                          type="text"
                          value={editForm.relation}
                          onChange={(e) => setEditForm({ ...editForm, relation: e.target.value })}
                          placeholder={isTamil ? 'உறவுமுறை (எ.கா. தாய், மருத்துவர்)' : 'Relation (e.g. Mother, Doctor)'}
                          style={{ flex: 1, padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder={isTamil ? 'தொலைபேசி எண் (+91...)' : 'Phone (+91...)'}
                          style={{ flex: 2, padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        />
                        <button
                          type="button"
                          onClick={() => saveEditContact(contact.id)}
                          style={{
                            flex: 1,
                            background: '#16a34a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <Save size={14} /> {isTamil ? 'சேமி' : 'Save'}
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={contact.id}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      background: '#fdf2f8',
                      border: '1px solid #fbcfe8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#881337' }}>
                          {index + 1}. {contact.name}
                        </span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#fce7f3', color: '#be185d', padding: '1px 6px', borderRadius: '8px' }}>
                          {contact.relation}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>
                        {contact.phone}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <a
                        href={`tel:${contact.phone}`}
                        title={isTamil ? 'அழைக்கவும்' : 'Call Contact'}
                        style={{
                          background: '#e11d48',
                          color: 'white',
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(225, 29, 72, 0.3)'
                        }}
                      >
                        <PhoneCall size={16} />
                      </a>
                      <button
                        type="button"
                        onClick={() => startEditContact(contact)}
                        title={isTamil ? 'திருத்தவும்' : 'Edit Contact'}
                        style={{
                          background: 'white',
                          border: '1px solid #cbd5e1',
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#475569'
                        }}
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick SOS Distress Broadcast Button */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={triggerSosDistressSms}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Send size={14} />
                <span>{isTamil ? '3 பேருக்கும் SOS அவசர எச்சரிக்கை அனுப்பவும்' : 'Simulate SOS Alert to All 3 Contacts'}</span>
              </button>
            </div>

            {sosSentMessage && (
              <div style={{ marginTop: '8px', fontSize: '0.74rem', color: '#166534', background: '#dcfce7', padding: '6px 12px', borderRadius: '10px', textAlign: 'center', fontWeight: 700 }}>
                {isTamil
                  ? '✓ கவிதா, மருத்துவர் பிரியா மற்றும் தீபாவிற்கு அவசர குறுஞ்செய்தி அனுப்பப்பட்டது!'
                  : '✓ Emergency SMS distress dispatched to Kavitha, Dr. Priya, and Deepa!'}
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* SECTION: 1-CLICK AGE PROFILE LAUNCHERS & DASHBOARD ENTRY */}
          {/* ============================================================ */}
          <div className="glass-card" style={{
            padding: '24px',
            borderRadius: '28px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(244, 63, 94, 0.3)',
            boxShadow: '0 16px 40px rgba(244, 63, 94, 0.12)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: '#fdf2f8', borderRadius: '16px', color: '#db2777', fontSize: '0.76rem', fontWeight: 800, marginBottom: '10px' }}>
              <Activity size={14} />
              <span>{t('chooseProfileLaunch')}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#881337', margin: '0 0 4px 0' }}>
              {isTamil ? 'வயதுப் பிரிவைத் தேர்ந்தெடுத்து உள்ளே செல்லவும்' : 'Select Age Group & Enter'}
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0 0 14px 0' }}>
              {isTamil
                ? 'உங்கள் வயதுக்கேற்ப வடிவமைக்கப்பட்டது. உங்கள் மனநிலை & நீர்ச்சத்துடன் தொடங்க கிளிக் செய்க:'
                : 'Everything personalized to your age. Tap any role to launch with your tracked mood & hydration:'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {presets.map((p) => {
                const isSelected = selectedPreset.age === p.age;
                return (
                  <div
                    key={p.age}
                    onClick={() => setSelectedPreset(p)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #e11d48' : '1px solid #fecdd3',
                      background: isSelected ? 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)' : '#fafafa',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#881337' }}>
                        {p.badge}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {p.desc}
                      </div>
                    </div>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #e11d48' : '2px solid #cbd5e1',
                      background: 'white'
                    }} />
                  </div>
                );
              })}
            </div>

            {/* BIG GLOWING LAUNCH BUTTON */}
            <button
              type="button"
              onClick={() => handleQuickEnterDashboard(selectedPreset)}
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.05rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '18px',
                boxShadow: '0 8px 24px rgba(244, 63, 94, 0.45)',
                cursor: loading ? 'wait' : 'pointer'
              }}
            >
              <span>{loading ? (isTamil ? 'முகப்பு திறக்கிறது...' : 'Launching Dashboard...') : `🌸 ${selectedPreset.name} ${isTamil ? 'ஆக நுழையவும்' : 'Enter as ' + selectedPreset.name}`}</span>
              <ArrowRight size={20} />
            </button>

            {/* Toggle Custom Registration / Login */}
            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <button
                type="button"
                onClick={() => setShowCustomForm(!showCustomForm)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#be123c',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {showCustomForm ? (isTamil ? 'படிவத்தை மூடு' : 'Close Custom Form') : t('customLoginToggle')}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* CUSTOM FORM POPUP (IF CLICKED) */}
      {/* ============================================================ */}
      {showCustomForm && (
        <div style={{
          maxWidth: '520px',
          width: '100%',
          marginBottom: '24px',
          padding: '24px',
          borderRadius: '24px',
          background: 'white',
          border: '1.5px solid #fecdd3',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 800, color: '#881337' }}>
            {isLoginMode ? (isTamil ? 'தனிப்பட்ட கணக்கு மூலம் உள்நுழைக' : 'Sign In with Custom Account') : (isTamil ? 'புதிய கணக்கை பதிவு செய்க' : 'Register New Custom Account')}
          </h3>

          {error && (
            <div style={{ padding: '8px 12px', background: '#fff1f2', color: '#be123c', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleCustomSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
              {!isLoginMode && (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isTamil ? 'முழுப் பெயர்' : 'Full Name'}
                  required
                  className="input-field"
                />
              )}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={isTamil ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                required
                className="input-field"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={isTamil ? 'கடவுச்சொல்' : 'Password'}
                required
                className="input-field"
              />
              {!isLoginMode && (
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder={isTamil ? 'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்' : 'Confirm Password'}
                  required
                  className="input-field"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 800 }}
            >
              {loading ? (isTamil ? 'செயல்படுகிறது...' : 'Working...') : (isLoginMode ? (isTamil ? 'உள்நுழைக' : 'Sign In') : (isTamil ? 'பதிவு செய்து உள்ளே செல்லவும்' : 'Create & Enter'))}
            </button>

            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem' }}>
              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                style={{ background: 'none', border: 'none', color: '#be123c', fontWeight: 700, cursor: 'pointer' }}
              >
                {isLoginMode ? (isTamil ? 'புதிய கணக்கு தேவையா? பதிவு செய்க' : 'Need a new account? Register') : (isTamil ? 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக' : 'Already registered? Login')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* EMERGENCY SOS FULL MODAL (HOTLINES + SIREN + 3 CONTACTS) */}
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
            maxWidth: '540px',
            width: '100%',
            background: 'white',
            borderRadius: '28px',
            padding: '26px',
            boxShadow: '0 24px 60px rgba(225, 29, 72, 0.4)',
            border: '2.5px solid #f43f5e'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertCircle size={24} color="#e11d48" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#be123c' }}>
                    🚨 {isTamil ? 'அவசர மருத்துவ உதவி SOS' : 'Emergency Medical SOS'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#881337', fontWeight: 600 }}>
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
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#be123c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isSirenActive ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
                  <span>{isSirenActive ? (isTamil ? 'சைரன் அலறுகிறது!' : 'SIREN SOUNDING!') : (isTamil ? 'அவசர சைரன் ஒலிக்கச் செய்' : 'Sound Emergency Siren')}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#881337' }}>
                  {isTamil ? 'உடனடி உதவி பெற உரத்த அலாரம் ஒலியை எழுப்புகிறது' : 'Loud auditory buzzer to attract immediate nearby help'}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleSiren}
                style={{
                  background: isSirenActive ? '#991b1b' : '#e11d48',
                  color: 'white',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {isSirenActive ? (isTamil ? 'சைரனை நிறுத்து' : 'Stop Siren') : (isTamil ? 'சைரனை இயக்கு' : 'Trigger Siren')}
              </button>
            </div>

            {/* 3 Personal Emergency Contacts Section */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#881337', marginBottom: '8px' }}>
                {isTamil ? 'உங்கள் 3 அவசர உதவி எண்கள் (1 முறை தொட்டு அழைக்கலாம்):' : 'Your 3 Designated Emergency Contacts (1-Tap Call):'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {emergencyContacts.map((c, i) => (
                  <a
                    key={c.id}
                    href={`tel:${c.phone}`}
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: '#fff1f2',
                      border: '1px solid #fecdd3',
                      borderRadius: '12px',
                      color: '#881337'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <PhoneCall size={16} color="#e11d48" />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.84rem' }}>{i + 1}. {c.name} ({c.relation})</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.phone}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, background: '#e11d48', color: 'white', padding: '4px 10px', borderRadius: '10px' }}>
                      {isTamil ? 'அழைக்கவும்' : 'Call Now'}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* National Emergency Helplines */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
              <a
                href="tel:108"
                style={{
                  textDecoration: 'none',
                  background: '#fef2f2',
                  border: '1.5px solid #fca5a5',
                  borderRadius: '14px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#991b1b' }}>🚑 {isTamil ? 'மருத்துவ அவசர ஊர்தி' : 'Medical Emergency'}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#b91c1c' }}>108</div>
              </a>

              <a
                href="tel:112"
                style={{
                  textDecoration: 'none',
                  background: '#eff6ff',
                  border: '1.5px solid #93c5fd',
                  borderRadius: '14px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#1e40af' }}>🚨 {isTamil ? 'ஒருங்கிணைந்த காவல் உதவி' : 'Unified Dispatch'}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1d4ed8' }}>112</div>
              </a>

              <a
                href="tel:1091"
                style={{
                  textDecoration: 'none',
                  background: '#fdf2f8',
                  border: '1.5px solid #f472b6',
                  borderRadius: '14px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#9d174d' }}>🛡️ {isTamil ? 'பெண்கள் உதவி மையம்' : 'Women Helpline'}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#be185d' }}>1091</div>
              </a>

              <a
                href="tel:18005990019"
                style={{
                  textDecoration: 'none',
                  background: '#f0fdf4',
                  border: '1.5px solid #86efac',
                  borderRadius: '14px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#166534' }}>🧠 {isTamil ? 'மனநல ஆலோசனை உதவி' : 'Mental Support'}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#15803d' }}>1800-599-0019</div>
              </a>
            </div>

            <div style={{ fontSize: '0.72rem', color: '#64748b', textAlign: 'center' }}>
              {isTamil
                ? '⚠️ திடீரென தீவிர வலி அல்லது கடுமையான இரத்தப்போக்கு ஏற்பட்டால் உடனடியாக மருத்துவமனை அவசர சிகிச்சைப் பிரிவை அணுகவும்.'
                : '⚠️ If experiencing sudden unbearable pain or heavy bleeding, seek emergency hospital care immediately.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
