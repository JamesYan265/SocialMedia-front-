import { Search } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'

const User = ({searchStatus}) => {
  const [userlist, setUserList] = useState([]);
  const [searchedlist, setSearchedList] = useState([]);
  
  useEffect(() => {
    const userList = async() => {
      try {
        const response = await axios.get('/users/all/userlist');
        setUserList(response.data);
        setSearchedList(response.data);
      } catch(err) {
        console.log(err)
      }
    }

    userList();
  },[searchStatus])
  
  const searchValue = async(e) => {    
    let handleList = userlist.filter((user) => user.username.includes(e.target.value));
    setSearchedList(handleList);
  }

  return (
    <div className='UserPage flex-[6] mr-2 ml-1 border-2'>
        <div className="UserPageWrapper p-5">
          <div className='UserSection'>
            <span className='UserPageToptext'>搜尋其他用戶</span>
            <div className='SearchBox w-full rounded-3xl mt-1 mb-4 border-2 border-black flex items-center overflow-hidden'>
              <Search className='searchIcon !text-[20px] ml-[10px] mr-[5px] text-gray-400' />
              <input type='text' className="SearchInput border-none w-[85%] focus:outline-none" onChange={(e) => searchValue(e)} />
            </div>
            <div className='grid md:grid-cols-1 lg:md:grid-cols-2 xl:grid-cols-3 gap-4'>
              {searchedlist.map((list) => (
                <UserCard key={list._id} userInfo={list}/>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default User