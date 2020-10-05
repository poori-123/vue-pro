import Vue from 'vue';
import VueRouter from 'vue-router';
import User from '../views/user/user.vue';

// import axios from 'axios';
import http from '../api/http';
import {ISLOGIN} from '../api/url';

import mainRouter from './mainRouter';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ()=>import(/* webpackChunkName:"index" */ '../views/index.vue'),
    redirect: '/home',
    children: mainRouter
  },
  {
    path: '/user',
    name:'User',
    component: User,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: ()=> import(/* webpackChunkName:"login" */ '../views/user/login.vue')
      },
      {
        path: 'forgetPassword',
        name: 'forgetPassword',
        component: ()=> import(/* webpackChunkName:"forgetPassword" */ '../views/user/forgetPassword.vue')
      }
    ]
  },
  {
    path: '*',
    component: ()=>import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( async(to, from, next)=>{
  if(to.name === 'login' || to.name === 'forgetPassword'){
    next();
  }else{
    var res = await http.get(ISLOGIN);
    if(res.data.code === -1){
      next('/user');
    }else{
      next();
    }
  }
} )

export default router
