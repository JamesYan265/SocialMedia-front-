import React, { useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import Tokenhandler from '../../Tokenhandler';
import User from '../../components/user/User'

const Home = () => {
  Tokenhandler();
  const [searchUser, setSearchUser] = useState(false);
  return (
    <div>
      <Topbar />
      <div className="homeContainer flex w-full bg-[#f8fcff]">
        <Sidebar searchUser={searchUser} setSearchUser={setSearchUser}/>
        {searchUser ? <Timeline /> : <User />}
        <Rightbar />
      </div>
    </div>
  )
}

export default Home