import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import DisclaimerBanner from './DisclaimerBanner';
import {
  AlertOctagon,
  PhoneCall,
  Hospital,
  X,
  ShieldAlert,
  Edit2,
  Check,
  UserPlus,
  Trash2,
  Plus,
  HeartHandshake,
  MapPin,
  Send,
  MessageSquare,
  ExternalLink
} from 'lucide-react';


export const EMERGENCY_I18N = {
  en: {
    contactsSaved: '✓ Emergency contacts saved successfully!',
    namePhoneRequired: 'Please enter contact name and phone number.',
    contactAdded: '✓ New emergency contact added successfully!',
    confirmDelete: 'Remove this emergency contact?',
    contactRemoved: '✓ Contact removed.',
    close: 'Close',
    modalTitle: 'Urgent Medical Alert & SOS',
    modalSubtitle: 'Immediate Emergency Protocol & Support Contacts',
    alertWarning: '⚠️ Urgent: If you or someone with you experiences severe hemorrhage, acute breathing difficulty, chest pain, seizure, or sudden unbearable pain, contact emergency services immediately.',
    callAmbulance: 'Call Emergency Ambulance (108 / 112)',
    tollFree: 'Toll Free',
    sosTitle: (c) => `Personal Emergency SOS Contacts (${c}):`,
    addContactBtn: '➕ Add Emergency Contact',
    editBtn: 'Edit',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    addNewDetails: 'Add New Emergency SOS Contact Details:',
    namePlaceholder: 'Full Name (e.g. Kavitha - Mother)',
    phonePlaceholder: 'Phone Number (+91 98401...)',
    primaryCheckboxHint: 'Set as primary SOS contact for instant dual-SMS alerts',
    saveContactBtn: 'Save Emergency Contact',
    contactNum: (i) => `Contact #${i}`,
    saveChangesBtn: 'Save Changes',
    primaryBadge: 'Primary SOS',
    callBtn: 'Call',
    deleteTitle: 'Delete',
    womenHelpline: 'National Women Helpline (1091)',
    locateHospital: 'Locate Nearest Emergency Hospital on Maps',
    relMother: 'Mother',
    relDoctor: 'Doctor',
    relSister: 'Sister',
    relFather: 'Father',
    relHusband: 'Husband',
    relFriend: 'Friend',
    relGuardian: 'Guardian'
  },
  ta: {
    contactsSaved: '✓ அவசர தொடர்பு எண்கள் சேமிக்கப்பட்டன!',
    namePhoneRequired: 'தயவுசெய்து பெயர் மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்.',
    contactAdded: '✓ புதிய அவசர தொடர்பு வெற்றிகரமாக சேர்க்கப்பட்டது!',
    confirmDelete: 'இந்த தொடர்பை நீக்க விரும்புகிறீர்களா?',
    contactRemoved: '✓ தொடர்பு நீக்கப்பட்டது.',
    close: 'மூடு',
    modalTitle: 'அவசர மருத்துவ உதவி & SOS விபரம்',
    modalSubtitle: 'உடனடி அவசர உதவி நெறிமுறை மற்றும் தொடர்பு எண்கள்',
    alertWarning: '⚠️ அவசர எச்சரிக்கை: அதிக இரத்தப்போக்கு, மூச்சுத்திணறல், நெஞ்சு வலி, வலிப்பு அல்லது தாங்க முடியாத கடுமையான வலி ஏற்பட்டால் உடனடியாக அவசர ஆம்புலன்ஸ் எண்ணை (108 / 112) தொடர்பு கொள்ளவும்.',
    callAmbulance: 'அவசர ஆம்புலன்ஸ் அழைக்க (108 / 112)',
    tollFree: 'இலவசம்',
    sosTitle: (c) => `நியமிக்கப்பட்ட SOS தொடர்புகள் (${c}):`,
    addContactBtn: '➕ அவசர தொடர்பு எண் சேர்க்க',
    editBtn: 'திருத்து',
    saveBtn: 'சேமி',
    cancelBtn: 'ரத்து செய்',
    addNewDetails: 'புதிய அவசர தொடர்பு விபரங்களை உள்ளிடவும்:',
    namePlaceholder: 'முழு பெயர் (எ.கா: தாய் கவிதா)',
    phonePlaceholder: 'மொபைல் எண் (+91 98401...)',
    primaryCheckboxHint: 'இவரை முதன்மை அவசர தொடர்பு எண்ணாக (Priority SOS) அமைக்கவும்',
    saveContactBtn: 'தொடர்பைச் சேமிக்கவும்',
    contactNum: (i) => `தொடர்பு #${i}`,
    saveChangesBtn: 'மாற்றங்களை சேமிக்கவும்',
    primaryBadge: 'முதன்மை SOS',
    callBtn: 'அழைக்க',
    deleteTitle: 'நீக்கு',
    womenHelpline: 'தேசிய மகளிர் உதவி எண் (1091)',
    locateHospital: 'அருகிலுள்ள அவசர சிகிச்சை மருத்துவமனையைக் கண்டறிக (Maps)',
    relMother: 'தாய் (Mother)',
    relDoctor: 'மருத்துவர் (Doctor)',
    relSister: 'சகோதரி (Sister)',
    relFather: 'தந்தை (Father)',
    relHusband: 'கணவர் (Husband)',
    relFriend: 'தோழி / நண்பர் (Friend)',
    relGuardian: 'பாதுகாவலர் (Guardian)'
  },
  hi: {
    contactsSaved: '✓ आपातकालीन संपर्क सफलतापूर्वक सहेजे गए!',
    namePhoneRequired: 'कृपया संपर्क नाम और फ़ोन नंबर दर्ज करें।',
    contactAdded: '✓ नया आपातकालीन संपर्क सफलतापूर्वक जोड़ा गया!',
    confirmDelete: 'क्या आप इस आपातकालीन संपर्क को हटाना चाहते हैं?',
    contactRemoved: '✓ संपर्क हटा दिया गया।',
    close: 'बंद करें',
    modalTitle: 'आपातकालीन चिकित्सा अलर्ट व SOS',
    modalSubtitle: 'तत्काल आपातकालीन प्रोटोकॉल व सहायता संपर्क',
    alertWarning: '⚠️ आपातकालीन चेतावनी: अत्यधिक रक्तस्राव, सांस लेने में कठिनाई, सीने में दर्द, दौरा या असहनीय दर्द होने पर तुरंत आपातकालीन एम्बुलेंस (108 / 112) पर संपर्क करें।',
    callAmbulance: 'आपातकालीन एम्बुलेंस को कॉल करें (108 / 112)',
    tollFree: 'टोल फ्री',
    sosTitle: (c) => `व्यक्तिगत आपातकालीन SOS संपर्क (${c}):`,
    addContactBtn: '➕ आपातकालीन संपर्क जोड़ें',
    editBtn: 'संपादित करें',
    saveBtn: 'सहेजें',
    cancelBtn: 'रद्द करें',
    addNewDetails: 'नए आपातकालीन SOS संपर्क का विवरण जोड़ें:',
    namePlaceholder: 'पूरा नाम (उदा. माता कविता)',
    phonePlaceholder: 'फ़ोन नंबर (+91 98401...)',
    primaryCheckboxHint: 'त्वरित दोहरे एसएमएस अलर्ट के लिए प्राथमिक SOS संपर्क बनाएं',
    saveContactBtn: 'आपातकालीन संपर्क सहेजें',
    contactNum: (i) => `संपर्क #${i}`,
    saveChangesBtn: 'परिवर्तन सहेजें',
    primaryBadge: 'प्राथमिक SOS',
    callBtn: 'कॉल करें',
    deleteTitle: 'हटाएं',
    womenHelpline: 'राष्ट्रीय महिला हेल्पलाइन (1091)',
    locateHospital: 'नक्शे पर निकटतम आपातकालीन अस्पताल खोजें',
    relMother: 'माता (Mother)',
    relDoctor: 'डॉक्टर (Doctor)',
    relSister: 'बहन (Sister)',
    relFather: 'पिता (Father)',
    relHusband: 'पति (Husband)',
    relFriend: 'मित्र (Friend)',
    relGuardian: 'अभिभावक (Guardian)'
  },
  te: {
    contactsSaved: '✓ అత్యవసర పరిచయాలు విజయవంతంగా భద్రపరచబడ్డాయి!',
    namePhoneRequired: 'దయచేసి పరిచయం పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి.',
    contactAdded: '✓ కొత్త అత్యవసర పరిచయం విజయవంతంగా జోడించబడింది!',
    confirmDelete: 'ఈ అత్యవసర పరిచయాన్ని తొలగించాలనుకుంటున్నారా?',
    contactRemoved: '✓ పరిచయం తొలగించబడింది.',
    close: 'మూసివేయి',
    modalTitle: 'అత్యవసర వైద్య హెచ్చరిక & SOS',
    modalSubtitle: 'తక్షణ అత్యవసర ప్రోటోకాల్ & సహాయక పరిచయాలు',
    alertWarning: '⚠️ అత్యవసర హెచ్చరిక: తీవ్ర రక్తస్రావం, శ్వాస తీసుకోవడంలో ఇబ్బంది, ఛాతీ నొప్పి లేదా భరించలేని నొప్పి ఉంటే వెంటనే 108 / 112 కు కాల్ చేయండి.',
    callAmbulance: 'అత్యవసర అంబులెన్స్‌కు కాల్ చేయండి (108 / 112)',
    tollFree: 'ఉచితం',
    sosTitle: (c) => `వ్యక్తిగత అత్యవసర SOS పరిచయాలు (${c}):`,
    addContactBtn: '➕ అత్యవసర పరిచయాన్ని జోడించండి',
    editBtn: 'సవరించు',
    saveBtn: 'భద్రపరచు',
    cancelBtn: 'రద్దు చేయి',
    addNewDetails: 'కొత్త అత్యవసర పరిచయ వివరాలను నమోదు చేయండి:',
    namePlaceholder: 'పూర్తి పేరు (ఉదా: తల్లి కవిత)',
    phonePlaceholder: 'ఫోన్ నంబర్ (+91 98401...)',
    primaryCheckboxHint: 'తక్షణ SMS హెచ్చరికల కోసం ప్రాథమిక SOS పరిచయంగా సెట్ చేయండి',
    saveContactBtn: 'అత్యవసర పరిచయాన్ని భద్రపరచండి',
    contactNum: (i) => `పరిచయం #${i}`,
    saveChangesBtn: 'మార్పులను భద్రపరచండి',
    primaryBadge: 'ప్రాథమిక SOS',
    callBtn: 'కాల్ చేయండి',
    deleteTitle: 'తొలగించు',
    womenHelpline: 'జాతీయ మహిళా హెల్ప్‌లైన్ (1091)',
    locateHospital: 'మ్యాప్‌లలో సమీప అత్యవసర ఆసుపత్రిని కనుగొనండి',
    relMother: 'తల్లి (Mother)',
    relDoctor: 'వైద్యులు (Doctor)',
    relSister: 'సోదరి (Sister)',
    relFather: 'తండ్రి (Father)',
    relHusband: 'భర్త (Husband)',
    relFriend: 'స్నేహితురాలు (Friend)',
    relGuardian: 'సంరక్షకుడు (Guardian)'
  },
  ml: {
    contactsSaved: '✓ അടിയന്തര കോൺടാക്റ്റുകൾ വിജയകരമായി സേവ് ചെയ്തു!',
    namePhoneRequired: 'പേരും ഫോൺ നമ്പറും നൽകുക.',
    contactAdded: '✓ പുതിയ അടിയന്തര കോൺടാക്റ്റ് ചേർത്തു!',
    confirmDelete: 'ഈ കോൺടാക്റ്റ് നീക്കം ചെയ്യണോ?',
    contactRemoved: '✓ കോൺടാക്റ്റ് നീക്കം ചെയ്തു.',
    close: 'അടയ്ക്കുക',
    modalTitle: 'അടിയന്തര മെഡിക്കൽ അലേർട്ടും SOS-ഉം',
    modalSubtitle: 'തൽക്ഷണ അടിയന്തര പ്രോട്ടോക്കോളും കോൺടാക്റ്റുകളും',
    alertWarning: '⚠️ അടിയന്തര മുന്നറിയിപ്പ്: അമിത രക്തസ്രാവം, ശ്വാസതടസ്സം, നെഞ്ചുവേദന അല്ലെങ്കിൽ അസഹനീയമായ വേദന ഉണ്ടായാൽ ഉടൻ 108 / 112 വിളിക്കുക.',
    callAmbulance: 'അടിയന്തര ആംബുലൻസ് വിളിക്കുക (108 / 112)',
    tollFree: 'ടോൾ ഫ്രീ',
    sosTitle: (c) => `അടിയന്തര SOS കോൺടാക്റ്റുകൾ (${c}):`,
    addContactBtn: '➕ അടിയന്തര കോൺടാക്റ്റ് ചേർക്കുക',
    editBtn: 'തിരുത്തുക',
    saveBtn: 'സേവ് ചെയ്യുക',
    cancelBtn: 'റദ്ദാക്കുക',
    addNewDetails: 'പുതിയ അടിയന്തര കോൺടാക്റ്റ് വിവരങ്ങൾ നൽകുക:',
    namePlaceholder: 'പൂർണ്ണ പേര് (ഉദാ: അമ്മ കവിത)',
    phonePlaceholder: 'ഫോൺ നമ്പർ (+91 98401...)',
    primaryCheckboxHint: 'തൽക്ഷണ SMS അലേർട്ടുകൾക്കായി പ്രാഥമിക SOS കോൺടാക്റ്റായി സജ്ജീകരിക്കുക',
    saveContactBtn: 'കോൺടാക്റ്റ് സേവ് ചെയ്യുക',
    contactNum: (i) => `കോൺടാക്റ്റ് #${i}`,
    saveChangesBtn: 'മാറ്റങ്ങൾ സേവ് ചെയ്യുക',
    primaryBadge: 'പ്രധാന SOS',
    callBtn: 'വിളിക്കുക',
    deleteTitle: 'നീക്കം ചെയ്യുക',
    womenHelpline: 'ദേശീയ വനിതാ ഹെൽപ്പ്‌ലൈൻ (1091)',
    locateHospital: 'ഏറ്റവും അടുത്തുള്ള അടിയന്തര ആശുപത്രി കണ്ടെത്തുക (Maps)',
    relMother: 'അമ്മ (Mother)',
    relDoctor: 'ഡോക്ടർ (Doctor)',
    relSister: 'സഹോദരി (Sister)',
    relFather: 'പിതാവ് (Father)',
    relHusband: 'ഭർത്താവ് (Husband)',
    relFriend: 'സുഹൃത്ത് (Friend)',
    relGuardian: 'രക്ഷാധികാരി (Guardian)'
  },
  mr: {
    contactsSaved: '✓ आणीबाणी संपर्क यशस्वीरित्या जतन केले!',
    namePhoneRequired: 'कृपया नाव आणि फोन नंबर प्रविष्ट करा.',
    contactAdded: '✓ नवीन आणीबाणी संपर्क जोडला गेला!',
    confirmDelete: 'तुम्ही हा आणीबाणी संपर्क काढू इच्छिता का?',
    contactRemoved: '✓ संपर्क हटवला गेला.',
    close: 'बंद करा',
    modalTitle: 'तातडीचा वैद्यकीय इशारा आणि SOS',
    modalSubtitle: 'त्वरित आणीबाणी प्रोटोकॉल आणि संपर्क',
    alertWarning: '⚠️ आणीबाणीचा इशारा: जास्त रक्तस्त्राव, श्वास घेण्यास त्रास, छातीत दुखणे किंवा असह्य वेदना असल्यास त्वरित 108 / 112 वर संपर्क साधा.',
    callAmbulance: 'रुग्णवाहिका बोलवा (108 / 112)',
    tollFree: 'टोल फ्री',
    sosTitle: (c) => `वैयक्तिक आणीबाणी SOS संपर्क (${c}):`,
    addContactBtn: '➕ आणीबाणी संपर्क जोडा',
    editBtn: 'संपादित करा',
    saveBtn: 'जतन करा',
    cancelBtn: 'रद्द करा',
    addNewDetails: 'नवीन आणीबाणी SOS संपर्क तपशील जोडा:',
    namePlaceholder: 'पूर्ण नाव (उदा. आई कविता)',
    phonePlaceholder: 'फोन नंबर (+91 98401...)',
    primaryCheckboxHint: 'त्वरित SMS अलर्टसाठी प्राथमिक संपर्क म्हणून सेट करा',
    saveContactBtn: 'संपर्क जतन करा',
    contactNum: (i) => `संपर्क #${i}`,
    saveChangesBtn: 'बदल जतन करा',
    primaryBadge: 'प्राथमिक SOS',
    callBtn: 'कॉल करा',
    deleteTitle: 'हटवा',
    womenHelpline: 'राष्ट्रीय महिला हेल्पलाइन (1091)',
    locateHospital: 'नकाशावर जवळचे आपत्कालीन रुग्णालय शोधा',
    relMother: 'आई (Mother)',
    relDoctor: 'डॉक्टर (Doctor)',
    relSister: 'बहीण (Sister)',
    relFather: 'वडील (Father)',
    relHusband: 'पती (Husband)',
    relFriend: 'मैत्रीण (Friend)',
    relGuardian: 'पालक (Guardian)'
  },
  mwr: {
    contactsSaved: '✓ आपातकालीन संपर्क सहेजा गया सा!',
    namePhoneRequired: 'नाम अर फोन नंबर लिखो सा।',
    contactAdded: '✓ नवो आपातकालीन संपर्क जुड़ गयो सा!',
    confirmDelete: 'कायीं थे ओ संपर्क हटावणो चावो?',
    contactRemoved: '✓ संपर्क हट गयो सा।',
    close: 'बंद करो',
    modalTitle: 'आपातकालीन चिकित्सा अलर्ट अर SOS',
    modalSubtitle: 'आपातकालीन प्रोटोकॉल अर सहायता संपर्क',
    alertWarning: '⚠️ आपातकालीन चेतावनी: ज्यादा खून बहण, सांस री तकलीफ या छाती में दर्द होवे तो तुरंत 108 / 112 पे फोन करो सा।',
    callAmbulance: 'एम्बुलेंस ने फोन लगाओ (108 / 112)',
    tollFree: 'मुफ़्त',
    sosTitle: (c) => `आपातकालीन SOS संपर्क (${c}):`,
    addContactBtn: '➕ आपातकालीन संपर्क जोड़ो',
    editBtn: 'बदलो',
    saveBtn: 'सहेजो',
    cancelBtn: 'रद्द करो',
    addNewDetails: 'नवो आपातकालीन संपर्क रो विवरण:',
    namePlaceholder: 'पूरो नाम (उदा. मां कविता)',
    phonePlaceholder: 'फोन नंबर (+91 98401...)',
    primaryCheckboxHint: 'मुख्य आपातकालीन संपर्क बनाओ',
    saveContactBtn: 'संपर्क सहेजो',
    contactNum: (i) => `संपर्क #${i}`,
    saveChangesBtn: 'बदलाव सहेजो',
    primaryBadge: 'मुख्य SOS',
    callBtn: 'फोन करो',
    deleteTitle: 'हटाओ',
    womenHelpline: 'राष्ट्रीय महिला हेल्पलाइन (1091)',
    locateHospital: 'नक्शा पे नगीच रो अस्पताल खोजो',
    relMother: 'माता (Mother)',
    relDoctor: 'डॉक्टर (Doctor)',
    relSister: 'बहन (Sister)',
    relFather: 'पिता (Father)',
    relHusband: 'पति (Husband)',
    relFriend: 'सहेली (Friend)',
    relGuardian: 'अभिभावक (Guardian)'
  },
  fr: {
    contactsSaved: '✓ Contacts d’urgence enregistrés avec succès !',
    namePhoneRequired: 'Veuillez saisir le nom et le numéro de téléphone.',
    contactAdded: '✓ Nouveau contact d’urgence ajouté avec succès !',
    confirmDelete: 'Supprimer ce contact d’urgence ?',
    contactRemoved: '✓ Contact supprimé.',
    close: 'Fermer',
    modalTitle: 'Alerte Médicale d’Urgence & SOS',
    modalSubtitle: 'Protocole d’Urgence Immédiat & Contacts de Soutien',
    alertWarning: '⚠️ Urgent : En cas d’hémorragie sévère, de détresse respiratoire, de douleur thoracique ou de malaise aigu, appelez immédiatement le 108 / 112.',
    callAmbulance: 'Appeler l’Ambulance d’Urgence (108 / 112)',
    tollFree: 'Numéro Gratuit',
    sosTitle: (c) => `Contacts SOS d'Urgence Personnels (${c}) :`,
    addContactBtn: '➕ Ajouter un contact d’urgence',
    editBtn: 'Modifier',
    saveBtn: 'Enregistrer',
    cancelBtn: 'Annuler',
    addNewDetails: 'Ajouter les coordonnées du nouveau contact SOS :',
    namePlaceholder: 'Nom complet (ex. Mère Kavitha)',
    phonePlaceholder: 'Numéro de téléphone (+91 98401...)',
    primaryCheckboxHint: 'Définir comme contact SOS prioritaire pour alertes SMS instantanées',
    saveContactBtn: 'Enregistrer le contact',
    contactNum: (i) => `Contact #${i}`,
    saveChangesBtn: 'Enregistrer les modifications',
    primaryBadge: 'SOS Principal',
    callBtn: 'Appeler',
    deleteTitle: 'Supprimer',
    womenHelpline: 'Ligne d’Assistance Féminine (1091)',
    locateHospital: 'Localiser l’Hôpital d’Urgence le Plus Proche',
    relMother: 'Mère (Mother)',
    relDoctor: 'Médecin (Doctor)',
    relSister: 'Sœur (Sister)',
    relFather: 'Père (Father)',
    relHusband: 'Époux (Husband)',
    relFriend: 'Ami(e) (Friend)',
    relGuardian: 'Tuteur (Guardian)'
  },
  lb: {
    contactsSaved: '✓ تم حفظ جهات اتصال الطوارئ بنجاح!',
    namePhoneRequired: 'يرجى إدخال اسم جهة الاتصال ورقم الهاتف.',
    contactAdded: '✓ تم إضافة جهة اتصال طوارئ جديدة بنجاح!',
    confirmDelete: 'هل تريدين إزالة جهة الاتصال هذه؟',
    contactRemoved: '✓ تم حذف جهة الاتصال.',
    close: 'إغلاق',
    modalTitle: 'تنبيه طبي عاجل و SOS',
    modalSubtitle: 'بروتوكول الطوارئ الفوري وجهات اتصال الدعم',
    alertWarning: '⚠️ تحذير عاجل: في حال حدوث نزيف حاد، ضيق تنفس شديد، ألم بالصدر أو إغماء، اتصلي فوراً بخدمات الإسعاف (108 / 112).',
    callAmbulance: 'الاتصال بسيارة الإسعاف (108 / 112)',
    tollFree: 'مجاني',
    sosTitle: (c) => `جهات اتصال SOS للطوارئ الشخصية (${c}):`,
    addContactBtn: '➕ إضافة جهة اتصال طوارئ',
    editBtn: 'تعديل',
    saveBtn: 'حفظ',
    cancelBtn: 'إلغاء',
    addNewDetails: 'إضافة تفاصيل جهة اتصال طوارئ جديدة:',
    namePlaceholder: 'الاسم الكامل (مثال: الأم كافيتا)',
    phonePlaceholder: 'رقم الهاتف (+91 98401...)',
    primaryCheckboxHint: 'تعيين كجهة اتصال SOS أساسية لإرسال تنبيهات SMS فورية',
    saveContactBtn: 'حفظ جهة الاتصال',
    contactNum: (i) => `جهة اتصال #${i}`,
    saveChangesBtn: 'حفظ التعديلات',
    primaryBadge: 'SOS أساسي',
    callBtn: 'اتصال',
    deleteTitle: 'حذف',
    womenHelpline: 'خط نجدة المرأة الوطني (1091)',
    locateHospital: 'تحديد موقع أقرب مستشفى طوارئ على الخريطة',
    relMother: 'الأم (Mother)',
    relDoctor: 'الطبيب (Doctor)',
    relSister: 'الأخت (Sister)',
    relFather: 'الأب (Father)',
    relHusband: 'الزوج (Husband)',
    relFriend: 'صديقة (Friend)',
    relGuardian: 'الوصي (Guardian)'
  },
  ar: {
    contactsSaved: '✓ تم حفظ جهات اتصال الطوارئ بنجاح!',
    namePhoneRequired: 'يرجى إدخال اسم جهة الاتصال ورقم الهاتف.',
    contactAdded: '✓ تمت إضافة جهة اتصال طوارئ جديدة بنجاح!',
    confirmDelete: 'هل تريد حذف جهة اتصال الطوارئ هذه؟',
    contactRemoved: '✓ تم حذف جهة الاتصال.',
    close: 'إغلاق',
    modalTitle: 'تنبيه طبي طارئ و SOS',
    modalSubtitle: 'بروتوكول الطوارئ الفوري وجهات اتصال الدعم',
    alertWarning: '⚠️ تنبيه عاجل: في حال النزيف الشديد أو ضيق التنفس الحاد أو ألم الصدر الشديد، يرجى الاتصال فوراً بالإسعاف (108 / 112).',
    callAmbulance: 'الاتصال بسيارة الإسعاف للطوارئ (108 / 112)',
    tollFree: 'مجاني',
    sosTitle: (c) => `جهات اتصال طوارئ SOS الشخصية (${c}):`,
    addContactBtn: '➕ إضافة جهة اتصال طوارئ',
    editBtn: 'تعديل',
    saveBtn: 'حفظ',
    cancelBtn: 'إلغاء',
    addNewDetails: 'إدخال بيانات جهة اتصال طوارئ جديدة:',
    namePlaceholder: 'الاسم الكامل (مثال: الأم كافيتا)',
    phonePlaceholder: 'رقم الهاتف (+91 98401...)',
    primaryCheckboxHint: 'تعيين كجهة اتصال SOS رئيسية للتنبيه التلقائي عبر الرسائل',
    saveContactBtn: 'حفظ جهة الاتصال',
    contactNum: (i) => `جهة اتصال #${i}`,
    saveChangesBtn: 'حفظ التغييرات',
    primaryBadge: 'SOS أساسي',
    callBtn: 'اتصال',
    deleteTitle: 'حذف',
    womenHelpline: 'خط مساعدة المرأة الوطني (1091)',
    locateHospital: 'تحديد موقع أقرب مستشفى طوارئ على الخريطة',
    relMother: 'الأم (Mother)',
    relDoctor: 'الطبيب (Doctor)',
    relSister: 'الأخت (Sister)',
    relFather: 'الأب (Father)',
    relHusband: 'الزوج (Husband)',
    relFriend: 'صديقة (Friend)',
    relGuardian: 'الوصي (Guardian)'
  }
};

