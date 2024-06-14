import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Index.css';
import App from './App';
import { AuthProvider } from './context/authContext'; // Import AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
