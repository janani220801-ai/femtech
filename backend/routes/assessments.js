const express = require('express');
const router = express.Router();
const ThyroidAssessment = require('../models/ThyroidAssessment');
const PCOSAssessment = require('../models/PCOSAssessment');
const MenopauseAssessment = require('../models/MenopauseAssessment');
const PregnancyRecord = require('../models/PregnancyRecord');
const User = require('../models/User');
const { protect, optionalProtect } = require('../middleware/auth');

// ==========================================
// 1. THYROID WELLNESS CHECK & SUGGESTION ENGINE
// ==========================================

const THYROID_SYMPTOM_MAP = {
  unusuallyTired: 'Persistent Fatigue / Low Energy',
  unexplainedWeightChange: 'Unexplained Weight Fluctuations',
  hairThinning: 'Hair Thinning or Hair Fall',
  temperatureSensitivity: 'Extreme Sensitivity to Cold or Heat',
  periodChanges: 'Changes in Menstrual Cycle Regularity/Flow',
  sleepChanges: 'Disrupted Sleep Patterns or Insomnia',
  heartRateChanges: 'Unexplained Heart Rate or Palpitations',
  moodChanges: 'Persistent Mood Changes or Brain Fog'
};

router.post('/thyroid', optionalProtect, async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ success: false, message: 'Please provide answers for the assessment' });
    }

    const sanitizedAnswers = {};
    for (const key of Object.keys(THYROID_SYMPTOM_MAP)) {
      const v = (answers && answers[key]) ? String(answers[key]).trim().toLowerCase() : 'no';
      if (v === 'yes') sanitizedAnswers[key] = 'Yes';
      else if (v === 'sometimes') sanitizedAnswers[key] = 'Sometimes';
      else sanitizedAnswers[key] = 'No';
    }

    const reportedSymptoms = [];
    let score = 0;

    for (const [key, label] of Object.entries(THYROID_SYMPTOM_MAP)) {
      if (sanitizedAnswers[key] === 'Yes') {
        reportedSymptoms.push(label);
        score += 2;
      } else if (sanitizedAnswers[key] === 'Sometimes') {
        reportedSymptoms.push(`${label} (Occasional)`);
        score += 1;
      }
    }

    const probabilityPercentage = Math.round((score / 16) * 100);

    let severityIndicator = 'Mild';
    if (score >= 10) severityIndicator = 'Significant';
    else if (score >= 5) severityIndicator = 'Moderate';

    // Build intelligent, personalized clinical & lifestyle suggestions
    const suggestions = [];
    const dietaryAdvice = [];
    const lifestyleAdvice = [];
    const clinicalTests = [
      'Comprehensive Serum Thyroid Panel (TSH, Free T3, and Free T4)',
      'Thyroid Auto-Antibodies Screen (Anti-TPO & Anti-Thyroglobulin)',
      'Serum Ferritin & Iron Saturation Index (Cellular receptor cofactor)',
      'Vitamin D3 (25-OH) and Serum Vitamin B12 levels'
    ];
    const doctorQuestions = [
      'Can we evaluate a complete thyroid profile including Free T3 and Free T4 rather than just TSH alone?',
      'Could autoimmune thyroiditis (Hashimoto’s) be the root cause of my persistent fatigue and cold sensitivity?',
      'Are there any nutritional co-deficiencies (such as low ferritin or selenium) blunting my thyroid hormone conversion?'
    ];

    // Micronutrient & Diet Suggestions
    dietaryAdvice.push('Selenium Intake: Consume 2-3 Brazil nuts daily (provides ~200 mcg organic selenium) to support the deiodinase enzyme that converts T4 to active T3.');
    dietaryAdvice.push('Iodine Balance: Ensure normal iodized salt consumption; avoid megadosing kelp or unmonitored iodine supplements without doctor approval.');
    dietaryAdvice.push('Lightly Steam Cruciferous Vegetables: Steam broccoli, cauliflower, and cabbage to deactivate goitrogens while preserving beneficial glucosinolates.');

    if (sanitizedAnswers.unexplainedWeightChange === 'Yes' || sanitizedAnswers.unexplainedWeightChange === 'Sometimes') {
      dietaryAdvice.push('Adequate Protein Spacing: Aim for 25-30g protein per main meal to sustain resting metabolic rate (BMR) during sluggish thyroid periods.');
    }

    // Energy & Fatigue
    if (sanitizedAnswers.unusuallyTired === 'Yes' || sanitizedAnswers.temperatureSensitivity === 'Yes') {
      lifestyleAdvice.push('Early Morning Circadian Sunlight: View natural daylight for 10-15 minutes upon waking to stimulate hypothalamic-pituitary-thyroid (HPT) signaling.');
      lifestyleAdvice.push('Layering & Core Warming: Maintain optimal core body temperature with warm herbal teas (ginger, cinnamon) to aid peripheral circulation.');
    }

    // Hair Thinning & Sleep
    if (sanitizedAnswers.hairThinning === 'Yes' || sanitizedAnswers.hairThinning === 'Sometimes') {
      suggestions.push('Address Cellular Ferritin: Target serum ferritin above 50-70 ng/mL; low ferritin is the #1 unrecognized contributor to thyroid-related hair shedding.');
    }

    if (sanitizedAnswers.sleepChanges === 'Yes' || sanitizedAnswers.moodChanges === 'Yes') {
      lifestyleAdvice.push('Magnesium Glycinate (300mg before bed): Relaxes nervous tension and assists restorative slow-wave stage-3 sleep.');
    }

    const summaryText =
      score >= 10
        ? 'Your answers indicate a significant cluster of symptoms frequently correlated with thyroid dysregulation (hypothyroidism or hyperthyroidism). Prompt clinical evaluation with comprehensive serum blood tests is strongly recommended.'
        : score >= 5
        ? 'Your answers indicate moderate symptoms associated with endocrine and metabolic fluctuations. A complete thyroid panel with your doctor can help clarify whether thyroid function is contributing.'
        : 'Your answers reflect mild or baseline patterns. Continue regular cycle and basal body temperature tracking with proactive lifestyle care.';

    const assessmentPayload = {
      userId: req.user?._id || null,
      answers: sanitizedAnswers,
      reportedSymptoms,
      score,
      probabilityPercentage,
      severityIndicator,
      summaryText,
      suggestions,
      dietaryAdvice,
      lifestyleAdvice,
      clinicalTests,
      doctorQuestions
    };

    let savedRecord = null;
    if (req.user?._id) {
      savedRecord = await ThyroidAssessment.create(assessmentPayload);
    }

    res.status(201).json({
      success: true,
      assessment: savedRecord || assessmentPayload,
      disclaimer: summaryText
    });
  } catch (error) {
    console.error('Thyroid check error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error processing thyroid check' });
  }
});

