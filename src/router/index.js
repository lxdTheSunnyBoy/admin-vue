import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from '@/assets/js/auch'

import Login from '@/components/login/login'
import Home from '@/components/home/home'
// 用户管理组件
import UserList from '@/components/user-list/user-list'
// 角色管理组件
import RoleList from '@/components/role-list/role-list'
// 权限管理组件
import RightsList from '@/components/rights-list/rights-list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        },
        {
          name: 'rights-list',
          path: '/rights',
          component: RightsList
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!getUserInfo) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})
export default router
