// Home.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import '../styles/Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map(post => (
          <div className="post" key={post._id}>
            <div className="img">
              <img src={`http://localhost:5000/uploads/${post.img}`} alt={post.title} />
            </div>
            <div className="content">
              <h1>{post.title}</h1>
              <p>{post.desc.substring(0, 100)}...</p>
              <Link to={`/post/${post._id}`} className="read-more">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
