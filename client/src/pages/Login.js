import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Navbar from '../components/Navbar';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);


    // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data)
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  function backToSignup() {
    window.location.href = '/Signup';
  }

  return (
    <div className='p-4'>
          <div>
        <Navbar />
      </div>
      { data ? 
        window.location.replace('/profile')
      : (
      <div className='flex flex-col items-center pt-4'>
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit} className="login-form">
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
            Login
          </button><br></br>
          <p>Sign up instead if you have not created an account.</p>
          <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" onClick={backToSignup}>Sign up</button>
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

export default Login;
