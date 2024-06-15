import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts] = useState([
    {
      _id: "1",
      title: "First Post",
      desc: "This is the description for the first post.",
      img: "https://via.placeholder.com/150",
      cat: "art",
      username: "JohnDoe",
      likes: 10,
    },
    {
      _id: "2",
      title: "Second Post",
      desc: "This is the description for the second post.",
      img: "https://via.placeholder.com/150",
      cat: "technology",
      username: "JaneDoe",
      likes: 5,
    },
    {
      _id: "3",
      title: "Third Post",
      desc: "This is the description for the third post.",
      img: null,
      cat: "science",
      username: "JohnDoe",
      likes: 7,
    },
  ]);

  const handleLike = (id) => {
    console.log(`Liked post with ID: ${id}`);
    // This is a placeholder function. Add logic to handle liking a post.
  };

  const handleDelete = (id) => {
    console.log(`Deleted post with ID: ${id}`);
    // This is a placeholder function. Add logic to handle deleting a post.
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map(post => (
          <div className="post" key={post._id}>
            <div className="img">
              <img
                src={post.img || 'placeholder.jpg'}
                alt={post.title}
              />
            </div>
            <div className="content">
              <h1>{post.title}</h1>
              <p>{post.desc.substring(0, 100)}...</p>
              <div className="tags">
                {post.cat && <span className="tag">{post.cat}</span>}
              </div>
              <div className="actions">
                <button onClick={() => handleLike(post._id)}>Like {post.likes}</button>
                <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
                {currentUser?.username === post.username && (
                  <>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                    <Link to={`/post/edit/${post._id}`} className="edit">Edit</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


/* import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import '../styles/Home.css';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { currentUser } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts${search}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/like/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map(post => (
          <div className="post" key={post._id}>
            <div className="img">
              <img
                src={post.img ? `http://localhost:5000/uploads/${post.img}` : 'placeholder.jpg'}
                alt={post.title}
              />
            </div>
            <div className="content">
              <h1>{post.title}</h1>
              <p>{post.desc.substring(0, 100)}...</p>
              <div className="tags">
                {post.cat && <span className="tag">{post.cat}</span>}
              </div>
              <div className="actions">
                <button onClick={() => handleLike(post._id)}>Like {post.likes}</button>
                <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
                {currentUser?.username === post.username && (
                  <>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                    <Link to={`/post/edit/${post._id}`} className="edit">Edit</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
 */