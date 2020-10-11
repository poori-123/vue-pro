<template>
  <div class="login">
      <div class="wrap">
        <h1>LOGO</h1>
        <h2 v-show="isShow"><span class="iconfont iconcuo"></span>{{message}}</h2>
        <p><span class="iconfont icongeren"></span><input v-model="username" class="username" type="text" placeholder="账号" ></p>
        <p><span class="iconfont iconsuo"></span><input v-model="password" class="password" type="text" placeholder="密码" ></p>
        <div class="handler">
            <div class="left">
                <input v-model="remember" type="checkbox">
                <span>记住密码</span>
            </div>
            <div class="right" @click="forgetAction" >
                忘记密码
            </div>
        </div>
        <button class="btn" @click="loginAction" >登录</button>
      </div>
  </div>
</template>

<script>
import http from '../../api/http';
import {LOGIN} from '../../api/url';
export default {
    data(){
        return {
            username: '',
            password: '',
            remember: false,
            message: '',
            isShow: false
        }
    },
    methods: {
        async loginAction(){
            if(this.username == '' || this.password == ''){
                this.message = '输入不能为空!';
                this.isShow = true;
                return;
            }
            var res = await http.post(LOGIN,{
                username: this.username,
                password: this.password
            });
            if(res.data.code == -1){
                this.message = res.data.message;
                this.isShow = true;
            }else{
                this.message = '';
                this.isShow = false;
                if(this.remember){
                    localStorage.setItem('user', JSON.stringify({username:this.username,password:this.password}));
                }else{
                    localStorage.removeItem('user');
                }
                localStorage.setItem('loguser', JSON.stringify(res.data.data));
                this.$router.push('/home');
            }
        },
        forgetAction(){
            this.$router.push('/user/forgetPassword')
        }
    },
    created(){
        var str = localStorage.getItem('user');
        if(str){
            var user = JSON.parse(str);
            this.username = user.username;
            this.password = user.password;
            this.remember = true;
        }
    }
}
</script>

<style lang="scss" scoped >
.login{
    width: 100%;
    height: 100%;
    background: #6A7E99;
    position: relative;
    .wrap{
        width: 540px;
        height: 400px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        h1{
            height: 130px;
            line-height: 130px;
            font-size: 30px;
            color: #3bb19c;
            text-align: center;
        }
        h2{
            position: absolute;
            top: 100px;
            left: 120px;
            color: red;
            font-size: 12px;
            display: flex;
            align-items: center;
            .iconfont{
                margin-right: 5px;
            }
        }
        p{
            width: 320px;
            height: 45px;
            margin: 0 auto;
            margin-bottom: 20px;
            position: relative;
            input{
                display: block;
                width: 100%;
                height: 100%;
                border: 1px solid #e4e4e4;
                line-height: 43px;
                font-size: 14px;
                color: #666;
                padding-left: 60px;
                margin: 0 auto;
                &::placeholder{
                    color: #dbdbdb;
                }
            }
            span{
                position: absolute;
                line-height: 45px;
                left: 12px;
                top: 0;
                &.iconfont {
                    font-size: 30px;
                    color: #dbdbdb;
                }
            }
        }
        .handler{
            width: 320px;
            margin: 0 auto 20px;
            height: 16px;
            display: flex;
            justify-content: space-between;
            .left{
                line-height: 16px;
                color: #999;
                font-size: 12px;
                display: flex;
                align-items: center;
                input{
                    margin: 0 3px 0 0;
                }
            }
            .right{
                line-height: 16px;
                color: #999;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .btn{
            width: 320px;
            height: 40px;
            border-radius: 5px;
            background: #1abc9c;
            font-size: 14px;
            color: #fff;
            display: block;
            margin: 0 auto;
            border: none;
            outline: none;
        }

    }
}
</style>