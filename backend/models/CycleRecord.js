const mongoose = require('mongoose');

const cycleRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    cycleLength: {
      type: Number,
      default: 28,
      min: 15,
      max: 60
    },
    periodDuration: {
      type: Number,
      default: 5,
      min: 1,
      max: 15
    },
    isRegular: {
      type: Boolean,
      default: true
    },
    flowLevel: {
      type: String,
      enum: ['spotting', 'light', 'medium', 'heavy'],
      default: 'medium'
    },
    painLevel: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    symptoms: {
      type: [String],
      default: []
    },
    mood: {
      type: String,
      default: 'normal'
    },
    energy: {
      type: String,
      enum: ['very_low', 'low', 'normal', 'high', 'very_high'],
      default: 'normal'
    },
    notes: {
      type: String,
      default: ''
    },
    estimatedNextPeriod: {
      type: Date
    },
    estimatedFertileWindowStart: {
      type: Date
    },
    estimatedFertileWindowEnd: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('CycleRecord', cycleRecordSchema);
