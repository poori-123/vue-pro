<template>
  <div class="type-list">
      <div class="top">
        <span class="left">
          分类数量: {{typeList.length}}个
        </span>
        <span class="right" @click="addType" >新建</span>
      </div>
      <div class="list-head">
        <span class="typeId">编号</span><span class="line"></span>
        <span class="typeName">分类名称</span><span class="line"></span>
        <span class="typeCount">商品数量</span><span class="line"></span>
        <span class="typeNav">导航栏</span><span class="line"></span>
        <span class="typeIsShow">是否显示</span><span class="line"></span>
        <span class="typeSort">排序</span><span class="line"></span>
        <span class="typeHander">操作</span>
      </div>
      <ul class="list">
        <li v-for="item in typeList" :key="item._id">
          <span class="typeId">{{item._id.slice(item._id.length-6,item._id.length)}}</span><span class="line"></span>
          <span class="typeName">{{item.typeName}}</span><span class="line"></span>
          <span class="typeCount">{{item.typeCount}}</span><span class="line"></span>
          <span class="typeNav">
            <a-icon v-if="item.typeShowNav" type="check" />
            <a-icon v-else type="close" />
          </span><span class="line"></span>
          <span class="typeIsShow">
            <a-icon v-if="item.typeShowNav" type="check" />
            <a-icon v-else type="close" />
          </span><span class="line"></span>
          <span class="typeSort">{{item.typeSort}}</span><span class="line"></span>
          <span class="typeHander">
            <b @click="editAction(item._id)">编辑</b>
            <b @click="delAction(item._id)">删除</b>
          </span>
        </li>
      </ul>
      <router-view/>
  </div>
</template>

<script>
import {Icon} from 'ant-design-vue';
import {mapState} from 'vuex';
import http from '../../api/http';
import {DELDISHTYPE} from '../../api/url';
export default {
  components: {
    [Icon.name]: Icon
  },
  computed: {
    ...mapState({
      typeList : state=> state.dishType.typeList
    })
  },
  methods: {
    addType(){
      this.$router.push({
        name: 'new-type',
        params: {
          type: 'add',
          id: '000'
        }
      });
    },
    editAction(id){
      this.$router.push({
        name: 'new-type',
        params: {
          type: 'edit',
          id
        }
      });
    },
    async delAction(id){
      var res = await http.post(DELDISHTYPE, {id});
      console.log(res);
      if(res.data.code == 0){
        alert('删除成功!');
        location.reload();
      }else{
        alert('删除失败!')
      }
    }
  },
  watch:{
    '$route.name'(newVal,oldVal){
      if(oldVal == 'new-type'){
        location.reload();
      }
    }
  },
  created(){
    this.$store.dispatch('dishType/getTypeList');
  }
}
</script>

<style scoped lang="scss">
.type-list{
  width: 100%;
  background: #fff;
  .top{
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    line-height: 60px;
    .left{
      font-size: 14px;
      font-weight: bold;
      color: #7764ca;
    }
    .right{
      width: 69px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      background: #7764ca;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .list-head{
    height: 60px;
    line-height: 60px;
    width: 100%;
    display: flex;
    background: #f9fafc;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    .line{
      width: 1px;
      height: 100%;
      background: #fff;
    }
    .typeId{
      width: 170px;
    }
    .typeName{
      width: 196px;
    }
    .typeCount,.typeNav,.typeIsShow{
      width: 162px;
    }
    .typeSort{
      width: 138px;
    }
    .typeHander{
      flex: 1;
    }
  }
  .list{
    width: 100%;
    li{
      height: 60px;
      line-height: 60px;
      width: 100%;
      display: flex;
      text-align: center;
      font-size: 12px;
      color: #666;
      &:nth-child(2n){
        background: #f9fafc;
      }
      .line{
        width: 1px;
        height: 100%;
        background: #fff;
      }
      .typeId{
        width: 170px;
      }
      .typeName{
        width: 196px;
      }
      .typeCount,.typeNav,.typeIsShow{
        width: 162px;
        color: #1abc9c;
      }
      .typeSort{
        width: 138px;
      }
      .typeHander{
        flex: 1;
        color: #1abc9c;
        display: flex;
        justify-content: space-around;
        padding: 0 20px;
        b{
          cursor: pointer;
        }
      }
    }
  }
}
</style>