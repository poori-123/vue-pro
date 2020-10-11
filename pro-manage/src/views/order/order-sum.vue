<template>
  <div class="order-sum">
    <div class="top">
      <div class="left">
        <h3>订单统计（单）</h3>
        <ul>
          <li class="today">
            <h4>今日</h4>
            <h5>{{weekList[6].count}}</h5>
          </li>
          <li class="yd">
            <h4>昨日</h4>
            <h5>{{weekList[5].count}}</h5>
          </li>
          <li class="week">
            <h4>近7日</h4>
            <h5>{{weekTot.count}}</h5>
          </li>
        </ul>
      </div>
      <div class="right">
        <h3>营业额统计（元）</h3>
        <ul>
          <li class="td">
            <h4>今日</h4>
            <h5>{{weekList[6].price}}</h5>
          </li>
          <li class="yd">
            <h4>昨日</h4>
            <h5>{{weekList[5].price}}</h5>
          </li>
          <li class="week">
            <h4>近7日</h4>
            <h5>{{weekTot.price}}</h5>
          </li>
        </ul>
      </div>
    </div>
    <div class="sale">
      <h2>销售简报</h2>
      <div class="num">
        <h3>订单走势图（单）</h3>
        <div class="orderNum" ref="orderNum"></div>
      </div>
      <div class="pri">
        <h3>营业额走势图（元）</h3>
        <div class="orderPri" ref="orderPri"></div>
      </div>
    </div>
    <div class="dish">
      <h2>最受欢迎的菜品TOP10</h2>
      <div class="list">
        <div class="list-head">
          <span class="rank">排名</span><i></i>
          <span class="img">图片</span><i></i>
          <span class="name">菜品名称</span><i></i>
          <span class="saleNum">销售量</span>
        </div>
        <li class="item" v-for="(item,index) in topTen" :key="item.id">
          <span class="rank">{{index}}</span><i></i>
          <span class="img"><img :src="item.img" alt=""></span><i></i>
          <span class="name">{{item.name}}</span><i></i>
          <span class="saleNum">{{item.sales}}</span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Area } from '@antv/g2plot';
export default {
  computed: {
    ...mapState({
      orderList: state => state.order.orderList,
      topTen: state => state.dish.topTen
    }),
    weekList(){
      var d = new Date();
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      var td_0time = d.getTime(); /* 今日零时的时间戳 */
      var one = 24*60*60*1000;  /* 一天的毫秒数 */
      var td_24time = td_0time + one; /* 今日24时的时间戳 */

      var weekList = [];

      for(var i = 0; i < 7; i++){
        var st = td_24time - (i+1)*one;
        var et = td_24time - i*one;
        var list = this.orderList.filter( item => {
          return  item.time >= st && item.time < et
        });

        var d = new Date(st);
        var yy = d.getFullYear();
        var mm = d.getMonth()+1;
        var dd = d.getDate();
        if(mm < 10){
          mm = '0' + mm;
        }
        if(dd < 10){
          dd = '0' + dd;
        }
        var str = yy + '-' + mm + '-' + dd;

        var p = 0;
        list.forEach(item => {
          p += Number(item.price);
        });

        var obj = {
          count: list.length,
          date: str,
          price: p.toFixed(2)
        }
        weekList.push(obj);

      };
      return weekList.reverse();
    },
    weekTot(){
      var p = 0;
      var n = 0;
      this.weekList.forEach( item => {
        p += Number(item.price);
        n += item.count;
      } );
      return {
        count: n,
        price: p.toFixed(2)
      }
    }
  },
  created(){
    this.$store.dispatch('order/getOrder');
    this.$store.dispatch('dish/getTopTen');
  },
  watch: {
    orderList(newVal){
      if(newVal.length !== 0){
        this.$nextTick( ()=>{
          const area = new Area(this.$refs.orderNum, {
            data: this.weekList,
            xField: 'date',
            yField: 'count',
            areaStyle:{
              fill: '#9EDEF5',
              fillOpacity: 1
            },
            yAxis: {
              grid: {
                line: {
                  style: {
                    stroke: '#e4e4e4',
                    lineWidth: 1,
                    lineDash: [4, 5],
                  }
                }
              }
            }
          });
          area.render();

          const area2 = new Area(this.$refs.orderPri, {
            data: this.weekList,
            xField: 'date',
            yField: 'price',
            areaStyle:{
              fill: '#FCCE85',
              fillOpacity: 1
            },
            yAxis: {
              grid: {
                line: {
                  style: {
                    stroke: '#e4e4e4',
                    lineWidth: 1,
                    lineDash: [4, 5],
                  }
                }
              }
            }
          });         
          area2.render();
        } )
      }
    }
  },
}
</script>

