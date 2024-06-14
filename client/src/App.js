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
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/createPost';
import { AuthContextProvider } from './components/AuthContext';

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
            <Route path="/" index element={<Home key={postRefreshTrigger}/>} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/write" element={<Write />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/createpost" element={<CreatePost onPostCreated={handlePostCreated}/>} />

          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
    </AuthContextProvider>
  );
}
export default App;
