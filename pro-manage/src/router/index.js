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
    children: [
      ...mainRouter,
      /* 403权限不足 */
      {
        path: '403',
        name: '403',
        component: () => import(/* webpackChunkName:"403" */ '../views/403.vue'),
      }
    ]
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
    component: ()=>import(/* webpackChunkName:"404" */ '../views/404.vue')
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
} );

router.beforeEach( (to,from,next)=>{
  var user = JSON.parse(localStorage.getItem('loguser'));
  if(user.isAdmin){
    next();
  }else{
    if(!to.meta.auth){
      next();
    }else{
      var index = to.meta.auth.findIndex(item => item == user.auth);
      if(index !== -1){
        next()
      }else{
        
        next({name: '403'});
       
      }
      
    }
  }
})

export default router
