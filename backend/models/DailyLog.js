const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    date: {
      type: String, // 'YYYY-MM-DD'
      required: true
    },
    mood: {
      type: String,
      enum: ['happy', 'calm', 'normal', 'sad', 'angry', 'stressed', 'anxious', 'tired', 'energetic'],
      default: 'normal'
    },
    painLevel: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    painLocations: {
      type: [String],
      enum: ['Head', 'Back', 'Abdomen', 'Lower abdomen', 'Legs', 'Breast', 'Other'],
      default: []
    },
    waterGlasses: {
      type: Number,
      min: 0,
      max: 25,
      default: 0
    },
    waterTarget: {
      type: Number,
      default: 8
    },
    sleep: {
      bedtime: { type: String, default: '22:00' },
      wakeTime: { type: String, default: '06:30' },
      hours: { type: Number, default: 8 }
    },
    symptoms: {
      type: [String],
      default: []
    },
    energy: {
      type: String,
      enum: ['very_low', 'low', 'normal', 'high', 'very_high'],
      default: 'normal'
    },
    medication: {
      taken: { type: Boolean, default: false },
      names: { type: [String], default: [] }
    },
    thoughts: {
      howFeeling: { type: String, default: '' },
      whatThinking: { type: String, default: '' }
    },
    exercise: {
      steps: { type: Number, default: 0 },
      runningKm: { type: Number, default: 0 },
      joggingKm: { type: Number, default: 0 },
      notes: { type: String, default: '' }
    },
    foodNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// One daily log per user per day index
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyLog', dailyLogSchema);
