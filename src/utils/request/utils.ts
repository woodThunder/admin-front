// 获取token
export function getToken(url: string) {
  // 不需要传token的名单
  const WHITE_LIST = [
    '/api/account/login', // 登录接口
  ]

  // 获取本地token
  const token = localStorage.getItem('token')

  // 不在名单中接口使用token请求
  if (!~WHITE_LIST.indexOf(url)) {
    return token
  }

  // 在名单中不使用token请求
  return ''
}