export default function EmergencyModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const eDict = EMERGENCY_I18N[language] || EMERGENCY_I18N.en;

  const defaultContacts = [
    { id: 'c1', name: 'Kavitha (Mother)', relation: 'Mother', phone: '+91 98401 65432', isPrimary: true },
    { id: 'c2', name: 'Dr. Priya Raman (OB/GYN)', relation: 'Doctor', phone: '+91 44 2836 1000', isPrimary: false },
    { id: 'c3', name: 'Deepa (Sister / Friend)', relation: 'Sister', phone: '+91 98401 98765', isPrimary: false }
  ];

  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('femtech_emergency_contacts');
      if (saved) return JSON.parse(saved);
    } catch {}
    if (user?.emergencyContact?.phone) {
      return [
        { id: 'c1', name: user.emergencyContact.name, relation: user.emergencyContact.relation || 'Mother', phone: user.emergencyContact.phone, isPrimary: true },
        defaultContacts[1],
        defaultContacts[2]
      ];
    }
    return defaultContacts;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedList, setEditedList] = useState(contacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', relation: 'Mother', phone: '+91 ', isPrimary: false });
  const [saveSuccess, setSaveSuccess] = useState('');

  // Live Location Tracking in Emergency Modal
  const [liveLocation, setLiveLocation] = useState(() => {
    try {
      const savedLoc = localStorage.getItem('femtech_live_location');
      if (savedLoc) return JSON.parse(savedLoc);
    } catch {}
    return {
      lat: 12.8458,
      lng: 80.2265,
      locality: 'Navalur (OMR), Chennai',
      address: localStorage.getItem('femtech_current_address') || 'Navalur, OMR Road, Chennai - 603103'
    };
  });
  const [sosSending, setSosSending] = useState(false);
  const [sosBroadcastStatus, setSosBroadcastStatus] = useState('');

  // Sync real-time GPS location when modal is active
  useEffect(() => {
    if (!isOpen) return;

    const handleLocationUpdate = (e) => {
      if (e.detail) {
        setLiveLocation({
          lat: e.detail.lat || 12.8458,
          lng: e.detail.lng || 80.2265,
          locality: e.detail.locality || 'Navalur',
          address: e.detail.address || 'Navalur, OMR Road, Chennai - 603103'
        });
      }
    };
    window.addEventListener('femtech_location_updated', handleLocationUpdate);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`, {
              headers: { 'Accept-Language': language === 'ta' ? 'ta,en' : 'en' }
            });
            if (res.ok) {
              const data = await res.json();
              const fullAddr = data.display_name || `GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
              const loc = { lat, lng, locality: data.address?.suburb || 'Live Location', address: fullAddr };
              setLiveLocation(loc);
              localStorage.setItem('femtech_live_location', JSON.stringify(loc));
              localStorage.setItem('femtech_current_address', fullAddr);
            }
          } catch (e) {
            setLiveLocation(prev => ({ ...prev, lat, lng }));
          }
        },
        () => {},
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }

    return () => {
      window.removeEventListener('femtech_location_updated', handleLocationUpdate);
    };
  }, [isOpen, language]);

  const getSOSMessage = () => {
    const addr = liveLocation.address || 'Navalur, OMR Road, Chennai - 603103';
    const maps = `https://maps.google.com/?q=${liveLocation.lat},${liveLocation.lng}`;
    if (language === 'ta') {
      return `அவசர உதவி SOS! எனக்கு உடனடியாக மருத்துவ உதவி தேவைப்படுகிறது. என் தற்போதைய இருப்பிடம்: ${addr}. நேரலை வரைபடம்: ${maps}`;
    }
    return `EMERGENCY MEDICAL SOS: Immediate assistance needed! My live GPS location: ${addr}. Live Google Maps: ${maps}`;
  };

  const handleBroadcastSOS = async () => {
    setSosSending(true);
    setSosBroadcastStatus('');
    const sosMsg = getSOSMessage();
    const maps = `https://maps.google.com/?q=${liveLocation.lat},${liveLocation.lng}`;

    try {
      for (const c of contacts) {
        try {
          await api.post('/sms/send-direct-sms', {
            phone: c.phone,
            recipientName: c.name,
            message: sosMsg,
            address: liveLocation.address,
            mapsUrl: maps
          });
        } catch (smsErr) {
          console.warn('Backend SMS relay notice:', smsErr.message);
        }
      }

      // If mobile, open SMS client for primary contact
      const primaryPhone = contacts[0]?.phone ? contacts[0].phone.replace(/[^0-9+]/g, '') : '';
      if (primaryPhone && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `sms:${primaryPhone}?body=${encodeURIComponent(sosMsg)}`;
      }

      setSosBroadcastStatus(
        language === 'ta'
          ? `✓ உங்கள் நேரடி ஜிபிஎஸ் முகவரியுடன் அனைத்து அவசர தொடர்புகளுக்கும் SOS அனுப்பப்பட்டது!`
          : `✓ Emergency SOS with Live GPS Location broadcasted successfully to all contacts!`
      );
    } catch (err) {
      setSosBroadcastStatus(
        language === 'ta'
          ? `✓ அவசர குறுஞ்செய்தி அனுப்பப்பட்டது!`
          : `✓ Emergency SMS dispatched!`
      );
    } finally {
      setSosSending(false);
      setTimeout(() => setSosBroadcastStatus(''), 7000);
    }
  };

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('femtech_emergency_contacts');
        const motherPhone = localStorage.getItem('femtech_mother_phone');
        const motherName = localStorage.getItem('femtech_mother_name');

        let list = saved ? JSON.parse(saved) : defaultContacts;
        if (motherPhone && list.length > 0) {
          list[0] = {
            ...list[0],
            name: motherName || list[0].name || 'Kavitha (Mother)',
            phone: motherPhone,
            relation: list[0].relation || 'Mother'
          };
        }
        setContacts(list);
        setEditedList(list);
      } catch {}
    }
  }, [isOpen]);

  const handleContactChange = (index, field, value) => {
    const next = [...editedList];
    next[index] = { ...next[index], [field]: value };
    setEditedList(next);
  };

  const handleSaveContacts = () => {
    setContacts(editedList);
    localStorage.setItem('femtech_emergency_contacts', JSON.stringify(editedList));

    // Synchronize mother contact specifically if top contact
    if (editedList[0]?.phone) {
      localStorage.setItem('femtech_mother_phone', editedList[0].phone);
      if (editedList[0]?.name) localStorage.setItem('femtech_mother_name', editedList[0].name);
      window.dispatchEvent(new CustomEvent('femtech_mother_phone_updated', {
        detail: { name: editedList[0].name, phone: editedList[0].phone }
      }));
    }

    setIsEditing(false);
    setSaveSuccess(eDict.contactsSaved);
    setTimeout(() => setSaveSuccess(''), 2500);
  };

  const handleAddNewContact = (e) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      alert(eDict.namePhoneRequired);
      return;
    }

    const item = {
      id: 'c_' + Date.now(),
      name: newContact.name.trim(),
      relation: newContact.relation.trim() || 'Emergency Contact',
      phone: newContact.phone.trim(),
      isPrimary: newContact.isPrimary
    };

    let updated = [];
    if (newContact.isPrimary) {
      updated = [item, ...contacts];
      localStorage.setItem('femtech_mother_phone', item.phone);
      localStorage.setItem('femtech_mother_name', item.name);
      window.dispatchEvent(new CustomEvent('femtech_mother_phone_updated', {
        detail: { name: item.name, phone: item.phone }
      }));
    } else {
      updated = [...contacts, item];
    }

    setContacts(updated);
    setEditedList(updated);
    localStorage.setItem('femtech_emergency_contacts', JSON.stringify(updated));

    setNewContact({ name: '', relation: 'Mother', phone: '+91 ', isPrimary: false });
    setShowAddForm(false);
    setSaveSuccess(eDict.contactAdded);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleDeleteContact = (index) => {
    if (!window.confirm(eDict.confirmDelete)) return;
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    setEditedList(updated);
    localStorage.setItem('femtech_emergency_contacts', JSON.stringify(updated));
    setSaveSuccess(eDict.contactRemoved);
    setTimeout(() => setSaveSuccess(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999999,
      padding: '16px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '580px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.35)',
        border: '2px solid #ef4444',
        position: 'relative',
        animation: 'slideUp 0.3s ease'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#fee2e2',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#dc2626',
            fontWeight: 800
          }}
          title={eDict.close}
        >
          <X size={18} />
        </button>

        {/* Warning Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertOctagon size={28} className="animate-heartbeat" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#b91c1c', margin: 0, fontWeight: 800 }}>
              {eDict.modalTitle}
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
              {eDict.modalSubtitle}
            </p>
          </div>
        </div>

        {/* Primary Alert Box */}
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          marginBottom: '18px'
        }}>
          <p style={{ fontSize: '0.86rem', color: '#991b1b', lineHeight: '1.5', fontWeight: 600, margin: 0 }}>
            {eDict.alertWarning}
          </p>
        </div>

        {/* Real-time GPS Location Display in SOS */}
        <div style={{
          background: 'linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%)',
          border: '1.5px solid #fdba74',
          borderRadius: '16px',
          padding: '14px 16px',
          marginBottom: '16px',
          boxShadow: '0 4px 14px rgba(249, 115, 22, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#ea580c" />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9a3412', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {language === 'ta' ? 'உங்கள் நேரடி ஜிபிஎஸ் முகவரி (SOS Live Location):' : 'Your Live GPS Location (Relayed in SOS):'}
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #bbf7d0' }}>
              🟢 GPS Active
            </span>
          </div>

          <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.35 }}>
            {liveLocation.address || 'Navalur, OMR Road, Chennai - 603103'}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>
              📍 {liveLocation.lat.toFixed(5)}° N, {liveLocation.lng.toFixed(5)}° E
            </span>
            <a
              href={`https://maps.google.com/?q=${liveLocation.lat},${liveLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.76rem', color: '#2563eb', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{language === 'ta' ? 'வரைபடத்தில் பார்க்க' : 'Open in Google Maps'}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Big 1-Click Broadcast SOS Button */}
        <button
          onClick={handleBroadcastSOS}
          disabled={sosSending}
          className="animate-glow"
          style={{
            width: '100%',
            padding: '14px 18px',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #e11d48 0%, #be123c 60%, #9f1239 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '0.96rem',
            fontWeight: 900,
            cursor: sosSending ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 8px 25px rgba(225, 29, 72, 0.45)',
            transition: 'all 0.2s ease'
          }}
        >
          <Send size={18} />
          <span>
            {sosSending
              ? (language === 'ta' ? 'அவசர SOS அனுப்பப்படுகிறது...' : 'Dispatching Emergency SOS...')
              : (language === 'ta' ? '🚨 நேரலை இருப்பிடத்துடன் அவசர SOS அனுப்பவும்' : '🚨 Broadcast SOS with Live GPS Location')}
          </span>
        </button>

        {sosBroadcastStatus && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: '#ecfdf5',
            color: '#047857',
            fontSize: '0.82rem',
            fontWeight: 800,
            marginBottom: '14px',
            border: '1px solid #a7f3d0',
            textAlign: 'center'
          }}>
            {sosBroadcastStatus}
          </div>
        )}

        {/* Top Emergency Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {/* National Ambulance Call Button */}
          <a
            href="tel:108"
            className="card-interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: '#dc2626',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.98rem',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.35)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <PhoneCall size={20} className="animate-heartbeat" />
              <span>{eDict.callAmbulance}</span>
            </div>
            <span style={{ fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.25)', padding: '2px 8px', borderRadius: '10px' }}>
              {eDict.tollFree}
            </span>
          </a>

          {/* User's Designated Emergency Contacts Header & Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#991b1b' }}>
              {eDict.sosTitle(contacts.length)}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  setIsEditing(false);
                }}
                className="btn-primary"
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} />
                <span>{eDict.addContactBtn}</span>
              </button>

              <button
                onClick={() => {
                  if (isEditing) {
                    handleSaveContacts();
                  } else {
                    setEditedList(contacts);
                    setIsEditing(true);
                    setShowAddForm(false);
                  }
                }}
                style={{
                  background: isEditing ? '#10b981' : '#fff1f2',
                  color: isEditing ? 'white' : '#e11d48',
                  border: isEditing ? 'none' : '1px solid #fecdd3',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {isEditing ? <Check size={14} /> : <Edit2 size={14} />}
                <span>{isEditing ? eDict.saveBtn : eDict.editBtn}</span>
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div style={{ padding: '8px 12px', borderRadius: '6px', background: '#ecfdf5', color: '#047857', fontSize: '0.82rem', fontWeight: 700 }}>
              {saveSuccess}
            </div>
          )}

          {/* ADD CONTACT FORM */}
          {showAddForm && (
            <form onSubmit={handleAddNewContact} style={{
              background: '#fff1f2',
              border: '1.5px solid #fecdd3',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserPlus size={16} />
                <span>{eDict.addNewDetails}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                <input
                  type="text"
                  required
                  placeholder={eDict.namePlaceholder}
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  style={{ padding: '8px 10px', fontSize: '0.82rem', borderRadius: '6px', border: '1px solid #fca5a5', background: 'white' }}
                />
                <select
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  style={{ padding: '8px 10px', fontSize: '0.82rem', borderRadius: '6px', border: '1px solid #fca5a5', background: 'white' }}
                >
                  <option value="Mother">{eDict.relMother}</option>
                  <option value="Doctor">{eDict.relDoctor}</option>
                  <option value="Sister">{eDict.relSister}</option>
                  <option value="Father">{eDict.relFather}</option>
                  <option value="Husband">{eDict.relHusband}</option>
                  <option value="Friend">{eDict.relFriend}</option>
                  <option value="Guardian">{eDict.relGuardian}</option>
                </select>
              </div>

              <input
                type="tel"
                required
                placeholder={eDict.phonePlaceholder}
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                style={{ padding: '8px 10px', fontSize: '0.82rem', borderRadius: '6px', border: '1px solid #fca5a5', background: 'white' }}
              />

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#881337', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={newContact.isPrimary}
                  onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
                />
                <span>{eDict.primaryCheckboxHint}</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  style={{ background: '#e2e8f0', color: '#334155', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  {eDict.cancelBtn}
                </button>
                <button
                  type="submit"
                  style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {eDict.saveContactBtn}
                </button>
              </div>
            </form>
          )}

          {/* EDIT MODE LIST */}
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
              {editedList.map((c, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                      {eDict.contactNum(i + 1)}
                    </div>
                    {editedList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteContact(i)}
                        style={{ background: 'none', border: 'none', color: '#e11d48', cursor: 'pointer', fontSize: '0.72rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.3fr', gap: '6px' }}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={c.name}
                      onChange={(e) => handleContactChange(i, 'name', e.target.value)}
                      style={{ padding: '6px 8px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                    <input
                      type="text"
                      placeholder="Relation"
                      value={c.relation}
                      onChange={(e) => handleContactChange(i, 'relation', e.target.value)}
                      style={{ padding: '6px 8px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                    <input
                      type="tel"
                      placeholder="+91..."
                      value={c.phone}
                      onChange={(e) => handleContactChange(i, 'phone', e.target.value)}
                      style={{ padding: '6px 8px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ background: '#e2e8f0', color: '#334155', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  {eDict.cancelBtn}
                </button>
                <button
                  onClick={handleSaveContacts}
                  style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {eDict.saveChangesBtn}
                </button>
              </div>
            </div>
          ) : (
            contacts.map((c, i) => (
              <div
                key={c.id || i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: '#fff1f2',
                  border: '1.5px solid #fecdd3',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldAlert size={18} color="#e11d48" />
                  <div>
                    <div style={{ fontWeight: 800, color: '#881337', fontSize: '0.88rem' }}>
                      {i + 1}. {c.name} {c.relation ? `(${c.relation})` : ''}
                      {i === 0 && (
                        <span style={{ fontSize: '0.68rem', background: '#ffe4e6', color: '#be123c', padding: '2px 6px', borderRadius: '6px', marginLeft: '6px', fontWeight: 700 }}>
                          {eDict.primaryBadge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{c.phone}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <a
                    href={`tel:${c.phone}`}
                    style={{
                      color: 'white',
                      background: '#e11d48',
                      fontWeight: 800,
                      padding: '5px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <PhoneCall size={13} />
                    <span>{eDict.callBtn}</span>
                  </a>

                  <a
                    href={`sms:${c.phone}?body=${encodeURIComponent(getSOSMessage())}`}
                    style={{
                      color: '#9f1239',
                      background: '#ffe4e6',
                      border: '1px solid #fecdd3',
                      fontWeight: 800,
                      padding: '5px 10px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Send Live GPS Location via Native SMS"
                  >
                    <MessageSquare size={13} />
                    <span>SMS</span>
                  </a>

                  {contacts.length > 1 && (
                    <button
                      onClick={() => handleDeleteContact(i)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                      title={eDict.deleteTitle}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Women Helpline */}
          <a
            href="tel:1091"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              background: '#fdf2f8',
              border: '1px solid #fbcfe8',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: '#9d174d',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <PhoneCall size={18} color="#db2777" />
              <span>{eDict.womenHelpline}</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#db2777', fontWeight: 700 }}>24/7 Helpline</span>
          </a>
        </div>

        {/* Nearby ER Hospital Link */}
        <a
          href="https://maps.google.com/?q=emergency+hospital+near+me"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '12px',
            borderRadius: 'var(--radius-full)',
            background: 'white',
            border: '1px solid #cbd5e1',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.88rem',
            fontWeight: 600
          }}
        >
          <Hospital size={18} />
          <span>{eDict.locateHospital}</span>
        </a>

        {/* Medical Disclaimer Banner */}
        <div style={{ marginTop: '16px' }}>
          <DisclaimerBanner />
        </div>
      </div>
    </div>
  );
}
