<template>
  <div class="login">
    <el-card class="me-card me-border login-box">
      <div class="login-title">
        <p class="p1">欢迎登陆</p>
        <p class="p2">Welcome to login</p>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        label-width="32px"
        :show-message="false"
        :hide-required-asterisk="true"
        @submit.native.prevent
      >
        <el-form-item prop="name" required>
          <i slot="label" class="el-icon el-icon-user"></i>
          <el-input v-model.trim="loginForm.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="pwd" required>
          <i slot="label" class="el-icon el-icon-lock"></i>
          <el-input v-model.trim="loginForm.pwd" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button class="me-button" @click="submitForm">立即登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: 'huangbingyan',
        pwd: '8816783bingyan'
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.doLogin(this.loginForm).then(res => {
            this.$router.replace({
              path: res
            })
          })
        } else {
          this.$message.error('请检查必选项')
        }
      })
    }
  },
  created () {
    document.onkeydown = e => {
      if (window.event.keyCode === 13) {
        this.submitForm()
      }
    }
  }
}
</script>

<style  scoped lang='scss'>
.login {
  position: fixed;
  background: url(../assets/img/login/login.png);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login-box {
  position: fixed;
  top: 24%;
  left: 60%;
  right: 15%;
  height: 52%;
  min-width: 280px;
  background-size: 4px 24px, 24px 4px !important;
}
.login-title {
  text-align: center;
  color: #3aaef8;
  margin: 8% 0;
  .p1{
      font-size: 22px; letter-spacing: 2px
  }
  .p2{
      margin-top: 5px
  }
}
.login-form {
  padding: 0 10%;
  .el-input {
    .el-input__inner {
      background-color: #fff !important;
    }
  }
}
.login-btn {
  margin: 10% auto;
  text-align: center;
  .el-button {
    margin-left: 33px;
    width: 70%;
    border-radius: 20px;
    color:#fff
  }
}

</style>
