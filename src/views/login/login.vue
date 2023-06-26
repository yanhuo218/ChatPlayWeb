<template>
    <div id="index_login">
        <el-row :gutter="0">
            <el-col :span="6" :xs={span:0}></el-col>
            <el-col :span="12" :xs={span:24}>
                <div class="login">
                    <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginForm" label-position="left"
                             label-width="52px">
                        <el-form-item label="邮箱:" prop="mail">
                            <el-input v-model="LoginForm.mail" placeholder="请输入邮箱" @keyup.enter.native="submitLogin('LoginForm')"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="password">
                            <el-input v-model="LoginForm.password" placeholder="请输入密码" type="password" @keyup.enter.native="submitLogin('LoginForm')"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"  @click="submitLogin('LoginForm')" class="login_button">登录</el-button>
                            <el-button @click="resetForm('LoginForm')">重置</el-button>
                            <p class="toReg">
                                还没账号!!<el-link :underline="false" @click="toRegister">去注册</el-link>
                            </p>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="6" :xs={span:0}></el-col>
        </el-row>
    </div>
</template>
<script>
import("@/assets/css/login_register.css")
export default {
    name: "login",
    data() {
        const validateMail = (rule, value, callback) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (value === ''){
                callback(new Error('请输入邮箱'))
            }else {
                if (!emailRegex.test(value)){
                    callback(new Error('请注意格式'))
                }else {
                    callback()
                }
            }
        }
        const validatePwd = (rule, value, callback)=>{
            if (value === ''){
                callback(new Error('请输入密码'))
                this.$
            }else {
                callback()
            }
        }
        return {
            loading: false,
            LoginForm: {
                mail: '',
                password: ''
            },
            rules: {
                mail: [
                    {validator: validateMail, trigger: 'blur'}
                ],
                password:[
                    {validator: validatePwd, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitLogin(LoginForm) {
            this.$refs[LoginForm].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('login', this.LoginForm).then(() => {
                        this.loading = false
                        this.$router.push("/")
                    })
                } else {
                    return false;
                }
            })
        },
        resetForm(LoginForm){
            this.$refs[LoginForm].resetFields();
        },
        toRegister() {
            this.$router.push("/register")
        }
    }
}
</script>
