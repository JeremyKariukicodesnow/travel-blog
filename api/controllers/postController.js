const Post = require('../models/Post');

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json('Post deleted successfully');
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.likePost = async (req, res) =>{
  try {
    const post = await Post.findById(req.params.id);
    post.like += 1
    await post.save()
    res.status(200).json(post)
  } catch (err){
    res.status(500).json(err)
  }
}

exports.addComment = async (req, res) =>{
  try {
    const post = await Post.findById(req.params.id)
    post.comments.push(req.body)
    await post.save()
    res.status(200).json(post)
  } catch (err){
    res.status(500).json(err)
  }
}