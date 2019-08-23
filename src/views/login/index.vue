<template>
  <div class="body">
    <van-nav-bar title="登录" />
    <van-field
      v-model="user.mobile"
      clearable
      left-icon="manager"
      placeholder="请输入手机号"
      v-validate="'required'"
      name="mobile"
      :error-message="errors.first('mobile')"
    />
    <van-field
      v-model="user.code"
      left-icon="lock"
      type="password"
      placeholder="请输入验证码"
      v-validate="'required'"
      :error-message="errors.first('code')"
      name="code"
    >
    <van-button
        slot="button"
        size="small"
        type="primary"
        round
        color="#f1f1f1"
        class="textcolor"
      >获取验证码</van-button>
    </van-field>
    <div class="login-btn">
      <van-button
        type="info"
        @click='onLogin'
        :loading="isLoginLoading"
      >登录</van-button>
    </div>
    <p class="footer">隐私条款</p>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
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
  created () {
    this.customValidateMessage()
  },
  methods: {
    ...mapMutations(['setUser']),
    async onLogin () {
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          return
        }
        this.isLoginLoading = true
        const data = await login(this.user)

        this.setUser(data)

        // 跳转到首页
        // this.$router.push({ name: 'home' })
        this.isLoginLoading = false
        // console.log(data)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('程序异常，请稍后再试')
        }
        this.isLoginLoading = false
      }
    },
    customValidateMessage () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: '验证码不能为空'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  background-color: rgb(238, 247, 244);
  .van-button {
    width: 100%;
    border-radius: 5px;
  }
}
.van-field__button {
.textcolor {
  color: #888!important;
}
}
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(238, 247, 244);
}
.footer {
  position: fixed;
  bottom: 10px;
  width: 100%;
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>
