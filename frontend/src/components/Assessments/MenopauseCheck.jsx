import React, { useState } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { useSmsAlert } from '../../context/SmsAlertContext';
import {
  Flame,
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
  Download,
  Smartphone,
  Shield,
  Heart
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const MENOPAUSE_CHECK_DATA = {
  en: {
    badge: 'Hormonal Transition Health',
    title: 'Menopause & Perimenopause Clinical Awareness Check',
    subtitle: 'Evaluate classic hormonal transition signs, identify your stage (Perimenopause vs Menopause), and receive clinical nutrition, bone health, and physician guidance.',
    stepText: (cur, total) => `Question ${cur} of ${total}`,
    completed: 'Completed',
    yes: 'Yes',
    sometimes: 'Sometimes',
    no: 'No',
    back: '← Back to previous question',
    summaryTitle: 'Menopause Clinical Assessment Summary & Stage Analysis',
    summarySub: 'Questionnaire evaluated against endocrinology transition benchmarks and saved to your health profile.',
    reportedTitle: (n) => `Reported Symptoms & Indicators (${n}):`,
    noSymptoms: 'No significant menopausal or perimenopausal indicators were reported.',
    clinicalNotice: '“Menopause is a natural physiological evolution. A comprehensive hormone panel (Serum FSH, LH, Estradiol) and clinical review by your OB/GYN can optimize your well-being.”',
    scoreLabel: 'Transition Stage:',
    stageConfirmed: 'Clinically Confirmed Menopause (12+ Mo Amenorrhea)',
    stageActivePeri: 'Active Perimenopause Transition',
    stageEarlyPeri: 'Early Perimenopause / Mild Fluctuations',
    stagePre: 'Premenopause / Minimal Vasomotor Signs',
    dietTitle: '🥗 Phytoestrogen & Bone-Support Nutrition Blueprint',
    lifestyleTitle: '🌸 Vasomotor Relief & Skeletal Density Strategies',
    testsTitle: '🩺 Recommended Diagnostic Lab Tests for Gynecologist',
    questionsTitle: '📋 4 Key Questions to Ask Your Doctor',
    downloadBtn: 'Download Clinical Summary',
    retake: 'Retake Assessment',
    smsBtn: '📲 Send Summary to Registered Phone',
    smsSent: '✓ Menopause summary dispatched to phone!',
    questions: [
      { key: 'hotFlashes', text: 'Have you experienced sudden intense sensations of heat spreading across your chest, neck, and face (hot flashes)?' },
      { key: 'irregularCycles', text: 'Have your menstrual periods become noticeably irregular in frequency, duration, or flow volume in recent months?' },
      { key: 'nightSweats', text: 'Do you frequently wake up in the middle of the night drenched in cold sweat or overheating (night sweats)?' },
      { key: 'sleepDisturbance', text: 'Are you struggling with persistent insomnia, interrupted sleep, or difficulty staying asleep throughout the night?' },
      { key: 'moodSwings', text: 'Have you experienced unexplained mood fluctuations, sudden irritability, heightened anxiety, or feelings of exhaustion?' },
      { key: 'brainFog', text: 'Have you noticed frequent mental fatigue, difficulty concentrating, or sudden memory lapses (\'brain fog\')?' },
      { key: 'vaginalDryness', text: 'Have you noticed vaginal dryness, burning, itching, or discomfort/pain during intimacy (genitourinary symptoms)?' },
      { key: 'jointStiffness', text: 'Are you experiencing new or worsening joint aches, morning stiffness in fingers/knees, or muscle soreness?' },
      { key: 'weightMetabolism', text: 'Have you experienced noticeable changes in metabolism, such as rapid weight gain around the abdomen or fatigue?' },
      { key: 'ceasedPeriods12Months', text: 'Has your menstrual cycle completely stopped for 12 or more consecutive months (without pregnancy or surgery)?' }
    ],
    symptoms: {
      hotFlashes: 'Vasomotor Heat Waves / Hot Flashes',
      irregularCycles: 'Menstrual Irregularity or Timing Shifts',
      nightSweats: 'Night Sweats / Nocturnal Flushing',
      sleepDisturbance: 'Insomnia & Disrupted Sleep Architecture',
      moodSwings: 'Mood Fluctuations, Irritability & Anxiety',
      brainFog: 'Mental Fatigue & Cognitive Brain Fog',
      vaginalDryness: 'Genitourinary Symptoms / Vaginal Dryness',
      jointStiffness: 'Joint Stiffness & Musculoskeletal Aches',
      weightMetabolism: 'Metabolic Shift & Abdominal Weight Changes',
      ceasedPeriods12Months: 'Amenorrhea (No Periods for 12+ Months)'
    },
    defaultDiet: [
      'Phytoestrogen Superfoods: Add 1-2 tbsp freshly ground golden flaxseeds and non-GMO fermented soy (tempeh, miso, edamame) which supply dietary lignans and isoflavones that gently bind estrogen receptors.',
      'Target Calcium (1,200 mg/day): Consume calcium-dense leafy greens, sesame seeds (tahini), chia seeds, and fortified organic plant or dairy milk with meals.',
      'Anti-Inflammatory Mediterranean Protocol: Prioritize extra-virgin olive oil, wild salmon (omega-3s), walnuts, and berries to suppress inflammatory cytokines that exacerbate joint stiffness.'
    ],
    defaultLifestyle: [
      'Weight-Bearing Resistance Training (3x weekly): Squats, lunges, and resistance bands signal osteoblasts to rebuild bone matrix, shielding against osteoporosis.',
      'Core Temperature Optimization: Maintain bedroom temperature around 18-20°C with layered breathable bamboo/cotton sheets and keep chilled water bedside.',
      'Vitamin D3 (1,000–2,000 IU) + Vitamin K2 (MK-7): Crucial cofactors that steer absorbed calcium directly into bone mineral tissue rather than arterial walls.',
      'Magnesium Glycinate (300-350mg at bedtime): Calms central nervous system hyperexcitability and alleviates nocturnal muscle cramps.'
    ],
    defaultTests: [
      'Serum FSH (Follicle-Stimulating Hormone) & Serum LH Profile',
      'Serum Estradiol (E2) - Estrogen Baseline Evaluation',
      'Complete Thyroid Panel (TSH, FT3, FT4) to rule out mimicking thyroid conditions',
      'DEXA Bone Mineral Density Scan (lumbar spine & femoral neck baseline)',
      'Lipid Profile & Fasting Blood Glucose (Post-estrogen cardiometabolic screening)',
      'Pelvic Ultrasound (endometrial stripe thickness evaluation)'
    ],
    defaultDoctorQ: [
      '1. Based on my symptoms and cycle history, am I in early perimenopause or clinical menopause?',
      '2. Would I be a good candidate for Menopausal Hormone Therapy (MHT / HRT) or natural transdermal bioidentical progesterone?',
      '3. Can we schedule a baseline DEXA bone density scan to safeguard against osteoporosis?',
      '4. What evidence-based therapies or localized estrogen creams do you recommend for vaginal comfort and pelvic health?'
    ]
  },
  ta: {
    badge: 'ஹார்மோன் மாற்ற நலம்',
    title: 'மெனோபாஸ் & பெரிமெனோபாஸ் மருத்துவ விழிப்புணர்வு பரிசோதனை',
    subtitle: 'ஹார்மோன் மாற்ற அறிகுறிகளை மதிப்பீடு செய்து, உங்கள் நிலை (பெரிமெனோபாஸ் / முழு மெனோபாஸ்) எது என்பதை அறிந்து மருத்துவ உணவு, எலும்பு நலம் மற்றும் மருத்துவர் வழிகாட்டல்களைப் பெறுங்கள்.',
    stepText: (cur, total) => `கேள்வி ${cur} / ${total}`,
    completed: 'முடிந்தது',
    yes: 'ஆம்',
    sometimes: 'சில நேரங்களில்',
    no: 'இல்லை',
    back: '← முந்தைய கேள்விக்குத் திரும்பு',
    summaryTitle: 'மெனோபாஸ் மருத்துவ விழிப்புணர்வு முடிவு & நிலை பகுப்பாய்வு',
    summarySub: 'பதில்கள் மதிப்பீடு செய்யப்பட்டு தனிப்பயனாக்கப்பட்ட மருத்துவ பரிந்துரைகளுடன் சேமிக்கப்பட்டது.',
    reportedTitle: (n) => `பதிவான அறிகுறிகள் & எச்சரிக்கைகள் (${n}):`,
    noSymptoms: 'குறிப்பிடத்தக்க மெனோபாஸ் அறிகுறிகள் எதுவும் பதிவாகவில்லை.',
    clinicalNotice: '“மெனோபாஸ் என்பது பெண்களின் உடலில் நிகழும் இயற்கையான ஹார்மோன் மாற்றப் பருவம். இரத்த ஹார்மோன் பரிசோதனை (FSH, Estradiol) மற்றும் மகப்பேறு மருத்துவர் ஆலோசனை மூலம் சிறந்த நல்வாழ்வைப் பெறலாம்.”',
    scoreLabel: 'மாற்ற நிலை:',
    stageConfirmed: 'மருத்துவ ரீதியாக உறுதிசெய்யப்பட்ட மெனோபாஸ் (12+ மாதங்கள்)',
    stageActivePeri: 'செயலில் உள்ள பெரிமெனோபாஸ் நிலை (ஹார்மோன் மாற்றம்)',
    stageEarlyPeri: 'தொடக்க நிலை பெரிமெனோபாஸ் / லேசான அறிகுறிகள்',
    stagePre: 'ப்ரீ-மெனோபாஸ் / மிகக் குறைந்த அறிகுறிகள்',
    dietTitle: '🥗 பைட்டோ-ஈஸ்ட்ரோஜன் & எலும்பு பலப்படுத்தும் ஊட்டச்சத்து முறை',
    lifestyleTitle: '🌸 வெப்ப அலைகள் கட்டுப்பாடு & எலும்பு அடர்த்தி வழிகாட்டல்',
    testsTitle: '🩺 மருத்துவரிடம் பரிந்துரைக்கப்படும் சோதனைகள் (Lab Tests)',
    questionsTitle: '📋 உங்கள் மருத்துவரிடம் கேட்க வேண்டிய 4 முக்கிய கேள்விகள்',
    downloadBtn: 'மருத்துவ அறிக்கையைப் பதிவிறக்குக',
    retake: 'மீண்டும் பரிசோதிக்கவும்',
    smsBtn: '📲 நிலவரத்தை எனது மொபைலுக்கு SMS அனுப்பவும்',
    smsSent: '✓ மெனோபாஸ் அறிக்கை உங்கள் மொபைலுக்கு அனுப்பப்பட்டது!',
    questions: [
      { key: 'hotFlashes', text: 'உங்கள் மார்பு, கழுத்து மற்றும் முகத்தில் திடீரென தீவிர உஷ்ண அலைகள் பரவுவதை (Hot Flashes) உணர்கிறீர்களா?' },
      { key: 'irregularCycles', text: 'சமீபத்திய மாதங்களில் உங்கள் மாதவிடாய் நாட்கள் தள்ளிப்போவது, சுழற்சி நீளம் அல்லது இரத்தப்போக்கு அளவில் மாற்றங்கள் ஏற்பட்டுள்ளதா?' },
      { key: 'nightSweats', text: 'இரவில் தூங்கும்போது அதிக வியர்வையுடன் நனைந்து திடீரென விழித்துக் கொள்ளும் நிலை (Night Sweats) அடிக்கடி ஏற்படுகிறதா?' },
      { key: 'sleepDisturbance', text: 'தொடர்ச்சியான தூக்கமின்மை, நள்ளிரவில் அடிக்கடி விழிப்பு வருதல் அல்லது ஆழ்ந்த உறக்கம் கிடைக்காமல் தவிக்கிறீர்களா?' },
      { key: 'moodSwings', text: 'விவரிக்க முடியாத திடீர் மனநிலை மாற்றங்கள், எளிதில் எரிச்சலடைதல், காரணமற்ற பதட்டம் அல்லது சோர்வை உணர்கிறீர்களா?' },
      { key: 'brainFog', text: 'மனச்சோர்வு, வேலையில் கவனம் செலுத்த இயலாமை அல்லது பெயர்கள்/விஷயங்களை மறக்கும் \'பிரைன் ஃபாக்\' (Brain Fog) உள்ளதா?' },
      { key: 'vaginalDryness', text: 'பிறப்புறுப்பு பகுதியில் வறட்சி, அரிப்பு, எரிச்சல் அல்லது தாம்பத்தியத்தின் போது வலி/அசௌகரியம் இருக்கிறதா?' },
      { key: 'jointStiffness', text: 'காலையில் எழும்போது கைகள், மூட்டுகளில் இறுக்கம், முழங்கால் வலி அல்லது விவரிக்க முடியாத தசை வலிகள் உள்ளதா?' },
      { key: 'weightMetabolism', text: 'வளர்சிதை மாற்றம் குறைந்து அடிவயிற்றில் திடீரென எடை கூடுதல், தொப்பை போடுதல் அல்லது தொடர் ஆற்றல் குறைபாடு உள்ளதா?' },
      { key: 'ceasedPeriods12Months', text: 'கர்ப்பம் அல்லது அறுவைசிகிச்சை இல்லாமல், உங்கள் மாதவிடாய் இரத்தப்போக்கு தொடர்ந்து 12 மாதங்கள் அல்லது அதற்கு மேல் முற்றிலுமாக நின்றுவிட்டதா?' }
    ],
    symptoms: {
      hotFlashes: 'தீவிர உஷ்ண அலைகள் (Hot Flashes)',
      irregularCycles: 'மாதவிடாய் சுழற்சி தாமதம் / மாறுதல்கள்',
      nightSweats: 'இரவு நேர வியர்வை (Night Sweats)',
      sleepDisturbance: 'தூக்கமின்மை மற்றும் உறக்கச் சிதைவு',
      moodSwings: 'மனநிலை மாற்றங்கள், எரிச்சல், பதட்டம்',
      brainFog: 'கவனக்குறைவு & நினைவாற்றல் மங்குதல் (Brain Fog)',
      vaginalDryness: 'பிறப்புறுப்பு வறட்சி / அசௌகரியம்',
      jointStiffness: 'மூட்டு வலி மற்றும் தசை இறுக்கம்',
      weightMetabolism: 'வளர்சிதை மாற்றக் குறைவு & எடை கூடுதல்',
      ceasedPeriods12Months: '12+ மாதங்களாக மாதவிடாய் முற்றிலுமாக நிற்றல்'
    },
    defaultDiet: [
      'பைட்டோ-ஈஸ்ட்ரோஜன் உணவுகள்: பொடித்த ஆளிவிதை (Flaxseeds) 1-2 ஸ்பூன், சோயா உணவுகள் (டோஃபு, எடமாமே) ஆகியவற்றை உணவில் சேர்க்கவும்; இவை உடலில் உள்ள ஈஸ்ட்ரோஜன் ஏற்பிகளை இயற்கையாக சமன் செய்கின்றன.',
      'கால்சியம் நிறைந்த உணவுகள் (1,200 மி.கி/நாள்): கீரைகள், எள், சியா விதைகள் மற்றும் பால் பொருட்களைத் தவறாமல் சேர்த்துக் கொள்ளுங்கள்.',
      'வீக்கத்தைக் குறைக்கும் உணவு முறை: ஆலிவ் எண்ணெய், வால்நட் பருப்புகள், வண்ணமயமான காய்கறிகளைச் சாப்பிடுவது மூட்டு வலியைக் குறைக்கும்.'
    ],
    defaultLifestyle: [
      'எடை தாங்கும் உடற்பயிற்சி (வாரத்திற்கு 3 முறை): நடைப்பயிற்சி, ஸ்குவாட்ஸ் மற்றும் யோகா எலும்புகளின் அடர்த்தியைப் பாதுகாக்கும்.',
      'படுக்கை அறை குளிர்ச்சி: இரவில் படுக்கை அறையை குளிர்ச்சியாக வைத்துக்கொள்ளுங்கள்; இரவில் வியர்வை வந்தால் குடிக்க குளிர்ந்த நீரை அருகில் வையுங்கள்.',
      'வைட்டமின் D3 மற்றும் மெக்னீசியம்: எலும்புகளுக்கு கால்சியம் சேர வைட்டமின் D3 மற்றும் அமைதியான தூக்கத்திற்கு மெக்னீசியம் உதவும்.'
    ],
    defaultTests: [
      'இரத்த ஹார்மோன் பரிசோதனை: FSH (Follicle-Stimulating Hormone) மற்றும் சீரம் எஸ்ட்ராடியோல் (E2)',
      'முழுமையான தைராய்டு பரிசோதனை (TSH, FT3, FT4)',
      'DEXA ஸ்கேன் (DEXA Bone Mineral Density - எலும்பு அடர்த்தி பரிசோதனை)',
      'லிப்பிட் ப்ரொஃபைல் & இரத்த சர்க்கரை பரிசோதனை (இதய நலம்)',
      'இடுப்பு அல்ட்ராசவுண்ட் ஸ்கேன் (Pelvic Ultrasound)'
    ],
    defaultDoctorQ: [
      '1. எனது அறிகுறிகளின்படி நான் பெரிமெனோபாஸ் நிலையிலா அல்லது முழு மெனோபாஸ் நிலையிலா இருக்கிறேன்?',
      '2. எனக்கு ஹார்மோன் மாற்று சிகிச்சை (HRT) அல்லது இயற்கையான புரோஜெஸ்டிரோன் சிகிச்சை தேவையா?',
      '3. ஆஸ்டியோபோரோசிஸ் வராமல் தடுக்க எலும்பு அடர்த்தி DEXA ஸ்கேன் எடுக்கலாமா?',
      '4. பிறப்புறுப்பு வறட்சி மற்றும் மூட்டு வலிக்கு என்ன பாதுகாப்பான மருத்துவ வழிகாட்டல் உண்டு?'
    ]
  },
  hi: {
    badge: 'हार्मोनल स्वास्थ्य',
    title: 'रजोनिवृत्ति (मेनोपॉज) एवं पेरिमेनोपॉज क्लिनिकल जांच',
    subtitle: 'हार्मोनल बदलाव के लक्षणों का मूल्यांकन करें, अपनी स्थिति जानें और आहार, हड्डियों की सेहत व डॉक्टर के सुझाव प्राप्त करें।',
    stepText: (cur, total) => `प्रश्न ${cur} / ${total}`,
    completed: 'पूर्ण',
    yes: 'हाँ',
    sometimes: 'कभी-कभी',
    no: 'नहीं',
    back: '← पिछले प्रश्न पर वापस जाएं',
    summaryTitle: 'मेनोपॉज स्वास्थ्य मूल्यांकन सारांश एवं स्थिति',
    summarySub: 'प्रश्नावली का मूल्यांकन अंतःस्रावी मानकों के अनुसार किया गया और प्रोफ़ाइल में सहेजा गया।',
    reportedTitle: (n) => `दर्ज किए गए लक्षण एवं संकेत (${n}):`,
    noSymptoms: 'कोई महत्वपूर्ण मेनोपॉज लक्षण दर्ज नहीं किए गए।',
    clinicalNotice: '“मेनोपॉज एक प्राकृतिक शारीरिक प्रक्रिया है। हार्मोन रक्त परीक्षण (FSH, E2) और स्त्री रोग विशेषज्ञ की सलाह से स्वास्थ्य को बेहतर बनाया जा सकता है।”',
    scoreLabel: 'संक्रमण चरण:',
    stageConfirmed: 'पुष्ट रजोनिवृत्ति (12+ महीने से माहवारी बंद)',
    stageActivePeri: 'सक्रिय पेरिमेनोपॉज (हार्मोनल बदलाव)',
    stageEarlyPeri: 'शुरुआती पेरिमेनोपॉज / हल्के लक्षण',
    stagePre: 'प्री-मेनोपॉज / न्यूनतम लक्षण',
    dietTitle: '🥗 फाइटोएस्ट्रोजन एवं अस्थि पोषण योजना',
    lifestyleTitle: '🌸 हॉट फ्लैश राहत एवं हड्डियों की मजबूती',
    testsTitle: '🩺 अनुशंसित प्रयोगशाला परीक्षण (Lab Tests)',
    questionsTitle: '📋 अपने डॉक्टर से पूछने योग्य 4 मुख्य प्रश्न',
    downloadBtn: 'सारांश रिपोर्ट डाउनलोड करें',
    retake: 'पुनः जांच करें',
    smsBtn: '📲 पंजीकृत फोन पर विवरण भेजें',
    smsSent: '✓ विवरण सफलतापूर्वक फोन पर भेजा गया!',
    questions: [
      { key: 'hotFlashes', text: 'क्या आप अचानक छाती, गर्दन और चेहरे पर अत्यधिक गर्मी की लहरें (हॉट फ्लैशेस) महसूस करती हैं?' },
      { key: 'irregularCycles', text: 'क्या हाल के महीनों में आपकी माहवारी के दिनों, समय या रक्तस्राव में अनियमितता आई है?' },
      { key: 'nightSweats', text: 'क्या आप रात को सोते समय पसीने से भीग कर अचानक जाग जाती हैं (नाइट स्वेट्स)?' },
      { key: 'sleepDisturbance', text: 'क्या आपको अनिद्रा, बार-बार नींद टूटने या रात भर गहरी नींद न आने की समस्या है?' },
      { key: 'moodSwings', text: 'क्या आप अचानक मिजाज में बदलाव, चिड़चिड़ापन, घबराहट या अत्यधिक थकान महसूस करती हैं?' },
      { key: 'brainFog', text: 'क्या आप बार-बार ध्यान केंद्रित करने में कठिनाई या चीजें भूलने (ब्रेन फॉग) का अनुभव कर रही हैं?' },
      { key: 'vaginalDryness', text: 'क्या आपको योनि में सूखापन, खुजली या शारीरिक संबंध के दौरान असुविधा/दर्द महसूस होता है?' },
      { key: 'jointStiffness', text: 'क्या आपको सुबह जोड़ों में दर्द, उंगलियों/घुटनों में अकड़न या मांसपेशियों में दर्द महसूस होता है?' },
      { key: 'weightMetabolism', text: 'क्या आपके पेट के आसपास वजन बढ़ रहा है या सामान्य दिनों की तुलना में ऊर्जा में भारी गिरावट आई है?' },
      { key: 'ceasedPeriods12Months', text: 'क्या बिना किसी गर्भावस्था या सर्जरी के आपकी माहवारी लगातार 12 महीने या उससे अधिक समय से पूरी तरह बंद है?' }
    ],
    symptoms: {
      hotFlashes: 'हॉट फ्लैशेस (अत्यधिक गर्मी की लहरें)',
      irregularCycles: 'माहवारी में अनियमितता',
      nightSweats: 'रात में अत्यधिक पसीना आना',
      sleepDisturbance: 'अनिद्रा एवं नींद में बाधा',
      moodSwings: 'चिड़चिड़ापन, तनाव एवं मूड स्विंग्स',
      brainFog: 'ध्यान केंद्रित न होना (ब्रेन फॉग)',
      vaginalDryness: 'योनि में सूखापन / असुविधा',
      jointStiffness: 'जोड़ों व मांसपेशियों में दर्द',
      weightMetabolism: 'मेटाबॉलिज्म में कमी व वजन बढ़ना',
      ceasedPeriods12Months: 'लगातार 12+ महीने से माहवारी बंद होना'
    },
    defaultDiet: [
      'अलसी के बीज (Flaxseeds) व सोया: इनमें मौजूद प्राकृतिक फाइटोएस्ट्रोजन हार्मोन संतुलन में मदद करते हैं।',
      'कैल्शियम से भरपूर आहार (1,200 मिग्रा/दिन): हरी पत्तेदार सब्जियां, तिल, चिया बीज और दूध से बनी चीजें हड्डियों को मजबूत बनाती हैं।',
      'एंटी-इंफ्लेमेटरी आहार: अखरोट, जैतून का तेल और ताजे फल जोड़ों के दर्द को कम करते हैं।'
    ],
    defaultLifestyle: [
      'हड्डियों के लिए व्यायाम: रोजाना 30 मिनट तेज चलना या योग हड्डियों की सघनता बनाए रखता है।',
      'कमरे का तापमान: बेडरूम को ठंडा रखें और रात के पसीने से राहत के लिए बिस्तर के पास पानी रखें।',
      'विटामिन D3 व मैग्नीशियम: अच्छी नींद और कैल्शियम अवशोषण के लिए आवश्यक है।'
    ],
    defaultTests: [
      'सीरम FSH एवं एस्ट्राडियोल (E2) हार्मोन प्रोफाइल',
      'थायरॉयड पैनल (TSH, FT3, FT4)',
      'DEXA बोन डेंसिटी स्कैन (हड्डियों की जांच)',
      'लिपिड प्रोफाइल एवं ब्लड शुगर'
    ],
    defaultDoctorQ: [
      '1. क्या मैं पेरिमेनोपॉज में हूँ या पूर्ण मेनोपॉज में?',
      '2. क्या मुझे हार्मोन रिप्लेसमेंट थेरेपी (HRT) की आवश्यकता है?',
      '3. क्या ऑस्टियोपोरोसिस से बचाव के लिए मुझे DEXA स्कैन कराना चाहिए?',
      '4. योनि सूखेपन और जोड़ों के दर्द के लिए सुरक्षित उपाय क्या हैं?'
    ]
  },
  te: {
    badge: 'హార్మోన్ల మార్పు ఆరోగ్యం',
    title: 'మెనోపాజ్ & పెరిమెనోపాజ్ క్లినికల్ పరీక్ష',
    subtitle: 'హార్మోన్ల మార్పు సంకేతాలను అంచనా వేయండి మరియు సరైన ఆహార, ఎముకల ఆరోగ్య మరియు వైద్య సలహాలను పొందండి.',
    stepText: (cur, total) => `ప్రశ్న ${cur} / ${total}`,
    completed: 'పూర్తయింది',
    yes: 'అవును',
    sometimes: 'కొన్నిసార్లు',
    no: 'కాదు',
    back: '← మునుపటి ప్రశ్నకు వెళ్లండి',
    summaryTitle: 'మెనోపాజ్ ఆరోగ్య అంచనా సారాంశం',
    summarySub: 'మీ సమాధానాలు విశ్లేషించబడి ఆరోగ్య ప్రొఫైల్‌లో భద్రపరచబడ్డాయి.',
    reportedTitle: (n) => `నమోదైన లక్షణాలు (${n}):`,
    noSymptoms: 'ఎలాంటి ప్రధాన మెనోపాజ్ లక్షణాలు నమోదు కాలేదు.',
    clinicalNotice: '“మెనోపాజ్ అనేది సహజ ప్రక్రియ. రక్త హార్మోన్ పరీక్షలు (FSH, Estradiol) మరియు గైనకాలజిస్ట్ సలహాతో మంచి ఆరోగ్యాన్ని పొందవచ్చు.”',
    scoreLabel: 'దశ:',
    stageConfirmed: 'ధృవీకరించబడిన మెనోపాజ్ (12+ నెలలు పీరియడ్స్ ఆగిపోయాయి)',
    stageActivePeri: 'పెరిమెనోపాజ్ దశ (హార్మోన్ల మార్పులు)',
    stageEarlyPeri: 'ప్రారంభ పెరిమెనోపాజ్',
    stagePre: 'ప్రీ-మెనోపాజ్',
    dietTitle: '🥗 కాల్షియం మరియు ఫైటో ఈస్ట్రోజెన్ పోషణ',
    lifestyleTitle: '🌸 ఎముకల బలం మరియు జీవనశైలి చిట్కాలు',
    testsTitle: '🩺 సిఫార్సు చేయబడిన రక్త పరీక్షలు (Lab Tests)',
    questionsTitle: '📋 మీ వైద్యుడిని అడగవలసిన 4 ముఖ్యమైన ప్రశ్నలు',
    downloadBtn: 'నివేదికను డౌన్‌లోడ్ చేయండి',
    retake: 'మళ్లీ పరీక్షించండి',
    smsBtn: '📲 మొబైల్‌కు వివరాలు పంపండి',
    smsSent: '✓ వివరాలు మీ ఫోన్‌కు పంపబడ్డాయి!',
    questions: [
      { key: 'hotFlashes', text: 'మీ ఛాతీ, మెడ మరియు ముఖం అంతటా అకస్మాత్తుగా తీవ్రమైన వేడి వ్యాపించినట్లు (హాట్ ఫ్లాషెస్) అనిపిస్తుందా?' },
      { key: 'irregularCycles', text: 'ఇటీవలి నెలల్లో మీ పీరియడ్స్ సమయం, వ్యవధి లేదా రక్తస్రావంలో మార్పులు గమనించారా?' },
      { key: 'nightSweats', text: 'రాత్రి నిద్రలో తీవ్రమైన చెమటలతో అకస్మాత్తుగా మేల్కొంటున్నారా?' },
      { key: 'sleepDisturbance', text: 'మీకు నిద్రలేమి లేదా రాత్రి సరిగా నిద్రపట్టకపోవడం లాంటి సమస్యలు ఉన్నాయా?' },
      { key: 'moodSwings', text: 'అకస్మాత్తుగా మూడ్ స్వింగ్స్, చిరాకు లేదా ఆందోళనను అనుభవిస్తున్నారా?' },
      { key: 'brainFog', text: 'ఏకాగ్రత లోపించడం లేదా విషయాలు మర్చిపోవడం లాంటి బ్రెయిన్ ఫాగ్ ఉందా?' },
      { key: 'vaginalDryness', text: 'యోనిలో పొడిబారడం, మంట లేదా అసౌకర్యం అనిపిస్తుందా?' },
      { key: 'jointStiffness', text: 'కీళ్ల నొప్పులు, మోకాళ్లలో దృఢత్వం లేదా కండరాల నొప్పులు ఉన్నాయా?' },
      { key: 'weightMetabolism', text: 'పొత్తికడుపు చుట్టూ బరువు పెరగడం లేదా తీవ్రమైన నీరసం గమనించారా?' },
      { key: 'ceasedPeriods12Months', text: 'ఎలాంటి గర్భధారణ లేకుండా మీ పీరియడ్స్ వరుసగా 12 నెలలకు పైగా పూర్తిగా ఆగిపోయాయా?' }
    ],
    symptoms: {
      hotFlashes: 'హాట్ ఫ్లాషెస్ (తీవ్రమైన వేడి తరంగాలు)',
      irregularCycles: 'పీరియడ్స్ సమయం మార్పులు',
      nightSweats: 'రాత్రి చెమటలు',
      sleepDisturbance: 'నిద్రలేమి',
      moodSwings: 'మూడ్ స్వింగ్స్ మరియు చిరాకు',
      brainFog: 'జ్ఞాపకశక్తి లోపం (బ్రెయిన్ ఫాగ్)',
      vaginalDryness: 'యోని పొడిబారడం',
      jointStiffness: 'కీళ్ల నొప్పులు',
      weightMetabolism: 'బరువు పెరగడం',
      ceasedPeriods12Months: '12+ నెలలుగా పీరియడ్స్ ఆగిపోవడం'
    },
    defaultDiet: [
      'అవిసె గింజలు (Flaxseeds) మరియు సోయా ఉత్పత్తులు సహజంగా హార్మోన్లను సమతుల్యం చేస్తాయి.',
      'కాల్షియం ఆహారాలు (1200 mg/రోజు): ఆకుకూరలు, నువ్వులు, పాలు ఎముకలకు మంచివి.'
    ],
    defaultLifestyle: [
      'వ్యాయామం: ప్రతిరోజూ 30 నిమిషాల నడక ఎముకల దృఢత్వాన్ని కాపాడుతుంది.'
    ],
    defaultTests: [
      'FSH మరియు Estradiol (E2) హార్మోన్ పరీక్షలు',
      'DEXA బోన్ డెన్సిటీ స్కాన్'
    ],
    defaultDoctorQ: [
      '1. నేను పెరిమెనోపాజ్ దశలో ఉన్నానా లేదా మెనోపాజ్ లోనా?',
      '2. నాకు హార్మోన్ రీప్లేస్‌మెంట్ థెరపీ (HRT) అవసరమా?'
    ]
  },
  kn: {
    badge: 'ಹಾರ್ಮೋನ್ ಪರಿವರ್ತನೆ ಆರೋಗ್ಯ',
    title: 'ಋತುಬಂಧ (ಮೆನೋಪಾಸ್) ಕ್ಲಿನಿಕಲ್ ಮೌಲ್ಯಮಾಪನ',
    subtitle: 'ಹಾರ್ಮೋನ್ ಬದಲಾವಣೆಯ ಲಕ್ಷಣಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ ಸೂಕ್ತ ಆಹಾರ ಮತ್ತು ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
    stepText: (cur, total) => `ಪ್ರಶ್ನೆ ${cur} / ${total}`,
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    yes: 'ಹೌದು',
    sometimes: 'ಕೆಲವೊಮ್ಮೆ',
    no: 'ಇಲ್ಲ',
    back: '← ಹಿಂದಿನ ಪ್ರಶ್ನೆಗೆ ಹಿಂತಿರುಗಿ',
    summaryTitle: 'ಋತುಬಂಧ ಮೌಲ್ಯಮಾಪನ ಸಾರಾಂಶ',
    summarySub: 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಆರೋಗ್ಯ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.',
    reportedTitle: (n) => `ವರದಿ ಮಾಡಲಾದ ಲಕ್ಷಣಗಳು (${n}):`,
    noSymptoms: 'ಯಾವುದೇ ಗಮನಾರ್ಹ ಋತುಬಂಧ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    clinicalNotice: '“ಋತುಬಂಧ ನೈಸರ್ಗಿಕ ಪ್ರಕ್ರಿಯೆ. ಹಾರ್ಮೋನ್ ಪರೀಕ್ಷೆಗಳು ಮತ್ತು ಸ್ತ್ರೀರೋಗ ತಜ್ಞರ ಸಲಹೆ ಒಳಿತನ್ನು ನೀಡುತ್ತದೆ.”',
    scoreLabel: 'ಹಂತ:',
    stageConfirmed: 'ದೃಢಪಟ್ಟ ಋತುಬಂಧ (12+ ತಿಂಗಳು ರಕ್ತಸ್ರಾವ ನಿಂತಿದೆ)',
    stageActivePeri: 'ಪೆರಿಮೆನೋಪಾಸ್ ಹಂತ',
    stageEarlyPeri: 'ಆರಂಭಿಕ ಹಂತ',
    stagePre: 'ಪೂರ್ವ ಹಂತ',
    dietTitle: '🥗 ಕ್ಯಾಲ್ಸಿಯಂ ಮತ್ತು ಪೌಷ್ಟಿಕ ಆಹಾರ ಯೋಜನೆ',
    lifestyleTitle: '🌸 ಮೂಳೆಗಳ ಬಲ ಮತ್ತು ಜೀವನಶೈಲಿ',
    testsTitle: '🩺 ಶಿಫಾರಸು ಮಾಡಲಾದ ಪರೀಕ್ಷೆಗಳು',
    questionsTitle: '📋 ವೈದ್ಯರನ್ನು ಕೇಳಬೇಕಾದ 4 ಮುಖ್ಯ ಪ್ರಶ್ನೆಗಳು',
    downloadBtn: 'ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    retake: 'ಮತ್ತೆ ಪರೀಕ್ಷಿಸಿ',
    smsBtn: '📲 ಮೊಬೈಲ್‌ಗೆ ವಿವರ ಕಳುಹಿಸಿ',
    smsSent: '✓ ವಿವರಗಳನ್ನು ಮೊಬೈಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ!',
    questions: [
      { key: 'hotFlashes', text: 'ಎದೆ ಮತ್ತು ಮುಖದಲ್ಲಿ ಹಠಾತ್ ತೀವ್ರ ಶಾಖದ ಅಲೆಗಳನ್ನು (ಹಾಟ್ ಫ್ಲ್ಯಾಶ್) ಅನುಭವಿಸುತ್ತಿದ್ದೀರಾ?' },
      { key: 'irregularCycles', text: 'ಇತ್ತೀಚಿನ ತಿಂಗಳುಗಳಲ್ಲಿ ನಿಮ್ಮ ಮುಟ್ಟಿನ ದಿನಗಳು ಅನಿಯಮಿತವಾಗಿದೆಯೇ?' },
      { key: 'nightSweats', text: 'ರಾತ್ರಿ ನಿದ್ರೆಯಲ್ಲಿ ಅತಿಯಾದ ಬೆವರುವಿಕೆ ಆಗುತ್ತಿದೆಯೇ?' },
      { key: 'sleepDisturbance', text: 'ನಿದ್ರಾಹೀನತೆಯಿಂದ ತೊಂದರೆ ಅನುಭವಿಸುತ್ತಿದ್ದೀರಾ?' },
      { key: 'moodSwings', text: 'ಮನಸ್ಥಿತಿಯ ಹಠಾತ್ ಬದಲಾವಣೆಗಳು ಅಥವಾ ಕಿರಿಕಿರಿಯನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಾ?' },
      { key: 'brainFog', text: 'ಏಕಾಗ್ರತೆಯ ಕೊರತೆ ಅಥವಾ ಮರೆವು ಉಂಟಾಗುತ್ತಿದೆಯೇ?' },
      { key: 'vaginalDryness', text: 'ಯೋನಿ ಭಾಗದಲ್ಲಿ ಶುಷ್ಕತೆ ಅಥವಾ ಅಸ್ವಸ್ಥತೆ ಇದೆಯೇ?' },
      { key: 'jointStiffness', text: 'ಕೀಲು ನೋವು ಅಥವಾ ಸ್ನಾಯುಗಳ ಬಿಗಿತ ಉಂಟಾಗುತ್ತಿದೆಯೇ?' },
      { key: 'weightMetabolism', text: 'ಹೊಟ್ಟೆಯ ಸುತ್ತಲೂ ತೂಕ ಹೆಚ್ಚಾಗುವುದನ್ನು ಗಮನಿಸಿದ್ದೀರಾ?' },
      { key: 'ceasedPeriods12Months', text: '12 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು ತಿಂಗಳುಗಳಿಂದ ಮುಟ್ಟು ಸಂಪೂರ್ಣವಾಗಿ ನಿಂತಿದೆಯೇ?' }
    ],
    symptoms: {
      hotFlashes: 'ಹಾಟ್ ಫ್ಲ್ಯಾಶ್ (ಶಾಖದ ಅಲೆಗಳು)',
      irregularCycles: 'ಅನಿಯಮಿತ ಮುಟ್ಟು',
      nightSweats: 'ರಾತ್ರಿ ಬೆವರುವಿಕೆ',
      sleepDisturbance: 'ನಿದ್ರಾಹೀನತೆ',
      moodSwings: 'ಚಿತ್ತಸ್ವಾಸ್ಥ್ಯ ಬದಲಾವಣೆ',
      brainFog: 'ಮರೆವು',
      vaginalDryness: 'ಯೋನಿ ಶುಷ್ಕತೆ',
      jointStiffness: 'ಕೀಲು ನೋವು',
      weightMetabolism: 'ತೂಕ ಹೆಚ್ಚಳ',
      ceasedPeriods12Months: '12+ ತಿಂಗಳು ಮುಟ್ಟು ನಿಲ್ಲುವುದು'
    },
    defaultDiet: ['ಅಗಸೆ ಬೀಜಗಳು ಮತ್ತು ಕ್ಯಾಲ್ಸಿಯಂ ಯುಕ್ತ ಆಹಾರ ಮೂಳೆಗಳಿಗೆ ಒಳ್ಳೆಯದು.'],
    defaultLifestyle: ['ದೈನಂದಿನ ನಡಿಗೆ ಮತ್ತು ವ್ಯಾಯಾಮ ಮೂಳೆಗಳನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.'],
    defaultTests: ['FSH ಮತ್ತು Estradiol ಹಾರ್ಮೋನ್ ಪರೀಕ್ಷೆಗಳು', 'DEXA ಬೋನ್ ಸ್ಕ್ಯಾನ್'],
    defaultDoctorQ: ['1. ನಾನು ಪೆರಿಮೆನೋಪಾಸ್‌ನಲ್ಲಿದ್ದೇನೆಯೇ?', '2. ನನಗೆ HRT ಅಗತ್ಯವಿದೆಯೇ?']
  },
  ml: {
    badge: 'ഹോർമോൺ മാറ്റാരോഗ്യം',
    title: 'ആർത്തവവിരാമം (മെനോപോസ്) ക്ലിനിക്കൽ വിലയിരുത്തൽ',
    subtitle: 'ഹോർമോൺ വ്യതിയാനങ്ങൾ വിലയിരുത്തി കൃത്യമായ ഭക്ഷണക്രമവും വിദഗ്ദ്ധോപദേശവും നേടുക.',
    stepText: (cur, total) => `ചോദ്യം ${cur} / ${total}`,
    completed: 'പൂർത്തിയായി',
    yes: 'അതെ',
    sometimes: 'ചിലപ്പോൾ',
    no: 'അല്ല',
    back: '← മുൻപത്തെ ചോദ്യത്തിലേക്ക്',
    summaryTitle: 'ആർത്തവവിരാമ ആരോഗ്യ അവലോകനം',
    summarySub: 'നിങ്ങളുടെ വിവരങ്ങൾ വിശകലനം ചെയ്ത് രേഖപ്പെടുത്തിയിരിക്കുന്നു.',
    reportedTitle: (n) => `രേഖപ്പെടുത്തിയ ലക്ഷണങ്ങൾ (${n}):`,
    noSymptoms: 'പ്രധാനപ്പെട്ട ലക്ഷണങ്ങളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.',
    clinicalNotice: '“മെനോപോസ് സ്വാഭാവികമാണ്. രക്തപരിശോധനയും ഡോക്ടറുടെ ഉപദേശവും ആരോഗ്യം നിലനിർത്താൻ സഹായിക്കും.”',
    scoreLabel: 'ഘട്ടം:',
    stageConfirmed: 'സ്ഥിരീകരിച്ച മെനോപോസ് (12+ മാസം ആർത്തവം നിലച്ചു)',
    stageActivePeri: 'പെരിമെനോപോസ് ഘട്ടം',
    stageEarlyPeri: 'പ്രാരംഭ ഘട്ടം',
    stagePre: 'പ്രീ-മെനോപോസ്',
    dietTitle: '🥗 കാൽസ്യം & പോഷകാഹാര പദ്ധതി',
    lifestyleTitle: '🌸 അസ്ഥികളുടെ ആരോഗ്യം & വ്യായാമം',
    testsTitle: '🩺 ശുപാർശ ചെയ്യുന്ന ലാബ് പരിശോധനകൾ',
    questionsTitle: '📋 ഡോക്ടറോട് ചോദിക്കേണ്ട 4 പ്രധാന ചോദ്യങ്ങൾ',
    downloadBtn: 'റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
    retake: 'വീണ്ടും പരിശോധിക്കുക',
    smsBtn: '📲 ഫോണിലേക്ക് വിവരങ്ങൾ അയക്കുക',
    smsSent: '✓ വിവരങ്ങൾ ഫോണിലേക്ക് അയച്ചു!',
    questions: [
      { key: 'hotFlashes', text: 'ശരീരത്തിലും മുഖത്തും പെട്ടെന്ന് അമിതമായ ചൂട് (ഹോട്ട് ഫ്ലാഷസ്) അനുഭവപ്പെടാറുണ്ടോ?' },
      { key: 'irregularCycles', text: 'അടുത്ത മാസങ്ങളിൽ ആർത്തവ തീയതികളിലോ രക്തസ്രാവത്തിലോ മാറ്റങ്ങൾ വന്നിട്ടുണ്ടോ?' },
      { key: 'nightSweats', text: 'രാത്രിയിൽ അമിതമായി വിയർത്തുണരാറുണ്ടോ?' },
      { key: 'sleepDisturbance', text: 'ഉറക്കക്കുറവ് അനുഭവപ്പെടുന്നുണ്ടോ?' },
      { key: 'moodSwings', text: 'പെട്ടെന്നുള്ള മാനസികാവസ്ഥാ മാറ്റങ്ങളോ ദേഷ്യമോ ഉണ്ടാകാറുണ്ടോ?' },
      { key: 'brainFog', text: 'ഏകാഗ്രതക്കുറവോ മറവിയോ അനുഭവപ്പെടുന്നുണ്ടോ?' },
      { key: 'vaginalDryness', text: 'യോനിയിൽ വരൾച്ചയോ അസ്വസ്ഥതയോ അനുഭവപ്പെടുന്നുണ്ടോ?' },
      { key: 'jointStiffness', text: 'സന്ധിവേദനയോ പേശീവേദനയോ അനുഭവപ്പെടാറുണ്ടോ?' },
      { key: 'weightMetabolism', text: 'വയറിന് ചുറ്റും ശരീരഭാരം കൂടുന്നതായി കാണുന്നുണ്ടോ?' },
      { key: 'ceasedPeriods12Months', text: 'തുടർച്ചയായി 12 മാസത്തിൽ കൂടുതൽ ആർത്തവം പൂർണ്ണമായി നിലച്ചിട്ടുണ്ടോ?' }
    ],
    symptoms: {
      hotFlashes: 'ഹോട്ട് ഫ്ലാഷസ് (അമിത ചൂട്)',
      irregularCycles: 'ക്രമരഹിതമായ ആർത്തവം',
      nightSweats: 'രാത്രി വിയർപ്പ്',
      sleepDisturbance: 'ഉറക്കക്കുറവ്',
      moodSwings: 'മൂഡ് സ്വിങ്സ്',
      brainFog: 'മറവി (ബ്രെയിൻ ഫോഗ്)',
      vaginalDryness: 'യോനി വരൾച്ച',
      jointStiffness: 'സന്ധിവേദന',
      weightMetabolism: 'ശരീരഭാരം കൂടൽ',
      ceasedPeriods12Months: '12+ മാസം ആർത്തവം നിലയ്ക്കൽ'
    },
    defaultDiet: ['ചെറുചനവിത്ത് (Flaxseeds), കാൽസ്യം അടങ്ങിയ ഭക്ഷണങ്ങൾ നല്ലതാണ്.'],
    defaultLifestyle: ['ദിവസേനയുള്ള നടത്തം അസ്ഥികളുടെ ബലം നിലനിർത്തും.'],
    defaultTests: ['FSH & Estradiol രക്തപരിശോധനകൾ', 'DEXA ബോൺ സ്കാൻ'],
    defaultDoctorQ: ['1. ഞാൻ മെനോപോസ് ഘട്ടത്തിലാണോ?', '2. എനിക്ക് HRT ആവശ്യമുണ്ടോ?']
  },
  mr: {
    badge: 'हार्मोनल आरोग्य',
    title: 'मेनोपॉज आणि पेरिमेनोपॉज क्लिनिकल तपासणी',
    subtitle: 'हार्मोनल बदलांची लक्षणे तपासा, आहार आणि डॉक्टरांचे मार्गदर्शन मिळवा.',
    stepText: (cur, total) => `प्रश्न ${cur} / ${total}`,
    completed: 'पूर्ण',
    yes: 'होय',
    sometimes: 'कधीकधी',
    no: 'नाही',
    back: '← मागील प्रश्नावर जा',
    summaryTitle: 'मेनोपॉज मूल्यांकन निष्कर्ष',
    summarySub: 'तुमची उत्तरे तपासली गेली आहेत आणि जतन केली आहेत.',
    reportedTitle: (n) => `नोंदवलेली लक्षणे (${n}):`,
    noSymptoms: 'कोणतीही गंभीर लक्षणे आढळली नाहीत.',
    clinicalNotice: '“मेनोपॉज नैसर्गिक आहे. संप्रेरक तपासणी आणि डॉक्टरांचा सल्ला फायदेशीर ठरेल.”',
    scoreLabel: 'टप्पा:',
    stageConfirmed: 'पुष्टी झालेली रजोनिवृत्ती (12+ महिने पाळी बंद)',
    stageActivePeri: 'पेरिमेनोपॉज टप्पा',
    stageEarlyPeri: 'सुरुवातीचा टप्पा',
    stagePre: 'पूर्व टप्पा',
    dietTitle: '🥗 कॅल्शियम आणि पोषण योजना',
    lifestyleTitle: '🌸 हाडांचे आरोग्य आणि जीवनशैली',
    testsTitle: '🩺 प्रयोगशाळा चाचण्या',
    questionsTitle: '📋 डॉक्टरांना विचारण्यासाठी 4 प्रश्न',
    downloadBtn: 'अहवाल डाउनलोड करा',
    retake: 'पुन्हा तपासा',
    smsBtn: '📲 फोनवर तपशील पाठवा',
    smsSent: '✓ तपशील फोनवर पाठवले!',
    questions: [
      { key: 'hotFlashes', text: 'छातीवर आणि चेहऱ्यावर अचानक उष्णतेची लाट (हॉट फ्लॅश) जाणवते का?' },
      { key: 'irregularCycles', text: 'मासिक पाळीच्या चक्रात किंवा रक्तस्त्रावात बदल जाणवला आहे का?' },
      { key: 'nightSweats', text: 'रात्री झोपेत अचानक खूप घाम येऊन जाग येते का?' },
      { key: 'sleepDisturbance', text: 'निद्रानाशाचा त्रास होतो का?' },
      { key: 'moodSwings', text: 'अचानक चिडचिड किंवा तणाव जाणवतो का?' },
      { key: 'brainFog', text: 'एकाग्रतेचा अभाव किंवा विसरभोळेपणा जाणवतो का?' },
      { key: 'vaginalDryness', text: 'योनीमध्ये कोरडेपणा जाणवतो का?' },
      { key: 'jointStiffness', text: 'सांधेदुखी किंवा स्नायू दुखतात का?' },
      { key: 'weightMetabolism', text: 'पोटाभोवती वजन वाढल्याचे जाणवले आहे का?' },
      { key: 'ceasedPeriods12Months', text: 'सलग 12 महिने किंवा त्याहून अधिक काळ मासिक पाळी पूर्णपणे बंद झाली आहे का?' }
    ],
    symptoms: {
      hotFlashes: 'हॉट फ्लॅश',
      irregularCycles: 'अनियमित पाळी',
      nightSweats: 'रात्री घाम येणे',
      sleepDisturbance: 'निद्रानाश',
      moodSwings: 'चिडचिड',
      brainFog: 'विसरभोळेपणा',
      vaginalDryness: 'कोरडेपणा',
      jointStiffness: 'सांधेदुखी',
      weightMetabolism: 'वजन वाढ',
      ceasedPeriods12Months: '12+ महिने पाळी बंद'
    },
    defaultDiet: ['जवस (Flaxseeds) आणि कॅल्शियमयुक्त आहार हाडांसाठी चांगला आहे.'],
    defaultLifestyle: ['दररोज चालणे आणि व्यायाम हाडांना बळकटी देतो.'],
    defaultTests: ['FSH व Estradiol तपासणी', 'DEXA बोन स्कॅन'],
    defaultDoctorQ: ['1. मी पेरिमेनोपॉजमध्ये आहे का?', '2. मला HRT ची गरज आहे का?']
  },
  bn: {
    badge: 'হরমোন রূপান্তর স্বাস্থ্য',
    title: 'মেনোপজ ও পেরিমেনোপজ স্বাস্থ্য মূল্যায়ন',
    subtitle: 'হরমোন পরিবর্তনের লক্ষণগুলি মূল্যায়ন করুন এবং পুষ্টি ও বিশেষজ্ঞ পরামর্শ পান।',
    stepText: (cur, total) => `প্রশ্ন ${cur} / ${total}`,
    completed: 'সম্পন্ন',
    yes: 'হ্যাঁ',
    sometimes: 'মাঝে মাঝে',
    no: 'না',
    back: '← আগের প্রশ্নে ফিরে যান',
    summaryTitle: 'মেনোপজ স্বাস্থ্য মূল্যায়ন সারাংশ',
    summarySub: 'আপনার প্রতিক্রিয়া বিশ্লেষণ করে সংরক্ষণ করা হয়েছে।',
    reportedTitle: (n) => `লক্ষণসমূহ (${n}):`,
    noSymptoms: 'কোনো উল্লেখযোগ্য মেনোপজ লক্ষণ পাওয়া যায়নি।',
    clinicalNotice: '“মেনোপজ একটি স্বাভাবিক শারীরবৃত্তীয় প্রক্রিয়া। হরমোন পরীক্ষা ও চিকিৎসকের পরামর্শ উপকারী।”',
    scoreLabel: 'পর্যায়:',
    stageConfirmed: 'নিশ্চিত মেনোপজ (১২+ মাস পিরিয়ড বন্ধ)',
    stageActivePeri: 'পেরিমেনোপজ পর্যায়',
    stageEarlyPeri: 'প্রাথমিক পর্যায়',
    stagePre: 'প্রাক-মেনোপজ',
    dietTitle: '🥗 ক্যালসিয়াম ও পুষ্টি পরিকল্পনা',
    lifestyleTitle: '🌸 হাড়ের শক্তি ও জীবনযাত্রা',
    testsTitle: '🩺 প্রস্তাবিত ল্যাব পরীক্ষা',
    questionsTitle: '📋 ডাক্তারকে জিজ্ঞাসা করার ৪টি প্রশ্ন',
    downloadBtn: 'রিপোর্ট ডাউনলোড করুন',
    retake: 'আবার পরীক্ষা করুন',
    smsBtn: '📲 ফোনে বিবরণ পাঠান',
    smsSent: '✓ ফোনে বিবরণ পাঠানো হয়েছে!',
    questions: [
      { key: 'hotFlashes', text: 'বুক ও মুখে কি হঠাৎ তীব্র গরম লাগার অনুভূতি (হট ফ্ল্যাশ) হয়?' },
      { key: 'irregularCycles', text: 'সাম্প্রতিক মাসগুলিতে কি আপনার পিরিয়ড অনিয়মিত হয়েছে?' },
      { key: 'nightSweats', text: 'রাতে কি অতিরিক্ত ঘেমে ঘুম ভেঙে যায়?' },
      { key: 'sleepDisturbance', text: 'অনিদ্রা বা ঘুমের সমস্যা হচ্ছে কি?' },
      { key: 'moodSwings', text: 'হঠাৎ মেজাজ পরিবর্তন বা বিরক্তি বোধ করছেন কি?' },
      { key: 'brainFog', text: 'মনোযোগের অভাব বা ভুলে যাওয়ার সমস্যা হচ্ছে কি?' },
      { key: 'vaginalDryness', text: 'যোনিতে শুষ্কতা বা অস্বস্তি অনুভব করছেন কি?' },
      { key: 'jointStiffness', text: 'জয়েন্টে ব্যথা বা পেশীর শক্তভাব অনুভব করছেন কি?' },
      { key: 'weightMetabolism', text: 'পেটের চারপাশে ওজন বৃদ্ধির লক্ষণ লক্ষ্য করেছেন কি?' },
      { key: 'ceasedPeriods12Months', text: 'টানা ১২ মাস বা তার বেশি সময় ধরে কি পিরিয়ড পুরোপুরি বন্ধ রয়েছে?' }
    ],
    symptoms: {
      hotFlashes: 'হট ফ্ল্যাশ',
      irregularCycles: 'অনিয়মিত পিরিয়ড',
      nightSweats: 'রাতের ঘাম',
      sleepDisturbance: 'অনিদ্রা',
      moodSwings: 'মেজাজ পরিবর্তন',
      brainFog: 'ভুলে যাওয়া',
      vaginalDryness: 'শুষ্কতা',
      jointStiffness: 'জয়েন্টে ব্যথা',
      weightMetabolism: 'ওজন বৃদ্ধি',
      ceasedPeriods12Months: '১২+ মাস পিরিয়ড বন্ধ'
    },
    defaultDiet: ['তিসির বীজ (Flaxseeds) এবং ক্যালসিয়াম সমৃদ্ধ খাবার হাড় মজবুত করে।'],
    defaultLifestyle: ['নিয়মিত হাঁটা ও হালকা ব্যায়াম হাড়ের ঘনত্ব বজায় রাখে।'],
    defaultTests: ['FSH ও Estradiol হরমোন টেস্ট', 'DEXA বোন স্ক্যান'],
    defaultDoctorQ: ['১. আমি কি পেরিমেনোপজ পর্যায়ে আছি?', '২. আমার কি HRT প্রয়োজন?']
  },
  gu: {
    badge: 'હોર્મોનલ પરિવર્તન આરોગ્ય',
    title: 'મેનોપોઝ અને પેરિમેનોપોઝ ક્લિનિકલ મૂલ્યાંકન',
    subtitle: 'હોર્મોનલ ફેરફારોના લક્ષણો તપાસો અને સાચો આહાર તેમજ તબીબી માર્ગદર્શન મેળવો.',
    stepText: (cur, total) => `પ્રશ્ન ${cur} / ${total}`,
    completed: 'પૂર્ણ',
    yes: 'હા',
    sometimes: 'ક્યારેક',
    no: 'ના',
    back: '← પાછલા પ્રશ્ન પર જાઓ',
    summaryTitle: 'મેનોપોઝ આરોગ્ય સારાંશ',
    summarySub: 'તમારા જવાબોનું મૂલ્યાંકન કરી પ્રોફાઇલમાં સાચવવામાં આવ્યું છે.',
    reportedTitle: (n) => `નોંધાયેલા લક્ષણો (${n}):`,
    noSymptoms: 'કોઈ નોંધપાત્ર લક્ષણો જણાયા નથી.',
    clinicalNotice: '“મેનોપોઝ એ કુદરતી પ્રક્રિયા છે. હોર્મોન ટેસ્ટ અને ગાયનેકોલોજિસ્ટની સલાહ ઉપયોગી સાબિત થાય છે.”',
    scoreLabel: 'તબક્કો:',
    stageConfirmed: 'પુષ્ટ મેનોપોઝ (12+ મહિનાથી માસિક બંધ)',
    stageActivePeri: 'પેરિમેનોપોઝ તબક્કો',
    stageEarlyPeri: 'શરૂઆતનો તબક્કો',
    stagePre: 'પ્રી-મેનોપોઝ',
    dietTitle: '🥗 કેલ્શિયમ અને આહાર યોજના',
    lifestyleTitle: '🌸 હાડકાંની મજબૂતી અને જીવનશૈલી',
    testsTitle: '🩺 જરૂરી લેબ ટેસ્ટ',
    questionsTitle: '📋 ડૉક્ટરને પૂછવા જેવા 4 પ્રશ્નો',
    downloadBtn: 'રિપોર્ટ ડાઉનલોડ કરો',
    retake: 'ફરીથી તપાસો',
    smsBtn: '📲 ફોન પર વિગતો મોકલો',
    smsSent: '✓ વિગતો ફોન પર મોકલી દેવાઈ છે!',
    questions: [
      { key: 'hotFlashes', text: 'શું તમને છાતી અને ચહેરા પર અચાનક અતિશય ગરમી (હોટ ફ્લેશ) લાગે છે?' },
      { key: 'irregularCycles', text: 'શું છેલ્લા કેટલાક મહિનામાં માસિક અનિયમિત થયું છે?' },
      { key: 'nightSweats', text: 'શું રાત્રે ઊંઘમાં અતિશય પરસેવો વળીને જાગી જવાય છે?' },
      { key: 'sleepDisturbance', text: 'શું અનિદ્રા અથવા ઊંઘમાં ખલેલ પહોંચે છે?' },
      { key: 'moodSwings', text: 'શું અચાનક ચીડચીડાપણું કે ચિંતાનો અનુભવ થાય છે?' },
      { key: 'brainFog', text: 'શું વસ્તુઓ ભૂલી જવાની કે ધ્યાન કેન્દ્રિત કરવામાં તકલીફ થાય છે?' },
      { key: 'vaginalDryness', text: 'શું યોનિમાર્ગમાં શુષ્કતા કે અગવડતા અનુભવાય છે?' },
      { key: 'jointStiffness', text: 'શું સાંધામાં દુખાવો કે જકડાઈ જવાની સમસ્યા છે?' },
      { key: 'weightMetabolism', text: 'શું પેટની આસપાસ વજન વધતું જણાયું છે?' },
      { key: 'ceasedPeriods12Months', text: 'શું સતત 12 મહિના કે તેથી વધુ સમયથી માસિક ધર્મ સંપૂર્ણપણે બંધ છે?' }
    ],
    symptoms: {
      hotFlashes: 'હોટ ફ્લેશ (ગરમીના તરંગો)',
      irregularCycles: 'અનિયમિત માસિક',
      nightSweats: 'રાત્રે પરસેવો',
      sleepDisturbance: 'અનિદ્રા',
      moodSwings: 'ચીડચીડાપણું',
      brainFog: 'વિસ્મૃતિ',
      vaginalDryness: 'શુષ્કતા',
      jointStiffness: 'સાંધાનો દુખાવો',
      weightMetabolism: 'વજન વધવું',
      ceasedPeriods12Months: '12+ મહિનાથી માસિક બંધ'
    },
    defaultDiet: ['અળસી (Flaxseeds) અને કેલ્શિયમથી ભરપૂર આહાર હાડકાંને મજબૂત રાખે છે.'],
    defaultLifestyle: ['દરરોજ 30 મિનિટ ચાલવું હાડકાં માટે જરૂરી છે.'],
    defaultTests: ['FSH અને Estradiol હોર્મોન ટેસ્ટ', 'DEXA બોન સ્કેન'],
    defaultDoctorQ: ['1. શું હું પેરિમેનોપોઝમાં છું?', '2. શું મારે HRT લેવાની જરૂર છે?']
  },
  ar: {
    badge: 'صحة التحول الهرموني',
    title: 'الفحص السريري لسن الأمل ومرحلة ما قبل انقطاع الطمث',
    subtitle: 'تقييم أعراض التحول الهرموني، وتحديد المرحلة، والحصول على إرشادات غذائية وطبية متخصصة.',
    stepText: (cur, total) => `السؤال ${cur} من ${total}`,
    completed: 'مكتمل',
    yes: 'نعم',
    sometimes: 'أحياناً',
    no: 'لا',
    back: '← العودة إلى السؤال السابق',
    summaryTitle: 'ملخص التقييم السريري لسن الأمل',
    summarySub: 'تم تقييم الإجابات وفق المعايير السريرية وحفظها في ملفك الصحي.',
    reportedTitle: (n) => `الأعراض والمؤشرات المسجلة (${n}):`,
    noSymptoms: 'لم يتم الإبلاغ عن أي أعراض رئيسية لسن الأمل.',
    clinicalNotice: '“سن الأمل مرحلة فسيولوجية طبيعية. الفحوصات الهرمونية ومراجعة طبيب النساء تضمن صحة مثالية.”',
    scoreLabel: 'المرحلة:',
    stageConfirmed: 'انقطاع الطمث المؤكد سريرياً (12+ شهراً)',
    stageActivePeri: 'مرحلة ما قبل انقطاع الطمث النشطة',
    stageEarlyPeri: 'المرحلة المبكرة',
    stagePre: 'مرحلة ما قبل سن الأمل',
    dietTitle: '🥗 خطة التغذية بالفيتويستروجين ودعم العظام',
    lifestyleTitle: '🌸 استراتيجيات تخفيف الهبات الساخنة وكثافة العظام',
    testsTitle: '🩺 الفحوصات المخبرية الموصى بها',
    questionsTitle: '📋 4 أسئلة أساسية لطبيبك',
    downloadBtn: 'تحميل التقرير السريري',
    retake: 'إعادة الفحص',
    smsBtn: '📲 إرسال الملخص إلى هاتفي',
    smsSent: '✓ تم إرسال الملخص بنجاح إلى هاتفك!',
    questions: [
      { key: 'hotFlashes', text: 'هل تشعرين بهبات ساخنة مفاجئة وشديدة تنتشر في الصدر والرقبة والوجه؟' },
      { key: 'irregularCycles', text: 'هل أصبحت الدورة الشهرية غير منتظمة بشكل ملحوظ في الأشهر الأخيرة؟' },
      { key: 'nightSweats', text: 'هل تستيقظين في منتصف الليل غارقة في العرق البارد (التعرق الليلي)؟' },
      { key: 'sleepDisturbance', text: 'هل تعانين من الأرق المستمر أو صعوبة النوم طوال الليل؟' },
      { key: 'moodSwings', text: 'هل تشعرين بتقلبات مزاجية مفاجئة أو قلق أو إرهاق غير مبرر؟' },
      { key: 'brainFog', text: 'هل لاحظت صعوبة في التركيز أو النسيان المتكرر (ضباب الدماغ)؟' },
      { key: 'vaginalDryness', text: 'هل تشعرين بجفاف أو حكة أو انزعاج في المنطقة الحساسة؟' },
      { key: 'jointStiffness', text: 'هل تعانين من آلام وتصلب في المفاصل أو آلام عضلية صباحية؟' },
      { key: 'weightMetabolism', text: 'هل لاحظت تغيرات في التمثيل الغذائي وزيادة الوزن حول البطن؟' },
      { key: 'ceasedPeriods12Months', text: 'هل انقطعت الدورة الشهرية تماماً لمدة 12 شهراً متتالياً أو أكثر؟' }
    ],
    symptoms: {
      hotFlashes: 'الهبات الساخنة',
      irregularCycles: 'عدم انتظام الدورة',
      nightSweats: 'التعرق الليلي',
      sleepDisturbance: 'الأرق واضطراب النوم',
      moodSwings: 'تقلبات المزاج',
      brainFog: 'ضباب الدماغ والنسيان',
      vaginalDryness: 'جفاف المهبل',
      jointStiffness: 'آلام المفاصل',
      weightMetabolism: 'زيادة الوزن حول البطن',
      ceasedPeriods12Months: 'انقطاع الدورة 12+ شهراً'
    },
    defaultDiet: ['بذور الكتان الغنية بالفيتويستروجين والأغذية الغنية بالكالسيوم تدعم العظام.'],
    defaultLifestyle: ['المشي اليومي وتمارين المقاومة تحافظ على كثافة العظام.'],
    defaultTests: ['فحص الهرمونات FSH و Estradiol', 'فحص كثافة العظام DEXA'],
    defaultDoctorQ: ['1. هل أنا في مرحلة ما قبل انقطاع الطمث؟', '2. هل أحتاج إلى العلاج الهرموني التعويضي (HRT)؟']
  }
};

export default function MenopauseCheck({ onNavigate }) {
  const { language } = useLanguage();
  const { sendLiveSms } = useSmsAlert();
  const dict = MENOPAUSE_CHECK_DATA[language] || MENOPAUSE_CHECK_DATA.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [smsNotice, setSmsNotice] = useState(null);

  const currentQ = dict.questions[currentIndex];

  const handleSelectOption = async (val) => {
    const newAnswers = { ...answers, [currentQ.key]: val };
    setAnswers(newAnswers);

    if (currentIndex < dict.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setLoading(true);
      try {
        const res = await api.post('/api/assessments/menopause', { answers: newAnswers });
        if (res.data?.success) {
          setResult(res.data.assessment);
        } else {
          fallbackCalculate(newAnswers);
        }
      } catch (err) {
        console.warn('Backend menopause error, using local fallback:', err);
        fallbackCalculate(newAnswers);
      } finally {
        setLoading(false);
      }
    }
  };

  const fallbackCalculate = (ans) => {
    const reported = [];
    let score = 0;

    Object.keys(dict.symptoms).forEach((k) => {
      const v = ans[k];
      if (v === 'Yes') {
        reported.push(dict.symptoms[k]);
        score += 2;
      } else if (v === 'Sometimes') {
        reported.push(`${dict.symptoms[k]} (${dict.sometimes})`);
        score += 1;
      }
    });

    const prob = Math.min(100, Math.round((score / 20) * 100));

    let transitionStage = dict.stagePre;
    let sev = 'Mild';

    if (ans.ceasedPeriods12Months === 'Yes') {
      transitionStage = dict.stageConfirmed;
      sev = score >= 12 ? 'Significant' : 'Moderate';
    } else if (score >= 11) {
      transitionStage = dict.stageActivePeri;
      sev = 'Significant';
    } else if (score >= 5) {
      transitionStage = dict.stageEarlyPeri;
      sev = 'Moderate';
    }

    setResult({
      answers: ans,
      reportedSymptoms: reported,
      score,
      probabilityPercentage: prob,
      transitionStage,
      severityIndicator: sev,
      summaryText: dict.clinicalNotice,
      dietaryAdvice: dict.defaultDiet,
      lifestyleAdvice: dict.defaultLifestyle,
      clinicalTests: dict.defaultTests,
      doctorQuestions: dict.defaultDoctorQ
    });
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setSmsNotice(null);
  };

  const handleDownload = () => {
    if (!result) return;
    const content = `
======================================================
  FEMTECH - MENOPAUSE CLINICAL AWARENESS REPORT
  Generated: ${new Date().toLocaleString()}
======================================================
Stage Assessment: ${result.transitionStage || dict.stagePre}
Pattern Intensity: ${result.severityIndicator || 'Mild'} (${result.probabilityPercentage || 0}%)

REPORTED INDICATORS:
${(result.reportedSymptoms || []).map(s => `- ${s}`).join('\n') || '- None reported'}

CLINICAL GUIDANCE:
${result.summaryText || dict.clinicalNotice}

PHYTOESTROGEN & BONE NUTRITION:
${(result.dietaryAdvice || dict.defaultDiet).map(d => `- ${d}`).join('\n')}

LIFESTYLE & VASOMOTOR RELIEF:
${(result.lifestyleAdvice || dict.defaultLifestyle).map(l => `- ${l}`).join('\n')}

RECOMMENDED LAB TESTS FOR GYNECOLOGIST:
${(result.clinicalTests || dict.defaultTests).map(t => `- ${t}`).join('\n')}

QUESTIONS FOR YOUR DOCTOR:
${(result.doctorQuestions || dict.defaultDoctorQ).map(q => `- ${q}`).join('\n')}

======================================================
CONFIDENTIAL • FOR CLINICAL & PERSONAL AWARENESS
======================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FemTech-Menopause-Report-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendSms = async () => {
    if (!result) return;
    const summaryMsg = `🌸 FemTech: ${dict.title}\nStage: ${result.transitionStage || dict.stagePre}\nIntensity: ${result.severityIndicator} (${result.probabilityPercentage}%)\nReported: ${(result.reportedSymptoms || []).slice(0, 3).join(', ')}`;
    try {
      if (sendLiveSms) {
        sendLiveSms(summaryMsg, 'menopause');
      } else {
        await api.post('/api/sms/send-live', { message: summaryMsg });
      }
      setSmsNotice(dict.smsSent);
      setTimeout(() => setSmsNotice(null), 4000);
    } catch (e) {
      setSmsNotice(dict.smsSent);
      setTimeout(() => setSmsNotice(null), 4000);
    }
  };

  const probPercent = result?.probabilityPercentage ?? 0;
  const isConfirmed = answers.ceasedPeriods12Months === 'Yes';
  const severityColor = isConfirmed ? '#9333ea' : (probPercent >= 55 ? '#ea580c' : probPercent >= 25 ? '#d97706' : '#059669');
  const severityBg = isConfirmed ? '#faf5ff' : (probPercent >= 55 ? '#fff7ed' : probPercent >= 25 ? '#fefce8' : '#f0fdf4');
  const stageDisplay = result?.transitionStage || (isConfirmed ? dict.stageConfirmed : (probPercent >= 55 ? dict.stageActivePeri : probPercent >= 25 ? dict.stageEarlyPeri : dict.stagePre));

  const localizedSymptoms = result
    ? Object.keys(answers)
        .filter((k) => answers[k] === 'Yes' || answers[k] === 'Sometimes')
        .map((k) => `${dict.symptoms[k] || k}${answers[k] === 'Sometimes' ? ` (${dict.sometimes})` : ''}`)
    : [];

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '16px' }}>
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '28px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, #fff7ed 0%, #fff1f2 50%, #fdf4ff 100%)',
          marginBottom: '24px',
          border: '1px solid #fed7aa',
          boxShadow: '0 8px 24px rgba(234, 88, 12, 0.08)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffedd5', color: '#c2410c', padding: '4px 14px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
          <Flame size={15} />
          <span>{dict.badge}</span>
        </div>

        <h1 style={{ fontSize: '1.85rem', color: '#7c2d12', margin: '0 0 8px 0', fontWeight: 800 }}>
          {dict.title}
        </h1>
        <p style={{ fontSize: '0.94rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
          {dict.subtitle}
        </p>
      </div>

      <DisclaimerBanner customText={dict.clinicalNotice} />

      {/* QUESTIONNAIRE PROGRESS CARD */}
      {!result ? (
        <div
          className="glass-card"
          style={{
            padding: '36px',
            borderRadius: 'var(--radius-lg)',
            background: 'white',
            border: '2px solid #fed7aa',
            boxShadow: '0 10px 30px rgba(234, 88, 12, 0.08)',
            marginBottom: '28px'
          }}
        >
          {/* Step Counter & Progress Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {dict.stepText(currentIndex + 1, dict.questions.length)}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9a3412' }}>
              {Math.round(((currentIndex) / dict.questions.length) * 100)}% {dict.completed}
            </span>
          </div>

          <div style={{ height: '8px', width: '100%', background: '#ffedd5', borderRadius: '4px', overflow: 'hidden', marginBottom: '28px' }}>
            <div
              style={{
                height: '100%',
                width: `${((currentIndex + 1) / dict.questions.length) * 100}%`,
                background: 'linear-gradient(90deg, #ea580c 0%, #db2777 100%)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          {/* Question Text */}
          <div style={{ minHeight: '85px', display: 'flex', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#1e293b', margin: 0, fontWeight: 700, lineHeight: 1.5 }}>
              {currentQ.text}
            </h2>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            {[
              { val: 'Yes', label: dict.yes, color: '#ea580c', bg: '#fff7ed' },
              { val: 'Sometimes', label: dict.sometimes, color: '#d97706', bg: '#fffbeb' },
              { val: 'No', label: dict.no, color: '#059669', bg: '#f0fdf4' }
            ].map((option) => (
              <button
                key={option.val}
                onClick={() => handleSelectOption(option.val)}
                style={{
                  padding: '16px 22px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  borderRadius: '14px',
                  background: 'white',
                  border: `2px solid #fed7aa`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: '#1e293b'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = option.color;
                  e.currentTarget.style.background = option.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#fed7aa';
                  e.currentTarget.style.background = 'white';
                }}
              >
                <span>{option.label}</span>
                <ArrowRight size={18} color={option.color} />
              </button>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              style={{
                marginTop: '20px',
                background: 'none',
                border: 'none',
                color: '#9a3412',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {dict.back}
            </button>
          )}
        </div>
      ) : (
        /* EXPANSIVE CLINICAL RESULT & TARGETED SUGGESTIONS VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 1. SCORE & PATTERN LIKELIHOOD HERO CARD */}
          <div
            className="glass-card"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-lg)',
              background: 'white',
              border: `2px solid ${severityColor}`,
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <CheckCircle2 size={38} color={severityColor} />
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>
                    {dict.summaryTitle}
                  </h2>
                  <span style={{ fontSize: '0.86rem', color: '#64748b' }}>
                    {dict.summarySub}
                  </span>
                </div>
              </div>

              {/* Likelihood Pill */}
              <div
                style={{
                  background: severityBg,
                  color: severityColor,
                  padding: '12px 20px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: `2px solid ${severityColor}`
                }}
              >
                <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {dict.scoreLabel}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, lineHeight: 1.2, marginTop: '4px' }}>
                  {stageDisplay}
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, marginTop: '2px' }}>
                  {result.severityIndicator || 'Mild'} ({probPercent}%)
                </div>
              </div>
            </div>

            {/* Reported Symptoms Badges */}
            <div style={{ background: '#fff7ed', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '18px', border: '1px solid #ffedd5' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#c2410c', marginBottom: '10px' }}>
                {dict.reportedTitle(localizedSymptoms.length)}
              </div>
              {localizedSymptoms.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {localizedSymptoms.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'white',
                        color: '#9a3412',
                        padding: '5px 12px',
                        borderRadius: '14px',
                        fontSize: '0.82rem',
                        border: '1px solid #fed7aa',
                        fontWeight: 700
                      }}
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>
                  {dict.noSymptoms}
                </p>
              )}
            </div>

            {/* Clinical Overview Paragraph */}
            <div
              style={{
                background: '#f8fafc',
                borderLeft: `5px solid ${severityColor}`,
                padding: '14px 18px',
                borderRadius: '0 10px 10px 0',
                fontSize: '0.9rem',
                color: '#1e293b',
                lineHeight: 1.65
              }}
            >
              {language !== 'en' ? dict.clinicalNotice : (result.summaryText || dict.clinicalNotice)}
            </div>
          </div>

          {/* 2. PHYTOESTROGEN & CALCIUM NUTRITION BLUEPRINT */}
          <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fed7aa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Salad size={24} color="#ea580c" />
              <h3 style={{ fontSize: '1.18rem', color: '#9a3412', margin: 0, fontWeight: 800 }}>
                {dict.dietTitle}
              </h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#431407', lineHeight: 1.75 }}>
              {(language !== 'en' && dict.defaultDiet ? dict.defaultDiet : (result.dietaryAdvice?.length > 0 ? result.dietaryAdvice : dict.defaultDiet)).map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 3. VASOMOTOR RELIEF & BONE DENSITY STRATEGIES */}
          <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Sparkles size={24} color="#db2777" />
              <h3 style={{ fontSize: '1.18rem', color: '#9d174d', margin: 0, fontWeight: 800 }}>
                {dict.lifestyleTitle}
              </h3>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#701a75', lineHeight: 1.75 }}>
              {(language !== 'en' && dict.defaultLifestyle ? dict.defaultLifestyle : (result.lifestyleAdvice?.length > 0 ? result.lifestyleAdvice : dict.defaultLifestyle)).map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 4. RECOMMENDED DIAGNOSTIC LAB TESTS FOR GYNECOLOGIST */}
          <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #bae6fd' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Activity size={24} color="#0284c7" />
              <h3 style={{ fontSize: '1.18rem', color: '#0369a1', margin: 0, fontWeight: 800 }}>
                {dict.testsTitle}
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {(language !== 'en' && dict.defaultTests ? dict.defaultTests : (result.clinicalTests?.length > 0 ? result.clinicalTests : dict.defaultTests)).map((test, idx) => (
                <div key={idx} style={{ background: '#f0f9ff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e0f2fe', fontSize: '0.86rem', color: '#075985', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <span style={{ color: '#0284c7' }}>🩺</span>
                  <span>{test}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 4 KEY QUESTIONS TO ASK YOUR DOCTOR */}
          <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #ddd6fe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Stethoscope size={24} color="#7c3aed" />
              <h3 style={{ fontSize: '1.18rem', color: '#5b21b6', margin: 0, fontWeight: 800 }}>
                {dict.questionsTitle}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(language !== 'en' && dict.defaultDoctorQ ? dict.defaultDoctorQ : (result.doctorQuestions?.length > 0 ? result.doctorQuestions : dict.defaultDoctorQ)).map((q, idx) => (
                <div key={idx} style={{ background: '#faf5ff', padding: '14px 18px', borderRadius: '12px', border: '1px solid #ede9fe', fontSize: '0.88rem', color: '#4c1d95', lineHeight: 1.5, fontWeight: 600 }}>
                  {q}
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS (SMS, DOWNLOAD, RETAKE) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px', justifyContent: 'center' }}>
            <button
              onClick={handleSendSms}
              style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(234, 88, 12, 0.28)'
              }}
            >
              <Smartphone size={18} />
              <span>{dict.smsBtn}</span>
            </button>

            <button
              onClick={handleDownload}
              style={{
                background: '#0284c7',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
              }}
            >
              <Download size={18} />
              <span>{dict.downloadBtn}</span>
            </button>

            <button
              onClick={handleRetake}
              style={{
                background: 'white',
                color: '#64748b',
                border: '2px solid #cbd5e1',
                padding: '12px 24px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={18} />
              <span>{dict.retake}</span>
            </button>
          </div>

          {smsNotice && (
            <div style={{ textAlign: 'center', color: '#059669', fontWeight: 700, fontSize: '0.92rem', marginTop: '4px' }}>
              {smsNotice}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
