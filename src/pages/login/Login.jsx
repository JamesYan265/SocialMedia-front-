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
                password.current.setCustomValidity(err.response.data.toString() + 'π')
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
                <span className="loginDesc">ζ­‘θΏε ε₯θ¨θ«π₯οΌζθ‘, η©ε·, ε½±ι³, ι»ε½±, ιζ² - δ½ ζ³θ¨θ«ηδΈ»ι‘ζζη‘ζ</span>
            </div>
            <div className="loginRight loginLR">
                <form className="loginBox h-80 p-5 bg-green-50 flex flex-col justify-between rounded-xl shadow-md shadow-[#65789f]" onSubmit={(e) => handleSubmit(e)}>
                    <p className="loginMsg text-center font-[550] text-xl my-2.5 mx-0">η«ε³η»ε₯οΌεδΊ«εζ</p>
                    <input type="email" className="loginInput" placeholder='ι»ι΅'required ref={email}/>
                    <input type="password" className="loginInput" placeholder='ε―η’Ό' required minLength="5" ref={password}/>
                    <button className="loginButton btn">η»ε₯</button>
                    <span className="loginForgot text-center text-green-600 my-3 mx-0">εΏθ¨δΊε―η’Όηθ©±</span>
                    <button className='loginRegisterButton btn mt-3 !w-1/2 !bg-orange-600 self-center !text-[75%]' onClick={navtoregedit}>ζ²ζεΈ³θ? η«ε³ε ε₯</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login