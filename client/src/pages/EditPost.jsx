import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/authContext';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    desc: '',
    img: '',
    cat: ''
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      if (res.data.username !== currentUser.username) {
        navigate('/');
      } else {
        setPost(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, post);
      navigate(`/post/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="desc"
          value={post.desc}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
        <input
          type="text"
          name="cat"
          value={post.cat}
          onChange={handleChange}
          placeholder="Category"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
