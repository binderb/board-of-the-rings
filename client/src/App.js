import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SocketTest from './pages/SocketTest';

function App() {
  return (
    <Router>
      <Link to='/'>Home</Link>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/socket-test' element={<SocketTest/>} />
      </Routes>
    </Router>
  );
}

export default App;
