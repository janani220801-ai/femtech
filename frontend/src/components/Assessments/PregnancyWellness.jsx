import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Baby, Calendar, CheckCircle2, AlertCircle, Heart, Plus, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const PREGNANCY_I18N = {
  en: {
    title: "Pregnancy Wellness & Tracking",
    subtitle: "Evaluate symptoms, calculate gestational weeks, and log prenatal doctor visits.",
    modeActive: "✓ Pregnancy Mode Active",
    enableMode: "+ Enable Pregnancy Mode",
    disclaimer: "Symptoms alone cannot confirm pregnancy. A pregnancy test and, where appropriate, evaluation by a healthcare professional are needed to confirm pregnancy.",
    tabQuestionnaire: "Pregnancy Symptom Questionnaire",
    tabTracker: (wk) => `My Pregnancy Journey (Week ${wk})`,
    questionnaireTitle: "Optional Pregnancy Health Questionnaire",
    qLmpLabel: "When was the first day of your last period?",
    qLateLabel: "Is your period currently late?",
    optYes: "Yes",
    optNo: "No",
    optNotSure: "Not Sure",
    qDaysLateLabel: "If late, how many days?",
    qTestLabel: "Have you taken a home pregnancy test?",
    optNotTaken: "No / Not Taken",
    optPositive: "Yes, Positive Result",
    optNegative: "Yes, Negative Result",
    optFaintLine: "Yes, Faint Line",
    optInvalid: "Yes, Invalid Test",
    qSignsLabel: "Are you experiencing any of these common early signs?",
    signNausea: "Nausea / Morning Queasiness",
    signBreast: "Breast Tenderness / Fullness",
    signFatigue: "Unexplained Fatigue",
    qOtherLabel: "Other Noticed Symptoms",
    qOtherPlaceholder: "e.g. Frequent urination, food aversions, light spotting",
    btnSubmit: "Submit Questionnaire",
    btnAnalyzing: "Analyzing...",
    summaryTitle: "Questionnaire Summary",
    summaryText: "“Symptoms alone cannot confirm pregnancy. A pregnancy test and, where appropriate, evaluation by a healthcare professional are needed to confirm pregnancy.”",
    btnEdit: "Edit Answers",
    btnGoTracker: "Go to Pregnancy Mode",
    btnEnableNow: "Enable Pregnancy Mode Now",
    trimesterBadge: (tri) => `Trimester ${tri}`,
    weekOf40: (wk) => `Week ${wk} of 40`,
    eddLabel: "Estimated Due Date:",
    babySizeLabel: "Baby is about the size of a:",
    babySizeFruit: "🍋 Plum / Lime",
    tri1: "Trimester 1 (W1-13)",
    tri2: "Trimester 2 (W14-27)",
    tri3: "Trimester 3 (W28-40)",
    milestonesTitle: "Gestational Milestones & Guidance",
    appointmentsTitle: "Prenatal Doctor Appointments",
    btnAddAppt: "+ Add Appointment",
    docNamePlaceholder: "Doctor Name (e.g. Dr. Raman)",
    hospitalPlaceholder: "Hospital / Clinic",
    notesPlaceholder: "Notes / Tests (e.g. Scan or Blood Work)",
    btnCancel: "Cancel",
    btnSave: "Save"
  },
  ta: {
    title: "கர்ப்பகால நலம் & கண்காணிப்பு",
    subtitle: "அறிகுறிகளை மதிப்பீடு செய்தல், கர்ப்ப வாரங்களை கணக்கிடுதல் மற்றும் மருத்துவ சந்திப்புகளை பதிவு செய்தல்.",
    modeActive: "✓ கர்ப்பகால முறை செயலில் உள்ளது",
    enableMode: "+ கர்ப்பகால முறையை இயக்கு",
    disclaimer: "அறிகுறிகள் மட்டுமே கர்ப்பத்தை உறுதிப்படுத்தாது. துல்லியமான உறுதிப்படுத்தலுக்கு கர்ப்ப பரிசோதனை அல்லது மருத்துவரை அணுகவும்.",
    tabQuestionnaire: "கர்ப்பகால அறிகுறிகள் படிவம்",
    tabTracker: (wk) => `என் கர்ப்பகாலப் பயணம் (வாரம் ${wk})`,
    questionnaireTitle: "விருப்பத்திற்குரிய கர்ப்பகால நலம் படிவம்",
    qLmpLabel: "உங்கள் கடைசி மாதவிடாயின் முதல் நாள் எது?",
    qLateLabel: "தற்போது உங்கள் மாதவிடாய் தள்ளிப்போயுள்ளதா?",
    optYes: "ஆம்",
    optNo: "இல்லை",
    optNotSure: "தெரியவில்லை",
    qDaysLateLabel: "தள்ளிப்போயிருந்தால், எத்தனை நாட்கள்?",
    qTestLabel: "வீட்டு கர்ப்ப பரிசோதனை (Home Kit) செய்துள்ளீர்களா?",
    optNotTaken: "இல்லை / செய்யவில்லை",
    optPositive: "ஆம், பாசிட்டிவ் (Positive)",
    optNegative: "ஆம், நெகட்டிவ் (Negative)",
    optFaintLine: "ஆம், லேசான கோடு (Faint Line)",
    optInvalid: "செல்லாத முடிவு (Invalid)",
    qSignsLabel: "பின்வரும் ஆரம்ப கால அறிகுறிகளில் ஏதேனும் உள்ளதா?",
    signNausea: "குமட்டல் / காலை நேர வாந்தி உணர்வு",
    signBreast: "மார்பக மென்மை / வீக்கம்",
    signFatigue: "அதிகப்படியான விவரிக்க முடியாத சோர்வு",
    qOtherLabel: "பிற குறிப்பிடத்தகுந்த அறிகுறிகள்",
    qOtherPlaceholder: "எ.கா. அடிக்கடி சிறுநீர் கழித்தல், உணவு வெறுப்பு, லேசான மயக்கம்",
    btnSubmit: "படிவத்தைச் சமர்ப்பிக்கவும்",
    btnAnalyzing: "ஆய்வு செய்கிறது...",
    summaryTitle: "மதிப்பீட்டின் சுருக்கம்",
    summaryText: "“அறிகுறிகள் மட்டுமே கர்ப்பத்தை உறுதிப்படுத்தாது. துல்லியமான உறுதிப்படுத்தலுக்கு கர்ப்ப பரிசோதனை அல்லது மருத்துவரை அணுகவும்.”",
    btnEdit: "பதில்களை மாற்றுக",
    btnGoTracker: "கர்ப்ப கண்காணிப்புப் பகுதிக்குச் செல்",
    btnEnableNow: "கர்ப்பகால முறையை உடனே இயக்கு",
    trimesterBadge: (tri) => `பருவம் ${tri} (Trimester)`,
    weekOf40: (wk) => `40 வாரங்களில் வாரம் ${wk}`,
    eddLabel: "எதிர்பார்க்கப்படும் பிரசவ தேதி:",
    babySizeLabel: "குழந்தையின் தோராயமான அளவு:",
    babySizeFruit: "🍋 பிளம் / எலுமிச்சை",
    tri1: "பருவம் 1 (வாரம் 1-13)",
    tri2: "பருவம் 2 (வாரம் 14-27)",
    tri3: "பருவம் 3 (வாரம் 28-40)",
    milestonesTitle: "கர்ப்பகால முக்கிய மைல்கற்கள் & வழிகாட்டல்",
    appointmentsTitle: "மருத்துவர் பரிசோதனை & அல்ட்ராசவுண்ட் ஸ்கேன்",
    btnAddAppt: "+ சந்திப்பை திட்டமிடு",
    docNamePlaceholder: "மருத்துவர் பெயர் (எ.கா. டாக்டர் ராமன்)",
    hospitalPlaceholder: "மருத்துவமனை / கிளினிக்",
    notesPlaceholder: "குறிப்புகள் / சோதனைகள் (ஸ்கேன் அல்லது ரத்தப் பரிசோதனை)",
    btnCancel: "ரத்து செய்",
    btnSave: "சேமிக்கவும்"
  },
  hi: {
    title: "गर्भावस्था कल्याण और ट्रैकिंग",
    subtitle: "लक्षणों का मूल्यांकन करें, गर्भावस्था के सप्ताहों की गणना करें और डॉक्टर के अपॉइंटमेंट्स लॉग करें।",
    modeActive: "✓ गर्भावस्था मोड सक्रिय है",
    enableMode: "+ गर्भावस्था मोड चालू करें",
    disclaimer: "केवल लक्षणों से गर्भावस्था की पुष्टि नहीं हो सकती। इसके लिए प्रेगनेंसी टेस्ट और डॉक्टर से परामर्श आवश्यक है।",
    tabQuestionnaire: "गर्भावस्था लक्षण प्रश्नावली",
    tabTracker: (wk) => `मेरी गर्भावस्था यात्रा (सप्ताह ${wk})`,
    questionnaireTitle: "ऐच्छिक गर्भावस्था स्वास्थ्य प्रश्नावली",
    qLmpLabel: "आपके अंतिम मासिक धर्म (पीरियड) का पहला दिन कौन सा था?",
    qLateLabel: "क्या आपकी माहवारी में देरी हुई है?",
    optYes: "हाँ",
    optNo: "नहीं",
    optNotSure: "निश्चित नहीं",
    qDaysLateLabel: "यदि देरी हुई है, तो कितने दिन?",
    qTestLabel: "क्या आपने होम प्रेगनेंसी टेस्ट किया है?",
    optNotTaken: "नहीं / नहीं किया",
    optPositive: "हाँ, पॉजिटिव (Positive)",
    optNegative: "हाँ, नेगेटिव (Negative)",
    optFaintLine: "हाँ, हल्की रेखा (Faint Line)",
    optInvalid: "अमान्य टेस्ट (Invalid)",
    qSignsLabel: "क्या आप इनमें से कोई प्रारंभिक लक्षण महसूस कर रही हैं?",
    signNausea: "मतली / सुबह की घबराहट",
    signBreast: "स्तनों में भारीपन या दर्द",
    signFatigue: "अत्यधिक थकान",
    qOtherLabel: "अन्य कोई लक्षण",
    qOtherPlaceholder: "उदा. बार-बार पेशाब आना, खाने से अरुचि, हल्का चक्कर",
    btnSubmit: "प्रश्नावली जमा करें",
    btnAnalyzing: "विश्लेषण जारी है...",
    summaryTitle: "प्रश्नावली सारांश",
    summaryText: "“केवल लक्षणों से गर्भावस्था की पुष्टि नहीं हो सकती। इसके लिए प्रेगनेंसी टेस्ट और डॉक्टर से परामर्श आवश्यक है।”",
    btnEdit: "उत्तर संशोधित करें",
    btnGoTracker: "गर्भावस्था ट्रैकर पर जाएं",
    btnEnableNow: "गर्भावस्था मोड अभी चालू करें",
    trimesterBadge: (tri) => `तिमाही ${tri} (Trimester)`,
    weekOf40: (wk) => `40 में से सप्ताह ${wk}`,
    eddLabel: "अनुमानित प्रसव तिथि (EDD):",
    babySizeLabel: "शिशु का अनुमानित आकार:",
    babySizeFruit: "🍋 बेर / नींबू के बराबर",
    tri1: "पहली तिमाही (सप्ताह 1-13)",
    tri2: "दूसरी तिमाही (सप्ताह 14-27)",
    tri3: "तीसरी तिमाही (सप्ताह 28-40)",
    milestonesTitle: "गर्भावस्था के महत्वपूर्ण चरण",
    appointmentsTitle: "प्रसवपूर्व डॉक्टर अपॉइंटमेंट्स",
    btnAddAppt: "+ नया अपॉइंटमेंट जोड़ें",
    docNamePlaceholder: "डॉक्टर का नाम (उदा. डॉ. रमन)",
    hospitalPlaceholder: "अस्पताल / क्लिनिक",
    notesPlaceholder: "नोट्स / टेस्ट (जैसे अल्ट्रासाउंड या ब्लड टेस्ट)",
    btnCancel: "रद्द करें",
    btnSave: "सुरक्षित करें"
  },
  te: {
    title: "గర్భధారణ ఆరోగ్యం & ట్రాకింగ్",
    subtitle: "లక్షణాలను అంచనా వేయండి, గర్భధారణ వారాలను లెక్కించండి మరియు వైద్యుల నియామకాలను నమోదు చేయండి.",
    modeActive: "✓ గర్భధారణ మోడ్ సక్రియంగా ఉంది",
    enableMode: "+ గర్భధారణ మోడ్ ప్రారంభించండి",
    disclaimer: "లక్షణాలు మాత్రమే గర్భాన్ని ధృవీకరించలేవు. ఖచ్చితమైన నిర్ధారణ కోసం ప్రెగ్నెన్సీ టెస్ట్ లేదా వైద్యులను సంప్రదించండి.",
    tabQuestionnaire: "గర్భధారణ లక్షణాల ప్రశ్నావళి",
    tabTracker: (wk) => `నా గర్భధారణ ప్రయాణం (వారం ${wk})`,
    questionnaireTitle: "ఐచ్ఛిక గర్భధారణ ఆరోగ్య ప్రశ్నావళి",
    qLmpLabel: "మీ చివరి పీరియడ్ మొదటి రోజు ఏది?",
    qLateLabel: "మీ పీరియడ్ ప్రస్తుతం ఆలస్యమైందా?",
    optYes: "అవును",
    optNo: "కాదు",
    optNotSure: "ఖచ్చితంగా తెలియదు",
    qDaysLateLabel: "ఆలస్యమైతే, ఎన్ని రోజులు?",
    qTestLabel: "మీరు ఇంట్లో ప్రెగ్నెన్సీ టెస్ట్ చేసుకున్నారా?",
    optNotTaken: "లేదు / చేసుకోలేదు",
    optPositive: "అవును, పాజిటివ్",
    optNegative: "అవును, నెగటివ్",
    optFaintLine: "అవును, లేత గీత (Faint Line)",
    optInvalid: "చెల్లని పరీక్ష (Invalid)",
    qSignsLabel: "ఈ క్రింది ప్రారంభ లక్షణాలలో ఏవైనా ఉన్నాయా?",
    signNausea: "వికారం / ఉదయం వాంతులు",
    signBreast: "రొమ్ముల నొప్పి / వాపు",
    signFatigue: "తీవ్రమైన అలసట",
    qOtherLabel: "ఇతర కనిపించిన లక్షణాలు",
    qOtherPlaceholder: "ఉదా. తరచుగా మూత్రవిసర్జన, ఆహార అయిష్టత",
    btnSubmit: "ప్రశ్నావళిని సమర్పించండి",
    btnAnalyzing: "విశ్లేషిస్తోంది...",
    summaryTitle: "ప్రశ్నావళి సారాంశం",
    summaryText: "“లక్షణాలు మాత్రమే గర్భాన్ని ధృవీకరించలేవు. వైద్యుల సంప్రదింపు అవసరం.”",
    btnEdit: "సమాధానాలను మార్చండి",
    btnGoTracker: "ట్రాకర్‌కి వెళ్ళండి",
    btnEnableNow: "గర్భధారణ మోడ్‌ను ఆన్ చేయండి",
    trimesterBadge: (tri) => `త్రైమాసికం ${tri}`,
    weekOf40: (wk) => `40 వారాలలో ${wk}వ వారం`,
    eddLabel: "అంచనా వేయబడిన ప్రసవ తేదీ:",
    babySizeLabel: "శిశువు పరిమాణం సుమారుగా:",
    babySizeFruit: "🍋 నిమ్మకాయ పరిమాణం",
    tri1: "1వ త్రైమాసికం (1-13 వారాలు)",
    tri2: "2వ త్రైమాసికం (14-27 వారాలు)",
    tri3: "3వ త్రైమాసికం (28-40 వారాలు)",
    milestonesTitle: "ముఖ్యమైన గర్భధారణ దశలు",
    appointmentsTitle: "వైద్యుల అపాయింట్‌మెంట్లు",
    btnAddAppt: "+ అపాయింట్‌మెంట్ జోడించండి",
    docNamePlaceholder: "డాక్టర్ పేరు",
    hospitalPlaceholder: "ఆసుపత్రి / క్లినిక్",
    notesPlaceholder: "గమనికలు / స్కాన్ వివరాలు",
    btnCancel: "రద్దు చేయండి",
    btnSave: "సేవ్ చేయండి"
  },
  ml: {
    title: "ഗർഭകാല ആരോഗ്യവും ട്രാക്കിംഗും",
    subtitle: "ലക്ഷണങ്ങൾ വിലയിരുത്തുക, ഗർഭകാല ആഴ്ചകൾ കണക്കാക്കുക, ഡോക്ടർ സന്ദർശനങ്ങൾ രേഖപ്പെടുത്തുക.",
    modeActive: "✓ ഗർഭകാല മോഡ് സജീവമാണ്",
    enableMode: "+ ഗർഭകാല മോഡ് പ്രവർത്തനക്ഷമമാക്കുക",
    disclaimer: "ലക്ഷണങ്ങൾ കൊണ്ടുമാത്രം ഗർഭധാരണം സ്ഥിരീകരിക്കാൻ കഴിയില്ല. പരിശോധന അനിവാര്യമാണ്.",
    tabQuestionnaire: "ഗർഭ ലക്ഷണ ചോദ്യാവലി",
    tabTracker: (wk) => `എന്റെ ഗർഭകാല യാത്ര (ആഴ്ച ${wk})`,
    questionnaireTitle: "ഗർഭകാല ആരോഗ്യ ചോദ്യാവലി",
    qLmpLabel: "അവസാന ആർത്തവത്തിന്റെ ആദ്യ ദിവസം എപ്പോഴായിരുന്നു?",
    qLateLabel: "ആർത്തവം വൈകിയിട്ടുണ്ടോ?",
    optYes: "അതെ",
    optNo: "അല്ല",
    optNotSure: "ഉറപ്പില്ല",
    qDaysLateLabel: "വൈകിയെങ്കിൽ, എത്ര ദിവസം?",
    qTestLabel: "വീട്ടുപരിശോധന (Pregnancy Test) ചെയ്തിട്ടുണ്ടോ?",
    optNotTaken: "ഇല്ല / ചെയ്തിട്ടില്ല",
    optPositive: "അതെ, പോസിറ്റീവ്",
    optNegative: "അതെ, നെഗറ്റീവ്",
    optFaintLine: "അതെ, നേർത്ത വര",
    optInvalid: "അസാധുവായ ടെസ്റ്റ്",
    qSignsLabel: "ഈ ലക്ഷണങ്ങളിൽ എന്തെങ്കിലും അനുഭവപ്പെടുന്നുണ്ടോ?",
    signNausea: "ഛർദ്ദി / മനംപിരട്ടൽ",
    signBreast: "സ്തനങ്ങളിലെ വേദന / വീക്കം",
    signFatigue: "കടുത്ത ക്ഷീണം",
    qOtherLabel: "മറ്റ് ലക്ഷണങ്ങൾ",
    qOtherPlaceholder: "ഉദാ: ഇടയ്ക്കിടെയുള്ള മൂത്രമൊഴിക്കൽ",
    btnSubmit: "സമർപ്പിക്കുക",
    btnAnalyzing: "പരിശോധിക്കുന്നു...",
    summaryTitle: "ചോദ്യാവലി സംഗ്രഹം",
    summaryText: "“ലക്ഷണങ്ങൾ കൊണ്ടുമാത്രം ഗർഭധാരണം സ്ഥിരീകരിക്കാനാവില്ല. ഡോക്ടറെ കാണുക.”",
    btnEdit: "മാറ്റങ്ങൾ വരുത്തുക",
    btnGoTracker: "ട്രാക്കറിലേക്ക് പോവുക",
    btnEnableNow: "പ്രവർത്തനക്ഷമമാക്കുക",
    trimesterBadge: (tri) => `ത്രൈമാസം ${tri}`,
    weekOf40: (wk) => `40-ൽ ${wk}-ാം ആഴ്ച`,
    eddLabel: "പ്രതീക്ഷിക്കുന്ന പ്രസവ തീയതി:",
    babySizeLabel: "കുഞ്ഞിന്റെ ഏകദേശ വലുപ്പം:",
    babySizeFruit: "🍋 ഒരു നാരങ്ങയുടെ വലുപ്പം",
    tri1: "ഒന്നാം ത്രൈമാസം (1-13 ആഴ്ച)",
    tri2: "രണ്ടാം ത്രൈമാസം (14-27 ആഴ്ച)",
    tri3: "മൂന്നാം ത്രൈമാസം (28-40 ആഴ്ച)",
    milestonesTitle: "പ്രധാന ഘട്ടങ്ങൾ",
    appointmentsTitle: "ഡോക്ടർ അപ്പോയിന്റ്മെന്റുകൾ",
    btnAddAppt: "+ അപ്പോയിന്റ്മെന്റ് ചേർക്കുക",
    docNamePlaceholder: "ഡോക്ടറുടെ പേര്",
    hospitalPlaceholder: "ആശുപത്രി / ക്ലിനിക്ക്",
    notesPlaceholder: "കുറിപ്പുകൾ",
    btnCancel: "റദ്ദാക്കുക",
    btnSave: "സൂക്ഷിക്കുക"
  },
  mr: {
    title: "गर्भधारणा कल्याण आणि ट्रॅकिंग",
    subtitle: "लक्षणे तपासा, गर्भधारणेचे आठवडे मोजा आणि डॉक्टरांच्या भेटी नोंदवा.",
    modeActive: "✓ गर्भधारणा मोड सक्रिय आहे",
    enableMode: "+ गर्भधारणा मोड सुरू करा",
    disclaimer: "केवळ लक्षणांवरून गर्भधारणा निश्चित होऊ शकत नाही. डॉक्टरांचा सल्ला आवश्यक आहे.",
    tabQuestionnaire: "गर्भधारणा प्रश्नावली",
    tabTracker: (wk) => `माझा गर्भधारणा प्रवास (आठवडा ${wk})`,
    questionnaireTitle: "ऐच्छिक गर्भधारणा प्रश्नावली",
    qLmpLabel: "तुमच्या शेवटच्या मासिक पाळीचा पहिला दिवस कोणता होता?",
    qLateLabel: "मासिक पाळी चुकली आहे का?",
    optYes: "होय",
    optNo: "नाही",
    optNotSure: "नक्की नाही",
    qDaysLateLabel: "उशीर झाला असल्यास, किती दिवस?",
    qTestLabel: "होम प्रेग्नन्सी टेस्ट केली आहे का?",
    optNotTaken: "नाही / केली नाही",
    optPositive: "होय, पॉझिटिव्ह",
    optNegative: "होय, निगेटिव्ह",
    optFaintLine: "होय, फिकट रेषा",
    optInvalid: "अवैध टेस्ट",
    qSignsLabel: "खालीलपैकी कोणती लक्षणे जाणवत आहेत?",
    signNausea: "मळमळ / उलटी",
    signBreast: "स्तनांमध्ये जडपणा किंवा वेदना",
    signFatigue: "अति थकवा",
    qOtherLabel: "इतर लक्षणे",
    qOtherPlaceholder: "उदा. वारंवार लघवी होणे, चक्कर येणे",
    btnSubmit: "प्रश्नावली सबमिट करा",
    btnAnalyzing: "विश्लेषण सुरू आहे...",
    summaryTitle: "प्रश्नावली सारांश",
    summaryText: "“केवळ लक्षणांवरून गर्भधारणा निश्चित होऊ शकत नाही. डॉक्टरांचा सल्ला घ्या.”",
    btnEdit: "उत्तरे बदला",
    btnGoTracker: "ट्रॅकरवर जा",
    btnEnableNow: "आत्ताच सुरू करा",
    trimesterBadge: (tri) => `त्रैमासिक ${tri}`,
    weekOf40: (wk) => `40 पैकी ${wk}वा आठवडा`,
    eddLabel: "संभाव्य प्रसूती तारीख:",
    babySizeLabel: "बाळाचा अंदाजे आकार:",
    babySizeFruit: "🍋 लिंबाएवढा",
    tri1: "पहिली तिमाही (1-13 आठवडे)",
    tri2: "दुसरी तिमाही (14-27 आठवडे)",
    tri3: "तिसरी तिमाही (28-40 आठवडे)",
    milestonesTitle: "गर्भधारणेचे महत्त्वाचे टप्पे",
    appointmentsTitle: "डॉक्टरांच्या भेटी",
    btnAddAppt: "+ नवीन अपॉइंटमेंट जोडा",
    docNamePlaceholder: "डॉक्टरांचे नाव",
    hospitalPlaceholder: "रुग्णालय / क्लिनिक",
    notesPlaceholder: "नोंदी / तपासण्या",
    btnCancel: "रद्द करा",
    btnSave: "जतन करा"
  },
  mwr: {
    title: "गर्भावस्था स्वास्थ्य अर जांच",
    subtitle: "लक्षण जाँणो, गर्भ रा हफ्ता गिणो अर डॉक्टर री मुलाक़ात लिखो।",
    modeActive: "✓ गर्भावस्था मोड चालू है",
    enableMode: "+ गर्भावस्था मोड चालू करो",
    disclaimer: "सिर्फ लक्षणां सूँ गर्भ पक्को कोनी होवे। डॉक्टर सूँ जांच करावणी जरूरी है।",
    tabQuestionnaire: "गर्भावस्था लक्षण प्रश्नावली",
    tabTracker: (wk) => `म्हारी गर्भावस्था यात्रा (हफ्तो ${wk})`,
    questionnaireTitle: "गर्भावस्था स्वास्थ्य प्रश्नावली",
    qLmpLabel: "पाछले म्हीने (पीरियड्स) रो पहिलो दिन कद हो?",
    qLateLabel: "कांई म्हीनो आवण में देरी हुई है?",
    optYes: "हाँ",
    optNo: "कोनी",
    optNotSure: "पक्को कोनी",
    qDaysLateLabel: "देरी हुई तो कित्ता दिन?",
    qTestLabel: "कांई प्रेगनेंसी टेस्ट किट सूँ जाँच करी?",
    optNotTaken: "कोनी करी",
    optPositive: "हाँ, पॉजिटिव",
    optNegative: "हाँ, नेगेटिव",
    optFaintLine: "हाँ, हल्की लीर",
    optInvalid: "खराब टेस्ट",
    qSignsLabel: "कांई इण मांय सूँ कोई लक्षण दीखे है?",
    signNausea: "उबकाई / जी घबरावणो",
    signBreast: "छाती मांय भारीपण या दरद",
    signFatigue: "घणी कमजोरी",
    qOtherLabel: "दूजा कोई लक्षण",
    qOtherPlaceholder: "जैड़ा बार-बार पेशाब आवणो",
    btnSubmit: "जमा करो",
    btnAnalyzing: "जांच हो रह्यी है...",
    summaryTitle: "प्रश्नावली रो सार",
    summaryText: "“सिर्फ लक्षणां सूँ गर्भ पक्को कोनी होवे। डॉक्टर नै दिखावो।”",
    btnEdit: "जवाब बदलो",
    btnGoTracker: "ट्रैकर माथे जाओ",
    btnEnableNow: "अबै चालू करो",
    trimesterBadge: (tri) => `पड़व ${tri}`,
    weekOf40: (wk) => `40 मांय सूँ ${wk}वां हफ्तो`,
    eddLabel: "बच्चो होवण री तारीख:",
    babySizeLabel: "टाबर रो नाप:",
    babySizeFruit: "🍋 एक नींबूड़े जित्तो",
    tri1: "पहिलो पड़व (1-13 हफ्ता)",
    tri2: "दूजो पड़व (14-27 हफ्ता)",
    tri3: "तीजो पड़व (28-40 हफ्ता)",
    milestonesTitle: "खास बातां",
    appointmentsTitle: "डॉक्टर री मुलाक़ात",
    btnAddAppt: "+ मुलाक़ात जोड़ो",
    docNamePlaceholder: "डॉक्टर रो नाम",
    hospitalPlaceholder: "अस्पताल",
    notesPlaceholder: "जांच रा नोट",
    btnCancel: "रद्द करो",
    btnSave: "साचो रखो"
  },
  fr: {
    title: "Bien-être et Suivi de Grossesse",
    subtitle: "Évaluez vos symptômes, calculez l'âge gestationnel et enregistrez vos consultations.",
    modeActive: "✓ Mode Grossesse Activé",
    enableMode: "+ Activer le Mode Grossesse",
    disclaimer: "Les symptômes seuls ne confirment pas une grossesse. Un test et un avis médical sont indispensables.",
    tabQuestionnaire: "Questionnaire de Grossesse",
    tabTracker: (wk) => `Mon Suivi de Grossesse (Semaine ${wk})`,
    questionnaireTitle: "Questionnaire de Santé Prénatale",
    qLmpLabel: "Quel était le premier jour de vos dernières règles ?",
    qLateLabel: "Vos règles ont-elles du retard ?",
    optYes: "Oui",
    optNo: "Non",
    optNotSure: "Pas certaine",
    qDaysLateLabel: "Si oui, de combien de jours ?",
    qTestLabel: "Avez-vous effectué un test urinaire de grossesse ?",
    optNotTaken: "Non / Pas encore",
    optPositive: "Oui, Résultat Positif",
    optNegative: "Oui, Résultat Négatif",
    optFaintLine: "Oui, Ligne très pâle",
    optInvalid: "Test Invalide",
    qSignsLabel: "Ressentez-vous certains de ces signes précoces ?",
    signNausea: "Nausées matinales",
    signBreast: "Sensibilité ou gonflement mammaire",
    signFatigue: "Fatigue inhabituelle",
    qOtherLabel: "Autres symptômes remarqués",
    qOtherPlaceholder: "ex. Envies fréquentes d'uriner, dégoût d'aliments",
    btnSubmit: "Valider le questionnaire",
    btnAnalyzing: "Analyse en cours...",
    summaryTitle: "Résumé du Questionnaire",
    summaryText: "“Seuls un test de grossesse et une consultation médicale peuvent confirmer une grossesse avec certitude.”",
    btnEdit: "Modifier les réponses",
    btnGoTracker: "Accéder au Mode Grossesse",
    btnEnableNow: "Activer le Mode Grossesse",
    trimesterBadge: (tri) => `Trimestre ${tri}`,
    weekOf40: (wk) => `Semaine ${wk} sur 40`,
    eddLabel: "Date Présumée d'Accouchement :",
    babySizeLabel: "Taille estimée de bébé :",
    babySizeFruit: "🍋 Prune / Citron vert",
    tri1: "1er Trimestre (S1-13)",
    tri2: "2ème Trimestre (S14-27)",
    tri3: "3ème Trimestre (S28-40)",
    milestonesTitle: "Étapes Clés & Conseils",
    appointmentsTitle: "Rendez-vous Médicaux Prénataux",
    btnAddAppt: "+ Ajouter un rendez-vous",
    docNamePlaceholder: "Nom du Praticien (ex. Dr. Dupont)",
    hospitalPlaceholder: "Hôpital / Clinique",
    notesPlaceholder: "Examens / Échographie",
    btnCancel: "Annuler",
    btnSave: "Enregistrer"
  },
  lb: {
    title: "صحة ومتابعة الحمل",
    subtitle: "تقييم الأعراض، حساب أسابيع الحمل، وتسجيل مواعيد الفحوصات الطبية.",
    modeActive: "✓ وضعية الحمل مفعّلة",
    enableMode: "+ تفعيل وضعية الحمل",
    disclaimer: "الأعراض وحدها لا تؤكد وجود الحمل. يجب إجراء فحص الحمل ومراجعة الطبيبة المختصة.",
    tabQuestionnaire: "استبيان أعراض الحمل",
    tabTracker: (wk) => `رحلة حملي (الأسبوع ${wk})`,
    questionnaireTitle: "استبيان صحة الحمل",
    qLmpLabel: "إيمتى كان أول يوم بآخر دورة شهرية إجتك؟",
    qLateLabel: "هل تأخرت عليكي الدورة الشهرية؟",
    optYes: "نعم",
    optNo: "لا",
    optNotSure: "مش متأكدة",
    qDaysLateLabel: "إذا متأخرة، كم يوم؟",
    qTestLabel: "عملتي فحص حمل منزلي؟",
    optNotTaken: "لا / ما عملت",
    optPositive: "نعم، إيجابي (Positive)",
    optNegative: "نعم، سلبي (Negative)",
    optFaintLine: "نعم، خط خفيف",
    optInvalid: "فحص غير صالح",
    qSignsLabel: "هل عم بتحسي بأي من هيدي الأعراض الأولية؟",
    signNausea: "لعيان نفس / غثيان صباحي",
    signBreast: "وجع أو ثقل بالصدر",
    signFatigue: "تعب وإرهاق شديد",
    qOtherLabel: "أعراض تانية لاحظتيها",
    qOtherPlaceholder: "مثلاً: كثرة التبول، نفور من بعض الأكلات",
    btnSubmit: "إرسال الاستبيان",
    btnAnalyzing: "جاري التحليل...",
    summaryTitle: "ملخص الاستبيان",
    summaryText: "“الأعراض وحدها لا تثبت الحمل. يجب التأكد من خلال الفحص المنزلي ومراجعة الطبيبة.”",
    btnEdit: "تعديل الإجابات",
    btnGoTracker: "الذهاب لمتابعة الحمل",
    btnEnableNow: "تفعيل وضعية الحمل الآن",
    trimesterBadge: (tri) => `الثلث ${tri}`,
    weekOf40: (wk) => `الأسبوع ${wk} من 40`,
    eddLabel: "تاريخ الولادة المتوقع:",
    babySizeLabel: "حجم الجنين التقريبي:",
    babySizeFruit: "🍋 بحجم حبة ليمون أو خوخ",
    tri1: "الثلث الأول (الأسبوع 1-13)",
    tri2: "الثلث الثاني (الأسبوع 14-27)",
    tri3: "الثلث الثالث (الأسبوع 28-40)",
    milestonesTitle: "مراحل الحمل وإرشادات هامة",
    appointmentsTitle: "مواعيد طبيبة النساء والتوليد",
    btnAddAppt: "+ إضافة موعد فحص",
    docNamePlaceholder: "اسم الطبيبة",
    hospitalPlaceholder: "المستشفى / العيادة",
    notesPlaceholder: "ملاحظات الفحص أو السونار",
    btnCancel: "إلغاء",
    btnSave: "حفظ"
  },
  ar: {
    title: "رعاية ومتابعة الحمل",
    subtitle: "تقييم الأعراض المبكرة، حساب أسابيع الحمل بدقة، وتسجيل المواعيد الطبية.",
    modeActive: "✓ وضع الحمل نشط",
    enableMode: "+ تفعيل وضع الحمل",
    disclaimer: "الأعراض بمفردها لا تؤكد الحمل بشكل قاطع. يجب إجراء اختبار الحمل واستشارة طبيبة مختصة.",
    tabQuestionnaire: "استبيان أعراض الحمل",
    tabTracker: (wk) => `رحلة حملي (الأسبوع ${wk})`,
    questionnaireTitle: "استبيان صحة الحمل الاختياري",
    qLmpLabel: "متى كان أول يوم في آخر دورة شهرية لكِ؟",
    qLateLabel: "هل تأخرت دورتك الشهرية حالياً؟",
    optYes: "نعم",
    optNo: "لا",
    optNotSure: "لست متأكدة",
    qDaysLateLabel: "إذا كانت متأخرة، فبكم يوماً؟",
    qTestLabel: "هل قمتِ بإجراء اختبار الحمل المنزلي؟",
    optNotTaken: "لا / لم أقم به",
    optPositive: "نعم، نتيجة إيجابية",
    optNegative: "نعم، نتيجة سلبية",
    optFaintLine: "نعم، خط باهت",
    optInvalid: "اختبار غير صالح",
    qSignsLabel: "هل تشعرين بأي من هذه الأعراض المبكرة الشائعة؟",
    signNausea: "غثيان / انزعاج صباحي",
    signBreast: "ألم أو تحجر في الثديين",
    signFatigue: "إرهاق وخمول غير مبرر",
    qOtherLabel: "أعراض أخرى ملحوظة",
    qOtherPlaceholder: "مثل كثرة التبول، تقلبات المزاج، نزول قطرات دم خفيفة",
    btnSubmit: "إرسال الاستبيان",
    btnAnalyzing: "جاري التحليل...",
    summaryTitle: "ملخص الاستبيان",
    summaryText: "“الأعراض بمفردها لا تكفي لتأكيد الحمل. يجب إجراء اختبار حمل واستشارة الطبيبة.”",
    btnEdit: "تعديل الإجابات",
    btnGoTracker: "الانتقال إلى متتبع الحمل",
    btnEnableNow: "تفعيل وضع الحمل الآن",
    trimesterBadge: (tri) => `الثلث ${tri}`,
    weekOf40: (wk) => `الأسبوع ${wk} من أصل 40`,
    eddLabel: "تاريخ الولادة المتوقع:",
    babySizeLabel: "حجم الجنين التقديري:",
    babySizeFruit: "🍋 بحجم حبة ليمون أو برقوق",
    tri1: "الثلث الأول (الأسبوع 1-13)",
    tri2: "الثلث الثاني (الأسبوع 14-27)",
    tri3: "الثلث الثالث (الأسبوع 28-40)",
    milestonesTitle: "المحطات الرئيسية وإرشادات الحمل",
    appointmentsTitle: "مواعيد طبيبة النساء والتوليد",
    btnAddAppt: "+ إضافة موعد متابعة",
    docNamePlaceholder: "اسم الطبيبة (مثل د. سارة)",
    hospitalPlaceholder: "المستشفى / العيادة",
    notesPlaceholder: "ملاحظات الفحص / تصوير السونار",
    btnCancel: "إلغاء",
    btnSave: "حفظ"
  }
};

