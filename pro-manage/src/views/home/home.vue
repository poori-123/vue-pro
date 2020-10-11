<template>
  <div class="home">
    <div class="top">
      <div class="left">
        <h2>台桌统计</h2>
        <ul>
          <li>
            <h3>全部</h3>
            <p>{{tableList.length}}</p>
          </li>
          <li>
            <h3>使用中</h3>
            <p>{{inuseList.length}}</p>
          </li>
          <li>
            <h3>闲置</h3>
            <p>{{freeList.length}}</p>
          </li>
        </ul>
      </div>
      <div class="right">
        <h2>最新消息</h2>
        <div class="scroll">
          <ul>
            <li v-for="item in orderList" :key="item._id">
              <span class="time">{{item.time | time}}</span>
              <span class="table">桌号{{item.tableId.tableId}}已下单</span>
              <span class="watch">查看</span>
              <span class="print">打印小票</span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
    <div class="bot">
      <h2>台桌概况</h2>

      <ul class="inuse">
        <li v-for="item in inuseList" :key="item.id">
          <div class="status">
            <span>使用中</span>
            <span>释放桌台</span>
          </div>
          <div class="tab-num">
            <h3>{{item.tableId}}号桌</h3>
            <h4>{{item.tableType}}人桌</h4>
          </div>
          <div class="watch">查看</div>
        </li>
      </ul>

      <ul class="free">
        <li v-for="item in freeList" :key="item.id">
          <div class="status">
            <span>空闲中</span>
          </div>
          <div class="tab-num">
            <h3>{{item.tableId}}号桌</h3>
            <h4>{{item.tableType}}人桌</h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import {mapState} from 'vuex';
export default {
  filters: {
    time(str){
      var d = new Date(Number(str));
      var hh = d.getHours();
      var mm = d.getMinutes();
      if(hh < 10){
        hh = '0' + hh;
      }
      if(mm < 10){
        mm = '0' + mm
      };
      return hh + ':' + mm
    }
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      tableList: state => state.table.tableList,
      orderList: state => state.order.homeOrder
    }),
    inuseList(){
      return this.tableList.filter(item => item.status == 'inuse');
    },
    freeList(){
      return this.tableList.filter(item => item.status == 'free');
    }
  },
  created(){
    this.$store.dispatch('table/getTableList');
    this.$store.dispatch('order/getHomeOrder');
  }
}
</script>

<style scoped lang="scss">
.home{
  h2{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    color: #333;
    padding-left: 12px;
    position: relative;
    margin: 0;
    &::before{
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 5px;
      height: 15px;
      transform: translateY(-50%);
      background: #f97d5f;
    }
  }
  .top{
    width: 100%;
    height: 230px;
    background: #fff;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    .left{
      width: 564px;
      ul{
        width: 100%;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        li{
          width: 174px;
          height: 135px;
          border: 1px solid #e4e4e4;
          border-radius: 4px;
          padding: 0 4px;
          h3{
            width: 100%;
            height: 50px;
            line-height: 50px;
            color: #fff;
            text-align: center;
            font-size: 16px;
            margin: 0;
          }
          p{
            line-height: 82px;
            text-align: center;
            font-size: 30px;
            font-weight: 700;
            color: #fff;
          }
          &:nth-of-type(1){
            background: #85b2f6;
            h3{
              border-bottom: 1px solid #6d9de7;
            }
          }
          &:nth-of-type(2){
            background: #b6b4ff;
            h3{
              border-bottom: 1px solid #9e9cff;
            }
          }
          &:nth-of-type(3){
            background: #ffa28f;
            h3{
              border-bottom: 1px solid #ff917b;
            }
          }
        }
      }
    }
    .right{
      width: 480px;
      height: 100%;
      .scroll{
        width: 100%;
        overflow: hidden;
        height: 150px;
      }
      ul{
        width: calc(100% + 17px);
        height: 100%;
        margin-top: 7px;
        overflow: auto;
        li{
          height: 30px;
          line-height: 30px;
          display: flex;
          font-size: 12px;
          color: #666;
          padding-left: 5px;
          .time{
            width: 50px;
          }
          .table{
            width: 190px;
          }
          .watch{
            width: 135px;
            cursor: pointer;
          }
          .print{
            flex: 1;
            cursor: pointer;
            color: #3bb19c;
          }
        }
      }
    }
  }
  .bot{
    width: 100%;
    height: auto;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    ul{
      display: flex;
      justify-content: space-between;
      li{
        width: 193px;
        height: 187px;
        background: #e9eff5;
        box-shadow: 3px 3px 5px #d8d8d8;
        overflow: hidden;
        .status{
          margin-top: 10px;
          height: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            &:nth-of-type(1){
              width: 46px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              font-size: 12px;
              color: #fff;
              position: relative;
              background: #ff6633;
              &::after{
                content: '';
                position: absolute;
                width: 11px;
                height: 22px;
                top: -1px;
                right: -11px;
                border-radius: 0 11px 11px 0;
                background: #ff6633;
              }
            }
            &:nth-of-type(2){
              padding-right: 15px;
              font-size: 12px;
              color: #666;
              line-height: 22px;
              cursor: pointer;
            }
          }
        }
        .tab-num{
          margin-top: 35px;
          h3{
            height: 42px;
            line-height: 42px;
            font-size: 30px;
            text-align: center;
            font-weight: 600;
            color: #666;
            margin: 0;
          }
          h4{
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 12px;
            color: #666;
            margin: 0;
          }
        }
        .watch{
          width: 147px;
          height: 29px;
          margin: 20px auto 0;
          background: #3bb19c;
          border-radius: 5px;
          text-align: center;
          line-height: 29px;
          font-size: 12px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .inuse{
      margin: 30px 0;
    }
    .free{
      margin: 30px 0;
      .status{
        span{
          &:nth-of-type(1){
            background: #c9c9c9;
            &::after{
              background: #c9c9c9;
            }
          }
        }
      }
    }
  }
}

</style>