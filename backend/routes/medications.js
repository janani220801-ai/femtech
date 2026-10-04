const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');
const { protect } = require('../middleware/auth');

const DEFAULT_CLINICAL_MEDICATIONS = [
  {
    name: 'Folic Acid & Ferrous Ascorbate',
    dose: '100 mg / 1.5 mg',
    frequency: 'Once daily (Post-Breakfast)',
    reminderTime: '09:00',
    notes: 'Hemoglobin synthesis, energy levels & neural support. Take with water.',
    isCurrent: true
  },
  {
    name: 'Vitamin D3 & Calcium Carbonate',
    dose: '60,000 IU / 500 mg',
    frequency: 'Once daily (Post-Dinner)',
    reminderTime: '20:30',
    notes: 'Bone mineralization, hormonal regulation & immune homeostasis.',
    isCurrent: true
  },
  {
    name: 'Myo-Inositol & D-Chiro-Inositol (40:1)',
    dose: '2000 mg',
    frequency: 'Twice daily',
    reminderTime: '08:30',
    notes: 'Supports ovarian follicular health, insulin sensitivity & cycle regularity.',
    isCurrent: true
  },
  {
    name: 'Omega-3 Fish Oil (EPA/DHA)',
    dose: '1000 mg',
    frequency: 'Once daily (With Lunch)',
    reminderTime: '13:30',
    notes: 'Anti-inflammatory prostaglandin support, reduces dysmenorrhea cramps.',
    isCurrent: true
  },
  {
    name: 'Magnesium Glycinate',
    dose: '250 mg',
    frequency: 'Once daily (Bedtime)',
    reminderTime: '21:30',
    notes: 'Neuromuscular relaxation, mitigates PMS tension & promotes deep restorative sleep.',
    isCurrent: true
  },
  {
    name: 'Levothyroxine Sodium',
    dose: '25 mcg',
    frequency: 'Once daily (Morning Fasting)',
    reminderTime: '06:30',
    notes: 'Archived clinical record: Thyroid hormone balance therapy.',
    isCurrent: false
  }
];

// @route   GET /api/medications
// @desc    Get user's current and past medications (auto-seeds defaults if empty)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let current = await Medication.find({ userId: req.user._id, isCurrent: true }).sort({ createdAt: -1 });
    let history = await Medication.find({ userId: req.user._id, isCurrent: false }).sort({ updatedAt: -1 });

    // Auto-seed default clinical medications if empty
    if (current.length === 0 && history.length === 0) {
      const toInsert = DEFAULT_CLINICAL_MEDICATIONS.map(m => ({ ...m, userId: req.user._id }));
      await Medication.insertMany(toInsert);
      current = await Medication.find({ userId: req.user._id, isCurrent: true }).sort({ createdAt: -1 });
      history = await Medication.find({ userId: req.user._id, isCurrent: false }).sort({ updatedAt: -1 });
    }

    res.json({ success: true, current, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching medications' });
  }
});

// @route   POST /api/medications/reset-defaults
// @desc    Reset or reload standard clinical women's health regimen
// @access  Private
router.post('/reset-defaults', protect, async (req, res) => {
  try {
    await Medication.deleteMany({ userId: req.user._id });
    const toInsert = DEFAULT_CLINICAL_MEDICATIONS.map(m => ({ ...m, userId: req.user._id }));
    await Medication.insertMany(toInsert);
    const current = await Medication.find({ userId: req.user._id, isCurrent: true }).sort({ createdAt: -1 });
    const history = await Medication.find({ userId: req.user._id, isCurrent: false }).sort({ updatedAt: -1 });
    res.json({ success: true, message: 'Clinical regimen reloaded', current, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/medications
// @desc    Add a new medication
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, dose, frequency, startDate, endDate, reminderTime, notes, isCurrent } = req.body;

    if (!name || !dose) {
      return res.status(400).json({ success: false, message: 'Medicine name and dose are required' });
    }

    const med = await Medication.create({
      userId: req.user._id,
      name,
      dose,
      frequency: frequency || 'Once daily',
      startDate: startDate ? new Date(startDate) : Date.now(),
      endDate: endDate ? new Date(endDate) : null,
      reminderTime: reminderTime || '09:00',
      notes: notes || '',
      isCurrent: isCurrent !== undefined ? Boolean(isCurrent) : true
    });

    res.status(201).json({ success: true, message: 'Medication added successfully', medication: med });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/medications/:id/toggle-taken
// @desc    Mark medicine as taken/not taken today
// @access  Private
router.put('/:id/toggle-taken', protect, async (req, res) => {
  try {
    const med = await Medication.findOne({ _id: req.params.id, userId: req.user._id });
    if (!med) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }

    med.takenToday = !med.takenToday;
    if (med.takenToday) {
      med.lastTakenDate = new Date();
    }
    await med.save();

    res.json({ success: true, message: 'Status updated', medication: med });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/medications/:id/archive
// @desc    Move medication between current and history
// @access  Private
router.put('/:id/archive', protect, async (req, res) => {
  try {
    const med = await Medication.findOne({ _id: req.params.id, userId: req.user._id });
    if (!med) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }

    med.isCurrent = !med.isCurrent;
    await med.save();

    res.json({ success: true, message: med.isCurrent ? 'Moved to current' : 'Moved to history', medication: med });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/medications/:id
// @desc    Delete a medication entry
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const med = await Medication.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!med) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }
    res.json({ success: true, message: 'Medication removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
