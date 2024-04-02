<template>
  <el-row class="login">
    <el-col :span="16" class="flex-layout login-left">左侧内容区域</el-col>
    <el-col :span="8" class="flex-layout login-right">
      <div class="login-box">
        <div class="title">欢迎来到---系统</div>
        <div class="line"></div>
        <el-form
          ref="formRef"
          :model="loginForm"
          class="login-form"
          label-position="top"
          :hide-required-asterisk="true"
        >
          <el-form-item
            label="账号"
            prop="account"
            :rules="[
              { required: true, message: '账号不能为空！' }
            ]"
          >
            <el-input
              v-model.number="loginForm.account"
              type="text"
              autocomplete="off"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '密码不能为空！' }
            ]"
          >
            <el-input
              v-model.number="loginForm.password"
              type="password"
              show-password
              autocomplete="off"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import type { FormInstance } from 'crane-nest'
import { loginAPI } from '@/api/account'
import { useRouter } from 'vue-router'
const router = useRouter()

const formRef = ref<FormInstance>()

const loginForm = reactive({
  account: '',
  password: ''
})

// 防止回车重复触发
const loginFlag = ref(true)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await loginAPI(loginForm)
        // token
        localStorage.setItem('token', res.data.token)
        // 菜单
        localStorage.setItem('menus', JSON.stringify(res.data.menus))
        // 用户信息
        localStorage.setItem('userInfo', JSON.stringify(res.data.user))
        // 跳转到首页
        router.push('/')
        loginFlag.value = false
      } catch (error) {
        
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 添加回车键提交功能
const onKeyup = (e: any) => {
  // 防止重复触发
  if (e.keyCode === 13 && loginFlag.value) {
    submitForm(formRef.value)
  }
}
onMounted(() => {
  window.addEventListener('keyup', onKeyup)
})
onBeforeUnmount(() => {
  window.removeEventListener('keyup', onKeyup)
})
</script>
<style lang="scss" scoped>
.login{
  min-height: 100vh;
  background-color: cornflowerblue;
  flex: 1;
  .login-left {
    font-size: 30px;
  }
  .login-right {
    background-color: rgba(255, 255, 255, 0.9);
    flex-direction: column;
    .login-box {
      width: 330px;
      .title {
        height: 42px;
        font-size: 30px;
        font-weight: 700;
        color: #2C2D31;
        line-height: 35px;
        margin-bottom: 7px;
      }
      .line {
        width: 60px;
        height: 8px;
        background: #EE722E;
        border-radius: 16px 16px 16px 16px;
        margin-bottom: 20px;
      }
      .login-form {
        .login-btn {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
    
  }
}
</style>