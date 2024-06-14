import React, { useState } from 'react';
import '../styles/Register.css';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User registered:', data);
        // Clear form inputs and error message after successful registration
        setInputs({ username: '', email: '', password: '' });
        setError('');
        alert('Registration successful!');
      } else {
        console.error('Error registering user:', data.errors);
        setError(data.errors[0].msg || 'Registration failed');
      }
    } catch (err) {
      console.error('Server error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
