import React, { useState } from 'react';
import { CalendarHeart, Activity, Baby, HeartPulse, ShieldAlert, Award, FileText, CheckCircle2, Dumbbell, Shield, Sparkles, ChevronDown, ChevronUp, Droplets, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

const ADULT_EXTENDED_I18N = {
  en: {
    advancedSectionTitle: 'Advanced Adult Clinical Modules & Wellness Guides',
    advancedSectionSub: 'Evidence-based clinical guides designed for women balancing career, reproductive vitality, and long-term health.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'Pelvic Floor & Kegel Strengthening',
        tag: 'Core & Urological Health',
        summary: 'Strengthens pelvic floor muscles supporting the bladder, uterus, and bowel to prevent postpartum or stress incontinence.',
        actionTitle: 'Step-by-Step Kegel Technique:',
        steps: [
          'Identify pelvic floor muscles by gently pausing mid-stream urination once (do not do this regularly as an exercise).',
          'Tighten and contract these muscles, hold for 5 seconds, then relax for 5 seconds.',
          'Breathe smoothly; do not tighten abdomen, thighs, or buttocks.',
          'Aim for 3 sets of 10 repetitions daily for optimal pelvic support.'
        ]
      },
      {
        id: 'endo',
        icon: '🔬',
        title: 'Endometriosis vs. Adenomyosis Clinical Guide',
        tag: 'Pelvic Pain Evaluation',
        summary: 'Endometriosis involves endometrial tissue growing outside the uterus; Adenomyosis involves tissue growing into the muscular uterine wall.',
        actionTitle: 'Key Differentiators & Relief Strategies:',
        steps: [
          'Endometriosis: Sharp, localized cyclical pain, pain during intercourse, potential bowel or bladder involvement.',
          'Adenomyosis: Generalized deep uterine ache, enlarged boggy uterus, heavy prolonged bleeding with large clots.',
          'Anti-inflammatory protocol: Omega-3 fatty acids, turmeric/curcumin, and regular anti-inflammatory greens.',
          'Clinical diagnosis requires specialized transvaginal ultrasound or MRI under guidance of a gynecological specialist.'
        ]
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'Women’s Cardiovascular Protection',
        tag: 'Atherosclerosis & Heart Shield',
        summary: 'Heart disease manifests differently in women than men. Before menopause, estrogen offers natural arterial elasticity; after 35, regular screening is crucial.',
        actionTitle: 'Atypical Female Cardiac Symptoms & Prevention:',
        steps: [
          'Watch for subtle symptoms: Unexplained profound fatigue, shortness of breath, jaw/neck/back pain, nausea without chest tightness.',
          'Monitor the lipid triad: Check ApoB, LDL-C, and Triglycerides yearly starting at age 30.',
          'Maintain 150 minutes of weekly moderate aerobic activity to preserve endothelial function.'
        ]
      },
      {
        id: 'fertility',
        icon: '🧬',
        title: 'Fertility Awareness & Ovarian Reserve (AMH)',
        tag: 'Reproductive Planning',
        summary: 'Understanding your biological clock, Anti-Müllerian Hormone (AMH) markers, and fertile window tracking.',
        actionTitle: 'Ovarian Reserve Insights:',
        steps: [
          'AMH levels reflect remaining primordial follicle pool, but not egg quality.',
          'Basal Body Temperature (BBT) rises 0.5°F immediately following ovulation.',
          'Antioxidants like CoQ10 (Ubiquinol) and Folate (5-MTHF) support mitochondrial egg health.'
        ]
      },
      {
        id: 'bone',
        icon: '🦴',
        title: 'Peak Bone Mass & DEXA Shield',
        tag: 'Osteoporosis Prevention',
        summary: 'Women reach peak bone mass by age 30. Bone density gradually declines thereafter unless protected by resistance training and mineral nutrition.',
        actionTitle: 'Bone Fortification Rules:',
        steps: [
          'Combine 1000–1200 mg Calcium daily with Vitamin D3 (1000 IU) and Vitamin K2 for arterial-to-bone calcium transport.',
          'Engage in weight-bearing exercise (squats, resistance bands, brisk uphill walking) at least 3 times a week.',
          'Limit excess carbonated beverages and high caffeine, which can leach calcium.'
        ]
      },
      {
        id: 'cortisol',
        icon: '⚖️',
        title: 'Cortisol & Adrenal Stress Balance',
        tag: 'Hormonal Equilibrium',
        summary: 'Chronic workplace and family stress elevates cortisol, leading to progesterone steal, irregular cycles, and visceral fat storage.',
        actionTitle: 'Adrenal Reset Protocol:',
        steps: [
          'Expose eyes to natural sunlight within 30 minutes of waking to anchor the cortisol awakening curve.',
          'Avoid coffee on an empty stomach; pair morning caffeine with healthy protein and fats.',
          'Practice 10 minutes of physiological sigh breathing (two quick inhales through nose, long exhale through mouth) during peak stress.'
        ]
      }
    ]
  },
  ta: {
    advancedSectionTitle: 'மேம்பட்ட பெண்கள் நல & மருத்துவ வழிகாட்டிகள்',
    advancedSectionSub: 'பணி, குடும்பம் மற்றும் நீண்டகால உடல்நலத்தை சமநிலைப்படுத்தும் பெண்களுக்கான ஆதாரபூர்வ மருத்துவ தகவல்கள்.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'இடுப்புத் தசை வலிமை & கீகல் பயிற்சிகள் (Kegel)',
        tag: 'இடுப்பு & சிறுநீரக நலன்',
        summary: 'கருப்பை, சிறுநீர்ப்பை மற்றும் குடலைத் தாங்கும் இடுப்புத் தள தசைகளை பலப்படுத்தி, தும்மும்போது சிறுநீர் கசிவதைத் தடுக்கும்.',
        actionTitle: 'கீகல் பயிற்சி செய்முறை வழிகாட்டி:',
        steps: [
          'சிறுநீர் கழிக்கும்போது ஒரு கணம் நிறுத்துவது போன்ற தசைகளை உணருங்கள் (இதை வழக்கமான பழக்கமாக செய்ய வேண்டாம்).',
          'அந்த தசைகளை 5 வினாடிகள் இறுக்கிப் பிடித்து, பின் 5 வினாடிகள் தளர்த்தவும்.',
          'வயிறு, பிட்டம் அல்லது தொடைகளை இறுக்காமல் சீராக மூச்சுவிடவும்.',
          'தினமும் 10 முறைகள் வீதம் 3 செட்டுகள் செய்து வர இடுப்புத் தசைகள் பலப்படும்.'
        ]
      },
      {
        id: 'endo',
        icon: '🔬',
        title: 'எண்டோமெட்ரியோசிஸ் & அடினோமயோசிஸ் வழிகாட்டி',
        tag: 'அடிவயிற்று வலி பரிசோதனை',
        summary: 'எண்டோமெட்ரியோசிஸ் என்பது கருப்பை திசுக்கள் கருப்பைக்கு வெளியே வளர்வது; அடினோமயோசிஸ் என்பது திசுக்கள் கருப்பையின் தசைச் சுவருக்குள் வளர்வது.',
        actionTitle: 'அறிகுறிகள் & வலி நிவாரண உத்திகள்:',
        steps: [
          'எண்டோமெட்ரியோசிஸ்: மாதவிடாயின் போது கடுமையான கூர்மையான வலி, உடலுறவின் போது வலி, குடல் இயக்கம் போது வலி.',
          'அடினோமயோசிஸ்: கருப்பை வீக்கம், ஆழ்ந்த இடைவிடாத அடிவயிற்று வலி, பெரிய கட்டிகளுடன் கூடிய அதீத இரத்தப்போக்கு.',
          'வீக்கத்தைக் குறைக்கும் உணவுகள்: ஒமேகா-3 கொழுப்பு அமிலங்கள், மஞ்சள் (Curcumin) மற்றும் கீரை வகைகள்.',
          'சரியான சிகிச்சைக்கு மகளிர் மருத்துவரிடம் அல்ட்ராசவுண்ட் அல்லது MRI பரிசோதனை மேற்கொள்வது அவசியம்.'
        ]
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'பெண்களின் இதய பாதுகாப்பு வழிகாட்டி',
        tag: 'இதய நலக் கவசம்',
        summary: 'பெண்களுக்கு இதய நோய் அறிகுறிகள் ஆண்களை விட வித்தியாசமாக வெளிப்படும். 35 வயதுக்கு மேல் வழக்கமான இரத்த அழுத்தம் மற்றும் கொழுப்புப் பரிசோதனை அவசியம்.',
        actionTitle: 'பெண்களுக்கான மறைமுக இதய அறிகுறிகள்:',
        steps: [
          'மார்பு வலி இல்லாமல் திடீர் கடுமையான சோர்வு, மூச்சுத் திணறல், தாடை/கழுத்து/முதுகு வலி ஏற்படுதல்.',
          '30 வயது முதல் ஆண்டுக்கு ஒருமுறை ரத்த கொழுப்பு (Lipid Profile) மற்றும் சர்க்கரை அளவை சோதிக்கவும்.',
          'வாரத்திற்கு குறைந்தது 150 நிமிடங்கள் மிதமான நடைப்பயிற்சி அல்லது உடற்பயிற்சி செய்வது இதய நாளங்களை பாதுகாக்கும்.'
        ]
      },
      {
        id: 'fertility',
        icon: '🧬',
        title: 'கருத்தரிப்பு & கருமுட்டை சேமிப்பு (AMH)',
        tag: 'இனப்பெருக்க திட்டமிடல்',
        summary: 'உயிரியல் கடிகாரம், Anti-Müllerian Hormone (AMH) அளவுகள் மற்றும் வளமான நாட்களை (Fertile window) கண்காணிக்கும் வழிகாட்டி.',
        actionTitle: 'கருமுட்டை வளமை பரிசோதனை:',
        steps: [
          'AMH இரத்தப் பரிசோதனை உங்கள் கருப்பையில் மீதமுள்ள கருமுட்டைகளின் எண்ணிக்கையைக் குறிக்கும்.',
          'கருமுட்டை வெளிப்படும் நாளில் (Ovulation) உடல் வெப்பநிலை 0.5°F வரை லேசாக உயரும்.',
          'CoQ10 மற்றும் ஃபோலேட் போன்ற ஊட்டச்சத்துக்கள் கருமுட்டையின் தரத்தை மேம்படுத்த உதவும்.'
        ]
      },
      {
        id: 'bone',
        icon: '🦴',
        title: 'எலும்பு அடர்த்தி & ஆஸ்டியோபோரோசிஸ் தடுப்பு',
        tag: 'எலும்பு பலம்',
        summary: 'பெண்களின் எலும்பு அடர்த்தி 30 வயதில் உச்சத்தை எட்டும். பின்னர் படிப்படியாக குறையத் தொடங்கும் என்பதால் கவனிப்பு அவசியம்.',
        actionTitle: 'எலும்பை வலுப்படுத்தும் முறைகள்:',
        steps: [
          'தினமும் 1000-1200 மிகி கால்சியத்துடன் வைட்டமின் D3 மற்றும் K2 சேர்த்து எடுத்துக்கொள்ளவும்.',
          'வாரத்தில் 3 நாட்கள் எளிய எடை தூக்கும் பயிற்சிகள் அல்லது விறுவிறுப்பான நடைப்பயிற்சி மேற்கொள்ளவும்.',
          'எலும்பில் இருந்து கால்சியத்தை உறிஞ்சும் அதீத காபி மற்றும் குளிர்பானங்களைத் தவிர்க்கவும்.'
        ]
      },
      {
        id: 'cortisol',
        icon: '⚖️',
        title: 'கார்டிசோல் & மன அழுத்த சமநிலை',
        tag: 'ஹார்மோன் சமநிலை',
        summary: 'தொடர் வேலை மற்றும் குடும்ப அழுத்தத்தால் கார்டிசோல் ஹார்மோன் அதிகரித்து மாதவிடாய் சுழற்சி பாதிக்கப்படலாம்.',
        actionTitle: 'மன அழுத்தத்தை குறைக்கும் வழிகள்:',
        steps: [
          'காலையில் எழுந்த 30 நிமிடங்களுக்குள் இயற்கை சூரிய ஒளியில் நிற்பது கார்டிசோலை சீராக்கும்.',
          'வெறும் வயிற்றில் காபி குடிப்பதைத் தவிர்க்கவும்; சத்தான காலை உணவுக்குப் பின் குடிக்கவும்.',
          'அழுத்தம் அதிகரிக்கும் போது 10 நிமிடங்கள் மூச்சுப் பயிற்சி (Physiological sigh) மேற்கொள்ளவும்.'
        ]
      }
    ]
  },
  hi: {
    advancedSectionTitle: 'उन्नत महिला स्वास्थ्य व क्लिनिकल गाइड',
    advancedSectionSub: 'करियर, मातृत्व और दीर्घकालिक स्वास्थ्य को संतुलित करने वाली महिलाओं के लिए प्रमाण-आधारित मार्गदर्शन।',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'पेल्विक फ्लोर व कीगल व्यायाम (Kegel)',
        tag: 'पेल्विक स्वास्थ्य',
        summary: 'मूत्राशय और गर्भाशय को सहारा देने वाली मांसपेशियों को मजबूत बनाकर छींकते समय मूत्र रिसाव रोकता है।',
        actionTitle: 'कीगल व्यायाम विधि:',
        steps: [
          'पेशाब को बीच में रोकने वाली मांसपेशियों को पहचानें।',
          'इन मांसपेशियों को 5 सेकंड सिकोड़ें और 5 सेकंड ढीला छोड़ें।',
          'पेट व जांघों पर जोर न दें, सामान्य सांस लें।',
          'रोजाना 10 बार के 3 सेट करें।'
        ]
      },
      {
        id: 'endo',
        icon: '🔬',
        title: 'एंडोमेट्रियोसिस व एडेनोमायोसिस गाइड',
        tag: 'पेल्विक दर्द मूल्यांकन',
        summary: 'गर्भाशय के ऊतकों की असामान्य वृद्धि के लक्षण और दर्द से राहत के उपाय।',
        actionTitle: 'लक्षण व समाधान:',
        steps: [
          'माहवारी में अत्यधिक असहनीय दर्द और भारी रक्तस्राव।',
          'ओमेगा-3, हल्दी और हरी पत्तेदार सब्जियों का सेवन सूजन घटाता है।',
          'विशेषज्ञ डॉक्टर से सोनोग्राफी जांच अवश्य कराएं।'
        ]
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'महिला हृदय सुरक्षा गाइड',
        tag: 'कार्डियो सुरक्षा',
        summary: 'महिलाओं में हृदय रोग के लक्षण अलग होते हैं। 35 वर्ष के बाद नियमित जांच आवश्यक है।',
        actionTitle: 'अप्रत्यक्ष लक्षण:',
        steps: [
          'अचानक अत्यधिक थकान, सांस फूलना, जबड़े या पीठ में दर्द होना।',
          'साल में एक बार लिपिड प्रोफाइल और ब्लड प्रेशर चेक कराएं।',
          'हफ्ते में 150 मिनट तेज टहलें।'
        ]
      },
      {
        id: 'fertility',
        icon: '🧬',
        title: 'प्रजनन क्षमता व एएमएच (AMH) गाइड',
        tag: 'प्रजनन योजना',
        summary: 'एंटी-मुलेरियन हार्मोन (AMH) और ओव्यूलेशन को समझें।',
        actionTitle: 'महत्वपूर्ण बातें:',
        steps: [
          'AMH टेस्ट से अंडों की संख्या का पता चलता है।',
          'ओव्यूलेशन के समय शरीर का तापमान थोड़ा बढ़ता है।',
          'फोलेट और स्वस्थ वसा का सेवन करें।'
        ]
      },
      {
        id: 'bone',
        icon: '🦴',
        title: 'हड्डियों का घनत्व व ऑस्टियोपोरोसिस बचाव',
        tag: 'हड्डी सुरक्षा',
        summary: '30 साल के बाद हड्डियों का घनत्व कम होने लगता है।',
        actionTitle: 'मजबूती के नियम:',
        steps: [
          'दैनिक 1200 mg कैल्शियम और विटामिन D3 लें।',
          'नियमित योग व वजन वाले व्यायाम करें।'
        ]
      },
      {
        id: 'cortisol',
        icon: '⚖️',
        title: 'कोर्टिसोल व तनाव संतुलन',
        tag: 'हार्मोन संतुलन',
        summary: 'अत्यधिक मानसिक तनाव से कोर्टिसोल बढ़कर माहवारी को प्रभावित करता है।',
        actionTitle: 'तनाव मुक्ति उपाय:',
        steps: [
          'सुबह की धूप में 15 मिनट बैठें।',
          'खाली पेट कॉफी न पिएं, गहरी सांस का अभ्यास करें।'
        ]
      }
    ]
  },
  te: {
    advancedSectionTitle: 'మహిళల ప్రత్యేక క్లినికల్ గైడ్స్',
    advancedSectionSub: 'కెరీర్, ఆరోగ్యం మరియు కుటుంబం సమతుల్యం చేసే మహిళలకు ఆధారాలతో కూడిన సమాచారం.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'కీగల్ వ్యాయామాలు & పెల్విక్ ఫ్లోర్ బలం',
        tag: 'పెల్విక్ ఆరోగ్యం',
        summary: 'మూత్రాశయం మరియు గర్భాశయానికి బలం చేకూర్చే సులభమైన వ్యాయామాలు.',
        actionTitle: 'కీగల్ చేసే విధానం:',
        steps: ['కండరాలను 5 సెకన్లు బిగించి వదలండి.', 'రోజూ 3 సార్లు చేయండి.']
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'మహిళల గుండె ఆరోగ్యం',
        tag: 'కార్డియో కేర్',
        summary: 'అలసట, శ్వాస ఆడకపోవడం వంటి లక్షణాలను నిర్లక్ష్యం చేయవద్దు.',
        actionTitle: 'జాగ్రత్తలు:',
        steps: ['లిపిడ్ ప్రొఫైల్ పరీక్ష చేయించుకోండి.', 'రోజూ 30 నిమిషాలు నడవండి.']
      }
    ]
  },
  ml: {
    advancedSectionTitle: 'സ്ത്രീകളുടെ പ്രത്യേക ആരോഗ്യ മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    advancedSectionSub: 'ദീർഘകാല ആരോഗ്യ സംരക്ഷണത്തിനായുള്ള വിവരങ്ങൾ.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'കീഗൽ വ്യായാമങ്ങൾ (Kegel)',
        tag: 'പെൽവിക് ആരോഗ്യം',
        summary: 'പെൽവിക് പേശികളെ ശക്തിപ്പെടുത്തുന്ന വ്യായാമങ്ങൾ.',
        actionTitle: 'ചെയ്യേണ്ട രീതി:',
        steps: ['പേശികൾ 5 സെക്കൻഡ് മുറുക്കി പിടിക്കുക, അയക്കുക.', 'ദിവസവും 3 തവണ ചെയ്യുക.']
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'ഹൃദയാരോഗ്യം',
        tag: 'ഹൃദയ സംരക്ഷണം',
        summary: '35 വയസ്സിന് ശേഷം കൊളസ്ട്രോൾ പരിശോധന നടത്തുക.',
        actionTitle: 'നിർദ്ദേശങ്ങൾ:',
        steps: ['സ്ഥിരമായി നടക്കുക.', 'പച്ചക്കറികൾ ധാരാളം കഴിക്കുക.']
      }
    ]
  },
  mr: {
    advancedSectionTitle: 'महिला आरोग्य व क्लिनिकल मार्गदर्शन',
    advancedSectionSub: 'करिअर आणि आरोग्याचा समतोल राखणाऱ्या महिलांसाठी माहिती.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'कीगल व्यायाम (Kegel)',
        tag: 'पेल्विक आरोग्य',
        summary: 'पेल्विक स्नायू बळकट करणारे व्यायाम.',
        actionTitle: 'कसे करावे:',
        steps: ['स्नायू 5 सेकंद आकुंचन करा व सैल सोडा.', 'दररोज 3 वेळा करा.']
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'हृदयाचे आरोग्य',
        tag: 'हृदय सुरक्षा',
        summary: '35 वर्षानंतर नियमित तपासणी आवश्यक.',
        actionTitle: 'काळजी घ्या:',
        steps: ['चालण्याचा व्यायाम करा.', 'तणाव कमी ठेवा.']
      }
    ]
  },
  mwr: {
    advancedSectionTitle: 'महिला स्वास्थ्य री खास बातां',
    advancedSectionSub: 'बाईयां रे स्वास्थ्य सारु चोखी जानकारी।',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'कीगल कसरत (Kegel)',
        tag: 'कमर री कसरत',
        summary: 'मांसपेशियां मजबूत करण री कसरत।',
        actionTitle: 'तरीको:',
        steps: ['5 सेकंड ताईं सांस खींचो अर ढीलो छोड़ो।', 'रोज करो।']
      }
    ]
  },
  fr: {
    advancedSectionTitle: 'Modules Cliniques Avancés pour Femmes',
    advancedSectionSub: 'Guides cliniques fondés sur des données probantes pour la santé féminine durable.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'Renforcement du Périnée & Exercices de Kegel',
        tag: 'Santé Périnéale',
        summary: 'Renforce les muscles soutenant la vessie et l’utérus contre l’incontinence.',
        actionTitle: 'Technique Kegel :',
        steps: ['Contractez les muscles pendant 5 secondes puis relâchez.', 'Faites 3 séries de 10 par jour.']
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'Santé Cardiovasculaire Féminine',
        tag: 'Protection Cardiaque',
        summary: 'Dépistage lipidique annuel recommandé dès 35 ans.',
        actionTitle: 'Conseils :',
        steps: ['150 minutes de marche rapide hebdomadaire.', 'Surveillance de la tension artérielle.']
      }
    ]
  },
  lb: {
    advancedSectionTitle: 'أدلة إكلينيكية متقدمة لصحة المرأة',
    advancedSectionSub: 'معلومات طبية موثوقة لحياة صحية ومتوازنة.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'تمارين كيجل وتقوية عضلات الحوض',
        tag: 'صحة الحوض',
        summary: 'تقوية عضلات الحوض والرحم والمثانة لمنع سلس البول.',
        actionTitle: 'خطوات التمرين:',
        steps: ['شد عضلات الحوض 5 ثواني ثم إرخاؤها.', 'تكرار التمرين 3 مرات يومياً.']
      }
    ]
  },
  ar: {
    advancedSectionTitle: 'أدلة طبية سريرية متقدمة لصحة المرأة',
    advancedSectionSub: 'أدلة مبنية على البراهين الطبية لدعم المرأة في مسارها المهني والصحي والأسري.',
    modules: [
      {
        id: 'kegel',
        icon: '🧘‍♀️',
        title: 'تمارين كيجل وتقوية قاع الحوض (Kegel)',
        tag: 'صحة الحوض والمسالك',
        summary: 'تقوية العضلات الداعمة للمثانة والرحم لمنع سلس البول الإجهادي بعد الولادة.',
        actionTitle: 'خطوات أداء تمارين كيجل:',
        steps: [
          'حددي عضلات قاع الحوض وقومي بقبضها لمدة 5 ثوانٍ ثم إرخائها لمدة 5 ثوانٍ.',
          'تنفسي بسلاسة وتجنبي شد عضلات البطن أو الفخذين.',
          'قومي بأداء 3 مجموعات يومياً لتقوية مستدامة للحوض.'
        ]
      },
      {
        id: 'heart',
        icon: '❤️',
        title: 'حماية القلب والأوعية الدموية للمرأة',
        tag: 'صحة القلب',
        summary: 'تختلف أعراض أمراض القلب لدى النساء. الفحص الدوري للدهون والضغط ضروري بعد سن 35.',
        actionTitle: 'الأعراض غير النمطية والوقاية:',
        steps: [
          'الانتباه للإرهاق المفاجئ وضيق التنفس وآلام الفك أو الظهر.',
          'فحص دهنيات الدم (Lipid Profile) سنوياً.',
          'ممارسة المشي 150 دقيقة أسبوعياً.'
        ]
      }
    ]
  }
};

