import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Navbar from '../components/Navbar';
import Auth from '../utils/auth';


const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {

      console.error(e);
    }
  };

  function backToLogin() {
    window.location.href = '/Login';
  }

  return (
    <div className='p-4'>
          <div>
        <Navbar />
      </div>
      {data ? window.location.replace('/profile')
        : (
      <div className='container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit} className="signup-form">
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              type='text'
              className='textfield'
              id='username'
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='displayName'>Display Name</label>
            <input
              name='displayName'
              type='text'
              className='textfield'
              id='displayName'
              value={formState.displayName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='email'
              className='textfield'
              id='email'
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              className='textfield'
              id='password'
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='rounded bg-green-800 p-1 px-2 hover:bg-green-700'>
            Sign up
          </button><br></br>
          <p>Login instead if you have already signed up.</p>
          <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" onClick={backToLogin}>Login</button>
        </form>
        </div>
      )}
    {error ? (
      <div className='alert alert-danger mt-4' role='alert'>
        {error.message}
      </div>
    ) : null}
  </div>
  );
}

export default Signup;