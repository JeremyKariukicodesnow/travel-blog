const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, default: '' },
  cat: { type: String, required: true },
  username: { type: String, required: true },
<<<<<<< HEAD
  date: { type: Date, default: Date.now }
=======
  userImg: { type: String },
  cat: { type: String },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
  follows: [userSchema]
>>>>>>> ee8f9c10a113e0efad2464dfd2bed8d72f555f56
});

module.exports = mongoose.model('Post', PostSchema);
