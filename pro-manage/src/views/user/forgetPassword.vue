<template>
  <div class="forget">
    <div class="wrap">
        <h1>找回密码</h1>
        <h2 v-show="isShow"><span class="iconfont iconcuo"></span>{{message}}</h2>
        <div class="username">
            <p>账号</p>
            <input v-model="username" type="text" placeholder="请输入账号">
        </div>
        <div class="code">
            <p>验证码</p>
            <input v-model="code" type="text" placeholder="请输入验证码">
            <div class="num">
                <span :style="{color: c1}">{{n1}}</span>
                <span :style="{color: c2}">{{n2}}</span>
                <span :style="{color: c3}">{{n3}}</span>
                <span :style="{color: c4}">{{n4}}</span>
            </div>
        </div>
        <div class="password">
            <p>新密码</p>
            <input v-model="password" type="text" placeholder="请输入新密码">
        </div>
        <div class="repeatPassword">
            <p>确认新密码</p>
            <input v-model="repeatPassword" type="text" placeholder="请输入新密码">
        </div>
        <button class="btn" @click="resetAction" >确认</button>
    </div>
    <div class="mask" v-if="showReturn" >
        <div class="return">
            <p>密码重置成功</p>
            <p><span>{{time}}</span>秒后自动跳转至登录页!</p>
            <button @click="returnAction">点击立即跳转</button>
        </div>
    </div>
  </div>
</template>

<script>
import http from '../../api/http';
import {RESETPSD} from '../../api/url';
export default {
    data(){
        return {
            message: '',
            isShow: false,
            username: '',
            password: '',
            repeatPassword: '',
            code: '',
            n1: '',
            c1: '',
            n2: '',
            c2: '',
            n3: '',
            c3: '',
            n4: '',
            c4: '',
            time: 5,
            showReturn: false
        }
    },
    methods: {
        async resetAction(){
            if(this.username == '' || this.password == '' || this.repeatPassword == '' || this.code == ''){
                this.message = '输入不能为空!';
                this.isShow = true;
                this.getCode();
                return ;
            }
            var code = '' + this.n1 + this.n2 + this.n3 + this.n4;
            if(this.code != code){
                this.message = '验证码输入错误，请重新输入!';
                this.isShow = true;
                this.getCode();
                return ;
            }
            if(this.password != this.repeatPassword){
                this.message = '密码输入不一致，请重新输入!';
                this.isShow = true;
                this.getCode();
                return ;
            }
            var res = await http.post(RESETPSD, {username: this.username, password: this.password});
            if(res.data.code == -1){
                this.message = res.data.message;
                this.isShow = true;
                this.getCode();
            }else{
                this.message = '';
                this.isShow = false;
                this.showReturn = true;
                this.timer = setInterval(() => {
                    this.time --;
                    if(this.time == 0){
                        clearInterval(this.timer);
                        this.returnAction();
                    }
                }, 1000);
            }

        },
        getCode(){
            this.n1 = Math.floor(Math.random()*10);
            this.n2 = Math.floor(Math.random()*10);
            this.n3 = Math.floor(Math.random()*10);
            this.n4 = Math.floor(Math.random()*10);

            function ranColor(){
                var color = '#';
                for(let i = 0; i < 6; i++){
                    var m = Math.floor(Math.random()*16);
                    var n = m.toString(16);
                    color += n;
                }
                return color;
            }
            this.c1 = ranColor();
            this.c2 = ranColor();
            this.c3 = ranColor();
            this.c4 = ranColor();
        },
        returnAction(){
            this.$router.push('/user/login');
        }
    },
    created(){
        this.getCode();
    }
}
</script>

<style lang="scss" scoped >
.forget{
    width: 100%;
    height: 100%;
    background: #6A7E99;
    position: relative;
    .wrap{
        width: 540px;
        height: 515px;
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
        >div{
            height: 45px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            p{
                width: 140px;
                text-align: end;
                font-size: 12px;
                color: #666;
                margin-right: 12px;
            }
            input{
                width: 272px;
                height: 45px;
                border: 1px solid #e4e4e4;
                line-height: 45px;
                color: #666;
                padding-left: 12px;
                font-size: 12px;
                &::placeholder{
                    color: #e4e4e4;
                }
            }
            &.code{
                input{
                    width: 162px;
                    margin-right: 10px;
                }
                .num{
                    width: 100px;
                    height: 45px;
                    line-height: 45px;
                    border: 1px solid #e4e4e4;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding: 0 20px;
                    span{
                        font-size: 16px;
                    }
                }
            }

        }
        .btn{
            display: block;
            width: 320px;
            height: 40px;
            line-height: 40px;
            margin: 40px auto 0;
            text-align: center;
            border: none;
            outline: none;
            border-radius: 5px;
            background: #1abc9c;
            color: #fff;
        }
    }
    .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        .return{
            width: 300px;
            height: 150px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: #fff;
            padding-top: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p{
                font-size: 12px;
                color: #999;
                line-height: 24px;
                text-align: center;
                span{
                    color: red;
                    margin-right: 3px;
                }
            }
            button{
                display: block;
                margin: 0 auto;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: none;
                outline: none;
                border-radius: 5px;
                background: lightblue;
                color: #fff;
                margin-top: 10px;
            }
        }
    }
}
</style>