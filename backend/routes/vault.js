const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const MedicalDocument = require('../models/MedicalDocument');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const DEFAULT_FOLDERS = [
  'Medical Reports',
  'Prescriptions',
  'Lab Results',
  'Blood Tests',
  'Scan Reports',
  'Ultrasound Reports',
  'Thyroid Reports',
  'PCOS / PCOD Reports',
  'Pregnancy Records',
  'Vaccination Records',
  'Doctor Prescriptions',
  'Previous Medical Records',
  'Other Documents'
];

// @route   GET /api/vault/folders
// @desc    Get all available folders (default + user custom folders)
// @access  Private
router.get('/folders', protect, async (req, res) => {
  try {
    const userDocs = await MedicalDocument.find({ userId: req.user._id }).distinct('folder');
    const allFolders = Array.from(new Set([...DEFAULT_FOLDERS, ...userDocs]));
    
    // Count documents per folder
    const counts = await MedicalDocument.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$folder', count: { $sum: 1 } } }
    ]);
    
    const countMap = {};
    counts.forEach((c) => {
      countMap[c._id] = c.count;
    });

    const folderSummary = allFolders.map((name) => ({
      name,
      documentCount: countMap[name] || 0
    }));

    res.json({ success: true, folders: folderSummary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching folders' });
  }
});

// @route   GET /api/vault/documents
// @desc    Get documents with optional folder, search and filter
// @access  Private
router.get('/documents', protect, async (req, res) => {
  try {
    const { folder, search } = req.query;
    const query = { userId: req.user._id };

    if (folder && folder !== 'All') {
      query.folder = folder;
    }

    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { doctorName: { $regex: search, $options: 'i' } },
        { hospitalName: { $regex: search, $options: 'i' } }
      ];
    }

    const documents = await MedicalDocument.find(query).sort({ medicalDate: -1, createdAt: -1 });
    res.json({ success: true, count: documents.length, documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching documents' });
  }
});

// @route   POST /api/vault/upload
// @desc    Upload document to vault
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a document or image to upload' });
    }

    const {
      folder = 'Medical Reports',
      description = '',
      medicalDate = Date.now(),
      doctorName = '',
      hospitalName = ''
    } = req.body;

    const doc = await MedicalDocument.create({
      userId: req.user._id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      folder: folder.trim(),
      description: description.trim(),
      medicalDate: new Date(medicalDate),
      doctorName: doctorName.trim(),
      hospitalName: hospitalName.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Document stored securely in your Health Vault',
      document: doc
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error uploading document' });
  }
});

// @route   PUT /api/vault/documents/:id/rename
// @desc    Rename a document
// @access  Private
router.put('/documents/:id/rename', protect, async (req, res) => {
  try {
    const { newName } = req.body;
    if (!newName) {
      return res.status(400).json({ success: false, message: 'New name is required' });
    }

    const doc = await MedicalDocument.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { originalName: newName },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, message: 'Document renamed', document: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/vault/documents/:id/move
// @desc    Move document to another folder
// @access  Private
router.put('/documents/:id/move', protect, async (req, res) => {
  try {
    const { newFolder } = req.body;
    if (!newFolder) {
      return res.status(400).json({ success: false, message: 'Target folder is required' });
    }

    const doc = await MedicalDocument.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { folder: newFolder },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, message: 'Document moved to ' + newFolder, document: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/vault/documents/:id
// @desc    Delete a document
// @access  Private
router.delete('/documents/:id', protect, async (req, res) => {
  try {
    const doc = await MedicalDocument.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // Try to remove local disk file safely
    const filePath = path.join(__dirname, '../uploads', doc.fileName);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Could not delete physical file:', err.message);
      }
    }

    res.json({ success: true, message: 'Document deleted permanently from vault' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
