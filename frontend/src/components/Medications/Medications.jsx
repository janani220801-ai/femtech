import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Pill,
  Plus,
  CheckCircle,
  Clock,
  Calendar,
  Trash2,
  Archive,
  RotateCcw,
  Sparkles,
  RefreshCw,
  HeartPulse,
  ShieldCheck
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

export const FALLBACK_DEFAULT_MEDS = [
  {
    _id: 'med_folic_1',
    name: 'Folic Acid & Ferrous Ascorbate',
    dose: '100 mg / 1.5 mg',
    frequency: 'Once daily (Post-Breakfast)',
    reminderTime: '09:00',
    notes: 'Hemoglobin synthesis, cellular oxygenation & neural support. Take with water.',
    takenToday: true,
    tag: 'Iron & Anemia Care'
  },
  {
    _id: 'med_vitd_2',
    name: 'Vitamin D3 & Calcium Carbonate',
    dose: '60,000 IU / 500 mg',
    frequency: 'Once daily (Post-Dinner)',
    reminderTime: '20:30',
    notes: 'Bone mineralization, hormonal regulation & immune homeostasis.',
    takenToday: false,
    tag: 'Bone & Hormone Support'
  },
  {
    _id: 'med_myo_3',
    name: 'Myo-Inositol & D-Chiro-Inositol (40:1)',
    dose: '2000 mg',
    frequency: 'Twice daily (Morning & Night)',
    reminderTime: '08:30',
    notes: 'Promotes ovarian follicular maturation, insulin sensitivity & cycle regularity.',
    takenToday: true,
    tag: 'PCOS & Ovulation Support'
  },
  {
    _id: 'med_omega_4',
    name: 'Omega-3 Marine Fish Oil (EPA/DHA)',
    dose: '1000 mg',
    frequency: 'Once daily (With Lunch)',
    reminderTime: '13:30',
    notes: 'Anti-inflammatory prostaglandin support, mitigates menstrual cramp intensity.',
    takenToday: false,
    tag: 'Period Cramp Relief'
  },
  {
    _id: 'med_mag_5',
    name: 'Magnesium Glycinate',
    dose: '250 mg',
    frequency: 'Once daily (Bedtime)',
    reminderTime: '21:30',
    notes: 'Neuromuscular relaxation, alleviates PMS irritability & promotes deep restorative sleep.',
    takenToday: false,
    tag: 'Deep Sleep & PMS Tone'
  }
];

export const FALLBACK_HISTORY_MEDS = [
  {
    _id: 'med_thyroid_hist_1',
    name: 'Levothyroxine Sodium',
    dose: '25 mcg',
    frequency: 'Once daily (Fasting Morning)',
    reminderTime: '06:30',
    notes: 'Archived clinical record: Thyroid hormone replacement therapy.',
    isCurrent: false,
    tag: 'Endocrine Support'
  }
];


