import React, { useEffect, useState } from 'react'
import Online from '../online/Online'
import './rightbar.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import News from './News'
//socket io
import io from 'socket.io-client';


const Rightbar = ({ username }) => {
  const socket = io('https://54.248.147.86/');
  const { user } = useSelector((store) => store.user);

  const [onlinelist, setOnlineList] = useState([{userId : null, username: null}]);
  
  useEffect(() => {
    socket.on('OnlineList', (data) => {
      if(data.length > 0) {
        setOnlineList(data);
      }
    })
    return () => {
      socket.off('OnlineList');
    };
  },[]);




  const [followinfo, setFollowInfo] = useState([
    {
      username:'LOADING',
      profilePicture:'',
    }
  ]);

  useEffect(() => {
    const getFollow = async () => {
      try {
        const response = await axios.get(`/users/${user.user._id}/follow`);
        setFollowInfo(response.data);
      } catch (error) {
        console.log(error)
      }

    }

    if(user) {
      getFollow();
    }
  },[user]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="eventContainer flex items-center">
          <img src="assets/mark.png" alt="" className="markImg h-10 w-10 mr-1.5" />
          <span className="eventText text-base text-[300]"><b>測試活動</b>開始中!</span>
        </div>
        <img src='/assets/event.jpeg' className='eventImg w-full rounded-[10px] my-6 mx-0' alt='' />

        <h4 className='rightbarTitle'>你的跟隨者</h4>
        <ul className="rightbarFriendList">
          {followinfo.map((user) => (
            <Online user={user} list={onlinelist} key={user.username} />
          ))}
        </ul>

        <p className='promotionTitle font-bold mb-2.5'>有趣的消息</p>
        <News />
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className='rightbarTitle'>個人資料</h4>
        <div className="rightbarInfo mb-7">
          <div className="rightbarInfoItem mb-2.5">
            <span className="rightbarInfokey">所在地:</span>
            <span className="rightbarInfokey">香港</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>你跟隨了</h4>
        {followinfo.map((user) => (
          <div className="rightbarFollowings" key={user.username}>
            <div className="rightbarFollowing">
              <img src={user.profilePicture || '/assets/person/noAvatar.png'} alt="" className="rightFollowingImg" />
              <span className="rightFollowingUsername">{user.username}</span>
            </div>
          </div>
        ))}
        <p className='promotionTitle font-bold mb-2.5'>有趣的消息</p>
        <News />
      </>
    )
  }

  return (
    <div className="rightbar flex-[3.5]">
      <div className="rightbarWrapper pt-5 pl-0 pr-5 pb-0">
        {username ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar