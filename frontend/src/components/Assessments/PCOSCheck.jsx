import React, { useState } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
  FileText,
  Activity,
  Sparkles,
  Stethoscope,
  Salad,
  Dumbbell,
  HelpCircle,
  Download
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const PCOS_DATA = {
  en: {
    badge: 'Hormonal Health',
    title: 'PCOS / PCOD Awareness Check',
    subtitle: 'Evaluate common signs associated with polycystic ovarian syndrome and receive targeted clinical and lifestyle guidance.',
    stepText: (cur, total) => `Question ${cur} of ${total}`,
    completed: 'Completed',
    yes: 'Yes',
    sometimes: 'Sometimes',
    no: 'No',
    back: '← Back to previous question',
    summaryTitle: 'PCOS Clinical Awareness Summary & Suggestions',
    summarySub: 'Questionnaire analyzed against endocrine pattern criteria and saved to your health profile.',
    reportedTitle: (n) => `Reported Symptoms & Indicators (${n}):`,
    noSymptoms: 'No significant PCOS-related patterns were reported in this questionnaire.',
    clinicalNotice: '“These symptoms can have several possible causes. PCOS/PCOD can only be properly evaluated by a qualified healthcare professional.”',
    scoreLabel: 'Pattern Probability:',
    severitySignificant: 'Significant Polycystic Pattern Detected',
    severityModerate: 'Moderate Hormonal & Metabolic Signs',
    severityMild: 'Mild / Low Indicators',
    dietTitle: '🥗 Personalized Nutrition & Insulin Protocol',
    lifestyleTitle: '🌸 Hormonal & Anti-Androgen Lifestyle Strategies',
    testsTitle: '🩺 Recommended Diagnostic Lab Tests for Gynecologist',
    questionsTitle: '📋 4 Key Questions to Ask Your Doctor',
    downloadBtn: 'Download Summary Report',
    retake: 'Retake Assessment',
    questions: [
      { key: 'irregularPeriods', text: 'Are your periods frequently irregular or unpredictable in timing?' },
      { key: 'missedPeriods', text: 'Have you missed periods for two or more consecutive months (when not pregnant)?' },
      { key: 'persistentAcne', text: 'Have you noticed persistent cystic acne, particularly around your jawline, chin, or back?' },
      { key: 'unexplainedWeightChange', text: 'Have you experienced rapid weight gain or difficulty losing weight despite diet and exercise?' },
      { key: 'unusualHairGrowth', text: 'Have you noticed unusual or excessive dark hair growth on your face, chin, chest, or stomach (hirsutism)?' },
      { key: 'hairThinning', text: 'Have you noticed male-pattern hair thinning or excessive hair shedding at the crown of your scalp?' },
      { key: 'moodChanges', text: 'Have you experienced severe mood fluctuations, heightened anxiety, or feelings of depression?' },
      { key: 'cyclePredictDifficulty', text: 'Do you have difficulty predicting when your next cycle will arrive?' }
    ],
    symptoms: {
      irregularPeriods: 'Frequent Menstrual Irregularity',
      missedPeriods: 'Missed or Skipped Periods',
      persistentAcne: 'Persistent Acne or Skin Breakouts',
      unexplainedWeightChange: 'Difficulty Managing Weight / Rapid Gain',
      unusualHairGrowth: 'Hirsutism / Unwanted Body Hair',
      hairThinning: 'Scalp Hair Thinning',
      moodChanges: 'Severe Mood Swings or Fatigue',
      cyclePredictDifficulty: 'Unpredictable Cycle Duration'
    },
    defaultDiet: [
      'Low-Glycemic Load (GL) Nutrition: Prioritize complex carbohydrates with high fiber (lentils, oats, chia seeds, broccoli) to prevent insulin surges that trigger ovarian androgen production.',
      'Protein & Healthy Fat Anchoring: Combine each meal with 25-30g protein (eggs, wild fish, tofu, Greek yogurt) and healthy fats to stabilize postprandial glucose.',
      'Dairy & Sugar Moderation: Minimizing cow dairy and refined sugars lowers insulin and circulating IGF-1, directly alleviating cystic breakouts.'
    ],
    defaultLifestyle: [
      'Organic Spearmint Tea (2 cups daily): Proven in clinical trials to reduce free serum testosterone and soften androgenic facial hair growth.',
      'Myo-Inositol & D-Chiro-Inositol (40:1 Ratio): Helps restore natural ovulatory frequency and improves cellular glucose disposal.',
      'Progressive Resistance Training (2-3x weekly): Muscle contractions activate GLUT-4 glucose transporters independently of insulin.',
      'Magnesium Glycinate (300-400mg before bed): Eases evening cortisol spikes and alleviates pelvic cramp tension during luteal phases.'
    ],
    defaultTests: [
      'Pelvic Ultrasound (assess ovarian volume, stromal thickness, and peripheral follicle ring)',
      'Serum Day-3 LH & FSH Ratio (LH:FSH > 2:1 is suggestive of polycystic dynamics)',
      'Fasting Insulin & Fasting Glucose (HOMA-IR calculation for hidden insulin resistance)',
      'Total & Free Serum Testosterone, DHEA-Sulfate, and 17-OHP (Androgen evaluation)',
      'Lipid Profile & Serum Ferritin (metabolic and cardiovascular baseline screening)'
    ],
    defaultDoctorQ: [
      '1. Based on my symptoms, would you recommend a pelvic ultrasound to examine ovarian morphology and endometrial thickness?',
      '2. Can we evaluate my fasting insulin alongside fasting glucose to calculate my HOMA-IR resistance index?',
      '3. Would a trial of pharmaceutical metformin or myo-inositol (40:1) be best suited for my metabolic profile?',
      '4. What evidence-based anti-androgenic strategies do you recommend for my skin and hair symptoms?'
    ]
  },
  ta: {
    badge: 'ஹார்மோன் நலம்',
    title: 'PCOS / PCOD விழிப்புணர்வு பரிசோதனை',
    subtitle: 'பாலிசிஸ்டிக் ஓவேரியன் சிண்ட்ரோம் தொடர்பான அறிகுறிகளை மதிப்பீடு செய்து விரிவான மருத்துவ மற்றும் வாழ்க்கை முறை ஆலோசனைகளைப் பெறுங்கள்.',
    stepText: (cur, total) => `கேள்வி ${cur} / ${total}`,
    completed: 'முடிந்தது',
    yes: 'ஆம்',
    sometimes: 'சில நேரங்களில்',
    no: 'இல்லை',
    back: '← முந்தைய கேள்விக்குத் திரும்பு',
    summaryTitle: 'PCOS மருத்துவ விழிப்புணர்வு முடிவு & ஆலோசனைகள்',
    summarySub: 'பதில்கள் ஆய்வு செய்யப்பட்டு, தனிப்பயனாக்கப்பட்ட மருத்துவ பரிந்துரைகளுடன் உங்கள் சுயவிவரத்தில் சேமிக்கப்பட்டது.',
    reportedTitle: (n) => `பதிவான அறிகுறிகள் & எச்சரிக்கைகள் (${n}):`,
    noSymptoms: 'குறிப்பிடத்தக்க PCOS அறிகுறிகள் எதுவும் பதிவாகவில்லை.',
    clinicalNotice: '“இந்த அறிகுறிகளுக்குப் பல காரணங்கள் இருக்கலாம். PCOS/PCOD நிலையை தகுதி வாய்ந்த மருத்துவ நிபுணரால் மட்டுமே உறுதிப்படுத்த முடியும்.”',
    scoreLabel: 'PCOS முறைமை நிகழ்தகவு:',
    severitySignificant: 'குறிப்பிடத்தக்க பாலிசிஸ்டிக் இடர் நிலை (Significant)',
    severityModerate: 'மிதமான ஹார்மோன் & மெட்டபாலிச அறிகுறிகள்',
    severityMild: 'குறைந்த / இயல்பான மாறுபாடுகள்',
    dietTitle: '🥗 தனிப்பயனாக்கப்பட்ட உணவு முறை & இன்சுலின் கட்டுப்பாடு',
    lifestyleTitle: '🌸 ஹார்மோன் சமநிலை & வாழ்க்கை முறை வழிகாட்டல்',
    testsTitle: '🩺 மகளிர் மருத்துவரிடம் கோர வேண்டிய மருத்துவப் பரிசோதனைகள்',
    questionsTitle: '📋 மருத்துவரிடம் நீங்கள் கேட்க வேண்டிய 4 முக்கிய கேள்விகள்',
    downloadBtn: 'மருத்துவ சுருக்கத்தைப் பதிவிறக்குக (Report)',
    retake: 'மீண்டும் பரிசோதனை செய்க',
    questions: [
      { key: 'irregularPeriods', text: 'உங்கள் மாதவிடாய் அடிக்கடி ஒழுங்கற்றதாக அல்லது கணிக்க முடியாத இடைவெளியில் வருகிறதா?' },
      { key: 'missedPeriods', text: 'கர்ப்பமாக இல்லாத போதும், தொடர்ந்து இரண்டு அல்லது அதற்கு மேற்பட்ட மாதங்கள் மாதவிடாய் வராமல் இருந்ததா?' },
      { key: 'persistentAcne', text: 'தாடை, கன்னம் அல்லது முதுகில் தொடர்ச்சியான கடுமையான முகப்பருக்கள் தென்படுகிறதா?' },
      { key: 'unexplainedWeightChange', text: 'உணவு கட்டுப்பாடு மற்றும் உடற்பயிற்சி செய்தும் திடீர் எடை அதிகரிப்பு அல்லது எடையைக் குறைக்க இயலாமை உள்ளதா?' },
      { key: 'unusualHairGrowth', text: 'முகம், கன்னம் அல்லது மார்புப் பகுதியில் வழக்கத்திற்கு மாறான தேவையற்ற தடித்த முடிகள் வளர்கிறதா (ஹிர்சுட்டிசம்)?' },
      { key: 'hairThinning', text: 'தலை உச்சியில் முடி மெலிந்து போதல் அல்லது அதிகப்படியான முடி உதிர்தல் ஏற்படுகிறதா?' },
      { key: 'moodChanges', text: 'கடுமையான மனநிலை மாற்றங்கள், பதட்டம் அல்லது மனச்சோர்வை உணர்கிறீர்களா?' },
      { key: 'cyclePredictDifficulty', text: 'அடுத்த மாதவிடாய் எப்போது வரும் என்பதைக் கணிப்பதில் சிரமம் உள்ளதா?' }
    ],
    symptoms: {
      irregularPeriods: 'அடிக்கடி ஒழுங்கற்ற மாதவிடாய்',
      missedPeriods: 'தவறிய மாதவிடாய் சுழற்சிகள்',
      persistentAcne: 'தொடர்ச்சியான கடுமையான முகப்பருக்கள்',
      unexplainedWeightChange: 'திடீர் எடை அதிகரிப்பு / எடையைக் குறைக்க இயலாமை',
      unusualHairGrowth: 'ஹிர்சுட்டிசம் (தேவையற்ற தடித்த முடி வளர்ச்சி)',
      hairThinning: 'தலைமுடி மெலிந்து போதல் / உதிர்தல்',
      moodChanges: 'கடுமையான மனநிலை மாற்றங்கள் / சோர்வு',
      cyclePredictDifficulty: 'கணிக்க முடியாத சுழற்சி இடைவெளி'
    },
    defaultDiet: [
      'குறைந்த கிளைசெமிக் உணவுகள்: நார்ச்சத்து நிறைந்த தானியங்கள் (தினை, ஓட்ஸ், பாசிப்பயறு) இரத்த சர்க்கரை மற்றும் இன்சுலின் உயர்வைத் தடுத்து, அதிகப்படியான ஆண் ஹார்மோன் சுரப்பைத் தடுக்கின்றன.',
      'புரதம் & ஆரோக்கியமான கொழுப்புகள்: காலை உணவில் 25-30 கிராம் புரதம் (முட்டை, முளைகட்டிய பயறு, பாதாம்) உட்கொள்வது நாள் முழுவதும் இன்சுலின் அளவை சீராக வைத்திருக்கும்.',
      'பால் மற்றும் சர்க்கரை கட்டுப்பாடு: 4 வாரங்களுக்கு இனிப்புகள் மற்றும் பசும்பால் பயன்பாட்டைக் குறைப்பது முகப்பரு தீவிரத்தைக் குறைக்கும்.'
    ],
    defaultLifestyle: [
      'ஸ்பியர்மிண்ட் டீ (புதினா தேநீர்): தினமும் 2 வேளை அருந்துவது இலவச டெஸ்டோஸ்டிரோன் அளவைக் குறைத்து, தேவையற்ற முடி வளர்ச்சியைத் தடுக்க மருத்துவ ரீதியாக நிரூபிக்கப்பட்டுள்ளது.',
      'மயோ-இனோசிட்டால் & டி-சிரோ-இனோசிட்டால் (40:1 விகிதம்): அண்டவிடுப்பை சீராக்கவும், கருமுட்டை தரத்தை மேம்படுத்தவும் சிறந்த சத்துணவு ஆதரவு.',
      'எடைப் பயிற்சி (Resistance Training): வாரத்திற்கு 2-3 முறை எளிய உடற்பயிற்சி செய்வது இன்சுலின் தேவையின்றி தசைகள் குளுக்கோஸை உறிஞ்ச உதவும்.',
      'அமைதியான உறக்கம் & மெக்னீசியம்: இரவு தூங்குவதற்கு முன் மெக்னீசியம் உட்கொள்வது கார்டிசோல் அழுத்தத்தைக் குறைத்து மாதவிடாய் வலியைத் தணிக்கும்.'
    ],
    defaultTests: [
      'இடுப்புப் பகுதி அல்ட்ராசவுண்ட் ஸ்கேன் (Pelvic Ultrasound - சினைப்பையின் அளவு மற்றும் நீர்க்கட்டிகளை அறிய)',
      'சீரம் LH / FSH ஹார்மோன் விகிதம் (Day-3 LH:FSH Ratio பரிசோதனை)',
      'வெறும் வயிற்று இன்சுலின் & குளுக்கோஸ் (Fasting Insulin & HOMA-IR குறியீடு)',
      'இலவச & மொத்த டெஸ்டோஸ்டிரோன் மற்றும் DHEA-S (ஆண்ட்ரோஜன் பரிசோதனை)',
      'லிப்பிட் புரொபைல் மற்றும் வைட்டமின் D3 / தைராய்டு TSH பரிசோதனைகள்'
    ],
    defaultDoctorQ: [
      '1. எனது அறிகுறிகளின் அடிப்படையில், சினைப்பை நீர்க்கட்டிகளை உறுதிப்படுத்த அல்ட்ராசவுண்ட் ஸ்கேன் பரிந்துரைப்பீர்களா?',
      '2. எனக்கு வெறும் வயிற்று சர்க்கரை மட்டுமின்றி, இன்சுலின் எதிர்ப்புத் தன்மையை (HOMA-IR) பரிசோதிக்க முடியுமா?',
      '3. மாதவிடாய் சுழற்சியை சீராக்க மயோ-இனோசிட்டால் போன்ற சப்ளிமெண்ட்ஸ் எனக்குப் பொருத்தமானதா?',
      '4. எனது முகப்பரு மற்றும் முடி உதிர்தலைக் குறைக்க நீங்கள் பரிந்துரைக்கும் மருத்துவ ஆலோசனைகள் என்ன?'
    ]
  },
  hi: {
    badge: 'हार्मोनल स्वास्थ्य',
    title: 'PCOS / PCOD जागरूकता जांच',
    subtitle: 'पॉलीसिस्टिक ओवरी सिंड्रोम से जुड़े लक्षणों का मूल्यांकन करें और व्यक्तिगत चिकित्सीय व जीवनशैली मार्गदर्शन प्राप्त करें।',
    stepText: (cur, total) => `प्रश्न ${cur} / ${total}`,
    completed: 'पूर्ण',
    yes: 'हाँ',
    sometimes: 'कभी-कभी',
    no: 'नहीं',
    back: '← पिछले प्रश्न पर वापस जाएं',
    summaryTitle: 'PCOS चिकित्सीय मूल्यांकन सारांश व सुझाव',
    summarySub: 'प्रश्नावली का विश्लेषण कर व्यक्तिगत सुझावों के साथ मेडिकल प्रोफाइल में सुरक्षित किया गया।',
    reportedTitle: (n) => `दर्ज लक्षण व पैटर्न (${n}):`,
    noSymptoms: 'इस प्रश्नावली में कोई महत्वपूर्ण PCOS लक्षण दर्ज नहीं किए गए।',
    clinicalNotice: '“इन लक्षणों के कई कारण हो सकते हैं। PCOS/PCOD का सटीक निदान केवल योग्य स्वास्थ्य विशेषज्ञ द्वारा ही संभव है।”',
    scoreLabel: 'पैटर्न संभावना दर:',
    severitySignificant: 'महत्वपूर्ण पॉलीसिस्टिक पैटर्न (Significant)',
    severityModerate: 'मध्यम हार्मोनल व चयापचय संकेत',
    severityMild: 'हल्के / न्यूनतम संकेतक',
    dietTitle: '🥗 व्यक्तिगत आहार व इंसुलिन नियंत्रण प्रोटोकॉल',
    lifestyleTitle: '🌸 हार्मोनल संतुलन व जीवनशैली सुधार सुझाव',
    testsTitle: '🩺 स्त्री रोग विशेषज्ञ से अनुशंसित लैब टेस्ट',
    questionsTitle: '📋 डॉक्टर से परामर्श हेतु 4 मुख्य प्रश्न',
    downloadBtn: 'चिकित्सीय रिपोर्ट डाउनलोड करें',
    retake: 'पुनः परीक्षण करें',
    questions: [
      { key: 'irregularPeriods', text: 'क्या आपकी माहवारी अक्सर अनियमित या अप्रत्याशित समय पर आती है?' },
      { key: 'missedPeriods', text: 'गर्भवती न होने पर भी, क्या आपकी माहवारी लगातार दो या अधिक महीनों तक छूटी है?' },
      { key: 'persistentAcne', text: 'क्या आपको विशेष रूप से जबड़े, ठुड्डी या पीठ पर लगातार गंभीर मुंहासे होते हैं?' },
      { key: 'unexplainedWeightChange', text: 'क्या आपने आहार और व्यायाम के बावजूद तेजी से वजन बढ़ना या वजन घटाने में कठिनाई महसूस की है?' },
      { key: 'unusualHairGrowth', text: 'क्या आपने चेहरे, ठुड्डी, छाती या पेट पर असामान्य या अनचाहे घने बालों का विकास देखा है?' },
      { key: 'hairThinning', text: 'क्या आपने सिर के ऊपरी हिस्से पर बालों का अत्यधिक पतला होना या झड़ना देखा है?' },
      { key: 'moodChanges', text: 'क्या आपने अत्यधिक मिजाज में बदलाव (Mood Swings), घबराहट या तनाव महसूस किया है?' },
      { key: 'cyclePredictDifficulty', text: 'क्या आपको यह अनुमान लगाने में कठिनाई होती है कि आपकी अगली माहवारी कब आएगी?' }
    ],
    symptoms: {
      irregularPeriods: 'बार-बार अनियमित माहवारी',
      missedPeriods: 'माहवारी का छूटना या देरी होना',
      persistentAcne: 'लगातार गंभीर मुँहासे',
      unexplainedWeightChange: 'तेजी से वजन बढ़ना या घटने में परेशानी',
      unusualHairGrowth: 'अवांछित बाल विकास (हिसुटिज़्म)',
      hairThinning: 'बालों का पतला होना या अत्यधिक झड़ना',
      moodChanges: 'अत्यधिक मूड स्विंग्स या थकान',
      cyclePredictDifficulty: 'माहवारी की तारीख का अनिश्चित होना'
    },
    defaultDiet: [
      'कम ग्लाइसेमिक लोड (Low-GL) आहार: साबुत अनाज, दालें, हरी सब्जियां और अलसी के बीज इंसुलिन के उतार-चढ़ाव को रोकते हैं।',
      'प्रोटीन युक्त नाश्ता: जागने के 60 मिनट के भीतर 25-30 ग्राम प्रोटीन लेने से रक्त शर्करा पूरे दिन स्थिर रहती है।',
      'डेयरी व मीठे पर नियंत्रण: परिष्कृत चीनी और अत्यधिक डेयरी कम करने से सिस्टिक मुंहासों में कमी आती है।'
    ],
    defaultLifestyle: [
      'स्पीयरमिंट ग्रीन टी (दिन में 2 कप): नैदानिक परीक्षणों में यह अतिरिक्त टेस्टोस्टेरोन को कम करने में असरदार साबित हुई है।',
      'मायो-इनोसिटोल और डी-काइरो-इनोसिटोल (40:1): ओव्यूलेशन को नियमित करने और इंसुलिन संवेदनशीलता बढ़ाने में सहायक।',
      'स्ट्रेंथ ट्रेनिंग (सप्ताह में 2-3 दिन): मांसपेशियों का व्यायाम इंसुलिन के बिना सीधे ग्लूकोज को अवशोषित करता है।',
      'मैग्नीशियम ग्लाइकिनेट: रात को गहरी नींद व कोर्टिसोल तनाव को शांत करने के लिए उत्तम।'
    ],
    defaultTests: [
      'पेल्विक अल्ट्रासाउंड (अंडाशय का आकार व रोम कूप स्थिति जांचने हेतु)',
      'सीरम LH और FSH अनुपात (Day-3 हार्मोनल अनुपात जांच)',
      'फास्टिंग इंसुलिन व फास्टिंग ग्लूकोज (HOMA-IR इंडेक्स)',
      'फ्री व टोटल टेस्टोस्टेरोन और DHEA-S (एंड्रोजन स्क्रीनिंग)',
      'लिपिड प्रोफाइल और विटामिन D3 / थायरॉयड TSH स्तर'
    ],
    defaultDoctorQ: [
      '1. क्या मेरे लक्षणों के आधार पर पेल्विक अल्ट्रासाउंड की आवश्यकता है?',
      '2. क्या हम केवल ग्लूकोज ही नहीं बल्कि फास्टिंग इंसुलिन (HOMA-IR) भी टेस्ट कर सकते हैं?',
      '3. क्या मायो-इनोसिटोल (40:1) सप्लीमेंट मेरे लिए उपयुक्त रहेगा?',
      '4. अनचाहे बालों और मुंहासों को नियंत्रित करने के लिए आप कौन सी रणनीति सुझाएंगे?'
    ]
  },
  mr: {
    badge: 'हार्मोनल आरोग्य',
    title: 'PCOS / PCOD जागरूकता तपासणी',
    subtitle: 'पॉलीसिस्टिक ओव्हेरियन सिंड्रोमशी संबंधित लक्षणांचे विश्लेषण करून योग्य वैद्यकीय आणि जीवनशैली मार्गदर्शन मिळवा.',
    stepText: (cur, total) => `प्रश्न ${cur} पैकी ${total}`,
    completed: 'पूर्ण झाले',
    yes: 'होय',
    sometimes: 'कधीकधी',
    no: 'नाही',
    back: '← मागील प्रश्नाकडे परत जा',
    summaryTitle: 'PCOS वैद्यकीय निष्कर्ष व मार्गदर्शन',
    summarySub: 'तपासणीचा सखोल अभ्यास करून वैयक्तिक सल्ल्यांसह प्रोफाइलमध्ये नोंद केली गेली.',
    reportedTitle: (n) => `नोंदवलेली लक्षणे व घटक (${n}):`,
    noSymptoms: 'या तपासणीत कोणतीही गंभीर PCOS लक्षणे आढळली नाहीत.',
    clinicalNotice: '“या लक्षणांची अनेक कारणे असू शकतात. PCOS/PCOD चे अचूक निदान केवळ तज्ज्ञ डॉक्टरांकडूनच केले जाऊ शकते.”',
    scoreLabel: 'पॅटर्न शक्यता दर:',
    severitySignificant: 'गंभीर पॉलीसिस्टिक पॅटर्न (Significant)',
    severityModerate: 'मध्यम संप्रेरक व चयापचय लक्षणे',
    severityMild: 'किरकोळ / सामान्य बदल',
    dietTitle: '🥗 वैयक्तिक आहार व इन्सुलिन नियंत्रण योजना',
    lifestyleTitle: '🌸 संप्रेरक संतुलन व जीवनशैली सुधारणा',
    testsTitle: '🩺 स्त्रीरोग तज्ज्ञांकडून करून घेण्याच्या चाचण्या',
    questionsTitle: '📋 डॉक्टरांना विचारण्यासाठी ४ महत्त्वाचे प्रश्न',
    downloadBtn: 'वैद्यकीय अहवाल डाउनलोड करा',
    retake: 'पुन्हा चाचणी घ्या',
    questions: [
      { key: 'irregularPeriods', text: 'तुमची मासिक पाळी वारंवार अनियमित किंवा अनपेक्षित वेळेवर येते का?' },
      { key: 'missedPeriods', text: 'गरोदर नसतानाही, तुमची मासिक पाळी सलग दोन किंवा अधिक महिने चुकली आहे का?' },
      { key: 'persistentAcne', text: 'तुम्हाला विशेषतः जबडा, हनुवटी किंवा पाठीवर वारंवार जिद्दी मुरुमे येतात का?' },
      { key: 'unexplainedWeightChange', text: 'आहार आणि व्यायामानंतरही तुमचे वजन झपाट्याने वाढले आहे किंवा वजन कमी करणे कठीण जात आहे का?' },
      { key: 'unusualHairGrowth', text: 'तुमच्या चेहऱ्यावर, हनुवटीवर, छातीवर किंवा पोटावर नको असलेले जाड केस वाढल्याचे आढळले आहे का?' },
      { key: 'hairThinning', text: 'डोक्याच्या मध्यभागी केस पातळ होणे किंवा अतिप्रमाणात केस गळणे जाणवले आहे का?' },
      { key: 'moodChanges', text: 'वारंवार मूड बदलणे, वाढती चिंता किंवा नैराश्य जाणवले आहे का?' },
      { key: 'cyclePredictDifficulty', text: 'तुमची पुढची मासिक पाळी कधी येईल याचा अंदाज लावणे कठीण जाते का?' }
    ],
    symptoms: {
      irregularPeriods: 'वारंवार अनियमित मासिक पाळी',
      missedPeriods: 'मासिक पाळी चुकणे किंवा उशीर होणे',
      persistentAcne: 'सतत होणारी जिद्दी मुरुमे',
      unexplainedWeightChange: 'वजन झपाट्याने वाढणे किंवा घट न होणे',
      unusualHairGrowth: 'नको असलेले केस वाढणे (Hirsutism)',
      hairThinning: 'केस पातळ होणे व गळणे',
      moodChanges: 'मूड स्विंग्स आणि तीव्र थकवा',
      cyclePredictDifficulty: 'पाळीच्या तारखेची अनिश्चितता'
    },
    defaultDiet: [
      'कमी ग्लायसेमिक लोड (Low-GL) आहार: कडधान्ये, ओट्स, पालेभाज्या इन्सुलिन वाढू देत नाहीत.',
      'प्रथिनयुक्त आहार: सकाळी २५-३० ग्रॅम प्रथिने घेतल्याने दिवसभर रक्तातील साखर स्थिर राहते.',
      'दुग्धजन्य पदार्थ व साखर नियंत्रण: गोड पदार्थ कमी केल्याने मुरुमांचे प्रमाण लक्षणीयरीत्या घटते.'
    ],
    defaultLifestyle: [
      'स्पीअरमिंट चहा (दिवसातून २ कप): अतिरिक्त टेस्टोस्टेरॉन कमी करण्यास वैद्यकीयदृष्ट्या उपयुक्त.',
      'मायो-इनॉसिटॉल (40:1): ओव्हुलेशन नियमित करण्यासाठी आणि पेशींची ताकद वाढवण्यासाठी उत्तम सप्लीमेंट.',
      'स्ट्रेंथ ट्रेनिंग व्यायाम: आठवड्यातून २-३ वेळा हलके वजन उचलणे इन्सुलिन संवेदनशीलता सुधारते.',
      'शांत झोप: रात्री वेळेवर झोपल्याने कॉर्टिसॉल ताण कमी होऊन पाळी नियमित होते.'
    ],
    defaultTests: [
      'पेल्विक सोनोग्राफी (Pelvic Ultrasound)',
      'सीरम LH व FSH गुणोत्तर चाचणी (Day-3 LH:FSH Ratio)',
      'फास्टिंग इन्सुलिन व ग्लुकोज (HOMA-IR इंडेक्स)',
      'फ्री व टोटल टेस्टोस्टेरॉन आणि DHEA-S',
      'लिपिड प्रोफाइल व व्हिटॅमिन D3 चाचणी'
    ],
    defaultDoctorQ: [
      '1. माझ्या लक्षणांवरून सोनोग्राफी करण्याची गरज आहे का?',
      '2. इन्सुलिन रेझिस्टन्स तपासण्यासाठी HOMA-IR टेस्ट करू शकतो का?',
      '3. पाळी नियमित करण्यासाठी मायो-इनॉसिटॉल घेणे योग्य ठरेल का?',
      '4. केस गळती व मुरुमांवर कोणते उपाय सुचवाल?'
    ]
  },
  te: {
    badge: 'హార్మోన్ల ఆరోగ్యం',
    title: 'PCOS / PCOD అవగాహన పరీక్ష',
    subtitle: 'పాలీసిస్టిక్ ఓవేరియన్ లక్షణాలను అంచనా వేసి వ్యక్తిగత వైద్య మరియు జీవనశైలి మార్గదర్శకాలను పొందండి.',
    stepText: (cur, total) => `ప్రశ్న ${cur} / ${total}`,
    completed: 'పూర్తయింది',
    yes: 'అవును',
    sometimes: 'కొన్నిసార్లు',
    no: 'కాదు',
    back: '← మునుపటి ప్రశ్నకు వెళ్లండి',
    summaryTitle: 'PCOS వైద్య విశ్లేషణ సారాంశం & సూచనలు',
    summarySub: 'సమాధానాలు విశ్లేషించబడి పూర్తి మార్గదర్శకాలతో మీ ప్రొఫైల్‌లో భద్రపరచబడ్డాయి.',
    reportedTitle: (n) => `నమోదైన లక్షణాలు (${n}):`,
    noSymptoms: 'ఈ ప్రశ్నపత్రంలో ఎటువంటి తీవ్రమైన PCOS లక్షణాలు నమోదు కాలేదు.',
    clinicalNotice: '“ఈ లక్షణాలకు అనేక కారణాలు ఉండవచ్చు. అర్హత కలిగిన వైద్య నిపుణులు మాత్రమే PCOS/PCODని నిర్ధారించగలరు.”',
    scoreLabel: 'నమూనా సంభావ్యత:',
    severitySignificant: 'తీవ్రమైన పాలీసిస్టిక్ నమూనా (Significant)',
    severityModerate: 'మధ్యస్థ హార్మోన్ లక్షణాలు',
    severityMild: 'స్వల్ప లక్షణాలు',
    dietTitle: '🥗 ఆహార నియమాలు & ఇన్సులిన్ నియంత్రణ',
    lifestyleTitle: '🌸 హార్మోన్ల సమతుల్యత & జీవనశైలి మార్పులు',
    testsTitle: '🩺 గైనకాలజిస్ట్‌ను అడగవలసిన పరీక్షలు',
    questionsTitle: '📋 వైద్యుడిని అడగవలసిన 4 ముఖ్యమైన ప్రశ్నలు',
    downloadBtn: 'వైద్య నివేదికను డౌన్‌లోడ్ చేయండి',
    retake: 'మళ్లీ పరీక్షించండి',
    questions: [
      { key: 'irregularPeriods', text: 'మీ పీరియడ్స్ తరచుగా క్రమరహితంగా లేదా అంచనా వేయలేని సమయాల్లో వస్తున్నాయా?' },
      { key: 'missedPeriods', text: 'గర్భవతి కానప్పుడు కూడా, వరుసగా రెండు లేదా అంతకంటే ఎక్కువ నెలలు పీరియడ్స్ రాలేదా?' },
      { key: 'persistentAcne', text: 'ముఖ్యంగా దవడ, గడ్డం లేదా వీపుపై నిరంతర మొటిమలు గమనించారా?' },
      { key: 'unexplainedWeightChange', text: 'ఆహార నియమాలు మరియు వ్యాయామం చేసినప్పటికీ వేగంగా బరువు పెరగడం లేదా తగ్గడం కష్టంగా ఉందా?' },
      { key: 'unusualHairGrowth', text: 'మీ ముఖం, గడ్డం, ఛాతీ లేదా పొట్టపై అవాంఛిత ముదురు వెంట్రుకలు పెరగడం గమనించారా?' },
      { key: 'hairThinning', text: 'తల పైభాగంలో జుట్టు పలచబడటం లేదా అధికంగా రాలడం గమనించారా?' },
      { key: 'moodChanges', text: 'తీవ్రమైన మూడ్ మార్పులు, ఆందోళన లేదా నిరాశను అనుభవిస్తున్నారా?' },
      { key: 'cyclePredictDifficulty', text: 'తదుపరి పీరియడ్ ఎప్పుడు వస్తుందో అంచనా వేయడం కష్టంగా ఉందా?' }
    ],
    symptoms: {
      irregularPeriods: 'తరచుగా క్రమరహిత పీరియడ్స్',
      missedPeriods: 'పీరియడ్స్ మిస్ అవ్వడం లేదా ఆలస్యం',
      persistentAcne: 'మొండి మొటిమలు',
      unexplainedWeightChange: 'ఆకస్మిక బరువు పెరుగుదల',
      unusualHairGrowth: 'అవాంఛిత రోమాలు (హిర్సుటిజం)',
      hairThinning: 'జుట్టు పలచబడటం లేదా రాలడం',
      moodChanges: 'తీవ్రమైన మానసిక ఆందోళన లేదా అలసట',
      cyclePredictDifficulty: 'అనిశ్చిత పీరియడ్ చక్రం'
    },
    defaultDiet: [
      'తక్కువ గ్లైసెమిక్ ఆహారాలు: తృణధాన్యాలు, పప్పుదినుసులు ఇన్సులిన్ స్పైక్‌లను నివారిస్తాయి.',
      'ప్రోటీన్ ఆహారం: ప్రతి భోజనంలో 25-30 గ్రాముల ప్రోటీన్ ఉండేలా చూసుకోండి.',
      'చక్కెర నియంత్రణ: శుద్ధి చేసిన చక్కెరలను తగ్గించడం ద్వారా మొటిమలను అరికట్టవచ్చు.'
    ],
    defaultLifestyle: [
      'స్పియర్‌మింట్ టీ: రోజుకు 2 కప్పులు తాగడం వల్ల అవాంఛిత రోమాలు తగ్గుతాయి.',
      'మయో-ఇనోసిటాల్: అండోత్సర్గము క్రమబద్ధీకరణకు ఎంతో ఉపయోగపడే సప్లిమెంట్.',
      'వ్యాయామం: వారానికి 2-3 సార్లు కండరాల వ్యాయామం చేయడం వల్ల గ్లూకోజ్ నియంత్రణ మెరుగవుతుంది.',
      'మంచి నిద్ర: రాత్రి వేళల్లో తగినంత విశ్రాంతి ఒత్తిడి హార్మోన్లను తగ్గిస్తుంది.'
    ],
    defaultTests: [
      'పెల్విక్ అల్ట్రాసౌండ్ స్కాన్ (Pelvic Ultrasound)',
      'సీరం LH & FSH నిష్పత్తి పరీక్ష (Day-3 LH:FSH Ratio)',
      'ఫాస్టింగ్ ఇన్సులిన్ మరియు గ్లూకోజ్ (HOMA-IR)',
      'టెస్టోస్టెరాన్ మరియు DHEA-S పరీక్షలు',
      'లిపిడ్ ప్రొఫైల్ మరియు విటమిన్ D3'
    ],
    defaultDoctorQ: [
      '1. నా లక్షణాల ఆధారంగా అల్ట్రాసౌండ్ స్కాన్ అవసరమా?',
      '2. ఇన్సులిన్ రెసిస్టెన్స్ కోసం HOMA-IR పరీక్ష చేయవచ్చా?',
      '3. మయో-ఇనోసిటాల్ వాడటం నాకు సురక్షితమేనా?',
      '4. మొటిమలు మరియు జుట్టు రాలడం తగ్గించడానికి మీరు ఏమి సూచిస్తారు?'
    ]
  },
  kn: {
    badge: 'ಹಾರ್ಮೋನ್ ಆರೋಗ್ಯ',
    title: 'PCOS / PCOD ಜಾಗೃತಿ ತಪಾಸಣೆ',
    subtitle: 'ಪಾಲಿಸಿಸ್ಟಿಕ್ ಲಕ್ಷಣಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ ಸೂಕ್ತ ವೈದ್ಯಕೀಯ ಮತ್ತು ಜೀವನಶೈಲಿ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    stepText: (cur, total) => `ಪ್ರಶ್ನೆ ${cur} / ${total}`,
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    yes: 'ಹೌದು',
    sometimes: 'ಕೆಲವೊಮ್ಮೆ',
    no: 'ಇಲ್ಲ',
    back: '← ಹಿಂದಿನ ಪ್ರಶ್ನೆಗೆ ಹಿಂತಿರುಗಿ',
    summaryTitle: 'PCOS ವೈದ್ಯಕೀಯ ಸಾರಾಂಶ ಮತ್ತು ಸಲಹೆಗಳು',
    summarySub: 'ಉತ್ತರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ.',
    reportedTitle: (n) => `ದಾಖಲಾದ ಲಕ್ಷಣಗಳು (${n}):`,
    noSymptoms: 'ಈ ಪ್ರಶ್ನಾವಳಿಯಲ್ಲಿ ಯಾವುದೇ ಗಂಭೀರ PCOS ಲಕ್ಷಣಗಳು ವರದಿಯಾಗಿಲ್ಲ.',
    clinicalNotice: '“ಈ ಲಕ್ಷಣಗಳಿಗೆ ಹಲವು ಕಾರಣಗಳಿರಬಹುದು. ಅರ್ಹ ವೈದ್ಯರು ಮಾತ್ರ PCOS/PCOD ಅನ್ನು ನಿಖರವಾಗಿ ಪರೀಕ್ಷಿಸಬಹುದು.”',
    scoreLabel: 'ಮಾದರಿ ಸಂಭವನೀಯತೆ:',
    severitySignificant: 'ಗಂಭೀರ ಪಾಲಿಸಿಸ್ಟಿಕ್ ಮಾದರಿ (Significant)',
    severityModerate: 'ಮಧ್ಯಮ ಹಾರ್ಮೋನ್ ಲಕ್ಷಣಗಳು',
    severityMild: 'ಸ್ವಲ್ಪ ಲಕ್ಷಣಗಳು',
    dietTitle: '🥗 ವೈಯಕ್ತಿಕ ಆಹಾರ ಮತ್ತು ಇನ್ಸುಲಿನ್ ನಿಯಂತ್ರಣ',
    lifestyleTitle: '🌸 ಹಾರ್ಮೋನ್ ಸಮತೋಲನ ಮತ್ತು ಜೀವನಶೈಲಿ ಸಲಹೆ',
    testsTitle: '🩺 ಸ್ತ್ರೀರೋಗ ತಜ್ಞರಿಂದ ಮಾಡಿಸಬೇಕಾದ ಪರೀಕ್ಷೆಗಳು',
    questionsTitle: '📋 ವೈದ್ಯರನ್ನು ಕೇಳಬೇಕಾದ ೪ ಮುಖ್ಯ ಪ್ರಶ್ನೆಗಳು',
    downloadBtn: 'ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    retake: 'ಮತ್ತೆ ಪರೀಕ್ಷಿಸಿ',
    questions: [
      { key: 'irregularPeriods', text: 'ನಿಮ್ಮ ಮುಟ್ಟು తరచుగా క్రಮరಹಿತంగా ಅಥವಾ ಊಹಿಸಲಾಗದ ಸಮಯದಲ್ಲಿ ಬರುತ್ತದೆಯೇ?' },
      { key: 'missedPeriods', text: 'ಗರ್ಭಿಣಿಯಾಗಿಲ್ಲದಿದ್ದರೂ, ಸತತ ಎರಡು ಅಥವಾ ಹೆಚ್ಚಿನ ತಿಂಗಳು ಮುಟ್ಟು ತಪ್ಪಿದೆಯೇ?' },
      { key: 'persistentAcne', text: 'ವಿಶೇಷವಾಗಿ ದವಡೆ, ಗಲ್ಲ ಅಥವಾ ಬೆನ್ನಿನ ಮೇಲೆ ನಿರಂತರ ಮೊಡವೆಗಳನ್ನು ಗಮನಿಸಿದ್ದೀರಾ?' },
      { key: 'unexplainedWeightChange', text: 'ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮದ ಹೊರತಾಗಿಯೂ ತೂಕ ವೇಗವಾಗಿ ಹೆಚ್ಚಾಗುವುದು ಅಥವಾ ತೂಕ ಇಳಿಸಲು ಕಷ್ಟವಾಗುತ್ತಿದೆಯೇ?' },
      { key: 'unusualHairGrowth', text: 'ಮುಖ, ಗಲ್ಲ, ಎದೆ ಅಥವಾ ಹೊಟ್ಟೆಯ ಮೇಲೆ ಅತಿಯಾದ ಅನಗತ್ಯ ಕೂದಲು ಬೆಳೆಯುವುದನ್ನು ಗಮನಿಸಿದ್ದೀರಾ?' },
      { key: 'hairThinning', text: 'ತಲೆಯ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಕೂದಲು ತೆಳುವಾಗುವುದು ಅಥವಾ ಅತಿಯಾಗಿ ಉದುರುವುದನ್ನು ಗಮನಿಸಿದ್ದೀರಾ?' },
      { key: 'moodChanges', text: 'ತೀವ್ರವಾದ ಮನಸ್ಥಿತಿ ಬದಲಾವಣೆಗಳು, ಆತಂಕ ಅಥವಾ ಖಿನ್ನತೆಯನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಾ?' },
      { key: 'cyclePredictDifficulty', text: 'ಮುಂದಿನ ಮುಟ್ಟು ಯಾವಾಗ ಬರುತ್ತದೆ ಎಂದು ಊಹಿಸಲು ಕಷ್ಟವಾಗುತ್ತಿದೆಯೇ?' }
    ],
    symptoms: {
      irregularPeriods: 'ಅನಿಯಮಿತ ಮುಟ್ಟು',
      missedPeriods: 'ಮುಟ್ಟು ತಪ್ಪುವುದು',
      persistentAcne: 'ನಿರಂತರ ಕಠಿಣ ಮೊಡವೆಗಳು',
      unexplainedWeightChange: 'ತೂಕ ಹೆಚ್ಚಳ ಅಥವಾ ಇಳಿಸಲು ಕಷ್ಟ',
      unusualHairGrowth: 'ಅನಗತ್ಯ ಕೂದಲು ಬೆಳವಣಿಗೆ (ಹಿರ್ಸುಟಿಸಂ)',
      hairThinning: 'ಕೂದಲು ಉದುರುವಿಕೆ / ತೆಳುವಾಗುವುದು',
      moodChanges: 'ಮನಸ್ಥಿತಿ ಏರಿಳಿತಗಳು / ಸುಸ್ತು',
      cyclePredictDifficulty: 'ಅನಿಶ್ಚಿತ ಮುಟ್ಟಿನ ಚಕ್ರ'
    },
    defaultDiet: [
      'ಕಡಿಮೆ ಗ್ಲೈಸೆಮಿಕ್ ಆಹಾರ: ಧಾನ್ಯಗಳು, ಮೊಳಕೆ ಕಾಳುಗಳು ಇನ್ಸುಲಿನ್ ನಿಯಂತ್ರಣಕ್ಕೆ ಸಹಕಾರಿ.',
      'ಪ್ರೋಟೀನ್ ಭರಿತ ಊಟ: ಪ್ರತಿ ಊಟದಲ್ಲಿ 25-30 ಗ್ರಾಂ ಪ್ರೋಟೀನ್ ಸೇವಿಸಿ.',
      'ಸಕ್ಕರೆ ನಿಯಂತ್ರಣ: ಸಿಹಿ ಪದಾರ್ಥಗಳನ್ನು ಕಡಿಮೆ ಮಾಡುವುದರಿಂದ ಮೊಡವೆಗಳು ಕಡಿಮೆಯಾಗುತ್ತವೆ.'
    ],
    defaultLifestyle: [
      'ಸ್ಪಿಯರ್‌ಮಿಂಟ್ ಟೀ: ದಿನಕ್ಕೆ 2 ಬಾರಿ ಕುಡಿಯುವುದರಿಂದ ಅನಗತ್ಯ ಕೂದಲು ಬೆಳವಣಿಗೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ.',
      'ಮಯೋ-ಇನೋಸಿಟಾಲ್: ಮುಟ್ಟಿನ ಚಕ್ರವನ್ನು ಸರಿಪಡಿಸಲು ಉತ್ತಮ ಪೂರಕ.',
      'ವ್ಯಾಯಾಮ: ನಿಯಮಿತ ನಡಿಗೆ ಮತ್ತು ವ್ಯಾಯಾಮ ದೇಹದ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.',
      'ಉತ್ತಮ ನಿದ್ರೆ: ರಾತ್ರಿಯ ವಿಶ್ರಾಂತಿ ಹಾರ್ಮೋನ್ ಸಮತೋಲನಕ್ಕೆ ಸಹಕಾರಿ.'
    ],
    defaultTests: [
      'ಪೆಲ್ವಿಕ್ ಸ್ಕ್ಯಾನ್ (Pelvic Ultrasound)',
      'ಸೀರಮ್ LH & FSH ಅನುಪಾತ ಪರೀಕ್ಷೆ (Day-3 Ratio)',
      'ಫಾಸ್ಟಿಂಗ್ ಇನ್ಸುಲಿನ್ ಮತ್ತು ಗ್ಲೂಕೋಸ್ (HOMA-IR)',
      'ಟೆಸ್ಟೋಸ್ಟೆರಾನ್ ಮತ್ತು DHEA-S ಪರೀಕ್ಷೆಗಳು',
      'ಲಿಪಿಡ್ ಪ್ರೊಫೈಲ್ ಮತ್ತು ವಿಟಮಿನ್ D3'
    ],
    defaultDoctorQ: [
      '1. ನನ್ನ ಲಕ್ಷಣಗಳಿಗೆ ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನ್ ಅಗತ್ಯವಿದೆಯೇ?',
      '2. ಇನ್ಸುಲಿನ್ ರೆಸಿಸ್ಟೆನ್ಸ್ ಪರೀಕ್ಷೆ ಮಾಡಿಸಬಹುದೇ?',
      '3. ಮಯೋ-ಇನೋಸಿಟಾಲ್ ತೆಗೆದುಕೊಳ್ಳುವುದು ಸರಿಯೇ?',
      '4. ಮೊಡವೆ ಮತ್ತು ಕೂದಲು ಉದುರುವಿಕೆಗೆ ಸೂಕ್ತ ಚಿಕಿತ್ಸೆ ಏನು?'
    ]
  },
  ml: {
    badge: "ഹോർമോൺ ആരോഗ്യം",
    title: "PCOS / PCOD ബോധവൽക്കരണ പരിശോധന",
    subtitle: "പോളിസിസ്റ്റിക് ഓവേറിയൻ സിൻഡ്രോമുമായി ബന്ധപ്പെട്ട ലക്ഷണങ്ങൾ വിലയിരുത്തി വ്യക്തിഗത ക്ലിനിക്കൽ, ജീവിതശൈലി മാർഗ്ഗനിർദ്ദേശങ്ങൾ നേടുക.",
    stepText: (cur, total) => `ചോദ്യം ${cur} / ${total}`,
    completed: "പൂർത്തിയായി",
    yes: "അതെ",
    sometimes: "ചിലപ്പോൾ",
    no: "അല്ല",
    back: "← മുൻപത്തെ ചോദ്യത്തിലേക്ക് മടങ്ങുക",
    summaryTitle: "PCOS ക്ലിനിക്കൽ റിപ്പോർട്ടും നിർദ്ദേശങ്ങളും",
    summarySub: "ഉത്തരങ്ങൾ വിശകലനം ചെയ്ത് നിങ്ങളുടെ ആരോഗ്യ പ്രൊഫൈലിൽ സുരക്ഷിതമാക്കിയിരിക്കുന്നു.",
    reportedTitle: (n) => `രേഖപ്പെടുത്തിയ ലക്ഷണങ്ങൾ (${n}):`,
    noSymptoms: "ഈ ചോദ്യാവലിയിൽ കാര്യമായ PCOS ലക്ഷണങ്ങളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.",
    clinicalNotice: "“ഈ ലക്ഷണങ്ങൾക്ക് പല കാരണങ്ങളുണ്ടാകാം. യോഗ്യതയുള്ള ഒരു ഡോക്ടർക്ക് മാത്രമേ PCOS/PCOD കൃത്യമായി സ്ഥിരീകരിക്കാൻ സാധിക്കൂ.”",
    scoreLabel: "പാറ്റേൺ സാധ്യത നിരക്ക്:",
    severitySignificant: "കാര്യമായ പോളിസിസ്റ്റിക് പാറ്റേൺ (Significant)",
    severityModerate: "മിതമായ ഹോർമോൺ വ്യതിയാനങ്ങൾ",
    severityMild: "നേരിയ ലക്ഷണങ്ങൾ",
    dietTitle: "🥗 ഭക്ഷണക്രമവും ഇൻസുലിൻ നിയന്ത്രണവും",
    lifestyleTitle: "🌸 ഹോർമോൺ ബാലൻസും ജീവിതശൈലി നിർദ്ദേശങ്ങളും",
    testsTitle: "🩺 ഗൈനക്കോളജിസ്റ്റുമായി ആലോചിക്കേണ്ട പരിശോധനകൾ",
    questionsTitle: "📋 ഡോക്ടറോട് ചോദിക്കേണ്ട 4 പ്രധാന ചോദ്യങ്ങൾ",
    downloadBtn: "ക്ലിനിക്കൽ റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",
    retake: "വീണ്ടും പരിശോധിക്കുക",
    questions: [
          {
                "key": "irregularPeriods",
                "text": "നിങ്ങളുടെ ആർത്തവം പലപ്പോഴും ക്രമരഹിതമാണോ?"
          },
          {
                "key": "missedPeriods",
                "text": "ഗർഭിണിയല്ലാത്തപ്പോഴും തുടർച്ചയായി രണ്ടോ അതിലധികമോ മാസം ആർത്തവം വരാതിരുന്നിട്ടുണ്ടോ?"
          },
          {
                "key": "persistentAcne",
                "text": "താടിയെല്ല്, കവിൾ അല്ലെങ്കിൽ മുതുകിൽ കഠിനമായ മുഖക്കുരു ഉണ്ടാകാറുണ്ടോ?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "ഭക്ഷണ നിയന്ത്രണവും വ്യായാമവും ചെയ്തിട്ടും പെട്ടെന്ന് ഭാരം കൂടുകയോ കുറയ്ക്കാൻ പ്രയാസപ്പെടുകയോ ചെയ്യുന്നുണ്ടോ?"
          },
          {
                "key": "unusualHairGrowth",
                "text": "മുഖത്തോ താടിയിലോ ശരീരത്തിലോ അനാവശ്യമായ കട്ടിയുള്ള രോമവളർച്ച ശ്രദ്ധയിൽപ്പെട്ടിട്ടുണ്ടോ (ഹിർസൂട്ടിസം)?"
          },
          {
                "key": "hairThinning",
                "text": "തലയുടെ മുകൾഭാഗത്ത് മുടി കൊഴിച്ചിലോ കട്ടി കുറയുന്നതോ ഉണ്ടോ?"
          },
          {
                "key": "moodChanges",
                "text": "കടുത്ത മൂഡ് മാറ്റങ്ങൾ, ഉത്കണ്ഠ അല്ലെങ്കിൽ വിഷാദം അനുഭവപ്പെടുന്നുണ്ടോ?"
          },
          {
                "key": "cyclePredictDifficulty",
                "text": "അടുത്ത ആർത്തവം എപ്പോൾ വരുമെന്ന് കണക്കുകൂട്ടാൻ ബുദ്ധിമുട്ടുണ്ടോ?"
          }
    ],
    symptoms: {
          "irregularPeriods": "ക്രമരഹിതമായ ആർത്തവം",
          "missedPeriods": "ആർത്തവം മുടങ്ങൽ അല്ലെങ്കിൽ വൈകൽ",
          "persistentAcne": "കഠിനമായ മുഖക്കുരു",
          "unexplainedWeightChange": "പെട്ടെന്നുള്ള ഭാരക്കൂടുതൽ / കുറയ്ക്കാൻ പ്രയാസം",
          "unusualHairGrowth": "അനാവശ്യ രോമവളർച്ച (ഹിർസൂട്ടിസം)",
          "hairThinning": "മുടി കൊഴിച്ചിൽ / മുടി നേർത്തുപോകൽ",
          "moodChanges": "മൂഡ് മാറ്റങ്ങളും കടുത്ത ക്ഷീണവും",
          "cyclePredictDifficulty": "ആർത്തവ തീയതിയിലെ അനിശ്ചിതത്വം"
    },
    defaultDiet: [
          "കുറഞ്ഞ ഗ്ലൈസെമിക് (Low-GL) ഭക്ഷണങ്ങൾ: ധാന്യങ്ങൾ, പയറുവർഗ്ഗങ്ങൾ എന്നിവ ഇൻസുലിൻ സ്പൈക്കുകൾ തടയുന്നു.",
          "പ്രോട്ടീൻ സമ്പുഷ്ടമായ പ്രഭാതഭക്ഷണം: 25-30 ഗ്രാം പ്രോട്ടീൻ കഴിക്കുന്നത് രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് സ്ഥിരമായി നിലനിർത്തുന്നു.",
          "പഞ്ചസാരയും പാലും നിയന്ത്രിക്കുക: മധുരപലഹാരങ്ങളും അമിതമായ പാലും കുറയ്ക്കുന്നത് മുഖക്കുരു കുറയ്ക്കും."
    ],
    defaultLifestyle: [
          "സ്പിയർമിന്റ് ചായ (ദിവസവും 2 കപ്പ്): ആൻഡ്രോജൻ ഹോർമോണുകൾ കുറയ്ക്കാനും അനാവശ്യ രോമവളർച്ച തടയാനും സഹായിക്കുന്നു.",
          "മയോ-ഇനോസിറ്റോൾ (40:1): ഓവുലേഷൻ ക്രമപ്പെടുത്താനും ഇൻസുലിൻ സംവേദനക്ഷമത കൂട്ടാനും നല്ലൊരു സപ്ലിമെന്റ്.",
          "സ്ട്രെങ്ത് ട്രെയിനിംഗ്: ആഴ്ചയിൽ 2-3 തവണ ലളിതമായ വ്യായാമങ്ങൾ പേശികളുടെ ആരോഗ്യം വർദ്ധിപ്പിക്കുന്നു.",
          "നല്ല ഉറക്കം: രാത്രിയിലെ വിശ്രമം സ്ട്രെസ് ഹോർമോണുകളെ കുറയ്ക്കാൻ സഹായിക്കുന്നു."
    ],
    defaultTests: [
          "പെൽവിക് അൾട്രാസൗണ്ട് സ്കാൻ (Pelvic Ultrasound)",
          "സീറം LH & FSH അനുപാത പരിശോധന (Day-3 Ratio)",
          "ഫാസ്റ്റിംഗ് ഇൻസുലിൻ & ഗ്ലൂക്കോസ് (HOMA-IR)",
          "ടെസ്റ്റോസ്റ്റിറോൺ, DHEA-S പരിശോധനകൾ",
          "ലിപിഡ് പ്രൊഫൈൽ, വിറ്റാമിൻ D3 പരിശോധനകൾ"
    ],
    defaultDoctorQ: [
          "1. എന്റെ ലക്ഷണങ്ങൾ വിലയിരുത്തി അൾട്രാസൗണ്ട് സ്കാൻ ആവശ്യമാണോ എന്ന് പറയാമോ?",
          "2. ഇൻസുലിൻ റെസിസ്റ്റൻസ് അറിയാൻ HOMA-IR പരിശോധന നടത്താമോ?",
          "3. ആർത്തവം ക്രമപ്പെടുത്താൻ മയോ-ഇനോസിറ്റോൾ കഴിക്കുന്നത് അനുയോജ്യമാണോ?",
          "4. മുഖക്കുരുവിനും മുടികൊഴിച്ചിലിനും എന്ത് ചികിത്സയാണ് നിർദ്ദേശിക്കുന്നത്?"
    ],
  },
  mwr: {
    badge: "हार्मोनल स्वास्थ्य",
    title: "PCOS / PCOD जागरूकता जाँच",
    subtitle: "पॉलीसिस्टिक ओवेरियन सिंड्रोम रा लच्छणां री जाँच करो अर डॉक्टर सा’ब अर खान-पान री सही सलाह पाओ।",
    stepText: (cur, total) => `सवाल ${cur} / ${total}`,
    completed: "पूरो हो गयो",
    yes: "हाँ",
    sometimes: "कदे-कदे",
    no: "ना",
    back: "← पाछले सवाल पे जाओ",
    summaryTitle: "PCOS जाँच री रिपोर्ट अर सलाह",
    summarySub: "थांरा जबाव देख’र सलाह प्रोफाइल में लिख दी गयी है।",
    reportedTitle: (n) => `दिख्या लच्छण (${n}):`,
    noSymptoms: "कोई घणी PCOS री तकलीफ कोनी दिखी।",
    clinicalNotice: "“इन लच्छणां रा कई कारण हो सके है। डॉक्टर सा’ब री सलाह अर जाँच सूँ ही साँचो पतो लागे है।”",
    scoreLabel: "तकलीफ री संभावना:",
    severitySignificant: "PCOS रो बडो असर (Significant)",
    severityModerate: "हार्मोन रो मध्यम असर",
    severityMild: "हल्का लच्छण",
    dietTitle: "🥗 खाणो-पीणो अर इंसुलिन नियंत्रण",
    lifestyleTitle: "🌸 हार्मोन संतुलन अर दिनचर्या री सलाह",
    testsTitle: "🩺 जनाना डॉक्टर (Gynecologist) सूँ करबा री जाँच",
    questionsTitle: "📋 डॉक्टर सा’ब सूँ पूछबा रा ४ मुख्य सवाल",
    downloadBtn: "जाँच रिपोर्ट डाउनलोड करो",
    retake: "पाछी जाँच करो",
    questions: [
          {
                "key": "irregularPeriods",
                "text": "कांई थांरो म्हैनो (पीरियड्स) बार-बार टेम पे नीं आवे?"
          },
          {
                "key": "missedPeriods",
                "text": "कांई पेट में बच्चा नीं होबा पे भी लगातार दो या बेसी म्हैना तक पीरियड्स नीं आया?"
          },
          {
                "key": "persistentAcne",
                "text": "कांई चेहरे, ठोडी या ढाँठ (पीठ) पे घणा जिद्दी फोड़ा-फुंसी (मुँहासे) होवे है?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "कांई खाणो-पीणो कंट्रोल अर कसरत करवा पे भी वजन घणो बढ़ रह्यो है या घट नीं रह्यो?"
          },
          {
                "key": "unusualHairGrowth",
                "text": "कांई चेहरे, ठोडी या छाती पे अनचाहा मोटा बाल उग रह्या है?"
          },
          {
                "key": "hairThinning",
                "text": "कांई सिर रा बिचला बाल घणा झड़ रह्या है या पतळा हो रह्या है?"
          },
          {
                "key": "moodChanges",
                "text": "कांई घणी चिंता, उदासी या बार-बार मन बदलण री शिकायत है?"
          },
          {
                "key": "cyclePredictDifficulty",
                "text": "कांई अगलो म्हैनो कद आसी, यो पतो लगावणो मुश्किल लागे है?"
          }
    ],
    symptoms: {
          "irregularPeriods": "म्हैने री गड़बड़ी",
          "missedPeriods": "म्हैने रो छूटबो या देरी",
          "persistentAcne": "चेहरे पे जिद्दी फुंसी-मुँहासा",
          "unexplainedWeightChange": "वजन बढ़बो या कम नीं होबो",
          "unusualHairGrowth": "अनचाहा बाल उगबा री समस्या",
          "hairThinning": "सिर रा बाल झड़बो",
          "moodChanges": "मन रो भारीपण अर घणी थकान",
          "cyclePredictDifficulty": "म्हैने री तारीख पक्की नीं होणी"
    },
    defaultDiet: [
          "कम मीठो अर मोटा अनाज: बाजरो, दलिया, हरी सब्जियां अर दाल खाओ, इंसुलिन कंट्रोल में रहवेला।",
          "प्रोटीन वाळो खाणो: कलेवे (नाश्ते) में मूंग, चना अर बादाम लेवो।",
          "मीठो अर दूध कम: 4 हफ्ता खातर मिठाई अर ज्यादा दूध-मलाई कम कर द्यो।"
    ],
    defaultLifestyle: [
          "पुदीना (Spearmint) री चाय: दिन में २ कप पीवण सूँ अनचाहा बाल कम होवे है।",
          "मायो-इनोसिटोल: म्हैनो टेम पे लावण खातर घणी चोखी सप्लीमेंट है।",
          "रोजाना कसरत: रोज ३० मिनट चालो या कसरत करो, शरीर हलको रहवेला।",
          "चोखी नींद: रात ने टेम पे सोवो, चिंता मत पाळो।"
    ],
    defaultTests: [
          "पेट री सोनोग्राफी (Pelvic Ultrasound)",
          "हार्मोन जाँच (LH & FSH Ratio)",
          "फास्टिंग इंसुलिन अर शुगर जाँच (HOMA-IR)",
          "टेस्टोस्टेरोन अर DHEA-S टेस्ट",
          "लिपिड प्रोफाइल अर विटामिन D3"
    ],
    defaultDoctorQ: [
          "1. कांई म्हारे लच्छणां खातर सोनोग्राफी जरूरी है?",
          "2. कांई इंसुलिन रेजिस्टन्स (HOMA-IR) री जाँच करावणी चोखी रहसी?",
          "3. कांई म्हैने ने ठीक करण खातर मायो-इनोसिटोल ले सकां हाँ?",
          "4. अनचाहा बाल अर मुँहासा कम करण खातर कांई करूँ?"
    ],
  },
  fr: {
    badge: "Santé Hormonale",
    title: "Bilan de Sensibilisation SOPK / PCOD",
    subtitle: "Évaluez les signes associés au syndrome des ovaires polykystiques et recevez des conseils cliniques et hygiéno-diététiques adaptés.",
    stepText: (cur, total) => `Question ${cur} sur ${total}`,
    completed: "Terminé",
    yes: "Oui",
    sometimes: "Parfois",
    no: "Non",
    back: "← Retour à la question précédente",
    summaryTitle: "Résumé Clinique SOPK & Recommandations",
    summarySub: "Questionnaire analysé selon les critères endocriniens et enregistré dans votre profil de santé.",
    reportedTitle: (n) => `Symptômes et Signes Identifiés (${n}) :`,
    noSymptoms: "Aucun signe significatif de SOPK n’a été rapporté.",
    clinicalNotice: "« Ces symptômes peuvent avoir diverses origines. Le diagnostic de SOPK ne peut être posé que par un professionnel de santé qualifié. »",
    scoreLabel: "Probabilité du profil :",
    severitySignificant: "Profil polykystique significatif détecté (Significant)",
    severityModerate: "Signes hormonaux et métaboliques modérés",
    severityMild: "Indicateurs faibles / bénins",
    dietTitle: "🥗 Protocole Nutritionnel et Sensibilité à l’Insuline",
    lifestyleTitle: "🌸 Stratégies Hygiéno-Diététiques Anti-Androgéniques",
    testsTitle: "🩺 Bilan Biologique Recommandé pour Votre Gynécologue",
    questionsTitle: "📋 4 Questions Clés à Poser à Votre Médecin",
    downloadBtn: "Télécharger le Rapport Médical",
    retake: "Repasser le questionnaire",
    questions: [
          {
                "key": "irregularPeriods",
                "text": "Vos règles sont-elles fréquemment irrégulières ou imprévisibles ?"
          },
          {
                "key": "missedPeriods",
                "text": "Avez-vous eu des absences de règles pendant deux mois consécutifs ou plus (hors grossesse) ?"
          },
          {
                "key": "persistentAcne",
                "text": "Avez-vous remarqué une acné kystique persistante, en particulier sur la mâchoire, le menton ou le dos ?"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "Avez-vous constaté une prise de poids rapide ou des difficultés à maigrir malgré sport et alimentation saine ?"
          },
          {
                "key": "unusualHairGrowth",
                "text": "Avez-vous remarqué une pilosité excessive ou foncée sur le visage, le menton, la poitrine ou le ventre (hirsutisme) ?"
          },
          {
                "key": "hairThinning",
                "text": "Avez-vous constaté un éclaircissement ou une chute excessive de vos cheveux sur le dessus du cuir chevelu ?"
          },
          {
                "key": "moodChanges",
                "text": "Ressentez-vous d’importantes sautes d’humeur, une anxiété accrue ou des épisodes dépressifs ?"
          },
          {
                "key": "cyclePredictDifficulty",
                "text": "Avez-vous du mal à anticiper la date d’arrivée de votre prochain cycle ?"
          }
    ],
    symptoms: {
          "irregularPeriods": "Irrégularité menstruelle fréquente",
          "missedPeriods": "Cycles manqués ou retards importants",
          "persistentAcne": "Acné persistante ou kystique",
          "unexplainedWeightChange": "Prise de poids rapide / difficulté à perdre",
          "unusualHairGrowth": "Hirsutisme / pilosité indésirable",
          "hairThinning": "Chute de cheveux au sommet du crâne",
          "moodChanges": "Sautes d’humeur sévères ou fatigue intense",
          "cyclePredictDifficulty": "Durée de cycle imprévisible"
    },
    defaultDiet: [
          "Alimentation à faible charge glycémique (Bas-GL) : Céréales complètes, légumineuses et fibres pour éviter les pics d’insuline qui stimulent les androgènes ovariens.",
          "Apport protéique matinal : Consommer 25 à 30 g de protéines dès le matin stabilise la glycémie tout au long de la journée.",
          "Modération des sucres raffinés et produits laitiers : Diminuer les sucreries atténue l’inflammation et les poussées d’acné."
    ],
    defaultLifestyle: [
          "Thé à la menthe verte (2 tasses par jour) : Réduit cliniquement la testostérone libre et freine la pousse des poils androgéniques.",
          "Myo-Inositol et D-Chiro-Inositol (ratio 40:1) : Favorise la restauration de l’ovulation et améliore la sensibilité à l’insuline.",
          "Entraînement en résistance : 2 à 3 séances de renforcement musculaire hebdomadaires stimulent le captage du glucose.",
          "Sommeil réparateur et gestion du stress : Réduit le cortisol vespéral et apaise les tensions pelviennes."
    ],
    defaultTests: [
          "Échographie pelvienne (évaluation de la morphologie ovarienne et de la réserve folliculaire)",
          "Dosage hormonal au 3e jour du cycle (rapport LH/FSH)",
          "Insuline à jeun et glycémie à jeun (calcul de l’indice HOMA-IR)",
          "Testostérone totale et libre, DHEA-S (profil androgénique)",
          "Bilan lipidique et vitamine D3"
    ],
    defaultDoctorQ: [
          "1. Au vu de mes symptômes, recommandez-vous une échographie pelvienne ?",
          "2. Pouvons-nous tester mon insuline à jeun (indice HOMA-IR) pour dépister une résistance à l’insuline ?",
          "3. Une supplémentation en Myo-Inositol (40:1) serait-elle adaptée à mon profil ?",
          "4. Quels traitements ou approches préconisez-vous contre l’hirsutisme et l’acné ?"
    ],
  },
  ar: {
    badge: "الصحة الهرمونية",
    title: "فحص التوعية بمتلازمة تكيس المبايض (PCOS)",
    subtitle: "تقييم الأعراض المرتبطة بمتلازمة تكيس المبايض والحصول على إرشادات طبية وحياتية متخصصة.",
    stepText: (cur, total) => `السؤال ${cur} من ${total}`,
    completed: "مكتمل",
    yes: "نعم",
    sometimes: "أحياناً",
    no: "لا",
    back: "← العودة للسؤال السابق",
    summaryTitle: "الملخص الطبي والتوجيهات لتكيس المبايض",
    summarySub: "تم تحليل الإجابات وتوثيق التوصيات في ملفك الصحي.",
    reportedTitle: (n) => `الأعراض والمؤشرات المسجلة (${n}):`,
    noSymptoms: "لم يتم تسجيل أي أعراض واضحة تشير لتكيس المبايض.",
    clinicalNotice: "“هذه الأعراض قد تعود لعدة أسباب. تشخيص تكيس المبايض يتطلب مراجعة طبيب نسائي مؤهل.”",
    scoreLabel: "احتمالية النمط:",
    severitySignificant: "نمط تكيس مبايض واضح (Significant)",
    severityModerate: "مؤشرات هرمونية وأيضية معتدلة",
    severityMild: "مؤشرات خفيفة / منخفضة",
    dietTitle: "🥗 التغذية العلاجية وتنظيم الإنسولين",
    lifestyleTitle: "🌸 التوازن الهرموني وتعديل نمط الحياة",
    testsTitle: "🩺 الفحوصات المخبرية الموصى بها لدى طبيب النساء",
    questionsTitle: "📋 4 أسئلة جوهرية لطبيبك المعالج",
    downloadBtn: "تحميل التقرير الطبي",
    retake: "إعادة الفحص",
    questions: [
          {
                "key": "irregularPeriods",
                "text": "هل دورتك الشهرية غير منتظمة أو غير متوقعة الموعد غالباً؟"
          },
          {
                "key": "missedPeriods",
                "text": "هل انقطعت دورتك لشهرين متتاليين أو أكثر (في حال عدم وجود حمل)؟"
          },
          {
                "key": "persistentAcne",
                "text": "هل تعانين من حب شباب كيسي مستمر، خاصة في منطقة الفك أو الذقن أو الظهر؟"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "هل عانيت من زيادة سريعة بالوزن أو صعوبة في إنقاصه رغم ممارسة الرياضة والغذاء الصحي؟"
          },
          {
                "key": "unusualHairGrowth",
                "text": "هل لاحظت نمو شعر داكن وغير مرغوب فيه على الوجه أو الذقن أو الصدر أو البطن (الشعرانية)؟"
          },
          {
                "key": "hairThinning",
                "text": "هل لاحظت تساقطاً أو خفة في شعر مقدمة وأعلى الرأس؟"
          },
          {
                "key": "moodChanges",
                "text": "هل تشعرين بتقلبات مزاجية حادة أو قلق متزايد أو اكتئاب؟"
          },
          {
                "key": "cyclePredictDifficulty",
                "text": "هل تجدين صعوبة في التنبؤ بموعد دورتك القادمة؟"
          }
    ],
    symptoms: {
          "irregularPeriods": "عدم انتظام الدورة الشهرية",
          "missedPeriods": "غياب الدورة أو تأخرها المتكرر",
          "persistentAcne": "حب شباب عنيد ومستمر",
          "unexplainedWeightChange": "صعوبة نزول الوزن أو زيادة سريعة",
          "unusualHairGrowth": "شعرانية / نمو شعر غير مرغوب",
          "hairThinning": "تساقط وترقق شعر الرأس",
          "moodChanges": "تقلبات مزاجية شديدة وإرهاق",
          "cyclePredictDifficulty": "عدم انتظام فترات الدورة"
    },
    defaultDiet: [
          "حمية منخفضة المؤشر الجلايسيمي (Low-GL): الألياف، الحبوب الكاملة والبقوليات تمنع ارتفاع الإنسولين المفاجئ الذي يحفز إفراز الأندروجين.",
          "وجبة إفطار غنية بالبروتين: تناول 25-30 غرام بروتين صباحاً يحافظ على استقرار سكر الدم طوال اليوم.",
          "تقليل السكريات ومنتجات الألبان: الحد من السكر المكرر يخفف الالتهاب ويقلل من بثور البشرة."
    ],
    defaultLifestyle: [
          "شاي النعناع المدبب (Spearmint) كوبان يومياً: أثبتت الدراسات فعاليته في خفض التستوستيرون الحر وتقليل الشعر الزائد.",
          "مكمل ميو-إينوزيتول (بنسبة 40:1): يساعد في استعادة التبويض المنتظم وتحسين حساسية الإنسولين.",
          "تمارين المقاومة والقوة: ممارسة التمارين 2-3 مرات أسبوعياً تنشط حرق الجلوكوز في العضلات.",
          "نوم منتظم وإدارة الإجهاد: النوم الكافي يقلل هرمون الكورتيزول ويساعد في ضبط الهرمونات الأنثوية."
    ],
    defaultTests: [
          "سونار الحوض والمبايض (Pelvic Ultrasound)",
          "فحص هرمونات اليوم الثالث للدورة (نسبة LH إلى FSH)",
          "تحليل إنسولين وسكر صائم (مؤشر HOMA-IR لمقاومة الإنسولين)",
          "التستوستيرون الكلي والحر وهرمون DHEA-S",
          "فحص الدهون الثلاثية وفيتامين D3"
    ],
    defaultDoctorQ: [
          "1. هل تنصحين بإجراء سونار للحوض لفحص المبايض وسماكة بطانة الرحم؟",
          "2. هل يمكننا فحص الإنسولين الصائم لحساب مقاومة الإنسولين (HOMA-IR)؟",
          "3. هل يناسبني مكمل ميو-إينوزيتول (40:1) لتنظيم التبويض؟",
          "4. ما هي أفضل الخيارات الطبية لمعالجة حب الشباب والشعر الزائد؟"
    ],
  },
  lb: {
    badge: "الصحة الهرمونية",
    title: "فحص التوعية بتكيس المبايض (PCOS)",
    subtitle: "تقييم الأعراض المرتبطة بمتلازمة تكيس المبايض مع نصايح طبية وغذائية مخصصة لإلك.",
    stepText: (cur, total) => `سؤال ${cur} من ${total}`,
    completed: "خلص الفحص",
    yes: "إيه",
    sometimes: "أوقات",
    no: "لأ",
    back: "← رجوع للسؤال اللي قبلو",
    summaryTitle: "الملخص الطبي والتوجيهات لتكيس المبايض",
    summarySub: "تحللت الأجوبة وتسيّفت بملفك الصحي مع نصايح هرمونية مفيدة.",
    reportedTitle: (n) => `الأعراض المسجلة (${n}):`,
    noSymptoms: "ما تسجّل أي أعراض ملحوظة لتكيس المبايض بهالفحص.",
    clinicalNotice: "“هالعوارض ممكن يكون إلها كذا سبب، والتأكيد بيتطلب فحص مع حكيم النسائية المختص.”",
    scoreLabel: "احتمالية النمط:",
    severitySignificant: "نمط تكيس مبايض واضح (Significant)",
    severityModerate: "مؤشرات هرمونية وأيضية متوسطة",
    severityMild: "مؤشرات خفيفة / طبيعية",
    dietTitle: "🥗 تنظيم الأكل وحساسية الإنسولين",
    lifestyleTitle: "🌸 التوازن الهرموني وتغيير نمط الحياة",
    testsTitle: "🩺 الفحوصات والتحاليل المطلوبة عند طبيب النسائية",
    questionsTitle: "📋 4 أسئلة مهمة لتسأليها للحكيم",
    downloadBtn: "تنزيل التقرير الطبي",
    retake: "إعادة الفحص من جديد",
    questions: [
          {
                "key": "irregularPeriods",
                "text": "دورتك الشهرية بتيجي ملخبطة أو أوقاتها مش مظبوطة؟"
          },
          {
                "key": "missedPeriods",
                "text": "غابت عنك الدورة لشهرين ورا بعض أو أكتر (من دون حمل)؟"
          },
          {
                "key": "persistentAcne",
                "text": "عم تعاني من حب شباب قوي وعنيد، خصوصاً بمنطقة الدقن أو الضهر؟"
          },
          {
                "key": "unexplainedWeightChange",
                "text": "عم تزيدي وزن بسرعة أو عم تلاقي صعوبة كبيرة لتنزلي وزنك؟"
          },
          {
                "key": "unusualHairGrowth",
                "text": "لاحظتي شعر زايد وخميل عم يطلع بالوجه، الدقن، أو الصدر؟"
          },
          {
                "key": "hairThinning",
                "text": "عم تلاحظي تساقط شعر كتير أو خفّة بشعرك من قدام ومن فوق؟"
          },
          {
                "key": "moodChanges",
                "text": "بتحسي بتغيرات قوية بالمزاج، توتر زايد، أو إحباط؟"
          },
          {
                "key": "cyclePredictDifficulty",
                "text": "صعب عليكي تعرفي إيمتى رح تيجي الدورة الجاية؟"
          }
    ],
    symptoms: {
          "irregularPeriods": "دورة شهرية ملخبطة",
          "missedPeriods": "تأخر أو غياب الدورة",
          "persistentAcne": "حب شباب عنيد ومزعج",
          "unexplainedWeightChange": "صعوبة بنزول الوزن أو زيادة سريعة",
          "unusualHairGrowth": "شعر زايد بالوجه والجسم",
          "hairThinning": "تساقط وخفة بالشعر",
          "moodChanges": "عصبية وتغيرات بالمزاج",
          "cyclePredictDifficulty": "وقت الدورة مش متوقع"
    },
    defaultDiet: [
          "أكل قليل السكر وعالي الألياف: بقوليات، حبوب كاملة، وخضار بتمنع ارتفاع الإنسولين المفاجئ.",
          "ترويقة غنية بالبروتين: بيض، لبن، ومكسرات ع الصبح بيحافظوا ع توازن السكر بالدم طول النهار.",
          "تخفيف الحلو والسكاكر: تخفيف السكر المصنّع بيساعد كتير بتخفيف الحبوب والالتهابات."
    ],
    defaultLifestyle: [
          "شاي النعناع المدبب: كبايتين باليوم بيساعدوا ع تخفيف هرمون التستوستيرون وتخفيف الشعر الزايد.",
          "مكمل ميو-إينوزيتول (40:1): ممتاز لتنظيم التبويض وتحسين حساسية الخلايا للإنسولين.",
          "تمارين ومقاومة: الرياضة ٢-٣ مرات بالأسبوع بتساعد العضلات تحرق السكر بشكل أحسن.",
          "نوم وراحة بال: خففي الستريس ونامي منيح لتعدلي هرمونات الكورتيزول."
    ],
    defaultTests: [
          "إيكو للحوض والمبايض (Pelvic Ultrasound)",
          "فحص هرمونات تالت يوم دورة (LH و FSH)",
          "فحص إنسولين وسكر صائم (HOMA-IR)",
          "فحص التستوستيرون وهرمون DHEA-S",
          "فحص دهنيات الدم وفيتامين D3"
    ],
    defaultDoctorQ: [
          "1. بتنصحني نعمل إيكو لنشوف وضع المبايض وسماكة بطانة الرحم؟",
          "2. فينا نعمل فحص الإنسولين الصائم (HOMA-IR) لنشوف مقاومة الإنسولين؟",
          "3. هل مكمل ميو-إينوزيتول مناسب لوضعي ولتنظيم الدورة؟",
          "4. شو بتنصحني كعلاج فعال للحبوب والشعر الزايد؟"
    ],
  }
};