export const MEDS_I18N = {
  en: {
    completedToday: 'Completed Today',
    reloadTitle: "Reload recommended clinical women's health supplements",
    disclaimer: 'FemTech does not independently prescribe medications. Please take prescription medicines and clinical supplements strictly as directed by your licensed physician.',
    checkOffHint: 'Check off each dose as completed today',
    archiveTitle: 'Archive to Past Records',
    deleteTitle: 'Delete',
    noPastMeds: 'No archived past medications.',
    restoreActive: 'Restore to Active',
    addModalTitle: 'Add New Prescription / Supplement',
    medNameLabel: 'Medicine / Supplement Name *',
    medNamePlaceholder: 'e.g. Folic Acid & Iron / Metformin',
    doseLabel: 'Dose *',
    dosePlaceholder: 'e.g. 500 mg / 60,000 IU',
    freqLabel: 'Frequency',
    freqOnce: 'Once daily (Post-Breakfast)',
    freqTwice: 'Twice daily (Morning & Night)',
    freqThree: 'Three times daily',
    freqWeekly: 'Weekly once',
    freqAsNeeded: 'As needed',
    reminderTimeLabel: 'Reminder Time',
    notesLabel: 'Clinical Instructions / Notes',
    notesPlaceholder: 'e.g. Post-breakfast with plenty of water',
    btnCancel: 'Cancel',
    btnSave: 'Save Prescription',
    confirmDelete: 'Delete this medication record?',
    regimenLoaded: '✓ Standard clinical regimen loaded successfully!',
    supplementsLoaded: '✓ Default clinical supplements loaded!',
    medAdded: '✓ Medication added successfully!'
  },
  ta: {
    completedToday: 'இன்று முடிக்கப்பட்டது',
    reloadTitle: 'பரிந்துரைக்கப்பட்ட மகளிர் சத்து மருந்துகளை மீண்டும் நிரப்புக',
    disclaimer: 'ஃபெம்டெக் சுயமாக மருந்துகளை பரிந்துரைக்காது. உங்கள் மருத்துவரின் ஆலோசனைப்படி மட்டுமே மருந்துகளை உட்கொள்ளவும்.',
    checkOffHint: 'ஒவ்வொரு நாளும் உட்கொண்டதை டிக் செய்யவும்',
    archiveTitle: 'பழைய வரலாறுக்கு நகர்த்து',
    deleteTitle: 'நீக்கு',
    noPastMeds: 'காப்பகப்படுத்தப்பட்ட முந்தைய மருந்துகள் இல்லை.',
    restoreActive: 'மீண்டும் செயலாக்குக',
    addModalTitle: 'புதிய மருந்து சேர்க்க',
    medNameLabel: 'மருந்தின் பெயர் *',
    medNamePlaceholder: 'எ.கா: ஃபோலிக் அமிலம் & இரும்புச்சத்து',
    doseLabel: 'அளவு (Dose) *',
    dosePlaceholder: 'எ.கா: 500 mg / 60,000 IU',
    freqLabel: 'எடுத்துக்கொள்ளும் முறை',
    freqOnce: 'தினசரி ஒரு முறை (காலை உணவுக்குப் பின்)',
    freqTwice: 'தினசரி இரு முறை (காலை & இரவு)',
    freqThree: 'தினசரி மூன்று முறை',
    freqWeekly: 'வாரத்திற்கு ஒரு முறை',
    freqAsNeeded: 'தேவைப்படும் போது',
    reminderTimeLabel: 'நினைவூட்டல் நேரம்',
    notesLabel: 'மருத்துவர் குறிப்பு / அறிவுரைகள்',
    notesPlaceholder: 'எ.கா: காலை உணவுக்குப் பின் தண்ணீருடன்',
    btnCancel: 'ரத்து செய்',
    btnSave: 'மருந்தை சேமிக்கவும்',
    confirmDelete: 'இந்த மருந்து பதிவை நீக்க விரும்புகிறீர்களா?',
    regimenLoaded: '✓ பரிந்துரைக்கப்பட்ட மருத்துவ முறை வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
    supplementsLoaded: '✓ பரிந்துரைக்கப்பட்ட மருந்துகள் ஏற்றப்பட்டது!',
    medAdded: '✓ புதிய மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது!'
  },
  hi: {
    completedToday: 'आज पूर्ण हुआ',
    reloadTitle: 'अनुशंसित महिला स्वास्थ्य सप्लीमेंट्स पुनः लोड करें',
    disclaimer: 'फेमटेक स्वतंत्र रूप से दवाएं निर्धारित नहीं करता है। कृपया अपने चिकित्सक के निर्देशानुसार ही दवाएं लें।',
    checkOffHint: 'आज ली गई प्रत्येक खुराक को टिक करें',
    archiveTitle: 'पुराने रिकॉर्ड में सहेजें',
    deleteTitle: 'हटाएं',
    noPastMeds: 'कोई संग्रहीत पूर्व दवाएं नहीं हैं।',
    restoreActive: 'पुनः सक्रिय करें',
    addModalTitle: 'नई दवा / सप्लीमेंट जोड़ें',
    medNameLabel: 'दवा का नाम *',
    medNamePlaceholder: 'उदा. फोलिक एसिड और आयरन / मेटफॉर्मिन',
    doseLabel: 'खुराक (Dose) *',
    dosePlaceholder: 'उदा. 500 mg / 60,000 IU',
    freqLabel: 'लेने का तरीका (आवृत्ति)',
    freqOnce: 'दिन में एक बार (नाश्ते के बाद)',
    freqTwice: 'दिन में दो बार (सुबह और रात)',
    freqThree: 'दिन में तीन बार',
    freqWeekly: 'सप्ताह में एक बार',
    freqAsNeeded: 'आवश्यकतानुसार (As needed)',
    reminderTimeLabel: 'अनुस्मारक समय (Reminder Time)',
    notesLabel: 'डॉक्टर के निर्देश / नोट्स',
    notesPlaceholder: 'उदा. नाश्ते के बाद पर्याप्त पानी के साथ',
    btnCancel: 'रद्द करें',
    btnSave: 'दवा सहेजें',
    confirmDelete: 'क्या आप इस दवा रिकॉर्ड को हटाना चाहते हैं?',
    regimenLoaded: '✓ मानक चिकित्सीय आहार सफलतापूर्वक लोड किया गया!',
    supplementsLoaded: '✓ डिफ़ॉल्ट चिकित्सीय सप्लीमेंट्स लोड किए गए!',
    medAdded: '✓ नई दवा सफलतापूर्वक जोड़ी गई!'
  },
  te: {
    completedToday: 'ఈరోజు పూర్తయింది',
    reloadTitle: 'సిఫార్సు చేయబడిన మహిళా ఆరోగ్య సప్లిమెంట్లను తిరిగి లోడ్ చేయండి',
    disclaimer: 'FemTech స్వతంత్రంగా మందులను సూచించదు. మీ వైద్యుని సలహా మేరకే మందులు తీసుకోండి.',
    checkOffHint: 'ఈరోజు తీసుకున్న ప్రతి మోతాదును టిక్ చేయండి',
    archiveTitle: 'గత రికార్డులకు తరలించండి',
    deleteTitle: 'తొలగించు',
    noPastMeds: 'ఆర్కైవ్ చేసిన పాత మందులు లేవు.',
    restoreActive: 'మళ్లీ యాక్టివ్ చేయండి',
    addModalTitle: 'కొత్త ప్రిస్క్రిప్షన్ / సప్లిమెంట్ జోడించండి',
    medNameLabel: 'మందు పేరు *',
    medNamePlaceholder: 'ఉదా: ఫోలిక్ యాసిడ్ & ఐరన్',
    doseLabel: 'మోతాదు (Dose) *',
    dosePlaceholder: 'ఉదా: 500 mg / 60,000 IU',
    freqLabel: 'తీసుకునే విధానం',
    freqOnce: 'రోజుకు ఒకసారి (అల్పాహారం తర్వాత)',
    freqTwice: 'రోజుకు రెండుసార్లు (ఉదయం & రాత్రి)',
    freqThree: 'రోజుకు మూడుసార్లు',
    freqWeekly: 'వారానికి ఒకసారి',
    freqAsNeeded: 'అవసరమైనప్పుడు',
    reminderTimeLabel: 'రిమైండర్ సమయం',
    notesLabel: 'వైద్యుల సూచనలు / నోట్స్',
    notesPlaceholder: 'ఉదా: అల్పాహారం తర్వాత నీటితో',
    btnCancel: 'రద్దు చేయి',
    btnSave: 'మందును భద్రపరచండి',
    confirmDelete: 'ఈ మందు రికార్డును తొలగించాలనుకుంటున్నారా?',
    regimenLoaded: '✓ ప్రామాణిక ఆరోగ్య నియమావళి విజయవంతంగా లోడ్ చేయబడింది!',
    supplementsLoaded: '✓ డిఫాల్ట్ సప్లిమెంట్లు లోడ్ చేయబడ్డాయి!',
    medAdded: '✓ కొత్త ఔషధం విజయవంతంగా జోడించబడింది!'
  },
  ml: {
    completedToday: 'ഇന്ന് പൂർത്തിയായി',
    reloadTitle: 'ശുപാർശ ചെയ്ത വനിതാ ആരോഗ്യ സപ്ലിമെന്റുകൾ വീണ്ടും ലോഡ് ചെയ്യുക',
    disclaimer: 'ഫെംടെക് സ്വതന്ത്രമായി മരുന്നുകൾ നിർദ്ദേശിക്കുന്നില്ല. ഡോക്ടറുടെ നിർദ്ദേശപ്രകാരം മാത്രം മരുന്നുകൾ കഴിക്കുക.',
    checkOffHint: 'ഇന്ന് കഴിച്ച ഓരോ ഡോസും ടിക്ക് ചെയ്യുക',
    archiveTitle: 'പഴയ റെക്കോർഡുകളിലേക്ക് മാറ്റുക',
    deleteTitle: 'നീക്കം ചെയ്യുക',
    noPastMeds: 'മുൻകാല മരുന്നുകൾ ലഭ്യമല്ല.',
    restoreActive: 'വീണ്ടും സജീവമാക്കുക',
    addModalTitle: 'പുതിയ മരുന്ന് ചേർക്കുക',
    medNameLabel: 'മരുന്നിന്റെ പേര് *',
    medNamePlaceholder: 'ഉദാ: ഫോളിക് ആസിഡ് & അയൺ',
    doseLabel: 'അളവ് (Dose) *',
    dosePlaceholder: 'ഉദാ: 500 mg',
    freqLabel: 'കഴിക്കേണ്ട രീതി',
    freqOnce: 'ദിവസത്തിൽ ഒരിക്കൽ (പ്രാതലിന് ശേഷം)',
    freqTwice: 'ദിവസത്തിൽ രണ്ട് തവണ (രാവിലെയും രാത്രിയും)',
    freqThree: 'ദിവസത്തിൽ മൂന്ന് തവണ',
    freqWeekly: 'ആഴ്ചയിൽ ഒരിക്കൽ',
    freqAsNeeded: 'ആവശ്യമുള്ളപ്പോൾ',
    reminderTimeLabel: 'ഓർമ്മപ്പെടുത്തൽ സമയം',
    notesLabel: 'ഡോക്ടറുടെ കുറിപ്പ് / നിർദ്ദേശങ്ങൾ',
    notesPlaceholder: 'ഉദാ: പ്രാതലിന് ശേഷം വെള്ളത്തോടൊപ്പം',
    btnCancel: 'റദ്ദാക്കുക',
    btnSave: 'മരുന്ന് സേവ് ചെയ്യുക',
    confirmDelete: 'ഈ മരുന്ന് റെക്കോർഡ് നീക്കം ചെയ്യണോ?',
    regimenLoaded: '✓ ശുപാർശ ചെയ്ത മരുന്നുകൾ വിജയകരമായി പുതുക്കി!',
    supplementsLoaded: '✓ സാധാരണ സപ്ലിമെന്റുകൾ ലോഡ് ചെയ്തു!',
    medAdded: '✓ പുതിയ മരുന്ന് വിജയകരമായി ചേർത്തു!'
  },
  mr: {
    completedToday: 'आज पूर्ण झाले',
    reloadTitle: 'शिफारस केलेले महिला आरोग्य सप्लिमेंट्स पुन्हा लोड करा',
    disclaimer: 'फेमटेक स्वतंत्रपणे औषधे लिहून देत नाही. कृपया आपल्या डॉक्टरांच्या सल्ल्यानुसारच औषधे घ्या.',
    checkOffHint: 'आज घेतलेल्या प्रत्येक डोसवर टिक करा',
    archiveTitle: 'मागील रेकॉर्डमध्ये संग्रहित करा',
    deleteTitle: 'हटवा',
    noPastMeds: 'कोणतीही जुनी औषधे नोंदवलेली नाहीत.',
    restoreActive: 'पुन्हा सक्रिय करा',
    addModalTitle: 'नवीन औषध / सप्लिमेंट जोडा',
    medNameLabel: 'औषधाचे नाव *',
    medNamePlaceholder: 'उदा. फॉलिक ॲसिड आणि लोह / मेटफॉर्मिन',
    doseLabel: 'डोस (Dose) *',
    dosePlaceholder: 'उदा. 500 mg',
    freqLabel: 'वारंवारता (Frequency)',
    freqOnce: 'दिवसातून एकदा (नाश्त्यानंतर)',
    freqTwice: 'दिवसातून दोनदा (सकाळी आणि रात्री)',
    freqThree: 'दिवसातून तीनदा',
    freqWeekly: 'आठवड्यातून एकदा',
    freqAsNeeded: 'गरज असेल तेव्हा',
    reminderTimeLabel: 'स्मरणपत्र वेळ',
    notesLabel: 'वैद्यकीय सूचना / नोंदी',
    notesPlaceholder: 'उदा. नाश्त्यानंतर भरपूर पाण्यासोबत',
    btnCancel: 'रद्द करा',
    btnSave: 'औषध जतन करा',
    confirmDelete: 'तुम्ही हे औषध रेकॉर्ड हटवू इच्छिता का?',
    regimenLoaded: '✓ मानक वैद्यकीय पथ्य यशस्वीरित्या लोड केले!',
    supplementsLoaded: '✓ डीफॉल्ट वैद्यकीय सप्लिमेंट्स लोड झाले!',
    medAdded: '✓ नवीन औषध यशस्वीरित्या जोडले गेले!'
  },
  mwr: {
    completedToday: 'आज पूरो हुयो',
    reloadTitle: 'महिला स्वास्थ्य रा पूरक पाछा लोड करो',
    disclaimer: 'फेमटेक खुद दवाई कोनी देवे। डॉक्टर री सलाह सूं ही दवाई लेवो सा।',
    checkOffHint: 'आज लीधी खुराक पे टिक करो सा',
    archiveTitle: 'पुराणी दवाईयां में भेजो',
    deleteTitle: 'हटाओ',
    noPastMeds: 'कोई पुराणी दवाईयां कोनी।',
    restoreActive: 'पाछो चालू करो',
    addModalTitle: 'नयी दवाई / सप्लीमेंट जोड़ो',
    medNameLabel: 'दवाई रो नाम *',
    medNamePlaceholder: 'उदा: फॉलिक एसिड अर आयरन',
    doseLabel: 'खुराक (Dose) *',
    dosePlaceholder: 'उदा: 500 mg',
    freqLabel: 'लेवण रो तरीको',
    freqOnce: 'दिन में एक बार (जीमण पछै)',
    freqTwice: 'दिन में दो बार (सुआरे अर रात)',
    freqThree: 'दिन में तीन बार',
    freqWeekly: 'हफ्ते में एक बार',
    freqAsNeeded: 'जरूरत पड़्या पर',
    reminderTimeLabel: 'याद दिलावण रो टेम',
    notesLabel: 'डॉक्टर री सलाह',
    notesPlaceholder: 'उदा: जीमण पछै पाणी साथै',
    btnCancel: 'रद्द करो',
    btnSave: 'दवाई सहेजो',
    confirmDelete: 'कायीं थे आ दवाई हटावणी चावो?',
    regimenLoaded: '✓ दवाईयां री सूची पाछी लोड होगी सा!',
    supplementsLoaded: '✓ डिफ़ॉल्ट दवाईयां लोड होगी सा!',
    medAdded: '✓ नयी दवाई जुड़गी सा!'
  },
  fr: {
    completedToday: "Complété aujourd'hui",
    reloadTitle: 'Recharger les compléments de santé féminine recommandés',
    disclaimer: "FemTech ne prescrit pas de médicaments de façon autonome. Prenez vos traitements uniquement selon les instructions de votre médecin.",
    checkOffHint: "Cochez chaque prise effectuée aujourd'hui",
    archiveTitle: 'Archiver dans l’historique',
    deleteTitle: 'Supprimer',
    noPastMeds: 'Aucun médicament antérieur archivé.',
    restoreActive: 'Rétablir comme actif',
    addModalTitle: 'Ajouter une prescription / un complément',
    medNameLabel: 'Nom du médicament *',
    medNamePlaceholder: 'ex. Acide folique & Fer / Metformine',
    doseLabel: 'Posologie (Dose) *',
    dosePlaceholder: 'ex. 500 mg / 60 000 UI',
    freqLabel: 'Fréquence',
    freqOnce: 'Une fois par jour (Après petit-déjeuner)',
    freqTwice: 'Deux fois par jour (Matin et soir)',
    freqThree: 'Trois fois par jour',
    freqWeekly: 'Une fois par semaine',
    freqAsNeeded: 'Au besoin',
    reminderTimeLabel: 'Heure de rappel',
    notesLabel: 'Instructions médicales / Notes',
    notesPlaceholder: 'ex. Après le petit-déjeuner avec un grand verre d’eau',
    btnCancel: 'Annuler',
    btnSave: 'Enregistrer le traitement',
    confirmDelete: 'Voulez-vous supprimer ce traitement ?',
    regimenLoaded: '✓ Régime clinique standard rechargé avec succès !',
    supplementsLoaded: '✓ Compléments cliniques par défaut chargés !',
    medAdded: '✓ Médicament ajouté avec succès !'
  },
  lb: {
    completedToday: 'أُنجز اليوم',
    reloadTitle: 'إعادة تحميل المكملات الموصى بها لصحة المرأة',
    disclaimer: 'فيمتيك لا يصف الأدوية تلقائياً. يرجى تناول الأدوية الموصوفة والمكملات حصراً بناءً على توجيهات طبيبك المعالج.',
    checkOffHint: 'حددي كل جرعة تم تناولها اليوم',
    archiveTitle: 'أرشفة إلى السجل السابق',
    deleteTitle: 'حذف',
    noPastMeds: 'لا توجد أدوية سابقة مؤرشفة.',
    restoreActive: 'إعادة للتفعيل',
    addModalTitle: 'إضافة وصفة / مكمل غذائي جديد',
    medNameLabel: 'اسم الدواء / المكمل *',
    medNamePlaceholder: 'مثلاً: حمض الفوليك والحديد / ميتفورمين',
    doseLabel: 'الجرعة *',
    dosePlaceholder: 'مثلاً: 500 ملغ / 60,000 وحدة',
    freqLabel: 'تكرار التناول',
    freqOnce: 'مرة واحدة يومياً (بعد الإفطار)',
    freqTwice: 'مرتين يومياً (صباحاً ومساءً)',
    freqThree: 'ثلاث مرات يومياً',
    freqWeekly: 'مرة أسبوعياً',
    freqAsNeeded: 'عند الحاجة',
    reminderTimeLabel: 'وقت التذكير',
    notesLabel: 'تعليمات الطبيب / ملاحظات',
    notesPlaceholder: 'مثلاً: بعد الإفطار مع وفرة من الماء',
    btnCancel: 'إلغاء',
    btnSave: 'حفظ الوصفة',
    confirmDelete: 'هل ترغبين بحذف هذا السجل الطبي؟',
    regimenLoaded: '✓ تم تحميل البرنامج الطبي المعتمد بنجاح!',
    supplementsLoaded: '✓ تم تحميل المكملات الافتراضية بنجاح!',
    medAdded: '✓ تم إضافة الدواء بنجاح!'
  },
  ar: {
    completedToday: 'تم التناول اليوم',
    reloadTitle: 'إعادة تحميل المكملات الموصى بها لصحة المرأة',
    disclaimer: 'فيمتك لا يصف أدوية بشكل مستقل. يرجى تناول الأدوية والمكملات الطبية وفقاً لإرشادات طبيبك المختص بدقة.',
    checkOffHint: 'حددي كل جرعة تم إكمالها اليوم',
    archiveTitle: 'أرشفة إلى السجلات السابقة',
    deleteTitle: 'حذف',
    noPastMeds: 'لا توجد أدوية مؤرشفة سابقة.',
    restoreActive: 'استعادة للنشط',
    addModalTitle: 'إضافة وصفة طبية / مكمل جديد',
    medNameLabel: 'اسم الدواء / المكمل *',
    medNamePlaceholder: 'مثال: حمض الفوليك والحديد / ميتفورمين',
    doseLabel: 'الجرعة *',
    dosePlaceholder: 'مثال: 500 ملغ / 60,000 وحدة دولية',
    freqLabel: 'التكرار',
    freqOnce: 'مرة واحدة يومياً (بعد الإفطار)',
    freqTwice: 'مرتان يومياً (صباحاً ومساءً)',
    freqThree: 'ثلاث مرات يومياً',
    freqWeekly: 'مرة في الأسبوع',
    freqAsNeeded: 'عند اللزوم',
    reminderTimeLabel: 'وقت التنبيه',
    notesLabel: 'تعليمات طبية / ملاحظات',
    notesPlaceholder: 'مثال: بعد وجبة الإفطار مع كمية كافية من الماء',
    btnCancel: 'إلغاء',
    btnSave: 'حفظ الوصفة',
    confirmDelete: 'هل أنت متأكد من حذف هذا السجل الدوائي؟',
    regimenLoaded: '✓ تم تحميل النظام العلاجي الموصى به بنجاح!',
    supplementsLoaded: '✓ تم تحميل المكملات الافتراضية بنجاح!',
    medAdded: '✓ تمت إضافة الدواء بنجاح!'
  }
};

