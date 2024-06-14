// src/components/SinglePost.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const SinglePost = ({ post }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(post.followers.length);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const response = await axios.get(`/api/usersRoutes/check-follow/${post.authorId}`);
        setIsFollowing(response.data.isFollowing);
      } catch (err) {
        console.error(err);
      }
    };
    checkFollowing();
  }, [post.authorId]);

  const handleFollow = async () => {
    try {
      await axios.put(`/api/userRoutes/follow/${post.authorId}`, {}, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setIsFollowing(true);
      setFollowersCount((prevCount) => prevCount + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.put(`/api/userRoutes/unfollow/${post.authorId}`, {}, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setIsFollowing(false);
      setFollowersCount((prevCount) => prevCount - 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="single-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Followers: {followersCount}</p>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
};

export default SinglePost;
