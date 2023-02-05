import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import { useSelector } from 'react-redux';
//socket io
import io from 'socket.io-client';
const socket = io('https://13.113.247.196/');

const Timeline = ({ username }) => {
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

  }, [search, user, username, listen]);
  
  return (
    <div className='timeline flex-[6]'>
      <div className="timelineWrapper p-5">
        {user ? <Share /> : ''}
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  )
}

export default Timeline