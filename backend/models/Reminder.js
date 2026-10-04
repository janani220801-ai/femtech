const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['medication', 'water', 'period', 'doctor_appointment', 'health_check', 'medical_test', 'sleep', 'exercise'],
      default: 'water'
    },
    time: {
      type: String, // HH:MM
      required: true
    },
    notes: {
      type: String,
      default: ''
    },
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly', 'Once'],
      default: 'Daily'
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Reminder', reminderSchema);
