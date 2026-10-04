import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Folder,
  FolderPlus,
  FileText,
  Upload,
  Search,
  Download,
  Trash2,
  Edit2,
  MoveRight,
  Eye,
  CheckCircle,
  FileImage,
  X,
  Lock,
  Calendar,
  User,
  Building,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

const VAULT_I18N = {
  en: {
    pageTitle: "My Health Vault",
    pageSubtitle: "Privately organize and access your medical reports, scan results, lab work, and doctor prescriptions.",
    digiBadge: "DigiLocker Encrypted Storage",
    uploadBtn: "Upload Medical Record",
    searchPlaceholder: "Search documents by name, doctor, hospital, or tags...",
    folderLabel: "Folder:",
    allFolders: "🌟 All Folders",
    categoriesTitle: "Document Categories",
    filesCount: "Files",
    storedDocsTitle: "Stored Documents",
    noDocsTitle: "No documents found",
    noDocsSubtitle: "Upload your lab tests, prescriptions, and ultrasound scans for organized, secure access.",
    btnDownload: "Download",
    btnPreview: "Preview",
    btnRename: "Rename",
    btnMove: "Move",
    btnDelete: "Delete",
    modalUploadTitle: "Upload Medical Document",
    modalSelectFile: "Select File (PDF, JPG, PNG)",
    modalFolder: "Folder Category",
    modalDesc: "Brief Description / Diagnostic Notes",
    modalDoctor: "Prescribing / Consulting Doctor",
    modalHospital: "Hospital / Diagnostic Lab",
    modalDate: "Report Date",
    modalCancel: "Cancel",
    modalSubmit: "Upload Document",
    modalRenameTitle: "Rename Document",
    modalNewName: "New Document Name",
    modalMoveTitle: "Move Document to Folder",
    modalTargetFolder: "Target Folder",
    disclaimer: "Health Vault stores documents exclusively for your personal reference and medical history. Never share your account credentials with unauthorized persons.",
    faqSecurityQ: "How secure is my health vault data?",
    faqSecurityA: "All files are user-isolated and encrypted using AES-256 standard, accessible only with your authenticated credentials.",
    faqShareQ: "Can I share these reports with my gynecologist?",
    faqShareA: "Yes, you can preview or download official PDFs directly to show your consulting doctor."
  },
  ta: {
    pageTitle: "என் மருத்துவ பெட்டகம் (Health Vault)",
    pageSubtitle: "உங்கள் ரத்தப் பரிசோதனை, ஸ்கேன், மருந்து சீட்டுகள் மற்றும் மருத்துவ அறிக்கைகளை பாதுகாப்பாக நிர்வகிக்கவும்.",
    digiBadge: "டிஜிலாக்கர் குறியாக்கப்பட்ட சேமிப்பகம்",
    uploadBtn: "மருத்துவ ஆவணத்தை பதிவேற்று (Upload)",
    searchPlaceholder: "ஆவணம், மருத்துவர் பெயர், மருத்துவமனை அல்லது வகை தேடவும்...",
    folderLabel: "கோப்புறை (Folder):",
    allFolders: "🌟 அனைத்து கோப்புறைகளும்",
    categoriesTitle: "மருத்துவ ஆவண பிரிவுகள் (Categories)",
    filesCount: "கோப்புகள்",
    storedDocsTitle: "சேமிக்கப்பட்ட ஆவணங்கள்",
    noDocsTitle: "ஆவணங்கள் ஏதுமில்லை",
    noDocsSubtitle: "உங்கள் லேப் ரிசல்ட்கள், மருந்து சீட்டுகள் மற்றும் ஸ்கேன் அறிக்கைகளை இங்கு பதிவேற்றலாம்.",
    btnDownload: "பதிவிறக்கு (Download)",
    btnPreview: "பார்வையிடு (Preview)",
    btnRename: "பெயர் மாற்று",
    btnMove: "நகர்த்து",
    btnDelete: "நீக்கு (Delete)",
    modalUploadTitle: "மருத்துவ ஆவணத்தை பதிவேற்றவும்",
    modalSelectFile: "கோப்பைத் தேர்வு செய்யவும் (PDF, JPG, PNG)",
    modalFolder: "ஆவணப் பிரிவு / கோப்புறை",
    modalDesc: "சுருக்கமான விளக்கம் / குறிப்புகள்",
    modalDoctor: "மருத்துவர் பெயர்",
    modalHospital: "மருத்துவமனை / லேப் பெயர்",
    modalDate: "அறிக்கை தேதி",
    modalCancel: "ரத்து செய் (Cancel)",
    modalSubmit: "ஆவணத்தை பதிவேற்று (Upload)",
    modalRenameTitle: "ஆவணப் பெயரை மாற்றவும்",
    modalNewName: "புதிய ஆவணப் பெயர்",
    modalMoveTitle: "கோப்புறையை மாற்றவும்",
    modalTargetFolder: "இடமாற்ற வேண்டிய கோப்புறை",
    disclaimer: "மருத்துவ பெட்டகத்தில் உள்ள ஆவணங்கள் உங்கள் சொந்த பயன்பாட்டிற்கும் மருத்துவ ஆலோசனைக்கும் மட்டுமே சேமிக்கப்படுகின்றன.",
    faqSecurityQ: "என் மருத்துவ ஆவணங்கள் எவ்வளவு பாதுகாப்பானவை?",
    faqSecurityA: "உங்கள் அனைத்து ஆவணங்களும் AES-256 குறியாக்கத்துடன் உங்கள் தனிப்பட்ட கணக்கிற்குள் மட்டுமே பாதுகாக்கப்படும்.",
    faqShareQ: "இதை என் மகளிர் மருத்துவரிடம் காட்டலாமா?",
    faqShareA: "ஆம், ஆவணங்களை நேரடியாக பதிவிறக்கம் செய்தோ அல்லது திரையிலோ உங்கள் மருத்துவரிடம் காட்டலாம்."
  },
  hi: {
    pageTitle: "मेरा हेल्थ वॉल्ट (Health Vault)",
    pageSubtitle: "अपनी मेडिकल रिपोर्ट, स्कैन परिणाम, लैब परीक्षण और डॉक्टर के पर्चे सुरक्षित रूप से व्यवस्थित करें।",
    digiBadge: "डिजीलॉकर एन्क्रिप्टेड स्टोरेज",
    uploadBtn: "मेडिकल रिकॉर्ड अपलोड करें (Upload)",
    searchPlaceholder: "दस्तावेज़, डॉक्टर या अस्पताल के नाम से खोजें...",
    folderLabel: "फ़ोल्डर (Folder):",
    allFolders: "🌟 सभी फ़ोल्डर",
    categoriesTitle: "दस्तावेज़ श्रेणियां (Categories)",
    filesCount: "फ़ाइलें",
    storedDocsTitle: "सहेजे गए दस्तावेज़",
    noDocsTitle: "कोई दस्तावेज़ नहीं मिला",
    noDocsSubtitle: "सुरक्षित पहुंच के लिए अपनी लैब रिपोर्ट और पर्चे अपलोड करें।",
    btnDownload: "डाउनलोड (Download)",
    btnPreview: "देखें (Preview)",
    btnRename: "नाम बदलें",
    btnMove: "स्थानांतरित करें",
    btnDelete: "हटाएं (Delete)",
    modalUploadTitle: "चिकित्सीय दस्तावेज़ अपलोड करें",
    modalSelectFile: "फ़ाइल चुनें (PDF, JPG, PNG)",
    modalFolder: "फ़ोल्डर श्रेणी",
    modalDesc: "संक्षिप्त विवरण / नोट्स",
    modalDoctor: "डॉक्टर का नाम",
    modalHospital: "अस्पताल / लैब",
    modalDate: "रिपोर्ट की तिथि",
    modalCancel: "रद्द करें",
    modalSubmit: "अपलोड करें",
    modalRenameTitle: "दस्तावेज़ का नाम बदलें",
    modalNewName: "नया नाम",
    modalMoveTitle: "फ़ोल्डर में ले जाएं",
    modalTargetFolder: "लक्ष्य फ़ोल्डर",
    disclaimer: "हेल्थ वॉल्ट दस्तावेज़ों को केवल आपके व्यक्तिगत संदर्भ के लिए सुरक्षित रूप से संग्रहीत करता है।",
    faqSecurityQ: "मेरा डेटा कितना सुरक्षित है?",
    faqSecurityA: "सभी फाइलें पूरी तरह से एन्क्रिप्टेड हैं और केवल आपकी निजी आईडी से ही खोली जा सकती हैं।",
    faqShareQ: "क्या मैं इसे डॉक्टर को दिखा सकती हूँ?",
    faqShareA: "हाँ, परामर्श के दौरान आप सीधे पीडीएफ डाउनलोड या पूर्वावलोकन कर सकती हैं।"
  },
  te: {
    pageTitle: "నా హెల్త్ వాల్ట్ (Health Vault)",
    pageSubtitle: "మీ వైద్య నివేదికలు, స్కాన్ ఫలితాలు మరియు ప్రిస్క్రిప్షన్లను సురక్షితంగా నిర్వహించండి.",
    digiBadge: "ఎన్‌క్రిప్టెడ్ స్టోరేజ్",
    uploadBtn: "రికార్డును అప్‌లోడ్ చేయండి",
    searchPlaceholder: "పత్రాలు వెతకండి...",
    folderLabel: "ఫోల్డర్:",
    allFolders: "🌟 అన్ని ఫోల్డర్లు",
    categoriesTitle: "విభాగాలు",
    filesCount: "ఫైళ్లు",
    storedDocsTitle: "నిల్వ చేసిన పత్రాలు",
    noDocsTitle: "పత్రాలు ఏవీ లేవు",
    noDocsSubtitle: "సురక్షిత యాక్సెస్ కోసం మీ వైద్య నివేదికలను అప్‌లోడ్ చేయండి.",
    btnDownload: "డౌన్‌లోడ్",
    btnPreview: "చూడండి",
    btnRename: "పేరు మార్చండి",
    btnMove: "తరలించండి",
    btnDelete: "తొలగించండి",
    modalUploadTitle: "వైద్య పత్రాన్ని అప్‌లోడ్ చేయండి",
    modalSelectFile: "ఫైల్‌ను ఎంచుకోండి",
    modalFolder: "ఫోల్డర్ వర్గం",
    modalDesc: "వివరణ",
    modalDoctor: "వైద్యుడి పేరు",
    modalHospital: "ఆసుపత్రి",
    modalDate: "తేదీ",
    modalCancel: "రద్దు",
    modalSubmit: "అప్‌లోడ్",
    modalRenameTitle: "పేరు మార్చండి",
    modalNewName: "కొత్త పేరు",
    modalMoveTitle: "ఫోల్డర్‌కు తరలించండి",
    modalTargetFolder: "లక్ష్య ఫోల్డర్",
    disclaimer: "హెల్త్ వాల్ట్ మీ వ్యక్తిగత ఉపయోగం కోసం మాత్రమే పత్రాలను నిల్వ చేస్తుంది.",
    faqSecurityQ: "పత్రాలు ఎంత సురక్షితం?",
    faqSecurityA: "అన్ని పత్రాలు AES-256 భద్రతతో సురక్షితంగా ఉంటాయి.",
    faqShareQ: "వైద్యుడితో పంచుకోవచ్చా?",
    faqShareA: "అవును, సంప్రదింపుల సమయంలో నేరుగా చూపించవచ్చు."
  },
  ml: {
    pageTitle: "എന്റെ ഹെൽത്ത് വോൾട്ട് (Health Vault)",
    pageSubtitle: "നിങ്ങളുടെ മെഡിക്കൽ റിപ്പോർട്ടുകൾ, സ്കാനുകൾ, കുറിപ്പടികൾ എന്നിവ സുരക്ഷിതമായി സൂക്ഷിക്കുക.",
    digiBadge: "എൻക്രിപ്റ്റ് ചെയ്ത സ്റ്റോറേജ്",
    uploadBtn: "രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക",
    searchPlaceholder: "തിരയുക...",
    folderLabel: "ഫോൾഡർ:",
    allFolders: "🌟 എല്ലാ ഫോൾഡറുകളും",
    categoriesTitle: "വിഭാഗങ്ങൾ",
    filesCount: "ഫയലുകൾ",
    storedDocsTitle: "സൂക്ഷിച്ച രേഖകൾ",
    noDocsTitle: "രേഖകളൊന്നും കണ്ടെത്തിയില്ല",
    noDocsSubtitle: "റിപ്പോർട്ടുകൾ ഇവിടെ അപ്‌ലോഡ് ചെയ്യുക.",
    btnDownload: "ഡൗൺലോഡ്",
    btnPreview: "കാണുക",
    btnRename: "പേര് മാറ്റുക",
    btnMove: "മാറ്റുക",
    btnDelete: "ഡിലീറ്റ്",
    modalUploadTitle: "രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക",
    modalSelectFile: "ഫയൽ തിരഞ്ഞെടുക്കുക",
    modalFolder: "വിഭാഗം",
    modalDesc: "വിവരണം",
    modalDoctor: "ഡോക്ടർ",
    modalHospital: "ആശുപത്രി",
    modalDate: "തീയതി",
    modalCancel: "റദ്ദാക്കുക",
    modalSubmit: "അപ്‌ലോഡ്",
    modalRenameTitle: "പേര് മാറ്റുക",
    modalNewName: "പുതിയ പേര്",
    modalMoveTitle: "ഫോൾഡറിലേക്ക് മാറ്റുക",
    modalTargetFolder: "ഫോൾഡർ",
    disclaimer: "മെഡിക്കൽ റിപ്പോർട്ടുകൾ നിങ്ങളുടെ സ്വകാര്യ ആവശ്യങ്ങൾക്കായി മാത്രം സൂക്ഷിക്കുന്നു.",
    faqSecurityQ: "ഫയലുകൾ സുരക്ഷിതമാണോ?",
    faqSecurityA: "നിങ്ങളുടെ ഫയലുകൾ പൂർണ്ണമായും എൻക്രിപ്റ്റ് ചെയ്തതാണ്.",
    faqShareQ: "ഡോക്ടറുമായി പങ്കിടാമോ?",
    faqShareA: "അതെ, പരിശോധന സമയത്ത് നേരിട്ട് കാണിക്കാം."
  },
  mr: {
    pageTitle: "माझे हेल्थ व्हॉल्ट (Health Vault)",
    pageSubtitle: "तुमचे वैद्यकीय अहवाल, स्कॅन, रक्त तपासणी आणि डॉक्टरांचे प्रिस्क्रिप्शन सुरक्षितपणे व्यवस्थापित करा.",
    digiBadge: "सुरक्षित स्टोरेज",
    uploadBtn: "रेकॉर्ड अपलोड करा",
    searchPlaceholder: "दस्तऐवज शोधा...",
    folderLabel: "फोल्डर:",
    allFolders: "🌟 सर्व फोल्डर्स",
    categoriesTitle: "श्रेण्या",
    filesCount: "फायली",
    storedDocsTitle: "जतन केलेले दस्तऐवज",
    noDocsTitle: "कोणतेही दस्तऐवज आढळले नाही",
    noDocsSubtitle: "सुरक्षिततेसाठी तुमचे अहवाल अपलोड करा.",
    btnDownload: "डाउनलोड",
    btnPreview: "पहा",
    btnRename: "नाव बदला",
    btnMove: "हलवा",
    btnDelete: "हटवा",
    modalUploadTitle: "दस्तऐवज अपलोड करा",
    modalSelectFile: "फाइल निवडा",
    modalFolder: "फोल्डर श्रेणी",
    modalDesc: "तपशील",
    modalDoctor: "डॉक्टरांचे नाव",
    modalHospital: "रुग्णालय",
    modalDate: "तारीख",
    modalCancel: "रद्द करा",
    modalSubmit: "अपलोड करा",
    modalRenameTitle: "नाव बदला",
    modalNewName: "नवीन नाव",
    modalMoveTitle: "फोल्डरमध्ये हलवा",
    modalTargetFolder: "लक्ष्य फोल्डर",
    disclaimer: "हेल्थ व्हॉल्ट केवळ तुमच्या वैयक्तिक वापरासाठी दस्तऐवज संग्रहित करतो.",
    faqSecurityQ: "माझा डेटा सुरक्षित आहे का?",
    faqSecurityA: "होय, सर्व फायली सुरक्षितपणे एन्क्रिप्ट केल्या आहेत.",
    faqShareQ: "मी हे डॉक्टरांना दाखवू शकते का?",
    faqShareA: "होय, तपासणी दरम्यान तुम्ही थेट अहवाल दाखवू शकता."
  },
  mwr: {
    pageTitle: "म्हारो हेल्थ वॉल्ट (Health Vault)",
    pageSubtitle: "सगळी मेडिकल रिपोर्ट, खून री जांच, पर्चियां अर सोनोग्राफी रिपोर्ट सुरक्षित राखो।",
    digiBadge: "सुरक्षित स्टोरेज",
    uploadBtn: "रिपोर्ट अपलोड करो (Upload)",
    searchPlaceholder: "दस्तावेज खोजो...",
    folderLabel: "फोल्डर:",
    allFolders: "🌟 सगळा फोल्डर",
    categoriesTitle: "श्रेणियां",
    filesCount: "फाइलां",
    storedDocsTitle: "राखेड़ा कागज",
    noDocsTitle: "कोई रिपोर्ट कोनी मिली",
    noDocsSubtitle: "थांकी मेडिकल रिपोर्ट इठै अपलोड करो।",
    btnDownload: "डाउनलोड",
    btnPreview: "देख्यो",
    btnRename: "नाम बदलो",
    btnMove: "दूजी जग्या राखो",
    btnDelete: "हटाओ",
    modalUploadTitle: "रिपोर्ट अपलोड करो",
    modalSelectFile: "फाइल चुणो",
    modalFolder: "फोल्डर",
    modalDesc: "विगत",
    modalDoctor: "डॉक्टर को नाम",
    modalHospital: "अस्पताल",
    modalDate: "तारीख",
    modalCancel: "कैंसिल",
    modalSubmit: "अपलोड",
    modalRenameTitle: "नाम बदलो",
    modalNewName: "नयो नाम",
    modalMoveTitle: "दूजे फोल्डर म लेवो",
    modalTargetFolder: "फोल्डर",
    disclaimer: "थांको स्वास्थ्य डेटा पूरो सुरक्षित है।",
    faqSecurityQ: "कागज सुरक्षित है काईं?",
    faqSecurityA: "हाँ, सगळी फाइलां पूरी सुरक्षित है।",
    faqShareQ: "लेडी डॉक्टर न दिखा सकां काईं?",
    faqShareA: "हाँ, इलाज रा बगत सीधा दिखा सको हो।"
  },
  fr: {
    pageTitle: "Mon Coffre-Fort Santé (Health Vault)",
    pageSubtitle: "Organisez et consultez vos bilans médicaux, échographies, analyses sanguines et ordonnances.",
    digiBadge: "Stockage Sécurisé Chiffré",
    uploadBtn: "Téléverser un Document",
    searchPlaceholder: "Rechercher par nom, médecin, hôpital...",
    folderLabel: "Dossier :",
    allFolders: "🌟 Tous les Dossiers",
    categoriesTitle: "Catégories de Documents",
    filesCount: "Fichiers",
    storedDocsTitle: "Documents Enregistrés",
    noDocsTitle: "Aucun document trouvé",
    noDocsSubtitle: "Téléversez vos ordonnances et bilans pour un accès sécurisé.",
    btnDownload: "Télécharger",
    btnPreview: "Aperçu",
    btnRename: "Renommer",
    btnMove: "Déplacer",
    btnDelete: "Supprimer",
    modalUploadTitle: "Téléverser un Document Médical",
    modalSelectFile: "Sélectionner un fichier",
    modalFolder: "Catégorie de Dossier",
    modalDesc: "Description ou remarques",
    modalDoctor: "Médecin Prescripteur",
    modalHospital: "Hôpital / Laboratoire",
    modalDate: "Date du Rapport",
    modalCancel: "Annuler",
    modalSubmit: "Téléverser",
    modalRenameTitle: "Renommer le Document",
    modalNewName: "Nouveau Nom",
    modalMoveTitle: "Déplacer vers un Dossier",
    modalTargetFolder: "Dossier Cible",
    disclaimer: "Le Coffre-Fort Santé conserve vos documents pour votre suivi médical personnel.",
    faqSecurityQ: "Mes données sont-elles sécurisées ?",
    faqSecurityA: "Tous les documents sont chiffrés selon la norme AES-256 et isolés par compte.",
    faqShareQ: "Puis-je les partager avec ma gynécologue ?",
    faqShareA: "Oui, vous pouvez les télécharger ou les présenter lors de vos consultations."
  },
  lb: {
    pageTitle: "خزانتي الطبية الآمنة (Health Vault)",
    pageSubtitle: "تنظيم وحفظ الفحوصات المخبرية، صور الأشعة، السونار والوصفات الطبية بشكل مشفر.",
    digiBadge: "تخزين مشفر آمن",
    uploadBtn: "رفع مستند طبي",
    searchPlaceholder: "ابحثي عن ملف، طبيب، أو مستشفى...",
    folderLabel: "المجلد:",
    allFolders: "🌟 كل المجلدات",
    categoriesTitle: "تصنيفات الملفات",
    filesCount: "ملفات",
    storedDocsTitle: "الملفات المحفوظة",
    noDocsTitle: "لم يتم العثور على ملفات",
    noDocsSubtitle: "ارفعي تقاريرك الطبية هنا للوصول إليها في أي وقت.",
    btnDownload: "تحميل",
    btnPreview: "معاينة",
    btnRename: "تعديل الاسم",
    btnMove: "نقل",
    btnDelete: "حذف",
    modalUploadTitle: "رفع مستند طبي جديد",
    modalSelectFile: "اختيار الملف",
    modalFolder: "المجلد المستهدف",
    modalDesc: "ملاحظات وتفاصيل",
    modalDoctor: "اسم الطبيب",
    modalHospital: "المستشفى أو المختبر",
    modalDate: "تاريخ الفحص",
    modalCancel: "إلغاء",
    modalSubmit: "رفع المستند",
    modalRenameTitle: "تعديل اسم المستند",
    modalNewName: "الاسم الجديد",
    modalMoveTitle: "نقل إلى مجلد آخر",
    modalTargetFolder: "المجلد الجديد",
    disclaimer: "الخزانة الطبية تحفظ مستنداتك لمرجعك الشخصي وصحتك فقط.",
    faqSecurityQ: "ما مدى أمان الملفات المرفوعة؟",
    faqSecurityA: "جميع الفحوصات مشفرة وفق بروتوكول AES-256 ولا يمكن الوصول إليها إلا بحسابك.",
    faqShareQ: "هل يمكنني مشاركتها مع طبيبة النسائية؟",
    faqShareA: "نعم، يمكنك عرض أو تحميل الملفات مباشرة أثناء الاستشارة الطبية."
  },
  ar: {
    pageTitle: "الخزنة الصحية المشفرة (Health Vault)",
    pageSubtitle: "حفظ وتنظيم تقارير التحاليل، صور السونار، والأشعة والوصفات الطبية بأمان تام.",
    digiBadge: "تخزين طبي مشفر وآمن",
    uploadBtn: "رفع تقرير طبي (Upload)",
    searchPlaceholder: "البحث في التقارير الطبية...",
    folderLabel: "المجلد:",
    allFolders: "🌟 جميع المجلدات",
    categoriesTitle: "أقسام الملفات والتقارير",
    filesCount: "ملفات",
    storedDocsTitle: "التقارير الطبية المخزنة",
    noDocsTitle: "لا توجد مستندات مسجلة",
    noDocsSubtitle: "قومي برفع تقارير التحاليل والوصفات الطبية للوصول إليها في أي وقت.",
    btnDownload: "تحميل (Download)",
    btnPreview: "معاينة (Preview)",
    btnRename: "إعادة تسمية",
    btnMove: "نقل الملف",
    btnDelete: "حذف (Delete)",
    modalUploadTitle: "رفع تقرير أو فحص طبي جديد",
    modalSelectFile: "اختيار الملف (PDF, JPG, PNG)",
    modalFolder: "قسم التخزين",
    modalDesc: "وصف أو ملاحظات الفحص",
    modalDoctor: "اسم الطبيب المعالج",
    modalHospital: "المستشفى / المختبر",
    modalDate: "تاريخ التقرير",
    modalCancel: "إلغاء",
    modalSubmit: "تأكيد الرفع",
    modalRenameTitle: "تعديل اسم التقرير",
    modalNewName: "الاسم الجديد",
    modalMoveTitle: "نقل إلى قسم آخر",
    modalTargetFolder: "القسم المطلوب",
    disclaimer: "تحتفظ الخزنة الطبية بملفاتكِ لمرجعكِ واستشاراتكِ الطبية فقط.",
    faqSecurityQ: "هل التقارير آمنة من أي اختراق؟",
    faqSecurityA: "تخضع جميع الفحوصات لأعلى معايير التشفير الطبي العالمي ولا يمكن لأحد الاطلاع عليها.",
    faqShareQ: "هل أستطيع إبرازها للطبيبة؟",
    faqShareA: "نعم، يمكنكِ تحميل أو فتح أي تقرير بنقرة زر واحدة أمام طبيبة النساء."
  }
};

