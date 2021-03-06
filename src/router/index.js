import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    roles: ['ADMIN', 'CUSTOMER'],
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    roles: ['ADMIN', 'CUSTOMER'],
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    roles: ['ADMIN', 'CUSTOMER'],
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      roles: ['ADMIN', 'CUSTOMER'],
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/master',
    name: 'Master',
    title: 'Master',
    component: Layout,
    roles: ['ADMIN'],
    meta: { title: 'Master' },
    alwaysShow : true,
    children: [
      {
        path: 'user',
        name: 'User',
        roles: ['ADMIN'],
        component: () => import('@/views/master/user'),
        meta: { title: 'User', icon: 'user' }
      },
      {
        path: 'customer',
        name: 'Customer',
        roles: ['ADMIN'],
        component: () => import('@/views/master/customer/index'),
        meta: { title: 'Customer', icon: 'el-icon-user-solid' },
      },
      {
        path: 'customer/edit/:id',
        name: 'Edit',
        roles: ['ADMIN'],
        hidden : true,
        component: () => import('@/views/master/customer/edit'),
        meta: { title: 'Edit Customer' },
      }
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    title: 'Activity',
    component: Layout,
    roles: ['ADMIN'],
    meta: { title: 'Activity' },
    alwaysShow : true,
    children: [
      {
        path: 'call',
        name: 'Call',
        roles: ['ADMIN'],
        component: () => import('@/views/activity/calls/index'),
        meta: { title: 'Call', icon: 'el-icon-phone' }
      },
      {
        path: 'call/edit/:id',
        name: 'Edit',
        roles: ['ADMIN'],
        hidden : true,
        component: () => import('@/views/activity/calls/edit'),
        meta: { title: 'Edit Call' },
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', roles: ['ADMIN', 'CUSTOMER'], redirect: '/404', hidden: true },
]

export const asyncRoutes = [
  {
    path: '/master/customer/edit',
    component: Layout
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
