import React, { useState } from 'react';
import { Shield, Heart, Smile, Sun, Moon, Apple, PlayCircle, HelpCircle, Users, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';


export const AGE8_I18N = {
  en: {
    cards: [
      {
        title: 'Our Amazing Growing Body',
        desc: 'Just like trees grow taller and flowers bloom, our bodies grow every single day! Bones get stronger and muscles get ready for fun activities.'
      },
      {
        title: 'Healthy Daily Habits',
        desc: 'Washing your hands with soap before eating, brushing your teeth twice a day, and taking a refreshing bath keeps bad germs away!'
      },
      {
        title: 'Private Parts & Body Privacy',
        desc: 'The areas of our body covered by a swimsuit are private. Your body belongs completely to you, and everyone has a right to their privacy.'
      },
      {
        title: 'Safe Touch vs Unsafe Touch',
        desc: 'Safe touches make you feel happy, warm, and secure (like a high five or mom’s hug). If any touch makes you feel uncomfortable, confused, or scared, that is an unsafe touch. Say NO loudly!'
      },
      {
        title: 'Your Trusted Adults Circle',
        desc: 'Always know who your safe helpers are: Parents, grandparents, teachers, and school counselors. You can always tell them anything without being scared.'
      },
      {
        title: 'How to Ask for Help',
        desc: 'Never keep secrets that make you feel worried or unhappy. Good secrets are happy surprises; bad secrets can be told to a trusted adult right away.'
      },
      {
        title: 'Super Food & Water',
        desc: 'Colorful fruits, crunchy veggies, clean water, and warm milk give your brain super-energy for studying, running, and playing!'
      },
      {
        title: 'Sleep & Sweet Dreams',
        desc: 'Children need 9 to 10 hours of peaceful sleep so the body can repair, grow taller, and recharge your memory for tomorrow.'
      }
    ],
    videos: [
      {
        title: 'Meet Your Body: The Wonder Machine',
        summary: 'A cheerful cartoon journey through how our heart pumps, lungs breathe, and bones help us dance and run.'
      },
      {
        title: 'My Body, My Boundaries',
        summary: 'An animated story about the swimsuit rule, safe boundaries, and always telling trusted grown-ups.'
      },
      {
        title: 'The Great Soap & Water Adventure',
        summary: 'Fun song and steps to wash hands, brush teeth, and keep personal hygiene top-notch every day.'
      },
      {
        title: 'Emotions Are Friends: Understanding Big Feelings',
        summary: 'Learn why it is okay to feel happy, sad, angry, or shy, and peaceful ways to calm your heart.'
      }
    ],
    videoSeriesBadge: 'Child-safe animated educational video series',
    simPlayer: 'Simulated Safe Video Lesson Player'
  },
  ta: {
    cards: [
      {
        title: 'நமது வளரும் உடல்',
        desc: 'மரங்கள் வளர்வது போலவும் பூக்கள் மலர்வது போலவும் நமது உடல் ஒவ்வொரு நாளும் வளர்கிறது! எலும்புகள் வலுவடைந்து தசைகள் விளையாட தயாராகின்றன.'
      },
      {
        title: 'ஆரோக்கியமான தினசரி பழக்கங்கள்',
        desc: 'சாப்பிடுவதற்கு முன் சோப்பால் கைகளைக் கழுவுதல், தினமும் இருமுறை பல் துலக்குதல், மற்றும் குளிப்பது கிருமிகளை நம்மிடம் இருந்து விலக்கி வைக்கும்!'
      },
      {
        title: 'தனிப்பட்ட உறுப்புகள் & உடல் அந்தரங்கம்',
        desc: 'நீச்சல் உடைகளால் மூடப்பட்ட பகுதிகள் உங்கள் அந்தரங்க உறுப்புகள் ஆகும். உங்கள் உடல் முற்றிலும் உங்களுக்கே உரியது; அனைவருக்கும் அந்தரங்க உரிமை உண்டு.'
      },
      {
        title: 'பாதுகாப்பான தொடுதல் vs ஆபத்தான தொடுதல்',
        desc: 'பாதுகாப்பான தொடுதல் உங்களை மகிழ்ச்சியாகவும் அரவணைப்பாகவும் உணர வைக்கும் (ஹை-ஃபைவ் அல்லது அம்மாவின் அணைப்பு). எந்தத் தொடுதலாவது உங்களை சங்கடமாகவோ பயமாகவோ உணர வைத்தால், உரக்க "வேண்டாம்" என்று சொல்லுங்கள்!'
      },
      {
        title: 'நம்பகமான பெரியவர்கள் வட்டம்',
        desc: 'உங்கள் பாதுகாப்பான வழிகாட்டிகள் யார் என்பதை எப்போதும் நினைவில் வையுங்கள்: பெற்றோர், தாத்தா-பாட்டி, ஆசிரியர்கள். நீங்கள் அவர்களிடம் பயமின்றி எதையும் பகிரலாம்.'
      },
      {
        title: 'உதவி கேட்பது எப்படி?',
        desc: 'உங்களை கவலையடையச் செய்யும் அல்லது சோகமாக்கும் ரகசியங்களை யாரிடமும் மறைக்காதீர்கள். நல்ல ரகசியங்கள் இன்ப அதிர்ச்சிகள்; கெட்ட ரகசியங்களை உடனே பெரியவர்களிடம் சொல்லலாம்.'
      },
      {
        title: 'சத்துணவு & குடிநீர்',
        desc: 'பழங்கள், காய்கறிகள், சுத்தமான தண்ணீர், மற்றும் பால் ஆகியவை உங்கள் மூளைக்கு படிக்கவும், ஓடி விளையாடவும் அபரிமிதமான ஆற்றலைத் தரும்!'
      },
      {
        title: 'தூக்கம் & இனிமையான கனவுகள்',
        desc: 'குழந்தைகளுக்கு தினமும் 9 முதல் 10 மணி நேர அமைதியான தூக்கம் தேவை. இது உங்கள் உடல் வளரவும் நினைவாற்றலை புதுப்பிக்கவும் உதவுகிறது.'
      }
    ],
    videos: [
      {
        title: 'உங்கள் உடல்: ஓர் அற்புத இயந்திரம்',
        summary: 'இதயம் துடிப்பதும், நுரையீரல் சுவாசிப்பதும், எலும்புகள் நாம் நடனமாட உதவுவதும் பற்றிய வேடிக்கையான கார்ட்டூன் பயணம்.'
      },
      {
        title: 'என் உடல், என் எல்லைகள்',
        summary: 'நீச்சலுடை விதி, பாதுகாப்பான எல்லைகள் மற்றும் நம்பகமான பெரியவர்களிடம் பேசுவது பற்றிய அனிமேஷன் கதை.'
      },
      {
        title: 'சோப் மற்றும் தண்ணீரின் சாகசம்',
        summary: 'கைகளைக் கழுவுவது, பல் துலக்குவது மற்றும் தனிப்பட்ட சுகாதாரத்தை பராமரிப்பது பற்றிய பாடல் மற்றும் வழிகாட்டுதல்.'
      },
      {
        title: 'உணர்ச்சிகள் நமது நண்பர்கள்',
        summary: 'மகிழ்ச்சி, சோகம், கோபம் ஏற்படுவது ஏன் இயல்பானது என்பதையும், மனதை அமைதிப்படுத்தும் வழிகளையும் கற்றுக் கொடுக்கும் பாடம்.'
      }
    ],
    videoSeriesBadge: 'குழந்தைகளுக்கான பாதுகாப்பான அனிமேஷன் வீடியோ தொடர்',
    simPlayer: 'சிமுலேட்டட் பாதுகாப்பான கல்வி வீடியோ பிளேயர்'
  },
  hi: {
    cards: [
      {
        title: 'हमारा अद्भुत बढ़ता शरीर',
        desc: 'जैसे पेड़ बढ़ते हैं और फूल खिलते हैं, वैसे ही हमारा शरीर हर दिन बढ़ता है! हड्डियां मजबूत होती हैं और मांसपेशियां खेलने के लिए तैयार होती हैं।'
      },
      {
        title: 'स्वस्थ दैनिक आदतें',
        desc: 'खाना खाने से पहले साबुन से हाथ धोना, दिन में दो बार ब्रश करना और रोज नहाना कीटाणुओं को दूर रखता है!'
      },
      {
        title: 'निजी अंग व शरीर की गोपनीयता',
        desc: 'स्विमसूट से ढके रहने वाले हिस्से निजी होते हैं। आपका शरीर पूरी तरह आपका है और सभी को गोपनीयता का अधिकार है।'
      },
      {
        title: 'सुरक्षित स्पर्श vs असुरक्षित स्पर्श',
        desc: 'सुरक्षित स्पर्श से आप खुश और सुरक्षित महसूस करते हैं (जैसे हाई-फाइव या मां का गले लगाना)। यदि कोई स्पर्श असहज लगे, तो जोर से "नहीं" बोलें!'
      },
      {
        title: 'भरोसेमंद बड़ों का घेरा',
        desc: 'हमेशा जानें कि आपके सुरक्षित मददगार कौन हैं: माता-पिता, दादा-दादी, शिक्षक। आप उनसे बिना डरे कुछ भी साझा कर सकते हैं।'
      },
      {
        title: 'मदद कैसे मांगें?',
        desc: 'चिंता या उदास करने वाले राज़ कभी न छुपाएं। अच्छी बातें मीठे सरप्राइज होती हैं; परेशान करने वाली बातें तुरंत बड़ों को बताएं।'
      },
      {
        title: 'पौष्टिक भोजन व पानी',
        desc: 'रंग-बिरंगे फल, हरी सब्जियां, साफ पानी और दूध आपके दिमाग को पढ़ने और खेलने के लिए भरपूर ऊर्जा देते हैं!'
      },
      {
        title: 'मीठी नींद और सपने',
        desc: 'बच्चों को 9 से 10 घंटे की अच्छी नींद चाहिए ताकि शरीर की मरम्मत हो सके, कद बढ़ सके और दिमाग तरोताजा रहे।'
      }
    ],
    videos: [
      {
        title: 'हमारा शरीर: एक जादुई मशीन',
        summary: 'दिल कैसे धड़कता है, फेफड़े कैसे सांस लेते हैं और हड्डियां कैसे दौड़ने में मदद करती हैं - एक मजेदार कार्टून यात्रा।'
      },
      {
        title: 'मेरा शरीर, मेरी सीमाएं',
        summary: 'स्विमसूट नियम, सुरक्षित सीमाओं और हमेशा भरोसेमंद बड़ों को बताने पर एक एनिमेटेड कहानी।'
      },
      {
        title: 'साबुन और पानी का रोमांच',
        summary: 'हाथ धोने, दांत साफ करने और रोजाना व्यक्तिगत स्वच्छता बनाए रखने के मजेदार गीत और चरण।'
      },
      {
        title: 'भावनाएं हमारी दोस्त हैं',
        summary: 'खुश, उदास, गुस्सा या शांत महसूस करना क्यों स्वाभाविक है और मन को शांत करने के तरीके।'
      }
    ],
    videoSeriesBadge: 'बच्चों के लिए सुरक्षित एनिमेटेड वीडियो श्रृंखला',
    simPlayer: 'सुरक्षित शैक्षिक वीडियो प्लेयर'
  }
};

export default function Age8View() {
  const { t, language } = useLanguage();
  const a8Dict = AGE8_I18N[language] || (language === 'ta' ? AGE8_I18N.ta : AGE8_I18N.en);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const educationalCards = (a8Dict.cards || AGE8_I18N.en.cards).map((c, i) => ({
    ...c,
    icon: ['🌱', '🧼', '🛡️', '🤝', '👨‍👩‍👧', '🗣️', '🍎', '🌙'][i] || '🌱',
    color: ['#fdf2f8', '#f0fdf4', '#eff6ff', '#fefce8', '#faf5ff', '#fff1f2', '#f0fdfa', '#f5f3ff'][i],
    borderColor: ['#fbcfe8', '#bbf7d0', '#bfdbfe', '#fef08a', '#e9d5ff', '#fecdd3', '#99f6e4', '#ddd6fe'][i]
  }));

  const watchAndLearnVideos = (a8Dict.videos || AGE8_I18N.en.videos).map((v, i) => ({
    id: i + 1,
    ...v,
    duration: ['4:20 min', '5:15 min', '3:45 min', '4:50 min'][i],
    thumbnail: ['🧬', '🛡️', '🫧', '🌈'][i]
  }));

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #eff6ff 100%)',
        marginBottom: '28px',
        border: '1px solid var(--pink-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>🎈</span>
          <div>
            <span className="badge badge-pink" style={{ marginBottom: '6px' }}>
              {t('age8HubBadge')}
            </span>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--navy-dark)' }}>
              {t('age8HubTitle')}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              {t('age8HubSub')}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBanner customText={t('age8Disclaimer')} />

      {/* Visual Educational Cards Grid */}
      <h2 style={{ fontSize: '1.4rem', margin: '28px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🌟</span> {t('age8LearnAboutYou')}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '18px',
        marginBottom: '36px'
      }}>
        {educationalCards.map((card, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: '22px',
              background: card.color,
              borderColor: card.borderColor,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ fontSize: '2rem' }}>{card.icon}</div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--navy-dark)' }}>{card.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Watch & Learn Video Cards Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎬</span> {t('age8WatchAndLearn')}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {a8Dict.videoSeriesBadge}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '18px'
        }}>
          {watchAndLearnVideos.map((vid) => (
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
              {/* Thumbnail Container */}
              <div style={{
                height: '140px',
                background: 'linear-gradient(135deg, #fbcfe8 0%, #fda4af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <span style={{ fontSize: '3rem' }}>{vid.thumbnail}</span>
                <button
                  onClick={() => setSelectedVideo(vid)}
                  style={{
                    position: 'absolute',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    color: 'var(--pink-600)'
                  }}
                >
                  <PlayCircle size={32} />
                </button>
                <span style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.65)',
                  color: 'white',
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  {vid.duration}
                </span>
              </div>

              {/* Video Info */}
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', color: 'var(--navy-dark)' }}>
                    {vid.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {vid.summary}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVideo(vid)}
                  className="btn-secondary"
                  style={{ marginTop: '14px', width: '100%', fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  {t('age8WatchLesson')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player (Safe Demo Player) */}
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
            maxWidth: '600px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              height: '240px',
              background: '#0f172a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative'
            }}>
              <span style={{ fontSize: '4rem', marginBottom: '12px' }}>{selectedVideo.thumbnail}</span>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                {a8Dict.simPlayer}
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
                <div style={{ width: '45%', height: '100%', background: 'var(--pink-400)' }} />
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{selectedVideo.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '18px' }}>
                {selectedVideo.summary}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setSelectedVideo(null)} className="btn-primary" style={{ padding: '8px 20px' }}>
                  {t('age8CloseLesson')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
