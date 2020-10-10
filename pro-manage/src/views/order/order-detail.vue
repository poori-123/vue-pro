<template>
  <div class="order-detail" v-if="order">
      <div class="title">
          <span class="left"><span class="iconfont iconwancheng"></span>{{order.status}}</span>
          <div class="right">
              <span class="pri">打印小票</span>
              <span class="close" @click="$router.back()">关闭</span>
          </div>
      </div>
      <div class="content">
          <div class="table">
              <h3>台桌信息</h3>
              <div class="msg">
                  <div class="top">
                      <span class="id">桌号</span>
                      <span class="pn">就餐人数</span>
                      <span class="pr">消费</span>
                      <span class="han">操作</span>
                  </div>
                  <div class="bot">
                      <span class="id">{{order.tableId.tableId}}</span>
                      <span class="pn">{{order.pNum}}</span>
                      <span class="pr">￥{{order.money}}</span>
                      <span class="han"><i>更换</i></span>
                  </div>
              </div>
          </div>
          <div class="dish">
            <h3>菜品信息</h3>
            <div class="top">
                <span class="name">菜品信息</span>
                <span class="pr">单价</span>
                <span class="num">数量</span>
                <span class="tp">总价</span>
            </div>
            <div class="list">
                <li class="item" v-for="item in JSON.parse(order.orderList)" :key="item.id">
                    <span class="name">{{item.name}}</span>
                    <span class="pr">￥{{item.price}}</span>
                    <span class="num">{{item.count}}</span>
                    <span class="tp">￥{{item.count * item.price}}</span>
                </li>
                <div class="bot">
                    <span class="name">合计</span>
                    <span class="pr">--</span>
                    <span class="num">--</span>
                    <span class="tp">￥{{totp}}</span>
                </div>
            </div>
          </div>
          <div class="order">
              <h3>订单信息</h3>
              <div class="top">
                  <span class="id">订单编号</span>
                  <span class="time">下单时间</span>
                  <span class="pr">实付金额</span>
                  <span class="co">优惠金额</span>
                  <span class="pay">支付方式</span>
              </div>
              <div class="bot">
                  <span class="id">{{order._id.slice(order._id.length-6,order._id.length)}}</span>
                  <span class="time">{{order.time | time}}</span>
                  <span class="pr">￥{{order.money}}</span>
                  <span class="co">￥{{totp - order.money}}</span>
                  <span class="pay">在线支付</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import http from '../../api/http';
import { GETORDERDETAIL } from '../../api/url';
export default {
    filters: {
        time(str){
        var d = new Date(Number(str));
        var yy = d.getFullYear();
        var mm = d.getUTCMonth()+1;
        var dd = d.getUTCDate();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        if(mm < 10){
            mm = '0' + mm;
        }
        if(dd < 10){
            dd = '0' + dd;
        }
        if(h < 10){
            h = '0' + h;
        }
        if(m < 10){
            m = '0' + m;
        }
        if(s < 10){
            s = '0' + s;
        }
        return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
        }
    },
    data(){
        return {
            order: ''
        }
    },
    computed: {
        totp(){
            var p = 0;
            if(this.order !== ''){
                var arr = JSON.parse(this.order.orderList);
                arr.forEach(item => {
                    p += item.price*item.count;
                })
                return p
            }
        }
    },
    async created(){
        var id = this.$route.params.id;
        var {data: {data}} = await http.get(GETORDERDETAIL, {
            id
        });
        this.order = data;
        console.log(data);
        console.log(JSON.parse(data.orderList));
    }
}
</script>

