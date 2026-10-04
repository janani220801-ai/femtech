import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const ViewModeContext = createContext(null);

export const ViewModeProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('femtech_global_view_mode') || 'user';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('femtech_admin_authenticated') === 'true';
  });

  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState('');

  useEffect(() => {
    localStorage.setItem('femtech_global_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('femtech_admin_authenticated', String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  // Request to switch to Admin mode - gates through Auth if not authenticated
  const requestAdminMode = () => {
    if (isAdminAuthenticated) {
      setViewMode('admin');
    } else {
      setAdminAuthError('');
      setShowAdminAuthModal(true);
    }
  };

  // Perform Admin Login with ID & Password
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
      // Fallback verification for demo zero-setup
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();
      if ((cleanEmail === 'admin@femtech.org' || cleanEmail === 'admin') && cleanPass === 'admin123') {
        setIsAdminAuthenticated(true);
        setViewMode('admin');
        setShowAdminAuthModal(false);
        return { success: true };
      }
      setAdminAuthError(err.message || 'Invalid administrator credentials. Please check ID and password.');
      return { success: false, message: err.message };
    }
  };

  // Logout from Admin and return to pure User View
  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setViewMode('user');
    localStorage.removeItem('femtech_admin_authenticated');
  };

  // Direct switch to user view
  const switchToUser = () => {
    setViewMode('user');
  };

  const toggleViewMode = () => {
    if (viewMode === 'admin') {
      switchToUser();
    } else {
      requestAdminMode();
    }
  };

  return (
    <ViewModeContext.Provider
      value={{
        viewMode,
        setViewMode,
        isAdmin: viewMode === 'admin',
        isUser: viewMode === 'user',
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