export default function AdultView({ onNavigate }) {
  const { t, language } = useLanguage();
  const ext = ADULT_EXTENDED_I18N[language] || ADULT_EXTENDED_I18N.en;
  const [openModule, setOpenModule] = useState(null);

  const adultPillars = [
    { title: t('adultPillar1Title'), icon: '🔄', desc: t('adultPillar1Desc') },
    { title: t('adultPillar2Title'), icon: '🧬', desc: t('adultPillar2Desc') },
    { title: t('adultPillar3Title'), icon: '⚡', desc: t('adultPillar3Desc') },
    { title: t('adultPillar4Title'), icon: '🌱', desc: t('adultPillar4Desc') },
    { title: t('adultPillar5Title'), icon: '🎀', desc: t('adultPillar5Desc') },
    { title: t('adultPillar6Title'), icon: '🔬', desc: t('adultPillar6Desc') },
    { title: t('adultPillar7Title'), icon: '🛡️', desc: t('adultPillar7Desc') },
    { title: t('adultPillar8Title'), icon: '🧠', desc: t('adultPillar8Desc') }
  ];

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fff0f5 0%, #fdf2f8 50%, #eff6ff 100%)',
        border: '1px solid var(--pink-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '2.6rem' }}>👩‍💼</span>
          <div>
            <span className="badge badge-pink" style={{ marginBottom: '6px' }}>
              {t('adultHubBadge')}
            </span>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--navy-dark)', margin: '0 0 6px 0' }}>
              {t('adultHubTitle')}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
              {t('adultHubSub')}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBanner customText={t('adultDisclaimer')} />

      {/* Adult Action Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <button
          onClick={() => onNavigate('thyroid-check')}
          className="glass-card"
          style={{ padding: '16px', border: '1px solid var(--pink-300)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left' }}
        >
          <Activity size={22} color="var(--rose-primary)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t('thyroidCheck')}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('symptomEvaluation')}</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('pcos-check')}
          className="glass-card"
          style={{ padding: '16px', border: '1px solid var(--pink-300)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left' }}
        >
          <HeartPulse size={22} color="var(--pink-600)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t('pcosCheck')}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('hormonalQuestionnaire')}</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('pregnancy')}
          className="glass-card"
          style={{ padding: '16px', border: '1px solid var(--pink-300)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left' }}
        >
          <Baby size={22} color="#8b5cf6" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t('pregnancy')}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('trimesterTracking')}</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('health-vault')}
          className="glass-card"
          style={{ padding: '16px', border: '1px solid var(--pink-300)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left' }}
        >
          <FileText size={22} color="#059669" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t('healthVault')}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('digiLockerRecords')}</div>
          </div>
        </button>
      </div>

      {/* NEW: ADVANCED ADULT CLINICAL MODULES SECTION */}
      <div className="glass-card" style={{
        padding: '28px',
        borderRadius: '20px',
        background: 'white',
        border: '1.5px solid #fbcfe8'
      }}>
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles size={20} color="#e11d48" />
            <h2 style={{ fontSize: '1.35rem', color: '#881337', margin: 0, fontWeight: 800 }}>
              {ext.advancedSectionTitle}
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '0.86rem', color: '#9f1239' }}>
            {ext.advancedSectionSub}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {ext.modules.map((m) => {
            const isOpen = openModule === m.id;
            return (
              <div
                key={m.id}
                style={{
                  borderRadius: '16px',
                  border: isOpen ? '1.5px solid #f43f5e' : '1px solid #fce7f3',
                  background: isOpen ? '#fff1f2' : '#ffffff',
                  boxShadow: isOpen ? '0 4px 16px rgba(244, 63, 94, 0.1)' : 'none',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.6rem' }}>{m.icon}</span>
                      <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: '#881337' }}>
                        {m.title}
                      </h3>
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      background: '#fce7f3',
                      color: '#be185d',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      whiteSpace: 'nowrap'
                    }}>
                      {m.tag}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                    {m.summary}
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpenModule(isOpen ? null : m.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#e11d48',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                    }}
                  >
                    <span>{isOpen ? (language === 'ta' ? 'சுருக்கவும்' : 'Hide Clinical Steps') : (language === 'ta' ? 'மருத்துவ வழிகாட்டியைப் பார்க்க' : 'View Action Steps')}</span>
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                </div>

                {isOpen && m.steps && (
                  <div style={{
                    padding: '14px 18px',
                    background: '#ffffff',
                    borderTop: '1px dashed #fbcfe8'
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9f1239', marginBottom: '6px' }}>
                      {m.actionTitle}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '5px', lineHeight: 1.45 }}>
                      {m.steps.map((st, sIdx) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Pillar Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
        gap: '20px'
      }}>
        {adultPillars.map((p, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ fontSize: '2rem' }}>{p.icon}</div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', margin: 0 }}>{p.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
