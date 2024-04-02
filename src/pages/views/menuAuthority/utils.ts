// 更新返回数据 - 把按钮列表放入子路由列表
export const updateList = (menus: any) => {
  return menus.map((item: any) => {
    if (item.children && item.children.length) {
      updateList(item.children)
    }
    if (item.buttons && item.buttons.length) {
      item.children = item.children.concat(item.buttons)
    }
    return item
  })
}

// 删除当前及以下所有节点
export const getDeleteIds = (data: any, newArr:any = []) => {
  data.forEach((item: any) => {
    newArr.push(item.id)
    if (item.children && item.children.length > 0) {
      getDeleteIds(item.children, newArr)
    }
  })
  return newArr
}