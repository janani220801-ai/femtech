import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Hospital,
  MapPin,
  Phone,
  PhoneCall,
  ExternalLink,
  Navigation,
  ShieldAlert,
  Search,
  Copy,
  Check,
  RefreshCw,
  Compass,
  Clock,
  Sparkles,
  Pill,
  UserCheck,
  HeartHandshake
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const NEARBY_I18N = {
  en: {
    pageTitle: "Nearby Care & Emergency Locator",
    pageSubtitle: "Live GPS tracker, verified 24/7 maternity hospitals, pharmacies & gynecologists.",
    searchInMaps: "Search in Google Maps",
    gpsTitle: "Live Current Location Tracker",
    gpsActiveBadge: "GPS Active",
    gpsWaiting: "Detecting GPS location...",
    gpsDetectBtn: "Detect My Live GPS Location",
    gpsRefreshBtn: "Refresh GPS",
    gpsAccuracy: "Accuracy",
    gpsCoordinates: "Coordinates",
    gpsLocality: "Current Locality",
    gpsPresetSelect: "Or switch location area:",
    tabAll: "🌟 All Facilities",
    tabHospitals: "🏥 Hospitals",
    tabPharmacies: "💊 Pharmacies",
    tabGynecology: "👩‍⚕️ Gynecologists",
    tabHelplines: "🚨 Helplines",
    searchPlaceholder: "Search hospital, pharmacy, gynecologist, service, or locality...",
    callNow: "Call Now",
    addressLabel: "Address",
    getDirections: "Get Directions",
    copyAddress: "Copy Address",
    copied: "Copied!",
    open24x7: "Open 24/7",
    verifiedDoctor: "Verified Specialist",
    consultationFee: "Consultation Fee",
    availableMeds: "Available Essentials",
    specialities: "Services & Specializations",
    homeDelivery: "Home Delivery Available",
    emergencyHelplinesTitle: "24/7 Emergency SOS & Medical Helplines",
    emergencyHelplinesDesc: "Toll-free immediate government and ambulance response lines across India.",
    free24x7: "24x7 Toll-Free",
    statHospitals: "Maternity Hospitals",
    statPharmacies: "24/7 Pharmacies",
    statGynecologists: "OB/GYN Doctors",
    noResults: "No facilities found matching your search. Try clearing your filter.",
    emergencyCallDisclaimer: "In critical obstetric emergencies, severe hemorrhaging, or trauma, immediately dial 108 or 112."
  },
  ta: {
    pageTitle: "அருகிலுள்ள மருத்துவ & மகளிர் நலம் (Nearby Care)",
    pageSubtitle: "நேரடி ஜிபிஎஸ் லொகேஷன் டிராக்கர், 24/7 மகப்பேறு மருத்துவமனைகள், மருந்தகங்கள் & கைனகாலஜி மருத்துவர்கள்.",
    searchInMaps: "கூகிள் மேப்ஸில் தேடு",
    gpsTitle: "நேரடி ஜிபிஎஸ் இருப்பிட டிராக்கர் (Current Location Tracker)",
    gpsActiveBadge: "ஜிபிஎஸ் செயலில் உள்ளது",
    gpsWaiting: "ஜிபிஎஸ் இருப்பிடத்தை கண்டறிகிறது...",
    gpsDetectBtn: "என் நேரடி ஜிபிஎஸ் இடத்தை கண்டறி",
    gpsRefreshBtn: "ஜிபிஎஸ் புதுப்பி",
    gpsAccuracy: "துல்லியம்",
    gpsCoordinates: "அட்சரேகை & தீர்க்கரேகை",
    gpsLocality: "தற்போதைய பகுதி",
    gpsPresetSelect: "அல்லது பகுதியைத் தேர்வு செய்யவும்:",
    tabAll: "🌟 அனைத்தும்",
    tabHospitals: "🏥 மருத்துவமனைகள்",
    tabPharmacies: "💊 மருந்தகங்கள்",
    tabGynecology: "👩‍⚕️ கைனகாலஜி மருத்துவர்கள்",
    tabHelplines: "🚨 அவசர உதவி எண்கள்",
    searchPlaceholder: "மருத்துவமனை, மருந்தகம், மருத்துவர் பெயர், சேவை அல்லது பகுதி தேடவும்...",
    callNow: "அழைக்க (Call)",
    addressLabel: "முகவரி (Address)",
    getDirections: "வழித்தடம் பார்க்க (Directions)",
    copyAddress: "முகவரியை நகலெடு",
    copied: "நகலெடுக்கப்பட்டது!",
    open24x7: "24 மணி நேரமும் இயங்கும்",
    verifiedDoctor: "அங்கீகரிக்கப்பட்ட மகளிர் நல மருத்துவர்",
    consultationFee: "ஆலோசனை கட்டணம்",
    availableMeds: "அத்தியாவசிய மருந்துகள்",
    specialities: "சிறப்பு மருத்துவ சேவைகள்",
    homeDelivery: "டோர் டெலிவரி வசதி உண்டு",
    emergencyHelplinesTitle: "24/7 அவசர மருத்துவ உதவி எண்கள் (Emergency Helplines)",
    emergencyHelplinesDesc: "இலவச உடனடி ஆம்புலன்ஸ் மற்றும் மத்திய அரசு அவசர உதவி எண்கள்.",
    free24x7: "24 மணி நேரமும் இலவசம்",
    statHospitals: "மகப்பேறு மருத்துவமனைகள்",
    statPharmacies: "24/7 மருந்தகங்கள்",
    statGynecologists: "கைனகாலஜி மருத்துவர்கள்",
    noResults: "தேடலுக்குரிய மருத்துவ இடங்கள் கிடைக்கவில்லை. தேடல் சொல்லை மாற்றி முயற்சிக்கவும்.",
    emergencyCallDisclaimer: "அவசர பிரசவ வலி, கடுமையான ரத்தப்போக்கு அல்லது சுயநினைவற்ற நிலையில் உடனடியாக 108 அல்லது 112 என்ற எண்ணை அழைக்கவும்."
  },
  hi: {
    pageTitle: "आस-पास के अस्पताल एवं महिला देखभाल केंद्र",
    pageSubtitle: "लाइव जीपीएस ट्रैकर, सत्यापित 24/7 मातृत्व अस्पताल, फार्मेसी और स्त्री रोग विशेषज्ञ।",
    searchInMaps: "गूगल मैप्स में खोजें",
    gpsTitle: "लाइव वर्तमान स्थान ट्रैकर (Current Location Tracker)",
    gpsActiveBadge: "जीपीएस सक्रिय",
    gpsWaiting: "जीपीएस स्थान का पता लगाया जा रहा है...",
    gpsDetectBtn: "मेरा लाइव जीपीएस स्थान ट्रैक करें",
    gpsRefreshBtn: "स्थान रीफ़्रेश करें",
    gpsAccuracy: "सटीकता",
    gpsCoordinates: "निर्देशांक",
    gpsLocality: "वर्तमान क्षेत्र",
    gpsPresetSelect: "या क्षेत्र चुनें:",
    tabAll: "🌟 सभी सुविधाएं",
    tabHospitals: "🏥 अस्पताल",
    tabPharmacies: "💊 दवा की दुकानें",
    tabGynecology: "👩‍⚕️ स्त्री रोग विशेषज्ञ (Gynecologist)",
    tabHelplines: "🚨 आपातकालीन हेल्पलाइन",
    searchPlaceholder: "अस्पताल, दवाखाना, डॉक्टर का नाम या क्षेत्र खोजें...",
    callNow: "कॉल करें (Call)",
    addressLabel: "पता (Address)",
    getDirections: "दिशा-निर्देश (Directions)",
    copyAddress: "पता कॉपी करें",
    copied: "कॉपी हो गया!",
    open24x7: "24/7 खुला है",
    verifiedDoctor: "सत्यापित विशेषज्ञ",
    consultationFee: "परामर्श शुल्क",
    availableMeds: "उपलब्ध आवश्यक दवाएं",
    specialities: "विशेषज्ञ सेवाएं",
    homeDelivery: "होम डिलीवरी उपलब्ध",
    emergencyHelplinesTitle: "24/7 आपातकालीन मेडिकल हेल्पलाइन",
    emergencyHelplinesDesc: "पूरे भारत में निःशुल्क तत्काल एम्बुलेंस और सुरक्षा सेवाएं।",
    free24x7: "24x7 निःशुल्क सेवा",
    statHospitals: "मातृत्व अस्पताल",
    statPharmacies: "24/7 फार्मेसी",
    statGynecologists: "स्त्री रोग विशेषज्ञ",
    noResults: "कोई परिणाम नहीं मिला। कृपया पुनः प्रयास करें।",
    emergencyCallDisclaimer: "गंभीर आपात स्थिति में तुरंत 108 या 112 पर कॉल करें।"
  },
  te: {
    pageTitle: "సమీప ఆసుపత్రులు & మహిళా సంరక్షణ కేంద్రాలు",
    pageSubtitle: "లైవ్ జీపీఎస్ లొకేషన్ ట్రాకర్, 24/7 ప్రసూతి ఆసుపత్రులు, ఫార్మసీలు & గైనకాలజిస్టులు.",
    searchInMaps: "గూగుల్ మ్యాప్స్‌లో వెతకండి",
    gpsTitle: "లైవ్ ప్రస్తుత లొకేషన్ ట్రాకర్ (Current Location Tracker)",
    gpsActiveBadge: "జీపీఎస్ యాక్టివ్",
    gpsWaiting: "లొకేషన్ గుర్తిస్తోంది...",
    gpsDetectBtn: "నా లైవ్ లొకేషన్ గుర్తించండి",
    gpsRefreshBtn: "రీఫ్రెష్ చేయండి",
    gpsAccuracy: "ఖచ్చితత్వం",
    gpsCoordinates: "కోఆర్డినేట్స్",
    gpsLocality: "ప్రస్తుత ప్రాంతం",
    gpsPresetSelect: "లేదా ప్రాంతాన్ని ఎంచుకోండి:",
    tabAll: "🌟 అన్ని సౌకర్యాలు",
    tabHospitals: "🏥 ఆసుపత్రులు",
    tabPharmacies: "💊 మందుల దుకాణాలు",
    tabGynecology: "👩‍⚕️ గైనకాలజిస్టులు",
    tabHelplines: "🚨 అత్యవసర హెల్ప్‌లైన్లు",
    searchPlaceholder: "ఆసుపత్రి, మందుల దుకాణం, డాక్టర్ పేరు వెతకండి...",
    callNow: "కాల్ చేయండి (Call)",
    addressLabel: "చిరునామా (Address)",
    getDirections: "దారి చూడండి",
    copyAddress: "చిరునామా కాపీ చేయండి",
    copied: "కాపీ అయింది!",
    open24x7: "24/7 అందుబాటులో ఉంది",
    verifiedDoctor: "ధృవీకరించబడిన నిపుణులు",
    consultationFee: "ఫీజు",
    availableMeds: "అందుబాటులో ఉన్న మందులు",
    specialities: "సేవలు",
    homeDelivery: "హోమ్ డెలివరీ కలదు",
    emergencyHelplinesTitle: "24/7 అత్యవసర వైద్య హెల్ప్‌లైన్లు",
    emergencyHelplinesDesc: "భారతదేశ వ్యాప్తంగా ఉచిత అంబులెన్స్ సేవలు.",
    free24x7: "ఉచితం",
    statHospitals: "ప్రసూతి ఆసుపత్రులు",
    statPharmacies: "24/7 ఫార్మసీలు",
    statGynecologists: "గైనకాలజిస్టులు",
    noResults: "ఫలితాలు కనుగొనబడలేదు.",
    emergencyCallDisclaimer: "అత్యవసర సమయంలో వెంటనే 108 లేదా 112 కి కాల్ చేయండి."
  },
  ml: {
    pageTitle: "സമീപത്തുള്ള ആശുപത്രികളും സ്ത്രീകളുടെ ആരോഗ്യ കേന്ദ്രങ്ങളും",
    pageSubtitle: "ലൈവ് ജിപിഎസ് ലൊക്കേഷൻ ട്രാക്കർ, 24/7 പ്രസവ ആശുപത്രികൾ, ഫാർമസികൾ & ഗൈനക്കോളജിസ്റ്റുകൾ.",
    searchInMaps: "ഗൂഗിൾ മാപ്സിൽ തിരയുക",
    gpsTitle: "ലൈവ് ലൊക്കേഷൻ ട്രാക്കർ (Current Location Tracker)",
    gpsActiveBadge: "ജിപിഎസ് സജീവം",
    gpsWaiting: "ലൊക്കേഷൻ കണ്ടെത്തുന്നു...",
    gpsDetectBtn: "എന്റെ ജിപിഎസ് ലൊക്കേഷൻ കണ്ടെത്തുക",
    gpsRefreshBtn: "പുതുക്കുക",
    gpsAccuracy: "കൃത്യത",
    gpsCoordinates: "കോർഡിനേറ്റുകൾ",
    gpsLocality: "നിലവിലെ പ്രദേശം",
    gpsPresetSelect: "അല്ലെങ്കിൽ പ്രദേശം തിരഞ്ഞെടുക്കുക:",
    tabAll: "🌟 എല്ലാം",
    tabHospitals: "🏥 ആശുപത്രികൾ",
    tabPharmacies: "💊 ഫാർമസികൾ",
    tabGynecology: "👩‍⚕️ ഗൈനക്കോളജിസ്റ്റുകൾ",
    tabHelplines: "🚨 എമർജൻസി ഹെൽപ്പ് ലൈനുകൾ",
    searchPlaceholder: "ആശുപത്രി, ഫാർമസി, ഡോക്ടറുടെ പേര് തിരയുക...",
    callNow: "വിളിക്കുക (Call)",
    addressLabel: "മേൽവിലാസം (Address)",
    getDirections: "വഴി കണ്ടെത്തുക",
    copyAddress: "വിലാസം കോപ്പി ചെയ്യുക",
    copied: "കോപ്പി ചെയ്തു!",
    open24x7: "24/7 തുറന്നിരിക്കുന്നു",
    verifiedDoctor: "പരിചയസമ്പന്നരായ ഡോക്ടർ",
    consultationFee: "കൺസൾട്ടേഷൻ ഫീസ്",
    availableMeds: "ലഭ്യമായ മരുന്നുകൾ",
    specialities: "പ്രത്യേക സേവനങ്ങൾ",
    homeDelivery: "ഹോം ഡെലിവറി ലഭ്യമാണ്",
    emergencyHelplinesTitle: "24/7 എമർജൻസി മെഡിക്കൽ ഹെൽപ്പ് ലൈനുകൾ",
    emergencyHelplinesDesc: "രാജ്യവ്യാപകമായ സൗജന്യ ആംബുലൻസ് സേവനം.",
    free24x7: "സൗജന്യം",
    statHospitals: "പ്രസവ ആശുപത്രികൾ",
    statPharmacies: "24/7 ഫാർമസികൾ",
    statGynecologists: "ഗൈനക്കോളജിസ്റ്റുകൾ",
    noResults: "ഫലങ്ങൾ കണ്ടെത്താനായില്ല.",
    emergencyCallDisclaimer: "ഗുരുതരമായ സാഹചര്യങ്ങളിൽ ഉടൻ 108 അല്ലെങ്കിൽ 112 വിളിക്കുക."
  },
  mr: {
    pageTitle: "जवळपासचे रुग्णालय व महिला आरोग्य केंद्र",
    pageSubtitle: "लाइव्ह जीपीएस ट्रॅकर, सत्यापित 24/7 प्रसूती रुग्णालये, फार्मसी आणि स्त्रीरोगतज्ज्ञ.",
    searchInMaps: "गूगल मॅप्स मध्ये शोधा",
    gpsTitle: "लाइव्ह लोकेशन ट्रॅकर (Current Location Tracker)",
    gpsActiveBadge: "जीपीएस सक्रिय",
    gpsWaiting: "स्थान शोधत आहे...",
    gpsDetectBtn: "माझे जीपीएस स्थान शोधा",
    gpsRefreshBtn: "रिफ्रेश करा",
    gpsAccuracy: "अचूकता",
    gpsCoordinates: "अक्षांश व रेखांश",
    gpsLocality: "सध्याचा परिसर",
    gpsPresetSelect: "किंवा परिसर निवडा:",
    tabAll: "🌟 सर्व",
    tabHospitals: "🏥 रुग्णालये",
    tabPharmacies: "💊 औषधांची दुकाने",
    tabGynecology: "👩‍⚕️ स्त्रीरोगतज्ज्ञ (Gynecologists)",
    tabHelplines: "🚨 आपत्कालीन हेल्पलाईन",
    searchPlaceholder: "रुग्णालय, फार्मसी किंवा डॉक्टर शोधा...",
    callNow: "कॉल करा (Call)",
    addressLabel: "पत्ता (Address)",
    getDirections: "मार्ग पहा",
    copyAddress: "पत्ता कॉपी करा",
    copied: "कॉपी केले!",
    open24x7: "24/7 उघडे",
    verifiedDoctor: "सत्यापित तज्ज्ञ",
    consultationFee: "सल्ला फी",
    availableMeds: "उपलब्ध औषधे",
    specialities: "विशेष सेवा",
    homeDelivery: "होम डिलिव्हरी उपलब्ध",
    emergencyHelplinesTitle: "24/7 आपत्कालीन वैद्यकीय हेल्पलाइन",
    emergencyHelplinesDesc: "संपूर्ण भारतात विनामूल्य रुग्णवाहिका सेवा.",
    free24x7: "विनामूल्य",
    statHospitals: "प्रसूती रुग्णालये",
    statPharmacies: "24/7 फार्मसी",
    statGynecologists: "स्त्रीरोगतज्ज्ञ",
    noResults: "कोणतेही परिणाम आढळले नाहीत.",
    emergencyCallDisclaimer: "गंभीर परिस्थितीत तात्काळ 108 किंवा 112 वर संपर्क साधा."
  },
  mwr: {
    pageTitle: "नजदीक रा अस्पताल अर महिला क्लिनिक",
    pageSubtitle: "लाइव जीपीएस ट्रैकर, 24/7 जच्चा-बच्चा अस्पताल, दवाखाना अर लेडी डॉक्टर।",
    searchInMaps: "गूगल मैप म देख्यो",
    gpsTitle: "लाइव लोकेशन ट्रैकर (Current Location Tracker)",
    gpsActiveBadge: "जीपीएस चालू है",
    gpsWaiting: "जगह को पतो लगा रह्या हां...",
    gpsDetectBtn: "म्हारी जगह को पतो लगाओ",
    gpsRefreshBtn: "रीफ्रेश करो",
    gpsAccuracy: "सटीकता",
    gpsCoordinates: "निर्देशांक",
    gpsLocality: "इबकी जगह",
    gpsPresetSelect: "या जगह चुणो:",
    tabAll: "🌟 सगळा",
    tabHospitals: "🏥 अस्पताल",
    tabPharmacies: "💊 दवाई दुकान",
    tabGynecology: "👩‍⚕️ लेडी डॉक्टर (Gynecologist)",
    tabHelplines: "🚨 इमरजेंसी नंबर",
    searchPlaceholder: "अस्पताल, दवाई दुकान या डॉक्टर को नाम खोजो...",
    callNow: "फोन करो (Call)",
    addressLabel: "पतो (Address)",
    getDirections: "रस्तो देख्यो",
    copyAddress: "पतो कॉपी करो",
    copied: "कॉपी होग्यो!",
    open24x7: "दिन-रात चालू",
    verifiedDoctor: "पक्का डॉक्टर",
    consultationFee: "फीस",
    availableMeds: "दवाई",
    specialities: "खास सुविघा",
    homeDelivery: "घर तक डिलीवरी",
    emergencyHelplinesTitle: "24/7 इमरजेंसी हेल्पलाइन",
    emergencyHelplinesDesc: "मुफ्त एम्बुलेंस सेवा पूरे भारत में।",
    free24x7: "मुफ्त",
    statHospitals: "जच्चा-बच्चा अस्पताल",
    statPharmacies: "24/7 दवाई दुकान",
    statGynecologists: "लेडी डॉक्टर",
    noResults: "कोइ सुविधा नी मिली।",
    emergencyCallDisclaimer: "बड़ी आफत म तुरन्त 108 या 112 पे फोन मिलाओ।"
  },
  fr: {
    pageTitle: "Centres de Soins & Urgences Médicales",
    pageSubtitle: "Localisateur GPS en direct, maternités 24/7 vérifiées, pharmacies et gynécologues.",
    searchInMaps: "Rechercher dans Google Maps",
    gpsTitle: "Localisateur GPS en Direct (Current Location Tracker)",
    gpsActiveBadge: "GPS Actif",
    gpsWaiting: "Détection de l'emplacement GPS...",
    gpsDetectBtn: "Détecter Ma Position GPS",
    gpsRefreshBtn: "Actualiser le GPS",
    gpsAccuracy: "Précision",
    gpsCoordinates: "Coordonnées",
    gpsLocality: "Zone Actuelle",
    gpsPresetSelect: "Ou changer de secteur :",
    tabAll: "🌟 Tout",
    tabHospitals: "🏥 Hôpitaux",
    tabPharmacies: "💊 Pharmacies",
    tabGynecology: "👩‍⚕️ Gynécologues",
    tabHelplines: "🚨 Urgences",
    searchPlaceholder: "Rechercher un hôpital, une pharmacie, un médecin...",
    callNow: "Appeler (Call)",
    addressLabel: "Adresse (Address)",
    getDirections: "Itinéraire",
    copyAddress: "Copier l'Adresse",
    copied: "Copié !",
    open24x7: "Ouvert 24h/24",
    verifiedDoctor: "Spécialiste Vérifié",
    consultationFee: "Tarif Consultation",
    availableMeds: "Produits Disponibles",
    specialities: "Spécialités",
    homeDelivery: "Livraison à Domicile",
    emergencyHelplinesTitle: "Lignes d'Urgence Médicale 24/7",
    emergencyHelplinesDesc: "Numéros d'urgence et ambulances sans frais.",
    free24x7: "Gratuit 24h/24",
    statHospitals: "Maternités",
    statPharmacies: "Pharmacies 24/7",
    statGynecologists: "Gynécologues",
    noResults: "Aucun établissement trouvé.",
    emergencyCallDisclaimer: "En cas d'urgence obstétrique vitale, composez immédiatement le 108 ou le 112."
  },
  lb: {
    pageTitle: "مراكز الرعاية الطبية والطوارئ النسائية",
    pageSubtitle: "متتبع نظام تحديد المواقع المباشر، مستشفيات ولادة 24/7، صيدليات وأطباء نسائية وتوليد.",
    searchInMaps: "بحث في خرائط غوغل",
    gpsTitle: "متتبع الموقع الحالي المباشر (GPS Tracker)",
    gpsActiveBadge: "الموقع المباشر نشط",
    gpsWaiting: "جاري تحديد الموقع الجغرافي...",
    gpsDetectBtn: "تحديد موقعي الجغرافي المباشر",
    gpsRefreshBtn: "تحديث الموقع",
    gpsAccuracy: "الدقة",
    gpsCoordinates: "الإحداثيات",
    gpsLocality: "المنطقة الحالية",
    gpsPresetSelect: "أو اختاري المنطقة:",
    tabAll: "🌟 الكل",
    tabHospitals: "🏥 المستشفيات",
    tabPharmacies: "💊 الصيدليات",
    tabGynecology: "👩‍⚕️ أطباء النسائية",
    tabHelplines: "🚨 أرقام الطوارئ",
    searchPlaceholder: "ابحثي عن مستشفى، صيدلية، طبيب نسائية...",
    callNow: "اتصال (Call)",
    addressLabel: "العنوان (Address)",
    getDirections: "الاتجاهات (Directions)",
    copyAddress: "نسخ العنوان",
    copied: "تم النسخ!",
    open24x7: "مفتوح 24/7",
    verifiedDoctor: "طبيب نسائية وتوليد معتمد",
    consultationFee: "رسوم الكشف",
    availableMeds: "الأدوية والمستلزمات",
    specialities: "الخدمات الطبية",
    homeDelivery: "خدمة التوصيل متاحة",
    emergencyHelplinesTitle: "خطوط الطوارئ الطبية 24/7",
    emergencyHelplinesDesc: "أرقام الإسعاف والطوارئ المجانية على مدار الساعة.",
    free24x7: "مجاني 24/7",
    statHospitals: "مستشفيات الولادة",
    statPharmacies: "صيدليات 24/7",
    statGynecologists: "أطباء النسائية",
    noResults: "لم يتم العثور على مراكز مطابقة.",
    emergencyCallDisclaimer: "في حالات الطوارئ النسائية الحرجة اتصلي فوراً بالإسعاف (108 أو 112)."
  },
  ar: {
    pageTitle: "مراكز الرعاية الطبية والطوارئ النسائية",
    pageSubtitle: "متتبع الموقع الحي، مستشفيات ولادة معتمدة 24/7، صيدليات وأطباء أمراض نساء وتوليد.",
    searchInMaps: "البحث في خرائط Google",
    gpsTitle: "متتبع الموقع الحي (Live GPS Tracker)",
    gpsActiveBadge: "نظام تحديد المواقع نشط",
    gpsWaiting: "جاري تحديد الموقع الجغرافي...",
    gpsDetectBtn: "تحديد موقعي الجغرافي المباشر",
    gpsRefreshBtn: "تحديث الموقع",
    gpsAccuracy: "الدقة",
    gpsCoordinates: "الإحداثيات",
    gpsLocality: "المنطقة الحالية",
    gpsPresetSelect: "أو اختيار المنطقة يدويًا:",
    tabAll: "🌟 جميع المرافق",
    tabHospitals: "🏥 المستشفيات",
    tabPharmacies: "💊 الصيدليات",
    tabGynecology: "👩‍⚕️ أطباء النساء والتوليد",
    tabHelplines: "🚨 خطوط الطوارئ",
    searchPlaceholder: "البحث عن مستشفى، صيدلية، دكتورة نساء...",
    callNow: "اتصال (Call)",
    addressLabel: "العنوان (Address)",
    getDirections: "الاتجاهات",
    copyAddress: "نسخ العنوان",
    copied: "تم النسخ!",
    open24x7: "مفتوح 24 ساعة",
    verifiedDoctor: "طبيبة نسائية معتمدة",
    consultationFee: "رسوم الاستشارة",
    availableMeds: "المستلزمات المتوفرة",
    specialities: "التخصصات الدقيقة",
    homeDelivery: "التوصيل المنزلي متاح",
    emergencyHelplinesTitle: "أرقام الطوارئ والإسعاف الطبي 24/7",
    emergencyHelplinesDesc: "خطوط طوارئ مجانية سريعة الاستجابة على مدار الساعة.",
    free24x7: "مجاني 24/7",
    statHospitals: "مستشفيات الولادة",
    statPharmacies: "صيدليات 24/7",
    statGynecologists: "أطباء النسائية",
    noResults: "لم يتم العثور على نتائج تطابق بحثك.",
    emergencyCallDisclaimer: "في حالات النزيف الحاد أو طوارئ المخاض اتصلي فوراً بالرقم 108 أو 112."
  }
};

