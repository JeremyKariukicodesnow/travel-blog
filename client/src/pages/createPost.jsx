// CreatePost.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';

const CreatePost = ({ onPostCreated }) => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('cat', cat);
    formData.append('username', currentUser.username);
    formData.append('userImg', currentUser.userImg);
    if (file) {
      formData.append('file', file);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/postRoutes', formData);
      // Call the callback to refresh the posts on the homepage
      onPostCreated();
      // Clear form
      setTitle('');
      setDesc('');
      setCat('');
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" required />
      <input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Category" required />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
