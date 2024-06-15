import React, { useState } from 'react';
import axios from 'axios';
import '../styles/userProfile.css'

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('profilePicture', profilePicture);

    try {
      const res = await axios.post('http://localhost:5000/api/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container profile-card ">
      <div className="profile-info ">
        <img className='profile-picture'  src={profilePicture ? URL.createObjectURL(profilePicture) : ''} alt="Profile" />
        <h2>{username}</h2>
        <p>{bio}</p>
      </div>
      <div className="profile-form">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <button type="submit" className='edit-profile-btn'>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
