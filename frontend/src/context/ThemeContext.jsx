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

  // User Profile Avatar: 'knees' (Girl Hugging Knees) | 'initials' (Classic Clean Initial)
  const [profileAvatar, setProfileAvatar] = useState(() => {
    const saved = localStorage.getItem('femtech_profile_avatar');
    if (!saved || saved === 'wings') {
      localStorage.setItem('femtech_profile_avatar', 'initials');
      return 'initials';
    }
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('femtech_logo_style', logoStyle);
  }, [logoStyle]);

  useEffect(() => {
    localStorage.setItem('femtech_profile_avatar', profileAvatar);
  }, [profileAvatar]);

  useEffect(() => {
    if (user?.theme) {
      setTheme(user.theme);
    }
  }, [user]);

  useEffect(() => {
    const classList = [
      theme,
      `font-size-${fontSize}`,
      fontSize === 'large' ? 'accessibility-large-text' : '',
      highContrast ? 'accessibility-high-contrast' : ''
    ].filter(Boolean).join(' ');

    document.documentElement.className = classList;
    document.body.className = classList;

    localStorage.setItem('femtech_theme', theme);
    localStorage.setItem('femtech_font_size', fontSize);
    localStorage.setItem('femtech_large_text', String(fontSize === 'large'));
    localStorage.setItem('femtech_high_contrast', String(highContrast));
  }, [theme, fontSize, highContrast]);

  const toggleLargeText = () => {
    setFontSize((prev) => (prev === 'large' ? 'default' : 'large'));
  };

  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        largeText: fontSize === 'large',
        toggleLargeText,
        highContrast,
        toggleHighContrast,
        logoStyle,
        setLogoStyle,
        profileAvatar,
        setProfileAvatar
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
