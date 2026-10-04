const mongoose = require('mongoose');

const pcosAssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    },
    answers: {
      irregularPeriods: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      missedPeriods: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      persistentAcne: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      unexplainedWeightChange: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      unusualHairGrowth: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      hairThinning: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      moodChanges: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      cyclePredictDifficulty: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' }
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
      default: 'These symptoms can have several possible causes. PCOS/PCOD can only be properly evaluated by a qualified healthcare professional.'
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

module.exports = mongoose.model('PCOSAssessment', pcosAssessmentSchema);
