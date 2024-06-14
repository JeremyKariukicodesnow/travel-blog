// authContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userData) => {
    // Simulating login logic (replace with actual implementation)
    setCurrentUser(userData);
  };

  const logout = () => {
    // Simulating logout logic (replace with actual implementation)
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  // Example of checking token from localStorage on initial load
  // You may want to move this logic to useEffect in a higher-level component
  if (!currentUser && localStorage.getItem('token')) {
    setCurrentUser({ username: 'exampleUser' }); // Simulating user retrieval
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
