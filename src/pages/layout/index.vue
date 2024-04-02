<template>
  <el-container>
      <el-header height="52px">
        <Head></Head>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-main>
            <Tabs></Tabs>
            <div class="content">
              <!-- :key="$route.fullPath" -->
              <router-view v-slot="{ Component }">
                <keep-alive :include="keepAliveList" >
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import Head from './header/index.vue'
import Menu from './menu/index.vue'
import Tabs from './tabs/index.vue'
import { keepAliveList } from '@/utils/common'
</script>
<style lang="scss" scoped>
.el-container {
  overflow: hidden;
}
.el-aside {
  background-color: #262837;
  overflow: initial;
  // transition: all 0.2s;
}
.el-main {
  padding: 0px;
  display: flex;
  flex-direction: column;
}
:deep(.el-tabs__header) {
  margin: 0;
}
.content {
  flex: 1;
  overflow: auto;
  padding: 15px;
  background: #f2f3f5;
  display: flex;
  flex-direction: column;
}
</style>