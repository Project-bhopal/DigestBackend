const Post = require('../models/Post');
const domain = 'https://api.startupdigest.in'; // The base domain
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Fetch all posts in descending order of creation
    res.status(200).json({
      message: 'Posts retrieved successfully',
      data: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      message: 'Post retrieved successfully',
      data: post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const deletedPost = await Post.findByIdAndDelete(postId);

    res.status(200).json({
      message: 'Post Deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const {
      postHeading,
      category,
      subheading,
      createdBy,
      designation,
      description,
      contentHeading,
      contentDescription,
      contentType,
      quoteText,
      quoteAuthor,
      listItems,
      isSponsored,
      sponsoredBy,
      companyName,
    } = req.body;

    // Map content sections
    const contentSections = (contentHeading || []).map((heading, index) => ({
      contentHeading: heading,
      contentDescription: contentDescription?.[index] || null,
      contentType: contentType?.[index] || null,
      listItems: listItems?.[index] || [],
      quoteText: quoteText?.[index] || null,
      quoteAuthor: quoteAuthor?.[index] || null,
      imageUpload: req.files[`imageUpload${index + 1}`]?.[0]?.path 
                   ? `${domain}/uploads/${req.files[`imageUpload${index + 1}`][0].filename}` 
                   : null,
    }));

    // Generate the relative paths for the main images (imagePost, companyLogo)
    const imagePostPath = req.files['imagePost']?.[0]?.path 
                          ? `${domain}/uploads/${req.files['imagePost'][0].filename}` 
                          : null;

    const companyLogoPath = req.files['companyLogo']?.[0]?.path 
                            ? `${domain}/uploads/${req.files['companyLogo'][0].filename}` 
                            : null;

    // Create a new post
    const newPost = new Post({
      postHeading,
      category,
      subheading,
      imagePost: imagePostPath, // Store the relative path
      createdBy,
      designation,
      description,
      contentSections,
      isSponsored: isSponsored == 'true', // Convert string to boolean
      sponsoredBy: isSponsored == 'true' ? sponsoredBy : null,
      companyName: isSponsored == 'true' ? companyName : null,
      companyLogo:  isSponsored == 'true' ? companyLogoPath : null, // Store the relative path
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Prepare response with full URLs for images
    const response = {
      message: 'Post created successfully',
      data: {
        ...savedPost.toObject(), // Include all fields of the saved post
        imagePost: imagePostPath ? `${domain}/${imagePostPath}` : null, // Full URL for imagePost
        companyLogo: companyLogoPath ? `${domain}/${companyLogoPath}` : null, // Full URL for companyLogo
        contentSections: savedPost.contentSections.map(section => ({
          ...section,
          imageUpload: section.imageUpload ? `${domain}/${section.imageUpload}` : null, // Full URL for imageUpload in contentSections
        })),
      }
    };
    res.status(201).redirect("http://localhost:3000/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message});
  }
};