<style scoped lang="scss">
.order-sum{
  .top{
    background: #fff;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    >div{
      width: 520px;
      h3{
        height: 38px;
        line-height: 38px;
        font-size: 12px;
        color: #333;
        border-bottom: 1px solid #e4e4e4;
        padding-left: 10px;
        position: relative;
        margin-bottom: 0;
        &::before{
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px ;
          height: 15px;
          background: #f97d5f;
        }
      }
      ul{
        padding: 18px 0;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
        li{
          width: 167px;
          height: 87px;
          border: 1px solid #e4e4e4;
          border-radius: 5px;
          background: #8c99fa;
          padding-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          h4{
            font-size: 12px;
            line-height: 12px;
            color: #fff;
            margin-bottom: 0;
          }
          h5{
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            line-height: 20px;
            margin-top: 15px;
            margin-bottom: 0;
          }
          &.yd{
            background: #f97d5f;
          }
          &.week{
            background: #fcc164;
          }
        }
      }
    }
  }
  .sale{
    margin-top: 12px;
    h2{
      height: 45px;
      line-height: 45px;
      padding-left: 20px;
      font-size: 16px;
      color: #666;
      background: #e9eff5;
      margin-bottom: 0;
    }
    .num{
      background: #fff;
      padding-top: 24px;
      h3{
        height: 29px;
        line-height: 28px;
        position: relative;
        border-bottom: 1px solid #e4e4e4;
        font-size: 12px;
        color: #333;
        padding-left: 10px;
        width: 95%;
        margin: 0 auto;
        &::before{
          position: absolute;
          content: '';
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 5px ;
          height: 15px;
          background: #f97d5f;
        }
      }
      .orderNum{
        height: 400px;
        width: 95%;
        margin: 0 auto;
        padding: 25px 0 25px;
      }
    }
    .pri{
      background: #fff;
      padding-top: 24px;
      h3{
        height: 29px;
        line-height: 28px;
        position: relative;
        border-bottom: 1px solid #e4e4e4;
        font-size: 12px;
        color: #333;
        padding-left: 10px;
        width: 95%;
        margin: 0 auto;
        &::before{
          position: absolute;
          content: '';
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 5px ;
          height: 15px;
          background: #f97d5f;
        }
      }
      .orderPri{
        height: 400px;
        width: 95%;
        margin: 0 auto;
        padding: 25px 0 25px;
      }
    }
  }
  .dish{
    margin-top: 10px;
    h2{
      margin-bottom: 0;
      font-size: 16px;
      height: 46px;
      line-height: 45px;
      padding-left: 20px;
      color: #666;
      background: #e9eff5;
      border-bottom: 1px solid #e4e4e4;
    }
    .list{
      background: #fff;
      padding-bottom: 30px;
      .list-head{
        height: 60px;
        border-bottom: 1px solid #fff;
        background: #f9fafc;
        display: flex;
        span{
          text-align: center;
          line-height: 60px;
          font-size: 12px;
          color: #999;
        }
        i{
          width: 1px;
          height: 100%;
          background: #fff;
        }
        .rank{
          width: 90px;
        }
        .img{
          width: 250px;
        }
        .name{
          width: 505px;
        }
        .saleNum{
          flex: 1;
        }
      }
      .item{
        height: 60px;
        border-bottom: 1px solid #fff;
        background: #fff;
        display: flex;
        &:nth-of-type(2n){
          background: #f9fafc;
        }
        span{
          text-align: center;
          line-height: 60px;
          font-size: 12px;
          color: #666;
        }
        i{
          width: 1px;
          height: 100%;
          background: #fff;
        }
        .rank{
          width: 90px;
        }
        .img{
          width: 250px;
          display: flex;
          background: #f9fafc;
          img{
            height: 55px;
            width: 55px;
            margin: auto;
          }
        }
        .name{
          width: 505px;
        }
        .saleNum{
          flex: 1;
        }
      }
    }
  }
}
</style>