<style scoped lang="scss">
.order-detail{
    position: absolute;
    top: -40px;
    left: 0;
    width: 100%;
    padding-bottom: 30px;
    min-height: calc(100% + 40px);
    background: #fff;
    .title{
        width: 100%;
        height: 58px;
        background: #e9eff5;
        border-bottom: 1px solid #e4e4e4;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            margin-left: 30px;
            font-size: 16px;
            color: #1abc9c;
            display: flex;
            align-items: center;
            .iconfont{
                font-size: 20px;
                margin-right: 10px;
            }
        }
        .right{
            display: flex;
            align-items: center;
            margin-right: 28px;
            height: 100%;
            .close,.pri{
                width: 123px;
                height: 35px;
                border: 1px solid #e4e4e4;
                border-radius: 5px;
                background: #fff;
                text-align: center;
                line-height: 35px;
                font-size: 12px;
                color: #333;
                cursor: pointer;
                margin-left: 10px;
            }
            
        }

    }
    .content{
        background: #fff;
        padding-left: 30px;
        .table{
            h3{
                height: 70px;
                line-height: 70px;
                padding-left: 10px;
                font-size: 14px;
                color: #333;
            }
            .msg{
                width: 1040px;
                border-top: 1px solid #e4e4e4;
                border-left: 1px solid #e4e4e4;
                .top{
                    height: 45px;
                    width: 100%;
                    border-bottom: 1px solid #e4e4e4;
                    display: flex;
                    background: #f9fafc;
                    span{
                        line-height: 44px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                        border-right: 1px solid #e4e4e4;
                    }
                    .id,.pn,.pr{
                        width: 269px;
                    }
                    .han{
                        flex: 1;
                    }
                }
                .bot{
                    height: 59px;
                    width: 100%;
                    border-bottom: 1px solid #e4e4e4;
                    display: flex;
                    background: #fff;
                    span{
                        line-height: 58px;
                        text-align: center;
                        font-size: 12px;
                        color: #333;
                        border-right: 1px solid #e4e4e4;
                    }
                    .id,.pn,.pr{
                        width: 269px;
                    }
                    .han{
                        flex: 1;
                        display: flex;
                        i{
                            width: 83px;
                            height: 27px;
                            background: #1abc9c;
                            text-align: center;
                            line-height: 27px;
                            border-radius: 5px;
                            font-size: 12px;
                            color: #fff;
                            margin: auto;
                        }
                    }
                }
            }
        }
        .dish{
            h3{
                height: 70px;
                line-height: 70px;
                padding-left: 10px;
                font-size: 14px;
                color: #333;
            }
            .top{
                width: 1040px;
                height: 45px;
                border-top: 1px solid #e4e4e4;
                border-left: 1px solid #e4e4e4;
                background: #f9fafc;
                display: flex;
                span{
                    font-size: 12px;
                    line-height: 44px;
                    text-align: center;
                    color: #666;
                    border-right: 1px solid #e4e4e4;
                    &.name{
                        width: 644px;
                    }
                    &.pr{
                        width: 141px;
                    }
                    &.num{
                        width: 134px;
                    }
                    &.tp{
                        flex: 1;
                    }
                }
            }
            .list{
                width: 1040px;
                border-left: 1px solid #e4e4e4;
                border-top: 1px solid #e4e4e4;
                background: #fff;
                .item,.bot{
                    height: 50px;
                    border-bottom: 1px solid #e4e4e4;
                    display: flex;
                    span{
                        font-size: 12px;
                        line-height: 49px;
                        text-align: center;
                        color: #333;
                        border-right: 1px solid #e4e4e4;
                        &.name{
                            width: 644px;
                        }
                        &.pr{
                            width: 141px;
                        }
                        &.num{
                            width: 134px;
                        }
                        &.tp{
                            flex: 1;
                        }
                    }
                }

            }
        }
        .order{
            h3{
                height: 70px;
                line-height: 70px;
                padding-left: 10px;
                font-size: 14px;
                color: #333;
            }
            .top{
                width: 1040px;
                height: 45px;
                background: #f9fafc;
                border-top: 1px solid #e4e4e4;
                border-left: 1px solid #e4e4e4;
                display: flex;
                span{
                    font-size: 12px;
                    text-align: center;
                    line-height: 44px;
                    border-right: 1px solid #e4e4e4;
                    &.id,&.time,&.pr{
                        width: 215px;
                    }
                    &.co{
                        width: 200px;
                    }
                    &.pay{
                        flex: 1;
                    }
                }
            }
            .bot{
                width: 1040px;
                height: 60;
                background: #fff;
                border-top: 1px solid #e4e4e4;
                border-left: 1px solid #e4e4e4;
                border-bottom: 1px solid #e4e4e4;
                display: flex;
                span{
                    font-size: 12px;
                    text-align: center;
                    line-height: 58px;
                    border-right: 1px solid #e4e4e4;
                    &.id,&.time,&.pr{
                        width: 215px;
                    }
                    &.co{
                        width: 200px;
                    }
                    &.pay{
                        flex: 1;
                    }
                }
            }
        }
    }
}
</style>