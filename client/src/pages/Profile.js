// This would be a user's personal page, where they land after
// logging in. 
// Maybe the option to host/join a game could be here,
// as well as win/loss records, etc.
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeUser] = useMutation(REMOVE_USER);

  if (!Auth.loggedIn()) {
    return (
      <p>You must be logged in to view this page!</p>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const user = data?.me || {};

  const handleLogout = () => {
    Auth.logout();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure? You will need to create a new profile to play again.");
    if (confirmDelete) {
      console.log(Auth.getPlayerInfo());
      try {
        await removeUser(
          {
            variables: {
              id: Auth.getPlayerInfo().data._id
            }
          }
        );
        Auth.logout();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-green-900 p-3">
        <h1 className='p-0 m-0 leading-none'>Welcome, {user.username}</h1>
        <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" onClick={handleLogout}>Logout</button>
      </div>
      <div className="p-4">
        <p>Adventure awaits!</p>
          <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" onClick={() => window.location.replace('/game-session')}>Host or Join a Game!</button>
      </div>
      <div className="p-4">
        <p>Player Info:</p>
        <p>Display Name: {user.displayName}</p>
        <p>Wins: {user.wins}</p>
      </div>
      <div className="p-4">
        <p>Profile management:</p>
        <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" onClick={() => window.location.replace('/update-user')}>Change Username</button><br></br><br></br>
        <button className="rounded bg-green-800 p-1 px-2 hover:bg-green-700" onClick={handleDelete}>Delete Profile</button>
      </div>
      
    </div>
  );
};

export default Profile;

