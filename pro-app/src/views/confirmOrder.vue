<template>
  <div class="confirmOrder">
    <h1>确认订单</h1>
    <app-scroll class="scroll">
        <div class="table">001号桌</div> 
        <div class="goods">
            <li v-for="item in confirmOrder" :key="item.id">
                <div class="img">
                    <img :src="item.img" alt="">
                </div>
                <div class="info">
                    <h3 class="ellipsis">{{item.name}}</h3>
                    <h4 class="ellipsis">x {{item.count}}</h4>
                </div>
                <div class="price">
                <span>￥</span> {{item.count * item.price}}
                </div>
            </li>
        </div>
        <div class="discount">
        <div class="dis">
            <span>折</span>
            <i>下单立享8折优惠</i>
            <b class="ellipsis">-￥{{minusP}}</b>
        </div>
        <div class="min" v-if="totP >= 10">
            <span>减</span>
            <i>满{{Math.floor(totP/10) * 10}}减{{Math.floor(totP/10) * 3}}</i>
            <b>-￥{{Math.floor(totP/10) * 3}}</b>
        </div>
        </div>
        <div class="pri">
        <p>
            <span>已优惠 </span>
            <b><i>￥</i>{{Number(minusP) + Math.floor(totP/10) * 3}}</b>
        </p>
        <p>
            <span>小计 </span>
            <b><i>￥</i>{{ totP - (Number(minusP) + Math.floor(totP/10) * 3) }}</b>
        </p>
        </div>
        <div class="num">
            <p>就餐人数</p>
            <p @click="showAction(true)">{{pNum}}人<span class="iconfont iconyou"></span></p>
        </div>
        <div class="remark">
            <span>备注</span>
            <input type="text" placeholder="请输入口味，偏好等..." v-model="remark">
        </div>
        <div class="pos"></div>
    </app-scroll>
    <div class="numChoose" v-show="cN" @click="showAction(false)">
        <div class="list">
            <p>请选择就餐人数</p>
            <li @click="chooseAction(item)" v-for="item in 8" :key="item">{{item}}</li>
        </div>
        
    </div>
    <div class="confirm">
        <div class="left">应付金额 ￥<span>{{ totP - (Number(minusP) + Math.floor(totP/10) * 3) }}</span></div>
        <div class="right" @click="confirmAction">立即支付</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import appScroll from '../components/common/app-scroll';
import http from '../api/http';
import { GETINFO, CONFIRMORDER } from '../api/url';
export default {
    components: {
        appScroll
    },
    data(){
        return {
            pNum: 1,
            cN: false,
            remark: '',
            id: ''
        }
    },
    computed: {
        ...mapState({
            confirmOrder: state => state.confirmOrder
        }),
        totP(){
            var p = 0;
            this.confirmOrder.forEach( item => {
                p += item.count * item.price;
            } );
            return p;
        },
        minusP(){
            return (this.totP*0.2).toFixed(2);
        }
    },
    methods: {
        showAction(boo){
            this.cN = boo;
        },
        chooseAction(n){
            this.pNum = n;
        },
        async confirmAction(){
            var p = this.totP - (Number(this.minusP) + Math.floor(this.totP/10) * 3); 
            var time = Date.now();
            
            // console.log(this.confirmOrder); /* 菜品清单 */
            // console.log(this.pNum); /* 人数 */
            // console.log(this.remark); /* 备注 */
            // console.log(p); /* 支付金额 */
            // console.log(this.id); /* 用户id */
            // console.log('5f7ad22582ca8048c0b95394'); /* 桌号id（未实现） */
            // console.log(time); /* 下单时间 */

            var res = await http.get( CONFIRMORDER, {
                userId: this.id,
                tableId: '5f7ad22582ca8048c0b95394',
                orderList: JSON.stringify(this.confirmOrder),
                money: p,
                pNum: this.pNum,
                remark: this.remark,
                time: time
            } );
            if(res.data.code == 0){
                this.$router.push({
                    name: 'success',
                    params: {
                        id: this.id
                    }
                })
            }else{
                this.$router.push({
                    name: 'error'
                })
            }
        }
    },
    async created(){
        var {data: {data}} = await http.get(GETINFO);
        this.id = data._id;
    }
}
</script>

