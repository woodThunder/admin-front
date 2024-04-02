<template>
  <div class="manager-container-top mb15">
    <Search :searchMeta="searchMeta" :searchModel="searchParams">
      <el-button type="primary" @click="getDataList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </Search>
  </div>
  <div class="manager-container">
    <el-button type="primary" @click="create" class="mb20">新建角色</el-button>
    <Table
      :tableData="tableData"
      :tableMeta="tableMeta"
      :searchParams="searchParams"
      :total="total"
      @getDataList="getDataList"
    >
      <template #ops="{ scope }">
        <template  v-if="!scope.row.is_admin">
          <el-button
            link
            type="link"
            size="small"
            @click.prevent="edit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            link
            type="link"
            size="small"
            @click.prevent="deleteRole(scope.row)"
          >
            删除
          </el-button>
          <el-button
            link
            type="link"
            size="small"
            @click.prevent="permissionsConfig(scope.row)"
          >
            菜单&按钮权限配置
          </el-button>
        </template>
      </template>
    </Table>
  </div>
  <el-dialog
    v-model="dialogVisible"
    width="40%"
    draggable
    :title="title"
    @closed="cancel"
  >
    <Search
      :searchMeta="dialogMeta"
      :searchModel="dialogModel"
      :formOptions="dialogFormOptions"
      ref="dialogFormRef"
      :isShow="false"
    >
    </Search>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import Table from "@/components/table/Table.vue";
import Search from "@/components/search/index.vue";
import { ref, onMounted, reactive } from "vue";
import { tableMeta, searchMeta, dialogFormOptions, dialogMeta } from "./meta";
import { getRoleListAPI, saveRoleAPI, editRoleAPI, deleteRoleAPI } from "@/api/role";
import { ElMessageBox } from 'crane-nest'
import { useRouter } from "vue-router";
const router = useRouter();

// 分页参数
const total = ref(0);
// 列表数据
const tableData = ref([]);
// 搜索参数，可以添加查询条件
let searchParams = reactive({
  name: "",
  pageNum: 1,
  pageSize: 10,
});
const searchParamsClone = JSON.parse(JSON.stringify(searchParams));

// 初始化
onMounted(() => {
  getDataList();
});

// 获取列表数据
const getDataList = async () => {
  console.log(searchParams, "获取用户的查询参数");
  // 调用接口拿到数据
  const res = await getRoleListAPI(searchParams);
  if (res.success) {
    tableData.value = res.data.list;
    total.value = res.data.total;
  }
};

// 重置
const reset = () => {
  searchParams = Object.assign(searchParams, searchParamsClone);
  getDataList();
};

// 菜单&按钮权限配置
const permissionsConfig = (row) => {
  router.push({
    path: "/admin/permissionsConfig",
    query: { role_id: row.id, role_name: row.name },
  });
};

// 编辑

const edit = (row) => {
  const {id, account, name, email, phone} = row
  dialogModel = Object.assign(dialogModel, {
    id,
    account,
    name,
    email,
    phone
  })
  title.value = '编辑角色信息'
  dialogVisible.value = true
}

// 删除
const deleteRole = (row) => {
  ElMessageBox.confirm('确认删除角色吗?', '删除操作', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const { id } = row
      const res = await deleteRoleAPI({id})
      if (res.success) {
        getDataList()
      }
    })
    .catch(() => {})
}

// 创建用户 - 按钮
const create = () => {
  title.value = '添加角色信息'
  dialogVisible.value = true
}

// 创建用户弹窗 - 绑定数据
const dialogModelOrigin = {
  id: '',
  account: '',
  name: '',
  email: '',
  phone: ''
}
const dialogModelClone = JSON.parse(JSON.stringify(dialogModelOrigin))
let dialogModel = reactive(dialogModelOrigin)

// 创建用户弹窗 - 标题
const title = ref("")

// 弹窗是否显示
const dialogVisible = ref(false)

// 弹窗表单的ref
const dialogFormRef = ref()

// 弹窗取消
const cancel = () => {
  dialogFormRef.value.formRef.resetFields()
  dialogModel = Object.assign(dialogModel, dialogModelClone)
  dialogVisible.value = false
}

// 弹窗确认
const confirm = () => {
  dialogFormRef.value.formRef.validate(async (valid) => {
    if (valid) {
      let res = {}
      if (title.value === '添加角色信息') {
        res = await saveRoleAPI(dialogModel)
      } else if (title.value === '编辑角色信息') {
        res = await editRoleAPI(dialogModel)
      }
      if (res.success) {
        cancel()
        getDataList()
      }
    }
  })
}
</script>
<style lang="scss" scoped></style>
