<template>
  <div class="login">
      <h1>账号登录</h1>
      <div class="form">
          <div class="name">
            <label for="">用户名:</label>
            <input type="text" placeholder="请输入账号" v-model="username">
          </div>
          <div class="psd">
              <label for="">密码:</label>
              <input type="text" placeholder="请输入密码" v-model="password">
          </div>
          <div class="add" @click="addAction" >
              没有账号？现在去注册...
          </div>
          <div class="btn">
              <button @click="loginAction">登录</button>
          </div>
      </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import http from '../../api/http';
import {LOGIN} from '../../api/url';
export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async loginAction(){
            if(this.username == '' || this.password == ''){
                Dialog({message: '输入不能为空!'});
                return;
            };
            var res = await http.post(LOGIN,{
                username: this.username,
                password: this.password
            });
            if(res.data.code == 0){
                Dialog({message: '登录成功!'});
                this.$router.push({
                    name:"home"
                })
            }else{
                Dialog({message: res.data.message});
            }
        },
        addAction(){
            this.$router.push({
                name:'add'
            })
        }
    }
}
</script>

<style scoped lang="scss">
.login{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
    z-index: 999;
    h1{
        height: 0.44rem;
        text-align: center;
        border-bottom: 1px solid #d7d7d7;
        font-size: 0.16rem;
        line-height: 0.44rem;
        color: #333;
    }
    .form{
        margin-top: 0.3rem;
        border-top: 1px solid #d7d7d7;
        .name,.psd{
            height: 0.5rem;
            display: flex;
            align-items: center;
            overflow: hidden;
            padding: 0 0.1rem;
            border-bottom: 1px solid #d7d7d7;
            label{
                width: 0.75rem;
                font-size: 0.14rem;
                color: #333;
                text-align: right;
                height: 0.3rem;
                line-height: 0.3rem;
                margin-right: 0.1rem;
            }
            input{
                width: 200px;
                height: 30px;
                line-height: 30px;
                padding-left: 10px;
                font-size: 14px;
                border: 1px solid #ccc;
                color: #666;
                transform: scale(2);
                transform-origin: left center;
                
            }
        }
        .btn{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.5rem;
            button{
                width: 2rem;
                height: 0.3rem;
                line-height: 0.3rem;
                text-align: center;
                border: none;
                border-radius: 0.02rem;
                outline: none;
                background: #18AE90;
                font-size: 0.14rem;
                color: #fff;
            }
        }
        .add{
            height: 0.3rem;
            line-height: 0.3rem;
            padding-right: 0.8rem;
            text-align: right;
            color: #18AE90;
        }
    }
}
</style>
