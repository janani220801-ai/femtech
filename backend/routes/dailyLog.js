const express = require('express');
const router = express.Router();
const DailyLog = require('../models/DailyLog');
const { protect } = require('../middleware/auth');

// Format date helper: YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split('T')[0];

// @route   GET /api/daily/today
// @desc    Get today's wellness log
// @access  Private
router.get('/today', protect, async (req, res) => {
  try {
    const today = getTodayString();
    let log = await DailyLog.findOne({ userId: req.user._id, date: today });

    if (!log) {
      // Default template
      return res.json({
        success: true,
        isNew: true,
        log: {
          date: today,
          mood: 'normal',
          painLevel: 0,
          painLocations: [],
          waterGlasses: 0,
          waterTarget: 8,
          sleep: { bedtime: '22:30', wakeTime: '06:30', hours: 8 },
          symptoms: [],
          energy: 'normal',
          medication: { taken: false, names: [] },
          thoughts: { howFeeling: '', whatThinking: '' },
          exercise: { steps: 0, runningKm: 0, joggingKm: 0, notes: '' },
          foodNotes: ''
        }
      });
    }

    res.json({ success: true, isNew: false, log });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching daily log' });
  }
});

// @route   POST /api/daily/save
// @desc    Create or update daily log
// @access  Private
router.post('/save', protect, async (req, res) => {
  try {
    const {
      date = getTodayString(),
      mood,
      painLevel,
      painLocations,
      waterGlasses,
      waterTarget,
      sleep,
      symptoms,
      energy,
      medication,
      thoughts,
      exercise,
      foodNotes
    } = req.body;

    const log = await DailyLog.findOneAndUpdate(
      { userId: req.user._id, date },
      {
        userId: req.user._id,
        date,
        mood,
        painLevel: Number(painLevel || 0),
        painLocations: painLocations || [],
        waterGlasses: Number(waterGlasses || 0),
        waterTarget: Number(waterTarget || 8),
        sleep: sleep || { bedtime: '22:30', wakeTime: '06:30', hours: 8 },
        symptoms: symptoms || [],
        energy: energy || 'normal',
        medication: medication || { taken: false, names: [] },
        thoughts: thoughts || { howFeeling: '', whatThinking: '' },
        exercise: exercise || { steps: 0, runningKm: 0, joggingKm: 0, notes: '' },
        foodNotes: foodNotes || ''
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, message: 'Daily log saved successfully', log });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error saving daily log' });
  }
});

// @route   GET /api/daily/history
// @desc    Get user's daily logs history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 30;
    const logs = await DailyLog.find({ userId: req.user._id }).sort({ date: -1 }).limit(limit);
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching history' });
  }
});

// @route   GET /api/daily/trends
// @desc    Get aggregated trends data for charts
// @access  Private
router.get('/trends', protect, async (req, res) => {
  try {
    const days = Number(req.query.days) || 14;
    const logs = await DailyLog.find({ userId: req.user._id }).sort({ date: 1 }).limit(days);

    // Format for charts
    const chartData = logs.map((l) => ({
      date: l.date,
      water: l.waterGlasses,
      pain: l.painLevel,
      sleep: l.sleep?.hours || 0,
      steps: l.exercise?.steps || 0,
      mood: l.mood,
      energy: l.energy
    }));

    res.json({ success: true, trends: chartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error generating trends' });
  }
});

// @route   DELETE /api/daily/:id
// @desc    Delete a specific daily log
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await DailyLog.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    res.json({ success: true, message: 'Daily log entry removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error deleting log' });
  }
});

module.exports = router;
