import React, { useState } from 'react';

export default function Signup () {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform signup logic here (e.g., sending data to a server)
    // ...

    // Reset form fields
    setUsername('');
    setEmail('');
    setPassword('');
    setErrorMessage('Signup successful! Redirecting to login page...');

    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <div className='p-4'>
    <h1>Signup</h1>
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          className='form-control'
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
          className='form-control'
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
          className='form-control'
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