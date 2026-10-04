const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    age: {
      type: Number,
      required: [true, 'Please provide your age'],
      min: 5,
      max: 120
    },
    dateOfBirth: {
      type: Date
    },
    phone: {
      type: String,
      default: ''
    },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      relation: { type: String, default: '' }
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'ta', 'hi', 'te'],
      default: 'en'
    },
    // Optional Health Onboarding Fields
    bloodGroup: {
      type: String,
      default: ''
    },
    medicalConditions: {
      type: [String],
      default: []
    },
    allergies: {
      type: [String],
      default: []
    },
    currentMedications: {
      type: [String],
      default: []
    },
    previousMedications: {
      type: [String],
      default: []
    },
    currentTreatment: {
      type: String,
      default: ''
    },
    previousTreatment: {
      type: String,
      default: ''
    },
    previousSurgeries: {
      type: String,
      default: ''
    },
    doctorDetails: {
      name: { type: String, default: '' },
      clinic: { type: String, default: '' },
      phone: { type: String, default: '' }
    },
    // Pregnancy Mode
    pregnancyMode: {
      enabled: { type: Boolean, default: false },
      lmp: { type: Date },
      edd: { type: Date },
      currentWeek: { type: Number, default: 0 },
      notes: { type: String, default: '' }
    },
    // Preferences
    theme: {
      type: String,
      enum: ['soft-pink', 'rose-pink', 'light-lavender'],
      default: 'soft-pink'
    },
    accessibility: {
      largeText: { type: Boolean, default: false },
      highContrast: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
