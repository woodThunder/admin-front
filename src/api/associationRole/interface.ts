// 角色列表 - 传参
export interface LISTPARAMS {
  account_id: string;
  name?: string;
  pageNum: number;
  pageSize: number;
}

// 取消关联 - 传参
export interface DELETEPARAMS {
  id: string;
}

// 确认关联 - 传参
export interface ASSOCIATIONPARAMS{
  account_id: string;
  roleIDList: string[];
}
