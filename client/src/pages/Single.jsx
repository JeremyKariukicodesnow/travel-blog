// src/pages/Single.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import DOMPurify from 'dompurify';
import Menu from '../components/Menu';
import SinglePost from '../components/SinglePost';
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'

const Single = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/postRoutes/${postId}`);
        setPost(res.data);
        setComments(res.data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/postRoutes/${postId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.put(`/api/postRoutes/like/${postId}`, {}, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/postRoutes/comment/${postId}`, {
        username: currentUser.username,
        text: comment,
      }, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setComments(res.data.comments);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
        <div className="likes">
          <button onClick={handleLike}>Like</button>
          <span>{post.likes} likes</span>
        </div>
        <div className="comments">
          <h3>Comments</h3>
          <form onSubmit={handleComment}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <span>{comment.username}</span>
              <p>{comment.text}</p>
              <p>{moment(comment.date).fromNow()}</p>
            </div>
          ))}
        </div>
      </div>
      <Menu cat={post.cat} />
      <SinglePost post={post} />
    </div>
  );
};

export default Single;
