<template>
  <div class="index">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div>
          <div class="logo">LOGO</div>
          <div class="status">营业中/已打烊<span class="iconfont iconshezhi"></span></div>
        </div>
        <ul>
          <li><span class="iconfont icongeren"></span>账户设置</li>
          <li @click="logoutAction" ><span class="iconfont iconexittuichu"></span>退出登录</li>
        </ul>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #484d5e">
          <a-menu
            mode="inline"
            :default-selected-keys="[selectKey]"
            :default-open-keys="openKeys"
            :style="{ height: '100%', borderRight: 0 }"
            @click="changeRouteAction"
          >
            <template v-for="item in menu" >
              <a-sub-menu :key="item.name" v-if="item.children" >
                <span slot="title"><a-icon type="heat-map" />{{item.meta.title}}</span>
                <a-menu-item v-for="child in item.children" :key="child.name" >
                  {{child.meta.title}}
                </a-menu-item>
              </a-sub-menu>

              <a-menu-item v-else :key="item.name">
                <a-icon type="heat-map" />{{item.meta.title}}
              </a-menu-item>

            </template>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 15px">
          <a-layout-content
            :style="{ margin: 0, minHeight: '100%' }"
          >
            <a-breadcrumb>
              <template v-for="item in $route.matched" >
                <a-breadcrumb-item v-if="item.name" :key="item.name" >{{item.meta.title}}</a-breadcrumb-item>
              </template>
          </a-breadcrumb>
            <router-view class="subpage" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout, Menu, Icon, Breadcrumb } from 'ant-design-vue';
import mainRouter from '../router/mainRouter';
import http from '../api/http';
import {LOGOUT} from '../api/url';
export default {
  components: {
    [Layout.name]: Layout,
    [Layout.Header.name]: Layout.Header, 
    [Layout.Sider.name]: Layout.Sider, 
    [Layout.Content.name]: Layout.Content, 
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Icon.name]: Icon,
    [Breadcrumb.name]: Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item
  },
  data(){
    return {
      collapsed: false,
      menu: mainRouter,
      selectKey: this.$route.name
    }
  },
  computed:{
    openKeys(){
      const index = this.$route.matched.findIndex(
        (item) => item.name === this.$route.name
      );
      if (index === 1) {
        //一级目录
        return [];
      } else {
        //二级目录
        return [this.$route.matched[1].name];
      }
    },
  },
  methods:{
    changeRouteAction({key}){
      if(this.$route.name === key){
        return;
      }
      this.$router.push({
        name: key
      })
    },
    async logoutAction(){
      var res = await http.get(LOGOUT);
      if(res.data.code == 0){
        this.$router.push('/user');
      }
    }
  }
}
</script>

<style lang="scss">
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#app{
  .index{
    .ant-layout-header{
      height: 80px;
      background: #7764ca;
      display: flex;
      align-items: center;
      justify-content: space-between;
      >div{
        display: flex;
        align-items: center;
      }
      .logo{
        width: 50px;
        height: 50px;
        margin: 0;
        background: #fff;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #7764ca;
      }
      .status{
        margin-left: 20px;
        font-size: 18px;
        font-weight: 900;
        color: #fff;
        line-height: 80px;
        .iconfont{
          margin-left: 10px;
          font-weight: normal;
          font-size: 20px;
        }
      }
      ul{
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0;
        li{
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          .iconfont{
            margin-right: 5px;
          }
          &:nth-child(1){
            margin-right: 40px;
          }
        }
      }
    }
    >.ant-layout{
      min-height: 100%;
      min-width: 1380px;
      >.ant-layout{
        .ant-layout-sider{
          .ant-menu{
            background: transparent;
            .ant-menu-item{
              color: #8f9bc4;
              font-size: 12px;
              height: 50px;
              line-height: 50px;
              &:hover{
                background: rgb(59,64,79);
              }
            }
            .ant-menu-submenu{
              color: #8f9bc4;
              div{
                &:hover{
                  color: #eee;
                }
              }
              &.ant-menu-submenu-active .ant-menu-submenu-arrow{
                &::before{
                  background: #eee;
                }
                &::after{
                  background: #eee;
                }
              }
              &.ant-menu-submenu-open .ant-menu-submenu-arrow{
                &::before{
                  background: #eee;
                }
                &::after{
                  background: #eee;
                }
              }
            }
            .ant-menu-submenu-selected{
              div{
                color: #eee;
              }
            }
            .ant-menu-submenu-selected .ant-menu-submenu-arrow{
              &::before{
                background: #eee;
              }
              &::after{
                background: #eee;
              }
            }

            .ant-menu-item-selected{
              background: rgb(59,64,79);
              // &::after{
                // border-right-color: #999;
              // }
            }
          }
        }
        .ant-breadcrumb{
          line-height: 40px;
          font-size: 15px;
          padding-left: 10px;
        }
      }
    }
    .subpage{
      width: 1150px;
    }
  }
}

</style>
