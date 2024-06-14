import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="home">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <img src={`http://localhost:5000/uploads/${post.img}`} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.desc.substring(0, 100)}...</p>
          <Link to={`/post/${post._id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
