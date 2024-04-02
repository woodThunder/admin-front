<template>
  <div class="manager-container">
    <Tree :treeData="treeData">
      <template #default="{ treeData }">
        <div class="pemiss-tree-content-box">
          <span class="tree-content-lable">
            {{ treeData.data.title }}
          </span>
          <div class="tree-content-btns">
            <el-checkbox :true-label="1" :false-label="0" v-model="treeData.data.isChoose" label="查看" size="large"
              @change="checkBoxChange(treeData.data)" />
            <el-checkbox :true-label="1" :false-label="0" v-for="item in treeData.data.buttons" :key="item.id"
              v-model="item.isChoose" :label="item.title" size="large" @change="checkBoxChange(item)" />
          </div>
        </div>
      </template>
    </Tree>
  </div>
</template>
<script setup>
import Tree from '@/components/tree/Tree.vue'
import { ref, onMounted, reactive } from 'vue'
import { loginMock } from '@/api/auth.mock'
import { useRoute } from 'vue-router'
const route = useRoute()

// 列表数据
const treeData = ref([])

// 根据保存列表和删除列表进行保存
const params = reactive({
  checkedList: [],
  saveMenuBids: [],
  deleteMenBids: []
})

// 初始化
onMounted(() => {
  getDataList()
})

// 获取列表数据
const getDataList = () => {
  // 获取当前角色的bid
  console.log(route.query.bid)
  // 调用接口拿到数据
  const res = loginMock()
  if (res.success) {
    treeData.value = res.data.menus
    // 递归获取已勾选列表id
    params.checkedList = treeCheckFun(treeData.value, [])
  }
}

// 递归获取已勾选列表id
const treeCheckFun = (treeData, checkedList) => {
  treeData.forEach((item) => {
    const { isChoose, id, buttons, child } = item
    // 如果是勾选的就push到checkedList中
    if (isChoose === 1) {
      checkedList.push(id)
    }

    buttons.forEach((btn) => {
      const { isChoose, id } = btn
      if (isChoose === 1) {
        checkedList.push(id)
      }
    })

    child.length > 0 && treeCheckFun(child, checkedList)
  })
  return checkedList
}

// 勾选时触发的change事件
const checkBoxChange = (data) => {
  const { isChoose, id } = data
  // 取消勾选
  if (isChoose === 0) {
    // 将选中列表中删除
    params.saveMenuBids = params.saveMenuBids.filter((item) => {
      return item !== id
    })

    // 如果本身勾选，需要删除，添加到删除列表
    params.checkedList.includes(id) &&
      params.deleteMenBids.push(id)
  } else {
    // 勾选
    // 将删除列表中删除
    params.deleteMenBids = params.deleteMenBids.filter((item) => {
      return item !== id
    })

    // 如果本身没有勾选，需要添加，添加到选中列表
    !params.checkedList.includes(id) &&
      params.saveMenuBids.push(id)
  }
}

</script>
<style lang="scss" scoped>
.manager-container {
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
  padding: 15px;

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
</style>