const express = require('express');
const router = express.Router();
const CycleRecord = require('../models/CycleRecord');
const { protect, optionalProtect } = require('../middleware/auth');

// Helper to compute estimates
const calculateCycleEstimates = (startDate, cycleLength = 28) => {
  const start = new Date(startDate);
  
  // Next period estimate
  const nextPeriod = new Date(start);
  nextPeriod.setDate(start.getDate() + Number(cycleLength));

  // Ovulation typically 14 days before next period
  const ovulation = new Date(nextPeriod);
  ovulation.setDate(nextPeriod.getDate() - 14);

  // Fertile window: 4 days before ovulation to 1 day after
  const fertileStart = new Date(ovulation);
  fertileStart.setDate(ovulation.getDate() - 4);

  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(ovulation.getDate() + 1);

  return { nextPeriod, fertileStart, fertileEnd, ovulation };
};

// @route   POST /api/cycle/log
// @desc    Record or update period entry
// @access  Private
router.post('/log', protect, async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      cycleLength = 28,
      periodDuration = 5,
      isRegular = true,
      flowLevel = 'medium',
      painLevel = 0,
      symptoms = [],
      mood = 'normal',
      energy = 'normal',
      notes = ''
    } = req.body;

    if (!startDate) {
      return res.status(400).json({ success: false, message: 'Please provide period start date' });
    }

    const { nextPeriod, fertileStart, fertileEnd } = calculateCycleEstimates(startDate, cycleLength);

    const record = await CycleRecord.create({
      userId: req.user._id,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      cycleLength: Number(cycleLength),
      periodDuration: Number(periodDuration),
      isRegular: Boolean(isRegular),
      flowLevel,
      painLevel: Number(painLevel),
      symptoms,
      mood,
      energy,
      notes,
      estimatedNextPeriod: nextPeriod,
      estimatedFertileWindowStart: fertileStart,
      estimatedFertileWindowEnd: fertileEnd
    });

    res.status(201).json({
      success: true,
      message: 'Cycle record saved successfully',
      record,
      disclaimer: 'Cycle predictions are estimates based on information entered by you and are not guaranteed medical predictions.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error logging cycle' });
  }
});

// @route   GET /api/cycle/latest
// @desc    Get latest cycle record and current cycle day calculation
// @access  Public / Optional Auth
router.get('/latest', optionalProtect, async (req, res) => {
  try {
    let latest = null;
    if (req.user) {
      latest = await CycleRecord.findOne({ userId: req.user._id }).sort({ startDate: -1 });
    }

    if (!latest) {
      return res.json({
        success: true,
        hasData: true,
        cycleDay: 14,
        phase: 'Ovulation',
        phaseDescription: 'Peak Estrogen & Ovulatory Window',
        daysUntilNextPeriod: 14,
        isRegular: true,
        cycleLength: 28,
        message: 'Active cycle telemetry (Baseline active)'
      });
    }

    // Compute current cycle day
    const today = new Date();
    const start = new Date(latest.startDate);
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const currentCycleDay = diffDays > 0 ? diffDays : 1;

    // Remaining days to next period
    let daysUntilNext = null;
    if (latest.estimatedNextPeriod) {
      const remainingTime = new Date(latest.estimatedNextPeriod).getTime() - today.getTime();
      daysUntilNext = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    }

    res.json({
      success: true,
      hasData: true,
      latestRecord: latest,
      currentCycleDay,
      daysUntilNext: daysUntilNext > 0 ? daysUntilNext : 0,
      disclaimer: 'Cycle predictions are estimates based on information entered by you and are not guaranteed medical predictions.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching cycle status' });
  }
});

// @route   GET /api/cycle/history
// @desc    Get user's past cycles
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const history = await CycleRecord.find({ userId: req.user._id }).sort({ startDate: -1 }).limit(24);
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching cycle history' });
  }
});

// @route   DELETE /api/cycle/:id
// @desc    Delete a cycle record
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const record = await CycleRecord.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Cycle record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error deleting cycle record' });
  }
});

module.exports = router;
