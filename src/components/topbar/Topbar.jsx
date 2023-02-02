import { Search } from '@mui/icons-material';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Searched, Searching } from '../../status/SearchSlice';
import './Topbar.css';

const Topbar = () => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        try {
            if(e.target.value === '') {
                dispatch(Searched()); 
            } else {
                let response = await axios.get('/posts/allposts');
                let postfilter = response.data.filter((post) =>
                    post.desc.includes(e.target.value));
                dispatch(Searching(postfilter));
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='topbarContaine bg-green-700 h-[50px] w-full flex items-center sticky top-0 z-[100]'>
            <div className='topbarLeft basis-1/4'>
                <Link to='/'>
                    <span className='logo text-[24px] text-white font-bold ml-[20px]'>Super Media</span>
                </Link>
            </div>

            <div className='topbarCenter basis-5/12'>
                <div className='searchbar w-full h-[30px] bg-white rounded-[25px] flex items-center'>
                    <Search className='searchIcon !text-[20px] ml-[10px] mr-[5px]' />
                    <input type="text" className='searchInput border-none w-[80%] focus:outline-none' placeholder='你要搜尋什麼貼文' onChange={(e) => handleSearch(e)} />
                </div>
            </div>

            <div className='topbarRight basis-1/3 flex items-center justify-around text-white'>
                <div className="topbarItemIcons flex">
                    <Link to={`/profile/${user ? user.user.username : '/'}`} >
                        <img src={user ? user.user.profilePicture || '/assets/person/noAvatar.png' : '/'} alt="" className="topbarImg h-9 w-9 rounded-full cursor-pointer object-cover" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Topbar