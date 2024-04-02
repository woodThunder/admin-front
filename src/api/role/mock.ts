import { LOGINDATA, ACCOUNTDATA } from './auth.interface'
export function baseMock<T>(data: T) {
  const response = {
    code: '0',
    msg: '返回成功',
    success: true,
    data
  }
  return response
}
export function loginMock() {
  return baseMock<LOGINDATA>({
    token: "fd7c3f39ae23668164b1d291f6582a3e32dde776",
    menus: [
      {
        "id": 1,
        "parentId": -1,
        "title": "后台面板",
        "isChoose": 1,
        "menuType": 0,
        "name": null,
        "routePath": null,
        "componentPath": null,
        "isKeepAlive": null,
        "icon": "help",
        "buttons": [
        ],
        "child": [
          {
            "id": 11,
            "parentId": 1,
            "title": "主控台",
            "isChoose": 1,
            "menuType": 1,
            "name": "index",
            "routePath": '/',
            "componentPath": '/src/pages/views/index/index.vue',
            "isKeepAlive": 0,
            "leftMenu": 1,
            "icon": "home-filled",
            "buttons": [
              {
                "id": 111,
                "parentId": 11,
                "title": "查看差异",
                "isChoose": 1,
                "menuType": 2,
                "name": "diff",
              }
            ],
            "child": []
          },
        ]
      },
      {
        "id": 2,
        "parentId": -1,
        "title": "权限管理",
        "isChoose": 0,
        "menuType": 0,
        "name": null,
        "routePath": null,
        "componentPath": null,
        "isKeepAlive": null,
        "icon": "help",
        "buttons": [
        ],
        "child": [
          {
            "id": 21,
            "parentId": 2,
            "title": "用户管理",
            "isChoose": 0,
            "menuType": 1,
            "name": "accountAuthority",
            "routePath": '/admin/accountAuthority',
            "componentPath": '/src/pages/views/accountAuthority/accountAuthority.vue',
            "isKeepAlive": 0,
            "leftMenu": 1,
            "icon": "",
            "buttons": [
            ],
            "child": []
          },
          {
            "id": 22,
            "parentId": 2,
            "title": "角色管理",
            "isChoose": 0,
            "menuType": 1,
            "name": "roleAuthority",
            "routePath": '/admin/roleAuthority',
            "componentPath": '/src/pages/views/roleAuthority/roleAuthority.vue',
            "isKeepAlive": 0,
            "leftMenu": 1,
            "icon": "",
            "buttons": [
            ],
            "child": []
          },
          {
            "id": 23,
            "parentId": 2,
            "title": "菜单管理",
            "isChoose": 0,
            "menuType": 1,
            "name": "menuAuthority",
            "routePath": '/admin/menuAuthority',
            "componentPath": '/src/pages/views/menuAuthority/menuAuthority.vue',
            "isKeepAlive": 0,
            "leftMenu": 1,
            "icon": "",
            "buttons": [
            ],
            "child": []
          },
          {
            "id": 24,
            "parentId": 2,
            "title": "关联角色",
            "isChoose": 0,
            "menuType": 1,
            "name": "associationRole",
            "routePath": '/admin/associationRole',
            "componentPath": '/src/pages/views/accountAuthority/associationRole.vue',
            "isKeepAlive": 0,
            "leftMenu": 0, // 不需要展示在左侧菜单
            "icon": "",
            "buttons": [
            ],
            "child": []
          },
          {
            "id": 24,
            "parentId": 2,
            "title": "菜单&按钮权限配置",
            "isChoose": 0,
            "menuType": 1,
            "name": "permissionsConfig",
            "routePath": '/admin/permissionsConfig',
            "componentPath": '/src/pages/views/roleAuthority/permissionsConfig.vue',
            "isKeepAlive": 0,
            "leftMenu": 0, // 不需要展示在左侧菜单
            "icon": "",
            "buttons": [
            ],
            "child": []
          },
        ]
      }
    ],
    userInfo: {
      username: 'admin',
      avatar: 'http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62af03d1b2aeb.jpg'
    }
  })
}

export function accountMock() {
  return baseMock<ACCOUNTDATA>({
    total: 1,
    list: [
      {
        "accountBid": "ACC170002751993513366",
        "remarkName": "木雷双雄",
        "accountName": "mulei",
        "accountMobile": "15711026798",
        "accountEmail": "123@feihe.com",
        "roleStr": "前端专用2,前端",
        "createDate": "2023-11-15 13:52:00",
        "updateDate": "2024-01-31 13:54:38",
      }
    ]
  })
}

export function associationRoleMock() {
  return baseMock<ACCOUNTDATA>({
    total: 2,
    list: [
      {
        "id": 24,
        "accountBid": "ACC170002751993513366",
        "roleBid": "ROL169813456056712897",
        "roleName": "前端专用2",
        "roleCode": "MANAGE23102400021",
        "operatorName": "mulei",
        "operatorTime": "2024-01-16 15:41:57"
      },
      {
        "id": 26,
        "accountBid": "ACC170002751993513366",
        "roleBid": "ROL170002760923212980",
        "roleName": "前端",
        "roleCode": "MANAGE23111500028",
        "operatorName": "mulei",
        "operatorTime": "2024-01-31 13:54:38"
      }
    ]
  })
}


export function roleMock() {
  return baseMock<ACCOUNTDATA>({
    total: 2,
    list: [
      {
        "id": 21,
        "bid": "ROL169813456056712897",
        "roleCode": "MANAGE23102400021",
        "roleName": "前端专用2",
        "roleType": 0,
        "systemCode": "MANAGE",
        "baseState": 1,
        "version": 15,
        "deleted": 0,
        "createDate": "2023-10-24 16:02:41",
        "createUserBid": "ADMIN0001",
        "createUserCode": "ADMIN000000001",
        "createUserName": "admin",
        "updateDate": "2024-01-25 16:18:10",
        "updateUserBid": "ADMIN0001",
        "updateUserCode": "ADMIN000000001",
        "updateUserName": "admin"
      },
      {
        "id": 28,
        "bid": "ROL170002760923212980",
        "roleCode": "MANAGE23111500028",
        "roleName": "前端",
        "roleType": 0,
        "systemCode": "MANAGE",
        "baseState": 1,
        "version": 2,
        "deleted": 0,
        "createDate": "2023-11-15 13:53:29",
        "createUserBid": "ADMIN0002",
        "createUserCode": "ADMIN000000002",
        "createUserName": "admin2",
        "updateDate": "2023-11-16 01:06:49",
        "updateUserBid": null,
        "updateUserCode": null,
        "updateUserName": null
      }
    ]
  })
}

