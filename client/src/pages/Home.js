import { Link } from 'react-router-dom';

// export default function Home () {

//   return (
//     <>
//     <h1>Board of the Rings</h1>
//     <p>
//       This is a basic landing page for our project. The links below provide access to different pages that we can work on separately or in groups.
//     </p>
//     <Link to='/signup'>Signup Page</Link><br/>
//     <Link to='/login'>Login Page</Link><br/>
//     <Link to='/rules'>Game Rules</Link><br/>
//     </>
//   );
// }

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Board of the Rings</h1>
      <p className="description">
      Join the quest to destroy The One Ring and become the ultimate Tolkien trivia champion with Board of the Rings, the online multiplayer game!
      </p>
      <div className="links">
        <Link to='/signup' className="link">Signup</Link><br></br>
        <Link to='/login' className="link">Login</Link><br></br>
        <Link to='/rules' className="link">Game Rules</Link>
      </div>
    </div>
  );
}