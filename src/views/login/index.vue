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
    v-validate="'required'"
    name="mobile"
    :error-message="errors.first('mobile')"
  />

  <van-field
    v-model="user.code"
    type="password"
    label="密码:"
    placeholder="请输入密码"
    v-validate="'required'"
    name="code"
    :error-message="errors.first('code')"
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
      myErrors: {
        mobile: '',
        code: ''
      },
      // 控制加载的状态
      loginLoading: false
    }
  },
  created () {
    this.configFormErrorMessages()
  },
  methods: {
    async handleLogin () {
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          return
        }

        this.loginLoading = true
        const data = await login(this.user)
        this.$router.push('/')
        this.$store.commit('setItem', data)
      } catch (err) {
        this.$toast.fail('登录失败')
        console.log(err)
      }
      this.loginLoading = false
    },
    // 配置 错误提示
    configFormErrorMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: '密码不能为空'
          }
        }
      }

      // 如果需要错误消息提示全局生效
      // Validator.localize('en', dict);

      // 组件中这也注册生效
      // or use the instance method
      this.$validator.localize('zh_CN', dict)
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
