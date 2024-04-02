// 公共响应类型
export interface HttpResponse<T>  {
  code: string;
  message: string;
  success: boolean;
  data: T
}

// 保存 - 传参
export interface SAVEPARAMS {
  nodeList: any[];
}

// 删除
export interface DELETEPARAMS {
  id: string;
}
