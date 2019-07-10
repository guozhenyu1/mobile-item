<template>
<div class = 'login-wrap'>
  <van-nav-bar
  title="登录"
/>
  <van-cell-group>
  <van-field
    v-model="user.mobile"
    required
    clearable
    label="手机号:"
    placeholder="请输入手机号"
    :error-message="errors.mobile"
  />

  <van-field
    v-model="user.code"
    type="password"
    label="验证码:"
    placeholder="请输入验证码"
    :error-message="errors.code"
    required
  />
</van-cell-group>
<div class = 'login-btn-box'>
  <van-button type="info" class='login-btn' :loading='loginLoading' @click.prevent='handleLogin' loading-text='加载中...'>登录</van-button>
</div>
</div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      errors: {
        mobile: '',
        code: ''
      },
      // 控制加载的状态
      loginLoading: false
    }
  },
  methods: {
    async handleLogin () {
      try {
        const { mobile, code } = this.user
        const errors = this.errors
        // 验证 手机号不为空
        if (mobile.length) {
          errors.mobile = ''
        } else {
          errors.mobile = '手机号不能空'
          return
        }
        // 验证验证码 不为空
        if (code.length) {
          errors.code = ''
        } else {
          errors.code = '验证码不能为空'
          return
        }

        this.loginLoading = true
        const data = await login(this.user)
        this.$router.push('/')
        this.$store.commit('setItem', data)
      } catch (err) {
        console.log(err)
      }
      this.loginLoading = false
    }
  }
}
</script>

<style lang ='less' scoped>
  .login-btn-box {
    padding:20px;

    .login-btn{
         width:100%;
    }
  }
</style>
