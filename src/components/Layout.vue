<template>
    <div class="bodyClass">
        <el-container>
            <el-menu class="el-menu-vertical-demo"
                     :collapse="isCollapse" :collapse-transition="true" :unique-opened="true">
                <router-link to="/index">
                    <el-menu-item index="1">
                        <i class="el-icon-location"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <el-submenu index="2">
                    <template v-slot:title>
                        <i class="el-icon-menu"></i>
                        <span slot="title">用户信息</span>
                    </template>
                    <router-link to="/user/table">
                        <el-menu-item index="1-1">
                            个人信息
                        </el-menu-item>
                    </router-link>
                    <router-link to="/user/revise">
                        <el-menu-item index="1-2">修改信息</el-menu-item>
                    </router-link>
                </el-submenu>
                <router-link to="/setting">
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">设置</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
            <el-container>
                <el-header height="50px">
                    <button class="head_aside" @click="OnIsCollapse">
                        <i class="el-icon-s-unfold"></i>
                    </button>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <template v-for="(item, index) in breadcrumbList">
                            <el-breadcrumb-item v-if="index === breadcrumbList.length - 1" :key="index"
                                                :to="{ path: item.path }">{{ item.name }}
                            </el-breadcrumb-item>
                            <el-breadcrumb-item v-else :key="index" disabled>{{ item.name }}</el-breadcrumb-item>
                        </template>
                    </el-breadcrumb>
                    <div class="header_avatar">
                        <el-dropdown @command="handleCommand" trigger="click">
                            <span class="el-dropdown-link">
                                <el-avatar :size="50" :src="userInfo.avatar" @error="errorHandler">
                                    <img alt="" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
                                </el-avatar>
                                <i class="el-icon-arrow-down el-icon--right" style="position: relative;top: -38px;left: 46px;"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="personal-info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="exit-login">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import {removeToken} from "@/utils/auth";

export default {
    data() {
        return {
            isCollapse: false,
            breadcrumbList: [],
            userInfo: {
                name: this.$store.getters.name,
                avatar: this.$store.getters.avatar
            }
        }
    },
    watch: {
        $route: {
            handler() {
                this.getBreadcrumbList();
            },
            immediate: true,
        },
    },
    methods: {
        errorHandler() {
            return this.userInfo.avatar === undefined;
        },
        getUserInfo() {
            this.$store.dispatch('getUserInfo').then(response => {
                this.userInfo = response
            })
        },
        OnIsCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        getBreadcrumbList() {
            const routes = this.$route.matched;
            this.breadcrumbList = routes.map((route) => ({
                path: route.path,
                name: route.meta.title,
            }));
        },
        exitLogin(){
            removeToken()
            this.$router.push({ path: this.redirect || '/login' })
        },
        handleCommand(command) {
            if (command === 'personal-info') {
                alert('个人信息');
            } else if (command === 'exit-login') {
                this.exitLogin();
            }
        },
    },
    created() {
        this.getUserInfo()
    }
}

</script>

<style scoped>
.el-main{
    padding: 0;
    margin: 0;
}
.el-dropdown-link{
    width: 100%;
    height: 100%;
    display: inline-block;
}
.header_avatar {
    width: 5%;
    height: 100%;
    float: right;
    position: relative;
    top: -36px;
}

.el-submenu .el-menu-item {
    min-width: 12%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 12%;
    min-height: 400px;
}

.el-breadcrumb {
    position: relative;
    top: -4px;
    left: 20px;
}

.head_aside {
    list-style: none;
    border: 0;
    background-color: #fffff9;
    position: relative;
    top: 13px;
    left: -10px;
}

.bodyClass {
    width: 100%;
    height: 100%;
}

.el-container {
    width: 100%;
    height: 100%;
}

.el-header, .el-footer {
    width: 100%;
    background-color: #fffff9;
}

.el-aside {
    background-color: #21252b;
    overflow: hidden;
}

.el-main {
    background-color: #E9EEF3;
}
</style>
