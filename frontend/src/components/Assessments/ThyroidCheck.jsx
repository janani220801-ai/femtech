import React, { useState } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Download,
  Stethoscope,
  Salad,
  Sparkles,
  Thermometer
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const THYROID_DATA = {
  en: {
    badge: 'Endocrine Awareness',
    title: 'Thyroid Health Awareness Check',
    subtitle: 'Evaluate common patterns associated with thyroid function and receive evidence-based metabolic and clinical guidance.',
    stepText: (cur, total) => `Question ${cur} of ${total}`,
    completed: 'Completed',
    yes: 'Yes',
    sometimes: 'Sometimes',
    no: 'No',
    back: '← Back to previous question',
    summaryTitle: 'Thyroid Health Clinical Summary & Recommendations',
    summarySub: 'Assessment evaluated against thyroid pattern benchmarks and saved to your health profile.',
    reportedTitle: (n) => `Reported Symptoms & Indicators (${n}):`,
    noSymptoms: 'No significant thyroid-related patterns were reported in this questionnaire.',
    clinicalNotice: '“Thyroid conditions such as hypothyroidism and hyperthyroidism present diverse symptoms. A serum TSH, Free T3, and Free T4 blood test prescribed by your physician is required for diagnosis.”',
    scoreLabel: 'Pattern Probability:',
    severitySignificant: 'Significant Thyroid Dysregulation Pattern',
    severityModerate: 'Moderate Endocrine & Metabolic Indicators',
    severityMild: 'Mild / Baseline Variations',
    dietTitle: '🥗 Micronutrient & Thyroid Nutritional Blueprint',
    lifestyleTitle: '🦋 Energy, Thermoregulation & Stress Strategies',
    testsTitle: '🩺 Comprehensive Diagnostic Thyroid Lab Panel',
    questionsTitle: '📋 Key Questions for Your Endocrinologist / Physician',
    downloadBtn: 'Download Summary Report',
    retake: 'Retake Assessment',
    questions: [
      { key: 'unusuallyTired', text: 'Do you often feel unusually tired or exhausted even after a full night’s sleep?' },
      { key: 'unexplainedWeightChange', text: 'Have you noticed unexplained weight gain or weight loss despite normal eating habits?' },
      { key: 'hairThinning', text: 'Have you noticed hair thinning, brittleness, or unusual hair fall recently?' },
      { key: 'temperatureSensitivity', text: 'Are you unusually sensitive to cold or heat compared to people around you?' },
      { key: 'periodChanges', text: 'Have you experienced changes in your menstrual cycle (such as heavier, lighter, or irregular periods)?' },
      { key: 'sleepChanges', text: 'Have you noticed persistent changes in your sleep patterns or insomnia?' },
      { key: 'heartRateChanges', text: 'Have you experienced unexplained heart palpitations or an unusually slow or rapid pulse?' },
      { key: 'moodChanges', text: 'Have you noticed persistent mood changes, unusual irritability, or brain fog?' }
    ],
    symptoms: {
      unusuallyTired: 'Persistent Fatigue / Low Energy',
      unexplainedWeightChange: 'Unexplained Weight Fluctuations',
      hairThinning: 'Hair Thinning or Brittleness',
      temperatureSensitivity: 'Extreme Sensitivity to Cold or Heat',
      periodChanges: 'Menstrual Irregularity or Flow Alteration',
      sleepChanges: 'Disrupted Sleep or Insomnia',
      heartRateChanges: 'Heart Palpitations / Pulse Fluctuation',
      moodChanges: 'Irritability or Brain Fog'
    },
    defaultDiet: [
      'Organic Selenium Intake: 2-3 Brazil nuts daily (~200 mcg selenium) supplies the essential trace mineral for the deiodinase enzyme that converts inactive T4 into active T3.',
      'Zinc & Iodine Balance: Moderate iodized salt and zinc-rich foods (pumpkin seeds, lentils) support thyroid peroxidase hormone production.',
      'Steam Cruciferous Vegetables: Lightly steam broccoli, kale, and cauliflower to deactivate naturally occurring goitrogens.'
    ],
    defaultLifestyle: [
      'Target Serum Ferritin: Low iron stores (< 50 ng/mL) directly cause thyroid-related hair loss and cellular fatigue; request a full iron panel.',
      'Early Morning Natural Daylight: 10 minutes of morning sun synchronizes the hypothalamic-pituitary-thyroid (HPT) circadian clock.',
      'Stress Cortisol Reduction: Chronic elevated cortisol blunts peripheral T4-to-T3 conversion; integrate evening restorative stretching.'
    ],
    defaultTests: [
      'Complete Serum Thyroid Panel: TSH, Free T3 (FT3), and Free T4 (FT4) - not just TSH alone',
      'Thyroid Auto-Antibodies: Anti-TPO (Thyroid Peroxidase) and Anti-TG to screen for autoimmune Hashimoto’s or Graves’',
      'Serum Ferritin, Iron Saturation, Vitamin D3 (25-OH), and Vitamin B12 levels'
    ],
    defaultDoctorQ: [
      '1. Can we evaluate a complete thyroid profile including Free T3 and Free T4 rather than solely testing TSH?',
      '2. Are my symptoms potentially linked to suboptimal cellular conversion of T4 into T3?',
      '3. Could low ferritin or vitamin D deficiency be mimicking or exacerbating these thyroid patterns?'
    ]
  },
  ta: {
    badge: 'நாளமில்லா சுரப்பி நலம்',
    title: 'தைராய்டு நல விழிப்புணர்வு பரிசோதனை',
    subtitle: 'தைராய்டு செயல்பாடு தொடர்பான அறிகுறிகளை மதிப்பீடு செய்து விரிவான மருத்துவ மற்றும் வாழ்க்கை முறை வழிகாட்டல்களைப் பெறுங்கள்.',
    stepText: (cur, total) => `கேள்வி ${cur} / ${total}`,
    completed: 'முடிந்தது',
    yes: 'ஆம்',
    sometimes: 'சில நேரங்களில்',
    no: 'இல்லை',
    back: '← முந்தைய கேள்விக்குத் திரும்பு',
    summaryTitle: 'தைராய்டு மருத்துவ விழிப்புணர்வு முடிவு & ஆலோசனைகள்',
    summarySub: 'பதில்கள் மதிப்பீடு செய்யப்பட்டு தனிப்பயனாக்கப்பட்ட மருத்துவ பரிந்துரைகளுடன் சேமிக்கப்பட்டது.',
    reportedTitle: (n) => `பதிவான அறிகுறிகள் & எச்சரிக்கைகள் (${n}):`,
    noSymptoms: 'குறிப்பிடத்தக்க தைராய்டு அறிகுறிகள் எதுவும் பதிவாகவில்லை.',
    clinicalNotice: '“ஹைப்போதைராய்டிசம் மற்றும் ஹைப்பர் தைராய்டிசம் ஆகியவை மாறுபட்ட அறிகுறிகளைக் கொண்டிருக்கும். இரத்தப் பரிசோதனை (TSH, Free T3, Free T4) மூலம் மட்டுமே இதனை துல்லியமாக உறுதிப்படுத்த முடியும்.”',
    scoreLabel: 'தைராய்டு முறைமை நிகழ்தகவு:',
    severitySignificant: 'குறிப்பிடத்தக்க தைராய்டு இடர் நிலை (Significant)',
    severityModerate: 'மிதமான நாளமில்லா சுரப்பி & மெட்டபாலிச அறிகுறிகள்',
    severityMild: 'குறைந்த / இயல்பான மாறுபாடுகள்',
    dietTitle: '🥗 நுண்ணூட்டச்சத்துக்கள் & தைராய்டு உணவு வழிகாட்டல்',
    lifestyleTitle: '🦋 ஆற்றல், உடல் வெப்பநிலை & மன அழுத்த மேலாண்மை',
    testsTitle: '🩺 மருத்துவரிடம் கோர வேண்டிய தைராய்டு முழு இரத்தப் பரிசோதனைகள்',
    questionsTitle: '📋 உங்கள் மருத்துவரிடம் நீங்கள் கேட்க வேண்டிய 3 முக்கிய கேள்விகள்',
    downloadBtn: 'மருத்துவ சுருக்கத்தைப் பதிவிறக்குக (Report)',
    retake: 'மீண்டும் பரிசோதனை செய்க',
    questions: [
      { key: 'unusuallyTired', text: 'இரவு முழுவதும் நன்கு தூங்கிய பின்னரும் வழக்கத்திற்கு மாறான சோர்வு அல்லது பலவீனம் உணர்கிறீர்களா?' },
      { key: 'unexplainedWeightChange', text: 'வழக்கமான உணவுப் பழக்கங்கள் இருந்தும் திடீரென உடல் எடை கூடுதல் அல்லது எடை குறைதல் உள்ளதா?' },
      { key: 'hairThinning', text: 'சமீப காலமாக தலைமுடி மெலிந்து போதல், உதிர்தல் அல்லது முடி உடைதல் தென்படுகிறதா?' },
      { key: 'temperatureSensitivity', text: 'சுற்றியுள்ள மற்றவர்களை விட உங்களுக்கு அதிகப்படியான குளிர் அல்லது வெப்ப சகிப்பின்மை உள்ளதா?' },
      { key: 'periodChanges', text: 'மாதவிடாய் சுழற்சியில் மாற்றங்கள் (அதிக இரத்தப்போக்கு, குறைவான போக்கு அல்லது ஒழுங்கற்ற சுழற்சி) உள்ளதா?' },
      { key: 'sleepChanges', text: 'தூக்கமின்மை அல்லது தூக்க முறையில் தொடர்ச்சியான மாற்றங்களை உணர்கிறீர்களா?' },
      { key: 'heartRateChanges', text: 'விவரிக்க முடியாத நெஞ்சு படபடப்பு, அல்லது மிகக் குறைந்த/வேகமான இதயத் துடிப்பு உள்ளதா?' },
      { key: 'moodChanges', text: 'எரிச்சல், மனநிலை மாற்றங்கள், அல்லது நினைவாற்றல் மந்தம் (Brain Fog) உள்ளதா?' }
    ],
    symptoms: {
      unusuallyTired: 'தொடர்ச்சியான அதிக சோர்வு',
      unexplainedWeightChange: 'காரணமில்லாத உடல் எடை மாற்றம்',
      hairThinning: 'முடி உதிர்தல் அல்லது மெலிந்து போதல்',
      temperatureSensitivity: 'அதிகப்படியான குளிர் / வெப்ப சகிப்பின்மை',
      periodChanges: 'மாதவிடாய் சுழற்சி முறைகேடுகள்',
      sleepChanges: 'தூக்கமின்மை அல்லது முறையற்ற தூக்கம்',
      heartRateChanges: 'நெஞ்சு படபடப்பு அல்லது துடிப்பு மாற்றம்',
      moodChanges: 'மனநிலை மாற்றங்கள் அல்லது நினைவாற்றல் மந்தம்'
    },
    defaultDiet: [
      'இயற்கை செலினியம் உட்கொள்ளல்: தினமும் 2-3 பிரேசில் நட்ஸ் (சுமார் 200 mcg செலினியம்) உட்கொள்வது செயலற்ற T4 ஹார்மோனை செயலில் உள்ள T3 ஆக மாற்றும் என்சைமிற்கு மிகவும் அத்தியாவசியம்.',
      'துத்தநாகம் மற்றும் அயோடின்: சீரான அயோடின் உப்பு மற்றும் பூசணி விதைகள் தைராய்டு ஹார்மோன் உற்பத்தியை ஆதரிக்கின்றன.',
      'காய்கறிகளை சமைத்து உண்ணுதல்: முட்டைக்கோஸ், காலிஃபிளவர் போன்ற காய்கறிகளை லேசாக வேகவைத்து உட்கொள்வது தைராய்டு சுரப்பை பாதிக்காமல் தடுக்கும்.'
    ],
    defaultLifestyle: [
      'பெரிட்டின் (Ferritin) அளவு பரிசோதனை: இரத்தத்தில் இரும்புச் சத்து இருப்பு 50 ng/mL-க்கு குறைவாக இருந்தால் அது தைராய்டு சோர்வு மற்றும் முடி உதிர்தலை தீவிரப்படுத்தும்.',
      'காலை நேர இயற்கை சூரிய ஒளி: காலையில் 10-15 நிமிடங்கள் சூரிய ஒளியில் நிற்பது மூளையின் தைராய்டு கட்டுப்பாட்டு மையத்தை (HPT Axis) சீராக்கும்.',
      'கார்டிசோல் மன அழுத்த குறைப்பு: அதிக மன அழுத்தம் T4 ஹார்மோன் T3 ஆக மாறுவதைத் தடுக்கும்; இரவு நேர அமைதியான தூக்கம் அவசியம்.'
    ],
    defaultTests: [
      'தைராய்டு முழு இரத்தப் பரிசோதனை: TSH மட்டுமின்றி Free T3 மற்றும் Free T4 ஆகியவற்றை சோதிக்க வேண்டும்.',
      'தைராய்டு ஆன்டிபாடி பரிசோதனை: Anti-TPO மற்றும் Anti-TG (ஆட்டோ இம்யூன் ஹாஷிமோட்டோஸ் நிலையைக் கண்டறிய)',
      'சீரம் பெரிட்டின் (Ferritin), வைட்டமின் D3 மற்றும் வைட்டமின் B12 நிலைகள்'
    ],
    defaultDoctorQ: [
      '1. எனது பரிசோதனையில் TSH உடன் சேர்த்து Free T3 மற்றும் Free T4 அளவுகளையும் சோதிக்க முடியுமா?',
      '2. எனது தொடர் சோர்வு மற்றும் குளிர் சகிப்பின்மைக்கு T4 ஹார்மோன் T3 ஆக மாறும் குறைபாடு காரணமாக இருக்கலாமா?',
      '3. இரும்புச் சத்து (Ferritin) அல்லது வைட்டமின் குறைபாடுகள் இந்த தைராய்டு அறிகுறிகளை அதிகரிக்கிறதா?'
    ]
  },
  hi: {
    badge: 'अंतःस्रावी (थायरॉयड) स्वास्थ्य',
    title: 'थायरॉयड स्वास्थ्य जागरूकता जांच',
    subtitle: 'थायरॉयड कार्यप्रणाली से जुड़े लक्षणों का मूल्यांकन करें और साक्ष्य-आधारित चिकित्सीय व जीवनशैली मार्गदर्शन प्राप्त करें।',
    stepText: (cur, total) => `प्रश्न ${cur} / ${total}`,
    completed: 'पूर्ण',
    yes: 'हाँ',
    sometimes: 'कभी-कभी',
    no: 'नहीं',
    back: '← पिछले प्रश्न पर वापस जाएं',
    summaryTitle: 'थायरॉयड स्वास्थ्य सारांश व सिफारिशें',
    summarySub: 'प्रश्नावली का विश्लेषण कर व्यक्तिगत सलाह के साथ प्रोफाइल में सुरक्षित किया गया।',
    reportedTitle: (n) => `दर्ज लक्षण व संकेतक (${n}):`,
    noSymptoms: 'इस प्रश्नावली में कोई महत्वपूर्ण थायरॉयड लक्षण दर्ज नहीं किए गए।',
    clinicalNotice: '“थायरॉयड असंतुलन के कई रूप होते हैं। सीरम TSH, T3 और T4 रक्त परीक्षण द्वारा ही डॉक्टर सटीक निदान कर सकते हैं।”',
    scoreLabel: 'पैटर्न संभावना दर:',
    severitySignificant: 'महत्वपूर्ण थायरॉयड असंतुलन पैटर्न (Significant)',
    severityModerate: 'मध्यम अंतःस्रावी व चयापचय संकेत',
    severityMild: 'हल्के / न्यूनतम संकेतक',
    dietTitle: '🥗 सूक्ष्म पोषक तत्व व थायरॉयड पोषण योजना',
    lifestyleTitle: '🦋 ऊर्जा, तापमान संतुलन व तनाव नियंत्रण',
    testsTitle: '🩺 संपूर्ण थायरॉयड प्रयोगशाला परीक्षण',
    questionsTitle: '📋 डॉक्टर से परामर्श हेतु ३ मुख्य प्रश्न',
    downloadBtn: 'रिपोर्ट डाउनलोड करें',
    retake: 'पुनः परीक्षण करें',
    questions: [
      { key: 'unusuallyTired', text: 'क्या पूरी रात सोने के बाद भी आप अक्सर असामान्य रूप से थकान या कमजोरी महसूस करते हैं?' },
      { key: 'unexplainedWeightChange', text: 'क्या सामान्य खान-पान के बावजूद आपने बिना किसी स्पष्ट कारण के वजन बढ़ना या घटना देखा है?' },
      { key: 'hairThinning', text: 'क्या आपने हाल ही में बालों का पतला होना, रूखापन या अत्यधिक झड़ना देखा है?' },
      { key: 'temperatureSensitivity', text: 'क्या आप अपने आसपास के लोगों की तुलना में ठंड या गर्मी के प्रति असामान्य रूप से संवेदनशील हैं?' },
      { key: 'periodChanges', text: 'क्या आपने माहवारी चक्र में बदलाव (जैसे अधिक रक्तस्राव, कम रक्तस्राव या अनियमितता) देखा है?' },
      { key: 'sleepChanges', text: 'क्या आपने अपनी नींद के पैटर्न में लगातार बदलाव या अनिद्रा की समस्या महसूस की है?' },
      { key: 'heartRateChanges', text: 'क्या आपने दिल की असामान्य धड़कन (Palpitations) या बहुत धीमी/तेज़ नब्ज महसूस की है?' },
      { key: 'moodChanges', text: 'क्या आपने लगातार मिजाज में बदलाव, चिड़चिड़ापन या ध्यान केंद्रित करने में परेशानी (Brain Fog) महसूस की है?' }
    ],
    symptoms: {
      unusuallyTired: 'अत्यधिक थकान व कमजोरी',
      unexplainedWeightChange: 'अस्पष्ट वजन बढ़ना या घटना',
      hairThinning: 'बालों का पतला होना या झड़ना',
      temperatureSensitivity: 'ठंड या गर्मी के प्रति संवेदनशीलता',
      periodChanges: 'माहवारी चक्र में अनियमितता',
      sleepChanges: 'अनिद्रा या नींद में व्यवधान',
      heartRateChanges: 'दिल की धड़कन में उतार-चढ़ाव',
      moodChanges: 'चिड़चिड़ापन या ध्यान केंद्रित न होना'
    },
    defaultDiet: [
      'सेलेनियम सेवन: ब्राजील नट्स (दिन में 2) T4 को सक्रिय T3 हार्मोन में बदलने वाले एंजाइम के लिए आवश्यक हैं।',
      'जिंक व आयोडीन: संतुलित आयोडीन युक्त नमक और कद्दू के बीज थायरॉयड हार्मोन संश्लेषण में सहायक हैं।',
      'पत्तागोभी/फूलगोभी को पकाकर खाएं: इन्हें हल्का उबालने से इनके गोइट्रोजेन निष्क्रिय हो जाते हैं।'
    ],
    defaultLifestyle: [
      'सीरम फेरिटिन स्तर जांचें: आयरन स्टोरेज कम होने पर थायरॉयड हार्मोन कोशिकाओं तक नहीं पहुंच पाता।',
      'सुबह की धूप: 10-15 मिनट की सुबह की रोशनी मस्तिष्क के थायरॉयड नियंत्रण केंद्र को सक्रिय करती है।',
      'तनाव में कमी: तनाव हार्मोन T4 से T3 के रूपांतरण को बाधित करता है; गहरी नींद लें।'
    ],
    defaultTests: [
      'पूर्ण थायरॉयड प्रोफाइल: केवल TSH ही नहीं बल्कि Free T3 और Free T4 भी जांचें।',
      'थायरॉयड एंटीबॉडीज: Anti-TPO और Anti-TG (हाशिमोटो थायरॉयडिटिस जांच हेतु)',
      'सीरम फेरिटिन, विटामिन D3 और B12 स्तर'
    ],
    defaultDoctorQ: [
      '1. क्या हम केवल TSH के बजाय Free T3 और Free T4 की भी जांच कर सकते हैं?',
      '2. क्या मेरी थकान T4 से T3 में कम रूपांतरण के कारण हो सकती है?',
      '3. क्या फेरिटिन या विटामिन की कमी मेरे थायरॉयड लक्षणों को बढ़ा रही है?'
    ]
  },
  te: {
    badge: "థైరాయిడ్ ఆరోగ్యం",
    title: "థైరాయిడ్ ఆరోగ్య అవగాహన పరీక్ష",
    subtitle: "థైరాయిడ్ పనితీరుకు సంబంధించిన సాధారణ సంకేతాలను అంచనా వేసి ఆధారాలతో కూడిన వైద్య మరియు జీవనశైలి మార్గదర్శకాలను పొందండి.",
    stepText: (cur, total) => `ప్రశ్న ${cur} / ${total}`,
    completed: "పూర్తయింది",
    yes: "అవును",
    sometimes: "కొన్నిసార్లు",
    no: "కాదు",
    back: "← మునుపటి ప్రశ్నకు వెళ్లండి",
    summaryTitle: "థైరాయిడ్ ఆరోగ్య వైద్య సారాంశం & సిఫార్సులు",
    summarySub: "సమాధానాలు విశ్లేషించబడి పూర్తి వైద్య మార్గదర్శకాలతో మీ ప్రొఫైల్‌లో భద్రపరచబడ్డాయి.",
    reportedTitle: (n) => `నమోదైన లక్షణాలు (${n}):`,
    noSymptoms: "ఈ ప్రశ్నపత్రంలో ఎటువంటి తీవ్రమైన థైరాయిడ్ లక్షణాలు నమోదు కాలేదు.",
    clinicalNotice: "“హైపోథైరాయిడిజం మరియు హైపర్‌థైరాయిడిజం విభిన్న లక్షణాలను కలిగి ఉంటాయి. సరైన రోగ నిర్ధారణ కోసం సీరం TSH, Free T3, మరియు Free T4 రక్త పరీక్ష అవసరం.”",
    scoreLabel: "నమూనా సంభావ్యత:",
    severitySignificant: "తీవ్రమైన థైరాయిడ్ అసమతుల్యత (Significant)",
    severityModerate: "మధ్యస్థ మెటబాలిక్ సూచికలు",
    severityMild: "స్వల్ప లక్షణాలు",
    dietTitle: "🥗 పోషకాహార & థైరాయిడ్ డైట్ ప్రణాళిక",
    lifestyleTitle: "🦋 శక్తి, ఉష్ణోగ్రత సమతుల్యత & ఒత్తిడి నిర్వహణ",
    testsTitle: "🩺 వైద్యుడిని అడగవలసిన సమగ్ర థైరాయిడ్ రక్త పరీక్షలు",
    questionsTitle: "📋 ఎండోక్రినాలజిస్ట్ / వైద్యుడిని అడగవలసిన ముఖ్య ప్రశ్నలు",
    downloadBtn: "నివేదికను డౌన్‌లోడ్ చేయండి",
    retake: "మళ్లీ పరీక్షించండి",
    questions: [
          {
                "key": "unusuallyTired",
                "text": "రాత్రంతా సరిగ్గా నిద్రపోయినప్పటికీ మీరు తరచుగా అలసట లేదా నీరసంగా భావిస్తున్నారా?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "సాధారణ ఆహారపు అలవాట్లు ఉన్నప్పటికీ అకస్మాత్తుగా బరువు పెరగడం లేదా తగ్గడం గమనించారా?"
          },
          {
                "key": "hairThinning",
                "text": "ఇటీవల జుట్టు పలచబడటం, పొడిబారడం లేదా అధికంగా రాలడం గమనించారా?"
          },
          {
                "key": "temperatureSensitivity",
                "text": "మీ చుట్టూ ఉన్న వ్యక్తులతో పోలిస్తే మీకు చలి లేదా వేడిని భరించే శక్తి తక్కువగా ఉందా?"
          },
          {
                "key": "periodChanges",
                "text": "మీ పీరియడ్స్ చక్రంలో మార్పులు (ఎక్కువ లేదా తక్కువ రక్తస్రావం, క్రమరహిత పీరియడ్స్) గమనించారా?"
          },
          {
                "key": "sleepChanges",
                "text": "నిద్రలేమి లేదా నిద్ర పట్టడంలో నిరంతర ఇబ్బందులను ఎదుర్కొంటున్నారా?"
          },
          {
                "key": "heartRateChanges",
                "text": "గుండె దడ లేదా చాలా నెమ్మదిగా/వేగంగా గుండె కొట్టుకోవడం గమనించారా?"
          },
          {
                "key": "moodChanges",
                "text": "మూడ్ స్వింగ్స్, చికాకు లేదా ఏకాగ్రత లేకపోవడం (బ్రెయిన్ ఫాగ్) ఉందా?"
          }
    ],
    symptoms: {
          "unusuallyTired": "నిరంతర అలసట / శక్తి లోపం",
          "unexplainedWeightChange": "అస్పష్టమైన బరువు మార్పులు",
          "hairThinning": "జుట్టు పలచబడటం లేదా రాలడం",
          "temperatureSensitivity": "చలి లేదా వేడిని భరించలేకపోవడం",
          "periodChanges": "పీరియడ్స్ క్రమరాహిత్యం",
          "sleepChanges": "నిద్రలేమి లేదా నిద్రలేమి సమస్యలు",
          "heartRateChanges": "గుండె దడ / పల్స్ హెచ్చుతగ్గులు",
          "moodChanges": "చికాకు లేదా మానసిక గందరగోళం"
    },
    defaultDiet: [
          "సేంద్రీయ సెలీనియం: రోజుకు 2-3 బ్రెజిల్ నట్స్ తీసుకోవడం వల్ల T4 హార్మోన్ క్రియాశీల T3గా మారడానికి తోడ్పడుతుంది.",
          "జింక్ & అయోడిన్ సమతుల్యత: అయోడైజ్డ్ ఉప్పు మరియు గుమ్మడికాయ గింజలు థైరాయిడ్ హార్మోన్ ఉత్పత్తికి మేలు చేస్తాయి.",
          "కూరగాయలను ఉడికించి తినండి: బ్రకోలీ, కాలీఫ్లవర్‌లను తేలికగా ఆవిరిపై ఉడికించి తినడం వల్ల గోయిట్రోజెన్‌లు తొలగిపోతాయి."
    ],
    defaultLifestyle: [
          "సీరం ఫెర్రిటిన్ స్థాయిలు: రక్తంలో ఐరన్ నిల్వలు 50 ng/mL కంటే తక్కువ ఉంటే థైరాయిడ్ అలసట మరియు జుట్టు రాలడం పెరుగుతుంది.",
          "ఉదయపు ఎండ: ఉదయం 10-15 నిమిషాల ఎండ మెదడులోని థైరాయిడ్ నియంత్రణ విభాగాన్ని క్రమబద్ధీకరిస్తుంది.",
          "ఒత్తిడి నియంత్రణ: అధిక ఒత్తిడి కార్టిసాల్ T4 నుండి T3 మార్పిడిని అడ్డుకుంటుంది; ప్రశాంతమైన విశ్రాంతి అవసరం."
    ],
    defaultTests: [
          "పూర్తి థైరాయిడ్ ప్రొఫైల్: కేవలం TSH కాకుండా Free T3 మరియు Free T4 కూడా పరీక్షించాలి",
          "థైరాయిడ్ యాంటీబాడీస్: Anti-TPO మరియు Anti-TG (హాషిమోటోస్ ఆటో ఇమ్యూన్ తనిఖీకి)",
          "సీరం ఫెర్రిటిన్, ఐరన్ సాచురేషన్, విటమిన్ D3 మరియు B12 స్థాయిలు"
    ],
    defaultDoctorQ: [
          "1. కేవలం TSH మాత్రమే కాకుండా Free T3 మరియు Free T4లను కూడా పరీక్షించవచ్చా?",
          "2. నా అలసట T4 హార్మోన్ T3గా మారడంలో లోపం వల్ల కావచ్చా?",
          "3. ఐరన్ (ఫెర్రిటిన్) లేదా విటమిన్ లోపం నా థైరాయిడ్ లక్షణాలను పెంచుతోందా?"
    ],
  },
  ml: {
    badge: "തൈറോയ്ഡ് ആരോഗ്യം",
    title: "തൈറോയ്ഡ് ആരോഗ്യ ബോധവൽക്കരണ പരിശോധന",
    subtitle: "തൈറോയ്ഡ് പ്രവർത്തനവുമായി ബന്ധപ്പെട്ട ലക്ഷണങ്ങൾ വിലയിരുത്തി ശാസ്ത്രീയവും ചികിത്സാപരവുമായ മാർഗ്ഗനിർദ്ദേശങ്ങൾ നേടുക.",
    stepText: (cur, total) => `ചോദ്യം ${cur} / ${total}`,
    completed: "പൂർത്തിയായി",
    yes: "അതെ",
    sometimes: "ചിലപ്പോൾ",
    no: "അല്ല",
    back: "← മുൻപത്തെ ചോദ്യത്തിലേക്ക് മടങ്ങുക",
    summaryTitle: "തൈറോയ്ഡ് ക്ലിനിക്കൽ റിപ്പോർട്ടും നിർദ്ദേശങ്ങളും",
    summarySub: "ഉത്തരങ്ങൾ വിശകലനം ചെയ്ത് നിങ്ങളുടെ ആരോഗ്യ പ്രൊഫൈലിൽ സുരക്ഷിതമാക്കിയിരിക്കുന്നു.",
    reportedTitle: (n) => `രേഖപ്പെടുത്തിയ ലക്ഷണങ്ങൾ (${n}):`,
    noSymptoms: "ഈ ചോദ്യാവലിയിൽ കാര്യമായ തൈറോയ്ഡ് ലക്ഷണങ്ങളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.",
    clinicalNotice: "“ഹൈപ്പോതൈറോയിഡിസം, ഹൈപ്പർതൈറോയിഡിസം എന്നിവയ്ക്ക് വ്യത്യസ്ത ലക്ഷണങ്ങളുണ്ട്. കൃത്യമായ രോഗനിർണ്ണയത്തിന് TSH, Free T3, Free T4 രക്തപരിശോധന അത്യാവശ്യമാണ്.”",
    scoreLabel: "പാറ്റേൺ സാധ്യത നിരക്ക്:",
    severitySignificant: "കാര്യമായ തൈറോയ്ഡ് വ്യതിയാനം (Significant)",
    severityModerate: "മിതമായ മെറ്റബോളിക് ലക്ഷണങ്ങൾ",
    severityMild: "നേരിയ വ്യതിയാനങ്ങൾ",
    dietTitle: "🥗 മൈക്രോ ന്യൂട്രിയന്റ് & തൈറോയ്ഡ് ഭക്ഷണക്രമം",
    lifestyleTitle: "🦋 ഊർജ്ജ നില, താപനില നിയന്ത്രണം & സ്ട്രെസ് മാനേജ്‌മെന്റ്",
    testsTitle: "🩺 സമഗ്ര തൈറോയ്ഡ് രക്തപരിശോധനകൾ",
    questionsTitle: "📋 ഡോക്ടറോട് ചോദിക്കേണ്ട പ്രധാന ചോദ്യങ്ങൾ",
    downloadBtn: "റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",
    retake: "വീണ്ടും പരിശോധിക്കുക",
    questions: [
          {
                "key": "unusuallyTired",
                "text": "രാത്രി നന്നായി ഉറങ്ങിയതിനുശേഷവും നിങ്ങൾക്ക് കഠിനമായ ക്ഷീണവും തളർച്ചയും അനുഭവപ്പെടുന്നുണ്ടോ?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "സാധാരണ ഭക്ഷണരീതിയായിരുന്നിട്ടും അപ്രതീക്ഷിതമായി ശരീരഭാരം കൂടുകയോ കുറയുകയോ ചെയ്തിട്ടുണ്ടോ?"
          },
          {
                "key": "hairThinning",
                "text": "അടുത്തിടെ മുടി കൊഴിച്ചിലോ മുടി നേർത്തുപോകുന്നതോ ശ്രദ്ധയിൽപ്പെട്ടിട്ടുണ്ടോ?"
          },
          {
                "key": "temperatureSensitivity",
                "text": "മറ്റുള്ളവരെ അപേക്ഷിച്ച് നിങ്ങൾക്ക് അമിതമായ തണുപ്പോ ചൂടോ സഹിക്കാൻ ബുദ്ധിമുട്ടുണ്ടോ?"
          },
          {
                "key": "periodChanges",
                "text": "ആർത്തവചക്രത്തിൽ വ്യതിയാനങ്ങൾ (കൂടുതൽ രക്തസ്രാവം, കുറവ് അല്ലെങ്കിൽ ക്രമക്കേടുകൾ) ഉണ്ടോ?"
          },
          {
                "key": "sleepChanges",
                "text": "ഉറക്കമില്ലായ്മയോ ഉറക്കരീതിയിൽ തുടർച്ചയായ മാറ്റങ്ങളോ അനുഭവപ്പെടുന്നുണ്ടോ?"
          },
          {
                "key": "heartRateChanges",
                "text": "നെഞ്ചിടിപ്പ് കൂടുകയോ വളരെ സാവധാനത്തിലോ വേഗത്തിലോ ഉള്ള നാഡിമിടിപ്പ് ഉണ്ടോ?"
          },
          {
                "key": "moodChanges",
                "text": "മൂഡ് മാറ്റങ്ങൾ, അസ്വസ്ഥത, അല്ലെങ്കിൽ ഓർമ്മക്കുറവ് (ബ്രെയിൻ ഫോഗ്) ഉണ്ടോ?"
          }
    ],
    symptoms: {
          "unusuallyTired": "തുടർച്ചയായ ക്ഷീണം / ഊർജ്ജക്കുറവ്",
          "unexplainedWeightChange": "കാരണമില്ലാത്ത ഭാര വ്യതിയാനങ്ങൾ",
          "hairThinning": "മുടി കൊഴിച്ചിൽ / മുടി നേർത്തുപോകൽ",
          "temperatureSensitivity": "തണുപ്പോ ചൂടോ സഹിക്കാനുള്ള ബുദ്ധിമുട്ട്",
          "periodChanges": "ക്രമരഹിതമായ ആർത്തവം",
          "sleepChanges": "ഉറക്കമില്ലായ്മ അല്ലെങ്കിൽ ഉറക്ക തകരാറുകൾ",
          "heartRateChanges": "നെഞ്ചിടിപ്പ് / നാഡിമിടിപ്പിലെ വ്യതിയാനങ്ങൾ",
          "moodChanges": "മാനസിക അസ്വസ്ഥത അല്ലെങ്കിൽ ഓർമ്മക്കുറവ്"
    },
    defaultDiet: [
          "സെലിനിയം അടങ്ങിയ ഭക്ഷണം: ദിവസവും 2-3 ബ്രസീൽ നട്സ് കഴിക്കുന്നത് T4 നെ സജീവ T3 ആക്കി മാറ്റാൻ സഹായിക്കുന്നു.",
          "സിങ്കും അയോഡിനും: അയഡിൻ ഉപ്പും മത്തങ്ങ വിത്തുകളും തൈറോയ്ഡ് ഹോർമോൺ ഉൽപ്പാദനത്തിന് അത്യാവശ്യമാണ്.",
          "പച്ചക്കറികൾ വേവിച്ച് കഴിക്കുക: കോളിഫ്ലവർ, കാബേജ് തുടങ്ങിയവ ലഘുവായി ആവിയിൽ വേവിച്ച് കഴിക്കുന്നത് തൈറോയ്ഡിന് നല്ലതാണ്."
    ],
    defaultLifestyle: [
          "സീറം ഫെറിറ്റിൻ പരിശോധന: രക്തത്തിലെ ഇരുമ്പിന്റെ അളവ് 50 ng/mL-ൽ കുറവാണെങ്കിൽ തൈറോയ്ഡ് ക്ഷീണവും മുടികൊഴിച്ചിലും കൂടും.",
          "രാവിലത്തെ വെയിൽ: രാവിലെ 10-15 മിനിറ്റ് സൂര്യപ്രകാശം കൊള്ളുന്നത് തൈറോയ്ഡ് സിസ്റ്റത്തെ ഉത്തേജിപ്പിക്കും.",
          "സ്ട്രെസ് കുറയ്ക്കുക: കടുത്ത മാനസിക സമ്മർദ്ദം തൈറോയ്ഡ് പ്രവർത്തനത്തെ ബാധിക്കും; നല്ല ഉറക്കം ഉറപ്പാക്കുക."
    ],
    defaultTests: [
          "പൂർണ്ണ തൈറോയ്ഡ് പ്രൊഫൈൽ: TSH കൂടാതെ Free T3, Free T4 എന്നിവയും പരിശോധിക്കുക",
          "തൈറോയ്ഡ് ആന്റിബോഡികൾ: Anti-TPO, Anti-TG പരിശോധനകൾ",
          "ഫെറിറ്റിൻ, വിറ്റാമിൻ D3, B12 അളവുകൾ"
    ],
    defaultDoctorQ: [
          "1. TSH നൊപ്പം Free T3, Free T4 എന്നിവ കൂടി പരിശോധിക്കാമോ?",
          "2. എന്റെ ക്ഷീണം തൈറോയ്ഡ് ഹോർമോൺ മാറ്റത്തിന്റെ പ്രശ്നമാണോ?",
          "3. ഇരുമ്പിന്റെയോ വിറ്റാമിന്റെയോ കുറവ് ഈ ലക്ഷണങ്ങൾക്ക് കാരണമാകുന്നുണ്ടോ?"
    ],
  },
  mr: {
    badge: "अंतःस्रावी (थायरॉईड) आरोग्य",
    title: "थायरॉईड आरोग्य जागरूकता तपासणी",
    subtitle: "थायरॉईडच्या कार्याशी संबंधित लक्षणांचे मूल्यांकन करा आणि वैज्ञानिक वैद्यकीय व जीवनशैली मार्गदर्शन मिळवा.",
    stepText: (cur, total) => `प्रश्न ${cur} पैकी ${total}`,
    completed: "पूर्ण झाले",
    yes: "होय",
    sometimes: "कधीकधी",
    no: "नाही",
    back: "← मागील प्रश्नाकडे परत जा",
    summaryTitle: "थायरॉईड वैद्यकीय निष्कर्ष व शिफारसी",
    summarySub: "प्रश्नावलीचे विश्लेषण करून वैयक्तिक सल्ल्यांसह प्रोफाइलमध्ये नोंद केली गेली.",
    reportedTitle: (n) => `नोंदवलेली लक्षणे (${n}):`,
    noSymptoms: "या तपासणीत कोणतीही गंभीर थायरॉईड लक्षणे आढळली नाहीत.",
    clinicalNotice: "“हायपोथायरॉईडीझम आणि हायपरथायरॉईडीझमची लक्षणे वेगवेगळी असतात. अचूक निदानासाठी डॉक्टरांच्या सल्ल्याने TSH, Free T3 व Free T4 रक्त चाचणी आवश्यक आहे.”",
    scoreLabel: "पॅटर्न शक्यता दर:",
    severitySignificant: "गंभीर थायरॉईड असंतुलन (Significant)",
    severityModerate: "मध्यम चयापचय व संप्रेरक लक्षणे",
    severityMild: "किरकोळ लक्षणे",
    dietTitle: "🥗 सूक्ष्म पोषक घटक व थायरॉईड आहार योजना",
    lifestyleTitle: "🦋 ऊर्जा, तापमान संतुलन व ताण नियंत्रण",
    testsTitle: "🩺 आवश्यक संपूर्ण थायरॉईड रक्त चाचण्या",
    questionsTitle: "📋 डॉक्टरांना विचारण्यासाठी ३ महत्त्वाचे प्रश्न",
    downloadBtn: "वैद्यकीय अहवाल डाउनलोड करा",
    retake: "पुन्हा चाचणी घ्या",
    questions: [
          {
                "key": "unusuallyTired",
                "text": "रात्रभर पुरेशी झोप घेऊनही तुम्हाला नेहमी असामान्य थकवा किंवा अशक्तपणा जाणवतो का?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "सामान्य खाण्यापिण्यानंतरही वजनात अचानक वाढ किंवा घट झाल्याचे आढळले आहे का?"
          },
          {
                "key": "hairThinning",
                "text": "अलीकडे केस पातळ होणे, कोरडे पडणे किंवा अतिप्रमाणात गळणे जाणवले आहे का?"
          },
          {
                "key": "temperatureSensitivity",
                "text": "इतर लोकांच्या तुलनेत तुम्हाला थंडी किंवा उष्णता सहन करणे खूप कठीण जाते का?"
          },
          {
                "key": "periodChanges",
                "text": "मासिक पाळीच्या चक्रात काही बदल (जास्त, कमी किंवा अनियमित रक्तस्राव) जाणवले आहेत का?"
          },
          {
                "key": "sleepChanges",
                "text": "तुम्हाला झोपेच्या तक्रारी किंवा निद्रानाशाची समस्या सतत जाणवते का?"
          },
          {
                "key": "heartRateChanges",
                "text": "हृदयाची धडधड वाढणे किंवा नाडीचे ठोके असामान्यपणे मंद/जलद झाल्याचे जाणवले का?"
          },
          {
                "key": "moodChanges",
                "text": "वारंवार चिडचिड होणे, मूड बदलणे किंवा एकाग्रतेचा अभाव (ब्रेन फॉग) जाणवतो का?"
          }
    ],
    symptoms: {
          "unusuallyTired": "सतत थकवा आणि अशक्तपणा",
          "unexplainedWeightChange": "अस्पष्ट वजन बदल",
          "hairThinning": "केस गळणे किंवा पातळ होणे",
          "temperatureSensitivity": "थंडी किंवा उष्णतेची अतिसंवेदनशीलता",
          "periodChanges": "मासिक पाळीतील अनियमितता",
          "sleepChanges": "निद्रानाश किंवा झोपेचे विकार",
          "heartRateChanges": "हृदयाचे ठोके अचानक बदलणे",
          "moodChanges": "चिडचिड किंवा मानसिक थकवा"
    },
    defaultDiet: [
          "सेंद्रिय सेलेनियम: रोज २-३ ब्राझील नट्स खाल्ल्याने निष्क्रिय T4 चे रूपांतर सक्रिय T3 संप्रेरकात होण्यास मदत होते.",
          "झिंक आणि आयोडीन: संतुलित आयोडीनयुक्त मीठ आणि भोपळ्याच्या बिया थायरॉईड संप्रेरक निर्मितीसाठी उत्तम आहेत.",
          "भाज्या शिजवून खा: ब्रोकोली, फ्लॉवर हलके वाफवून खाल्ल्याने त्यातील गॉयट्रोजेन्स निष्क्रिय होतात."
    ],
    defaultLifestyle: [
          "सीरम फेरिटिन चाचणी: शरीरात लोहाचे प्रमाण ५० ng/mL पेक्षा कमी असल्यास थायरॉईड थकवा आणि केस गळती वाढू शकते.",
          "सकाळचा सूर्यप्रकाश: सकाळी १०-१५ मिनिटे कोवळ्या उन्हात थांबल्याने थायरॉईड ग्रंथीचे कार्य सुधारते.",
          "ताणतणाव नियंत्रण: अति ताणामुळे T4 चे T3 मध्ये रूपांतर होण्यास अडथळा येतो; गाढ झोप घेणे आवश्यक आहे."
    ],
    defaultTests: [
          "संपूर्ण थायरॉईड प्रोफाइल: केवळ TSH नव्हे तर Free T3 आणि Free T4 चाचणी",
          "थायरॉईड अँटीबॉडीज: Anti-TPO आणि Anti-TG (हाशिमोटो आजार तपासणीसाठी)",
          "सीरम फेरिटिन, व्हिटॅमिन D3 आणि B12 पातळी"
    ],
    defaultDoctorQ: [
          "1. TSH सोबत Free T3 आणि Free T4 ची देखील चाचणी करणे योग्य राहील का?",
          "2. माझ्या थकव्याचे कारण T4 चे T3 मध्ये कमी रूपांतर असण्याची शक्यता आहे का?",
          "3. लोह किंवा व्हिटॅमिनच्या कमतरतेमुळे ही लक्षणे उद्भवत आहेत का?"
    ],
  },
  mwr: {
    badge: "थायरॉयड रो स्वास्थ्य",
    title: "थायरॉयड स्वास्थ्य जागरूकता जाँच",
    subtitle: "थायरॉयड री तकलीफां रा लच्छणां री जाँच करो अर डॉक्टर अर खान-पान री सही सलाह पाओ।",
    stepText: (cur, total) => `सवाल ${cur} / ${total}`,
    completed: "पूरो हो गयो",
    yes: "हाँ",
    sometimes: "कदे-कदे",
    no: "ना",
    back: "← पाछले सवाल पे जाओ",
    summaryTitle: "थायरॉयड जाँच री रिपोर्ट अर सलाह",
    summarySub: "थांरा जबाव देख’र सलाह प्रोफाइल में लिख दी गयी है।",
    reportedTitle: (n) => `दिख्या लच्छण (${n}):`,
    noSymptoms: "कोई घणी थायरॉयड री तकलीफ कोनी दिखी।",
    clinicalNotice: "“थायरॉयड री तकलीफां में खून री जाँच (TSH, Free T3, Free T4) करवाणी घणी जरूरी है।”",
    scoreLabel: "तकलीफ री संभावना:",
    severitySignificant: "थायरॉयड रो बडो असर (Significant)",
    severityModerate: "मध्यम असर",
    severityMild: "हल्का लच्छण",
    dietTitle: "🥗 खाणो-पीणो अर थायरॉयड पोषण",
    lifestyleTitle: "🦋 फुर्ती, तापमान अर तनाव नियंत्रण",
    testsTitle: "🩺 डॉक्टर सूँ करबा री खून जाँच",
    questionsTitle: "📋 डॉक्टर सा’ब सूँ पूछबा रा ३ मुख्य सवाल",
    downloadBtn: "जाँच रिपोर्ट डाउनलोड करो",
    retake: "पाछी जाँच करो",
    questions: [
          {
                "key": "unusuallyTired",
                "text": "कांई पूरी रात सोबा के बाद भी थांने घणी थकान या कमजोरी लागे?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "कांई बिना कोई खास वजह थांरो वजन घणो बढ़ या घट रह्यो है?"
          },
          {
                "key": "hairThinning",
                "text": "कांई थांरा सिर रा बाल घणा झड़ रह्या है या पतळा हो रह्या है?"
          },
          {
                "key": "temperatureSensitivity",
                "text": "कांई थांने दूजा लोगां सूँ बेसी सीळ (ठंड) या लू (गरमी) लागे?"
          },
          {
                "key": "periodChanges",
                "text": "कांई म्हैनो (पीरियड्स) आवण में गड़बड़ या घट-बढ़ हो रही है?"
          },
          {
                "key": "sleepChanges",
                "text": "कांई नींद आवण में तकलीफ़ या नींद उड़बा री शिकायत है?"
          },
          {
                "key": "heartRateChanges",
                "text": "कांई कालजो घणो धड़क्यो या धड़कन धीमी-तेज लागे?"
          },
          {
                "key": "moodChanges",
                "text": "कांई चिड़चिड़ापण, याददाश्त में कमी या मन भारी-भारी लागे?"
          }
    ],
    symptoms: {
          "unusuallyTired": "घणी थकान अर कमजोरी",
          "unexplainedWeightChange": "वजन रो घटबो-बढ़बो",
          "hairThinning": "बाळां रो झड़बो या पतळो होबो",
          "temperatureSensitivity": "सीळ या गरमी बेसी लागणी",
          "periodChanges": "म्हैने री गड़बड़ी",
          "sleepChanges": "नींद नीं आवणी",
          "heartRateChanges": "कालजे री धड़कन घटणी-बढ़णी",
          "moodChanges": "चिड़चिड़ो सुभाव अर भारीपण"
    },
    defaultDiet: [
          "सेलेनियम रो सेवन: ब्राजील नट्स सूँ T4 हार्मोन T3 में बदळण में मदद मिले है।",
          "जिंक अर आयोडीन: आयोडीन वाळो लूण अर कद्दू रा बीज थायरॉयड खातर घणा चोखा है।",
          "सब्जी रांध’र खाओ: गोभी अर फूलगोभी ने हलकी उबाल’र खाणी चोखी।"
    ],
    defaultLifestyle: [
          "फेरिटिन रो ध्यान: खून में लोह तत्व (Iron) कम होवे तो थायरॉयड री कमजोरी बढ़े है।",
          "सुबह री धूप: सबारे १०-१५ मिनट धूप लेवो, शरीर में फुर्ती रहवेला।",
          "चिंता मत करो: तनाव कम करो अर रात ने भरपूर नींद लेवो।"
    ],
    defaultTests: [
          "थायरॉयड जाँच: TSH रे सागै Free T3 अर Free T4 री पूरी जाँच करावो",
          "एंटीबॉडी टेस्ट: Anti-TPO अर Anti-TG जाँच",
          "खून में फेरिटिन, विटामिन D3 अर B12"
    ],
    defaultDoctorQ: [
          "1. कांई TSH सागै Free T3 अर Free T4 भी जाँचना चोखा रहसी?",
          "2. कांई म्हारी थकान थायरॉयड री कमी सूँ है?",
          "3. कांई लोहे (Iron) री कमी सूँ लच्छण बढ़ रह्या है?"
    ],
  },
  fr: {
    badge: "Santé Endocrinienne",
    title: "Bilan de Sensibilisation Thyroïdienne",
    subtitle: "Évaluez les symptômes courants liés à la fonction thyroïdienne et bénéficiez de conseils cliniques et nutritionnels fondés sur des preuves.",
    stepText: (cur, total) => `Question ${cur} sur ${total}`,
    completed: "Terminé",
    yes: "Oui",
    sometimes: "Parfois",
    no: "Non",
    back: "← Retour à la question précédente",
    summaryTitle: "Résumé Clinique Thyroïdien & Recommandations",
    summarySub: "Évaluation analysée selon les critères cliniques et enregistrée dans votre dossier de santé.",
    reportedTitle: (n) => `Symptômes et Signes Notés (${n}) :`,
    noSymptoms: "Aucun symptôme significatif de dysfonction thyroïdienne n’a été rapporté.",
    clinicalNotice: "« Les dysfonctionnements thyroïdiens présentent des symptômes variés. Une analyse sanguine (TSH, T3 libre, T4 libre) prescrite par un médecin est indispensable au diagnostic. »",
    scoreLabel: "Probabilité du profil :",
    severitySignificant: "Profil de dysrégulation thyroïdienne significatif",
    severityModerate: "Indicateurs endocriniens et métaboliques modérés",
    severityMild: "Variations légères / normales",
    dietTitle: "🥗 Micronutriments et Alimentation Thérapeutique",
    lifestyleTitle: "🦋 Énergie, Thermorégulation & Gestion du Stress",
    testsTitle: "🩺 Bilan Biologique Thyroïdien Recommandé",
    questionsTitle: "📋 3 Questions Clés pour Votre Médecin / Endocrinologue",
    downloadBtn: "Télécharger le Rapport Médical",
    retake: "Repasser le questionnaire",
    questions: [
          {
                "key": "unusuallyTired",
                "text": "Ressentez-vous une fatigue ou un épuisement inhabituel même après une nuit de sommeil complète ?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "Avez-vous constaté une prise ou une perte de poids inexpliquée malgré une alimentation inchangée ?"
          },
          {
                "key": "hairThinning",
                "text": "Avez-vous remarqué un affinement, une fragilité ou une chute inhabituelle de vos cheveux ?"
          },
          {
                "key": "temperatureSensitivity",
                "text": "Êtes-vous particulièrement sensible au froid ou à la chaleur par rapport à votre entourage ?"
          },
          {
                "key": "periodChanges",
                "text": "Avez-vous constaté des modifications du cycle menstruel (règles plus abondantes, faibles ou irrégulières) ?"
          },
          {
                "key": "sleepChanges",
                "text": "Souffrez-vous de perturbations persistantes du sommeil ou d’insomnie ?"
          },
          {
                "key": "heartRateChanges",
                "text": "Avez-vous ressenti des palpitations inexpliquées ou un pouls anormalement lent ou rapide ?"
          },
          {
                "key": "moodChanges",
                "text": "Remarquez-vous des variations d’humeur, une irritabilité ou un brouillard cérébral persistant ?"
          }
    ],
    symptoms: {
          "unusuallyTired": "Fatigue persistante / manque d’énergie",
          "unexplainedWeightChange": "Fluctuations pondérales inexpliquées",
          "hairThinning": "Perte de cheveux ou affinement capillaire",
          "temperatureSensitivity": "Sensibilité accrue au froid ou à la chaleur",
          "periodChanges": "Irrégularités du cycle menstruel",
          "sleepChanges": "Sommeil perturbé ou insomnie",
          "heartRateChanges": "Palpitations ou variations du rythme cardiaque",
          "moodChanges": "Irritabilité ou brouillard mental"
    },
    defaultDiet: [
          "Sélénium organique : 2-3 noix du Brésil par jour apportent le sélénium indispensable à l’enzyme désiodase qui convertit la T4 en T3 active.",
          "Zinc et iode : Sel iodé modéré et graines de courge soutiennent la synthèse des hormones thyroïdiennes.",
          "Légumes crucifères cuits : Cuire le brocoli et le chou-fleur à la vapeur pour neutraliser les composés goitrogènes."
    ],
    defaultLifestyle: [
          "Surveiller la ferritine sérique : Des réserves de fer faibles (< 50 ng/mL) aggravent la fatigue cellulaire et la perte de cheveux.",
          "Lumière naturelle matinale : 10 à 15 minutes d’exposition le matin synchronisent l’axe hypothalamo-hypophyso-thyroïdien.",
          "Gestion du cortisol : Le stress chronique inhibe la conversion périphérique de T4 en T3 ; privilégiez un sommeil réparateur."
    ],
    defaultTests: [
          "Bilan thyroïdien complet : TSH, T3 libre (FT3) et T4 libre (FT4)",
          "Anticorps antithyroïdiens : Anti-TPO et Anti-TG (dépistage de la thyroïdite d’Hashimoto)",
          "Ferritine sérique, saturation en fer, vitamine D3 et vitamine B12"
    ],
    defaultDoctorQ: [
          "1. Serait-il opportun de doser la T3 libre et la T4 libre en plus de la TSH ?",
          "2. Mes symptômes pourraient-ils être liés à une mauvaise conversion périphérique de T4 en T3 ?",
          "3. Une carence en fer (ferritine) ou en vitamines pourrait-elle aggraver ce tableau clinique ?"
    ],
  },
  ar: {
    badge: "صحة الغدد الصماء",
    title: "فحص التوعية بصحة الغدة الدرقية",
    subtitle: "تقييم الأعراض المرتبطة بوظائف الغدة الدرقية والحصول على إرشادات طبية وغذائية قائمة على الأدلة.",
    stepText: (cur, total) => `السؤال ${cur} من ${total}`,
    completed: "مكتمل",
    yes: "نعم",
    sometimes: "أحياناً",
    no: "لا",
    back: "← العودة للسؤال السابق",
    summaryTitle: "الملخص الطبي والتوصيات لصحة الغدة الدرقية",
    summarySub: "تم تحليل الإجابات وفق معايير الأنماط الدرقية وحفظها في ملفك الصحي.",
    reportedTitle: (n) => `الأعراض والمؤشرات المسجلة (${n}):`,
    noSymptoms: "لم يتم تسجيل أي أعراض واضحة تشير لاضطراب الغدة الدرقية.",
    clinicalNotice: "“تتعدد أعراض اضطرابات الغدة الدرقية. يتطلب التشخيص الدقيق فحص دم يشمل TSH و Free T3 و Free T4 بوصفة طبية.”",
    scoreLabel: "احتمالية النمط:",
    severitySignificant: "نمط اضطراب درقي ملحوظ (Significant)",
    severityModerate: "مؤشرات أيضية وغدية معتدلة",
    severityMild: "تغيرات خفيفة / طبيعية",
    dietTitle: "🥗 المغذيات الدقيقة وخطة التغذية للغدة الدرقية",
    lifestyleTitle: "🦋 الطاقة، تنظيم الحرارة وإدارة التوتر",
    testsTitle: "🩺 الفحوصات المخبرية الشاملة المقترحة",
    questionsTitle: "📋 أسئلة هامة لطبيب الغدد الصماء",
    downloadBtn: "تحميل التقرير الطبي",
    retake: "إعادة الفحص",
    questions: [
          {
                "key": "unusuallyTired",
                "text": "هل تشعرين بتعب أو إرهاق غير معتاد حتى بعد ليلة نوم كاملة؟"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "هل لاحظت زيادة أو نقصاناً غير مبرر في الوزن رغم ثبات عاداتك الغذائية؟"
          },
          {
                "key": "hairThinning",
                "text": "هل لاحظت تساقطاً غير معتاد في الشعر أو تقصفاً ملحوظاً مؤخراً؟"
          },
          {
                "key": "temperatureSensitivity",
                "text": "هل أنت حساسة بشكل غير عادي للبرد أو الحرارة مقارنة بمن حولك؟"
          },
          {
                "key": "periodChanges",
                "text": "هل طرأت تغيرات على دورتك الشهرية (غزارة، خفة، أو عدم انتظام)؟"
          },
          {
                "key": "sleepChanges",
                "text": "هل تلاحظين اضطراباً مستمراً في النوم أو أرقاً متكرراً؟"
          },
          {
                "key": "heartRateChanges",
                "text": "هل عانيت من خفقان غير مبرر في القلب أو تسارع/تباطؤ غير طبيعي في النبض؟"
          },
          {
                "key": "moodChanges",
                "text": "هل تعانين من تقلبات مزاجية مستمرة أو عصبية أو تشوش ذهني (ضبابية الدماغ)؟"
          }
    ],
    symptoms: {
          "unusuallyTired": "إرهاق مستمر / خمول",
          "unexplainedWeightChange": "تقلبات وزن غير مبررة",
          "hairThinning": "تساقط الشعر أو ضعفه",
          "temperatureSensitivity": "حساسية شديدة للبرودة أو الحرارة",
          "periodChanges": "اضطراب الدورة الشهرية",
          "sleepChanges": "أرق أو اضطراب النوم",
          "heartRateChanges": "خفقان أو اضطراب نبضات القلب",
          "moodChanges": "عصبية أو ضبابية الدماغ"
    },
    defaultDiet: [
          "السيلينيوم الطبيعي: تناول 2-3 حبات جوز برازيلي يومياً لدعم الإنزيم الذي يحول هرمون T4 الخامل إلى T3 النشط.",
          "الزنك واليود: الملح المعالج باليود وبذور اليقطين تعزز إنتاج هرمونات الغدة الدرقية.",
          "طهي الخضروات الصليبية: طهي البروكلي والقرنبيط بالبخار يقلل من المواد المثبطة للغدة."
    ],
    defaultLifestyle: [
          "فحص مخزون الحديد (Ferritin): انخفاض مخزون الحديد يفاقم تساقط الشعر والإرهاق المرتبط بالغدة.",
          "التعرض لضوء الصباح: 10-15 دقيقة صباحاً تنظم المحور الهرموني للغدة الدرقية.",
          "خفض التوتر والكورتيزول: التوتر المزمن يعيق تحويل هرمون T4 إلى T3؛ احرصي على نوم عميق."
    ],
    defaultTests: [
          "فحص دم شامل للغدة: TSH و Free T3 و Free T4",
          "الأجسام المضادة للغدة: Anti-TPO و Anti-TG للكشف عن هاشيموتو",
          "مخزون الحديد (Ferritin) وفيتامين D3 وفيتامين B12"
    ],
    defaultDoctorQ: [
          "1. هل يمكننا إجراء تحليل شامل يشمل Free T3 و Free T4 بدلاً من الاكتفاء بـ TSH فقط؟",
          "2. هل يمكن أن يكون التعب ناتجاً عن خلل في تحويل T4 إلى T3؟",
          "3. هل يؤثر نقص الحديد أو الفيتامينات على أعراض الغدة الدرقية لدي؟"
    ],
  },
  lb: {
    badge: "صحة الغدد الصماء",
    title: "فحص التوعية بصحة الغدة الدرقية",
    subtitle: "تقييم الأعراض المرتبطة بنشاط الغدة وإرشادات طبية وغذائية دقيقة وموثوقة.",
    stepText: (cur, total) => `سؤال ${cur} من ${total}`,
    completed: "خلص الفحص",
    yes: "إيه",
    sometimes: "أوقات",
    no: "لأ",
    back: "← رجوع للسؤال اللي قبلو",
    summaryTitle: "الملخص الطبي والتوصيات لصحة الغدة الدرقية",
    summarySub: "تحللت الأجوبة وتسيّفت بملفك الصحي مع نصايح مخصصة.",
    reportedTitle: (n) => `الأعراض المسجلة (${n}):`,
    noSymptoms: "ما تسجّل أي أعراض ملحوظة للغدة الدرقية بهالفحص.",
    clinicalNotice: "“أعراض الغدة بتختلف كتير، والتشخيص الدقيق بيتطلب فحص دم TSH و Free T3 و Free T4 مع الحكيم المختص.”",
    scoreLabel: "احتمالية النمط:",
    severitySignificant: "نمط اضطراب درقي واضح (Significant)",
    severityModerate: "مؤشرات أيضية وغدية متوسطة",
    severityMild: "تغيرات خفيفة / طبيعية",
    dietTitle: "🥗 التغذية والمكملات المناسبة للغدة",
    lifestyleTitle: "🦋 الطاقة، توازن الحرارة وتخفيف الستريس",
    testsTitle: "🩺 الفحوصات المخبرية المطلوبة عند الحكيم",
    questionsTitle: "📋 أهم الأسئلة لتسأليها لطبيب الغدد",
    downloadBtn: "تنزيل التقرير الطبي",
    retake: "إعادة الفحص من جديد",
    questions: [
          {
                "key": "unusuallyTired",
                "text": "بتحسي بتعب وإرهاق زايد حتى بعد ما تنامي ليلة كاملة؟"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "لاحظتي زيادة أو نقصان بالوزن فجأة ومن دون سبب واضح رغم أكلك العادي؟"
          },
          {
                "key": "hairThinning",
                "text": "عم تلاحظي تساقط شعر مش طبيعي أو بهتان وتكسير بشعرك بالفترة الأخيرة؟"
          },
          {
                "key": "temperatureSensitivity",
                "text": "بتحسي ببرودة أو شوب زيادة عن كل اللي حواليكي؟"
          },
          {
                "key": "periodChanges",
                "text": "صار في تغيرات بالدورة الشهرية عندك (دم كتير، خفيف، أو مش منتظمة)؟"
          },
          {
                "key": "sleepChanges",
                "text": "عم تعاني من أرق أو مشاكل مستمرة بالنوم؟"
          },
          {
                "key": "heartRateChanges",
                "text": "حسيتي بدقات قلب سريعة فجأة أو خفقان مش مبرر؟"
          },
          {
                "key": "moodChanges",
                "text": "عم تحسي بتعصيب، تغير بالمزاج، أو غباش بالتفكير والتركيز؟"
          }
    ],
    symptoms: {
          "unusuallyTired": "تعب مستمر وإرهاق",
          "unexplainedWeightChange": "تغير مفاجئ بالوزن",
          "hairThinning": "تساقط الشعر وضعفه",
          "temperatureSensitivity": "حساسية للبرد أو الشوب",
          "periodChanges": "لخبطة بالدورة الشهرية",
          "sleepChanges": "أرق ومشاكل بالنوم",
          "heartRateChanges": "خفقان أو تسارع بدقات القلب",
          "moodChanges": "عصبية وتشتت بالتركيز"
    },
    defaultDiet: [
          "سيلينيوم طبيعي: حبتين جوز برازيلي باليوم بتساعد تحويل هرمون T4 لـ T3 النشط.",
          "زنك ويود: ملح معالج باليود وبزر اليقطين مفيدين لإنتاج هرمونات الغدة.",
          "سلق الخضار الصليبية: طبخ البروكلي والزهرة عالبخار بخفف تأثير المواد المثبطة."
    ],
    defaultLifestyle: [
          "فحص مخزون الحديد (Ferritin): نقص الحديد بيعمل تعب وتساقط شعر بيشبه عوارض الغدة.",
          "شمس الصباح: ربع ساعة كل يوم الصبح بتساعد بتنظيم نشاط الغدة الطبيعي.",
          "تخفيف الستريس: القلق والتوتر بيأثروا ع تحويل الهرمونات؛ اهتمي بنومك منيح."
    ],
    defaultTests: [
          "فحص شامل للغدة: TSH و Free T3 و Free T4",
          "فحص مضادات الغدة: Anti-TPO و Anti-TG",
          "فحص مخزون الحديد وفيتامين D3 وفيتامين B12"
    ],
    defaultDoctorQ: [
          "1. فينا نفحص Free T3 و Free T4 مع TSH لنشوف الصورة كاملة؟",
          "2. هل التعب اللي عندي ممكن يكون من صعوبة تحويل T4 لـ T3؟",
          "3. هل نقص الفيريتين أو الفيتامينات عم يزيد هالأعراض؟"
    ],
  }
};

