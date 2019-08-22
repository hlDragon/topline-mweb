<template>
  <div>
    <van-nav-bar title="登录" />
    <van-field
      v-model="user.mobile"
      clearable
      left-icon="manager"
      placeholder="请输入手机号"
      v-validate="'required'"
      name="mobile"
      :error-message="errors.first('mobile')"
      data-vv-as="手机号"
    />
    <van-field
      v-model="user.code"
      left-icon="lock"
      type="password"
      placeholder="请输入验证码"
      v-validate="'required'"
      :error-message="errors.first('code')"
      name="code"
      data-vv-as="验证码"
    />
    <div class="login-btn">
      <van-button
        type="info"
        @click='onLogin'
        :loading="isLoginLoading"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isLoginLoading: false
    }
  },
  methods: {
    onLogin () {
      try {
        this.$validator.validate().then(async valid => {
          if (!valid) {
            return
          }
          this.isLoginLoading = true
          const data = await login(this.user)

          // 跳转到首页
          // this.$router.push({ name: 'home' })
          this.isLoginLoading = false
          console.log(data)
        })
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        }
        this.isLoginLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
