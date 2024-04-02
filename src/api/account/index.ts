// 调用接口的方法后缀都是API
import { post, get } from "@/utils/request"
import { loginMock } from './mock'
import { HttpResponse, LOGINDATA, LOGINPARAMS, ACCOUNTLISTPARAMS, SAVEACCOUNTPARAMS, DELETEPARAMS } from './interface'

const { VITE_IS_MOCK } = import.meta.env

// 登录
export function loginAPI(data: LOGINPARAMS) {
  if (+VITE_IS_MOCK) {
    // return loginMock() as HttpResponse<LOGINDATA>
  } else {
    //  as Promise<HttpResponse<LOGINDATA>>
    return post("/api/account/login", {}, data)
  }
}

// 用户列表
export function getAccountListAPI(data: ACCOUNTLISTPARAMS) {
  return post("/api/account/list", {}, data)
}

// 新建用户
export function saveAccountAPI(data: SAVEACCOUNTPARAMS) {
  return post("/api/account/create", {}, data)
}

// 编辑用户
export function editAccountAPI(data: SAVEACCOUNTPARAMS) {
  return post("/api/account/update", {}, data)
}

// 删除用户
export function deleteAccountAPI(data: DELETEPARAMS) {
  return post("/api/account/delete", {}, data)
}
// 个人信息
// export function getinfoAPI() {
//   return post("/api/admin/getinfo", {})
// }
// 登出
// export function logoutAPI() {
//   return post("/api/admin/logout", {})
// }