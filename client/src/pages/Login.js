import React, { useState } from 'react';
import AuthService from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authService = new AuthService();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed.');
      }

      const { token } = await response.json();
      authService.login(token);
      setErrorMessage('Login successful! Redirecting to home page...');

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className='p-4'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
          Login
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