import React, { useEffect, useState } from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import Tokenhandler from '../../Tokenhandler';
import { useSelector } from 'react-redux';
import Edit from './Edit';
import './Profile.css'
import Followbtn from './Followbtn'

const Profile = () => {
    Tokenhandler();
    const [pageUser, setpageUser] = useState([]);
    const username = useParams().username;
    //更改Profile圖片使用
    const [clicked, setClicked] = useState(false);
    //設定是否顯示跟隨
    const [displayfollow, setdisplayfollow] = useState(false);
    const { user } = useSelector((store) => store.user);
    //Nav
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users?username=${username}`);
                setpageUser(response.data);
            } catch (error) {
                navigate('/');
                alert('不存在該使用者, 將自動回到主頁');
            }
        }
        fetchUser();

        //Follow相關
        if (user) {
            // const followCheck = user.user.followerings.includes(pageUser._id);
            if (username === user.user.username) {
                setdisplayfollow(false);
            } else {
                setdisplayfollow(true);
            }
        }
    }, [username, clicked, user, pageUser._id]);

    //換頭像
    const handleClick = (e) => {
        if (username === user.user.username) {
            setClicked(true);
        }
    }

    return (
        <>
            {user ? <Topbar /> : <></>}
            <div className="profile w-full flex bg-[#f8fcff]">
                {user ? <Sidebar /> : <></>}
                {clicked ? <Edit pageUser={pageUser} setClicked={setClicked} /> :
                    <div className="profileRight flex-[10.5]">
                        <div className="profileRightTop">
                            <div className="profileCover h-80 relative">
                                <img src={pageUser.coverPicture || "/assets/post/8.png"} alt="" className="profileCoverImg w-full h-60 object-cover" />
                                <img src={pageUser.profilePicture || '/assets/person/noAvatar.png'} alt="" onClick={(e) => handleClick(e)} className="profileUserImg absolute cursor-pointer h-40 w-40 top-40 left-0 right-0 rounded-full m-auto border-white border-[3px] border-solid object-cover" />
                                {displayfollow ? <Followbtn pageUser={pageUser}/> : <></>}
                            </div>
                            <div className="profileInfo flex flex-col items-center justify-center">
                                <h4 className='profileInfoName text-2xl font-bold'>{pageUser.username}</h4>
                                <span className="profileInfoDesc">{pageUser.desc}</span>
                            </div>
                        </div>
                        <div className="profileRightBottom flex">
                            <Timeline username={username} />
                            <Rightbar username={username} />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Profile