export default function PCOSCheck() {
  const { language } = useLanguage();
  const dict = PCOS_DATA[language] || PCOS_DATA.en;
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
      const res = await api.post('/assessments/pcos', { answers: finalAnswers });
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
      // Local fallback calculation ensures user ALWAYS sees rich suggestions immediately
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
    const reportText = `=== FEMTECH PCOS AWARENESS SUMMARY REPORT ===\n` +
      `Date: ${new Date().toLocaleDateString()}\n` +
      `Pattern Likelihood: ${result.probabilityPercentage || 50}% (${result.severityIndicator || 'Evaluated'})\n\n` +
      `REPORTED SYMPTOMS:\n` +
      `${(result.reportedSymptoms || []).map(s => `- ${s}`).join('\n')}\n\n` +
      `DIETARY PROTOCOL:\n` +
      `${(result.dietaryAdvice || dict.defaultDiet).map(d => `- ${d}`).join('\n')}\n\n` +
      `HORMONAL & LIFESTYLE INTERVENTIONS:\n` +
      `${(result.lifestyleAdvice || dict.defaultLifestyle).map(l => `- ${l}`).join('\n')}\n\n` +
      `RECOMMENDED LAB TESTS FOR DOCTOR:\n` +
      `${(result.clinicalTests || dict.defaultTests).map(t => `- ${t}`).join('\n')}\n\n` +
      `QUESTIONS FOR GYNECOLOGIST:\n` +
      `${(result.doctorQuestions || dict.defaultDoctorQ).map(q => `- ${q}`).join('\n')}\n\n` +
      `Disclaimer: FemTech is an educational health technology platform and does not provide formal medical diagnosis.\n`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FemTech_PCOS_Summary_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Translate reported symptoms
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
            🩺
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
        /* EXPANSIVE CLINICAL RESULT & TARGETED SUGGESTIONS VIEW */
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

          {/* 2. PERSONALIZED NUTRITIONAL & INSULIN PROTOCOL */}
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

          {/* 3. HORMONAL & ANTI-ANDROGEN LIFESTYLE STRATEGIES */}
          <div className="glass-card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Sparkles size={24} color="#db2777" />
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

          {/* 4. RECOMMENDED DIAGNOSTIC LAB TESTS FOR GYNECOLOGIST */}
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

          {/* 5. 4 KEY QUESTIONS TO ASK YOUR DOCTOR */}
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
