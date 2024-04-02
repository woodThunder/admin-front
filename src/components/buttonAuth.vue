<template>
  <div @click="clickHandle">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { buttonsAuth } from '@/utils/common'
import {ElMessage} from 'crane-nest'

const route = useRoute()

const emit = defineEmits(['clickHandle'])
const props = defineProps({
  code: {
    type: String
  }
})
function clickHandle() {
  const flag = buttonsAuth[route.name as keyof typeof buttonsAuth].some(i => i.code === props.code)
  if (flag) {
    emit('clickHandle')
  } else {
    ElMessage.warning('无操作权限，请联系管理员')
  }
}
</script>
<style lang="scss" scoped></style>
