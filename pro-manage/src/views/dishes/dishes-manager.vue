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
            <option value="汉堡包">汉堡包</option>
            <option value="炸鸡">炸鸡</option>
            <option value="盖饭">薯条</option>
          </select>
        </div>
        <button @click="searchAction">查询</button>
      </div>
      <div class="content">
        <div class="title">
          <span class="dishnum">菜品数量: xx件</span>
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
          <li class="item">
            <span class="dishId">10000001</span><span class="line"></span>
            <span class="dishImg"><img src="" alt=""></span><span class="line"></span>
            <span class="dishName">珍珠翡翠白玉汤</span><span class="line"></span>
            <span class="dishPrice">价格：￥100.00</span><span class="line"></span>
            <span class="dishTag">
              <i>上架</i>
              <i>推荐</i>
            </span><span class="line"></span>
            <span class="dishSort">1</span><span class="line"></span>
            <span class="dishNum">100</span><span class="line"></span>
            <span class="dishHander">
              <i>查看</i>
              <i>编辑</i>
              <i>删除</i>
            </span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      dishName: '',
      dishType: ''
    }
  },
  methods: {
    searchAction(){
      console.log(this.dishName);
      console.log(this.dishType);
    },
    addAction(){
      console.log('添加');
    }
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
        flex: 1;
      }
    }

  }
}

</style>