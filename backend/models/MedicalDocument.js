const mongoose = require('mongoose');

const medicalDocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    originalName: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    folder: {
      type: String,
      default: 'Medical Reports',
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    medicalDate: {
      type: Date,
      default: Date.now
    },
    doctorName: {
      type: String,
      default: ''
    },
    hospitalName: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('MedicalDocument', medicalDocumentSchema);
