const mongoose = require('mongoose');

const menopauseAssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    },
    answers: {
      hotFlashes: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      irregularCycles: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      nightSweats: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      sleepDisturbance: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      moodSwings: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      brainFog: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      vaginalDryness: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      jointStiffness: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      weightMetabolism: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' },
      ceasedPeriods12Months: { type: String, enum: ['Yes', 'No', 'Sometimes'], default: 'No' }
    },
    reportedSymptoms: {
      type: [String],
      default: []
    },
    score: {
      type: Number,
      default: 0
    },
    transitionStage: {
      type: String,
      default: 'Premenopause / Low Signs'
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
      default: 'Menopause is a natural hormonal transition. A qualified gynecologist can evaluate your hormone panel (FSH, E2).'
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
  { timestamps: true }
);

module.exports = mongoose.model('MenopauseAssessment', menopauseAssessmentSchema);
