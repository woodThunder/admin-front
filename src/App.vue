<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
// 汉化组件库
import zhCn from 'crane-nest/lib/locale/lang/zh-cn'
</script>
