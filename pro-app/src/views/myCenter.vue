<template>
  <div class="myCenter">
    <h1>我的<span @click="logoutAction">退出</span></h1>
    <div class="info">
        <img src="https://axhub.im/pro/221031c5a692ef70/images/%E6%88%91%E7%9A%84/u32.png" alt="">
        <p>{{username}}</p>
    </div>
    <div class="handler">
        <li @click="orderAction"><span>我的订单</span><span class="iconfont iconyou"></span></li>
        <li><span>我的预约</span><span class="iconfont iconyou"></span></li>
        <li><span>我的优惠卷</span><span class="iconfont iconyou"></span></li>
    </div>
    <router-view/>
  </div>
</template>

<script>
import http from '../api/http';
import {LOGOUT, GETINFO} from '../api/url';
export default {
    data(){
        return {
            username: '',
            id: ''
        }
    },
    methods: {
        async logoutAction(){
            var res = await http.get(LOGOUT);
            if(res.data.code == 0){
                this.$router.push({
                    name: 'login'
                })
            }
        },
        orderAction(){
            this.$router.push({
                name: 'orderList',
                params: {
                    id: this.id
                }
            })
        }
    },
    async created(){
        var {data: {data}} = await http.get(GETINFO);
        this.username = data.username;
        this.id = data._id;
    },
    async activated(){
        var {data: {data}} = await http.get(GETINFO);
        this.username = data.username;
        this.id = data._id;    
    }
}
</script>

<style scoped lang="scss">
.myCenter{
    h1{
        width: 100%;
        height: 0.52rem;
        line-height: 0.52rem;
        font-size: 0.2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
        background: #fff;
        span{
            position: absolute;
            right: 0.15rem;
            font-size: 0.12rem;
            font-weight: normal;
            color: #333;
        }
    }
    .info{
        width: 100%;
        height: 2.3rem;
        background: #464c5b;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 0.72rem;
            height: 0.72rem;
            border-radius: 50%;
            margin: 0.45rem 0 0.2rem;
        }
        p{
            font-size: 0.18rem;
            color: #fff;
        }
    }
    .handler{
        width: 100%;
        background: #fff;
        padding-top: 0.4rem;
        border-bottom: 1px solid #f2f2f2;
        li{
            height: 0.5rem;
            line-height: 0.5rem;
            border-top: 1px solid #f2f2f2;
            font-size: 0.12rem;
            color: #333;
            padding:0 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .iconfont{
                font-size: 0.14rem;
                color: #999;
            }
        }
    }
}
</style>