<template>
  <div>
    <el-table
      :data="tableData"
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" v-if="isSelection" />
      <template v-for="item in tableMeta">
        <el-table-column v-if="item.slot" :key="item.prop" v-bind="item">
          <template #default="scope">
            <slot :name="item.prop" :scope="scope">
              {{ scope.row[item.prop]}}
            </slot>
          </template>
        </el-table-column>
        <el-table-column v-else :key="item.prop + 1" v-bind="item" />
      </template>
    </el-table>
    <div class="pagination" v-show="total">
      <el-pagination
        small
        v-model:current-page="searchParams.pageNum"
        v-model:page-size="searchParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="emit('getDataList')"
        @current-change="emit('getDataList')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { TableMeta } from './types'
defineProps({
  // 列表数据
  tableData: Array,
  // 列表元数据
  tableMeta: {
    type: Array as PropType<TableMeta[]>,
    default: () => []
  },
  // 是否显示多选
  isSelection: {
    type: Boolean,
    default: false
  },
  // 列表数据总页数
  total: {
    type: Number,
    default: 0
  },
  // 获取列表参数
  searchParams: {
    type: Object,
    default: () => ({})
  }
})
// 多选时间和获取列表事件
const emit = defineEmits(['selection', 'getDataList'])
const handleSelectionChange = (val: []) => {
  emit('selection', val)
}
</script>
<style lang="scss" scoped>
:deep(.el-table__header-wrapper tr th.el-table-fixed-column--left),
:deep(.el-table__header-wrapper tr th.el-table-fixed-column--right) {
  background-color: #f7f8fa !important;
}
:deep(.el-table__cell:first-child .cell) {
  padding-left: 20px;
}
.pagination {
  height: 70px;
  padding-right: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