export default function PregnancyWellness() {
  const { user, updateUser } = useAuth();
  const { language } = useLanguage();
  const pDict = PREGNANCY_I18N[language] || PREGNANCY_I18N.en;

  const [pregnancyMode, setPregnancyMode] = useState(user?.pregnancyMode?.enabled || false);
  const [activeTab, setActiveTab] = useState(user?.pregnancyMode?.enabled ? 'tracker' : 'questionnaire');
  const [loading, setLoading] = useState(false);

  // Questionnaire form state
  const [qData, setQData] = useState({
    lastPeriodDate: '2026-08-20',
    isPeriodLate: 'Yes',
    daysLate: 5,
    testResult: 'Not Taken',
    nausea: true,
    breastTenderness: true,
    fatigue: true,
    otherSymptoms: ''
  });
  const [qSubmitted, setQSubmitted] = useState(false);

  // Tracker state
  const [trackerData, setTrackerData] = useState({
    currentWeek: 6,
    trimester: 1,
    edd: '2027-04-07',
    appointments: [
      {
        doctorName: 'Dr. Priya Raman (OB-GYN)',
        hospitalName: 'Apollo Cradle Women Centre',
        appointmentDate: '2026-10-14',
        time: '10:30 AM',
        notes: 'First Trimester Dating & Viability Ultrasound Scan'
      }
    ]
  });

  const [showAddAppt, setShowAddAppt] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctorName: '',
    hospitalName: '',
    appointmentDate: '',
    time: '10:00 AM',
    notes: ''
  });

  // Calculate Gestational Age & EDD
  useEffect(() => {
    if (qData.lastPeriodDate) {
      const lmp = new Date(qData.lastPeriodDate);
      if (!isNaN(lmp.getTime())) {
        const today = new Date();
        const diffMs = today - lmp;
        const diffWeeks = Math.max(1, Math.min(40, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))));
        
        const eddDate = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000));
        const eddFormatted = eddDate.toLocaleDateString(language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        let tri = 1;
        if (diffWeeks >= 28) tri = 3;
        else if (diffWeeks >= 14) tri = 2;

        setTrackerData((prev) => ({
          ...prev,
          currentWeek: diffWeeks,
          trimester: tri,
          edd: eddFormatted
        }));
      }
    }
  }, [qData.lastPeriodDate, language]);

  const handleQuestionnaireSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/assessments/pregnancy/questionnaire', {
        questionnaire: {
          lastPeriodDate: qData.lastPeriodDate,
          isPeriodLate: qData.isPeriodLate,
          daysLate: Number(qData.daysLate),
          testResult: qData.testResult,
          nausea: qData.nausea,
          breastTenderness: qData.breastTenderness,
          fatigue: qData.fatigue,
          otherSymptoms: qData.otherSymptoms
        }
      });
      setQSubmitted(true);
    } catch (err) {
      setQSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePregnancyMode = async () => {
    const newState = !pregnancyMode;
    setPregnancyMode(newState);
    if (newState) setActiveTab('tracker');
    try {
      await api.put('/user/profile', {
        pregnancyMode: {
          enabled: newState,
          edd: trackerData.edd,
          lmp: qData.lastPeriodDate
        }
      });
      if (updateUser) {
        updateUser({
          ...user,
          pregnancyMode: {
            enabled: newState,
            edd: trackerData.edd,
            lmp: qData.lastPeriodDate
          }
        });
      }
    } catch (err) {
      console.warn('Mode toggle offline:', err.message);
    }
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newAppointment.doctorName || !newAppointment.appointmentDate) return;
    setTrackerData((prev) => ({
      ...prev,
      appointments: [...prev.appointments, { ...newAppointment }]
    }));
    setNewAppointment({
      doctorName: '',
      hospitalName: '',
      appointmentDate: '',
      time: '10:00 AM',
      notes: ''
    });
    setShowAddAppt(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Disclaimer Banner */}
      <DisclaimerBanner customNotice={pDict.disclaimer} />

      {/* Top Header Card */}
      <div className="glass-card" style={{
        padding: '28px',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid var(--pink-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '18px',
            background: 'var(--rose-gradient)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(244, 63, 94, 0.35)'
          }}>
            <Baby size={30} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--navy-dark)' }}>
              {pDict.title}
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {pDict.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={togglePregnancyMode}
          className={pregnancyMode ? "btn-secondary" : "btn-primary"}
          style={{
            padding: '10px 22px',
            fontSize: '0.9rem',
            fontWeight: 700
          }}
        >
          {pregnancyMode ? pDict.modeActive : pDict.enableMode}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => setActiveTab('questionnaire')}
          style={{
            padding: '12px 24px',
            borderRadius: 'var(--radius-full)',
            border: '2px solid',
            background: activeTab === 'questionnaire' ? 'var(--pink-100)' : 'white',
            borderColor: activeTab === 'questionnaire' ? 'var(--pink-400)' : 'var(--pink-200)',
            color: activeTab === 'questionnaire' ? 'var(--pink-600)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          {pDict.tabQuestionnaire}
        </button>

        {pregnancyMode && (
          <button
            onClick={() => setActiveTab('tracker')}
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid',
              background: activeTab === 'tracker' ? 'var(--pink-100)' : 'white',
              borderColor: activeTab === 'tracker' ? 'var(--pink-400)' : 'var(--pink-200)',
              color: activeTab === 'tracker' ? 'var(--pink-600)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {pDict.tabTracker(trackerData.currentWeek)}
          </button>
        )}
      </div>

      {activeTab === 'questionnaire' ? (
        /* QUESTIONNAIRE */
        <div className="glass-card" style={{ padding: '32px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-dark)', marginBottom: '16px' }}>
            {pDict.questionnaireTitle}
          </h2>

          {!qSubmitted ? (
            <form onSubmit={handleQuestionnaireSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {pDict.qLmpLabel}
                  </label>
                  <input
                    type="date"
                    value={qData.lastPeriodDate}
                    onChange={(e) => setQData({ ...qData, lastPeriodDate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {pDict.qLateLabel}
                  </label>
                  <select
                    value={qData.isPeriodLate}
                    onChange={(e) => setQData({ ...qData, isPeriodLate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)', marginTop: '4px' }}
                  >
                    <option value="Yes">{pDict.optYes}</option>
                    <option value="No">{pDict.optNo}</option>
                    <option value="Not Sure">{pDict.optNotSure}</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {pDict.qDaysLateLabel}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={qData.daysLate}
                    onChange={(e) => setQData({ ...qData, daysLate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {pDict.qTestLabel}
                  </label>
                  <select
                    value={qData.testResult}
                    onChange={(e) => setQData({ ...qData, testResult: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)', marginTop: '4px' }}
                  >
                    <option value="Not Taken">{pDict.optNotTaken}</option>
                    <option value="Positive">{pDict.optPositive}</option>
                    <option value="Negative">{pDict.optNegative}</option>
                    <option value="Faint Line">{pDict.optFaintLine}</option>
                    <option value="Invalid">{pDict.optInvalid}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  {pDict.qSignsLabel}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={qData.nausea}
                      onChange={(e) => setQData({ ...qData, nausea: e.target.checked })}
                    />
                    <span>{pDict.signNausea}</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={qData.breastTenderness}
                      onChange={(e) => setQData({ ...qData, breastTenderness: e.target.checked })}
                    />
                    <span>{pDict.signBreast}</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={qData.fatigue}
                      onChange={(e) => setQData({ ...qData, fatigue: e.target.checked })}
                    />
                    <span>{pDict.signFatigue}</span>
                  </label>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {pDict.qOtherLabel}
                </label>
                <input
                  type="text"
                  placeholder={pDict.qOtherPlaceholder}
                  value={qData.otherSymptoms}
                  onChange={(e) => setQData({ ...qData, otherSymptoms: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--pink-200)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 28px' }}>
                  {loading ? pDict.btnAnalyzing : pDict.btnSubmit}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', marginBottom: '8px' }}>
                  {pDict.summaryTitle}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: '1.6', fontWeight: 600 }}>
                  {pDict.summaryText}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setQSubmitted(false)} className="btn-secondary">
                  {pDict.btnEdit}
                </button>
                <button onClick={togglePregnancyMode} className="btn-primary">
                  {pregnancyMode ? pDict.btnGoTracker : pDict.btnEnableNow}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* PREGNANCY MODE TRACKER */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Milestone Banner */}
          <div className="glass-card" style={{ padding: '28px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div>
                <span className="badge badge-pink">{pDict.trimesterBadge(trackerData.trimester)}</span>
                <h2 style={{ fontSize: '2.2rem', color: 'var(--pink-600)', margin: '8px 0 4px 0' }}>
                  {pDict.weekOf40(trackerData.currentWeek)}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {pDict.eddLabel} <strong>{trackerData.edd || 'April 07, 2027'}</strong>
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pDict.babySizeLabel}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-dark)' }}>
                  {pDict.babySizeFruit}
                </div>
              </div>
            </div>

            {/* Gestational Progress bar */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ height: '10px', background: 'var(--pink-100)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(trackerData.currentWeek / 40) * 100}%`, height: '100%', background: 'var(--rose-gradient)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>{pDict.tri1}</span>
                <span>{pDict.tri2}</span>
                <span>{pDict.tri3}</span>
              </div>
            </div>
          </div>

          {/* Appointments & Notes */}
          <div className="glass-card" style={{ padding: '28px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)' }}>
                {pDict.appointmentsTitle}
              </h3>
              <button
                onClick={() => setShowAddAppt(!showAddAppt)}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                {pDict.btnAddAppt}
              </button>
            </div>

            {showAddAppt && (
              <form onSubmit={handleAddAppointment} style={{ background: 'var(--pink-50)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    placeholder={pDict.docNamePlaceholder}
                    value={newAppointment.doctorName}
                    onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--pink-200)', background: 'white' }}
                  />
                  <input
                    type="text"
                    placeholder={pDict.hospitalPlaceholder}
                    value={newAppointment.hospitalName}
                    onChange={(e) => setNewAppointment({ ...newAppointment, hospitalName: e.target.value })}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--pink-200)', background: 'white' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="date"
                    required
                    value={newAppointment.appointmentDate}
                    onChange={(e) => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--pink-200)', background: 'white' }}
                  />
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--pink-200)', background: 'white' }}
                  />
                </div>
                <input
                  type="text"
                  placeholder={pDict.notesPlaceholder}
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--pink-200)', background: 'white' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => setShowAddAppt(false)} className="btn-secondary" style={{ padding: '6px 12px' }}>
                    {pDict.btnCancel}
                  </button>
                  <button type="submit" className="btn-primary" style={{ padding: '6px 16px' }}>
                    {pDict.btnSave}
                  </button>
                </div>
              </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {trackerData.appointments.map((appt, i) => (
                <div
                  key={i}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{appt.doctorName}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{appt.hospitalName}</div>
                    {appt.notes && <div style={{ fontSize: '0.78rem', color: 'var(--rose-primary)', marginTop: '2px' }}>{appt.notes}</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {new Date(appt.appointmentDate).toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{appt.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
