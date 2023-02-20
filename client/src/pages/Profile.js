// This would be a user's personal page, where they land after
// logging in. 
// Maybe the option to host/join a game could be here,
// as well as win/loss records, etc.

// import React from 'react';
// import { Navigate, useParams } from 'react-router-dom';

// import { useQuery } from '@apollo/client';
// import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
// import Auth from '../utils/auth';

// const Profile = (props) => {
//   let { username: userParam } = useParams();
// userParam = Auth.loggedIn() ? Auth.getProfile().data.username : null;

// console.log(userParam)
//   const { loading, data } = useQuery(userParam ? QUERY_SINGLE_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });


//   const user = data?.me || data?.user || {};
// console.log(data)

//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Navigate to="/profile" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

//   const handleClick = async () => {
//     try {
//       await Auth.logout({
//         variables: { id: user._id },
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <>
//     <div>
//     <h2>Welcome {user.username ? user.username : "Player"}.</h2>
//           <button onClick={handleClick}>
//             Logout
//           </button>
//     </div>
//     </>
//   );

// };

// export default Profile;


import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [deleteUser] = useMutation(DELETE_USER);

  if (!Auth.loggedIn()) {
    return (
      <p>You must be logged in to view this page!</p>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("data: ",data);
  console.log("error: ", error);
  const user = data?.me || {};
  console.log(Auth.loggedIn())
  console.log(user)
  const handleLogout = () => {
    Auth.logout();
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      Auth.logout();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>{user.username ? user.username : 'Player'}'s Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default Profile;