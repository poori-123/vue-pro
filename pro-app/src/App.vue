<template>
  <div id="app">
    <keep-alive>
      <router-view class="pages"/>
    </keep-alive>
    
    <div class="link">
      <router-link to="/home" :class="{active: $route.name == 'home'}" ><span class="iconfont iconshouye"></span>首页</router-link>
      <router-link to="/myCenter" :class="{active: $route.name == 'myCenter'}"><span class="iconfont iconwode"></span>我的</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  created(){
    
  }
}
</script>
<style lang="scss">
html,body,#app{
  width: 100%;
  height: 100%;
  position: relative;
}
html{
  touch-action: none;
}
*{box-sizing: border-box;}
.link{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.8rem;
  border-top: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a{
    font-size: 0.12rem;
    color: #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .iconfont{
      font-size: 0.2rem;
      margin-bottom: 0.03rem;
    }
    &.active{
      color: #3bb19c;
    }
  }
}
.pages{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0.8rem;
  background: #f5f5f5;
  overflow: hidden;
}
.van-dialog{
  transform-origin: center left;
  transform: scale(1.5) translate3d(-50%,-50%,0) !important;
}
</style>
