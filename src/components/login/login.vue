<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" ref="form" :model="userForm">
      <h1 class="login-name">电商网站登录</h1>
      <el-form-item label="用户名">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {saveUserInfo} from '@/assets/js/auch'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // console.log(this.userForm)
      const res = await this.$http.post('/login', this.userForm)
      // console.log(res)
      const data = res.data
      if (data.meta.status === 200) {
        // 把当前服务器登录的用户信息存储到本地存储
        // auch
        // saveUserInfo 方法
        // getToken   方法
        // checkToken
        saveUserInfo(data.data)
        this.$router.push({
          name: 'home'
        })
        this.$message({
          type: 'success',
          message: '登录成功'
        })
      }
    }
  }
}
</script>
<style>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-name {
    text-align: center;
  }

  .login-wrap .login-form {
    background-color: #fff;
    width: 500px;
    padding: 30px;
    border-radius: 6px;
  }

  .login-btn {
    width: 100%;
  }
</style>
