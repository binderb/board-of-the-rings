import { Link } from 'react-router-dom';

export default function Home () {

  return (
    <>
    <h1>Board of the Rings</h1>
    <p>
      This is a basic landing page for our project. The links below provide access to different pages that we can work on separately or in groups.
    </p>
    <Link to='/signup'>Signup Page</Link><br/>
    <Link to='/login'>Login Page</Link><br/>
    <Link to='/profile'>Profile Page</Link><br/>
    <Link to='/socket-test'>Socket Test Page</Link><br/>
    <Link to='/board-test'>Board Test Page</Link><br/>
    <Link to='/game-session'>Game Session</Link>
    </>
  );
}