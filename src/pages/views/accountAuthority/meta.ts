// 列表原始数据
export const tableMeta = [
  {
    prop: 'account',
    label: '用户名',
    slot: false,
    width: ''
  },
  {
    prop: 'name',
    label: '姓名',
    slot: false,
    width: ''
  },
  {
    prop: 'phone',
    label: '手机号',
    slot: false
  },
  {
    prop: 'email',
    label: '邮箱',
    slot: false,
    width: ''
  },
  {
    prop: 'roleStr',
    label: '角色',
    slot: true,
    width: ''
  },
  {
    prop: 'ops', // 操作列，需要插槽
    label: '操作',
    slot: true,
    width: '220'
  }
]

// 搜索原始数据
export const searchMeta = [
  {
    label: '用户名',
    type: 'text',
    key: 'account',
    placeholder: '请输入'
  },
  {
    label: '姓名',
    type: 'text',
    key: 'name',
    placeholder: '请输入'
  },
  {
    label: '手机号',
    type: 'text',
    key: 'phone',
    placeholder: '请输入'
  }
]

// 关联角色列表
export const associationRoleMeta = [
  {
    prop: 'roleName',
    label: '角色名称',
    slot: false,
    width: ''
  },
  {
    prop: 'operatorName',
    label: '授权人',
    slot: false,
    width: ''
  },
  {
    prop: 'operatorTime',
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

// 弹窗表单属性
export const dialogFormOptions = {
  labelWidth: 110,
  labelPosition: 'right',
  colNum: 1
}

// 弹窗表单元数据
export const dialogMeta = [
  {
    label: '账号',
    type: 'text',
    key: 'account',
    placeholder: '请输入3-20位汉字/字母/数字',
    maxlength: 20,
    rules: [
      {
        required: true,
        validator: (rule: any, value: string, callback: any) => {
          if (value === '') {
            callback(new Error('请输入账号'))
            return
          }
          if (value.length < 3) {
            callback(new Error('账号最少输入3位'))
            return
          }
          if (value.length > 20) {
            callback(new Error('账号最多输入20位'))
            return
          }
          if (/[^\u4e00-\u9fa50-9a-zA-Z]+/.test(value)) {
            callback(new Error('账号仅支持“汉字/数字/字母"格式'))
            return
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  },
  {
    label: '姓名',
    type: 'text',
    key: 'name',
    placeholder: '请输入2-10位汉字/字母',
    maxlength: 10,
    rules: [
      {
        required: true,
        validator: (rule: any, value: string, callback: any) => {
          if (value === '') {
            callback(new Error('请输入姓名'))
            return
          }
          if (value.length < 2) {
            callback(new Error('姓名最少输入2位'))
            return
          }
          if (value.length > 10) {
            callback(new Error('姓名最多输入10位'))
            return
          }
          if (/[^\u4e00-\u9fa5a-zA-Z]+/.test(value)) {
            callback(new Error('姓名仅支持“汉字/字母"格式'))
            return
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  },
  {
    label: '邮箱',
    type: 'text',
    key: 'email',
    placeholder: '请输入正确的邮箱',
    maxlength: 50,
    rules: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      {
        type: 'email',
        message: '请输入正确的邮箱',
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    label: '手机号',
    type: 'text',
    key: 'phone',
    placeholder: '请输入11位手机号',
    maxlength: 11,
    rules: [
      {
        required: true,
        validator: (rule: any, value: string, callback: any) => {
          if (value === '') {
            callback(new Error('请输入手机号'))
            return
          }
          if (value.length > 11) {
            callback(new Error('手机号最多输入11位'))
            return
          }
          if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号'))
            return
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  }
]