// 列表原始数据
export const tableMeta = [
  {
    prop: 'role_name',
    label: '角色名称',
    slot: false,
    width: ''
  },
  {
    prop: 'update_user_account',
    label: '授权人',
    slot: false,
    width: ''
  },
  {
    prop: 'update_date',
    label: '授权时间',
    slot: false
  },
  {
    prop: 'ops',
    label: '操作',
    slot: true,
    width: ''
  }
]

// 添加角色搜索元数据
export const roleSearchMeta = [
  {
    label: '角色名称',
    type: 'text',
    key: 'name',
    placeholder: '请输入角色名称'
  }
]
// 添加角色搜索配置
export const formOptions = {
  labelPosition: 'left',
  colNum: 2
}

// 添加角色列表
export const addRoleMeta = [
  {
    prop: 'name',
    label: '角色名称',
    slot: false,
    width: ''
  }
]