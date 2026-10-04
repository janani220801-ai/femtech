import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  Watch,
  Bluetooth,
  Heart,
  Activity,
  Flame,
  Moon,
  Zap,
  RefreshCw,
  CheckCircle2,
  Wind,
  Thermometer,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  Clock,
  Droplets,
  BatteryCharging,
  Wifi,
  Play,
  Pause
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export const WEARABLE_I18N = {
  "en": {
    "inhaleGently": "Inhale Gently (4s)",
    "holdAir": "Hold Air (7s)",
    "exhaleSlowly": "Exhale Slowly (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ Pelvic Floor De-Tensioning Protocol:",
    "pelvicTip1": "• Sit comfortably with a neutral spine. Gently release tension in your glutes, inner thighs, and lower abdomen.",
    "pelvicTip2": "• Allow your pelvic floor to drop softly with each diaphragmatic inhale, stimulating vagal nerve relaxation.",
    "suiteTitle": "Women’s Musculoskeletal Strength & Vitality Suite",
    "suiteDesc": "Interactive Kegel muscle trainer, cycle-synced resistance protocols & vitality metrics",
    "tabKegel": "🧘‍♀️ Kegel Strength",
    "tabCycle": "🔄 Cycle-Synced Training",
    "tabVitality": "⚡ Vitality Index",
    "squeeze": "Squeeze",
    "relax": "Relax",
    "completedReps": "Completed Reps",
    "startKegel": "Start Kegel Strength",
    "pauseWorkout": "Pause Workout",
    "oxfordTitle": "🛡️ Pelvic Floor Muscle Grade (Oxford Scale)",
    "oxfordGrade": "Grade 4 / 5 (Strong)",
    "oxfordDesc": "Good muscle tone with strong resistance. Supports pelvic organs, prevents stress incontinence, and enhances core stability.",
    "holdEndurance": "Hold Endurance",
    "targetHold": "Target: 5-10s hold",
    "elasticRecovery": "Elastic Recovery",
    "recoveryDesc": "Rapid neuromuscular reset",
    "clinicalGuidanceTitle": "Clinical Guidance:",
    "clinicalGuidanceDesc": "Never hold your breath or tense glutes. Maintain steady diaphragmatic breathing during the squeeze phase.",
    "phase1Title": "1. Follicular Phase (Days 6-13)",
    "phase1Sub": "High Anabolic Potential (High Estrogen)",
    "phase1Desc": "Estrogen spikes. Optimal phase for heavy resistance training, progressive overload squats, and muscle protein synthesis.",
    "phase2Title": "2. Ovulatory Peak (Days 14-16)",
    "phase2Sub": "Max Power Output (Caution: Ligaments)",
    "phase2Desc": "Highest physical force output. Estrogen peaks cause slight ligament laxity—focus on impeccable joint alignment.",
    "phase3Title": "3. Luteal Phase (Days 17-23)",
    "phase3Sub": "Endurance & Aerobic Strength",
    "phase3Desc": "Progesterone elevated. Higher metabolic burn. Best suited for moderate weights, higher rep volume, and steady aerobic stamina.",
    "phase4Title": "4. Menstrual Reset (Days 1-5)",
    "phase4Sub": "Active Recovery & Core Isometrics",
    "phase4Desc": "Low systemic hormones. Focus on bodyweight planks, pelvic bridges, mobility de-loading, and restorative yoga.",
    "vitalityIndexTitle": "Composite Vitality Index",
    "vitalityIndexStatus": "Peak Functional Stamina",
    "vitalityIndexReady": "✓ Ready for progressive overload",
    "coreStability": "Core & Spine Stability",
    "boneMineral": "Bone Mineral Loading Index",
    "mitoRecovery": "Mitochondrial Recovery Rate",
    "bleTelemetry": "BLE Telemetry",
    "switchToDemo": "Switch to Demo Mode",
    "switchToLive": "Switch to Live BLE Mode",
    "biphasicShift": "Biphasic Thermal Shift",
    "shiftConfirmed": "Shift Confirmed",
    "skinBbt": "Skin BBT",
    "stepsLabel": "Steps",
    "hoursMet": "Hours Met",
    "activeStreakHint": "Current Hour: 196 steps logged • Just 54 steps to keep your active streak!",
    "glassesLogged": "glasses logged",
    "pausePacer": "Pause Pacer",
    "startBreathing": "Start 4-7-8 Breathing"
  },
  "ta": {
    "inhaleGently": "மூச்சை உள்ளிழுக்கவும் (Inhale - 4s)",
    "holdAir": "மூச்சை அடக்கவும் (Hold - 7s)",
    "exhaleSlowly": "மெதுவாக வெளியிடவும் (Exhale - 8s)",
    "pelvicProtocolTitle": "🧘‍♀️ இடுப்பு தசை தளர்வு மற்றும் வலி குறைப்பு வழிமுறைகள்:",
    "pelvicTip1": "• முதுகை நேராக வைத்து அமர்ந்து, தொடை மற்றும் அடிவயிற்று தசைகளை மென்மையாக தளர்த்தவும்.",
    "pelvicTip2": "• ஒவ்வொரு மூச்சு உள்ளிழுப்பிலும் அடிவயிறு இயற்கையாக விரிவடைய அனுமதிக்கவும்.",
    "suiteTitle": "பெண்கள் உடல் வலிமை & ஸ்டாமினா மையம் (Strength & Vitality Suite)",
    "suiteDesc": "இடுப்பு தசை சுருக்க பயிற்சி, சுழற்சி சார்ந்த உடற்பயிற்சி & எலும்பு பலம்",
    "tabKegel": "🧘‍♀️ கீகல் இடுப்பு வலிமை",
    "tabCycle": "🔄 சுழற்சி சார்ந்த பயிற்சி",
    "tabVitality": "⚡ உடற்பலன் குறியீடு",
    "squeeze": "இறுக்கவும்",
    "relax": "தளர்த்தவும்",
    "completedReps": "பயிற்சி சுற்றுகள் (Reps)",
    "startKegel": "கீகல் பயிற்சியைத் தொடங்கு",
    "pauseWorkout": "பயிற்சியை இடைநிறுத்து",
    "oxfordTitle": "🛡️ ஆக்ஸ்போர்டு தசை வலிமை நிலை (Oxford Scale)",
    "oxfordGrade": "Grade 4 / 5 (வலுவானது)",
    "oxfordDesc": "இடுப்புத் தள தசைகள் சீரான இறுக்கம் மற்றும் நல்ல நெகிழ்வுத்தன்மையுடன் உள்ளன. பிரசவத்திற்குப் பிந்தைய மீட்சி மற்றும் கருப்பை ஆரோக்கியத்திற்கு மிகச் சிறந்தது.",
    "holdEndurance": "சுருக்க தாங்கும் சக்தி",
    "targetHold": "சராசரி இலக்கு: 5 முதல் 10 விநாடி",
    "elasticRecovery": "தசை மீட்பு வேகம்",
    "recoveryDesc": "வேகமான தளர்வு & இயல்புநிலை",
    "clinicalGuidanceTitle": "மருத்துவ குறிப்பு:",
    "clinicalGuidanceDesc": "கீகல் பயிற்சியின் போது வயிற்றுப்பகுதியையோ அல்லது மூச்சையோ அடக்காமல், மூச்சை சீராக விட்டபடி இடுப்பு தசைகளை மட்டும் உள்ளே இழுக்கவும்.",
    "phase1Title": "1. ஆரம்ப சுழற்சி (Follicular Phase - 6-13 நாட்கள்)",
    "phase1Sub": "உச்சக்கட்ட வலிமை & தசை வளர்ச்சி (Peak Strength)",
    "phase1Desc": "ஈஸ்ட்ரோஜன் அதிகரிக்கும் காலம். பளுதூக்குதல், ஸ்குவாட்ஸ், டெட்லிஃப்ட்ஸ் மற்றும் அதிக எடையுடன் செய்யும் பயிற்சிகளுக்கு உகந்த நேரம்.",
    "phase2Title": "2. கருமுட்டை வெளிப்பாடு (Ovulation Phase - 14-16 நாட்கள்)",
    "phase2Sub": "அதிக சக்தி & தசைநார் பாதுகாப்பு",
    "phase2Desc": "உடலில் அதிக சக்தி இருக்கும். ஆனால் தசைநார்களில் லேசான நெகிழ்வுத்தன்மை (Relaxin) ஏற்படும் என்பதால் முழங்கால் மூட்டுகளை கவனமாக வைக்கவும்.",
    "phase3Title": "3. பின் சுழற்சி (Luteal Phase - 17-23 நாட்கள்)",
    "phase3Sub": "மிதமான எடை & சகிப்புத்தன்மை",
    "phase3Desc": "புரோஜெஸ்டிரோன் அதிகம் உள்ள நிலை. உடல் வெப்பநிலை சற்று கூடும். மிதமான பளுவுடன் கூடிய சகிப்புத்தன்மை பயிற்சிகள் மற்றும் நீச்சல் நல்லது.",
    "phase4Title": "4. மாதவிடாய் காலம் (Menstrual Phase - 1-5 நாட்கள்)",
    "phase4Sub": "மையப்பகுதி பலம் & தளர்வு உடற்பயிற்சி",
    "phase4Desc": "ஹார்மோன்கள் குறைவாக இருக்கும். உடல் எடையை மட்டுமே பயன்படுத்தும் பிளாங்க், இடுப்பு பிரிட்ஜ் மற்றும் யோகா பயிற்சிகளுக்கு முன்னுரிமை அளிக்கவும்.",
    "vitalityIndexTitle": "ஒட்டுமொத்த உடற்பலன் குறியீடு",
    "vitalityIndexStatus": "சிறந்த தசை & ஸ்டாமினா நிலை",
    "vitalityIndexReady": "✓ நாளைய தீவிர உடற்பயிற்சிக்கு உடல் தயார்",
    "coreStability": "முதுகுத்தண்டு & மையப்பகுதி நிலைத்தன்மை",
    "boneMineral": "எலும்பு தாது அடர்த்தி பாதுகாப்பு",
    "mitoRecovery": "செல்லுலார் தசை மீட்பு விகிதம்",
    "bleTelemetry": "புளூடூத் விவரங்கள்",
    "switchToDemo": "டெமோ முறைக்கு மாற்று",
    "switchToLive": "நேரலை புளூடூத் மாற்று",
    "biphasicShift": "அண்டவிடுப்பு & வெப்பநிலை நிலை",
    "shiftConfirmed": "உயர்வு உறுதி",
    "skinBbt": "தோல் வெப்பநிலை",
    "stepsLabel": "நடைகள்",
    "hoursMet": "மணிநேரம் நிறைவு",
    "activeStreakHint": "தற்போதைய மணிநேரம்: 196 நடைகள் • இன்னும் 54 நடைகளில் இந்த மணிநேர இலக்கு எட்டப்படும்!",
    "glassesLogged": "டம்ளர்கள் பதிவானது",
    "pausePacer": "நிறுத்து",
    "startBreathing": "பயிற்சியைத் தொடங்கு"
  },
  "hi": {
    "inhaleGently": "धीरे से सांस अंदर लें (4s)",
    "holdAir": "सांस रोककर रखें (7s)",
    "exhaleSlowly": "धीरे से सांस छोड़ें (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ पेल्विक फ्लोर मांसपेशी विश्राम प्रोटोकॉल:",
    "pelvicTip1": "• रीढ़ सीधी रखकर आराम से बैठें। नितंबों, जांघों और निचले पेट की मांसपेशियों को ढीला छोड़ें।",
    "pelvicTip2": "• प्रत्येक गहरी सांस के साथ पेल्विक हिस्से को आराम से ढीला होने दें, जिससे नसों को शांति मिले।",
    "suiteTitle": "महिला मस्कुलोस्केलेटल शक्ति एवं जीवनशक्ति केंद्र",
    "suiteDesc": "इंटरैक्टिव कीगल व्यायाम, चक्र-अनुकूलित शक्ति प्रशिक्षण व जीवनशक्ति मेट्रिक्स",
    "tabKegel": "🧘‍♀️ कीगल शक्ति",
    "tabCycle": "🔄 चक्र-आधारित प्रशिक्षण",
    "tabVitality": "⚡ जीवनशक्ति सूचकांक",
    "squeeze": "संकुचित करें (Squeeze)",
    "relax": "ढीला छोड़ें (Relax)",
    "completedReps": "पूर्ण किए गए दोहराव (Reps)",
    "startKegel": "कीगल कसरत शुरू करें",
    "pauseWorkout": "कसरत रोकें",
    "oxfordTitle": "🛡️ पेल्विक मांसपेशी शक्ति स्तर (ऑक्सफोर्ड स्केल)",
    "oxfordGrade": "ग्रेड 4 / 5 (मजबूत)",
    "oxfordDesc": "मांसपेशियों का लचीलापन व खिंचाव उत्कृष्ट है। यह गर्भाशय के अंगों को सहारा देता है और कोर स्थिरता बढ़ाता है।",
    "holdEndurance": "रोकने की सहनशक्ति",
    "targetHold": "लक्ष्य: 5-10 सेकंड होल्ड",
    "elasticRecovery": "पुनर्प्राप्ति गति",
    "recoveryDesc": "त्वरित तंत्रिका-मांसपेशी रीसेट",
    "clinicalGuidanceTitle": "चिकित्सीय सलाह:",
    "clinicalGuidanceDesc": "कीगल व्यायाम करते समय सांस न रोकें और नितंबों को न भींचें। सामान्य सांस लेते हुए केवल पेल्विक मांसपेशियों को ऊपर उठाएं।",
    "phase1Title": "1. फॉलिक्युलर चरण (दिन 6-13)",
    "phase1Sub": "उच्च शक्ति व मांसपेशी निर्माण (एस्ट्रोजन पीक)",
    "phase1Desc": "एस्ट्रोजन बढ़ने का समय। स्क्वैट्स, डेडलिफ्ट्स और वजन प्रशिक्षण के लिए सबसे अनुकूल समय।",
    "phase2Title": "2. ओव्यूलेशन चरण (दिन 14-16)",
    "phase2Sub": "अधिकतम शारीरिक ऊर्जा (जोड़ों की सुरक्षा आवश्यक)",
    "phase2Desc": "शरीर में सबसे अधिक बल होता है। जोड़ों पर अतिरिक्त दबाव से बचें और संतुलन बनाए रखें।",
    "phase3Title": "3. ल्यूटियल चरण (दिन 17-23)",
    "phase3Sub": "सहनशक्ति व एरोबिक व्यायाम",
    "phase3Desc": "प्रोजेस्टेरोन का स्तर अधिक होता है। मध्यम वजन, तैराकी और निरंतर एरोबिक स्टैमिना के लिए उत्तम।",
    "phase4Title": "4. मासिक धर्म चरण (दिन 1-5)",
    "phase4Sub": "हल्का खिंचाव व कोर विश्राम",
    "phase4Desc": "हार्मोन स्तर न्यूनतम होता है। केवल शरीर के वजन से प्लैंक, पेल्विक ब्रिज और योग को प्राथमिकता दें।",
    "vitalityIndexTitle": "कुल जीवनशक्ति सूचकांक",
    "vitalityIndexStatus": "शीर्ष शारीरिक सहनशक्ति",
    "vitalityIndexReady": "✓ कल के शक्ति प्रशिक्षण के लिए तैयार",
    "coreStability": "रीढ़ व कोर स्थिरता",
    "boneMineral": "अस्थि खनिज घनत्व सूचकांक",
    "mitoRecovery": "मांसपेशी कोशिकीय पुनर्प्राप्ति दर",
    "bleTelemetry": "BLE टेलीमेट्री",
    "switchToDemo": "डेमो मोड पर जाएं",
    "switchToLive": "लाइव ब्लूटूथ मोड पर जाएं",
    "biphasicShift": "द्वि-चरणीय तापमान परिवर्तन",
    "shiftConfirmed": "परिवर्तन की पुष्टि",
    "skinBbt": "त्वचा तापमान (BBT)",
    "stepsLabel": "कदम",
    "hoursMet": "घंटे पूर्ण",
    "activeStreakHint": "वर्तमान घंटा: 196 कदम दर्ज • सक्रिय स्ट्रीक बनाए रखने के लिए केवल 54 कदम शेष!",
    "glassesLogged": "ग्लास दर्ज किए गए",
    "pausePacer": "रोकें",
    "startBreathing": "4-7-8 श्वास व्यायाम शुरू करें"
  },
  "te": {
    "inhaleGently": "నెమ్మదిగా శ్వాస తీసుకోండి (4s)",
    "holdAir": "శ్వాసను బిగబట్టండి (7s)",
    "exhaleSlowly": "నెమ్మదిగా శ్వాస వదలండి (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ పెల్విక్ ఫ్లోర్ కండరాల సడలింపు నియమావళి:",
    "pelvicTip1": "• వెన్నెముకను నిటారుగా ఉంచి కూర్చోండి. తొడలు మరియు పొత్తికడుపు కండరాలను వదులుగా ఉంచండి.",
    "pelvicTip2": "• ప్రతి శ్వాసతో కటి భాగాన్ని సున్నితంగా సడలించనివ్వండి.",
    "suiteTitle": "మహిళల మస్క్యులోస్కెలిటల్ బలం & జీవశక్తి సూట్",
    "suiteDesc": "ఇంటరాక్టివ్ కీగెల్ కండరాల వ్యాయామం, రుతుచక్ర ఆధారిత శిక్షణ & శారీరక శక్తి సూచికలు",
    "tabKegel": "🧘‍♀️ కీగెల్ బలం",
    "tabCycle": "🔄 చక్ర ఆధారిత శిక్షణ",
    "tabVitality": "⚡ జీవశక్తి సూచిక",
    "squeeze": "బిగించండి (Squeeze)",
    "relax": "వదలండి (Relax)",
    "completedReps": "పూర్తయిన రౌండ్లు (Reps)",
    "startKegel": "కీగెల్ వ్యాయామం ప్రారంభించండి",
    "pauseWorkout": "వ్యాయామం ఆపండి",
    "oxfordTitle": "🛡️ ఆక్స్‌ఫర్డ్ కండరాల బలం స్థాయి",
    "oxfordGrade": "గ్రేడ్ 4 / 5 (బలమైనది)",
    "oxfordDesc": "పెల్విక్ ఫ్లోర్ కండరాలు దృఢంగా ఉన్నాయి. గర్భాశయ ఆరోగ్యానికి మరియు వెన్నెముక స్థిరత్వానికి చాలా మంచిది.",
    "holdEndurance": "నిలిపి ఉంచే శక్తి",
    "targetHold": "లక్ష్యం: 5-10 సెకన్లు",
    "elasticRecovery": "పునరుద్ధరణ వేగం",
    "recoveryDesc": "వేగవంతమైన కండరాల రీసెట్",
    "clinicalGuidanceTitle": "వైద్య సలహా:",
    "clinicalGuidanceDesc": "కీగెల్ వ్యాయామం చేసేటప్పుడు శ్వాసను ఆపకండి. సాధారణ శ్వాస తీసుకుంటూ కేవలం కటి కండరాలను మాత్రమే లోపలికి లాగండి.",
    "phase1Title": "1. ఫాలిక్యులర్ దశ (రోజులు 6-13)",
    "phase1Sub": "గరిష్ట బలం & కండరాల నిర్మాణం",
    "phase1Desc": "ఈస్ట్రోజెన్ పెరిగే సమయం. వెయిట్ ట్రైనింగ్, స్క్వాట్స్ చేయడానికి ఉత్తమమైన సమయం.",
    "phase2Title": "2. అండోత్సర్గము దశ (రోజులు 14-16)",
    "phase2Sub": "అధిక శక్తి (కీళ్ల భద్రత అవసరం)",
    "phase2Desc": "శరీరంలో అత్యధిక బలం ఉంటుంది. మోకాళ్ల కీళ్ల అమరికపై జాగ్రత్త వహించండి.",
    "phase3Title": "3. లూటియల్ దశ (రోజులు 17-23)",
    "phase3Sub": "సహనశక్తి & ఏరోబిక్ వ్యాయామాలు",
    "phase3Desc": "ప్రొజెస్టెరాన్ ఎక్కువగా ఉంటుంది. ఈత, మితమైన బరువులతో వ్యాయామం చేయడం మంచిది.",
    "phase4Title": "4. పీరియడ్స్ దశ (రోజులు 1-5)",
    "phase4Sub": "తేలికపాటి యోగా & రికవరీ",
    "phase4Desc": "హార్మోన్ల స్థాయి తక్కువగా ఉంటుంది. శరీర బరువుతో చేసే ప్లాంక్స్ మరియు విశ్రాంతికి ప్రాధాన్యత ఇవ్వండి.",
    "vitalityIndexTitle": "మొత్తం జీవశక్తి సూచిక",
    "vitalityIndexStatus": "అద్భుతమైన స్టామినా",
    "vitalityIndexReady": "✓ తదుపరి వ్యాయామానికి శరీరం సిద్ధం",
    "coreStability": "వెన్నెముక & కోర్ స్థిరత్వం",
    "boneMineral": "ఎముక ఖనిజ సాంద్రత రక్షణ",
    "mitoRecovery": "కండరాల సెల్యులార్ రికవరీ రేటు",
    "bleTelemetry": "BLE టెలిమెట్రీ",
    "switchToDemo": "డెమో మోడ్‌కు మారండి",
    "switchToLive": "లైవ్ బ్లూటూత్ మోడ్‌కు మారండి",
    "biphasicShift": "బైఫాసిక్ ఉష్ణోగ్రత మార్పు",
    "shiftConfirmed": "మార్పు నిర్ధారించబడింది",
    "skinBbt": "చర్మ ఉష్ణోగ్రత (BBT)",
    "stepsLabel": "అడుగులు",
    "hoursMet": "గంటలు పూర్తయ్యాయి",
    "activeStreakHint": "ప్రస్తుత గంట: 196 అడుగులు • మీ యాక్టివ్ స్ట్రీక్‌ను కొనసాగించడానికి కేవలం 54 అడుగులు!",
    "glassesLogged": "గ్లాసులు నమోదు చేయబడ్డాయి",
    "pausePacer": "ఆపండి",
    "startBreathing": "4-7-8 శ్వాస వ్యాయామం ప్రారంభించండి"
  },
  "ml": {
    "inhaleGently": "ശ്വാസമെടുക്കുക (4s)",
    "holdAir": "ശ്വാസം പിടിച്ചുവെക്കുക (7s)",
    "exhaleSlowly": "ശ്വാസം പുറത്തുവിടുക (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ പെൽവിക് പേശി വിശ്രമ നിർദ്ദേശങ്ങൾ:",
    "pelvicTip1": "• നട്ടെല്ല് നിവർത്തി ശാന്തമായി ഇരിക്കുക. അടിവയറ്റിലെ പേശികൾ അയച്ചുവിടുക.",
    "pelvicTip2": "• ഓരോ ശ്വാസത്തിലും ഇടുപ്പ് ഭാഗം അയഞ്ഞുപോകാൻ അനുവദിക്കുക.",
    "suiteTitle": "വനിതാ മസ്കുലോസ്കെലിറ്റൽ ശക്തിയും ജീവശക്തിയും",
    "suiteDesc": "ഇന്ററാക്ടീവ് കീഗൽ വ്യായാമം, ആർത്തവചക്ര അധിഷ്ഠിത ട്രെയിനിംഗ് & മെട്രിക്സ്",
    "tabKegel": "🧘‍♀️ കീഗൽ ശക്തി",
    "tabCycle": "🔄 ചക്ര അനുയോജ്യ വ്യായാമം",
    "tabVitality": "⚡ വൈറ്റാലിറ്റി സൂചിക",
    "squeeze": "മുറുക്കുക (Squeeze)",
    "relax": "അയക്കുക (Relax)",
    "completedReps": "പൂർത്തിയായവ (Reps)",
    "startKegel": "കീഗൽ വ്യായാമം തുടങ്ങുക",
    "pauseWorkout": "നിർത്തുക",
    "oxfordTitle": "🛡️ പെൽവിക് പേശി ഗ്രേഡ് (ഓക്സ്ഫോർഡ് സ്കെയിൽ)",
    "oxfordGrade": "ഗ്രേഡ് 4 / 5 (ശക്തം)",
    "oxfordDesc": "പേശികൾ നല്ല ആരോഗ്യത്തിലും കരുത്തിലുമാണ്. ഗർഭാശയ ആരോഗ്യത്തിനും നട്ടെല്ലിന്റെ ബലത്തിനും ഉത്തമം.",
    "holdEndurance": "ഹോൾഡ് എൻഡ്യൂറൻസ്",
    "targetHold": "ലക്ഷ്യം: 5-10 സെക്കൻഡ്",
    "elasticRecovery": "പേശി വീണ്ടെടുക്കൽ",
    "recoveryDesc": "വേഗത്തിലുള്ള റീസെറ്റ്",
    "clinicalGuidanceTitle": "ഡോക്ടറുടെ നിർദ്ദേശം:",
    "clinicalGuidanceDesc": "വ്യായാമം ചെയ്യുമ്പോൾ ശ്വാസം അടക്കിപ്പിടിക്കരുത്. സാധാരണ രീതിയിൽ ശ്വസിച്ചുകൊണ്ട് പേശികൾ മാത്രം മുറുക്കുക.",
    "phase1Title": "1. ഫോളികുലാർ ഘട്ടം (6-13 ദിവസങ്ങൾ)",
    "phase1Sub": "ഉയർന്ന പേശി കരുത്ത് (ഈസ്ട്രജൻ പീക്ക്)",
    "phase1Desc": "ശരീരഭാരം ഉപയോഗിച്ചുള്ള വ്യായാമങ്ങൾക്കും വെയ്റ്റ് ലിഫ്റ്റിംഗിനും ഏറ്റവും അനുയോജ്യമായ ഘട്ടം.",
    "phase2Title": "2. ഓവുലേഷൻ ഘട്ടം (14-16 ദിവസങ്ങൾ)",
    "phase2Sub": "പരമാവധി ഊർജ്ജം (സന്ധികൾ ശ്രദ്ധിക്കുക)",
    "phase2Desc": "ശരീരത്തിൽ ഉയർന്ന ഊർജ്ജം ഉണ്ടാകും. സന്ധികൾക്ക് അധിക സമ്മർദ്ദം നൽകാതെ ശ്രദ്ധിക്കുക.",
    "phase3Title": "3. ലൂട്ടിയൽ ഘട്ടം (17-23 ദിവസങ്ങൾ)",
    "phase3Sub": "എൻഡ്യൂറൻസ് & നടത്തം",
    "phase3Desc": "മിതമായ വ്യായാമങ്ങൾക്കും നീന്തലിനും നടത്തത്തിനും ഏറ്റവും നല്ല സമയം.",
    "phase4Title": "4. ആർത്തവ ഘട്ടം (1-5 ദിവസങ്ങൾ)",
    "phase4Sub": "ലളിതമായ യോഗ & വിശ്രമം",
    "phase4Desc": "ഹോർമോൺ അളവ് കുറവായിരിക്കും. പ്ലാങ്കുകളും ലളിതമായ യോഗാസനങ്ങളും മാത്രം ചെയ്യുക.",
    "vitalityIndexTitle": "വൈറ്റാലിറ്റി സൂചിക",
    "vitalityIndexStatus": "ഉയർന്ന ശാരീരികക്ഷമത",
    "vitalityIndexReady": "✓ വ്യായാമത്തിന് ശരീരം സജ്ജമാണ്",
    "coreStability": "നട്ടെല്ല് & കോർ സ്ഥിരത",
    "boneMineral": "അസ്ഥി സാന്ദ്രത സൂചിക",
    "mitoRecovery": "പേശി റിക്കവറി റേറ്റ്",
    "bleTelemetry": "BLE ടെലിമെട്രി",
    "switchToDemo": "ഡെമോ മോഡിലേക്ക് മാറ്റുക",
    "switchToLive": "തത്സമയ ബ്ലൂടൂത്ത് മോഡിലേക്ക് മാറ്റുക",
    "biphasicShift": "ബൈഫേസിക് താപനില മാറ്റം",
    "shiftConfirmed": "മാറ്റം സ്ഥിരീകരിച്ചു",
    "skinBbt": "ചർമ്മ താപനില",
    "stepsLabel": "സ്റ്റെപ്പുകൾ",
    "hoursMet": "മണിക്കൂറുകൾ പൂർത്തിയായി",
    "activeStreakHint": "നിലവിലെ മണിക്കൂർ: 196 സ്റ്റെപ്പുകൾ • സജീവ സ്ട്രീക്ക് നിലനിർത്താൻ 54 സ്റ്റെപ്പുകൾ കൂടി!",
    "glassesLogged": "ഗ്ലാസുകൾ രേഖപ്പെടുത്തി",
    "pausePacer": "നിർത്തുക",
    "startBreathing": "4-7-8 ശ്വസന വ്യായാമം തുടങ്ങുക"
  },
  "mr": {
    "inhaleGently": "हळुवार श्वास घ्या (4s)",
    "holdAir": "श्वास रोखून धरा (7s)",
    "exhaleSlowly": "हळूच श्वास सोडा (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ पेल्विक स्नायू विश्रांती नियम:",
    "pelvicTip1": "• पाठीचा कणा सरळ ठेवून बसा. मांड्या आणि ओटीपोटाचे स्नायू सैल सोडा.",
    "pelvicTip2": "• प्रत्येक श्वासासोबत पेल्विक भाग सैल होऊ द्या.",
    "suiteTitle": "महिला मस्कुलोस्केलेटल ताकद व ऊर्जा केंद्र",
    "suiteDesc": "इंटरॅक्टिव्ह कीगल व्यायाम, मासिक पाळी चक्रानुसार ताकद प्रशिक्षण व फिटनेस मेट्रिक्स",
    "tabKegel": "🧘‍♀️ कीगल ताकद",
    "tabCycle": "🔄 चक्रानुसार प्रशिक्षण",
    "tabVitality": "⚡ जीवनशक्ती निर्देशांक",
    "squeeze": "आकुंचन करा (Squeeze)",
    "relax": "सैल सोडा (Relax)",
    "completedReps": "पूर्ण झालेले फेरे (Reps)",
    "startKegel": "कीगल व्यायाम सुरू करा",
    "pauseWorkout": "थांबवा",
    "oxfordTitle": "🛡️ पेल्विक स्नायू क्षमता (ऑक्सफर्ड स्केल)",
    "oxfordGrade": "ग्रेड 4 / 5 (मजबूत)",
    "oxfordDesc": "पेल्विक स्नायू उत्तम स्थितीत आहेत. हे गर्भाशयाच्या आरोग्यासाठी आणि पाठीच्या मजबुतीसाठी उत्तम आहे.",
    "holdEndurance": "सहनशक्ती",
    "targetHold": "ध्येय: ५-१० सेकंद",
    "elasticRecovery": "पुनर्प्राप्ती गती",
    "recoveryDesc": "जलद स्नायू रीसेट",
    "clinicalGuidanceTitle": "वैद्यकीय सल्ला:",
    "clinicalGuidanceDesc": "कीगल व्यायाम करताना श्वास रोखू नका. सामान्य श्वास घेत केवळ पेल्विक स्नायू आकुंचन पावावेत.",
    "phase1Title": "1. फॉलिक्युलर टप्पा (दिवस 6-13)",
    "phase1Sub": "उच्च ताकद व स्नायू विकास",
    "phase1Desc": "इस्ट्रोजेन वाढण्याचा काळ. वजन उचलणे, स्क्वॅट्स आणि ताकदीच्या व्यायामासाठी उत्तम वेळ.",
    "phase2Title": "2. ओव्हुलेशन टप्पा (दिवस 14-16)",
    "phase2Sub": "कमाल शारीरिक ऊर्जा",
    "phase2Desc": "शरीरात खूप ऊर्जा असते. सांध्यांची योग्य काळजी घेऊन व्यायाम करा.",
    "phase3Title": "3. ल्युटियल टप्पा (दिवस 17-23)",
    "phase3Sub": "सहनशक्ती व एरोबिक व्यायाम",
    "phase3Desc": "प्रोजेस्टेरॉन पातळी जास्त असते. पोहणे आणि मध्यम व्यायामासाठी उत्तम काळ.",
    "phase4Title": "4. मासिक पाळी टप्पा (दिवस 1-5)",
    "phase4Sub": "हलके योगासने व विश्रांती",
    "phase4Desc": "हार्मोन पातळी कमी असते. केवळ शरीराच्या वजनाने प्लँक आणि योगासने करा.",
    "vitalityIndexTitle": "एकूण जीवनशक्ती निर्देशांक",
    "vitalityIndexStatus": "उत्कृष्ट शारीरिक स्टॅमिना",
    "vitalityIndexReady": "✓ पुढील व्यायामासाठी शरीर सज्ज",
    "coreStability": "पाठीचा कणा व कोर स्थिरता",
    "boneMineral": "हाडांची घनता निर्देशांक",
    "mitoRecovery": "स्नायू पुनर्प्राप्ती दर",
    "bleTelemetry": "BLE टेलिमेट्री",
    "switchToDemo": "डेमो मोडवर जा",
    "switchToLive": "थेट ब्लूटूथ मोडवर जा",
    "biphasicShift": "बायफेसिक तापमान बदल",
    "shiftConfirmed": "बदल पुष्टी केली",
    "skinBbt": "त्वचा तापमान",
    "stepsLabel": "पावले",
    "hoursMet": "तास पूर्ण झाले",
    "activeStreakHint": "चालू तास: १९६ पावले नोंदवली • स्ट्रीक चालू ठेवण्यासाठी फक्त ५४ पावले शिल्लक!",
    "glassesLogged": "ग्लास नोंदवले",
    "pausePacer": "थांबवा",
    "startBreathing": "४-७-८ श्वसन व्यायाम सुरू करा"
  },
  "mwr": {
    "inhaleGently": "धीरे सूँ सांस खींचो (4s)",
    "holdAir": "सांस रोक’र राखो (7s)",
    "exhaleSlowly": "धीरे सूँ सांस छोड़ो (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ पेल्विक मांसपेशियां ने ढीली करण रो तरीको:",
    "pelvicTip1": "• रीढ़ री हड्डी सीधी राख’र बैठो। जांघ अर पेट री नस ने ढीली छोड़ो।",
    "pelvicTip2": "• हर सांस सागै पेल्विक भाग ने आराम देवो।",
    "suiteTitle": "महिला मस्कुलोस्केलेटल शक्ति अर फुर्ती केंद्र",
    "suiteDesc": "कीगल कसरत, म्हीने रे हिसाब सूँ ताकत अर फिटनेस री जाँच",
    "tabKegel": "🧘‍♀️ कीगल ताकत",
    "tabCycle": "🔄 चक्र अनुसार कसरत",
    "tabVitality": "⚡ फुर्ती सूचकांक",
    "squeeze": "भींचो (Squeeze)",
    "relax": "ढीलो छोड़ो (Relax)",
    "completedReps": "पूरा चक्र (Reps)",
    "startKegel": "कीगल कसरत चालू करो",
    "pauseWorkout": "रोको",
    "oxfordTitle": "🛡️ मांसपेशी ताकत स्तर (ऑक्सफोर्ड)",
    "oxfordGrade": "ग्रेड 4 / 5 (मजबूत)",
    "oxfordDesc": "मांसपेशियां में घणी चोखी मजबूती है। पेट अर बच्चेदानी खातर घणी चोखी।",
    "holdEndurance": "रोकण री क्षमता",
    "targetHold": "लक्ष्य: ५-१० सेकंड",
    "elasticRecovery": "तैयारी री गति",
    "recoveryDesc": "नस रो पाछो ठीक होबो",
    "clinicalGuidanceTitle": "डॉक्टर सा’ब री सलाह:",
    "clinicalGuidanceDesc": "कीगल कसरत में सांस मत रोको, साधारण सांस लेवता पेल्विक भाग ने ऊपर खींचो।",
    "phase1Title": "1. फोलिक्युलर दौर (दिन 6-13)",
    "phase1Sub": "बडी ताकत अर फुर्ती",
    "phase1Desc": "एस्ट्रोजन बढ़बा रो टेम। वजन उठावण अर दंड-बैठक खातर चोखो टेम।",
    "phase2Title": "2. ओव्यूलेशन दौर (दिन 14-16)",
    "phase2Sub": "घणी शारीरिक ताकत",
    "phase2Desc": "शरीर में खूब ताकत रहवे। जोड़ां (Joints) रो ध्यान राखो।",
    "phase3Title": "3. ल्यूटियल दौर (दिन 17-23)",
    "phase3Sub": "सहनशक्ति अर चालबो",
    "phase3Desc": "हल्की कसरत अर रोज चालबा खातर चोखो टेम।",
    "phase4Title": "4. म्हैने रो दौर (दिन 1-5)",
    "phase4Sub": "आराम अर हल्का आसन",
    "phase4Desc": "हार्मोन कम रहवे। भारी कसरत मत करो, आराम अर योगा करो।",
    "vitalityIndexTitle": "कुल फुर्ती रो स्कोर",
    "vitalityIndexStatus": "घणी चोखी फुर्ती",
    "vitalityIndexReady": "✓ कसरत खातर शरीर तैयार है",
    "coreStability": "रीढ़ री हड्डी री मजबूती",
    "boneMineral": "हाडकां री मजबूती सूचकांक",
    "mitoRecovery": "मांसपेशी सुधार दर",
    "bleTelemetry": "BLE टेलीमेट्री",
    "switchToDemo": "डेमो मोड पे जाओ",
    "switchToLive": "लाइव ब्लूटूथ मोड पे जाओ",
    "biphasicShift": "तापमान रो बदलाव",
    "shiftConfirmed": "बदलाव री पुष्टि",
    "skinBbt": "चमड़ी रो तापमान",
    "stepsLabel": "कदम",
    "hoursMet": "घंटा पूरा",
    "activeStreakHint": "ईं घंटा: 196 कदम • स्ट्रीक चालू राखण सारू 54 कदम अर चालो सा!",
    "glassesLogged": "गिलास दर्ज",
    "pausePacer": "रोको सा",
    "startBreathing": "4-7-8 श्वास कसरत चालू करो"
  },
  "fr": {
    "inhaleGently": "Inspirez doucement (4s)",
    "holdAir": "Bloquez l’air (7s)",
    "exhaleSlowly": "Expirez lentement (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ Protocole de relâchement pelvien :",
    "pelvicTip1": "• Asseyez-vous confortablement, colonne neutre. Détendez fessiers, cuisses et bas-ventre.",
    "pelvicTip2": "• Laissez le plancher pelvien descendre doucement à chaque inspiration diaphragmatique.",
    "suiteTitle": "Suite Force & Vitalité Musculosquelettique Féminine",
    "suiteDesc": "Entraîneur interactif de Kegel, protocoles de résistance synchronisés au cycle & métriques de vitalité",
    "tabKegel": "🧘‍♀️ Force Périnéale (Kegel)",
    "tabCycle": "🔄 Synchronisation au Cycle",
    "tabVitality": "⚡ Indice de Vitalité",
    "squeeze": "Contractez (Squeeze)",
    "relax": "Relâchez (Relax)",
    "completedReps": "Répétitions effectuées",
    "startKegel": "Démarrer l’entraînement Kegel",
    "pauseWorkout": "Mettre en pause",
    "oxfordTitle": "🛡️ Force Musculaire Pelvienne (Échelle d’Oxford)",
    "oxfordGrade": "Grade 4 / 5 (Robuste)",
    "oxfordDesc": "Excellent tonus musculaire avec bonne résistance. Soutient les organes pelviens et renforce la stabilité centrale.",
    "holdEndurance": "Endurance de contraction",
    "targetHold": "Objectif : 5-10s de maintien",
    "elasticRecovery": "Récupération élastique",
    "recoveryDesc": "Réinitialisation neuromusculaire rapide",
    "clinicalGuidanceTitle": "Conseil Clinique :",
    "clinicalGuidanceDesc": "Ne bloquez jamais votre respiration et ne serrez pas les fessiers. Respirez calmement pendant la contraction.",
    "phase1Title": "1. Phase Folliculaire (Jours 6-13)",
    "phase1Sub": "Haut Potentiel Anabolique (Pic d’Œstrogènes)",
    "phase1Desc": "Hausse des œstrogènes. Phase idéale pour la musculation lourde, les squats et la synthèse protéique.",
    "phase2Title": "2. Pic Ovulatoire (Jours 14-16)",
    "phase2Sub": "Force Maximale (Attention aux Ligaments)",
    "phase2Desc": "Puissance physique maximale. La laxité ligamentaire augmente, surveillez l’alignement articulaire.",
    "phase3Title": "3. Phase Lutéale (Jours 17-23)",
    "phase3Sub": "Endurance & Cardio Régulier",
    "phase3Desc": "Progestérone élevée. Dépense métabolique plus forte. Idéal pour poids modérés et natation.",
    "phase4Title": "4. Réinitialisation Menstruelle (Jours 1-5)",
    "phase4Sub": "Récupération Active & Gainage Isométrique",
    "phase4Desc": "Hormones au plus bas. Privilégiez les ponts pelviens, le yoga restauratif et la mobilité sans charge.",
    "vitalityIndexTitle": "Indice Composite de Vitalité",
    "vitalityIndexStatus": "Endurance Fonctionnelle Optimale",
    "vitalityIndexReady": "✓ Prête pour un entraînement progressif",
    "coreStability": "Stabilité Vertébrale & Core",
    "boneMineral": "Indice de Densité Minérale Osseuse",
    "mitoRecovery": "Taux de Récupération Mitochondriale",
    "bleTelemetry": "Télémétrie BLE",
    "switchToDemo": "Passer en mode Démo",
    "switchToLive": "Passer en mode BLE en direct",
    "biphasicShift": "Décalage thermique biphasique",
    "shiftConfirmed": "Décalage confirmé",
    "skinBbt": "BBT Cutanée",
    "stepsLabel": "Pas",
    "hoursMet": "Heures complétées",
    "activeStreakHint": "Heure actuelle : 196 pas • Plus que 54 pas pour maintenir votre série active !",
    "glassesLogged": "verres enregistrés",
    "pausePacer": "Mettre en pause",
    "startBreathing": "Démarrer la respiration 4-7-8"
  },
  "lb": {
    "inhaleGently": "شهيق على مهل (4s)",
    "holdAir": "احبسي النفس (7s)",
    "exhaleSlowly": "زفير ببطء (8s)",
    "pelvicProtocolTitle": "🧘‍♀️ نصائح لإرخاء عضلات الحوض وتخفيف التشنج:",
    "pelvicTip1": "• قعدي مرتاحة مع ظهر مستقيم، ورخي عضلات الأرداف والفخاد والبطن من تحت.",
    "pelvicTip2": "• مع كل نفس عميق، خلي منطقة الحوض ترتاح وتنزل بنعومة.",
    "suiteTitle": "مركز القوة العضلية والنشاط النسائي (Musculoskeletal)",
    "suiteDesc": "تمارين كيغل التفاعلية، تمارين متناسقة مع أيام الدورة ومؤشرات الحيوية",
    "tabKegel": "🧘‍♀️ تمارين كيغل",
    "tabCycle": "🔄 تمارين حسب الدورة",
    "tabVitality": "⚡ مؤشر الحيوية",
    "squeeze": "شدي (Squeeze)",
    "relax": "رخي (Relax)",
    "completedReps": "الجولات المخلصة (Reps)",
    "startKegel": "ابداي تمارين كيغل",
    "pauseWorkout": "وقفي التمارين",
    "oxfordTitle": "🛡️ مقياس قوة عضلات الحوض (Oxford Scale)",
    "oxfordGrade": "درجة 4 / 5 (قوية وممتازة)",
    "oxfordDesc": "قوة العضلات ممتازة ومقاومة، بتدعم أعضاء الحوض وبتحمي من السلس البولي وبتقوي عضلات البطن.",
    "holdEndurance": "قوة التحمل بالشد",
    "targetHold": "الهدف: ٥-١٠ ثواني",
    "elasticRecovery": "سرعة رجوع العضل",
    "recoveryDesc": "استرخاء عصبي سريع",
    "clinicalGuidanceTitle": "نصيحة طبية:",
    "clinicalGuidanceDesc": "ما تحبسي نفسك وأنتِ عم تعملي كيغل، تنفسي بطريقة طبيعية وشدي بس عضلات الحوض للداخل.",
    "phase1Title": "1. مرحلة ما بعد الدورة (الأيام 6-13)",
    "phase1Sub": "طاقة وقوة عضلية عالية (ارتفاع الإستروجين)",
    "phase1Desc": "الإستروجين عم يرتفع، هيدا أحسن وقت لتمارين القوة وحمل الأوزان والسكوات وبناء العضل.",
    "phase2Title": "2. وقت التبويض (الأيام 14-16)",
    "phase2Sub": "طاقة قصوى (انتبهي لمفاصلك)",
    "phase2Desc": "أعلى طاقة بدنية بالجسم، بس الأوتار بتكون لينة شوي، انتبهي لحركات الركب والمفاصل.",
    "phase3Title": "3. مرحلة ما قبل الدورة (الأيام 17-23)",
    "phase3Sub": "تمارين تحمل وسباحة",
    "phase3Desc": "البروجستيرون عالي والحرق بزيد، مناسب جداً للأوزان الخفيفة والمشي والسباحة.",
    "phase4Title": "4. أيام الدورة (الأيام 1-5)",
    "phase4Sub": "تمارين خفيفة ويوغا وراحة",
    "phase4Desc": "الهرمونات واطية، ركزي على تمارين التمدد، اليوغا المريحة وتخفيف الضغط ع الجسم.",
    "vitalityIndexTitle": "مؤشر الحيوية والطاقة العام",
    "vitalityIndexStatus": "نشاط عضلي ممتاز",
    "vitalityIndexReady": "✓ الجسم جاهز للتمارين الرياضية",
    "coreStability": "ثبات الظهر وعضلات الجذع",
    "boneMineral": "كثافة وصحة العظام",
    "mitoRecovery": "سرعة تعافي الخلايا العضلية",
    "bleTelemetry": "بيانات تتبع BLE",
    "switchToDemo": "التبديل إلى الوضع التجريبي",
    "switchToLive": "التبديل إلى وضع البلوتوث المباشر",
    "biphasicShift": "التحول الحراري ثنائي الطور",
    "shiftConfirmed": "تم تأكيد الارتفاع",
    "skinBbt": "حرارة الجلد القاعدية",
    "stepsLabel": "خطوة",
    "hoursMet": "ساعات مكتملة",
    "activeStreakHint": "الساعة الحالية: 196 خطوة • فقط 54 خطوة للحفاظ على نشاطك المتواصل!",
    "glassesLogged": "أكواب مسجلة",
    "pausePacer": "إيقاف مؤقت",
    "startBreathing": "بدء تمرين التنفس 4-7-8"
  },
  "ar": {
    "inhaleGently": "شهيق هادئ (4 ثوانٍ)",
    "holdAir": "حبس النفس (7 ثوانٍ)",
    "exhaleSlowly": "زفير بطيء (8 ثوانٍ)",
    "pelvicProtocolTitle": "🧘‍♀️ بروتوكول استرخاء عضلات الحوض وتخفيف الألم:",
    "pelvicTip1": "• اجلسي براحة مع استقامة العمود الفقري. أرخي عضلات الأرداف والفخذين وأسفل البطن.",
    "pelvicTip2": "• اسمحي لقاع الحوض بالارتخاء بلطف مع كل شهيق بطني عميق لتهدئة الأعصاب.",
    "suiteTitle": "مركز القوة العضلية الهيكلية والحيوية النسائية",
    "suiteDesc": "مدرب كيغل التفاعلي، بروتوكولات تمارين متزامنة مع الدورة ومؤشرات النشاط",
    "tabKegel": "🧘‍♀️ قوة كيغل",
    "tabCycle": "🔄 تمارين متوافقة مع الدورة",
    "tabVitality": "⚡ مؤشر الحيوية",
    "squeeze": "انقباض (Squeeze)",
    "relax": "استرخاء (Relax)",
    "completedReps": "التكرارات المكتملة (Reps)",
    "startKegel": "بدء تمارين كيغل",
    "pauseWorkout": "إيقاف مؤقت",
    "oxfordTitle": "🛡️ مقياس قوة عضلات الحوض (Oxford Scale)",
    "oxfordGrade": "الدرجة 4 / 5 (قوية ومثالية)",
    "oxfordDesc": "قوة عضلية ممتازة مع مقاومة جيدة. تدعم أعضاء الحوض، تمنع سلس البول الإجهادي وتعزز استقرار الجذع.",
    "holdEndurance": "قدرة التحمل",
    "targetHold": "الهدف: 5-10 ثوانٍ ثبات",
    "elasticRecovery": "مرونة التعافي",
    "recoveryDesc": "إعادة ضبط عصبية عضلية سريعة",
    "clinicalGuidanceTitle": "توجيه طبي:",
    "clinicalGuidanceDesc": "لا تحبسي أنفاسك ولا تشدي عضلات المؤخرة أثناء كيغل. تنفسي بعمق واقبضي عضلات الحوض فقط للداخل.",
    "phase1Title": "1. المرحلة الجرابية (الأيام 6-13)",
    "phase1Sub": "إمكانات بناء عضلية عالية (ذروة الإستروجين)",
    "phase1Desc": "ارتفاع الإستروجين. المرحلة المثالية لتمارين المقاومة والأوزان وبناء الكتلة العضلية.",
    "phase2Title": "2. ذروة الإباضة (الأيام 14-16)",
    "phase2Sub": "أقصى طاقة بدنية (حماية المفاصل)",
    "phase2Desc": "أعلى مستوى للقوة البدنية. انتبهي لمحاذاة المفاصل والركبتين لتجنب إجهاد الأربطة.",
    "phase3Title": "3. المرحلة الأصفرية (الأيام 17-23)",
    "phase3Sub": "قوة التحمل والتمارين الهوائية",
    "phase3Desc": "ارتفاع البروجستيرون وزيادة معدل الحرق. ممتازة للسباحة والمشي وتمارين الأوزان المتوسطة.",
    "phase4Title": "4. مرحلة الحيض (الأيام 1-5)",
    "phase4Sub": "التعافي النشط وتمارين التمدد واليوغا",
    "phase4Desc": "انخفاض الهرمونات. ركزي على تمارين وزن الجسم الخفيفة وجسور الحوض واليوغا المريحة.",
    "vitalityIndexTitle": "مؤشر الحيوية الشامل",
    "vitalityIndexStatus": "طاقة ونشاط وظيفي فائق",
    "vitalityIndexReady": "✓ الجسم مهيأ للتمارين القادمة",
    "coreStability": "استقرار العمود الفقري والجذع",
    "boneMineral": "مؤشر حماية كثافة المعادن العظمية",
    "mitoRecovery": "معدل تعافي الخلايا العضلية",
    "bleTelemetry": "قياسات تتبع BLE",
    "switchToDemo": "التبديل إلى الوضع التجريبي",
    "switchToLive": "التبديل إلى وضع البلوتوث المباشر",
    "biphasicShift": "التحول الحراري ثنائي الطور",
    "shiftConfirmed": "تم تأكيد الارتفاع",
    "skinBbt": "حرارة الجلد القاعدية",
    "stepsLabel": "خطوة",
    "hoursMet": "ساعات مكتملة",
    "activeStreakHint": "الساعة الحالية: 196 خطوة • يتبقى 54 خطوة فقط للحفاظ على استمرارية النشاط!",
    "glassesLogged": "أكواب مسجلة",
    "pausePacer": "إيقاف مؤقت",
    "startBreathing": "بدء تمرين التنفس 4-7-8"
  }
};

