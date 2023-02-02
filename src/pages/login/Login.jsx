import axios from 'axios';
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { LoginStart, LoginSuccess, LoginError } from "../../status/UserSlice";
import { useCookies } from 'react-cookie';
import './login.css'
import Tokenhandler from '../../Tokenhandler';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const email = useRef();
    const password = useRef();
    const [cookie] = useCookies(['token']);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(cookie.token !== 'null' && 'undefined') {
        Tokenhandler();
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const LoginCall = async(data) => {
            dispatch(LoginStart);
            try {
                const response = await axios.post('/auth/login', data)
                dispatch(LoginSuccess(response.data));
            } catch (err) {
                password.current.setCustomValidity(err.response.data.toString() + '👀')
                dispatch(LoginError(err.response.data));
                setTimeout(() => {
                    navigate('/');
                },3000)
            }
        }
        
        LoginCall(
            {
                email: email.current.value,
                password: password.current.value,
            }
        );
    }

    const navtoregedit = () => {
        navigate('/register')
    }

  return (
    <div className='login w-screen h-screen bg-[#f0f2f5] flex items-center justify-center'>
        <div className="loginWrapper w-[70%] h-[70%] flex">
            <div className="loginLeft loginLR">
                <h3 className='loginLogo text-5xl font-[800] text-green-600 mb-10'>Super Meida</h3>
                <span className="loginDesc">歡迎加入討論🔥，旅行, 玩具, 影音, 電影, 遊戲 - 你想討論的主題應有盡有</span>
            </div>
            <div className="loginRight loginLR">
                <form className="loginBox h-80 p-5 bg-green-50 flex flex-col justify-between rounded-xl shadow-md shadow-[#65789f]" onSubmit={(e) => handleSubmit(e)}>
                    <p className="loginMsg text-center font-[550] text-xl my-2.5 mx-0">立即登入，分享喜悅</p>
                    <input type="email" className="loginInput" placeholder='電郵'required ref={email}/>
                    <input type="password" className="loginInput" placeholder='密碼' required minLength="5" ref={password}/>
                    <button className="loginButton btn">登入</button>
                    <span className="loginForgot text-center text-green-600 my-3 mx-0">忘記了密碼的話</span>
                    <button className='loginRegisterButton btn mt-3 !w-1/2 !bg-orange-600 self-center !text-[75%]' onClick={navtoregedit}>沒有帳號? 立即加入</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login