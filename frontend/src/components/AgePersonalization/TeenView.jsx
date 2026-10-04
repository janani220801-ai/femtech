import React, { useState } from 'react';
import { CalendarHeart, Sparkles, Brain, Moon, Dumbbell, Apple, AlertTriangle, ShieldCheck, HeartPulse, ChevronDown, ChevronUp, BookOpen, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export const TEEN_I18N = {
  en: {
    tagMental: 'Mental Wellness',
    tagDerm: 'Dermatology & Self-Care',
    tagCycle: 'Cycle Health',
    tagEndo: 'Endocrine Basics',
    tagFuel: 'Healthy Fuel',
    tagSleep: 'Sleep Hygiene',
    btnTrackPeriodDesc: 'Log dates & symptoms',
    btnLogMoodDesc: 'Daily emotion tracker',
    btnAskAiDesc: 'Private health Q&A',
    guidesTitle: 'Teen Life, School & Body Confidence Guides',
    guidesSub: 'Empowering adolescent health tips to help you thrive in school, sports, and daily life.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'Managing Cramps During School & Exam Days',
        tag: 'School Readiness',
        summary: 'Sitting for long hours during school or exams with cramps can be tough. Simple proactive steps bring quick comfort.',
        tips: [
          'Carry a discrete thermos with warm water or herbal chamomile/ginger tea.',
          'Use an adhesive stick-on heat patch over the lower abdomen under school uniforms.',
          'Do subtle ankle circles and gentle calf flexes during seated exam hours to boost pelvic blood circulation.',
          'Talk to your school nurse or teacher if pain is severe; never suffer in silence.'
        ]
      },
      {
        id: 'tss',
        icon: '🛡️',
        title: 'Toxic Shock Syndrome (TSS) Prevention & Pad Hygiene',
        tag: 'Hygiene & Safety',
        summary: 'Understanding bacteria safety and the golden 4-6 hour changing rule.',
        tips: [
          'Always wash hands with soap before and after handling menstrual products.',
          'Change sanitary pads every 4 to 6 hours, regardless of how light the flow seems.',
          'Never wear a single tampon for more than 8 hours or overnight.',
          'Seek urgent medical attention if you develop high fever, vomiting, diarrhea, or a sunburn-like rash during your period.'
        ]
      },
      {
        id: 'iron',
        icon: '🥗',
        title: 'Beating Teen Fatigue: Iron-Rich Superfoods',
        tag: 'Nutritional Energy',
        summary: 'Growing bodies combined with monthly blood loss make adolescent girls prone to iron-deficiency anemia.',
        tips: [
          'Eat iron powerhouses: Moringa leaves, spinach, dates, jaggery, beetroot, and lentils.',
          'Pair iron foods with Vitamin C (lemon juice, oranges, amla) for 3x better absorption.',
          'Avoid drinking tea or milk immediately with meals, as tannins and calcium inhibit iron absorption.'
        ]
      },
      {
        id: 'acne',
        icon: '✨',
        title: 'Puberty Hormones, Acne & Skin Confidence',
        tag: 'Dermatology & Confidence',
        summary: 'Androgen surges during puberty trigger excess sebum. Your skin is growing, not failing!',
        tips: [
          'Wash face twice daily with a gentle, non-stripping cleanser. Do not scrub hard.',
          'Resist the urge to pop pimples, which causes hyperpigmentation and scarring.',
          'Keep your pillowcase and smartphone screen clean to minimize contact bacteria.',
          'Remember: Pimples are temporary hormonal visitors; they do not define your beauty.'
        ]
      },
      {
        id: 'sleep',
        icon: '🌙',
        title: 'Digital Sleep Hygiene & Blue Light Protection',
        tag: 'Restorative Sleep',
        summary: 'Melatonin release is delayed by up to 2 hours in teenagers compared to adults.',
        tips: [
          'Power down smartphones, tablets, and gaming consoles 45 minutes before sleep.',
          'Activate night-shift / blue light filters on all study devices after 7:00 PM.',
          'Keep the bedroom cool and dim for deeper rapid-eye-movement (REM) learning consolidation.'
        ]
      },
      {
        id: 'boundaries',
        icon: '💖',
        title: 'Emotional Resilience & Peer Boundaries',
        tag: 'Mental Strength',
        summary: 'Navigating peer friendships, body comparisons, and learning the power of saying no.',
        tips: [
          'Your worth is not measured by social media likes, followers, or body size.',
          'Practice saying "No thanks, I’m not comfortable with that" firmly and without guilt.',
          'Identify at least one trusted adult (mother, sister, favorite teacher, counselor) you can confide in.'
        ]
      }
    ]
  },
  ta: {
    tagMental: 'மன நலம்',
    tagDerm: 'சரும நலம் & சுய பராமரிப்பு',
    tagCycle: 'சுழற்சி ஆரோக்கியம்',
    tagEndo: 'ஹார்மோன் அடிப்படைகள்',
    tagFuel: 'ஊட்டச்சத்து உணவு',
    tagSleep: 'தூக்க சுகாதாரம்',
    btnTrackPeriodDesc: 'நாட்கள் & அறிகுறிகளைப் பதிவு செய்',
    btnLogMoodDesc: 'தினசரி உணர்ச்சி பதிவு',
    btnAskAiDesc: 'தனிப்பட்ட நலம் சார்ந்த கேள்வி-பதில்',
    guidesTitle: 'இளம்பெண்களுக்கான பள்ளி, வாழ்க்கை & தன்னம்பிக்கை வழிகாட்டிகள்',
    guidesSub: 'பள்ளி, தேர்வு, விளையாட்டு மற்றும் அன்றாட வாழ்வில் தன்னம்பிக்கையுடன் மிளிர உதவும் சிறப்பு வழிகாட்டுதல்கள்.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'பள்ளி & தேர்வு நாட்களில் மாதவிடாய் வலி மேலாண்மை',
        tag: 'பள்ளி ஆயத்தம்',
        summary: 'தேர்வு நேரங்களிலும் வகுப்பறையிலும் அதிக நேரம் அமர்ந்திருக்கும்போது ஏற்படும் அடிவயிற்று வலியை எளிய முறையில் சமாளிக்கலாம்.',
        tips: [
          'பள்ளிக்கு ஒரு சிறிய பிளாஸ்க்கில் வெதுவெதுப்பான நீர் அல்லது இஞ்சி டீ எடுத்துச் செல்லவும்.',
          'உள்ளாடையின் மேல் ஒட்டும் வெப்ப ஒத்தடப் பட்டையை (Heat patch) பள்ளி சீருடைக்குள் அணியலாம்.',
          'வகுப்பறையில் அமர்ந்திருக்கும்போதே கால்களை லேசாக அசைப்பது ரத்த ஓட்டத்தை சீராக்கி வலியைத் தணிக்கும்.',
          'வலி மிக அதிகமாக இருந்தால் பள்ளி மருத்துவ அறைக்கோ அல்லது ஆசிரியரிடமோ தயங்காமல் உதவி கேட்கவும்.'
        ]
      },
      {
        id: 'tss',
        icon: '🛡️',
        title: 'TSS நோய் தடுப்பு & பேடு மாற்றும் சுகாதாரம்',
        tag: 'சுகாதாரம் & பாதுகாப்பு',
        summary: 'பாக்டீரியா தொற்றைத் தடுப்பதற்கான பொன்னான 4-6 மணிநேர பேடு மாற்றும் விதி.',
        tips: [
          'பேடு மாற்றுவதற்கு முன்பும் பின்பும் கைகளை சோப்பினால் நன்றாகக் கழுவ வேண்டும்.',
          'இரத்தப்போக்கு குறைவாக இருந்தாலும் 4 முதல் 6 மணிநேரத்திற்கு ஒருமுறை கட்டாயம் புதிய பேடு மாற்றவும்.',
          'ஒருபோதும் பயன்படுத்திய பேடை கழிப்பறைக் கோப்பையில் போடக்கூடாது; காகிதத்தில் சுற்றி குப்பைத்தொட்டியில் போடவும்.',
          'திடீர் காய்ச்சல், வாந்தி அல்லது அரிப்பு ஏற்பட்டால் உடனடியாக மருத்துவரை அணுகவும்.'
        ]
      },
      {
        id: 'iron',
        icon: '🥗',
        title: 'இளம்பெண்களின் சோர்வை விரட்டும் இரும்புச்சத்து உணவுகள்',
        tag: 'ஊட்டச்சத்து ஆற்றல்',
        summary: 'வளரும் வயதில் ஏற்படும் மாதவிடாய் இரத்த இழப்பினால் இளம் பெண்களுக்கு இரத்த சோகை ஏற்பட வாய்ப்புள்ளது.',
        tips: [
          'முருங்கைக்கீரை, பேரீச்சம்பழம், திராட்சை, வெல்லம், பீட்ரூட் மற்றும் பயறு வகைகளை தினமும் உணவில் சேர்க்கவும்.',
          'இரும்புச்சத்து உடலில் நன்றாக உறிஞ்சப்பட எலுமிச்சை சாறு அல்லது நெல்லிக்காய் சேர்த்துக்கொள்ளவும்.',
          'சாப்பிட்ட உடனேயே டீ அல்லது பால் குடிப்பதைத் தவிர்க்கவும் (இவை இரும்புச்சத்தை உறிஞ்சுவதைத் தடுக்கும்).'
        ]
      },
      {
        id: 'acne',
        icon: '✨',
        title: 'பருவவயது முகப்பரு, ஹார்மோன்கள் & சரும தன்னம்பிக்கை',
        tag: 'சரும பாதுகாப்பு',
        summary: 'பருவமடையும் காலத்தில் ஆண்ட்ரோஜன் ஹார்மோன் சுரப்பால் சருமத்தில் அதிக எண்ணெய் சுரக்கும். இது ஒரு தற்காலிக மாற்றமே!',
        tips: [
          'தினமும் இரண்டு முறை மென்மையான சோப்பு அல்லது ஃபேஸ் வாஷ் கொண்டு முகத்தைக் கழுவவும்.',
          'முகப்பருக்களை ஒருபோதும் கைகளால் கிள்ளவோ அழுத்தவோ கூடாது (தழும்புகள் உண்டாகும்).',
          'தலையணை உறை மற்றும் செல்போன் திரையை சுத்தமாக வைத்திருப்பது கிருமி தொற்றைத் தடுக்கும்.',
          'முகப்பரு உங்கள் அழகையோ திறமையையோ தீர்மானிக்காது; தன்னம்பிக்கையுடன் இருங்கள்.'
        ]
      },
      {
        id: 'sleep',
        icon: '🌙',
        title: 'டிஜிட்டல் தூக்கம் & நீல ஒளி பாதுகாப்பு',
        tag: 'ஆழ்ந்த தூக்கம்',
        summary: 'இரவில் செல்போன் திரையைப் பார்ப்பது தூக்க ஹார்மோனான மெலடோனின் சுரப்பைத் தாமதப்படுத்தும்.',
        tips: [
          'தூங்குவதற்கு 45 நிமிடங்களுக்கு முன்னதாகவே செல்போன், லேப்டாப் போன்ற திரைகளை அணைத்துவிடவும்.',
          'படிக்கும் சாதனங்களில் இரவு 7 மணிக்கு மேல் Blue light filter இயக்கவும்.',
          'இருட்டான, அமைதியான அறையில் தூங்குவது கற்றல் திறனையும் நினைவாற்றலையும் அதிகரிக்கும்.'
        ]
      },
      {
        id: 'boundaries',
        icon: '💖',
        title: 'மன உறுதி & நண்பர்கள் குழுவில் ஆரோக்கியமான எல்லைகள்',
        tag: 'மன பலம்',
        summary: 'நண்பர்களின் வற்புறுத்தல்களைத் தவிர்த்து, உங்கள் மனதிற்கு சரியெனப் படுவதைத் தேர்ந்தெடுக்கும் தன்னம்பிக்கை.',
        tips: [
          'சமூக வலைத்தள லைக்குகள் அல்லது உடல் எடையை வைத்து உங்களை ஒருபோதும் குறைவாக மதிப்பிடாதீர்கள்.',
          '"எனக்கு இதில் விருப்பமில்லை" என்று குற்ற உணர்வின்றி உறுதியாகச் சொல்லப் பழகுங்கள்.',
          'எந்தவொரு மனக்குழப்பத்திற்கும் அம்மா, அக்கா அல்லது ஆசிரியர் போன்ற நம்பகமான பெரியவர்களிடம் பேசுங்கள்.'
        ]
      }
    ]
  },
  hi: {
    tagMental: 'मानसिक स्वास्थ्य',
    tagDerm: 'त्वचा स्वास्थ्य व आत्म-देखभाल',
    tagCycle: 'मासिक चक्र स्वास्थ्य',
    tagEndo: 'हार्मोनल बुनियादी बातें',
    tagFuel: 'पौष्टिक आहार',
    tagSleep: 'स्वस्थ नींद की आदतें',
    btnTrackPeriodDesc: 'तारीख व लक्षण दर्ज करें',
    btnLogMoodDesc: 'दैनिक मनोदशा ट्रैकर',
    btnAskAiDesc: 'व्यक्तिगत स्वास्थ्य प्रश्नोत्तर',
    guidesTitle: 'किशोरियों के लिए स्कूल, स्वास्थ्य व आत्मविश्वास गाइड',
    guidesSub: 'स्कूल, परीक्षा और खेलकूद में आगे रहने के लिए प्रमाणिक सुझाव।',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'स्कूल व परीक्षा के दौरान पेट दर्द प्रबंधन',
        tag: 'स्कूल तैयारी',
        summary: 'परीक्षा व कक्षाओं के दौरान दर्द से राहत पाने के आसान उपाय।',
        tips: [
          'थर्मस में गुनगुना पानी लेकर जाएं।',
          'कपड़ों के नीचे लगाने वाला हीट पैच इस्तेमाल करें।',
          'पैरों को बीच-बीच में हिलाएं ताकि रक्त संचार बना रहे।',
          'दर्द अधिक होने पर शिक्षिका को बताएं।'
        ]
      },
      {
        id: 'tss',
        icon: '🛡️',
        title: 'टी.एस.एस. बचाव व पैड स्वच्छता',
        tag: 'स्वच्छता',
        summary: 'हर 4 से 6 घंटे में पैड बदलने का स्वर्णिम नियम।',
        tips: [
          'पैड बदलने से पहले व बाद में हाथ धोएं।',
          '4-6 घंटे में पैड अवश्य बदलें।',
          'कागज में लपेटकर कूड़ेदान में डालें।'
        ]
      },
      {
        id: 'iron',
        icon: '🥗',
        title: 'थकान दूर भगाने वाले आयरन युक्त आहार',
        tag: 'ऊर्जा आहार',
        summary: 'माहवारी में खून की कमी (एनीमिया) से बचने के उपाय।',
        tips: [
          'पालक, खजूर, गुड़, किशमिश और दालें खाएं।',
          'विटामिन सी (नींबू, संतरा) के साथ लें।',
          'खाने के तुरंत बाद चाय-कॉफी न पिएं।'
        ]
      },
      {
        id: 'acne',
        icon: '✨',
        title: 'मुंहासे, हार्मोन व आत्मविश्वास',
        tag: 'त्वचा देखभाल',
        summary: 'मुंहासे किशोरावस्था का स्वाभाविक हिस्सा हैं।',
        tips: [
          'दिन में दो बार सौम्य फेसवॉश से धोएं।',
          'मुंहासों को हाथ से न दबाएं।',
          'आत्मविश्वास बनाए रखें।'
        ]
      },
      {
        id: 'sleep',
        icon: '🌙',
        title: 'नींद की स्वच्छता व मोबाइल स्क्रीन सुरक्षा',
        tag: 'शांत नींद',
        summary: 'सोने से 45 मिनट पहले स्क्रीन बंद करने की आदत डालें।',
        tips: [
          'रात में ब्लू लाइट फिल्टर चालू रखें।',
          'समय पर सोने से याददाश्त बढ़ती है।'
        ]
      },
      {
        id: 'boundaries',
        icon: '💖',
        title: 'सकारात्मक सोच व आत्म-सम्मान',
        tag: 'मानसिक मजबूती',
        summary: 'दूसरों के दबाव में न आएं और अपनी बात दृढ़ता से कहें।',
        tips: [
          'सोशल मीडिया से अपनी तुलना न करें।',
          'विश्वसनीय बड़ों से मार्गदर्शन लें।'
        ]
      }
    ]
  },
  te: {
    tagMental: 'మానసిక ఆరోగ్యం',
    tagDerm: 'చర్మ సంరక్షణ & స్వీయ సంరక్షణ',
    tagCycle: 'రుతుచక్ర ఆరోగ్యం',
    tagEndo: 'హార్మోన్ ప్రాథమిక అంశాలు',
    tagFuel: 'పోషకాహారం',
    tagSleep: 'నిద్ర పరిశుభ్రత',
    btnTrackPeriodDesc: 'తేదీలు & లక్షణాలను నమోదు చేయండి',
    btnLogMoodDesc: 'రోజువారీ భావోద్వేగ ట్రాకర్',
    btnAskAiDesc: 'వ్యక్తిగత ఆరోగ్య ప్రశ్నోత్తరాలు',
    guidesTitle: 'పాఠశాల మరియు కౌమార ఆరోగ్య సూచనలు',
    guidesSub: 'విద్యార్థినుల కోసం ప్రత్యేక జీవనశైలి మార్గదర్శకాలు.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'పాఠశాలలో కడుపు నొప్పి నివారణ',
        tag: 'స్కూల్ కేర్',
        summary: 'పరీక్షల సమయంలో గోరువెచ్చని నీరు త్రాగడం మరియు విశ్రాంతి తీసుకోవడం మంచిది.',
        tips: ['గోరువెచ్చని నీరు వెంట ఉంచుకోండి.', 'టీచర్‌కు చెప్పి విశ్రాంతి తీసుకోండి.']
      },
      {
        id: 'iron',
        icon: '🥗',
        title: 'రక్తహీనత నివారణకు ఐరన్ ఆహారాలు',
        tag: 'పోషణ',
        summary: 'మునగాకు, ఖర్జూరం, బెల్లం తీసుకోవడం వల్ల అలసట తగ్గుతుంది.',
        tips: ['రోజూ ఖర్జూరం, పల్లీలు తినండి.', 'నిమ్మరసంతో పాటు తీసుకోండి.']
      }
    ]
  },
  ml: {
    tagMental: 'മാനസികാരോഗ്യം',
    tagDerm: 'ചർമ്മ സംരക്ഷണവും പരിചരണവും',
    tagCycle: 'ആർത്തവചക്ര ആരോഗ്യം',
    tagEndo: 'ഹോർമോൺ അടിസ്ഥാനങ്ങൾ',
    tagFuel: 'പോഷകസമൃദ്ധമായ ഭക്ഷണം',
    tagSleep: 'ഉറക്ക ശുചിത്വം',
    btnTrackPeriodDesc: 'തീയതികളും ലക്ഷണങ്ങളും രേഖപ്പെടുത്തുക',
    btnLogMoodDesc: 'ദിനചര്യ വികാര ട്രാക്കർ',
    btnAskAiDesc: 'സ്വകാര്യ ആരോഗ്യ ചോദ്യോത്തരങ്ങൾ',
    guidesTitle: 'കൗമാരക്കാർക്കുള്ള ജീവിതശൈലി മാർഗ്ഗരേഖ',
    guidesSub: 'സ്കൂളിലും പരീക്ഷകളിലും ആത്മവിശ്വാസത്തോടെ മുന്നേറാൻ.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'സ്കൂളിൽ വയറുവേദന കൈകാര്യം ചെയ്യൽ',
        tag: 'സ്കൂൾ കെയർ',
        summary: 'ചൂടുവെള്ളം കുടിക്കുകയും ലഘുവായി ശരീരം അനക്കുകയും ചെയ്യുക.',
        tips: ['ചെറുചൂടുവെള്ളം കുടിക്കുക.', 'അധ്യാപകരോട് പറയാൻ മടിക്കരുത്.']
      }
    ]
  },
  mr: {
    tagMental: 'मानसिक स्वास्थ्य',
    tagDerm: 'त्वचेचे आरोग्य आणि काळजी',
    tagCycle: 'मासिक पाळी आरोग्य',
    tagEndo: 'संप्रेरक मूलभूत माहिती',
    tagFuel: 'पौष्टिक आहार',
    tagSleep: 'शांत झोपेच्या सवयी',
    btnTrackPeriodDesc: 'तारीख आणि लक्षणे नोंदवा',
    btnLogMoodDesc: 'दैनिक मनस्थिती ट्रॅकर',
    btnAskAiDesc: 'वैयक्तिक आरोग्य प्रश्नोत्तरे',
    guidesTitle: 'किशोरवयीन मुलींसाठी उपयुक्त माहिती',
    guidesSub: 'शाळा व दैनंदिन जीवनातील मार्गदर्शक सूत्रे.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'शाळेत पोटदुखी व्यवस्थापन',
        tag: 'शालेय काळजी',
        summary: 'कोमट पाणी पिणे आणि तणावमुक्त राहणे फायदेशीर.',
        tips: ['कोमट पाण्याची बाटली सोबत ठेवा.', 'गरज भासल्यास विश्रांती घ्या.']
      }
    ]
  },
  mwr: {
    tagMental: 'मन रो स्वास्थ्य',
    tagDerm: 'चमड़ी री देखभाल',
    tagCycle: 'चक्र स्वास्थ्य',
    tagEndo: 'हार्मोन री बात',
    tagFuel: 'पौष्टिक खाणो',
    tagSleep: 'नींद री स्वच्छता',
    btnTrackPeriodDesc: 'तारीख अर लक्षण लिखो',
    btnLogMoodDesc: 'रोज रो मूड ट्रैकर',
    btnAskAiDesc: 'व्यक्तिगत स्वास्थ्य सवाल-जवाब',
    guidesTitle: 'किशोरी बेटियां सारु खास सलाह',
    guidesSub: 'स्कूल अर रोज री जिंदगी मां चोखो स्वास्थ्य।',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'स्कूल में पेट दर्द रो इलाज',
        tag: 'स्कूल सलाह',
        summary: 'गुनगुणो पाणी पियो अर हिम्मत राखो।',
        tips: ['पाणी री बोतल राखो।', 'मास्टर जी ने बताओ।']
      }
    ]
  },
  fr: {
    tagMental: 'Bien-être Mental',
    tagDerm: 'Dermatologie & Soins Personnels',
    tagCycle: 'Santé du Cycle',
    tagEndo: 'Bases Endocriniennes',
    tagFuel: 'Alimentation Équilibrée',
    tagSleep: 'Hygiène du Sommeil',
    btnTrackPeriodDesc: 'Enregistrer dates et symptômes',
    btnLogMoodDesc: 'Suivi quotidien des émotions',
    btnAskAiDesc: 'Questions-réponses santé privées',
    guidesTitle: 'Guides Ados : École, Santé & Confiance',
    guidesSub: 'Conseils pratiques pour vous épanouir à l’école et au quotidien.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'Gérer les crampes à l’école et pendant les examens',
        tag: 'Vie Scolaire',
        summary: 'Emportez de l’eau tiède et bougez doucement pour stimuler la circulation.',
        tips: ['Gardez une gourde d’eau tiède.', 'Informez l’infirmerie en cas de douleur.']
      }
    ]
  },
  lb: {
    tagMental: 'الصحة النفسية',
    tagDerm: 'العناية بالبشرة والاهتمام بالذات',
    tagCycle: 'صحة الدورة الشهرية',
    tagEndo: 'أساسيات الهرمونات والغدد',
    tagFuel: 'التغذية الصحية المتوازنة',
    tagSleep: 'عادات النوم الصحي',
    btnTrackPeriodDesc: 'تسجيل التواريخ والأعراض',
    btnLogMoodDesc: 'متتبع المزاج والمشاعر اليومي',
    btnAskAiDesc: 'أسئلة وأجوبة صحية خاصة',
    guidesTitle: 'دليل الفتيات للمدرسة والثقة بالنفس',
    guidesSub: 'نصائح عملية للنجاح بالمدرسة والاهتمام بالصحة.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'التعامل مع المغص بالمدرسة',
        tag: 'نصائح مدرسية',
        summary: 'شرب مي دافية والراحة بالغرفة الصحية.',
        tips: ['شرب مي دافية باستمرار.', 'طلب المساعدة من المعلمة.']
      }
    ]
  },
  ar: {
    tagMental: 'الصحة النفسية',
    tagDerm: 'العناية بالبشرة والاهتمام بالذات',
    tagCycle: 'صحة الدورة الشهرية',
    tagEndo: 'أساسيات الغدد والهرمونات',
    tagFuel: 'التغذية الصحية المتوازنة',
    tagSleep: 'عادات النوم الصحي',
    btnTrackPeriodDesc: 'تسجيل التواريخ والأعراض',
    btnLogMoodDesc: 'متتبع المشاعر والمزاج اليومي',
    btnAskAiDesc: 'أسئلة وأجوبة صحية سرية',
    guidesTitle: 'دليل الفتيات المراهقات للمدرسة والثقة بالذات',
    guidesSub: 'إرشادات عملية لدعم الفتاة في مسارها الدراسي وصحتها ونموها.',
    guides: [
      {
        id: 'cramps',
        icon: '🎒',
        title: 'تخفيف التقلصات أثناء المدرسة والامتحانات',
        tag: 'الجاهزية المدرسية',
        summary: 'خطوات بسيطة لتخفيف المغص أثناء الجلوس الطويل.',
        tips: [
          'شرب الماء الفاتر أو شاي الأعشاب الدافئ.',
          'استخدام لاصقات التدفئة الخفيفة أسفل الزي المدرسي.',
          'مراجعة العيادة المدرسية عند الحاجة للراحة.'
        ]
      },
      {
        id: 'iron',
        icon: '🥗',
        title: 'أغذية غنية بالحديد لمكافحة الإرهاق',
        tag: 'الطاقة والتغذية',
        summary: 'حماية الفتيات من فقر الدم الناجم عن نقص الحديد.',
        tips: ['تناول السبانخ والتمر والشمندر والعدس.', 'تناول فيتامين C لتعزيز الامتصاص.']
      }
    ]
  }
};

