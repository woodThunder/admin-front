// 公共响应类型
export interface HttpResponse<T>  {
  code: string;
  message: string;
  success: boolean;
  data: T
}
// 登录 - 登录返回值
export interface LOGINDATA {
  token: string;
  menus: any[];
  user: any
}
// 登录 - 传参
export interface LOGINPARAMS {
  account: string;
  password: string;
}

// 用户列表 - 传参
export interface ACCOUNTLISTPARAMS {
  account: string;
  name: string;
  phone: string;
  pageNum: number;
  pageSize: number;
}

// 创建用户 - 传参
export interface SAVEACCOUNTPARAMS {
  id?: string;
  account: string;
  name: string;
  phone: string;
  email: string;
}

// 删除用户 - 传参
export interface DELETEPARAMS {
  id: string;
}

export interface ACCOUNTDATA {
  total: number;
  list: any[]
}