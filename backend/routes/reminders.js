const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const { protect } = require('../middleware/auth');

// @route   GET /api/reminders
// @desc    Get user's reminders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id }).sort({ time: 1 });
    res.json({ success: true, count: reminders.length, reminders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/reminders
// @desc    Create a reminder
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, type = 'water', time, notes = '', frequency = 'Daily' } = req.body;

    if (!title || !time) {
      return res.status(400).json({ success: false, message: 'Title and time are required' });
    }

    const reminder = await Reminder.create({
      userId: req.user._id,
      title,
      type,
      time,
      notes,
      frequency,
      enabled: true
    });

    res.status(201).json({ success: true, message: 'Reminder created', reminder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/reminders/:id/toggle
// @desc    Toggle reminder enabled status
// @access  Private
router.put('/:id/toggle', protect, async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.id, userId: req.user._id });
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }

    reminder.enabled = !reminder.enabled;
    await reminder.save();

    res.json({ success: true, message: 'Reminder updated', reminder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/reminders/:id
// @desc    Delete a reminder
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    res.json({ success: true, message: 'Reminder deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
