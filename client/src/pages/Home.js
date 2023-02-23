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
    <div className="flex flex-col p-4 items-center">
      <h1 className="title">Board of the Rings</h1>
      <p className="description text-center">
      Join the quest to destroy The One Ring and become the ultimate Tolkien trivia champion with Board of the Rings, the online multiplayer game!
      </p>
      <div className="flex flex-wrap justify-around w-full max-w-[600px] ">
        <Link to='/signup' className="link m-2">Sign up</Link>
        <Link to='/login' className="link m-2">Login</Link>
        <Link to='/rules' className="link m-2">Game Rules</Link>
      </div>
    </div>
  );
}