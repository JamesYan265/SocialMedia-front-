import { MoreVert } from '@mui/icons-material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Comment from './Comment';
// import { Users } from '../../dummyData';

const Post = ({post}) => {
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState([]);
    const [like, setLike] = useState(post.likes.length);
    const [isliked, setIsLike] = useState(false);
    const [isComment,setIsComment] = useState(false);
    const {user: currentUser} = useSelector((store) => store.user);
    // const user = Users.filter((user) => user.id === post.userId );

    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`/users/${post.userId}`);   
            //data = data.filter((user) => user._id === post.userId);
            setUser(response.data);
        }
        fetchUser();

        const comment = async() => {
            const respsonse = await axios.get(`/comments/${post._id}`);
            setComment(respsonse.data);
        }

        comment();
    }, [post._id, post.userId]);

    const handleLike = async() => {
        try {
            //Like API
            await axios.put(`/posts/${post._id}/like`, {userId: currentUser.user._id});
        } catch(err) {
            console.log(err);
        }
        setLike(isliked ? like - 1 : like + 1);
        setIsLike(!isliked);
    }

    const commentBox = () => {
        setIsComment(!isComment);
    }
    
  return (
    <div className='post w-full shadow-md shadow-[#65789f] rounded-[10px] my-[30px] mx-0 bg-white'>
        <div className="postWrapper p-2.5">
            <div className="postTop flex items-center justify-between">
                <div className="postTopLeft flex items-center">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture || '/assets/person/noAvatar.png'} alt="" className="postProfileImg h-12 w-12 rounded-full object-cover" />
                    </Link>
                    <span className='postUsername text-[15px] text-[550] my-0 mx-2.5'>{user.username}</span>
                    <span className="postDate text-[10px] text-gra">{format(post.createdAt)}</span>
                </div>

                <div className="postTopRight">
                <MoreVert />
                </div>
            </div>

            <div className="postCenter my-5 mx-0">
                <span className='postText whitespace-pre-line break-all'>{post.desc}</span>
                <div className='postImgBox flex w-full items-center justify-center mt-5'>
                    <img src={post.img} alt="" className="postImg w-[90%] max-h-[500px] rounded-xl object-cover" />
                </div>
            </div>
            <div className="postBottom flex items-center justify-between">
                <div className="postButtomLeft flex items-center">
                    <img src="/assets/heart.png" alt="" className='likeIcon w-6 h-6 mr-1 cursor-pointer' onClick={() => handleLike()}/>
                    <span className="postLikeCounter text-[15px]">{like}人按了喜歡</span>
                </div>
                <div className="postButtomRight">
                    <span className="postCommentText cursor-pointer border-b border-solid border-gray mr-1" onClick={commentBox}>{comment.length}:個回覆</span>
                </div>
            </div>
            {isComment ? <Comment post={post} comment={comment} setComment={setComment}/> : <></>}
        </div>
    </div>
  )
}

export default Post