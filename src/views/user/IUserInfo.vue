<template>
    <div>
        <el-row>
            <el-col :span="8" style="margin:0 auto;">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" style="display: flex">
                            <span style="flex: auto;">{{ ifThis ?"个人中心":"他的信息" }}</span>
                            <span>
                                <el-link @click="UpdateInfo" v-if="ifThis">修改</el-link>
                            </span>
                        </div>
                        <div class="name-avatar">
                            <el-avatar :src="UserInfo.avatar" :size="110"></el-avatar>
                        </div>
                        <div class="name-role">
                            <span class="sender">{{ UserInfo.nickname }}</span>
                        </div>
                        <div class="registe-info">
                            <span class="registe-info">注册时间：<i class="el-icon-time"></i>{{ UserInfo.gmtCreate }}</span>
                        </div>
                        <el-divider></el-divider>
                        <div class="personal-relation">
                            <div class="relation-item">邮箱号:
                                <div style="float: right; padding-right:20px;">{{ UserInfo.mail }}</div>
                            </div>
                        </div>
                        <div class="personal-relation">
                            <div class="relation-item">个人签名:
                                <div style="float: right; padding-right:20px;">{{ UserInfo.sign }}</div>
                            </div>
                        </div>
                        <div class="personal-relation">
                            <div class="relation-item">年龄:
                                <div style="float: right; padding-right:20px;">{{ UserInfo.age }}</div>
                            </div>
                        </div>
                        <div class="personal-relation">
                            <div class="relation-item">性别:
                                <div style="float: right; padding-right:20px;">{{ UserInfo.sex === 1 ? "女":"男" }}</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import userInfo from "@/api/user";
export default {
    data() {
        return {
            UserInfo: {
                mail: '',
                nickname: "",
                sign: "",
                avatar: "",
                sex: null,
                age: null,
                gmtCreate:''
            },
            ifThis: true
        }
    },
    watch: {// 监听路由
        $route(to, from) {
            this.init()
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.$route.params && this.$route.params.id) {
                this.getUserInfo(this.$route.params.id);
                this.ifThis = false;
            } else {
                this.ifThis = true;
                this.getUserInfo();
            }

        },
        getUserInfo(id) {
            console.log(id)
            if (id){
                userInfo.getUserInfoById(id).then(res => {
                    console.log(res.data)
                    this.UserInfo = res.data.user;
                });
            }else {
                userInfo.getUserInfo().then(res => {
                    console.log(res.data)
                    this.UserInfo = res.data.user;
                });
            }
        },
        UpdateInfo() {
            this.$router.push({path: '/user/revise'});
        }
    },
}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

.box-card {
    width: 100%;
}
.name-avatar{
    text-align: center;
    padding-top: 10px;
}
.name-role {
    font-size: 16px;
    padding: 5px;
    text-align: center;
}

.registe-info {
    text-align: center;
    padding-top: 10px;
}

.personal-relation {
    font-size: 16px;
    padding: 0 5px 15px;
    margin-right: 1px;
    width: 100%
}

.relation-item {
    padding: 12px;

}

.dialog-footer {
    padding-top: 10px;
    padding-left: 10%;
}

.el-row {
    width: 100%;
    height: 100%;
    display: flex;
}


.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
