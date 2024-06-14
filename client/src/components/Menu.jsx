import React from 'react';
import '../styles/Menu.css';

const Menu = () => {
  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "https://via.placeholder.com/200"
    },
  ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
