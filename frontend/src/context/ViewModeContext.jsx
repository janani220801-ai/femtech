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
      setAdminAuthError(err.message || 'தவறான அட்மின் ஐடி அல்லது கடவுச்சொல். அட்மினிஸ்ட்ரேட்டர் Janani மட்டுமே உள்நுழைய முடியும். (Access strictly restricted to Janani).');
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
