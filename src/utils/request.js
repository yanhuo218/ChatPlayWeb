import axios from 'axios'
import {Message} from 'element-ui'
import {getToken} from "@/utils/auth";

const instance = axios.create({
    baseURL: "http://localhost:8081", timeout: 6 * 1000
})
instance.interceptors.request.use(request => {
    if (request.headers['token'] === undefined) {
        request.headers['token'] = getToken()
    }
    return request
})
instance.interceptors.response.use(response => {
    const res = response.data
    if (res.code !== 20000) {
        if (res.code === 20002) {
            Message({
                message: "登录失效，请重新登录", type: 'error',
            })
            window.location.href = "/login"
            return Promise.reject(new Error(res.message || 'Error'))
        } else if (res.code === 20003) {
            Message({
                message: res.message, type: 'error',
            })
        } else if (res.code === 20006||res.code === 20001) {
            Message({
                message: res.message, type: 'error',
            })
        }
        return undefined
    } else {
        return response.data;
    }
});

export default instance;
