<template>
  <div class="orderList">
    <div class="title">
        <span @click="returnAction" class="iconfont iconxiangzuo"></span>
        <p>我的订单</p>
        <span></span>
    </div>
    <div class="content">
        <ul class="header">
            <li @click="changeAction('全部')" :class="{active: active == '全部'}">全部</li>
            <li @click="changeAction('待付款')" :class="{active: active == '待付款'}">待付款</li>
            <li @click="changeAction('已完成')" :class="{active: active == '已完成'}">已完成</li>
            <li @click="changeAction('已取消')" :class="{active: active == '已取消'}">已取消</li>
        </ul>
        <app-scroll class="scroll" v-if="orderList.length != 0">
            <li class="item" v-for="item in orderList" :key="item._id">
                <div class="top">
                    <p class="name"><span v-for="good in JSON.parse(item.orderList)" :key="good.id">{{good.name}} </span> </p>
                    <p>...等{{JSON.parse(item.orderList).length}}件商品</p> 
                    <p class="status">{{item.status}}</p>
                </div>
                <div class="mid">
                    <div class="img" v-for="num in 3" :key="num">
                        <img v-if="JSON.parse(item.orderList)[num-1]" :src="JSON.parse(item.orderList)[num-1].img" alt="">
                    </div>
                    <span class="iconfont iconyou"></span>
                </div>
                <div class="bot">
                    应付金额: ￥{{item.money}}
                </div>
            </li>
        </app-scroll>
        <div class="noone" v-else>
            <p>暂无订单哦~~</p>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import appScroll from '../../components/common/app-scroll';
export default {
    components: {
        appScroll
    },
    data(){
        return {
            active: '全部'
        }
    },
    computed: {
        ...mapState({
            orderList: state => state.order.orderList
        })
    },
    methods: {
      changeAction(str){
          this.active = str;
      },
      returnAction(){
          this.$router.push({
              name: 'myCenter'
          })
      }
    },
    created(){
        var id = this.$route.params.id;
        this.$store.dispatch('order/getList', id);
    }
}
</script>

<style scoped lang="scss">
.orderList{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 99;
    .title{
        height: 0.52rem;
        width: 100%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #d7d7d7;
        span{
            width: 0.5rem;
            height: 100%;
            &.iconfont{
                font-size: 0.2rem;
                color: #999;
                text-align: center;
                line-height: 0.52rem;
            }
        }
        p{
            font-size: 0.16rem;
            color: #666;
            line-height: 0.52rem;
        }
    }
    .content{
        position: absolute;
        top: 0.52rem;
        bottom: 0;
        width: 100%;
        left: 0;
        background: #f9f9f9;
        .header{
            height: 0.36rem;
            width: 100%;
            display: flex;
            background: #fff;
            li{
                flex: 1;
                border-bottom: 1px solid #d7d7d7;
                text-align: center;
                line-height: 0.36rem;
                font-size: 0.12rem;
                color: #999999;
                &.active{
                    color: #1abc9c;
                    border-bottom: 0.02rem solid #1abc9c;
                }
            }
        }
        .scroll{
            position: absolute;
            top: 0.36rem;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            .item{
                height: 1.94rem;
                margin: 0.06rem 0;
                width: 100%;
                background: #fff;
                .top{
                    height: 0.34rem;
                    display: flex;
                    padding:0 0.2rem;
                    line-height: 0.34rem;
                    font-size: 0.12rem;
                    color: #666;
                    .name{
                        max-width: 1.75rem;
                        overflow: hidden;
                    }
                    .status{
                        flex: 1;
                        text-align: right;
                        color: #f04844;
                    }
                }
                .mid{
                    height: 1.15rem;
                    width: 100%;
                    padding: 0.19rem 0.2rem;
                    display: flex;
                    align-items: center;
                    .img{
                        height: 0.77rem;
                        width: 0.77rem;
                        border-radius: 0.1rem;
                        overflow: hidden;
                        margin-right: 0.1rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .iconfont{
                        margin-left: 0.4rem;
                        font-size: 0.16rem;
                        color: #999;
                    }
                }
                .bot{
                    height: 0.45rem;
                    line-height: 0.45rem;
                    border-top: 1px solid #d7d7d7;
                    border-bottom: 1px solid #d7d7d7;
                    padding-left: 0.2rem;
                    font-size: 0.12rem;
                    color: #999;
                }
            }
        }
        .noone{
            width: 100%;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            font-size: 0.16rem;
            color: #999;
        }
    }
}
</style>