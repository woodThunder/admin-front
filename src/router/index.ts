import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { keepAliveList, buttonsAuth } from '@/utils/common'
// 获取views下的全部路径
const modules = import.meta.glob('/src/pages/views/**/*.vue')

// 设置静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfind',
    component: () => import('@/pages/404/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/pages/layout/index.vue'),
    children: [
    ]
  }
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export let registerRouteFresh = ref(true)

// 全局前置守卫 - 动态添加路由
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 没有token且跳转不是登录页
  if (!token) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
  // 防止重复登录
  if (token) {
    // 获取菜单信息 -- 防止刷新后公共数据消失 
    // 1、刷新后重新添加路由 2、退出再登录重新添加路由，退出时清空路由，防止低权限用户在已知路由路径的情况下也能访问页面
    if (registerRouteFresh.value) {
      updateRouter()
      registerRouteFresh.value = false
    }
    if (to.path === '/login') {
      next('/')
    } else {
      // 路由还没动态添加，跳转首页时，name为notfind，需要重定向
      const routerList = router.getRoutes()
      const curRouter = routerList.find(r => r.path === to.path)
      if (to.name === 'notfind' && curRouter) {
        next({...curRouter, query: to.query, replace: true})
      } else {
        next()
        // const hasRoute = router.hasRoute(to.name!)
        // // 如果未添加，需要重定向
        // if (!hasRoute) {
        //   next({...to, replace: true})
        // } else {
        //   next()
        // }
      }
    }
  } 
})

const updateRouter = () => {
  const menus = JSON.parse(localStorage.getItem('menus') as string)
  // 获取所有路由数据
  const {routeList, buttonsObj} = getRouterData(menus)
  Object.assign(buttonsAuth, buttonsObj)
  // 添加为layout的子路由
  for (let item of routeList) {
    // 如果需要缓存，把name存储在keepAliveList数组中
    if (item.is_keepalive) {
      // 初始化路由缓存列表
      keepAliveList.value.push(item.name)
    } 
    router.addRoute('layout', {
      path: item.route_path,
      component: modules[item.component_path],
      name: item.name,
      meta: {
        title: item.title,
        isKeepAlive: item.is_keepalive
      }}
    )
  }
}

// 获取页面路由信息 - 树形路由平铺
function getRouterData(data: any) {
  let routeList: any = [];
  let buttonsObj = {}

  function traverse(arr: any) {
      for (let obj of arr) {
          if (obj.children.length) {
              traverse(obj.children);
          } else {
            if (obj.type === 2) {
              routeList.push(obj);
            }
            buttonsObj[obj.name] = obj.buttons
          }
      }
  }
  traverse(data);
  return {routeList, buttonsObj};
}

export default router
