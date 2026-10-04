import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSmsAlert } from '../../context/SmsAlertContext';
import { Sparkles, Heart, CheckCircle2, Shield, Calendar, Clock, Smile, MessageSquare, AlertCircle, Info, ChevronDown, ChevronUp, Droplets, Smartphone } from 'lucide-react';

const FIRST_PERIOD_I18N = {
  en: {
    title: 'First Period (Menarche) Gentle Guide & Tracker',
    sub: 'A warm, safe space for young girls experiencing their very first period. Everything you need to feel confident.',
    reassuranceQuote: 'Menstruation is a completely natural, healthy milestone of growing up. You are safe, strong, and not alone! 🌸',
    ageLabel: 'Age at First Period:',
    dateLabel: 'Date of First Period:',
    flowLabel: 'Initial Flow Observation:',
    flowOptions: {
      spotting: 'Light Spotting (Brown / Pink drops)',
      light: 'Light Flow (Few drops on pad)',
      medium: 'Regular Flow (Normal bleeding)'
    },
    saveRecordBtn: 'Save First Period Milestone',
    savedSuccess: '✓ Milestone saved in your private health vault!',
    timelineTitle: '1 to 3 Year Cycle Regulation Timeline',
    timelineSub: 'Your body is learning! It is completely normal for periods to be irregular for the first 1–3 years.',
    year1: {
      title: 'Year 1: Discovery & Fluctuations',
      desc: 'Cycles may range from 21 to 45+ days. You might skip a month or two. Ovulation is still maturing.'
    },
    year2: {
      title: 'Year 2: Finding Rhythm',
      desc: 'Hormonal signals strengthen. Cycles become more predictable, averaging 24 to 38 days.'
    },
    year3: {
      title: 'Year 3: Established Pattern',
      desc: 'The hypothalamic-pituitary-ovarian axis reaches maturity. Your personal natural rhythm is established (21–35 days).'
    },
    hygieneTitle: 'First Period Hygiene & Pad Guide',
    hygieneSteps: [
      { step: '1. Placement', text: 'Peel the adhesive backing and place the pad firmly in the center of your underwear. Wrap wings under the sides.' },
      { step: '2. Change Time', text: 'Change your sanitary pad every 4 to 6 hours, even on light flow days, to maintain freshness and prevent bacteria.' },
      { step: '3. Safe Disposal', text: 'Wrap the used pad in paper or the wrapper, and discard it in a dustbin. Never flush pads down the toilet!' },
      { step: '4. Gentle Washing', text: 'Wash the external intimate area gently with warm water from front to back. Avoid harsh chemical soaps.' }
    ],
    kitTitle: 'School Emergency Period Kit Checklist',
    kitSub: 'Keep this small pouch inside your school backpack so you always feel prepared:',
    kitItems: [
      '2 to 3 sanitary pads in a waterproof pouch',
      'Spare pair of clean cotton underwear',
      'Small packet of fragrance-free wet wipes',
      'Small plastic pouch for soiled clothing if needed',
      'Travel-sized heating patch or soothing herbal candy'
    ],
    symptomsTitle: 'First-Time Symptoms Log',
    symptoms: [
      { id: 'cramp', label: 'Mild Lower Belly Cramps' },
      { id: 'back', label: 'Mild Lower Back Tension' },
      { id: 'tender', label: 'Breast Tenderness / Bud Soreness' },
      { id: 'mood', label: 'Emotional Sensitivity / Mood Changes' },
      { id: 'fatigue', label: 'Feeling Sleepy or Tired' },
      { id: 'cravings', label: 'Sweet or Salty Food Cravings' }
    ],
    notifyMomBtn: 'Share Milestone with Mother (Kavitha)',
    notifyMomDesc: 'Sends a gentle, caring SMS update to your mother so she can support and comfort you.',
    smsSuccess: '✓ Caring SMS alert dispatched to Mother Kavitha!',
    faqTitle: 'Frequently Asked Questions (Gentle Reassurance)',
    faqs: [
      {
        q: 'Why is the blood dark brown or brownish-red instead of bright red?',
        a: 'Brown blood is completely normal! It is simply blood that took longer to leave the uterus and oxidized (reacted with oxygen). It usually happens at the beginning or end of your period.'
      },
      {
        q: 'Is it bad if my second period does not come next month?',
        a: 'Not at all! In the first 1 to 2 years, your ovaries do not release an egg every single month (anovulatory cycles). Skipping a month or having irregular dates is completely expected.'
      },
      {
        q: 'Can I exercise, play sports, and attend dance or gym class?',
        a: 'Yes, absolutely! Movement actually releases endorphins that soothe cramps. You can run, play, and live normally.'
      },
      {
        q: 'What should I do if cramps hurt during school?',
        a: 'Sip warm water, practice slow deep breathing, and ask your teacher to visit the school infirmary for a hot compress or rest.'
      }
    ]
  },
  ta: {
    title: 'முதல் மாதவிடாய் (பூப்படைதல்) மென்மையான வழிகாட்டி & பதிவு',
    sub: 'முதல் முறையாக மாதவிடாய் அடைந்த இளம் பெண்களுக்கான அன்பான, பாதுகாப்பான வழிகாட்டு மையம். தன்னம்பிக்கையுடன் இருங்கள்.',
    reassuranceQuote: 'மாதவிடாய் என்பது ஒவ்வொரு பெண்ணின் உடலிலும் ஏற்படும் இயல்பான, அழகான ஆரோக்கிய வளர்ச்சி மைல்கல். பயப்பட வேண்டாம், நீங்கள் நலமாக இருக்கிறீர்கள்! 🌸',
    ageLabel: 'முதல் மாதவிடாய் வயது:',
    dateLabel: 'முதல் மாதவிடாய் தேதி:',
    flowLabel: 'முதல் இரத்தப்போக்கு நிலை:',
    flowOptions: {
      spotting: 'லேசான புள்ளிகள் (பழுப்பு / இளஞ்சிவப்பு சொட்டுகள்)',
      light: 'குறைவான இரத்தப்போக்கு (Light Flow)',
      medium: 'சீரான இரத்தப்போக்கு (Regular Flow)'
    },
    saveRecordBtn: 'முதல் மாதவிடாய் மைல்கல்லைப் பதிவு செய்',
    savedSuccess: '✓ உங்கள் தனிப்பட்ட நலப் பெட்டகத்தில் பதிவு செய்யப்பட்டது!',
    timelineTitle: '1 முதல் 3 வருட சுழற்சி நிலைப்படுத்தல் காலவரிசை',
    timelineSub: 'உங்கள் உடல் இப்போதுதான் புதிய மாற்றங்களைக் கற்கிறது! முதல் 1-3 வருடங்களுக்கு மாதவிடாய் ஒழுங்கற்றதாக இருப்பது முற்றிலும் இயல்பானது.',
    year1: {
      title: 'ஆண்டு 1: புதிய மாற்றம் & ஏற்றத்தாழ்வுகள்',
      desc: 'சுழற்சி 21 முதல் 45+ நாட்கள் வரை மாறலாம். ஒன்று அல்லது இரண்டு மாதங்கள் தள்ளிப்போகலாம். இது முற்றிலும் இயல்பு.'
    },
    year2: {
      title: 'ஆண்டு 2: சீரமைப்பு நிலை',
      desc: 'ஹார்மோன்கள் சீராகத் தொடங்குகின்றன. சுழற்சி 24 முதல் 38 நாட்களுக்குள் கணிக்கும் நிலைக்கு வரும்.'
    },
    year3: {
      title: 'ஆண்டு 3: நிலையான சுழற்சி அமைப்பு',
      desc: 'ஹார்மோன் அச்சு முதிர்ச்சியடைகிறது. உங்கள் இயற்கை சுழற்சி 21 முதல் 35 நாட்களுக்குள் உறுதியாக நிலைபெறும்.'
    },
    hygieneTitle: 'முதல் மாதவிடாய் சுகாதாரம் & பேடு வழிகாட்டி',
    hygieneSteps: [
      { step: '1. பேடு பொருத்துதல்', text: 'பேடின் பின்புற ஒட்டுத்தாளை அகற்றி உள்ளாடையில் சரியாக பொருத்தவும். இறக்கைகளை (wings) கீழ்நோக்கி மடிக்கவும்.' },
      { step: '2. மாற்றும் நேரம்', text: 'இரத்தப்போக்கு குறைவாக இருந்தாலும், 4 முதல் 6 மணிநேரத்திற்கு ஒருமுறை கட்டாயம் புதிய பேடு மாற்ற வேண்டும்.' },
      { step: '3. பாதுகாப்பான அகற்றுதல்', text: 'பயன்படுத்திய பேடை காகிதத்தில் சுற்றி குப்பைத்தொட்டியில் போடவும். கழிப்பறையில் ஒருபோதும் போடக்கூடாது!' },
      { step: '4. மென்மையான சுத்தம்', text: 'அந்தரங்க பகுதியை வெதுவெதுப்பான நீரால் முன்னிருந்து பின்னோக்கி மென்மையாக கழுவவும். வாசனை சோப்புகளை தவிர்க்கவும்.' }
    ],
    kitTitle: 'பள்ளி & கல்லூரி அவசர கால கிட் சரிபார்ப்புப் பட்டியல்',
    kitSub: 'எப்போதும் தயார் நிலையில் இருக்க உங்கள் பள்ளிப் பையில் இந்த சிறிய பையை வைத்திருங்கள்:',
    kitItems: [
      '2 அல்லது 3 சானிட்டரி நாப்கின்கள் (பாதுகாப்பான பையில்)',
      'ஒரு மாற்று பருத்தி உள்ளாடை (Clean cotton underwear)',
      'வாசனை இல்லாத வெட் வைப்ஸ் (Wet wipes) அல்லது டிஷ்யூ',
      'அழுக்கான துணிகளை வைக்க ஒரு சிறிய பிளாஸ்டிக் பை',
      'சூடான வெந்நீர் அல்லது லேசான மூலிகை சாக்லேட்'
    ],
    symptomsTitle: 'முதல் முறை அறிகுறிகள் பதிவு',
    symptoms: [
      { id: 'cramp', label: 'லேசான அடிவயிற்று வலி (Cramps)' },
      { id: 'back', label: 'முதுகு வலி (Backache)' },
      { id: 'tender', label: 'மார்பக மென்மை (Breast tenderness)' },
      { id: 'mood', label: 'மனநிலை மாற்றங்கள் / உணர்ச்சிவசப்படுதல்' },
      { id: 'fatigue', label: 'உடல் சோர்வு மற்றும் தூக்கக் கலக்கம்' },
      { id: 'cravings', label: 'இனிப்பு அல்லது கார உணவு ஈர்ப்பு' }
    ],
    notifyMomBtn: 'அம்மா கவிதாவுடன் பகிருங்கள் (Notify Mother)',
    notifyMomDesc: 'அம்மாவுக்கு அன்பான SMS அனுப்பி தகவல் தெரிவிக்கவும், அவர்கள் உங்களுக்கு தைரியமும் ஆதரவும் அளிப்பார்கள்.',
    smsSuccess: '✓ அம்மா கவிதாவுக்கு அன்பான SMS தகவல் அனுப்பப்பட்டது!',
    faqTitle: 'அடிக்கடி கேட்கப்படும் சந்தேகங்கள் (உண்மை வழிகாட்டி)',
    faqs: [
      {
        q: 'இரத்தம் சிவப்பு நிறமாக இல்லாமல் பழுப்பு (Brown) நிறமாக இருப்பது ஏன்?',
        a: 'பழுப்பு நிற இரத்தம் மிகவும் சாதாரணமானது! கருப்பையில் இருந்து வெளியேற அதிக நேரம் எடுக்கும் இரத்தம் காற்றில் உள்ள ஆக்ஸிஜனுடன் வினைபுரிந்து பழுப்பு நிறமாக மாறுகிறது. இது மாதவிடாயின் தொடக்கத்திலும் முடிவிலும் பொதுவாக நிகழும்.'
      },
      {
        q: 'அடுத்த மாதம் எனக்கு மாதவிடாய் வரவில்லை என்றால் ஏதேனும் பிரச்சினையா?',
        a: 'பயப்பட வேண்டாம்! முதல் 1 அல்லது 2 ஆண்டுகளுக்கு ஒவ்வொரு மாதமும் கருமுட்டை வெளிப்படாது (anovulatory cycles). எனவே மாதங்கள் தள்ளிப்போவது முற்றிலும் இயல்பு.'
      },
      {
        q: 'நான் விளையாடலாமா, உடற்பயிற்சி செய்யலாமா, பள்ளிக்குச் செல்லலாமா?',
        a: 'கட்டாயமாகச் செல்லலாம்! லேசான நடைப்பயிற்சியும் விளையாட்டும் வயிற்றில் உள்ள தசைப்பிடிப்பைக் குறைக்கும் நல்ல ஹார்மோன்களை சுரக்கச் செய்யும்.'
      },
      {
        q: 'பள்ளியில் இருக்கும்போது வலி வந்தால் என்ன செய்ய வேண்டும்?',
        a: 'வெதுவெதுப்பான தண்ணீர் குடிக்கவும், அமைதியாக ஆழமாக மூச்சு விடவும். பள்ளி மருத்துவ அறைக்குச் சென்று ஓய்வெடுக்க ஆசிரியரிடம் தயங்காமல் கூறவும்.'
      }
    ]
  },
  hi: {
    title: 'पहला मासिक धर्म (Menarche) कोमल गाइड व ट्रैकर',
    sub: 'पहली बार माहवारी का अनुभव करने वाली किशोरियों के लिए एक सुरक्षित, स्नेहपूर्ण मार्गदर्शन।',
    reassuranceQuote: 'माहवारी बड़े होने का एक अत्यंत स्वाभाविक और स्वस्थ पड़ाव है। आप सुरक्षित और सशक्त हैं! 🌸',
    ageLabel: 'प्रथम माहवारी की उम्र:',
    dateLabel: 'तारीख:',
    flowLabel: 'शुरुआती बहाव:',
    flowOptions: {
      spotting: 'हल्के धब्बे (Spotting)',
      light: 'हल्का बहाव (Light Flow)',
      medium: 'सामान्य बहाव (Regular Flow)'
    },
    saveRecordBtn: 'मील का पत्थर सहेजें',
    savedSuccess: '✓ रिकॉर्ड सुरक्षित रूप से दर्ज किया गया!',
    timelineTitle: '1 से 3 साल का चक्र स्थिरीकरण टाइमलाइन',
    timelineSub: 'शुरुआती 1-3 वर्षों में माहवारी का अनियमित होना पूरी तरह सामान्य है।',
    year1: {
      title: 'वर्ष 1: नई शुरुआत व उतार-चढ़ाव',
      desc: 'चक्र 21 से 45+ दिनों का हो सकता है। किसी महीने माहवारी न आना भी सामान्य है।'
    },
    year2: {
      title: 'वर्ष 2: संतुलन की ओर',
      desc: 'हार्मोन धीरे-धीरे संतुलित होते हैं और चक्र 24 से 38 दिनों का होने लगता है।'
    },
    year3: {
      title: 'वर्ष 3: नियमित प्राकृतिक चक्र',
      desc: 'चक्र पूरी तरह परिपक्व होकर 21 से 35 दिनों का नियमित रूप ले लेता है।'
    },
    hygieneTitle: 'स्वच्छता व पैड उपयोग गाइड',
    hygieneSteps: [
      { step: '1. पैड लगाना', text: 'पैड के पीछे की पट्टी हटाकर अंडरवियर के बीच में चिपकाएं और विंग्स मोड़ें।' },
      { step: '2. बदलने का समय', text: 'हर 4 से 6 घंटे में पैड अवश्य बदलें ताकि संक्रमण न हो।' },
      { step: '3. सही निस्तारण', text: 'पैड को कागज में लपेटकर कूड़ेदान में डालें, फ्लश कभी न करें।' },
      { step: '4. स्वच्छता', text: 'गुनगुने पानी से आगे से पीछे की ओर धोएं।' }
    ],
    kitTitle: 'स्कूल इमरजेंसी किट',
    kitSub: 'अपने स्कूल बैग में यह किट हमेशा तैयार रखें:',
    kitItems: [
      '2-3 सैनिटरी पैड एक वाटरप्रूफ पाउच में',
      'एक अतिरिक्त साफ सूती अंडरवियर',
      'वेट वाइप्स या टिशू पेपर',
      'कपड़ों के लिए छोटा बैग',
      'गुनगुना पानी'
    ],
    symptomsTitle: 'लक्षण ट्रैकर',
    symptoms: [
      { id: 'cramp', label: 'हल्का पेट दर्द (Cramps)' },
      { id: 'back', label: 'कमर दर्द (Backache)' },
      { id: 'tender', label: 'स्तनों में भारीपन' },
      { id: 'mood', label: 'मनोदशा में बदलाव (Mood Swings)' },
      { id: 'fatigue', label: 'थकान व सुस्ती' },
      { id: 'cravings', label: 'मीठा खाने की इच्छा' }
    ],
    notifyMomBtn: 'मां (कविता) को सूचित करें',
    notifyMomDesc: 'अपनी मां को एक प्यारा SMS भेजें ताकि वे आपका ख्याल रख सकें।',
    smsSuccess: '✓ मां को SMS सफलतापूर्वक भेजा गया!',
    faqTitle: 'सामान्य प्रश्न व समाधान',
    faqs: [
      {
        q: 'रक्त भूरे (Brown) रंग का क्यों दिखता है?',
        a: 'भूरा रक्त बिल्कुल सामान्य है। जब रक्त गर्भाशय से बाहर आने में समय लेता है, तो हवा के संपर्क से उसका रंग गहरा हो जाता है।'
      },
      {
        q: 'क्या अगले महीने माहवारी न आना चिंता की बात है?',
        a: 'बिल्कुल नहीं! शुरुआती 1-2 सालों में ओव्यूलेशन अनियमित होता है, इसलिए तारीख आगे-पीछे होना स्वाभाविक है।'
      },
      {
        q: 'क्या मैं खेलकूद और स्कूल जा सकती हूँ?',
        a: 'हाँ, बिल्कुल! हल्का व्यायाम और चलना-फिरना पेट के दर्द को कम करने में मदद करता है।'
      },
      {
        q: 'स्कूल में दर्द होने पर क्या करें?',
        a: 'गुनगुना पानी पिएं, गहरी सांस लें और स्कूल नर्स या शिक्षिका से आराम करने की अनुमति लें।'
      }
    ]
  },
  te: {
    title: 'మొదటి రుతుస్రావం (రజస్వల) సున్నితమైన గైడ్ & ట్రాకర్',
    sub: 'మొదటిసారి పీరియడ్స్ అనుభవించే బాలికల కోసం సురక్షితమైన ఆరోగ్య సమాచారం.',
    reassuranceQuote: 'రుతుస్రావం అనేది స్త్రీ శరీరంలో ఒక సహజమైన, ఆరోగ్యకరమైన మైలురాయి. భయపడవద్దు! 🌸',
    ageLabel: 'మొదటి పీరియడ్ వయస్సు:',
    dateLabel: 'తేదీ:',
    flowLabel: 'స్రావ తీవ్రత:',
    flowOptions: {
      spotting: 'స్పాటింగ్ (Spotting)',
      light: 'తక్కువ స్రావం (Light Flow)',
      medium: 'సాధారణ స్రావం (Regular Flow)'
    },
    saveRecordBtn: 'మైలురాయిని నమోదు చేయండి',
    savedSuccess: '✓ వివరాలు భద్రపరచబడ్డాయి!',
    timelineTitle: '1 నుండి 3 సంవత్సరాల క్రమబద్ధీకరణ సమయం',
    timelineSub: 'మొదటి 1-3 సంవత్సరాలు రుతుచక్రం క్రమరహితంగా ఉండటం సాధారణం.',
    year1: {
      title: 'సంవత్సరం 1: మార్పులు & హెచ్చుతగ్గులు',
      desc: 'చక్రం 21 నుండి 45+ రోజులు ఉండవచ్చు.'
    },
    year2: {
      title: 'సంవత్సరం 2: క్రమబద్ధత సాధించడం',
      desc: 'హార్మోన్లు స్థిరపడి చక్రం 24-38 రోజులకు వస్తుంది.'
    },
    year3: {
      title: 'సంవత్సరం 3: స్థిరమైన సహజ చక్రం',
      desc: 'చక్రం 21-35 రోజులకు స్థిరపడుతుంది.'
    },
    hygieneTitle: 'ప్యాడ్ వినియోగం & పరిశుభ్రత',
    hygieneSteps: [
      { step: '1. అమరిక', text: 'ప్యాడ్ స్టిక్కర్ తొలగించి లోదుస్తుల మధ్యలో సరిగ్గా అతికించండి.' },
      { step: '2. మార్చడం', text: 'ప్రతి 4 నుండి 6 గంటలకు ప్యాడ్ మార్చండి.' },
      { step: '3. పారవేయడం', text: 'కాగితంలో చుట్టి చెత్తబుట్టలో వేయండి, ఫ్లష్ చేయవద్దు.' },
      { step: '4. శుభ్రత', text: 'గోరువెచ్చని నీటితో సున్నితంగా కడగాలి.' }
    ],
    kitTitle: 'పాఠశాల అత్యవసర కిట్',
    kitSub: 'మీ స్కూల్ బ్యాగ్‌లో ఉంచుకోవలసిన వస్తువులు:',
    kitItems: [
      '2-3 శానిటరీ ప్యాడ్‌లు',
      'అదనపు కాటన్ లోదుస్తులు',
      'వెట్ వైప్స్ లేదా టిష్యూ',
      'చిన్న కవర్',
      'గోరువెచ్చని నీరు'
    ],
    symptomsTitle: 'లక్షణాల ట్రాకర్',
    symptoms: [
      { id: 'cramp', label: 'కడుపు నొప్పి (Cramps)' },
      { id: 'back', label: 'నడుము నొప్పి' },
      { id: 'tender', label: 'రొమ్ముల నొప్పి' },
      { id: 'mood', label: 'భావోద్వేగ మార్పులు' },
      { id: 'fatigue', label: 'అలసట' },
      { id: 'cravings', label: 'ఆహార కోరికలు' }
    ],
    notifyMomBtn: 'అమ్మ (కవిత) కు తెలియజేయండి',
    notifyMomDesc: 'మీ తల్లికి SMS పంపి సహాయం పొందండి.',
    smsSuccess: '✓ అమ్మకు SMS పంపబడింది!',
    faqTitle: 'తరచుగా అడిగే ప్రశ్నలు',
    faqs: [
      {
        q: 'రక్తం గోధుమ రంగులో ఎందుకు ఉంటుంది?',
        a: 'ఇది పూర్తిగా సహజం. గర్భాశయం నుండి బయటకు రావడానికి సమయం పట్టిన రక్తం ఆక్సిజన్‌తో చర్య జరిపి రంగు మారుతుంది.'
      },
      {
        q: 'వచ్చే నెల పీరియడ్ రాకపోతే కంగారు పడాలా?',
        a: 'అవసరం లేదు! మొదటి 1-2 ఏళ్ళు అండం విడుదల క్రమరహితంగా ఉంటుంది.'
      },
      {
        q: 'ఆటలు ఆడవచ్చా?',
        a: 'తప్పకుండా! తేలికపాటి వ్యాయామం నొప్పిని తగ్గిస్తుంది.'
      },
      {
        q: 'పాఠశాలలో నొప్పి వస్తే ఏం చేయాలి?',
        a: 'గోరువెచ్చని నీరు త్రాగండి మరియు టీచర్‌కు చెప్పి విశ్రాంతి తీసుకోండి.'
      }
    ]
  },
  ml: {
    title: 'ആദ്യ ആർത്തവം (Menarche) മാർഗ്ഗരേഖയും ട്രാക്കറും',
    sub: 'കൗമാരക്കാർക്കുള്ള സ്നേഹപൂർണ്ണമായ സുരക്ഷിത വിവരങ്ങൾ.',
    reassuranceQuote: 'ആർത്തവം ശരീരത്തിന്റെ സ്വാഭാവികവും ആരോഗ്യകരവുമായ ഒരു മാറ്റമാണ്. ഭയപ്പെടേണ്ടതില്ല! 🌸',
    ageLabel: 'ആദ്യ ആർത്തവ പ്രായം:',
    dateLabel: 'തീയതി:',
    flowLabel: 'രക്തസ്രാവം:',
    flowOptions: {
      spotting: 'സ്പോട്ടിംഗ് (Spotting)',
      light: 'കുറഞ്ഞ സ്രാവം (Light)',
      medium: 'സാധാരണ സ്രാവം (Regular)'
    },
    saveRecordBtn: 'വിവരങ്ങൾ രേഖപ്പെടുത്തുക',
    savedSuccess: '✓ വിവരങ്ങൾ രേഖപ്പെടുത്തി!',
    timelineTitle: '1 മുതൽ 3 വർഷത്തെ ക്രമീകരണ കാലയളവ്',
    timelineSub: 'ആദ്യത്തെ 1-3 വർഷം ആർത്തവം ക്രമരഹിതമാകുന്നത് തികച്ചും സാധാരണമാണ്.',
    year1: { title: 'വർഷം 1: തുടക്കം', desc: 'ചക്രം 21 മുതൽ 45+ ദിവസങ്ങൾ വരെയാകാം.' },
    year2: { title: 'വർഷം 2: സ്ഥിരതയിലേക്ക്', desc: 'ചക്രം 24-38 ദിവസങ്ങളിലേക്ക് മാറുന്നു.' },
    year3: { title: 'വർഷം 3: ക്രമീകൃത ചക്രം', desc: 'ചക്രം 21-35 ദിവസങ്ങളിൽ സ്ഥിരപ്പെടുന്നു.' },
    hygieneTitle: 'ശുചിത്വ മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    hygieneSteps: [
      { step: '1. പാഡ് ധരിക്കൽ', text: 'പാഡ് അടിവസ്ത്രത്തിൽ ഉറപ്പിച്ചു വെക്കുക.' },
      { step: '2. മാറ്റേണ്ട സമയം', text: '4-6 മണിക്കൂറിൽ പാഡ് മാറ്റുക.' },
      { step: '3. നിർമ്മാർജ്ജനം', text: 'പേപ്പറിൽ പൊതിഞ്ഞ് വേസ്റ്റ് ബിന്നിലിടുക.' },
      { step: '4. ശുചീകരണം', text: 'ചെറുചൂടുവെള്ളത്തിൽ കഴുകുക.' }
    ],
    kitTitle: 'സ്കൂൾ എമർജൻസി കിറ്റ്',
    kitSub: 'സ്കൂൾ ബാഗിൽ കരുതേണ്ടവ:',
    kitItems: ['2-3 സാനിറ്ററി പാഡുകൾ', 'അധിക അടിവസ്ത്രം', 'വെറ്റ് വൈപ്പുകൾ', 'ചെറിയ ബാഗ്', 'ചൂടുവെള്ളം'],
    symptomsTitle: 'ലക്ഷണങ്ങൾ രേഖപ്പെടുത്തുക',
    symptoms: [
      { id: 'cramp', label: 'വയറുവേദന (Cramps)' },
      { id: 'back', label: 'നടുവേദന' },
      { id: 'tender', label: 'സ്തനവേദന' },
      { id: 'mood', label: 'മാനസിക മാറ്റങ്ങൾ' },
      { id: 'fatigue', label: 'ക്ഷീണം' },
      { id: 'cravings', label: 'മധുരത്തോടുള്ള കൊതി' }
    ],
    notifyMomBtn: 'അമ്മയെ (കവിത) അറിയിക്കുക',
    notifyMomDesc: 'അമ്മയ്ക്ക് സ്നേഹപൂർവ്വം SMS അയക്കുക.',
    smsSuccess: '✓ അമ്മയ്ക്ക് SMS അയച്ചു!',
    faqTitle: 'സംശയങ്ങളും മറുപടികളും',
    faqs: [
      { q: 'രക്തത്തിന് തവിട്ടുനിറം ഉണ്ടാകുന്നത് എന്തുകൊണ്ട്?', a: 'ഇത് സാധാരണമാണ്. ഗർഭാശയത്തിൽ നിന്ന് വരാൻ വൈകുന്ന രക്തം ഓക്സിജനുമായി പ്രവർത്തിക്കുമ്പോഴാണ് തവിട്ടുനിറമാകുന്നത്.' },
      { q: 'അടുത്ത മാസം വരാതിരുന്നാൽ കുഴപ്പമുണ്ടോ?', a: 'ഇല്ല, ആദ്യ 1-2 വർഷം തീയതി വ്യത്യാസപ്പെടുന്നത് സ്വാഭാവികമാണ്.' },
      { q: 'കായിക വിനോദങ്ങളിൽ ഏർപ്പെടാമോ?', a: 'തീർച്ചയായും! ലഘു വ്യായാമം വേദന കുറയ്ക്കും.' },
      { q: 'സ്കൂളിൽ വേദനിച്ചാൽ എന്ത് ചെയ്യണം?', a: 'ചൂടുവെള്ളം കുടിക്കുകയും വിശ്രമിക്കുകയും ചെയ്യുക.' }
    ]
  },
  mr: {
    title: 'पहिली मासिक पाळी (Menarche) मार्गदर्शक व ट्रॅकर',
    sub: 'किशोरवयीन मुलींसाठी सुरक्षित व माहितीपूर्ण मार्गदर्शन.',
    reassuranceQuote: 'मासिक पाळी हा शरीराचा एक नैसर्गिक आणि निरोगी बदल आहे. घाबरू नका! 🌸',
    ageLabel: 'पहिली पाळी वय:',
    dateLabel: 'तारीख:',
    flowLabel: 'रक्तस्राव:',
    flowOptions: { spotting: 'डाग पडणे (Spotting)', light: 'कमी प्रवाह (Light)', medium: 'मध्यम प्रवाह (Medium)' },
    saveRecordBtn: 'नोंद जतन करा',
    savedSuccess: '✓ माहिती जतन केली!',
    timelineTitle: '1 ते 3 वर्षांची नियमन कालमर्यादा',
    timelineSub: 'सुरुवातीच्या 1-3 वर्षांत पाळी अनियमित असणे पूर्णपणे सामान्य आहे.',
    year1: { title: 'वर्ष 1: चढ-उतार', desc: 'मासिक चक्र 21 ते 45+ दिवसांचे असू शकते.' },
    year2: { title: 'वर्ष 2: नियमिततेकडे', desc: 'चक्र 24-38 दिवसांचे होऊ लागते.' },
    year3: { title: 'वर्ष 3: स्थिर चक्र', desc: 'चक्र 21-35 दिवसांचे नियमित होते.' },
    hygieneTitle: 'स्वच्छता व पॅड वापर',
    hygieneSteps: [
      { step: '1. पॅड लावणे', text: 'पॅड अंडरवेअरवर व्यवस्थित चिकटवा.' },
      { step: '2. बदलण्याची वेळ', text: 'दर 4 ते 6 तासांनी पॅड बदला.' },
      { step: '3. विल्हेवाट', text: 'कागदात गुंडाळून कचराकुंडीत टाका.' },
      { step: '4. स्वच्छता', text: 'कोमट पाण्याने हलके धुवा.' }
    ],
    kitTitle: 'शाळा इमर्जन्सी किट',
    kitSub: 'बॅगेत ठेवण्याच्या गोष्टी:',
    kitItems: ['2-3 पॅड', 'अतिरिक्त कपडे', 'वेट वाइप्स', 'पिशवी', 'कोमट पाणी'],
    symptomsTitle: 'लक्षणे ट्रॅकर',
    symptoms: [
      { id: 'cramp', label: 'पोटात दुखणे (Cramps)' },
      { id: 'back', label: 'कंबरदुखी' },
      { id: 'tender', label: 'स्तनांमध्ये दुखणे' },
      { id: 'mood', label: 'मूड बदलणे' },
      { id: 'fatigue', label: 'थकवा' },
      { id: 'cravings', label: 'गोड खाण्याची इच्छा' }
    ],
    notifyMomBtn: 'आईला (कविता) कळवा',
    notifyMomDesc: 'आईला SMS पाठवून मदत मिळवा.',
    smsSuccess: '✓ आईला SMS पाठवला!',
    faqTitle: 'वारंवार विचारले जाणारे प्रश्न',
    faqs: [
      { q: 'रक्त तपकिरी का दिसते?', a: 'हे सामान्य आहे. गर्भाशयातून बाहेर पडायला उशीर झाल्याने रक्ताचा रंग बदलतो.' },
      { q: 'पुढच्या महिन्यात पाळी न आल्यास काय?', a: 'काळजी नको, सुरुवातीला असे होणे स्वाभाविक आहे.' },
      { q: 'खेळ खेळता येतील का?', a: 'हो, नक्कीच! हलका व्यायाम वेदना कमी करतो.' },
      { q: 'शाळेत त्रास झाल्यास?', a: 'शिक्षकांना सांगा आणि कोमट पाणी प्या.' }
    ]
  },
  mwr: {
    title: 'पहिली माहवारी गाइड अर ट्रैकर',
    sub: 'किशोरी बेटियां सारु सुरक्षित अर घणो चोखो मार्गदर्शन।',
    reassuranceQuote: 'माहवारी कुदरत रो चोखो नियम है। डरपो मत! 🌸',
    ageLabel: 'पहिली माहवारी री उमर:',
    dateLabel: 'तारीख:',
    flowLabel: 'बहाव:',
    flowOptions: { spotting: 'हल्का धब्बा', light: 'कम बहाव', medium: 'ठीक बहाव' },
    saveRecordBtn: 'मील रो पत्थर लिखो',
    savedSuccess: '✓ रिकॉर्ड दर्ज हो ग्यो!',
    timelineTitle: '1 सूं 3 साल रो टाइमलाइन',
    timelineSub: 'शुरुआत मां चक्र आगे-पाछे होणो साधारण बात है।',
    year1: { title: 'साल 1: शुरुआत', desc: 'चक्र 21 सूं 45+ दिन रो हो सके।' },
    year2: { title: 'साल 2: सुधार', desc: 'चक्र 24-38 दिन रो होवे।' },
    year3: { title: 'साल 3: पक्को चक्र', desc: 'चक्र 21-35 दिन रो नियम सूं चाले।' },
    hygieneTitle: 'सफाई अर पैड गाइड',
    hygieneSteps: [
      { step: '1. पैड लगावणो', text: 'पैड ने ठीक चिपकाओ।' },
      { step: '2. बदलो', text: '4-6 घंटा में बदलो।' },
      { step: '3. फैंकणो', text: 'कागद में लपेट’र कचरे में डालो।' },
      { step: '4. धोवणो', text: 'गुनगुने पाणी सूं साफ राखो।' }
    ],
    kitTitle: 'स्कूल किट',
    kitSub: 'बस्ते मां राखण री चीजां:',
    kitItems: ['2-3 पैड', 'साफ कपड़ा', 'वाइप्स', 'प्लास्टिक थैली', 'गुनगुणो पाणी'],
    symptomsTitle: 'लक्षण',
    symptoms: [
      { id: 'cramp', label: 'पेट दर्द' },
      { id: 'back', label: 'कमर दर्द' },
      { id: 'tender', label: 'छाती में दर्द' },
      { id: 'mood', label: 'मूड बदलो' },
      { id: 'fatigue', label: 'थकावट' },
      { id: 'cravings', label: 'मीठो खावण रो मन' }
    ],
    notifyMomBtn: 'मां (कविता) ने बताओ',
    notifyMomDesc: 'मां ने SMS भेज’र बतावो।',
    smsSuccess: '✓ मां ने SMS भेज दियो!',
    faqTitle: 'सवाल-जवाब',
    faqs: [
      { q: 'खून भूरो क्यूं दिखे?', a: 'यो साधारण है। हवा लागण सूं रंग बदले।' },
      { q: 'दूजे महीने न आवे तो?', a: 'चिंता मत करो, शुरुआत में आगे-पाछे होवे।' },
      { q: 'खेल सकां कांई?', a: 'हाँ, खेलण सूं दर्द कम होवे।' },
      { q: 'स्कूल में दर्द होवे तो?', a: 'मास्टर जी ने बताओ अर पाणी पियो।' }
    ]
  },
  fr: {
    title: 'Premières Règles (Ménarche) Guide Bienveillant & Suivi',
    sub: 'Un espace chaleureux pour les jeunes filles vivant leurs toutes premières règles.',
    reassuranceQuote: 'Les règles sont une étape naturelle et saine de la croissance. Tu es en sécurité ! 🌸',
    ageLabel: 'Âge aux premières règles :',
    dateLabel: 'Date :',
    flowLabel: 'Flux initial :',
    flowOptions: { spotting: 'Léger spotting (gouttes)', light: 'Flux léger', medium: 'Flux normal' },
    saveRecordBtn: 'Enregistrer cette étape',
    savedSuccess: '✓ Enregistré dans votre coffre-fort de santé !',
    timelineTitle: 'Chronologie de régularisation (1 à 3 ans)',
    timelineSub: 'Votre corps apprend. Les cycles irréguliers les 1–3 premières années sont parfaitement normaux.',
    year1: { title: 'Année 1 : Découverte', desc: 'Cycles variant de 21 à 45+ jours.' },
    year2: { title: 'Année 2 : Stabilisation', desc: 'Cycles se rapprochant de 24 à 38 jours.' },
    year3: { title: 'Année 3 : Rythme établi', desc: 'Cycles naturels réguliers de 21 à 35 jours.' },
    hygieneTitle: 'Guide d’hygiène et serviettes',
    hygieneSteps: [
      { step: '1. Pose', text: 'Fixez la serviette au centre du sous-vêtement.' },
      { step: '2. Changement', text: 'Changez toutes les 4 à 6 heures.' },
      { step: '3. Élimination', text: 'Enveloppez dans du papier et jetez à la poubelle, jamais dans les toilettes.' },
      { step: '4. Toilette', text: 'Lavez délicatement à l’eau tiède de l’avant vers l’arrière.' }
    ],
    kitTitle: 'Trousse d’urgence pour l’école',
    kitSub: 'À garder dans votre sac à dos :',
    kitItems: ['2-3 serviettes hygiéniques', 'Sous-vêtement de rechange en coton', 'Lingettes douces', 'Sachet plastique', 'Bouteille d’eau tiède'],
    symptomsTitle: 'Journal des premiers symptômes',
    symptoms: [
      { id: 'cramp', label: 'Crampes au bas-ventre' },
      { id: 'back', label: 'Douleur au bas du dos' },
      { id: 'tender', label: 'Sensibilité mammaire' },
      { id: 'mood', label: 'Variations d’humeur' },
      { id: 'fatigue', label: 'Fatigue' },
      { id: 'cravings', label: 'Envies de sucreries' }
    ],
    notifyMomBtn: 'Prévenir Maman (Kavitha)',
    notifyMomDesc: 'Envoyez un SMS bienveillant à votre mère.',
    smsSuccess: '✓ SMS envoyé à votre maman !',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Pourquoi le sang est-il marron ?', a: 'C’est tout à fait normal. Le sang s’oxyde lorsqu’il met plus de temps à s’écouler.' },
      { q: 'Si mes règles ne viennent pas le mois prochain ?', a: 'Pas d’inquiétude ! L’ovulation est irrégulière au début.' },
      { q: 'Puis-je faire du sport ?', a: 'Oui, l’activité physique légère soulage les crampes.' },
      { q: 'Que faire en cas de crampes en classe ?', a: 'Buvez de l’eau chaude et demandez à vous reposer à l’infirmerie.' }
    ]
  },
  lb: {
    title: 'دليل ومتابع الدورة الأولى للبنات (البلوغ)',
    sub: 'مساحة دافئة وآمنة للفتيات مع بداية أول دورة شهرية.',
    reassuranceQuote: 'الدورة الشهرية مرحلة طبيعية وصحية جداً في حياتك. ما تخافي، كل شي تمام! 🌸',
    ageLabel: 'العمر عند أول دورة:',
    dateLabel: 'التاريخ:',
    flowLabel: 'كمية التدفق:',
    flowOptions: { spotting: 'تنقيط خفيف (Spotting)', light: 'تدفق خفيف (Light)', medium: 'تدفق عادي (Regular)' },
    saveRecordBtn: 'حفظ المحطة الصحية',
    savedSuccess: '✓ تم حفظ السجل بنجاح!',
    timelineTitle: 'مراحل انتظام الدورة (من سنة لـ 3 سنين)',
    timelineSub: 'جسمك عم يتعلم، وطبيعي كتير تكون الدورة مش منتظمة بأول سنتين أو تلاتة.',
    year1: { title: 'السنة الأولى: البداية والتغيرات', desc: 'الدورة ممكن تكون بين 21 و 45+ يوم.' },
    year2: { title: 'السنة التانية: بداية الانتظام', desc: 'الدورة بتصير أقرب للـ 24-38 يوم.' },
    year3: { title: 'السنة التالتة: انتظام كامل', desc: 'بتصير الدورة الطبيعية المنتظمة (21-35 يوم).' },
    hygieneTitle: 'دليل النظافة والفوط الصحية',
    hygieneSteps: [
      { step: '1. تركيب الفوطة', text: 'ثبتي الفوطة منيح بوسط الملابس الداخلية.' },
      { step: '2. وقت التغيير', text: 'غيري الفوطة كل 4 لـ 6 ساعات.' },
      { step: '3. التخلص منها', text: 'لفيها بمحرمة وكبيها بسلة المهملات، أوعك بالتواليت.' },
      { step: '4. النظافة', text: 'غسلي بمي دافية بلطف من قدام لورا.' }
    ],
    kitTitle: 'شنطة الطوارئ للمدرسة',
    kitSub: 'خليها دايماً بشنطة المدرسة:',
    kitItems: ['2-3 فوط صحية', 'ملابس داخلية قطنية إضافية', 'مناديل مبللة', 'كيس صغير', 'مي دافية'],
    symptomsTitle: 'متابعة الأعراض',
    symptoms: [
      { id: 'cramp', label: 'مغص أسفل البطن' },
      { id: 'back', label: 'وجع ضهر' },
      { id: 'tender', label: 'حساسية بالصدر' },
      { id: 'mood', label: 'تغيرات بالمزاج' },
      { id: 'fatigue', label: 'تعب ونعاس' },
      { id: 'cravings', label: 'رغبة بالحلويات' }
    ],
    notifyMomBtn: 'خبري إمك (كافيتا)',
    notifyMomDesc: 'ابعتي SMS لإمك كرمال تطمن وتساعدك.',
    smsSuccess: '✓ تم إرسال الرسالة لإمك بنجاح!',
    faqTitle: 'أسئلة شائعة وتطمين',
    faqs: [
      { q: 'ليش الدم لونو بني؟', a: 'طبيعي كتير! الدم لما ياخد وقت ليطلع بتأكسد وبصير لونو بني.' },
      { q: 'إذا ما إجت الدورة الشهر الجاي عادي؟', a: 'إي عادي وما في داعي للقلق، بأول سنة التبويض ما بكون منتظم.' },
      { q: 'فيني إلعب رياضة؟', a: 'أكيد! الحركة الخفيفة بتخفف المغص.' },
      { q: 'شو أعمل إذا وجعني بطني بالمدرسة؟', a: 'اشربي مي دافية واطلبي راحة بغرفة الصحة.' }
    ]
  },
  ar: {
    title: 'دليل ومتابع الدورة الشهرية الأولى (سن البلوغ)',
    sub: 'مساحة آمنة وداعمة للفتيات الصغيرات في أول تجربة طمث.',
    reassuranceQuote: 'الحيض هو مرحلة طبيعية وصحية ومباركة في نمو كل فتاة. أنتِ في أمان وقوة! 🌸',
    ageLabel: 'العمر عند أول حيض:',
    dateLabel: 'التاريخ:',
    flowLabel: 'طبيعة التدفق الأولي:',
    flowOptions: { spotting: 'تمشيح خفيف (Spotting)', light: 'تدفق خفيف (Light)', medium: 'تدفق متوسط (Medium)' },
    saveRecordBtn: 'حفظ هذا الإنجاز الصحي',
    savedSuccess: '✓ تم حفظ السجل في محفظتك الصحية بأمان!',
    timelineTitle: 'الجدول الزمني لانتظام الدورة (من 1 إلى 3 سنوات)',
    timelineSub: 'جسمكِ في مرحلة تعلم. من الطبيعي تماماً عدم انتظام الدورة خلال أول سنتين أو ثلاث سنوات.',
    year1: { title: 'العام 1: البداية والتقلبات', desc: 'قد تتراوح المدة بين 21 و 45+ يوماً مع انقطاع مؤقت أحياناً.' },
    year2: { title: 'العام 2: نحو الاستقرار', desc: 'تصبح الهرمونات أكثر توازناً والدورة بين 24 و 38 يوماً.' },
    year3: { title: 'العام 3: النمط الطبيعي المكتمل', desc: 'استقرار الدورة الشهرية الطبيعية (21 إلى 35 يوماً).' },
    hygieneTitle: 'دليل النظافة الشخصية واستخدام الفوط',
    hygieneSteps: [
      { step: '1. التثبيت', text: 'انزعي الشريط اللاصق وثبتي الفوطة جيداً في منتصف الملابس الداخلية.' },
      { step: '2. الاستبدال', text: 'يجب تغيير الفوطة كل 4 إلى 6 ساعات للوقاية من البكتيريا.' },
      { step: '3. التخلص الآمن', text: 'لفي الفوطة بالورق وتخلصي منها في سلة المهملات، ولا تلقيها في المرحاض.' },
      { step: '4. الغسيل اللطيف', text: 'اغسلي المنطقة بالماء الفاتر من الأمام إلى الخلف بلطف.' }
    ],
    kitTitle: 'قائمة حقيبة الطوارئ المدرسية',
    kitSub: 'احتفظي بهذه الحقيبة الصغيرة داخل حقيبة مدرستكِ دائماً:',
    kitItems: ['2-3 فوط صحية مغلفة', 'ملابس داخلية قطنية بديلة', 'مناديل مبللة غير معطرة', 'كيس صغير لحفظ الملابس', 'ماء دافئ'],
    symptomsTitle: 'سجل الأعراض الأولية',
    symptoms: [
      { id: 'cramp', label: 'مغص خفيف أسفل البطن' },
      { id: 'back', label: 'ألم في أسفل الظهر' },
      { id: 'tender', label: 'حساسية وألم في الثديين' },
      { id: 'mood', label: 'تقلبات مزاجية وعاطفية' },
      { id: 'fatigue', label: 'إرهاق ورغبة في النوم' },
      { id: 'cravings', label: 'رغبة في السكريات' }
    ],
    notifyMomBtn: 'مشاركة الإشعار مع الأم (كافيتا)',
    notifyMomDesc: 'إرسال رسالة SMS لطيفة ومطمئنة إلى والدتكِ لتقديم الدعم لكِ.',
    smsSuccess: '✓ تم إرسال إشعار SMS لوالدتكِ بنجاح!',
    faqTitle: 'الأسئلة الشائعة وتطمينات طبية',
    faqs: [
      { q: 'لماذا يبدو لون الدم بنياً بدلاً من الأحمر؟', a: 'هذا أمر طبيعي جداً. الدم البني هو دم أخذ وقتاً أطول للخروج من الرحم وتأكسد، ويحدث عادة في أول أو آخر يوم.' },
      { q: 'هل من الطبيعي ألا تأتي الدورة في الشهر التالي؟', a: 'نعم بالتأكيد! الإباضة غير منتظمة في أول عام أو عامين، وهذا أمر متوقع طبياً.' },
      { q: 'هل يمكنني ممارسة الرياضة والذهاب للمدرسة؟', a: 'نعم بالطبع! الرياضة الخفيفة والمشي يساعدان على تخفيف التقلصات.' },
      { q: 'ماذا أفعل إذا شعرت بألم في المدرسة؟', a: 'اشربي ماءً دافئاً، واطلبي من المعلمة التوجه إلى العيادة المدرسية للراحة.' }
    ]
  }
};

