export default [
    /* 工作台 */
    {
      path: 'home',
      name: 'Home',
      component: ()=>import(/* webpackChunkName:"home" */ '../views/home/home'),
      meta: {
        title: '工作台',
        icon:''
      }
    },
    /* 菜品管理 */
    {
      path: 'dishes',
      name: 'Dishes',
      component: {
        render: h => <router-view/>
      },
      meta: {
        title: '菜品管理',
        icon:''
      },
      redirect: '/dishes/dishes-manager',
      children: [
        {
          path: 'dishes-manager',
          name: 'dishes-manager',
          component: ()=>import(/* webpackChunkName:"dishes-manager" */ '../views/dishes/dishes-manager.vue'),
          meta: {
            title: '菜品列表',
            icon:''
          },
        },
        {
          path: 'new-dish',
          name: 'new-dish',
          component: ()=>import(/* webpackChunkName:"new-dish" */ '../views/dishes/new-dish.vue'),
          meta: {
            title: '新建菜品',
            icon:''
          },
        },
        {
          path: 'type-manager',
          name: 'type-manager',
          component: ()=>import(/* webpackChunkName:"type-manager" */ '../views/dishes/type-manager.vue'),
          meta: {
            title: '分类管理',
            icon:''
          },
        },
        {
          path: 'new-type',
          name: 'new-type',
          component: ()=>import(/* webpackChunkName:"new-type" */ '../views/dishes/new-type.vue'),
          meta: {
            title: '新建分类',
            icon:''
          },
        },
        
      ]
    },
    /* 台桌管理 */
    {
      path: 'table',
      name: 'Table',
      component: {
        render: h => <router-view/>
      },
      meta: {
        title: '台桌管理',
        icon:''
      },
      redirect: '/table/table-setting',
      children: [
        {
          path: 'table-setting',
          name: 'table-setting',
          component: ()=>import(/* webpackChunkName:"table-setting" */ '../views/table/table-setting.vue'),
          meta: {
            title: '台桌管理',
            icon:''
          },
        },
        {
          path: 'table-type',
          name: 'table-type',
          component: ()=>import(/* webpackChunkName:"table-type" */ '../views/table/table-type.vue'),
          meta: {
            title: '桌型管理',
            icon:''
          },
        },
        {
          path: 'table-manager',
          name: 'table-manager',
          component: ()=>import(/* webpackChunkName:"table-manager" */ '../views/table/table-manager.vue'),
          meta: {
            title: '桌位管理',
            icon:''
          },
        },
      ]
    },
    /* 订单统计 */
    {
      path: 'order',
      name: 'Order',
      component: {
        render: h => <router-view/>
      },
      meta: {
        title: '订单统计',
        icon:''
      },
      redirect: '/order/order-sum',
      children: [
        {
          path: 'order-sum',
          name: 'order-sum',
          component: ()=>import(/* webpackChunkName:"order-sum" */ '../views/order/order-sum.vue'),
          meta: {
            title: '订单统计',
            icon:''
          },
        },
        {
          path: 'order-list',
          name: 'order-list',
          component: ()=>import(/* webpackChunkName:"order-list" */ '../views/order/order-list.vue'),
          meta: {
            title: '统计列表',
            icon:''
          },
        },
      ]
    },
    /* 门店设置 */
    {
      path: 'shop',
      name: 'Shop',
      component: ()=>import(/* webpackChunkName:"shop" */ '../views/shop/shop-setting'),
      meta: {
        title: '门店设置',
        icon:''
      },
    },
    /* 营销管理 */
    {
      path: 'market',
      name: 'Market',
      component: {
        render: h => <router-view/>
      },
      meta: {
        title: '营销管理',
        icon:''
      },
      redirect: '/market/full-reduction',
      children: [
        {
          path: 'full-reduction',
          name: 'full-reduction',
          component: ()=>import(/* webpackChunkName:"full-reduction" */ '../views/market/full-reduction.vue'),
          meta: {
            title: '满减卷',
            icon:''
          },
        },
        {
          path: 'time-limit',
          name: 'time-limit',
          component: ()=>import(/* webpackChunkName:"time-limit" */ '../views/market/time-limit.vue'),
          meta: {
            title: '限时折扣',
            icon:''
          },
        },
        {
          path: 'new-people',
          name: 'new-people',
          component: ()=>import(/* webpackChunkName:"new-people" */ '../views/market/new-people.vue'),
          meta: {
            title: '新人卷',
            icon:''
          },
        },
        {
          path: 'coupon-stack',
          name: 'coupon-stack',
          component: ()=>import(/* webpackChunkName:"coupon-stack" */ '../views/market/coupon-stack.vue'),
          meta: {
            title: '优惠卷叠加',
            icon:''
          },
        },
      ]
    },
    /* 排队取号 */
    {
      path: 'lineup',
      name: 'Lineup',
      component: {
        render: h => <router-view/>
      },
      meta: {
        title: '排队取号',
        icon:''
      },
      redirect: '/lineup/lineup-list',
      children: [
        {
          path: 'lineup-list',
          name: 'lineup-list',
          component: ()=>import(/* webpackChunkName:"lineup-list" */ '../views/lineup/lineup-list.vue'),
          meta: {
            title: '排队列表',
            icon:''
          },
        },
        {
          path: 'lineup-setting',
          name: 'lineup-setting',
          component: ()=>import(/* webpackChunkName:"lineup-setting" */ '../views/lineup/lineup-setting.vue'),
          meta: {
            title: '取号设置',
            icon:''
          },
        },
      ]
    },
    /* 餐桌预定 */
    {
      path: 'reserve',
      name: 'Reserve',
      component: {
        render: h => <router-view/>
      },
      meta: {
        title: '餐桌预定',
        icon:''
      },
      redirect: '/reserve/reserve-list',
      children: [
        {
          path: 'reserve-list',
          name: 'reserve-list',
          component: ()=>import(/* webpackChunkName:"reserve-list" */ '../views/reserve/reserve-list.vue'),
          meta: {
            title: '预定列表',
            icon:''
          },
        },
        {
          path: 'reserve-setting',
          name: 'reserve-setting',
          component: ()=>import(/* webpackChunkName:"reserve-setting" */ '../views/reserve/reserve-setting.vue'),
          meta: {
            title: '预定设置',
            icon:''
          },
        },
      ]
    },
    /* 员工管理 */
    {
      path: 'staff',
      name: 'Staff',
      component: ()=>import(/* webpackChunkName:"staff" */ '../views/staff/staff-manager'),
      meta: {
        title: '员工管理',
        icon:''
      },
    },
    /* 角色管理 */
    {
      path: 'role',
      name: 'Role',
      component: ()=>import(/* webpackChunkName:"role" */ '../views/role/role-manager'),
      meta: {
        title: '角色管理',
        icon:''
      },
    },
  ]