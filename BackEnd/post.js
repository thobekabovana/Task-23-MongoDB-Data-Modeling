const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  image_url: { type: String },
  created_at: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment_text: { type: String },
    created_at: { type: Date, default: Date.now }
  }],
});

module.exports = mongoose.model("Post", PostSchema);
