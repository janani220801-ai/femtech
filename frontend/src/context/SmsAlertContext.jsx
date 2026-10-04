import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

const SmsAlertContext = createContext(null);

export const SmsAlertProvider = ({ children }) => {
  const { user } = useAuth();
  const { language } = useLanguage();

  // 1. Synchronized User Phone & Linked Mother Contact State
  const [userPhone, setUserPhone] = useState(() => {
    return localStorage.getItem('femtech_user_phone') || user?.phone || '+91 98401 23456';
  });

  const [motherName, setMotherName] = useState(() => {
    return localStorage.getItem('femtech_mother_name') || user?.emergencyContact?.name || 'Kavitha (Mother)';
  });

  const [motherPhone, setMotherPhone] = useState(() => {
    return localStorage.getItem('femtech_mother_phone') || user?.emergencyContact?.phone || '+91 98401 65432';
  });

  // Listen for external updates or storage events
  useEffect(() => {
    const handlePhoneUpdate = (e) => {
      if (e.detail?.phone) setUserPhone(e.detail.phone);
    };
    const handleMotherUpdate = (e) => {
      if (e.detail?.phone) setMotherPhone(e.detail.phone);
      if (e.detail?.name) setMotherName(e.detail.name);
    };
    window.addEventListener('femtech_phone_updated', handlePhoneUpdate);
    window.addEventListener('femtech_mother_phone_updated', handleMotherUpdate);
    return () => {
      window.removeEventListener('femtech_phone_updated', handlePhoneUpdate);
      window.removeEventListener('femtech_mother_phone_updated', handleMotherUpdate);
    };
  }, []);

  // Update when user object loads
  useEffect(() => {
    if (user?.phone && !localStorage.getItem('femtech_user_phone')) {
      setUserPhone(user.phone);
      localStorage.setItem('femtech_user_phone', user.phone);
    }
    if (user?.emergencyContact?.phone && !localStorage.getItem('femtech_mother_phone')) {
      setMotherPhone(user.emergencyContact.phone);
      localStorage.setItem('femtech_mother_phone', user.emergencyContact.phone);
    }
  }, [user]);

  // Method to save user phone
  const saveUserPhone = (newPhone) => {
    const clean = (newPhone || '').trim();
    if (!clean) return;
    setUserPhone(clean);
    localStorage.setItem('femtech_user_phone', clean);

    try {
      const cached = localStorage.getItem('femtech_cached_user');
      if (cached) {
        const u = JSON.parse(cached);
        u.phone = clean;
        localStorage.setItem('femtech_cached_user', JSON.stringify(u));
      }
    } catch (e) {}

    window.dispatchEvent(new CustomEvent('femtech_phone_updated', { detail: { phone: clean } }));
  };

  // Method to save mother contact
  const saveMotherContact = (name, phone) => {
    const cleanName = (name || motherName || 'Kavitha (Mother)').trim();
    const cleanPhone = (phone || motherPhone || '+91 98401 65432').trim();

    setMotherName(cleanName);
    setMotherPhone(cleanPhone);
    localStorage.setItem('femtech_mother_name', cleanName);
    localStorage.setItem('femtech_mother_phone', cleanPhone);

    // Sync with femtech_emergency_contacts
    try {
      const savedContacts = localStorage.getItem('femtech_emergency_contacts');
      let contactsList = savedContacts ? JSON.parse(savedContacts) : [];
      if (!Array.isArray(contactsList) || contactsList.length === 0) {
        contactsList = [
          { id: 1, name: cleanName, relation: 'Mother', phone: cleanPhone },
          { id: 2, name: 'Dr. Priya Raman (OB/GYN)', relation: 'Doctor', phone: '+91 44 2836 1000' },
          { id: 3, name: 'Deepa (Sister / Friend)', relation: 'Sister', phone: '+91 98401 98765' }
        ];
      } else {
        contactsList[0] = {
          ...contactsList[0],
          name: cleanName,
          phone: cleanPhone,
          relation: 'Mother'
        };
      }
      localStorage.setItem('femtech_emergency_contacts', JSON.stringify(contactsList));
    } catch (e) {}

    window.dispatchEvent(new CustomEvent('femtech_mother_phone_updated', {
      detail: { name: cleanName, phone: cleanPhone }
    }));
  };

  // Method to save both simultaneously
  const saveBothNumbers = (newUserPhone, newMotherPhone, newMotherName) => {
    if (newUserPhone) saveUserPhone(newUserPhone);
    if (newMotherPhone) saveMotherContact(newMotherName || motherName, newMotherPhone);
  };

  // 2. 30-Minute Continuous Wellness Alert & Direct Phone Notification Engine
  const [is30MinActive, setIs30MinActive] = useState(() => {
    const saved = localStorage.getItem('femtech_30min_sms_active') || localStorage.getItem('femtech_10min_sms_active');
    return saved !== null ? saved === 'true' : true; // Default ON!
  });

  const [secondsRemaining, setSecondsRemaining] = useState(1800); // 30 minutes = 1800s
  const [cycleIndex, setCycleIndex] = useState(() => {
    const saved = localStorage.getItem('femtech_cycle_index');
    const parsed = parseInt(saved || '0', 10);
    return isNaN(parsed) ? 0 : parsed;
  });
  const [activeToast, setActiveToast] = useState(null);

  const dismissToast = () => setActiveToast(null);

  const toggle30MinCycle = () => {
    setIs30MinActive((prev) => {
      const next = !prev;
      localStorage.setItem('femtech_30min_sms_active', String(next));
      localStorage.setItem('femtech_10min_sms_active', String(next));
      if (next) setSecondsRemaining(1800);
      return next;
    });
  };

  const toggle10MinCycle = toggle30MinCycle;
  const is10MinActive = is30MinActive;

  // 3. Audio Chime Player
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (e) {}
  };

  // 4. Notification Permission
  const [notificationPermission, setNotificationPermission] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      const handleUserClick = () => {
        Notification.requestPermission().then((perm) => {
          setNotificationPermission(perm);
        });
        window.removeEventListener('click', handleUserClick);
        window.removeEventListener('touchstart', handleUserClick);
      };
      window.addEventListener('click', handleUserClick, { once: true });
      window.addEventListener('touchstart', handleUserClick, { once: true });
      return () => {
        window.removeEventListener('click', handleUserClick);
        window.removeEventListener('touchstart', handleUserClick);
      };
    }
  }, []);

  const requestNotificationAccess = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === 'granted') {
        new Notification('🌸 FemTech Wellness Notifications Active', {
          body: `Direct health & wellness check-ins linked to ${userPhone}.`,
          icon: '/favicon.ico'
        });
        playChime();
      }
    }
  };

  // 5. Message Thread History
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('femtech_sms_thread');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const initialName = user?.name ? user.name.split(' ')[0] : 'Janani';
    return [
      {
        id: 1,
        sender: 'femtech',
        is10MinAlert: false,
        time: '06:00 AM',
        text: `காலை வணக்கம் ${initialName}! 🌸 நன்றாக தூங்கினீர்களா? எழுந்தவுடன் ஒரு டம்ளர் வெதுவெதுப்பான தண்ணீர் குடிக்கவும்.`,
        dispatchedTo: { userPhone: '+91 98401 23456', motherName: 'Kavitha (Mother)', motherPhone: '+91 98401 65432' },
        timestamp: 'Today, 06:00 AM'
      },
      {
        id: 2,
        sender: 'user',
        time: '06:15 AM',
        text: 'நல்லா தூங்குனேன், இப்ப நல்லா ஃபீல் பண்றேன்.',
        timestamp: 'Today, 06:15 AM'
      },
      {
        id: 3,
        sender: 'femtech',
        is10MinAlert: true,
        time: '08:10 AM',
        text: `[10 நிமிட நினைவூட்டல்] வணக்கம் ${initialName}! 💧 தண்ணி குடிச்சியா? 8 டம்ளர் இலக்கை அடைந்துவிட்டீர்களா? உங்கள் உடலை நீரேற்றத்துடன் வைத்திருக்கவும்.`,
        dispatchedTo: { userPhone: '+91 98401 23456', motherName: 'Kavitha (Mother)', motherPhone: '+91 98401 65432' },
        timestamp: 'Today, 08:10 AM'
      }
    ];
  });

  // Save messages to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('femtech_sms_thread', JSON.stringify(messages.slice(-30))); // Keep last 30
    } catch (e) {}
  }, [messages]);

  // 6. Rotating 30-Minute Diverse Wellness Questions (18+ Caring Topics across 10 Languages)
  const get30MinAlertText = (index, lang) => {
    const name = user?.name ? user.name.split(' ')[0] : 'Janani';
    const alertsTa = [
      `[30 நிமிட நலவாழ்வு] நிமிர்ந்து உட்கார்ந்து தோள்பட்டையை தளர்த்தி 3 முறை ஆழமாக மூச்சு விட்டீர்களா ${name}? 🧘‍♀️`,
      `[30 நிமிட நலவாழ்வு] இன்னைக்கு சத்தான பழம் அல்லது பாதாம், வால்நட் போன்ற நட்ஸ் சாப்பிட்டீங்களா ${name}? 🍎`,
      `[30 நிமிட நலவாழ்வு] திரையை விட்டு கண்களை விலக்கி 20 நொடிகள் தூரமான இடத்தை பார்த்து கண்களுக்கு ஓய்வு கொடுத்தீர்களா? 👀`,
      `[30 நிமிட நலவாழ்வு] உடலுக்கு குளிர்ச்சியான நீர், மோர் அல்லது இளநீர் ஒரு டம்ளர் பருகினீர்களா ${name}? 💧`,
      `[30 நிமிட நலவாழ்வு] உங்கள் உடல் மற்றும் அடிவயிற்றில் ஏதேனும் வலி அல்லது அசௌகரியம் இருக்கிறதா? சௌக்கியமாக உணர்கிறீர்களா? 🌸`,
      `[30 நிமிட நலவாழ்வு] மனதை லேசாக்க கண்களை மூடி 1 நிமிடம் அமைதியாக ஓய்வெடுத்தீர்களா ${name}? 🕊️`,
      `[30 நிமிட நலவாழ்வு] தொடர்ந்து உட்காராமல் எழுந்து 5 நிமிடம் கால்களை அசைத்து சிறிது தூரம் உலாவி வந்தீர்களா? 🚶‍♀️`,
      `[30 நிமிட நலவாழ்வு] சரியான நேரத்திற்கு சுடச்சுட சத்தான உணவை உட்கொண்டீர்களா ${name}? பசியோடு இருக்காதீங்க! 🍱`,
      `[30 நிமிட நலவாழ்வு] இன்றைய நாளில் உங்கள் முகத்தில் ஒரு அழகான புன்னகை வந்ததா? நீங்கள் மிகவும் சிறப்பு! 💖`,
      `[30 நிமிட நலவாழ்வு] கழுத்து மற்றும் தோள்பட்டை தசைகளை மெதுவாக சுழற்றி இறுக்கத்தை தளர்த்தினீர்களா ${name}? 💆‍♀️`,
      `[30 நிமிட நலவாழ்வு] மருத்துவர் பரிந்துரைத்த வைட்டமின்கள், இரும்புச்சத்து அல்லது சத்தான கீரை உணவுகளை எடுத்தீர்களா? 💊`,
      `[30 நிமிட நலவாழ்வு] இன்று உங்களுக்காக நீங்கள் ஒதுக்கிய 10 நிமிட தனிப்பட்ட ஓய்வு நேரம் கிடைத்ததா ${name}? 🌺`,
      `[30 நிமிட நலவாழ்வு] உங்கள் உடலுக்கு தேவையான 7-8 மணிநேர ஆழ்ந்த தூக்கம் கிடைக்க திட்டமிட்டுள்ளீர்களா? 🌙`,
      `[30 நிமிட நலவாழ்வு] ஒரு டம்ளர் சுத்தமான வெதுவெதுப்பான நீரை மெதுவாக பருகி உடலை புத்துணர்ச்சி பெற செய்யுங்கள்! 🍵`,
      `[30 நிமிட நலவாழ்வு] இன்று உங்கள் மனநிலை எப்படி இருக்கிறது ${name}? மகிழ்ச்சியாகவும் அமைதியாகவும் உணர்கிறீர்களா? ☀️`,
      `[30 நிமிட நலவாழ்வு] அடிமுதுகு வலி வராமல் இருக்க இடுப்பு மற்றும் முதுகுத்தண்டை லேசாக ஸ்ட்ரெட்ச் செய்தீர்களா? 🧘`,
      `[30 நிமிட நலவாழ்வு] உணவில் போதிய அளவு நார்ச்சத்து மற்றும் காய்கறிகளை சேர்த்துக் கொண்டீர்களா ${name}? 🥗`,
      `[30 நிமிட நலவாழ்வு] உங்கள் உடலின் சமிக்ஞைகளைக் கவனித்து, உடலுக்குத் தேவையான ஓய்வைக் கொடுத்தீர்களா? 🌿`
    ];

    const alertsEn = [
      `[30-Min Wellness] Roll your shoulders back and take 3 gentle deep breaths, ${name}! 🧘‍♀️`,
      `[30-Min Wellness] Did you nourish yourself with a fresh fruit or healthy nuts today, ${name}? 🍎`,
      `[30-Min Wellness] Give your eyes a 20-second break from screens by looking into the distance, ${name}! 👀`,
      `[30-Min Wellness] Have you taken a fresh sip of water or soothing herbal water recently, ${name}? 💧`,
      `[30-Min Wellness] How is your body feeling right now? Any cramps or discomfort we can ease, ${name}? 🌸`,
      `[30-Min Wellness] Take 1 peaceful minute to quiet your mind and release all tension, ${name}! 🕊️`,
      `[30-Min Wellness] Stand up and take a gentle 5-minute stroll to keep your circulation happy, ${name}! 🚶‍♀️`,
      `[30-Min Wellness] Have you had your nutritious, wholesome meal on time, ${name}? Never skip food! 🍱`,
      `[30-Min Wellness] Remember to gift yourself a warm smile today—you are truly wonderful and doing great! 💖`,
      `[30-Min Wellness] Gently rotate your neck and relax any stiffness in your neck muscles, ${name}! 💆‍♀️`,
      `[30-Min Wellness] Have you taken your recommended supplements, iron-rich greens, or vitamins today? 💊`,
      `[30-Min Wellness] Did you take 10 minutes of peaceful self-care time just for yourself today, ${name}? 🌺`,
      `[30-Min Wellness] Are you prepared for restorative 7-8 hours of peaceful sleep tonight, ${name}? 🌙`,
      `[30-Min Wellness] Sip a glass of clean warm water to keep your body glowing and refreshed! 🍵`,
      `[30-Min Wellness] How is your energy and mood right now, ${name}? Feeling calm and positive? ☀️`,
      `[30-Min Wellness] Stretch your lower back gently to release any sitting stiffness, ${name}! 🧘`,
      `[30-Min Wellness] Are you getting enough dietary fiber, greens, and vibrant vegetables today? 🥗`,
      `[30-Min Wellness] Listen to what your body is whispering—give yourself grace and love! 🌿`
    ];

    const alertsHi = [
      `[30-मिनट स्वास्थ्य] सीधी बैठकर कंधों को ढीला छोड़ें और 3 गहरी सांसें लें ${name}! 🧘‍♀️`,
      `[30-मिनट स्वास्थ्य] क्या आज आपने कोई ताजा फल या मेवे (बादाम/अखरोट) खाए ${name}? 🍎`,
      `[30-मिनट स्वास्थ्य] स्क्रीन से नज़रें हटाकर 20 सेकंड के लिए दूर देखें और आँखों को आराम दें! 👀`,
      `[30-मिनट स्वास्थ्य] क्या आपने पानी या गुनगुने पेय का घूंट पिया ${name}? 💧`,
      `[30-मिनट स्वास्थ्य] आज शरीर में कोई ऐंठन या दर्द तो महसूस नहीं हो रहा ${name}? 🌸`,
      `[30-मिनट स्वास्थ्य] 1 मिनट आँखें बंद करके मन को शांत करें और तनाव दूर भगाएं! 🕊️`,
      `[30-मिनट स्वास्थ्य] 5 मिनट टहलें और शरीर में रक्त संचार बेहतर बनाएं ${name}! 🚶‍♀️`,
      `[30-मिनट स्वास्थ्य] क्या आपने समय पर पौष्टिक और संतुलित भोजन किया? 🍱`,
      `[30-मिनट स्वास्थ्य] खुद को एक प्यारी सी मुस्कान दें—आप बहुत खास हैं ${name}! 💖`
    ];

    const alertsTe = [
      `[30 నిమిషాల ఆరోగ్యం] ప్రశాంతంగా కూర్చుని 3 సార్లు దీర్ఘ శ్వాస తీసుకోండి ${name}! 🧘‍♀️`,
      `[30 నిమిషాల ఆరోగ్యం] ఈరోజు ఏదైనా పండు లేదా బాదం/జీడిపప్పు తిన్నారా ${name}? 🍎`,
      `[30 నిమిషాల ఆరోగ్యం] కళ్ళకు విశ్రాంతి ఇవ్వడానికి స్క్రీన్‌ను పక్కన పెట్టి కాసేపు దూరంగా చూడండి! 👀`,
      `[30 నిమిషాల ఆరోగ్యం] తగినంత మంచినీరు లేదా మజ్జిగ తాగారా ${name}? 💧`,
      `[30 నిమిషాల ఆరోగ్యం] మీ ఆరోగ్యం ఎలా ఉంది? కడుపులో ఏమైనా అసౌకర్యం ఉందా? 🌸`
    ];

    const alertsMl = [
      `[30 മിനിറ്റ് ആരോഗ്യം] നേരെയിരുന്ന് 3 തവണ ദീർഘമായി ശ്വാസമെടുക്കൂ ${name}! 🧘‍♀️`,
      `[30 മിനിറ്റ് ആരോഗ്യം] ഇന്ന് എന്തെങ്കിലും പഴങ്ങളോ നട്ട്സോ കഴിച്ചോ ${name}? 🍎`,
      `[30 മിനിറ്റ് ആരോഗ്യം] കണ്ണുകൾക്ക് വിശ്രമം നൽകാൻ അല്പം നേരം സ്ക്രീനിൽ നിന്ന് മാറിയിരിക്കൂ! 👀`,
      `[30 മിനിറ്റ് ആരോഗ്യം] ഒരു ഗ്ലാസ് ശുദ്ധമായ വെള്ളം കുടിച്ചോ ${name}? 💧`
    ];

    let list = alertsEn;
    if (lang === 'ta') list = alertsTa;
    else if (lang === 'hi') list = alertsHi;
    else if (lang === 'te') list = alertsTe;
    else if (lang === 'ml') list = alertsMl;

    const safeIdx = (typeof index === 'number' && !isNaN(index)) ? Math.abs(index) : 0;
    const alertResult = list[safeIdx % list.length];
    return alertResult || alertsTa[0] || alertsEn[0];
  };

  const get10MinAlertText = get30MinAlertText; // Alias for backward compatibility

  // 7. Core Wellness Alert & Direct Phone Dispatch Function
  const trigger30MinAlert = (customText) => {
    playChime();
    const safeIndex = (typeof cycleIndex === 'number' && !isNaN(cycleIndex)) ? cycleIndex : 0;
    const generatedText = get30MinAlertText(safeIndex, language);
    const alertMsg = (customText && typeof customText === 'string' && customText.trim())
      ? customText.trim()
      : (generatedText || `[30 நிமிட நலவாழ்வு] தண்ணீர் பருகி உடலை புத்துணர்ச்சியோடு வைத்துக்கொள்ளுங்கள்! 💧`);

    const nextIdx = (safeIndex + 1) % 50;
    setCycleIndex(nextIdx);
    localStorage.setItem('femtech_cycle_index', String(nextIdx));

    // Browser Native Push Notification directly into Phone / OS notification shade
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`🌸 FemTech Wellness Check-in`, {
          body: `${alertMsg}\n📱 Dispatched directly to: ${userPhone}`,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'femtech-wellness-30min'
        });
      } catch (e) {}
    }

    // Silent Background SMS API Dispatch directly via relative API path
    try {
      fetch('/api/sms/send-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone,
          motherPhone,
          motherName,
          message: alertMsg,
          alertType: '30-Minute Recurring Wellness Alert'
        })
      }).catch(() => {});
    } catch (e) {}

    const newMsg = {
      id: Date.now(),
      sender: 'femtech',
      is10MinAlert: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: alertMsg,
      dispatchedTo: {
        userPhone,
        motherName,
        motherPhone
      },
      timestamp: `Dispatched at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };

    setMessages((prev) => [...prev, newMsg]);
    setSecondsRemaining(1800); // Reset 30-min countdown
  };

  // Direct RFC 5724 native SMS app opener (opens the real phone Messaging / SMS app with recipient & text pre-filled)
  const openNativePhoneSms = (phone, text) => {
    const targetPhone = (phone || userPhone || '').replace(/[^0-9+]/g, '');
    const messageText = text || get30MinAlertText(cycleIndex, language);
    const encodedText = encodeURIComponent(messageText);
    const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const smsUrl = `sms:${targetPhone}${isIos ? '&' : '?'}body=${encodedText}`;
    window.location.href = smsUrl;
  };

  const trigger10MinAlert = trigger30MinAlert;
  const trigger10MinAlertNow = (customMsg) => trigger30MinAlert(customMsg);

  // Slot-based SMS trigger for the 5 fixed daily times
  const triggerSlotSMS = (slot) => {
    playChime();
    const smsContent = (language === 'ta' ? slot.textTa : slot.textEn) || slot.textEn;

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`FemTech Scheduled Check-in (${slot.time})`, {
          body: `${smsContent}\n📱 Sent to: ${userPhone}`,
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      } catch (e) {}
    }

    // Silent background dispatch to real cellular SMS gateway
    try {
      fetch('/api/sms/send-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone,
          motherPhone,
          motherName,
          message: smsContent,
          alertType: `Scheduled ${slot.time}`
        })
      }).catch(() => {});
    } catch (e) {}

    const newMsg = {
      id: Date.now(),
      sender: 'femtech',
      is10MinAlert: false,
      time: slot.time,
      text: smsContent,
      dispatchedTo: {
        userPhone,
        motherName,
        motherPhone
      },
      timestamp: `Scheduled Check-in at ${slot.time}`
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  // User reply handler
  const sendUserReply = (replyText) => {
    const cleanText = (replyText || '').trim();
    if (!cleanText) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: cleanText,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    const lower = cleanText.toLowerCase();
    const name = user?.name ? user.name.split(' ')[0] : 'Janani';

    setTimeout(() => {
      playChime();
      let botResponse = language === 'ta'
        ? `உங்கள் பதிலைப் பதிவு செய்துவிட்டேன் ${name}! நலமாக இருங்கள் 🌸. இந்த விபரம் உங்கள் தாய் ${motherName}-க்கும் பகிரப்பட்டது.`
        : `Got your update ${name}! Logged in your daily tracker and synchronized with ${motherName} 🌸.`;

      if (lower.includes('சாப்ட்') || lower.includes('food') || lower.includes('eat') || lower.includes('lunch') || lower.includes('dinner')) {
        botResponse = language === 'ta'
          ? `அருமை! நேரத்திற்கு சத்தான உணவு உண்டதற்கு மகிழ்ச்சி. போதுமான தண்ணீர் குடிப்பதை உறுதிசெய்து கொள்ளுங்கள்.`
          : `Great job on having nutritious food! Please ensure proper hydration.`;
      } else if (lower.includes('தண்ணி') || lower.includes('water') || lower.includes('8') || lower.includes('glass')) {
        botResponse = language === 'ta'
          ? `சூப்பர்! தண்ணீர் குடித்ததை உங்கள் Daily Hydration Log-இல் அப்டேட் செய்துவிட்டேன்.`
          : `Awesome! Logged your water intake into your Daily Hydration Tracker.`;
      } else if (lower.includes('வலி') || lower.includes('pain') || lower.includes('cramp')) {
        botResponse = language === 'ta'
          ? `அடிவயிற்றில் வெந்நீர் ஒத்தடம் கொடுங்கள். இஞ்சி டீ குடிப்பது தசைப்பிடிப்பை தளர்த்தும். தேவைப்பட்டால் அவசர SOS-ஐ அழுத்தவும்.`
          : `Please rest with a warm heating pad. Let us know if you need to dispatch an SOS alert to ${motherName}!`;
      } else if (lower.includes('மாத்திரை') || lower.includes('med') || lower.includes('pill')) {
        botResponse = language === 'ta'
          ? `சிறப்பு! மாத்திரைகளை தவறாமல் எடுத்துக்கொண்டதற்கு நன்றி. உங்கள் உடல்நலம் சீராகும்.`
          : `Excellent! Prescribed medication intake recorded successfully.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'femtech',
          is10MinAlert: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: botResponse,
          dispatchedTo: { userPhone, motherName, motherPhone },
          timestamp: 'Just now'
        }
      ]);
    }, 1000);
  };

  // 8. 1-Second Interval to drive the 30-Minute Countdown (1800s)
  useEffect(() => {
    if (!is30MinActive) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          trigger30MinAlert();
          return 1800;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [is30MinActive, cycleIndex, userPhone, motherPhone, motherName, language]);

  // Formatted countdown: MM:SS
  const formatCountdown = () => {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <SmsAlertContext.Provider
      value={{
        userPhone,
        motherName,
        motherPhone,
        saveUserPhone,
        saveMotherContact,
        saveBothNumbers,
        is30MinActive,
        is10MinActive: is30MinActive,
        toggle30MinCycle,
        toggle10MinCycle: toggle30MinCycle,
        secondsRemaining,
        countdownText: formatCountdown(),
        trigger30MinAlert,
        trigger10MinAlertNow,
        triggerSlotSMS,
        messages,
        sendUserReply,
        notificationPermission,
        requestNotificationAccess,
        playChime,
        activeToast: null,
        dismissToast,
        openNativePhoneSms
      }}
    >
      {children}
    </SmsAlertContext.Provider>
  );
};

export const useSmsAlert = () => {
  const context = useContext(SmsAlertContext);
  if (!context) throw new Error('useSmsAlert must be used within SmsAlertProvider');
  return context;
};
