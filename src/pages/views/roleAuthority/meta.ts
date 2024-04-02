// 列表原始数据
export const tableMeta = [
  {
    prop: 'name',
    label: '角色名称',
    slot: false,
    width: ''
  },
  {
    prop: 'ops',
    label: '操作',
    slot: true,
    width: '300'
  }
]

// 搜索原始数据
export const searchMeta = [
  {
    label: '角色名称',
    type: 'text',
    key: 'name',
    placeholder: '请输入'
  }
]

// 弹窗表单属性
export const dialogFormOptions = {
  labelWidth: 110,
  labelPosition: 'right',
  colNum: 1
}

// 弹窗表单元数据
export const dialogMeta = [
  {
    label: '角色名称',
    type: 'text',
    key: 'name',
    placeholder: '请输入1-20位汉字/字母/数字',
    maxlength: 20,
    rules: [
      {
        required: true,
        validator: (rule: any, value: string, callback: any) => {
          if (value === '') {
            callback(new Error('请输入角色名称'))
            return
          }
          if (value.length > 20) {
            callback(new Error('角色名称最多输入20位'))
            return
          }
          if (/[^\u4e00-\u9fa50-9a-zA-Z]+/.test(value)) {
            callback(new Error('角色名称仅支持“汉字/数字/字母"格式'))
            return
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  }
]