const FOLDER_NAMES_LOCAL = {
  ta: {
    'Medical Reports': 'மருத்துவ அறிக்கைகள் (Reports)',
    'Prescriptions': 'மருந்து சீட்டுகள் (Prescriptions)',
    'Lab Results': 'ஆய்வக முடிவுகள் (Lab Results)',
    'Blood Tests': 'ரத்த பரிசோதனைகள் (Blood Tests)',
    'Scan Reports': 'ஸ்கேன் அறிக்கைகள் (Scan Reports)',
    'Ultrasound Reports': 'அல்ட்ராசவுண்ட் ஸ்கேன் (Ultrasound)',
    'Thyroid Reports': 'தைராய்டு பரிசோதனை (Thyroid)',
    'PCOS / PCOD Reports': 'PCOS / PCOD அறிக்கைகள்',
    'Pregnancy Records': 'கர்ப்பகால பதிவுகள் (Pregnancy)',
    'Vaccination Records': 'தடுப்பூசி அட்டவணை (Vaccine)',
    'Doctor Prescriptions': 'மருத்துவர் பரிந்துரைகள்',
    'Previous Medical Records': 'பழைய மருத்துவ ஆவணங்கள்',
    'Other Documents': 'இதர ஆவணங்கள்'
  },
  hi: {
    'Medical Reports': 'मेडिकल रिपोर्ट (Medical Reports)',
    'Prescriptions': 'दवा के पर्चे (Prescriptions)',
    'Lab Results': 'लैब टेस्ट रिपोर्ट (Lab Results)',
    'Blood Tests': 'रक्त परीक्षण (Blood Tests)',
    'Scan Reports': 'स्कैन रिपोर्ट (Scan Reports)',
    'Ultrasound Reports': 'अल्ट्रासाउंड रिपोर्ट (Ultrasound)',
    'Thyroid Reports': 'थायराइड रिपोर्ट (Thyroid)',
    'PCOS / PCOD Reports': 'PCOS / PCOD रिपोर्ट',
    'Pregnancy Records': 'गर्भावस्था रिकॉर्ड (Pregnancy)',
    'Vaccination Records': 'टीकाकरण रिकॉर्ड',
    'Doctor Prescriptions': 'डॉक्टर के पर्चे',
    'Previous Medical Records': 'पुराने मेडिकल रिकॉर्ड',
    'Other Documents': 'अन्य दस्तावेज़'
  }
};

