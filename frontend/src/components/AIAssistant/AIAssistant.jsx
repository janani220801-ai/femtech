import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Send,
  Mic,
  Square,
  Pause,
  Play,
  Trash2,
  Paperclip,
  Image as ImageIcon,
  FileText,
  AlertOctagon,
  PhoneCall,
  Globe,
  Bot,
  User,
  Sparkles,
  X,
  Volume2
} from 'lucide-react';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function AIAssistant({ onOpenEmergency }) {
  const { user } = useAuth();
  const { language, changeLanguage } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // File Upload State
  const [attachedImage, setAttachedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [attachedDoc, setAttachedDoc] = useState(null);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);

  // Comprehensive Speech-to-Text Language Locale Map
  const SPEECH_LANG_MAP = {
    ta: 'ta-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
    mr: 'mr-IN',
    bn: 'bn-IN',
    gu: 'gu-IN',
    pa: 'pa-IN',
    ur: 'ur-PK',
    as: 'as-IN',
    or: 'or-IN',
    ne: 'ne-NP',
    sd: 'sd-IN',
    mai: 'hi-IN',
    sat: 'hi-IN',
    ks: 'ur-PK',
    kok: 'mr-IN',
    doi: 'hi-IN',
    brx: 'as-IN',
    mni: 'bn-IN',
    mwr: 'hi-IN',
    bho: 'hi-IN',
    mag: 'hi-IN',
    tcy: 'kn-IN',
    kha: 'en-IN',
    lus: 'en-IN',
    gom: 'mr-IN',
    ps: 'ps-AF',
    prs: 'fa-AF',
    fa: 'fa-IR',
    bal: 'ur-PK',
    skr: 'ur-PK',
    ar: 'ar-SA',
    lb: 'ar-LB',
    arz: 'ar-EG',
    fr: 'fr-FR',
    es: 'es-ES',
    de: 'de-DE',
    ru: 'ru-RU',
    zh: 'zh-CN',
    ja: 'ja-JP',
    ko: 'ko-KR',
    pt: 'pt-BR',
    it: 'it-IT',
    tr: 'tr-TR',
    id: 'id-ID',
    ms: 'ms-MY',
    sw: 'sw-KE',
    en: 'en-US'
  };

  // Voice Recording & Speech Recognition State
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [speechNotice, setSpeechNotice] = useState('');
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const recognitionRef = useRef(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initialGreetings = {
    en: "Hi Janani! 🌸 Did you eat? (சாப்டீங்களா?) How is your body feeling today, dear? Are you experiencing any cramps, pain, or health issues? I'm here for you! 💕",
    ta: "ஹாய் ஜனனி மா! 🌸 சாப்டீங்களா? (Did you eat?) உடம்பு எப்படி இருக்கு கண்ணா? ஏதேனும் வலி, மாதவிடாய் பிரச்சனை அல்லது சோர்வு இருக்கிறதா? உங்களுக்காக நான் எப்போதும் இருக்கிறேன், அன்போடு கேளுங்கள்! 💕",
    hi: "नमस्ते जननी जी! 🌸 क्या आपने खाना खाया? (Did you eat?) आज आपकी तबियत कैसी है? क्या कोई दर्द, ऐंठन या थकान महसूस हो रही है? मैं यहाँ आपके साथ हूँ, प्यार से बताइए! 💕",
    te: "నమస్కారం జననీ గారూ! 🌸 భోజనం చేశారా? (Did you eat?) ఈరోజు మీ ఆరోగ్యం ఎలా ఉంది? ఏమైనా నొప్పి లేదా అలసట ఉందా? మీ కోసం నేను ఎల్లప్పుడూ ఉన్నాను! 💕",
    ml: "നമസ്കാരം ജനനി! 🌸 ആഹാരം കഴിച്ചോ? (Did you eat?) ഇന്ന് ആരോഗ്യം എങ്ങനെയുണ്ട് മോളെ? എന്തെങ്കിലും വേദനയോ അസ്വസ്ഥതയോ ഉണ്ടോ? ഞാൻ കൂടെയുണ്ട്! 💕",
    mr: "नमस्कार जननी! 🌸 जेवण झाले का? (Did you eat?) आज तब्येत कशी आहे? काही वेदना किंवा त्रास होत आहे का? मी नेहमी सोबत आहे! 💕",
    mwr: "खम्मा घणी जननी जी! 🌸 जीम लिया कांई? (Did you eat?) आज थारी तबीयत कियां है? कोई दरद या तकलीफ़ है कांई? म्हैं थारे सागे हूँ! 💕",
    fr: "Bonjour Janani ! 🌸 Avez-vous mangé ? (Did you eat?) Comment vous sentez-vous aujourd'hui ? Avez-vous des douleurs ou de la fatigue ? Je suis là pour vous ! 💕",
    lb: "مرحباً يا جناني! 🌸 هل أكلتِ شيئاً اليوم؟ (Did you eat?) كيف صحتكِ وعافيتكِ الآن؟ هل تشعرين بأي وجع أو تعب؟ أنا هنا بجانبكِ دائماً! 💕",
    ar: "أهلاً بكِ جناني! 🌸 هل تناولتِ طعامكِ اليوم؟ (Did you eat?) كيف تشعرين وصحتكِ الآن؟ هل هناك أي ألم أو تعب؟ أنا دائماً هنا لرعايتكِ بكل حب! 💕"
  };

  const initialFollowUps = {
    ta: ['சாப்டேன் டாக்டர்! ❤️', 'இன்னும் சாப்பிடல', 'லேசா வயிற்று வலி இருக்கு', 'மாதவிடாய் தள்ளிப்போயுள்ளது', 'சத்துணவு ஆலோசனை வேணும்'],
    en: ['Yes, I ate! ❤️', 'Not yet', 'Mild period cramps', 'Period delayed', 'Diet & nutrition advice'],
    hi: ['हाँ, खाना खा लिया! ❤️', 'अभी नहीं खाया', 'पेट में दर्द है', 'पीरियड्स लेट हैं', 'डाइट सलाह चाहिए'],
    te: ['అవును, భోజనం చేశాను! ❤️', 'ఇంకా తినలేదు', 'కడుపు నొప్పిగా ఉంది', 'పీరియడ్స్ ఆలస్యం'],
    ml: ['കഴിച്ചു ഡോക്ടർ! ❤️', 'കഴിച്ചില്ല', 'വയറുവേദനയുണ്ട്', 'ആർത്തവം വൈകി'],
    mr: ['हो, जेवण झाले! ❤️', 'नाही अजून', 'पोटात दुखत आहे', 'मासिक पाळी उशिरा'],
    mwr: ['हाँ, जीम लियो! ❤️', 'कोनी जीम्यो', 'पेट में दरद है'],
    fr: ['Oui, j\'ai mangé ! ❤️', 'Pas encore', 'Douleurs de règles', 'Retard de règles'],
    lb: ['نعم أكلت، شكراً لكِ! ❤️', 'لسه ما أكلت', 'عندي مغص الدورة', 'تأخرت دورتي'],
    ar: ['نعم تناولت طعامي! ❤️', 'لم آكل بعد', 'أعاني من مغص الدورة', 'تأخر موعد الدورة']
  };

  const handleClearChat = async () => {
    try {
      await api.delete('/ai/clear');
    } catch (e) {
      // ignore
    }
    setMessages([
      {
        sender: 'assistant',
        text: initialGreetings[language] || initialGreetings.en,
        language,
        followUpQuestions: initialFollowUps[language] || initialFollowUps.en
      }
    ]);
  };

  // Load chat history or initialize with greeting
  useEffect(() => {
    const loadChat = async () => {
      try {
        const res = await api.get('/ai/history');
        if (res.success && res.messages?.length > 0) {
          setMessages(res.messages);
        } else {
          setMessages([
            {
              sender: 'assistant',
              text: initialGreetings[language] || initialGreetings.en,
              language,
              followUpQuestions: initialFollowUps[language] || initialFollowUps.en
            }
          ]);
        }
      } catch (err) {
        setMessages([
          {
            sender: 'assistant',
            text: initialGreetings[language] || initialGreetings.en,
            language,
            followUpQuestions: initialFollowUps[language] || initialFollowUps.en
          }
        ]);
      }
    };

    loadChat();
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Voice Recording Handlers with Real-time Speech-to-Text
  const startRecording = async () => {
    setSpeechNotice('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition && (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
      setSpeechNotice(language === 'ta' ? 'குரல் உள்ளீடு உங்கள் பிரவுசரில் ஆதரிக்கப்படவில்லை.' : 'Voice input not supported in this browser.');
      setTimeout(() => setSpeechNotice(''), 4000);
      return;
    }

    try {
      // 1. Start Web Speech Recognition
      if (SpeechRecognition) {
        try {
          if (recognitionRef.current) {
            recognitionRef.current.abort();
          }
        } catch (e) {}

        const recognition = new SpeechRecognition();
        const targetLocale = SPEECH_LANG_MAP[language] || 'en-US';
        recognition.lang = targetLocale;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsRecording(true);
          setIsPaused(false);
          setLiveTranscript('');
          setRecordingSeconds(0);
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = setInterval(() => {
            setRecordingSeconds((prev) => prev + 1);
          }, 1000);
        };

        recognition.onresult = (event) => {
          let interim = '';
          let finalStr = '';
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalStr += event.results[i][0].transcript + ' ';
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          const combined = (finalStr + interim).trim();
          setLiveTranscript(combined);
          if (combined) {
            setInputText(combined);
          }
        };

        recognition.onerror = (event) => {
          console.warn('Speech recognition notice:', event.error);
          if (event.error === 'not-allowed') {
            setSpeechNotice(language === 'ta' ? 'மைக்ரோஃபோன் அனுமதி தேவை (Microphone permission needed).' : 'Please grant microphone permissions.');
          }
        };

        recognition.onend = () => {
          // If stopped intentionally, recording state is reset in stopRecording
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      // 2. Start MediaRecorder for audio playback preview if accessible
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorderRef.current = new MediaRecorder(stream);
          audioChunksRef.current = [];

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };

          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            setRecordedAudioBlob(audioBlob);
            stream.getTracks().forEach((track) => track.stop());
          };

          mediaRecorderRef.current.start();
          if (!SpeechRecognition) {
            setIsRecording(true);
            setIsPaused(false);
            setRecordingSeconds(0);
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
              setRecordingSeconds((prev) => prev + 1);
            }, 1000);
          }
        } catch (mediaErr) {
          console.warn('MediaRecorder audio stream fallback:', mediaErr.message);
        }
      }
    } catch (err) {
      console.error('Error starting speech:', err);
      setSpeechNotice(language === 'ta' ? 'மைக்ரோஃபோன் அனுமதி தேவை.' : 'Microphone access required.');
      setTimeout(() => setSpeechNotice(''), 4000);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
    }
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
    }
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
    setIsPaused(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const deleteRecording = () => {
    stopRecording();
    setRecordedAudioBlob(null);
    setRecordingSeconds(0);
    setLiveTranscript('');
  };

  // Image & Document Handlers
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDocSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedDoc(file);
    }
  };

  const removeAttachments = () => {
    setAttachedImage(null);
    setImagePreview(null);
    setAttachedDoc(null);
    setRecordedAudioBlob(null);
  };

  // Send Message
  // In-Browser Resilient 10-Language Doctor Assistant Generator
  const getLocalAIResponse = (query, lang) => {
    const q = (query || '').toLowerCase().trim();
    const userName = user?.name ? user.name.split(' ')[0] : (lang === 'ta' ? 'அன்பரே' : 'there');

    // Emergency Detection
    const emergencyList = [
      'severe breathing', 'chest pain', 'heavy bleeding', 'seizure', 'unbearable pain',
      'மூச்சுத்திணறல்', 'மார்பு வலி', 'அதிக இரத்தப்போக்கு', 'வலிப்பு',
      'सांस लेने में तकलीफ', 'सीने में दर्द', 'अत्यधिक रक्तस्राव',
      'శ్వాస తీసుకోవడంలో ఇబ్బంది', 'గుండె నొప్పి', 'రక్తస్రావం'
    ];
    if (emergencyList.some((kw) => q.includes(kw.toLowerCase()))) {
      const emergencyResponses = {
        en: {
          text: `⚠️ **URGENT MEDICAL PROTOCOL**\n\nDear ${userName}, the symptoms you described require immediate medical attention. Please call 108 / 112 immediately or visit the nearest hospital emergency room.`,
          followUps: ['Have you called 108 / 112?', 'Is someone with you right now?']
        },
        ta: {
          text: `⚠️ **உடனடி மருத்துவ உதவி தேவை**\n\nஅன்புள்ள ${userName}, நீங்கள் கூறிய அறிகுறிகளுக்கு உடனடியாக அவசர மருத்துவ சிகிச்சை தேவைப்படலாம். தயங்காமல் உடனே **108 / 112** அவசர மருத்துவ எண்ணை அழைக்கவும்.`,
          followUps: ['அவசர ஊர்தியை அழைத்துவிட்டீர்களா?', 'உங்களுடன் இப்போது யாராவது இருக்கிறார்களா?']
        },
        hi: {
          text: `⚠️ **तत्काल चिकित्सा सहायता आवश्यक है**\n\nप्रिय ${userName}, कृपया तुरंत 108 / 112 पर कॉल करें या नजदीकी अस्पताल जाएं।`,
          followUps: ['क्या आपने 108 पर कॉल किया?']
        },
        te: {
          text: `⚠️ **తక్షణ అత్యవసర వైద్య సహాయం అవసరం**\n\nప్రియమైన ${userName}, దయచేసి వెంటనే 108 / 112 కు కాల్ చేయండి.`,
          followUps: ['108 కి కాల్ చేశారా?']
        }
      };
      return { ...(emergencyResponses[lang] || emergencyResponses.en), isEmergency: true };
    }

    // "Did you eat?" Question from user
    const isDidYouEat = /சாப்டியா|சாப்பிட்டியா|சாப்டிங்களா|சாப்பிட்டீர்களா|did you eat|did u eat|have you eaten|have u eaten|खाना खाया|जीम लियो कांई|tu as mangé|هل أكلت|هل تناولت/i.test(q);
    if (isDidYouEat) {
      const responses = {
        ta: {
          text: `நான் ஒரு AI மருத்துவ உதவியாளர் கண்ணா, ஆனா நீங்க என்மேல வச்சிருக்கிற அக்கறை என் மனசை ரொம்ப நெகிழ வைக்குது! ❤️ நீங்க சரியான நேரத்துக்கு சாப்பிட்டீங்களா ஜனனி மா? சுடச்சுட சத்தான உணவும், நிறைய தண்ணீரும் எடுத்துக்கோங்க. இன்னைக்கு உங்க உடம்பு ஆரோக்கியமா இருக்கா?`,
          followUps: ['சாப்டேன் டாக்டர்! ❤️', 'இன்னும் சாப்பிடல', 'லேசா வயிற்று வலி இருக்கு']
        },
        en: {
          text: `I'm an AI doctor assistant dear, but your sweet care touches my heart! ❤️ Did YOU eat nutritious food on time today, ${userName}? Please make sure to eat well and stay hydrated. How is your body feeling right now?`,
          followUps: ['Yes, I ate! ❤️', 'Not yet', 'Mild pain today']
        },
        hi: {
          text: `मैं एक AI डॉक्टर सहेली हूँ, लेकिन आपकी यह प्यार भरी चिंता देखकर मेरा दिल भर आया! ❤️ प्रिय ${userName}, क्या आपने समय पर अच्छा पौष्टिक खाना खाया? खूब सारा पानी पिएं। आज आपकी तबियत कैसी है?`,
          followUps: ['हाँ, खाना खा लिया! ❤️', 'अभी नहीं खाया', 'हल्का दर्द है']
        }
      };
      return { ...(responses[lang] || responses.en), isEmergency: false };
    }

    // User confirming "I ate"
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
      return { ...(responses[lang] || responses.en), isEmergency: false };
    }

    // User saying "Haven't eaten yet"
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
        }
      };
      return { ...(responses[lang] || responses.en), isEmergency: false };
    }

    // Greetings
    const isGreeting = /^(hi|hello|hey|hai|vanakkam|வணக்கம்|ஹலோ|ஹாய்|நலம்|नमस्ते|హలో|నమస్కారం|നമസ്കാരം|नमस्कार|खम्मा|bonjour|marhaba|مرحبا|سلام)/i.test(q) ||
      ['hi', 'hello', 'hey', 'vanakkam', 'வணக்கம்', 'ஹலோ', 'ஹாய்', 'namaste', 'नमस्ते'].includes(q);

    if (isGreeting) {
      const responses = {
        en: {
          text: `Hi ${userName}! 🌸 Did you eat? How is your body feeling today, dear? How is your day going? Do you have any cramps, fatigue, or anything on your mind? Talk to me just like your loving doctor & close friend! 💕`,
          followUps: ['Yes, I ate! ❤️', 'Not yet', 'Mild period cramps', 'Period delayed', 'Diet advice']
        },
        ta: {
          text: `ஹாய் ${userName}! 🌸 சாப்டீங்களா? (Did you eat?) உடம்பு எப்படி இருக்கு கண்ணா? இன்னைக்கு நாள் உங்களுக்கு எப்படி போகுது? ஏதாச்சும் வலி, மாதவிடாய் சோர்வு அல்லது மனசுல கவலை இருக்கா? என்கிட்ட ஒரு அன்பான தோழியா, அக்கறையான டாக்டரா தயங்காம சொல்லுங்க! 💕`,
          followUps: ['சாப்டேன் டாக்டர்! ❤️', 'இன்னும் சாப்பிடல', 'லேசா வயிற்று வலி இருக்கு', 'மாதவிடாய் தள்ளிப்போயுள்ளது']
        },
        hi: {
          text: `नमस्ते ${userName}! 🌸 क्या आपने खाना खाया? (Did you eat?) आज आपकी तबियत कैसी है? क्या कोई दर्द, ऐंठन या थकान है? मुझसे अपनी सहेली और डॉक्टर की तरह खुलकर बात करें! 💕`,
          followUps: ['हाँ, खाना खा लिया! ❤️', 'अभी नहीं खाया', 'पेट में हल्का दर्द है', 'डाइट सलाह चाहिए']
        },
        te: {
          text: `నమస్కారం ${userName}! 🌸 అన్నం తిన్నారా? (Did you eat?) ఈరోజు మీ ఆరోగ్యం ఎలా ఉంది? ఏమైనా నొప్పి లేదా ఆందోళన ఉందా? మీ ప్రాణ స్నేహితురాలిగా నాతో మాట్లాడండి! 💕`,
          followUps: ['అవును, తిన్నాను! ❤️', 'కడుపులో కాస్త నొప్పిగా ఉంది']
        },
        ml: {
          text: `നമസ്കാരം ${userName}! 🌸 ഭക്ഷണം കഴിച്ചോ? (Did you eat?) ഇന്ന് നിങ്ങളുടെ ആരോഗ്യം എങ്ങനെയുണ്ട്? എന്തെങ്കിലും വേദനയോ ക്ഷീണമോ ഉണ്ടോ? സംസാരിക്കൂ! 💕`,
          followUps: ['അതെ, കഴിച്ചു! ❤️', 'ചെറിയ വയറുവேദനയുണ്ട്']
        },
        mr: {
          text: `नमस्कार ${userName}! 🌸 जेवलात का? (Did you eat?) आज तुमची तब्येत कशी आहे? काही त्रास किंवा वेदना होत आहे का? बोलू शकता! 💕`,
          followUps: ['हो, जेवण झाले! ❤️', 'पोटात हलके दुखत आहे']
        },
        mwr: {
          text: `खम्मा घणी ${userName}! 🌸 जीम लिया कांई? (Did you eat?) आज थारी तबीयत कियां है सा? कोई दरद या तकलीफ़ है कांई? सागे हूँ! 💕`,
          followUps: ['हाँ, जीम लियो सा! ❤️', 'पेट में हलको दरद है']
        },
        fr: {
          text: `Bonjour ${userName} ! 🌸 As-tu bien mangé ? (Did you eat?) Comment te sens-tu aujourd'hui ? As-tu des douleurs ou de la fatigue ? Je suis là ! 💕`,
          followUps: ['Oui, j\'ai mangé ! ❤️', 'J\'ai de légères crampes']
        },
        lb: {
          text: `مرحباً ${userName}! 🌸 أكلتِ شي؟ (Did you eat?) كيف صحتك اليوم يا قمر؟ هل تشعرين بأي وجع أو تعب؟ احكي معي براحة! 💕`,
          followUps: ['نعم أكلت حبيبتي! ❤️', 'عندي مغص خفيف']
        },
        ar: {
          text: `أهلاً بكِ ${userName}! 🌸 هل تناولتِ طعامكِ؟ (Did you eat?) كيف تشعرين اليوم يا عزيزتي؟ هل تعانين من أي ألم أو تعب؟ تحدّثي معي دائماً! 💕`,
          followUps: ['نعم تناولت طعامي! ❤️', 'أشعر بتقلصات خفيفة']
        }
      };
      return { ...(responses[lang] || responses.en), isEmergency: false };
    }

    // Fear / Panic / Anxiety
    const isFear = q.includes('பய') || q.includes('பயமா') || q.includes('பயந்து') || q.includes('பதற்ற') || q.includes('அச்சம்') ||
      q.includes('scared') || q.includes('fear') || q.includes('anxious') || q.includes('panic') || q.includes('crying') || q.includes('afraid') ||
      q.includes('डर') || q.includes('घबरा') || q.includes('चिंता') ||
      q.includes('భయం') || q.includes('ఆందోళన') ||
      q.includes('പേടി') || q.includes('घाबर') || q.includes('भीती') ||
      q.includes('peur') || q.includes('خوف') || q.includes('خايف');

    if (isFear) {
      const responses = {
        en: {
          text: `Please don't worry ${userName}, take a slow deep breath—I am right here with you. Try to relax your muscles and sip a little warm water. Could you tell me what is worrying you or where it hurts most?`,
          followUps: ['What is your discomfort level from 0 to 10?', 'When did you start feeling this way?']
        },
        ta: {
          text: `பயப்படாதீங்க ${userName}, ரிலாக்ஸா இருங்க. மெதுவா ஆழ்ந்து மூச்சு விடுங்க, நான் உங்க கூடவே இருக்கேன். பதற்றப்பட வேண்டாம். உங்களுக்கு வலி எப்போது தொடங்கியது, இப்போது எங்கு வலிக்கிறது என்று சொல்லுங்கள்?`,
          followUps: ['வலியின் அளவு 0 முதல் 10 வரை எவ்வளவு?', 'வலி அடிவயிற்றிலா அல்லது உடலின் வேறு பகுதியிலா?']
        },
        hi: {
          text: `घबराइए मत ${userName}, शांत होकर गहरी सांस लें—मैं आपके साथ हूँ। चिंता करने की बिल्कुल जरूरत नहीं है। कृपया बताएं कि आपको क्या परेशानी हो रही है और दर्द कहाँ है?`,
          followUps: ['दर्द का स्तर 0 से 10 के बीच कितना है?']
        },
        te: {
          text: `భయపడవద్దు ${userName}, ప్రశాంతంగా దీర్ఘ శ్వాస తీసుకోండి—నేను మీకు తోడుగా ఉన్నాను. నొప్పి ఎప్పుడు మొదలైంది, ఎక్కడ ఎక్కువగా ఉంది?`,
          followUps: ['నొప్పి తీవ్రత ఎంత ఉంది?']
        },
        ml: {
          text: `പേടിക്കേണ്ടതില്ല ${userName}, ദീർഘമായി ശ്വാസമെടുത്ത് റിലാക്സ് ചെയ്യൂ—ഞാൻ കൂടെയുണ്ട്. വിഷമിക്കേണ്ടതില്ല, എന്താണ് അസ്വസ്ഥതയെന്ന് പറയൂ.`,
          followUps: ['വേദന എവിടെയാണ് അനുഭവപ്പെടുന്നത്?']
        },
        mr: {
          text: `काळजी करू नका ${userName}, दीर्घ श्वास घ्या आणि शांत राहा—मी तुमच्या सोबत आहे. नक्की काय त्रास होत आहे आणि कुठे दुखत आहे?`,
          followUps: ['त्रास कधीपासून सुरू झाला?']
        },
        mwr: {
          text: `डरो मत ${userName}, धीरज राखो अर लम्बी सांस लो—म्हैं थारे सागे हूँ। दरद कद सूँ शुरू होयो अर कठे हो रह्यो है?`,
          followUps: ['दरद कित्तो है?']
        },
        fr: {
          text: `Ne vous inquiétez pas ${userName}, respirez profondément et détendez-vous—je suis avec vous. Où ressentez-vous la douleur ou l'inconfort ?`,
          followUps: ['Quand cette gêne a-t-elle commencé ?']
        },
        lb: {
          text: `لا تقلقي ${userName}، خذي نفساً عميقاً واسترخي—أنا معكِ خطوة بخطوة. متى بدأ هذا الألم وأين يتركز تحديداً؟`,
          followUps: ['كيف تشعرين الآن؟']
        },
        ar: {
          text: `لا تقلقي أبداً ${userName}، خذي نفساً عميقاً واسترخي—أنا بجانبكِ. ما الذي يقلقكِ تحديداً وأين تشعرين بالألم؟`,
          followUps: ['كم درجة الألم من 0 إلى 10؟']
        }
      };
      return { ...(responses[lang] || responses.en), isEmergency: false };
    }

    // Headache / Migraine / Dizziness / Fatigue
    const isHeadache = q.includes('headache') || q.includes('migraine') || q.includes('dizziness') || q.includes('dizzy') || q.includes('fatigue') || q.includes('tired') ||
      q.includes('தலைவலி') || q.includes('தலைசுற்றல்') || q.includes('மயக்கம்') || q.includes('சோர்வு') ||
      q.includes('सिरदर्द') || q.includes('चक्कर') || q.includes('थकान') ||
      q.includes('తలనొప్పి') || q.includes('తలతిరగడం') || q.includes('నీరసం') ||
      q.includes('തലവേദന') || q.includes('തലകറക്കം') || q.includes('ക്ഷീണം') ||
      q.includes('डोकेदुखी') || q.includes('माथा दरद') ||
      q.includes('maux de tête') || q.includes('صداع');

    if (isHeadache) {
      const responses = {
        en: {
          text: `Cycle-related headaches and fatigue often stem from hormonal shifts and mild dehydration. Drink 2 large glasses of warm water and rest in a cool, quiet, dim room for 20 minutes. Is the headache throbbing on one side or all over?`,
          followUps: ['Is the pain on one side or both?', 'Did you get at least 7 hours of sleep last night?']
        },
        ta: {
          text: `தலைவலி மற்றும் சோர்விற்கு உடனே 2 டம்ளர் வெதுவெதுப்பான தண்ணீர் குடித்துவிட்டு, வெளிச்சம் குறைந்த அமைதியான அறையில் 20 நிமிடங்கள் கண்களை மூடி ஓய்வெடுங்கள். நெற்றியில் குளிர்ந்த ஒத்தடம் கொடுக்கலாம். தலைவலி ஒரு பக்கத்திலா அல்லது நெற்றி முழுவதும் உள்ளதா?`,
          followUps: ['தலைவலி ஒரு பக்கத்திலா அல்லது முழுவதுமா?', 'நேற்று இரவு போதுமான தூக்கம் கிடைத்ததா?']
        },
        hi: {
          text: `सिरदर्द और थकान के लिए 2 गिलास गुनगुना पानी पिएं और शांत व मंद रोशनी वाले कमरे में 20 मिनट आराम करें। माथे पर ठंडी पट्टी रखें। क्या सिरदर्द एक तरफ है या पूरे सिर में?`,
          followUps: ['क्या आपको उल्टी जैसा महसूस हो रहा है?']
        },
        te: {
          text: `తలనొప్పి మరియు నీరసానికి వెంటనే రెండు గ్లాసుల గోరువెచ్చని నీరు తాగి, ప్రశాంతమైన గదిలో విశ్రాంతి తీసుకోండి. నుదిటిపై చల్లని గుడ్డతో కాపడం పెట్టండి. నొప్పి ఎక్కడ ఉంది?`,
          followUps: ['నిద్ర సరిగ్గా పోయారా?']
        },
        ml: {
          text: `തലവേദനയ്ക്ക് 2 ഗ്ലാസ് ചൂടുവെള്ളം കുടിച്ച് ശാന്തമായ മുറിയിൽ വിശ്രമിക്കുക. നെറ്റിയിൽ തണുത്ത തുണി വെക്കാം. തലവേദന ഒരു വശത്താണോ അതോ മുഴുവനുമാണോ?`,
          followUps: ['ഉറക്കം ആവശ്യത്തിന് ലഭിച്ചോ?']
        },
        mr: {
          text: `डोकेदुखीसाठी 2 ग्लास कोमट पाणी प्या आणि शांत खोलीत विश्रांती घ्या. कपाळावर थंड पट्टी ठेवा. डोकेदुखी एका बाजूला आहे की सर्वत्र?`,
          followUps: ['डोकेदुखी तीव्र आहे का?']
        },
        mwr: {
          text: `माथा दरद खातर 2 गिलास तातो पाणी पियो अर धीमे उजास वाळे कमरा मांय आराम करो। दरद एक पासे है या पूरे माथे मांय?`,
          followUps: ['रात नै नींद पूरी आई कांई?']
        },
        fr: {
          text: `Pour les maux de tête ou la fatigue, buvez deux grands verres d'eau et reposez-vous 20 minutes dans une pièce sombre. La douleur est-elle d'un seul côté ou généralisée ?`,
          followUps: ['Avez-vous bien dormi la nuit dernière ?']
        },
        lb: {
          text: `للصداع والإرهاق، اشربي كوبين من الماء الدافئ واسترخي في غرفة مظلمة وهادئة. هل الصداع نصفي أم يشمل الرأس كله؟`,
          followUps: ['هل تشعرين بغثيان مع الصداع؟']
        },
        ar: {
          text: `للصداع والإجهاد، اشربي كوبين من الماء الدافئ واسترخي في غرفة هادئة ومظلمة لمدة 20 دقيقة. هل الألم في جانب واحد أم في الرأس بأكمله؟`,
          followUps: ['هل أخذتِ قسطاً كافياً من النوم؟']
        }
      };
      return { ...(responses[lang] || responses.en), isEmergency: false };
    }

    // Period Cramps / Pelvic Pain
    const isCramps = q.includes('cramp') || q.includes('period pain') || q.includes('dysmenorrhea') || q.includes('pelvic') || q.includes('stomach') ||
      q.includes('வயிற்று வலி') || q.includes('அடிவயிறு') || q.includes('மாதவிடாய் வலி') || q.includes('தசைப்பிடிப்பு') || q.includes('வலி') ||
      q.includes('पेट दर्द') || q.includes('कमर दर्द') || q.includes('ऐंठन') || q.includes('दर्द') ||
      q.includes('కడుపు నొప్పి') || q.includes('నడుము నొప్పి') || q.includes('నొప్పి') ||
      q.includes('വയറുവേദന') || q.includes('ആർത്തവ വേദന') || q.includes('വേദന') ||
      q.includes('पोटदुखी') || q.includes('कंबरदुखी') || q.includes('वेदना') ||
      q.includes('पेट दरद') || q.includes('दरद') ||
      q.includes('crampes') || q.includes('règles') ||
      q.includes('مغص') || q.includes('ألم البطن') || q.includes('تقلصات') || q.includes('وجع');

    if (isCramps) {
      const responses = {
        en: {
          text: `For menstrual cramps, apply a warm heating pad to your lower abdomen and sip warm ginger or chamomile tea. Rest in a curled fetal position to ease uterine contractions. What is your pain score on a scale of 0 to 10?`,
          followUps: ['Is the cramp in your lower belly or lower back?', 'Did your period start today or earlier?']
        },
        ta: {
          text: `மாதவிடாய் வயிற்று வலியை குறைக்க அடிவயிற்றில் வெந்நீர் ஒத்தடம் (Hot water bag) வையுங்கள், வெதுவெதுப்பான இஞ்சி டீ அல்லது சுடுதண்ணீர் குடியுங்கள். உடலை வளைக்காமல் படுத்து நல்ல ஓய்வு எடுங்கள். வலி தாங்க முடியாத அளவு அதிகமாக உள்ளதா?`,
          followUps: ['வலி அடிவயிற்றிலா அல்லது இடுப்பிலா?', 'வலியின் அளவு 0 முதல் 10 வரை எவ்வளவு?']
        },
        hi: {
          text: `पीरियड्स के दर्द से राहत के लिए पेट के निचले हिस्से पर गर्म पानी की सिकाई करें और गुनगुना अदरक का पानी पिएं। शरीर को पूरा आराम दें। क्या दर्द बहुत तेज है?`,
          followUps: ['दर्द पेट में है या कमर में?', 'दर्द का स्तर 0-10 में कितना है?']
        },
        te: {
          text: `పీరియడ్స్ కడుపు నొప్పికి హాట్ వాటర్ బ్యాగ్‌తో కాపడం పెట్టండి మరియు గోరువెచ్చని నీరు తాగండి. తగినంత విశ్రాంతి తీసుకోండి. నొప్పి తీవ్రత ఎంత ఉంది?`,
          followUps: ['నొప్పి నడుములో కూడా ఉందా?']
        },
        ml: {
          text: `ആർത്തവ വേദനയ്ക്ക് അടിവയറ്റിൽ ചൂടുപിടിക്കുകയും ചൂടുവെള്ളം കുടിക്കുകയും ചെയ്യുക. നന്നായി വിശ്രമിക്കുക. വേദനയുടെ തീവ്രത എത്രത്തോളമുണ്ട്?`,
          followUps: ['വേദന എപ്പോഴാണ് തുടങ്ങിയത്?']
        },
        mr: {
          text: `मासिक पाळीच्या पोटदुखीसाठी पोटावर गरम पाण्याची पिशवी ठेवा आणि कोमट पाणी प्या. विश्रांती घ्या. वेदना किती तीव्र आहेत?`,
          followUps: ['वेदना पाठीतही होत आहेत का?']
        },
        mwr: {
          text: `माहवारी रा दरद खातर पेट माथे ऊनी सिकाई करो अर तातो पाणी पियो। आराम करो। दरद घणो बेसी है कांई?`,
          followUps: ['दरद कमर मांय भी है कांई?']
        },
        fr: {
          text: `Pour soulager les crampes menstruelles, appliquez une bouillotte tiède sur le bas-ventre et buvez une tisane chaude. Évaluez-vous votre douleur entre 0 et 10 ?`,
          followUps: ['La douleur irradie-t-elle dans le dos ?']
        },
        lb: {
          text: `لتخفيف مغص الدورة، ضعي كمادات دافئة على أسفل البطن واشربي مغلي الزنجبيل أو الماء الدافئ. كيف تقيّمين شدة الألم من 0 إلى 10؟`,
          followUps: ['هل بدأ الطمث اليوم؟']
        },
        ar: {
          text: `لتخفيف آلام وتقلصات الدورة الشهرية، ضعي قربة ماء دافئ على أسفل البطن وتناولي مشروباً دافئاً كالزنجبيل. كم درجة الألم من 0 إلى 10؟`,
          followUps: ['هل الألم في أسفل البطن أم الظهر؟']
        }
      };
      return { ...(responses[lang] || responses.en), isEmergency: false };
    }

    // Default 10-Language Consultation Fallback
    const defaults = {
      en: {
        text: `I have noted your question carefully. Please ensure good hydration (8-10 glasses of water) and restful sleep today. How many days have you noticed this symptom, and are you having any pain?`,
        followUps: ['Where is your discomfort located?', 'What is your pain level from 0 to 10?', 'When did this start?']
      },
      ta: {
        text: `உங்கள் செய்தியை கவனமாகப் பார்த்தேன். உடலுக்குத் தேவையான நீர்ச்சத்தும் (8-10 டம்ளர் தண்ணீர்) போதிய ஓய்வும் எடுத்துக் கொள்ளுங்கள். இந்த அறிகுறிகள் எத்தனை நாட்களாக உள்ளன, வலி ஏதேனும் உள்ளதா என்று சொல்லுங்கள்?`,
        followUps: ['உங்களுக்கு வலி அல்லது அசௌகரியம் எங்குள்ளது?', 'வலியின் அளவு 0 முதல் 10 வரை எவ்வளவு?', 'இந்த அறிகுறி எப்போது தொடங்கியது?']
      },
      hi: {
        text: `मैंने आपकी बात को ध्यान से समझा है। पर्याप्त पानी पिएं और अच्छा आराम करें। यह लक्षण कितने दिनों से है और क्या कोई दर्द भी हो रहा है?`,
        followUps: ['दर्द कहाँ हो रहा है?', 'दर्द का स्तर कितना है?']
      },
      te: {
        text: `మీ ఆరోగ్య వివరాలను పరిశీలించాను. పుష్కలంగా నీరు తాగి విశ్రాంతి తీసుకోండి. ఈ లక్షణాలు ఎన్ని రోజుల నుండి ఉన్నాయి, ఏదైనా నొప్పి ఉందా?`,
        followUps: ['బాధ ఏ భాగంలో ఉంది?', 'నొప్పి తీవ్రత ఎంత?']
      },
      ml: {
        text: `നിങ്ങളുടെ വിവരങ്ങൾ ശ്രദ്ധിച്ചു. ധാരാളം വെള്ളം കുടിക്കുകയും വിശ്രമിക്കുകയും ചെയ്യുക. ഈ ലക്ഷണങ്ങൾ എത്ര ദിവസമായി കാണപ്പെടുന്നു, വേദനയുണ്ടോ?`,
        followUps: ['വേദന എവിടെയാണ്?', 'എപ്പോഴാണ് തുടങ്ങിയത്?']
      },
      mr: {
        text: `आपल्या आरोग्याची माहिती मी पाहिली. भरपूर पाणी प्या आणि आराम करा. हा त्रास किती दिवसांपासून होत आहे आणि वेदना आहेत का?`,
        followUps: ['कुठे त्रास होत आहे?', 'वेदना तीव्र आहेत का?']
      },
      mwr: {
        text: `म्हैं थारी बात समझी। पूरो पाणी पियो अर आराम करो। या तकलीफ़ कित्ता दिनां सूँ है अर कांई दरद भी है?`,
        followUps: ['कठे दरद हो रह्यो है?', 'दरद कित्तो है?']
      },
      fr: {
        text: `J'ai bien noté vos symptômes. Veillez à bien vous hydrater et accordez-vous du repos. Depuis combien de jours ressentez-vous cela, et avez-vous mal ?`,
        followUps: ['Où se situe la douleur ?', 'Quelle est son intensité de 0 à 10 ?']
      },
      lb: {
        text: `قرأت استفساركِ بعناية. احرصي على شرب كمية كافية من الماء وأخذ قسط من الراحة. منذ كم يوماً تشعرين بهذه الأعراض وهل يصاحبها ألم؟`,
        followUps: ['أين تشعرين بالألم؟', 'منذ متى بدأت هذه الأعراض؟']
      },
      ar: {
        text: `اطّلعتُ بعناية على ما تشعرين به. احرصي على الترطيب الجيد وأخذ قسط كافٍ من الراحة. منذ متى بدأت هذه الأعراض وهل يصاحبها ألم؟`,
        followUps: ['أين تشعرين بالألم تحديداً؟', 'كم درجة الألم من 0 إلى 10؟']
      }
    };

    return { ...(defaults[lang] || defaults.en), isEmergency: false };
  };

    // Send Message
  const handleSendMessage = async (textToSend) => {
    const raw = typeof textToSend === 'string' ? textToSend : inputText;
    const content = (raw || '').trim();

    if (!content && !attachedImage && !attachedDoc && !recordedAudioBlob) return;

    if (isRecording) {
      stopRecording();
    }

    const tempUserMsg = {
      sender: 'user',
      text: content,
      language,
      imageUrl: imagePreview,
      docName: attachedDoc?.name
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setInputText('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('text', content);
      formData.append('language', language);
      if (attachedImage) formData.append('image', attachedImage);
      if (attachedDoc) formData.append('document', attachedDoc);
      if (recordedAudioBlob) formData.append('audio', recordedAudioBlob, 'voice_note.webm');

      removeAttachments();

      const res = await api.postForm('/ai/chat', formData);
      if (res && res.assistantMessage) {
        setMessages((prev) => [...prev, res.assistantMessage]);
      } else {
        // Instant graceful client-side fallback
        const localResp = getLocalAIResponse(content, language);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: localResp.text,
            language,
            isEmergency: localResp.isEmergency,
            followUpQuestions: localResp.followUps || []
          }
        ]);
      }
    } catch (err) {
      console.warn('Backend chat API notice, activating client response engine:', err.message);
      // Instant graceful client-side fallback
      const localResp = getLocalAIResponse(content, language);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: localResp.text,
          language,
          isEmergency: localResp.isEmergency,
          followUpQuestions: localResp.followUps || []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '16px 12px 28px 12px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', minHeight: '720px' }}>
      {/* Assistant Header & Language Selector */}
      <div className="glass-card" style={{
        padding: '16px 24px',
        borderRadius: 'var(--radius-lg)',
        background: 'white',
        border: '1.5px solid var(--pink-200)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        marginBottom: '14px',
        boxShadow: '0 4px 20px rgba(244, 63, 94, 0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '18px',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 6px 16px rgba(244, 63, 94, 0.35)'
          }}>
            <Bot size={30} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
                FT Chatbox
              </h2>
              <span style={{ fontSize: '0.74rem', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '12px', fontWeight: 700, border: '1px solid #a7f3d0' }}>
                AI Doctor Active
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              {language === 'ta' ? 'அன்பான பெண் மருத்துவர் ஆலோசனை மையம் • தமிழ் குரல் ஆதரவு' : 'Comprehensive Women’s Health Consultation & Multilingual Voice Care'}
            </div>
          </div>
        </div>

        {/* Caring Doctor Badge & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 241, 242, 0.95)',
            border: '1.5px solid var(--pink-200)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 2px 8px rgba(244, 63, 94, 0.08)'
          }}>
            <span style={{ fontSize: '1.15rem' }}>👩‍⚕️</span>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--pink-700)' }}>
              {language === 'ta' ? 'அன்பான மருத்துவர் ஆன்லைன் 🌸' : 'Caring Doctor Online 🌸'}
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px #d1fae5' }} />
          </div>

          <button
            onClick={handleClearChat}
            title={language === 'ta' ? 'புதிய உரையாடல்' : 'Start Fresh Chat'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--pink-200)',
              background: 'white',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--pink-400)'; e.currentTarget.style.color = 'var(--pink-600)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--pink-200)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Trash2 size={14} />
            <span>{language === 'ta' ? 'சாட் அழிக்க' : 'Clear Chat'}</span>
          </button>
        </div>
      </div>

      {/* CHAT MESSAGES DISPLAY */}
      <div className="glass-card" style={{
        flex: 1,
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        marginBottom: '16px'
      }}>
        {messages.map((msg, i) => {
          const isUser = msg.sender === 'user';
          const isEmergency = msg.isEmergency;

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              <div style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '85%',
                flexDirection: isUser ? 'row-reverse' : 'row'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isUser ? 'var(--pink-100)' : isEmergency ? '#fee2e2' : 'var(--rose-gradient)',
                  color: isUser ? 'var(--pink-600)' : isEmergency ? '#dc2626' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontWeight: 700
                }}>
                  {isUser ? <User size={18} /> : isEmergency ? <AlertOctagon size={20} /> : <Bot size={20} />}
                </div>

                <div style={{
                  background: isEmergency ? '#fef2f2' : isUser ? 'var(--rose-gradient)' : 'white',
                  color: isEmergency ? '#991b1b' : isUser ? 'white' : 'var(--text-primary)',
                  border: isEmergency ? '2px solid #ef4444' : isUser ? 'none' : '1px solid var(--pink-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-sm)',
                  lineHeight: '1.6',
                  fontSize: '0.92rem',
                  whiteSpace: 'pre-line'
                }}>
                  {/* Emergency Warning Banner if applicable */}
                  {isEmergency && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#b91c1c', fontWeight: 800 }}>
                      <AlertOctagon size={20} />
                      <span>URGENT MEDICAL PROTOCOL TRIGGERED</span>
                    </div>
                  )}

                  {/* Render Message Body */}
                  {msg.text}

                  {/* Render Image Attachment Preview */}
                  {msg.imageUrl && (
                    <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden', maxWidth: '280px' }}>
                      <img src={msg.imageUrl} alt="Health report attachment" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  )}

                  {/* Render Document Badge */}
                  {msg.docName && (
                    <div style={{
                      marginTop: '10px',
                      padding: '8px 12px',
                      background: 'rgba(0,0,0,0.06)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem'
                    }}>
                      <FileText size={16} />
                      <span>{msg.docName}</span>
                    </div>
                  )}

                  {/* Emergency SOS Trigger Button within card */}
                  {isEmergency && (
                    <div style={{ marginTop: '16px' }}>
                      <button
                        onClick={onOpenEmergency}
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          padding: '10px 18px',
                          borderRadius: 'var(--radius-full)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <PhoneCall size={16} />
                        <span>Open 108 / Nearest Hospital Emergency Card</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Follow-up Question Suggestion Chips */}
              {!isUser && msg.followUpQuestions?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px', marginLeft: '46px' }}>
                  {msg.followUpQuestions.map((fq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(fq)}
                      style={{
                        padding: '6px 14px',
                        background: 'var(--pink-50)',
                        border: '1px solid var(--pink-300)',
                        color: 'var(--pink-600)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {fq}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Bot size={20} color="var(--rose-primary)" className="animate-glow" />
            <span>FT Chatbox Doctor Assistant is reviewing your symptoms...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ATTACHMENT PREVIEW TRAY */}
      {(imagePreview || attachedDoc || recordedAudioBlob) && (
        <div style={{
          background: 'white',
          border: '1px solid var(--pink-200)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
            )}
            {attachedDoc && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={18} color="#e11d48" />
                <span>{attachedDoc.name}</span>
              </div>
            )}
            {recordedAudioBlob && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                <Volume2 size={18} />
                <span>Voice Note ({formatTimer(recordingSeconds)})</span>
              </div>
            )}
          </div>
          <button onClick={removeAttachments} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e11d48' }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* SPEECH NOTICE BANNER */}
      {speechNotice && (
        <div style={{
          background: '#fff1f2',
          border: '1.5px solid #fecdd3',
          color: '#be123c',
          padding: '10px 16px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Mic size={16} />
          <span>{speechNotice}</span>
        </div>
      )}

      {/* LIVE VOICE RECORDING ACTIVE STATUS BAR & REAL-TIME SPEECH PREVIEW */}
      {isRecording && (
        <div style={{
          background: '#fef2f2',
          border: '2px solid #f87171',
          borderRadius: '16px',
          padding: '12px 18px',
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(239, 68, 68, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#dc2626' }} className="animate-glow" />
              <strong style={{ fontSize: '0.92rem', color: '#991b1b' }}>
                {isPaused ? 'Recording Paused' : 'Listening & Transcribing Voice...'} ({formatTimer(recordingSeconds)})
              </strong>
              <span style={{ fontSize: '0.74rem', background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                {SPEECH_LANG_MAP[language] || 'en-US'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isPaused ? (
                <button onClick={resumeRecording} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                  <Play size={14} /> Resume
                </button>
              ) : (
                <button onClick={pauseRecording} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                  <Pause size={14} /> Pause
                </button>
              )}
              <button onClick={stopRecording} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem', color: '#dc2626', fontWeight: 700 }}>
                <Square size={14} /> Done
              </button>
              <button onClick={deleteRecording} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {liveTranscript && (
            <div style={{
              background: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              color: '#374151',
              fontStyle: 'italic',
              border: '1px solid #fecaca'
            }}>
              "{liveTranscript}"
            </div>
          )}
        </div>
      )}

      {/* ENLARGED INPUT TOOLBAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'white',
        borderRadius: 'var(--radius-full)',
        padding: '8px 14px',
        border: '2px solid var(--pink-300)',
        boxShadow: '0 6px 20px rgba(244, 63, 94, 0.12)'
      }}>
        {/* Photo Upload Button */}
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageSelect} />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', color: 'var(--text-secondary)' }}
          title="Upload Medical Image / Prescription"
        >
          <ImageIcon size={22} />
        </button>

        {/* PDF Document Upload Button */}
        <input type="file" accept="application/pdf" ref={docInputRef} style={{ display: 'none' }} onChange={handleDocSelect} />
        <button
          type="button"
          onClick={() => docInputRef.current.click()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', color: 'var(--text-secondary)' }}
          title="Upload PDF Lab Report"
        >
          <Paperclip size={22} />
        </button>

        {/* Voice Input Microphone Button */}
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          style={{
            background: isRecording ? '#dc2626' : 'var(--pink-100)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isRecording ? 'white' : 'var(--pink-600)',
            transition: 'var(--transition)',
            boxShadow: isRecording ? '0 0 12px rgba(220, 38, 38, 0.5)' : 'none'
          }}
          title={isRecording ? "Stop Voice Recording" : "Speak to Doctor in Your Language (Voice Input)"}
        >
          <Mic size={22} />
        </button>

        {/* Text Message Input Field */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={
            language === 'ta'
              ? 'உங்கள் உடல்நல அறிகுறிகள் அல்லது சந்தேகங்களை மருத்துவரிடம் கேளுங்கள் / பேசுங்கள்...'
              : language === 'hi'
              ? 'अपने लक्षणों या स्वास्थ्य संबंधी सवाल डॉक्टर से पूछें या बोलें...'
              : language === 'te'
              ? 'మీ ఆరోగ్య సమస్య లేదా లక్షణాలను డాక్టర్‌ను అడగండి...'
              : language === 'fr'
              ? 'Posez votre question médicale ou décrivez vos symptômes...'
              : language === 'ar' || language === 'lb'
              ? 'اطرحي سؤالكِ الطبي أو صفي أعراضكِ للطبيبة...'
              : 'Ask or speak to your doctor assistant about symptoms, pain, cramps, or concerns...'
          }
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            padding: '10px 8px',
            fontFamily: 'inherit',
            color: 'var(--text-primary)'
          }}
        />

        {/* Send Button */}
        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={loading}
          style={{
            background: 'var(--rose-gradient)',
            border: 'none',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            boxShadow: '0 4px 12px rgba(244, 63, 94, 0.4)'
          }}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Medical Disclaimer Banner in Chat Footer */}
      <div style={{ marginTop: '12px', width: '100%' }}>
        <DisclaimerBanner />
      </div>
    </div>
  );
}