<style scoped lang="scss">
.confirmOrder{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #F5F5F5;
    z-index: 99;
    h1{
        width: 100%;
        height: 0.52rem;
        line-height: 0.52rem;
        font-size: 0.2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
        background: #fff;
        margin: 0;
        border-bottom: 1px solid #d7d7d7;
    }
    .scroll{
        width: 100%;
        position: absolute;
        top: 0.52rem;
        bottom: 0;
        overflow: hidden;
    }
    .table{
        width: 100%;
        height: 0.5rem;
        background: #fff;
        line-height: 0.5rem;
        padding-left: 0.1rem;
        font-size: 0.12rem;
        color: #3bb19c;
        margin-bottom: 0.1rem;
    }
    .goods{
        width: 100%;
        background: #fff;
        li{
            height: 1rem;
            padding:  0.15rem 0.2rem;
            display: flex;
            .img{
                width: 0.7rem;
                height: 0.7rem;
                border-radius: 0.1rem;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                width: 2rem;
                padding-left: 0.15rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h3{
                    width: 100%;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    font-size: 0.14rem;
                    color: #333;
                }
                h4{
                    width: 100%;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    font-size: 0.12rem;
                    color: #999;
                }
            }
            .price{
                flex: 1;
                text-align: right;
                font-size: 0.14rem;
                line-height: 0.2rem;
                height: 0.2rem;
                color: red;
                margin-top: 0.4rem;
                span{
                    font-size: 0.10rem;
                }
            }
        }
    }
    .discount{
        width: 100%;
        background: #fff;
        border-top: 1px solid #d7d7d7;
        border-bottom: 1px solid #d7d7d7;
        >div{
            height: 0.38rem;
            line-height: 0.38rem;
            display: flex;
            align-items: center;
            padding-left: 0.2rem;
            span{
                width: 0.17rem;
                height: 0.17rem;
                line-height: 0.17rem;
                text-align: center;
                font-size: 0.12rem;
                color: #fff;
                border-radius: 0.04rem;
                background: #FF9900;
                margin-right: 0.1rem;
            }
            i{
                font-size: 0.14rem;
                color: #666;
                flex: 1;
            }
            b{
                width: 0.6rem;;
                font-size: 0.12rem;
                color: #666;
            }
            &.min{
                span{
                    background: #ff6633;
                }
            }
        }
    }
    .pri{
        height: 0.42rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: #fff;
        p{
            margin-right: 0.2rem;
            span{
                font-size: 0.12rem;
                color: #666;
            }
            b{
                font-size: 0.16rem;
                color: #ff0000;
                i{
                    font-size: 0.12rem;
                }
            }

        }
    }
    .num{
        height: 0.42rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.1rem;
        padding: 0 0.2rem;
        background: #fff;
        p{
            font-size: 0.14rem;
            color: #666;
            .iconfont{
                font-size: 0.14rem;
                color: #999;
                margin-left: 0.03rem;
            }
        }
    }
    .numChoose{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        .list{
            position: absolute;
            width: 100%;
            bottom: 0;
            background: #fff;
            padding-bottom: 0.4rem;
            p{
                height: 0.4rem;
                line-height: 0.4rem;
                text-align: center;
                font-size: 0.14rem;
                color: #333;
            }
            li{
                height: 0.4rem;
                line-height: 0.4rem;
                text-align: center;
                font-size: 0.14rem;
                color: #333;
                border-bottom: 1px solid #d7d7d7;
            }
        }
    }
    .remark{
        height: 0.42rem;
        display: flex;
        padding-left: 0.2rem;
        background: #fff;
        margin-top: 0.1rem;
        span{
            font-size: 0.12rem;
            line-height: 0.42rem;
            color: #666;
            margin-right: 0.35rem;
        }
        input{
            height: 42px;
            width: 200px;
            font-size: 14px;
            border: none;
            color: #999;
            line-height: 42px;
            transform: scale(2);
            transform-origin: left top;
            &::placeholder{
                color: #999;
            }
        }
    }
    .confirm{
        position: fixed;
        left: 50%;
        bottom: 0.35rem;
        transform: translateX(-50%);
        width: 3rem;
        height: 0.42rem;
        border-radius: 0.21rem;
        overflow: hidden;
        display: flex;
        .left{
            width: 1.9rem;
            line-height: 0.42rem;
            font-size: 0.14rem;
            color: #fff;
            padding-left: 0.3rem;
            background: #666666;
            span{
                font-weight: bold;
            }
        }
        .right{
            flex: 1;
            text-align: center;
            line-height: 0.42rem;
            font-size: 0.14rem;
            color: #fff;
            background: #ff0000;
        }
    }
    .pos{
        width: 100%;
        height: 0.8rem;
    }

}
</style>