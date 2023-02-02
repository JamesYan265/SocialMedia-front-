import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import Tokenhandler from '../../Tokenhandler';

const Home = () => {
  Tokenhandler();
  return (
    <div>
      <Topbar />
      <div className="homeContainer flex w-full bg-[#f8fcff]">
        <Sidebar />
        <Timeline />
        <Rightbar />
      </div>
    </div>
  )
}

export default Home