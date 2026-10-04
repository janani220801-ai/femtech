import React, { useState } from 'react';
import { CalendarHeart, Shield, Droplets, HeartPulse, Clock, Sparkles, AlertCircle, PlayCircle, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';


export const AGE12_I18N = {
  en: {
    cards: [
      {
        title: 'What is Puberty?',
        summary: 'Puberty is the natural transition when your brain signals your body to grow into a young adult. Everyone goes through it at their own unique pace—usually between ages 9 and 15.'
      },
      {
        title: 'Body Changes & Breast Development',
        summary: 'You may notice growth spurts, widening hips, tender small breast buds developing, and hair growth under arms and in the pubic area. This is a healthy sign that your body is blossoming.'
      },
      {
        title: 'What Menstruation (A Period) Is',
        summary: 'Each month, the uterus prepares a soft cushioned lining. If an egg isn’t fertilized, the body naturally releases this lining with a small amount of blood (about 2 to 3 tablespoons total over several days).'
      },
      {
        title: 'Your First Period (Menarche)',
        summary: 'Your first period is a milestone! It may start as brownish spots or pinkish droplets on your underwear. It is completely normal to feel surprised or proud. Tell your mother, guardian, or school nurse.'
      },
      {
        title: 'How Sanitary Pads Are Used',
        summary: 'Peel the adhesive backing, stick the pad firmly in the center of your underwear, and fold any wings underneath. Roll up used pads neatly in paper and discard in a trash bin—never flush down the toilet.'
      },
      {
        title: 'How Often to Change Pads',
        summary: 'Change your sanitary pad every 4 to 6 hours (or sooner if your flow feels heavy). Frequent changing keeps you fresh, comfortable, and prevents bacterial infections.'
      },
      {
        title: 'Coping with Period Cramps & Moods',
        summary: 'Hormones can make you feel emotional, tired, or achy. A warm heating pad on your lower tummy, drinking warm water or herbal tea, and gentle walking work wonders to ease muscle tightness.'
      }
    ],
    videos: [
      {
        title: 'Understanding Your First Period',
        desc: 'An animated guide walking through what happens on day one, what to pack in your school bag, and how to tell your mom or trusted adult.'
      },
      {
        title: 'What Happens During a Menstrual Cycle?',
        desc: 'A visual look at the 28-day cycle, the ovaries, the uterine lining, and why periods occur monthly.'
      },
      {
        title: 'Understanding Normal Vaginal Discharge',
        desc: 'Learn why cervical and vaginal fluids are your body’s natural self-cleaning system.'
      },
      {
        title: 'Menstrual Hygiene Masterclass',
        desc: 'Best practices for changing pads, keeping clean, washing with plain water, and staying confident during sports.'
      },
      {
        title: 'Puberty & Body Changes Explained',
        desc: 'How growth hormones work, skin changes, emotional shifts, and celebrating your growing body.'
      }
    ],
    appearanceLabel: 'Appearance:',
    appearanceDesc: 'Clear, whitish, or pale creamy liquid.',
    textureLabel: 'Texture:',
    textureDesc: 'Can be thin and watery, or slightly stretchy like raw egg white.',
    odorLabel: 'Odor:',
    odorDesc: 'Mild, natural scent (never foul or fishy).',
    purposeLabel: 'Purpose:',
    purposeDesc: 'It washes away dead cells and protects against infections.',
    alert1: 'Discharge becomes yellowish, greenish, or gray.',
    alert2: 'It develops a strong, unpleasant, or fishy smell.',
    alert3: 'It is accompanied by itching, burning, pain, or redness.',
    alert4: 'Texture resembles thick cottage cheese.',
    alert5: 'Never attempt to diagnose yourself; ask a doctor or trusted adult.',
    ruleLabel: 'Hygiene Rule:',
    simLesson: 'Simulated Video Lesson'
  },
  ta: {
    cards: [
      {
        title: 'பருவமடைதல் என்றால் என்ன?',
        summary: 'பருவமடைதல் என்பது உங்கள் மூளை உடலுக்கு வளர சமிக்ஞை செய்யும் இயற்கையான மாற்றமாகும். பொதுவாக இது 9 முதல் 15 வயதிற்குள் ஒவ்வொருவருக்கும் அவரவர் வேகத்தில் நிகழ்கிறது.'
      },
      {
        title: 'உடல் மாற்றங்கள் & வளர்ச்சி',
        summary: 'திடீர் உயர வளர்ச்சி, இடுப்பு அகலமாதல், மார்பக மொட்டுகள் தோன்றுதல் மற்றும் முடிகள் வளருதல் ஆகியவற்றை நீங்கள் கவனிக்கலாம். இது உங்கள் உடல் மலர்ந்து வளர்வதற்கான ஆரோக்கியமான அறிகுறி.'
      },
      {
        title: 'மாதவிடாய் என்பது என்ன?',
        summary: 'ஒவ்வொரு மாதமும் கருப்பை ஒரு மென்மையான பஞ்சு போன்ற உள்படலத்தை உருவாக்குகிறது. கருமுட்டை கருவுறாதபோது, உடல் இந்த படலத்தை சிறிதளவு ரத்தத்துடன் இயற்கையாக வெளியேற்றுகிறது (சில நாட்களில் மொத்தம் 2 முதல் 3 டேபிள்ஸ்பூன் மட்டுமே).'
      },
      {
        title: 'உங்கள் முதல் மாதவிடாய் (Menarche)',
        summary: 'உங்கள் முதல் மாதவிடாய் ஒரு முக்கிய மைல்கல்! இது பழுப்பு நிற புள்ளிகளாகவோ அல்லது இளஞ்சிவப்பு துளிகளாகவோ ஆரம்பிக்கலாம். ஆச்சரியப்படுவது இயல்பானது. உங்கள் அம்மா, பாட்டி அல்லது பள்ளி ஆசிரியரிடம் சொல்லுங்கள்.'
      },
      {
        title: 'சானிட்டரி பேடு பயன்படுத்துவது எப்படி?',
        summary: 'ஒட்டும் தாளை நீக்கி, பேடை உங்கள் உள்ளாடையின் நடுவில் உறுதியாக ஒட்டவும், சிறகுகளை அடியில் மடக்கவும். பயன்படுத்திய பேடை பேப்பரில் சுற்றி குப்பைத்தொட்டியில் போடவும்—கழிவறையில் ஒருபோதும் போடக்கூடாது.'
      },
      {
        title: 'எத்தனை மணி நேரத்திற்கு ஒருமுறை பேடு மாற்ற வேண்டும்?',
        summary: 'சானிட்டரி பேடை ஒவ்வொரு 4 முதல் 6 மணி நேரத்திற்கு ஒருமுறை மாற்ற வேண்டும். அடிக்கடி மாற்றுவது உங்களை புத்துணர்ச்சியாகவும், நோய்த்தொற்றுகள் ஏற்படாமலும் பாதுகாக்கும்.'
      },
      {
        title: 'மாதவிடாய் வலி & மனநிலையை சமாளித்தல்',
        summary: 'ஹார்மோன்கள் உங்களை சோர்வாகவோ அல்லது வலியுடனோ உணர வைக்கலாம். கீழ் வயிற்றில் வெந்நீர் ஒத்தடம் கொடுப்பது, வெதுவெதுப்பான தண்ணீர் குடிப்பது மற்றும் மெதுவான நடைபயிற்சி தசைகளை தளர்த்தி வலியை எளிதில் குறைக்கும்.'
      }
    ],
    videos: [
      {
        title: 'உங்கள் முதல் மாதவிடாய் பற்றி அறிந்துகொள்ளுங்கள்',
        desc: 'முதல் நாளில் என்ன நடக்கும், பள்ளி பையில் என்ன வைத்திருக்க வேண்டும், அம்மாவிடம் எப்படி சொல்வது என்ற அனிமேஷன் வழிகாட்டி.'
      },
      {
        title: 'மாதவிடாய் சுழற்சியின் போது என்ன நிகழ்கிறது?',
        desc: '28 நாள் சுழற்சி, சினைப்பைகள், கருப்பை படலம் மற்றும் மாதந்தோறும் மாதவிடாய் ஏற்படுவதற்கான காரணங்கள்.'
      },
      {
        title: 'இயல்பான யோனி திரவத்தை அறிந்துகொள்ளுதல்',
        desc: 'கருப்பை வாய் மற்றும் யோனி திரவங்கள் உடலின் இயற்கையான சுய-சுத்திகரிப்பு அமைப்பு என்பதை விளக்கும் பாடம்.'
      },
      {
        title: 'மாதவிடாய் சுகாதார வழிகாட்டி',
        desc: 'பேடு மாற்றுதல், சுத்தமாக இருத்தல், தண்ணீரில் கழுவுதல் மற்றும் விளையாட்டுகளின் போது தன்னம்பிக்கையுடன் இருப்பதற்கான குறிப்புகள்.'
      },
      {
        title: 'பருவமடைதல் & உடல் மாற்றங்கள் விளக்கம்',
        desc: 'வளர்ச்சி ஹார்மோன்கள் எப்படி செயல்படுகின்றன, சரும மாற்றங்கள் மற்றும் உங்கள் வளர்ச்சியை கொண்டாடுவது பற்றிய பாடம்.'
      }
    ],
    appearanceLabel: 'தோற்றம்:',
    appearanceDesc: 'தெளிவான, வெண்மையான அல்லது வெளிர் கிரீம் திரவம்.',
    textureLabel: 'அமைப்பு:',
    textureDesc: 'நீர்த்த திரவமாகவோ அல்லது முட்டை வெள்ளைக்கரு போன்ற நெகிழ்வுத்தன்மையுடன் இருக்கும்.',
    odorLabel: 'மணம்:',
    odorDesc: 'லேசான, இயற்கையான மணம் (துர்நாற்றம் வீசாது).',
    purposeLabel: 'பயன்:',
    purposeDesc: 'இது இறந்த செல்களை வெளியேற்றி நோய்த்தொற்றுகளிலிருந்து பாதுகாக்கிறது.',
    alert1: 'திரவம் மஞ்சள், பச்சை அல்லது சாம்பல் நிறமாக மாறுவது.',
    alert2: 'கடுமையான, மீன் போன்ற துர்நாற்றம் வீசுவது.',
    alert3: 'அரிப்பு, எரிச்சல், வலி அல்லது சிவந்து போவதுடன் ஏற்படுவது.',
    alert4: 'கெட்டியான தயிர் போன்ற அமைப்புடன் இருப்பது.',
    alert5: 'சுயமாக மருந்து எடுக்காதீர்கள்; பெற்றோர் அல்லது மருத்துவரிடம் கேளுங்கள்.',
    ruleLabel: 'சுகாதார விதி:',
    simLesson: 'சிமுலேட்டட் கல்வி வீடியோ'
  },
  hi: {
    cards: [
      {
        title: 'किशोरावस्था (Puberty) क्या है?',
        summary: 'किशोरावस्था वह प्राकृतिक बदलाव है जब आपका मस्तिष्क शरीर को युवा वयस्क बनने का संकेत देता है। यह आमतौर पर 9 से 15 वर्ष की आयु में हर किसी के अपनी गति से होता है।'
      },
      {
        title: 'शारीरिक बदलाव व विकास',
        summary: 'कद का तेजी से बढ़ना, स्तनों का विकास और शरीर पर बालों का आना प्राकृतिक है। यह स्वस्थ विकास का सुंदर संकेत है।'
      },
      {
        title: 'मासिक धर्म (पीरियड्स) क्या है?',
        summary: 'हर महीने गर्भाशय एक मुलायम सुरक्षा परत बनाता है। अंडाणु निषेचित न होने पर शरीर इस परत को रक्त के रूप में बाहर निकालता है (कुल 2-3 चम्मच ही रक्त होता है)।'
      },
      {
        title: 'आपका पहला मासिक धर्म (Menarche)',
        summary: 'पहला पीरियड एक महत्वपूर्ण पड़ाव है! यह भूरे धब्बों या हल्के गुलाबी बूंदों से शुरू हो सकता है। अपनी मां, दीदी या शिक्षिका को बताएं।'
      },
      {
        title: 'सैनिटरी पैड का उपयोग कैसे करें?',
        summary: 'पैड से चिपकने वाली पट्टी निकालें, अंडरवियर के बीच में चिपकाएं और पंखों (Wings) को नीचे मोड़ें। इस्तेमाल किए पैड को कागज में लपेटकर कचरे के डिब्बे में डालें।'
      },
      {
        title: 'पैड को कितनी देर में बदलना चाहिए?',
        summary: 'स्वच्छता बनाए रखने और संक्रमण से बचने के लिए हर 4 से 6 घंटे में पैड अवश्य बदलें।'
      },
      {
        title: 'मासिक धर्म के दर्द व मूड को संभालना',
        summary: 'हल्का खिंचाव सामान्य है। गर्म पानी की थैली से पेट की सिकाई करें, गुनगुना पानी पिएं और हल्का आराम करें।'
      }
    ],
    videos: [
      {
        title: 'अपने पहले मासिक धर्म को समझें',
        desc: 'पहले दिन क्या होता है, स्कूल बैग में क्या रखें और मां से कैसे बात करें - एक एनिमेटेड गाइड।'
      },
      {
        title: 'मासिक धर्म चक्र में क्या होता है?',
        desc: '28-दिन का चक्र, अंडाशय, गर्भाशय की परत और पीरियड्स के कारणों का सरल दृश्य परिचय।'
      },
      {
        title: 'सामान्य स्राव (Vaginal Discharge) को समझें',
        desc: 'जानें कि यह द्रव आपके शरीर की प्राकृतिक सफाई प्रणाली का महत्वपूर्ण हिस्सा क्यों है।'
      },
      {
        title: 'मासिक धर्म स्वच्छता मास्टरक्लास',
        desc: 'पैड बदलने के नियम, साफ-सफाई और खेलकूद के दौरान आत्मविश्वास बनाए रखने के टिप्स।'
      },
      {
        title: 'किशोरावस्था व शारीरिक परिवर्तन',
        desc: 'ग्रोथ हार्मोन, त्वचा में बदलाव और अपने बढ़ते शरीर को स्वीकारने की सीख।'
      }
    ],
    appearanceLabel: 'दिखावट:',
    appearanceDesc: 'साफ, सफेद या हल्का मलाईदार तरल।',
    textureLabel: 'बनावट:',
    textureDesc: 'पतला पानी जैसा या अंडे की सफेदी जैसा थोड़ा लचीला।',
    odorLabel: 'गंध:',
    odorDesc: 'हल्की, प्राकृतिक गंध (दुर्गंध नहीं होती)।',
    purposeLabel: 'उद्देश्य:',
    purposeDesc: 'यह मृत कोशिकाओं को बाहर निकालकर संक्रमण से बचाता है।',
    alert1: 'स्राव का पीला, हरा या धूसर हो जाना।',
    alert2: 'तीव्र, अप्रिय या मछली जैसी गंध आना।',
    alert3: 'खुजली, जलन, दर्द या लालिमा होना।',
    alert4: 'गाढ़े पनीर या दही जैसी बनावट होना।',
    alert5: 'खुद से दवाई न लें; डॉक्टर या बड़ों से सलाह लें।',
    ruleLabel: 'स्वच्छता नियम:',
    simLesson: 'एनिमेटेड शैक्षिक वीडियो'
  }
};

export default function Age12View() {
  const { t, language } = useLanguage();
  const a12Dict = AGE12_I18N[language] || (language === 'ta' ? AGE12_I18N.ta : AGE12_I18N.en);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const learningCards = (a12Dict.cards || AGE12_I18N.en.cards).map((c, i) => ({
    ...c,
    icon: ['🌸', '👚', '🩸', '💖', '🩹', '⏰', '🍵'][i] || '🌸'
  }));

  const videoCards = (a12Dict.videos || AGE12_I18N.en.videos).map((v, i) => ({
    id: i + 1,
    ...v,
    duration: ['5:30 min', '6:10 min', '4:45 min', '5:00 min', '6:45 min'][i],
    icon: ['🩸', '🔄', '💧', '🫧', '🌱'][i]
  }));

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Hero Header */}
      <div className="glass-card" style={{
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fff0f5 0%, #fdf2f8 60%, #f3e8ff 100%)',
        marginBottom: '24px',
        border: '1px solid var(--pink-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '2.6rem' }}>🌷</span>
          <div>
            <span className="badge badge-pink" style={{ marginBottom: '6px' }}>
              {t('age12HubBadge')}
            </span>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--navy-dark)' }}>
              {t('age12HubTitle')}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              {t('age12HubSub')}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBanner customText={t('age12Disclaimer')} />

      {/* SPECIAL DEEP DIVE: VAGINAL DISCHARGE EDUCATION */}
      <div className="glass-card" style={{
        padding: '28px',
        borderRadius: 'var(--radius-lg)',
        background: 'white',
        border: '2px solid var(--pink-200)',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            background: 'var(--pink-100)',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            💧
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--navy-dark)' }}>
              {t('age12DischargeFocusTitle')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {t('age12DischargeFocusSub')}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginTop: '16px' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h3 style={{ fontSize: '1rem', color: '#166534', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✅</span> {t('age12DischargeNormal')}
            </h3>
            <ul style={{ fontSize: '0.85rem', color: '#14532d', lineHeight: '1.6', paddingLeft: '18px' }}>
              <li><strong>{a12Dict.appearanceLabel}</strong> {a12Dict.appearanceDesc}</li>
              <li><strong>{a12Dict.textureLabel}</strong> {a12Dict.textureDesc}</li>
              <li><strong>{a12Dict.odorLabel}</strong> {a12Dict.odorDesc}</li>
              <li><strong>{a12Dict.purposeLabel}</strong> {a12Dict.purposeDesc}</li>
            </ul>
          </div>

          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h3 style={{ fontSize: '1rem', color: '#9f1239', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⚠️</span> {t('age12DischargeAlert')}
            </h3>
            <ul style={{ fontSize: '0.85rem', color: '#881337', lineHeight: '1.6', paddingLeft: '18px' }}>
              <li>{a12Dict.alert1}</li>
              <li>{a12Dict.alert2}</li>
              <li>{a12Dict.alert3}</li>
              <li>{a12Dict.alert4}</li>
              <li><em>{a12Dict.alert5}</em></li>
            </ul>
          </div>
        </div>

        {/* Hygiene Tip Callout */}
        <div style={{
          marginTop: '16px',
          background: 'var(--lavender-soft)',
          border: '1px solid var(--lavender-accent)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Info size={20} color="var(--lavender-deep)" />
          <p style={{ fontSize: '0.85rem', color: '#4c1d95', margin: 0 }}>
            <strong>{a12Dict.ruleLabel}</strong> {t('age12HygieneRule')}
          </p>
        </div>
      </div>

      {/* Puberty & Periods Essential Cards */}
      <h2 style={{ fontSize: '1.4rem', margin: '28px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📖</span> {t('age12PubertyEssentials')}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '18px',
        marginBottom: '36px'
      }}>
        {learningCards.map((c, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: '22px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ fontSize: '2rem' }}>{c.icon}</div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--navy-dark)' }}>{c.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {c.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Video Learning Cards */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎬</span> {t('age12VideoLessons')}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '18px'
        }}>
          {videoCards.map((vid) => (
            <div
              key={vid.id}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'white',
                border: '1px solid var(--pink-200)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                height: '130px',
                background: 'linear-gradient(135deg, #fbcfe8 0%, #fda4af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <span style={{ fontSize: '2.8rem' }}>{vid.icon}</span>
                <button
                  onClick={() => setSelectedVideo(vid)}
                  style={{
                    position: 'absolute',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    color: 'var(--pink-600)'
                  }}
                >
                  <PlayCircle size={28} />
                </button>
                <span style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '6px',
                  background: 'rgba(0,0,0,0.65)',
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  {vid.duration}
                </span>
              </div>

              <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '6px', color: 'var(--navy-dark)' }}>{vid.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{vid.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedVideo(vid)}
                  className="btn-secondary"
                  style={{ marginTop: '12px', width: '100%', fontSize: '0.78rem', padding: '6px' }}
                >
                  {t('age12WatchCard')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '560px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              height: '220px',
              background: '#0f172a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative'
            }}>
              <span style={{ fontSize: '3.6rem', marginBottom: '8px' }}>{selectedVideo.icon}</span>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                {a12Dict.simLesson}
              </p>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '16px',
                right: '16px',
                height: '4px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '2px'
              }}>
                <div style={{ width: '60%', height: '100%', background: 'var(--pink-400)' }} />
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{selectedVideo.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '18px' }}>
                {selectedVideo.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setSelectedVideo(null)} className="btn-primary" style={{ padding: '8px 20px' }}>
                  {t('age12CloseLesson')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
