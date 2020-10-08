<template>
  <div class="dishes-manager">
      <div class="top">
        <div class="name">
          <label for="">菜品名称:</label>
          <input type="text" v-model="dishName" placeholder="菜品名称">
        </div>
        <div class="type">
          <label for="">菜品分类:</label>
          <select v-model="dishType" >
            <option disabled value="">请选择菜品分类</option>
            <option v-for="item in typeList" :key="item._id" :value="item._id">{{item.typeName}}</option>
          </select>
        </div>
        <button @click="searchAction">查询</button>
      </div>
      <div class="content">
        <div class="title">
          <span class="dishnum">菜品数量: {{length}}件</span>
          <span class="add" @click="addAction">新建</span>
        </div>
        <div class="list-header">
          <span class="dishId">编号</span><span class="line"></span>
          <span class="dishImg">菜品图片</span><span class="line"></span>
          <span class="dishName">菜品名称</span><span class="line"></span>
          <span class="dishPrice">价格</span><span class="line"></span>
          <span class="dishTag">标签</span><span class="line"></span>
          <span class="dishSort">排序</span><span class="line"></span>
          <span class="dishNum">销量</span><span class="line"></span>
          <span class="dishHander">操作</span>
        </div>
        <ul class="list">
          <li class="item" v-for="item in list" :key="item._id">
            <span class="dishId">{{item._id.slice(item._id.length-6,item._id.length)}}</span><span class="line"></span>
            <span class="dishImg">
              <img v-if="item.dishImg" :src="item.dishImg" alt="">
              <i v-else class="img">img</i>
            </span>
            <span class="dishName">{{item.dishName}}</span><span class="line"></span>
            <span class="dishPrice">价格：￥{{item.dishPrice}}</span><span class="line"></span>
            <span class="dishTag">
              <i v-for="(tag,index) in JSON.parse(item.dishTage)" :key="index">{{tag}}</i>
            </span><span class="line"></span>
            <span class="dishSort">1</span><span class="line"></span>
            <span class="dishNum">{{item.dishSales}}</span><span class="line"></span>
            <span class="dishHander">
              <i>查看</i>
              <i>编辑</i>
              <i @click="delAction(item._id)" >删除</i>
            </span>
          </li>
        </ul>
        <div class="pages">
          <p>共<i>{{Math.ceil(length/6)}}</i>页/<i>{{length}}</i>条数据</p>
          <span @click="minuPageAction" class="iconfont iconxiangzuo"></span>
          <ul>
            <li v-for="item in Math.ceil(length/6)" :key="item" :class="{active: item == nowPage}" @click="changePageAction(item)" >{{item}}</li>
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
</template>

<script>
import {mapState} from 'vuex';
import http from '../../api/http';
import {DELDISH} from '../../api/url';
export default {
  data(){
    return {
      dishName: '',
      dishType: '',
      nowPage: 1
    }
  },
  computed: {
    ...mapState({
      length: state => state.dish.listlength,
      list: state => state.dish.list,
      typeList: state => state.dishType.typeList
    })
    
  },
  methods: {
    searchAction(){
      console.log(this.dishName);
      console.log(this.dishType);
    },
    addAction(){
      this.$router.push('/dishes/new-dish')
    },
    changePageAction(num){
      this.nowPage = num;
    },
    addPageAction(){
      this.nowPage ++;
      if(this.nowPage >= 3){
        this.nowPage = 3;
      }
    },
    minuPageAction(){
      this.nowPage --;
      if(this.nowPage <= 1){
        this.nowPage = 1;
      }
    },
    async delAction(id){
      var res = await http.get(DELDISH, {id});
      if(res.data.code == 0){
        alert('删除成功!');
        location.reload();
      }else{
        alert('删除失败!');
      }
    }
  },
  watch: {
    nowPage(newVal){
      this.$store.dispatch('dish/GETDISHINIT',newVal);
    }
  },
  created(){
    this.$store.dispatch('dish/initDish');
    this.$store.dispatch('dishType/getTypeList');
  }
}
</script>

<style scoped lang="scss">
.dishes-manager{
  .top{
    height: 75px;
    background: #fff;
    display: flex;
    align-items: center;
    padding-left: 50px;
    position: relative;
    .name{
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 40px;
      label{
        font-size: 12px;
        color: #333;
        margin-right: 12px;
      }
      input{
        width: 180px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #e4e4e4;
        padding-left: 10px;
        font-size: 12px;
        color: #666;
        &::placeholder{
          color: #bcbcbc;
        }
      }
    }
    .type{
      display: flex;
      align-items: center;
      label{
        font-size: 12px;
        color: #333;
        margin-right: 12px;
      }
      select{
        width: 180px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border: 1px solid #e4e4e4;
        outline: none;
        color: #666;
        font-size: 12px;
      }
    }
    button{
      width: 70px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 12px;
      color: #bcbcbc;
      border: 1px solid #e4e4e4;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 30px;
      background: #fff;
      padding: 0;
      outline: none;
    }
  }
  .content{
    width: 100%;
    background: #fff;
    margin-top: 20px;
    .title{
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dishnum{
        font-size: 12px;
        color: #8d64ca;
        margin-left: 20px;
        font-weight: bold;
      }
      .add{
        width: 70px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin-right: 30px;
        font-size: 12px;
        color: #fff;
        background: #7764ca;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    .list-header{
      width: 100%;
      height: 44px;
      background: #f9fafc;
      line-height: 44px;
      font-size: 12px;
      color: #666;
      font-weight: bold;
      text-align: center;
      display: flex;
      .line{
        width: 1px;
        height: 100%;
        background: #fff;
      }
      .dishId,.dishImg,.dishTag{
        width: 117px;
      }
      .dishName{
        width: 223px;
      }
      .dishPrice{
        width: 140px;
      }
      .dishSort,.dishNum{
        width: 93px;
      }
      .dishHander{
        flex: 1;
      }
    }
  }
  .list{
    width: 100%;
    background: #fff;
    .item{
      width: 100%;
      height: 100px;
      overflow: hidden;
      display: flex;
      font-size: 12px;
      color: #333;
      text-align: center;
      line-height: 100px;
      &:nth-child(2n){
        background: #f9fafc;
      }
      .line{
        width: 1px;
        height: 100%;
        background: #fff;
      }
      .dishId,.dishImg,.dishTag{
        width: 117px;
      }
      .dishName{
        width: 223px;
      }
      .dishPrice{
        width: 140px;
      }
      .dishSort,.dishNum{
        width: 93px;
      }
      .dishHander{
        padding: 0 30px;
        flex: 1;
        display: flex;
        justify-content: space-around;
        color: #1abc9c;
        i{
          cursor: pointer;
        }
      }
      .dishImg {
        position: relative;
        img{
          position: absolute;
          width: 80px;
          height: 80px;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
        .img{
          position: absolute;
          width: 50px;
          height: 50px;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: #ccc;
          line-height: 50px;
        }
      }
      .dishTag{
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
        i{
          line-height: 30px;
        }
      }
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

</style>