<template>
  <div class="manager-container">
    <div class="btns">
      <el-button type="primary" @click="back" class="back">返回用户管理</el-button>
    </div>
    <div class="des">
      用户<span>{{ route.query.account }}</span>的关联角色
    </div>
    <!-- <Table 
      :tableData="tableData" 
      :tableMeta="associationRoleMeta"
    >
      <template #ops="{ scope }">
        <el-button
          link
          type="link"
          size="small"
          @click.prevent="cancelRole(scope.row.roleBid)"
        >
          取消关联
        </el-button>
      </template>
    </Table> -->
  </div>
</template>
<script setup>
// import Table from '@/components/table/Table.vue'
// import { ref, onMounted } from 'vue'
// import { associationRoleMeta } from './meta'
// import { associationRoleMock } from '@/api/auth.mock'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// const tableData = ref([])

// // 返回
// const back = () => router.push('/admin/accountAuthority')

// onMounted(() => {
//   // 获取关联角色列表不需要分页，添加角色逻辑省略：已添加角色在添加角色列表不展示
//   getDataList()
// })

// // 获取关联角色列表
// const getDataList = () => {
//   const res = associationRoleMock()
//   if (res.success) {
//     tableData.value = res.data.list
//   }
// }

// // 取消关联
// const cancelRole = bid => {
//   // 调用取消关联接口后更新列表
// }

</script>
<style lang="scss" scoped>
.manager-container {
  .back {
    margin-bottom: 15px;
  }
  .des {
    font-size: 20px;
    color: #282b3e;
    margin-bottom: 15px;
    span {
      color: #ff6a00;
    }
  }
}
</style>