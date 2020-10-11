<template>
  <div class="staff-manager">
    <div class="name">
      <label for=""><i>*</i>用户名:</label>
      <input type="text" v-model="username" placeholder="请输入用户名">
    </div>
    <div class="psd">
      <label for=""><i>*</i>密码:</label>
      <input type="text" v-model="password" placeholder="请输入密码">
    </div>
    <div class="auth">
      <label for=""><i>*</i>选择角色:</label>
      <p><input type="radio" v-model="auth" value="A">大堂经理</p>
      <p><input type="radio" v-model="auth" value="B">收银</p>
      <p><input type="radio" v-model="auth" value="C">服务员</p>
    </div>
    <div class="conf">
      <span @click="addAction">确定添加</span>
    </div>
  </div>
</template>

<script>
import http from '../../api/http';
import {REGISTER} from '../../api/url';
export default {
  data(){
    return {
      username: '',
      password: '',
      auth: 'C'
    }
  },
  methods: {
    async addAction(){
      if(this.username == '' || this.password == ''){
        alert('输入不能为空!');
        return;
      }
      var res = await http.post(REGISTER, {
        username: this.username,
        password: this.password,
        auth: this.auth
      });
      alert(res.data.message);
      if(res.data.code == 0){
        this.username = '';
        this.password = '',
        this.auth = 'C';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.staff-manager{
  background: #fff;
  padding-top: 30px;
  .name,.psd,.auth{
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    display: flex;
  }
  .name,.psd{
    input{
      width: 642px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #e4e4e4;
      padding-left: 10px;
      font-size: 14px;
      color: #666;
      &::placeholder{
        color: #999;
      }
    }
  }
  label{
    width: 95px;
    text-align: right;
    line-height: 40px;
    font-size: 12px;
    color: #333;
    margin-right: 38px;
    i{
      color: red;
    }

  }
  .auth{
    p{
      height: 40px;
      display: flex;
      align-items: center;
      margin-right: 30px;
      font-size: 12px;
      color: #333;
      margin-bottom: 0;
      input{
        margin: 0;
      }
    }
  }
  .conf{
    width: 95%;
    margin: 40px auto 0;
    padding: 30px 0;
    border-top: 1px solid #e4e4e4;
    display: flex;
    span{
      width: 180px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border-radius: 5px;
      font-size: 12px;
      color: #fff;
      background: #1abc9c;
      margin: auto;
      cursor: pointer;
    }
  }
}
</style>