import { ref, reactive } from 'vue'
import router from '@/router'
import { registerRouteFresh } from '@/router/index'
import { ButtonsAuth } from './types'
// 路由缓存列表
export const keepAliveList = ref<string[]>([])

export let buttonsAuth = reactive<ButtonsAuth>({})

export const logout = () => {
	// 清空本地数据
	localStorage.clear()
	registerRouteFresh.value = true
  keepAliveList.value = []
	// 清空路由
	const routerList = router.getRoutes()
	const nameList = ['login', 'notfind', 'layout']
	routerList.forEach(item => {
		if (!nameList.includes(item.name as string) && router.hasRoute(item.name!)) {
			router.removeRoute(item.name!)
		}
	})
	// router.push('/login')
	// 防止退出登录后还能回退
	location.href= '#/login'
}
