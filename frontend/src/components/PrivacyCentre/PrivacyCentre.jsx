import React, { useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck,
  Lock,
  Key,
  Trash2,
  Database,
  AlertTriangle,
  Eye,
  Check,
  FileText,
  UserCheck,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const PRIVACY_I18N = {
  en: {
    pageTitle: "Privacy & Data Security Centre",
    pageSubtitle: "Complete transparency and sovereign control over your personal records, cycle logs, and account data.",
    badgePrivate: "Private Health Data",
    badgeZeroShare: "HIPAA Zero-Sharing",
    disclaimer: "FemTech enforces zero third-party commercial health data sharing. All diagnostic images, cycle calendars, and medical records belong exclusively to you.",
    secGuarantees: "Data Isolation & Sovereign Guarantees",
    guarantee1Title: "User-Isolated Health Records",
    guarantee1Desc: "Every document in the Health Vault, daily wellness logs, and menstrual cycles are tied strictly to your authenticated User ID.",
    guarantee2Title: "Granular Data Erasure",
    guarantee2Desc: "You have the sovereign right to delete individual cycle records, daily entries, medical files, or erase all history anytime.",
    guarantee3Title: "AES-256 At-Rest Encryption",
    guarantee3Desc: "Diagnostic scans and personal reflections are protected with military-grade AES-256 and HIPAA compliance standards.",
    guarantee4Title: "Zero Third-Party Advertising",
    guarantee4Desc: "We never monetize your reproductive cycle data, sell telemetry to advertisers, or track you across the web.",
    secPassword: "Update Account Password",
    currentPassLabel: "Current Password",
    newPassLabel: "New Password",
    updatePassBtn: "Update Password",
    updatingPass: "Updating...",
    passUpdatedMsg: "✓ Password updated successfully!",
    secFaq: "Privacy & Data Rights FAQ",
    qSell: "Does FemTech sell or share my health telemetry with third parties?",
    aSell: "Never. FemTech has a strict zero-telemetry-monetization policy. Your biological patterns remain confidential.",
    qWhoAccess: "Who can see my cycle and pregnancy logs?",
    aWhoAccess: "Exclusively you. If you choose to consult a doctor, you can present reports at your own discretion.",
    secSensitive: "Sensitive Data Actions & Permanent Erasure",
    clearAiTitle: "Clear FT Chatbox Consultation History",
    clearAiDesc: "Erase all past doctor consultation questions, responses, and conversation transcripts.",
    clearAiBtn: "Erase FT Chats",
    deleteAccountTitle: "Permanently Delete FemTech Account",
    deleteAccountDesc: "Irrevocably deletes your profile, health vault files, and all historical trackers.",
    deleteAccountBtn: "Delete Account",
    confirmClearAi: "Delete all FT Chatbox consultation history? This cannot be undone.",
    clearedAiMsg: "FT Chatbox logs permanently erased.",
    confirmDeletePrompt: 'Type DELETE to permanently erase your FemTech account and all linked records:',
    deletedAccountMsg: "Your account and all personal health logs have been erased permanently."
  },
  ta: {
    pageTitle: "தனியுரிமை & பாதுகாப்பு மையம் (Privacy Centre)",
    pageSubtitle: "உங்கள் தனிப்பட்ட மருத்துவ பதிவுகள், மாதவிடாய் சுழற்சி மற்றும் கணக்கு தரவுகளின் மீதான முழுமையான கட்டுப்பாடு.",
    badgePrivate: "தனிப்பட்ட சுகாதாரத் தரவு",
    badgeZeroShare: "HIPAA பகிர்வற்ற பாதுகாப்பு",
    disclaimer: "ஃபெம்டெக் எந்தவொரு மூன்றாம் தரப்பு நிறுவனத்துடனும் உங்கள் சுகாதாரத் தரவுகளைப் பகிர்வதில்லை. உங்கள் அனைத்து மருத்துவ ஆவணங்களும் உங்களுக்கே சொந்தம்.",
    secGuarantees: "தரவு தனிமைப்படுத்தல் & பாதுகாப்பு உறுதிமொழிகள்",
    guarantee1Title: "பயனர் சார்ந்த தனிமைப்படுத்தப்பட்ட பதிவுகள்",
    guarantee1Desc: "ஹெல்த் வால்ட்டில் உள்ள ஒவ்வொரு ஆவணமும், அன்றாட நல்வாழ்வுப் பதிவுகளும் உங்கள் கணக்கிற்கு மட்டுமே பிரத்யேகமாக இணைக்கப்பட்டுள்ளன.",
    guarantee2Title: "முழுமையான தரவு அழிக்கும் உரிமை",
    guarantee2Desc: "உங்கள் மாதவிடாய் சுழற்சி, அன்றாடப் பதிவுகள் அல்லது மொத்த வரலாற்றையும் எப்போது வேண்டுமானாலும் நீக்கும் உரிமை உங்களிடம் உள்ளது.",
    guarantee3Title: "AES-256 ராணுவத் தர குறியாக்கம்",
    guarantee3Desc: "உங்கள் ஸ்கேன் அறிக்கைகள் மற்றும் தனிப்பட்ட குறிப்புகள் சர்வதேச HIPAA மற்றும் AES-256 தரத்தில் குறியாக்கம் செய்யப்பட்டுள்ளன.",
    guarantee4Title: "விளம்பர நிறுவனங்களுக்கு விற்பனை இல்லை",
    guarantee4Desc: "உங்கள் ஹார்மோன் விபரங்கள் அல்லது மருத்துவத் தரவுகள் எந்தவொரு விளம்பர நிறுவனங்களுக்கும் விற்கப்படாது.",
    secPassword: "கணக்கு கடவுச்சொல்லை மாற்றுதல் (Password)",
    currentPassLabel: "தற்போதைய பாஸ்வேர்டு (Current Password)",
    newPassLabel: "புதிய பாஸ்வேர்டு (New Password)",
    updatePassBtn: "பாஸ்வேர்டை மாற்று (Update Password)",
    updatingPass: "புதுப்பிக்கப்படுகிறது...",
    passUpdatedMsg: "✓ கடவுச்சொல் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
    secFaq: "தனியுரிமைக் கேள்விகள் & பதில்கள் (Privacy FAQ)",
    qSell: "ஃபெம்டெக் என் நல்வாழ்வுத் தகவல்களை மற்றவர்களுக்கு விற்குமா?",
    aSell: "ஒருபோதும் இல்லை. எந்தவொரு விளம்பரத்திற்கோ அல்லது வணிக நோக்கத்திற்கோ உங்கள் தகவல்கள் பகிரப்படாது.",
    qWhoAccess: "என் சுழற்சி மற்றும் கர்ப்பகால பதிவுகளை யார் பார்க்கலாம்?",
    aWhoAccess: "நீங்கள் மட்டுமே பார்க்க முடியும். உங்கள் அனுமதியின்றி வேறு எவராலும் உங்கள் விபரங்களை அணுக முடியாது.",
    secSensitive: "முக்கியமான தரவு அழித்தல் & கணக்கு நீக்கம்",
    clearAiTitle: "FT Chatbox மருத்துவ உரையாடல்களை அழிக்க",
    clearAiDesc: "மருத்துவ ஆலோசகரிடம் நீங்கள் கேட்ட அனைத்து கேள்விகள் மற்றும் உரையாடல் வரலாற்றை அழிக்கவும்.",
    clearAiBtn: "உரையாடல்களை அழி (Erase Chats)",
    deleteAccountTitle: "ஃபெம்டெக் கணக்கை நிரந்தரமாக நீக்க",
    deleteAccountDesc: "உங்கள் சுயவிவரம், ஹெல்த் வால்ட் கோப்புகள் மற்றும் அனைத்து முந்தைய பதிவுகளையும் முழுமையாக அழிக்கவும்.",
    deleteAccountBtn: "கணக்கை நீக்கு (Delete Account)",
    confirmClearAi: "அனைத்து FT Chatbox மருத்துவ உரையாடல் வரலாற்றையும் அழிக்க விரும்புகிறீர்களா? இதை மீட்டெடுக்க முடியாது.",
    clearedAiMsg: "மருத்துவ உரையாடல் பதிவுகள் நிரந்தரமாக அழிக்கப்பட்டன.",
    confirmDeletePrompt: 'உங்கள் கணக்கை நிரந்தரமாக அழிக்க DELETE என்று ஆங்கிலத்தில் டைப் செய்யவும்:',
    deletedAccountMsg: "உங்கள் கணக்கு மற்றும் அனைத்து நல்வாழ்வுப் பதிவுகளும் நிரந்தரமாக அழிக்கப்பட்டன."
  },
  hi: {
    pageTitle: "गोपनीयता एवं डेटा सुरक्षा केंद्र (Privacy Centre)",
    pageSubtitle: "आपके व्यक्तिगत रिकॉर्ड, मासिक धर्म चक्र और स्वास्थ्य डेटा पर पूर्ण संप्रभु नियंत्रण।",
    badgePrivate: "निजी स्वास्थ्य डेटा",
    badgeZeroShare: "HIPAA गोपनीयता",
    disclaimer: "फेमटेक किसी भी तीसरे पक्ष के साथ आपका स्वास्थ्य डेटा साझा नहीं करता है। सभी रिकॉर्ड विशेष रूप से आपके हैं।",
    secGuarantees: "डेटा सुरक्षा एवं संप्रभु गारंटी",
    guarantee1Title: "उपयोगकर्ता-पृथक रिकॉर्ड",
    guarantee1Desc: "हेल्थ वॉल्ट का प्रत्येक दस्तावेज़ और दैनिक लॉग पूरी तरह से आपकी विशिष्ट आईडी से बंधा हुआ है।",
    guarantee2Title: "डेटा मिटाने का अधिकार",
    guarantee2Desc: "आप किसी भी समय अपने व्यक्तिगत चक्र रिकॉर्ड या संपूर्ण इतिहास को स्थायी रूप से हटा सकते हैं।",
    guarantee3Title: "AES-256 एन्क्रिप्शन",
    guarantee3Desc: "आपके मेडिकल स्कैन और व्यक्तिगत नोट्स सैन्य-ग्रेड एन्क्रिप्शन के साथ सुरक्षित हैं।",
    guarantee4Title: "शून्य विज्ञापन नीति",
    guarantee4Desc: "हम कभी भी आपके डेटा का मुद्रीकरण नहीं करते हैं और न ही इसे विज्ञापनदाताओं को बेचते हैं।",
    secPassword: "खाता पासवर्ड अपडेट करें",
    currentPassLabel: "वर्तमान पासवर्ड",
    newPassLabel: "नया पासवर्ड",
    updatePassBtn: "पासवर्ड अपडेट करें",
    updatingPass: "अपडेट हो रहा है...",
    passUpdatedMsg: "✓ पासवर्ड सफलतापूर्वक अपडेट हो गया!",
    secFaq: "गोपनीयता प्रश्न और उत्तर",
    qSell: "क्या फेमटेक मेरा डेटा किसी और को बेचता है?",
    aSell: "बिल्कुल नहीं। फेमटेक में किसी भी व्यावसायिक डेटा साझाकरण की सख्त मनाही है।",
    qWhoAccess: "मेरे चक्र और गर्भावस्था के रिकॉर्ड कौन देख सकता है?",
    aWhoAccess: "केवल आप। डॉक्टर से परामर्श के दौरान आप स्वयं तय करती हैं कि क्या साझा करना है।",
    secSensitive: "डेटा हटाना और खाता निरस्तीकरण",
    clearAiTitle: "एफटी चैटबॉक्स परामर्श इतिहास हटाएं",
    clearAiDesc: "डॉक्टर के साथ बातचीत के सभी पिछले प्रश्नों और उत्तरों को मिटाएं।",
    clearAiBtn: "चैट मिटाएं",
    deleteAccountTitle: "फेमटेक खाता स्थायी रूप से हटाएं",
    deleteAccountDesc: "आपकी प्रोफ़ाइल, स्वास्थ्य फ़ाइलें और सभी पिछले रिकॉर्ड स्थायी रूप से हटा दिए जाएंगे।",
    deleteAccountBtn: "खाता हटाएं",
    confirmClearAi: "क्या आप सभी चैट इतिहास को हटाना चाहते हैं?",
    clearedAiMsg: "चैट इतिहास स्थायी रूप से हटा दिया गया है।",
    confirmDeletePrompt: 'खाता हटाने के लिए DELETE टाइप करें:',
    deletedAccountMsg: "आपका खाता सफलतापूर्वक स्थायी रूप से हटा दिया गया है।"
  },
  te: {
    pageTitle: "గోప్యత & డేటా భద్రతా కేంద్రం (Privacy Centre)",
    pageSubtitle: "మీ వ్యక్తిగత రికార్డులు, చక్రాల సమాచారంపై పూర్తి నియంత్రణ.",
    badgePrivate: "వ్యక్తిగత ఆరోగ్య డేటా",
    badgeZeroShare: "HIPAA భద్రత",
    disclaimer: "మీ ఆరోగ్య డేటా ఏ ఇతర సంస్థలతో పంచుకోబడదు.",
    secGuarantees: "డేటా భద్రతా హామీలు",
    guarantee1Title: "సురక్షిత రికార్డులు",
    guarantee1Desc: "మీ సమాచారం మీ ప్రైవేట్ ఖాతాకు మాత్రమే పరిమితం.",
    guarantee2Title: "డేటా తొలగించే హక్కు",
    guarantee2Desc: "మీరు ఎప్పుడైనా రికార్డులను తొలగించవచ్చు.",
    guarantee3Title: "AES-256 భద్రత",
    guarantee3Desc: "మిలిటరీ స్థాయి ఎన్‌క్రిప్షన్‌తో రక్షించబడింది.",
    guarantee4Title: "వాణిజ్య ప్రకటనలు లేవు",
    guarantee4Desc: "మీ సమాచారం వ్యాపార ప్రకటనల కోసం ఉపయోగించబడదు.",
    secPassword: "పాస్‌వర్డ్ అప్‌డేట్ చేయండి",
    currentPassLabel: "ప్రస్తుత పాస్‌వర్డ్",
    newPassLabel: "కొత్త పాస్‌వర్డ్",
    updatePassBtn: "పాస్‌వర్డ్ మార్చండి",
    updatingPass: "మారుతోంది...",
    passUpdatedMsg: "✓ పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది!",
    secFaq: "గోప్యతా ప్రశ్నలు & సమాధానాలు",
    qSell: "నా డేటా ఇతరులకు అమ్ముతారా?",
    aSell: "ఎట్టి పరిస్థితుల్లోనూ అమ్మము.",
    qWhoAccess: "నా రికార్డులను ఎవరు చూడగలరు?",
    aWhoAccess: "మీరు మాత్రమే చూడగలరు.",
    secSensitive: "డేటా తొలగింపు చర్యలు",
    clearAiTitle: "చాట్ చరిత్రను తొలగించండి",
    clearAiDesc: "వైద్య సలహా చాట్ సమాచారాన్ని తొలగించండి.",
    clearAiBtn: "చాట్ తొలగించండి",
    deleteAccountTitle: "ఖాతాను శాశ్వతంగా తొలగించండి",
    deleteAccountDesc: "మీ ప్రొఫైల్ మరియు అన్ని రికార్డులను శాశ్వతంగా తొలగిస్తుంది.",
    deleteAccountBtn: "ఖాతా తొలగించండి",
    confirmClearAi: "చాట్ చరిత్రను తొలగించాలనుకుంటున్నారా?",
    clearedAiMsg: "చాట్ రికార్డులు తొలగించబడ్డాయి.",
    confirmDeletePrompt: 'ఖాతాను తొలగించడానికి DELETE అని టైప్ చేయండి:',
    deletedAccountMsg: "మీ ఖాతా శాశ్వతంగా తొలగించబడింది."
  },
  ml: {
    pageTitle: "സ്വകാര്യതയും സുരക്ഷയും (Privacy Centre)",
    pageSubtitle: "നിങ്ങളുടെ ആരോഗ്യ രേഖകളിലും അക്കൗണ്ട് വിവരങ്ങളിലും പൂർണ്ണ നിയന്ത്രണം.",
    badgePrivate: "വ്യക്തിഗത ഡാറ്റ",
    badgeZeroShare: "HIPAA സുരക്ഷ",
    disclaimer: "നിങ്ങളുടെ ആരോഗ്യ വിവരങ്ങൾ ആരുമായും പങ്കിടുന്നില്ല.",
    secGuarantees: "സുരക്ഷാ ഉറപ്പുകൾ",
    guarantee1Title: "സുരക്ഷിതമായ രേഖകൾ",
    guarantee1Desc: "നിങ്ങളുടെ രേഖകൾ പൂർണ്ണമായും സുരക്ഷിതമാണ്.",
    guarantee2Title: "ഡാറ്റ നീക്കം ചെയ്യാനുള്ള അവകാശം",
    guarantee2Desc: "എപ്പോൾ വേണമെങ്കിലും രേഖകൾ നീക്കം ചെയ്യാം.",
    guarantee3Title: "AES-256 എൻക്രിപ്ഷൻ",
    guarantee3Desc: "ഉയർന്ന സുരക്ഷാ മാനദണ്ഡങ്ങൾ പാലിക്കുന്നു.",
    guarantee4Title: "പരസ്യങ്ങൾക്ക് നൽകില്ല",
    guarantee4Desc: "വിവരങ്ങൾ പരസ്യങ്ങൾക്കായി ഉപയോഗിക്കില്ല.",
    secPassword: "പാസ്‌വേഡ് മാറ്റുക",
    currentPassLabel: "നിലവിലെ പാസ്‌വേഡ്",
    newPassLabel: "പുതിയ പാസ്‌വേഡ്",
    updatePassBtn: "പാസ്‌വേഡ് അപ്‌ഡേറ്റ് ചെയ്യുക",
    updatingPass: "മാറ്റുന്നു...",
    passUpdatedMsg: "✓ പാസ്‌വേഡ് വിജയകരമായി മാറ്റി!",
    secFaq: "ചോദ്യോത്തരങ്ങൾ",
    qSell: "ഡാറ്റ മറ്റുള്ളവർക്ക് നൽകുമോ?",
    aSell: "ഒരിക്കലുമില്ല.",
    qWhoAccess: "ആർക്കൊക്കെ കാണാം?",
    aWhoAccess: "നിങ്ങൾക്ക് മാത്രം.",
    secSensitive: "ഡാറ്റ നീക്കം ചെയ്യൽ",
    clearAiTitle: "ചാറ്റ് ചരിത്രം മായ്ക്കുക",
    clearAiDesc: "എല്ലാ മെഡിക്കൽ ചാറ്റുകളും നീക്കം ചെയ്യുക.",
    clearAiBtn: "ചാറ്റ് മായ്ക്കുക",
    deleteAccountTitle: "അക്കൗണ്ട് പൂർണ്ണമായും ഇല്ലാതാക്കുക",
    deleteAccountDesc: "നിങ്ങളുടെ എല്ലാ വിവരങ്ങളും നീക്കം ചെയ്യും.",
    deleteAccountBtn: "അക്കൗണ്ട് ഡിലീറ്റ് ചെയ്യുക",
    confirmClearAi: "ചാറ്റ് ചരിത്രം നീക്കം ചെയ്യണമെന്നുണ്ടോ?",
    clearedAiMsg: "ചാറ്റ് ചരിത്രം മായ്ച്ചു.",
    confirmDeletePrompt: 'ഡിലീറ്റ് ചെയ്യാൻ DELETE എന്ന് ടൈപ്പ് ചെയ്യുക:',
    deletedAccountMsg: "അക്കൗണ്ട് വിജയകരമായി ഇല്ലാതാക്കി."
  },
  mr: {
    pageTitle: "गोपनीयता आणि डेटा सुरक्षा केंद्र (Privacy Centre)",
    pageSubtitle: "तुमच्या वैयक्तिक नोंदी आणि मासिक पाळी डेटावर पूर्ण नियंत्रण.",
    badgePrivate: "खाजगी आरोग्य डेटा",
    badgeZeroShare: "HIPAA सुरक्षा",
    disclaimer: "आम्ही तुमचा आरोग्य डेटा कोणाशीही शेअर करत नाही.",
    secGuarantees: "डेटा सुरक्षा हमी",
    guarantee1Title: "सुरक्षित नोंदी",
    guarantee1Desc: "सर्व नोंदी सुरक्षितपणे साठवल्या जातात.",
    guarantee2Title: "डेटा हटवण्याचा अधिकार",
    guarantee2Desc: "तुम्ही कधीही नोंदी हटवू शकता.",
    guarantee3Title: "AES-256 एन्क्रिप्शन",
    guarantee3Desc: "लष्करी दर्जाचे एन्क्रिप्शन वापरले आहे.",
    guarantee4Title: "जाहिरातींसाठी वापर नाही",
    guarantee4Desc: "डेटा जाहिरातदारांना विकला जात नाही.",
    secPassword: "पासवर्ड बदला",
    currentPassLabel: "सध्याचा पासवर्ड",
    newPassLabel: "नवीन पासवर्ड",
    updatePassBtn: "पासवर्ड अपडेट करा",
    updatingPass: "अपडेट करत आहे...",
    passUpdatedMsg: "✓ पासवर्ड यशस्वीरित्या बदलला!",
    secFaq: "गोपनीयता प्रश्नोत्तरे",
    qSell: "डेटा विकला जातो का?",
    aSell: "नाही, कधीच नाही.",
    qWhoAccess: "माझा डेटा कोण पाहू शकते?",
    aWhoAccess: "फक्त तुम्ही.",
    secSensitive: "डेटा हटवण्याची कारवाई",
    clearAiTitle: "चॅट इतिहास हटवा",
    clearAiDesc: "डॉक्टरांशी केलेली सर्व चर्चा हटवा.",
    clearAiBtn: "चॅट हटवा",
    deleteAccountTitle: "खाते कायमचे हटवा",
    deleteAccountDesc: "सर्व रेकॉर्ड आणि खाते कायमचे हटवले जाईल.",
    deleteAccountBtn: "खाते हटवा",
    confirmClearAi: "सर्व चॅट इतिहास हटवायचा आहे का?",
    clearedAiMsg: "चॅट नोंदी हटवल्या.",
    confirmDeletePrompt: 'खाते हटवण्यासाठी DELETE टाइप करा:',
    deletedAccountMsg: "खाते कायमचे हटवले गेले आहे."
  },
  mwr: {
    pageTitle: "गोपनीयता अर डेटा सुरक्षा केंद्र (Privacy Centre)",
    pageSubtitle: "थांकी मेडिकल जाणकारी अर अकाउंट माथै पूरो थांको अधिकार।",
    badgePrivate: "सुरक्षित डेटा",
    badgeZeroShare: "गोपनीयता",
    disclaimer: "थांको डेटा कदेई दूजा न कोनी बेच्यां।",
    secGuarantees: "सुरक्षा री गारंटी",
    guarantee1Title: "अलग अर सुरक्षित",
    guarantee1Desc: "थांकी फाइलां पूरी सुरक्षित है।",
    guarantee2Title: "हटावण रो अधिकार",
    guarantee2Desc: "कदेई भी कागज हटा सको हो।",
    guarantee3Title: "पक्का एन्क्रिप्शन",
    guarantee3Desc: "पूरी सुरक्षा है।",
    guarantee4Title: "विज्ञापन कोनी आवे",
    guarantee4Desc: "थांको डेटा सुरक्षित है।",
    secPassword: "पासवर्ड बदलो",
    currentPassLabel: "इबको पासवर्ड",
    newPassLabel: "नयो पासवर्ड",
    updatePassBtn: "पासवर्ड बदलो",
    updatingPass: "बदल रह्या हां...",
    passUpdatedMsg: "✓ पासवर्ड बदल ग्यो!",
    secFaq: "सवाल अर जवाब",
    qSell: "डेटा बेचे काईं?",
    aSell: "कदेई कोनी।",
    qWhoAccess: "कुण देख सके?",
    aWhoAccess: "सिर्फ थे।",
    secSensitive: "खातो हटावण री जगह",
    clearAiTitle: "बातचीत मिटाओ",
    clearAiDesc: "डॉक्टर सूं पूंछ्या सवाल हटाओ।",
    clearAiBtn: "मिटाओ",
    deleteAccountTitle: "खातो हमेशा वास्ते हटाओ",
    deleteAccountDesc: "सगळी रिपोर्ट अर खातो मिट ज्यासी।",
    deleteAccountBtn: "खातो हटाओ",
    confirmClearAi: "काईं थे बातचीत मिटावणी चावो हो?",
    clearedAiMsg: "बातचीत मिटा दी गई।",
    confirmDeletePrompt: 'खातो हटावण वास्ते DELETE लिखो:',
    deletedAccountMsg: "खातो हमेशा वास्ते हटा दियो।"
  },
  fr: {
    pageTitle: "Centre de Confidentialité & Sécurité (Privacy Centre)",
    pageSubtitle: "Transparence totale et souveraineté absolue sur vos données médicales et cycles.",
    badgePrivate: "Données de Santé Privées",
    badgeZeroShare: "Conforme HIPAA Sans Partage",
    disclaimer: "FemTech n'échange ni ne vend vos données de santé. Tous vos bilans vous appartiennent.",
    secGuarantees: "Garanties d'Isolation et de Souveraineté",
    guarantee1Title: "Dossiers Isolés par Compte",
    guarantee1Desc: "Chaque document et journal est exclusivement lié à votre identifiant sécurisé.",
    guarantee2Title: "Effacement Granulaire",
    guarantee2Desc: "Vous pouvez supprimer n'importe quel cycle ou effacer l'historique complet à tout moment.",
    guarantee3Title: "Chiffrement AES-256",
    guarantee3Desc: "Protection clinique renforcée selon les normes médicales internationales.",
    guarantee4Title: "Zéro Monétisation Commerciale",
    guarantee4Desc: "Nous ne vendons aucune télémétrie de cycle aux annonceurs.",
    secPassword: "Changer le Mot de Passe",
    currentPassLabel: "Mot de passe actuel",
    newPassLabel: "Nouveau mot de passe",
    updatePassBtn: "Mettre à jour",
    updatingPass: "Mise à jour...",
    passUpdatedMsg: "✓ Mot de passe mis à jour avec succès !",
    secFaq: "Questions Fréquentes sur la Confidentialité",
    qSell: "Mes données sont-elles partagées à des tiers ?",
    aSell: "Jamais. Vos données restent strictement confidentielles.",
    qWhoAccess: "Qui a accès à mes cycles et dossiers ?",
    aWhoAccess: "Vous uniquement.",
    secSensitive: "Actions Sensibles & Suppression Définitive",
    clearAiTitle: "Effacer l'Historique FT Chatbox",
    clearAiDesc: "Supprimez toutes les consultations avec l'assistant médical.",
    clearAiBtn: "Effacer les Chats",
    deleteAccountTitle: "Supprimer Définitivement le Compte",
    deleteAccountDesc: "Supprime irrévocablement votre profil et tous vos historiques.",
    deleteAccountBtn: "Supprimer le Compte",
    confirmClearAi: "Effacer tout l'historique des consultations ?",
    clearedAiMsg: "Historique des chats effacé.",
    confirmDeletePrompt: 'Tapez DELETE pour confirmer la suppression définitive :',
    deletedAccountMsg: "Votre compte a été supprimé définitivement."
  },
  lb: {
    pageTitle: "مركز الخصوصية وأمان البيانات (Privacy Centre)",
    pageSubtitle: "التحكم السيادي الكامل والشفافية في بياناتك الطبية، دوراتك وسجلاتك الشخصية.",
    badgePrivate: "بيانات صحية خاصة",
    badgeZeroShare: "حماية HIPAA دون مشاركة",
    disclaimer: "نضمن عدم مشاركة أي بيانات صحية مع أي جهات خارجية. جميع تقاريرك ملك لك وحدك.",
    secGuarantees: "ضمانات العزل والحماية السيادية",
    guarantee1Title: "سجلات معزولة لكل مستخدمة",
    guarantee1Desc: "كل وثيقة وسجل دورة مربوط بشكل مشفر بحسابك الشخصي فقط.",
    guarantee2Title: "الحق في المسح الكامل",
    guarantee2Desc: "يحق لك حذف أي سجلات شهرية أو مسح الحساب بالكامل متى شئت.",
    guarantee3Title: "تشفير عالي المستوى AES-256",
    guarantee3Desc: "حماية مشفرة تتبع المعايير الطبية الأكثر صرامة عالمياً.",
    guarantee4Title: "انعدام الإعلانات والتتبع التجاري",
    guarantee4Desc: "لا نبيع أو نتاجر ببيانات الدورة أو التنبيهات مع أي جهة.",
    secPassword: "تحديث كلمة مرور الحساب",
    currentPassLabel: "كلمة المرور الحالية",
    newPassLabel: "كلمة المرور الجديدة",
    updatePassBtn: "تحديث كلمة المرور",
    updatingPass: "جاري التحديث...",
    passUpdatedMsg: "✓ تم تحديث كلمة المرور بنجاح!",
    secFaq: "الأسئلة الشائعة حول الخصوصية",
    qSell: "هل يتم بيع أو مشاركة بياناتي؟",
    aSell: "أبداً. لا نتاجر بأي بيانات طبية.",
    qWhoAccess: "من يستطيع رؤية سجلاتي؟",
    aWhoAccess: "أنتِ فقط وبشكل حصري.",
    secSensitive: "الإجراءات الحساسة وحذف الحساب",
    clearAiTitle: "مسح سجل محادثات FT Chatbox",
    clearAiDesc: "حذف جميع الاستشارات والأسئلة الطبية السابقة.",
    clearAiBtn: "مسح المحادثات",
    deleteAccountTitle: "حذف حساب FemTech نهائياً",
    deleteAccountDesc: "حذف دائم لملفك الطبي وسجلاتك وفحوصاتك.",
    deleteAccountBtn: "حذف الحساب",
    confirmClearAi: "هل تودين مسح جميع المحادثات الطبية؟",
    clearedAiMsg: "تم مسح المحادثات نهائياً.",
    confirmDeletePrompt: 'اكتبي DELETE لتأكيد حذف الحساب نهائياً:',
    deletedAccountMsg: "تم حذف حسابك وجميع سجلاتك نهائياً."
  },
  ar: {
    pageTitle: "مركز الخصوصية وأمان البيانات الصحية (Privacy Centre)",
    pageSubtitle: "التحكم الكامل والسيادة المطلقة على فحوصاتك الطبية، دوراتك الشهرية وبياناتك الشخصية.",
    badgePrivate: "بيانات طبية خاصة",
    badgeZeroShare: "خصوصية سريرية معتمدة",
    disclaimer: "تلتزم فيمتك بعدم مشاركة بياناتك الطبية مع أي طرف تجاري. جميع بياناتك وفحوصاتك ملك لك حصرياً.",
    secGuarantees: "ضمانات حماية البيانات والسيادة",
    guarantee1Title: "ملفات معزولة ومحمية",
    guarantee1Desc: "جميع الفحوصات وسجلات الدورة الشهرية مرتبطة بحسابك الخاص ومحمية من أي وصول خارجي.",
    guarantee2Title: "حرية الحذف في أي وقت",
    guarantee2Desc: "لك الحق الكامل في حذف أي تقرير طبي أو مسح سجل التاريخ الصحي كاملاً متى شئتِ.",
    guarantee3Title: "تشفير طبي AES-256",
    guarantee3Desc: "تشفير فائق الأمان يطابق أعلى المعايير السريرية العالمية لحماية الخصوصية.",
    guarantee4Title: "سياسة خالية من الإعلانات",
    guarantee4Desc: "لا نقوم مطلقاً ببيع بياناتك الهرمونية أو مشاركتها مع شركات الإعلانات.",
    secPassword: "تحديث كلمة المرور",
    currentPassLabel: "كلمة المرور الحالية",
    newPassLabel: "كلمة المرور الجديدة",
    updatePassBtn: "تأكيد التحديث",
    updatingPass: "جاري التحديث...",
    passUpdatedMsg: "✓ تم تحديث كلمة المرور بنجاح!",
    secFaq: "أسئلة شائعة حول الأمان والخصوصية",
    qSell: "هل يتم بيع أو مشاركة بياناتي مع أطراف ثالثة؟",
    aSell: "أبداً، خصوصيتك خط أحمر ولا تتم مشاركة أي معلومة مع أي جهة تجارية.",
    qWhoAccess: "من يستطيع الاطلاع على سجلاتي؟",
    aWhoAccess: "أنتِ فقط، ويكون لكِ وحدكِ القرار في إبرازها للطبيبة المعالجة أثناء الكشف.",
    secSensitive: "الإجراءات الحساسة وحذف الحساب",
    clearAiTitle: "مسح سجل استشارات FT Chatbox",
    clearAiDesc: "حذف جميع الأسئلة الطبية والاستشارات السابقة نهائياً.",
    clearAiBtn: "مسح المحادثات",
    deleteAccountTitle: "حذف الحساب نهائياً من النظام",
    deleteAccountDesc: "حذف لا رجعة فيه لجميع ملفاتك، فحوصاتك وسجلاتك الصحية.",
    deleteAccountBtn: "حذف الحساب",
    confirmClearAi: "هل أنتِ متأكدة من مسح جميع محادثات الاستشارة الطبية؟",
    clearedAiMsg: "تم مسح سجلات المحادثات نهائياً.",
    confirmDeletePrompt: 'اكتبي DELETE لتأكيد الحذف النهائي لحسابك:',
    deletedAccountMsg: "تم مسح حسابك وجميع سجلاتك نهائياً من الخوادم."
  }
};

export default function PrivacyCentre({ onNavigate }) {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const dict = PRIVACY_I18N[language] || PRIVACY_I18N.ta || PRIVACY_I18N.en;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [loadingPass, setLoadingPass] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdMsg('');
    setLoadingPass(true);
    try {
      const res = await api.put('/auth/change-password', { currentPassword, newPassword });
      if (res.success) {
        setPwdMsg(dict.passUpdatedMsg);
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err) {
      alert(err.message || 'Password update failed');
    } finally {
      setLoadingPass(false);
    }
  };

  const handleClearChatHistory = async () => {
    if (!window.confirm(dict.confirmClearAi)) return;
    try {
      await api.delete('/ai/clear');
      alert(dict.clearedAiMsg);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = prompt(dict.confirmDeletePrompt);
    if (confirmation === 'DELETE') {
      try {
        await api.delete('/auth/delete-account');
        alert(dict.deletedAccountMsg);
        logout();
      } catch (err) {
        alert(err.message || 'Account deletion error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* 1. HEADER BANNER */}
      <div
        className="glass-card"
        style={{
          padding: '28px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #fff0f5 0%, #fdf2f8 50%, #eff6ff 100%)',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          border: '1.5px solid var(--pink-200)',
          boxShadow: '0 8px 24px rgba(244, 63, 94, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'white',
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.35)',
              flexShrink: 0
            }}
          >
            🛡️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
                {dict.pageTitle}
              </h1>
              <span className="badge badge-pink" style={{ gap: '5px', fontWeight: 700 }}>
                <Lock size={12} /> {dict.badgePrivate}
              </span>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              {dict.pageSubtitle}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              background: '#dcfce7',
              color: '#15803d',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #bbf7d0'
            }}
          >
            <ShieldCheck size={16} />
            <span>{dict.badgeZeroShare}</span>
          </span>
        </div>
      </div>

      <DisclaimerBanner customText={dict.disclaimer} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* 2. PRIVACY GUARANTEES */}
        <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
            <Database size={22} color="var(--rose-primary)" />
            <span>{dict.secGuarantees}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '16px', background: '#fff1f2', borderRadius: '16px', border: '1px solid #fecdd3' }}>
              <strong style={{ fontSize: '0.94rem', color: '#9f1239', display: 'block', marginBottom: '6px' }}>
                ✓ {dict.guarantee1Title}
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                {dict.guarantee1Desc}
              </p>
            </div>

            <div style={{ padding: '16px', background: '#f5f3ff', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
              <strong style={{ fontSize: '0.94rem', color: '#6d28d9', display: 'block', marginBottom: '6px' }}>
                ✓ {dict.guarantee2Title}
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                {dict.guarantee2Desc}
              </p>
            </div>

            <div style={{ padding: '16px', background: '#ecfdf5', borderRadius: '16px', border: '1px solid #a7f3d0' }}>
              <strong style={{ fontSize: '0.94rem', color: '#065f46', display: 'block', marginBottom: '6px' }}>
                ✓ {dict.guarantee3Title}
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                {dict.guarantee3Desc}
              </p>
            </div>

            <div style={{ padding: '16px', background: '#f0f9ff', borderRadius: '16px', border: '1px solid #bae6fd' }}>
              <strong style={{ fontSize: '0.94rem', color: '#0369a1', display: 'block', marginBottom: '6px' }}>
                ✓ {dict.guarantee4Title}
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                {dict.guarantee4Desc}
              </p>
            </div>
          </div>
        </div>

        {/* 3. CHANGE PASSWORD FORM */}
        <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: '20px', border: '1px solid #fed7aa' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#9a3412', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
            <Key size={22} color="#ea580c" />
            <span>{dict.secPassword}</span>
          </h3>

          {pwdMsg && (
            <div style={{ background: '#ecfdf5', color: '#065f46', padding: '12px 18px', borderRadius: '12px', marginBottom: '16px', fontSize: '0.88rem', fontWeight: 700, border: '1px solid #a7f3d0' }}>
              {pwdMsg}
            </div>
          )}

          <form onSubmit={handlePasswordChange} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', maxWidth: '680px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.currentPassLabel}</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '4px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.newPassLabel}</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '4px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                type="submit"
                disabled={loadingPass}
                className="btn-primary"
                style={{ padding: '11px 26px', borderRadius: '12px', fontWeight: 700 }}
              >
                {loadingPass ? dict.updatingPass : dict.updatePassBtn}
              </button>
            </div>
          </form>
        </div>

        {/* 4. PRIVACY QUESTIONS & SOVEREIGNTY FAQ (Requested by user) */}
        <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: '20px', border: '1px solid #ddd6fe' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#5b21b6', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
            <HelpCircle size={22} color="#7c3aed" />
            <span>{dict.secFaq}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#faf5ff', padding: '18px', borderRadius: '16px', border: '1px solid #ede9fe' }}>
              <strong style={{ fontSize: '0.92rem', color: '#6d28d9', display: 'block', marginBottom: '6px' }}>
                ❓ {dict.qSell}
              </strong>
              <p style={{ fontSize: '0.84rem', color: '#334155', margin: 0, lineHeight: 1.4 }}>
                {dict.aSell}
              </p>
            </div>

            <div style={{ background: '#faf5ff', padding: '18px', borderRadius: '16px', border: '1px solid #ede9fe' }}>
              <strong style={{ fontSize: '0.92rem', color: '#6d28d9', display: 'block', marginBottom: '6px' }}>
                ❓ {dict.qWhoAccess}
              </strong>
              <p style={{ fontSize: '0.84rem', color: '#334155', margin: 0, lineHeight: 1.4 }}>
                {dict.aWhoAccess}
              </p>
            </div>
          </div>
        </div>

        {/* 5. DATA ACTIONS & DELETION */}
        <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: '20px', border: '1.5px solid #fecaca' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#b91c1c', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
            <AlertTriangle size={22} color="#dc2626" />
            <span>{dict.secSensitive}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #fee2e2', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: '#1e293b', display: 'block' }}>{dict.clearAiTitle}</strong>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0 0' }}>{dict.clearAiDesc}</p>
              </div>
              <button
                onClick={handleClearChatHistory}
                className="btn-secondary"
                style={{ color: '#dc2626', borderColor: '#fca5a5', padding: '8px 18px', borderRadius: '10px', fontWeight: 700 }}
              >
                {dict.clearAiBtn}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: '#b91c1c', display: 'block' }}>{dict.deleteAccountTitle}</strong>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0 0' }}>
                  {dict.deleteAccountDesc}
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)'
                }}
              >
                {dict.deleteAccountBtn}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
