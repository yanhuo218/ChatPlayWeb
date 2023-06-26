import request from "@/utils/request"

let defaultUrl = "/chatplay/user"

export default {
    getUserInfo() {
        return request({
            method:"get",
            url:`${defaultUrl}/getLoginInfo`,
        })
    },
    getUserInfoById(id) {
        return request({
            method:"get",
            url:`${defaultUrl}/getInfoById/${id}`,
        })
    },
    updateUserInfo(data) {
        return request({
            method:"put",
            url:`${defaultUrl}/updateUser`,
            data:data
        })
    }
}
