// const mongoose = require('mongoose');

// const contentSectionSchema = new mongoose.Schema({
//   contentHeading: String,
//   contentDescription: String,
//   contentType: String,
//   listItems: [String],
//   quoteText: String,
//   quoteAuthor: String,
//   imageUpload: String,
// });

// const postSchema = new mongoose.Schema({
//   postHeading: { type: String, required: true },
//   category: { type: String, required: true },
//   subheading: String,
//   imagePost: String,
//   createdBy: { type: String, required: true },
//   designation: { type: String, required: true },
//   description: { type: String, required: true },
//   contentSections: [contentSectionSchema],
// });

// module.exports = mongoose.model('Post', postSchema);
const mongoose = require('mongoose');

const contentSectionSchema = new mongoose.Schema({
  contentHeading: { type: String },
  contentDescription: { type: String },
  contentType: { type: String },
  listItems: [{ type: String }],
  quoteText: { type: String },
  quoteAuthor: { type: String },
  imageUpload: { type: String },
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
