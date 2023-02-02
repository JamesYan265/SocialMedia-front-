import { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from './api/axiosClient';
import { LoginError, LoginSuccess } from './status/UserSlice';

const Tokenhandler = () => {
    const { user } = useSelector((store) => store.user);
    const [cookies, setCookie ] = useCookies(['token']);
    const dispatch = useDispatch();
    const getToken =  cookies.token;
  
    if(user) {
      setCookie('token', user.token, {path: '/'});
    }

    useEffect(() => {
        const CheckToken = async() => {
          try {
            const response = await axiosClient.post('/auth/token');
            dispatch(LoginSuccess(response));
          } catch (err) {
            dispatch(LoginError(err));
          }
        }
          
        if(getToken) {
          CheckToken();
        } else {
          console.log('No Token');
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
}

export default Tokenhandler