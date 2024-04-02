<template>
  <div class="manager-container">
    <div class="add-btns">
      <el-button type="primary" @click="addMenuBtn">添加一级菜单</el-button>
    </div>
    <div class="table-title">
      <span>菜单名称</span>
      <span>操作</span>
    </div>
    <Tree :treeData="myTreeState.treeData">
      <template #default="{ treeData }">
        <div class="tree-content-box">
          <span class="tree-content-lable">
            {{ treeData.data.title }}
          </span>
          <div class="tree-content-btns">
            <span class="btn" @click="configBtn(treeData)">配置</span>
            <span
              class="btn"
              v-if="treeData.node.level < 3 && treeData.data.type === 1"
              @click="addBtn(treeData)"
              >添加子菜单</span
            >
            <span
              class="btn"
              v-if="treeData.node.level < 4 && treeData.data.type === 2"
              @click="addButton(treeData)"
              >添加按钮</span
            >
            <span class="btn" @click="delBtn(treeData)">删除</span>
          </div>
        </div>
      </template>
    </Tree>
    <!-- 弹窗 -->
    <myDialog
      :myDialogState="myDialogState"
      ref="dialogRef"
      @cancelBtn="cancelBtn"
    >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelBtn">取消</el-button>
          <el-button @click="confirmBtn" type="primary"> 确定 </el-button>
        </span>
      </template>
    </myDialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox } from 'crane-nest'
import Tree from '@/components/tree/Tree.vue'
import myDialog from './components/myDialog.vue'
import { updateList, getDeleteIds } from './utils'
import {
  getListAPI,
  createAPI,
  deleteAPI,
  updateAPI
} from '@/api/menu'

// 获取菜单列表数据
const getListData = () => {
  getListAPI().then(res => {
    const { success, data } = res
    if (success) {
      myTreeState.treeData = updateList(data)
    }
  })
}

onMounted(() => {
  getListData()
})

// 类目树的相关数据
const myTreeState = reactive({
  treeData: [],
  deleteList: [],
  sortNum: 10, // 全局的排序，后台需要的sort= (menuLevel + 1) * sotrNum
  treeNodeObj: {} // 当前点击的节点对象
})

// 弹窗的相关数据
const myDialogState = ref({
  dialogVisible: false, // 弹窗显示隐藏
  dialogType: 'addOneMenu', // 当前哪个弹窗 addOneMenu | configMenu | addChildMenu | addButton
  menuObj: {
    icon: '', // icon图标
    component_path: '', // 组件路径
    route_path: '', // 路由路径
    is_keepalive: false, // 是否组件缓存
    is_left_menu: true, // 是否左侧菜单
    sort: 10, // 排序
    type: 1, // 菜单类型，分类菜单：1，页面菜单：2，按钮：3
    title: '', // 菜单名称
    name: ''
  } // 存储当前的对象
})
const myDialogStateOrigin = JSON.parse(JSON.stringify(myDialogState.value))

// 添加一级菜单事件
const addMenuBtn = () => {
  myDialogState.value.dialogVisible = true
  myDialogState.value.dialogType = 'addOneMenu'
}

// 列表按钮 -- 分类菜单 -- 添加子菜单按钮
const addBtn = ({ node, data }) => {
  myTreeState.treeNodeObj = data
  myDialogState.value.dialogType = 'addChildMenu'
  myDialogState.value.dialogVisible = true
}

// 列表按钮 -- 页面菜单 -- 添加按钮
const addButton = ({ node, data }) => {
  myTreeState.treeNodeObj = data
  myDialogState.value.dialogType = 'addButtonEvent'
  myDialogState.value.menuObj.type = 3
  myDialogState.value.dialogVisible = true
}

// 配置按钮
const configBtn = ({ node, data }) => {
  myTreeState.treeNodeObj = data
  const {
    icon,
    component_path,
    route_path,
    name,
    is_left_menu,
    is_keepalive,
    type,
    sort,
    title
  } = data
  myDialogState.value.menuObj = {
    icon,
    component_path,
    route_path,
    name,
    is_left_menu,
    is_keepalive,
    type,
    sort,
    title
  }
  myDialogState.value.dialogType = 'configMenu'
  myDialogState.value.dialogVisible = true
}

// 删除按钮
const delBtn = ({ node, data }) => {
  ElMessageBox.confirm('确认删除吗?', '删除操作', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 批量删除
      const ids = getDeleteIds([data])
      console.log(ids, 'ids')
      deleteAPI({ids}).then(res => {
        if (res.success) {
          getListData()
        }
      })
    })
    .catch((err) => {
    })
}

// 弹窗相关操作
const dialogRef = ref()

// 弹窗确定按钮
const confirmBtn = () => {
  dialogRef.value.dialogFormRef.validate((valid) => {
    if (valid) {
      const { dialogType } = myDialogState.value
      // 存储三个函数
      let confirmBtnObj = {
        addOneMenu,
        configMenu,
        addChildMenu,
        addButtonEvent
      }
      // 通过dialogType调用
      confirmBtnObj[dialogType]()
    }
  })
}

// 弹窗取消按钮
const cancelBtn = () => {
  dialogRef.value.dialogFormRef.resetFields()
  myDialogState.value = JSON.parse(JSON.stringify(myDialogStateOrigin))
  myDialogState.value.dialogVisible = false
}

// 添加一级菜单函数
const addOneMenu = () => {
  const { menuObj } = myDialogState.value

  // 创建一级菜单对象
  const oneMenu = {
    level: 0,
    parent_id: 'root',
    ...menuObj
  }
  createAPI(oneMenu).then(res => {
    if (res.success) {
      getListData()
      cancelBtn()
    }
  })
}
// 配置菜单函数
const configMenu = () => {
  const { menuObj } = myDialogState.value
  const oneMenu = {
    ...myTreeState.treeNodeObj,
    ...menuObj
  }
  updateAPI(oneMenu).then(res => {
    if (res.success) {
      getListData()
      cancelBtn()
    }
  })
}

// 添加子级菜单函数
const addChildMenu = () => {
  const { menuObj } = myDialogState.value

  const { level, id } = myTreeState.treeNodeObj

  // 创建子级菜单对象
  const oneMenu = {
    level: level + 1,
    parent_id: id,
    ...menuObj
  }
  createAPI(oneMenu).then(res => {
    if (res.success) {
      getListData()
      cancelBtn()
    }
  })
}

// 添加按钮确认
const addButtonEvent = () => {
  const { menuObj } = myDialogState.value
  const { level, id } = myTreeState.treeNodeObj
  // 创建子级菜单对象
  const oneMenu = {
    level: level + 1,
    parent_id: id,
    ...menuObj
  }
  createAPI(oneMenu).then(res => {
    if (res.success) {
      getListData()
      cancelBtn()
    }
  })
}

</script>

<style lang="scss" scoped>
.manager-container {
  .table-title {
    height: 40px;
    background: #ebedf0;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    span {
      font-size: 12px;
      font-weight: 700;
      color: #262626;
      line-height: 16px;
      margin-right: 110px;
    }
  }
  .add-btns {
    margin-bottom: 10px;
  }
  .tree-content-box {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e9ec;
    .tree-content-lable {
      margin-left: 5px;
      font-size: 12px;
    }
    .tree-content-btns {
      height: 40px;
      display: flex;
      align-items: center;
      width: 675px;
      box-sizing: border-box;
      padding-left: 540px;
      .btn {
        display: inline-block;
        color: #034cfa;
        margin-right: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
