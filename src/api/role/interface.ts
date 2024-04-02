// 角色列表 - 传参
export interface LISTPARAMS {
  name: string;
  pageNum: number;
  pageSize: number;
}

// 创建角色 - 传参
export interface SAVEPARAMS {
  id?: string;
  name: string;
}

// 删除角色 - 传参
export interface DELETEPARAMS {
  id: string;
}
