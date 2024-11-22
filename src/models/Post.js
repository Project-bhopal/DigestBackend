const mongoose = require('mongoose');

const contentSectionSchema = new mongoose.Schema({
  contentHeading: String,
  contentDescription: String,
  contentType: String,
  listItems: [String],
  quoteText: String,
  quoteAuthor: String,
  imageUpload: String,
});

const postSchema = new mongoose.Schema({
  postHeading: { type: String, required: true },
  category: { type: String, required: true },
  subheading: String,
  imagePost: String,
  createdBy: { type: String, required: true },
  designation: { type: String, required: true },
  description: { type: String, required: true },
  contentSections: [contentSectionSchema],
});

module.exports = mongoose.model('Post', postSchema);
