<template>
  <div class="manager-container-top mb15">
    <Search :searchMeta="searchMeta" :searchModel="searchParams">
      <el-button type="primary" @click="getDataList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </Search>
  </div>
  <div class="manager-container">
    <el-button type="primary" @click="create" class="mb20">新建用户</el-button>
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
            @click.prevent="deleteAccount(scope.row)"
          >
            删除
          </el-button>
          <el-button
            link
            type="link"
            size="small"
            @click.prevent="associationRole(scope.row)"
          >
            关联角色
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
import { getAccountListAPI, saveAccountAPI, editAccountAPI, deleteAccountAPI } from "@/api/account";
import { ElMessageBox } from 'crane-nest'
import { useRouter } from "vue-router";
const router = useRouter();

// 分页参数
const total = ref(0);
// 列表数据
const tableData = ref([]);
// 搜索参数，可以添加查询条件
let searchParams = reactive({
  account: "",
  name: "",
  phone: "",
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
  const res = await getAccountListAPI(searchParams);
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

// 关联角色操作按钮
const associationRole = (row) => {
  router.push({
    path: "/admin/associationRole",
    query: { id: row.id, account: row.account },
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
  title.value = '编辑用户'
  dialogVisible.value = true
}

// 删除
const deleteAccount = (row) => {
  ElMessageBox.confirm('确认删除用户吗?', '删除操作', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const { id } = row
      const res = await deleteAccountAPI({id})
      if (res.success) {
        getDataList()
      }
    })
    .catch(() => {})
}

// 创建用户 - 按钮
const create = () => {
  title.value = '新用户创建'
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
      if (title.value === '新用户创建') {
        res = await saveAccountAPI(dialogModel)
      } else if (title.value === '编辑用户') {
        res = await editAccountAPI(dialogModel)
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
