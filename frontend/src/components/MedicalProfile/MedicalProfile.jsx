import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  User,
  Phone,
  Mail,
  Shield,
  Save,
  Check,
  Heart,
  Lock,
  HelpCircle,
  Stethoscope,
  AlertCircle,
  FileCheck2
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const MED_I18N = {
  en: {
    pageTitle: "My Medical Profile",
    pageSubtitle: "Comprehensive clinical demographics, emergency network, and surgical history.",
    hipaaBadge: "HIPAA-Standard Privacy",
    editBtn: "Edit Medical Profile",
    cancelBtn: "Cancel Editing",
    savedMsg: "✓ Medical Profile updated and encrypted in private database!",
    secPersonal: "Personal Identification & Emergency Contact",
    fullName: "Full Name",
    age: "Age",
    dob: "Date of Birth",
    email: "Email (Primary Account)",
    phone: "Phone Number",
    emergencyName: "Emergency Contact Person",
    emergencyRelation: "Relation (e.g. Mother, Sister, Doctor)",
    emergencyPhone: "Emergency Contact Phone (SOS Dial)",
    secClinical: "Clinical History, Allergies & Treatments",
    bloodGroup: "Blood Group",
    allergies: "Known Allergies (e.g. Penicillin, Sulfa, Peanuts)",
    conditions: "Existing Medical Conditions (e.g. PCOS, Thyroid, Anemia)",
    currentMeds: "Current Daily Medications",
    previousMeds: "Previous Medications Taken",
    currentTreatment: "Current Treatment / Therapy",
    surgeries: "Previous Surgeries / Operations",
    doctorName: "Consulting Gynecologist / Physician Name",
    doctorClinic: "Hospital / Clinic Name",
    doctorPhone: "Doctor / Clinic Phone Number",
    secQuestions: "Clinical Health Evaluation Questions",
    secQuestionsSub: "Answer these essential baseline questions to personalize hormone analytics and care alerts.",
    qAllergies: "1. Do you experience adverse drug reactions or medication allergies?",
    qPcosThyroid: "2. Have you been clinically evaluated for PCOS / PCOD or Thyroid imbalance?",
    qPain: "3. Do you experience severe debilitating cramps (dysmenorrhea) during periods?",
    qSupplements: "4. Are you regularly taking prenatal vitamins, folic acid, or iron supplements?",
    ansYes: "✓ Yes",
    ansNo: "✕ No",
    ansUnsure: "Unsure / Under Evaluation",
    saveChanges: "Save Medical Profile Changes",
    saving: "Encrypting & Saving..."
  },
  ta: {
    pageTitle: "என் மருத்துவ விவரம் (Medical Profile)",
    pageSubtitle: "முழுமையான மருத்துவ தகவல்கள், அவசர தொடர்பு எண்கள், ஒவ்வாமைகள் மற்றும் அறுவை சிகிச்சை வரலாறு.",
    hipaaBadge: "மருத்துவ ரகசியப் பாதுகாப்பு (HIPAA)",
    editBtn: "மருத்துவ விவரங்களை மாற்று (Edit)",
    cancelBtn: "மாற்றத்தை ரத்து செய் (Cancel)",
    savedMsg: "✓ மருத்துவ விவரங்கள் வெற்றிகரமாக சேமிக்கப்பட்டு குறியாக்கம் செய்யப்பட்டது!",
    secPersonal: "தனிநபர் அடையாளம் & அவசர தொடர்பு விபரம்",
    fullName: "முழு பெயர் (Full Name)",
    age: "வயது (Age)",
    dob: "பிறந்த தேதி (Date of Birth)",
    email: "மின்னஞ்சல் (முதன்மை கணக்கு)",
    phone: "மொபைல் போன் எண் (Phone Number)",
    emergencyName: "அவசர தொடர்பு நபர் பெயர்",
    emergencyRelation: "உறவுமுறை (தாய், சகோதரி, மருத்துவர்)",
    emergencyPhone: "அவசர தொடர்பு போன் எண் (SOS Dial)",
    secClinical: "மருத்துவ வரலாறு, அலர்ஜிகள் & சிகிச்சைகள்",
    bloodGroup: "ரத்த வகை (Blood Group)",
    allergies: "மருந்து மற்றும் உணவு அலர்ஜிகள் (Allergies)",
    conditions: "தற்போதுள்ள உடல்நல பாதிப்புகள் (PCOS, தைராய்டு)",
    currentMeds: "தற்போது உட்கொள்ளும் மருந்துகள் (Current Meds)",
    previousMeds: "முன்பு உட்கொண்ட மாத்திரைகள்",
    currentTreatment: "தற்போதைய மருத்துவ சிகிச்சை",
    surgeries: "முந்தைய அறுவை சிகிச்சைகள் (Surgeries)",
    doctorName: "ஆலோசகர் / மகளிர் மருத்துவர் பெயர்",
    doctorClinic: "மருத்துவமனை / கிளினிக் பெயர்",
    doctorPhone: "மருத்துவர் தொடர்பு எண்",
    secQuestions: "மருத்துவ நல்வாழ்வு கேள்விகள் & பதில்கள் (Evaluation Questions)",
    secQuestionsSub: "உங்கள் ஹார்மோன் சமநிலை மற்றும் அவசர எச்சரிக்கைகளைத் தனிப்பயனாக்க இந்தக் கேள்விகளுக்குப் பதிலளிக்கவும்.",
    qAllergies: "1. உங்களுக்கு பென்சிலின் அல்லது ஏதேனும் மாத்திரைகளால் அலர்ஜி ஏற்படுகிறதா?",
    qPcosThyroid: "2. உங்களுக்கு தைராய்டு அல்லது PCOS / PCOD பாதிப்பு இருப்பதாக கண்டறியப்பட்டுள்ளதா?",
    qPain: "3. மாதவிடாய் காலங்களில் கடுமையான தாங்க முடியாத வயிற்று வலி ஏற்படுகிறதா?",
    qSupplements: "4. ஃபோலிக் அமிலம், இரும்புச்சத்து அல்லது வைட்டமின் மாத்திரைகள் எடுக்கிறீர்களா?",
    ansYes: "✓ ஆம் (Yes)",
    ansNo: "✕ இல்லை (No)",
    ansUnsure: "உறுதியாக தெரியவில்லை (Unsure)",
    saveChanges: "மருத்துவ விவரங்களை சேமிக்கவும் (Save Changes)",
    saving: "சேமிக்கப்படுகிறது..."
  },
  hi: {
    pageTitle: "मेरा मेडिकल प्रोफाइल (Medical Profile)",
    pageSubtitle: "व्यापक नैदानिक जानकारी, आपातकालीन संपर्क, एलर्जी और सर्जिकल इतिहास।",
    hipaaBadge: "HIPAA-मानक सुरक्षा",
    editBtn: "प्रोफ़ाइल संपादित करें (Edit)",
    cancelBtn: "रद्द करें (Cancel)",
    savedMsg: "✓ मेडिकल प्रोफाइल सफलतापूर्वक सहेजा और एन्क्रिप्ट किया गया!",
    secPersonal: "व्यक्तिगत पहचान एवं आपातकालीन संपर्क",
    fullName: "पूरा नाम (Full Name)",
    age: "आयु (Age)",
    dob: "जन्म तिथि (Date of Birth)",
    email: "ईमेल (Email)",
    phone: "फ़ोन नंबर (Phone Number)",
    emergencyName: "आपातकालीन संपर्क व्यक्ति का नाम",
    emergencyRelation: "संबंध (उदा. माँ, बहन, डॉक्टर)",
    emergencyPhone: "आपातकालीन फ़ोन नंबर (SOS Dial)",
    secClinical: "चिकित्सीय इतिहास, एलर्जी और उपचार",
    bloodGroup: "रक्त समूह (Blood Group)",
    allergies: "ज्ञात एलर्जी (दवाएं / भोजन)",
    conditions: "मौजूदा बीमारियां (PCOS, थायराइड)",
    currentMeds: "वर्तमान दवाएं (Current Medications)",
    previousMeds: "पिछली दवाएं (Previous Medications)",
    currentTreatment: "वर्तमान उपचार / थेरेपी",
    surgeries: "पिछली सर्जरी या ऑपरेशन",
    doctorName: "सलाहकार स्त्री रोग विशेषज्ञ का नाम",
    doctorClinic: "अस्पताल / क्लिनिक का नाम",
    doctorPhone: "डॉक्टर का फोन नंबर",
    secQuestions: "स्वास्थ्य मूल्यांकन प्रश्न एवं उत्तर (Health Questions)",
    secQuestionsSub: "हार्मोनल विश्लेषण को वैयक्तिकृत करने के लिए इन बुनियादी सवालों के जवाब दें।",
    qAllergies: "1. क्या आपको किसी दवा या एंटीबायोटिक से प्रतिकूल एलर्जी होती है?",
    qPcosThyroid: "2. क्या आपको कभी PCOS / PCOD या थायराइड असंतुलन की जांच हुई है?",
    qPain: "3. क्या मासिक धर्म के दौरान आपको असहनीय पेट दर्द होता है?",
    qSupplements: "4. क्या आप नियमित रूप से आयरन, फोलिक एसिड या विटामिन लेते हैं?",
    ansYes: "✓ हाँ (Yes)",
    ansNo: "✕ नहीं (No)",
    ansUnsure: "निश्चित नहीं (Unsure)",
    saveChanges: "प्रोफाइल परिवर्तन सहेजें (Save Changes)",
    saving: "सहेजा जा रहा है..."
  },
  te: {
    pageTitle: "నా వైద్య ప్రొఫైల్ (Medical Profile)",
    pageSubtitle: "సమగ్ర క్లినికల్ సమాచారం, అత్యవసర నెట్‌వర్క్ మరియు శస్త్రచికిత్స చరిత్ర.",
    hipaaBadge: "HIPAA భద్రతా ప్రమాణాలు",
    editBtn: "ప్రొఫైల్ సవరించండి",
    cancelBtn: "రద్దు చేయండి",
    savedMsg: "✓ వైద్య ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!",
    secPersonal: "వ్యక్తిగత గుర్తింపు & అత్యవసర పరిచయం",
    fullName: "పూర్తి పేరు",
    age: "వయస్సు",
    dob: "పుట్టిన తేదీ",
    email: "ఇమెయిల్",
    phone: "ఫోన్ నంబర్",
    emergencyName: "అత్యవసర సంప్రదింపు వ్యక్తి",
    emergencyRelation: "సంబంధం (తల్లి, సోదరి)",
    emergencyPhone: "అత్యవసర ఫోన్ నంబర్ (SOS)",
    secClinical: "క్లినికల్ హిస్టరీ, అలెర్జీలు & చికిత్సలు",
    bloodGroup: "రక్త వర్గం (Blood Group)",
    allergies: "అలెర్జీలు (Allergies)",
    conditions: "ప్రస్తుత ఆరోగ్య సమస్యలు (PCOS, థైరాయిడ్)",
    currentMeds: "ప్రస్తుత మందులు",
    previousMeds: "గతంలో వాడిన మందులు",
    currentTreatment: "ప్రస్తుత చికిత్స",
    surgeries: "గత శస్త్రచికిత్సలు",
    doctorName: "వైద్యుడి పేరు",
    doctorClinic: "ఆసుపత్రి పేరు",
    doctorPhone: "వైద్యుడి ఫోన్ నంబర్",
    secQuestions: "ఆరోగ్య మూల్యాంకన ప్రశ్నలు & సమాధానాలు",
    secQuestionsSub: "మీ సంరక్షణను మెరుగుపరచడానికి ఈ ప్రశ్నలకు సమాధానం ఇవ్వండి.",
    qAllergies: "1. మీకు ఏవైనా మందులతో అలెర్జీ సమస్యలు ఉన్నాయా?",
    qPcosThyroid: "2. మీకు PCOS లేదా థైరాయిడ్ సమస్య ఉన్నట్లు నిర్ధారించబడిందా?",
    qPain: "3. పీరియడ్స్ సమయంలో తీవ్రమైన కడుపు నొప్పి వస్తుందా?",
    qSupplements: "4. మీరు క్రమం తప్పకుండా విటమిన్లు లేదా ఐరన్ తీసుకుంటున్నారా?",
    ansYes: "✓ అవును (Yes)",
    ansNo: "✕ కాదు (No)",
    ansUnsure: "ఖచ్చితంగా తెలియదు",
    saveChanges: "మార్పులను సేవ్ చేయండి",
    saving: "సేవ్ చేస్తోంది..."
  },
  ml: {
    pageTitle: "എന്റെ മെഡിക്കൽ പ്രൊഫൈൽ (Medical Profile)",
    pageSubtitle: "വ്യക്തിഗത ആരോഗ്യ വിവരങ്ങൾ, അടിയന്തിര കോൺടാക്റ്റുകൾ, അലർജികൾ.",
    hipaaBadge: "HIPAA സുരക്ഷ",
    editBtn: "എഡിറ്റ് ചെയ്യുക",
    cancelBtn: "റദ്ദാക്കുക",
    savedMsg: "✓ മെഡിക്കൽ പ്രൊഫൈൽ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു!",
    secPersonal: "വ്യക്തിഗത വിവരങ്ങളും അടിയന്തിര കോൺടാക്റ്റും",
    fullName: "പൂർണ്ണ പേര്",
    age: "വയസ്സ്",
    dob: "ജനന തീയതി",
    email: "ഇമെയിൽ",
    phone: "ഫോൺ നമ്പർ",
    emergencyName: "അടിയന്തിര കോൺടാക്റ്റ് വ്യക്തി",
    emergencyRelation: "ബന്ധം (അമ്മ, സഹോദരി)",
    emergencyPhone: "അടിയന്തിര ഫോൺ നമ്പർ",
    secClinical: "ക്ലിനിക്കൽ ചരിത്രം, അലർജികൾ, ചികിത്സകൾ",
    bloodGroup: "രക്തഗ്രൂപ്പ്",
    allergies: "അലർജികൾ",
    conditions: "ആരോഗ്യ പ്രശ്നങ്ങൾ (PCOS, തൈറോയ്ഡ്)",
    currentMeds: "നിലവിലെ മരുന്നുകൾ",
    previousMeds: "മുൻപ് കഴിച്ച മരുന്നുകൾ",
    currentTreatment: "ചികിത്സ",
    surgeries: "ശസ്ത്രക്രിയകൾ",
    doctorName: "ഡോക്ടറുടെ പേര്",
    doctorClinic: "ആശുപത്രി",
    doctorPhone: "ഡോക്ടറുടെ ഫോൺ",
    secQuestions: "ആരോഗ്യ വിവരങ്ങൾക്കായുള്ള ചോദ്യങ്ങൾ",
    secQuestionsSub: "നിങ്ങളുടെ ആരോഗ്യ പരിചരണത്തിനായി ഈ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക.",
    qAllergies: "1. നിങ്ങൾക്ക് മരുന്നുകളോ മറ്റോ അലർജിയുണ്ടോ?",
    qPcosThyroid: "2. PCOS അല്ലെങ്കിൽ തൈറോയ്ഡ് ഉള്ളതായി കണ്ടെത്തിയിട്ടുണ്ടോ?",
    qPain: "3. ആർത്തവ സമയത്ത് കഠിനമായ വേദന അനുഭവപ്പെടാറുണ്ടോ?",
    qSupplements: "4. നിങ്ങൾ ദിവസേന വിറ്റാമിനുകൾ കഴിക്കുന്നുണ്ടോ?",
    ansYes: "✓ അതെ (Yes)",
    ansNo: "✕ അല്ല (No)",
    ansUnsure: "വ്യക്തമല്ല",
    saveChanges: "വിവരങ്ങൾ സംരക്ഷിക്കുക",
    saving: "സംരക്ഷിക്കുന്നു..."
  },
  mr: {
    pageTitle: "माझे वैद्यकीय प्रोफाइल (Medical Profile)",
    pageSubtitle: "सर्वसमावेशक क्लिनिकल तपशील, आपत्कालीन संपर्क आणि शस्त्रक्रिया इतिहास.",
    hipaaBadge: "HIPAA सुरक्षा",
    editBtn: "प्रोफाइल संपादित करा",
    cancelBtn: "रद्द करा",
    savedMsg: "✓ वैद्यकीय प्रोफाइल यशस्वीरित्या जतन केले!",
    secPersonal: "वैयक्तिक ओळख आणि आपत्कालीन संपर्क",
    fullName: "पूर्ण नाव",
    age: "वय",
    dob: "जन्मतारीख",
    email: "ईमेल",
    phone: "फोन नंबर",
    emergencyName: "आपत्कालीन संपर्क व्यक्ती",
    emergencyRelation: "नाते (उदा. आई, बहीण)",
    emergencyPhone: "आपत्कालीन फोन नंबर",
    secClinical: "वैद्यकीय इतिहास, ॲलर्जी आणि उपचार",
    bloodGroup: "रक्तगट",
    allergies: "ज्ञात ॲलर्जी",
    conditions: "आरोग्य समस्या (PCOS, थायरॉईड)",
    currentMeds: "सध्याची औषधे",
    previousMeds: "मागील औषधे",
    currentTreatment: "सध्याचे उपचार",
    surgeries: "मागील शस्त्रक्रिया",
    doctorName: "डॉक्टरांचे नाव",
    doctorClinic: "रुग्णालय",
    doctorPhone: "डॉक्टरांचा फोन नंबर",
    secQuestions: "आरोग्य मूल्यांकन प्रश्न आणि उत्तरे",
    secQuestionsSub: "तुमची काळजी वैयक्तिकृत करण्यासाठी या प्रश्नांची उत्तरे द्या.",
    qAllergies: "१. तुम्हाला औषधांची ॲलर्जी आहे का?",
    qPcosThyroid: "२. तुम्हाला PCOS किंवा थायरॉईडचे निदान झाले आहे का?",
    qPain: "३. पाळी दरम्यान तीव्र पोटदुखी होते का?",
    qSupplements: "४. तुम्ही नियमितपणे जीवनसत्त्वे घेत आहात का?",
    ansYes: "✓ होय (Yes)",
    ansNo: "✕ नाही (No)",
    ansUnsure: "नक्की माहीत नाही",
    saveChanges: "बदल जतन करा",
    saving: "जतन करत आहे..."
  },
  mwr: {
    pageTitle: "म्हारो मेडिकल प्रोफाइल (Medical Profile)",
    pageSubtitle: "सगळी बीमारी अर इलाज री जाणकारी, इमरजेंसी नंबर अर लेडी डॉक्टर रो नाम।",
    hipaaBadge: "सुरक्षित डाटा",
    editBtn: "बदलाव करो (Edit)",
    cancelBtn: "कैंसिल करो",
    savedMsg: "✓ मेडिकल प्रोफाइल एकदम सही तरीकौ सूं सेव होग्यो!",
    secPersonal: "म्हारी जाणकारी अर इमरजेंसी नंबर",
    fullName: "पूरो नाम",
    age: "उमर",
    dob: "जन्म तारीख",
    email: "ईमेल",
    phone: "फोन नंबर",
    emergencyName: "इमरजेंसी में फोन मिलावण वाळो",
    emergencyRelation: "रिश्तो (मां, बेन)",
    emergencyPhone: "इमरजेंसी फोन नंबर",
    secClinical: "इलाज, दवाई अर बीमारी री विगत",
    bloodGroup: "खून रो ग्रुप (Blood Group)",
    allergies: "दवाई सूं एलर्जी",
    conditions: "पुरानी बीमारी (PCOS, थायराइड)",
    currentMeds: "इबकी दवाई",
    previousMeds: "पैली री दवाई",
    currentTreatment: "इलाज",
    surgeries: "ऑपरेशन",
    doctorName: "डॉक्टर को नाम",
    doctorClinic: "अस्पताल को नाम",
    doctorPhone: "डॉक्टर को फोन नंबर",
    secQuestions: "स्वास्थ्य संबंधी सवाल अर जवाब",
    secQuestionsSub: "सही इलाज अर मदद वास्ते आं सवालां रा जवाब देवो।",
    qAllergies: "1. काईं थांने कोई दवाई सूं एलर्जी है?",
    qPcosThyroid: "2. काईं थांके PCOS या थायराइड री जांच हुई है?",
    qPain: "3. काईं महीना में घणो दर्द होवै है?",
    qSupplements: "4. काईं थे विटामिन्स या आयरन री गोली लेवो हो?",
    ansYes: "✓ हां (Yes)",
    ansNo: "✕ ना (No)",
    ansUnsure: "पक्को पतो कोनी",
    saveChanges: "प्रोफाइल सेव करो",
    saving: "सेव हो रह्यो है..."
  },
  fr: {
    pageTitle: "Mon Profil Médical (Medical Profile)",
    pageSubtitle: "Données cliniques complètes, contacts d'urgence et antécédents médicaux.",
    hipaaBadge: "Confidentialité Conforme HIPAA",
    editBtn: "Modifier le Profil",
    cancelBtn: "Annuler",
    savedMsg: "✓ Profil médical mis à jour et chiffré dans la base sécurisée !",
    secPersonal: "Identification Personnelle & Contact d'Urgence",
    fullName: "Nom Complet",
    age: "Âge",
    dob: "Date de Naissance",
    email: "Email (Compte Principal)",
    phone: "Numéro de Téléphone",
    emergencyName: "Contact d'Urgence",
    emergencyRelation: "Lien de parenté (Mère, Sœur, Médecin)",
    emergencyPhone: "Téléphone d'Urgence (SOS)",
    secClinical: "Antécédents Médicaux, Allergies & Traitements",
    bloodGroup: "Groupe Sanguin",
    allergies: "Allergies Connues (Médicaments, Aliments)",
    conditions: "Conditions Médicales (SOPK, Thyroïde)",
    currentMeds: "Médicaments Actuels",
    previousMeds: "Médicaments Précédents",
    currentTreatment: "Traitement en cours",
    surgeries: "Chirurgies ou Opérations Antérieures",
    doctorName: "Nom du Médecin Traitant / Gynécologue",
    doctorClinic: "Hôpital / Clinique",
    doctorPhone: "Téléphone du Médecin",
    secQuestions: "Questions d'Évaluation Clinique",
    secQuestionsSub: "Répondez à ces questions pour personnaliser vos analyses hormonales.",
    qAllergies: "1. Présentez-vous des réactions allergiques médicamenteuses ?",
    qPcosThyroid: "2. Avez-vous un diagnostic de SOPK ou trouble thyroïdien ?",
    qPain: "3. Ressentez-vous de sévères douleurs pelviennes pendant les règles ?",
    qSupplements: "4. Prenez-vous quotidiennement des vitamines ou du fer ?",
    ansYes: "✓ Oui (Yes)",
    ansNo: "✕ Non (No)",
    ansUnsure: "Incertain / En cours",
    saveChanges: "Enregistrer les modifications",
    saving: "Chiffrement et enregistrement..."
  },
  lb: {
    pageTitle: "ملفي الطبي الشخصي (Medical Profile)",
    pageSubtitle: "البيانات السريرية الشاملة، شبكة الطوارئ، الحساسية والعمليات الجراحية السابقة.",
    hipaaBadge: "خصوصية سريرية معتمدة",
    editBtn: "تعديل الملف الطبي",
    cancelBtn: "إلغاء التعديل",
    savedMsg: "✓ تم تحديث وتشفير الملف الطبي بنجاح!",
    secPersonal: "الهوية الشخصية وجهة اتصال الطوارئ",
    fullName: "الاسم الكامل",
    age: "العمر",
    dob: "تاريخ الميلاد",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    emergencyName: "اسم شخص الطوارئ",
    emergencyRelation: "صلة القرابة (أم، أخت)",
    emergencyPhone: "هاتف الطوارئ (SOS)",
    secClinical: "التاريخ السريري، الحساسية والعلاجات",
    bloodGroup: "فصيلة الدم",
    allergies: "الحساسية الدوائية والغذائية",
    conditions: "الحالات الطبية (تكيس المبايض، الغدة)",
    currentMeds: "الأدوية الحالية",
    previousMeds: "الأدوية السابقة",
    currentTreatment: "العلاج الحالي",
    surgeries: "العمليات الجراحية السابقة",
    doctorName: "اسم الطبيب المعالج / طبيبة النسائية",
    doctorClinic: "اسم المستشفى أو العيادة",
    doctorPhone: "رقم هاتف الطبيب",
    secQuestions: "أسئلة التقييم الصحي السريري",
    secQuestionsSub: "أجيبي على هذه الأسئلة لتخصيص تحليلات الهرمونات وتنبيهات العناية.",
    qAllergies: "1. هل تعانين من حساسية تجاه البنسلين أو أي أدوية؟",
    qPcosThyroid: "2. هل تم تشخيصك بمتلازمة تكيس المبايض أو اضطراب الغدة؟",
    qPain: "3. هل تعانين من آلام طمث حادة وتشنجات مستمرة؟",
    qSupplements: "4. هل تتناولين مكملات الحديد، الفوليك أسيد أو الفيتامينات؟",
    ansYes: "✓ نعم (Yes)",
    ansNo: "✕ لا (No)",
    ansUnsure: "غير متأكدة",
    saveChanges: "حفظ بيانات الملف الطبي",
    saving: "جاري التشفير والحفظ..."
  },
  ar: {
    pageTitle: "ملفي الطبي السريري (Medical Profile)",
    pageSubtitle: "البيانات الصحية الشاملة، أرقام الطوارئ، الحساسية والتاريخ الجراحي.",
    hipaaBadge: "خصوصية طبية معتمدة",
    editBtn: "تعديل الملف الطبي",
    cancelBtn: "إلغاء التعديل",
    savedMsg: "✓ تم حفظ وتشفير الملف الطبي بنجاح في قاعدة البيانات!",
    secPersonal: "البيانات الشخصية وجهات اتصال الطوارئ",
    fullName: "الاسم الكامل",
    age: "العمر",
    dob: "تاريخ الميلاد",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف الشخصي",
    emergencyName: "جهة اتصال الطوارئ",
    emergencyRelation: "صلة القرابة (الأم، الأخت، الطبيب)",
    emergencyPhone: "هاتف الطوارئ (الاتصال السريع SOS)",
    secClinical: "التاريخ المرضي، الحساسية والعمليات",
    bloodGroup: "فصيلة الدم",
    allergies: "الحساسية الدوائية المعروفة",
    conditions: "الحالات الطبية القائمة (تكيس المبايض، الغدة الدرقية)",
    currentMeds: "الأدوية اليومية الحالية",
    previousMeds: "الأدوية السابقة",
    currentTreatment: "الخطة العلاجية الحالية",
    surgeries: "العمليات الجراحية السابقة",
    doctorName: "اسم استشارية / طبيب النساء والتوليد",
    doctorClinic: "المستشفى أو المركز الطبي",
    doctorPhone: "رقم هاتف العيادة",
    secQuestions: "أسئلة التقييم الصحي الأساسية",
    secQuestionsSub: "ساعدينا في تحسين تقاريرك الهرمونية من خلال الإجابة على هذه الأسئلة.",
    qAllergies: "1. هل لديك أي ردود فعل تحسسية تجاه أدوية معينة؟",
    qPcosThyroid: "2. هل خضعتِ لفحص تكيس المبايض أو الغدة الدرقية سابقاً؟",
    qPain: "3. هل تعانين من تقلصات شديدة ومؤلمة أثناء الدورة الشهرية؟",
    qSupplements: "4. هل تتناولين فيتامينات ما قبل الولادة أو حمض الفوليك؟",
    ansYes: "✓ نعم (Yes)",
    ansNo: "✕ لا (No)",
    ansUnsure: "غير متأكدة",
    saveChanges: "حفظ تعديلات الملف الطبي",
    saving: "جاري الحفظ المشفر..."
  }
};

