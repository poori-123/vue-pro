import Vue from 'vue'
import VueRouter from 'vue-router'
import  Home from '../views/home.vue';

import http from '../api/http';
import {ISLOGIN} from '../api/url';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'confirmOrder',
        name: 'confirmOrder',
        component: () => import (/* webpackChunkName:"confirmOrder" */ '../views/confirmOrder.vue'),
        children: [
          {
            path: 'success/:id',
            name: 'success',
            component: () => import (/* webpackChunkName:"success" */ '../views/order/success.vue')
          },
          {
            path: 'error',
            name: 'error',
            component: () => import (/* webpackChunkName:"error" */ '../views/order/error.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/myCenter',
    name: 'myCenter',
    component: () => import(/* webpackChunkName:"myCenter" */ '../views/myCenter.vue'),
    children: [
      {
        path: 'orderList/:id',
        name: 'orderList',
        component: () => import (/* webpackChunkName:"orderList" */ '../views/user/orderList.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:"login" */ '../views/user/login.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import(/* webpackChunkName:"add" */ '../views/user/add.vue')
  },
  {
    path: '/',
    redirect: '/home'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to,from,next)=>{
  if(to.name == 'login' || to.name == 'add'){
    next();
  }else{
    var result = await http.get(ISLOGIN);
    if(result.data.code == 0){
      next();
    }else{
      next('/login');
    }
  }
})

export default router
