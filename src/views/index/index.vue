<template>
    <el-container>
        <el-main class="chat-main">
            <el-scrollbar ref="scrollbar" :native="false" wrapClass="el-scrollbar__wrap--hidden-default">
                <div class="scroll-content">
                    <div v-for="(message,index) in messages" :key="index"
                         :class="message.id !== user.id ? 'chat-message':'chat-message-self'">
                        <div class="chat-message-header" >
                            <a @click="toUserInfo(message.id)" href="#">
                                <el-avatar :src="message.avatar" class="chat-message-header-avatar" :size="55"></el-avatar>
                            </a>
                            <span class="chat-message-nickname">{{ message.nickname }}</span>
                        </div>
                        <div class="chat-message-text">{{ message.message }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </el-main>
        <el-footer style="width: 100%;height: 10%" class="chat-footer">
            <el-input @keyup.ctrl.enter.native="send" class="chat-footer-input" v-model="input.message" type="textarea"
                      placeholder="请输入内容" :rows="2" autosize clearable></el-input>
            <el-button type="primary" icon="el-icon-send" @click="send" class="el-footer-button">发送</el-button>
        </el-footer>
    </el-container>
</template>

<script>
import userApi from "@/api/user";
import SockJS from "sockjs-client";
import chathistory from "@/api/Chathistory";
export default {
    name: "update",
    data() {
        return {
            messageSize: 1,
            messages: [],
            input: {
                message: "",
            },
            user: {
                id: "",
                avatar: "",
                nickname: "",
            },
            userInfo: {},
            stompClient: null
        };
    },

    created() {
        this.getUserInfo()
        this.getMessages()
        this.connection()
    },
    methods: {
        toUserInfo(row) {
            this.$router.push({path: `/user/table/${row}`})
        },
        scrollDown() {
            this.$nextTick(() => {
                const wrap = this.$refs.scrollbar.$refs.wrap
                let content = wrap.querySelector(".scroll-content");
                let mess = wrap.querySelector(".chat-message")
                content.style.height = (mess.offsetHeight * this.messageSize) + "px";
                wrap.scrollTo(0, wrap.scrollHeight - wrap.clientHeight)
            })
        },
        getUserInfo() {
            userApi.getUserInfo().then(response => {
                this.user.id = response.data.user.id
                this.user.avatar = response.data.user.avatar
                this.user.nickname = response.data.user.nickname
            })
        },
        connection() {
            const socket = new SockJS("http://localhost:8081/ws");
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, frame => {
                this.stompClient.subscribe("/topic/messages", message => {
                    return new Promise((resolve, reject) => {
                        let data = JSON.parse(message.body)
                        this.showResponse(data.data.message);
                        resolve();
                    })
                });
            });

        },
        getMessages() {
            chathistory.getMessages().then(response => {
                this.messages = response.data.messages
                this.messageSize = response.data.messages.length
                this.scrollDown()
            })
        },
        send() {
            if (this.input.message !== "") {
                const mess = JSON.stringify({
                    'id': this.user.id,
                    'message': this.input.message
                })
                this.stompClient.send("/app/chat", {}, mess);
                this.input.message = "";
            }
        },
        showResponse(message) {
            this.messages.push(message)
            this.scrollDown()
        }
    }
}
</script>

<style scoped>
.chat-message{
    width:60%;
    height: auto;
    position: relative;
    float: left;
    padding: 15px;
}
.chat-message-self {
    width:60%;
    height: auto;
    position: relative;
    float: right;
    padding: 15px;
    margin-right: 20px;
}
.chat-message-self .chat-message-header .chat-message-nickname{
    position: absolute;
    float: right;
    right: 9%;
}
.chat-message-self .chat-message-header .chat-message-header-avatar{
    position: relative;
    float: right;
}
.chat-message-self  .chat-message-text {
    position: absolute;
    right: 9%;
    top: 44%;
}


.chat-message .chat-message-header .chat-message-nickname{
    position: absolute;
    float: left;
    left: 9%;
}

.chat-message .chat-message-text {
    position: absolute;
    left: 9%;
    top: 44%;
}


.chat-message-text {
    max-width: 100%;
    white-space: pre-wrap;
    font-size: 14px;
    word-wrap: break-word;
    background-color: #fffff9;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #909399;
}

.el-scrollbar {
    height: 100%;
}

.el-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
}

.chat-main {
    width: 100%;
    height: 90%;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.el-footer {
    display: flex;
    flex-direction: row;
}

.chat-footer-input {
    width: 90%;
}

.el-textarea__inner {
    min-height: 100%;
    margin-bottom: 50px;
}

.el-footer-button {
    width: 10%;
    height: 50%;
}

</style>
