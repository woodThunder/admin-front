// 调用接口的方法后缀都是API
import { post, get } from "@/utils/request"
import { LISTPARAMS, SAVEPARAMS } from './interface'

// 列表
export function getListAPI(data: LISTPARAMS) {
  return post("/api/role_menu/list", {}, data)
}

// 保存
export function saveAPI(data: SAVEPARAMS) {
  return post("/api/role_menu/save", {}, data)
}
