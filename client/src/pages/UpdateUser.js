import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USERNAME } from '../utils/mutations';
import { DISPLAY_NAME } from '../utils/mutations';
import Auth from '../utils/auth';

const UpdateUsername = () => {
  const [formState, setFormState] = useState({ username: '' });
  const [updateUsername, { error }] = useMutation(UPDATE_USERNAME);
  const [updateDisplayName] = useMutation(DISPLAY_NAME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateUsername({
        variables: {
          id: Auth.getPlayerInfo().data._id,
          username: formState.username
        }
      });
          // Redirect to profile page
    window.location.href = '/profile';
    } catch (e) {
      console.error(e);
    }

    setFormState({ username: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleDisplayNameUpdate = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateDisplayName({
        variables: {
          displayName: formState.displayName
        }
      });
      console.log(data);
      // display name updated successfully
      window.location.href = '/profile';
    } catch (e) {
      console.error(e);
    }

    setFormState({ displayName: '' });
  };

  function backToProfile() {
    window.location.href = '/profile';
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-green-900 p-3"><h1>Update Profile</h1>
      <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" onClick={backToProfile}>Back to Profile</button>
      </div>
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">New Username:</label>
          <input
            className="form-input"
            placeholder="Enter new username"
            name="username"
            type="text"
            id="username"
            value={formState.username}
            onChange={handleChange}
          />
        </div>

        {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}

        <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" type="submit">Submit</button>
      </form>
      <br></br>

      {/* <h1>Update Display Name</h1> */}
      <form className="signup-form" onSubmit={handleDisplayNameUpdate}>
        <div className="form-group">
          <label htmlFor="displayName">New Display Name:</label>
          <input
            className="form-input"
            placeholder="Enter new display name"
            name="displayName"
            type="text"
            id="displayName"
            value={formState.displayName}
            onChange={handleChange}
          />
        </div>

        <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateUsername;