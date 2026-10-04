const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  hospitalName: { type: String, default: '' },
  appointmentDate: { type: Date, required: true },
  time: { type: String, default: '' },
  notes: { type: String, default: '' },
  completed: { type: Boolean, default: false }
});

const pregnancyRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    // Questionnaire answers
    questionnaire: {
      lastPeriodDate: { type: Date },
      isPeriodLate: { type: String, enum: ['Yes', 'No', 'Not Sure'], default: 'No' },
      daysLate: { type: Number, default: 0 },
      takenHomeTest: { type: String, enum: ['Yes', 'No'], default: 'No' },
      testResult: { type: String, enum: ['Positive', 'Negative', 'Faint Line', 'Invalid', 'Not Taken'], default: 'Not Taken' },
      experiencingNausea: { type: Boolean, default: false },
      breastTenderness: { type: Boolean, default: false },
      fatigue: { type: Boolean, default: false },
      otherSymptoms: { type: [String], default: [] }
    },
    summaryDisclaimer: {
      type: String,
      default: 'Symptoms alone cannot confirm pregnancy. A pregnancy test and, where appropriate, evaluation by a healthcare professional are needed to confirm pregnancy.'
    },
    // Pregnancy Mode Tracker
    pregnancyModeActive: {
      type: Boolean,
      default: false
    },
    lmp: {
      type: Date
    },
    estimatedDueDate: {
      type: Date
    },
    currentWeek: {
      type: Number,
      min: 1,
      max: 42,
      default: 4
    },
    trimester: {
      type: Number,
      enum: [1, 2, 3],
      default: 1
    },
    appointments: [appointmentSchema],
    weeklyNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PregnancyRecord', pregnancyRecordSchema);
