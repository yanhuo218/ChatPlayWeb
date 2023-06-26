import request from "@/utils/request"

let defaultUrl = "/chatplay/chathistory"

export default {
    getMessages() {
        return request({
            method: "get",
            url: `${defaultUrl}/messages`,
        })
    }
}
