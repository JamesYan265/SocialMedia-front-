import axios from "axios";

//用於對AXIOS的設定檔
//提取存於localstorage 中的token資料

const getToken = () => document.cookie.split('token=')[1];

const axiosClient = axios.create({});

//使用API request之前的預先設定 https://axios-http.com/docs/interceptors
axiosClient.interceptors.request.use(async(config) => {
    return {
        ...config,
        headers: {
            "Content-Type" : "application/json",
            "authorization" : `Bearer ${getToken()}`, //將JWT加到request Header 傳送比server side
        }
    }
})

//使用APIt之前的預先設定 response https://axios-http.com/docs/interceptors
axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
        },
        (err) => {
            throw err.response;
        }
);

export default axiosClient