const mongoose = require('mongoose');

const thyroidAssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    },
    answers: {
      unusuallyTired: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      unexplainedWeightChange: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      hairThinning: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      temperatureSensitivity: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      periodChanges: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      sleepChanges: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      heartRateChanges: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      moodChanges: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' }
    },
    reportedSymptoms: {
      type: [String],
      default: []
    },
    score: {
      type: Number,
      default: 0
    },
    probabilityPercentage: {
      type: Number,
      default: 0
    },
    severityIndicator: {
      type: String,
      default: 'Mild'
    },
    summaryText: {
      type: String,
      default: 'Thyroid conditions present diverse symptoms. A serum TSH, Free T3, and Free T4 blood test prescribed by your physician is required for diagnosis.'
    },
    suggestions: {
      type: [String],
      default: []
    },
    dietaryAdvice: {
      type: [String],
      default: []
    },
    lifestyleAdvice: {
      type: [String],
      default: []
    },
    clinicalTests: {
      type: [String],
      default: []
    },
    doctorQuestions: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    strict: false
  }
);

module.exports = mongoose.model('ThyroidAssessment', thyroidAssessmentSchema);
