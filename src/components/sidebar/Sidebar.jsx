import { Home, Logout, Person, Search } from '@mui/icons-material'
import React from 'react'
import './sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import io from 'socket.io-client';
import { LoginSuccess, LogoutClear } from '../../status/UserSlice';
import { UserSearchStart, UserSearchEnd } from '../../status/UserSearchSlice';

const Sidebar = () => {
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

  return (
    <div className='sidebar flex-[1] sm:flex-[2.5] h-screen'>
      <div className="sidebarWrapper p-5">
        <ul className='sidebarList'>
          <li className="sidebarListItem" onClick={() => dispatch(UserSearchEnd())} >
            <Link to='/' className='flex items-center'>
              <Home className='sidebarIcon' />
              <span className='sidebarIconText hidden sm:block'>主頁</span>
            </Link>
          </li>
          <li className="sidebarListItem cursor-pointer" onClick={() => dispatch(UserSearchStart())} >
            <Link to='/' className='flex items-center'>
              <Search className='sidebarIcon ' />
              <span className='sidebarIconText hidden sm:block'>搜尋用戶</span>
            </Link>
          </li>
          <li className="sidebarListItem" onClick={() => dispatch(UserSearchEnd())}>
            <Link to={`/profile/${user.user.username}`} className='flex items-center'>
              <Person className='sidebarIcon' />
              <span className='sidebarIconText hidden sm:block'>個人主頁</span>
            </Link>
          </li>
        </ul>

        <hr className="sidebarHr my-5 mx-0" />

        <ul className='sidebarFriendList'>
          <button className='logoutbtn flex justify-center items-center' onClick={logoutbtn}>
              <Logout className='mb-1 mr-1'/>
              <span className='hidden sm:block'>登出</span>
          </button>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar