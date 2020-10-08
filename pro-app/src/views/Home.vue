<template>
  <div class="home">
    <h1>首页</h1>
    <app-scroll class="scroll" :chooseId="chooseId">
        <div class="shopInfo">
            <div  class="top">
            <div class="logo">
                <img src="https://axhub.im/pro/221031c5a692ef70/images/%E9%A6%96%E9%A1%B5/u9.png" alt="">
            </div>
            <div class="info">
                <h3>美滋滋汉堡</h3>
                <h4>188 8888 8888</h4>
            </div>
            <div class="status">
                <h5>营业中</h5>
                <h6 v-show="!showD" @click="showDAction(true)">详情<span class="iconfont iconarrowdown"></span></h6>
            </div> 
            </div>
            <div class="bot" v-show="showD">
                <h4><span class="iconfont iconclock"></span>08:00--23.00</h4>
                <h5><span class="iconfont iconlocation"></span>深圳市宝安区航城街道西部硅谷B区</h5>
                <h6 @click="showDAction(false)">收起<span class="iconfont iconshang"></span></h6>
            </div>
        </div>
        <ul class="handler">
            <li class="order">
                <span class="iconfont icondiancan"></span>
                <p>扫码点餐</p>
            </li>
            <li class="discount">
                <span class="iconfont iconyouhuijuan"></span>
                <p>优惠卷</p>
            </li>
            <li class="line">
                <span class="iconfont iconpaiduiquhao0101"></span>
                <p>排队取号</p>
            </li>
            <li class="sub">
                <span class="iconfont iconclock"></span>
                <p>餐桌预约</p>
            </li>
        </ul>
        <div class="content">
            <div class="title">本店菜品</div>
            <div class="list">
                <ul class="type-list">
                    <li v-for="item in dishList" :key="item.ti" @click="change(item.ti)" :class="{active: item.ti == chooseId}">{{item.tn}}</li>
                </ul>
                <ul class="dish-list">
                    <li v-for="item in list" :key="item._id">
                        <div class="img">
                            <img :src="item.dishImg" alt="">
                        </div>
                        <div class="info">
                            <h2>{{item.dishName}}</h2>
                            <h3 v-if="item.dishIntro">{{item.dishIntro}}</h3>
                            <h4>月售 {{item.dishSales}}</h4>
                            <h5><i>￥</i>{{item.dishPrice}}</h5>
                            <h6 >
                                <span v-if=" (buyList.findIndex( it => it.id == item._id )) !== -1 " @click="minusAction(item)" class="minus iconfont iconjian"></span>
                                <span v-if=" (buyList.findIndex( it => it.id == item._id )) !== -1 "  class="num">{{ buyList[buyList.findIndex( it => it.id == item._id )].count }}</span>
                                <span @click="addAction(item)" class="add iconfont icon21"></span>
                            </h6>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </app-scroll>
    <div class="buy">
        <div class="no" v-if="buyList.length == 0">
            <div class="left">
                <span class="iconfont icongouwuche"></span>
            </div>
            <div class="center">请添加菜品</div>
            <div class="right">去下单</div>
        </div>
        <div class="has" v-else>
            <div class="left">
                <span class="iconfont icongouwuche"></span>
                <i>{{buyList.length}}</i>
            </div>
            <div class="center">￥{{price}}</div>
            <div class="right" @click="buyAction">去下单</div>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import appScroll from '../components/common/app-scroll';
import {mapState} from 'vuex';
export default {
    components: {
        appScroll
    },
    data(){
        return {
            showD: false,
            chooseId: '001',
            buyList: []
        }
    },
    computed: {
        ...mapState({
            dishList: state => state.dish.dishes
        }),
        list(){
            if(this.dishList.length == 0){
                return [];
            }else{
               var index = this.dishList.findIndex(item => item.ti == this.chooseId) ;
                return this.dishList[index].list; 
            }
        },
        price(){
            var p = 0;
            this.buyList.forEach(item => {
                p += item.price*item.count
            });
            return p;
        }
    },
    watch: {
        '$route.name'(to,from){
            if(from == 'success' || from == 'error'){
                location.reload();
            }
        }
    },
    methods: {
        showDAction(boo){
            this.showD = boo;
        },
        change(id){
            this.chooseId = id;
        },
        addAction(item){
            var index = this.buyList.findIndex( it => {
                return it.id == item._id;
            } );
            if(index !== -1){
                this.buyList[index].count ++;
                return;
            }

            var obj = {
                id: item._id,
                name: item.dishName,
                img: item.dishImg,
                price: item.dishPrice,
                count: 1
            };
            this.buyList.push(obj)
        },
        minusAction(item){
            var index = this.buyList.findIndex( it => {
                return it.id == item._id;
            } );
            this.buyList[index].count --;
            if(this.buyList[index].count == 0){
                this.buyList.splice(index,1);
            }
        },
        buyAction(){
            this.$store.commit('setConfirmOrder', this.buyList);
            this.buyList = [];
            this.$router.push({
                name: 'confirmOrder'
            })
        }
    },
    created(){
        this.$store.dispatch('dish/getDishes');
    }
}
</script>