router.get('/thyroid/history', optionalProtect, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.json({ success: true, history: [] });
    }
    const history = await ThyroidAssessment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. PCOS / PCOD AWARENESS CHECK & INFERENCE ENGINE
// ==========================================

const PCOS_SYMPTOM_MAP = {
  irregularPeriods: 'Frequent Menstrual Irregularity',
  missedPeriods: 'Missed or Skipped Periods',
  persistentAcne: 'Persistent Acne or Skin Breakouts',
  unexplainedWeightChange: 'Difficulty Managing Weight / Rapid Weight Gain',
  unusualHairGrowth: 'Hirsutism / Unwanted Facial or Body Hair',
  hairThinning: 'Scalp Hair Thinning',
  moodChanges: 'Severe Mood Swings or Fatigue',
  cyclePredictDifficulty: 'Unpredictable Cycle Duration'
};

router.post('/pcos', optionalProtect, async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ success: false, message: 'Please provide answers for the assessment' });
    }

    // Normalize answers
    const sanitizedAnswers = {};
    for (const key of Object.keys(PCOS_SYMPTOM_MAP)) {
      const v = (answers && answers[key]) ? String(answers[key]).trim().toLowerCase() : 'no';
      if (v === 'yes') sanitizedAnswers[key] = 'Yes';
      else if (v === 'sometimes') sanitizedAnswers[key] = 'Sometimes';
      else sanitizedAnswers[key] = 'No';
    }

    const reportedSymptoms = [];
    let score = 0;

    for (const [key, label] of Object.entries(PCOS_SYMPTOM_MAP)) {
      if (sanitizedAnswers[key] === 'Yes') {
        reportedSymptoms.push(label);
        score += 2;
      } else if (sanitizedAnswers[key] === 'Sometimes') {
        reportedSymptoms.push(`${label} (Occasional)`);
        score += 1;
      }
    }

    const probabilityPercentage = Math.round((score / 16) * 100);

    let severityIndicator = 'Mild';
    if (score >= 10) severityIndicator = 'Significant';
    else if (score >= 5) severityIndicator = 'Moderate';

    // Generate Personalized Clinical & Lifestyle Recommendations
    const suggestions = [];
    const dietaryAdvice = [];
    const lifestyleAdvice = [];
    const clinicalTests = [
      'Pelvic Ultrasound (assess ovarian volume, stromal density, and antral follicle ring)',
      'Serum Day-3 LH & FSH Ratio (LH:FSH > 2:1 is suggestive of polycystic dynamics)',
      'Fasting Insulin & Fasting Glucose (HOMA-IR calculation for hidden insulin resistance)',
      'Free & Total Serum Testosterone, DHEA-Sulfate, and 17-OHP (Androgen screen)',
      'Lipid Profile & hs-CRP (Evaluation of cardiometabolic and vascular health)'
    ];
    const doctorQuestions = [
      'Could my cycle patterns and symptoms point to polycystic ovarian syndrome (PCOS/PCOD)?',
      'Can we test both fasting insulin and fasting glucose to calculate my HOMA-IR resistance index?',
      'Would myo-inositol + D-chiro-inositol (40:1) supplementation be appropriate for restoring my ovulatory cycles?',
      'What anti-androgenic strategies would you recommend for my skin and hair symptoms?'
    ];

    // 1. Dietary & Insulin Focus
    dietaryAdvice.push('Low-Glycemic Load (GL) Nutrition: Prioritize complex carbohydrates with high fiber (quinoa, lentils, flaxseeds) to eliminate insulin surges that stimulate ovarian theca cells to overproduce androgens.');
    dietaryAdvice.push('Protein & Healthy Fat Anchoring: Combine every meal with healthy fats (avocado, extra virgin olive oil) and 25g+ protein to slow gastric emptying and blunt postprandial glucose peaks.');

    if (sanitizedAnswers.unexplainedWeightChange === 'Yes' || sanitizedAnswers.unexplainedWeightChange === 'Sometimes') {
      dietaryAdvice.push('Time-Restricted Feeding (12-14 hr overnight fast): Allows baseline insulin to reset, decreasing visceral adipose inflammation without causing adrenal starvation stress.');
    }

    // 2. Anti-Androgen, Skin & Hair Focus
    if (sanitizedAnswers.persistentAcne === 'Yes' || sanitizedAnswers.unusualHairGrowth === 'Yes' || sanitizedAnswers.hairThinning === 'Yes') {
      suggestions.push('Organic Spearmint Tea (2 cups daily): Clinical trials demonstrate significant reductions in free serum testosterone and reduction in hirsutism score.');
      suggestions.push('Zinc Bisglycinate (30mg daily): Acts as a natural 5-alpha reductase inhibitor to suppress dihydrotestosterone (DHT) conversion on skin and hair follicles.');
      dietaryAdvice.push('Dairy Moderation: Reduce cow dairy consumption for 4 weeks; dairy contains bovine IGF-1 which directly exacerbates androgen-mediated cystic acne.');
    }

    // 3. Ovulation & Period Regularization Focus
    if (sanitizedAnswers.irregularPeriods === 'Yes' || sanitizedAnswers.missedPeriods === 'Yes' || sanitizedAnswers.cyclePredictDifficulty === 'Yes') {
      suggestions.push('Myo-Inositol & D-Chiro-Inositol in 40:1 Physiological Ratio (2,000mg twice daily): Backed by over 30 randomized controlled trials for restoring spontaneous ovulation and egg quality.');
      lifestyleAdvice.push('Track Biphasic BBT Shift: Use the FemTech IoT wearable to verify whether a +0.3°C thermal shift occurs, confirming whether a cycle is ovulatory or anovulatory.');
    }

    // 4. Exercise & Stress Management
    if (sanitizedAnswers.moodChanges === 'Yes' || sanitizedAnswers.moodChanges === 'Sometimes') {
      lifestyleAdvice.push('Progressive Resistance Training (2-3x weekly): Muscle contractions trigger GLUT-4 glucose transporter translocation completely independent of insulin.');
      lifestyleAdvice.push('Cortisol-Conscious Training: Avoid daily high-stress HIIT or intense fasted cardio which triggers excess cortisol and DHEA-S production from the adrenal glands.');
      lifestyleAdvice.push('Magnesium Glycinate (300-400mg) at bedtime: Replenishes cellular magnesium depleted by high insulin, improving sleep architecture and mood stability.');
    }

    const summaryText =
      score >= 10
        ? 'Your answers indicate a significant combination of classic polycystic ovarian signs (irregularity, androgenic symptoms, metabolic challenges). Clinical confirmation via pelvic ultrasound and hormone blood work with a gynecologist is strongly advised.'
        : score >= 5
        ? 'Your questionnaire reveals moderate patterns consistent with hormonal and insulin sensitivity fluctuations. Proactive lifestyle modifications and routine clinical screening can help prevent symptom progression.'
        : 'Your questionnaire shows mild, minimal PCOS-related indicators. Maintaining whole-food nutrition, active walking, and cycle tracking will support your long-term endocrine balance.';

    const assessmentPayload = {
      userId: req.user?._id || null,
      answers: sanitizedAnswers,
      reportedSymptoms,
      score,
      probabilityPercentage,
      severityIndicator,
      summaryText,
      suggestions,
      dietaryAdvice,
      lifestyleAdvice,
      clinicalTests,
      doctorQuestions
    };

    let savedRecord = null;
    if (req.user?._id) {
      savedRecord = await PCOSAssessment.create(assessmentPayload);
    }

    res.status(201).json({
      success: true,
      assessment: savedRecord || assessmentPayload,
      disclaimer: summaryText
    });
  } catch (error) {
    console.error('PCOS check error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error processing PCOS check' });
  }
});

