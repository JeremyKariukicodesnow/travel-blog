import React, {useState} from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Home from './pages/Home';
<<<<<<< HEAD
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost'; // Import EditPost
import Navbar from './components/Navbar';
import Footer from './components/Footer';
=======
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/createPost';
import { AuthContextProvider } from './components/AuthContext';
>>>>>>> ee8f9c10a113e0efad2464dfd2bed8d72f555f56

const App = () => {
  const [postRefreshTrigger, setPostRefreshTrigger] = useState(false);

  const handlePostCreated = () => {
    setPostRefreshTrigger(!postRefreshTrigger);
  }


  return (
    <AuthContextProvider>
    <Router>
      <div className="app">
        <div className="container">
          <Navbar />
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<SinglePost />} /> {/* Updated */}
            <Route path="/write" element={<Write />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/edit/:id" element={<EditPost />} /> {/* New Route */}
=======
            <Route path="/" index element={<Home key={postRefreshTrigger}/>} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/write" element={<Write />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/createpost" element={<CreatePost onPostCreated={handlePostCreated}/>} />

>>>>>>> ee8f9c10a113e0efad2464dfd2bed8d72f555f56
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
    </AuthContextProvider>
  );
}
export default App;
