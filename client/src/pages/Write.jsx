import React, { useState } from 'react';
import '../styles/Write.css';

const Write = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, desc });
  };

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <textarea className="editor" onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span><b>Visibility:</b> Public</span>
          <input type="file" id="file" style={{ display: 'none' }} />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
