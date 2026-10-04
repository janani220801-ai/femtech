const express = require('express');
const router = express.Router();
const WearableData = require('../models/WearableData');
const { protect, optionalProtect } = require('../middleware/auth');

// @route   GET /api/wearable/data
// @desc    Get user's latest wearable vitals or return realistic baseline
// @access  Public / Optional Auth
router.get('/data', optionalProtect, async (req, res) => {
  try {
    let data = null;
    if (req.user) {
      data = await WearableData.findOne({ userId: req.user._id }).sort({ updatedAt: -1 });
    }

    if (!data) {
      if (req.user) {
        data = await WearableData.create({
          userId: req.user._id,
          heartRate: 72,
          bloodPressure: { systolic: 118, diastolic: 76 },
          hrv: 64,
          skinTemperature: 36.65,
          steps: 7420,
          calories: 435,
          runningDistance: 1.8,
          joggingDistance: 2.2,
          activityMinutes: 52,
          sleepHours: 7.75,
          spo2: 98.4,
          stressScore: 22,
          respiratoryRate: 14,
          gsr: 1.8,
          deepSleepMinutes: 135,
          remSleepMinutes: 105,
          lightSleepMinutes: 225,
          isBluetoothConnected: false,
          isDemo: true
        });
      } else {
        data = {
          heartRate: 72,
          bloodPressure: { systolic: 118, diastolic: 76 },
          hrv: 64,
          skinTemperature: 36.65,
          steps: 7420,
          calories: 435,
          runningDistance: 1.8,
          joggingDistance: 2.2,
          activityMinutes: 52,
          sleepHours: 7.75,
          spo2: 98.4,
          stressScore: 22,
          respiratoryRate: 14,
          gsr: 1.8,
          deepSleepMinutes: 135,
          remSleepMinutes: 105,
          lightSleepMinutes: 225,
          isBluetoothConnected: false,
          isDemo: true
        };
      }
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/wearable/sync
// @desc    Sync telemetry data (from Web Bluetooth or simulated device)
// @access  Private
router.post('/sync', protect, async (req, res) => {
  try {
    const {
      heartRate,
      bloodPressure,
      hrv,
      skinTemperature,
      steps,
      calories,
      runningDistance,
      joggingDistance,
      activityMinutes,
      sleepHours,
      spo2,
      stressScore,
      respiratoryRate,
      gsr,
      deepSleepMinutes,
      remSleepMinutes,
      lightSleepMinutes,
      isBluetoothConnected,
      isDemo
    } = req.body;

    const updated = await WearableData.findOneAndUpdate(
      { userId: req.user._id },
      {
        userId: req.user._id,
        heartRate: heartRate !== undefined ? heartRate : 72,
        bloodPressure: bloodPressure || { systolic: 118, diastolic: 76 },
        hrv: hrv !== undefined ? hrv : 64,
        skinTemperature: skinTemperature !== undefined ? skinTemperature : 36.65,
        steps: steps !== undefined ? steps : 7420,
        calories: calories !== undefined ? calories : 435,
        runningDistance: runningDistance !== undefined ? runningDistance : 1.8,
        joggingDistance: joggingDistance !== undefined ? joggingDistance : 2.2,
        activityMinutes: activityMinutes !== undefined ? activityMinutes : 52,
        sleepHours: sleepHours !== undefined ? sleepHours : 7.75,
        spo2: spo2 !== undefined ? spo2 : 98.4,
        stressScore: stressScore !== undefined ? stressScore : 22,
        respiratoryRate: respiratoryRate !== undefined ? respiratoryRate : 14,
        gsr: gsr !== undefined ? gsr : 1.8,
        deepSleepMinutes: deepSleepMinutes !== undefined ? deepSleepMinutes : 135,
        remSleepMinutes: remSleepMinutes !== undefined ? remSleepMinutes : 105,
        lightSleepMinutes: lightSleepMinutes !== undefined ? lightSleepMinutes : 225,
        isBluetoothConnected: Boolean(isBluetoothConnected),
        isDemo: isDemo !== undefined ? Boolean(isDemo) : true
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: 'Wearable data synchronized', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
