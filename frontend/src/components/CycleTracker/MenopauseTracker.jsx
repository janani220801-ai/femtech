import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSmsAlert } from '../../context/SmsAlertContext';
import { Flame, Moon, Heart, Shield, Activity, Sparkles, CheckCircle2, AlertTriangle, ChevronRight, Plus, Minus, Info, Smartphone, FileText } from 'lucide-react';
import MenopauseCheck from '../Assessments/MenopauseCheck';

const MENOPAUSE_I18N = {
  en: {
    title: 'Menopause & Perimenopause Transition Tracker',
    sub: 'Empowering women through every stage of hormonal evolution with clinical insights, symptom relief, and bone health tracking.',
    stageSelectorTitle: 'Select Your Current Transition Stage:',
    stages: {
      pre: {
        name: 'Premenopause',
        range: 'Ages 25–40',
        desc: 'Regular menstrual cycles and ovulatory function. Hormone levels fluctuate naturally with monthly cycles.'
      },
      peri: {
        name: 'Perimenopause',
        range: 'Ages 40–50',
        desc: 'Hormonal fluctuation stage. Cycles become shorter or longer, flow varies, and initial hot flashes or mood changes may begin.'
      },
      meno: {
        name: 'Menopause',
        range: 'Ages 45–55',
        desc: 'Clinically confirmed after 12 consecutive months without a menstrual period. Ovaries cease egg release.'
      },
      post: {
        name: 'Postmenopause',
        range: 'Ages 50+',
        desc: 'The years following menopause. Focus transitions to cardiovascular protection, bone density preservation, and vitality.'
      }
    },
    hotFlashesTitle: 'Daily Hot Flashes Counter',
    hotFlashesSub: 'Track episode frequency and intensity to share with your gynecologist.',
    counterLabel: 'Flashes Today:',
    severityLabel: 'Episode Intensity:',
    severityOptions: {
      mild: 'Mild (Gentle warmth, no sweat)',
      moderate: 'Moderate (Flushing, light sweating)',
      severe: 'Severe (Drenching sweat, racing heart)'
    },
    nightSweatsTitle: 'Night Sweats & Sleep Quality',
    nightSweatsLabel: 'Night sweat awakenings last night:',
    sleepQualityLabel: 'Sleep Restfulness:',
    sleepOptions: {
      good: 'Restful Sleep (7+ hours)',
      broken: 'Interrupted (Woke up 2–3 times)',
      poor: 'Severe Insomnia / Sleepless'
    },
    symptomsTitle: 'Daily Menopause Symptom Checklist',
    symptoms: [
      { id: 'flash', label: 'Hot Flashes (Heat waves)' },
      { id: 'sweats', label: 'Night Sweats' },
      { id: 'insomnia', label: 'Sleep Disturbance / Insomnia' },
      { id: 'fog', label: 'Brain Fog / Memory Blanks' },
      { id: 'mood', label: 'Mood Swings / Irritability' },
      { id: 'joint', label: 'Joint & Muscle Stiffness' },
      { id: 'dryness', label: 'Vaginal Dryness / Discomfort' },
      { id: 'heart', label: 'Heart Palpitations (Fluttering)' },
      { id: 'fatigue', label: 'Deep Physical Fatigue' },
      { id: 'weight', label: 'Metabolism / Weight Shifts' }
    ],
    boneTitle: 'Osteoporosis & Bone Density Shield',
    calciumTarget: 'Daily Calcium Target: 1200 mg',
    vitDTarget: 'Vitamin D3 Target: 800–1000 IU',
    exercisePrompt: 'Weight-bearing exercises (brisk walking, resistance bands, yoga) stimulate bone remineralization.',
    calciumLogged: 'Calcium intake fulfilled today',
    hrtTitle: 'HRT & Natural Phytoestrogen Support',
    hrtGuidance: 'Phytoestrogens found in flaxseeds, non-GMO soy, lentils, and chickpeas act as gentle, selective estrogen receptor modulators. Discuss Hormone Replacement Therapy (HRT) with your OB/GYN.',
    redFlagTitle: 'Clinical Red Flag Alert:',
    redFlagText: 'Any vaginal bleeding or spotting occurring 12 months AFTER menopause is abnormal and warrants immediate clinical evaluation with transvaginal ultrasound.',
    saveLogBtn: 'Save Daily Menopause Log',
    savedMsg: '✓ Menopause log recorded successfully!',
    smsSummaryBtn: '📲 Send Status to Registered Phone',
    smsSentMsg: '✓ Menopause daily wellness dispatched to phone!'
  },
  ta: {
    title: 'மெனோபாஸ் & பெரிமெனோபாஸ் மாற்ற சுழற்சி டிராக்கர்',
    sub: 'பெண்களின் ஹார்மோன் மாற்ற நிலைகள், அறிகுறிகள் கட்டுப்பாடு, எலும்பு நலன் மற்றும் மருத்துவ வழிகாட்டுதல்களுக்கான பிரத்யேக மையம்.',
    stageSelectorTitle: 'உங்கள் தற்போதைய மாற்ற நிலையைத் தேர்வு செய்க:',
    stages: {
      pre: {
        name: 'ப்ரீ-மெனோபாஸ் (Premenopause)',
        range: 'வயது 25–40',
        desc: 'வழக்கமான மாதவிடாய் சுழற்சி மற்றும் சீரான கருமுட்டை வெளிப்பாடு. மாதந்தோறும் ஹார்மோன்கள் சீராக இயங்கும் நிலை.'
      },
      peri: {
        name: 'பெரி-மெனோபாஸ் (Perimenopause)',
        range: 'வயது 40–50',
        desc: 'ஹார்மோன் ஏற்றத்தாழ்வு தொடங்கும் நிலை. மாதவிடாய் நாட்கள் தள்ளிப்போகலாம், உஷ்ண அலைகள் மற்றும் மனநிலை மாற்றங்கள் ஆரம்பிக்கலாம்.'
      },
      meno: {
        name: 'மெனோபாஸ் (Menopause)',
        range: 'வயது 45–55',
        desc: 'தொடர்ந்து 12 மாதங்கள் மாதவிடாய் இரத்தப்போக்கு முற்றிலுமாக நிற்கும்போது உறுதிசெய்யப்படும் இயற்கையான நிலை.'
      },
      post: {
        name: 'போஸ்ட்-மெனோபாஸ் (Postmenopause)',
        range: 'வயது 50+',
        desc: 'மெனோபாஸுக்கு பிந்தைய ஆண்டுகள். எலும்பு அடர்த்தி, இதய ஆரோக்கியம் மற்றும் ஊட்டச்சத்து பராமரிப்பில் கூடுதல் கவனம் தேவை.'
      }
    },
    hotFlashesTitle: 'தினசரி உஷ்ண அலைகள் கணக்கீடு (Hot Flashes)',
    hotFlashesSub: 'திடீரென உடலில் ஏற்படும் அதீத வெப்பம் மற்றும் வியர்வையை பதிவு செய்து மருத்துவரிடம் ஆலோசிக்கவும்.',
    counterLabel: 'இன்றைய உஷ்ண அலைகள் எண்ணிக்கை:',
    severityLabel: 'உஷ்ண அலையின் தீவிரம்:',
    severityOptions: {
      mild: 'லேசான உஷ்ணம் (வியர்வை இல்லை)',
      moderate: 'நடுத்தர உஷ்ணம் (முகத்தில் வியர்வை)',
      severe: 'தீவிர உஷ்ணம் (உடல் நனையும் வியர்வை & படபடப்பு)'
    },
    nightSweatsTitle: 'இரவு வியர்வை & தூக்கமின்மை கண்காணிப்பு',
    nightSweatsLabel: 'நேற்று இரவில் வியர்த்து விழித்த எண்ணிக்கை:',
    sleepQualityLabel: 'இரவு தூக்கத்தின் தரம்:',
    sleepOptions: {
      good: 'நிம்மதியான தூக்கம் (7+ மணிநேரம்)',
      broken: 'இடைப்பட்ட தூக்கம் (2-3 முறை விழிப்பு)',
      poor: 'கடுமையான தூக்கமின்மை (Insomnia)'
    },
    symptomsTitle: 'தினசரி மெனோபாஸ் அறிகுறிகள் சரிபார்ப்பு',
    symptoms: [
      { id: 'flash', label: 'உஷ்ண அலைகள் (Hot Flashes)' },
      { id: 'sweats', label: 'இரவு வியர்வை (Night Sweats)' },
      { id: 'insomnia', label: 'தூக்கமின்மை (Insomnia)' },
      { id: 'fog', label: 'சிந்தனை மந்தம் / மறதி (Brain Fog)' },
      { id: 'mood', label: 'மனநிலை மாற்றங்கள் / பதட்டம்' },
      { id: 'joint', label: 'மூட்டு மற்றும் தசை இறுக்கம்' },
      { id: 'dryness', label: 'யோனி வறட்சி மற்றும் எரிச்சல்' },
      { id: 'heart', label: 'திடீர் இதய படபடப்பு (Palpitations)' },
      { id: 'fatigue', label: 'கடுமையான உடல் சோர்வு' },
      { id: 'weight', label: 'எடை & வளர்சிதை மாற்றங்கள்' }
    ],
    boneTitle: 'எலும்பு நலன் & ஆஸ்டியோபோரோசிஸ் தடுப்பு கவசம்',
    calciumTarget: 'தினசரி கால்சியம் இலக்கு: 1200 மிகி',
    vitDTarget: 'வைட்டமின் D3 இலக்கு: 800–1000 IU',
    exercisePrompt: 'நடைப்பயிற்சி மற்றும் லேசான எடை பயிற்சிகள் எலும்புகளை பலப்படுத்தி முறிவு ஏற்படாமல் காக்கும்.',
    calciumLogged: 'இன்றைய கால்சியம் உணவு உட்கொள்ளப்பட்டது',
    hrtTitle: 'HRT & இயற்கை பைட்டோ ஈஸ்ட்ரோஜன் ஆதரவு',
    hrtGuidance: 'ஆளி விதை (Flaxseeds), சோயா, கொண்டைக்கடலை மற்றும் பருப்பு வகைகளில் உள்ள இயற்கை பைட்டோ ஈஸ்ட்ரோஜன் உஷ்ண அலைகளைத் தணிக்கும். தேவைப்பட்டால் HRT சிகிச்சை குறித்து மருத்துவரிடம் கேட்கவும்.',
    redFlagTitle: 'முக்கியமான மருத்துவ எச்சரிக்கை:',
    redFlagText: 'மெனோபாஸ் முடிந்து 12 மாதங்களுக்குப் பிறகு ஏதேனும் சிறிய இரத்தப்போக்கு அல்லது புள்ளி ஏற்பட்டால், உடனடியாக மகளிர் மருத்துவரை அணுகி அல்ட்ராசவுண்ட் பரிசோதனை செய்ய வேண்டும்.',
    saveLogBtn: 'மெனோபாஸ் பதிவைச் சேமிக்கவும்',
    savedMsg: '✓ மெனோபாஸ் விபரம் வெற்றிகரமாக சேமிக்கப்பட்டது!',
    smsSummaryBtn: '📲 விபரத்தை போனுக்கு SMS அனுப்ப',
    smsSentMsg: '✓ மெனோபாஸ் நலம் உங்கள் போனுக்கு SMS அனுப்பப்பட்டது!'
  },
  hi: {
    title: 'मेनोपॉज व पेरीमेनोपॉज संक्रमण ट्रैकर',
    sub: 'हार्मोनल बदलावों के दौरान महिलाओं के स्वास्थ्य, हड्डियों की मजबूती व लक्षणों की निगरानी।',
    stageSelectorTitle: 'अपनी वर्तमान अवस्था चुनें:',
    stages: {
      pre: { name: 'प्री-मेनोपॉज', range: 'उम्र 25–40', desc: 'नियमित मासिक धर्म व सामान्य हार्मोन स्तर।' },
      peri: { name: 'पेरी-मेनोपॉज', range: 'उम्र 40–50', desc: 'हार्मोनल बदलावों की शुरुआत। अनियमित माहवारी व हॉट फ्लैश।' },
      meno: { name: 'मेनोपॉज', range: 'उम्र 45–55', desc: 'लगातार 12 महीने माहवारी न आने पर प्रमाणित।' },
      post: { name: 'पोस्ट-मेनोपॉज', range: 'उम्र 50+', desc: 'मेनोपॉज के बाद के वर्ष। हड्डियों व दिल के स्वास्थ्य पर विशेष ध्यान।' }
    },
    hotFlashesTitle: 'दैनिक हॉट फ्लैश (उष्णता) काउंटर',
    hotFlashesSub: 'अचानक महसूस होने वाली गर्मी और पसीने की आवृत्ति दर्ज करें।',
    counterLabel: 'आज हॉट फ्लैश की संख्या:',
    severityLabel: 'तीव्रता:',
    severityOptions: {
      mild: 'हल्की गर्माहट',
      moderate: 'मध्यम (पसीना आना)',
      severe: 'तीव्र (अत्यधिक पसीना व घबराहट)'
    },
    nightSweatsTitle: 'रात का पसीना व नींद',
    nightSweatsLabel: 'रात में पसीने से जागने की संख्या:',
    sleepQualityLabel: 'नींद की गुणवत्ता:',
    sleepOptions: {
      good: 'गहरी नींद (7+ घंटे)',
      broken: 'टूटी हुई नींद (2-3 बार)',
      poor: 'अनिद्रा (Insomnia)'
    },
    symptomsTitle: 'दैनिक लक्षण चेकलिस्ट',
    symptoms: [
      { id: 'flash', label: 'हॉट फ्लैश (Hot Flashes)' },
      { id: 'sweats', label: 'रात में पसीना (Night Sweats)' },
      { id: 'insomnia', label: 'अनिद्रा / नींद न आना' },
      { id: 'fog', label: 'स्मृति मंदता (Brain Fog)' },
      { id: 'mood', label: 'मूड में बदलाव / चिड़चिड़ापन' },
      { id: 'joint', label: 'जोड़ों व मांसपेशियों में दर्द' },
      { id: 'dryness', label: 'योनि का सूखापन' },
      { id: 'heart', label: 'दिल की धड़कन तेज होना' },
      { id: 'fatigue', label: 'अत्यधिक थकान' },
      { id: 'weight', label: 'वजन में बदलाव' }
    ],
    boneTitle: 'हड्डी स्वास्थ्य व ऑस्टियोपोरोसिस सुरक्षा',
    calciumTarget: 'दैनिक कैल्शियम लक्ष्य: 1200 mg',
    vitDTarget: 'विटामिन D3: 800–1000 IU',
    exercisePrompt: 'नियमित चलना और योग हड्डियों को कमजोर होने से बचाते हैं।',
    calciumLogged: 'आज कैल्शियम युक्त आहार लिया गया',
    hrtTitle: 'एचआरटी व प्राकृतिक आहार',
    hrtGuidance: 'अलसी, सोयाबीन और दालों में प्राकृतिक फाइटोएस्ट्रोजन होता है जो लक्षणों को कम करता है।',
    redFlagTitle: 'विशेष चिकित्सीय चेतावनी:',
    redFlagText: 'मेनोपॉज के 12 महीने बाद कोई भी रक्तस्राव होने पर तुरंत डॉक्टर से अल्ट्रासाउंड जांच कराएं।',
    saveLogBtn: 'मेनोपॉज लॉग सहेजें',
    savedMsg: '✓ रिकॉर्ड सफलतापूर्वक सहेजा गया!',
    smsSummaryBtn: '📲 फोन पर SMS भेजें',
    smsSentMsg: '✓ विवरण फोन पर SMS द्वारा भेजा गया!'
  },
  te: {
    title: 'మెనోపాజ్ & పెరిమెనోపాజ్ ట్రాకర్',
    sub: 'మహిళల హార్మోన్ల మార్పుల సమయంలో సంపూర్ణ ఆరోగ్య సంరక్షణ.',
    stageSelectorTitle: 'మీ ప్రస్తుత దశను ఎంచుకోండి:',
    stages: {
      pre: { name: 'ప్రీ-మెనోపాజ్', range: 'వయస్సు 25–40', desc: 'సాధారణ రుతుచక్రం మరియు హార్మోన్ల సమతుల్యత.' },
      peri: { name: 'పెరి-మెనోపాజ్', range: 'వయస్సు 40–50', desc: 'హార్మోన్ల హెచ్చుతగ్గులు ప్రారంభమయ్యే దశ.' },
      meno: { name: 'మెనోపాజ్', range: 'వయస్సు 45–55', desc: 'వరుసగా 12 నెలలు పీరియడ్స్ రాని సహజ స్థితి.' },
      post: { name: 'పోస్ట్-మెనోపాజ్', range: 'వయస్సు 50+', desc: 'ఎముకల ఆరోగ్యంపై ప్రత్యేక శ్రద్ధ వహించవలసిన సమయం.' }
    },
    hotFlashesTitle: 'హాట్ ఫ్లాషెస్ కౌంటర్',
    hotFlashesSub: 'ఒంట్లో వేడి మరియు చెమటల వివరాలు నమోదు చేయండి.',
    counterLabel: 'ఈరోజు హాట్ ఫ్లాషెస్ సంఖ్య:',
    severityLabel: 'తీవ్రత:',
    severityOptions: { mild: 'తక్కువ వేడి', moderate: 'మధ్యస్థం (చెమట)', severe: 'తీవ్రం (దడ & చెమటలు)' },
    nightSweatsTitle: 'రాత్రి చెమటలు & నిద్ర',
    nightSweatsLabel: 'రాత్రి మేల్కొన్న సార్లు:',
    sleepQualityLabel: 'నిద్ర నాణ్యత:',
    sleepOptions: { good: 'మంచి నిద్ర (7+ గంటలు)', broken: 'అడపాదడపా నిద్ర', poor: 'నిద్రలేమి' },
    symptomsTitle: 'లక్షణాల చెక్‌లిస్ట్',
    symptoms: [
      { id: 'flash', label: 'హాట్ ఫ్లాషెస్ (Hot Flashes)' },
      { id: 'sweats', label: 'రాత్రి చెమటలు' },
      { id: 'insomnia', label: 'నిద్రలేమి' },
      { id: 'fog', label: 'మతిమరుపు' },
      { id: 'mood', label: 'చిరాకు / మానసిక మార్పులు' },
      { id: 'joint', label: 'కీళ్ళ నొప్పులు' },
      { id: 'dryness', label: 'యోని పొడిబారడం' },
      { id: 'heart', label: 'గుండె దడ' },
      { id: 'fatigue', label: 'విపరీతమైన అలసట' },
      { id: 'weight', label: 'బరువు మార్పులు' }
    ],
    boneTitle: 'ఎముకల బలం & రక్షణ',
    calciumTarget: 'రోజువారీ కాల్షియం: 1200 mg',
    vitDTarget: 'విటమిన్ D3: 800–1000 IU',
    exercisePrompt: 'రోజూ నడవడం ఎముకలకు చాలా మంచిది.',
    calciumLogged: 'కాల్షియం ఆహారం తీసుకున్నాను',
    hrtTitle: 'సహజ ఆహార సలహాలు',
    hrtGuidance: 'అవిసె గింజలు, సోయా వంటివి వేడిని తగ్గిస్తాయి.',
    redFlagTitle: 'ముఖ్యమైన హెచ్చరిక:',
    redFlagText: 'మెనోపాజ్ తర్వాత రక్తం కనిపిస్తే వెంటనే గైనకాలజిస్ట్‌ను కలవండి.',
    saveLogBtn: 'వివరాలు సేవ్ చేయండి',
    savedMsg: '✓ సేవ్ చేయబడింది!',
    smsSummaryBtn: '📲 ఫోన్‌కు SMS పంపండి',
    smsSentMsg: '✓ SMS పంపబడింది!'
  },
  ml: {
    title: 'മെനോപോസ് & പെരിമെനോപോസ് ട്രാക്കർ',
    sub: 'സ്ത്രീകളുടെ ഹോർമോൺ മാറ്റ ഘട്ടങ്ങളിലെ ആരോഗ്യ പരിചരണം.',
    stageSelectorTitle: 'നിങ്ങളുടെ ഘട്ടം തിരഞ്ഞെടുക്കുക:',
    stages: {
      pre: { name: 'പ്രീ-മെനോപോസ്', range: 'പ്രായം 25–40', desc: 'സാധാരണ ആർത്തവചക്രം.' },
      peri: { name: 'പെരി-മെനോപോസ്', range: 'പ്രായം 40–50', desc: 'ഹോർമോൺ വ്യതിയാനങ്ങൾ തുടങ്ങുന്ന ഘട്ടം.' },
      meno: { name: 'മെനോപോസ്', range: 'പ്രായം 45–55', desc: 'തുടർച്ചയായി 12 മാസം ആർത്തവം വരാതിരിക്കുന്ന അവസ്ഥ.' },
      post: { name: 'പോസ്റ്റ്-മെനോപോസ്', range: 'പ്രായം 50+', desc: 'അസ്ഥികളുടെ ആരോഗ്യത്തിന് പ്രത്യേക ശ്രദ്ധ നൽകുക.' }
    },
    hotFlashesTitle: 'ഹോട്ട് ഫ്ലാഷസ് കൗണ്ടർ',
    hotFlashesSub: 'ശരീരത്തിൽ ഉണ്ടാകുന്ന അമിത ചൂട് രേഖപ്പെടുത്തുക.',
    counterLabel: 'ഇന്നത്തെ തവണകൾ:',
    severityLabel: 'തീവ്രത:',
    severityOptions: { mild: 'നേരിയ ചൂട്', moderate: 'മിതമായ വിയർപ്പ്', severe: 'അമിത വിയർപ്പും നെഞ്ചിടിപ്പും' },
    nightSweatsTitle: 'രാത്രി വിയർപ്പും ഉറക്കവും',
    nightSweatsLabel: 'രാത്രി ഉണർന്ന തവണകൾ:',
    sleepQualityLabel: 'ഉറക്കത്തിന്റെ ഗുണനിലവാരം:',
    sleepOptions: { good: 'നല്ല ഉറക്കം (7+ മണിക്കൂർ)', broken: 'ഇടവിട്ടുള്ള ഉറക്കം', poor: 'ഉറക്കമില്ലായ്മ' },
    symptomsTitle: 'ലക്ഷണങ്ങൾ',
    symptoms: [
      { id: 'flash', label: 'ഹോട്ട് ഫ്ലാഷസ്' },
      { id: 'sweats', label: 'രാത്രി വിയർപ്പ്' },
      { id: 'insomnia', label: 'ഉറക്കമില്ലായ്മ' },
      { id: 'fog', label: 'മറവി' },
      { id: 'mood', label: 'ദേഷ്യവും മൂഡ് മാറ്റങ്ങളും' },
      { id: 'joint', label: 'സന്ധിവേദന' },
      { id: 'dryness', label: 'യോനിയിലെ വരൾച്ച' },
      { id: 'heart', label: 'നെഞ്ചിടിപ്പ്' },
      { id: 'fatigue', label: 'അമിത ക്ഷീണം' },
      { id: 'weight', label: 'ഭാര വ്യത്യാസം' }
    ],
    boneTitle: 'അസ്ഥി സംരക്ഷണം',
    calciumTarget: 'കാൽസ്യം ലക്ഷ്യം: 1200 mg',
    vitDTarget: 'വിറ്റാമിൻ D3: 800–1000 IU',
    exercisePrompt: 'നടത്തം എല്ലുകളെ ബലപ്പെടുത്തും.',
    calciumLogged: 'കാൽസ്യം ഭക്ഷണം കഴിച്ചു',
    hrtTitle: 'ഭക്ഷണ ക്രമം',
    hrtGuidance: 'ചണവിത്ത്, സോയ എന്നിവ നല്ലതാണ്.',
    redFlagTitle: 'പ്രത്യേക ജാഗ്രത:',
    redFlagText: 'മെനോപോസിന് ശേഷം രക്തസ്രാവം ഉണ്ടായാൽ ഉടൻ ഡോക്ടറെ കാണുക.',
    saveLogBtn: 'വിവരങ്ങൾ സേവ് ചെയ്യുക',
    savedMsg: '✓ വിവരങ്ങൾ രേഖപ്പെടുത്തി!',
    smsSummaryBtn: '📲 ഫോണിലേക്ക് SMS അയക്കുക',
    smsSentMsg: '✓ SMS അയച്ചു!'
  },
  mr: {
    title: 'मेनोपॉज व पेरीमेनोपॉज ट्रॅकर',
    sub: 'हार्मोनल बदलांच्या काळात महिलांचे आरोग्य व काळजी.',
    stageSelectorTitle: 'तुमचा टप्पा निवडा:',
    stages: {
      pre: { name: 'प्री-मेनोपॉज', range: 'वय 25–40', desc: 'नियमित मासिक पाळी.' },
      peri: { name: 'पेरी-मेनोपॉज', range: 'वय 40–50', desc: 'पाळी अनियमित होण्याची सुरुवात.' },
      meno: { name: 'मेनोपॉज', range: 'वय 45–55', desc: '12 महिने सलग पाळी न येणे.' },
      post: { name: 'पोस्ट-मेनोपॉज', range: 'वय 50+', desc: 'हाडांच्या आरोग्याची काळजी.' }
    },
    hotFlashesTitle: 'हॉट फ्लॅश काउंटर',
    hotFlashesSub: 'अचानक होणारी उष्णता नोंदवा.',
    counterLabel: 'आज हॉट फ्लॅश संख्या:',
    severityLabel: 'तीव्रता:',
    severityOptions: { mild: 'हलकी उष्णता', moderate: 'मध्यम घाम', severe: 'तीव्र घाम व धडधड' },
    nightSweatsTitle: 'रात्रीचा घाम व झोप',
    nightSweatsLabel: 'रात्री जाग येण्याची संख्या:',
    sleepQualityLabel: 'झोपेची गुणवत्ता:',
    sleepOptions: { good: 'गाढ झोप (7+ तास)', broken: 'अधूनमधून मोडलेली', poor: 'अनिद्रा' },
    symptomsTitle: 'लक्षणे यादी',
    symptoms: [
      { id: 'flash', label: 'हॉट फ्लॅश' },
      { id: 'sweats', label: 'रात्री घाम' },
      { id: 'insomnia', label: 'झोप न येणे' },
      { id: 'fog', label: 'स्मरणशक्ती मंदावणे' },
      { id: 'mood', label: 'चिडचिड' },
      { id: 'joint', label: 'सांधेदुखी' },
      { id: 'dryness', label: 'योनी कोरडेपणा' },
      { id: 'heart', label: 'धडधड' },
      { id: 'fatigue', label: 'थकवा' },
      { id: 'weight', label: 'वजन बदल' }
    ],
    boneTitle: 'हाडांचे आरोग्य',
    calciumTarget: 'कॅल्शियम: 1200 mg',
    vitDTarget: 'व्हिटॅमिन D3: 800–1000 IU',
    exercisePrompt: 'चालणे हाडांसाठी उत्तम.',
    calciumLogged: 'कॅल्शियम आहार घेतला',
    hrtTitle: 'आहार मार्गदर्शन',
    hrtGuidance: 'जवस व सोयाबीन फायदेशीर आहेत.',
    redFlagTitle: 'महत्त्वाची सूचना:',
    redFlagText: 'मेनोपॉजनंतर रक्तस्राव झाल्यास तात्काळ डॉक्टरांना दाखवा.',
    saveLogBtn: 'नोंद जतन करा',
    savedMsg: '✓ माहिती जतन केली!',
    smsSummaryBtn: '📲 फोनवर SMS पाठवा',
    smsSentMsg: '✓ SMS पाठवला!'
  },
  mwr: {
    title: 'मेनोपॉज अर पेरीमेनोपॉज ट्रैकर',
    sub: 'उमर री अवस्था मां बाईयां रो स्वास्थ्य अर देखभाल।',
    stageSelectorTitle: 'आपरी अवस्था चुणो:',
    stages: {
      pre: { name: 'प्री-मेनोपॉज', range: 'उमर 25–40', desc: 'साधारण माहवारी।' },
      peri: { name: 'पेरी-मेनोपॉज', range: 'उमर 40–50', desc: 'माहवारी आगे-पाछे होणो अर गरमी लागणो।' },
      meno: { name: 'मेनोपॉज', range: 'उमर 45–55', desc: '12 महीना ताईं माहवारी बंद होणो।' },
      post: { name: 'पोस्ट-मेनोपॉज', range: 'उमर 50+', desc: 'हड्डियां अर दिल री संभाल।' }
    },
    hotFlashesTitle: 'गरमी (हॉट फ्लैश) रो हिसाब',
    hotFlashesSub: 'अचानक गरमी लागण रो हिसाब लिखो।',
    counterLabel: 'आज गरमी लागी (संख्या):',
    severityLabel: 'तीव्रता:',
    severityOptions: { mild: 'थोड़ी गरमी', moderate: 'पसीनो आयो', severe: 'घणो पसीनो अर घबराहट' },
    nightSweatsTitle: 'रात रो पसीनो अर नींद',
    nightSweatsLabel: 'रात मां जाग खुली:',
    sleepQualityLabel: 'नींद:',
    sleepOptions: { good: 'चोखी नींद', broken: 'टूटी-फूटी', poor: 'नींद नी आई' },
    symptomsTitle: 'लक्षण',
    symptoms: [
      { id: 'flash', label: 'गरमी लागणी' },
      { id: 'sweats', label: 'रात रो पसीनो' },
      { id: 'insomnia', label: 'नींद नी आवणी' },
      { id: 'fog', label: 'भूलणो' },
      { id: 'mood', label: 'चिड़चिड़ोपन' },
      { id: 'joint', label: 'जोड़ां रो दर्द' },
      { id: 'dryness', label: 'सूखोपन' },
      { id: 'heart', label: 'धड़कन तेज' },
      { id: 'fatigue', label: 'थकावट' },
      { id: 'weight', label: 'वजन बदल्यो' }
    ],
    boneTitle: 'हड्डियां रो बचाव',
    calciumTarget: 'कैल्शियम: 1200 mg',
    vitDTarget: 'विटामिन D3: 800–1000 IU',
    exercisePrompt: 'घूमणो घणो चोखो है।',
    calciumLogged: 'कैल्शियम खाधो',
    hrtTitle: 'आहार सलाह',
    hrtGuidance: 'अलसी अर सोया खावो।',
    redFlagTitle: 'चेतावनी:',
    redFlagText: 'मेनोपॉज रे बाद खून दिखे तो तुरंत डॉक्टर ने दिखाओ।',
    saveLogBtn: 'रिकॉर्ड सहेज्यो',
    savedMsg: '✓ दर्ज हो ग्यो!',
    smsSummaryBtn: '📲 फोन पर SMS भेजो',
    smsSentMsg: '✓ SMS भेज दियो!'
  },
  fr: {
    title: 'Suivi de la Ménopause & Périménopause',
    sub: 'Accompagnement clinique, soulagement des bouffées de chaleur et préservation de la santé osseuse.',
    stageSelectorTitle: 'Sélectionnez votre étape actuelle :',
    stages: {
      pre: { name: 'Préménopause', range: '25–40 ans', desc: 'Cycles réguliers et fonction ovulatoire normale.' },
      peri: { name: 'Périménopause', range: '40–50 ans', desc: 'Fluctuations hormonales, cycles irréguliers et début des bouffées de chaleur.' },
      meno: { name: 'Ménopause', range: '45–55 ans', desc: 'Confirmée après 12 mois consécutifs sans règles.' },
      post: { name: 'Postménopause', range: '50+ ans', desc: 'Années suivantes, priorité à la densité osseuse et cardiovasculaire.' }
    },
    hotFlashesTitle: 'Compteur de bouffées de chaleur',
    hotFlashesSub: 'Suivez la fréquence et l’intensité quotidienne.',
    counterLabel: 'Épisodes aujourd’hui :',
    severityLabel: 'Intensité :',
    severityOptions: { mild: 'Légère (chaleur)', moderate: 'Modérée (sueur)', severe: 'Sévère (sueurs abondantes, palpitations)' },
    nightSweatsTitle: 'Sueurs nocturnes et sommeil',
    nightSweatsLabel: 'Réveils nocturnes liés aux sueurs :',
    sleepQualityLabel: 'Qualité du sommeil :',
    sleepOptions: { good: 'Sommeil réparateur (7h+)', broken: 'Sommeil haché', poor: 'Insomnie sévère' },
    symptomsTitle: 'Liste des symptômes',
    symptoms: [
      { id: 'flash', label: 'Bouffées de chaleur' },
      { id: 'sweats', label: 'Sueurs nocturnes' },
      { id: 'insomnia', label: 'Insomnie' },
      { id: 'fog', label: 'Brouillard cérébral' },
      { id: 'mood', label: 'Sautes d’humeur' },
      { id: 'joint', label: 'Raideurs articulaires' },
      { id: 'dryness', label: 'Sécheresse intime' },
      { id: 'heart', label: 'Palpitations' },
      { id: 'fatigue', label: 'Fatigue intense' },
      { id: 'weight', label: 'Changements métaboliques' }
    ],
    boneTitle: 'Protection contre l’ostéoporose',
    calciumTarget: 'Calcium cible : 1200 mg/jour',
    vitDTarget: 'Vitamine D3 : 800–1000 UI',
    exercisePrompt: 'La marche rapide et le renforcement musculaire stimulent la reminéralisation osseuse.',
    calciumLogged: 'Apport en calcium respecté aujourd’hui',
    hrtTitle: 'THM & Phytoestrogènes',
    hrtGuidance: 'Graines de lin et soja apportent des phytoestrogènes apaisants.',
    redFlagTitle: 'Alerte médicale importante :',
    redFlagText: 'Tout saignement survenant 12 mois après la ménopause exige une consultation gynécologique immédiate.',
    saveLogBtn: 'Enregistrer le journal',
    savedMsg: '✓ Journal enregistré avec succès !',
    smsSummaryBtn: '📲 Envoyer sur mon téléphone par SMS',
    smsSentMsg: '✓ SMS envoyé à votre téléphone !'
  },
  lb: {
    title: 'متابع مرحلة سن الأمل وانقطاع الطمث (Menopause)',
    sub: 'متابعة شاملة لتغيرات الهرمونات، الهبات الساخنة وصحة العظام.',
    stageSelectorTitle: 'اختاري مرحلتك الحالية:',
    stages: {
      pre: { name: 'ما قبل سن الأمل', range: '25–40 سنة', desc: 'دورة منتظمة وتبويض طبيعي.' },
      peri: { name: 'مرحلة الاضطراب (Perimenopause)', range: '40–50 سنة', desc: 'تقلبات هرمونية، عدم انتظام بالدورة وبداية الهبات الساخنة.' },
      meno: { name: 'انقطاع الطمث (Menopause)', range: '45–55 سنة', desc: 'توقف الدورة تماماً لمدة 12 شهر متواصل.' },
      post: { name: 'ما بعد انقطاع الطمث', range: '50+ سنة', desc: 'التركيز على صحة العظام والقلب.' }
    },
    hotFlashesTitle: 'عداد الهبات الساخنة (Hot Flashes)',
    hotFlashesSub: 'سجلي عدد مرات الهبات الساخنة وشدتها.',
    counterLabel: 'عدد الهبات اليوم:',
    severityLabel: 'الشدة:',
    severityOptions: { mild: 'خفيفة (حرارة بسيطة)', moderate: 'متوسطة (عرق خفيف)', severe: 'قوية (عرق شديد ودقات قلب)' },
    nightSweatsTitle: 'التعرق الليلي والنوم',
    nightSweatsLabel: 'مرات الاستيقاظ بسبب العرق:',
    sleepQualityLabel: 'جودة النوم:',
    sleepOptions: { good: 'نوم مريح (7+ ساعات)', broken: 'نوم متقطع', poor: 'أرق شديد' },
    symptomsTitle: 'قائمة الأعراض اليومية',
    symptoms: [
      { id: 'flash', label: 'هبات ساخنة' },
      { id: 'sweats', label: 'تعرق ليلي' },
      { id: 'insomnia', label: 'أرق' },
      { id: 'fog', label: 'تشتت بالتركيز' },
      { id: 'mood', label: 'تقلب بالمزاج' },
      { id: 'joint', label: 'وجع مفاصل' },
      { id: 'dryness', label: 'جفاف مهبلي' },
      { id: 'heart', label: 'دقات قلب سريعة' },
      { id: 'fatigue', label: 'تعب شديد' },
      { id: 'weight', label: 'تغير بالوزن' }
    ],
    boneTitle: 'صحة العظام والوقاية من الهشاشة',
    calciumTarget: 'الكالسيوم اليومي: 1200 ملغ',
    vitDTarget: 'فيتامين D3: 800–1000 وحدة',
    exercisePrompt: 'المشي اليومي بحمي العظام من الهشاشة.',
    calciumLogged: 'أخدت وجبة غنية بالكالسيوم',
    hrtTitle: 'أطعمة غنية بالإستروجين النباتي',
    hrtGuidance: 'بذور الكتان والصويا بتخفف الهبات الساخنة.',
    redFlagTitle: 'تنبيه طبي ضروري:',
    redFlagText: 'أي نزيف بعد مرور سنة على انقطاع الدورة يستدعي زيارة الطبيب فوراً.',
    saveLogBtn: 'حفظ السجل اليومي',
    savedMsg: '✓ تم الحفظ بنجاح!',
    smsSummaryBtn: '📲 إرسال SMS للرقم المسجل',
    smsSentMsg: '✓ تم إرسال التقرير عبر SMS!'
  },
  ar: {
    title: 'متابع مرحلة سن الأمل وانقطاع الطمث (Menopause)',
    sub: 'رعاية سريرية ودعم شامل لصحة المرأة، ضبط الهبات الساخنة وحماية كثافة العظام.',
    stageSelectorTitle: 'حددي مرحلتكِ الحالية:',
    stages: {
      pre: { name: 'ما قبل انقطاع الطمث', range: '25–40 سنة', desc: 'دورة شهرية منتظمة وإباضة طبيعية.' },
      peri: { name: 'مرحلة التحول (Perimenopause)', range: '40–50 سنة', desc: 'تقلبات هرمونية، عدم انتظام الدورة وبداية الهبات الساخنة.' },
      meno: { name: 'انقطاع الطمث (Menopause)', range: '45–55 سنة', desc: 'انقطاع الطمث المؤكد بعد مرور 12 شهراً متواصلاً.' },
      post: { name: 'ما بعد انقطاع الطمث', range: '50+ سنة', desc: 'سنوات ما بعد الطمث، والتركيز على العظام والقلب.' }
    },
    hotFlashesTitle: 'عداد الهبات الساخنة اليومية (Hot Flashes)',
    hotFlashesSub: 'سجلي تكرار وشدة نوبات الحرارة المفاجئة.',
    counterLabel: 'نوبات اليوم:',
    severityLabel: 'شدة النوبة:',
    severityOptions: { mild: 'خفيفة (دفء بلا عرق)', moderate: 'متوسطة (احمرار وعرق)', severe: 'شديدة (عرق غزير وخفقان)' },
    nightSweatsTitle: 'التعرق الليلي وجودة النوم',
    nightSweatsLabel: 'الاستيقاظ بسبب التعرق:',
    sleepQualityLabel: 'جودة النوم:',
    sleepOptions: { good: 'نوم عميق (7+ ساعات)', broken: 'نوم متقطع (2-3 مرات)', poor: 'أرق شديد' },
    symptomsTitle: 'سجل الأعراض اليومية',
    symptoms: [
      { id: 'flash', label: 'هبات ساخنة' },
      { id: 'sweats', label: 'تعرق ليلي' },
      { id: 'insomnia', label: 'أرق واضطراب النوم' },
      { id: 'fog', label: 'ضبابية التفكير والنسيان' },
      { id: 'mood', label: 'تقلبات المزاج والعصبية' },
      { id: 'joint', label: 'تيبس وآلام المفاصل' },
      { id: 'dryness', label: 'جفاف مهبلي' },
      { id: 'heart', label: 'خفقان القلب' },
      { id: 'fatigue', label: 'إرهاق شديد' },
      { id: 'weight', label: 'تغيرات في الوزن' }
    ],
    boneTitle: 'حماية العظام والوقاية من الهشاشة',
    calciumTarget: 'هدف الكالسيوم اليومي: 1200 ملغ',
    vitDTarget: 'فيتامين D3: 800–1000 وحدة دولية',
    exercisePrompt: 'رياضة المشي والمقاومة تحفز إعادة بناء العظام وتمنع الكسور.',
    calciumLogged: 'تناولت حصة الكالسيوم اليومية',
    hrtTitle: 'الدعم بالإستروجين النباتي والعلاج الهرموني',
    hrtGuidance: 'بذور الكتان وفول الصويا غير المعدل وراثياً غنية بالفيتوإستروجين وتخفف الأعراض.',
    redFlagTitle: 'تحذير سريري أحمر هام جداً:',
    redFlagText: 'أي نزيف مهبلي أو تمشيح يحدث بعد مرور 12 شهراً من انقطاع الطمث هو أمر غير طبيعي ويستوجب فحصاً عاجلاً بالموجات فوق الصوتية.',
    saveLogBtn: 'حفظ سجل سن الأمل',
    savedMsg: '✓ تم حفظ السجل بنجاح!',
    smsSummaryBtn: '📲 إرسال ملخص SMS إلى هاتفي',
    smsSentMsg: '✓ تم إرسال رسالة SMS لهاتفك بنجاح!'
  }
};

