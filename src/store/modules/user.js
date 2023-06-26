import {getToken, setToken} from '@/utils/auth'
import login from "@/api/login";
import ApiUser from "@/api/user";

const user = {
    state: {
        token: getToken(),
        name: undefined,
        avatar: undefined
    },
    mutations: {
        SET_TOKEN: (state, newToken) => {
            state.token = newToken
        },
        SET_NAME: (state, nickname) => {
            state.name = nickname
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        }
    },
    actions: {
        login({commit}, UserInfo) {
            return new Promise((resolve, reject) => {
                login.login(UserInfo).then(response => {
                    if (response !== undefined) {
                        const data = response.data
                        setToken(data.token)
                        commit('SET_TOKEN', data.token)
                        resolve()
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject)=>{
                login.register(user).then(response =>{
                    if (response !== undefined){
                        resolve(true)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                ApiUser.getUserInfo().then(response => {
                    if (response !== undefined) {
                        const userInfo = response.data.user
                        commit('SET_NAME', userInfo.nickname)
                        commit('SET_AVATAR', userInfo.avatar)
                        resolve(userInfo)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getRegisterCode({commit}, mail) {
            return new Promise((resolve, reject) => {
                login.getRegisterCode(mail).then(response => {
                    if (response !== undefined) {
                        resolve()
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        isUserExist({commit},mail){
            return new Promise((resolve, reject)=>{
                login.isUserExist(mail).then(response=>{
                    if (response !== undefined){
                        resolve(true)
                    }else {
                        resolve(false)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
