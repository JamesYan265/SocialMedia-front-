import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

const CommentBox = ({comment}) => {
    const [cmUser, setCMUser] = useState([]);

    useEffect(() => {
        const commentUser = async() => {
            try {
                const responses = await axios.get(`/users/${comment.userId}`);
                setCMUser(responses.data)
            } catch (err) {
                console.log(err);
            }
        }
        commentUser();

    },[comment])
  return (
    <div className='commentBoxContainer m-1'>
        <div className='commentBox bg-gray-300 rounded-lg flex items-center p-1'>
            <img src={cmUser.profilePicture || '/assets/person/noAvatar.png'} alt="" className="postProfileImg h-10 w-10 rounded-full object-cover border-2"/>
            <div className='commentUser font-bold mx-2'>{cmUser.username} :</div>
            <div className="commentdesc whitespace-pre-line break-all"><u>{comment.comment}</u></div>
        </div>
    </div>
  )
}

export default CommentBox