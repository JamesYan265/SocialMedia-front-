import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux'
import CommentBox from './CommentBox';

const Comment = ({post, comment, setComment}) => {
    const {user} = useSelector((store) => store.user);
    const commentText = useRef();
    let commentlist = comment;

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(commentText.current !== undefined) {
            if(commentText.current.value.toString().length > 30) {
                document.getElementById('warning').innerHTML = '回覆最多只能限於30個字眼'
            } else {
                document.getElementById('warning').innerHTML = ''
                const commentCreate = {
                    postId : post._id,
                    userId : user.user._id,
                    comment : commentText.current.value,
                }
                try {
                    await axios.post('/comments', commentCreate);
                    commentText.current.value = '';
                    const comment = async() => {
                        const respsonse = await axios.get(`/comments/${post._id}`);
                        setComment(respsonse.data);
                    }
            
                    comment();
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }

  return (
    <div className='CommonSection m-4'>
        <hr className='border-dashed bg-gray-600'/>
        <form className="CommentContainer flex justify-between items-center" onSubmit={(e) => handleSubmit(e)}> 
            <img src={user.user.profilePicture || '/assets/person/noAvatar.png'} alt="" className="postProfileImg h-12 w-12 rounded-full object-cover border-2 border-neutral-500"/>
            <input type='text' id='commentText' className='m-4 border-2 border-solid w-full h-16 rounded-md' ref={commentText}/>
            <button className="shareButton border-none px-[10px] py-[20px] w-[15%] bg-green-600 cursor-pointer text-white rounded-md" type='submit'>傳送</button>
        </form>
        <span className='warning text-red-600' id='warning'></span>
        {comment.length > 0 ? <span className='m-1 text-gray-600'>留言</span> : <></>}
        {
        commentlist.map((comment) => 
            (<CommentBox comment={comment} key={comment._id}/>)
        )}
    </div>
  )
}
 
export default Comment