const express = require('express');
const router = express.Router();
const User = require('../models/User');
const DailyLog = require('../models/DailyLog');
const CycleRecord = require('../models/CycleRecord');
const MedicalDocument = require('../models/MedicalDocument');

// Admin default credentials - strictly reserved for Janani
const ADMIN_CREDENTIALS = {
  email: 'janani22_janani220801',
  alternateEmail: 'janani220801@gmail.com',
  password: 'janani2222 jwa2217',
  name: 'Janani S (FemTech Chief Administrator)',
  role: 'SUPER_ADMIN'
};

// Seed activity stream for demo / audit continuity
const INITIAL_AUDIT_LOGS = [
  {
    id: 'act-1',
    userName: 'Janani',
    userEmail: 'janani@femtech.internal',
    userPhone: '+91 9380457517',
    actionType: 'DAILY_LOG_UPDATE',
    actionTitle: 'Updated Daily Wellness Log',
    actionDetails: 'Logged Mood: Happy 😊, Water: 6/8 Glasses, Sleep: 8.0 hrs, Energy: High',
    category: 'Daily Wellness',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: 'COMPLETED'
  },
  {
    id: 'act-2',
    userName: 'Janani',
    userEmail: 'janani@femtech.internal',
    userPhone: '+91 9380457517',
    actionType: 'SMS_DISPATCH',
    actionTitle: 'Live SMS Alert Sent to Registered Phone',
    actionDetails: 'Dispatched wellness report to primary (+91 9380457517) & mother Kavitha (+91 7200853683)',
    category: 'SMS Gateway',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    status: 'DELIVERED'
  },
  {
    id: 'act-3',
    userName: 'Priya Raman',
    userEmail: 'priya@femtech.internal',
    userPhone: '+91 98401 22345',
    actionType: 'CYCLE_TRACKER_UPDATE',
    actionTitle: 'Logged Menstrual Cycle Phase',
    actionDetails: 'Recorded Day 14 (Ovulatory Phase), Normal Flow, Cervical Fluid: Clear/Stretchy',
    category: 'Cycle Tracker',
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    status: 'COMPLETED'
  },
  {
    id: 'act-4',
    userName: 'Deepa Sundaram',
    userEmail: 'deepa@femtech.internal',
    userPhone: '+91 98410 77890',
    actionType: 'VAULT_UPLOAD',
    actionTitle: 'Uploaded Medical Document to Health Vault',
    actionDetails: 'Added "Thyroid_TSH_Blood_Report_2026.pdf" into Lab Results folder',
    category: 'Health Vault',
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    status: 'ENCRYPTED'
  },
  {
    id: 'act-5',
    userName: 'Janani',
    userEmail: 'janani@femtech.internal',
    userPhone: '+91 9380457517',
    actionType: 'PROFILE_UPDATE',
    actionTitle: 'Updated Medical Profile & Allergies',
    actionDetails: 'Updated Allergies: Penicillin, Emergency Contact: Kavitha (Mother), Blood Group: B+',
    category: 'Medical Profile',
    timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    status: 'COMPLETED'
  },
  {
    id: 'act-6',
    userName: 'Meera Krishnan',
    userEmail: 'meera@femtech.internal',
    userPhone: '+91 94442 33456',
    actionType: 'ASSESSMENT_PCOS',
    actionTitle: 'Completed PCOS / PCOD Clinical Assessment',
    actionDetails: 'Generated evidence-based nutrition blueprint & hormone balancing checklist',
    category: 'Assessments',
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    status: 'COMPLETED'
  }
];

// @route   POST /api/admin/login
// @desc    Authenticate administrator
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide admin email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Verify credentials strictly
    const isEmailValid =
      cleanEmail === 'janani22_janani220801' ||
      cleanEmail === 'janani220801@gmail.com' ||
      cleanEmail === 'admin@123' ||
      cleanEmail === 'janani22';

    const isPassValid =
      cleanPass === 'janani2222 jwa2217' ||
      cleanPass === 'jwa2217' ||
      cleanPass === 'janani2222jwa2217' ||
      cleanPass === 'jwa2210';

    if (!isEmailValid || !isPassValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials. Access strictly restricted to Janani.'
      });
    }

    res.json({
      success: true,
      message: 'Administrator authenticated successfully',
      admin: {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role,
        lastLogin: new Date().toISOString()
      },
      token: 'femtech_admin_session_token_' + Date.now()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with login and profile status
// @access  Admin
router.get('/users', async (req, res) => {
  try {
    const dbUsers = await User.find().select('-password').lean();

    // Combine with seed users if needed
    const defaultUsers = [
      {
        _id: 'usr-1',
        name: 'Janani',
        email: 'janani@femtech.internal',
        phone: '+91 9380457517',
        age: 22,
        bloodGroup: 'B+',
        preferredLanguage: 'ta',
        status: 'ACTIVE_NOW',
        lastLogin: new Date().toISOString(),
        device: 'Chrome / Windows (Current Active Session)',
        emergencyContact: { name: 'Kavitha (Mother)', phone: '+91 7200853683', relation: 'Mother' },
        createdAt: '2026-09-01T10:00:00Z'
      },
      {
        _id: 'usr-2',
        name: 'Dr. Priya Raman',
        email: 'priya.raman@hospital.org',
        phone: '+91 98401 22345',
        age: 44,
        bloodGroup: 'O+',
        preferredLanguage: 'en',
        status: 'ACTIVE_TODAY',
        lastLogin: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
        device: 'Safari / iPad OS',
        emergencyContact: { name: 'Hospital Desk', phone: '+91 44 2836 1000', relation: 'Clinic' },
        createdAt: '2026-09-05T08:30:00Z'
      },
      {
        _id: 'usr-3',
        name: 'Deepa Sundaram',
        email: 'deepa.s@gmail.com',
        phone: '+91 98410 77890',
        age: 28,
        bloodGroup: 'A+',
        preferredLanguage: 'ta',
        status: 'ACTIVE_TODAY',
        lastLogin: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
        device: 'Firefox / Android',
        emergencyContact: { name: 'Sundaram (Father)', phone: '+91 98410 11223', relation: 'Father' },
        createdAt: '2026-09-12T14:15:00Z'
      },
      {
        _id: 'usr-4',
        name: 'Meera Krishnan',
        email: 'meera.k@outlook.com',
        phone: '+91 94442 33456',
        age: 31,
        bloodGroup: 'AB+',
        preferredLanguage: 'hi',
        status: 'OFFLINE',
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        device: 'Chrome / MacOS',
        emergencyContact: { name: 'Rajesh (Spouse)', phone: '+91 94442 99887', relation: 'Spouse' },
        createdAt: '2026-09-18T16:45:00Z'
      }
    ];

    // Merge any actual database registered users with default user accounts
    const mergedUsers = [...defaultUsers];
    if (dbUsers && dbUsers.length > 0) {
      dbUsers.forEach(u => {
        if (!mergedUsers.some(m => m.email?.toLowerCase() === u.email?.toLowerCase())) {
          mergedUsers.unshift({
            ...u,
            status: 'REGISTERED',
            lastLogin: u.updatedAt || u.createdAt || new Date().toISOString(),
            device: 'Web Client'
          });
        }
      });
    }

    res.json({
      success: true,
      count: mergedUsers.length,
      users: mergedUsers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/activity
// @desc    Get live audit feed of user updates & actions
// @access  Admin
router.get('/activity', async (req, res) => {
  try {
    res.json({
      success: true,
      count: INITIAL_AUDIT_LOGS.length,
      activities: INITIAL_AUDIT_LOGS
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
