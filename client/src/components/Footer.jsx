import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
/* import { create } from '../../../api/models/User'; */

const Footer = () => {
  return (
    <footer>
      <img src="../../img/logo.jpg" alt="Logo" />
      <span>
        Made with ♥ and <b>React.js</b>.
      </span>
      <a href="https://twitter.com/i/flow/signup?lang=en" target='_blank'>Twitter</a>
      <a href="https://web.facebook.com/?_rdc=1&_rdr" target='_blank'>Facebook</a>
      <a href="https://www.instagram.com/" target='_blank'>Instagram</a>
      <Link to='createPost'>Post Your Own</Link>
    </footer>
  );
};

export default Footer;