export default function MenopauseTracker() {
  const { language } = useLanguage();
  const t = MENOPAUSE_I18N[language] || MENOPAUSE_I18N.en;
  const { userPhone, motherPhone, motherName, openNativePhoneSms } = useSmsAlert();

  // Local state
  const [stage, setStage] = useState(() => localStorage.getItem('femtech_menopause_stage') || 'peri');
  const [hotFlashesCount, setHotFlashesCount] = useState(2);
  const [severity, setSeverity] = useState('moderate');
  const [nightSweatsAwakenings, setNightSweatsAwakenings] = useState(1);
  const [sleepQuality, setSleepQuality] = useState('broken');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['flash', 'sweats', 'insomnia']);
  const [calciumTaken, setCalciumTaken] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [smsStatus, setSmsStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' | 'questions'

  const handleStageSelect = (s) => {
    setStage(s);
    localStorage.setItem('femtech_menopause_stage', s);
  };

  const handleSymptomToggle = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const logEntry = {
      date: new Date().toISOString().split('T')[0],
      stage,
      hotFlashesCount,
      severity,
      nightSweatsAwakenings,
      sleepQuality,
      selectedSymptoms,
      calciumTaken
    };
    localStorage.setItem('femtech_menopause_latest_log', JSON.stringify(logEntry));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleSendSmsStatus = () => {
    const stageName = t.stages[stage]?.name || stage;
    const msg = language === 'ta'
      ? `[FemTech மெனோபாஸ் நலம்] நிலை: ${stageName}, இன்றைய உஷ்ண அலைகள்: ${hotFlashesCount}, இரவு வியர்வை: ${nightSweatsAwakenings}, கால்சியம்: ${calciumTaken ? 'முடிந்தது' : 'இல்லை'}. நலமாக இருங்கள்! 🌸`
      : `[FemTech Menopause Check-in] Stage: ${stageName}, Hot Flashes: ${hotFlashesCount}, Night Sweats: ${nightSweatsAwakenings}, Calcium: ${calciumTaken ? 'Yes' : 'Pending'}. Stay well! 🌸`;

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
          alertType: 'Menopause Daily Tracker Report'
        })
      }).catch(() => {});
    } catch (e) {}

    // 2. Open in phone SMS app
    openNativePhoneSms(userPhone, msg);

    setSmsStatus(true);
    setTimeout(() => setSmsStatus(false), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 2 Sub-Tabs: Menopause Daily Log vs 10 Clinical Assessment Questions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setActiveTab('tracker')}
          style={{
            padding: '11px 22px',
            borderRadius: '14px',
            border: activeTab === 'tracker' ? '2px solid #ea580c' : '1.5px solid #fed7aa',
            background: activeTab === 'tracker' ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' : '#ffffff',
            color: activeTab === 'tracker' ? '#ffffff' : '#7c2d12',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'tracker' ? '0 4px 14px rgba(234, 88, 12, 0.25)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <span>🌙</span>
          <span>{language === 'ta' ? 'மெனோபாஸ் டிராக்கர் & தினசரி பதிவு' : 'Menopause Daily Tracker'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          style={{
            padding: '11px 22px',
            borderRadius: '14px',
            border: activeTab === 'questions' ? '2px solid #ea580c' : '1.5px solid #fed7aa',
            background: activeTab === 'questions' ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' : '#ffffff',
            color: activeTab === 'questions' ? '#ffffff' : '#7c2d12',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'questions' ? '0 4px 14px rgba(234, 88, 12, 0.25)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <span>📋</span>
          <span>{language === 'ta' ? 'மெனோபாஸ் மருத்துவ கேள்விகள் & மதிப்பீடு' : 'Menopause Clinical Questions & Check'}</span>
        </button>
      </div>

      {activeTab === 'questions' ? (
        <MenopauseCheck />
      ) : (
        <>
          {/* Header Banner */}
          <div className="glass-card" style={{
        padding: '28px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fef3c7 100%)',
        border: '1.5px solid #fed7aa',
        boxShadow: '0 8px 24px rgba(249, 115, 22, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 6px 16px rgba(234, 88, 12, 0.3)',
            flexShrink: 0
          }}>
            🌙
          </div>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-block',
              background: '#fff7ed',
              color: '#c2410c',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '0.74rem',
              fontWeight: 800,
              border: '1px solid #fed7aa',
              marginBottom: '6px'
            }}>
              TRANSITION CARE • மெனோபாஸ் வழிகாட்டி
            </span>
            <h2 style={{ fontSize: '1.5rem', color: '#7c2d12', margin: '0 0 6px 0', fontWeight: 800 }}>
              {t.title}
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#9a3412', lineHeight: 1.5 }}>
              {t.sub}
            </p>
          </div>
        </div>
      </div>

      {/* 4 STAGES INTERACTIVE SELECTOR */}
      <div className="glass-card" style={{
        padding: '24px',
        borderRadius: '18px',
        background: 'white',
        border: '1px solid #fed7aa'
      }}>
        <h3 style={{ fontSize: '1.1rem', color: '#7c2d12', fontWeight: 800, margin: '0 0 14px 0' }}>
          {t.stageSelectorTitle}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
          {Object.entries(t.stages).map(([key, info]) => {
            const isSelected = stage === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleStageSelect(key)}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: isSelected ? '2px solid #ea580c' : '1px solid #fed7aa',
                  background: isSelected ? 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  boxShadow: isSelected ? '0 4px 12px rgba(234, 88, 12, 0.15)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: isSelected ? '#9a3412' : '#1e293b' }}>
                    {info.name}
                  </span>
                  {isSelected && <CheckCircle2 size={16} color="#ea580c" />}
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: isSelected ? '#c2410c' : '#64748b',
                  background: isSelected ? '#fed7aa' : '#f1f5f9',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  alignSelf: 'flex-start'
                }}>
                  {info.range}
                </span>
                <p style={{ margin: 0, fontSize: '0.78rem', color: isSelected ? '#7c2d12' : '#64748b', lineHeight: 1.45 }}>
                  {info.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE LOGGING ROW: Hot Flashes + Night Sweats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Card 1: Hot Flashes Counter */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '18px',
          background: 'white',
          border: '1px solid #fed7aa',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#9a3412', fontWeight: 800, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={20} color="#ea580c" />
              <span>{t.hotFlashesTitle}</span>
            </h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#c2410c' }}>
              {t.hotFlashesSub}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: '#fff7ed',
            borderRadius: '14px',
            border: '1px solid #fed7aa'
          }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#9a3412' }}>
              {t.counterLabel}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setHotFlashesCount(Math.max(0, hotFlashesCount - 1))}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'white',
                  border: '1.5px solid #fdba74',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: '#ea580c'
                }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ea580c', minWidth: '32px', textAlign: 'center' }}>
                {hotFlashesCount}
              </span>
              <button
                type="button"
                onClick={() => setHotFlashesCount(hotFlashesCount + 1)}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: '#ea580c',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: 'white',
                  boxShadow: '0 2px 6px rgba(234, 88, 12, 0.3)'
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#9a3412', marginBottom: '6px' }}>
              {t.severityLabel}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.entries(t.severityOptions).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSeverity(key)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: severity === key ? '2px solid #ea580c' : '1px solid #fed7aa',
                    background: severity === key ? '#fff7ed' : '#ffffff',
                    color: severity === key ? '#9a3412' : '#64748b',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {severity === key ? '● ' : '○ '}{label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Night Sweats & Sleep */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '18px',
          background: 'white',
          border: '1px solid #e0e7ff',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#312e81', fontWeight: 800, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Moon size={20} color="#4f46e5" />
              <span>{t.nightSweatsTitle}</span>
            </h3>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: '#f5f3ff',
            borderRadius: '14px',
            border: '1px solid #ddd6fe'
          }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#5b21b6' }}>
              {t.nightSweatsLabel}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setNightSweatsAwakenings(num)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: nightSweatsAwakenings === num ? '2px solid #7c3aed' : '1px solid #ddd6fe',
                    background: nightSweatsAwakenings === num ? '#7c3aed' : '#ffffff',
                    color: nightSweatsAwakenings === num ? 'white' : '#4c1d95',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#4338ca', marginBottom: '6px' }}>
              {t.sleepQualityLabel}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.entries(t.sleepOptions).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSleepQuality(key)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: sleepQuality === key ? '2px solid #6366f1' : '1px solid #e0e7ff',
                    background: sleepQuality === key ? '#eff6ff' : '#ffffff',
                    color: sleepQuality === key ? '#1e40af' : '#64748b',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {sleepQuality === key ? '● ' : '○ '}{label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SYMPTOMS CHECKLIST */}
      <div className="glass-card" style={{
        padding: '24px',
        borderRadius: '18px',
        background: 'white',
        border: '1px solid #fed7aa'
      }}>
        <h3 style={{ fontSize: '1.1rem', color: '#7c2d12', fontWeight: 800, margin: '0 0 12px 0' }}>
          {t.symptomsTitle}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {t.symptoms.map((s) => {
            const isChecked = selectedSymptoms.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSymptomToggle(s.id)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: isChecked ? '1.5px solid #ea580c' : '1px solid #fed7aa',
                  background: isChecked ? '#fff7ed' : '#ffffff',
                  color: isChecked ? '#9a3412' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: isChecked ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{isChecked ? '✓' : '+'}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BONE DENSITY & OSTEOPOROSIS SHIELD + HRT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Bone Card */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          border: '1.5px solid #bbf7d0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <h3 style={{ fontSize: '1.05rem', color: '#065f46', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} color="#059669" />
            <span>{t.boneTitle}</span>
          </h3>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.74rem', background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: '10px', fontWeight: 700 }}>
              {t.calciumTarget}
            </span>
            <span style={{ fontSize: '0.74rem', background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: '10px', fontWeight: 700 }}>
              {t.vitDTarget}
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '0.8rem', color: '#047857', lineHeight: 1.45 }}>
            {t.exercisePrompt}
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, color: '#065f46' }}>
            <input
              type="checkbox"
              checked={calciumTaken}
              onChange={(e) => setCalciumTaken(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#059669' }}
            />
            <span>{t.calciumLogged}</span>
          </label>
        </div>

        {/* HRT & Lifestyle Support Card */}
        <div className="glass-card" style={{
          padding: '24px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
          border: '1.5px solid #f5d0fe',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <h3 style={{ fontSize: '1.05rem', color: '#701a75', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#a21caf" />
            <span>{t.hrtTitle}</span>
          </h3>

          <p style={{ margin: 0, fontSize: '0.82rem', color: '#86198f', lineHeight: 1.5 }}>
            {t.hrtGuidance}
          </p>

          {/* Red Flag Warning */}
          <div style={{
            marginTop: 'auto',
            padding: '10px 12px',
            borderRadius: '10px',
            background: '#fff1f2',
            border: '1.5px solid #fecdd3',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start'
          }}>
            <AlertTriangle size={18} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.78rem', color: '#9f1239', display: 'block' }}>
                {t.redFlagTitle}
              </strong>
              <span style={{ fontSize: '0.74rem', color: '#881337', lineHeight: 1.4 }}>
                {t.redFlagText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SAVE & SMS DISPATCH ACTION BAR */}
      <div className="glass-card" style={{
        padding: '20px 24px',
        borderRadius: '18px',
        background: 'white',
        border: '1px solid #fed7aa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '10px 22px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              color: 'white',
              border: 'none',
              fontSize: '0.86rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)'
            }}
          >
            {t.saveLogBtn}
          </button>

          <button
            type="button"
            onClick={handleSendSmsStatus}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: 'white',
              border: 'none',
              fontSize: '0.86rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
            }}
          >
            <Smartphone size={16} />
            <span>{t.smsSummaryBtn}</span>
          </button>
        </div>

        <div>
          {savedSuccess && (
            <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700 }}>
              {t.savedMsg}
            </span>
          )}
          {smsStatus && (
            <span style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700 }}>
              {t.smsSentMsg}
            </span>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
