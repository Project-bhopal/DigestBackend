const mongoose = require('mongoose');

const contentSectionSchema = new mongoose.Schema({
  contentHeading: { type: String, required: true },
  contentDescription: { type: String },
  contentType: { type: String, enum: ['image', 'list', 'quote'] },
  listItems: [{ type: String }],
  quoteText: { type: String },
  quoteAuthor: { type: String },
  imageUpload: { type: String }, // Change to a single string
});

const postSchema = new mongoose.Schema(
  {
    postHeading: { type: String, required: true },
    category: { type: String, required: true },
    subheading: { type: String },
    imagePost: { type: String },
    createdBy: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
    contentSections: [contentSectionSchema],
    isSponsored: { type: Boolean, default: false },
    sponsoredBy: { type: String },
    companyName: { type: String },
    companyLogo: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Post', postSchema);
