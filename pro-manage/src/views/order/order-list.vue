<template>
  <div class="order-list">
    <div class="title">

    </div>
    <div class="content">
      <div class="top">
        <span>订单数量：{{length}}件</span>
      </div>
      <div class="list-wrap">
        <div class="list-head">
          <span class="orderId">订单编号</span><i></i>
          <span class="time">下单时间</span><i></i>
          <span class="price">订单金额</span><i></i>
          <span class="tableId">桌号</span><i></i>
          <span class="status">订单状态</span><i></i>
          <span class="handler">操作</span>
        </div>
        <div class="list">
          <li class="item" v-for="item in orders" :key="item.id">
            <span class="orderId">{{item.id.slice(item.id.length-6,item.id.length)}}</span>
            <span class="time">{{item.time | time}}</span>
            <span class="price">￥{{item.price}}</span>
            <span class="tableId">{{item.tId}}</span>
            <span class="status">{{item.status}}</span>
            <span class="handler" @click="detailAction(item.id)">查看</span>
          </li>
        </div>
        <div class="pages">
          <p>共<i>{{Math.ceil(length/10)}}</i>页/<i>{{length}}</i>条数据</p>
          <span @click="minuPageAction" class="iconfont iconxiangzuo"></span>
          <ul>
            <li v-for="item in Math.ceil(length/10)" :key="item" :class="{active: item == nowPage}" @click="changePageAction(item)" >{{item}}</li>
          </ul>
          <span @click="addPageAction" class="iconfont iconyou"></span>
          <div class="jump">
            <span>跳至</span>
            <input type="text" v-model="nowPage">
            页
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
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
      nowPage: 1
    }
  },
  computed: {
    ...mapState({
      length: state => state.order.length,
      orders: state => state.order.orders
    })
  },
  methods: {
    minuPageAction(){
      if(this.nowPage == 1){
        return 
      }
      this.nowPage --;
    },
    changePageAction(n){
      this.nowPage = n;
    },
    addPageAction(){
      if(this.nowPage == Math.ceil(this.length/10)){
        return
      };
      this.nowPage ++;
    },
    detailAction(id){
      this.$router.push({
        name: 'order-detail',
        params: {
          id
        }
      })
    }
  },
  watch: {
    nowPage(newVal){
      this.$store.dispatch('order/getOrderPage', newVal);
    }
  },
  created(){
    this.$store.dispatch('order/getOrderInit');
  }
}
</script>

<style scoped lang="scss">
.order-list{
  .title{
    height: 75px;
    background: #fff;
    margin-bottom: 15px;
  }
  .content{
    background: #fff;
    .top{
      height: 62px;
      line-height: 62px;
      font-size: 12px;
      color: #7764ca;
      font-weight: bold;
      padding-left: 15px;
    }
    .list-wrap{
      .list-head{
        height: 60px;
        background: #f9fafc;
        display: flex;
        span{
          text-align: center;
          font-size: 12px;
          color: #666;
          line-height: 60px;
        }
        i{
          width: 1px;
          height: 100%;
          background: #fff;
        }
        .orderId{
          width: 250px;
        }
        .time{
          width: 170px;
        }
        .price{
          width: 150px;
        }
        .tableId{
          width: 160px;
        }
        .status{
          width: 150px;
        }
        .handler{
          flex: 1;
          font-weight: bold;
        }
      }
      .item{
        height: 60px;
        background: #fff;
        display: flex;
        &:nth-of-type(2n){
          background:#f9fafc ;
        }
        span{
          text-align: center;
          font-size: 12px;
          color: #333;
          line-height: 60px;
        }
        i{
          width: 1px;
          height: 100%;
          background: #fff;
        }
        .orderId{
          width: 250px;
        }
        .time{
          width: 170px;
        }
        .price{
          width: 150px;
        }
        .tableId{
          width: 160px;
        }
        .status{
          width: 150px;
        }
        .handler{
          flex: 1;
          color: #1abc9c;
          cursor: pointer;
        }
      }
      .pages{
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-top: 60px;
        padding-right: 30px;
        p{
          line-height: 25px;
          font-size: 12px;
          color: #666;
          margin-right: 20px;
          i{
            color: red;
          }
        }
        .iconfont{
          width: 35px;
          height: 25px;
          border: 1px solid #d7d7d7;
          text-align: center;
          line-height: 23px;
          color: #999999;
          margin-right: 4px;
          border-radius: 4px;
        }
        ul{
          display: flex;
          li{
            width: 35px;
            height: 25px;
            line-height: 23px;
            text-align: center;
            border: 1px solid #d7d7d7;
            font-size: 12px;
            color: #999999;
            border-radius: 4px;
            margin-right: 4px;
            cursor: pointer;
            &.active{
              background-color: #1abc9c;
              border-color: #1abc9c;
              color: #fff;
            }
          }
        }
        .jump{
          display: flex;
          margin-left: 16px;
          height: 25px;
          line-height: 25px;
          color: #999999;
          font-size: 12px;
          input{
            width: 35px;
            height: 25px;
            border: 1px solid #d7d7d7;
            border-radius: 4px;
            margin: 0 12px;
            padding-left: 8px;
          }
        }
      }
    }
  }
}
</style>