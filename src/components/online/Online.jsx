import React from 'react'
import { useEffect } from 'react';
import '../rightbar/rightbar.css'


const Online = ({user, list}) => {
  const online = list;

  
  useEffect(() => {
    online.map(element => {
      if(user._id === element.userId ) {
        let oc = document.getElementById('onlineCircle');
        let rbContainer = document.getElementById('rbcontainer');
        rbContainer.title ='在線上'
        oc.classList.replace('rightbarOffline', 'rightbarOnline');
      }
    });
  },[online])

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer" id='rbcontainer' title='離線中'>
        <img src={user.profilePicture || '/assets/person/noAvatar.png'} alt="" className="rightbarProfileImg" />
        <span id='onlineCircle' className='rightbarOffline'></span>
      </div>
      <span className='rightbarUsername'>{user.username}</span>
    </li>
  )
}

export default Online