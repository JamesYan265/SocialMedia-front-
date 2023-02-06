import { Search } from '@mui/icons-material';
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

const User = () => {
  const searchValue = useRef();
  console.log(searchValue.current.value) 
  return (
    <div className='UserPage flex-[6] mr-2 ml-1 border-2'>
        <div className="UserPageWrapper p-5">
          <div className='UserSection'>
            <span className='UserPageToptext'>搜尋其他用戶</span>
            <div className='SearchBox w-full rounded-3xl mt-1 mb-4 border-2 border-black flex items-center overflow-hidden'>
              <Search className='searchIcon !text-[20px] ml-[10px] mr-[5px] text-gray-400' />
              <input type='text' className="SearchInput border-none w-[85%] focus:outline-none" ref={searchValue} />
            </div>
            <UserCard />
          </div>
        </div>
    </div>
  )
}

export default User