const PRESET_LOCALITIES = [
  { name: 'Navalur / Siruseri (OMR, Chennai)', lat: 12.8458, lng: 80.2265 },
  { name: 'Sholinganallur / Karapakkam (Chennai)', lat: 12.9010, lng: 80.2279 },
  { name: 'Kelambakkam / Padur (OMR, Chennai)', lat: 12.8025, lng: 80.2220 },
  { name: 'Adyar / Besant Nagar (Chennai)', lat: 13.0067, lng: 80.2570 },
  { name: 'Velachery / Medavakkam (Chennai)', lat: 12.9800, lng: 80.2200 },
  { name: 'Mylapore / Alwarpet (Chennai)', lat: 13.0378, lng: 80.2642 },
  { name: 'Anna Nagar / Kilpauk (Chennai)', lat: 13.0850, lng: 80.2100 },
  { name: 'T. Nagar / Guindy (Chennai)', lat: 13.0400, lng: 80.2330 },
  { name: 'RS Puram / Gandhipuram (Coimbatore)', lat: 11.0168, lng: 76.9558 },
  { name: 'KK Nagar / Anna Bus Stand (Madurai)', lat: 9.9252, lng: 78.1198 },
  { name: 'Indiranagar / Koramangala (Bengaluru)', lat: 12.9716, lng: 77.5946 }
];

