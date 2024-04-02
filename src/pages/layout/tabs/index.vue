<template>
  <el-tabs
    v-model="curTabs"
    type="card"
    class="tabs"
    @tab-click="tabsClick"
    @tab-remove="tabRemove"
  >
    <el-tab-pane
      v-for="item in tabsList"
      :key="item.path"
      :label="item.name"
      :name="item.path"
      :closable="item.path !== '/'"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
// 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，无需再手动声明。
import { ref } from 'vue'
import { keepAliveList } from '@/utils/common'
import { Tab } from './types'
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 页签选中
const curTabs = ref(route.fullPath) 
const tabsOrigin = JSON.parse(localStorage.getItem('tabsList')!) || [
  {
    name: '首页',
    path: '/',
  }
]
// 页签列表
const tabsList = ref<Tab[]>(tabsOrigin)

// 路由更新
onBeforeRouteUpdate((to) => {
  // 用于添加页签
  const index = tabsList.value.findIndex(item => item.path === to.fullPath)
  if (index === -1) {
    tabsList.value.push({
      name: to.meta.title as string,
      path: to.fullPath // 打开多个页签
    })
  }
  curTabs.value = to.fullPath
  localStorage.setItem('tabsList', JSON.stringify(tabsList.value))

  // 需要缓存，但是缓存列表不存在
  if (to.meta.isKeepAlive && !keepAliveList.value.includes(to.name as string)) {
    keepAliveList.value.push(to.name as string)
  }
})

// 点击当前tab
const tabsClick = (e: any) => {
  if (e.paneName !== curTabs.value) {
    router.push(e.paneName)
  }
}

// 移除当前tab
const tabRemove = (e: string) => {
  // 关闭标签与当前路由不一致时，直接过滤路由缓存
  if (e !== route.fullPath) {
    // 获取所有路由信息
    const routerList = router.getRoutes()
    // 过滤当前页签的路由，获取路由name
    const curRouter = routerList.find(r => r.path === e)
    // 如果需要缓存，再过滤
    if (curRouter?.meta.isKeepAlive) {
      keepAliveList.value = keepAliveList.value.filter(item => item !== curRouter!.name)
    }
  } else {
    // 一致时，切换页签，跳转路由
    const index = tabsList.value.findIndex(item => item.path === e)
    // 拿到下一页签或者上一页签
    const nextTab = tabsList.value[index+1] || tabsList.value[index-1]
    curTabs.value = nextTab.path
    router.push(nextTab.path)
    
    // 直接过滤路由缓存 -- 当前页面的name
    keepAliveList.value = keepAliveList.value.filter(item => item !== route.name)
  }
  // 过滤页签
  tabsList.value = tabsList.value.filter(item => item.path !== e)
}

</script>
<style lang="scss">
</style>
