import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import AuthService from '../utils/auth';

export default function Signup () {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

const authService = new AuthService();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform signup logic here
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        throw new Error('Signup failed.');
      }

      const { token } = await response.json(); // Get JWT from server response
      authService.login(token); // Store JWT in local storage using AuthService
      setErrorMessage('Signup successful! Redirecting to login page...');
      // localStorage.setItem('token', token); // Store JWT in local storage
    // ...

    // Reset form fields

    // setUsername('');
    // setEmail('');
    // setPassword('');
    // setErrorMessage('Signup successful! Redirecting to login page...');

    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  } catch (error) {
      setErrorMessage('Signup failed.');
    }
  };

  return (
    <div className='p-4'>
    <h1>Signup</h1>
    <form onSubmit={handleSubmit} className="signup-form">
      <div className='form-group'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          className='textfield'
          id='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='textfield'
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='textfield'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type='submit' className='rounded bg-green-800 p-1 px-2 hover:bg-green-700'>
        Signup
      </button>
    </form>
    {errorMessage && (
      <div className='alert alert-danger mt-4' role='alert'>
        {errorMessage}
      </div>
    )}
  </div>
  );
}