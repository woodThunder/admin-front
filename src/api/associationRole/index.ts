// 调用接口的方法后缀都是API
import { post, get } from "@/utils/request"
import { LISTPARAMS, ASSOCIATIONPARAMS, DELETEPARAMS } from './interface'

// 关联列表
export function getListAPI(data: LISTPARAMS) {
  return post("/api/account_role/list", {}, data)
}

// 取消关联
export function deleteAPI(data: DELETEPARAMS) {
  return post("/api/account_role/delete", {}, data)
}

// 查找当前用户没有绑定的角色列表
export function getRoleListApi(data: LISTPARAMS) {
  return post("/api/account_role/role_list", {}, data)
}

// 确认关联
export function addRolesAPI(data: ASSOCIATIONPARAMS) {
  return post("/api/account_role/association_role", {}, data, {
    showLoading: true,
    showSuccessToast: true,
    showFailToast: true
  })
}