import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SocketTest from './pages/SocketTest';
import Game from './pages/Game';

function App() {
  return (
    <Router>
      <header className='p-4 py-2'>
      <Link to='/'>Home</Link>
      </header>
      <main className='p-4 py-2'>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/socket-test' element={<SocketTest/>} />
      <Route path='/game-session' element={<Game/>} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
