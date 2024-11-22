const mongoose = require('mongoose');

const contentSectionSchema = new mongoose.Schema({
  // type: { type: String, enum: ['image', 'quote', 'list'], required: true },
  type: { type: String, enum: ['image', 'quote'], required: true },
  contentHeading: { type: String },
  content: { type: mongoose.Schema.Types.Mixed, required: true },  // Store different content types (e.g., string, array)
});

module.exports = mongoose.model('ContentSection', contentSectionSchema);
