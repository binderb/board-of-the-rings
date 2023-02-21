import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SocketTest from './pages/SocketTest';
import BoardTest from './pages/BoardTest';
import Game from './pages/Game';
import GameSessionProvider from './utils/GameSessionContext';
import Auth from './utils/auth';
import Rules from './pages/Rules';
import UpdateUser from './pages/UpdateUser';


const graphQLuri = createHttpLink({
  uri: '/graphql'
});

const headersWithAuth = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: headersWithAuth.concat(graphQLuri),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <main className='p-4 py-4'>
      <GameSessionProvider>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/socket-test' element={<SocketTest/>} />
        <Route path='/board-test' element={<BoardTest/>} />
        <Route path='/game-session' element={<Game/>} />
        <Route path='/rules' element={<Rules/>} />
        <Route path='/update-user' element={<UpdateUser/>} />
      </Routes>
      </GameSessionProvider>
      </main>
    </Router>
    </ApolloProvider>
  );
}

export default App;
