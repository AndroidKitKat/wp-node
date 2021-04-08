const mongoose = require("mongoose");

const schema = mongoose.Schema({
  postId: String,
  hash: String,
  created: Date,
  lastAccess: Date,
  views: Number,
});

module.exports = mongoose.model("Paste", schema);
