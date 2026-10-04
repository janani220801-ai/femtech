import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useViewMode } from '../../context/ViewModeContext';
import BrandWingsLogo from './BrandWingsLogo';
import {
  LayoutDashboard,
  CalendarHeart,
  BookOpen,
  Activity,
  HeartPulse,
  Baby,
  Bot,
  Watch,
  TrendingUp,
  Pill,
  UserCheck,
  FolderLock,
  Hospital,
  ShieldCheck,
  Settings,
  LogOut,
  PenLine,
  Users,
  Shield,
  ChevronDown,
  Smartphone,
  Flame
} from 'lucide-react';

export default function Sidebar({ currentTab, onNavigate }) {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const { isAdmin } = useViewMode();

  // Collapsible state for EVERY category
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    health: true,
    alerts: true,
    care: true,
    account: true
  });

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getAgeGuideLabel = () => {
    const age = user?.age || 20;
    if (age <= 10) return t('growingUp8') || 'Growing Up (Age 8)';
    if (age <= 14) return t('pubertyGuide12') || 'Puberty Guide (Age 12)';
    if (age <= 19) return t('teenWellness') || 'Teen Wellness';
    return t('adultHealthHub') || 'Adult Health Hub';
  };

  const getMenopauseLabel = () => {
    if (language === 'ta') return 'மெனோபாஸ் மதிப்பீடு & கேள்விகள்';
    if (language === 'hi') return 'रजोनिवृत्ति / मेनोपॉज प्रश्नोत्तरी';
    if (language === 'te') return 'మెనోపాజ్ ప్రశ్నలు & అంచనా';
    if (language === 'kn') return 'ಋತುಬಂಧ ಮೌಲ್ಯಮಾಪನ';
    if (language === 'ml') return 'ആർത്തവവിരാമ വിലയിരുത്തൽ';
    if (language === 'mr') return 'मेनोपॉज मूल्यांकन व प्रश्न';
    if (language === 'bn') return 'মেনোপজ মূল্যায়ন ও প্রশ্ন';
    if (language === 'gu') return 'મેનોપોઝ મૂલ્યાંકન અને પ્રશ્નો';
    if (language === 'ar') return 'تقييم سن الأمل والأسئلة';
    return t('menopauseCheck') || 'Menopause Health & Questions';
  };

  const navSections = [
    {
      key: 'main',
      category: t('catMain') || 'ESSENTIALS',
      items: [
        { id: 'dashboard', label: t('dashboard') || 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'daily-log', label: t('dailyLog') || 'Daily Wellness Journal', icon: PenLine }
      ]
    },
    {
      key: 'health',
      category: t('catHealth') || "WOMEN'S HEALTH",
      items: [
        { id: 'cycle-tracker', label: t('cycleTracker') || 'Cycle Tracker & Flow', icon: CalendarHeart },
        { id: 'menopause-check', label: getMenopauseLabel(), icon: Flame, badge: 'Transition' },
        { id: 'health-guide', label: getAgeGuideLabel(), icon: BookOpen, badge: `Age ${user?.age || '20'}` },
        { id: 'pcos-check', label: t('pcosCheck') || 'PCOS Hormone Check', icon: HeartPulse },
        { id: 'pregnancy', label: t('pregnancy') || 'Pregnancy Wellness', icon: Baby },
        { id: 'thyroid-check', label: t('thyroidCheck') || 'Thyroid Vital Scan', icon: Activity }
      ]
    },
    {
      key: 'alerts',
      category: t('catAlerts') || t('catSmartHealth') || 'ALERTS & VITALS',
      items: [
        { id: 'wearable', label: t('wearable') || 'Live IoT Band', icon: Watch },
        { id: 'wellness-trends', label: t('wellnessTrends') || 'Biometric Signals', icon: TrendingUp },
        { id: 'medications', label: t('medications') || 'Rx Dose Companion', icon: Pill }
      ]
    },
    {
      key: 'care',
      category: t('catCare') || 'SUPPORT & CARE',
      items: [
        { id: 'nearby-care', label: t('nearbyCare') || 'Urgent Care Finder', icon: Hospital },
        { id: 'divas-meeting', label: t('divasMeeting') || t('deepasMeeting') || "Diva's Sisterhood Forum", icon: Users },
        { id: 'ai-assistant', label: t('femtechAI') || 'FT Chatbox', icon: Bot, isHighlight: true }
      ]
    },
    {
      key: 'account',
      category: t('catAccount') || 'VAULT & SETTINGS',
      items: [
        { id: 'medical-profile', label: t('medicalProfile') || 'Digital Health ID', icon: UserCheck },
        { id: 'health-vault', label: t('healthVault') || 'Encrypted Vault', icon: FolderLock },
        { id: 'privacy-centre', label: t('privacyCentre') || 'Data Shield & Privacy', icon: ShieldCheck },
        { id: 'settings', label: t('settings') || 'System Preferences', icon: Settings },
        { id: 'logout', label: t('logout') || 'Sign Out (Logout)', icon: LogOut, isAction: true, onClick: logout }
      ]
    }
  ];

  // Auto-expand whichever category contains the current active tab
  useEffect(() => {
    navSections.forEach((sec) => {
      if (sec.items.some((it) => it.id === currentTab)) {
        setExpandedSections((prev) => ({ ...prev, [sec.key]: true }));
      }
    });
  }, [currentTab]);

  return (
    <aside className="femtech-sidebar" style={{
      width: '270px',
      minWidth: '270px',
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(226, 232, 240, 0.85)',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 74px)',
      position: 'sticky',
      top: '74px',
      padding: '14px 12px 24px 12px',
      overflowY: 'auto',
      zIndex: 40
    }}>



      {/* Administrator Console Indicator Banner */}
      {isAdmin && (
        <div style={{
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '12px',
          marginBottom: '12px',
          border: '1px solid #3f3f46',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <Shield size={14} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#f43f5e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {t('adminConsoleActive')}
            </div>
            <div style={{ fontSize: '0.66rem', color: '#a1a1aa' }}>
              {t('fullDataAccess')}
            </div>
          </div>
        </div>
      )}

      {/* Categorized Navigation Sections - EVERY section is Collapsible with Chevron Arrow */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {navSections.map((sec, secIdx) => {
          const isExpanded = Boolean(expandedSections[sec.key]);

          return (
            <div key={sec.key || secIdx} style={{ marginBottom: '10px' }}>
              {/* Category Header Label with Interactive Chevron Arrow */}
              <div
                onClick={() => toggleSection(sec.key)}
                className="sidebar-category-header"
                style={{
                  fontSize: '0.70rem',
                  fontWeight: 800,
                  color: isExpanded ? '#9f1239' : '#64748b',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: '6px 10px',
                  marginTop: secIdx === 0 ? '2px' : '10px',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  background: isExpanded ? 'rgba(244, 63, 94, 0.05)' : 'transparent',
                  userSelect: 'none',
                  transition: 'all 0.18s ease'
                }}
                title={isExpanded ? 'சுருக்க கிளிக் செய்யவும் (Collapse)' : 'விரிக்க கிளிக் செய்யவும் (Expand)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {sec.category}
                  </span>
                  <span style={{
                    fontSize: '0.62rem',
                    padding: '1px 6px',
                    borderRadius: '8px',
                    background: isExpanded ? '#fee2e8' : '#f1f5f9',
                    color: isExpanded ? '#9f1239' : '#64748b',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {sec.items.length}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: isExpanded ? '#9f1239' : '#94a3b8',
                    flexShrink: 0
                  }}
                />
              </div>

              {/* Category Items */}
              {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = !item.isAction && currentTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.isAction && item.onClick) {
                            item.onClick();
                          } else {
                            onNavigate(item.id);
                          }
                        }}
                        className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: isActive ? '14px' : '12px',
                          border: 'none',
                          background: isActive
                            ? '#fee2e8'
                            : 'transparent',
                          color: isActive
                            ? '#9f1239'
                            : '#475569',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.18s ease-in-out',
                          boxShadow: isActive ? '0 1px 3px rgba(225, 29, 72, 0.08)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', minWidth: 0 }}>
                          <Icon
                            size={18}
                            className="sidebar-icon"
                            color={isActive ? '#9f1239' : '#be123c'}
                            strokeWidth={isActive ? 2.3 : 1.9}
                          />
                          <span style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {item.label}
                          </span>
                        </div>

                        {item.badge && !isActive && (
                          <span style={{
                            fontSize: '0.65rem',
                            padding: '2px 6px',
                            background: '#ffe4e6',
                            color: '#be123c',
                            borderRadius: '10px',
                            fontWeight: 700,
                            marginLeft: '6px',
                            flexShrink: 0
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer with User Details & Logout Button */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '14px',
        borderTop: '1.5px solid #fee2e8',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(255, 241, 242, 0.75)',
            borderRadius: '12px',
            border: '1px solid #fecdd3'
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#881337', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name || 'User'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#be123c', fontWeight: 600 }}>
                {user.bloodGroup ? `🩸 ${user.bloodGroup}` : ''} {user.age ? `• ${user.age} yrs` : ''}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem('femtech_just_logged_out', 'true');
            logout();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1.5px solid #fecdd3',
            background: '#fff1f2',
            color: '#be123c',
            fontWeight: 800,
            fontSize: '0.84rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title={language === 'ta' ? 'கணக்கிலிருந்து வெளியேறு' : 'Log out of account'}
        >
          <LogOut size={16} />
          <span>{language === 'ta' ? 'வெளியேறு (Logout)' : 'Log Out'}</span>
        </button>
      </div>
    </aside>
  );
}
