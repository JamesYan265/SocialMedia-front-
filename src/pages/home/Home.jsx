import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import Tokenhandler from '../../Tokenhandler';
import User from '../../components/userSearch/User'
import { useSelector } from 'react-redux'

const Home = () => {
  Tokenhandler();
  const {searchStatus} = useSelector((store) => store.userSearch)

  return (
    <div>
      <Topbar />
      <div className="homeContainer flex w-full bg-[#f8fcff]">
        <Sidebar/>
        {searchStatus ? <User searchStatus={searchStatus}/> : <Timeline /> }
        <Rightbar />
      </div>
    </div>
  )
}

export default Home