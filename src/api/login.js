import request from "@/utils/request"

let defaultUrl = "/chatplay/user"
export  default {
    login(userInfo){
        return request({
            method:"post",
            url:`${defaultUrl}/login`,
            data:userInfo
        })
    },
    getRegisterCode(mail){
        return request({
            method:'get',
            url:`/chatplay/common/code/${mail}`
        })
    },
    isUserExist(mail){
        return request({
            method:'get',
            url:`${defaultUrl}/isUserExist/${mail}`
        })
    },
    register(user){
        return request({
            method:'post',
            url:`${defaultUrl}/register`,
            data:user
        })
    }
}
