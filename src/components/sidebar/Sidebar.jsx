import { Home, Logout, Person, Search } from '@mui/icons-material'
import React from 'react'
import './sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import io from 'socket.io-client';
import { LoginSuccess } from '../../status/UserSlice';

const Sidebar = () => {
  const socket = io('https://13.113.247.196/');
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [ ,removeCookie ] = useCookies(['token']);
  const dispatch = useDispatch();

  const logoutbtn = () => {
    socket.emit('userLogout', {
      userId: user.user._id, 
      username: user.user.username
    });
    dispatch(LoginSuccess(''));
    removeCookie('token');
    navigate('/login')
  }

  return (
    <div className='sidebar flex-[2.5] h-screen'>
      <div className="sidebarWrapper p-5">
        <ul className='sidebarList'>
          <li className="sidebarListItem">
            <Home className='sidebarIcon' />
            <Link to='/' >
              <span className='sidebarIconText'>主頁</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Search className='sidebarIcon' />
            <span className='sidebarIconText'>搜尋</span>
          </li>
          <li className="sidebarListItem">
            <Person className='sidebarIcon' />
            <Link to={`/profile/${user.user.username}`}>
              <span className='sidebarIconText'>個人主頁</span>
            </Link>
          </li>
        </ul>

        <hr className="sidebarHr my-5 mx-0" />

        <ul className='sidebarFriendList'>
          <button className='logoutbtn' onClick={logoutbtn}><Logout className='mb-1 mr-1'/>登出</button>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar