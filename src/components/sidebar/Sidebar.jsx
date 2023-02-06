import { Home, Logout, Person, Search } from '@mui/icons-material'
import React from 'react'
import './sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import io from 'socket.io-client';
import { LoginSuccess, LogoutClear } from '../../status/UserSlice';

const Sidebar = ({setSearchUser, searchUser}) => {
  const socket = io('https://54.248.147.86/');
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
    dispatch(LogoutClear());
    navigate('/login')
  }
  
  const searchUserFn = () => {
    setSearchUser(!searchUser);
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
          <li className="sidebarListItem cursor-pointer" onClick={searchUserFn} >
            <Search className='sidebarIcon' />
            <span className='sidebarIconText'>搜尋用戶</span>
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