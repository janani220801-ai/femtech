const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'femtech_super_secret_jwt_key_2025_epics', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      dateOfBirth,
      phone,
      emergencyContact,
      preferredLanguage,
      bloodGroup,
      medicalConditions,
      allergies,
      currentMedications,
      previousMedications,
      currentTreatment,
      previousTreatment,
      previousSurgeries,
      doctorDetails
    } = req.body;

    if (!name || !email || !password || age === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, password, and age'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      age: Number(age),
      dateOfBirth,
      phone: phone || '',
      emergencyContact: emergencyContact || { name: '', phone: '', relation: '' },
      preferredLanguage: preferredLanguage || 'en',
      bloodGroup: bloodGroup || '',
      medicalConditions: medicalConditions || [],
      allergies: allergies || [],
      currentMedications: currentMedications || [],
      previousMedications: previousMedications || [],
      currentTreatment: currentTreatment || '',
      previousTreatment: previousTreatment || '',
      previousSurgeries: previousSurgeries || '',
      doctorDetails: doctorDetails || { name: '', clinic: '', phone: '' }
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        emergencyContact: user.emergencyContact,
        preferredLanguage: user.preferredLanguage,
        bloodGroup: user.bloodGroup,
        medicalConditions: user.medicalConditions,
        allergies: user.allergies,
        currentMedications: user.currentMedications,
        previousMedications: user.previousMedications,
        currentTreatment: user.currentTreatment,
        previousTreatment: user.previousTreatment,
        previousSurgeries: user.previousSurgeries,
        doctorDetails: user.doctorDetails,
        pregnancyMode: user.pregnancyMode,
        theme: user.theme
      }
    });
  } catch (error) {
    console.error('[Register Error]', error);
    res.status(500).json({ success: false, message: error.message || 'Server registration error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        emergencyContact: user.emergencyContact,
        preferredLanguage: user.preferredLanguage,
        bloodGroup: user.bloodGroup,
        medicalConditions: user.medicalConditions,
        allergies: user.allergies,
        currentMedications: user.currentMedications,
        previousMedications: user.previousMedications,
        currentTreatment: user.currentTreatment,
        previousTreatment: user.previousTreatment,
        previousSurgeries: user.previousSurgeries,
        doctorDetails: user.doctorDetails,
        pregnancyMode: user.pregnancyMode,
        theme: user.theme
      }
    });
  } catch (error) {
    console.error('[Login Error]', error);
    res.status(500).json({ success: false, message: 'Server login error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// @route   PUT /api/auth/update-profile
// @desc    Update user medical profile & settings
// @access  Private
router.put('/update-profile', protect, async (req, res) => {
  try {
    const updates = req.body;
    // Don't allow password update through this route
    delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Profile update error' });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password does not match' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Password change error' });
  }
});

// @route   DELETE /api/auth/delete-account
// @desc    Delete user account and all personal logs
// @access  Private
router.delete('/delete-account', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all linked records
    await Promise.all([
      User.findByIdAndDelete(userId),
      require('../models/CycleRecord').deleteMany({ userId }),
      require('../models/DailyLog').deleteMany({ userId }),
      require('../models/ThyroidAssessment').deleteMany({ userId }),
      require('../models/PCOSAssessment').deleteMany({ userId }),
      require('../models/PregnancyRecord').deleteMany({ userId }),
      require('../models/WearableData').deleteMany({ userId }),
      require('../models/Medication').deleteMany({ userId }),
      require('../models/MedicalDocument').deleteMany({ userId }),
      require('../models/ChatMessage').deleteMany({ userId }),
      require('../models/Reminder').deleteMany({ userId })
    ]);

    res.json({ success: true, message: 'Account and all associated health records deleted permanently' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Account deletion error' });
  }
});

module.exports = router;
