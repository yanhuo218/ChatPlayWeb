<template>
    <div id="index_login">
        <el-row :gutter="0">
            <el-col :span="6" :xs={span:0}></el-col>
            <el-col :span="12" :xs={span:24}>
                <div class="login">
                    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-position="left"
                             label-width="120px">
                        <el-form-item  prop="mail">
                            <el-input v-model="registerForm.mail" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item class="item_code" prop="code">
                            <el-input v-model="registerForm.code" placeholder="验证码" ></el-input>
                            <el-button :disabled="loading" @click="getCode">{{GetCodeInfo}}</el-button>
                        </el-form-item>

                        <el-form-item  prop="password">
                            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item  prop="checkPassword">
                            <el-input type="password" v-model="registerForm.checkPassword" placeholder="请再次输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"  @click="submitRegister('registerForm')" class="login_button">注册</el-button>
                            <el-button @click="resetForm('registerForm')">重置</el-button>
                            <p class="toLog">已有账号!!
                                <el-link :underline="false" @click="toLogin">去登录</el-link>
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
    name: "register",
    data() {
        const validateMail = (rule, value, callback) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (value === ''){
                callback(new Error('请输入邮箱'))
            }else {
                if (!emailRegex.test(value)){
                    callback(new Error('请注意格式'))
                }else {
                    this.$store.dispatch('isUserExist',this.registerForm.mail).then(res =>{
                        if (res){
                            callback()
                        }else {
                            callback(new Error('账号已存在'))
                        }
                    })

                }
            }
        }
        const validatePwd = (rule, value, callback)=>{
            if (value === ''){
                callback(new Error('请输入密码'))
            }else {
                callback()
            }
        }
        const validatePwd2 = (rule, value, callback)=>{
            if (value === ''){
                callback(new Error('请再次输入密码'))
            }else if (value !== this.registerForm.password){
                callback(new Error('两次输入的密码不一致'))
            }else {
                callback()
            }
        }
        const validateCode = (rule, value, callback)=>{
            if (value === ''){
                callback(new Error('验证码不能为空'))
            }else {
                callback()
            }
        }
        return {
            loading: false,
            isGetCode:false,
            GetCodeInfo:'发送验证码',
            time:60,
            registerForm: {
                mail: '',
                password: '',
                checkPassword:'',
                code:''
            },
            rules: {
                mail: [
                    {validator: validateMail, trigger: 'blur'}
                ],
                password:[
                    {validator: validatePwd, trigger: 'blur'}
                ],
                checkPassword:[
                    {validator: validatePwd2, trigger: 'blur'}
                ],
                code:[
                    {validator: validateCode, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        getCode(){
            this.$refs.registerForm.validateField('mail',(error) =>{
                if (error === ''){
                    this.$store.dispatch('getRegisterCode',this.registerForm.mail).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '验证码获取成功!'
                        });
                    })
                    const get = setInterval(()=>{
                        this.isGetCode = true
                        this.GetCodeInfo = this.time+"s后重新发送"
                        this.time--
                        if (this.time <= 0){
                            this.isGetCode = false
                            this.time = 60
                            this.GetCodeInfo = "重新发送"
                            clearInterval(get)
                        }
                    },1000)
                }
            })

        },
        submitRegister(registerForm) {
            this.loading = true
            this.$refs[registerForm].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('register', this.registerForm).then(res => {
                        this.loading = false
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '注册成功马上跳转!'
                            });
                            this.$router.push("/login")
                        }
                        this.resetForm()
                    })
                } else {
                    return false;
                }
            })
            // this.$refs.registerForm.validateField('code',error =>{
            //     if (error === '') {
            //
            //     }
            // })
        },
        resetForm(){
            this.$refs.registerForm.resetFields();
        },
        toLogin() {
            this.$router.push("/login")
        }
    }
}
</script>

<style scoped>
.toLog{
    margin: 0;
    float: right;
    position: relative;
    right: 0;
}
.item_code .el-input{
    width: 60%;
}
.item_code .el-button{
    width: 40%;
    float: right;
}
</style>