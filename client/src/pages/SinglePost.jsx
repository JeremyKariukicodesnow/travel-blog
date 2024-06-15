import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/authContext';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const { currentUser } = useContext(AuthContext);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${id}/like`);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/posts/${id}/comment`, {
        username: currentUser.username,
        text: comment
      });
      setComment('');
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      // Redirect to home after deletion
      window.location.href = '/';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single-post">
      <div className="post-content">
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
        <img
          src={post.img ? `http://localhost:5000/uploads/${post.img}` : 'placeholder.jpg'}
          alt={post.title}
        />
        <div className="actions">
          <button onClick={handleLike}>Like {post.likes}</button>
          {currentUser?.username === post.username && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <Link to={`/post/edit/${post._id}`} className="edit">Edit</Link>
            </>
          )}
        </div>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {post.comments && post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <p><strong>{comment.username}</strong>: {comment.text}</p>
          </div>
        ))}
        {currentUser && (
          <form onSubmit={handleComment}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button type="submit">Comment</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