export default function TeenView({ onNavigate }) {
  const { t, language } = useLanguage();
  const teenDict = TEEN_I18N[language] || TEEN_I18N.en;
  const [openGuide, setOpenGuide] = useState(null);

  const teenTopics = [
    { title: t('teenTopic1Title'), icon: '🧠', tag: teenDict.tagMental, content: t('teenTopic1Desc') },
    { title: t('teenTopic2Title'), icon: '✨', tag: teenDict.tagDerm, content: t('teenTopic2Desc') },
    { title: t('teenTopic3Title'), icon: '🩸', tag: teenDict.tagCycle, content: t('teenTopic3Desc') },
    { title: t('teenTopic4Title'), icon: '🧬', tag: teenDict.tagEndo, content: t('teenTopic4Desc') },
    { title: t('teenTopic5Title'), icon: '🥗', tag: teenDict.tagFuel, content: t('teenTopic5Desc') },
    { title: t('teenTopic6Title'), icon: '🌙', tag: teenDict.tagSleep, content: t('teenTopic6Desc') }
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
          <span style={{ fontSize: '2.6rem' }}>🎒</span>
          <div>
            <span className="badge badge-pink" style={{ marginBottom: '6px' }}>
              {t('teenHubBadge')}
            </span>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--navy-dark)', margin: '0 0 6px 0' }}>
              {t('teenHubTitle')}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
              {t('teenHubSub')}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBanner customText={t('teenDisclaimer')} />

      {/* Quick Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <button
          onClick={() => onNavigate('cycle-tracker')}
          className="glass-card"
          style={{
            padding: '16px',
            border: '1px solid var(--pink-300)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <CalendarHeart size={24} color="var(--pink-600)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-dark)' }}>
              {t('trackPeriod')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {teenDict.btnTrackPeriodDesc}
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('daily-log')}
          className="glass-card"
          style={{
            padding: '16px',
            border: '1px solid var(--pink-300)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <Sparkles size={24} color="var(--rose-primary)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-dark)' }}>
              {t('logMood')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {teenDict.btnLogMoodDesc}
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('ai-assistant')}
          className="glass-card"
          style={{
            padding: '16px',
            border: '1px solid var(--pink-300)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <HeartPulse size={24} color="#8b5cf6" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-dark)' }}>
              {t('askAI')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {teenDict.btnAskAiDesc}
            </div>
          </div>
        </button>
      </div>

      {/* NEW: TEEN SCHOOL, LIFE & BODY CONFIDENCE SECTION */}
      {teenDict.guides && (
        <div className="glass-card" style={{
          padding: '28px',
          borderRadius: '20px',
          background: 'white',
          border: '1.5px solid #fbcfe8'
        }}>
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BookOpen size={20} color="#e11d48" />
              <h2 style={{ fontSize: '1.35rem', color: '#881337', margin: 0, fontWeight: 800 }}>
                {teenDict.guidesTitle}
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#9f1239' }}>
              {teenDict.guidesSub}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {teenDict.guides.map((g) => {
              const isOpen = openGuide === g.id;
              return (
                <div
                  key={g.id}
                  style={{
                    borderRadius: '16px',
                    border: isOpen ? '1.5px solid #ec4899' : '1px solid #fce7f3',
                    background: isOpen ? '#fdf2f8' : '#ffffff',
                    boxShadow: isOpen ? '0 4px 16px rgba(236, 72, 153, 0.1)' : 'none',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.6rem' }}>{g.icon}</span>
                        <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: '#881337' }}>
                          {g.title}
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
                        {g.tag}
                      </span>
                    </div>

                    <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                      {g.summary}
                    </p>

                    <button
                      type="button"
                      onClick={() => setOpenGuide(isOpen ? null : g.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ec4899',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 0
                      }}
                    >
                      <span>{isOpen ? (language === 'ta' ? 'சுருக்கவும்' : 'Hide Tips') : (language === 'ta' ? 'நடைமுறை வழிகாட்டியைப் பார்க்க' : 'View Action Tips')}</span>
                      {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>

                  {isOpen && g.tips && (
                    <div style={{
                      padding: '14px 18px',
                      background: '#ffffff',
                      borderTop: '1px dashed #fbcfe8'
                    }}>
                      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '5px', lineHeight: 1.45 }}>
                        {g.tips.map((tip, tIdx) => (
                          <li key={tIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Teen Educational Topics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {teenTopics.map((item, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '2rem' }}>{item.icon}</span>
              <span className="badge badge-lavender">{item.tag}</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', margin: 0 }}>{item.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
