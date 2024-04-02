<template>
  <div class="manager">
    <div class="manager-content">
      <div class="header-title"><span>【{{ $route.query.role_name }}】</span>菜单&按钮权限配置</div>
      <div class="table-title">
        <p>菜单名称</p>
        <p>功能</p>
      </div>
      <div class="permis-tree-box">
        <Tree :treeData="permissState.treeData">
          <template #default="{ treeData }">
            <div class="pemiss-tree-content-box">
              <span class="tree-content-lable">
                {{ treeData.data.title }}
              </span>
              <div class="tree-content-btns">
                <el-checkbox
                  :true-label="1"
                  :false-label="0"
                  v-model="treeData.data.isChoose"
                  label="查看"
                  size="large"
                  @change="checkBoxChange(treeData.data)"
                />
                <el-checkbox
                  :true-label="1"
                  :false-label="0"
                  v-for="(item, index) in treeData.data.buttons"
                  :key="index"
                  v-model="item.isChoose"
                  :label="item.title"
                  size="large"
                  @change="checkBoxChange(item)"
                />
              </div>
            </div>
          </template>
        </Tree>
      </div>
    </div>

    <footer class="my-footer-box">
      <el-button type="warning" @click="submitBtn">立即生效</el-button>
      <el-button @click="cancelBtn">取消</el-button>
    </footer>
  </div>
</template>

<script setup>
import { getListAPI, saveAPI } from '@/api/permissionsConfig'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import Tree from '@/components/tree/Tree.vue'
import { ElMessageBox, ElMessage } from 'crane-nest'
const $route = useRoute()
const $router = useRouter()

onMounted(() => {
  getListData()
})

const permissState = reactive({
  treeData: [],
  unCheckedList: [], // 未勾选
  checkedList: [] // 已勾选
})

const configureMenuState = reactive({
  role_id: $route.query.role_id,
  saveMenuBids: [],
  deleteMenBids: []
})

const getListData = () => {
  const { role_id } = $route.query
  getListAPI({ role_id }).then(res => {
    const { success, data } = res
    if (success) {
      permissState.treeData = data

      // 调用方法存储所有的已勾选和未勾选
      const { checkedList, unCheckedList } = treeCheckFun(
        permissState.treeData,
        [],
        []
      )
      permissState.checkedList = checkedList
      permissState.unCheckedList = unCheckedList
    }
  })
}

// 保存初始时已勾选的，和未勾选
const treeCheckFun = (treeData, checkedList, unCheckedList) => {
  treeData.forEach((item) => {
    const { isChoose, id, buttons, children } = item
    // 如果是勾选的就push到checkedList中，否则push到unCheckedList
    isChoose === 1 ? checkedList.push(id) : unCheckedList.push(id)

    buttons.forEach((btn) => {
      const { isChoose, id } = btn
      isChoose === 1 ? checkedList.push(id) : unCheckedList.push(id)
    })

    children?.length > 0 && treeCheckFun(children, checkedList, unCheckedList)
  })
  return {
    checkedList,
    unCheckedList
  }
}

// 勾选时触发的change事件
const checkBoxChange = (data) => {
  const { isChoose, id } = data
  // 如果取消勾选
  if (isChoose === 0) {
    // 将添加中的删除掉
    configureMenuState.saveMenuBids.forEach((item, index) => {
      item === id && configureMenuState.saveMenuBids.splice(index)
    })

    // 如果本身就没勾选，那就不push
    !permissState.unCheckedList.includes(id) &&
      configureMenuState.deleteMenBids.push(id)
  } else {
    // 将删除中的删除掉
    configureMenuState.deleteMenBids.forEach((item, index) => {
      item === id && configureMenuState.deleteMenBids.splice(index)
    })

    // 如果本身就已勾选，那就不push
    !permissState.checkedList.includes(id) &&
      configureMenuState.saveMenuBids.push(id)
  }
}

const submitBtn = () => {
  const { saveMenuBids, deleteMenBids } = configureMenuState
  if (saveMenuBids.length === 0 && deleteMenBids.length === 0) {
    ElMessage.warning('请配置完再点击生效')
    return
  }
  ElMessageBox.confirm('是否应用修改？', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning',
    dangerouslyUseHTMLString: true,
    closeOnClickModal: false,
    customClass: 'my-custom-message-box'
  })
    .then(() => {
      saveAPI(configureMenuState).then(res => {
        if (res.success) {
          getListData()
          cancelBtn()
        }
      })
    })
    .catch(() => {
      console.log('取消')
    })
}

const cancelBtn = () => {
  $router.push({
    path: '/admin/roleAuthority'
  })
}
</script>

<style scoped lang="scss">
.manager {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.manager-content {
  flex: 1;
  overflow: auto;
  background-color: #fff;
  .header-title {
    height: 60px;
    background: #f6f8fb;
    font-size: 20px;
    font-weight: 700;
    padding: 16px 14px;
    box-sizing: border-box;
    & > span {
      color: #ff6a00;
    }
  }
  .table-title {
    height: 40px;
    background: #ebedf0;
    color: #000;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 20px;
    & > p {
      width: 37%;
      font-size: 12px;
      font-weight: 700;
      color: #262626;
      line-height: 16px;
      margin-right: 110px;
    }
  }
  .permis-tree-box {
    margin-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .my-tree-box {
      width: 100%;
      .pemiss-tree-content-box {
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
          width: 700px;
          box-sizing: border-box;
        }
      }
    }
  }
}
.my-footer-box {
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: center;
  background: white;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  border-top: 1px solid #e6e7eb;
  z-index: 10;
  align-items: center;
}
</style>

<style lang="scss">
// 修改弹窗的样式
.el-overlay .my-custom-message-box {
  width: 400px;
  max-width: 400px;
  .el-message-box__content {
    padding: 20px;
    .el-message-box__message {
      font-size: 16px;
      .my-name-text {
        color: #ff6a00;
      }
    }
  }
}
</style>
