<template>
  <el-result
    icon="warning"
    title="404"
    sub-title="页面走丢了，请返回首页！"
  >
    <template #extra>
      <el-button type="primary" @click.prevent="$router.push('/')">返回首页</el-button>
    </template>
  </el-result>
</template>
<style lang="scss">
.el-result {
  margin: auto;
}
</style>