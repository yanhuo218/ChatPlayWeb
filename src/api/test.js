import request from "@/utils/request"

export default {
    getTest() {
        return request({
            url:`/chatplay/common/code/2187895499@qq.com`,
            method:"get"
        })
    }
}