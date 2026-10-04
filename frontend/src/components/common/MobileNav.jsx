import React from 'react';
import { LayoutDashboard, PenLine, Bot, Users, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function MobileNav({ currentTab, onNavigate }) {
  const { t } = useLanguage();

  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'daily-log', label: 'Log', icon: PenLine },
    { id: 'ai-assistant', label: 'AI', icon: Bot, isCenter: true },
    { id: 'divas-meeting', label: "Diva's Meeting", icon: Users },
    { id: 'medical-profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'none', // Controlled by media query in CSS or shown on mobile screens
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 12px 14px 12px',
      zIndex: 50,
      boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.05)'
    }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;

        if (item.isCenter) {
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--rose-gradient)',
                border: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(244, 63, 94, 0.4)',
                transform: 'translateY(-12px)',
                cursor: 'pointer'
              }}
            >
              <Icon size={24} color="white" />
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              border: 'none',
              background: 'transparent',
              color: isActive ? 'var(--pink-600)' : 'var(--text-muted)',
              fontSize: '0.72rem',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Icon size={20} color={isActive ? 'var(--pink-600)' : 'var(--text-muted)'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
