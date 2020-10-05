import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // 配置公共路径
axios.interceptors.request.use((config)=>{
    config.headers.a = 1

    return config
})
axios.interceptors.response.use((res)=>{
    if(res.data.code == 0){
        return res.data.data
    }
    return Promise.reject(res);
},(err)=>{
    return Promise.reject(err);
})

export default axios;