<template>
	<div class="scroll">
		<div class="collapse-icon" @click="collapseHandle">
			<img src="@/assets/images/Separate.png" />
		</div>
		<el-scrollbar>
			<el-menu :default-active="route.path" :unique-opened="true" :router="true" :collapse="collapse">
				<template v-for="menu in menus" :key="menu.id">
					<MenuItem :data="menu" />
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MenuItem from './menu-item.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const menus = JSON.parse(localStorage.getItem('menus') as string)
const collapseHandle = () => {
	collapse.value = !collapse.value
}
const collapse = ref(false)
</script>
<style lang="scss">
.scroll {
	position: relative;
	height: 100%;
	width: 100%;
	&:hover {
		.collapse-icon {
			display: block;
		}
	}
}
.collapse-icon {
	position: absolute;
	top: 8px;
	right: -15px;
	z-index: 100;
	display: none;
	width: 30px;
	height: 30px;
	border-radius: 8px;
	border: 1px solid #5c5f65;
	background: #262837;
	cursor: pointer;
	img {
		width: 16px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
	}
}
.el-menu:not(.el-menu--collapse) {
	width: 190px;
	border: none;
}
.el-menu--collapse {
	border: none;
}
</style>