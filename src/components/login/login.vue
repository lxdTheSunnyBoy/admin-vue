<template>
  <div class="login-wrap">
    <el-form label-position="top" ref="form" :model="userForm">
      <el-form-item label="用户名">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios'

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
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      // console.log(res)
      const data = res.data
      if (data.meta.status === 200) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>
<style>
  .login-wrap {
    width: 500px;
    height: 500px;
    background-color: skyblue;
    margin: 200px auto;
  }
</style>
