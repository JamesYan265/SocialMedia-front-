import React from 'react'
import { useNavigate } from 'react-router-dom'
import './user.css'

const UserCard = () => {
    const navigate = useNavigate();
  return (
    <div className='UserCard'>
        <div className='UserCardSection grid md:grid-cols-1 lg:md:grid-cols-2 xl:grid-cols-3 gap-4'>
            <div className='Card border-2 w-[full] rounded-2xl bg-gray-600 text-center p-2 overflow-hidden'>
                <img src="/assets/person/1.jpeg" alt="" className="cardImg rounded-full" />
                <span className='otherUsername text-white font-bold'>Demo Name</span>
                <button className='otherUserprofilepage text-[90%]'>前往個人頁面</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard