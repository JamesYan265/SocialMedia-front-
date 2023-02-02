import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux'
import { LoginSuccess } from '../../status/UserSlice';
import './Profile.css'

const Followbtn = ({pageUser}) => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [cookie] = useCookies('token');

    // const followCheck = user.user.followerings.includes(pageUser._id);
    const [followCheck, setFollowCheck] = useState(false);
    const [followbtntext, setFollowbtnText] = useState('');

    useEffect(() => {
        if(user.user.followerings.includes(pageUser._id)) {
            setFollowbtnText('取消跟隨');
            setFollowCheck(true)
        }  else {
            setFollowbtnText('跟隨');
            setFollowCheck(false)
        }

        if(document.getElementById('followbtn')) {
            document.getElementById('followbtn').value = followbtntext;
        }
    },[followbtntext, pageUser._id, user.user.followerings]);

    const followhandler = async() => {
        const currentUser = {
            userId: user.user._id,
        }
        
        if(followCheck) {
            try {
                await axios.put(`/users/${pageUser._id}/unfollow`, currentUser);
                const response = await axios.get(`/users/${user.user._id}`);
                dispatch(LoginSuccess({user :response.data, token:cookie['token']}));
            } catch(err) {
                console.log(err);
            }
        } else {
            try {
                await axios.put(`/users/${pageUser._id}/follow`, currentUser);
                const response = await axios.get(`/users/${user.user._id}`);
                dispatch(LoginSuccess({user :response.data, token:cookie['token']}));
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <input type='button' id='followbtn' className='followbtn btn absolute left-[65%] top-[215px]' onClick={followhandler}></input>
        </div>
    )
}

export default Followbtn