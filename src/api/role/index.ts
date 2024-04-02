// 调用接口的方法后缀都是API
import { post, get } from "@/utils/request"
import { LISTPARAMS, SAVEPARAMS, DELETEPARAMS } from './interface'

// 用户列表
export function getRoleListAPI(data: LISTPARAMS) {
  return post("/api/role/list", {}, data)
}

// 新建用户
export function saveRoleAPI(data: SAVEPARAMS) {
  return post("/api/role/create", {}, data)
}

// 编辑用户
export function editRoleAPI(data: SAVEPARAMS) {
  return post("/api/role/update", {}, data)
}

// 删除用户
export function deleteRoleAPI(data: DELETEPARAMS) {
  return post("/api/role/delete", {}, data)
}