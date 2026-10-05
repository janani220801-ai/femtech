import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const ViewModeContext = createContext(null);

export const ViewModeProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('femtech_admin_authenticated') === 'true';
  });

  const [viewMode, setViewMode] = useState(() => {
    const isAuthed = localStorage.getItem('femtech_admin_authenticated') === 'true';
    const saved = localStorage.getItem('femtech_global_view_mode');
    return (saved === 'admin' && isAuthed) ? 'admin' : 'user';
  });

  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState('');

  useEffect(() => {
    localStorage.setItem('femtech_global_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('femtech_admin_authenticated', String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  // Request to switch to Admin mode - strictly gates through Auth if not authenticated
  const requestAdminMode = () => {
    if (isAdminAuthenticated) {
      setViewMode('admin');
    } else {
      setAdminAuthError('');
      setShowAdminAuthModal(true);
    }
  };

  // Perform Admin Login with ID & Password - strictly reserved for Janani
  const adminLogin = async (email, password) => {
    setAdminAuthError('');
    try {
      const res = await api.post('/admin/login', { email, password });
      if (res.success) {
        setIsAdminAuthenticated(true);
        setViewMode('admin');
        setShowAdminAuthModal(false);
        return { success: true };
      }
    } catch (err) {
      // Direct / offline verification strictly locked to Janani
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();
      const isIdValid =
        cleanEmail === 'janani22_janani220801' ||
        cleanEmail === 'janani220801@gmail.com' ||
        cleanEmail === 'admin@123' ||
        cleanEmail === 'janani22';

      const isPassValid =
        cleanPass === 'janani2222 jwa2217' ||
        cleanPass === 'jwa2217' ||
        cleanPass === 'janani2222jwa2217' ||
        cleanPass === 'jwa2210';

      if (isIdValid && isPassValid) {
        setIsAdminAuthenticated(true);
        setViewMode('admin');
        setShowAdminAuthModal(false);
        return { success: true };
      }
      setAdminAuthError('தவறான அட்மின் ஐடி அல்லது கடவுச்சொல். தலைமை நிர்வாகி Janani மட்டுமே உள்நுழைய முடியும். வேறு எவருக்கும் அனுமதியில்லை. (Access strictly restricted to Janani only).');
      return { success: false, message: 'Access denied' };
    }
  };

  // Logout from Admin and return to pure User View
  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setViewMode('user');
    localStorage.removeItem('femtech_admin_authenticated');
    localStorage.setItem('femtech_global_view_mode', 'user');
  };

  // Direct switch to user view
  const switchToUser = () => {
    setViewMode('user');
    localStorage.setItem('femtech_global_view_mode', 'user');
  };

  const toggleViewMode = () => {
    if (viewMode === 'admin' && isAdminAuthenticated) {
      switchToUser();
    } else {
      requestAdminMode();
    }
  };

  return (
    <ViewModeContext.Provider
      value={{
        viewMode: isAdminAuthenticated && viewMode === 'admin' ? 'admin' : 'user',
        setViewMode,
        isAdmin: isAdminAuthenticated && viewMode === 'admin',
        isUser: !(isAdminAuthenticated && viewMode === 'admin'),
        isAdminAuthenticated,
        showAdminAuthModal,
        adminAuthError,
        setShowAdminAuthModal,
        openAdminAuthModal: () => setShowAdminAuthModal(true),
        closeAdminAuthModal: () => setShowAdminAuthModal(false),
        requestAdminMode,
        adminLogin,
        adminLogout,
        switchToUser,
        toggleViewMode
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    return {
      viewMode: 'user',
      setViewMode: () => {},
      isAdmin: false,
      isUser: true,
      isAdminAuthenticated: false,
      showAdminAuthModal: false,
      adminAuthError: '',
      setShowAdminAuthModal: () => {},
      openAdminAuthModal: () => {},
      closeAdminAuthModal: () => {},
      requestAdminMode: () => {},
      adminLogin: async () => ({ success: false }),
      adminLogout: () => {},
      switchToUser: () => {},
      toggleViewMode: () => {}
    };
  }
  return context;
};
