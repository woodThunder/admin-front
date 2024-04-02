<template>
  <div class="my-tree-box">
    <el-tree
      :data="treeData"
      :expand-on-click-node="false"
      default-expand-all
      :props="{
        children: 'children'
      }"
    >
      <template #default="{ node, data }">
        <slot :treeData="{ node, data }"></slot>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
defineProps({
  treeData: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.my-tree-box {
  ::v-deep(.el-tree) {
    color: #595959;
    background: transparent;
    padding: 0 15px 0 6px;
    box-sizing: border-box;
    /* 树形结构节点添加连线 */
    .el-tree-node {
      position: relative;
      padding-left: 14px;

      .el-tree-node__content {
        height: 40px;
        padding-left: 0 !important;

        .el-tree-node__expand-icon {
          background: url(@/assets/treeicon/expand.svg) no-repeat;
          display: inline-block;
          width: 18px;
          height: 16px;
          padding: 0;
          &.expanded {
            transform: none;
            background: url(@/assets/treeicon/retract.svg) no-repeat;
          }

          &::before {
            content: '';
          }

          &.is-leaf {
            display: none;
          }
          svg {
            display: none;
          }
        }

        .el-tree-node__label {
          margin-left: 10px;
        }
      }

      &:last-child:before {
        height: 50px;
      }

      &:before {
        content: '';
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
        border-left: 1px solid #b1b5bd;
        bottom: 0px;
        height: 100%;
        top: -30px;
        width: 1px;
      }

      &:after {
        content: '';
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
        border-top: 1px solid #b1b5bd;
        height: 20px;
        top: 20px;
        width: 18px;
      }
    }

    & > .el-tree-node {
      & > .el-tree-node__content {
        .el-tree-node__expand-icon {
          background-image: url(@/assets/treeicon/expand.svg) no-repeat;
        }
      }

      &::after {
        border: 0px solid;
      }
      &::before {
        border: 0px solid;
      }
    }

    .el-tree-node__children {
      padding-left: 12px;
    }
  }
}
</style>
