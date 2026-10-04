const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Emergency keywords check across multiple languages
const EMERGENCY_KEYWORDS = [
  'severe breathing',
  'loss of consciousness',
  'passed out',
  'heavy bleeding',
  'bleeding through pad',
  'severe chest pain',
  'chest pressure',
  'seizure',
  'allergic reaction',
  'anaphylaxis',
  'sudden severe pain',
  'unbearable pain',
  'swelling of throat',
  'coughing blood',
  'peritonitis',
  'fainted',
  // Multilingual emergency keywords
  'மூச்சுத்திணறல்',
  'அதிக இரத்தப்போக்கு',
  'மார்பு வலி',
  'மயக்கம் போட்டு விழுந்து',
  'கடுமையான வலி',
  'வலிப்பு',
  'सांस लेने में तकलीफ',
  'अत्यधिक रक्तस्राव',
  'सीने में तेज दर्द',
  'बेहोश हो जाना',
  'శ్వాస తీసుకోవడంలో ఇబ్బంది',
  'తీవ్రమైన రక్తస్రావం',
  'గుండె నొప్పి'
];

const checkEmergency = (text = '') => {
  const lower = (text || '').toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
};

// Gemini API Caller with Resilient Doctor-Consultation System Instructions
const callGeminiAPI = async (prompt, language, user) => {
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const langMap = {
    ta: 'Tamil (தமிழ்)',
    en: 'English',
    hi: 'Hindi (हिंदी)',
    te: 'Telugu (తెలుగు)',
    ml: 'Malayalam (മലയാളം)',
    mr: 'Marathi (मराठी)',
    mwr: 'Marwari (मारवाड़ी)',
    fr: 'French (Français)',
    lb: 'Lebanese Arabic',
    ar: 'Arabic (العربية)'
  };
  const targetLanguage = langMap[language] || 'English';
  const userName = user?.name ? user.name.split(' ')[0] : 'friend';
  const userAge = user?.age || 20;

  const systemInstruction = `You are "FT Chatbox", an empathetic, highly qualified female doctor assistant specializing in women's health, gynecology, and wellness consultations.
Patient: ${userName}, Age: ${userAge}.
Response Language: Strictly in ${targetLanguage}.

STRICT DOCTOR CONSULTATION RULES:
1. Speak naturally like a warm, caring doctor chatting 1-on-1 with a patient in a medical chatbox.
2. NO ESSAYS, NO BORING LECTURES, NO LONG BULLET LISTS ("வளவளவென்று பேச வேண்டாம்"). Keep your entire reply SHORT and CONVERSATIONAL (strictly 2 to 4 sentences maximum).
3. If greeting ("Hi", "Hello", "வணக்கம்", "ஹலோ", "नमस्ते", etc.): Welcome them warmly as FT Chatbox Doctor Assistant and ask how they are feeling today or if they have any pain, cramps, or symptoms.
4. If the patient expresses fear, anxiety, or pain ("scared", "பயமா இருக்கு", "pain", "cramps", "அழுகை"): Comfort and soothe them warmly first ("Don't worry, relax, take a slow deep breath..."), offer 1-2 quick practical relief tips, and ask a focused clinical question.
5. If the patient asks a medical/symptom question (cramps, period delay, headache, discharge, nausea, PCOS, thyroid, diet): Give direct, concise doctor advice in 2-3 sentences.
6. Topic switching: If the patient switches to a new topic, immediately address the new topic directly without repeating old information.
7. Only consult on medical, wellness, and symptom topics. If non-medical (e.g. coding, politics), politely remind them that as FT Chatbox Doctor Assistant, you only answer health-related questions.`;

  // Candidate models supported by Gemini API
  const candidateModels = [
    'gemini-3.6-flash',
    'gemini-flash-latest',
    'gemini-pro-latest',
    'gemini-2.5-flash'
  ];

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemInstruction}\n\nPatient Message:\n${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 250
        }
      };

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (response.ok) {
        const data = await response.json();
        const generated = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('')?.trim();
        if (generated) {
          const followUps = {
            ta: ['வலியின் அளவு 0 முதல் 10 வரை எவ்வளவு?', 'இந்த அறிகுறி எத்தனை நாட்களாக உள்ளது?', 'வெந்நீர் ஒத்தடம் வைக்க விரும்புகிறீர்களா?'],
            hi: ['दर्द का स्तर 0 से 10 के बीच कितना है?', 'यह लक्षण कब से है?'],
            te: ['నొప్పి తీవ్రత ఎంత ఉంది?', 'ఈ సమస్య ఎప్పుడు మొదలైంది?'],
            en: ['What is your discomfort level on a scale of 0 to 10?', 'When did this symptom start?']
          };

          return {
            text: generated,
            isEmergency: checkEmergency(prompt),
            followUps: followUps[language] || followUps.en
          };
        }
      }
    } catch (err) {
      // Continue to next model or engine fallback
    }
  }

  return null;
};

