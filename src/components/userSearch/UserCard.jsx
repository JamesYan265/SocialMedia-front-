import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { UserSearchEnd } from '../../status/UserSearchSlice';
import './user.css'

const UserCard = ({userInfo}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const GoProfile = () => {
      dispatch(UserSearchEnd());
      navigate(`/profile/${userInfo.username}`);
    }

  return (
    <div className='UserCard'>
        <div className='UserCardSection'>
            <div className='Card border-2 w-[full] rounded-2xl bg-gray-600 text-center p-2 overflow-hidden'>
                <img src={userInfo.profilePicture || '/assets/person/noAvatar.png'} alt="" className="cardImg rounded-full object-cover h-36 w-36 mx-auto" />
                <span className='otherUsername text-white font-bold'>{userInfo.username}</span>
                <button className='otherUserprofilepage text-[90%]' onClick={GoProfile}>前往個人頁面</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard