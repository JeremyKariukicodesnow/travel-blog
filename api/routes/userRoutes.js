const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.put('/follow/:authorId', async (req, res) => {
  const userId = req.user.id; // Assuming you have authentication middleware
  const authorId = req.params.authorId;

  try {
    const user = await User.findById(userId);
    const author = await User.findById(authorId);

    if (!user || !author) {
      return res.status(404).json({ message: 'User or author not found' });
    }

    if (user.following.includes(authorId)) {
      return res.status(400).json({ message: 'Already following the author' });
    }

    user.following.push(authorId);
    author.followers.push(userId);

    await user.save();
    await author.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error following author' });
  }
});

router.put('/unfollow/:authorId', async (req, res) => {
  const userId = req.user.id; // Assuming you have authentication middleware
  const authorId = req.params.authorId;

  try {
    const user = await User.findById(userId);
    const author = await User.findById(authorId);

    if (!user || !author) {
      return res.status(404).json({ message: 'User or author not found' });
    }

    user.following.pull(authorId);
    author.followers.pull(userId);

    await user.save();
    await author.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error unfollowing author' });
  }
});
router.put('/users/follow/:authorId', followUser);
router.put('/users/unfollow/:authorId', unfollowUser);


module.exports = router;