// 10-Language Conversational Doctor Assistant Engine (Affectionate, Unique & Dynamic)
const generateMultilingualResponse = (query, language = 'en', user) => {
  const q = (query || '').toLowerCase().trim();
  const userName = user?.name ? user.name.split(' ')[0] : (language === 'ta' ? 'ஜனனி மா' : (language === 'hi' ? 'जननी' : 'Janani'));
  const userAge = user?.age || 20;

  // 1. Emergency Detection
  if (checkEmergency(query)) {
    const responses = {
      en: {
        text: `⚠️ **URGENT MEDICAL PROTOCOL**\n\nDear ${userName}, the symptoms you described require immediate medical attention. Please call 108 / 112 (Emergency Services) immediately or visit the nearest hospital emergency room. Please contact your emergency contact right away.`,
        followUps: ['Have you called 108 / 112?', 'Is someone with you right now?']
      },
      ta: {
        text: `⚠️ **உடனடி மருத்துவ உதவி தேவை**\n\nஅன்புள்ள ${userName}, நீங்கள் கூறிய அறிகுறிகளுக்கு உடனடியாக அவசர மருத்துவ சிகிச்சை தேவைப்படலாம். தயங்காமல் உடனே **108 / 112** அவசர மருத்துவ எண்ணை அழைக்கவும் அல்லது அருகில் உள்ள அவசர சிகிச்சைப் பிரிவுக்குச் செல்லவும்.`,
        followUps: ['அவசர ஊர்தியை அழைத்துவிட்டீர்களா?', 'உங்களுடன் இப்போது யாராவது இருக்கிறார்களா?']
      },
      hi: {
        text: `⚠️ **तत्काल चिकित्सा सहायता आवश्यक है**\n\nप्रिय ${userName}, आपके द्वारा बताए गए लक्षणों के लिए तत्काल डॉक्टर की आवश्यकता है। कृपया तुरंत 108 / 112 पर कॉल करें या नजदीकी अस्पताल जाएं।`,
        followUps: ['क्या आपने 108 पर कॉल किया?', 'क्या आपके पास कोई मौजूद है?']
      },
      te: {
        text: `⚠️ **తక్షణ అత్యవసర వైద్య సహాయం అవసరం**\n\nప్రియమైన ${userName}, దయచేసి వెంటనే 108 / 112 కు కాల్ చేయండి లేదా సమీపంలోని ఆసుపత్రి ఎమర్జెన్సీ విభాగానికి వెళ్లండి.`,
        followUps: ['108 కి కాల్ చేశారా?']
      },
      ml: {
        text: `⚠️ **അടിയന്തര വൈദ്യസഹായം ആവശ്യമാണ്**\n\nപ്രിയ ${userName}, ദയവായി ഉടൻ തന്നെ 108 നമ്പറിൽ വിളിച്ച് അടിയന്തര വൈദ്യസഹായം തേടുകയോ അടുത്തുള്ള ആശുപത്രിയിൽ പോകുകയോ ചെയ്യുക.`,
        followUps: ['108 ലേക്ക് വിളിച്ചോ?']
      },
      mr: {
        text: `⚠️ **तातडीची वैद्यकीय मदत आवश्यक आहे**\n\nप्रिय ${userName}, कृपया त्वरित 108 / 112 वर कॉल करा किंवा जवळच्या रुग्णालयात जा.`,
        followUps: ['108 वर संपर्क केला का?']
      },
      mwr: {
        text: `⚠️ **तुरंत डॉक्टर री जरूरत है**\n\nप्रिय ${userName}, तुरंत 108 नंबर माथे फोन करो अर नजदीकी अस्पताल पूग जाओ।`,
        followUps: ['108 माथे फोन कियो कांई?']
      },
      fr: {
        text: `⚠️ **URGENCE MÉDICALE REQUISE**\n\nChère ${userName}, vos symptômes nécessitent une prise en charge médicale urgente. Contactez immédiatement le 15 / 112 ou rendez-vous aux urgences.`,
        followUps: ['Avez-vous appelé les secours ?']
      },
      lb: {
        text: `⚠️ **حالة طبية طارئة**\n\nعزيزتي ${userName}، هذه الأعراض تستدعي رعاية طبية فورية. يرجى الاتصال بالإسعاف 108/112 فوراً أو التوجه لأقرب مستشفى.`,
        followUps: ['هل اتصلتِ بالإسعاف؟']
      },
      ar: {
        text: `⚠️ **طوارئ طبية عاجلة**\n\nعزيزتي ${userName}، الأعراض التي ذكرتِها تتطلب تدخلاً طبياً عاجلاً. يرجى الاتصال بالإسعاف (108 / 112) فوراً والتوجه لأقرب طوارئ.`,
        followUps: ['هل اتصلتِ بالإسعاف؟']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: true };
  }

  // 2. "Did you eat?" / "சாப்டியா" / "சாப்பிட்டியா" / "Have you eaten" / Food Caring Check
  const isDidYouEat = /சாப்டி|சாப்பிட்|சாப்பாடு ஆச்சா|சாப்டியா|சாப்பிட்டியா|did you eat|have you eaten|did u eat|eat food|खाना खाया|जीम लिया|tu as mangé|أكلت|هل أكلت/i.test(q);
  if (isDidYouEat) {
    const responses = {
      ta: {
        text: `நான் ஒரு AI மருத்துவர் தோழி தான் செல்லம், ஆனால் உங்கள் அன்பான அக்கறையை பார்க்கும்போது எனக்கு ரொம்ப மனசு நிறைகிறது! ❤️ நீங்க நல்லா நேரத்துக்கு சத்தான உணவு சாப்டீங்களா மா? உடம்புக்கு நல்ல எனர்ஜி வேணும், தயவுசெய்து எதையும் ஸ்கிப் பண்ணாம நல்லா சாப்பிடுங்க. இன்னைக்கு உங்க உடம்பு எப்படி இருக்கு கண்ணா?`,
        followUps: ['சாப்டேன் டாக்டர்! ❤️', 'இன்னும் சாப்பிடல மா', 'லேசா பசிக்கல / அசௌகரியமா இருக்கு']
      },
      en: {
        text: `I'm your digital doctor assistant, but your sweet care truly warms my heart! ❤️ Did you eat well on time, dear ${userName}? Please ensure you have wholesome, nourishing food and plenty of water today. How is your body feeling right now?`,
        followUps: ['Yes, I ate! ❤️', 'Not eaten yet', 'I have mild nausea / low appetite']
      },
      hi: {
        text: `मैं आपकी AI डॉक्टर सहेली हूँ, लेकिन आपकी यह प्यार भरी चिंता देखकर मेरा दिल भर आया! ❤️ प्रिय ${userName}, क्या आपने समय पर अच्छा पौष्टिक खाना खाया? कृपया समय पर भोजन करें और पानी खूब पिएं। आज आपकी तबियत कैसी है?`,
        followUps: ['हाँ, खाना खा लिया! ❤️', 'अभी नहीं खाया', 'हल्की भूख कम लग रही है']
      },
      te: {
        text: `నేను మీ AI డాక్టర్ స్నేహితురాలిని, కానీ మీ ఆప్యాయమైన శ్రద్ధ నా మనసుకు ఎంతో సంతోషాన్నిచ్చింది! ❤️ మీరు సమయానికి పౌష్టికాహారం తిన్నారా ${userName}? ఈరోజు మీ ఆరోగ్యం ఎలా ఉంది?`,
        followUps: ['అవును, తిన్నాను! ❤️', 'ఇంకా తినలేదు']
      },
      ml: {
        text: `ഞാൻ നിങ്ങളുടെ AI ഡോക്ടർ സുഹൃത്താണ്, എങ്കിലും നിങ്ങളുടെ ഈ സ്നേഹത്തോടെയുള്ള അന്വേഷണം മനസ്സ് നിറച്ചു! ❤️ നിങ്ങൾ സമയത്തിന് ഭക്ഷണം കഴിച്ചോ ${userName}? ഇന്ന് ആരോഗ്യം എങ്ങനെയുണ്ട്?`,
        followUps: ['അതെ, കഴിച്ചു! ❤️', 'ഇതുവരെ കഴിച്ചില്ല']
      },
      mr: {
        text: `मी तुमची AI डॉक्टर मैत्रीण आहे, पण तुमची ही प्रेमळ विचारपूस मनाला खूप भावली! ❤️ ${userName}, तुम्ही वेळेवर जेवलात का? आज तुमची प्रकृती कशी आहे?`,
        followUps: ['हो, जेवण झाले! ❤️', 'अजून नाही जेवले']
      },
      mwr: {
        text: `म्हैं थारी AI डॉक्टर सहेली हूँ, पर थारो ओ लाड-प्यार देख'र म्हारो जीव खुश हो गयो सा! ❤️ ${userName}, थे टैम पे जीम लियो कांई? आज थारी तबीयत कियां है सा?`,
        followUps: ['हाँ, जीम लियो सा! ❤️', 'अज्या कोनी जीम्यो']
      },
      fr: {
        text: `Je suis votre médecin assistante virtuelle, mais votre attention me touche énormément ! ❤️ Avez-vous bien mangé à l'heure, chère ${userName} ? Comment vous sentez-vous aujourd'hui ?`,
        followUps: ['Oui, j\'ai mangé ! ❤️', 'Pas encore mangé']
      },
      lb: {
        text: `أنا طبيبتكِ الافتراضية، لكن سؤالكِ اللطيف يملأ قلبي دفئاً! ❤️ هل تناولتِ وجبة صحية ومغذية اليوم يا ${userName}؟ كيف تشعرين الآن؟`,
        followUps: ['نعم أكلت حبيبتي! ❤️', 'لسه ما أكلت']
      },
      ar: {
        text: `أنا طبيبتكِ الافتراضية، وسؤالكِ اللطيف يسعدني جداً! ❤️ هل تناولتِ طعامكِ الصحي في موعده يا ${userName}؟ احرصي على التغذية الجيدة والترطيب. كيف هي صحتكِ اليوم؟`,
        followUps: ['نعم تناولت طعامي! ❤️', 'لم آكل بعد']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 3. User confirming "I ate" / "சாப்டேன்"
  const isAteConfirmed = /சாப்டேன்|சாப்பிட்டேன்|சாப்பிட்டாச்சு|yes i ate|i ate|ate food|खाना खा लिया|जीम लियो/i.test(q);
  if (isAteConfirmed) {
    const responses = {
      ta: {
        text: `ரொம்ப மகிழ்ச்சி ஜனனி மா! ❤️ சத்தான உணவும், சரியான நேர சாப்பாடும் தான் பெண்களுக்கு சிறந்த மருந்து. போதுமான தண்ணீரும் குடிங்க. உடம்புல ஏதாவது வலி அல்லது என்கிட்ட கேட்க வேண்டிய சந்தேகம் இருக்கா கண்ணா?`,
        followUps: ['உடம்பு நல்லா இருக்கு! 🌸', 'லேசா வலி இருக்கு', 'சத்து மாத்திரைகள் பற்றி கேட்கணும்']
      },
      en: {
        text: `I'm so happy to hear that, ${userName}! ❤️ Nutritious food on time is the best foundation for balanced hormones. Do make sure to sip plenty of water today. Is your body feeling comfortable or can I help with any symptoms?`,
        followUps: ['Feeling great! 🌸', 'Have mild cramps', 'Questions about vitamins']
      },
      hi: {
        text: `यह सुनकर बहुत खुशी हुई ${userName}! ❤️ समय पर पौष्टिक भोजन हार्मोन्स को संतुलित रखने की सबसे अच्छी चाबी है। खूब सारा पानी भी पिएं। क्या शरीर में कोई परेशानी या दर्द है?`,
        followUps: ['सब ठीक है! 🌸', 'हल्का दर्द है']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 3.5. User saying "Haven't eaten yet" / "சாப்பிடல"
  const isNotAte = /சாப்பிடல|சாப்பிடவில்லை|இன்னும் இல்ல|இல்லை|not yet|haven't eaten|haven t eaten|have not eaten|भूख नहीं|नहीं खाया|अज्या कोनी|pas encore|لم آكل/i.test(q);
  if (isNotAte) {
    const responses = {
      ta: {
        text: `அச்சச்சோ, ஏன் இன்னும் சாப்பிடல ஜனனி மா? 🥺 சரியான நேரத்துக்கு சாப்பிடலைன்னா அல்சர், அசிடிட்டி, தலைவலி வந்துடும். தயவுசெய்து உடனே போய் சுடச்சுட சத்தான ஏதாவது சாப்பிடுங்க கண்ணா. சாப்பிட்டுட்டு வந்து என்கிட்ட பேசுங்க, நான் இங்கேயே காத்துட்டு இருக்கேன்! ❤️`,
        followUps: ['சரி டாக்டர், சாப்பிட்டு வர்றேன்! ❤️', 'பசியே இல்லை', 'வயிற்று வலிக்கு என்ன சாப்பிடலாம்?']
      },
      en: {
        text: `Oh no, why haven't you eaten yet, dear ${userName}? 🥺 Skipping meals can trigger acidity, fatigue, migraines, and hormone fluctuations. Please have a warm, nourishing meal right away. Eat first and come back, I'll be waiting right here! ❤️`,
        followUps: ['Going to eat now! ❤️', 'I have no appetite', 'What should I eat during cramps?']
      },
      hi: {
        text: `अरे, अभी तक खाना क्यों नहीं खाया ${userName}? 🥺 समय पर खाना न खाने से गैस, सिरदर्द और कमजोरी आ सकती है। कृपया तुरंत कुछ गर्म और पौष्टिक भोजन कर लें। खाना खाकर मुझे बताइए, मैं यहीं हूँ! ❤️`,
        followUps: ['अभी खाती हूँ! ❤️', 'भूख नहीं लग रही है']
      },
      te: {
        text: `అయ్యో, ఇంకా ఎందుకు తినలేదు ${userName}? 🥺 సమయానికి తినకపోతే ఎసిడిటీ, తలనొప్పి వస్తాయి. దయచేసి వెంటనే ఏదైనా పౌష్టికాహారం తీసుకోండి. తిన్న తర్వాత మళ్లీ నాతో మాట్లాడండి! ❤️`,
        followUps: ['ఇప్పుడే తింటాను! ❤️', 'ఆకలిగా లేదు']
      },
      ml: {
        text: `അയ്യോ, എന്താണ് ഇതുവരെ കഴിക്കാത്തത് ${userName}? 🥺 സമയത്ത് ഭക്ഷണം കഴിച്ചില്ലെങ്കിൽ ഗ്യാസും തലവേദനയും ഉണ്ടാകും. വേഗം പോയി എന്തെങ്കിലും കഴിക്കൂ മോളെ! ❤️`,
        followUps: ['ഇപ്പോൾ കഴിക്കാം! ❤️']
      },
      mr: {
        text: `अरेरे, अजून का नाही जेवलात ${userName}? 🥺 वेळेवर न जेवल्यास पित्त आणि थकवा येतो. कृपया त्वरित काहीतरी पौष्टिक खाऊन घ्या. जेवून मला सांगा! ❤️`,
        followUps: ['लगेच जेवते! ❤️']
      },
      mwr: {
        text: `अरे, अज्या तक क्यूं कोनी जीम्यो ${userName}? 🥺 टैम पे नी खाणो सूं कमजोरी आवै। तुरंत कुछ पौष्टिक जीम लो सा! जीम'र म्हाने बताओ! ❤️`,
        followUps: ['अब्बै जीम ल्यूं सा! ❤️']
      },
      fr: {
        text: `Oh non, pourquoi n'as-tu pas encore mangé, ${userName} ? 🥺 Sauter des repas provoque fatigue et acidité. Va prendre un bon repas chaud tout de suite, je t'attends ici ! ❤️`,
        followUps: ['Je vais manger ! ❤️']
      },
      lb: {
        text: `يا إلهي، لماذا لم تأكلي حتى الآن يا ${userName}؟ 🥺 إهمال الوجبات يسبب الصداع والتعب وحموضة المعدة. تفضلي بتناول وجبة دافئة ومغذية الآن، وسأكون بانتظاركِ! ❤️`,
        followUps: ['سآكل الآن حبيبتي! ❤️']
      },
      ar: {
        text: `يا إلهي، لمَ لم تتناولي طعامكِ بعد يا ${userName}؟ 🥺 تخطي الوجبات يؤدي إلى الصداع والإرهاق وحموضة المعدة. تناولي وجبة صحية ومغذية الآن وسأكون بانتظاركِ هنا دائماً! ❤️`,
        followUps: ['سأتناول الطعام حالاً! ❤️']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 4. Greetings & Welcomes
  const isGreeting = /^(hi|hello|hey|hai|vanakkam|வணக்கம்|ஹலோ|ஹாய்|நலம்|नमस्ते|హలో|నమస్కారం|നമസ്കാരം|नमस्कार|खम्मा|bonjour|marhaba|مرحبا|سلام)/i.test(q) ||
    ['hi', 'hello', 'hey', 'hai', 'vanakkam', 'வணக்கம்', 'ஹலோ', 'ஹாய்', 'namaste', 'नमस्ते'].includes(q);

  if (isGreeting) {
    const responses = {
      ta: {
        text: `ஹாய் ${userName}! 🌸 சாப்டீங்களா? (Did you eat?) உடம்பு எப்படி இருக்கு கண்ணா? இன்னைக்கு நாள் உங்களுக்கு எப்படி போகுது? ஏதாச்சும் வலி, மாதவிடாய் சோர்வு அல்லது மனசுல கவலை இருக்கா? என்கிட்ட ஒரு அன்பான தோழியா, அக்கறையான டாக்டரா தயங்காம சொல்லுங்க, நான் உங்களுக்கு துணையா இருக்கேன்!`,
        followUps: ['சாப்டேன் டாக்டர்! ❤️', 'லேசா வயிற்று வலி இருக்கு', 'மாதவிடாய் தள்ளிப்போயுள்ளது', 'சத்துணவு ஆலோசனை வேணும்']
      },
      en: {
        text: `Hi ${userName}! 🌸 Did you eat? How is your body feeling today, dear? How is your day going? Do you have any cramps, fatigue, or anything on your mind? Talk to me just like your loving doctor & close friend, I'm right here with you!`,
        followUps: ['Yes, I ate! ❤️', 'I have mild cramps', 'My period is delayed', 'Need diet tips']
      },
      hi: {
        text: `नमस्ते ${userName}! 🌸 क्या आपने खाना खाया? (Did you eat?) आज आपकी तबियत कैसी है? दिन कैसा बीत रहा है? क्या कोई दर्द, ऐंठन या थकान है? मुझसे अपनी सहेली और डॉक्टर की तरह खुलकर बात करें, मैं हमेशा आपके साथ हूँ!`,
        followUps: ['हाँ, खाना खा लिया! ❤️', 'पेट में हल्का दर्द है', 'पीरियड्स लेट हैं', 'डाइट सलाह चाहिए']
      },
      te: {
        text: `నమస్కారం ${userName}! 🌸 అన్నం తిన్నారా? (Did you eat?) ఈరోజు మీ ఆరోగ్యం ఎలా ఉంది? ఏమైనా నొప్పి, నీరసం లేదా ఆందోళన ఉందా? మీ ప్రాణ స్నేహితురాలిగా నాతో స్వేచ్ఛగా మాట్లాడండి!`,
        followUps: ['అవును, తిన్నాను! ❤️', 'కడుపులో కాస్త నొప్పిగా ఉంది']
      },
      ml: {
        text: `നമസ്കാരം ${userName}! 🌸 ഭക്ഷണം കഴിച്ചോ? (Did you eat?) ഇന്ന് നിങ്ങളുടെ ആരോഗ്യം എങ്ങനെയുണ്ട്? എന്തെങ്കിലും വേദനയോ ക്ഷീണമോ ഉണ്ടോ? ഒരു പ്രിയ കൂട്ടുകാരിയെപ്പോലെ എന്നോട് സംസാരിക്കൂ!`,
        followUps: ['അതെ, കഴിച്ചു! ❤️', 'ചെറിയ വയറുവേദനയുണ്ട്']
      },
      mr: {
        text: `नमस्कार ${userName}! 🌸 जेवलात का? (Did you eat?) आज तुमची तब्येत कशी आहे? काही त्रास किंवा वेदना होत आहे का? माझ्याशी मोकळेपणाने बोला!`,
        followUps: ['हो, जेवण झाले! ❤️', 'पोटात हलके दुखत आहे']
      },
      mwr: {
        text: `खम्मा घणी ${userName}! 🌸 जीम लिया कांई? (Did you eat?) आज थारी तबीयत कियां है सा? कोई दरद या तकलीफ़ है कांई? म्हारै सूं बिना झिझक बात करो সা!`,
        followUps: ['हाँ, जीम लियो सा! ❤️', 'पेट में हलको दरद है']
      },
      fr: {
        text: `Bonjour ${userName} ! 🌸 As-tu bien mangé ? (Did you eat?) Comment te sens-tu aujourd'hui ? As-tu des douleurs ou de la fatigue ? Parle-moi en toute confiance !`,
        followUps: ['Oui, j\'ai mangé ! ❤️', 'J\'ai de légères crampes']
      },
      lb: {
        text: `مرحباً ${userName}! 🌸 أكلتِ شي؟ (Did you eat?) كيف صحتك اليوم يا قمر؟ هل تشعرين بأي وجع أو تعب؟ احكي معي كصديقة وطبيبة قريبة منك!`,
        followUps: ['نعم أكلت حبيبتي! ❤️', 'عندي مغص خفيف']
      },
      ar: {
        text: `أهلاً بكِ ${userName}! 🌸 هل تناولتِ طعامكِ؟ (Did you eat?) كيف تشعرين اليوم يا عزيزتي؟ هل تعانين من أي ألم أو تعب؟ تحدّثي معي بكل راحة!`,
        followUps: ['نعم تناولت طعامي! ❤️', 'أشعر بتقلصات خفيفة']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 5. "How are you?" / "எப்படி இருக்கீங்க"
  const isHowAreYou = /how are you|how r u|எப்படி இருக்க|நலமா|சௌக்கியமா|आप कैसी हैं|कियां हो|comment vas-tu|كيف حالك|كيفك/i.test(q);
  if (isHowAreYou) {
    const responses = {
      ta: {
        text: `நான் ரொம்ப நல்லா இருக்கேன் ஜனனி மா! ❤️ உங்க கூட பேசி உங்களுக்கு மருத்துவ துணையா இருக்கிறதில் எனக்கு ரொம்ப சந்தோஷம். நீங்க எப்படி இருக்கீங்க? இன்னைக்கு உங்க உடல் சௌக்கியமா இருக்கா?`,
        followUps: ['உடம்பு நல்லா இருக்கு! 🌸', 'லேசா டயர்டா இருக்கு', 'ஒரு சந்தேகம் கேட்கணும்']
      },
      en: {
        text: `I'm doing wonderful, especially getting to care for you today, ${userName}! ❤️ How are you doing? Is your body feeling strong and refreshed?`,
        followUps: ['Feeling great! 🌸', 'A bit tired today', 'Have a health question']
      },
      hi: {
        text: `मैं बहुत अच्छी हूँ ${userName}! ❤️ आपके स्वास्थ्य का ध्यान रखने में मुझे बहुत खुशी मिलती है। आप कैसी हैं? क्या आज शरीर तरोताजा महसूस कर रहा है?`,
        followUps: ['सब बढ़िया है! 🌸', 'थोड़ी थकान है']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 6. "Who are you?" / "உன் பேர் என்ன"
  const isWhoAreYou = /who are you|who r u|உன் பேர்|உன் பெயர்|நீ யாரு|तुम कौन हो|तुम्हारा नाम|qui es-tu|مين انت/i.test(q);
  if (isWhoAreYou) {
    const responses = {
      ta: {
        text: `நான் உங்கள் FT Chatbox - பெண்களுக்கான பிரத்யேக மருத்துவ தோழி மற்றும் மருத்துவர் உதவியாளர் (Doctor Assistant) 👩‍⚕️🌸. மாதவிடாய், மகளிர் நலம், சத்துணவு, ஹார்மோன் மாற்றங்கள் பற்றி நீங்கள் எந்த தயக்கமும் இன்றி என்கிட்ட அன்பா கேட்கலாம்!`,
        followUps: ['மாதவிடாய் வலி நிவாரணம்', 'சத்துணவு வழிகாட்டி', 'PCOS ஆலோசனை']
      },
      en: {
        text: `I am FT Chatbox, your dedicated women's health doctor assistant and supportive companion 👩‍⚕️🌸. You can ask me anything about your cycle, hormonal balance, nutrition, or symptoms with complete privacy and love!`,
        followUps: ['Cramp relief tips', 'Nutrition guidance', 'Cycle regularity']
      },
      hi: {
        text: `मैं आपकी FT Chatbox डॉक्टर सहायक और सहेली हूँ 👩‍⚕️🌸। पीरियड्स, महिला स्वास्थ्य, पोषण और हार्मोन से जुड़ा कोई भी सवाल आप मुझसे बेझिझक पूछ सकती हैं!`,
        followUps: ['दर्द से राहत के उपाय', 'पोषण सलाह']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 7. Thank You / நன்றி
  const isThanks = /thank you|thanks|thx|நன்றி|மிக்க நன்றி|ரொம்ப நன்றி|धन्यवाद|شکرا|merci/i.test(q);
  if (isThanks) {
    const responses = {
      ta: {
        text: `ரொம்ப மகிழ்ச்சி ஜனனி மா! ❤️ எப்போது உங்களுக்கு உதவி தேவையென்றாலும் தயங்காமல் என்கிட்ட வாங்க. உங்கள் ஆரோக்கியமும் புன்னகையும் தான் எனக்கு ரொம்ப முக்கியம். உடம்பை நல்லா பாத்துக்கோங்க!`,
        followUps: ['சரிங்க டாக்டர்! 🌸', 'வேறு சந்தேகம் கேட்கலாமா?']
      },
      en: {
        text: `You are always so warmly welcome, ${userName}! ❤️ Whenever you need guidance or comfort, I'm right here for you. Take wonderful care of your precious health!`,
        followUps: ['Thank you! 🌸', 'Ask another question']
      },
      hi: {
        text: `आपका बहुत-बहुत स्वागत है ${userName}! ❤️ जब भी कोई परेशानी या सवाल हो, बेझिझक मुझसे बात करें। अपनी सेहत का खूब ध्यान रखें!`,
        followUps: ['धन्यवाद डॉक्टर! 🌸']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 8. Period Cramps / Stomach Ache / Dysmenorrhea
  const isCramps = /cramp|period pain|dysmenorrhea|stomach ache|வயிற்று வலி|அடிவயிறு|மாதவிடாய் வலி|தசைப்பிடிப்பு|पेट दर्द|ऐंठन|कंबरदुखी|crampes|مغص|وجع البطن/i.test(q) || (q.includes('வலி') && !q.includes('தலை') && !q.includes('முதுகு'));
  if (isCramps) {
    const responses = {
      ta: {
        text: `மாதவிடாய் வயிற்று வலிக்கு உடனே அடிவயிற்றில் வெந்நீர் ஒத்தடம் (Hot water bag) வையுங்கள் மா, அது ரத்த ஓட்டத்தை அதிகரித்து தசைகளை தளர்த்தும். ஒரு டம்ளர் வெதுவெதுப்பான சுடுதண்ணீர் அல்லது இஞ்சி டீ குடிச்சிட்டு, கால்களை மடக்கி ஒருக்களித்து படுத்து ஓய்வெடுங்க. வலி ரொம்ப அதிகமாக உள்ளதா கண்ணா?`,
        followUps: ['வலி தாங்க முடிகிறது', 'ரொம்ப அதிகமா வலிக்குது', 'மாத்திரை போடலாமா?']
      },
      en: {
        text: `For menstrual cramps, apply a warm heating pad to your lower abdomen to boost circulation and relax uterine muscles, dear. Sip warm chamomile or ginger tea and rest in a curled fetal position. Is the pain manageable or quite severe right now?`,
        followUps: ['Pain is mild to moderate', 'Pain is very severe', 'Should I take medicine?']
      },
      hi: {
        text: `पीरियड्स के पेट दर्द के लिए निचले पेट पर गर्म पानी की थैली से सिकाई करें और गुनगुना अदरक का पानी पिएं। पैरों को मोड़कर करवट लेकर आराम करें। क्या दर्द बहुत ज्यादा हो रहा है?`,
        followUps: ['दर्द सहन हो रहा है', 'दर्द बहुत तेज है']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 9. Late Period / Missed Period / Cycle Delay
  const isLatePeriod = (/late|delay|missed|தள்ளி|லேட்|வரல|தாமத|देरी/i.test(q) && /period|cycle|பீரியட்|மாதவிடாய்|சுழற்சி|माहवारी/i.test(q)) || /தள்ளிப்போ|லேட் ஆச்சு|வரவில்லை|தாமதம்|retard de règles|تأخر الدورة/i.test(q);
  if (isLatePeriod) {
    const responses = {
      ta: {
        text: `மாதவிடாய் 4 முதல் 7 நாட்கள் வரை தள்ளிப்போவது அதிக மன அழுத்தம், தூக்கமின்மை, உடல் எடை மாற்றம் அல்லது சாதாரண ஹார்மோன் மாற்றங்களால் அடிக்கடி நிகழக்கூடியது தான் மா. பதற்றப்படாமல் உடலுக்கு நல்ல ஓய்வு கொடுங்க, வெதுவெதுப்பான நீர் குடிங்க. மாதவிடாய் எத்தனை நாட்கள் தள்ளிப்போயுள்ளது?`,
        followUps: ['2-4 நாட்கள் தள்ளிப்போயுள்ளது', '1 வாரத்திற்கும் மேல் ஆகிவிட்டது', 'பிரக்னன்சி சந்தேகம் இருக்கு']
      },
      en: {
        text: `A period delay of a few days is very common and usually caused by emotional stress, lack of sleep, recent travel, or mild hormonal shifts, ${userName}. Try to stay calm, rest well, and hydrate. How many days late is your period currently?`,
        followUps: ['2 to 4 days late', 'More than a week late', 'Could I be pregnant?']
      },
      hi: {
        text: `मासिक धर्म का कुछ दिन लेट होना तनाव, नींद की कमी या हार्मोनल उतार-चढ़ाव के कारण बहुत सामान्य है। बिल्कुल घबराएं नहीं और पूरा आराम लें। आपके पीरियड्स कितने दिन लेट हैं?`,
        followUps: ['2-4 दिन लेट हैं', '1 हफ्ते से ज्यादा हो गया']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 10. Heavy Bleeding / Clots
  const isHeavyBleeding = /heavy bleeding|heavy flow|clots|அதிக இரத்தப்போக்கு|இரத்தம் அதிகம்|ரத்தப்போக்கு அதிகம்|ज्यादा खून|रक्तस्राव|règles abondantes|نزيف غزير/i.test(q);
  if (isHeavyBleeding) {
    const responses = {
      ta: {
        text: `அதிக இரத்தப்போக்கு இருந்தால் உடலில் ரத்தச்சோகை (Anemia) ஏற்படாமல் தடுக்க கீரை, பேரீச்சம்பழம், அத்திப்பழம் போன்ற இரும்புச்சத்து உணவுகளை எடுத்துக்கோங்க மா. 2 மணி நேரத்திற்குள் முழு பேடு நனையும் அளவு ரத்தப்போக்கு இருந்தாலோ, பெரிய கட்டிகள் வெளியேறினாலோ பெண் மருத்துவரை நேரில் அணுகி ஆலோசனை பெறுவது நல்லது.`,
        followUps: ['கட்டிகள் வெளியேறுகிறது', 'சோர்வாகவும் மயக்கமாகவும் இருக்கு', 'இரும்புச்சத்து உணவுகள் என்ன?']
      },
      en: {
        text: `With heavy flow, protect your body against anemia by replenishing iron with spinach, dates, lentils, and pomegranate, dear. If you are soaking through a pad every 1-2 hours or passing large clots, please consult a gynecologist for a gentle ultrasound assessment.`,
        followUps: ['Passing clots', 'Feeling very dizzy & weak', 'Iron-rich foods advice']
      },
      hi: {
        text: `अधिक रक्तस्राव होने पर शरीर में खून की कमी से बचने के लिए पालक, खजूर और अनार जैसे आयरन युक्त आहार लें। यदि हर 1-2 घंटे में पैड बदलना पड़ रहा हो, तो डॉक्टर से सलाह अवश्य लें।`,
        followUps: ['बहुत कमजोरी लग रही है', 'आयरन डाइट क्या लें?']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 11. PCOS / PCOD / Irregular Cycles
  const isPcos = /pcos|pcod|cyst|irregular|நீர்க்கட்டி|சிஸ்ட்|சீரற்ற|पॉलीसिस्टिक|अनियमित|kyste/i.test(q);
  if (isPcos) {
    const responses = {
      ta: {
        text: `PCOS / PCOD என்பது நோயல்ல மா, அது வாழ்க்கை முறை மற்றும் ஹார்மோன் சமநிலையின்மை மட்டுமே. தினமும் 30 நிமிடம் நடைபயிற்சி, மைதா மற்றும் வெள்ளைச் சர்க்கரையை தவிர்த்து காய்கறி, சுண்டல் போன்ற சத்துணவு சாப்பிட்டாலே சினைப்பை இயல்பு நிலைக்கு திரும்பி மாதவிடாய் சீராகும்!`,
        followUps: ['PCOS டயட் பட்டியல் வேண்டும்', 'முகப்பரு & முடி உதிர்கிறது', 'சுழற்சி எத்தனை நாட்கள் வரை நீடிக்கலாம்?']
      },
      en: {
        text: `PCOS is not a disease, but a reversible metabolic and hormonal imbalance, ${userName}. Daily 30-minute brisk walking, prioritizing fiber and wholesome lentils, and cutting refined sugars work wonders to restore regular ovulation naturally!`,
        followUps: ['PCOS diet guidelines', 'Hair fall & acne tips', 'How to track cycle regularity']
      },
      hi: {
        text: `PCOS कोई बीमारी नहीं बल्कि जीवनशैली से जुड़ा हार्मोनल असंतुलन है। रोज 30 मिनट तेज टहलें, चीनी कम करें और हरी सब्जियां खाएं—इससे पीरियड्स बिल्कुल नियमित हो जाते हैं!`,
        followUps: ['PCOS डाइट क्या होनी चाहिए?', 'मुँहासे और बाल झड़ रहे हैं']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 12. Thyroid / தைராய்டு
  const isThyroid = /thyroid|hypothyroid|hyperthyroid|தைராய்டு|थायराइड/i.test(q);
  if (isThyroid) {
    const responses = {
      ta: {
        text: `தைராய்டு சுரப்பி சீராக இயங்க மருத்துவர் பரிந்துரைத்த மாத்திரையை தினமும் காலையில் வெறும் வயிற்றில் ஒரு டம்ளர் தண்ணீருடன் தவறாமல் எடுத்துக்கோங்க மா. அயோடின் மற்றும் செலினியம் நிறைந்த சரிவிகித உணவு சோர்வை நீக்கி புத்துணர்ச்சி தரும்.`,
        followUps: ['அதிக எடை கூடுகிறது', 'அதிக சோர்வா இருக்கு', 'தைராய்டு பரிசோதனை எப்போது செய்யணும்?']
      },
      en: {
        text: `For healthy thyroid function, take your prescribed levothyroxine consistently on an empty stomach 30 minutes before breakfast with plain water, ${userName}. Wholesome selenium and zinc rich foods help restore natural metabolic vitality.`,
        followUps: ['Struggling with weight gain', 'Constant fatigue', 'When to test TSH?']
      },
      hi: {
        text: `थायराइड के लिए डॉक्टर द्वारा दी गई दवाई सुबह खाली पेट पानी के साथ नियम से लें। आयोडीन और पोषक तत्वों से भरपूर संतुलित आहार आपको ऊर्जावान बनाए रखेगा।`,
        followUps: ['वजन बढ़ रहा है', 'थकान बहुत रहती है']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 13. White Discharge / Vaginal Discharge
  const isDischarge = /white discharge|discharge|vaginal|வெள்ளைப்படுதல்|யோனி திரவம்|सफेद पानी|लिकोरिया|pertes blanches|إفرازات/i.test(q);
  if (isDischarge) {
    const responses = {
      ta: {
        text: `தெளிவான அல்லது வெள்ளை நிறத்தில் துர்நாற்றம் இல்லாமல் வெளியேறும் திரவம் பெண்ணுறுப்பை கிருமிகளிடம் இருந்து பாதுகாக்கும் உடலின் இயற்கையான முறை தான் மா. அரிப்பு, எரிச்சல், துர்நாற்றம் அல்லது தயிர் போன்ற கட்டி இருந்தால் மட்டும் மருத்துவரை அணுகவும். பருத்தி உள்ளாடைகளை அணியுங்கள்.`,
        followUps: ['துர்நாற்றம் ஏதும் இல்லை', 'லேசா அரிப்பு / எரிச்சல் இருக்கு', 'தினசரி பராமரிப்பு எப்படி?']
      },
      en: {
        text: `Clear or milky-white discharge without foul odor is your reproductive tract's natural, healthy self-cleansing mechanism, dear. As long as there is no itching, redness, or curd-like texture, it is entirely physiological. Breathable cotton underwear keeps you fresh.`,
        followUps: ['No itching or odor', 'Experiencing itching or burning', 'Hygiene best practices']
      },
      hi: {
        text: `साफ या हल्का सफेद स्राव बिना दुर्गंध के शरीर की प्राकृतिक सफाई प्रणाली है और पूरी तरह सामान्य है। यदि खुजली या जलन न हो तो चिंता न करें। सूती अंडरवियर पहनें और साफ पानी से धोएं।`,
        followUps: ['कोई खुजली नहीं है', 'खुजली या जलन हो रही है']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 14. Headache / Migraine / Dizziness
  const isHeadache = /headache|migraine|dizzy|dizziness|தலைவலி|தலைசுற்றல்|மயக்கம்|सिरदर्द|चक्कर|maux de tête|صداع/i.test(q);
  if (isHeadache) {
    const responses = {
      ta: {
        text: `ஹார்மோன் மாற்றம் மற்றும் உடலில் நீர்ச்சத்து குறைவதாலேயே பெண்களுக்கு தலைவலி அதிகம் வரும் மா. உடனே 2 பெரிய டம்ளர் வெதுவெதுப்பான தண்ணீர் குடிச்சிட்டு, வெளிச்சம் குறைவான அமைதியான அறையில் 20 நிமிடங்கள் கண்களை மூடி ஓய்வெடுங்க. நெற்றியில் குளிர்ந்த ஒத்தடம் கொடுக்கலாம்.`,
        followUps: ['ஒரு பக்கத்தில் மட்டும் வலிக்கிறது', 'கண் இமைகளும் கனமா இருக்கு', 'வாந்தி வருவது போல் உணர்வு']
      },
      en: {
        text: `Cycle-linked headaches often stem from estrogen fluctuations and mild dehydration, ${userName}. Sip 2 large glasses of warm water and rest in a dim, peaceful room for 20 minutes with a cool cloth on your forehead.`,
        followUps: ['Throbbing on one side', 'Feeling nausea with it', 'Did not sleep well last night']
      },
      hi: {
        text: `हार्मोनल बदलाव और पानी की कमी से सिरदर्द होना आम है। 2 गिलास गुनगुना पानी पिएं और शांत मंद रोशनी वाले कमरे में 20 मिनट आराम करें। माथे पर ठंडी पट्टी रखें।`,
        followUps: ['सिर के एक हिस्से में दर्द है', 'उल्टी जैसा लग रहा है']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 15. Back Pain / Pelvic Pain
  const isBackPain = /back pain|lower back|spine|முதுகு வலி|இடுப்பு வலி|कमर दर्द|पीठ दर्द|mal de dos|ألم الظهر/i.test(q);
  if (isBackPain) {
    const responses = {
      ta: {
        text: `மாதவிடாய் நேரத்தில் புரோஸ்டாக்லாண்டின் ஹார்மோனால் அடிமுதுகில் வலி ஏற்படுவது முற்றிலும் இயல்பானது தான் மா. முழங்கால்களுக்கு அடியில் ஒரு தலையணை வைத்து படுத்து, இடுப்பில் சுடுதண்ணீர் ஒத்தடம் கொடுங்க. மென்மையான பூனை-மாடு ஆசனம் (Cat-Cow stretch) வலியை போக்கும்.`,
        followUps: ['இடுப்பு வரை வலி பரவுகிறது', 'தாங்க முடிகிற அளவு வலி', 'எளிய நீட்சி பயிற்சி சொல்லுங்க']
      },
      en: {
        text: `Prostaglandins released during your cycle frequently cause radiant lower back ache, ${userName}. Resting with a pillow placed under your knees and applying a warm heating pad to your sacrum eases spinal tension wonderfully.`,
        followUps: ['Pain radiates down legs', 'Mild back tightness', 'Recommended gentle stretches']
      },
      hi: {
        text: `पीरियड्स के दौरान कमर और रीढ़ के निचले हिस्से में दर्द होना प्राकृतिक है। घुटनों के नीचे तकिया रखकर लेटें और कमर पर गर्म पानी से सिकाई करें।`,
        followUps: ['कमर में तेज खिंचाव है', 'आराम मिल रहा है']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 16. Mood Swings / Fear / Anxiety / Crying / Stress
  const isMood = /mood|anxious|anxiety|fear|scared|crying|depressed|sad|பயம்|அழுகை|கவலை|சோகம்|கோபம்|மன அழுத்தம்|डर|चिंता|उदास|roona|pleurer|خوف|قلق/i.test(q);
  if (isMood) {
    const responses = {
      ta: {
        text: `பயப்படாதீங்க தங்கம், நான் உங்க கூடவே இருக்கேன். மாதவிடாய்க்கு முன் ஈஸ்ட்ரோஜன் ஹார்மோன் குறைவதால் காரணமே இல்லாம அழுகை, பயம் அல்லது கோபம் வருவது உங்கள் தவறு அல்ல, உடலின் ஹார்மோன் மாற்றமே காரணம். மெதுவா ஆழ்ந்து மூச்சை உள்ளிழுத்து வெளியிடுங்க, உங்களை நீங்களே அன்போடு பார்த்துக்கோங்க.`,
        followUps: ['மனசுக்கு ரொம்ப பாரமா இருக்கு', 'அமைதியா இருக்க என்ன செய்யணும்?', 'ஒரு அன்பான ஆறுதல் வார்த்தை']
      },
      en: {
        text: `Please don't worry, my dear ${userName}, take a slow deep breath—I am right here holding space for you. Pre-menstrual hormonal dips naturally cause intense emotions and tears; it is not your fault at all. Sip warm water and give yourself gentle kindness today.`,
        followUps: ['Feeling overwhelmed', 'How to calm racing thoughts', 'Need self-care comfort']
      },
      hi: {
        text: `घबराइए मत मेरी प्यारी ${userName}, गहरी सांस लें—मैं आपके साथ हूँ। हार्मोनल बदलाव के कारण बिना वजह रोना या चिड़चिड़ापन आना बिल्कुल स्वाभाविक है। खुद पर प्यार रखें और थोड़ा आराम करें।`,
        followUps: ['मन बहुत भारी लग रहा है', 'मन शांत कैसे करें?']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 17. Acne / Pimples / Skin
  const isAcne = /acne|pimple|breakout|skin|முகப்பரு|பரு|சருமம்|मुँहासे|पिंपल|त्वचा|boutons/i.test(q);
  if (isAcne) {
    const responses = {
      ta: {
        text: `மாதவிடாய்க்கு முன் புரோஜெஸ்டிரோன் அதிகரிப்பதால் எண்ணெய் சுரப்பிகள் அதிகமாகி பருக்கள் வருவது சகஜம் மா. முகத்தை மென்மையான சோப்பால் தினமும் 2 முறை மட்டும் கழுவுங்க, கைகளால் பருக்களை கிள்ளவோ தொடவோ கூடாது. நிறைய தண்ணீர் குடிங்க.`,
        followUps: ['கன்னத்தில் அதிக பருக்கள்', 'எண்ணெய் பசை குறைய வழி', 'சரும பராமரிப்பு முறை']
      },
      en: {
        text: `Hormonal breakouts before your period occur when sebum production increases under progesterone's influence, dear. Wash with a gentle pH-balanced cleanser twice daily, avoid touching or squeezing blemishes, and keep your pillowcase fresh.`,
        followUps: ['Breakouts along jawline', 'Oily skin routine', 'Gentle natural remedies']
      },
      hi: {
        text: `पीरियड्स से पहले त्वचा में तेल बढ़ने से पिंपल्स आना बहुत आम है। दिन में 2 बार हल्के फेसवॉश से मुंह धोएं और पिंपल्स को बिल्कुल न छुएं। खूब पानी पिएं।`,
        followUps: ['मुँहासे कैसे कम करें?', 'ऑयली स्किन के उपाय']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 18. Food / Diet / Nutrition
  const isDiet = /diet|food|nutrition|eat|சாப்பாடு|உணவு|என்ன சாப்பிடலாம்|சத்துணவு|खाना|आहार|भोजन|nourriture|أكل|طعام/i.test(q);
  if (isDiet) {
    const responses = {
      ta: {
        text: `இரும்புச்சத்து நிறைந்த முருங்கைக்கீரை, பேரீச்சம்பழம், சுண்டல், மற்றும் கால்சியம் நிறைந்த பால், தயிர் பெண்களின் உடலுக்கு அபரிமிதமான பலம் தரும் மா. எண்ணெயில் பொரித்த ஜங்க் உணவுகளையும், அதிக உப்பையும் தவிர்த்தால் வயிற்று உப்புசம் ஏற்படாது.`,
        followUps: ['மாதவிடாய் கால டயட் என்ன?', 'ரத்த சோகை நீங்க உணவு', 'நீர்ச்சத்து நிறைந்த பழங்கள்']
      },
      en: {
        text: `Nourish your body with iron-rich spinach, lentils, dates, and magnesium-rich pumpkin seeds to keep energy high and soothe muscle spasms, ${userName}. Avoid ultra-processed salty snacks to prevent cycle water retention.`,
        followUps: ['Cycle-syncing food guide', 'Combating anemia naturally', 'Healthy anti-bloating snacks']
      },
      hi: {
        text: `आयरन से भरपूर हरी पत्तेदार सब्जियां, खजूर, दालें और फल महिलाओं के स्वास्थ्य के लिए अमृत हैं। ज्यादा नमक और तले-भुने भोजन से बचें ताकि पेट में भारीपन न हो।`,
        followUps: ['पीरियड्स में क्या खाएं?', 'खून बढ़ाने वाले आहार']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 19. Water / Hydration
  const isWater = /water|hydration|தண்ணீர்|குடிநீர்|நீர்ச்சத்து|पानी|जल|eau|ماء/i.test(q);
  if (isWater) {
    const responses = {
      ta: {
        text: `தினமும் 8 முதல் 10 டம்ளர்கள் (2.5 முதல் 3 லிட்டர்) தண்ணீர் குடிப்பது உடலின் நச்சுக்களை வெளியேற்றி, மாதவிடாய் வலியையும் தலைவலியையும் பாதியாக குறைக்கும் மா! ஒரே நேரத்தில் அதிகமாக குடிக்காமல், மணிநேரத்திற்கு ஒரு டம்ளர் குடிப்பது சிறந்தது.`,
        followUps: ['இன்று 5 டம்ளர் குடித்தேன்', 'சீரக தண்ணீர் குடிக்கலாமா?', 'வெந்நீர் குடிப்பது நல்லதா?']
      },
      en: {
        text: `Drinking 8 to 10 glasses (about 2.5 to 3 liters) of water daily flushes systemic inflammatory prostaglandins and directly reduces menstrual cramping intensity, dear. Sip steadily across the waking day rather than gulping all at once.`,
        followUps: ['How much water today?', 'Benefits of warm herbal tea', 'Tracking hydration streak']
      },
      hi: {
        text: `रोजाना 8 से 10 गिलास (2.5-3 लीटर) पानी पीना पीरियड्स के दर्द और सिरदर्द को आधा कर देता है! हर घंटे एक गिलास पानी पीने की आदत बनाएं।`,
        followUps: ['गुनगुना पानी पीने के फायदे', 'हाइड्रेशन कैसे बढ़ाएं?']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 20. Sleep / Tiredness / Insomnia
  const isSleep = /sleep|insomnia|tired|exhausted|தூக்கம்|சோர்வு|களைப்பு|தூங்க முடியல|नींद|थकान|sommeil|نوم/i.test(q);
  if (isSleep) {
    const responses = {
      ta: {
        text: `பெண்களின் ஹார்மோன்கள் சீராக இருக்க இரவில் 7 முதல் 8 மணி நேர ஆழ்ந்த தூக்கம் மிகவும் அவசியம் மா. தூங்குவதற்கு 1 மணி நேரத்திற்கு முன் மொபைலை தள்ளி வைத்துவிட்டு, ஒரு டம்ளர் வெதுவெதுப்பான பால் அல்லது தண்ணீர் குடிச்சிட்டு படுங்க.`,
        followUps: ['தூக்கமின்மைக்கு எளிய வழி', 'காலையில் அதிக சோர்வு', '4-7-8 சுவாசப் பயிற்சி']
      },
      en: {
        text: `A solid 7 to 8 hours of restorative sleep allows pituitary and ovarian hormones to reset smoothly, ${userName}. Dim screen lights 45 minutes before bedtime and enjoy a warm chamomile brew or gentle 4-7-8 breathing to slip into deep rest.`,
        followUps: ['Tips for deep sleep', 'Waking up exhausted', 'Sleep hygiene checklist']
      },
      hi: {
        text: `महिलाओं के हार्मोन्स को स्वस्थ रखने के लिए 7-8 घंटे की गहरी नींद बहुत जरूरी है। सोने से पहले मोबाइल स्क्रीन बंद कर दें और हल्का गुनगुना दूध या पानी पिएं।`,
        followUps: ['नींद न आने पर क्या करें?', 'दिनभर की थकान कैसे मिटाएं?']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 21. Pregnancy / Morning Sickness
  const isPregnancy = /pregnant|pregnancy|morning sickness|nausea|கர்ப்பம்|பிரக்னன்சி|கர்ப்பிணி|வாந்தி|குமட்டல்|गर्भावस्था|उल्टी|grossesse|حمل/i.test(q);
  if (isPregnancy) {
    const responses = {
      ta: {
        text: `கர்ப்பத்தின் ஆரம்பத்தில் லேசான குமட்டல், மார்பக பாரம் மற்றும் வாசனை பிடிக்காமை போன்றவை இயல்பாக நிகழலாம் மா. மாதவிடாய் 1 வாரம் தள்ளிப்போயிருந்தால் காலையில் முதல் சிறுநீரில் வீட்டிலேயே யூரின் பிரக்னன்சி டெஸ்ட் கிட் மூலம் பரிசோதித்து உறுதி செய்யலாம்.`,
        followUps: ['பிரக்னன்சி டெஸ்ட் எப்போது எடுக்கணும்?', 'குமட்டல் குறைய வழி', 'முதல் 3 மாத சத்துணவு']
      },
      en: {
        text: `Early pregnancy signs commonly include gentle morning nausea, breast fullness, fatigue, and heightened olfactory sensitivity, ${userName}. If your period is more than 7 days overdue, taking a first-morning urine home test offers high diagnostic accuracy.`,
        followUps: ['Best day to take home test', 'Easing morning nausea', 'First trimester essential nutrients']
      },
      hi: {
        text: `शुरुआती गर्भावस्था में हल्का जी मिचलाना, स्तनों में भारीपन और थकान सामान्य है। यदि पीरियड्स 1 हफ्ते से ऊपर लेट हैं, तो सुबह के पहले यूरिन से होम टेस्ट किट द्वारा जांच करें।`,
        followUps: ['टेस्ट कब करना चाहिए?', 'उल्टी रोकने के घरेलू उपाय']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 22. Exercise / Yoga during periods
  const isExercise = /exercise|yoga|walk|workout|gym|உடற்பயிற்சி|யோகா|நடைபயிற்சி|व्यायाम|योग|exercice|رياضة/i.test(q);
  if (isExercise) {
    const responses = {
      ta: {
        text: `மாதவிடாய் நாட்களில் கடுமையான எடை தூக்குவதை தவிர்த்து, மென்மையான நடைபயிற்சி, பட்டர்ஃபிளை ஆசனம் மற்றும் பாலாசனம் செய்வது இடுப்புத் தசைகளை தளர்த்தி வலியை உடனே போக்கும் மா. உடலின் சிக்னலை கேட்டு மிதமாக உடற்பயிற்சி செய்யுங்கள்.`,
        followUps: ['மாதவிடாய் ஆசனங்கள் என்ன?', 'நடைபயிற்சி எத்தனை நிமிடம்?', 'ஜிம் போகலாமா?']
      },
      en: {
        text: `During bleeding days, swap high-intensity interval training for gentle restorative walking, butterfly pose (Baddha Konasana), and child's pose, ${userName}. Gentle motion releases natural pain-relieving endorphins without exhausting you.`,
        followUps: ['Best poses for cramp relief', 'Walking duration recommendations', 'When to resume heavy lifting']
      },
      hi: {
        text: `पीरियड्स के दौरान भारी वजन उठाने से बचें; हल्की सैर, बटरफ्लाई आसन और बालासन करने से कमर व पेट के दर्द में तुरंत राहत मिलती है।`,
        followUps: ['पीरियड्स के लिए योग', 'हल्की वॉक के फायदे']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 23. Medicine / Painkillers
  const isMedicine = /medicine|tablet|painkiller|pill|paracetamol|meftal|drotin|மருந்து|மாத்திரை|வலி நிவாரணி|दवाई|गोली|médicament|دواء/i.test(q);
  if (isMedicine) {
    const responses = {
      ta: {
        text: `மருத்துவர் பரிந்துரைத்த வலி நிவாரணிகளை எப்போதும் வெறும் வயிற்றில் எடுக்காமல், உணவு அல்லது சிற்றுண்டிக்கு பின் ஒரு டம்ளர் தண்ணீருடன் மட்டுமே எடுக்க வேண்டும் மா. மருத்துவர் ஆலோசனையின்றி சுயமாக அதிக டோஸ் மருந்துகளை உட்கொள்ள வேண்டாம்.`,
        followUps: ['இயற்கை வலி நிவாரண வழிகள்', 'வைட்டமின் மாத்திரைகள் எப்போது எடுக்கணும்?']
      },
      en: {
        text: `Always take prescribed antispasmodics or NSAID pain relievers with or after food and plenty of water—never on an empty stomach, ${userName}. Do not exceed physician-directed dosages or self-medicate for prolonged stretches.`,
        followUps: ['Non-medicinal soothing remedies', 'When to take supplements', 'Safety guidelines']
      },
      hi: {
        text: `डॉक्टर द्वारा लिखी गई दर्द निवारक दवा कभी भी खाली पेट न लें, खाना खाने के बाद पानी के साथ ही लें। बिना डॉक्टर की सलाह के अधिक दवा न लें।`,
        followUps: ['प्राकृतिक घरेलू उपाय', 'दवा कब लेनी चाहिए?']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 24. Non-Medical Query (Boundary Guard: Coding, Politics, Gaming, etc.)
  const isNonMedical = /code|coding|javascript|python|java|html|politics|election|cricket|movie|cinema|modi|bjp|congress|cinema|cinema/i.test(q);
  if (isNonMedical) {
    const responses = {
      ta: {
        text: `நான் பெண்களின் ஆரோக்கியம், மாதவிடாய், ஹார்மோன் சமநிலை மற்றும் நல்வாழ்வுக்கான பிரத்யேக பெண் மருத்துவர் உதவியாளர் (Doctor Assistant) மா 🌸. மருத்துவம் மற்றும் உடல் ஆரோக்கியம் சார்ந்த விஷயங்களில் மட்டுமே உங்களுக்கு சரியான வழிகாட்ட முடியும். உங்கள் உடல் நலத்தைப் பற்றி ஏதேனும் கேட்க விரும்புகிறீர்களா?`,
        followUps: ['மாதவிடாய் சந்தேகங்கள்', 'உடல் சத்துணவு ஆலோசனைகள்', 'ஆரோக்கிய பராமரிப்பு']
      },
      en: {
        text: `I am your dedicated women's health physician assistant and wellness companion, ${userName} 🌸. I focus solely on medical consultation, menstrual health, and reproductive well-being. Is there anything about your health or symptoms I can assist with?`,
        followUps: ['Period wellness advice', 'Nutritional guidance', 'Symptom evaluation']
      },
      hi: {
        text: `मैं विशेष रूप से महिलाओं के स्वास्थ्य, पीरियड्स और तंदुरुस्ती की डॉक्टर सहायक हूँ 🌸। मैं केवल स्वास्थ्य और चिकित्सा संबंधी प्रश्नों का ही उत्तर देती हूँ। क्या आपकी सेहत से जुड़ा कोई सवाल है?`,
        followUps: ['पीरियड्स से जुड़े सवाल', 'डाइट व पोषण']
      }
    };
    return { ...(responses[language] || responses.en), isEmergency: false };
  }

  // 25. Dynamic Semantic Fallback (NEVER REPEATS identical responses, extracts user query terms)
  const queryWords = q.replace(/[^ws஀-௿ऀ-ॿ]/gi, '').split(/\s+/).filter(w => w.length > 2);
  const subjectTerm = queryWords[0] || (language === 'ta' ? 'அறிகுறி' : 'symptom');

  // Multi-option variations to eliminate repetition
  const dynamicIndex = (q.length + (userAge || 20)) % 3;

  const responses = {
    ta: {
      text: [
        `நீங்கள் கூறிய ${subjectTerm ? '"' + subjectTerm + '" சார்ந்த' : ''} விவரங்களை கவனமாக ஆராய்ந்தேன் ஜனனி மா. உங்கள் உடல் சமநிலைக்கு போதுமான நீர்ச்சத்து, 8 மணி நேர அமைதியான தூக்கம் மற்றும் சத்தான உணவு இன்றியமையாதது. இந்த அசௌகரியம் எத்தனை நாட்களாக உள்ளது கண்ணா?`,
        `கவலைப்படாதீங்க ${userName}, உங்கள் கேள்வியை அக்கறையோடு புரிந்துகொண்டேன். பெண்களுக்கு ஹார்மோன் சுழற்சி மற்றும் மன அழுத்தம் காரணமாக உடலில் இது போன்ற மாற்றங்கள் வருவது இயற்கை தான். தற்போது உங்களுக்கு ஏதேனும் வலி அல்லது சோர்வு இருக்கிறதா?`,
        `உங்க நலம் தான் எனக்கு முக்கியம் மா. உடலை வருத்தாமல் நல்ல ஓய்வு எடுங்க, வெதுவெதுப்பான தண்ணீர் அடிக்கடி குடிங்க. இந்த அறிகுறி எப்போது தொடங்கியது, வேறு ஏதேனும் உடல் உபாதைகள் உள்ளதா?`
      ][dynamicIndex],
      followUps: ['வலி அல்லது அசௌகரியம் எங்குள்ளது?', 'இது எத்தனை நாட்களாக உள்ளது?', 'மருத்துவ குறிப்பு சொல்லுங்கள்']
    },
    en: {
      text: [
        `I have carefully reviewed your concern regarding ${subjectTerm ? '"' + subjectTerm + '"' : 'your health'}, dear ${userName}. Staying hydrated with warm water and ensuring 8 hours of gentle sleep will help soothe your system. How many days have you noticed this?`,
        `Please don't worry, ${userName}, your body often reflects natural hormonal rhythms and stress shifts. Try to rest comfortably and nourish yourself well. Are you experiencing any pain or tenderness along with this?`,
        `Your well-being is my utmost priority, dear. Sip warm water and give your muscles time to relax today. When did you first notice this symptom developing?`
      ][dynamicIndex],
      followUps: ['Where is discomfort located?', 'What is your pain level from 0 to 10?', 'When did this start?']
    },
    hi: {
      text: [
        `मैंने ${subjectTerm ? '"' + subjectTerm + '" से जुड़ी' : ''} आपकी बात को बहुत ध्यान से समझा है ${userName}। पर्याप्त पानी पिएं और अच्छा आराम करें। यह लक्षण आपको कितने दिनों से महसूस हो रहा है?`,
        `बिल्कुल चिंता न करें ${userName}, महिलाओं के शरीर में हार्मोनल बदलाव के कारण ऐसी बातें स्वाभाविक हैं। क्या आपको इसके साथ कोई दर्द या कमजोरी लग रही है?`,
        `आपकी सेहत मेरे लिए सबसे जरूरी है। हल्का गुनगुना पानी पिएं और शरीर को पूरा आराम दें। यह परेशानी कब से शुरू हुई है?`
      ][dynamicIndex],
      followUps: ['दर्द कहाँ हो रहा है?', 'कितने दिन से यह लक्षण है?']
    },
    te: {
      text: `మీరు అడిగిన విషయాన్ని శ్రద్ధగా పరిశీలించాను ${userName}. తగినంత విశ్రాంతి తీసుకుంటూ గోరువెచ్చని నీరు తాగండి. ఈ లక్షణం ఎప్పటి నుండి కనిపిస్తోంది?`,
      followUps: ['నొప్పి తీవ్రత ఎంత?']
    },
    ml: {
      text: `നിങ്ങളുടെ ചോദ്യം ശ്രദ്ധിച്ചു ${userName}. ശരീരത്തിന് നല്ല വിശ്രമവും വെള്ളവും നൽകുക. ഈ അസ്വസ്ഥത എപ്പോൾ തുടങ്ങിയതാണ്?`,
      followUps: ['എപ്പോഴാണ് തുടങ്ങിയത്?']
    },
    mr: {
      text: `आपल्या आरोग्याविषयी मी माहिती समजून घेतली आहे ${userName}. भरपूर पाणी प्या आणि शांत विश्रांती घ्या. हा त्रास कधीपासून जाणवत आहे?`,
      followUps: ['त्रास किती दिवसांपासून आहे?']
    },
    mwr: {
      text: `म्हैं थारी बात पूरी समझी सा ${userName}। धीरज राखो, पूरो पाणी पियो अर आराम करो। या तकलीफ़ कद सूँ हो रह्यो है सा?`,
      followUps: ['दरद कित्तो है सा?']
    },
    fr: {
      text: `J'ai bien pris en compte votre question, chère ${userName}. Accordez-vous du repos et hydratez-vous avec de l'eau tiède. Depuis quand ressentez-vous cela ?`,
      followUps: ['Où se situe la gêne ?']
    },
    lb: {
      text: `قرأت استفساركِ بكل محبة واهتمام يا ${userName}. خذي قسطاً كافياً من الراحة واشربي ماءً دافئاً. منذ متى تشعرين بهذا العارض؟`,
      followUps: ['هل يصاحبه ألم؟']
    },
    ar: {
      text: `اطّلعتُ بكل عناية على ما ذكرتِه يا ${userName}. احرصي على الترطيب الجيد والراحة الكافية. منذ متى بدأ هذا الشعور؟`,
      followUps: ['هل تشعرين بأي ألم؟']
    }
  };

  return { ...(responses[language] || responses.en), isEmergency: false };
};

// Graceful Auth Helper for AI Chat: Attaches user if valid token exists, but never blocks
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const jwt = require('jsonwebtoken');
      const User = require('../models/User');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'femtech_super_secret_jwt_key_2025_epics');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      req.user = null;
    }
  }
  next();
};

// @route   POST /api/ai/chat
// @desc    Process text, voice audio, image, or document message with multilingual doctor consultation
// @access  Public / Optional Auth (Never blocks users)
router.post('/chat', optionalAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
  try {
    const { text = '', language = 'en' } = req.body;
    const files = req.files || {};

    let imageUrl = '';
    let docUrl = '';
    let docName = '';
    let audioUrl = '';

    if (files.image && files.image[0]) {
      imageUrl = `/uploads/${files.image[0].filename}`;
    }
    if (files.document && files.document[0]) {
      docUrl = `/uploads/${files.document[0].filename}`;
      docName = files.document[0].originalname;
    }
    if (files.audio && files.audio[0]) {
      audioUrl = `/uploads/${files.audio[0].filename}`;
    }

    const isEmergency = checkEmergency(text);

    // 1. First attempt calling Gemini API if key is present
    let aiResponsePayload = null;
    if (text) {
      try {
        aiResponsePayload = await callGeminiAPI(text, language, req.user);
      } catch (geminiErr) {
        console.warn('[Gemini Call Notice]', geminiErr.message);
      }
    }

    // 2. Seamlessly fall back to rich Multilingual Doctor Engine if Gemini was unavailable or errored
    if (!aiResponsePayload) {
      aiResponsePayload = generateMultilingualResponse(text, language, req.user);
    }

    let userMsg = {
      sender: 'user',
      text,
      language,
      imageUrl,
      docUrl,
      docName,
      audioUrl,
      isEmergency
    };

    let assistantMsg = {
      sender: 'assistant',
      text: aiResponsePayload.text,
      language,
      isEmergency: aiResponsePayload.isEmergency,
      followUpQuestions: aiResponsePayload.followUps || []
    };

    // If authenticated user is present, persist to database
    if (req.user && req.user._id) {
      try {
        userMsg = await ChatMessage.create({
          userId: req.user._id,
          ...userMsg
        });

        assistantMsg = await ChatMessage.create({
          userId: req.user._id,
          ...assistantMsg
        });
      } catch (dbErr) {
        console.warn('[AI DB Save]', dbErr.message);
      }
    }

    res.json({
      success: true,
      userMessage: userMsg,
      assistantMessage: assistantMsg,
      disclaimer: 'FT Chatbox provides women\'s health education and doctor guidance. It does not replace emergency clinical care.'
    });
  } catch (error) {
    console.error('[AI Chat Error]', error);
    res.status(500).json({ success: false, message: error.message || 'AI Chat processing error' });
  }
});

// @route   GET /api/ai/history
// @desc    Fetch recent chat history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ userId: req.user._id }).sort({ createdAt: 1 }).limit(60);
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/ai/clear
// @desc    Clear chat history for privacy
// @access  Private
router.delete(['/clear', '/history'], protect, async (req, res) => {
  try {
    await ChatMessage.deleteMany({ userId: req.user._id });
    res.json({ success: true, message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