export default function ThyroidCheck() {
  const { language } = useLanguage();
  const dict = THYROID_DATA[language] || THYROID_DATA.en;
  const questions = dict.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectOption = (val) => {
    const currentKey = questions[currentIndex].key;
    const updated = { ...answers, [currentKey]: val };
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitAssessment(updated);
    }
  };

  const submitAssessment = async (finalAnswers) => {
    setLoading(true);
    let backendSuccess = false;

    try {
      const res = await api.post('/assessments/thyroid', { answers: finalAnswers });
      if (res.success && res.assessment) {
        setResult(res.assessment);
        backendSuccess = true;
      }
    } catch (err) {
      console.warn('API sync notice, utilizing client evaluation engine:', err.message);
    } finally {
      setLoading(false);
    }

    if (!backendSuccess) {
      let score = 0;
      const reported = [];
      for (const [key, val] of Object.entries(finalAnswers)) {
        if (val === 'Yes') {
          score += 2;
          reported.push(dict.symptoms[key] || key);
        } else if (val === 'Sometimes') {
          score += 1;
          reported.push(`${dict.symptoms[key] || key} (${dict.sometimes})`);
        }
      }
      const prob = Math.round((score / 16) * 100);
      const severity = score >= 10 ? 'Significant' : score >= 5 ? 'Moderate' : 'Mild';

      setResult({
        answers: finalAnswers,
        score,
        probabilityPercentage: prob,
        severityIndicator: severity,
        reportedSymptoms: reported,
        summaryText: dict.clinicalNotice,
        suggestions: dict.defaultLifestyle,
        dietaryAdvice: dict.defaultDiet,
        lifestyleAdvice: dict.defaultLifestyle,
        clinicalTests: dict.defaultTests,
        doctorQuestions: dict.defaultDoctorQ
      });
    }
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
  };

  const downloadReport = () => {
    if (!result) return;
    const reportText = `=== FEMTECH THYROID HEALTH AWARENESS REPORT ===\n` +
      `Date: ${new Date().toLocaleDateString()}\n` +
      `Pattern Likelihood: ${result.probabilityPercentage || 50}% (${result.severityIndicator || 'Evaluated'})\n\n` +
      `REPORTED SYMPTOMS:\n` +
      `${(result.reportedSymptoms || []).map(s => `- ${s}`).join('\n')}\n\n` +
      `NUTRITIONAL BLUEPRINT:\n` +
      `${(result.dietaryAdvice || dict.defaultDiet).map(d => `- ${d}`).join('\n')}\n\n` +
      `ENERGY & THERMAL STRATEGIES:\n` +
      `${(result.lifestyleAdvice || dict.defaultLifestyle).map(l => `- ${l}`).join('\n')}\n\n` +
      `RECOMMENDED LAB TESTS FOR PHYSICIAN:\n` +
      `${(result.clinicalTests || dict.defaultTests).map(t => `- ${t}`).join('\n')}\n\n` +
      `KEY QUESTIONS FOR DOCTOR:\n` +
      `${(result.doctorQuestions || dict.defaultDoctorQ).map(q => `- ${q}`).join('\n')}\n\n` +
      `Disclaimer: FemTech is an educational health platform and does not replace medical diagnosis.\n`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FemTech_Thyroid_Summary_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const localizedSymptoms = [];
  if (result) {
    for (const [k, v] of Object.entries(answers)) {
      if (v === 'Yes') {
        localizedSymptoms.push(dict.symptoms[k] || k);
      } else if (v === 'Sometimes') {
        localizedSymptoms.push(`${dict.symptoms[k] || k} (${dict.sometimes})`);
      }
    }
  }

  const probPercent = result?.probabilityPercentage ?? Math.round(((result?.score || 0) / 16) * 100);
  const severityText =
    probPercent >= 60
      ? (dict.severitySignificant || 'Significant')
      : probPercent >= 30
      ? (dict.severityModerate || 'Moderate')
      : (dict.severityMild || 'Mild');

  const severityColor = probPercent >= 60 ? '#e11d48' : probPercent >= 30 ? '#ea580c' : '#16a34a';
  const severityBg = probPercent >= 60 ? '#ffe4e6' : probPercent >= 30 ? '#ffedd5' : '#dcfce7';

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fff0f5 0%, #fdf2f8 50%, #eff6ff 100%)',
        marginBottom: '24px',
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
            🦋
          </div>
          <div>
            <span className="badge badge-pink" style={{ marginBottom: '4px' }}>
              {dict.badge}
            </span>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--navy-dark)' }}>
              {dict.title}
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {dict.subtitle}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBanner />

      {!result ? (
        /* QUESTION STEPPER */
        <div className="glass-card" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', background: 'white' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span>{dict.stepText(currentIndex + 1, questions.length)}</span>
              <span>{progress}% {dict.completed}</span>
            </div>
            <div style={{ height: '8px', background: 'var(--pink-100)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--rose-gradient)', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.28rem', color: 'var(--navy-dark)', lineHeight: '1.4' }}>
              {questions[currentIndex]?.text}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            {[
              { val: 'Yes', label: dict.yes },
              { val: 'Sometimes', label: dict.sometimes },
              { val: 'No', label: dict.no }
            ].map((option) => (
              <button
                key={option.val}
                onClick={() => handleSelectOption(option.val)}
                className="btn-secondary"
                style={{
                  padding: '14px 20px',
                  justifyContent: 'space-between',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'white',
                  borderColor: 'var(--pink-200)',
                  cursor: 'pointer'
                }}
              >
                <span>{option.label}</span>
                <ArrowRight size={18} color="var(--rose-primary)" />
              </button>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              style={{
                marginTop: '18px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {dict.back}
            </button>
          )}
        </div>
      ) : (
        /* EXPANSIVE CLINICAL RESULT VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* 1. SCORE & PATTERN LIKELIHOOD HERO CARD */}
          <div className="glass-card" style={{
            padding: '30px',
            borderRadius: 'var(--radius-lg)',
            background: 'white',
            border: `2px solid ${severityColor}`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={36} color={severityColor} />
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-dark)', margin: 0, fontWeight: 800 }}>
                    {dict.summaryTitle}
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {dict.summarySub}
                  </span>
                </div>
              </div>

              {/* Likelihood Pill */}
              <div style={{
                background: severityBg,
                color: severityColor,
                padding: '10px 18px',
                borderRadius: '16px',
                textAlign: 'center',
                border: `1px solid ${severityColor}`
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {dict.scoreLabel}
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1.1 }}>
                  {probPercent}%
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                  {severityText}
                </div>
              </div>
            </div>

            {/* Reported Symptoms Badges */}
            <div style={{ background: '#fdf2f8', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#be123c', marginBottom: '8px' }}>
                {dict.reportedTitle(localizedSymptoms.length)}
              </div>
              {localizedSymptoms.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {localizedSymptoms.map((s, idx) => (
                    <span key={idx} style={{ background: 'white', color: '#881337', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', border: '1px solid #fecdd3', fontWeight: 600 }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {dict.noSymptoms}
                </p>
              )}
            </div>

            {/* Clinical Overview Paragraph */}
            <div style={{ background: '#f8fafc', borderLeft: `4px solid ${severityColor}`, padding: '14px 18px', borderRadius: '0 8px 8px 0', fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.6 }}>
              {language !== 'en' ? dict.clinicalNotice : (result.summaryText || dict.clinicalNotice)}
            </div>
          </div>

          {/* 2. MICRONUTRIENT & THYROID NUTRITION PROTOCOL */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fed7aa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Salad size={24} color="#ea580c" />
              <h3 style={{ fontSize: '1.15rem', color: '#9a3412', margin: 0, fontWeight: 800 }}>
                {dict.dietTitle}
              </h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.88rem', color: '#431407', lineHeight: 1.7 }}>
              {(language !== 'en' && dict.defaultDiet ? dict.defaultDiet : (result.dietaryAdvice?.length > 0 ? result.dietaryAdvice : dict.defaultDiet)).map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 3. ENERGY & THERMAL LIFESTYLE STRATEGIES */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Thermometer size={24} color="#db2777" />
              <h3 style={{ fontSize: '1.15rem', color: '#9d174d', margin: 0, fontWeight: 800 }}>
                {dict.lifestyleTitle}
              </h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.88rem', color: '#701a75', lineHeight: 1.7 }}>
              {(language !== 'en' && dict.defaultLifestyle ? dict.defaultLifestyle : (result.lifestyleAdvice?.length > 0 ? result.lifestyleAdvice : dict.defaultLifestyle)).map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 4. RECOMMENDED DIAGNOSTIC THYROID LAB PANEL */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #bae6fd' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Activity size={24} color="#0284c7" />
              <h3 style={{ fontSize: '1.15rem', color: '#0369a1', margin: 0, fontWeight: 800 }}>
                {dict.testsTitle}
              </h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.88rem', color: '#0c4a6e', lineHeight: 1.7 }}>
              {(language !== 'en' && dict.defaultTests ? dict.defaultTests : (result.clinicalTests?.length > 0 ? result.clinicalTests : dict.defaultTests)).map((item, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 5. 3 KEY QUESTIONS FOR DOCTOR */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #d1fae5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Stethoscope size={24} color="#059669" />
              <h3 style={{ fontSize: '1.15rem', color: '#047857', margin: 0, fontWeight: 800 }}>
                {dict.questionsTitle}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#064e3b' }}>
              {(language !== 'en' && dict.defaultDoctorQ ? dict.defaultDoctorQ : (result.doctorQuestions?.length > 0 ? result.doctorQuestions : dict.defaultDoctorQ)).map((item, idx) => (
                <div key={idx} style={{ background: '#f0fdf4', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS: DOWNLOAD REPORT & RETAKE */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '6px' }}>
            <button
              onClick={downloadReport}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '0.92rem' }}
            >
              <Download size={18} />
              <span>{dict.downloadBtn}</span>
            </button>

            <button
              onClick={resetAssessment}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '0.92rem' }}
            >
              <RotateCcw size={18} />
              <span>{dict.retake}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
