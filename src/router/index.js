import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Layout.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: "login",
        component: () => import("@/views/login/login.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: '/register',
        name: "register",
        component: () => import("@/views/register/register.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: '/',
        component: Index,
        name: "Hello",
        meta: {
            title: "首页",
            requiresAuth: true
        },
        children: [
            {
                path: '/index',
                name: "index",
                component: () => import('@/views/index/index.vue'),
                meta: {
                    title: '聊天大厅',
                    requiresAuth: true
                }
            },
            {
                path: '/setting',
                name: 'setting',
                component:() => import('@/views/setting/setting.vue'),
                meta: {
                    title: '设置',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/user',
        name: 'userList',
        component: Index,
        meta: {
            title: '信息管理',
            requiresAuth: true
        },
        children: [
            {
                path: 'table',
                name: 'UserInfo',
                component: () => import('@/views/user/IUserInfo.vue'),
                meta: {
                    title: '个人信息',
                    requiresAuth: true
                }
            },
            {
                path: 'table/:id',
                name: "UserInfo",
                component: () => import('@/views/user/IUserInfo.vue'),
                meta: {
                    title: '用户信息',
                    requiresAuth: true
                }
            },
            {
                path: 'revise',
                name: 'UserUpdate',
                component: () => import('@/views/user/update.vue'),
                meta: {
                    title: '修改信息',
                    requiresAuth: true
                }
            }]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const token = store.getters.token
    if (!to.meta.isAuth) {
        if (to.name !== 'login') {
            if (token !== undefined) {
                next()
            } else {
                next({name: 'login'})
            }
        }
    } else {
        next()
    }
})

export default router
