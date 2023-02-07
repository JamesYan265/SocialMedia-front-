import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io('https://54.248.147.86/');



function App() {
  axios.defaults.baseURL = 'https://54.248.147.86/api';
  const { user } = useSelector((store) => store.user);
  socket.on('ServerMsg', (data) => console.log(data));

  if(user) {
    socket.emit('loginStatus', {
      userId: user.user._id, 
      username: user.user.username
    });

    //設置登出條件
    let timecount = 60 * 1000;
    let timeraction = setTimeout(() => {
      socket.emit('userLogout', {
        userId: user.user._id, 
        username: user.user.username
      });
    }, timecount);

    document.addEventListener('mousemove', () => {
      clearTimeout(timeraction);

      timeraction = setTimeout(() => {
        socket.emit('userLogout', {
          userId: user.user._id, 
          username: user.user.username,
        });
      }, timecount);
    })

    window.addEventListener("beforeunload", (e) => {
      socket.emit('userLogout', {
        userId: user.user._id, 
        username: user.user.username
      });
    })
  }
  

  return (
    <div className="App min-w-[600px]">
      <Router>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' /> }/>
          <Route path='/login' element={user ? <Navigate to='/' /> :  <Login />}/>
          <Route path='/register' element={user ? <Navigate to='/' /> : <Register />}/>
          <Route path='/profile/:username' element={<Profile />}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
