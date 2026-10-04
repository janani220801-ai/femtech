const mongoose = require('mongoose');

const wearableDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    heartRate: {
      type: Number,
      default: 74
    },
    bloodPressure: {
      systolic: { type: Number, default: 118 },
      diastolic: { type: Number, default: 78 }
    },
    hrv: {
      type: Number,
      default: 62 // ms
    },
    skinTemperature: {
      type: Number,
      default: 36.6 // Celsius
    },
    steps: {
      type: Number,
      default: 6420
    },
    calories: {
      type: Number,
      default: 420
    },
    runningDistance: {
      type: Number,
      default: 1.8 // km
    },
    joggingDistance: {
      type: Number,
      default: 2.4 // km
    },
    activityMinutes: {
      type: Number,
      default: 48
    },
    sleepHours: {
      type: Number,
      default: 7.5
    },
    spo2: {
      type: Number,
      default: 98.4 // Percentage
    },
    stressScore: {
      type: Number,
      default: 22 // 0-100 Low
    },
    respiratoryRate: {
      type: Number,
      default: 14 // breaths per min
    },
    gsr: {
      type: Number,
      default: 1.8 // uS Electrodermal activity
    },
    deepSleepMinutes: {
      type: Number,
      default: 135 // 2h 15m
    },
    remSleepMinutes: {
      type: Number,
      default: 105 // 1h 45m
    },
    lightSleepMinutes: {
      type: Number,
      default: 210 // 3h 30m
    },
    isBluetoothConnected: {
      type: Boolean,
      default: false
    },
    isDemo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('WearableData', wearableDataSchema);
