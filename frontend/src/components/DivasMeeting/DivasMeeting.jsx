import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useViewMode } from '../../context/ViewModeContext';
import {
  MessageSquare,
  Heart,
  MessageCircle,
  Share2,
  Shield,
  Send,
  Plus,
  Sparkles,
  UserCheck,
  Lock,
  Filter,
  Search,
  CheckCircle2,
  ThumbsUp,
  Smile,
  AlertCircle,
  Users,
  Eye,
  Settings,
  BarChart3,
  Pin,
  Trash2,
  Download,
  Activity,
  Clock,
  Check,
  Award,
  HelpCircle,
  FileText
} from 'lucide-react';
import BrandWingsLogo from '../common/BrandWingsLogo';

export default function DivasMeeting({ onNavigate }) {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { viewMode, setViewMode, isAdmin } = useViewMode();

  const isTamil = language === 'ta';

  // Storage key for forum posts
  const STORAGE_KEY = `femtech_divas_meeting_posts_${language}`;

  const defaultPosts = [
    {
      id: 1,
      author: isTamil ? 'அனானமஸ் உறுப்பினர் #341' : 'Anonymous Member #341',
      avatarEmoji: '🌸',
      category: 'cramps',
      categoryLabel: isTamil ? 'மாதவிடாய் & வலி' : 'Period & Cramps',
      timestamp: isTamil ? '2 மணி நேரத்திற்கு முன்' : '2 hours ago',
      isPinned: true,
      title: isTamil
        ? 'அதிக வலி மாத்திரைகள் எடுக்காமல் முதல் நாள் கடுமையான மாதவிடாய் வலியை எப்படிக் குறைப்பது?'
        : 'How do you deal with severe first-day cramps without taking too many painkillers?',
      content: isTamil
        ? 'பொதுவாக முதல் நாளில் வலி அதிகமாக இருப்பதால் என்னால் படுக்கையை விட்டு எழ முடிவதில்லை. சூடான ஒத்தடம் உதவுகிறது, ஆனால் உண்மையில் வேலை செய்யும் இயற்கை மூலிகைத் தேநீர் அல்லது யோகாசனங்கள் ஏதேனும் உள்ளதா?'
        : 'Usually my cramps on Day 1 are so intense that I can barely get out of bed. Heating pads help a bit, but does anyone have natural teas or yoga stretches that actually work for you?',
      likes: 28,
      isLiked: false,
      userInputsMeta: {
        sessionToken: 'sess_anon_98f12a',
        charCount: 226,
        wordCount: 42,
        sentiment: 'High Cramp Distress',
        device: 'Android Mobile (PWA)',
        urgencyScore: 'Medium'
      },
      replies: [
        {
          id: 101,
          author: isTamil ? 'டிவா மருத்துவக் குழு (டாக்டர் பிரியா ரமணன்)' : 'Diva Clinical Team (Dr. Priya Raman)',
          avatarEmoji: '🛡️',
          isAdmin: true,
          adminRole: isTamil ? 'மகளிர் நலம் சிறப்பு மருத்துவர்' : 'Gynecology Specialist',
          timestamp: isTamil ? '1 மணி நேரத்திற்கு முன்' : '1 hour ago',
          content: isTamil
            ? 'வணக்கம்! முதல் நாள் கருப்பை தசைப்பிடிப்புக்கு, மெக்னீசியம் கிளைசினேட் (200-300 மி.கி) மற்றும் கெமோமில் தேநீர் தசை நார்களை தளர்த்த உதவும். மேலும் சுப்த பத்த கோணாசனம் முட்டிகளுக்கு அடியில் தலையணை வைத்து செய்வது இடுப்பு அழுத்தத்தை நீக்கும்.'
            : 'Hello! For Day 1 uterine spasms, magnesium glycinate (200-300mg) combined with chamomile tea works synergistically to relax smooth muscle fibers. Also try the reclining bound angle pose with support under your knees.'
        },
        {
          id: 102,
          author: isTamil ? 'அனானமஸ் உறுப்பினர் #812' : 'Anonymous Member #812',
          avatarEmoji: '☕',
          isAdmin: false,
          timestamp: isTamil ? '45 நிமிடங்களுக்கு முன்' : '45 mins ago',
          content: isTamil
            ? 'மிளகு மற்றும் நாட்டு வெல்லம் கலந்த சுக்குத் தேநீர் தசைப்பிடிப்புக்கு மிகச் சிறந்த பலன் தருகிறது!'
            : 'Warm ginger tea with crushed black pepper and organic jaggery works wonders for my muscle spasms!'
        }
      ]
    },
    {
      id: 2,
      author: isTamil ? 'அனானமஸ் உறுப்பினர் #109' : 'Anonymous Member #109',
      avatarEmoji: '🦋',
      category: 'pcos',
      categoryLabel: isTamil ? 'PCOS & ஹார்மோன்' : 'PCOS & Hormones',
      timestamp: isTamil ? '5 மணி நேரத்திற்கு முன்' : '5 hours ago',
      isPinned: false,
      title: isTamil
        ? '21 வயதில் PCOS கண்டறியப்பட்டுள்ளது — கல்லூரி விடுதியில் உணவு முறையை மாற்றுவது எப்படி?'
        : 'Diagnosed with PCOS at 21 — feeling overwhelmed about diet changes in college hostel.',
      content: isTamil
        ? 'என் மருத்துவர் சுத்திகரிக்கப்பட்ட சர்க்கரையைத் தவிர்த்து, குறைவான கிளைசெமிக் குறியீடு கொண்ட உணவுகளை உண்ணச் சொன்னார். ஆனால் விடுதி உணவில் அதை நிர்வகிப்பது கடினமாக உள்ளது. எளிய டிப்ஸ் உண்டா?'
        : 'My doctor told me to cut refined sugars and focus on low GI foods, but with hostel mess food it feels so difficult. How do you manage balanced meals when you have a busy class routine?',
      likes: 42,
      isLiked: true,
      userInputsMeta: {
        sessionToken: 'sess_anon_74c83b',
        charCount: 247,
        wordCount: 45,
        sentiment: 'Diet & Routine Anxiety',
        device: 'Chrome Windows Desktop',
        urgencyScore: 'Low'
      },
      replies: [
        {
          id: 201,
          author: isTamil ? 'டிவா ஊட்டச்சத்து நிபுணர் (டாக்டர் அனன்யா)' : 'Diva Nutritionist (Dr. Ananya)',
          avatarEmoji: '🛡️',
          isAdmin: true,
          adminRole: isTamil ? 'ஹார்மோன் ஆலோசகர்' : 'Hormonal Health Advisor',
          timestamp: isTamil ? '3 மணி நேரத்திற்கு முன்' : '3 hours ago',
          content: isTamil
            ? 'ஹாஸ்டல் டிப்: வறுத்த கடலை, வேர்க்கடலை அல்லது வேகவைத்த முட்டையை எடுத்துக்கொள்ளுங்கள். கார்போஹைட்ரேட்டுகளுக்கு முன் புரதம் மற்றும் நல்ல கொழுப்புகளை உட்கொள்வது இன்சுலின் திடீர் ஏற்றத்தைத் தடுக்கும்.'
            : 'Hostel survival tip: Pair mess carbs with roasted chana, peanuts, or boiled eggs. Consuming protein and healthy fats before carbohydrates significantly blunts the insulin spike.'
        }
      ]
    },
    {
      id: 3,
      author: isTamil ? 'அனானமஸ் உறுப்பினர் #772' : 'Anonymous Member #772',
      avatarEmoji: '🌙',
      category: 'mental',
      categoryLabel: isTamil ? 'மன நலம் & PMS' : 'Mental Health & PMS',
      timestamp: isTamil ? 'நேற்று' : 'Yesterday',
      isPinned: false,
      title: isTamil
        ? 'மாதவிடாய் தொடங்குவதற்கு 3 நாட்களுக்கு முன் திடீரென அழுகை வருவது மற்றவர்களுக்கும் ஏற்படுகிறதா?'
        : 'Does anyone else get sudden crying spells 3 days before their period starts?',
      content: isTamil
        ? 'மாதம் முழுவதும் சாதாரணமாக இருக்கிறேன், ஆனால் மாதவிடாய் தொடங்குவதற்கு 72 மணி நேரத்திற்கு முன் உணர்ச்சிவசப்பட்டு சோர்வாக உணர்கிறேன். இது இயல்பானதா?'
        : 'I feel completely normal throughout the month, but exactly 72 hours before my cycle I feel intensely emotional, sensitive, and exhausted. Knowing if others experience this would make me feel so much better.',
      likes: 64,
      isLiked: true,
      userInputsMeta: {
        sessionToken: 'sess_anon_12e98d',
        charCount: 254,
        wordCount: 44,
        sentiment: 'Emotional Luteal Drop',
        device: 'iOS Safari Mobile',
        urgencyScore: 'Low'
      },
      replies: [
        {
          id: 301,
          author: isTamil ? 'அனானமஸ் உறுப்பினர் #125' : 'Anonymous Member #125',
          avatarEmoji: '💖',
          isAdmin: false,
          timestamp: isTamil ? '18 மணி நேரத்திற்கு முன்' : '18 hours ago',
          content: isTamil
            ? 'ஆம்! இது புரோஜெஸ்டிரோன் அளவு குறைவதால் செரோடோனின் குறைவதனால் ஏற்படுகிறது. அந்த நாட்களில் வெதுவெதுப்பான சூப் அருந்தி உடலுக்கு ஓய்வு கொடுங்கள்.'
            : 'YES! That is the classic late-luteal progesterone drop. It directly affects serotonin receptors. Be gentle with yourself on those days — schedule light workloads and prioritize warm soups.'
        }
      ]
    }
  ];

  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load Diva Meeting posts:', e);
    }
    return defaultPosts;
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showAdminPostModal, setShowAdminPostModal] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState(null);
  const [replyInputText, setReplyInputText] = useState({});

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('cramps');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [customPseudonym, setCustomPseudonym] = useState('');

  // Admin Announcement Form State
  const [adminTitle, setAdminTitle] = useState('');
  const [adminContent, setAdminContent] = useState('');
  const [adminCategory, setAdminCategory] = useState('cramps');
  const [adminSpecialist, setAdminSpecialist] = useState(isTamil ? 'டிவா மருத்துவக் குழு' : 'Diva Medical Team');

  // Persist posts
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts, STORAGE_KEY]);

  const categories = [
    { id: 'all', label: isTamil ? 'அனைத்து விவாதங்கள்' : 'All Discussions', emoji: '💬' },
    { id: 'cramps', label: isTamil ? 'மாதவிடாய் & வலி' : 'Period & Cramps', emoji: '🩸' },
    { id: 'pcos', label: isTamil ? 'PCOS & ஹார்மோன்' : 'PCOS & Hormones', emoji: '🩺' },
    { id: 'mental', label: isTamil ? 'மன நலம் & PMS' : 'Mental Health & PMS', emoji: '🧠' },
    { id: 'fertility', label: isTamil ? 'கர்ப்பகாலம் & நலம்' : 'Fertility & Wellness', emoji: '🤰' },
    { id: 'general', label: isTamil ? 'பொதுவான கலந்துரையாடல்' : 'General Discussion', emoji: '🌸' }
  ];

  // Like Toggle
  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newLiked = !p.isLiked;
          return {
            ...p,
            isLiked: newLiked,
            likes: newLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  // Pin Toggle (Admin Only)
  const handleTogglePin = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isPinned: !p.isPinned } : p))
    );
  };

  // Delete Post (Admin Only)
  const handleDeletePost = (postId) => {
    const confirmMsg = isTamil
      ? 'நிர்வாகி உறுதிப்படுத்தல்: இந்த மெசேஜை கம்யூனிட்டியில் இருந்து நீக்க விரும்புகிறீர்களா?'
      : 'Admin confirmation: Are you sure you want to remove this post from the community feed?';
    if (window.confirm(confirmMsg)) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  // User: Create Anonymous Post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const chosenAuthor = isAnonymous
      ? (customPseudonym.trim() || (isTamil ? `அனானமஸ் உறுப்பினர் #${randomNum}` : `Anonymous Member #${randomNum}`))
      : (user?.name || 'Janani');

    const catObj = categories.find((c) => c.id === newCategory) || categories[1];

    const newPostObj = {
      id: Date.now(),
      author: chosenAuthor,
      avatarEmoji: isAnonymous ? '🌸' : '👩',
      category: newCategory,
      categoryLabel: catObj.label,
      timestamp: isTamil ? 'சற்று முன்' : 'Just now',
      isPinned: false,
      title: newTitle.trim(),
      content: newContent.trim(),
      likes: 1,
      isLiked: true,
      userInputsMeta: {
        sessionToken: `sess_anon_${Math.random().toString(36).substring(2, 8)}`,
        charCount: newContent.trim().length,
        wordCount: newContent.trim().split(/\s+/).length,
        sentiment: newCategory === 'cramps' ? 'Cramp Relief Seeking' : 'Community Support',
        device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
        urgencyScore: 'Normal'
      },
      replies: []
    };

    setPosts([newPostObj, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
  };

  // Admin: Create Verified Diva Health Notice / Announcement
  const handleCreateAdminPost = (e) => {
    e.preventDefault();
    if (!adminTitle.trim() || !adminContent.trim()) return;

    const catObj = categories.find((c) => c.id === adminCategory) || categories[1];

    const adminPostObj = {
      id: Date.now(),
      author: `${adminSpecialist} (Admin)`,
      avatarEmoji: '🛡️',
      isAdminPost: true,
      category: adminCategory,
      categoryLabel: catObj.label,
      timestamp: isTamil ? 'சற்று முன்' : 'Just now',
      isPinned: true,
      title: adminTitle.trim(),
      content: adminContent.trim(),
      likes: 14,
      isLiked: true,
      userInputsMeta: {
        sessionToken: 'ADMIN_SUPERUSER_VERIFIED',
        charCount: adminContent.trim().length,
        wordCount: adminContent.trim().split(/\s+/).length,
        sentiment: 'Verified Clinical Advisory',
        device: 'Admin Console Secured',
        urgencyScore: 'High Clinical Value'
      },
      replies: []
    };

    setPosts([adminPostObj, ...posts]);
    setAdminTitle('');
    setAdminContent('');
    setShowAdminPostModal(false);
  };

  // Add Reply
  const handleAddReply = (postId, asAdmin = false) => {
    const text = replyInputText[postId];
    if (!text || !text.trim()) return;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const replyAuthor = asAdmin
      ? (isTamil ? 'டிவா மருத்துவக் குழு (அட்மின்)' : 'Diva Clinical Team (Admin)')
      : (isTamil ? `அனானமஸ் உறுப்பினர் #${randomNum}` : `Anonymous Member #${randomNum}`);

    const newReply = {
      id: Date.now(),
      author: replyAuthor,
      avatarEmoji: asAdmin ? '🛡️' : '💬',
      isAdmin: asAdmin,
      adminRole: asAdmin ? (isTamil ? 'அங்கீகரிக்கப்பட்ட மருத்துவர்' : 'Verified Clinical Advisor') : null,
      timestamp: isTamil ? 'சற்று முன்' : 'Just now',
      content: text.trim()
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [...p.replies, newReply]
          };
        }
        return p;
      })
    );

    setReplyInputText({ ...replyInputText, [postId]: '' });
    setActiveReplyPostId(null);
  };

  // Export Audit Log as JSON
  const handleExportAuditLog = () => {
    const auditData = {
      exportTimestamp: new Date().toISOString(),
      platform: "FemTech - Diva's Meeting Community Forum",
      totalDiscussions: posts.length,
      totalLikes: posts.reduce((acc, p) => acc + p.likes, 0),
      totalReplies: posts.reduce((acc, p) => acc + p.replies.length, 0),
      discussions: posts.map((p) => ({
        id: p.id,
        author: p.author,
        category: p.category,
        title: p.title,
        content: p.content,
        likes: p.likes,
        isPinned: p.isPinned,
        userInputsMeta: p.userInputsMeta || {},
        repliesCount: p.replies.length,
        replies: p.replies
      }))
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `divas_meeting_audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter and sort: pinned posts first
  const filteredPosts = posts
    .filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.id - a.id;
    });

  const totalLikesCount = posts.reduce((acc, p) => acc + p.likes, 0);
  const totalRepliesCount = posts.reduce((acc, p) => acc + p.replies.length, 0);
  const totalPostsCount = posts.length;

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. TOP HEADER & DUAL VIEW MODE SWITCHER */}
      <div className="glass-card" style={{
        padding: '24px 30px',
        borderRadius: 'var(--radius-lg)',
        background: isAdmin
          ? 'linear-gradient(135deg, #18181b 0%, #27272a 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,242,242,0.96) 100%)',
        color: isAdmin ? '#ffffff' : 'var(--text-primary)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        border: isAdmin ? '1.5px solid #f43f5e' : '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <BrandWingsLogo size={56} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{
                fontSize: '1.8rem',
                color: isAdmin ? '#ffffff' : 'var(--text-primary)',
                margin: 0
              }}>
                💬 {t('divasMeeting')}
              </h1>
              <span style={{
                fontSize: '0.78rem',
                padding: '3px 10px',
                borderRadius: '12px',
                background: isAdmin ? '#f43f5e' : 'var(--pink-100)',
                color: isAdmin ? '#ffffff' : 'var(--pink-700)',
                fontWeight: 700
              }}>
                {isAdmin ? `🛡️ ${t('adminViewMode')}` : `🌸 ${t('communityBadge')}`}
              </span>
            </div>
            <p style={{
              fontSize: '0.88rem',
              color: isAdmin ? '#d4d4d8' : 'var(--text-secondary)',
              margin: '4px 0 0 0'
            }}>
              {isAdmin
                ? (isTamil
                  ? 'அட்மின் நேரடி பார்வை: யூசர் இன்புட்கள், லைக்குகள், தீவிரத்தன்மை மற்றும் மருத்துவ ஆலோசனைகளை நிர்வகிக்கவும்.'
                  : 'Full telemetry oversight: Inspect raw user inputs, live likes, engagement analytics & publish verified medical advice.')
                : (isTamil
                  ? '100% பாதுகாப்பான அனானமஸ் மகளிர் மன்றம். உங்கள் சந்தேகங்களை அச்சமின்றி கேட்டு சக உறுப்பினர்களிடம் ஆலோசனைகளைப் பெறுங்கள்.'
                  : '100% anonymous, safe space to ask, share and support fellow members through every cycle.')}
            </p>
          </div>
        </div>

        {/* Global View Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: isAdmin ? '#09090b' : '#f1f5f9',
          padding: '5px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setViewMode('user')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: viewMode === 'user' ? 'white' : 'transparent',
              color: viewMode === 'user' ? 'var(--rose-primary)' : '#64748b',
              fontWeight: viewMode === 'user' ? 700 : 500,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'user' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <Eye size={15} />
            <span>👤 {t('userViewMode')}</span>
          </button>

          <button
            onClick={() => setViewMode('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: viewMode === 'admin' ? 'var(--rose-gradient)' : 'transparent',
              color: viewMode === 'admin' ? 'white' : '#64748b',
              fontWeight: viewMode === 'admin' ? 700 : 500,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'admin' ? '0 4px 12px rgba(244,63,94,0.35)' : 'none'
            }}
          >
            <Shield size={15} />
            <span>🛡️ {t('adminViewMode')}</span>
          </button>
        </div>
      </div>

      {/* 2. ADMINISTRATOR-ONLY TELEMETRY & CONTROL PANEL */}
      {isAdmin && (
        <div className="glass-card" style={{
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #3f3f46',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={22} color="#f43f5e" />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                  {isTamil ? '🛡️ டிவா மன்ற நிர்வாகக் கட்டுப்பாடு & நேரடித் தரவுகள்' : "Diva's Meeting Executive Telemetry & Management Dashboard"}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#a1a1aa', margin: '2px 0 0 0' }}>
                  {isTamil
                    ? 'பயனர் இன்புட்கள், பதில்கள், நேரடி லைக்குகள் மற்றும் மருத்துவ ஆலோசனை வெளியிடும் உரிமை.'
                    : 'Real-time analytics on user inputs, community responses, live likes and administrative publishing privileges.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowAdminPostModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--rose-gradient)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '9px 18px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(244,63,94,0.4)'
                }}
              >
                <Plus size={16} />
                <span>{isTamil ? 'மருத்துவ ஆலோசனை வெளியிடு' : 'Publish Official Diva Advice'}</span>
              </button>

              <button
                onClick={handleExportAuditLog}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#27272a',
                  color: '#e4e4e7',
                  border: '1px solid #52525b',
                  borderRadius: 'var(--radius-full)',
                  padding: '9px 16px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Download size={15} />
                <span>{isTamil ? 'ஆடிட் பதிவிறக்கம் (JSON)' : 'Export Audit Log (JSON)'}</span>
              </button>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#27272a', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.74rem', color: '#a1a1aa', textTransform: 'uppercase' }}>
                {isTamil ? 'மொத்த விவாதங்கள்' : 'Total Discussions'}
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>
                {totalPostsCount}
              </div>
            </div>

            <div style={{ background: '#27272a', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.74rem', color: '#a1a1aa', textTransform: 'uppercase' }}>
                {isTamil ? 'பயனர் பதில்கள்' : 'Total User Replies'}
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {totalRepliesCount}
              </div>
            </div>

            <div style={{ background: '#27272a', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.74rem', color: '#a1a1aa', textTransform: 'uppercase' }}>
                {isTamil ? 'மொத்த நேரடி லைக்குகள்' : 'Total Live Likes'}
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>
                {totalLikesCount} ❤️
              </div>
            </div>

            <div style={{ background: '#27272a', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid #3f3f46' }}>
              <span style={{ fontSize: '0.74rem', color: '#a1a1aa', textTransform: 'uppercase' }}>
                {isTamil ? 'ஈடுபாடு விகிதம்' : 'Engagement Rate'}
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>
                {totalPostsCount > 0 ? ((totalRepliesCount + totalLikesCount) / totalPostsCount).toFixed(1) : 0}x
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SEARCH & CATEGORY BAR */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1,
            minWidth: '260px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
            <input
              type="text"
              placeholder={isTamil ? "மாதவிடாய் வலி, PCOS உணவு, மனநிலை, கர்ப்பகாலம் பற்றி தேடவும்..." : "Search questions on cramps, PCOS diet, luteal mood, fertility..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                background: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            />
          </div>

          <button
            onClick={() => setShowNewPostModal(true)}
            className="btn-primary"
            style={{ padding: '12px 22px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
          >
            <Plus size={18} />
            <span>{t('askQuestion')}</span>
          </button>
        </div>

        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--rose-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--rose-gradient)' : 'white',
                  color: isSelected ? 'white' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 4px 12px rgba(244,63,94,0.25)' : 'none'
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. DISCUSSIONS FEED */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredPosts.length === 0 ? (
          <div className="glass-card" style={{ padding: '48px 24px', textAlign: 'center', background: 'white' }}>
            <Smile size={48} color="var(--rose-primary)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              {isTamil ? 'விவாதங்கள் எதுவும் இல்லை' : 'No discussions found'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {isTamil ? 'முதல் கேள்வியை அச்சமின்றி பதிவு செய்யுங்கள்!' : 'Be the first to ask an anonymous question!'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="glass-card"
              style={{
                padding: '24px 26px',
                background: post.isAdminPost ? 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)' : 'white',
                borderRadius: 'var(--radius-lg)',
                border: post.isPinned
                  ? '2px solid var(--rose-primary)'
                  : post.isAdminPost
                  ? '1.5px solid #fda4af'
                  : '1px solid var(--border-subtle)',
                boxShadow: post.isPinned
                  ? '0 6px 20px rgba(244, 63, 94, 0.14)'
                  : 'var(--shadow-sm)'
              }}
            >
              {/* Header: Author + Badges + Admin Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: post.isAdminPost ? '#fee2e2' : 'var(--pink-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    {post.avatarEmoji}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.92rem', color: post.isAdminPost ? '#be123c' : 'var(--text-primary)' }}>
                        {post.author}
                      </strong>
                      {post.isAdminPost && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#f43f5e',
                          color: 'white',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '10px'
                        }}>
                          <Shield size={11} />
                          <span>{t('clinicalAdvice')}</span>
                        </span>
                      )}
                      {post.isPinned && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          background: '#fef3c7',
                          color: '#b45309',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '10px'
                        }}>
                          <Pin size={11} />
                          <span>{t('pinned')}</span>
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {post.categoryLabel} • {post.timestamp}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-pink" style={{ fontSize: '0.72rem' }}>
                    {post.categoryLabel}
                  </span>

                  {/* Admin Specific Action Buttons */}
                  {isAdmin && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleTogglePin(post.id)}
                        style={{
                          background: post.isPinned ? '#fef3c7' : '#f1f5f9',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          color: post.isPinned ? '#b45309' : '#64748b',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.74rem',
                          fontWeight: 600
                        }}
                      >
                        <Pin size={13} />
                        <span>{post.isPinned ? (isTamil ? 'அன்பின்' : 'Unpin') : (isTamil ? 'பின் செய்' : 'Pin')}</span>
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id)}
                        style={{
                          background: '#fee2e2',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          color: '#dc2626',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.74rem',
                          fontWeight: 600
                        }}
                      >
                        <Trash2 size={13} />
                        <span>{isTamil ? 'நீக்கு' : 'Remove'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <h3 style={{
                fontSize: '1.12rem',
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontWeight: 700,
                lineHeight: 1.35
              }}>
                {post.title}
              </h3>
              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}>
                {post.content}
              </p>

              {/* ============================================================ */}
              {/* ADMINISTRATOR ONLY: RAW USER INPUT TELEMETRY & METADATA      */}
              {/* ============================================================ */}
              {isAdmin && (
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} color="#64748b" />
                      <strong style={{ fontSize: '0.78rem', color: '#334155', textTransform: 'uppercase' }}>
                        {isTamil ? 'பயனர் இன்புட் நேரடி விபரம் (அட்மின் பார்வை)' : 'User Input Telemetry & Metadata (Admin Audit View)'}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '1px 8px', borderRadius: '10px', fontWeight: 600 }}>
                      Session ID: {post.userInputsMeta?.sessionToken || 'anon_session'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', marginTop: '4px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{isTamil ? 'எழுத்துகள் / வார்த்தைகள்:' : 'Input Chars / Words:'}</span>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                        {post.userInputsMeta?.charCount || post.content.length} chars ({post.userInputsMeta?.wordCount || post.content.split(' ').length} words)
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{isTamil ? 'கண்டறியப்பட்ட உணர்ச்சி நிலை:' : 'Detected Sentiment:'}</span>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f43f5e' }}>
                        {post.userInputsMeta?.sentiment || 'Normal Inquiry'}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{isTamil ? 'பயனர் சாதனம்:' : 'Client Device:'}</span>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                        {post.userInputsMeta?.device || 'Mobile Browser'}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{isTamil ? 'நேரடி லைக்குகள்:' : 'Live Likes:'}</span>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e11d48' }}>
                        {post.likes} Hearts
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interaction Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={() => handleLike(post.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: post.isLiked ? 'var(--pink-100)' : 'transparent',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-full)',
                      padding: '6px 14px',
                      color: post.isLiked ? 'var(--rose-primary)' : 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Heart size={16} fill={post.isLiked ? 'var(--rose-primary)' : 'none'} color={post.isLiked ? 'var(--rose-primary)' : 'currentColor'} />
                    <span>{post.likes}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('helpful')}</span>
                  </button>

                  <button
                    onClick={() => setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>{post.replies.length} {t('replies')}</span>
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => setActiveReplyPostId(post.id)}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: isAdmin ? '#be123c' : 'var(--rose-primary)',
                      background: isAdmin ? '#fee2e2' : 'transparent',
                      border: isAdmin ? '1px solid #fecdd3' : 'none',
                      padding: isAdmin ? '6px 14px' : '4px 8px',
                      borderRadius: 'var(--radius-full)',
                      cursor: 'pointer'
                    }}
                  >
                    {isAdmin ? (isTamil ? '🛡️ அட்மினாக பதிலளி' : '🛡️ Reply as Diva Admin') : (isTamil ? '+ அனானமஸ் பதில் அளி' : '+ Add Anonymous Reply')}
                  </button>
                </div>
              </div>

              {/* Replies */}
              {post.replies.length > 0 && (
                <div style={{
                  marginTop: '16px',
                  paddingLeft: '16px',
                  borderLeft: '2px solid var(--pink-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {post.replies.map((reply) => (
                    <div
                      key={reply.id}
                      style={{
                        background: reply.isAdmin ? '#fff1f2' : '#f8fafc',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: reply.isAdmin ? '1px solid #fecdd3' : '1px solid #f1f5f9'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '1rem' }}>{reply.avatarEmoji}</span>
                        <strong style={{ fontSize: '0.84rem', color: reply.isAdmin ? '#be123c' : 'var(--text-primary)' }}>
                          {reply.author}
                        </strong>
                        {reply.isAdmin && (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            background: '#f43f5e',
                            color: 'white',
                            fontSize: '0.64rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '8px'
                          }}>
                            <Shield size={10} />
                            <span>{t('clinicalAdvice')}</span>
                          </span>
                        )}
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          • {reply.timestamp}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {activeReplyPostId === post.id && (
                <div style={{
                  marginTop: '16px',
                  background: isAdmin ? '#fff1f2' : '#fdf2f8',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: isAdmin ? '1px solid #fda4af' : '1px solid var(--pink-200)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isAdmin ? '#be123c' : 'var(--pink-700)' }}>
                      {isAdmin ? (isTamil ? '🛡️ அட்மினாக எழுதும் பதில்:' : '🛡️ Writing as Diva Clinical Admin:') : (isTamil ? '🌸 அனானமஸ் பதில்:' : '🌸 Writing Anonymous Reply:')}
                    </span>
                    <button
                      onClick={() => setActiveReplyPostId(null)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.78rem', cursor: 'pointer' }}
                    >
                      {isTamil ? 'ரத்து செய்' : 'Cancel'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder={isAdmin ? (isTamil ? 'மருத்துவ ஆலோசனையைத் தட்டச்சு செய்யவும்...' : 'Type verified clinical recommendation...') : (isTamil ? 'உங்கள் அன்பான பதிலை பகிருங்கள்...' : 'Share your kind advice or experience...')}
                      value={replyInputText[post.id] || ''}
                      onChange={(e) => setReplyInputText({ ...replyInputText, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddReply(post.id, isAdmin);
                      }}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                        background: 'white',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      onClick={() => handleAddReply(post.id, isAdmin)}
                      className="btn-primary"
                      style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                    >
                      <Send size={15} />
                      <span>{isAdmin ? (isTamil ? 'வெளியிடு' : 'Post Verified') : (isTamil ? 'பதிலளி' : 'Reply')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 5. USER MODAL: ASK ANONYMOUS QUESTION */}
      {showNewPostModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 100
        }}>
          <div className="glass-card" style={{
            maxWidth: '560px',
            width: '100%',
            background: 'white',
            padding: '28px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--pink-100)', padding: '8px', borderRadius: '12px', color: 'var(--rose-primary)' }}>
                  <Lock size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                    {isTamil ? 'டிவா மன்றத்தில் அனானமஸாகக் கேள்' : "Ask Anonymously in Diva's Meeting"}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {isTamil ? 'உங்கள் பெயர் மற்றும் போன் நம்பர் 100% பாதுகாப்பானது' : 'Your identity and phone number are 100% private'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowNewPostModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {isTamil ? 'தலைப்பு பிரிவு' : 'Topic Category'}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem',
                    background: 'white'
                  }}
                >
                  <option value="cramps">{isTamil ? '🩸 மாதவிடாய் & வலி' : '🩸 Period & Cramps'}</option>
                  <option value="pcos">{isTamil ? '🩺 PCOS & ஹார்மோன்' : '🩺 PCOS & Hormones'}</option>
                  <option value="mental">{isTamil ? '🧠 மன நலம் & PMS' : '🧠 Mental Health & PMS'}</option>
                  <option value="fertility">{isTamil ? '🤰 கர்ப்பகாலம் & நலம்' : '🤰 Fertility & Pregnancy'}</option>
                  <option value="general">{isTamil ? '🌸 பொதுவான கலந்துரையாடல்' : '🌸 General Discussion'}</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {isTamil ? 'கேள்வி தலைப்பு' : 'Question Title'}
                </label>
                <input
                  type="text"
                  placeholder={isTamil ? "எ.கா: முதல் நாள் மாதவிடாய் வலியை இயற்கையாக குறைப்பது எப்படி?" : "e.g. How do you handle intense cramps on Day 1 naturally?"}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {isTamil ? 'முழு விபரம்' : 'Details & Your Experience'}
                </label>
                <textarea
                  rows={4}
                  placeholder={isTamil ? "உங்கள் அனுபவத்தை விவரிக்கவும்..." : "Describe what you are experiencing so members can give helpful advice..."}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Anonymous Checkbox */}
              <div style={{
                background: 'var(--pink-50)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--pink-200)'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    style={{ accentColor: 'var(--rose-primary)' }}
                  />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--pink-900)' }}>
                    {isTamil ? '100% அனானமஸாக பதிவிடு (பெயர் மறைக்கப்படும்)' : 'Post 100% Anonymously (Name Hidden)'}
                  </span>
                </label>

                {isAnonymous && (
                  <input
                    type="text"
                    placeholder={isTamil ? "விருப்ப புனைப்பெயர் (எ.கா: ரோஜா மலர் #22)" : "Optional Custom Pseudonym (e.g. Lavender Member #22)"}
                    value={customPseudonym}
                    onChange={(e) => setCustomPseudonym(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      background: 'white',
                      fontSize: '0.82rem'
                    }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.86rem' }}
                >
                  {isTamil ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.86rem' }}
                >
                  <Send size={15} />
                  <span>{isTamil ? 'கேள்வியை பதிவிடு' : 'Post Question Anonymously'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADMIN MODAL: PUBLISH VERIFIED DIVA ADVISORY */}
      {showAdminPostModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 100
        }}>
          <div className="glass-card" style={{
            maxWidth: '580px',
            width: '100%',
            background: '#18181b',
            color: '#ffffff',
            padding: '28px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            border: '1px solid #3f3f46'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#f43f5e', padding: '8px', borderRadius: '12px', color: 'white' }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
                    {isTamil ? 'அதிகாரப்பூர்வ மருத்துவ ஆலோசனையை வெளியிடு' : 'Publish Official Diva Clinical Guidance'}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>
                    {isTamil ? 'இது எப்போதும் மேலேயே பின் செய்யப்பட்டு தோன்றும்' : 'This post will be permanently pinned with verified clinical badges'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAdminPostModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#a1a1aa' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdminPost} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '4px' }}>
                  {isTamil ? 'மருத்துவர் / நிபுணர் பெயர்' : 'Specialist Title / Author'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diva Clinical Team (Dr. Priya Raman, OB/GYN)"
                  value={adminSpecialist}
                  onChange={(e) => setAdminSpecialist(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #52525b',
                    background: '#27272a',
                    color: '#ffffff',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '4px' }}>
                  {isTamil ? 'பிரிவு' : 'Category'}
                </label>
                <select
                  value={adminCategory}
                  onChange={(e) => setAdminCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #52525b',
                    background: '#27272a',
                    color: '#ffffff',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="cramps">{isTamil ? '🩸 மாதவிடாய் & வலி' : '🩸 Period & Cramps'}</option>
                  <option value="pcos">{isTamil ? '🩺 PCOS & ஹார்மோன்' : '🩺 PCOS & Hormones'}</option>
                  <option value="mental">{isTamil ? '🧠 மன நலம் & PMS' : '🧠 Mental Health & PMS'}</option>
                  <option value="fertility">{isTamil ? '🤰 கர்ப்பகாலம் & நலம்' : '🤰 Fertility & Pregnancy'}</option>
                  <option value="general">{isTamil ? '🌸 பொதுவான கலந்துரையாடல்' : '🌸 General Discussion'}</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '4px' }}>
                  {isTamil ? 'ஆலோசனை தலைப்பு' : 'Advisory Headline'}
                </label>
                <input
                  type="text"
                  placeholder={isTamil ? "எ.கா: மருத்துவ வழிகாட்டுதல்: இயற்கை முறையில் மாதவிடாய் வலி நிவாரணம்" : "e.g. Clinical Guidelines: Natural Non-Pharmacological Cramp Relief"}
                  value={adminTitle}
                  onChange={(e) => setAdminTitle(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #52525b',
                    background: '#27272a',
                    color: '#ffffff',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '4px' }}>
                  {isTamil ? 'அதிகாரப்பூர்வ மருத்துவ பரிந்துரை' : 'Official Clinical Recommendation'}
                </label>
                <textarea
                  rows={4}
                  placeholder={isTamil ? "மருத்துவ ரீதியான பரிந்துரைகளை எழுதவும்..." : "Provide evidence-based medical advice..."}
                  value={adminContent}
                  onChange={(e) => setAdminContent(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #52525b',
                    background: '#27272a',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowAdminPostModal(false)}
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.86rem',
                    background: '#27272a',
                    color: '#e4e4e7',
                    border: '1px solid #52525b',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer'
                  }}
                >
                  {isTamil ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    fontSize: '0.86rem',
                    background: 'var(--rose-gradient)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(244,63,94,0.4)'
                  }}
                >
                  <Shield size={15} style={{ marginRight: '6px' }} />
                  <span>{isTamil ? 'வெளியிட்டு பின் செய்' : 'Publish & Pin to Top'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
