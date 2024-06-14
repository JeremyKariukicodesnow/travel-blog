const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});


const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String },
  username: { type: String, required: true },
  userImg: { type: String },
  cat: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
