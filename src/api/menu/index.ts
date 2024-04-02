// 调用接口的方法后缀都是API
import { post, get } from "@/utils/request"
import { SAVEPARAMS, DELETEPARAMS } from './interface'

// 用户列表
export function getListAPI() {
  return post("/api/menu/list")
}

// 创建
export function createAPI(data: any) {
  return post("/api/menu/create", {}, data)
}

// 删除
export function deleteAPI(data: DELETEPARAMS) {
  return post("/api/menu/delete", {}, data, {
    showLoading: true,
    showSuccessToast: true,
    showFailToast: true
  })
}

export function updateAPI(data: DELETEPARAMS) {
  return post("/api/menu/update", {}, data, {
    showLoading: true,
    showSuccessToast: true,
    showFailToast: true
  })
}