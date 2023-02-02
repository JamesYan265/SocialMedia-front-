import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import './register.css'

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirmation = useRef();
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(['token']);

 

    useEffect(() => {
        const CheckToken = async () => {
            if (cookie.token !== 'null') { 
                try {
                    const response = await axiosClient.post('/auth/token');
                    if (response) {
                        navigate('/login');
                    }
                } catch (err) {
                    console.log(err.data);
                    setCookie('token',null, {path: '/'});
                }
            } else {
                console.log('Please Register or Login'); 
            }  
        }

        CheckToken();   
    })
 
    const handleSubmit = async (e) => { 
        e.preventDefault();

        //密碼和確認密碼
        if (password.current.value !== passwordConfirmation.current.value) {
            passwordConfirmation.current.setCustomValidity('密碼不一致👀')
        } else if(username.current.value.toString().trim().length < 6 || username.current.value.indexOf(' ') >= 0) {
            username.current.setCustomValidity('使用者名稱不得有空白鍵❌及長度不能小於6📏')
        } else {
            try {
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                };
                //註冊API
                await axios.post('/auth/register', user);
                navigate('/login');
            } catch (err) {
                console.log(err);
            }
        }

    }

    const navlogin = () => {
        navigate('/login');
    }

    return (
        <div className='regisster w-screen h-screen bg-[#f0f2f5] flex items-center justify-center'>
            <div className="regissterWrapper w-[70%] h-[70%] flex">
                <div className="regissterLeft registerLR">
                    <h3 className='regissterLogo text-5xl font-[800] text-green-600 mb-10'>Super Meida</h3>
                    <span className="regissterDesc">歡迎加入討論🔥，旅行, 玩具, 影音, 電影, 遊戲 - 你想討論的主題應有盡有</span>
                </div>
                <div className="regissterRight registerLR">
                    <form className="regissterBox h-96 p-5 bg-green-50 flex flex-col justify-between rounded-xl shadow-md shadow-[#65789f]" onSubmit={(e) => handleSubmit(e)}>
                        <p className="regissterMsg text-center font-[550] text-xl my-2.5 mx-0">註冊登入，分享喜悅</p>
                        <input type="text" className="registerInput" placeholder='使用者名稱' required ref={username}/>
                        <input type="email" className="registerInput" placeholder='電郵' required ref={email} />
                        <input type="password" autoComplete='new-password' className="registerInput" placeholder='密碼' required minLength='8' ref={password} />
                        <input type="password" autoComplete='new-password' className="registerInput" placeholder='確認密碼' required minLength='8' ref={passwordConfirmation} />
                        <button className="regissterButton btn" type='submit'>註冊</button>
                        <button className='regissterRegisterButton btn mt-3 !w-1/2 !bg-orange-600 self-center !text-[75%]' onClick={navlogin}>擁有帳號? 立即登入</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register