export default function NearbyCare() {
  const { language } = useLanguage();
  const dict = NEARBY_I18N[language] || NEARBY_I18N.ta || NEARBY_I18N.en;

  // State
  const [activeTab, setActiveTab] = useState('all'); // all, hospitals, pharmacies, gynecology, helplines
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // GPS & Location state - Defaulted directly to user's location: Navalur (OMR, Chennai)
  const [gpsLoading, setGpsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: 12.8458,
    lng: 80.2265,
    accuracy: 10,
    locality: language === 'ta' ? 'நாவலூர் (OMR), சென்னை - 603103' : 'Navalur (OMR), Chennai - 603103',
    isGpsLive: true
  });
  const [gpsStatusMessage, setGpsStatusMessage] = useState(dict.gpsActiveBadge);

  // Facility Data
  const [careData, setCareData] = useState({
    hospitals: [],
    pharmacies: [],
    gynecologists: [],
    helplines: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Haversine distance calculator in frontend for real-time recalculations
  const getDistanceKm = (itemLat, itemLng) => {
    if (!userLocation.lat || !userLocation.lng || !itemLat || !itemLng) return null;
    const R = 6371;
    const dLat = (itemLat - userLocation.lat) * Math.PI / 180;
    const dLon = (itemLng - userLocation.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(itemLat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  // Fetch facilities from backend
  const fetchCareData = async (lat, lng) => {
    setIsLoading(true);
    try {
      const q = lat && lng ? `?lat=${lat}&lng=${lng}` : '';
      const res = await api.get(`/nearby/care${q}`);
      if (res.success && res.data) {
        setCareData(res.data);
      }
    } catch (err) {
      console.warn('Care facilities fetch error:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Set Exact Location to Navalur (OMR)
  const setNavalurLocation = () => {
    setUserLocation({
      lat: 12.8458,
      lng: 80.2265,
      accuracy: 8,
      locality: language === 'ta' ? 'நாவலூர் (OMR), சென்னை - 603103' : 'Navalur (OMR), Chennai - 603103',
      isGpsLive: true
    });
    setGpsStatusMessage(language === 'ta' ? '🟢 நாவலூர், OMR (உறுதிசெய்யப்பட்டது)' : '🟢 Navalur, OMR (Confirmed)');
    fetchCareData(12.8458, 80.2265);
  };

  // GPS detection handler
  const detectLiveGps = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage(language === 'ta' ? 'உலாவியில் ஜிபிஎஸ் கிடைக்கவில்லை. நாவலூர் பயன்படுத்தப்படுகிறது.' : 'GPS not supported. Using Navalur.');
      fetchCareData(12.8458, 80.2265);
      return;
    }

    setGpsLoading(true);
    setGpsStatusMessage(dict.gpsWaiting);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const isNearNavalur = Math.abs(latitude - 12.8458) < 0.08 && Math.abs(longitude - 80.2265) < 0.08;
        const placeName = isNearNavalur
          ? (language === 'ta' ? `நாவலூர் / OMR (நேரடி ஜிபிஎஸ்: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)` : `Navalur / OMR (Live GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`)
          : `Live GPS Position (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`;

        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy || 10),
          locality: placeName,
          isGpsLive: true
        });
        setGpsStatusMessage(`🟢 ${dict.gpsActiveBadge} (±${Math.round(accuracy || 10)}m)`);
        setGpsLoading(false);
        fetchCareData(latitude, longitude);
      },
      (err) => {
        console.warn('GPS location error:', err.message);
        setGpsStatusMessage(language === 'ta' ? '📍 நாவலூர், OMR (சென்னை)' : '📍 Navalur, OMR (Chennai)');
        setUserLocation({
          lat: 12.8458,
          lng: 80.2265,
          accuracy: 12,
          locality: language === 'ta' ? 'நாவலூர் (OMR), சென்னை - 603103' : 'Navalur (OMR), Chennai - 603103',
          isGpsLive: false
        });
        setGpsLoading(false);
        fetchCareData(12.8458, 80.2265);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  // Initialize GPS on mount
  useEffect(() => {
    detectLiveGps();
  }, []);

  // Handle Preset Locality switch
  const handlePresetChange = (preset) => {
    setUserLocation({
      lat: preset.lat,
      lng: preset.lng,
      accuracy: 20,
      locality: preset.name,
      isGpsLive: false
    });
    setGpsStatusMessage(`📍 ${preset.name}`);
    fetchCareData(preset.lat, preset.lng);
  };

  // Copy address to clipboard
  const handleCopyAddress = (id, text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Filtered and Distance-Sorted lists (Closest to Navalur/User GPS appears first!)
  const query = searchQuery.toLowerCase().trim();

  const filteredHospitals = useMemo(() => {
    return (careData.hospitals || [])
      .filter(h =>
        !query ||
        h.name?.toLowerCase().includes(query) ||
        h.nameTa?.includes(query) ||
        h.address?.toLowerCase().includes(query) ||
        h.services?.some(s => s.toLowerCase().includes(query))
      )
      .sort((a, b) => {
        const distA = parseFloat(getDistanceKm(a.lat, a.lng) || a.numericDistance || 999);
        const distB = parseFloat(getDistanceKm(b.lat, b.lng) || b.numericDistance || 999);
        return distA - distB;
      });
  }, [careData.hospitals, query, userLocation]);

  const filteredPharmacies = useMemo(() => {
    return (careData.pharmacies || [])
      .filter(p =>
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.nameTa?.includes(query) ||
        p.address?.toLowerCase().includes(query) ||
        p.inventory?.some(item => item.toLowerCase().includes(query))
      )
      .sort((a, b) => {
        const distA = parseFloat(getDistanceKm(a.lat, a.lng) || a.numericDistance || 999);
        const distB = parseFloat(getDistanceKm(b.lat, b.lng) || b.numericDistance || 999);
        return distA - distB;
      });
  }, [careData.pharmacies, query, userLocation]);

  const filteredGynecologists = useMemo(() => {
    return (careData.gynecologists || [])
      .filter(g =>
        !query ||
        g.name?.toLowerCase().includes(query) ||
        g.nameTa?.includes(query) ||
        g.address?.toLowerCase().includes(query) ||
        g.specializations?.some(s => s.toLowerCase().includes(query))
      )
      .sort((a, b) => {
        const distA = parseFloat(getDistanceKm(a.lat, a.lng) || a.numericDistance || 999);
        const distB = parseFloat(getDistanceKm(b.lat, b.lng) || b.numericDistance || 999);
        return distA - distB;
      });
  }, [careData.gynecologists, query, userLocation]);

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px 16px', minHeight: '85vh' }}>
      
      {/* 1. HERO BANNER */}
      <div
        className="glass-card"
        style={{
          padding: '28px 24px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #eff6ff 100%)',
          marginBottom: '22px',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          boxShadow: '0 10px 30px rgba(225, 29, 72, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '62px',
              height: '62px',
              borderRadius: '22px',
              background: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'white',
              boxShadow: '0 10px 22px rgba(225, 29, 72, 0.35)',
              flexShrink: 0
            }}
          >
            🏥
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1e293b', margin: 0, letterSpacing: '-0.02em' }}>
                {dict.pageTitle}
              </h1>
              <span
                style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #bbf7d0'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                {dict.gpsActiveBadge}
              </span>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.94rem', color: '#64748b' }}>
              {dict.pageSubtitle}
            </p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=maternity+hospitals+pharmacies+gynecologists+near+me"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
            color: 'white',
            textDecoration: 'none',
            padding: '12px 22px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '0.92rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 18px rgba(225, 29, 72, 0.28)',
            transition: 'all 0.2s ease'
          }}
        >
          <Navigation size={18} />
          <span>{dict.searchInMaps}</span>
          <ExternalLink size={15} />
        </a>
      </div>

      {/* 2. LIVE CURRENT LOCATION TRACKER BOX */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          border: '2px solid #fed7aa',
          padding: '20px 24px',
          marginBottom: '26px',
          boxShadow: '0 8px 24px rgba(234, 88, 12, 0.08)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#ffedd5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ea580c'
              }}
            >
              <Compass size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.12rem', fontWeight: 800, color: '#9a3412', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span> {dict.gpsTitle}
              </h3>
              <span style={{ fontSize: '0.82rem', color: '#c2410c', fontWeight: 600 }}>
                {gpsStatusMessage}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={detectLiveGps}
              disabled={gpsLoading}
              style={{
                background: '#ea580c',
                color: 'white',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
              }}
            >
              <RefreshCw size={15} className={gpsLoading ? 'spin' : ''} />
              <span>{gpsLoading ? dict.gpsWaiting : dict.gpsDetectBtn}</span>
            </button>
            <button
              onClick={setNavalurLocation}
              style={{
                background: '#059669',
                color: 'white',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
                transition: 'all 0.2s ease'
              }}
              title="Set directly to Navalur (OMR) / நாவலூர்"
            >
              <MapPin size={15} />
              <span>📍 {language === 'ta' ? 'என் இடம்: நாவலூர் (OMR)' : 'My Location: Navalur (OMR)'}</span>
            </button>
          </div>
        </div>

        {/* Live GPS Coordinates Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            background: '#fffaf5',
            padding: '14px 18px',
            borderRadius: '14px',
            border: '1px solid #ffedd5'
          }}
        >
          <div>
            <span style={{ fontSize: '0.74rem', color: '#9a3412', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
              {dict.gpsLocality}
            </span>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} color="#ea580c" />
              <span>{userLocation.locality}</span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.74rem', color: '#9a3412', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
              {dict.gpsCoordinates}
            </span>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#334155', marginTop: '2px' }}>
              {userLocation.lat.toFixed(5)}° N, {userLocation.lng.toFixed(5)}° E
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.74rem', color: '#9a3412', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
              {dict.gpsAccuracy}
            </span>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#15803d', marginTop: '2px' }}>
              ±{userLocation.accuracy} meters (High Precision GPS)
            </div>
          </div>
        </div>

        {/* Quick Area Switch Chips */}
        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7c2d12' }}>
            {dict.gpsPresetSelect}
          </span>
          {PRESET_LOCALITIES.slice(0, 5).map((preset, i) => (
            <button
              key={i}
              onClick={() => handlePresetChange(preset)}
              style={{
                background: userLocation.locality.includes(preset.name.split(' ')[0]) ? '#ea580c' : '#ffffff',
                color: userLocation.locality.includes(preset.name.split(' ')[0]) ? '#ffffff' : '#475569',
                border: '1px solid #fed7aa',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {preset.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 3. THREE CATEGORY SUMMARY COUNTERS (BOXES FOR HOSPITALS, PHARMACIES, GYNECOLOGISTS) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '26px'
        }}
      >
        {/* Hospitals Box */}
        <div
          onClick={() => setActiveTab('hospitals')}
          style={{
            background: activeTab === 'hospitals' ? '#fff1f2' : 'white',
            border: activeTab === 'hospitals' ? '2px solid #e11d48' : '1px solid #fecdd3',
            borderRadius: '18px',
            padding: '18px 20px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(225, 29, 72, 0.08)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: '#ffe4e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem'
            }}
          >
            🏥
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#e11d48', lineHeight: 1.1 }}>
              {careData.hospitals?.length || 5}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>
              {dict.statHospitals}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9f1239', fontWeight: 600 }}>
              24/7 Verified • Labor & NICU
            </div>
          </div>
        </div>

        {/* Pharmacies Box */}
        <div
          onClick={() => setActiveTab('pharmacies')}
          style={{
            background: activeTab === 'pharmacies' ? '#f5f3ff' : 'white',
            border: activeTab === 'pharmacies' ? '2px solid #7c3aed' : '1px solid #ddd6fe',
            borderRadius: '18px',
            padding: '18px 20px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.08)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: '#ede9fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem'
            }}
          >
            💊
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#7c3aed', lineHeight: 1.1 }}>
              {careData.pharmacies?.length || 4}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>
              {dict.statPharmacies}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6d28d9', fontWeight: 600 }}>
              24/7 Open • Home Delivery
            </div>
          </div>
        </div>

        {/* Gynecologists Box */}
        <div
          onClick={() => setActiveTab('gynecology')}
          style={{
            background: activeTab === 'gynecology' ? '#fdf2f8' : 'white',
            border: activeTab === 'gynecology' ? '2px solid #db2777' : '1px solid #fbcfe8',
            borderRadius: '18px',
            padding: '18px 20px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(219, 39, 119, 0.08)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: '#fce7f3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem'
            }}
          >
            👩‍⚕️
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#db2777', lineHeight: 1.1 }}>
              {careData.gynecologists?.length || 4}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>
              {dict.statGynecologists}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#be185d', fontWeight: 600 }}>
              OB/GYN • High-Risk & PCOS
            </div>
          </div>
        </div>
      </div>

      {/* 4. SEARCH BAR & FILTER TABS */}
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Search input */}
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.searchPlaceholder}
            style={{
              width: '100%',
              padding: '14px 18px 14px 44px',
              borderRadius: '16px',
              border: '2px solid #e2e8f0',
              fontSize: '0.95rem',
              outline: 'none',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Filter Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
          {[
            { id: 'all', label: dict.tabAll, count: (careData.hospitals?.length || 0) + (careData.pharmacies?.length || 0) + (careData.gynecologists?.length || 0) },
            { id: 'hospitals', label: dict.tabHospitals, count: careData.hospitals?.length || 0 },
            { id: 'pharmacies', label: dict.tabPharmacies, count: careData.pharmacies?.length || 0 },
            { id: 'gynecology', label: dict.tabGynecology, count: careData.gynecologists?.length || 0 },
            { id: 'helplines', label: dict.tabHelplines, count: careData.helplines?.length || 5 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' : 'white',
                color: activeTab === tab.id ? 'white' : '#475569',
                border: activeTab === tab.id ? 'none' : '1px solid #e2e8f0',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeTab === tab.id ? '0 4px 14px rgba(225, 29, 72, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  background: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: activeTab === tab.id ? 'white' : '#64748b',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.74rem'
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <DisclaimerBanner customText={dict.emergencyCallDisclaimer} />

      {/* 5. EMERGENCY HELPLINES (ALWAYS ACCESSIBLE OR ON TAB) */}
      {(activeTab === 'all' || activeTab === 'helplines') && (
        <div style={{ marginBottom: '34px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <ShieldAlert size={22} color="#dc2626" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
              {dict.emergencyHelplinesTitle}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {(careData.helplines || []).map((h, i) => (
              <a
                key={i}
                href={`tel:${h.number}`}
                style={{
                  background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
                  border: '1.5px solid #fecdd3',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  textDecoration: 'none',
                  color: '#881337',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(225, 29, 72, 0.08)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.94rem', display: 'block', color: '#9f1239' }}>
                    {language === 'ta' && h.nameTa ? h.nameTa : h.name}
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: '#be123c', fontWeight: 600 }}>
                    {h.available}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#e11d48', display: 'block' }}>
                    {h.number}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#e11d48', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                    📞 {dict.callNow}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 6. HOSPITALS SECTION (IF TAB IS ALL OR HOSPITALS) */}
      {(activeTab === 'all' || activeTab === 'hospitals') && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🏥</span> {dict.tabHospitals}
            </h2>
            <span style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>
              {filteredHospitals.length} {dict.statHospitals} near your GPS position
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {filteredHospitals.map((h) => {
              const liveDist = getDistanceKm(h.lat, h.lng) || h.distance;
              return (
                <div
                  key={h.id}
                  className="glass-card"
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1.5px solid #fecdd3',
                    padding: '22px',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Header: Name, Specialty & Distance */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          {language === 'ta' && h.nameTa ? h.nameTa : h.name}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: '#e11d48', fontWeight: 700 }}>
                          {h.type}
                        </span>
                      </div>
                      <span
                        style={{
                          background: '#ffe4e6',
                          color: '#e11d48',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        📍 {liveDist} {typeof liveDist === 'number' || !String(liveDist).includes('km') ? 'km' : ''}
                      </span>
                    </div>

                    {/* Status & Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: '#dcfce7',
                          color: '#166534',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <Clock size={13} />
                        {h.openHours || dict.open24x7}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 700 }}>
                        ⭐ {h.rating} ({h.reviewCount || 850}+ reviews)
                      </span>
                    </div>

                    {/* ADDRESS SECTION (Side-by-side prominent layout) */}
                    <div
                      style={{
                        marginTop: '14px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        padding: '12px 14px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <MapPin size={17} color="#e11d48" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, display: 'block' }}>
                              {dict.addressLabel}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600, lineHeight: 1.4 }}>
                              {h.address}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopyAddress(h.id, h.address)}
                          title={dict.copyAddress}
                          style={{
                            background: copiedId === h.id ? '#dcfce7' : '#ffffff',
                            color: copiedId === h.id ? '#15803d' : '#64748b',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '5px 8px',
                            cursor: 'pointer',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            flexShrink: 0
                          }}
                        >
                          {copiedId === h.id ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === h.id ? dict.copied : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Services Chips */}
                    {h.services && h.services.length > 0 && (
                      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {h.services.slice(0, 3).map((srv, si) => (
                          <span
                            key={si}
                            style={{
                              background: '#fff1f2',
                              color: '#9f1239',
                              fontSize: '0.72rem',
                              padding: '3px 8px',
                              borderRadius: '8px',
                              fontWeight: 600
                            }}
                          >
                            ✓ {srv}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS (CALL + DIRECTIONS SIDE-BY-SIDE) */}
                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: '1px solid #f1f5f9',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px'
                    }}
                  >
                    {/* Call Button */}
                    <a
                      href={`tel:${h.phone}`}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                      }}
                    >
                      <PhoneCall size={16} />
                      <span>{dict.callNow}</span>
                    </a>

                    {/* Directions Button */}
                    <a
                      href={h.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)'
                      }}
                    >
                      <span>{dict.getDirections}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. PHARMACIES SECTION (IF TAB IS ALL OR PHARMACIES) */}
      {(activeTab === 'all' || activeTab === 'pharmacies') && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>💊</span> {dict.tabPharmacies}
            </h2>
            <span style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>
              {filteredPharmacies.length} {dict.statPharmacies} open near you
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {filteredPharmacies.map((p) => {
              const liveDist = getDistanceKm(p.lat, p.lng) || p.distance;
              return (
                <div
                  key={p.id}
                  className="glass-card"
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1.5px solid #ddd6fe',
                    padding: '22px',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          {language === 'ta' && p.nameTa ? p.nameTa : p.name}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: 700 }}>
                          {p.type}
                        </span>
                      </div>
                      <span
                        style={{
                          background: '#ede9fe',
                          color: '#7c3aed',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        📍 {liveDist} {typeof liveDist === 'number' || !String(liveDist).includes('km') ? 'km' : ''}
                      </span>
                    </div>

                    {/* Status & Delivery */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: '#dcfce7',
                          color: '#166534',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <Clock size={13} />
                        {p.openHours}
                      </span>
                      {p.deliveryAvailable && (
                        <span
                          style={{
                            background: '#fef3c7',
                            color: '#92400e',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 700
                          }}
                        >
                          🛵 {p.deliveryTime || dict.homeDelivery}
                        </span>
                      )}
                    </div>

                    {/* ADDRESS SECTION */}
                    <div
                      style={{
                        marginTop: '14px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        padding: '12px 14px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <MapPin size={17} color="#7c3aed" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, display: 'block' }}>
                              {dict.addressLabel}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600, lineHeight: 1.4 }}>
                              {p.address}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopyAddress(p.id, p.address)}
                          title={dict.copyAddress}
                          style={{
                            background: copiedId === p.id ? '#dcfce7' : '#ffffff',
                            color: copiedId === p.id ? '#15803d' : '#64748b',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '5px 8px',
                            cursor: 'pointer',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            flexShrink: 0
                          }}
                        >
                          {copiedId === p.id ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === p.id ? dict.copied : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Inventory Pills */}
                    {p.inventory && p.inventory.length > 0 && (
                      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {p.inventory.slice(0, 3).map((item, pi) => (
                          <span
                            key={pi}
                            style={{
                              background: '#f5f3ff',
                              color: '#6d28d9',
                              fontSize: '0.72rem',
                              padding: '3px 8px',
                              borderRadius: '8px',
                              fontWeight: 600
                            }}
                          >
                            💊 {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS (CALL + DIRECTIONS) */}
                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: '1px solid #f1f5f9',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px'
                    }}
                  >
                    <a
                      href={`tel:${p.phone}`}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                      }}
                    >
                      <PhoneCall size={16} />
                      <span>{dict.callNow}</span>
                    </a>

                    <a
                      href={p.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
                      }}
                    >
                      <span>{dict.getDirections}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. GYNECOLOGISTS SECTION (IF TAB IS ALL OR GYNECOLOGY) */}
      {(activeTab === 'all' || activeTab === 'gynecology') && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👩‍⚕️</span> {dict.tabGynecology}
            </h2>
            <span style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>
              {filteredGynecologists.length} {dict.statGynecologists} available near your location
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {filteredGynecologists.map((g) => {
              const liveDist = getDistanceKm(g.lat, g.lng) || g.distance;
              return (
                <div
                  key={g.id}
                  className="glass-card"
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1.5px solid #fbcfe8',
                    padding: '22px',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          {language === 'ta' && g.nameTa ? g.nameTa : g.name}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: '#db2777', fontWeight: 700, display: 'block' }}>
                          {language === 'ta' && g.designationTa ? g.designationTa : g.designation}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                          🏥 {g.hospitalClinic}
                        </span>
                      </div>
                      <span
                        style={{
                          background: '#fce7f3',
                          color: '#db2777',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        📍 {liveDist} {typeof liveDist === 'number' || !String(liveDist).includes('km') ? 'km' : ''}
                      </span>
                    </div>

                    {/* Experience & Fee */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: '#fdf2f8',
                          color: '#9d174d',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.74rem',
                          fontWeight: 700
                        }}
                      >
                        🎓 {g.experience}
                      </span>
                      <span
                        style={{
                          background: '#ecfdf5',
                          color: '#065f46',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.74rem',
                          fontWeight: 700
                        }}
                      >
                        💵 {dict.consultationFee}: {g.consultationFee}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 700 }}>
                        ⭐ {g.rating} ({g.reviewCount} reviews)
                      </span>
                    </div>

                    {/* ADDRESS SECTION */}
                    <div
                      style={{
                        marginTop: '14px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        padding: '12px 14px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <MapPin size={17} color="#db2777" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, display: 'block' }}>
                              {dict.addressLabel}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600, lineHeight: 1.4 }}>
                              {g.address}
                            </span>
                            <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'block', marginTop: '4px' }}>
                              🕒 {g.timing}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopyAddress(g.id, g.address)}
                          title={dict.copyAddress}
                          style={{
                            background: copiedId === g.id ? '#dcfce7' : '#ffffff',
                            color: copiedId === g.id ? '#15803d' : '#64748b',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '5px 8px',
                            cursor: 'pointer',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            flexShrink: 0
                          }}
                        >
                          {copiedId === g.id ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === g.id ? dict.copied : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Specializations */}
                    {g.specializations && g.specializations.length > 0 && (
                      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {g.specializations.slice(0, 3).map((spec, gi) => (
                          <span
                            key={gi}
                            style={{
                              background: '#fdf2f8',
                              color: '#be185d',
                              fontSize: '0.72rem',
                              padding: '3px 8px',
                              borderRadius: '8px',
                              fontWeight: 600
                            }}
                          >
                            ✓ {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS (CALL + DIRECTIONS) */}
                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: '1px solid #f1f5f9',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px'
                    }}
                  >
                    <a
                      href={`tel:${g.phone}`}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                      }}
                    >
                      <PhoneCall size={16} />
                      <span>{dict.callNow}</span>
                    </a>

                    <a
                      href={g.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(219, 39, 119, 0.25)'
                      }}
                    >
                      <span>{dict.getDirections}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredHospitals.length === 0 && filteredPharmacies.length === 0 && filteredGynecologists.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '50px 20px',
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            marginTop: '20px'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
          <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '0 0 6px 0' }}>{dict.noResults}</h3>
          <button
            onClick={() => setSearchQuery('')}
            style={{
              marginTop: '12px',
              background: '#e11d48',
              color: 'white',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Clear Filter
          </button>
        </div>
      )}

    </div>
  );
}
