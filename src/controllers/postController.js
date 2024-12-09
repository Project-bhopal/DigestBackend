const Post = require('../models/Post');

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
      contentDescription: contentDescription[index] || null,
      contentType: contentType[index] || null,
      listItems: listItems && listItems[index] ? listItems[index] : [],
      quoteText: quoteText[index] || null,
      quoteAuthor: quoteAuthor[index] || null,
      imageUpload: req.files[`imageUpload`]?.[index]?.path || null,
    }));

    // Create a new post
    const newPost = new Post({
      postHeading,
      category,
      subheading,
      imagePost: req.files['imagePost']?.[0]?.path || null,
      createdBy,
      designation,
      description,
      contentSections,
      isSponsored: isSponsored == 'true', // Convert string to boolean
      sponsoredBy: isSponsored == 'true' ? sponsoredBy : null,
      companyName: isSponsored == 'true' ? companyName : null,
      companyLogo: req.files['companyLogo']?.[0]?.path || null,
    });

    // Save to DB
    const savedPost = await newPost.save();

    res.status(201).json({
      message: 'Post created successfully',
      data: savedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

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
