import { Link } from 'react-router-dom';

export default function Home () {

  return (
    <>
    <p>
      This is a basic landing page for our project. The links below provide access to different pages that we can work on separately or in groups.
    </p>
    <Link to='/socket-test'>Socket Test Page</Link>
    </>
  );
}