export default function Wearable() {
  const { t, language } = useLanguage();
  const wDict = WEARABLE_I18N[language] || WEARABLE_I18N.en;

  const [isConnected, setIsConnected] = useState(false);
  const [isDemo, setIsDemo] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(true);
  const [waterGlasses, setWaterGlasses] = useState(7);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [kegelActive, setKegelActive] = useState(false);
  const [kegelPhase, setKegelPhase] = useState('Squeeze');
  const [kegelSeconds, setKegelSeconds] = useState(5);
  const [kegelReps, setKegelReps] = useState(0);
  const [kegelTarget] = useState(10);
  const [activeStrengthTab, setActiveStrengthTab] = useState('kegel');

  const [vitals, setVitals] = useState({
    heartRate: 71,
    systolic: 118,
    diastolic: 76,
    hrv: 64,
    skinTemp: 36.65,
    spo2: 98.4,
    stressScore: 22,
    respiratoryRate: 14,
    gsr: 1.85,
    sleep: 7.75,
    vo2Max: 38.4,
    calories: 438,
    steps: 7420,
    runningDistance: 1.8,
    joggingDistance: 2.2,
    activityTime: 52
  });

  // Fetch initial vitals from backend
  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const res = await api.get('/wearable/data');
        if (res.success && res.data) {
          const d = res.data;
          setVitals({
            heartRate: d.heartRate || 71,
            systolic: d.bloodPressure?.systolic || 118,
            diastolic: d.bloodPressure?.diastolic || 76,
            hrv: d.hrv || 64,
            skinTemp: d.skinTemperature || 36.65,
            spo2: d.spo2 || 98.4,
            stressScore: d.stressScore || 22,
            respiratoryRate: d.respiratoryRate || 14,
            gsr: d.gsr || 1.85,
            sleep: d.sleepHours || 7.75,
            vo2Max: 38.4,
            calories: d.calories || 438,
            steps: d.steps || 7420,
            runningDistance: d.runningDistance || 1.8,
            joggingDistance: d.joggingDistance || 2.2,
            activityTime: d.activityMinutes || 52
          });
          setIsConnected(Boolean(d.isBluetoothConnected));
          setIsDemo(Boolean(d.isDemo));
        }
      } catch (err) {
        console.warn('Wearable vitals fallback:', err.message);
      }
    };
    fetchVitals();
  }, []);

  // Web Bluetooth API handler
  const connectBluetooth = async () => {
    setConnecting(true);
    if (navigator.bluetooth) {
      try {
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['heart_rate', 'battery_service']
        });

        setIsConnected(true);
        setIsDemo(false);
        const devName = device.name || (language === 'ta' ? 'ஸ்மார்ட் வாட்ச்' : (language === 'hi' ? 'स्मार्ट वॉच' : 'Smart Wearable'));
        const alertMap = {
          en: `Successfully paired with BLE device: ${devName}`,
          ta: `புளூடூத் வாட்ச் வெற்றிகரமாக இணைக்கப்பட்டது: ${devName}`,
          hi: `ब्लूटूथ डिवाइस सफलतापूर्वक कनेक्ट हुआ: ${devName}`,
          te: `బ్లూటూత్ పరికరం విజయవంతంగా కనెక్ట్ చేయబడింది: ${devName}`,
          ml: `ബ്ലൂടൂത്ത് ഉപകരണം വിജയകരമായി ബന്ധിപ്പിച്ചു: ${devName}`,
          mr: `ब्लूटूथ डिव्हाइस यशस्वीरित्या जोडले गेले: ${devName}`,
          mwr: `ब्लूटूथ डिवाइस जुड़ गयो सा: ${devName}`,
          fr: `Appareil BLE connecté avec succès : ${devName}`,
          lb: `تم ربط جهاز البلوتوث بنجاح: ${devName}`,
          ar: `تم إقران جهاز البلوتوث بنجاح: ${devName}`
        };
        alert(alertMap[language] || alertMap.en);
        await api.post('/wearable/sync', { isBluetoothConnected: true, isDemo: false });
      } catch (err) {
        console.warn('Web Bluetooth connection declined or failed:', err.message);
        // Fallback simulation toggle
        setIsConnected(true);
        setIsDemo(false);
      } finally {
        setConnecting(false);
      }
    } else {
      setTimeout(() => {
        setIsConnected((prev) => !prev);
        setIsDemo((prev) => !prev);
        setConnecting(false);
      }, 700);
    }
  };

  const toggleDemoMode = () => {
    setIsConnected(!isConnected);
    setIsDemo(!isDemo);
  };

  // Breathing pacer effect (4-7-8 rhythm)
  useEffect(() => {
    let timer;
    if (breathingActive) {
      timer = setInterval(() => {
        setBreathSeconds((prevSec) => {
          if (prevSec <= 1) {
            setBreathPhase((prevPhase) => {
              if (prevPhase === 'Inhale') {
                return 'Hold';
              } else if (prevPhase === 'Hold') {
                return 'Exhale';
              } else {
                return 'Inhale';
              }
            });
            return breathPhase === 'Inhale' ? 7 : breathPhase === 'Hold' ? 8 : 4;
          }
          return prevSec - 1;
        });
      }, 1000);
    } else {
      setBreathPhase('Inhale');
      setBreathSeconds(4);
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathPhase]);

  // Kegel & Pelvic Floor Muscle Strength Timer Effect
  useEffect(() => {
    let timer;
    if (kegelActive) {
      timer = setInterval(() => {
        setKegelSeconds((prevSec) => {
          if (prevSec <= 1) {
            setKegelPhase((prevPhase) => {
              if (prevPhase === 'Squeeze') {
                return 'Relax';
              } else {
                setKegelReps((prevReps) => (prevReps >= kegelTarget ? 1 : prevReps + 1));
                return 'Squeeze';
              }
            });
            return 5;
          }
          return prevSec - 1;
        });
      }, 1000);
    } else {
      setKegelPhase('Squeeze');
      setKegelSeconds(5);
    }
    return () => clearInterval(timer);
  }, [kegelActive, kegelTarget]);

  const tempFahrenheit = ((vitals.skinTemp * 9) / 5 + 32).toFixed(1);

  // Hourly step cadence data (250 steps/hr goal)
  const hourlySteps = [
    { hour: '8 AM', steps: 340, met: true },
    { hour: '9 AM', steps: 410, met: true },
    { hour: '10 AM', steps: 280, met: true },
    { hour: '11 AM', steps: 190, met: false },
    { hour: '12 PM', steps: 520, met: true },
    { hour: '1 PM', steps: 310, met: true },
    { hour: '2 PM', steps: 295, met: true },
    { hour: '3 PM', steps: 360, met: true },
    { hour: '4 PM', steps: 265, met: true },
    { hour: '5 PM', steps: 196, met: false } // Current hour
  ];

  // Reusable Bluetooth Status Footer rendered on EVERY SINGLE ONE of the 12 Biometric Cards
  const renderBluetoothStatusFooter = () => (
    <div style={{
      marginTop: '14px',
      paddingTop: '10px',
      borderTop: isConnected ? '1px dashed #d1fae5' : '1px dashed #fee2e2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.73rem',
      fontWeight: 600
    }}>
      {isConnected ? (
        <>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-glow" />
            {t('btConnectedLive')}
          </span>
          <span style={{ fontSize: '0.68rem', color: '#047857', background: '#dcfce7', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
            BLE 5.2 • Live
          </span>
        </>
      ) : (
        <>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#dc2626' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            {t('btDemoConnect')}
          </span>
          <button
            onClick={connectBluetooth}
            style={{
              background: '#fee2e2',
              border: 'none',
              color: '#b91c1c',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {t('connectNow')}
          </button>
        </>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '28px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fff0f5 0%, #fdf2f8 50%, #eff6ff 100%)',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        border: '1px solid var(--pink-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '20px',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 8px 20px rgba(244, 63, 94, 0.3)'
          }}>
            ⌚
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-dark)', margin: 0 }}>
                {t('wearableTitle')}
              </h1>
              <span className={`badge ${isConnected ? 'badge-pink' : 'badge-demo'}`}>
                {isConnected ? t('connectedBadge') : t('demoDataBadge')}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              {t('wearableSub')}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowTelemetryDrawer(!showTelemetryDrawer)}
            className="btn-secondary"
            style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}
          >
            <Wifi size={17} />
            <span>{wDict.bleTelemetry}</span>
          </button>

          <button
            onClick={connectBluetooth}
            disabled={connecting}
            className="btn-primary"
            style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Bluetooth size={18} />
            <span>
              {connecting ? t('scanningBLE') : isConnected ? t('disconnectBLE') : t('connectBLE')}
            </span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE BLUETOOTH TELEMETRY & HARDWARE CONNECTION STATUS DRAWER */}
      {showTelemetryDrawer && (
        <div className="glass-card" style={{
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          background: isConnected ? 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' : 'linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)',
          border: isConnected ? '1.5px solid #a7f3d0' : '1.5px solid #fecaca',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bluetooth size={22} color={isConnected ? '#059669' : '#dc2626'} />
              <div>
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: isConnected ? '#065f46' : '#991b1b', fontWeight: 700 }}>
                  {t('bleTelemetryTitle')}
                </h3>
                <span style={{ fontSize: '0.78rem', color: isConnected ? '#047857' : '#b91c1c' }}>
                  {isConnected ? '✓ Paired & Active BLE Stream • Continuous IoT Synchronization' : '🔴 Simulated Demo Signal Feed • Disconnected'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={toggleDemoMode}
                style={{
                  background: 'white',
                  border: isConnected ? '1px solid #6ee7b7' : '1px solid #fca5a5',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: isConnected ? '#047857' : '#b91c1c',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw size={14} />
                <span>{isConnected ? wDict.switchToDemo : wDict.switchToLive}</span>
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            background: 'white',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {t('bleDeviceName')}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--navy-dark)', marginTop: '2px' }}>
                FemTech PulseRing Gen-3
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>UUID: 0x180D (BLE 5.2)</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {t('bleSignalQuality')}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isConnected ? '#059669' : '#dc2626', marginTop: '2px' }}>
                {isConnected ? '-58 dBm (Strong)' : 'Simulated 0 dBm'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Transmission Latency: 42ms</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {t('bleBattery')}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0d9488', marginTop: '2px' }}>
                88% (4.5 Days Remaining)
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Wireless Qi Inductive Fast Charge</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {t('bleSampleRate')}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#7c3aed', marginTop: '2px' }}>
                2.50 Hz (2500ms Cycle)
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dual Optical Photoplethysmography</div>
            </div>
          </div>
        </div>
      )}

      <DisclaimerBanner customText={t('wearableDisclaimer')} />

      {/* CONTINUOUS BBT & HORMONAL PHASE SYNCHRONIZATION BANNER */}
      <div className="glass-card" style={{
        padding: '22px 26px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fff1f2 50%, #fef3c7 100%)',
        border: '1.5px solid #fecdd3',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '740px' }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(244, 63, 94, 0.15)',
            color: '#e11d48'
          }}>
            <Thermometer size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', background: '#ffe4e6', color: '#be123c', padding: '2px 8px', borderRadius: '12px' }}>
                {wDict.biphasicShift}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#047857' }}>
                ✓ +0.32°C {wDict.shiftConfirmed}
              </span>
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#881337', margin: '2px 0 4px 0', fontWeight: 700 }}>
              {t('bbtShiftBannerTitle')}
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              {t('bbtShiftBannerDesc')}
            </p>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #fecdd3',
          textAlign: 'center',
          minWidth: '150px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
            {wDict.skinBbt}
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#e11d48' }}>
            {vitals.skinTemp}°C
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {tempFahrenheit}°F
          </div>
        </div>
      </div>

      {/* ECG Live Animation Banner */}
      <div className="glass-card" style={{
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        color: 'white',
        marginBottom: '28px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} className="animate-glow" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              {t('liveECGBanner')} {isDemo ? t('demoFeedTag') : t('bleStreamTag')}
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fb7185' }}>
            {vitals.heartRate} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{t('bpm')}</span>
          </div>
        </div>

        {/* Stylized ECG Pulse Wave Line */}
        <div style={{ height: '70px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <svg viewBox="0 0 500 80" style={{ width: '100%', height: '100%', stroke: '#f43f5e', fill: 'none', strokeWidth: 3, strokeLinecap: 'round' }}>
            <path d="M 0,40 L 80,40 L 95,15 L 110,65 L 125,10 L 140,55 L 155,40 L 250,40 L 265,15 L 280,65 L 295,10 L 310,55 L 325,40 L 420,40 L 435,15 L 450,65 L 465,10 L 480,55 L 500,40" />
          </svg>
        </div>
      </div>

      {/* 12 UNIQUE, COMPREHENSIVE BIOMETRIC CARDS (EACH WITH EXACTLY 2 FULL LINES AND BLUETOOTH FOOTER) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        {/* 1. Resting Heart Rate */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #fecdd3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('restingHeartRateTitle')}
            </span>
            <Heart size={20} color="var(--pink-600)" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--pink-600)', marginBottom: '8px' }}>
            {vitals.heartRate} <span style={{ fontSize: '0.85rem' }}>{t('bpm')}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, lineHeight: '1.4' }}>
            {t('rhrLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('rhrLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 2. Heart Rate Variability (HRV) */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #fbcfe8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('hrvTitle')}
            </span>
            <Zap size={20} color="#e11d48" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#e11d48', marginBottom: '8px' }}>
            {vitals.hrv} <span style={{ fontSize: '0.85rem' }}>ms (SDNN)</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#be123c', fontWeight: 700, lineHeight: '1.4' }}>
            {t('hrvLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('hrvLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 3. Basal Skin Temperature */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #fed7aa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('skinTempTitle')}
            </span>
            <Thermometer size={20} color="#ea580c" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ea580c', marginBottom: '8px' }}>
            {vitals.skinTemp}° <span style={{ fontSize: '0.85rem' }}>C</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#c2410c', fontWeight: 700, lineHeight: '1.4' }}>
            {t('bbtLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('bbtLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 4. Blood Oxygen (SpO2) */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #bae6fd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('spo2Title')}
            </span>
            <Activity size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0284c7', marginBottom: '8px' }}>
            {vitals.spo2}%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 700, lineHeight: '1.4' }}>
            {t('spo2Line1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('spo2Line2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 5. Continuous Blood Pressure */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #e9d5ff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('bloodPressureTitle')}
            </span>
            <HeartPulse size={20} color="var(--lavender-deep)" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--lavender-deep)', marginBottom: '8px' }}>
            {vitals.systolic}/{vitals.diastolic} <span style={{ fontSize: '0.85rem' }}>mmHg</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6b21a8', fontWeight: 700, lineHeight: '1.4' }}>
            {t('bpLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('bpLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 6. Resting Respiration Rate */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #ccfbf1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('respiratoryRateTitle')}
            </span>
            <Wind size={20} color="#0d9488" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0d9488', marginBottom: '8px' }}>
            {vitals.respiratoryRate} <span style={{ fontSize: '0.85rem' }}>breaths/min</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700, lineHeight: '1.4' }}>
            {t('rrLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('rrLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 7. Stress & Cortisol Index */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #ddd6fe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('stressIndexTitle')}
            </span>
            <Sparkles size={20} color="#7c3aed" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#7c3aed', marginBottom: '8px' }}>
            {vitals.stressScore} <span style={{ fontSize: '0.85rem' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6d28d9', fontWeight: 700, lineHeight: '1.4' }}>
            {t('stressLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('stressLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 8. Electrodermal Tone (GSR / EDA) */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #fecdd3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('gsrTitle')}
            </span>
            <ShieldCheck size={20} color="#db2777" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#db2777', marginBottom: '8px' }}>
            {vitals.gsr} <span style={{ fontSize: '0.85rem' }}>µS</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#9d174d', fontWeight: 700, lineHeight: '1.4' }}>
            {t('gsrLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('gsrLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 9. Sleep Architecture Breakdown */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #c7d2fe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('sleepArchTitle')}
            </span>
            <Moon size={20} color="#6366f1" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#4f46e5', marginBottom: '8px' }}>
            7h 45m <span style={{ fontSize: '0.85rem' }}>Score 88</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#3730a3', fontWeight: 700, lineHeight: '1.4' }}>
            {t('sleepLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('sleepLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 10. Cardio Fitness (VO2 Max) */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #fed7aa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('vo2MaxTitle')}
            </span>
            <Flame size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#d97706', marginBottom: '8px' }}>
            {vitals.vo2Max} <span style={{ fontSize: '0.85rem' }}>mL/kg/min</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#b45309', fontWeight: 700, lineHeight: '1.4' }}>
            {t('vo2Line1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('vo2Line2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 11. Active Metabolic Calories */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #fecaca' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('activeCaloriesTitle')}
            </span>
            <Flame size={20} color="#ef4444" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ef4444', marginBottom: '8px' }}>
            {vitals.calories} <span style={{ fontSize: '0.85rem' }}>kcal</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#b91c1c', fontWeight: 700, lineHeight: '1.4' }}>
            {t('calLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('calLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>

        {/* 12. Daily Steps & Cadence */}
        <div className="glass-card" style={{ padding: '22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('dailyStepsTitle')}
            </span>
            <TrendingUp size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#16a34a', marginBottom: '8px' }}>
            {vitals.steps.toLocaleString()} <span style={{ fontSize: '0.85rem' }}>{wDict.stepsLabel}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700, lineHeight: '1.4' }}>
            {t('stepsLine1')}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
            {t('stepsLine2')}
          </div>
          {renderBluetoothStatusFooter()}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🚀 EXPANSIVE DAILY WELLNESS & ACTIVITY SUITE (RICH ADD-ONS) */}
      {/* ============================================================== */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '1.8rem' }}>🌿</span>
          <div>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-dark)', margin: 0, fontWeight: 800 }}>
              {t('wellnessSuiteTitle')}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              {t('wellnessSuiteSub')}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '22px'
        }}>
          {/* WELLNESS ADD-ON 1: HOURLY STEP CADENCE & INACTIVITY TRACKER */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #d1fae5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={22} color="#059669" />
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--navy-dark)', fontWeight: 700 }}>
                  {t('hourlyStepGoal')}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#dcfce7', color: '#047857', padding: '3px 8px', borderRadius: '12px' }}>
                8/12 {wDict.hoursMet}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {t('hourlyStepSub')}
            </p>

            {/* Visual Hourly Step Mini-Bars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px', alignItems: 'flex-end', height: '80px', marginBottom: '12px', paddingBottom: '4px', borderBottom: '1px solid #f1f5f9' }}>
              {hourlySteps.map((item, idx) => {
                const heightPercent = Math.min(100, Math.round((item.steps / 520) * 100));
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${heightPercent}%`,
                        background: item.met ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)' : 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '3px 3px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                      title={`${item.hour}: ${item.steps} steps`}
                    />
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '4px', whiteSpace: 'nowrap' }}>
                      {item.hour.replace(' ', '')}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: '#f0fdf4', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span>{wDict.activeStreakHint}</span>
            </div>
          </div>

          {/* WELLNESS ADD-ON 2: HYDRATION PACING & WATER BALANCE */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #bae6fd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Droplets size={22} color="#0284c7" />
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--navy-dark)', fontWeight: 700 }}>
                  {t('hydrationPacing')}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '12px' }}>
                {waterGlasses * 250} / 2500 mL (70%)
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {t('hydrationPacingSub')}
            </p>

            {/* Hydration Progress Bar */}
            <div style={{ height: '12px', background: '#e0f2fe', borderRadius: '6px', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ width: `${Math.min(100, Math.round(((waterGlasses * 250) / 2500) * 100))}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)', borderRadius: '6px', transition: 'width 0.3s ease' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: '#0369a1' }}>
                💧 {waterGlasses} {wDict.glassesLogged}
              </div>
              <button
                onClick={() => setWaterGlasses((prev) => Math.min(14, prev + 1))}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#f0f9ff', borderColor: '#bae6fd', color: '#0284c7', fontWeight: 700, cursor: 'pointer' }}
              >
                +1 Glass (250mL)
              </button>
            </div>
          </div>

          {/* WELLNESS ADD-ON 3: ACTIVE METABOLIC BREAKDOWN (METs & TDEE) */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fecaca' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={22} color="#dc2626" />
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--navy-dark)', fontWeight: 700 }}>
                  {t('caloricMetabolism')}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#fee2e2', color: '#b91c1c', padding: '3px 8px', borderRadius: '12px' }}>
                1,998 Total TDEE
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {t('caloricMetabolismSub')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
              <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.68rem', color: '#991b1b', fontWeight: 700 }}>BMR (Basal)</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }}>1,380</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>kcal</div>
              </div>
              <div style={{ background: '#fff1f2', padding: '10px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.68rem', color: '#9f1239', fontWeight: 700 }}>Active Burn</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#e11d48' }}>438</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>kcal</div>
              </div>
              <div style={{ background: '#fdf4ff', padding: '10px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.68rem', color: '#86198f', fontWeight: 700 }}>Intensity</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c026d3' }}>3.8</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>METs</div>
              </div>
            </div>
          </div>

          {/* WELLNESS ADD-ON 4: SLEEP STAGE ARCHITECTURE */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #c7d2fe' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Moon size={22} color="#4f46e5" />
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--navy-dark)', fontWeight: 700 }}>
                  {t('sleepArchitecture')}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#e0e7ff', color: '#3730a3', padding: '3px 8px', borderRadius: '12px' }}>
                7h 45m (Score 88)
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {t('sleepArchitectureSub')}
            </p>

            {/* 4-Stage Sleep Visual Bar */}
            <div style={{ display: 'flex', height: '14px', borderRadius: '7px', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ width: '22%', background: '#312e81' }} title="Deep Sleep 22%" />
              <div style={{ width: '25%', background: '#6366f1' }} title="REM Sleep 25%" />
              <div style={{ width: '46%', background: '#a5b4fc' }} title="Light Sleep 46%" />
              <div style={{ width: '7%', background: '#f87171' }} title="Awake 7%" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#475569', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#312e81', display: 'inline-block' }} />
                Deep: 1h 45m (22%)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
                REM: 1h 55m (25%)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a5b4fc', display: 'inline-block' }} />
                Light: 3h 35m (46%)
              </span>
            </div>
          </div>

          {/* WELLNESS ADD-ON 5: PELVIC FLOOR RELIEF & 4-7-8 BREATHING PACER */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fbcfe8', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HeartPulse size={24} color="#e11d48" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--navy-dark)', fontWeight: 700 }}>
                    {t('pelvicStretchPacer')}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                    {t('pelvicStretchSub')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className={breathingActive ? 'btn-secondary' : 'btn-primary'}
                style={{ padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                {breathingActive ? <Pause size={16} /> : <Play size={16} />}
                <span>{breathingActive ? wDict.pausePacer : wDict.startBreathing}</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', padding: '16px', background: '#fff5f7', borderRadius: 'var(--radius-md)' }}>
              {/* Visual Breathing Circle */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: breathPhase === 'Inhale' ? 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)' : breathPhase === 'Hold' ? 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)' : 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  boxShadow: '0 8px 24px rgba(244, 63, 94, 0.25)',
                  transform: breathPhase === 'Inhale' ? 'scale(1.15)' : breathPhase === 'Hold' ? 'scale(1.15)' : 'scale(0.9)',
                  transition: 'all 1s ease-in-out'
                }}>
                  {breathSeconds}s
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#881337' }}>
                  {breathPhase === 'Inhale' ? wDict.inhaleGently : breathPhase === 'Hold' ? wDict.holdAir : wDict.exhaleSlowly}
                </div>
              </div>

              {/* Pelvic Relaxation Tips */}
              <div style={{ maxWidth: '640px', fontSize: '0.84rem', color: '#475569', lineHeight: '1.6' }}>
                <div style={{ fontWeight: 700, color: 'var(--navy-dark)', marginBottom: '4px' }}>
                  {wDict.pelvicProtocolTitle}
                </div>
                <div>
                  {wDict.pelvicTip1}
                </div>
                <div>
                  {wDict.pelvicTip2}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* WELLNESS ADD-ON 6: PHYSICAL STRENGTH & VITALITY SUITE         */}
          {/* (Requested by user: "வெல்னஸ் ஸ்ட்ரெந்த் ரொம்ப கம்மியா இருக்கு")  */}
          {/* ============================================================ */}
          <div className="glass-card" style={{
            padding: '28px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid #fda4af',
            gridColumn: '1 / -1',
            boxShadow: '0 8px 30px rgba(225, 29, 72, 0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'var(--rose-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)'
                }}>
                  🏋️‍♀️
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--navy-dark)', fontWeight: 800 }}>
                    {wDict.suiteTitle}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '3px 0 0 0' }}>
                    {wDict.suiteDesc}
                  </p>
                </div>
              </div>

              {/* Sub-tabs Switcher */}
              <div style={{ display: 'flex', gap: '6px', background: '#fce7f3', padding: '4px', borderRadius: 'var(--radius-full)' }}>
                {[
                  { id: 'kegel', label: wDict.tabKegel },
                  { id: 'cycle_strength', label: wDict.tabCycle },
                  { id: 'vitality_gauge', label: wDict.tabVitality }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveStrengthTab(tab.id)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: 'none',
                      background: activeStrengthTab === tab.id ? 'var(--rose-gradient)' : 'transparent',
                      color: activeStrengthTab === tab.id ? 'white' : '#881337',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB 1: KEGEL & PELVIC FLOOR MUSCLE STRENGTH TRAINER */}
            {activeStrengthTab === 'kegel' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
                {/* Visual Squeeze/Relax Circle */}
                <div style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1.5px solid #fecdd3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.06)'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: kegelPhase === 'Squeeze'
                      ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)'
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: kegelPhase === 'Squeeze' ? '0 0 24px rgba(225, 29, 72, 0.45)' : '0 0 20px rgba(16, 185, 129, 0.35)',
                    transform: kegelPhase === 'Squeeze' ? 'scale(1.12)' : 'scale(0.96)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>{kegelSeconds}s</span>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                      {kegelPhase === 'Squeeze' ? wDict.squeeze : wDict.relax}
                    </span>
                  </div>

                  <div style={{ marginTop: '16px', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#881337', marginBottom: '6px' }}>
                      <span>{wDict.completedReps}</span>
                      <span>{kegelReps} / {kegelTarget}</span>
                    </div>
                    <div style={{ height: '8px', background: '#ffe4e6', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, (kegelReps / kegelTarget) * 100)}%`, height: '100%', background: 'var(--rose-gradient)', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  <button
                    onClick={() => setKegelActive(!kegelActive)}
                    className={kegelActive ? 'btn-secondary' : 'btn-primary'}
                    style={{ marginTop: '16px', width: '100%', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    {kegelActive ? <Pause size={16} /> : <Play size={16} />}
                    <span>{kegelActive ? wDict.pauseWorkout : wDict.startKegel}</span>
                  </button>
                </div>

                {/* Oxford Scale & Muscle Tone Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-dark)' }}>
                        {wDict.oxfordTitle}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', background: '#dcfce7', color: '#166534' }}>
                        {wDict.oxfordGrade}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                      {wDict.oxfordDesc}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div style={{ background: '#fff1f2', padding: '12px', borderRadius: '10px', border: '1px solid #fecdd3' }}>
                      <div style={{ fontSize: '0.72rem', color: '#9f1239', fontWeight: 700 }}>{wDict.holdEndurance}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#be123c', marginTop: '2px' }}>5.0s / Rep</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{wDict.targetHold}</div>
                    </div>
                    <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>{wDict.elasticRecovery}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>96%</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{wDict.recoveryDesc}</div>
                    </div>
                  </div>

                  <div style={{ background: '#fdf2f8', padding: '12px 16px', borderRadius: '10px', border: '1px solid #fbcfe8', fontSize: '0.78rem', color: '#831843' }}>
                    💡 <strong>{wDict.clinicalGuidanceTitle}</strong> {wDict.clinicalGuidanceDesc}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CYCLE-SYNCED MUSCULOSKELETAL STRENGTH MATRIX */}
            {activeStrengthTab === 'cycle_strength' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
                <div style={{ background: 'white', padding: '16px', borderRadius: '14px', border: '1.5px solid #fed7aa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🌱</span>
                    <strong style={{ fontSize: '0.9rem', color: '#c2410c' }}>
                      {wDict.phase1Title}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', marginBottom: '4px' }}>
                    {wDict.phase1Sub}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0, lineHeight: '1.4' }}>
                    {wDict.phase1Desc}
                  </p>
                </div>

                <div style={{ background: 'white', padding: '16px', borderRadius: '14px', border: '1.5px solid #fbcfe8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>✨</span>
                    <strong style={{ fontSize: '0.9rem', color: '#be123c' }}>
                      {wDict.phase2Title}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e11d48', marginBottom: '4px' }}>
                    {wDict.phase2Sub}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0, lineHeight: '1.4' }}>
                    {wDict.phase2Desc}
                  </p>
                </div>

                <div style={{ background: 'white', padding: '16px', borderRadius: '14px', border: '1.5px solid #c7d2fe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🍂</span>
                    <strong style={{ fontSize: '0.9rem', color: '#4338ca' }}>
                      {wDict.phase3Title}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', marginBottom: '4px' }}>
                    {wDict.phase3Sub}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0, lineHeight: '1.4' }}>
                    {wDict.phase3Desc}
                  </p>
                </div>

                <div style={{ background: 'white', padding: '16px', borderRadius: '14px', border: '1.5px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🌙</span>
                    <strong style={{ fontSize: '0.9rem', color: '#15803d' }}>
                      {wDict.phase4Title}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', marginBottom: '4px' }}>
                    {wDict.phase4Sub}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0, lineHeight: '1.4' }}>
                    {wDict.phase4Desc}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: DAILY VITALITY & FUNCTIONAL STAMINA INDEX */}
            {activeStrengthTab === 'vitality_gauge' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1.5px solid #fecdd3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: 'var(--rose-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '1.6rem',
                    boxShadow: '0 4px 16px rgba(225, 29, 72, 0.3)'
                  }}>
                    88
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#9f1239', fontWeight: 700 }}>
                      {wDict.vitalityIndexTitle}
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-dark)' }}>
                      {wDict.vitalityIndexStatus}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                      {wDict.vitalityIndexReady}
                    </span>
                  </div>
                </div>

                <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #fecdd3', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span style={{ color: '#475569' }}>{wDict.coreStability}</span>
                      <span style={{ color: '#be123c' }}>84%</span>
                    </div>
                    <div style={{ height: '6px', background: '#ffe4e6', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '84%', height: '100%', background: 'linear-gradient(90deg, #f43f5e, #be123c)' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span style={{ color: '#475569' }}>{wDict.boneMineral}</span>
                      <span style={{ color: '#15803d' }}>86%</span>
                    </div>
                    <div style={{ height: '6px', background: '#dcfce7', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '86%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #15803d)' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span style={{ color: '#475569' }}>{wDict.mitoRecovery}</span>
                      <span style={{ color: '#0284c7' }}>91%</span>
                    </div>
                    <div style={{ height: '6px', background: '#e0f2fe', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '91%', height: '100%', background: 'linear-gradient(90deg, #38bdf8, #0284c7)' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
