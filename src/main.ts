import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入UI组件库
import CraneNest from 'crane-nest'
import 'crane-nest/dist/index.css'
// 引入路由
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { buttonsAuth } from '@/utils/common'
import { RouteRecordName } from 'vue-router'



const app = createApp(App)

// 用于按钮权限的指令
app.directive('auth', {
  mounted(el, binding) {
    if (!binding.value) return
    // 通过router.currentRoute.value.path拿到当前路由
    const key = router.currentRoute.value.name as RouteRecordName
    const buttonsList = buttonsAuth[key]
    if (buttonsList && buttonsList.length) {
      const is = buttonsList.some((item: any) => item.name === binding.value)
      if (!is) {
        el?.parentNode?.removeChild(el)
      }
    }
  }
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(CraneNest)
app.use(router)
app.mount('#app')
