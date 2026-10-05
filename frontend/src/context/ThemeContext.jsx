import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Theme state: 'cherry-red' | 'soft-pink' | 'light-lavender' | 'soft-sage' | 'warm-peach' | 'sapphire-blue' | 'midnight-plum'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('femtech_theme') || 'cherry-red';
  });

  // Font size: 'small' | 'default' | 'large'
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('femtech_font_size') || 'default';
  });

  // High contrast accessibility
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('femtech_high_contrast') === 'true';
  });

  // Logo Artwork Style: 'auto' | 'curl_knees' | 'heart' | 'pad' | 'wings' | 'lotus' | 'moon'
  const [logoStyle, setLogoStyle] = useState(() => {
    return localStorage.getItem('femtech_logo_style') || 'auto';
  });

  // Animation Mode: 'none' | 'subtle' | 'rich'
  const [animationMode, setAnimationMode] = useState(() => {
    return localStorage.getItem('femtech_animation_mode') || 'rich';
  });

  // User Profile Avatar: 'knees' (Girl Hugging Knees) | 'initials' (Classic Clean Initial)
  const [profileAvatar, setProfileAvatar] = useState(() => {
    const saved = localStorage.getItem('femtech_profile_avatar');
    if (!saved || saved === 'wings') {
      localStorage.setItem('femtech_profile_avatar', 'initials');
      return 'initials';
    }
    return saved;
  });

  // Custom palette state for "Pay ₹99 & Customize Your Own Color"
  const [customColors, setCustomColors] = useState(() => {
    try {
      const saved = localStorage.getItem('femtech_custom_colors');
      return saved ? JSON.parse(saved) : {
        primary: '#be123c',
        gradientStart: '#fb7185',
        gradientEnd: '#881337',
        bg: '#fff5f7',
        card: '#ffffff'
      };
    } catch (e) {
      return {
        primary: '#be123c',
        gradientStart: '#fb7185',
        gradientEnd: '#881337',
        bg: '#fff5f7',
        card: '#ffffff'
      };
    }
  });

  const saveCustomTheme = (newColors) => {
    setCustomColors(newColors);
    localStorage.setItem('femtech_custom_colors', JSON.stringify(newColors));
    setTheme('custom-palette');
  };

  useEffect(() => {
    localStorage.setItem('femtech_logo_style', logoStyle);
  }, [logoStyle]);

  useEffect(() => {
    localStorage.setItem('femtech_profile_avatar', profileAvatar);
  }, [profileAvatar]);

  useEffect(() => {
    localStorage.setItem('femtech_animation_mode', animationMode);
    window.dispatchEvent(new CustomEvent('femtech_animation_changed', { detail: { mode: animationMode } }));
  }, [animationMode]);

  useEffect(() => {
    if (user?.theme) {
      setTheme(user.theme);
    }
  }, [user]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'custom-palette' && customColors) {
      root.style.setProperty('--rose-primary', customColors.primary);
      root.style.setProperty('--pink-500', customColors.primary);
      root.style.setProperty('--pink-600', customColors.primary);
      root.style.setProperty('--rose-gradient', `linear-gradient(135deg, ${customColors.gradientStart || customColors.primary} 0%, ${customColors.primary} 50%, ${customColors.gradientEnd || customColors.primary} 100%)`);
      root.style.setProperty('--bg-gradient', `linear-gradient(135deg, ${customColors.bg || '#fff5f7'} 0%, #ffffff 100%)`);
      root.style.setProperty('--bg-card', customColors.card || 'rgba(255, 255, 255, 0.96)');
      root.style.setProperty('--border-subtle', `${customColors.primary}40`);
      root.style.setProperty('--shadow-glass', `0 8px 32px 0 ${customColors.primary}33`);
    } else {
      root.style.removeProperty('--rose-primary');
      root.style.removeProperty('--pink-500');
      root.style.removeProperty('--pink-600');
      root.style.removeProperty('--rose-gradient');
      root.style.removeProperty('--bg-gradient');
      root.style.removeProperty('--bg-card');
      root.style.removeProperty('--border-subtle');
      root.style.removeProperty('--shadow-glass');
    }
  }, [theme, customColors]);

  useEffect(() => {
    const classList = [
      theme,
      `font-size-${fontSize}`,
      fontSize === 'large' ? 'accessibility-large-text' : '',
      highContrast ? 'accessibility-high-contrast' : '',
      animationMode === 'none' ? 'no-animations' : ''
    ].filter(Boolean).join(' ');

    document.documentElement.className = classList;
    document.body.className = classList;

    localStorage.setItem('femtech_theme', theme);
    localStorage.setItem('femtech_font_size', fontSize);
    localStorage.setItem('femtech_large_text', String(fontSize === 'large'));
    localStorage.setItem('femtech_high_contrast', String(highContrast));
  }, [theme, fontSize, highContrast, animationMode]);

  const toggleLargeText = () => {
    setFontSize((prev) => (prev === 'large' ? 'default' : 'large'));
  };

  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        customColors,
        saveCustomTheme,
        fontSize,
        setFontSize,
        largeText: fontSize === 'large',
        toggleLargeText,
        highContrast,
        toggleHighContrast,
        logoStyle,
        setLogoStyle,
        profileAvatar,
        setProfileAvatar,
        animationMode,
        setAnimationMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