export default function FirstPeriodTracker() {
  const { language } = useLanguage();
  const t = FIRST_PERIOD_I18N[language] || FIRST_PERIOD_I18N.en;
  const { userPhone, motherPhone, motherName, openNativePhoneSms } = useSmsAlert();

  // Local storage state
  const [firstPeriodData, setFirstPeriodData] = useState(() => {
    try {
      const saved = localStorage.getItem('femtech_first_period_record');
      return saved ? JSON.parse(saved) : {
        age: '12',
        date: '2026-09-12',
        flow: 'spotting',
        symptoms: ['cramp', 'mood'],
        notes: ''
      };
    } catch (e) {
      return { age: '12', date: '2026-09-12', flow: 'spotting', symptoms: ['cramp'], notes: '' };
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [smsStatus, setSmsStatus] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSymptomToggle = (id) => {
    setFirstPeriodData((prev) => {
      const exists = prev.symptoms.includes(id);
      return {
        ...prev,
        symptoms: exists ? prev.symptoms.filter((x) => x !== id) : [...prev.symptoms, id]
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('femtech_first_period_record', JSON.stringify(firstPeriodData));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleNotifyMom = () => {
    const msg = language === 'ta'
      ? `அம்மா ${motherName}! FemTech-இல் எனது முதல் மாதவிடாய் பதிவு செய்யப்பட்டுள்ளது. நலம் சீராக உள்ளது, உங்கள் அன்பும் ஆதரவும் எனக்கு தைரியம் தருகிறது! 🌸`
      : `Mom (${motherName})! My first period milestone is logged in FemTech. I am feeling safe and doing well! 🌸`;

    // 1. Silent backend SMS
    try {
      fetch('/api/sms/send-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone,
          motherPhone,
          motherName,
          message: msg,
          alertType: 'First Period Menarche Milestone Sync'
        })
      }).catch(() => {});
    } catch (e) {}

    // 2. Open directly in phone SMS app
    openNativePhoneSms(motherPhone, msg);

    setSmsStatus(true);
    setTimeout(() => setSmsStatus(false), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Gentle Welcome Banner */}
      <div className="glass-card" style={{
        padding: '28px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #eff6ff 100%)',
        border: '1.5px solid #fbcfe8',
        boxShadow: '0 8px 24px rgba(244, 63, 94, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 6px 16px rgba(236, 72, 153, 0.3)',
            flexShrink: 0
          }}>
            🌿
          </div>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-block',
              background: '#fdf2f8',
              color: '#be185d',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '0.74rem',
              fontWeight: 800,
              border: '1px solid #fbcfe8',
              marginBottom: '6px'
            }}>
              MENARCHE CARE • பூப்படைதல் வழிகாட்டி
            </span>
            <h2 style={{ fontSize: '1.5rem', color: '#881337', margin: '0 0 6px 0', fontWeight: 800 }}>
              {t.title}
            </h2>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.88rem', color: '#9f1239', lineHeight: 1.5 }}>
              {t.sub}
            </p>
            <div style={{
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'white',
              border: '1px solid #fbcfe8',
              color: '#831843',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Heart size={16} color="#e11d48" style={{ flexShrink: 0 }} />
              <span>{t.reassuranceQuote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid: First Period Form + 1-3 Year Regulation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Card 1: First Period Logging Form */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '18px',
          background: 'white',
          border: '1px solid #fbcfe8'
        }}>
          <h3 style={{ fontSize: '1.1rem', color: '#881337', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} color="#e11d48" />
            <span>{t.saveRecordBtn}</span>
          </h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#831843', marginBottom: '4px' }}>
                  {t.ageLabel}
                </label>
                <input
                  type="number"
                  min="9"
                  max="19"
                  value={firstPeriodData.age}
                  onChange={(e) => setFirstPeriodData({ ...firstPeriodData, age: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #fbcfe8',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#831843', marginBottom: '4px' }}>
                  {t.dateLabel}
                </label>
                <input
                  type="date"
                  value={firstPeriodData.date}
                  onChange={(e) => setFirstPeriodData({ ...firstPeriodData, date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #fbcfe8',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#831843', marginBottom: '6px' }}>
                {t.flowLabel}
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(t.flowOptions).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFirstPeriodData({ ...firstPeriodData, flow: key })}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: firstPeriodData.flow === key ? '2px solid #e11d48' : '1px solid #fbcfe8',
                      background: firstPeriodData.flow === key ? '#fff1f2' : '#ffffff',
                      color: firstPeriodData.flow === key ? '#9f1239' : '#475569',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>{key === 'spotting' ? '💧' : key === 'light' ? '🩸' : '🩸🩸'}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#831843', marginBottom: '6px' }}>
                {t.symptomsTitle}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px' }}>
                {t.symptoms.map((s) => {
                  const selected = firstPeriodData.symptoms.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSymptomToggle(s.id)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: selected ? '1.5px solid #be185d' : '1px solid #e2e8f0',
                        background: selected ? '#fdf2f8' : 'white',
                        color: selected ? '#be185d' : '#64748b',
                        fontSize: '0.76rem',
                        fontWeight: selected ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {selected ? '✓ ' : '+ '}{s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
              <button
                type="submit"
                style={{
                  padding: '9px 18px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(225, 29, 72, 0.3)'
                }}
              >
                {t.saveRecordBtn}
              </button>

              {savedSuccess && (
                <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>
                  {t.savedSuccess}
                </span>
              )}
            </div>
          </form>

          {/* Sync With Mom Section */}
          <div style={{
            marginTop: '18px',
            paddingTop: '16px',
            borderTop: '1px solid #fce7f3',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#9f1239' }}>
              {t.notifyMomDesc}
            </div>
            <button
              type="button"
              onClick={handleNotifyMom}
              style={{
                padding: '9px 16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: 'white',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
              }}
            >
              <Smartphone size={15} />
              <span>{t.notifyMomBtn}</span>
            </button>
            {smsStatus && (
              <span style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 700, textAlign: 'center' }}>
                {t.smsSuccess}
              </span>
            )}
          </div>
        </div>

        {/* Card 2: 1 to 3 Year Regulation Timeline */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '18px',
          background: 'white',
          border: '1px solid #e0e7ff',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#312e81', fontWeight: 800, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="#4f46e5" />
              <span>{t.timelineTitle}</span>
            </h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#6366f1', lineHeight: 1.45 }}>
              {t.timelineSub}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', paddingLeft: '8px' }}>
            {/* Year 1 */}
            <div style={{
              padding: '12px 14px',
              borderRadius: '14px',
              background: '#f5f3ff',
              borderLeft: '4px solid #8b5cf6',
              border: '1px solid #ede9fe'
            }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#5b21b6', marginBottom: '3px' }}>
                {t.year1.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6d28d9', lineHeight: 1.45 }}>
                {t.year1.desc}
              </div>
            </div>

            {/* Year 2 */}
            <div style={{
              padding: '12px 14px',
              borderRadius: '14px',
              background: '#eff6ff',
              borderLeft: '4px solid #3b82f6',
              border: '1px solid #dbeafe'
            }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#1e40af', marginBottom: '3px' }}>
                {t.year2.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#2563eb', lineHeight: 1.45 }}>
                {t.year2.desc}
              </div>
            </div>

            {/* Year 3 */}
            <div style={{
              padding: '12px 14px',
              borderRadius: '14px',
              background: '#f0fdf4',
              borderLeft: '4px solid #10b981',
              border: '1px solid #dcfce7'
            }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#065f46', marginBottom: '3px' }}>
                {t.year3.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#059669', lineHeight: 1.45 }}>
                {t.year3.desc}
              </div>
            </div>
          </div>

          {/* School Emergency Checklist Box */}
          <div style={{
            marginTop: 'auto',
            padding: '14px',
            borderRadius: '14px',
            background: '#fffbeb',
            border: '1px solid #fde68a'
          }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#92400e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={16} color="#d97706" />
              <span>🎒 {t.kitTitle}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.76rem', color: '#b45309', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {t.kitItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Hygiene Steps Section */}
      <div className="glass-card" style={{
        padding: '24px',
        borderRadius: '18px',
        background: 'white',
        border: '1px solid #fbcfe8'
      }}>
        <h3 style={{ fontSize: '1.15rem', color: '#881337', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Droplets size={20} color="#e11d48" />
          <span>{t.hygieneTitle}</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {t.hygieneSteps.map((h, i) => (
            <div key={i} style={{
              padding: '14px',
              borderRadius: '12px',
              background: '#fdf2f8',
              border: '1px solid #fce7f3'
            }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#be185d', marginBottom: '4px' }}>
                {h.step}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#831843', lineHeight: 1.45 }}>
                {h.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Reassurance Accordion */}
      <div className="glass-card" style={{
        padding: '24px',
        borderRadius: '18px',
        background: 'white',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '1.15rem', color: '#1e293b', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smile size={20} color="#059669" />
          <span>{t.faqTitle}</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {t.faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  border: isOpen ? '1.5px solid #cbd5e1' : '1px solid #f1f5f9',
                  background: isOpen ? '#f8fafc' : '#ffffff',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#0f172a'
                  }}
                >
                  <span>{f.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 16px 14px 16px',
                    fontSize: '0.82rem',
                    color: '#475569',
                    lineHeight: 1.55,
                    borderTop: '1px dashed #e2e8f0',
                    paddingTop: '10px'
                  }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