export default function Medications() {
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  const mDict = MEDS_I18N[language] || MEDS_I18N.en;

  const [currentMeds, setCurrentMeds] = useState(FALLBACK_DEFAULT_MEDS);
  const [historyMeds, setHistoryMeds] = useState(FALLBACK_HISTORY_MEDS);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    frequency: 'Once daily',
    startDate: new Date().toISOString().split('T')[0],
    reminderTime: '09:00',
    notes: '',
    isCurrent: true
  });

  const fetchMeds = async () => {
    setLoading(true);
    try {
      const res = await api.get('/medications');
      if (res.success) {
        if (res.current && res.current.length > 0) {
          setCurrentMeds(res.current);
        } else {
          setCurrentMeds(FALLBACK_DEFAULT_MEDS);
        }
        if (res.history && res.history.length > 0) {
          setHistoryMeds(res.history);
        } else {
          setHistoryMeds(FALLBACK_HISTORY_MEDS);
        }
      }
    } catch (err) {
      console.warn('Meds fetch error:', err.message);
      // Retain fallback defaults
      setCurrentMeds((prev) => (prev.length > 0 ? prev : FALLBACK_DEFAULT_MEDS));
      setHistoryMeds((prev) => (prev.length > 0 ? prev : FALLBACK_HISTORY_MEDS));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  const handleResetDefaults = async () => {
    setLoading(true);
    try {
      const res = await api.post('/medications/reset-defaults', {});
      if (res.success) {
        setCurrentMeds(res.current || FALLBACK_DEFAULT_MEDS);
        setHistoryMeds(res.history || FALLBACK_HISTORY_MEDS);
        setStatusMsg(mDict.regimenLoaded);
      } else {
        setCurrentMeds(FALLBACK_DEFAULT_MEDS);
        setHistoryMeds(FALLBACK_HISTORY_MEDS);
        setStatusMsg(mDict.supplementsLoaded);
      }
    } catch {
      setCurrentMeds(FALLBACK_DEFAULT_MEDS);
      setHistoryMeds(FALLBACK_HISTORY_MEDS);
      setStatusMsg(mDict.supplementsLoaded);
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleAddMed = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/medications', formData);
      if (res.success && res.medication) {
        setCurrentMeds([res.medication, ...currentMeds]);
      } else {
        const localNew = { ...formData, _id: 'local_' + Date.now(), takenToday: false };
        setCurrentMeds([localNew, ...currentMeds]);
      }
      setShowAddModal(false);
      setFormData({
        name: '',
        dose: '',
        frequency: 'Once daily',
        startDate: new Date().toISOString().split('T')[0],
        reminderTime: '09:00',
        notes: '',
        isCurrent: true
      });
      setStatusMsg(mDict.medAdded);
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Error adding medication');
    }
  };

  const handleToggleTaken = async (id) => {
    setCurrentMeds((prev) =>
      prev.map((m) => (m._id === id ? { ...m, takenToday: !m.takenToday } : m))
    );
    try {
      await api.put(`/medications/${id}/toggle-taken`, {});
    } catch (err) {
      console.warn('Toggle taken error:', err.message);
    }
  };

  const handleArchive = async (id) => {
    const med = currentMeds.find((m) => m._id === id);
    if (med) {
      setCurrentMeds(currentMeds.filter((m) => m._id !== id));
      setHistoryMeds([{ ...med, isCurrent: false }, ...historyMeds]);
    }
    try {
      await api.put(`/medications/${id}/archive`, {});
    } catch (err) {
      console.warn('Archive error:', err.message);
    }
  };

  const handleRestore = async (id) => {
    const med = historyMeds.find((m) => m._id === id);
    if (med) {
      setHistoryMeds(historyMeds.filter((m) => m._id !== id));
      setCurrentMeds([{ ...med, isCurrent: true }, ...currentMeds]);
    }
    try {
      await api.put(`/medications/${id}/archive`, {});
    } catch (err) {
      console.warn('Restore error:', err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(mDict.confirmDelete)) return;
    setCurrentMeds(currentMeds.filter((m) => m._id !== id));
    setHistoryMeds(historyMeds.filter((m) => m._id !== id));
    try {
      await api.delete(`/medications/${id}`);
    } catch (err) {
      console.warn('Delete error:', err.message);
    }
  };

  const takenCount = currentMeds.filter((m) => m.takenToday).length;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '28px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fff0f5 0%, #fdf2f8 50%, #eff6ff 100%)',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        border: '1px solid var(--pink-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '20px',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 8px 20px rgba(244, 63, 94, 0.3)'
          }}>
            💊
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-dark)', margin: 0 }}>
                {t('medicationsTitle')}
              </h1>
              <span className="badge badge-pink" style={{ fontWeight: 800 }}>
                {takenCount} / {currentMeds.length} {mDict.completedToday}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              {t('medicationsSubtitle')}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={handleResetDefaults}
            disabled={loading}
            className="btn-secondary"
            style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
            title={mDict.reloadTitle}
          >
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            <span>{t('loadClinicalRegimenBtn')}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
            style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}
          >
            <Plus size={18} />
            <span>{t('addNewMedBtn')}</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div style={{
          padding: '12px 18px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px',
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={18} color="#059669" />
          <span>{statusMsg}</span>
        </div>
      )}

      <DisclaimerBanner customText={mDict.disclaimer} />

      {/* CURRENT ACTIVE MEDICATIONS */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span>🌿</span> {t('currentMedsTitle')} ({currentMeds.length})
          </h2>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {mDict.checkOffHint}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '18px' }}>
          {currentMeds.map((med) => (
            <div
              key={med._id}
              className="glass-card"
              style={{
                padding: '22px',
                background: med.takenToday ? 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)' : 'white',
                borderRadius: 'var(--radius-md)',
                border: med.takenToday ? '2px solid #86efac' : '1px solid var(--pink-200)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: med.takenToday ? '0 8px 24px rgba(34, 197, 94, 0.12)' : '0 4px 16px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.08rem', color: 'var(--navy-dark)', margin: 0, fontWeight: 700 }}>
                      {med.name}
                    </h3>
                    {med.tag && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#e11d48', background: '#ffe4e6', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', marginTop: '4px' }}>
                        {med.tag}
                      </span>
                    )}
                  </div>
                  <span className="badge badge-pink" style={{ fontWeight: 800, whiteSpace: 'nowrap' }}>
                    {med.dose}
                  </span>
                </div>

                <div style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0369a1', fontWeight: 600 }}>
                    <Clock size={15} />
                    <span>{med.frequency} • {med.reminderTime}</span>
                  </div>
                  {med.notes && (
                    <div style={{ color: '#64748b', fontSize: '0.78rem', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                      💡 {med.notes}
                    </div>
                  )}
                </div>
              </div>

              <div style={{
                paddingTop: '14px',
                borderTop: '1px solid var(--pink-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => handleToggleTaken(med._id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: med.takenToday ? '2px solid #059669' : '1.5px solid #cbd5e1',
                    background: med.takenToday ? '#10b981' : 'white',
                    color: med.takenToday ? 'white' : 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: med.takenToday ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <CheckCircle size={15} />
                  <span>{med.takenToday ? t('takenTodayBadge') : t('markTakenBtn')}</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleArchive(med._id)}
                    style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '6px 8px', cursor: 'pointer', color: 'var(--text-muted)' }}
                    title={mDict.archiveTitle}
                  >
                    <Archive size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(med._id)}
                    style={{ background: '#fff1f2', border: 'none', borderRadius: '8px', padding: '6px 8px', cursor: 'pointer', color: '#e11d48' }}
                    title={mDict.deleteTitle}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAST CLINICAL MEDICATION HISTORY */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span>📜</span> {t('pastMedsTitle')} ({historyMeds.length})
          </h2>
        </div>

        {historyMeds.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {mDict.noPastMeds}
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
            {historyMeds.map((med) => (
              <div
                key={med._id}
                className="glass-card"
                style={{ padding: '18px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '0.96rem', color: '#334155', margin: 0, fontWeight: 700 }}>{med.name}</h4>
                    {med.tag && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', background: '#e2e8f0', padding: '1px 6px', borderRadius: '6px', display: 'inline-block', marginTop: '3px' }}>
                        {med.tag}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'white', padding: '2px 8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    {med.dose}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  {med.frequency} {med.notes ? `• ${med.notes}` : ''}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                  <button
                    onClick={() => handleRestore(med._id)}
                    className="btn-secondary"
                    style={{ padding: '5px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RotateCcw size={13} />
                    <span>{mDict.restoreActive}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(med._id)}
                    style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#dc2626' }}
                    title={mDict.deleteTitle}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD MED MODAL */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '16px'
        }}>
          <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '28px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--navy-dark)' }}>
              {mDict.addModalTitle}
            </h3>
            <form onSubmit={handleAddMed} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                  {mDict.medNameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={mDict.medNamePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--pink-200)', marginTop: '4px', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                    {mDict.doseLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={mDict.dosePlaceholder}
                    value={formData.dose}
                    onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--pink-200)', marginTop: '4px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                    {mDict.freqLabel}
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--pink-200)', marginTop: '4px', fontSize: '0.88rem' }}
                  >
                    <option value="Once daily">{mDict.freqOnce}</option>
                    <option value="Twice daily">{mDict.freqTwice}</option>
                    <option value="Three times daily">{mDict.freqThree}</option>
                    <option value="Weekly once">{mDict.freqWeekly}</option>
                    <option value="As needed">{mDict.freqAsNeeded}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                  {mDict.reminderTimeLabel}
                </label>
                <input
                  type="time"
                  value={formData.reminderTime}
                  onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--pink-200)', marginTop: '4px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                  {mDict.notesLabel}
                </label>
                <input
                  type="text"
                  placeholder={mDict.notesPlaceholder}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--pink-200)', marginTop: '4px', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ padding: '10px 18px' }}>
                  {mDict.btnCancel}
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 22px' }}>
                  {mDict.btnSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
