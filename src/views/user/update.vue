<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="头像" style="">
                <pan-thumb :image="String(UserInfo.avatar)"/>
                <el-button type="primary" icon="el-icon-upload" @click="imageCropperShow = true">更换头像
                </el-button>
                <image-cropper v-show="imageCropperShow" :width="300" :height="300" :key="imageCropperKey"
                               :url="'/file/upload'" field="file" @close="close" @crop-upload-success="cropSuccess"/>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="UserInfo.nickname"/>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input-number v-model="UserInfo.age" controls-position="right" min-width="0"/>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="UserInfo.sex" clearable placeholder="请选择">
                    <el-option :value="1" label="女"/>
                    <el-option :value="2" label="男"/>
                </el-select>
            </el-form-item>
            <el-form-item label="签名">
                <el-input v-model="UserInfo.sign" :rows="10" type="textarea"/>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveData">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import userApi from '@/api/user'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: {ImageCropper, PanThumb},
    data() {
        return {
            UserInfo: {
                mail: '',
                nickname: "",
                sign: "",
                avatar: "",
                sex: null,
                age: null,
                gmtCreate: ''
            },
            saveBtnDisabled: false, // 保存按钮是否禁用
            imageCropperShow: false,
            imageCropperKey: 0,
        }
    },
    created() {
        this.init()
    },
    methods: {
        cropSuccess(data) {
            this.imageCropperShow = false
            this.UserInfo.avatar = data.url
            this.imageCropperKey = this.imageCropperKey + 1
        },
        handleAvatarSuccess(res, file) {
            this.UserInfo.avatar = window.URL.createObjectURL(res.raw);
        },
        close() {
            this.imageCropperShow = false
            this.imageCropperKey = this.imageCropperKey + 1
        },
        // init
        init() {
            userApi.getUserInfo().then(res => {
                console.log(res)
                this.UserInfo = res.data.user
            })
        },
        // 保存
        saveData() {
            this.saveBtnDisabled = true
            console.log(this.UserInfo)
            userApi.updateUserInfo(this.UserInfo).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.saveBtnDisabled = false
                this.$router.push({path: '/user/table'});
            }).catch(err => {
                this.saveBtnDisabled = false
            })
        },
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
