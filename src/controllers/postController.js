const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { 
      postHeading, category, subheading, createdBy, designation, description, 
      contentHeading, contentDescription, contentType, quoteText, quoteAuthor, 
      listItems 
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
    });

    // Save to DB
    const savedPost = await newPost.save();

    // Print to terminal
    console.log('Saved Post:', savedPost);

    // Send response
    res.status(201).json({
      message: 'Post created successfully',
      data: savedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Fetch all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
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

// Fetch post by ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId); // Find post by ID
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