<template>
  <el-dialog
    class="my-dialog"
    v-model="myDialogState.dialogVisible"
    title="编辑"
    :close-on-click-modal="false"
    :width="600"
    @closed="$emit('cancelBtn')"
  >
    <el-form
      ref="dialogFormRef"
      style="max-width: 600px"
      :model="myDialogState.menuObj"
      label-width="auto"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="myDialogState.menuObj.type">
          <template
            v-if="
              ['addOneMenu', 'addChildMenu'].includes(myDialogState.dialogType)
            "
          >
            <el-radio :label="1" size="large">分类菜单</el-radio>
            <el-radio :label="2" size="large">页面菜单</el-radio>
          </template>
          <template v-if="['configMenu'].includes(myDialogState.dialogType)">
            <el-radio
              :label="1"
              size="large"
              v-if="myDialogState.menuObj.type === 1"
              >分类菜单</el-radio
            >
            <el-radio
              :label="2"
              size="large"
              v-else-if="myDialogState.menuObj.type === 2"
              >页面菜单</el-radio
            >
            <el-radio
              :label="3"
              size="large"
              v-else-if="myDialogState.menuObj.type === 3"
              >按钮</el-radio
            >
          </template>
          <template
            v-if="['addButtonEvent'].includes(myDialogState.dialogType)"
          >
            <el-radio :label="3" size="large">按钮</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="分类名称"
        prop="title"
        :rules="[
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]"
        v-if="myDialogState.menuObj.type === 1"
      >
        <el-input
          v-model="myDialogState.menuObj.title"
          placeholder="请输入分类名称"
        />
      </el-form-item>
      <el-form-item
        label="页面名称"
        prop="title"
        :rules="[
          { required: true, message: '请输入页面名称', trigger: 'blur' }
        ]"
        v-if="myDialogState.menuObj.type === 2"
      >
        <el-input
          v-model="myDialogState.menuObj.title"
          placeholder="请输入页面名称"
        />
      </el-form-item>
      <el-form-item
        label="按钮名称"
        prop="title"
        :rules="[
          { required: true, message: '请输入按钮名称', trigger: 'blur' }
        ]"
        v-if="myDialogState.menuObj.type === 3"
      >
        <el-input
          v-model="myDialogState.menuObj.title"
          placeholder="请输入按钮名称"
        />
      </el-form-item>
      <el-form-item
        label="路由name"
        prop="name"
        :rules="[
          { required: true, message: '请输入路由name', trigger: 'blur' }
        ]"
        v-if="myDialogState.menuObj.type === 2"
      >
        <el-input
          v-model="myDialogState.menuObj.name"
          placeholder="请输入分类名称"
        />
      </el-form-item>
      <el-form-item
        label="页面路径"
        prop="route_path"
        :rules="[
          { required: true, message: '请输入页面路径', trigger: 'blur' }
        ]"
        v-if="myDialogState.menuObj.type === 2"
      >
        <el-input
          v-model="myDialogState.menuObj.route_path"
          placeholder="请输入页面路径"
        />
      </el-form-item>
      <el-form-item
        label="按钮标识"
        prop="route_path"
        :rules="[
          { required: true, message: '请输入按钮标识', trigger: 'blur' }
        ]"
        v-if="myDialogState.menuObj.type === 3"
      >
        <el-input
          v-model="myDialogState.menuObj.route_path"
          placeholder="请输入按钮标识"
        />
      </el-form-item>
      <el-form-item
        label="组件路径"
        prop="component_path"
        :rules="[
          { required: true, message: '请输入组件路径', trigger: 'blur' }
        ]"
        v-if="myDialogState.menuObj.type === 2"
      >
        <el-input
          v-model="myDialogState.menuObj.component_path"
          placeholder="请输入组件路径"
        />
      </el-form-item>
      <el-form-item
        label="组件缓存"
        prop="is_keepalive"
        v-if="myDialogState.menuObj.type === 2"
      >
        <el-switch
          v-model="myDialogState.menuObj.is_keepalive"
        />
      </el-form-item>
      <el-form-item
        label="左侧菜单"
        prop="is_left_menu"
        v-if="myDialogState.menuObj.type === 2"
      >
        <el-switch
          v-model="myDialogState.menuObj.is_left_menu"
        />
      </el-form-item>
      <el-form-item
        label="icon图标"
        prop="icon"
        v-if="myDialogState.menuObj.type !== 3"
      >
        <el-input
          v-model="myDialogState.menuObj.icon"
          placeholder="请输入icon图标编码"
        />
      </el-form-item>
      <el-form-item
        label="排序"
        prop="sort"
        :rules="[{ type: 'number', message: '排序值必须是整数' }]"
        v-if="myDialogState.menuObj.menuType !== 3"
      >
        <el-input
          v-model.number="myDialogState.menuObj.sort"
          placeholder="请输入排序值"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, PropType } from 'vue';
// import { Search } from '@element-plus/icons-vue'
const $props = defineProps({
  myDialogState: {
    type: Object as PropType<any>
  }
})

const myDialogState = computed(() => $props.myDialogState)

const dialogFormRef = ref(null)
defineExpose({
  dialogFormRef
})
// debugger
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label-wrap) {
  align-items: center;
}
</style>