export default function MedicalProfile() {
  const { user, updateProfile } = useAuth();
  const { language } = useLanguage();
  const dict = MED_I18N[language] || MED_I18N.ta || MED_I18N.en;

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Janani',
    age: user?.age || 22,
    dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '2004-05-14',
    email: user?.email || 'janani@femtech.internal',
    phone: user?.phone || '+91 9380457517',
    emergencyName: user?.emergencyContact?.name || 'Kavitha (Mother)',
    emergencyPhone: user?.emergencyContact?.phone || '+91 7200853683',
    emergencyRelation: user?.emergencyContact?.relation || 'Mother',
    bloodGroup: user?.bloodGroup || 'B+',
    allergies: user?.allergies?.join(', ') || 'Penicillin',
    medicalConditions: user?.medicalConditions?.join(', ') || 'Mild Period Fatigue',
    currentMedications: user?.currentMedications?.join(', ') || 'Folic Acid, Vitamin D3',
    previousMedications: user?.previousMedications?.join(', ') || 'Iron Supplement (2025)',
    currentTreatment: user?.currentTreatment || 'Holistic Cycle & Hydration Pacing',
    previousTreatment: user?.previousTreatment || 'None',
    previousSurgeries: user?.previousSurgeries || 'None',
    doctorName: user?.doctorDetails?.name || 'Dr. Priya Raman (MD, FICOG)',
    doctorClinic: user?.doctorDetails?.clinic || 'City Women & Child Hospital, Adyar',
    doctorPhone: user?.doctorDetails?.phone || '+91 44 2836 1000'
  });

  // Clinical Questions State
  const [questionAnswers, setQuestionAnswers] = useState({
    allergiesQ: 'yes',
    pcosThyroidQ: 'no',
    painQ: 'yes',
    supplementsQ: 'yes'
  });

  const handleAnswerSelect = (qKey, value) => {
    if (!isEditing) return;
    setQuestionAnswers(prev => ({ ...prev, [qKey]: value }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        age: Number(formData.age),
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relation: formData.emergencyRelation
        },
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies ? formData.allergies.split(',').map((s) => s.trim()) : [],
        medicalConditions: formData.medicalConditions ? formData.medicalConditions.split(',').map((s) => s.trim()) : [],
        currentMedications: formData.currentMedications ? formData.currentMedications.split(',').map((s) => s.trim()) : [],
        previousMedications: formData.previousMedications ? formData.previousMedications.split(',').map((s) => s.trim()) : [],
        currentTreatment: formData.currentTreatment,
        previousTreatment: formData.previousTreatment,
        previousSurgeries: formData.previousSurgeries,
        doctorDetails: {
          name: formData.doctorName,
          clinic: formData.doctorClinic,
          phone: formData.doctorPhone
        }
      };

      await updateProfile(payload);
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch (err) {
      alert(err.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px 16px' }}>
      
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
              fontSize: '1.9rem',
              color: 'white',
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.35)',
              flexShrink: 0
            }}
          >
            👩‍⚕️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
                {dict.pageTitle}
              </h1>
              <span className="badge badge-pink" style={{ gap: '5px', fontWeight: 700 }}>
                <Lock size={12} /> {dict.hipaaBadge}
              </span>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              {dict.pageSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? 'btn-secondary' : 'btn-primary'}
          style={{ padding: '11px 24px', fontWeight: 700, borderRadius: '14px', fontSize: '0.92rem' }}
        >
          {isEditing ? dict.cancelBtn : dict.editBtn}
        </button>
      </div>

      {/* Save Success Alert */}
      {saved && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            color: '#065f46',
            borderRadius: '16px',
            padding: '14px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
          }}
        >
          <Check size={20} color="#059669" />
          <span>{dict.savedMsg}</span>
        </div>
      )}

      <DisclaimerBanner />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* SECTION 1: PERSONAL & EMERGENCY CONTACT */}
        <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: '20px', border: '1px solid #fed7aa' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#9a3412', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
            <User size={22} color="#ea580c" />
            <span>{dict.secPersonal}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.fullName}</label>
              <input
                type="text"
                name="name"
                disabled={!isEditing}
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.age}</label>
              <input
                type="number"
                name="age"
                disabled={!isEditing}
                value={formData.age}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.dob}</label>
              <input
                type="date"
                name="dateOfBirth"
                disabled={!isEditing}
                value={formData.dateOfBirth}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.email}</label>
              <input
                type="email"
                disabled
                value={formData.email}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #cbd5e1', marginTop: '5px', background: '#f1f5f9', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.phone}</label>
              <input
                type="tel"
                name="phone"
                disabled={!isEditing}
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 700, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.emergencyName}</label>
              <input
                type="text"
                name="emergencyName"
                disabled={!isEditing}
                value={formData.emergencyName}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.emergencyRelation}</label>
              <input
                type="text"
                name="emergencyRelation"
                disabled={!isEditing}
                value={formData.emergencyRelation}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#b91c1c' }}>{dict.emergencyPhone}</label>
              <input
                type="tel"
                name="emergencyPhone"
                disabled={!isEditing}
                value={formData.emergencyPhone}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '2px solid #f87171', marginTop: '5px', background: isEditing ? 'white' : '#fef2f2', fontWeight: 800, color: '#991b1b', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: CLINICAL HISTORY, ALLERGIES & TREATMENTS */}
        <div className="glass-card" style={{ padding: '26px', background: 'white', borderRadius: '20px', border: '1px solid #fecdd3' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#9f1239', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
            <Stethoscope size={22} color="#e11d48" />
            <span>{dict.secClinical}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.bloodGroup}</label>
              <input
                type="text"
                name="bloodGroup"
                disabled={!isEditing}
                value={formData.bloodGroup}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 800, color: '#e11d48', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.allergies}</label>
              <input
                type="text"
                name="allergies"
                disabled={!isEditing}
                value={formData.allergies}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.conditions}</label>
              <input
                type="text"
                name="medicalConditions"
                disabled={!isEditing}
                value={formData.medicalConditions}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.currentMeds}</label>
              <input
                type="text"
                name="currentMedications"
                disabled={!isEditing}
                value={formData.currentMedications}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.previousMeds}</label>
              <input
                type="text"
                name="previousMedications"
                disabled={!isEditing}
                value={formData.previousMedications}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.currentTreatment}</label>
              <input
                type="text"
                name="currentTreatment"
                disabled={!isEditing}
                value={formData.currentTreatment}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.surgeries}</label>
              <input
                type="text"
                name="previousSurgeries"
                disabled={!isEditing}
                value={formData.previousSurgeries}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.doctorName}</label>
              <input
                type="text"
                name="doctorName"
                disabled={!isEditing}
                value={formData.doctorName}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.doctorClinic}</label>
              <input
                type="text"
                name="doctorClinic"
                disabled={!isEditing}
                value={formData.doctorClinic}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{dict.doctorPhone}</label>
              <input
                type="tel"
                name="doctorPhone"
                disabled={!isEditing}
                value={formData.doctorPhone}
                onChange={handleChange}
                style={{ width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid #fecdd3', marginTop: '5px', background: isEditing ? 'white' : '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE HEALTH EVALUATION QUESTIONS & ANSWERS (Requested by user) */}
        <div className="glass-card" style={{ padding: '26px', background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)', borderRadius: '20px', border: '1.5px solid #ddd6fe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <FileCheck2 size={22} color="#7c3aed" />
            <h3 style={{ fontSize: '1.2rem', color: '#5b21b6', margin: 0, fontWeight: 800 }}>
              {dict.secQuestions}
            </h3>
          </div>
          <p style={{ margin: '4px 0 18px 0', fontSize: '0.86rem', color: '#6d28d9' }}>
            {dict.secQuestionsSub}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'allergiesQ', question: dict.qAllergies },
              { id: 'pcosThyroidQ', question: dict.qPcosThyroid },
              { id: 'painQ', question: dict.qPain },
              { id: 'supplementsQ', question: dict.qSupplements }
            ].map(item => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  border: '1px solid #e9d5ff',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', flex: 1, minWidth: '240px' }}>
                  {item.question}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {['yes', 'no', 'unsure'].map(val => {
                    const isSelected = questionAnswers[item.id] === val;
                    const label = val === 'yes' ? dict.ansYes : val === 'no' ? dict.ansNo : dict.ansUnsure;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleAnswerSelect(item.id, val)}
                        style={{
                          background: isSelected
                            ? (val === 'yes' ? '#10b981' : val === 'no' ? '#ef4444' : '#6366f1')
                            : '#f8fafc',
                          color: isSelected ? 'white' : '#475569',
                          border: isSelected ? 'none' : '1px solid #cbd5e1',
                          padding: '7px 14px',
                          borderRadius: '10px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: isEditing ? 'pointer' : 'default',
                          opacity: isEditing || isSelected ? 1 : 0.6,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button (when editing) */}
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                padding: '14px 34px',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(244, 63, 94, 0.35)'
              }}
            >
              <Save size={18} />
              <span>{loading ? dict.saving : dict.saveChanges}</span>
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
