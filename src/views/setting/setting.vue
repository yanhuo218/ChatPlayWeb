<template>
    <div class="chat-setting">
        <div class="setting-box">
            <div class="setting-title">
                <h3 style="text-align: center">账户设置</h3>
                <el-divider></el-divider>
            </div>
            <div class="setting-body">
                <span>
                    <el-button type="text" @click="UpdateMail">
                        修改邮箱
                    </el-button>
                    <el-dialog title="修改邮箱" :visible.sync="dialogUpdateMailVisible">

                    </el-dialog>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    <el-button type="text">
                        修改密码
                    </el-button>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    <el-button type="text">
                        忘记密码
                    </el-button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "setting",
    data() {
        return {
            dialogUpdateMailVisible: false,
            newMail:'',
            newPassword:'',
            newPasswordTwo:''
        }
    },
    created() {

    },
    methods: {
        UpdateMail() {
            this.dialogUpdateMailVisible = !this.dialogUpdateMailVisible
        }
    }
}
</script>

<style scoped>
.chat-setting {
    width: 100%;
    height: 100%;
}

.setting-box {
    width: 500px;
    height: 100%;
    margin: 0 auto;
    position: relative;
}

.setting-body {
    text-align: center;
}
</style>
