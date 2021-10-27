const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
    },
  title: String,
  body: String,
  email: String,
  category: String,
  description: String,
  phone: String,
  image: String,
});

const BlogPost = mongoose.model("ads", BlogPostSchema);
module.exports = BlogPost;