<style scoped lang="scss">
.home{
    h1{
        width: 100%;
        height: 0.52rem;
        line-height: 0.52rem;
        font-size: 0.2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
        background: #fff;
    }
    .scroll{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0.52rem;
        bottom: 0;
        overflow: hidden;
    }
    .shopInfo{
        background: #fff;
        position: relative;
        .top{
            border-top: 1px solid #e4e4e4;
            height: 0.78rem;
            width: 100%;
            display: flex;
            align-items: center;
            .logo{
                width: 0.58rem;
                height: 0.58rem;
                border-radius: 50%;
                background: #ffcc99;
                margin-left: 0.12rem;
                display: flex;
                img{
                    width: 95%;
                    height: 95%;
                    margin: auto;
                }
            }
            .info{
                width: 2.3rem;
                height: 100%;
                padding-left: 0.1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                h3{
                    font-size: 0.18rem;
                    color: #333;
                    line-height: 0.2rem;
                    margin-bottom: 0.14rem;
                }
                h4{
                    font-size: 0.12rem;
                    line-height: 0.12rem;
                    color: #666;
                }
            }
            .status{
                height: 100%;
                h5{
                    width: 0.51rem;
                    height: 0.18rem;
                    line-height: 0.18rem;
                    text-align: center;
                    font-size: 0.12rem;
                    color: #fff;
                    background: #3bb19c;
                    border-radius: 0.02rem;
                    margin: 0.17rem 0 0.12rem;
                }
                h6{
                    font-size: 0.14rem;
                    line-height: 0.14rem;
                    color: #666;
                    .iconfont{
                        margin-left: 0.05rem;
                        color: #999;
                        font-size: 0.14rem;
                    }
                }
            }
        }
        .bot{
            position: absolute;
            top: 0.78rem;
            height: 0.74rem;
            left: 0;
            width: 100%;
            background: #fff;
            border-top: 1px solid #e4e4e4;
            padding-left: 0.2rem;
            h4,h5{
                height: 0.18rem;
                display: flex;
                align-items: center;
                font-size: 0.12rem;
                color: #333;
                margin-top: 0.1rem;
                .iconfont{
                    font-size: 0.16rem;
                    color: #ccc;
                    margin-right: 0.05rem;
                }
            }
            h6{
                position: absolute;
                right: 0.28rem;
                bottom: 0.2rem;
                font-size: 0.14rem;
                color: #666;
                .iconfont{
                    font-size: 0.14rem;
                    color: #999;
                    margin-left: 0.05rem;
                }
            }
        }
    }
    .handler{
        width: 100%;
        background: #fff;
        padding: 0.15rem 0.2rem;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
            width: 1.6rem;
            height: 0.95rem;
            border-radius: 0.15rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .iconfont{
                font-size: 0.24rem;
                line-height: 0.24rem;
                color: #fff;
                margin-bottom: 0.1rem;
            }
            p{
                font-size: 0.17rem;
                color: #fff;
                line-height: 0.18rem;
            }
            &.order{
                background: #ff9381;
                margin-bottom: 0.14rem;
            }
            &.discount{
                background: #b3c4fe;
                margin-bottom: 0.14rem;
            }
            &.line{
                background: #8581ff;
            }
            &.sub{
                background: #ffb180;
            }
        }
    }
    .content{
        background: #fff;
        width: 100%;
        .title{
            height: 0.39rem;
            border-bottom: 0.01rem solid #f2f2f2;
            line-height: 0.38rem;
            font-size: 0.12rem;
            color: #333;
            padding-left: 0.1rem;
        }
        .list{
            width: 100%;
            display: flex;
            .type-list{
                width: 0.95rem;
                background: #f3f5f9;
                li{
                    height: 0.4rem;
                    line-height: 0.4rem;
                    padding-left: 0.1rem;
                    font-size: 0.12rem;
                    color: #999;
                    border-bottom: 1px solid #f2f2f2;
                    &.active{
                        background: #fff;
                    }
                }
            }
            .dish-list{
                width: calc(100% - 0.95rem);
                background: #fff;
                li{
                    height: 1.15rem;
                    padding: 0.1rem;
                    display: flex;
                    .img{
                        width: 0.95rem;
                        height: 0.95rem;
                        border-radius: 0.1rem;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .info{
                        width: calc(100% - 0.95rem);
                        padding-left: 0.1rem;
                        position: relative;
                        h2{
                            height: 0.23rem;
                            line-height: 0.23rem;
                            font-size: 0.15rem;
                            color: #333;
                        }
                        h3{
                            width: max-content;
                            height: 0.19rem;
                            line-height: 0.19rem;
                            color: #666;
                            padding: 0 0.1rem;
                            background: #f3f5f9;
                        }
                        h4{
                            height: 0.27rem;
                            line-height: 0.27rem;
                            font-size: 0.12rem;
                            color: #666;
                        }
                        h5{
                            line-height: 0.16rem;
                            font-size: 0.14rem;
                            color: #ff3737;
                            i{
                                font-size: 0.1rem;
                            }
                        }
                        h6{
                            position: absolute;
                            bottom: 0.05rem;
                            right: 0.2rem;
                            line-height: 0.2rem;
                            display: flex;
                            .add{
                                width: 0.2rem;
                                height: 0.2rem;
                                border-radius: 50%;
                                text-align: center;
                                background: #ff9900;
                                font-size: 0.12rem;
                                color: #fff;
                            }
                            .minus{
                                width: 0.2rem;
                                height: 0.2rem;
                                border-radius: 50%;
                                text-align: center;
                                background: #D7D7D7;
                                font-size: 0.12rem;
                                color: #333;
                            }
                            .num{
                                width: 0.2rem;
                                font-size: 0.12rem;
                                text-align: center;
                                line-height: 0.2rem;
                                color: #333;
                            }
                        }
                    }
                }
            }
        }
    }
    .buy{
        position: fixed;
        left: 50%;
        bottom: 0.85rem;
        transform: translateX(-50%);
        .no{
            width: 3rem;
            height: 0.42rem;
            border-radius: 0.21rem;
            display: flex;
            overflow: hidden;
            .left{
                position: absolute;
                left: 0;
                top: 0;
                width: 0.42rem;
                height: 0.42rem;
                border-radius: 50%;
                background: #bcbcbc;
                text-align: center;
                line-height: 0.42rem;
                .iconfont{
                    font-size: 0.3rem;
                    color: #fff;
                }
            }
            .center{
                width: 1.88rem;
                height: 0.42rem;
                line-height: 0.42rem;
                font-size: 0.16rem;
                color: #fff;
                padding-left: 0.52rem;
                background: #e4e4e4;
            }
            .right{
                flex: 1;
                background: #bcbcbc;
                text-align: center;
                line-height: 0.42rem;
                font-size: 0.16rem;
                color: #fff;
            }
        }
        .has{
            width: 3rem;
            height: 0.42rem;
            border-radius: 0.21rem;
            display: flex;
            overflow: hidden;
            .left{
                position: absolute;
                left: 0;
                top: 0;
                width: 0.42rem;
                height: 0.42rem;
                border-radius: 50%;
                background: #333333;
                text-align: center;
                line-height: 0.42rem;
                .iconfont{
                    font-size: 0.3rem;
                    color: #fff;
                }
                i{
                    position: absolute;
                    width: 0.16rem;
                    height: 0.16rem;
                    border-radius: 50%;
                    text-align: center;
                    color: #fff;
                    line-height: 0.16rem;
                    font-size: 0.12rem;
                    top: 0;
                    right: 0;
                    background: #f00;
                }
            }
            .center{
                width: 1.88rem;
                height: 0.42rem;
                line-height: 0.42rem;
                font-size: 0.16rem;
                color: #fff;
                padding-left: 0.52rem;
                background: #666666;
            }
            .right{
                flex: 1;
                background: #FF0000;
                text-align: center;
                line-height: 0.42rem;
                font-size: 0.16rem;
                color: #fff;
            }
        }
    }
}
</style>