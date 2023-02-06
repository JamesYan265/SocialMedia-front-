import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import { useSelector } from 'react-redux';
//socket io
import io from 'socket.io-client';
const socket = io('https://13.113.247.196/');

const Timeline = ({ username, selfpage }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((store) => store.user);
  const { search } = useSelector((store) => store);
  const [ listen, setListen ] = useState(false);
  
  useEffect(() => {
    if(search.searchContent === null) {
      const fetchPosts = async () => {
        if (user !== 'null') {
          const response = username ? await axios.get(`/posts/profile/${username}`) : await axios.get(`/posts/timeline/${user.user._id}`);
          setPosts(response.data);
          socket.on('NewPost', (newPost) => {
            setPosts([...posts, newPost]);
            setListen(!listen);
          })
        }
      }

      fetchPosts();
    } else {
      setPosts(search.searchContent);
    }

  }, [search, user, username]);

  const PublicTimeline = () => {
    return (
      <div className="timelineWrapper p-5">
        {user ? <Share /> : ''}
      </div>
    )
  }

  const PrivateTimeline = () => {
    const IsSelf = () => {
      return (
        <div className="timelineWrapper p-5">
        </div>
      )
    }
    return (
      <>
        {selfpage ? <IsSelf /> : <PublicTimeline />}
      </>
    )
  }
  
  return (
    <div className='timeline flex-[6]'>
      {username ? <PrivateTimeline/> : <PublicTimeline/>}
      <div className='timelineWrapper p-5'>
        {posts.length < 1 ? 
            (        
            <div className='NoPost h-[50vh] flex items-center justify-center'>
              <h1 className='font-bold text-[40px] text-gray-400'>如沒有POST，可以在頂部搜索條尋找你想看的內容👆</h1>
            </div>
            ) : 
            posts.map((post) => (
              <Post post={post} key={post._id} />
            ))
          }
      </div>
    </div>
  )
}

export default Timeline