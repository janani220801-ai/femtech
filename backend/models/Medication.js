const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true
    },
    dose: {
      type: String,
      required: [true, 'Dose is required (e.g. 100mg, 1 tablet)'],
      trim: true
    },
    frequency: {
      type: String,
      enum: ['Once daily', 'Twice daily', 'Three times daily', 'Every 8 hours', 'Every 12 hours', 'As needed', 'Weekly'],
      default: 'Once daily'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    reminderTime: {
      type: String,
      default: '09:00'
    },
    notes: {
      type: String,
      default: ''
    },
    isCurrent: {
      type: Boolean,
      default: true
    },
    takenToday: {
      type: Boolean,
      default: false
    },
    lastTakenDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Medication', medicationSchema);
