const express = require("express");
const Post = require("../post");
const User = require("../user");
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { user_id, content, image_url } = req.body;

  try {
    const newPost = new Post({ user_id, content, image_url });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get posts by user
router.get("/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ user_id: req.params.userId }).populate("user_id", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