router.get('/pcos/history', optionalProtect, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.json({ success: true, history: [] });
    }
    const history = await PCOSAssessment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 3. PREGNANCY WELLNESS & PREGNANCY MODE
// ==========================================

router.post('/pregnancy/questionnaire', protect, async (req, res) => {
  try {
    const { questionnaire } = req.body;

    const record = await PregnancyRecord.create({
      userId: req.user._id,
      questionnaire: questionnaire || {},
      summaryDisclaimer:
        'Symptoms alone cannot confirm pregnancy. A pregnancy test and, where appropriate, evaluation by a healthcare professional are needed to confirm pregnancy.'
    });

    res.status(201).json({
      success: true,
      message: 'Questionnaire completed',
      record,
      disclaimer: record.summaryDisclaimer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error saving pregnancy questionnaire' });
  }
});

// Update or Toggle Pregnancy Mode
router.post('/pregnancy/mode', protect, async (req, res) => {
  try {
    const { enabled, lmp, appointments, weeklyNotes } = req.body;

    let edd = null;
    let currentWeek = 4;
    let trimester = 1;

    if (lmp) {
      const lmpDate = new Date(lmp);
      edd = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);

      const diffMs = Date.now() - lmpDate.getTime();
      const calculatedWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
      currentWeek = Math.max(1, Math.min(42, calculatedWeeks));

      if (currentWeek <= 13) trimester = 1;
      else if (currentWeek <= 26) trimester = 2;
      else trimester = 3;
    }

    const record = await PregnancyRecord.findOneAndUpdate(
      { userId: req.user._id },
      {
        userId: req.user._id,
        pregnancyModeActive: Boolean(enabled),
        lmp: lmp ? new Date(lmp) : undefined,
        estimatedDueDate: edd,
        currentWeek,
        trimester,
        ...(appointments ? { appointments } : {}),
        ...(weeklyNotes !== undefined ? { weeklyNotes } : {})
      },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(req.user._id, {
      pregnancyMode: {
        enabled: Boolean(enabled),
        lmp: lmp ? new Date(lmp) : undefined,
        edd,
        currentWeek,
        notes: weeklyNotes || ''
      }
    });

    res.json({
      success: true,
      message: enabled ? 'Pregnancy Mode enabled' : 'Pregnancy Mode updated',
      record
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error updating pregnancy mode' });
  }
});

router.get('/pregnancy/status', protect, async (req, res) => {
  try {
    const record = await PregnancyRecord.findOne({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 4. MENOPAUSE & PERIMENOPAUSE CLINICAL ASSESSMENT ENGINE
// ==========================================

const MENOPAUSE_SYMPTOM_MAP = {
  hotFlashes: 'Vasomotor Episodes / Hot Flashes',
  irregularCycles: 'Menstrual Cycle Irregularity / Length Changes',
  nightSweats: 'Night Sweats & Cold Awakening',
  sleepDisturbance: 'Sleep Disruption & Insomnia',
  moodSwings: 'Mood Fluctuations, Irritability & Anxiety',
  brainFog: 'Mental Fatigue & Cognitive Brain Fog',
  vaginalDryness: 'Genitourinary Symptoms / Vaginal Dryness',
  jointStiffness: 'Joint Stiffness & Musculoskeletal Soreness',
  weightMetabolism: 'Metabolic Shift & Abdominal Weight Gain',
  ceasedPeriods12Months: 'Amenorrhea (No Periods for 12+ Months)'
};

router.post('/menopause', optionalProtect, async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ success: false, message: 'Please provide answers for the assessment' });
    }

    const sanitizedAnswers = {};
    for (const key of Object.keys(MENOPAUSE_SYMPTOM_MAP)) {
      const v = (answers && answers[key]) ? String(answers[key]).trim().toLowerCase() : 'no';
      if (v === 'yes') sanitizedAnswers[key] = 'Yes';
      else if (v === 'sometimes') sanitizedAnswers[key] = 'Sometimes';
      else sanitizedAnswers[key] = 'No';
    }

    const reportedSymptoms = [];
    let score = 0;

    for (const [key, label] of Object.entries(MENOPAUSE_SYMPTOM_MAP)) {
      if (sanitizedAnswers[key] === 'Yes') {
        reportedSymptoms.push(label);
        score += 2;
      } else if (sanitizedAnswers[key] === 'Sometimes') {
        reportedSymptoms.push(`${label} (Occasional)`);
        score += 1;
      }
    }

    const probabilityPercentage = Math.min(100, Math.round((score / 20) * 100));

    let transitionStage = 'Premenopause Transition';
    let severityIndicator = 'Mild';

    if (sanitizedAnswers.ceasedPeriods12Months === 'Yes') {
      transitionStage = 'Clinically Confirmed Menopause (12+ Months Amenorrhea)';
      severityIndicator = score >= 12 ? 'Significant' : 'Moderate';
    } else if (score >= 11) {
      transitionStage = 'Active Perimenopause Transition (Hormonal Shift)';
      severityIndicator = 'Significant';
    } else if (score >= 5) {
      transitionStage = 'Early Perimenopause / Hormonal Fluctuations';
      severityIndicator = 'Moderate';
    } else {
      transitionStage = 'Premenopause / Minimal Vasomotor Symptoms';
      severityIndicator = 'Mild';
    }

    // Build personalized nutrition, bone health, lifestyle and doctor questions
    const suggestions = [];
    const dietaryAdvice = [];
    const lifestyleAdvice = [];
    const clinicalTests = [
      'Serum FSH (Follicle-Stimulating Hormone) & Serum LH Profile',
      'Serum Estradiol (E2) - Estrogen Baseline Evaluation',
      'Complete Thyroid Panel (TSH, FT3, FT4) to rule out mimicking thyroid conditions',
      'DEXA Bone Mineral Density Scan (lumbar spine & femoral neck baseline)',
      'Lipid Profile & Fasting Blood Glucose (Post-estrogen cardiometabolic screening)',
      'Pelvic Ultrasound (endometrial stripe thickness evaluation)'
    ];
    const doctorQuestions = [
      'Based on my symptoms and cycle history, am I in early perimenopause or clinical menopause?',
      'Would I be a good candidate for Menopausal Hormone Therapy (MHT / HRT) or natural transdermal bioidentical progesterone?',
      'Can we schedule a baseline DEXA bone density scan to safeguard against osteoporosis?',
      'What evidence-based therapies or localized estrogen creams do you recommend for vaginal comfort and pelvic health?'
    ];

    // Nutrition & Phytoestrogens
    dietaryAdvice.push('Phytoestrogen-Rich Superfoods: Add 1-2 tbsp freshly ground golden flaxseeds and fermented organic soy (tempeh, miso, edamame) containing plant lignans and isoflavones that gently bind estrogen receptors.');
    dietaryAdvice.push('Target Calcium Intake (1,200 mg/day): Combine calcium-rich leafy greens, sesame seeds (tahini), chia seeds, and fortified almond or cow milk with meals.');
    dietaryAdvice.push('Anti-Inflammatory Mediterranean Protocol: Prioritize extra-virgin olive oil, wild salmon (omega-3s), walnuts, and colorful berries to suppress inflammatory cytokines that worsen joint aches.');

    // Bone & Vasomotor
    lifestyleAdvice.push('Weight-Bearing Resistance Training (3x/week): Squats, lunges, and resistance bands signal osteoblasts to rebuild bone matrix, preserving skeletal density.');
    lifestyleAdvice.push('Night Temperature Optimization: Keep bedroom at 18-20°C with layered breathable bamboo/cotton sheets and keep chilled water bedside for night sweats.');
    lifestyleAdvice.push('Vitamin D3 (1,000–2,000 IU) + Vitamin K2 (MK-7): Essential co-factors that guide calcium directly into bone mineral tissue rather than arterial walls.');

    if (sanitizedAnswers.sleepDisturbance === 'Yes' || sanitizedAnswers.moodSwings === 'Yes') {
      lifestyleAdvice.push('Magnesium Glycinate (350 mg before bed): Soothes central nervous system hyperexcitability and alleviates nocturnal muscle cramps.');
    }

    if (sanitizedAnswers.vaginalDryness === 'Yes') {
      suggestions.push('Hyaluronic Acid Vaginal Moisturizer: Long-acting non-hormonal hydration for vaginal mucosal elasticity, coupled with water-based lubricants.');
    }

    if (sanitizedAnswers.hotFlashes === 'Yes' || sanitizedAnswers.nightSweats === 'Yes') {
      suggestions.push('Avoid Vasomotor Triggers: Limit spicy foods, red wine, excessive caffeine, and hot beverages which dilate peripheral skin capillaries.');
    }

    const summaryText =
      sanitizedAnswers.ceasedPeriods12Months === 'Yes'
        ? 'Your answers confirm 12+ months without periods, indicating clinically confirmed Menopause. Prioritizing bone density, cardiovascular protection, and hormonal balance is your primary wellness goal.'
        : score >= 10
        ? 'Your answers strongly align with active Perimenopause. Fluctuating estrogen and progesterone levels are creating vasomotor and metabolic shifts. Partnering with your gynecologist will bring rapid symptom relief.'
        : score >= 5
        ? 'Your questionnaire indicates moderate early perimenopausal indicators. Nutrition rich in phytoestrogens, regular strength exercise, and sleep hygiene will stabilize your hormonal rhythm.'
        : 'Your answers reflect mild, baseline patterns. You are currently experiencing minimal menopausal symptoms. Continue proactive bone, metabolic, and cycle wellness care.';

    const assessmentPayload = {
      userId: req.user?._id || null,
      answers: sanitizedAnswers,
      reportedSymptoms,
      score,
      transitionStage,
      probabilityPercentage,
      severityIndicator,
      summaryText,
      suggestions,
      dietaryAdvice,
      lifestyleAdvice,
      clinicalTests,
      doctorQuestions
    };

    let savedRecord = null;
    if (req.user?._id) {
      savedRecord = await MenopauseAssessment.create(assessmentPayload);
    }

    res.status(201).json({
      success: true,
      assessment: savedRecord || assessmentPayload,
      disclaimer: summaryText
    });
  } catch (error) {
    console.error('Menopause check error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error processing menopause assessment' });
  }
});

router.get('/menopause/history', optionalProtect, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.json({ success: true, history: [] });
    }
    const history = await MenopauseAssessment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
