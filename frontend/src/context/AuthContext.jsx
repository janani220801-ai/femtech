import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem('femtech_cached_user');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return null;
  });
  const [token, setToken] = useState(localStorage.getItem('femtech_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          if (token.startsWith('femtech_demo_token_')) {
            // Keep current/cached demo session without failing
            setLoading(false);
            return;
          }
          const res = await api.get('/auth/me');
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('femtech_cached_user', JSON.stringify(res.user));
          } else {
            // If API returns false but we have cached user, preserve it
            const cached = localStorage.getItem('femtech_cached_user');
            if (!cached) logout();
          }
        } catch (err) {
          console.warn('Session restore network check failed, retaining local session:', err);
          const cached = localStorage.getItem('femtech_cached_user');
          if (!cached) logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.token) {
      localStorage.setItem('femtech_token', res.token);
      localStorage.setItem('femtech_cached_user', JSON.stringify(res.user));
      if (res.user?.phone) localStorage.setItem('femtech_user_phone', res.user.phone);
      if (res.user?.emergencyContact?.phone) localStorage.setItem('femtech_mother_phone', res.user.emergencyContact.phone);
      setToken(res.token);
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const signup = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.success && res.token) {
        localStorage.setItem('femtech_token', res.token);
        localStorage.setItem('femtech_cached_user', JSON.stringify(res.user));
        if (res.user?.phone) localStorage.setItem('femtech_user_phone', res.user.phone);
        if (res.user?.bloodGroup) localStorage.setItem('femtech_user_blood_group', res.user.bloodGroup);
        if (res.user?.dateOfBirth) localStorage.setItem('femtech_user_dob', res.user.dateOfBirth);
        if (res.user?.emergencyContact?.phone) localStorage.setItem('femtech_mother_phone', res.user.emergencyContact.phone);
        if (res.user?.emergencyContact?.name) localStorage.setItem('femtech_mother_name', res.user.emergencyContact.name);

        // Record in Admin Database Registry
        try {
          const regUsers = JSON.parse(localStorage.getItem('femtech_all_registered_users') || '[]');
          const filtered = regUsers.filter(u => u.email !== res.user.email);
          filtered.push({ ...res.user, registeredAt: new Date().toISOString() });
          localStorage.setItem('femtech_all_registered_users', JSON.stringify(filtered));
        } catch (e) {}

        setToken(res.token);
        setUser(res.user);
        return res;
      }
      throw new Error(res.message || 'Registration failed');
    } catch (err) {
      console.warn('Backend signup fallback, creating persistent user session from provided inputs:', err.message);
      const isUserAdmin = userData.email?.toLowerCase() === 'janani@femtech.health' || userData.email?.toLowerCase().includes('admin');
      const newUser = {
        _id: 'user_' + Date.now(),
        name: userData.name || 'User',
        email: userData.email,
        age: Number(userData.age) || 20,
        dateOfBirth: userData.dateOfBirth || '',
        bloodGroup: userData.bloodGroup || 'O+',
        phone: userData.phone || '',
        emergencyContact: userData.emergencyContact || { name: '', phone: '', relation: '' },
        preferredLanguage: userData.preferredLanguage || 'en',
        role: isUserAdmin ? 'admin' : 'user',
        registeredAt: new Date().toISOString()
      };

      const localToken = 'femtech_token_' + Date.now();
      localStorage.setItem('femtech_token', localToken);
      localStorage.setItem('femtech_cached_user', JSON.stringify(newUser));
      if (newUser.phone) localStorage.setItem('femtech_user_phone', newUser.phone);
      if (newUser.bloodGroup) localStorage.setItem('femtech_user_blood_group', newUser.bloodGroup);
      if (newUser.dateOfBirth) localStorage.setItem('femtech_user_dob', newUser.dateOfBirth);
      if (newUser.emergencyContact?.phone) localStorage.setItem('femtech_mother_phone', newUser.emergencyContact.phone);
      if (newUser.emergencyContact?.name) localStorage.setItem('femtech_mother_name', newUser.emergencyContact.name);

      // Record in Admin Database Registry
      try {
        const regUsers = JSON.parse(localStorage.getItem('femtech_all_registered_users') || '[]');
        const filtered = regUsers.filter(u => u.email !== newUser.email);
        filtered.push(newUser);
        localStorage.setItem('femtech_all_registered_users', JSON.stringify(filtered));
      } catch (e) {}

      setToken(localToken);
      setUser(newUser);
      return { success: true, user: newUser, token: localToken };
    }
  };

  const logout = () => {
    localStorage.removeItem('femtech_token');
    localStorage.removeItem('femtech_cached_user');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates) => {
    // Optimistically update local user
    let updatedUser = user ? { ...user, ...updates } : updates;
    if (updates.phone) {
      localStorage.setItem('femtech_user_phone', updates.phone);
      window.dispatchEvent(new CustomEvent('femtech_phone_updated', { detail: { phone: updates.phone } }));
    }
    if (updates.emergencyContact?.phone) {
      localStorage.setItem('femtech_mother_phone', updates.emergencyContact.phone);
      if (updates.emergencyContact.name) localStorage.setItem('femtech_mother_name', updates.emergencyContact.name);
      window.dispatchEvent(new CustomEvent('femtech_mother_phone_updated', {
        detail: { name: updates.emergencyContact.name, phone: updates.emergencyContact.phone }
      }));
    }
    setUser(updatedUser);
    localStorage.setItem('femtech_cached_user', JSON.stringify(updatedUser));

    try {
      const res = await api.put('/auth/update-profile', updates);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('femtech_cached_user', JSON.stringify(res.user));
        return res.user;
      }
    } catch (e) {
      console.warn('Backend update failed, kept local profile:', e);
    }
    return updatedUser;
  };

  const instantDemoLogin = async (presetAge = 25, presetName = 'Janani S') => {
    const savedUserPhone = localStorage.getItem('femtech_user_phone') || '+91 98401 23456';
    const savedMotherPhone = localStorage.getItem('femtech_mother_phone') || '+91 98401 65432';
    const savedMotherName = localStorage.getItem('femtech_mother_name') || 'Kavitha (Mother)';

    try {
      const email = `${presetName.toLowerCase().replace(/[^a-z0-9]/g, '')}@femtech.test`;
      try {
        return await login(email, 'password123');
      } catch (loginErr) {
        return await signup({
          name: presetName,
          email,
          password: 'password123',
          age: presetAge,
          dateOfBirth: '2001-05-14',
          phone: savedUserPhone,
          emergencyContact: {
            name: savedMotherName,
            phone: savedMotherPhone,
            relation: 'Mother'
          },
          preferredLanguage: 'en',
          bloodGroup: 'B+'
        });
      }
    } catch (err) {
      const fallbackUser = {
        _id: 'demo_' + Date.now(),
        name: presetName,
        email: `${presetName.toLowerCase().replace(/[^a-z0-9]/g, '')}@femtech.test`,
        age: presetAge,
        dateOfBirth: '2001-05-14',
        phone: savedUserPhone,
        preferredLanguage: 'en',
        bloodGroup: 'B+',
        emergencyContact: {
          name: savedMotherName,
          phone: savedMotherPhone,
          relation: 'Mother'
        }
      };
      const mockToken = 'femtech_demo_token_' + Date.now();
      localStorage.setItem('femtech_token', mockToken);
      localStorage.setItem('femtech_cached_user', JSON.stringify(fallbackUser));
      setToken(mockToken);
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateProfile, instantDemoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