export default function HealthVault() {
  const { language } = useLanguage();
  const dict = VAULT_I18N[language] || VAULT_I18N.ta || VAULT_I18N.en;

  const [folders, setFolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameDoc, setRenameDoc] = useState(null);
  const [newName, setNewName] = useState('');
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [moveDoc, setMoveDoc] = useState(null);
  const [targetFolder, setTargetFolder] = useState('');

  // Upload Form State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFolder, setUploadFolder] = useState('Medical Reports');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadDoctor, setUploadDoctor] = useState('');
  const [uploadHospital, setUploadHospital] = useState('');
  const [uploadDate, setUploadDate] = useState(new Date().toISOString().split('T')[0]);

  const defaultFolderList = [
    'Medical Reports',
    'Prescriptions',
    'Lab Results',
    'Blood Tests',
    'Scan Reports',
    'Ultrasound Reports',
    'Thyroid Reports',
    'PCOS / PCOD Reports',
    'Pregnancy Records',
    'Vaccination Records',
    'Doctor Prescriptions',
    'Previous Medical Records',
    'Other Documents'
  ];

  const getFolderLabel = (fName) => {
    if (FOLDER_NAMES_LOCAL[language] && FOLDER_NAMES_LOCAL[language][fName]) {
      return FOLDER_NAMES_LOCAL[language][fName];
    }
    return fName;
  };

  const fetchVault = async () => {
    setLoading(true);
    try {
      const [foldersRes, docsRes] = await Promise.allSettled([
        api.get('/vault/folders'),
        api.get(`/vault/documents?folder=${encodeURIComponent(selectedFolder)}&search=${encodeURIComponent(searchQuery)}`)
      ]);

      if (foldersRes.status === 'fulfilled' && foldersRes.value.success) {
        setFolders(foldersRes.value.folders);
      }
      if (docsRes.status === 'fulfilled' && docsRes.value.success) {
        setDocuments(docsRes.value.documents);
      }
    } catch (err) {
      console.warn('Vault fetch fallback:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVault();
  }, [selectedFolder, searchQuery]);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert('Please select a file to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('folder', uploadFolder);
      formData.append('description', uploadDesc);
      formData.append('doctorName', uploadDoctor);
      formData.append('hospitalName', uploadHospital);
      formData.append('medicalDate', uploadDate);

      const res = await api.postForm('/vault/upload', formData);
      if (res.success) {
        setShowUploadModal(false);
        setUploadFile(null);
        setUploadDesc('');
        setUploadDoctor('');
        setUploadHospital('');
        fetchVault();
      }
    } catch (err) {
      alert(err.message || 'Error uploading document');
    }
  };

  const handleDeleteDoc = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this document from your Health Vault?')) return;
    try {
      await api.delete(`/vault/documents/${id}`);
      fetchVault();
    } catch (err) {
      alert(err.message || 'Delete error');
    }
  };

  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !renameDoc) return;
    try {
      await api.put(`/vault/documents/${renameDoc._id}/rename`, { newName: newName.trim() });
      setShowRenameModal(false);
      setRenameDoc(null);
      fetchVault();
    } catch (err) {
      alert(err.message || 'Rename error');
    }
  };

  const handleMoveSubmit = async (e) => {
    e.preventDefault();
    if (!targetFolder || !moveDoc) return;
    try {
      await api.put(`/vault/documents/${moveDoc._id}/move`, { newFolder: targetFolder });
      setShowMoveModal(false);
      setMoveDoc(null);
      fetchVault();
    } catch (err) {
      alert(err.message || 'Move error');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header Banner */}
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
            📁
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
                {dict.pageTitle}
              </h1>
              <span className="badge badge-pink" style={{ gap: '5px', fontWeight: 700 }}>
                <Lock size={12} /> {dict.digiBadge}
              </span>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              {dict.pageSubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="btn-primary"
          style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '14px', fontWeight: 700 }}
        >
          <Upload size={18} />
          <span>{dict.uploadBtn}</span>
        </button>
      </div>

      <DisclaimerBanner customText={dict.disclaimer} />

      {/* SEARCH AND FILTER BAR */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
        <div
          style={{
            flex: 1,
            minWidth: '260px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'white',
            border: '1.5px solid var(--pink-200)',
            borderRadius: '16px',
            padding: '10px 18px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder={dict.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.92rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{dict.folderLabel}</span>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            style={{
              padding: '10px 18px',
              borderRadius: '14px',
              border: '1.5px solid var(--pink-200)',
              background: 'white',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--navy-dark)'
            }}
          >
            <option value="All">{dict.allFolders}</option>
            {folders.map((f) => (
              <option key={f.name} value={f.name}>{getFolderLabel(f.name)} ({f.documentCount})</option>
            ))}
          </select>
        </div>
      </div>

      {/* DIGILOCKER FOLDER TILES GRID */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '14px', fontWeight: 800 }}>
          {dict.categoriesTitle} ({folders.length || defaultFolderList.length})
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '14px'
        }}>
          {folders.length > 0
            ? folders.map((f) => (
                <div
                  key={f.name}
                  onClick={() => setSelectedFolder(selectedFolder === f.name ? 'All' : f.name)}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    border: selectedFolder === f.name ? '2px solid var(--pink-600)' : '1px solid var(--pink-200)',
                    background: selectedFolder === f.name ? 'var(--pink-50)' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    background: 'var(--pink-100)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--pink-600)',
                    flexShrink: 0
                  }}>
                    <Folder size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.86rem', color: 'var(--navy-dark)', margin: '0 0 2px 0', fontWeight: 700 }}>
                      {getFolderLabel(f.name)}
                    </h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{f.documentCount} {dict.filesCount}</span>
                  </div>
                </div>
              ))
            : defaultFolderList.map((fname) => (
                <div
                  key={fname}
                  onClick={() => setSelectedFolder(fname)}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    border: selectedFolder === fname ? '2px solid var(--pink-600)' : '1px solid var(--pink-200)',
                    background: selectedFolder === fname ? 'var(--pink-50)' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                >
                  <Folder size={22} color="var(--rose-primary)" />
                  <div>
                    <h4 style={{ fontSize: '0.86rem', margin: '0 0 2px 0', fontWeight: 700 }}>{getFolderLabel(fname)}</h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>0 {dict.filesCount}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* DOCUMENTS GRID */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-dark)', fontWeight: 800 }}>
            {dict.storedDocsTitle} {selectedFolder !== 'All' ? `• ${getFolderLabel(selectedFolder)}` : ''} ({documents.length})
          </h3>
        </div>

        {documents.length === 0 ? (
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center', background: 'white', borderRadius: '20px' }}>
            <FileText size={48} color="var(--pink-300)" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', margin: '0 0 6px 0', fontWeight: 800 }}>
              {dict.noDocsTitle}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              {dict.noDocsSubtitle}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '18px'
          }}>
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="glass-card"
                style={{
                  background: 'white',
                  borderRadius: '18px',
                  border: '1.5px solid var(--pink-200)',
                  padding: '20px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        background: '#fce7f3',
                        padding: '10px',
                        borderRadius: '12px',
                        color: 'var(--rose-primary)'
                      }}>
                        {doc.mimeType?.includes('image') ? <FileImage size={22} /> : <FileText size={22} />}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--navy-dark)', margin: '0 0 2px 0' }}>
                          {doc.originalName}
                        </h4>
                        <span style={{ fontSize: '0.74rem', color: 'var(--rose-primary)', fontWeight: 700 }}>
                          {getFolderLabel(doc.folder)} • {formatFileSize(doc.fileSize)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {doc.description && (
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: 1.4 }}>
                      {doc.description}
                    </p>
                  )}

                  <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {doc.doctorName && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={13} /> <span>{doc.doctorName}</span>
                      </div>
                    )}
                    {doc.hospitalName && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building size={13} /> <span>{doc.hospitalName}</span>
                      </div>
                    )}
                    {doc.medicalDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} /> <span>{new Date(doc.medicalDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Actions */}
                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--pink-100)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '6px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.76rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={13} /> {dict.btnPreview}
                    </a>
                    <a
                      href={doc.fileUrl}
                      download={doc.originalName}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.76rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={13} /> {dict.btnDownload}
                    </a>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => {
                        setRenameDoc(doc);
                        setNewName(doc.originalName);
                        setShowRenameModal(true);
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#64748b' }}
                      title={dict.btnRename}
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => {
                        setMoveDoc(doc);
                        setTargetFolder(doc.folder);
                        setShowMoveModal(true);
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#64748b' }}
                      title={dict.btnMove}
                    >
                      <MoveRight size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(doc._id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#ef4444' }}
                      title={dict.btnDelete}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HEALTH VAULT PRIVACY & CLINICAL QUESTIONS CARD (Requested by user) */}
      <div
        className="glass-card"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
          borderRadius: '20px',
          border: '1.5px solid #fecdd3'
        }}
      >
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#9f1239', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="#e11d48" />
          <span>{dict.digiBadge} & Privacy FAQ</span>
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '14px', border: '1px solid #ffe4e6' }}>
            <strong style={{ fontSize: '0.88rem', color: '#881337', display: 'block', marginBottom: '4px' }}>
              ❓ {dict.faqSecurityQ}
            </strong>
            <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
              {dict.faqSecurityA}
            </p>
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: '14px', border: '1px solid #ffe4e6' }}>
            <strong style={{ fontSize: '0.88rem', color: '#881337', display: 'block', marginBottom: '4px' }}>
              ❓ {dict.faqShareQ}
            </strong>
            <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
              {dict.faqShareA}
            </p>
          </div>
        </div>
      </div>

      {/* MODAL: UPLOAD RECORD */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="glass-card" style={{ background: 'white', borderRadius: '24px', maxWidth: '520px', width: '100%', padding: '28px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
                {dict.modalUploadTitle}
              </h3>
              <button onClick={() => setShowUploadModal(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 800 }}>✕</button>
            </div>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{dict.modalSelectFile} *</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{dict.modalFolder}</label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginTop: '4px', fontWeight: 600 }}
                >
                  {defaultFolderList.map(f => (
                    <option key={f} value={f}>{getFolderLabel(f)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{dict.modalDesc}</label>
                <input
                  type="text"
                  placeholder="e.g. Annual Pelvic Scan & Thyroid TSH"
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{dict.modalDoctor}</label>
                  <input
                    type="text"
                    value={uploadDoctor}
                    onChange={(e) => setUploadDoctor(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginTop: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{dict.modalHospital}</label>
                  <input
                    type="text"
                    value={uploadHospital}
                    onChange={(e) => setUploadHospital(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginTop: '4px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{dict.modalDate}</label>
                <input
                  type="date"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowUploadModal(false)} className="btn-secondary" style={{ padding: '10px 18px' }}>
                  {dict.modalCancel}
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 22px' }}>
                  {dict.modalSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RENAME */}
      {showRenameModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="glass-card" style={{ background: 'white', borderRadius: '24px', maxWidth: '440px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-dark)', margin: '0 0 14px 0' }}>{dict.modalRenameTitle}</h3>
            <form onSubmit={handleRenameSubmit}>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginBottom: '14px', boxSizing: 'border-box' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowRenameModal(false)} className="btn-secondary">{dict.modalCancel}</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MOVE */}
      {showMoveModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="glass-card" style={{ background: 'white', borderRadius: '24px', maxWidth: '440px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-dark)', margin: '0 0 14px 0' }}>{dict.modalMoveTitle}</h3>
            <form onSubmit={handleMoveSubmit}>
              <select
                value={targetFolder}
                onChange={(e) => setTargetFolder(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid var(--pink-200)', marginBottom: '14px', fontWeight: 600 }}
              >
                {defaultFolderList.map(f => (
                  <option key={f} value={f}>{getFolderLabel(f)}</option>
                ))}
              </select>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowMoveModal(false)} className="btn-secondary">{dict.modalCancel}</button>
                <button type="submit" className="btn-primary">Move File</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
