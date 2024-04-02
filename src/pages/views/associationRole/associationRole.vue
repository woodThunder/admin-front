<template>
  <div class="manager-container">
    <div class="btns">
      <el-button type="primary" @click="addRole" class="add"
        >添加角色</el-button
      >
      <el-button @click="back" class="add">返回用户管理</el-button>
    </div>
    <div class="des">
      用户<span>{{ route.query.account }}</span
      >的关联角色
    </div>
    <Table
      :tableData="tableData"
      :tableMeta="tableMeta"
      :searchParams="searchModel"
      :total="total"
      @getDataList="getDataList"
    >
      <template #ops="{ scope }">
        <el-button
          link
          type="link"
          size="small"
          @click.prevent="cancelRole(scope.row.id)"
        >
          取消关联
        </el-button>
      </template>
    </Table>
    <el-dialog
      v-model="addRoleVisible"
      width="40%"
      draggable
      title="添加角色"
      @closed="cancel"
    >
      <Search
        :searchMeta="roleSearchMeta"
        :searchModel="roleSearchModel"
        :formOptions="formOptions"
        ref="dialogFormRef"
      >
        <el-button type="primary" @click="addRole">查询</el-button>
      </Search>
      <Table
        class="table"
        :tableData="addRoleData"
        :tableMeta="addRoleMeta"
        :total="addRoleTotal"
        :isSelection="true"
        @selection="selection"
        @getDataList="addRole"
      >
      </Table>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { tableMeta, roleSearchMeta, formOptions, addRoleMeta } from './meta'
import { getListAPI, deleteAPI, getRoleListApi, addRolesAPI } from '@/api/associationRole'
import { useRoute, useRouter } from 'vue-router'
import Table from "@/components/table/Table.vue"
import Search from "@/components/search/index.vue"
import { ElMessageBox, ElMessage } from 'crane-nest'
const route = useRoute()
const router = useRouter()

// 搜索参数
const searchModelOrigin = {
  account_id: route.query.id, // 用户ID
  pageNum: 1,
  pageSize: 10
}
let searchModel = reactive(searchModelOrigin)
// 分页参数
const total = ref(0)
// 列表数据
const tableData = ref([])

// 初始化
onMounted(() => {
  getDataList()
})

// 获取列表数据
const getDataList = () => {
  getListAPI(searchModel).then(res => {
    tableData.value = res.data.list || []
    total.value = res.data.total
  })
}

// 返回
const back = () => router.push('/admin/accountAuthority')

// 取消关联
const cancelRole = (id) => {
  ElMessageBox.confirm('请确认是否要取消当前角色的关联关系？"取消后"当前用户将无法使用该角色对应的权限。', '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: ''
  })
    .then(() => {
      deleteAPI({
        id
      }).then((res) => {
        if (res.success) {
          getDataList()
        }
      })
    })
    .catch(() => {})
}

// 添加角色列表数据
const addRoleData = ref([])
// 添加角色列表总条数
const addRoleTotal = ref(0)
const roleSearchModelOrigin = {
  "account_id": route.query.id,
  "pageNum": 1,
  "pageSize": 10,
  "name": ""
}
const roleSearchModelClone = JSON.parse(JSON.stringify(roleSearchModelOrigin))
let roleSearchModel = reactive(roleSearchModelOrigin)


// 添加角色
const addRole = () => {
  getRoleListApi(roleSearchModel).then(res => {
    if (res.success) {
      addRoleData.value = res.data.list
      addRoleTotal.value = res.data.total
      addRoleVisible.value = true
    }
  })
}

// 添加角色弹窗
const addRoleVisible = ref(false)
// 搜索form的ref
const dialogFormRef = ref()
// // 弹窗取消
const cancel = () => {
  // dialogFormRef.value.formRef.resetFields()
  addRoleVisible.value = false
  // 重置数据
  roleSearchModel = Object.assign(roleSearchModel, roleSearchModelClone)
}
// 弹窗确认
const confirm = () => {
  if (roleIdList.value.length) {
    addRolesAPI({
      "account_id": route.query.id,
      "roleIdList": roleIdList.value,
    }).then((res) => {
      if (res.success) {
        addRoleVisible.value = false
        getDataList()
      }
    })
  } else {
    ElMessage({
      message: '请先选择角色',
      type: 'warning',
    })
  }
}
// 添加角色的多选数据
const roleIdList = ref([])
const selection = (val) => {
  roleIdList.value = val.map((item) => item.id)
}


</script>
<style lang="scss" scoped>
.btns {
  margin-bottom: 10px;
}
.des {
  height: 60px;
  background: #f6f8fb;
  line-height: 60px;
  padding: 0 14px;
  font-size: 20px;
  color: #282b3e;
  line-height: 60px;
  span {
    color: #ff6a00;
  }
}

:deep(.search-btns-one) {
  align-items: flex-start;
}
</style>
