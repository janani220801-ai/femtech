const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    sender: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    text: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      enum: ['en', 'ta', 'hi', 'te'],
      default: 'en'
    },
    audioUrl: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    docUrl: {
      type: String,
      default: ''
    },
    docName: {
      type: String,
      default: ''
    },
    isEmergency: {
      type: Boolean,
      default: false
    },
    followUpQuestions: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
