<template>
  <el-form
    :inline="false"
    :model="searchModel"
    :label-position="formOptions.labelPosition"
    :label-width="formOptions.labelWidth"
    class="search"
    ref="formRef"
  >
    <el-row
      :gutter="20"
      v-for="(row, rowIndex) in (searchArr as SearchMeta[][])"
      :key="rowIndex"
    >
      <el-col
        :span="24 / formOptions.colNum"
        v-for="(col, colIndex) in row"
        :key="colIndex"
      >
        <el-form-item
          :label="col.label"
          :rules="col.rules"
          :prop="col.key"
          :class="formOptions.labelPosition === 'top' ? 'search-item' : ''"
        >
          <template v-if="col.type === 'select'">
            <el-select
              v-model="searchModelCom[col.key]"
              :disabled="col.disabled"
              @change="col.onChange"
              :multiple="col.multiple || false"
              :filterable="col.filterable || false"
              clearable
            >
              <el-option
                v-for="item in col.options"
                :label="col.optionsKey ? item[col.optionsKey.label] : item"
                :value="col.optionsKey ? item[col.optionsKey.value] : item"
                :key="col.optionsKey ? item[col.optionsKey.value] : item"
              />
            </el-select>
          </template>
          <template v-if="col.type === 'daterange'">
            <el-date-picker
              v-model="searchModelCom[col.key]"
              :disabled="col.disabled"
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </template>
          <template v-if="col.type === 'text'">
            <el-input
              v-model="searchModelCom[col.key]"
              type="text"
              :disabled="col.disabled"
              :placeholder="col.placeholder"
              :maxlength="col.maxlength"
              clearable
            />
          </template>
          <template v-if="col.type === 'textarea'">
            <el-input
              v-model="searchModelCom[col.key]"
              type="textarea"
              :disabled="col.disabled"
              clearable
            />
          </template>
          <template v-if="col.type === 'date'">
            <el-date-picker
              v-model="searchModelCom[col.key]"
              type="date"
              placeholder="请选择日期"
              value-format="YYYY-MM-DD"
            />
          </template>
          <template v-if="col.type === 'year'">
            <el-date-picker
              v-model="searchModelCom[col.key]"
              type="year"
              placeholder="请选择日期"
              value-format="YY年"
            />
          </template>
          <template v-if="col.type === 'radio'">
            <el-radio-group v-model="searchModelCom[col.key]">
              <el-radio
                v-for="item in col.options"
                :label="item.value"
                :key="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </template>
          <!-- <template v-if="col.type === 'cascader'">
            <el-cascader
              v-model="searchModelCom[col.key]"
              :options="col.options"
              :props="col.props"
              :show-all-levels="col.showAllLevels"
              :popper-class="col.isHideFirstLine ? 'cascaderParent' : ''"
              @visible-change="handelCascader(col.isCascaderChecked)"
              @expand-change="handelCascader(col.isCascaderChecked)"
              clearable
              filterable
            />
          </template> -->
        </el-form-item>
      </el-col>
      <el-col
        v-if="isShow && searchCollapse.length < formOptions.colNum && !isWrap"
        :span="
          (24 / formOptions.colNum) *
          (formOptions.colNum - (searchCollapse.length % formOptions.colNum))
        "
      >
        <div class="search-btns-one">
          <slot></slot>
          <el-button v-if="isCollapseBtnShow" @click="collapseHandle">
            {{ isCollapse ? '收起' : '展开' }}
          </el-button>
        </div>
      </el-col>
      <el-col
        v-if="
          isShow &&
          searchCollapse.length >= formOptions.colNum &&
          searchArr[rowIndex].length < formOptions.colNum &&
          !isWrap
        "
        :span="
          (24 / formOptions.colNum) *
          (formOptions.colNum - (searchCollapse.length % formOptions.colNum))
        "
      >
        <div class="search-btns-two">
          <slot></slot>
          <el-button v-if="isCollapseBtnShow" @click="collapseHandle">
            {{ isCollapse ? '收起' : '展开' }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
  <div
    class="search-btns"
    v-if="
      isShow &&
      ((searchMeta.length >= formOptions.colNum &&
        searchCollapse.length % formOptions.colNum === 0) ||
        isWrap)
    "
  >
    <slot></slot>
    <el-button v-if="isCollapseBtnShow" @click="collapseHandle">
      {{ isCollapse ? '收起' : '展开' }}
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { SearchMeta, SearchModel } from './types'
// import { handelCascader } from '@/utils/handelFormItem'

const props = defineProps({
  searchMeta: {
    type: Array as PropType<SearchMeta[]>,
    default: () => []
  },
  searchModel: Object as PropType<SearchModel>,
  formOptions: {
    type: Object,
    default: () => ({
      labelPosition: 'top',
      colNum: 4
    })
  },
  // 按钮是否直接换行
  isWrap: {
    type: Boolean,
    default: false
  },
  // 是否显示按钮组
  isShow: {
    type: Boolean,
    default: true
  }
})

// 通过计算属性 - 显示数据的条数
const searchCollapse = computed(() => {
  if (!props.isShow) {
    return props.searchMeta
  }
  if (isCollapse.value) {
    // 展开状态显示所有数据
    return props.searchMeta
  } else {
    // 收起状态
    if (props.isWrap) {
      // 按钮隔行展示，显示3行
      return props.searchMeta.slice(0, props.formOptions.colNum * 3)
    }
    // 按钮行内展示，显示3行-1
    return props.searchMeta.slice(0, props.formOptions.colNum * 3 - 1)
  }
})

// 通过计算属性 - 收起展开按钮是否显示
const isCollapseBtnShow = computed(() => {
  if (props.isWrap) {
    return props.searchMeta.length > props.formOptions.colNum * 3
  }
  return props.searchMeta.length > props.formOptions.colNum * 3 - 1
})

// 通过计算属性 - 对数据进行分组 二维数组
const searchArr = computed(() => {
  const colNum = props.formOptions.colNum
  const arr = []
  for (let i = 0; i < searchCollapse.value.length; i += colNum) {
    arr.push(searchCollapse.value.slice(i, i + colNum))
  }
  return arr
})

// 通过计算属性 - 更改父组件传过来的值（不能直接绑定props）
const searchModelCom = computed<any>(() => {
  return props.searchModel
})

// false: 收起状态，文字显示展开
// true: 展开状态，文字显示收起
const isCollapse = ref(false)

// 点击展开收起按钮 - 切换状态
const collapseHandle = () => {
  isCollapse.value = !isCollapse.value
}

// 表单实例
const formRef = ref()
defineExpose({
  formRef
})
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
:deep(.el-cascader) {
  width: 100%;
}
:deep(.el-form-item__label) {
  margin-bottom: 4px !important;
}
.search-btns {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
.search-btns-one {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 58px;
}
.search-btns-two {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 58px;
}
:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
  width: 100%;
}
.search-item {
  margin-bottom: 10px;
}
:deep(.el-form-item__label) {
  font-weight: 700;
}
</style>
